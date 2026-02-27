import { IconCheck } from '@site/src/components/MaterialIcon';

# PROF-005: Diário de Classe Digital (Student Records)

:::info Contexto
**Jornada**: Professor  
**Prioridade**: Média  
**Complexidade**: Alta  
**Status**: <IconCheck /> Documentado (AS-IS Baseline)
:::

## 1. Visão Geral

### Problema

Professores precisam acompanhar individualmente o progresso de cada aluno através de múltiplas dimensões (acadêmica, comportamental, frequência, evidências de aprendizagem), mas o sistema atual não oferece uma visão consolidada e histórico temporal adequado.

**Dores principais**:
- Informações dispersas entre múltiplas telas (notas, frequência, comportamento)
- Falta de timeline histórica com eventos relevantes do aluno
- Dificuldade para adicionar anotações pedagógicas contextualizadas
- Ausência de comparação rápida entre alunos da mesma turma
- Exportação limitada para compartilhar com coordenação

### Solução AS-IS

Sistema de diário de classe digital que centraliza todas as informações do aluno em uma interface unificada com:
- **Lista de alunos da turma** com filtros e busca
- **Ficha individual do aluno** com abas organizadas por dimensão
- **Timeline de eventos** com histórico cronológico
- **Sistema de anotações** com categorização e privacidade
- **Comparação de métricas** entre alunos
- **Exportação** de relatórios individualizados

## 2. Rotas e Navegação

```typescript
// src/router/professor-routes/student-records-routes.js
export default [
  {
    path: '/professor/student-records',
    name: 'professor-student-records',
    component: () => import('@/views/pages/teacher-context/studentRecords/Index.vue'),
    meta: {
      resource: 'StudentRecords',
      action: 'read',
      breadcrumb: [
        { text: 'Início', to: '/' },
        { text: 'Diário de Classe', active: true }
      ]
    }
  },
  {
    path: '/professor/student-records/:studentId',
    name: 'professor-student-details',
    component: () => import('@/views/pages/teacher-context/studentRecords/StudentDetails.vue'),
    meta: {
      resource: 'StudentRecords',
      action: 'read',
      breadcrumb: [
        { text: 'Início', to: '/' },
        { text: 'Diário de Classe', to: '/professor/student-records' },
        { text: 'Aluno', active: true }
      ]
    }
  }
]
```

**Fluxo de navegação**:
1. Professor acessa lista de alunos via menu lateral
2. Seleciona turma e disciplina (filtros globais)
3. Busca/filtra alunos por nome, status, performance
4. Clica em card do aluno → Navega para detalhes
5. Visualiza abas (Visão Geral, Desempenho, Frequência, Comportamento, Evidências, Anotações)
6. Adiciona anotações ou exporta relatório
7. Retorna para lista via breadcrumb

## 3. Arquitetura de Componentes

### Estrutura de Pastas

```
src/views/pages/teacher-context/studentRecords/
├── Index.vue                     # Orquestrador principal
├── List.vue                      # Lista de alunos (grid/tabela)
├── Filters.vue                   # Filtros (turma, disciplina, status)
├── StudentDetails.vue            # Ficha completa do aluno
├── useStudentRecords.js          # Composable de domínio
├── components/
│   ├── StudentCard.vue           # Card visual do aluno (grid view)
│   ├── StudentRow.vue            # Linha da tabela (table view)
│   ├── StudentHeader.vue         # Header da ficha (foto, nome, info)
│   ├── OverviewTab.vue           # Aba Visão Geral
│   ├── PerformanceTab.vue        # Aba Desempenho Acadêmico
│   ├── AttendanceTab.vue         # Aba Frequência
│   ├── BehaviorTab.vue           # Aba Comportamento
│   ├── EvidenceTab.vue           # Aba Evidências de Aprendizagem
│   ├── NotesTab.vue              # Aba Anotações do Professor
│   ├── TimelineEvent.vue         # Evento da timeline
│   ├── AddNoteModal.vue          # Modal para adicionar anotação
│   ├── CompareMetricsModal.vue   # Modal para comparar alunos
│   └── ExportReportModal.vue     # Modal de exportação
└── charts/
    ├── PerformanceRadarChart.vue # Radar de habilidades
    ├── AttendanceCalendar.vue    # Calendário de frequência
    └── GradesLineChart.vue       # Evolução de notas
```

### Responsabilidades dos Componentes

#### Index.vue (Orquestrador)
```vue
<template>
  <section>
    <Filters />
    <List />
  </section>
</template>

<script>
import Filters from './Filters.vue'
import List from './List.vue'
import store from '@/store'
import moduleStudentRecords from '@/store/pageModules/module-student-records.js'
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  name: 'StudentRecordsIndex',
  components: { Filters, List },
  setup() {
    store.registerModule('studentRecords', moduleStudentRecords)

    onMounted(() => {
      store.dispatch('studentRecords/fetchStudents')
    })

    onUnmounted(() => {
      store.commit('studentRecords/reset')
      store.unregisterModule('studentRecords')
    })
  }
})
</script>
```

#### List.vue (Grid/Tabela de Alunos)
```vue
<template>
  <b-card>
    <!-- Toggle View Mode -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h4 class="mb-0">Alunos da Turma</h4>
      <b-button-group>
        <b-button 
          :variant="viewMode === 'grid' ? 'primary' : 'outline-primary'"
          @click="viewMode = 'grid'"
        >
          <span class="material-symbols-outlined">grid_view</span>
        </b-button>
        <b-button 
          :variant="viewMode === 'table' ? 'primary' : 'outline-primary'"
          @click="viewMode = 'table'"
        >
          <span class="material-symbols-outlined">table_rows</span>
        </b-button>
      </b-button-group>
    </div>

    <!-- Grid View -->
    <b-row v-if="viewMode === 'grid' && !loading">
      <b-col 
        v-for="student in students" 
        :key="student.id"
        cols="12" md="6" xl="4"
        class="mb-2"
      >
        <StudentCard :student="student" @click="goToDetails(student.id)" />
      </b-col>
    </b-row>

    <!-- Table View -->
    <ListTableLocalSorting
      v-else-if="viewMode === 'table' && !loading"
      :data-table="students"
      :table-columns="tableColumns"
      :per-page-default="20"
      search-placeholder="Buscar por nome do aluno"
      @row-clicked="goToDetails"
    >
      <template #cell(avatar)="{ item }">
        <b-avatar :src="item.avatarUrl" size="32" />
      </template>
      
      <template #cell(performance)="{ item }">
        <PerformanceIndicator :score="item.averageScore" :size="'sm'" />
      </template>
    </ListTableLocalSorting>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <b-spinner variant="primary" />
    </div>
  </b-card>
</template>

<script>
import StudentCard from './components/StudentCard.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import PerformanceIndicator from '@/components/indicators/PerformanceIndicator.vue'
import useStudentRecords from './useStudentRecords.js'
import router from '@/router'
import { ref } from '@vue/composition-api'

export default {
  components: { StudentCard, ListTableLocalSorting, PerformanceIndicator },
  setup() {
    const { students, loading } = useStudentRecords()
    const viewMode = ref('grid')

    const tableColumns = [
      { key: 'avatar', label: '', sortable: false },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'attendance', label: 'Frequência', sortable: true },
      { key: 'performance', label: 'Desempenho', sortable: true },
      { key: 'lastActivity', label: 'Última Atividade', sortable: true }
    ]

    const goToDetails = (studentId) => {
      router.push({ name: 'professor-student-details', params: { studentId } })
    }

    return { students, loading, viewMode, tableColumns, goToDetails }
  }
}
</script>
```

