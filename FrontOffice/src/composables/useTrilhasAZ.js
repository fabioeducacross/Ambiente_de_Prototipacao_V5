/**
 * useTrilhasAZ - Composable global para gestão de capítulos do livro Trilhas AZ.
 * O state é inicializado no nível do módulo (fora da função) para garantir
 * persistência cross-navegação sem necessidade de Vuex/Pinia.
 *
 * Máquina de status alinhada ao protótipo de regras de negócio:
 *   - !enabled                              → "NÃO ENVIADA"  (cinza)
 *   - enabled + periodEnabled + fim futuro  → "NÃO INICIADA" (cinza)
 *   - enabled + (qualquer outro caso)       → "INICIADA"     (verde)
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

// ─── Estado global (singleton) ───────────────────────────────────────────────
const state = reactive({
    book: { ...rawData.book },
    students: rawData.students.map(s => ({ ...s })),
    chapters: rawData.chapters.map(c => ({
        ...c,
        studentsData: c.studentsData.map(sd => ({ ...sd }))
    }))
})

// ─── Máquina de estados (alinhada ao protótipo de regras de negócio) ──────────
/**
 * Calcula o status de um capítulo.
 * Regras:
 *   1. Não habilitado → NÃO ENVIADA
 *   2. Habilitado + período ativo + data fim no futuro → NÃO INICIADA
 *   3. Habilitado + qualquer outro caso → INICIADA
 *
 * @returns {{ label: string, hexColor: string, key: string }}
 */
function calculateStatus(chapter) {
    if (!chapter.enabled) {
        return { key: 'nao_enviada', label: 'NÃO ENVIADA', hexColor: '#b4b7bd' }
    }

    if (chapter.periodEnabled && chapter.fim && isFutureISO(chapter.fim)) {
        return { key: 'nao_iniciada', label: 'NÃO INICIADA', hexColor: '#b4b7bd' }
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
function vincularAlunos(chapterId, studentIds, endDate) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

    // Auto-define inicio no primeiro envio com período configurado
    if (chapter.periodEnabled && chapter.fim && !chapter.inicio) {
        chapter.inicio = todayISO()
    }

    studentIds.forEach(sid => {
        const entry = chapter.studentsData.find(sd => sd.studentId === sid)
        if (entry) entry.isLinked = true
    })

    if (endDate) {
        chapter.fim = endDate
    }
}

/**
 * Desvincula alunos do capítulo (Pausar).
 */
function pausarAlunos(chapterId, studentIds) {
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
        pausarAlunos,
        togglePeriod,
        setEndDate
    }
}
