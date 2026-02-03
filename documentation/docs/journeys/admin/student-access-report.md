# ADMIN-002: Relatório de Acesso de Alunos (Student Access Report)

:::info Contexto
**Jornada**: Administrador (Coordenador, Gestor, Gerente de Rede)  
**Prioridade**: Média  
**Complexidade**: Média-Alta  
**Status**: ✅ Documentado (AS-IS Baseline)
:::

## 1. Visão Geral

### Problema

Gestores educacionais precisam monitorar o engajamento digital dos alunos para identificar evasão, detectar problemas de acesso à plataforma e intervir precocemente, mas não possuem ferramentas consolidadas para rastrear padrões de acesso, frequência de uso e níveis de atividade.

**Dores principais**:
- Impossibilidade de identificar alunos inativos ou com baixo engajamento
- Falta de visibilidade sobre quando e como os alunos acessam a plataforma
- Dificuldade para correlacionar acesso com desempenho acadêmico
- Ausência de alertas proativos para evasão digital
- Relatórios manuais e demorados para análise de engajamento
- Dados dispersos entre múltiplas ferramentas (analytics, LMS, banco de dados)

### Solução AS-IS

Sistema de análise de acesso que oferece visibilidade completa sobre engajamento digital com:
- **Dashboard de engajamento** com KPIs de acesso consolidados
- **Lista de alunos** com status de atividade e última conexão
- **Análise temporal** (padrões de horário, dias da semana, sazonalidade)
- **Filtros avançados** por instituição, turma, série, período
- **Alertas de inatividade** configuráveis
- **Correlação com desempenho** (acesso × notas)
- **Exportação** de relatórios para gestão

## 2. Rotas e Navegação

```typescript
// src/router/admin-routes/student-access-routes.js
export default [
  {
    path: '/admin/reports/student-access',
    name: 'admin-student-access-report',
    component: () => import('@/views/pages/admin-context/reports/studentAccess/Index.vue'),
    meta: {
      resource: 'StudentAccessReport',
      action: 'read',
      breadcrumb: [
        { text: 'Início', to: '/' },
        { text: 'Relatórios', to: '/admin/reports' },
        { text: 'Acesso de Alunos', active: true }
      ]
    }
  },
  {
    path: '/admin/reports/student-access/:studentId',
    name: 'admin-student-access-details',
    component: () => import('@/views/pages/admin-context/reports/studentAccess/StudentAccessDetails.vue'),
    meta: {
      resource: 'StudentAccessReport',
      action: 'read'
    }
  }
]
```

**Fluxo de navegação**:
1. Gestor acessa menu Relatórios → Acesso de Alunos
2. Visualiza dashboard com métricas gerais de engajamento
3. Filtra por instituição, turma, série, período
4. Explora abas: Visão Geral, Lista de Alunos, Análise Temporal, Correlação
5. Identifica alunos inativos ou com baixo engajamento
6. Clica em aluno → Navega para detalhes individuais de acesso
7. Exporta relatório para intervenção

## 3. Arquitetura de Componentes

### Estrutura de Pastas

```
src/views/pages/admin-context/reports/studentAccess/
├── Index.vue                      # Orquestrador principal
├── Dashboard.vue                  # Dashboard com KPIs e gráficos
├── Filters.vue                    # Filtros (instituição, turma, período)
├── StudentList.vue                # Lista de alunos com status
├── StudentAccessDetails.vue       # Detalhes de acesso individual
├── useStudentAccessReport.js     # Composable de domínio
├── components/
│   ├── EngagementKPI.vue         # Card de KPI de engajamento
│   ├── InactivityAlert.vue       # Banner de alerta de inatividade
│   ├── ActivityStatusBadge.vue   # Badge de status (ativo/inativo/risco)
│   ├── AccessTimeline.vue        # Timeline de acessos do aluno
│   ├── HourlyHeatmap.vue         # Heatmap de horários de acesso
│   ├── DeviceTypeChart.vue       # Gráfico de tipos de dispositivo
│   ├── CorrelationScatter.vue    # Scatter plot acesso × desempenho
│   └── ExportModal.vue           # Modal de exportação
└── charts/
    ├── AccessTrendChart.vue      # Linha de tendência de acessos
    ├── WeekdayBarChart.vue       # Barras de dias da semana
    └── SessionDurationBox.vue    # Box plot de duração de sessões
```

### Responsabilidades dos Componentes

#### Index.vue (Orquestrador)
```vue
<template>
  <section>
    <Filters />
    <b-tabs content-class="mt-3" pills>
      <b-tab title="Visão Geral" active>
        <Dashboard />
      </b-tab>
      
      <b-tab title="Lista de Alunos">
        <StudentList />
      </b-tab>
      
      <b-tab title="Análise Temporal">
        <TemporalAnalysis />
      </b-tab>
      
      <b-tab title="Correlação com Desempenho">
        <PerformanceCorrelation />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import Filters from './Filters.vue'
import Dashboard from './Dashboard.vue'
import StudentList from './StudentList.vue'
import TemporalAnalysis from './components/TemporalAnalysis.vue'
import PerformanceCorrelation from './components/PerformanceCorrelation.vue'
import store from '@/store'
import moduleStudentAccess from '@/store/pageModules/reports/module-student-access-report.js'
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  name: 'StudentAccessReportIndex',
  components: {
    Filters, Dashboard, StudentList, 
    TemporalAnalysis, PerformanceCorrelation
  },
  setup() {
    store.registerModule('studentAccessReport', moduleStudentAccess)

    onMounted(() => {
      store.dispatch('studentAccessReport/fetchDashboard')
    })

    onUnmounted(() => {
      store.commit('studentAccessReport/reset')
      store.unregisterModule('studentAccessReport')
    })
  }
})
</script>
```