#### StudentDetails.vue (Ficha do Aluno)
```vue
<template>
  <div v-if="student">
    <StudentHeader :student="student" @export="openExportModal" @compare="openCompareModal" />

    <b-tabs content-class="mt-3" pills>
      <b-tab title="Visão Geral" active>
        <OverviewTab :student="student" />
      </b-tab>

      <b-tab title="Desempenho">
        <PerformanceTab :student-id="student.id" />
      </b-tab>

      <b-tab title="Frequência">
        <AttendanceTab :student-id="student.id" />
      </b-tab>

      <b-tab title="Comportamento">
        <BehaviorTab :student-id="student.id" />
      </b-tab>

      <b-tab title="Evidências">
        <EvidenceTab :student-id="student.id" />
      </b-tab>

      <b-tab title="Anotações">
        <NotesTab :student-id="student.id" @add-note="openAddNoteModal" />
      </b-tab>
    </b-tabs>

    <!-- Modals -->
    <AddNoteModal ref="addNoteModalRef" :student="student" @saved="refreshNotes" />
    <ExportReportModal ref="exportModalRef" :student="student" />
    <CompareMetricsModal ref="compareModalRef" :student="student" />
  </div>
</template>

<script>
import StudentHeader from './components/StudentHeader.vue'
import OverviewTab from './components/OverviewTab.vue'
import PerformanceTab from './components/PerformanceTab.vue'
import AttendanceTab from './components/AttendanceTab.vue'
import BehaviorTab from './components/BehaviorTab.vue'
import EvidenceTab from './components/EvidenceTab.vue'
import NotesTab from './components/NotesTab.vue'
import AddNoteModal from './components/AddNoteModal.vue'
import ExportReportModal from './components/ExportReportModal.vue'
import CompareMetricsModal from './components/CompareMetricsModal.vue'
import useStudentRecords from './useStudentRecords.js'
import { ref, computed, onMounted } from '@vue/composition-api'

export default {
  components: {
    StudentHeader, OverviewTab, PerformanceTab, AttendanceTab,
    BehaviorTab, EvidenceTab, NotesTab, AddNoteModal,
    ExportReportModal, CompareMetricsModal
  },
  setup(props, { root }) {
    const { fetchStudentDetails, currentStudent } = useStudentRecords()
    const addNoteModalRef = ref(null)
    const exportModalRef = ref(null)
    const compareModalRef = ref(null)

    const studentId = computed(() => root.$route.params.studentId)
    const student = computed(() => currentStudent.value)

    onMounted(async () => {
      await fetchStudentDetails(studentId.value)
    })

    const openAddNoteModal = () => addNoteModalRef.value.show()
    const openExportModal = () => exportModalRef.value.show()
    const openCompareModal = () => compareModalRef.value.show()

    const refreshNotes = () => {
      fetchStudentDetails(studentId.value)
    }

    return {
      student,
      addNoteModalRef,
      exportModalRef,
      compareModalRef,
      openAddNoteModal,
      openExportModal,
      openCompareModal,
      refreshNotes
    }
  }
}
</script>
```

## 4. Módulo Vuex

```javascript
// src/store/pageModules/module-student-records.js
import { getStudents, getStudentDetails, addStudentNote, exportStudentReport } from '@/services/teacher-context/StudentRecordsService'

export default {
  namespaced: true,
  
  state: {
    students: [],
    currentStudent: null,
    loading: false,
    filters: {
      search: '',
      statusFilter: null, // null | 'active' | 'inactive' | 'attention'
      performanceFilter: null, // null | 'high' | 'medium' | 'low'
      attendanceFilter: null // null | 'maior que 90%' | '70-90%' | 'menor que 70%'
    },
    notes: [],
    notesLoading: false
  },

  mutations: {
    students(state, payload) {
      state.students = payload
    },
    currentStudent(state, payload) {
      state.currentStudent = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    setFilter(state, { key, value }) {
      state.filters[key] = value
    },
    notes(state, payload) {
      state.notes = payload
    },
    notesLoading(state, payload) {
      state.notesLoading = payload
    },
    addNote(state, note) {
      state.notes.unshift(note)
    },
    reset(state) {
      state.students = []
      state.currentStudent = null
      state.loading = false
      state.filters = {
        search: '',
        statusFilter: null,
        performanceFilter: null,
        attendanceFilter: null
      }
      state.notes = []
    }
  },

  getters: {
    students: state => state.students,
    currentStudent: state => state.currentStudent,
    loading: state => state.loading,
    filters: state => state.filters,
    notes: state => state.notes,
    notesLoading: state => state.notesLoading,

    // Computed: Filtrar alunos que precisam atenção
    studentsNeedingAttention: state => {
      return state.students.filter(s => 
        s.attendance < 75 || s.averageScore < 60 || s.behaviorScore < 3
      )
    },

    // Computed: Top performers
    topPerformers: state => {
      return state.students
        .filter(s => s.averageScore >= 80)
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, 5)
    }
  },

  actions: {
    async fetchStudents({ commit, rootGetters }) {
      commit('loading', true)
      try {
        const { subject, classe } = rootGetters['filters/selectedFilters']
        const response = await getStudents({
          SubjectId: subject?.id,
          ClassId: classe?.ClassId
        })
        commit('students', response.data.students)
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
        commit('students', [])
      } finally {
        commit('loading', false)
      }
    },

    async fetchStudentDetails({ commit }, studentId) {
      commit('loading', true)
      try {
        const response = await getStudentDetails(studentId)
        commit('currentStudent', response.data)
        commit('notes', response.data.notes || [])
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error)
      } finally {
        commit('loading', false)
      }
    },

    async addNote({ commit }, { studentId, noteData }) {
      commit('notesLoading', true)
      try {
        const response = await addStudentNote(studentId, noteData)
        commit('addNote', response.data.note)
        return { success: true }
      } catch (error) {
        console.error('Erro ao adicionar anotação:', error)
        return { success: false, error }
      } finally {
        commit('notesLoading', false)
      }
    }
  }
}
```

