/**
 * Composable para renderização de eventos no calendário
 * Centraliza lógica duplicada de DateCellLarge, MonthViewGrid, WeekViewGrid, DayViewGrid
 * 
 * @version 1.2
 */
import { getOriginIcon, normalizeOriginLevel, ORIGIN_LEVELS, getCategoryColor } from '@/data/calendar-enums'
import iconeBelinha from '@/assets/icons/icone_belinha.svg'

export function useEventRendering() {

    // ============================================
    // ÍCONE DE ORIGEM (CORUJA EDUCACROSS)
    // ============================================

    /**
     * Estilo CSS mask para ícone da coruja Belinha
     * Usado com backgroundColor: currentColor para herdar cor do evento
     */
    const belinhaMaskStyle = {
        WebkitMaskImage: `url(${iconeBelinha})`,
        maskImage: `url(${iconeBelinha})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: 'currentColor'
    }

    /**
     * Normaliza valor de origem para enum padrão
     */
    const resolveOrigin = (originValue) => normalizeOriginLevel(originValue)

    /**
     * Verifica se origem é Educacross (usa ícone especial da coruja)
     */
    const isEducacrossOrigin = (originValue) =>
        resolveOrigin(originValue) === ORIGIN_LEVELS.EDUCACROSS.value

    /**
     * Obtém origin_level do evento (normalizado)
     */
    const getEventOrigin = (event) =>
        event?.origin_level || event?.origin || event?.origem || ''

    // ============================================
    // CONVERSÃO DE CORES
    // ============================================

    /**
     * Converte cor hexadecimal para rgba
     * @param {string} hex - Cor em formato #RRGGBB ou RRGGBB
     * @param {number} opacity - Opacidade de 0 a 1
     * @returns {string} Cor em formato rgba()
     */
    const hexToRgba = (hex, opacity = 1) => {
        if (!hex) return `rgba(128, 128, 128, ${opacity})`
        const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex
        const r = parseInt(cleanHex.substring(0, 2), 16)
        const g = parseInt(cleanHex.substring(2, 4), 16)
        const b = parseInt(cleanHex.substring(4, 6), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }

    // ============================================
    // FORMATAÇÃO DE TEMPO
    // ============================================

    /**
     * Formata horário para exibição
     * @param {string} time - Horário em formato HH:MM ou HH:MM:SS
     * @param {string} format - '12h' (2:30pm) ou '24h' (14:30)
     * @returns {string} Horário formatado
     */
    const formatTime = (time, format = '12h') => {
        if (!time) return ''
        const [hours, minutes] = time.split(':').map(Number)

        if (format === '24h') {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        }

        // Formato 12h
        const ampm = hours >= 12 ? 'pm' : 'am'
        const hour12 = hours % 12 || 12
        return `${hour12}:${String(minutes).padStart(2, '0')}${ampm}`
    }

    /**
     * Formata horário compacto (sem minutos se :00)
     * @param {string} time - Horário em formato HH:MM
     * @returns {string} Ex: "2p", "9a", "2:30p"
     */
    const formatTimeCompact = (time) => {
        if (!time) return ''
        const [hours, minutes] = time.split(':').map(Number)
        const ampm = hours >= 12 ? 'p' : 'a'
        const hour12 = hours % 12 || 12

        if (minutes === 0) {
            return `${hour12}${ampm}`
        }
        return `${hour12}:${String(minutes).padStart(2, '0')}${ampm}`
    }

    // ============================================
    // NORMALIZAÇÃO DE EVENTO
    // ============================================

    /**
     * Normaliza propriedades do evento para formato padrão
     * Resolve inconsistências entre 'titulo'/'title', 'horaInicio'/'start_at', etc.
     * @param {Object} event - Evento original
     * @returns {Object} Evento normalizado
     */
    const normalizeEvent = (event) => {
        if (!event) return null

        return {
            ...event,
            // Identificação
            id: event.id,

            // Título (prioriza title, fallback para titulo)
            title: event.title || event.titulo || '',

            // Descrição
            description: event.description || event.descricao || '',

            // Datas e horários
            startDate: event.start_at || event.dataInicio || event.startDate,
            endDate: event.end_at || event.dataTermino || event.endDate,
            startTime: event.horaInicio || event.start_time || '',
            endTime: event.horaTermino || event.end_time || '',

            // Categoria e cor
            category: event.category || event.tipo || 'REMINDERS',
            color: event.color || getCategoryColor(event.category || event.tipo),

            // Origem
            origin: getEventOrigin(event),

            // Flags
            allDay: event.all_day || event.allDay || false,

            // Original (para referência)
            _original: event
        }
    }

    // ============================================
    // ESTILOS DE EVENTO
    // ============================================

    /**
     * Gera estilo base do evento (tarja lateral colorida)
     * @param {Object} event - Evento (deve ter propriedade 'color')
     * @param {number} backgroundOpacity - Opacidade do fundo (0-1)
     * @returns {Object} Objeto de estilo CSS
     */
    const getEventBaseStyle = (event, backgroundOpacity = 0.12) => {
        const color = event.color || '#7367F0'
        return {
            backgroundColor: hexToRgba(color, backgroundOpacity),
            borderLeftColor: color,
            '--event-color': color
        }
    }

    // ============================================
    // DETECÇÃO DE EVENTOS MULTI-DIA
    // ============================================

    /**
     * Verifica se evento abrange múltiplos dias
     * @param {Object} event - Evento
     * @returns {boolean}
     */
    const isMultiDayEvent = (event) => {
        const startDate = new Date(event.start_at || event.dataInicio || event.startDate)
        const endDate = new Date(event.end_at || event.dataTermino || event.endDate || startDate)

        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

        return endDay > startDay
    }

    /**
     * Calcula número de dias que o evento abrange
     * @param {Object} event - Evento
     * @returns {number} Número de dias
     */
    const getEventDaySpan = (event) => {
        const startDate = new Date(event.start_at || event.dataInicio || event.startDate)
        const endDate = new Date(event.end_at || event.dataTermino || event.endDate || startDate)

        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

        return Math.round((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1
    }

    // ============================================
    // SOBREPOSIÇÃO DE EVENTOS
    // ============================================

    /**
     * Verifica se dois eventos se sobrepõem no tempo
     * @param {Object} event1 - Primeiro evento
     * @param {Object} event2 - Segundo evento
     * @returns {boolean}
     */
    const eventsOverlap = (event1, event2) => {
        const start1 = event1.horaInicio || event1.startTime || '00:00'
        const end1 = event1.horaTermino || event1.endTime || '23:59'
        const start2 = event2.horaInicio || event2.startTime || '00:00'
        const end2 = event2.horaTermino || event2.endTime || '23:59'

        const [h1s, m1s] = start1.split(':').map(Number)
        const [h1e, m1e] = end1.split(':').map(Number)
        const [h2s, m2s] = start2.split(':').map(Number)
        const [h2e, m2e] = end2.split(':').map(Number)

        const start1Min = h1s * 60 + m1s
        const end1Min = h1e * 60 + m1e
        const start2Min = h2s * 60 + m2s
        const end2Min = h2e * 60 + m2e

        return start1Min < end2Min && end1Min > start2Min
    }

    /**
     * Calcula colunas para eventos sobrepostos (layout side-by-side)
     * Modifica eventos in-place adicionando _column e _totalColumns
     * @param {Array} events - Lista de eventos do mesmo dia
     */
    const calculateEventColumns = (events) => {
        if (!events || events.length === 0) return

        const sortedEvents = [...events].sort((a, b) => {
            const startA = a.horaInicio || a.startTime || '00:00'
            const startB = b.horaInicio || b.startTime || '00:00'
            return startA.localeCompare(startB)
        })

        // Reset columns
        sortedEvents.forEach(event => {
            event._column = 0
            event._totalColumns = 1
        })

        // Assign columns
        sortedEvents.forEach((event, index) => {
            const overlappingEvents = sortedEvents.slice(0, index).filter(e => eventsOverlap(e, event))

            if (overlappingEvents.length > 0) {
                const usedColumns = overlappingEvents.map(e => e._column)
                let column = 0
                while (usedColumns.includes(column)) {
                    column++
                }
                event._column = column
            }
        })

        // Calculate total columns for each event
        sortedEvents.forEach(event => {
            const overlappingEvents = sortedEvents.filter(e =>
                e !== event && eventsOverlap(e, event)
            )
            const maxColumn = Math.max(
                event._column,
                ...overlappingEvents.map(e => e._column || 0)
            )
            event._totalColumns = maxColumn + 1
        })
    }

    // ============================================
    // FORMATAÇÃO DE RANGE DE DATAS
    // ============================================

    /**
     * Formata range de datas para exibição
     * @param {Date|string} startDate - Data inicial
     * @param {Date|string} endDate - Data final
     * @returns {string} Ex: "15-20 Fev" ou "15 Fev - 2 Mar"
     */
    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]}`
        }

        return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]}`
    }

    // ============================================
    // EXPORT
    // ============================================

    return {
        // Ícone de origem
        belinhaMaskStyle,
        resolveOrigin,
        isEducacrossOrigin,
        getEventOrigin,
        getOriginIcon,

        // Cores
        hexToRgba,

        // Tempo
        formatTime,
        formatTimeCompact,

        // Normalização
        normalizeEvent,

        // Estilos
        getEventBaseStyle,

        // Multi-dia
        isMultiDayEvent,
        getEventDaySpan,

        // Sobreposição
        eventsOverlap,
        calculateEventColumns,

        // Formatação
        formatDateRange
    }
}