#### Dashboard.vue (Visão Geral)
```vue
<template>
  <div>
    <!-- Alertas de Inatividade -->
    <InactivityAlert 
      v-if="inactiveStudents.length > 0"
      :count="inactiveStudents.length"
      @view-list="goToListTab"
    />

    <!-- KPIs -->
    <b-row class="mb-2">
      <b-col cols="12" md="6" xl="3">
        <EngagementKPI
          title="Total de Alunos"
          :value="dashboard.totalStudents"
          icon="people"
          variant="primary"
        />
      </b-col>
      
      <b-col cols="12" md="6" xl="3">
        <EngagementKPI
          title="Alunos Ativos (7 dias)"
          :value="dashboard.activeStudents"
          :percentage="dashboard.activePercentage"
          :trend="dashboard.activeTrend"
          icon="check_circle"
          variant="success"
        />
      </b-col>
      
      <b-col cols="12" md="6" xl="3">
        <EngagementKPI
          title="Alunos Inativos"
          :value="dashboard.inactiveStudents"
          :percentage="dashboard.inactivePercentage"
          icon="warning"
          variant="danger"
        />
      </b-col>
      
      <b-col cols="12" md="6" xl="3">
        <EngagementKPI
          title="Acessos (Hoje)"
          :value="dashboard.todayAccess"
          :trend="dashboard.todayTrend"
          icon="login"
          variant="info"
        />
      </b-col>
    </b-row>

    <!-- Gráficos -->
    <b-row>
      <b-col cols="12" xl="8">
        <b-card title="Tendência de Acessos (Últimos 30 dias)">
          <AccessTrendChart :data="dashboard.accessTrend" />
        </b-card>
      </b-col>
      
      <b-col cols="12" xl="4">
        <b-card title="Distribuição por Dispositivo">
          <DeviceTypeChart :data="dashboard.deviceDistribution" />
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col cols="12" md="6">
        <b-card title="Horários de Maior Acesso">
          <HourlyHeatmap :data="dashboard.hourlyHeatmap" />
        </b-card>
      </b-col>
      
      <b-col cols="12" md="6">
        <b-card title="Acessos por Dia da Semana">
          <WeekdayBarChart :data="dashboard.weekdayData" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EngagementKPI from './components/EngagementKPI.vue'
import InactivityAlert from './components/InactivityAlert.vue'
import AccessTrendChart from './charts/AccessTrendChart.vue'
import DeviceTypeChart from './components/DeviceTypeChart.vue'
import HourlyHeatmap from './components/HourlyHeatmap.vue'
import WeekdayBarChart from './charts/WeekdayBarChart.vue'
import useStudentAccessReport from './useStudentAccessReport.js'

export default {
  components: {
    EngagementKPI, InactivityAlert, AccessTrendChart,
    DeviceTypeChart, HourlyHeatmap, WeekdayBarChart
  },
  setup() {
    const { dashboard, inactiveStudents } = useStudentAccessReport()

    const goToListTab = () => {
      // Implementar navegação para aba Lista com filtro de inativos
    }

    return { dashboard, inactiveStudents, goToListTab }
  }
}
</script>
```

#### StudentList.vue (Lista de Alunos)
```vue
<template>
  <b-card>
    <!-- Filtros Rápidos -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <b-button-group>
        <b-button 
          :variant="statusFilter === null ? 'primary' : 'outline-primary'"
          @click="setStatusFilter(null)"
        >
          Todos ({{ totalStudents }})
        </b-button>
        <b-button 
          :variant="statusFilter === 'active' ? 'success' : 'outline-success'"
          @click="setStatusFilter('active')"
        >
          Ativos ({{ activeCount }})
        </b-button>
        <b-button 
          :variant="statusFilter === 'at-risk' ? 'warning' : 'outline-warning'"
          @click="setStatusFilter('at-risk')"
        >
          Em Risco ({{ atRiskCount }})
        </b-button>
        <b-button 
          :variant="statusFilter === 'inactive' ? 'danger' : 'outline-danger'"
          @click="setStatusFilter('inactive')"
        >
          Inativos ({{ inactiveCount }})
        </b-button>
      </b-button-group>

      <b-button variant="primary" @click="openExportModal">
        <span class="material-symbols-outlined">download</span>
        Exportar
      </b-button>
    </div>

    <!-- Tabela -->
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="students"
      :total-data="totalData"
      search-placeholder="Buscar por nome ou matrícula"
      @change="handleTableChange"
    >
      <template #cell(status)="{ item }">
        <ActivityStatusBadge :status="item.activityStatus" />
      </template>

      <template #cell(lastAccess)="{ item }">
        <span :class="getLastAccessClass(item.daysSinceLastAccess)">
          {{ formatLastAccess(item.lastAccess) }}
        </span>
      </template>

      <template #cell(accessFrequency)="{ item }">
        <b-progress 
          :value="item.accessFrequency" 
          :max="100"
          :variant="getFrequencyVariant(item.accessFrequency)"
          show-value
        />
      </template>

      <template #cell(actions)="{ item }">
        <b-button 
          size="sm" 
          variant="outline-primary"
          @click="viewDetails(item.id)"
        >
          <span class="material-symbols-outlined">visibility</span>
        </b-button>
      </template>
    </ListTable>

    <!-- Modal Export -->
    <ExportModal ref="exportModalRef" />
  </b-card>
</template>

<script>
import ListTable from '@/components/table/ListTable.vue'
import ActivityStatusBadge from './components/ActivityStatusBadge.vue'
import ExportModal from './components/ExportModal.vue'
import useStudentAccessReport from './useStudentAccessReport.js'
import router from '@/router'
import { ref, computed } from '@vue/composition-api'

export default {
  components: { ListTable, ActivityStatusBadge, ExportModal },
  setup() {
    const listTableRef = ref(null)
    const exportModalRef = ref(null)
    
    const {
      students,
      loading,
      totalData,
      statusFilter,
      setStatusFilter,
      fetchStudentsList,
      activeCount,
      atRiskCount,
      inactiveCount,
      totalStudents
    } = useStudentAccessReport()

    const tableColumns = [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'registrationCode', label: 'Matrícula', sortable: true },
      { key: 'institution', label: 'Instituição', sortable: true },
      { key: 'class', label: 'Turma', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'lastAccess', label: 'Último Acesso', sortable: true },
      { key: 'accessFrequency', label: 'Frequência (7d)', sortable: true },
      { key: 'actions', label: 'Ações' }
    ]

    const handleTableChange = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
      fetchStudentsList({
        Page: currentPage,
        PageSize: perPage,
        OrderBy: sortBy,
        Ascending: !isSortDirDesc,
        Search: searchQuery
      })
    }

    const getLastAccessClass = (days) => {
      if (days === 0) return 'text-success'
      if (days <= 3) return 'text-info'
      if (days <= 7) return 'text-warning'
      return 'text-danger'
    }

    const formatLastAccess = (date) => {
      // Implementar formatação de data relativa
      return date
    }

    const getFrequencyVariant = (freq) => {
      if (freq >= 80) return 'success'
      if (freq >= 50) return 'warning'
      return 'danger'
    }

    const viewDetails = (studentId) => {
      router.push({ name: 'admin-student-access-details', params: { studentId } })
    }

    const openExportModal = () => exportModalRef.value.show()

    return {
      listTableRef,
      exportModalRef,
      students,
      loading,
      totalData,
      tableColumns,
      statusFilter,
      setStatusFilter,
      activeCount,
      atRiskCount,
      inactiveCount,
      totalStudents,
      handleTableChange,
      getLastAccessClass,
      formatLastAccess,
      getFrequencyVariant,
      viewDetails,
      openExportModal
    }
  }
}
</script>
```

## 4. Módulo Vuex