## 5. Services (API Layer)

```javascript
// src/services/teacher-context/StudentRecordsService.js
import { axiosIns } from '@axios'

/**
 * Busca lista de alunos da turma
 * @param {Object} params - Parâmetros de filtro
 * @param {number} params.SubjectId - ID da disciplina
 * @param {number} params.ClassId - ID da turma
 * @returns {Promise<{data: {students: Array}}>}
 */
export const getStudents = (params) => {
  return axiosIns.get('/teacher/students', { params })
}

/**
 * Busca detalhes completos do aluno
 * @param {number} studentId - ID do aluno
 * @returns {Promise<{data: Object}>}
 */
export const getStudentDetails = (studentId) => {
  return axiosIns.get(`/teacher/students/${studentId}`)
}

/**
 * Busca desempenho acadêmico do aluno
 * @param {number} studentId - ID do aluno
 * @param {number} subjectId - ID da disciplina
 * @returns {Promise<{data: Object}>}
 */
export const getStudentPerformance = (studentId, subjectId) => {
  return axiosIns.get(`/teacher/students/${studentId}/performance`, {
    params: { SubjectId: subjectId }
  })
}

/**
 * Busca histórico de frequência do aluno
 * @param {number} studentId - ID do aluno
 * @param {string} startDate - Data inicial (YYYY-MM-DD)
 * @param {string} endDate - Data final (YYYY-MM-DD)
 * @returns {Promise<{data: Object}>}
 */
export const getStudentAttendance = (studentId, startDate, endDate) => {
  return axiosIns.get(`/teacher/students/${studentId}/attendance`, {
    params: { StartDate: startDate, EndDate: endDate }
  })
}

/**
 * Busca registros de comportamento do aluno
 * @param {number} studentId - ID do aluno
 * @returns {Promise<{data: Array}>}
 */
export const getStudentBehavior = (studentId) => {
  return axiosIns.get(`/teacher/students/${studentId}/behavior`)
}

/**
 * Busca evidências de aprendizagem do aluno
 * @param {number} studentId - ID do aluno
 * @returns {Promise<{data: Array}>}
 */
export const getStudentEvidences = (studentId) => {
  return axiosIns.get(`/teacher/students/${studentId}/evidences`)
}

/**
 * Adiciona anotação sobre o aluno
 * @param {number} studentId - ID do aluno
 * @param {Object} noteData - Dados da anotação
 * @param {string} noteData.content - Conteúdo da anotação
 * @param {string} noteData.category - Categoria (academic|behavioral|general)
 * @param {boolean} noteData.isPrivate - Se é privada (visível apenas ao professor)
 * @returns {Promise<{data: Object}>}
 */
export const addStudentNote = (studentId, noteData) => {
  return axiosIns.post(`/teacher/students/${studentId}/notes`, noteData)
}

/**
 * Exporta relatório do aluno
 * @param {number} studentId - ID do aluno
 * @param {Object} options - Opções de exportação
 * @param {string} options.format - Formato (pdf|excel)
 * @param {Array<string>} options.sections - Seções a incluir
 * @returns {Promise<Blob>}
 */
export const exportStudentReport = (studentId, options) => {
  return axiosIns.post(
    `/teacher/students/${studentId}/export`,
    options,
    { responseType: 'blob' }
  )
}
```

## 6. Composable de Domínio

```javascript
// src/views/pages/teacher-context/studentRecords/useStudentRecords.js
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from '@vue/composition-api'

const moduleName = 'studentRecords'
const { subject, classe } = useFilters()

/**
 * Composable para gerenciar o diário de classe
 * @returns {Object} Interface de gerenciamento de registros dos alunos
 */
export default function useStudentRecords() {
  // State
  const students = computed({
    get: () => store.getters[`${moduleName}/students`],
    set: val => store.commit(`${moduleName}/students`, val)
  })

  const currentStudent = computed({
    get: () => store.getters[`${moduleName}/currentStudent`],
    set: val => store.commit(`${moduleName}/currentStudent`, val)
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val)
  })

  const notes = computed({
    get: () => store.getters[`${moduleName}/notes`],
    set: val => store.commit(`${moduleName}/notes`, val)
  })

  const notesLoading = computed({
    get: () => store.getters[`${moduleName}/notesLoading`],
    set: val => store.commit(`${moduleName}/notesLoading`, val)
  })

  const filters = computed(() => store.getters[`${moduleName}/filters`])

  // Computed getters
  const studentsNeedingAttention = computed(
    () => store.getters[`${moduleName}/studentsNeedingAttention`]
  )

  const topPerformers = computed(
    () => store.getters[`${moduleName}/topPerformers`]
  )

  // Methods
  const fetchStudents = async () => {
    await store.dispatch(`${moduleName}/fetchStudents`)
  }

  const fetchStudentDetails = async (studentId) => {
    await store.dispatch(`${moduleName}/fetchStudentDetails`, studentId)
  }

  const addNote = async (studentId, noteData) => {
    return await store.dispatch(`${moduleName}/addNote`, { studentId, noteData })
  }

  const setFilter = (key, value) => {
    store.commit(`${moduleName}/setFilter`, { key, value })
  }

  return {
    moduleName,
    // State
    students,
    currentStudent,
    loading,
    notes,
    notesLoading,
    filters,
    // Computed
    studentsNeedingAttention,
    topPerformers,
    // Methods
    fetchStudents,
    fetchStudentDetails,
    addNote,
    setFilter,
    // Global filters
    subject,
    classe
  }
}
```

## 7. Fluxo de Usuário

