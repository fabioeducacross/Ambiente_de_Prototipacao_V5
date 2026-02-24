/**
 * useTrilhasAZ - Composable global para gestão de capítulos do livro Trilhas AZ.
 * O state é inicializado no nível do módulo (fora da função) para garantir
 * persistência cross-navegação sem necessidade de Vuex/Pinia.
 *
 * Máquina de status alinhada ao protótipo de regras de negócio:
 *   - !enabled                              → "NÃO ENVIADA"  (laranja)
 *   - enabled + paused=true                 → "PAUSADA"      (vermelho)
 *   - enabled + periodEnabled + fim futuro  → "NÃO INICIADA" (laranja)
 *   - enabled + finalizada                  → "FINALIZADA"   (roxo)
 *   - enabled + (qualquer outro caso)       → "INICIADA"     (verde)
 *
 * Simulação de conclusão (protótipo):
 *   - PROGRESS_DURATION_MS : 30 000 ms — barra de progresso vai de 0→100%
 *   - FINISH_DELAY_MS      : 60 000 ms — missão transiciona para FINALIZADA
 *   Timers são cancelados ao pausar e reiniciados ao reenviar.
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

    // Reinicia progresso para demonstração limpa
    chapter.progresso = 0
    chapter.finalizada = false

    // Timer 1: anima barra de progresso de 0 → 100% em PROGRESS_DURATION_MS
    const intervalId = setInterval(() => {
        const c = getChapter(chapterId)
        if (!c || c.paused || c.finalizada) {
            clearInterval(intervalId)
            return
        }
        c.progresso = Math.min(100, Math.round((c.progresso + INCREMENT) * 10) / 10)
        if (c.progresso >= 100) clearInterval(intervalId)
    }, TICK_MS)

    // Timer 2: transiciona para FINALIZADA em FINISH_DELAY_MS
    const timeoutId = setTimeout(() => {
        const c = getChapter(chapterId)
        if (!c || c.paused) return
        c.progresso = 100
        c.finalizada = true
        delete simulationTimers[chapterId]
    }, FINISH_DELAY_MS)

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
        rendimento: null,
        finalizada: false,
        paused: false,
        studentsData: c.studentsData.map(sd => ({
            ...sd,
            isLinked: false
        }))
    }))
})

// ─── Máquina de estados (alinhada ao protótipo de regras de negócio) ──────────
/**
 * Calcula o status de um capítulo.
 * Regras:
 *   1. Não habilitado → NÃO ENVIADA
 *   2. Habilitado + finalizada=true → FINALIZADA
 *   3. Habilitado + paused=true → PAUSADA
 *   4. Habilitado + período ativo + data fim no futuro → NÃO INICIADA
 *   5. Habilitado + qualquer outro caso → INICIADA
 *
 * @returns {{ label: string, hexColor: string, key: string }}
 */
function calculateStatus(chapter) {
    if (!chapter.enabled) {
        return { key: 'nao_enviada', label: 'NÃO ENVIADA', hexColor: '#FFB443' }
    }

    if (chapter.finalizada === true) {
        return { key: 'finalizada', label: 'FINALIZADA', hexColor: '#7F6CC3' }
    }

    if (chapter.paused === true) {
        return { key: 'pausada', label: 'PAUSADA', hexColor: '#EA5455' }
    }

    if (chapter.periodEnabled && chapter.fim && isFutureISO(chapter.fim)) {
        return { key: 'nao_iniciada', label: 'NÃO INICIADA', hexColor: '#FFB443' }
    }

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
        chapter.paused = false
        // Inicia simulação de conclusão: progresso 0→100% (30s) + FINALIZADA (60s)
        startSimulation(chapterId)
    }
}

/**
 * Desvincula alunos do capítulo (Pausar).
 */
function pausarAlunos(chapterId, studentIds) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

    // Cancela simulação em andamento ao pausar
    cancelSimulation(chapterId)

    studentIds.forEach(sid => {
        const entry = chapter.studentsData.find(sd => sd.studentId === sid)
        if (entry) entry.isLinked = false
    })

    const linkedCount = chapter.studentsData.filter(sd => sd.isLinked).length
    chapter.paused = linkedCount === 0
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
        pausarAlunos,
        togglePeriod,
        setEndDate
    }
}
