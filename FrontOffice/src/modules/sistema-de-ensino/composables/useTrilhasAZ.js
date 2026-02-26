/**
 * useTrilhasAZ - Composable global para gestão de capítulos do livro Trilhas AZ.
 * O state é inicializado no nível do módulo (fora da função) para garantir
 * persistência cross-navegação sem necessidade de Vuex/Pinia.
 *
 * Máquina de status alinhada ao protótipo de regras de negócio:
 *   - !enabled                              → "NÃO ENVIADA"  (laranja)
 *   - enabled + finalizada                    → "FINALIZADA"   (roxo)
 *   - enabled + periodEnabled + fim passado    → "FINALIZADA"   (roxo)
 *   - enabled + periodEnabled + inicio futuro  → "NÃO INICIADA" (info)
 *   - enabled + (qualquer outro caso)          → "INICIADA"     (verde)
 *
 * NÃO INICIADA ocorre APENAS quando há data de início no futuro.
 * Desvincular todos os alunos mantém o status INICIADA — o ônibus nunca volta ao pátio.
 *
 * Simulação de conclusão (protótipo):
 *   - PROGRESS_DURATION_MS : 30 000 ms — barra de progresso vai de 0→100%
 *   - FINISH_DELAY_MS      : 60 000 ms — missão transiciona para FINALIZADA
 *   Timers continuam mesmo ao desvincular (ônibus nunca para) e são reiniciados ao reenviar.
 */
import { reactive, computed } from 'vue'
import rawData from '../data/trilhas-az.json'

// ─── Helpers de data (sem date-fns — produção não usa) ───────────────────────
function isFutureISO(dateStr) {
    if (!dateStr) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const d = new Date(dateStr + 'T00:00:00')
    return d.getTime() > today.getTime()
}