```javascript
// src/store/pageModules/reports/module-student-access-report.js
import {
  getAccessDashboard,
  getStudentAccessList,
  getStudentAccessDetails,
  getTemporalAnalysis,
  getPerformanceCorrelation,
  exportAccessReport
} from '@/services/admin-context/StudentAccessReportService'

export default {
  namespaced: true,
  
  state: {
    dashboard: null,
    students: [],
    currentStudent: null,
    temporalData: null,
    correlationData: null,
    loading: false,
    params: {
      Page: 1,
      PageSize: 20,
      OrderBy: 'lastAccess',
      Ascending: false,
      Search: '',
      StatusFilter: null, // null | 'active' | 'at-risk' | 'inactive'
      InstitutionId: null,
      ClassId: null,
      GradeId: null,
      StartDate: null,
      EndDate: null
    },
    totalData: 0
  },

  mutations: {
    dashboard(state, payload) {
      state.dashboard = payload
    },
    students(state, payload) {
      state.students = payload
    },
    currentStudent(state, payload) {
      state.currentStudent = payload
    },
    temporalData(state, payload) {
      state.temporalData = payload
    },
    correlationData(state, payload) {
      state.correlationData = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    setParams(state, payload) {
      state.params = { ...state.params, ...payload }
    },
    totalData(state, payload) {
      state.totalData = payload
    },
    reset(state) {
      state.dashboard = null
      state.students = []
      state.currentStudent = null
      state.temporalData = null
      state.correlationData = null
      state.loading = false
      state.params = {
        Page: 1,
        PageSize: 20,
        OrderBy: 'lastAccess',
        Ascending: false,
        Search: '',
        StatusFilter: null,
        InstitutionId: null,
        ClassId: null,
        GradeId: null,
        StartDate: null,
        EndDate: null
      }
      state.totalData = 0
    }
  },

  getters: {
    dashboard: state => state.dashboard,
    students: state => state.students,
    currentStudent: state => state.currentStudent,
    temporalData: state => state.temporalData,
    correlationData: state => state.correlationData,
    loading: state => state.loading,
    params: state => state.params,
    totalData: state => state.totalData,

    // Computed: Alunos inativos (>7 dias sem acesso)
    inactiveStudents: state => {
      return state.students.filter(s => s.activityStatus === 'inactive')
    },

    // Computed: Contadores por status
    activeCount: state => {
      return state.students.filter(s => s.activityStatus === 'active').length
    },
    atRiskCount: state => {
      return state.students.filter(s => s.activityStatus === 'at-risk').length
    },
    inactiveCount: state => {
      return state.students.filter(s => s.activityStatus === 'inactive').length
    },

    // Computed: Taxa de engajamento
    engagementRate: state => {
      if (!state.dashboard) return 0
      return ((state.dashboard.activeStudents / state.dashboard.totalStudents) * 100).toFixed(1)
    }
  },

  actions: {
    async fetchDashboard({ commit, state }) {
      commit('loading', true)
      try {
        const response = await getAccessDashboard({
          InstitutionId: state.params.InstitutionId,
          ClassId: state.params.ClassId,
          StartDate: state.params.StartDate,
          EndDate: state.params.EndDate
        })
        commit('dashboard', response.data)
      } catch (error) {
        console.error('Erro ao buscar dashboard:', error)
      } finally {
        commit('loading', false)
      }
    },

    async fetchStudentsList({ commit, state }) {
      commit('loading', true)
      try {
        const response = await getStudentAccessList(state.params)
        commit('students', response.data.students)
        commit('totalData', response.data.total)
      } catch (error) {
        console.error('Erro ao buscar lista:', error)
        commit('students', [])
        commit('totalData', 0)
      } finally {
        commit('loading', false)
      }
    },

    async fetchStudentDetails({ commit }, studentId) {
      commit('loading', true)
      try {
        const response = await getStudentAccessDetails(studentId)
        commit('currentStudent', response.data)
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error)
      } finally {
        commit('loading', false)
      }
    },

    async fetchTemporalAnalysis({ commit, state }) {
      commit('loading', true)
      try {
        const response = await getTemporalAnalysis({
          InstitutionId: state.params.InstitutionId,
          ClassId: state.params.ClassId,
          StartDate: state.params.StartDate,
          EndDate: state.params.EndDate
        })
        commit('temporalData', response.data)
      } catch (error) {
        console.error('Erro ao buscar análise temporal:', error)
      } finally {
        commit('loading', false)
      }
    },

    async fetchPerformanceCorrelation({ commit, state }) {
      commit('loading', true)
      try {
        const response = await getPerformanceCorrelation({
          InstitutionId: state.params.InstitutionId,
          ClassId: state.params.ClassId
        })
        commit('correlationData', response.data)
      } catch (error) {
        console.error('Erro ao buscar correlação:', error)
      } finally {
        commit('loading', false)
      }
    }
  }
}
```

## 5. Services (API Layer)

```javascript
// src/services/admin-context/StudentAccessReportService.js
import { axiosIns } from '@axios'

/**
 * Busca dashboard de acesso consolidado
 * @param {Object} params - Parâmetros de filtro
 * @param {number} [params.InstitutionId] - ID da instituição
 * @param {number} [params.ClassId] - ID da turma
 * @param {string} [params.StartDate] - Data inicial (YYYY-MM-DD)
 * @param {string} [params.EndDate] - Data final (YYYY-MM-DD)
 * @returns {Promise<{data: Object}>}
 */
export const getAccessDashboard = (params) => {
  return axiosIns.get('/admin/reports/student-access/dashboard', { params })
}

/**
 * Busca lista de alunos com dados de acesso
 * @param {Object} params - Parâmetros de paginação e filtro
 * @returns {Promise<{data: {students: Array, total: number}}>}
 */
export const getStudentAccessList = (params) => {
  return axiosIns.get('/admin/reports/student-access/students', { params })
}

/**
 * Busca detalhes de acesso de um aluno específico
 * @param {number} studentId - ID do aluno
 * @returns {Promise<{data: Object}>}
 */
export const getStudentAccessDetails = (studentId) => {
  return axiosIns.get(`/admin/reports/student-access/students/${studentId}`)
}

/**
 * Busca análise temporal de acessos
 * @param {Object} params - Parâmetros de filtro
 * @returns {Promise<{data: Object}>}
 */
export const getTemporalAnalysis = (params) => {
  return axiosIns.get('/admin/reports/student-access/temporal', { params })
}

/**
 * Busca correlação entre acesso e desempenho
 * @param {Object} params - Parâmetros de filtro
 * @returns {Promise<{data: Object}>}
 */
export const getPerformanceCorrelation = (params) => {
  return axiosIns.get('/admin/reports/student-access/correlation', { params })
}

/**
 * Exporta relatório de acesso
 * @param {Object} options - Opções de exportação
 * @param {string} options.format - Formato (pdf|excel|csv)
 * @param {Array<string>} options.sections - Seções a incluir
 * @param {Object} options.filters - Filtros aplicados
 * @returns {Promise<Blob>}
 */
export const exportAccessReport = (options) => {
  return axiosIns.post(
    '/admin/reports/student-access/export',
    options,
    { responseType: 'blob' }
  )
}
```

## 6. Composable de Domínio