```mermaid
sequenceDiagram
    actor Prof as Professor
    participant List as List.vue
    participant Store as Vuex Store
    participant API as Backend API
    participant Details as StudentDetails.vue
    participant Modal as AddNoteModal

    Prof->>List: Acessa Diário de Classe
    List->>Store: dispatch('fetchStudents')
    Store->>API: GET /teacher/students
    API-->>Store: {students: [...]}
    Store-->>List: Exibe lista de alunos

    Prof->>List: Busca/filtra aluno
    List->>List: Filtra localmente

    Prof->>List: Clica em card do aluno
    List->>Details: router.push({studentId})
    Details->>Store: dispatch('fetchStudentDetails', id)
    Store->>API: GET /teacher/students/:id
    API-->>Store: {student: {...}, notes: [...]}
    Store-->>Details: Exibe ficha completa

    Prof->>Details: Navega entre abas
    Details->>Details: Renderiza componentes das abas

    Prof->>Details: Clica "Adicionar Anotação"
    Details->>Modal: openAddNoteModal()
    Modal-->>Prof: Exibe formulário

    Prof->>Modal: Preenche e salva
    Modal->>Store: dispatch('addNote', data)
    Store->>API: POST /teacher/students/:id/notes
    API-->>Store: {note: {...}}
    Store-->>Modal: Sucesso
    Modal->>Details: @saved event
    Details->>Store: dispatch('fetchStudentDetails', id)
    Store-->>Details: Atualiza dados
```

## 8. Estados da Interface

### Estado 1: Loading
```typescript
{
  loading: true,
  students: [],
  currentStudent: null
}
```
**UI**: Skeleton cards ou spinner no centro da tela

### Estado 2: Lista Vazia
```typescript
{
  loading: false,
  students: [],
  filters: { search: '', statusFilter: null }
}
```
**UI**: Empty state com ilustração e mensagem "Nenhum aluno encontrado na turma selecionada"

### Estado 3: Lista de Alunos (Grid View)
```typescript
{
  loading: false,
  students: [
    {
      id: 123,
      name: 'João Silva',
      avatarUrl: 'https://...',
      attendance: 85,
      averageScore: 7.5,
      behaviorScore: 4,
      lastActivity: '2024-02-01T14:30:00Z',
      status: 'active',
      needsAttention: false
    }
  ],
  viewMode: 'grid'
}
```
**UI**: Grid responsivo (3 colunas desktop, 2 tablet, 1 mobile) com StudentCard

**StudentCard**:
- Avatar do aluno (topo)
- Nome completo
- Badges: Status (ativo/inativo), Alerta (se needsAttention)
- Métricas visuais:
  - Progress bar de frequência (verde maior que 90%, amarelo 70-90%, vermelho menor que 70%)
  - Score de desempenho com ícone (estrela se maior que 8, neutro se 5-8, alerta se menor que 5)
  - Ícone de comportamento (emoji ou score 1-5)
- Última atividade (data relativa: "2 dias atrás")
- Hover: Eleva card e exibe botão "Ver Detalhes"

### Estado 4: Lista de Alunos (Table View)
```typescript
{
  loading: false,
  students: [...],
  viewMode: 'table'
}
```
**UI**: ListTableLocalSorting com colunas:
- Avatar (miniatura 32x32)
- Nome (sortable, searchable)
- Frequência (sortable, com progress bar inline)
- Desempenho (sortable, com badge colorido)
- Última Atividade (sortable, formato relativo)
- Ações (botão "Ver Detalhes" ao hover na linha)

### Estado 5: Detalhes do Aluno - Aba Visão Geral
```typescript
{
  currentStudent: {
    id: 123,
    name: 'João Silva',
    avatarUrl: 'https://...',
    email: 'joao.silva@escola.com',
    birthdate: '2010-05-15',
    enrollmentDate: '2023-02-01',
    guardianName: 'Maria Silva',
    guardianPhone: '(11) 98765-4321',
    overview: {
      totalMissions: 24,
      completedMissions: 18,
      averageScore: 7.5,
      attendance: 85,
      behaviorScore: 4,
      totalNotes: 12
    },
    recentEvents: [
      {
        id: 1,
        type: 'mission_completed',
        title: 'Missão Matemática - Frações',
        date: '2024-02-01T10:30:00Z',
        score: 8.5
      },
      {
        id: 2,
        type: 'absence',
        title: 'Falta justificada',
        date: '2024-01-28T00:00:00Z',
        note: 'Atestado médico apresentado'
      }
    ]
  }
}
```
**UI - StudentHeader** (fixo no topo):
- Avatar grande (80x80) à esquerda
- Nome completo + badges (Status, Necessita Atenção)
- Informações básicas (idade, turma, disciplina)
- Botões de ação: "Exportar Relatório", "Comparar com Turma"

**UI - OverviewTab**:
- Grid 2x3 de KPI cards (métricas principais com ícones e cores):
  - Total de Missões (ícone lista)
  - Missões Completadas com % (ícone check)
  - Nota Média (ícone estrela)
  - Frequência % (ícone calendário)
  - Comportamento score (ícone emoji)
  - Total de Anotações (ícone nota)
- Timeline de eventos recentes (últimos 10):
  - Ícone colorido por tipo de evento
  - Título do evento
  - Data formatada
  - Detalhes expandíveis

### Estado 6: Detalhes do Aluno - Aba Desempenho
```typescript
{
  performance: {
    grades: [
      { mission: 'Frações', score: 8.5, date: '2024-02-01' },
      { mission: 'Equações', score: 7.0, date: '2024-01-25' }
    ],
    skillsRadar: {
      'Cálculo': 8.0,
      'Interpretação': 7.5,
      'Raciocínio Lógico': 8.5,
      'Geometria': 7.0,
      'Álgebra': 6.5
    },
    evolution: [
      { month: 'Jan', average: 7.2 },
      { month: 'Fev', average: 7.5 }
    ]
  }
}
```
**UI - PerformanceTab**:
- Gráfico de linha: Evolução da nota média (últimos 6 meses)
- Gráfico radar: Habilidades desenvolvidas (5-8 eixos)
- Tabela de notas por missão:
  - Colunas: Missão, Data, Nota, Ações (ver detalhes)
  - Sortable por nota ou data
  - Badge colorido por nota (verde maior que 7, amarelo 5-7, vermelho menor que 5)

### Estado 7: Detalhes do Aluno - Aba Frequência
```typescript
{
  attendance: {
    summary: {
      totalDays: 40,
      presentDays: 34,
      absentDays: 4,
      justifiedAbsences: 2,
      percentage: 85
    },
    calendar: [
      { date: '2024-02-01', status: 'present' },
      { date: '2024-01-31', status: 'absent', justified: true },
      { date: '2024-01-30', status: 'present' }
    ]
  }
}
```
**UI - AttendanceTab**:
- Card de resumo (topo):
  - 4 métricas: Total de aulas, Presenças, Faltas, Faltas justificadas
  - Percentual de frequência com progress bar