function todayISO() {
    const t = new Date()
    const yyyy = t.getFullYear()
    const mm = String(t.getMonth() + 1).padStart(2, '0')
    const dd = String(t.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

// ─── Simulação de conclusão ───────────────────────────────────────────────────
const PROGRESS_DURATION_MS = 30_000  // barra 0→100% em 30 segundos
const FINISH_DELAY_MS = 60_000  // missão → FINALIZADA em 60 segundos
const TICK_MS = 500     // tick da barra a cada 500ms (animação fluida)
const INCREMENT = (100 / (PROGRESS_DURATION_MS / TICK_MS)) // ~1.67 por tick

// Registro de timers por chapterId (não reativo — só guarda IDs para cancelar)
const simulationTimers = {}

function cancelSimulation(chapterId) {
    const entry = simulationTimers[chapterId]
    if (!entry) return
    clearInterval(entry.intervalId)
    clearTimeout(entry.timeoutId)
    delete simulationTimers[chapterId]
}

function startSimulation(chapterId) {
    // Cancela simulação anterior (reenvio / múltiplos cliques)
    cancelSimulation(chapterId)

    const chapter = getChapter(chapterId)
    if (!chapter) return

    // Rendimento-alvo: usa valor do JSON se definido; senão gera aleatório (30–95%)
    const targetRendimento = chapter.rendimento ?? (30 + Math.floor(Math.random() * 66))

    // Reinicia para demonstração limpa
    chapter.progresso = 0
    chapter.finalizada = false
    chapter.rendimento = null  // "Não há dados" enquanto progresso < 20% (status INICIADA)

    // Timer 1: progresso 0→100% + rendimento parcial proporcional quando progresso ≥ 20%
    // Simula comportamento de produção: dados parciais aparecem conforme alunos jogam
    const intervalId = setInterval(() => {
        const c = getChapter(chapterId)
        if (!c || c.finalizada) {
            clearInterval(intervalId)
            return
        }
        c.progresso = Math.min(100, Math.round((c.progresso + INCREMENT) * 10) / 10)

        // Rendimento parcial: aparece a partir de 20% de progresso, cresce proporcionalmente
        // Ex: progresso=50% → rendimento ≈ 50% do target; progresso=100% → target
        if (c.progresso >= 20) {
            c.rendimento = Math.round(targetRendimento * c.progresso / 100)
        }

        // Ao atingir 100%: finaliza imediatamente (status muda no mesmo tick)
        if (c.progresso >= 100) {
            clearInterval(intervalId)
            clearTimeout(simulationTimers[chapterId]?.timeoutId)
            c.finalizada = true
            c.rendimento = targetRendimento
            delete simulationTimers[chapterId]
        }
    }, TICK_MS)

    // Timer de segurança: garante finalização mesmo se o interval falhar
    const timeoutId = setTimeout(() => {
        const c = getChapter(chapterId)
        if (!c || c.finalizada) return
        c.progresso = 100
        c.finalizada = true
        c.rendimento = targetRendimento
        delete simulationTimers[chapterId]
    }, PROGRESS_DURATION_MS + TICK_MS * 2)

    simulationTimers[chapterId] = { intervalId, timeoutId }
}

// ─── Estado global (singleton) ───────────────────────────────────────────────
const state = reactive({
    book: { ...rawData.book },
    students: rawData.students.map(s => ({ ...s })),
    chapters: rawData.chapters.map(c => ({
        ...c,
        enabled: false,
        periodEnabled: false,
        inicio: null,
        fim: null,
        progresso: 0,
        rendimento: null,   // sempre null no estado inicial — só populado pela simulação após progresso ≥ 20%
        finalizada: false,
        studentsData: c.studentsData.map(sd => ({
            ...sd,
            isLinked: false
        }))
    }))
})

// ─── Máquina de estados (alinhada ao protótipo de regras de negócio) ──────────
/**
 * Calcula o status de um capítulo (analogia do ônibus).
 * Regras:
 *   1. Não habilitado → NÃO ENVIADA  (ônibus no pátio)
 *   2. Habilitado + finalizada=true → FINALIZADA  (ônibus chegou ao destino)
 *   3. Habilitado + data final passou → FINALIZADA  (itinerário encerrou)
 *   4. Habilitado + data início no futuro → NÃO INICIADA  (ônibus agendado para o futuro)
 *   5. Habilitado + qualquer outro caso → INICIADA  (ônibus em rota)
 *
 * ⚠️  NÃO INICIADA = APENAS data de início no futuro.
 *     Desvincular todos os alunos NÃO altera o status — o ônibus nunca volta ao pátio.
 * O ônibus nunca volta ao pátio: uma vez enviada, a missão circula
 * entre NÃO INICIADA ↔ INICIADA até FINALIZADA.
 *
 * @returns {{ label: string, hexColor: string, key: string }}
 */
function calculateStatus(chapter) {
    // 1. Ônibus no pátio — nunca foi enviado
    if (!chapter.enabled) {
        return { key: 'nao_enviada', label: 'NÃO ENVIADA', hexColor: '#ff9f43' }
    }

    // 2. Ônibus chegou ao destino — todos completaram
    if (chapter.finalizada === true) {
        return { key: 'finalizada', label: 'FINALIZADA', hexColor: '#6e63e8' }
    }

    // 3. Data final passou → itinerário encerrou
    if (chapter.periodEnabled && chapter.fim && !isFutureISO(chapter.fim)) {
        return { key: 'finalizada', label: 'FINALIZADA', hexColor: '#6e63e8' }
    }

    // 4. Data de início no futuro → missão agendada (ainda não partiu)
    //    NÃO INICIADA só ocorre por data, nunca por falta de alunos vinculados
    if (chapter.periodEnabled && chapter.inicio && isFutureISO(chapter.inicio)) {
        return { key: 'nao_iniciada', label: 'NÃO INICIADA', hexColor: '#00cfe8' }
    }

    // 5. Em rota — sem data futura e não finalizada
    return { key: 'iniciada', label: 'INICIADA', hexColor: '#28c76f' }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getChapter(chapterId) {
    return state.chapters.find(c => c.id === chapterId)
}

function getLinkedCount(chapterId) {
    const chapter = getChapter(chapterId)
    if (!chapter) return 0
    return chapter.studentsData.filter(sd => sd.isLinked).length
}

function getTotalStudents() {
    return state.students.length
}

// ─── Ações ────────────────────────────────────────────────────────────────────
/**
 * Habilita um capítulo: enabled = true.
 * NÃO define inicio automaticamente — isso é feito pelo drawer
 * no momento do primeiro envio quando periodEnabled + fim + !inicio.
 */
function habilitarCapitulo(chapterId) {
    const chapter = getChapter(chapterId)
    if (!chapter) return
    chapter.enabled = true
}

/**
 * Vincula alunos ao capítulo (Enviar).
 * Se periodEnabled + fim + sem inicio → define inicio = hoje automaticamente.
 * Opcionalmente atualiza a data de fim.
 */
function vincularAlunos(chapterId, studentIds, endDate, startDate) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

    // Se forneceu data de início explícita, usa ela; caso contrário auto-define
    if (startDate) {
        chapter.inicio = startDate
    } else if (chapter.periodEnabled && chapter.fim && !chapter.inicio) {
        chapter.inicio = todayISO()
    }

    studentIds.forEach(sid => {
        const entry = chapter.studentsData.find(sd => sd.studentId === sid)
        if (entry) entry.isLinked = true
    })

    if (endDate) {
        chapter.fim = endDate
    }

    if (studentIds.length > 0) {
        // Inicia simulação de conclusão: progresso 0→100% (30s) + FINALIZADA (60s)
        startSimulation(chapterId)
    }
}

/**
 * Desvincula alunos do capítulo.
 * O ônibus (simulação) nunca para — desvincular passageiros não cancela o itinerário.
 */
function desvincularAlunos(chapterId, studentIds) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

    studentIds.forEach(sid => {
        const entry = chapter.studentsData.find(sd => sd.studentId === sid)
        if (entry) entry.isLinked = false
    })

}

/**
 * Alterna o flag de período de um capítulo.
 */
function togglePeriod(chapterId, periodEnabled) {
    const chapter = getChapter(chapterId)
    if (!chapter) return
    chapter.periodEnabled = periodEnabled
}

/**
 * Define data de encerramento de um capítulo.
 */
function setEndDate(chapterId, dateStr) {
    const chapter = getChapter(chapterId)
    if (!chapter) return
    chapter.fim = dateStr || null
}

// ─── Composable export ────────────────────────────────────────────────────────
export function useTrilhasAZ() {
    /**
     * Lista de capítulos enriquecidos com status computado.
     */
    const chapters = computed(() =>
        state.chapters.map(c => ({
            ...c,
            status: calculateStatus(c),
            linkedCount: getLinkedCount(c.id)
        }))
    )

    return {
        // Estado
        state,
        book: state.book,
        students: state.students,
        chapters,

        // Helpers
        calculateStatus,
        getLinkedCount,
        getTotalStudents,

        // Ações
        habilitarCapitulo,
        vincularAlunos,
        desvincularAlunos,
        togglePeriod,
        setEndDate
    }
}
