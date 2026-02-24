/**
 * useTrilhasAZ - Composable global para gestão de capítulos do livro Trilhas AZ.
 * O state é inicializado no nível do módulo (fora da função) para garantir
 * persistência cross-navegação sem necessidade de Vuex/Pinia.
 */
import { reactive, computed } from 'vue'
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns'
import rawData from '../data/trilhas-az.json'

// ─── Estado global (singleton) ───────────────────────────────────────────────
const state = reactive({
    book: { ...rawData.book },
    students: rawData.students.map(s => ({ ...s })),
    chapters: rawData.chapters.map(c => ({
        ...c,
        studentsData: c.studentsData.map(sd => ({ ...sd }))
    }))
})

// ─── Máquina de estados ───────────────────────────────────────────────────────
/**
 * Calcula o status de um capítulo com base em enabled, inicio e fim vs. hoje.
 * @returns {{ label: string, hexColor: string, key: string }}
 */
function calculateStatus(chapter) {
    if (!chapter.enabled) {
        return { key: 'nao_enviada', label: 'NÃO ENVIADA', hexColor: '#FFB443' }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const inicio = chapter.inicio ? parseISO(chapter.inicio) : null
    const fim = chapter.fim ? parseISO(chapter.fim) : null

    // FINALIZADA: fim < hoje
    if (fim && isBefore(fim, today)) {
        return { key: 'finalizada', label: 'FINALIZADA', hexColor: '#7F6CC3' }
    }

    // NÃO INICIADA: inicio > hoje
    if (inicio && isAfter(inicio, today)) {
        return { key: 'nao_iniciada', label: 'NÃO INICIADA', hexColor: '#FFB443' }
    }

    // INICIADA: inicio <= hoje <= fim
    return { key: 'iniciada', label: 'INICIADA', hexColor: '#8BC728' }
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
 * Habilita um capítulo: enabled = true, inicio = hoje.
 * Não altera fim — o professor define no Drawer.
 */
function habilitarCapitulo(chapterId) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')

    chapter.enabled = true
    chapter.inicio = `${yyyy}-${mm}-${dd}`
}

/**
 * Vincula alunos ao capítulo (Enviar).
 * Opcionalmente atualiza a data de fim.
 */
function vincularAlunos(chapterId, studentIds, endDate) {
    const chapter = getChapter(chapterId)
    if (!chapter) return

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
        pausarAlunos
    }
}