- Calendário interativo (componente customizado):
  - Dias marcados por cor: Verde (presente), Vermelho (falta), Laranja (falta justificada)
  - Hover no dia: Tooltip com detalhes
  - Botão para filtrar período (último mês, trimestre, semestre)

### Estado 8: Detalhes do Aluno - Aba Comportamento
```typescript
{
  behavior: {
    averageScore: 4,
    records: [
      {
        id: 1,
        date: '2024-02-01',
        type: 'positive',
        category: 'participation',
        description: 'Participou ativamente da discussão em sala',
        score: 5,
        teacherName: 'Prof. Ana Costa'
      },
      {
        id: 2,
        date: '2024-01-28',
        type: 'negative',
        category: 'discipline',
        description: 'Conversou durante explicação',
        score: 2,
        teacherName: 'Prof. Ana Costa'
      }
    ]
  }
}
```
**UI - BehaviorTab**:
- Score médio de comportamento (1-5 com estrelas ou emoji)
- Lista de registros comportamentais:
  - Badge por tipo (Positivo verde, Negativo vermelho, Neutro azul)
  - Data formatada
  - Categoria (Participação, Disciplina, Colaboração, etc)
  - Descrição completa
  - Score atribuído (1-5)
  - Nome do professor que registrou
- Filtros: Por tipo, por categoria, por período

### Estado 9: Detalhes do Aluno - Aba Evidências
```typescript
{
  evidences: [
    {
      id: 1,
      type: 'photo',
      title: 'Atividade de Matemática - Resolução de Problemas',
      description: 'Resolução criativa usando material concreto',
      date: '2024-02-01',
      thumbnailUrl: 'https://...',
      fullUrl: 'https://...',
      mission: 'Frações na Prática',
      tags: ['criatividade', 'raciocínio-logico']
    },
    {
      id: 2,
      type: 'video',
      title: 'Apresentação em Grupo',
      description: 'Explicação sobre sistema solar',
      date: '2024-01-28',
      thumbnailUrl: 'https://...',
      videoUrl: 'https://...',
      duration: '03:25',
      tags: ['apresentacao', 'astronomia']
    }
  ]
}
```
**UI - EvidenceTab**:
- Grid de cards de evidências (estilo Pinterest):
  - Thumbnail da imagem/vídeo
  - Título e descrição curta
  - Tipo de mídia (ícone)
  - Data
  - Tags coloridas
  - Botão de ação: "Ver detalhes" → Abre modal com visualização completa
- Filtros: Por tipo (foto/vídeo/documento), por missão, por período
- Botão: "Upload Nova Evidência" → Modal de upload

### Estado 10: Detalhes do Aluno - Aba Anotações
```typescript
{
  notes: [
    {
      id: 1,
      date: '2024-02-01T15:30:00Z',
      category: 'academic',
      content: 'Demonstrou dificuldade em frações com denominadores diferentes. Recomendo atividades complementares.',
      isPrivate: true,
      teacherName: 'Prof. Ana Costa',
      tags: ['matematica', 'dificuldade', 'frações']
    },
    {
      id: 2,
      date: '2024-01-25T10:15:00Z',
      category: 'behavioral',
      content: 'Excelente participação nas discussões em grupo. Demonstra liderança positiva.',
      isPrivate: false,
      teacherName: 'Prof. Carlos Lima',
      tags: ['comportamento', 'liderança']
    }
  ],
  notesLoading: false
}
```
**UI - NotesTab**:
- Botão destaque (topo): "+ Adicionar Anotação" → Abre modal
- Timeline de anotações (ordenada por data decrescente):
  - Card por anotação:
    - Header: Data + Categoria badge + Ícone de privacidade (cadeado se privada)
    - Conteúdo da anotação (texto completo)
    - Tags (pills coloridas)
    - Nome do professor que criou
    - Botões: Editar (se autor), Excluir (se autor)
- Filtros: Por categoria (Acadêmico, Comportamental, Geral), Por privacidade

**AddNoteModal**:
- Campos:
  - Categoria (select: Acadêmico, Comportamental, Geral)
  - Conteúdo (textarea com contador de caracteres, max 500)
  - Tags (input com chips, sugestões automáticas)
  - Privacidade (checkbox "Visível apenas para mim")
- Botões: Cancelar, Salvar

### Estado 11: Modal de Exportação
```typescript
{
  exportOptions: {
    format: 'pdf', // 'pdf' | 'excel'
    sections: ['overview', 'performance', 'attendance', 'behavior', 'notes'],
    dateRange: {
      start: '2024-01-01',
      end: '2024-02-01'
    },
    includeCharts: true,
    includeNotes: true,
    includePrivateNotes: false
  }
}
```
**UI - ExportReportModal**:
- Título: "Exportar Relatório do Aluno"
- Formulário:
  - Radio buttons: Formato (PDF, Excel)
  - Checkboxes: Seções a incluir (lista das 6 abas)
  - Date range picker: Período dos dados
  - Checkbox: Incluir gráficos (apenas PDF)
  - Checkbox: Incluir anotações
  - Checkbox: Incluir anotações privadas (apenas se for o autor)
- Preview: Thumbnail do relatório (se tempo permitir)
- Botões: Cancelar, Exportar (com loading)

### Estado 12: Modal de Comparação
```typescript
{
  compareData: {
    student: {
      name: 'João Silva',
      averageScore: 7.5,
      attendance: 85,
      completedMissions: 18
    },
    classAverage: {
      averageScore: 7.2,
      attendance: 88,
      completedMissions: 16
    },
    percentile: 65 // João está melhor que 65% da turma
  }
}
```
**UI - CompareMetricsModal**:
- Título: "Comparação com a Turma"
- Grid de métricas comparativas (3 colunas):
  1. Métrica (ícone + label)
  2. Valor do aluno (badge colorido)
  3. Média da turma (texto cinza)
  4. Indicador visual (↑ acima, ↓ abaixo, → na média)
- Gráfico de barras horizontais: Aluno vs Turma (3-4 métricas principais)
- Texto: "João está no percentil 65 da turma" (com tooltip explicativo)
- Botão: Fechar

## 9. API Endpoints