```javascript
// src/views/pages/admin-context/reports/studentAccess/useStudentAccessReport.js
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from '@vue/composition-api'

const moduleName = 'studentAccessReport'
const { institution, classe, networkGroup } = useFilters()

/**
 * Composable para gerenciar relatório de acesso de alunos
 * @returns {Object} Interface de gerenciamento do relatório
 */
export default function useStudentAccessReport() {
  // State
  const dashboard = computed({
    get: () => store.getters[`${moduleName}/dashboard`],
    set: val => store.commit(`${moduleName}/dashboard`, val)
  })

  const students = computed({
    get: () => store.getters[`${moduleName}/students`],
    set: val => store.commit(`${moduleName}/students`, val)
  })

  const currentStudent = computed({
    get: () => store.getters[`${moduleName}/currentStudent`],
    set: val => store.commit(`${moduleName}/currentStudent`, val)
  })

  const temporalData = computed({
    get: () => store.getters[`${moduleName}/temporalData`],
    set: val => store.commit(`${moduleName}/temporalData`, val)
  })

  const correlationData = computed({
    get: () => store.getters[`${moduleName}/correlationData`],
    set: val => store.commit(`${moduleName}/correlationData`, val)
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val)
  })

  const params = computed(() => store.getters[`${moduleName}/params`])
  const totalData = computed(() => store.getters[`${moduleName}/totalData`])

  // Computed getters
  const inactiveStudents = computed(
    () => store.getters[`${moduleName}/inactiveStudents`]
  )

  const activeCount = computed(
    () => store.getters[`${moduleName}/activeCount`]
  )

  const atRiskCount = computed(
    () => store.getters[`${moduleName}/atRiskCount`]
  )

  const inactiveCount = computed(
    () => store.getters[`${moduleName}/inactiveCount`]
  )

  const engagementRate = computed(
    () => store.getters[`${moduleName}/engagementRate`]
  )

  const totalStudents = computed(() => {
    return activeCount.value + atRiskCount.value + inactiveCount.value
  })

  // Methods
  const fetchDashboard = async () => {
    await store.dispatch(`${moduleName}/fetchDashboard`)
  }

  const fetchStudentsList = async (params) => {
    if (params) {
      store.commit(`${moduleName}/setParams`, params)
    }
    await store.dispatch(`${moduleName}/fetchStudentsList`)
  }

  const fetchStudentDetails = async (studentId) => {
    await store.dispatch(`${moduleName}/fetchStudentDetails`, studentId)
  }

  const fetchTemporalAnalysis = async () => {
    await store.dispatch(`${moduleName}/fetchTemporalAnalysis`)
  }

  const fetchPerformanceCorrelation = async () => {
    await store.dispatch(`${moduleName}/fetchPerformanceCorrelation`)
  }

  const setStatusFilter = (status) => {
    store.commit(`${moduleName}/setParams`, { StatusFilter: status, Page: 1 })
    fetchStudentsList()
  }

  const statusFilter = computed(() => params.value.StatusFilter)

  return {
    moduleName,
    // State
    dashboard,
    students,
    currentStudent,
    temporalData,
    correlationData,
    loading,
    params,
    totalData,
    statusFilter,
    // Computed
    inactiveStudents,
    activeCount,
    atRiskCount,
    inactiveCount,
    engagementRate,
    totalStudents,
    // Methods
    fetchDashboard,
    fetchStudentsList,
    fetchStudentDetails,
    fetchTemporalAnalysis,
    fetchPerformanceCorrelation,
    setStatusFilter,
    // Global filters
    institution,
    classe,
    networkGroup
  }
}
```

## 7. Fluxo de Usuário

```mermaid
sequenceDiagram
    actor Gestor as Gestor
    participant Index as Index.vue
    participant Store as Vuex Store
    participant API as Backend API
    participant List as StudentList.vue
    participant Details as StudentAccessDetails.vue

    Gestor->>Index: Acessa Relatório de Acesso
    Index->>Store: dispatch('fetchDashboard')
    Store->>API: GET /admin/reports/student-access/dashboard
    API-->>Store: {dashboard: {...}}
    Store-->>Index: Renderiza Dashboard

    Gestor->>Index: Navega para aba Lista
    Index->>List: Renderiza StudentList
    List->>Store: dispatch('fetchStudentsList')
    Store->>API: GET /admin/reports/student-access/students
    API-->>Store: {students: [...], total: 500}
    Store-->>List: Exibe tabela

    Gestor->>List: Filtra por "Inativos"
    List->>Store: commit('setParams', {StatusFilter: 'inactive'})
    List->>Store: dispatch('fetchStudentsList')
    Store->>API: GET /students?StatusFilter=inactive
    API-->>Store: {students: [inativos], total: 45}
    Store-->>List: Atualiza tabela filtrada

    Gestor->>List: Clica em aluno
    List->>Details: router.push({studentId})
    Details->>Store: dispatch('fetchStudentDetails', id)
    Store->>API: GET /students/:id
    API-->>Store: {student: {...}, accessHistory: [...]}
    Store-->>Details: Renderiza detalhes e timeline
```

## 8. Estados da Interface

### Estado 1: Dashboard - Visão Geral
```typescript
{
  dashboard: {
    totalStudents: 1500,
    activeStudents: 1200,
    activePercentage: 80,
    activeTrend: 5.2, // % change vs período anterior
    inactiveStudents: 300,
    inactivePercentage: 20,
    todayAccess: 850,
    todayTrend: -3.5,
    accessTrend: [
      { date: '2024-01-02', count: 920 },
      { date: '2024-01-03', count: 950 },
      { date: '2024-01-04', count: 880 }
    ],
    deviceDistribution: {
      mobile: 45,
      desktop: 35,
      tablet: 20
    },
    hourlyHeatmap: [
      { hour: 0, monday: 5, tuesday: 3, wednesday: 4, ... },
      { hour: 1, monday: 2, tuesday: 1, wednesday: 2, ... },
      ...
    ],
    weekdayData: [
      { day: 'Segunda', count: 1100 },
      { day: 'Terça', count: 1150 },
      { day: 'Quarta', count: 1080 },
      { day: 'Quinta', count: 1120 },
      { day: 'Sexta', count: 950 }
    ]
  }
}
```
**UI**: 
- Banner de alerta (se > 10% inativos): "300 alunos inativos há mais de 7 dias" (vermelho)
- 4 KPI cards com ícones, valores grandes, porcentagens e trends (↑↓)
- Gráfico de linha: Tendência de acessos (últimos 30 dias)
- Gráfico de pizza/donut: Distribuição por dispositivo
- Heatmap: Horários de acesso (eixo X: horas 0-23, eixo Y: dias da semana, cores: gradient azul)
- Gráfico de barras: Acessos por dia da semana

