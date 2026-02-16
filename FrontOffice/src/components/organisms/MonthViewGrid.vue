<template>
  <div class="month-view-grid">
    <!-- Header do calendário mensal -->
    <CalendarMonthHeader
      :month-year="formattedMonthYear"
      :current-view="currentView"
      :show-view-toggle="showViewToggle"
      :available-views="availableViews"
      @previous="handlePreviousMonth"
      @next="handleNextMonth"
      @today="handleToday"
      @view-change="handleViewChange"
    />
    
    <!-- Header dos dias da semana -->
    <CalendarDaysHeader
      :days-labels="daysLabels"
      :show-full-names="showFullDayNames"
      size="large"
    />
    
    <!-- Grid de datas -->
    <div class="dates-grid">
      <div
        v-for="week in weeksGrid"
        :key="week.id"
        class="week-row"
      >
        <!-- Camada harness para eventos spanning (multi-dia) -->
        <div class="spanning-events-harness">
          <div
            v-for="spanEvent in week.spanningEvents"
            :key="`span-${spanEvent.id}-${spanEvent.slotIndex}`"
            class="spanning-event-item"
            :style="getSpanningEventStyle(spanEvent)"
            :title="spanEvent.title"
            @click.stop="handleEventClick(spanEvent)"
          >
            <span v-if="!spanEvent.isContinuation && spanEvent.horaInicio" class="event-time">
              {{ formatTime(spanEvent.horaInicio) }}
            </span>
            <span class="event-title">{{ spanEvent.title }}</span>
          </div>
        </div>
        
        <!-- Células de data (renderizam apenas eventos de 1 dia) -->
        <DateCellLarge
          v-for="day in week.days"
          :key="`${day.date}-${day.month}`"
          :day="day.date"
          :is-current-month="day.isCurrentMonth"
          :is-today="day.isToday"
          :disabled="day.disabled"
          :label="day.label"
          :events="day.singleDayEvents"
          :spanning-slot-count="week.maxSpanningSlot"
          :max-visible-events="maxVisibleEvents"
          @click="handleDayClick"
          @event-click="handleEventClick"
          @more-click="handleMoreClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarMonthHeader from '../molecules/CalendarMonthHeader.vue'
import CalendarDaysHeader from '../molecules/CalendarDaysHeader.vue'
import DateCellLarge from '../atoms/DateCellLarge.vue'