### GET /teacher/students
**Request**:
```json
{
  "SubjectId": 12,
  "ClassId": 34,
  "StatusFilter": "active",
  "PerformanceFilter": "low",
  "AttendanceFilter": "menor que 70%"
}
```

**Response**:
```json
{
  "students": [
    {
      "id": 123,
      "name": "João Silva",
      "avatarUrl": "https://storage.com/avatars/123.jpg",
      "email": "joao.silva@escola.com",
      "attendance": 85,
      "averageScore": 7.5,
      "behaviorScore": 4,
      "lastActivity": "2024-02-01T14:30:00Z",
      "status": "active",
      "needsAttention": false,
      "completedMissions": 18,
      "totalMissions": 24
    }
  ],
  "classAverages": {
    "attendance": 88,
    "averageScore": 7.2,
    "completedMissions": 16
  }
}
```

### GET /teacher/students/:id
**Response**:
```json
{
  "id": 123,
  "name": "João Silva",
  "avatarUrl": "https://storage.com/avatars/123.jpg",
  "email": "joao.silva@escola.com",
  "birthdate": "2010-05-15",
  "enrollmentDate": "2023-02-01",
  "guardianName": "Maria Silva",
  "guardianPhone": "(11) 98765-4321",
  "guardianEmail": "maria.silva@email.com",
  "overview": {
    "totalMissions": 24,
    "completedMissions": 18,
    "averageScore": 7.5,
    "attendance": 85,
    "behaviorScore": 4,
    "totalNotes": 12
  },
  "recentEvents": [
    {
      "id": 1,
      "type": "mission_completed",
      "title": "Missão Matemática - Frações",
      "date": "2024-02-01T10:30:00Z",
      "score": 8.5,
      "missionId": 456
    },
    {
      "id": 2,
      "type": "absence",
      "title": "Falta justificada",
      "date": "2024-01-28T00:00:00Z",
      "note": "Atestado médico apresentado"
    }
  ],
  "notes": [
    {
      "id": 1,
      "date": "2024-02-01T15:30:00Z",
      "category": "academic",
      "content": "Demonstrou dificuldade em frações...",
      "isPrivate": true,
      "teacherId": 789,
      "teacherName": "Prof. Ana Costa",
      "tags": ["matematica", "dificuldade", "frações"]
    }
  ]
}
```

### GET /teacher/students/:id/performance
**Request Params**: `?SubjectId=12`

**Response**:
```json
{
  "grades": [
    {
      "missionId": 456,
      "missionTitle": "Frações na Prática",
      "score": 8.5,
      "maxScore": 10,
      "completedDate": "2024-02-01T10:30:00Z",
      "attempts": 1,
      "timeSpent": "00:35:20"
    }
  ],
  "skillsRadar": {
    "Cálculo": 8.0,
    "Interpretação": 7.5,
    "Raciocínio Lógico": 8.5,
    "Geometria": 7.0,
    "Álgebra": 6.5
  },
  "evolution": [
    { "month": "2024-01", "average": 7.2, "count": 4 },
    { "month": "2024-02", "average": 7.5, "count": 3 }
  ],
  "classComparison": {
    "studentAverage": 7.5,
    "classAverage": 7.2,
    "percentile": 65
  }
}
```

### GET /teacher/students/:id/attendance
**Request Params**: `?StartDate=2024-01-01&EndDate=2024-02-01`

**Response**:
```json
{
  "summary": {
    "totalDays": 40,
    "presentDays": 34,
    "absentDays": 4,
    "justifiedAbsences": 2,
    "lateArrivals": 1,
    "percentage": 85
  },
  "calendar": [
    {
      "date": "2024-02-01",
      "status": "present",
      "arrivalTime": "07:45:00"
    },
    {
      "date": "2024-01-31",
      "status": "absent",
      "justified": true,
      "justification": "Atestado médico",
      "documentUrl": "https://..."
    }
  ],
  "classComparison": {
    "studentPercentage": 85,
    "classAverage": 88
  }
}
```

### GET /teacher/students/:id/behavior
**Response**:
```json
{
  "averageScore": 4.0,
  "records": [
    {
      "id": 1,
      "date": "2024-02-01T10:30:00Z",
      "type": "positive",
      "category": "participation",
      "description": "Participou ativamente da discussão em sala",
      "score": 5,
      "teacherId": 789,
      "teacherName": "Prof. Ana Costa"
    },
    {
      "id": 2,
      "date": "2024-01-28T14:15:00Z",
      "type": "negative",
      "category": "discipline",
      "description": "Conversou durante explicação",
      "score": 2,
      "teacherId": 789,
      "teacherName": "Prof. Ana Costa"
    }
  ],
  "categories": {
    "participation": 4.5,
    "discipline": 3.5,
    "collaboration": 4.0,
    "respect": 5.0
  }
}
```

### GET /teacher/students/:id/evidences
**Response**:
```json
{
  "evidences": [
    {
      "id": 1,
      "type": "photo",
      "title": "Atividade de Matemática - Resolução de Problemas",
      "description": "Resolução criativa usando material concreto",
      "date": "2024-02-01T10:30:00Z",
      "thumbnailUrl": "https://storage.com/thumbs/evidence-1.jpg",
      "fullUrl": "https://storage.com/evidences/evidence-1.jpg",
      "missionId": 456,
      "missionTitle": "Frações na Prática",
      "uploadedBy": "teacher",
      "tags": ["criatividade", "raciocínio-logico"]
    },
    {
      "id": 2,
      "type": "video",
      "title": "Apresentação em Grupo",
      "description": "Explicação sobre sistema solar",
      "date": "2024-01-28T15:20:00Z",
      "thumbnailUrl": "https://storage.com/thumbs/video-2.jpg",
      "videoUrl": "https://storage.com/videos/video-2.mp4",
      "duration": "00:03:25",
      "uploadedBy": "student",
      "tags": ["apresentacao", "astronomia"]
    }
  ],
  "totalCount": 2
}
```

### POST /teacher/students/:id/notes
**Request**:
```json
{
  "category": "academic",
  "content": "Demonstrou dificuldade em frações com denominadores diferentes. Recomendo atividades complementares.",
  "isPrivate": true,
  "tags": ["matematica", "dificuldade", "frações"]
}
```

**Response**:
```json
{
  "note": {
    "id": 15,
    "date": "2024-02-01T16:45:00Z",
    "category": "academic",
    "content": "Demonstrou dificuldade em frações...",
    "isPrivate": true,
    "teacherId": 789,
    "teacherName": "Prof. Ana Costa",
    "tags": ["matematica", "dificuldade", "frações"]
  }
}
```