### Estado 2: Lista de Alunos - Todos
```typescript
{
  students: [
    {
      id: 123,
      name: 'Ana Silva',
      registrationCode: '2024001',
      institution: 'Escola Municipal Centro',
      class: '7º Ano A',
      activityStatus: 'active',
      lastAccess: '2024-02-03T14:30:00Z',
      daysSinceLastAccess: 0,
      accessFrequency: 85, // % de dias com acesso nos últimos 7 dias
      totalAccess30d: 25,
      averageSessionDuration: '00:42:15'
    },
    {
      id: 456,
      name: 'Carlos Lima',
      registrationCode: '2024045',
      institution: 'Escola Estadual Norte',
      class: '8º Ano B',
      activityStatus: 'inactive',
      lastAccess: '2024-01-20T09:15:00Z',
      daysSinceLastAccess: 14,
      accessFrequency: 0,
      totalAccess30d: 3,
      averageSessionDuration: '00:15:20'
    }
  ],
  totalData: 1500,
  loading: false,
  statusFilter: null
}
```
**UI**:
- Filtros rápidos (botões toggle): Todos, Ativos, Em Risco, Inativos (com contadores)
- Botão "Exportar" (topo direita)
- Tabela com 8 colunas sortable/searchable
- Status badge: Verde (ativo), Amarelo (em risco), Vermelho (inativo)
- Último Acesso: Texto colorido por dias (verde 0-3, amarelo 4-7, vermelho >7)
- Frequência: Progress bar (verde ≥80%, amarelo 50-79%, vermelho <50%)
- Ações: Botão "Ver Detalhes"

### Estado 3: Lista Filtrada - Inativos
```typescript
{
  students: [
    // Apenas alunos com activityStatus === 'inactive'
  ],
  totalData: 300,
  loading: false,
  statusFilter: 'inactive'
}
```
**UI**: 
- Botão "Inativos" destacado (variant danger)
- Tabela filtrada mostrando apenas inativos
- Mensagem contextual acima da tabela: "Exibindo 300 alunos inativos há mais de 7 dias"

### Estado 4: Análise Temporal
```typescript
{
  temporalData: {
    peakHours: [
      { hour: 14, count: 450 },
      { hour: 15, count: 520 },
      { hour: 20, count: 380 }
    ],
    peakDays: [
      { day: 'Tuesday', count: 1150 },
      { day: 'Wednesday', count: 1120 }
    ],
    weekendVsWeekday: {
      weekday: { average: 1100, total: 5500 },
      weekend: { average: 300, total: 600 }
    },
    hourlyDistribution: [
      { hour: 0, count: 15, percentage: 0.5 },
      { hour: 1, count: 8, percentage: 0.3 },
      ...
      { hour: 14, count: 450, percentage: 15.2 },
      ...
    ],
    sessionDuration: {
      average: '00:38:25',
      median: '00:32:10',
      p90: '01:15:00',
      distribution: [
        { range: '0-10min', count: 200 },
        { range: '10-30min', count: 500 },
        { range: '30-60min', count: 400 },
        { range: '>60min', count: 150 }
      ]
    }
  }
}
```
**UI**:
- Card "Horários de Pico": Top 3 horários com maior acesso
- Card "Dias Mais Ativos": Top 2 dias da semana
- Card "Fim de Semana vs Dias Úteis": Comparação de médias
- Gráfico de barras: Distribuição horária completa (24 horas)
- Box plot: Duração de sessões (mínimo, Q1, mediana, Q3, máximo, outliers)
- Histograma: Distribuição de duração de sessões por faixa

### Estado 5: Correlação com Desempenho
```typescript
{
  correlationData: {
    scatterData: [
      { studentId: 1, accessFrequency: 85, averageScore: 8.5, name: 'Ana' },
      { studentId: 2, accessFrequency: 30, averageScore: 5.2, name: 'Carlos' },
      ...
    ],
    correlationCoefficient: 0.72, // Correlação forte (Pearson)
    quadrants: {
      highAccessHighPerformance: 450, // ≥70% freq, ≥7.0 nota
      highAccessLowPerformance: 120,  // ≥70% freq, <7.0 nota
      lowAccessHighPerformance: 80,   // <70% freq, ≥7.0 nota
      lowAccessLowPerformance: 350    // <70% freq, <7.0 nota
    },
    insights: [
      {
        type: 'risk',
        message: '350 alunos com baixo acesso e baixo desempenho',
        count: 350,
        action: 'Priorizar intervenção'
      },
      {
        type: 'anomaly',
        message: '120 alunos com alto acesso mas baixo desempenho',
        count: 120,
        action: 'Investigar dificuldades de aprendizagem'
      }
    ]
  }
}
```
**UI**:
- Card de correlação: Coeficiente (0.72) com interpretação ("Correlação Forte Positiva")
- Scatter plot (gráfico de dispersão):
  - Eixo X: Frequência de Acesso (%)
  - Eixo Y: Nota Média
  - Pontos: Cada aluno (cores por quadrante)
  - Linha de tendência (regressão linear)
  - Hover: Nome, Frequência, Nota
- Grid 2x2 mostrando contadores por quadrante:
  - Alto Acesso + Alto Desempenho (verde)
  - Alto Acesso + Baixo Desempenho (amarelo - anomalia)
  - Baixo Acesso + Alto Desempenho (azul - outlier positivo)
  - Baixo Acesso + Baixo Desempenho (vermelho - risco crítico)
- Lista de insights: Cards com tipo, mensagem, contador e ação sugerida

### Estado 6: Detalhes de Acesso Individual
```typescript
{
  currentStudent: {
    id: 123,
    name: 'Ana Silva',
    email: 'ana.silva@escola.com',
    registrationCode: '2024001',
    institution: 'Escola Municipal Centro',
    class: '7º Ano A',
    activityStatus: 'active',
    accessSummary: {
      totalAccess: 85,
      averageDaily: 2.8,
      accessFrequency: 85,
      averageSessionDuration: '00:42:15',
      favoriteDevice: 'mobile',
      favoriteTime: '14:00-15:00'
    },
    accessHistory: [
      {
        id: 1,
        timestamp: '2024-02-03T14:30:00Z',
        device: 'mobile',
        browser: 'Chrome',
        ip: '192.168.1.100',
        duration: '00:45:20',
        activities: [
          { type: 'mission_completed', title: 'Missão Matemática', time: '14:35' },
          { type: 'lesson_viewed', title: 'Vídeo Frações', time: '14:50' }
        ]
      }
    ],
    weeklyPattern: [
      { week: 'Semana 1', accessDays: 5, totalSessions: 12 },
      { week: 'Semana 2', accessDays: 6, totalSessions: 15 },
      { week: 'Semana 3', accessDays: 4, totalSessions: 9 },
      { week: 'Semana 4', accessDays: 6, totalSessions: 14 }
    ]
  }
}
```
**UI - StudentAccessDetails**:
- Header: Foto, nome, matrícula, instituição, turma, status badge
- Card de resumo (6 métricas em grid 2x3):
  - Total de Acessos (30 dias)
  - Média Diária
  - Frequência % (progress bar)
  - Duração Média de Sessão
  - Dispositivo Favorito (ícone)
  - Horário Favorito (ícone relógio)