const props = defineProps({
  currentView: {
    type: String,
    default: 'month'
  },
  showViewToggle: {
    type: Boolean,
    default: true
  },
  availableViews: {
    type: Array,
    default: () => [
      { value: 'month', label: 'Mês' },
      { value: 'week', label: 'Semana' },
      { value: 'day', label: 'Dia' }
    ]
  },
  daysLabels: {
    type: Array,
    default: () => [
      { short: 'Dom.', full: 'Domingo' },
      { short: 'Seg.', full: 'Segunda' },
      { short: 'Ter.', full: 'Terça' },
      { short: 'Qua.', full: 'Quarta' },
      { short: 'Qui.', full: 'Quinta' },
      { short: 'Sex.', full: 'Sexta' },
      { short: 'Sáb.', full: 'Sábado' }
    ]
  },
  showFullDayNames: {
    type: Boolean,
    default: false
  },
  maxVisibleEvents: {
    type: Number,
    default: 3
  },
  initialDate: {
    type: Date,
    default: () => new Date()
  },
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['day-click', 'event-click', 'month-change', 'view-change'])

// Estado
const currentDate = ref(new Date(props.initialDate))

// Constantes para cálculo de posição
const DAY_WIDTH_PERCENT = 100 / 7 // ~14.2857%
const EVENT_HEIGHT = 24 // px
const EVENT_GAP = 4 // px
const EVENT_TOP_OFFSET = 30 // px (espaço para número do dia)

// Computed
const formattedMonthYear = computed(() => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const month = monthNames[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} de ${year}`
})

// Formatar horário para exibição
const formatTime = (time) => {
  if (!time) return ''
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'p' : 'a'
  const hour12 = h % 12 || 12
  return `${hour12}:${minutes}${ampm}`
}

// Converte cor hex para rgba com opacidade especificada
const hexToRgba = (hex, opacity = 0.16) => {
  if (!hex) return `rgba(115, 103, 240, ${opacity})` // fallback para primary
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Calcular estilo do evento spanning com posição absoluta
const getSpanningEventStyle = (event) => {
  const left = event.dayIndexInWeek * DAY_WIDTH_PERCENT
  const right = (7 - event.dayIndexInWeek - event.spanDays) * DAY_WIDTH_PERCENT
  const top = EVENT_TOP_OFFSET + (event.slotIndex * (EVENT_HEIGHT + EVENT_GAP))
  
  return {
    backgroundColor: hexToRgba(event.color, 0.16),
    color: event.color,
    left: `${left}%`,
    right: `${right}%`,
    top: `${top}px`,
    height: `${EVENT_HEIGHT}px`
  }
}

// Algoritmo de alocação de slots verticais para evitar sobreposição
const allocateSlots = (spanningEvents) => {
  // Ordena eventos por início e duração (maiores primeiro)
  const sorted = [...spanningEvents].sort((a, b) => {
    if (a.dayIndexInWeek !== b.dayIndexInWeek) {
      return a.dayIndexInWeek - b.dayIndexInWeek
    }
    return b.spanDays - a.spanDays // Eventos mais longos primeiro
  })
  
  // Track slots ocupados por dia
  const slotsOccupied = Array(7).fill(null).map(() => new Set())
  
  sorted.forEach(event => {
    // Encontrar primeiro slot livre para todos os dias do evento
    let slot = 0
    let foundSlot = false
    
    while (!foundSlot) {
      foundSlot = true
      for (let d = event.dayIndexInWeek; d < event.dayIndexInWeek + event.spanDays && d < 7; d++) {
        if (slotsOccupied[d].has(slot)) {
          foundSlot = false
          slot++
          break
        }
      }
    }
    
    // Atribuir slot e marcar como ocupado
    event.slotIndex = slot
    for (let d = event.dayIndexInWeek; d < event.dayIndexInWeek + event.spanDays && d < 7; d++) {
      slotsOccupied[d].add(slot)
    }
  })
  
  // Retornar slot máximo usado para padding da célula
  const maxSlot = sorted.reduce((max, ev) => Math.max(max, ev.slotIndex), -1)
  return { events: sorted, maxSlot: maxSlot + 1 }
}

const weeksGrid = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1)
  const firstDayOfWeek = firstDay.getDay()
  
  // Último dia do mês
  const lastDay = new Date(year, month + 1, 0)
  const lastDate = lastDay.getDate()
  
  // Data de hoje para comparação
  const today = new Date()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()
  
  const weeks = []
  let weekId = 0
  let currentWeek = []
  
  // Função auxiliar para criar objeto de dia
  const createDayObject = (date, monthOffset, isCurrentMonth, dayIndexInWeek) => {
    const cellYear = monthOffset === 0 ? year : (monthOffset === -1 ? (month === 0 ? year - 1 : year) : (month === 11 ? year + 1 : year))
    const cellMonth = monthOffset === 0 ? month : (monthOffset === -1 ? (month === 0 ? 11 : month - 1) : (month === 11 ? 0 : month + 1))
    const isToday = date === todayDate && cellMonth === todayMonth && cellYear === todayYear
    
    const { singleDayEvents, spanningEvents } = getEventsForDate(cellYear, cellMonth, date, dayIndexInWeek)
    
    return {
      date,
      month: cellMonth,
      isCurrentMonth,
      isToday,
      disabled: !isCurrentMonth,
      label: `${date}`,
      singleDayEvents,
      spanningEvents,
      dayIndexInWeek
    }
  }
  
  // Preencher dias do mês anterior
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayIndexInWeek = firstDayOfWeek - 1 - i
    currentWeek.push(createDayObject(prevMonthLastDay - i, -1, false, dayIndexInWeek))
  }
  
  // Preencher dias do mês atual
  for (let date = 1; date <= lastDate; date++) {
    const dayIndexInWeek = currentWeek.length
    currentWeek.push(createDayObject(date, 0, true, dayIndexInWeek))
    
    // Completou uma semana
    if (currentWeek.length === 7) {
      // Coletar todos os eventos spanning da semana e alocar slots
      const weekSpanningEvents = currentWeek.flatMap(day => day.spanningEvents)
      const { events: allocatedEvents, maxSlot } = allocateSlots(weekSpanningEvents)
      
      weeks.push({
        id: weekId++,
        days: [...currentWeek],
        spanningEvents: allocatedEvents,
        maxSpanningSlot: maxSlot
      })
      currentWeek = []
    }
  }
  
  // Preencher dias do próximo mês
  if (currentWeek.length > 0) {
    let nextMonthDate = 1
    while (currentWeek.length < 7) {
      const dayIndexInWeek = currentWeek.length
      currentWeek.push(createDayObject(nextMonthDate++, 1, false, dayIndexInWeek))
    }
    
    // Coletar eventos spanning e alocar slots
    const weekSpanningEvents = currentWeek.flatMap(day => day.spanningEvents)
    const { events: allocatedEvents, maxSlot } = allocateSlots(weekSpanningEvents)
    
    weeks.push({
      id: weekId++,
      days: [...currentWeek],
      spanningEvents: allocatedEvents,
      maxSpanningSlot: maxSlot
    })
  }
  
  return weeks
})

// Methods

// Calcula eventos para uma célula específica, separando single-day e spanning
const getEventsForDate = (year, month, date, dayIndexInWeek) => {
  const cellDate = new Date(year, month, date)
  cellDate.setHours(0, 0, 0, 0)
  
  const singleDayEvents = []
  const spanningEvents = []
  
  props.events.forEach(event => {
    const eventStartStr = event.date || event.dataInicio
    if (!eventStartStr) return
    
    const eventStart = new Date(eventStartStr)
    eventStart.setHours(0, 0, 0, 0)
    
    // Data de término (ou mesmo dia se não existir)
    const eventEndStr = event.dataTermino || event.dataFim || eventStartStr
    const eventEnd = new Date(eventEndStr)
    eventEnd.setHours(0, 0, 0, 0)  // Normalizar para meia-noite (igual ao eventStart)
    
    // Criar cópia para comparação de range (com hora final do dia)
    const eventEndForRange = new Date(eventEndStr)
    eventEndForRange.setHours(23, 59, 59, 999)
    
    // Verificar se o evento está ativo nesta data
    const isActiveOnDate = cellDate >= eventStart && cellDate <= eventEndForRange
    if (!isActiveOnDate) return
    
    // Calcular duração em dias (ambas datas normalizadas para meia-noite)
    const totalDays = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1
    const isMultiDay = totalDays > 1
    
    if (isMultiDay) {
      // Evento multi-dia: só renderizar no dia de início OU primeiro dia da semana
      const isEventStart = cellDate.getTime() === eventStart.getTime()
      const isFirstDayOfWeek = dayIndexInWeek === 0
      const eventStartedBeforeWeek = eventStart < cellDate
      
      if (isEventStart || (isFirstDayOfWeek && eventStartedBeforeWeek)) {
        // Calcular quantos dias o evento se estende a partir desta célula
        const daysUntilEndOfWeek = 7 - dayIndexInWeek
        const daysUntilEventEnd = Math.round((eventEnd - cellDate) / (1000 * 60 * 60 * 24)) + 1
        const spanDays = Math.min(daysUntilEndOfWeek, daysUntilEventEnd)
        
        spanningEvents.push({
          ...event,
          spanDays,
          isContinuation: eventStart < cellDate,
          dayIndexInWeek,
          slotIndex: 0 // Será calculado pelo allocateSlots
        })
      }
    } else {
      // Evento de 1 dia: renderizar na célula
      singleDayEvents.push({
        ...event,
        spanDays: 1,
        isContinuation: false,
        dayIndexInWeek
      })
    }
  })
  
  return { singleDayEvents, spanningEvents }
}

const handlePreviousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
  emit('month-change', currentDate.value)
}

const handleNextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
  emit('month-change', currentDate.value)
}

const handleToday = () => {
  currentDate.value = new Date()
  emit('month-change', currentDate.value)
}

const handleDayClick = (day) => {
  emit('day-click', day)
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleMoreClick = (data) => {
  // Pode abrir um popover ou expandir célula com todos os eventos
  emit('more-click', data)
}

const handleViewChange = (newView) => {
  emit('view-change', newView)
}
</script>

<style scoped>
.month-view-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}

.dates-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 125px;
  flex: 1; /* Distribui espaço igualmente entre as semanas */
  position: relative; /* Para harness de eventos spanning */
}

/* Camada harness para eventos spanning (multi-dia) */
.spanning-events-harness {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Permite cliques nas células abaixo */
  z-index: 10;
}

/* Item de evento spanning com posição absoluta */
.spanning-event-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  pointer-events: auto; /* Reativa cliques no evento */
  transition: opacity 0.2s ease, transform 0.15s ease, background-color 0.2s ease;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.spanning-event-item:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}

.spanning-event-item .event-time {
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.spanning-event-item .event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .week-row {
    min-height: 100px;
  }
  
  .spanning-event-item {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .week-row {
    min-height: 80px;
  }
  
  .spanning-event-item {
    font-size: 11px;
    padding: 0 6px;
  }
}
</style>