### POST /teacher/students/:id/export
**Request**:
```json
{
  "format": "pdf",
  "sections": ["overview", "performance", "attendance", "behavior", "notes"],
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-02-01"
  },
  "includeCharts": true,
  "includeNotes": true,
  "includePrivateNotes": false
}
```

**Response**: Blob (PDF ou Excel file)
**Headers**: 
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="relatorio-joao-silva-2024-02-01.pdf"
```

## 10. Screenshots (AS-IS)

### Lista de Alunos - Grid View
![Lista Grid](/img/screenshots/prof-005-students-grid-as-is.png)
*Grid responsivo com cards dos alunos, badges de status e métricas visuais*

### Lista de Alunos - Table View
![Lista Tabela](/img/screenshots/prof-005-students-table-as-is.png)
*Tabela com colunas sortable, progress bars inline e busca*

### Ficha do Aluno - Visão Geral
![Ficha Overview](/img/screenshots/prof-005-student-overview-as-is.png)
*Header com foto e dados básicos + KPI cards + Timeline de eventos*

### Ficha do Aluno - Desempenho
![Ficha Performance](/img/screenshots/prof-005-student-performance-as-is.png)
*Gráfico de evolução, radar de habilidades e tabela de notas*

### Ficha do Aluno - Anotações
![Ficha Notas](/img/screenshots/prof-005-student-notes-as-is.png)
*Timeline de anotações com filtros e modal de adição*

### Modal Adicionar Anotação
![Modal Anotação](/img/screenshots/prof-005-add-note-modal-as-is.png)
*Formulário com categoria, conteúdo, tags e privacidade*

### Modal Exportar Relatório
![Modal Export](/img/screenshots/prof-005-export-modal-as-is.png)
*Opções de formato, seções e período para exportação*

## 11. Melhorias TO-BE

### Problema 1: Falta de Insights Proativos
**AS-IS**: Professor precisa navegar manualmente por cada aluno para identificar problemas.

**TO-BE**: 
- **Dashboard de Alertas** na página inicial da lista:
  - Card "Alunos que Precisam de Atenção" com lista filtrada
  - Alertas categorizados: Acadêmico, Frequência, Comportamento
  - Botão de ação rápida: "Ver detalhes" ou "Adicionar anotação"
- **Notificações Push** quando aluno:
  - Tem 3 faltas consecutivas
  - Score de desempenho cai mais de 20%
  - Não completa missão há mais de 7 dias
- **Sugestões de Intervenção**:
  - IA analisa padrões e sugere ações (ex: "Agendar conversa com responsável", "Recomendar atividades complementares")

### Problema 2: Comparação Limitada entre Alunos
**AS-IS**: Modal de comparação mostra apenas médias simples da turma.

**TO-BE**:
- **Análise Comparativa Avançada**:
  - Gráfico de dispersão: Posição do aluno em relação à turma (eixos X: frequência, Y: desempenho)
  - Agrupamento por perfil (Alto desempenho/baixa frequência, Baixo desempenho/alta frequência, etc)
  - Comparação com alunos similares (mesmo nível inicial de conhecimento)
- **Benchmarking por Habilidade**:
  - Radar comparativo: Aluno vs Top 10% vs Média da turma
  - Identificação de habilidades fortes e fracas em relação aos pares

### Problema 3: Evidências de Aprendizagem Subutilizadas
**AS-IS**: Evidências são apenas um repositório de mídias.

**TO-BE**:
- **Portfólio de Aprendizagem**:
  - Organização automática por trilha de aprendizagem
  - Timeline visual mostrando evolução (antes/depois)
  - Tags automáticas via IA (reconhecimento de imagem/vídeo)
- **Compartilhamento Facilitado**:
  - Botão "Compartilhar com Responsável" (link seguro com expiração)
  - Opção de incluir em relatório de portfólio trimestral
  - Seleção de evidências para apresentação em conselho de classe
- **Reflexão do Aluno**:
  - Campo para aluno adicionar autoavaliação sobre a evidência
  - Vídeo/áudio do aluno explicando seu processo de aprendizagem

### Problema 4: Anotações sem Contexto Temporal
**AS-IS**: Anotações são lineares, sem conexão com eventos.

**TO-BE**:
- **Timeline Integrada**:
  - Anotações aparecem junto com eventos relevantes (notas, faltas, comportamento)
  - Linha do tempo visual estilo GitHub contributions
  - Filtros: Ver apenas anotações, Ver apenas eventos, Ver tudo
- **Templates de Anotações**:
  - Templates pré-definidos para situações comuns:
    - "Dificuldade identificada" (com campos estruturados: habilidade, observação, plano de ação)
    - "Evolução positiva" (com antes/depois)
    - "Necessita atenção da coordenação" (com urgência e contexto)
- **Colaboração entre Professores**:
  - Anotações compartilhadas entre professores da mesma turma (opt-in)
  - Comentários/respostas em anotações (thread de discussão)
  - Menção a outros professores (@ProfAna)

### Problema 5: Exportação Estática e Limitada
**AS-IS**: Relatórios são PDFs/Excel estáticos.

**TO-BE**:
- **Relatórios Dinâmicos e Interativos**:
  - Opção de gerar link web com dashboard interativo (válido por 30 dias)
  - Responsáveis podem navegar por abas e gráficos
  - Gráficos clicáveis com drill-down
- **Relatórios Agendados**:
  - Configurar envio automático mensal/trimestral para responsáveis
  - Personalização de conteúdo por responsável (ex: excluir anotações sensíveis)
- **Comparação Temporal**:
  - Opção de gerar relatório comparativo (Trimestre 1 vs Trimestre 2)
  - Destaque de evoluções e regressões
  - Gráfico de linha mostrando tendências

## 12. Testes Recomendados

### Testes Unitários

#### useStudentRecords Composable
```javascript
import useStudentRecords from './useStudentRecords'
import store from '@/store'