- Timeline de acessos (últimos 10):
  - Data/hora formatada
  - Ícone de dispositivo
  - Duração da sessão
  - Expansível: Lista de atividades realizadas na sessão
- Gráfico de barras: Padrão semanal (últimas 4 semanas)
  - Barras empilhadas: Dias de acesso + Total de sessões

### Estado 7: Modal de Exportação
```typescript
{
  exportOptions: {
    format: 'excel',
    reportType: 'summary', // 'summary' | 'detailed' | 'inactive-only'
    includeCharts: true,
    includeAccessHistory: false,
    dateRange: {
      start: '2024-01-01',
      end: '2024-02-03'
    },
    filters: {
      StatusFilter: 'inactive',
      InstitutionId: 12,
      ClassId: 34
    }
  }
}
```
**UI - ExportModal**:
- Radio buttons: Tipo de relatório
  - Resumo Executivo (dashboard + KPIs)
  - Detalhado (lista completa de alunos)
  - Apenas Inativos (foco em intervenção)
- Radio buttons: Formato (PDF, Excel, CSV)
- Checkboxes: 
  - Incluir gráficos (apenas PDF)
  - Incluir histórico de acesso completo
- Date range picker: Período dos dados
- Resumo de filtros aplicados (readonly)
- Botões: Cancelar, Exportar

## 9. API Endpoints

### GET /admin/reports/student-access/dashboard
**Request Params**: `?InstitutionId=12&StartDate=2024-01-01&EndDate=2024-02-03`

**Response**:
```json
{
  "totalStudents": 1500,
  "activeStudents": 1200,
  "activePercentage": 80,
  "activeTrend": 5.2,
  "inactiveStudents": 300,
  "inactivePercentage": 20,
  "todayAccess": 850,
  "todayTrend": -3.5,
  "accessTrend": [
    { "date": "2024-01-02", "count": 920 },
    { "date": "2024-01-03", "count": 950 }
  ],
  "deviceDistribution": {
    "mobile": 45,
    "desktop": 35,
    "tablet": 20
  },
  "hourlyHeatmap": [
    {
      "hour": 0,
      "monday": 5,
      "tuesday": 3,
      "wednesday": 4,
      "thursday": 6,
      "friday": 2,
      "saturday": 1,
      "sunday": 0
    }
  ],
  "weekdayData": [
    { "day": "Segunda", "count": 1100 },
    { "day": "Terça", "count": 1150 }
  ]
}
```

### GET /admin/reports/student-access/students
**Request Params**: `?Page=1&PageSize=20&OrderBy=lastAccess&Ascending=false&StatusFilter=inactive&InstitutionId=12`

**Response**:
```json
{
  "students": [
    {
      "id": 123,
      "name": "Ana Silva",
      "registrationCode": "2024001",
      "institution": "Escola Municipal Centro",
      "institutionId": 12,
      "class": "7º Ano A",
      "classId": 34,
      "activityStatus": "active",
      "lastAccess": "2024-02-03T14:30:00Z",
      "daysSinceLastAccess": 0,
      "accessFrequency": 85,
      "totalAccess30d": 25,
      "averageSessionDuration": "00:42:15"
    }
  ],
  "total": 1500,
  "page": 1,
  "pageSize": 20
}
```

### GET /admin/reports/student-access/students/:id
**Response**:
```json
{
  "id": 123,
  "name": "Ana Silva",
  "email": "ana.silva@escola.com",
  "registrationCode": "2024001",
  "institution": "Escola Municipal Centro",
  "class": "7º Ano A",
  "activityStatus": "active",
  "accessSummary": {
    "totalAccess": 85,
    "averageDaily": 2.8,
    "accessFrequency": 85,
    "averageSessionDuration": "00:42:15",
    "favoriteDevice": "mobile",
    "favoriteTime": "14:00-15:00",
    "totalHours": "60:12:45"
  },
  "accessHistory": [
    {
      "id": 1,
      "timestamp": "2024-02-03T14:30:00Z",
      "device": "mobile",
      "browser": "Chrome Mobile",
      "os": "Android",
      "ip": "192.168.1.100",
      "duration": "00:45:20",
      "activities": [
        {
          "type": "mission_completed",
          "title": "Missão Matemática - Frações",
          "time": "14:35:00",
          "missionId": 456
        },
        {
          "type": "lesson_viewed",
          "title": "Vídeo: Introdução a Frações",
          "time": "14:50:00",
          "lessonId": 789
        }
      ]
    }
  ],
  "weeklyPattern": [
    {
      "weekNumber": 1,
      "weekLabel": "Semana 1 (Jan 01-07)",
      "accessDays": 5,
      "totalSessions": 12,
      "totalHours": "08:15:30"
    }
  ],
  "deviceBreakdown": {
    "mobile": 60,
    "desktop": 30,
    "tablet": 10
  }
}
```

### GET /admin/reports/student-access/temporal
**Request Params**: `?InstitutionId=12&StartDate=2024-01-01&EndDate=2024-02-03`

**Response**:
```json
{
  "peakHours": [
    { "hour": 14, "count": 450, "percentage": 15.2 },
    { "hour": 15, "count": 520, "percentage": 17.5 },
    { "hour": 20, "count": 380, "percentage": 12.8 }
  ],
  "peakDays": [
    { "day": "Tuesday", "dayLabel": "Terça", "count": 1150 },
    { "day": "Wednesday", "dayLabel": "Quarta", "count": 1120 }
  ],
  "weekendVsWeekday": {
    "weekday": {
      "average": 1100,
      "total": 5500,
      "percentage": 90.2
    },
    "weekend": {
      "average": 300,
      "total": 600,
      "percentage": 9.8
    }
  },
  "hourlyDistribution": [
    { "hour": 0, "count": 15, "percentage": 0.5 },
    { "hour": 14, "count": 450, "percentage": 15.2 }
  ],
  "sessionDuration": {
    "average": "00:38:25",
    "median": "00:32:10",
    "min": "00:01:00",
    "max": "03:45:20",
    "p25": "00:20:00",
    "p75": "00:55:00",
    "p90": "01:15:00",
    "distribution": [
      { "range": "0-10min", "count": 200, "percentage": 15.4 },
      { "range": "10-30min", "count": 500, "percentage": 38.5 },
      { "range": "30-60min", "count": 400, "percentage": 30.8 },
      { "range": ">60min", "count": 150, "percentage": 11.5 }
    ]
  }
}
```

### GET /admin/reports/student-access/correlation
**Request Params**: `?InstitutionId=12&ClassId=34`

**Response**:
```json
{
  "scatterData": [
    {
      "studentId": 123,
      "studentName": "Ana Silva",
      "accessFrequency": 85,
      "averageScore": 8.5,
      "totalAccess": 25
    }
  ],
  "correlationCoefficient": 0.72,
  "correlationStrength": "Forte Positiva",
  "quadrants": {
    "highAccessHighPerformance": {
      "count": 450,
      "percentage": 30,
      "label": "Alto Acesso + Alto Desempenho"
    },
    "highAccessLowPerformance": {
      "count": 120,
      "percentage": 8,
      "label": "Alto Acesso + Baixo Desempenho"
    },
    "lowAccessHighPerformance": {
      "count": 80,
      "percentage": 5.3,
      "label": "Baixo Acesso + Alto Desempenho"
    },
    "lowAccessLowPerformance": {
      "count": 350,
      "percentage": 23.3,
      "label": "Baixo Acesso + Baixo Desempenho"
    }
  },
  "insights": [
    {
      "type": "risk",
      "severity": "critical",
      "message": "350 alunos com baixo acesso e baixo desempenho",
      "count": 350,
      "actionSuggestion": "Priorizar intervenção imediata"
    },
    {
      "type": "anomaly",
      "severity": "warning",
      "message": "120 alunos com alto acesso mas baixo desempenho",
      "count": 120,
      "actionSuggestion": "Investigar dificuldades de aprendizagem ou qualidade do conteúdo"
    }
  ]
}
```

### POST /admin/reports/student-access/export
**Request**:
```json
{
  "format": "excel",
  "reportType": "detailed",
  "includeCharts": false,
  "includeAccessHistory": true,
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-02-03"
  },
  "filters": {
    "StatusFilter": "inactive",
    "InstitutionId": 12,
    "ClassId": 34
  }
}
```

**Response**: Blob (Excel/PDF/CSV file)
**Headers**: 
```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="relatorio-acesso-alunos-2024-02-03.xlsx"
```

## 10. Screenshots (AS-IS)

### Dashboard - Visão Geral
![Dashboard](../../../static/img/screenshots/admin-002-dashboard-as-is.png)
*KPIs de engajamento, gráfico de tendência, heatmap de horários*

### Lista de Alunos - Todos
![Lista Todos](../../../static/img/screenshots/admin-002-students-list-as-is.png)
*Tabela com status, último acesso e frequência*

### Lista Filtrada - Inativos
![Lista Inativos](../../../static/img/screenshots/admin-002-inactive-list-as-is.png)
*Filtro aplicado mostrando apenas alunos inativos*

### Análise Temporal
![Temporal](../../../static/img/screenshots/admin-002-temporal-analysis-as-is.png)
*Horários de pico, distribuição horária e duração de sessões*

### Correlação com Desempenho
![Correlação](../../../static/img/screenshots/admin-002-correlation-as-is.png)
*Scatter plot e análise de quadrantes*

### Detalhes de Acesso Individual
![Detalhes](../../../static/img/screenshots/admin-002-student-details-as-is.png)
*Timeline de acessos e padrão semanal*

## 11. Melhorias TO-BE

### Problema 1: Alertas Reativos ao Invés de Proativos
**AS-IS**: Gestor precisa acessar relatório manualmente para identificar alunos em risco.

**TO-BE**:
- **Sistema de Alertas Automáticos**:
  - Email/notificação quando aluno fica inativo >3 dias
  - Alert semanal: "15 novos alunos inativos esta semana"
  - Dashboard de gestão de alertas: Marcar como "resolvido", "em acompanhamento"
- **Predição de Evasão com IA**:
  - Modelo preditivo: Identifica alunos com padrão de evasão 2 semanas antes
  - Score de risco (0-100) por aluno
  - Fatores de risco identificados: "Queda gradual de acesso + sem completar missões"
- **Regras Configuráveis**:
  - Gestor define thresholds personalizados: "Alerta se <50% acesso em 7 dias"
  - Diferentes regras por série/instituição

### Problema 2: Correlação Simples sem Insights Acionáveis
**AS-IS**: Scatter plot mostra correlação, mas não sugere ações específicas.

**TO-BE**:
- **Análise Causal Aprofundada**:
  - IA identifica **por que** aluno tem alto acesso mas baixo desempenho:
    - "Tempo gasto em atividades não essenciais"
    - "Alta taxa de tentativas sem completar"
    - "Acesso predominante fora do horário de aula (possível cópia)"
- **Planos de Intervenção Sugeridos**:
  - Para cada quadrante, sistema sugere ações específicas:
    - Baixo acesso + Baixo desempenho: "Ligar para responsável + Oferecer suporte técnico"
    - Alto acesso + Baixo desempenho: "Agendar tutoria pedagógica + Revisar conteúdo"
- **Rastreamento de Eficácia**:
  - Registrar intervenção aplicada
  - Monitorar mudança no quadrante após intervenção
  - Dashboard de eficácia: "60% dos alunos mudaram de quadrante após tutoria"

### Problema 3: Análise Temporal Descritiva sem Contexto
**AS-IS**: Mostra horários de pico, mas não explica se é bom ou ruim.

**TO-BE**:
- **Benchmarking Contextual**:
  - Comparar padrão temporal da instituição vs rede:
    - "Seus alunos acessam 30% mais nos fins de semana que a média da rede"
    - "Pico às 14h coincide com horário de aula, indicando uso supervisionado"
- **Insights de Qualidade de Acesso**:
  - Diferenciar "acesso produtivo" vs "acesso passivo":
    - Tempo em missões/atividades vs tempo em navegação
    - Taxa de conclusão por horário: "Acessos das 20-22h têm 40% menos conclusões"
- **Recomendações Automáticas**:
  - "Considere incentivar acessos entre 15-17h (horário com maior produtividade)"
  - "Fim de semana: Taxa de conclusão baixa, pode indicar falta de suporte"

### Problema 4: Detalhes Individuais sem Comparação
**AS-IS**: Detalhes mostram apenas dados do aluno isoladamente.

**TO-BE**:
- **Comparação com Pares**:
  - Gráfico: Padrão do aluno vs média da turma
  - Percentil: "Ana está no top 20% de acesso da turma"
  - Identificação de outliers: "Acesso 3x maior que média, mas desempenho abaixo"
- **Timeline Enriquecida**:
  - Eventos acadêmicos marcados: "Avaliação", "Entrega de trabalho", "Feriado"
  - Correlação visual: Mostrar se acesso aumentou antes de avaliações
  - Anotações contextuais: Professor adiciona nota sobre evento específico
- **Histórico de Intervenções**:
  - Linha do tempo: "Ligação para responsável em 15/01", "Tutoria em 20/01"
  - Antes/Depois visual: Gráfico mostra impacto da intervenção

### Problema 5: Exportação Sem Integração
**AS-IS**: Relatório PDF/Excel é ponto final, sem fluxo de trabalho.

**TO-BE**:
- **Integração com Workflow de Intervenção**:
  - Exportar para ferramenta de gestão de casos (CRM educacional)
  - Criar "tickets" automáticos para coordenação pedagógica
  - Atribuir responsável por cada aluno em risco