describe('useStudentRecords', () => {
  beforeEach(() => {
    store.registerModule('studentRecords', moduleStudentRecords)
  })

  afterEach(() => {
    store.unregisterModule('studentRecords')
  })

  it('deve retornar lista de alunos do store', () => {
    const mockStudents = [{ id: 1, name: 'João' }]
    store.commit('studentRecords/students', mockStudents)
    
    const { students } = useStudentRecords()
    expect(students.value).toEqual(mockStudents)
  })

  it('deve computar alunos que precisam de atenção', () => {
    const mockStudents = [
      { id: 1, attendance: 60, averageScore: 5, behaviorScore: 2 },
      { id: 2, attendance: 95, averageScore: 8.5, behaviorScore: 4 }
    ]
    store.commit('studentRecords/students', mockStudents)
    
    const { studentsNeedingAttention } = useStudentRecords()
    expect(studentsNeedingAttention.value).toHaveLength(1)
    expect(studentsNeedingAttention.value[0].id).toBe(1)
  })

  it('deve adicionar nota e atualizar estado', async () => {
    const mockResponse = { data: { note: { id: 1, content: 'Teste' } } }
    jest.spyOn(StudentRecordsService, 'addStudentNote').mockResolvedValue(mockResponse)
    
    const { addNote, notes } = useStudentRecords()
    const result = await addNote(123, { content: 'Teste', category: 'academic' })
    
    expect(result.success).toBe(true)
    expect(notes.value).toHaveLength(1)
  })
})
```

#### Vuex Module
```javascript
import moduleStudentRecords from '@/store/pageModules/module-student-records'

describe('studentRecords Vuex Module', () => {
  it('deve computar top performers corretamente', () => {
    const state = {
      students: [
        { id: 1, averageScore: 85 },
        { id: 2, averageScore: 92 },
        { id: 3, averageScore: 78 },
        { id: 4, averageScore: 88 }
      ]
    }
    
    const topPerformers = moduleStudentRecords.getters.topPerformers(state)
    expect(topPerformers).toHaveLength(3)
    expect(topPerformers[0].id).toBe(2) // Score mais alto
  })

  it('deve filtrar alunos que precisam de atenção', () => {
    const state = {
      students: [
        { id: 1, attendance: 60, averageScore: 55, behaviorScore: 2 },
        { id: 2, attendance: 95, averageScore: 85, behaviorScore: 5 }
      ]
    }
    
    const needingAttention = moduleStudentRecords.getters.studentsNeedingAttention(state)
    expect(needingAttention).toHaveLength(1)
    expect(needingAttention[0].id).toBe(1)
  })
})
```

### Testes de Integração

#### Fluxo Completo: Adicionar Anotação
```javascript
import { mount } from '@vue/test-utils'
import StudentDetails from './StudentDetails.vue'
import AddNoteModal from './components/AddNoteModal.vue'
import store from '@/store'

describe('Adicionar Anotação - Fluxo Completo', () => {
  it('deve adicionar anotação e atualizar lista', async () => {
    const wrapper = mount(StudentDetails, {
      store,
      mocks: {
        $route: { params: { studentId: 123 } }
      }
    })

    // Abrir modal
    await wrapper.find('[data-test="add-note-btn"]').trigger('click')
    expect(wrapper.findComponent(AddNoteModal).vm.isVisible).toBe(true)

    // Preencher formulário
    const modal = wrapper.findComponent(AddNoteModal)
    await modal.find('[data-test="category-select"]').setValue('academic')
    await modal.find('[data-test="content-textarea"]').setValue('Teste de anotação')
    await modal.find('[data-test="private-checkbox"]').setChecked()

    // Salvar
    await modal.find('[data-test="save-btn"]').trigger('click')

    // Verificar API call
    expect(StudentRecordsService.addStudentNote).toHaveBeenCalledWith(123, {
      category: 'academic',
      content: 'Teste de anotação',
      isPrivate: true
    })

    // Verificar atualização da lista
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.notes).toHaveLength(1)
  })
})
```

#### Navegação entre Abas
```javascript
describe('StudentDetails - Navegação entre Abas', () => {
  it('deve carregar dados ao trocar de aba', async () => {
    const wrapper = mount(StudentDetails, { store })

    // Aba inicial: Visão Geral (não faz chamada adicional)
    expect(StudentRecordsService.getStudentPerformance).not.toHaveBeenCalled()

    // Clicar na aba Desempenho
    await wrapper.find('[data-test="tab-performance"]').trigger('click')
    await wrapper.vm.$nextTick()

    // Verificar chamada API
    expect(StudentRecordsService.getStudentPerformance).toHaveBeenCalledWith(123, 12)
    
    // Verificar renderização do componente
    expect(wrapper.findComponent(PerformanceTab).exists()).toBe(true)
  })
})
```

## 13. Métricas de Sucesso

### KPIs de Uso (AS-IS)
- **Acesso ao Diário**: 60% dos professores acessam semanalmente
- **Tempo Médio por Aluno**: 5 minutos para revisar ficha completa
- **Anotações Criadas**: Média de 2 anotações por aluno por trimestre
- **Exportações**: 30% dos professores exportam relatórios trimestrais
- **Identificação de Problemas**: 40% dos alunos com baixo desempenho são identificados nas primeiras 3 semanas

### Metas TO-BE
- **Acesso ao Diário**: 85% dos professores (aumento de 25pp)
- **Tempo Médio por Aluno**: 3 minutos (redução de 40%)
- **Anotações Criadas**: Média de 5 anotações por aluno por trimestre (aumento de 150%)
- **Exportações**: 60% dos professores (dobrar o uso)
- **Identificação de Problemas**: 80% dos alunos identificados na primeira semana (melhoria de 100%)
- **Engajamento de Responsáveis**: 50% dos responsáveis acessam relatórios compartilhados (nova métrica)

### Indicadores de Qualidade TO-BE
- **NPS de Professores**: Subir de 7.5 para 9.0
- **Tempo para Intervenção**: Reduzir de 3 semanas para 1 semana
- **Taxa de Sucesso de Intervenções**: Aumentar de 50% para 75%
- **Satisfação de Responsáveis**: NPS de 8.0 (nova métrica)

---

## Dependências Relacionadas

- **[PROF-002: Education System Missions](./education-system-missions.md)** - Dados de missões exibidos na aba Desempenho
- **[Architecture: DDD Pattern](../../architecture/intro.md)** - Padrão arquitetural seguido
- **[API Documentation](#)** - Especificação completa dos endpoints
- **[Design System: Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)** - Componentes e paleta de cores
- **[Prototypes TO-BE](../../prototypes/intro.md)** - Protótipos das melhorias propostas

---

:::tip Próximos Passos
1. Validar wireframes da ficha do aluno com UX
2. Criar protótipo TO-BE da timeline integrada
3. Desenvolver templates de anotações com professores
4. Testar fluxo de exportação de relatórios com coordenação
:::