- **Relatórios Agendados e Inteligentes**:
  - Envio automático semanal para gestores
  - Conteúdo dinâmico: Sistema seleciona os insights mais relevantes
  - Alertas priorizados: Top 10 alunos que precisam atenção urgente
- **Dashboard Público para Responsáveis**:
  - Link seguro: Responsável vê acesso do próprio filho
  - Gamificação leve: "Seu filho acessou 5 dias esta semana, parabéns!"
  - Sugestões para responsável: "Incentive uso entre 19-20h (melhor desempenho)"

## 12. Testes Recomendados

### Testes Unitários

#### useStudentAccessReport Composable
```javascript
import useStudentAccessReport from './useStudentAccessReport'
import store from '@/store'

describe('useStudentAccessReport', () => {
  beforeEach(() => {
    store.registerModule('studentAccessReport', moduleStudentAccessReport)
  })

  afterEach(() => {
    store.unregisterModule('studentAccessReport')
  })

  it('deve calcular taxa de engajamento corretamente', () => {
    const mockDashboard = {
      totalStudents: 1000,
      activeStudents: 800
    }
    store.commit('studentAccessReport/dashboard', mockDashboard)
    
    const { engagementRate } = useStudentAccessReport()
    expect(engagementRate.value).toBe('80.0')
  })

  it('deve filtrar alunos inativos', () => {
    const mockStudents = [
      { id: 1, activityStatus: 'active' },
      { id: 2, activityStatus: 'inactive' },
      { id: 3, activityStatus: 'at-risk' },
      { id: 4, activityStatus: 'inactive' }
    ]
    store.commit('studentAccessReport/students', mockStudents)
    
    const { inactiveStudents } = useStudentAccessReport()
    expect(inactiveStudents.value).toHaveLength(2)
  })

  it('deve aplicar filtro de status e fazer fetch', async () => {
    const fetchSpy = jest.spyOn(store, 'dispatch')
    const { setStatusFilter } = useStudentAccessReport()
    
    await setStatusFilter('inactive')
    
    expect(store.state.studentAccessReport.params.StatusFilter).toBe('inactive')
    expect(fetchSpy).toHaveBeenCalledWith('studentAccessReport/fetchStudentsList')
  })
})
```

#### Vuex Module Getters
```javascript
describe('studentAccessReport Vuex Module', () => {
  it('deve contar alunos por status corretamente', () => {
    const state = {
      students: [
        { activityStatus: 'active' },
        { activityStatus: 'active' },
        { activityStatus: 'at-risk' },
        { activityStatus: 'inactive' }
      ]
    }
    
    expect(moduleStudentAccessReport.getters.activeCount(state)).toBe(2)
    expect(moduleStudentAccessReport.getters.atRiskCount(state)).toBe(1)
    expect(moduleStudentAccessReport.getters.inactiveCount(state)).toBe(1)
  })
})
```

### Testes de Integração

#### Filtro de Status na Lista
```javascript
import { mount } from '@vue/test-utils'
import StudentList from './StudentList.vue'
import store from '@/store'

describe('StudentList - Filtro de Status', () => {
  it('deve filtrar alunos ao clicar em botão de status', async () => {
    const wrapper = mount(StudentList, { store })

    // Clicar no botão "Inativos"
    await wrapper.find('[data-test="filter-btn-inactive"]').trigger('click')

    // Verificar chamada API com filtro
    expect(StudentAccessReportService.getStudentAccessList).toHaveBeenCalledWith(
      expect.objectContaining({ StatusFilter: 'inactive' })
    )

    // Verificar tabela atualizada
    await wrapper.vm.$nextTick()
    const rows = wrapper.findAll('[data-test="student-row"]')
    rows.wrappers.forEach(row => {
      expect(row.find('[data-test="status-badge"]').text()).toContain('Inativo')
    })
  })
})
```

#### Navegação para Detalhes
```javascript
describe('StudentList - Navegação para Detalhes', () => {
  it('deve navegar para detalhes ao clicar em botão de ações', async () => {
    const wrapper = mount(StudentList, { store })
    const routerPushSpy = jest.spyOn(router, 'push')

    // Clicar em "Ver Detalhes"
    await wrapper.find('[data-test="view-details-btn-123"]').trigger('click')

    // Verificar navegação
    expect(routerPushSpy).toHaveBeenCalledWith({
      name: 'admin-student-access-details',
      params: { studentId: 123 }
    })
  })
})
```

## 13. Métricas de Sucesso

### KPIs de Uso (AS-IS)
- **Acesso ao Relatório**: 40% dos gestores acessam mensalmente
- **Tempo Médio de Análise**: 15 minutos por sessão
- **Taxa de Exportação**: 25% das sessões resultam em exportação
- **Identificação de Inativos**: 50% dos inativos identificados em até 14 dias
- **Taxa de Intervenção**: 30% dos alunos inativos recebem intervenção

### Metas TO-BE
- **Acesso ao Relatório**: 80% dos gestores semanalmente (aumento de 100%)
- **Tempo Médio de Análise**: 8 minutos (redução de 47%, mais eficiência)
- **Taxa de Exportação**: 50% das sessões (dobrar)
- **Identificação de Inativos**: 90% identificados em até 3 dias (melhoria de 367%)
- **Taxa de Intervenção**: 70% dos alunos inativos (aumento de 133%)
- **Taxa de Resolução de Inatividade**: 60% dos alunos retornam ativos após intervenção (nova métrica)
- **Precisão de Predição de Evasão**: 75% (nova métrica com IA)

### Indicadores de Impacto TO-BE
- **Redução de Evasão**: -25% em evasão digital
- **Melhoria de Engajamento**: Taxa de engajamento sobe de 70% para 85%
- **NPS de Gestores**: Subir de 6.5 para 8.5
- **Tempo para Intervenção**: Reduzir de 14 dias para 3 dias (melhoria de 367%)
- **ROI de Intervenções**: 2.5x (cada R$ 1 investido em intervenção retorna R$ 2.50 em redução de custos de evasão)

---

## Dependências Relacionadas

- **[ADMIN-001: Mission Reports](./mission-reports.md)** - Dados de desempenho usados na correlação
- **[PROF-005: Student Records](../teacher/student-records.md)** - Dados individuais de alunos
- **[Architecture: DDD Pattern](../../architecture/intro.md)** - Padrão arquitetural seguido
- **[API Documentation](#)** - Especificação completa dos endpoints
- **[Design System: Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)** - Componentes e paleta de cores
- **[Prototypes TO-BE](../../prototypes/intro.md)** - Protótipos das melhorias propostas

---

:::tip Próximos Passos
1. Validar thresholds de atividade (ativo/em risco/inativo) com gestores
2. Criar protótipo do sistema de alertas automáticos
3. Treinar modelo preditivo de evasão com dados históricos
4. Desenvolver fluxo de intervenção integrado ao relatório
5. Testar heatmap de horários com dados reais de múltiplas instituições
:::
