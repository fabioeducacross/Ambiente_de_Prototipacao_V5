<script setup>
/**
 * MissionsList.vue — Lista de Missões (Protótipo)
 *
 * Componentes usados seguindo os exatos correspondentes de produção:
 *   SelectSubject           → layouts/components/SelectSubject.vue
 *   GuidesLimitAlert        → components/missions/GuidesLimitAlert.vue
 *   ListTableSelect         → components/table/ListTableSelect.vue
 *   ProgressBarHorizontalV2 → components/progessBar/ProgressBarHorizontalV2.vue
 *   LegendEnum              → components/legends/LegendEnum.vue
 *   TabRouter CSS           → components/tab/TabRouter.vue (estilos idênticos)
 */
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  BCard, BRow, BCol, BFormGroup, BButton,
  BDropdown, BDropdownItem,
} from 'bootstrap-vue-next'
import AppBreadcrumb             from '@/components/AppBreadcrumb.vue'
import ClassSelector             from '@/components/calendar/ClassSelector.vue'
import ESelect                   from '@/components/base/ESelect.vue'
import SelectSubject             from '@/components/base/SelectSubject.vue'
import GuidesLimitAlert          from '@/components/missions/GuidesLimitAlert.vue'
import ListTableSelect           from '@/components/table/ListTableSelect.vue'
import ProgressBarHorizontalV2   from '@/components/base/ProgressBarHorizontalV2.vue'
import LegendEnum                from '@/components/base/LegendEnum.vue'

const router = useRouter()

// ── Tabs (estilo idêntico ao TabRouter.vue de produção) ──────────────────────
const activeTab = ref('ativas')
const tabs = [
  { key: 'ativas',     label: 'Ativas'     },
  { key: 'arquivadas', label: 'Arquivadas' },
  { key: 'ranking',    label: 'Ranking'    },
]

// ── Filtros ──────────────────────────────────────────────────────────────────
const disciplinas = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'Língua Portuguesa' },
  { id: 3, name: 'Matemática Inglês' },
]
const statusOptions = [
  { id: 'todas',        name: 'Todas'        },
  { id: 'nao-enviada',  name: 'Não enviada'  },
  { id: 'nao-iniciada', name: 'Não iniciada' },
  { id: 'iniciada',     name: 'Iniciada'     },
  { id: 'finalizada',   name: 'Finalizada'   },
  { id: 'cancelada',    name: 'Cancelada'    },
]

const disciplinaAtiva = ref(disciplinas[0])
const statusAtivo     = ref(statusOptions[0])

// ── GuidesLimitAlert — altere para testar os 3 layouts: 0, 30, 42 ────────────
const guidesMonth = ref(0)

// ── Seleção de missões (ações em lote) ──────────────────────────────────────
const selectedMissions = ref([])
const onSelectionUpdate = (items) => { selectedMissions.value = items }

// ── Dados mock ───────────────────────────────────────────────────────────────
const allMissions = [
  { id: 1, title: 'Interpretação de Textos — Semana 1', author: 'Profª Ana Lima',  start: '10/06/2025', end: '17/06/2025', progress: 72,  listStatus: 'ativa', missionStatus: 'iniciada'     },
  { id: 2, title: 'Tabuada do 6 e 7',                   author: 'Profº Carlos M.', start: '12/06/2025', end: '20/06/2025', progress: 48,  listStatus: 'ativa', missionStatus: 'iniciada'     },
  { id: 3, title: 'Quiz das Capitais',                  author: 'Profª Ana Lima',  start: '08/06/2025', end: '22/06/2025', progress: 0,   listStatus: 'ativa', missionStatus: 'nao-enviada'  },
  { id: 4, title: 'Escrita Criativa',                   author: 'Profº João P.',   start: '13/06/2025', end: '18/06/2025', progress: 100, listStatus: 'ativa', missionStatus: 'finalizada'   },
  { id: 5, title: 'Fonemas e Sílabas',                  author: 'Profª Maria S.',  start: '01/06/2025', end: '07/06/2025', progress: 100, listStatus: 'arquivada', missionStatus: 'finalizada' },
  { id: 6, title: 'Adição e Subtração',                 author: 'Profº Carlos M.', start: '02/06/2025', end: '09/06/2025', progress: 100, listStatus: 'arquivada', missionStatus: 'cancelada'  },
  { id: 7, title: 'Leitura Interpretada',               author: 'Profª Ana Lima',  start: '28/05/2025', end: '04/06/2025', progress: 95,  listStatus: 'arquivada', missionStatus: 'finalizada' },
]

const filteredMissions = computed(() => {
  const tab = activeTab.value
  const s   = statusAtivo.value.id
  return allMissions.filter(m => {
    const matchTab = m.listStatus === (tab === 'ativas' ? 'ativa' : 'arquivada')
    const matchStatus = s === 'todas' || m.missionStatus === s
    return matchTab && matchStatus
  })
})

// ── Colunas da tabela (mesmo padrão de columnsDefinitions da produção) ────────
const tableColumns = [
  { key: 'title',    label: 'Nome da Missão',     sortable: true  },
  { key: 'author',   label: 'Autor',              sortable: true  },
  { key: 'start',    label: 'Início',             sortable: false },
  { key: 'end',      label: 'Fim',               sortable: false },
  { key: 'progress', label: 'Progresso da Turma', sortable: true  },
  { key: 'status',   label: 'Status',   tooltip: 'Status da missão',  sortable: false },
  { key: 'actions',  label: 'Ações',    tooltip: 'Ações disponíveis', sortable: false },
]

// ── LegendEnum — array de legendas (mesmo formato que produção) ───────────────
const progressLegends = [{
  text: 'Progresso da turma',
  enum: [
    { text: 'Finalizado ≥ 100%', color: '#14693a' },
    { text: 'Satisfatório ≥ 80%', color: '#28c76f' },
    { text: 'Moderado ≥ 50%',    color: '#ff9f43' },
    { text: 'Crítico < 50%',     color: '#ea5455' },
  ],
}]

const missionStatusLabel = {
  'nao-enviada': 'Não enviada',
  'nao-iniciada': 'Não iniciada',
  iniciada: 'Iniciada',
  finalizada: 'Finalizada',
  cancelada: 'Cancelada',
}

const statusBadgeClass = (status) => ({
  'nao-enviada': 'status-light-warning',
  'nao-iniciada': 'status-light-secondary',
  iniciada: 'status-light-success',
  finalizada: 'status-light-success',
  cancelada: 'status-light-danger',
}[status] || 'status-light-secondary')

const openMissionReport = (mission) => {
  router.push({
    name: 'ProfMissionReport',
    params: { missionId: mission.id },
    query: {
      title: mission.title,
      author: mission.author,
      start: mission.start,
      end: mission.end,
    },
  })
}

const missionActions = (mission) => [
  {
    icon: 'play_arrow',
    title: 'Enviar missão',
    class: 'text-success',
    visible: ['nao-enviada', 'nao-iniciada'].includes(mission.missionStatus),
    action: () => console.log('enviar', mission.id),
  },
  {
    icon: 'delete',
    title: 'Cancelar missão',
    class: 'text-danger',
    visible: ['nao-enviada', 'nao-iniciada'].includes(mission.missionStatus),
    action: () => console.log('cancelar', mission.id),
  },
  {
    icon: 'edit',
    title: 'Editar missão',
    class: 'text-primary',
    visible: ['nao-enviada', 'nao-iniciada'].includes(mission.missionStatus),
    action: () => console.log('editar', mission.id),
  },
  {
    icon: 'pie_chart',
    title: 'Relatório da Missão',
    class: 'text-primary',
    visible: ['iniciada', 'finalizada', 'cancelada'].includes(mission.missionStatus),
    action: () => openMissionReport(mission),
  },
  {
    icon: 'visibility',
    title: 'Detalhes',
    class: 'text-primary',
    visible: true,
    action: () => console.log('detalhes', mission.id),
  },
  {
    icon: 'share',
    title: 'Compartilhar Missão',
    class: 'text-primary',
    visible: true,
    action: () => console.log('compartilhar', mission.id),
  },
]
</script>

<template>
  <div>
    <div class="report-top-stack">
      <!-- ─ Seletor de Turma ──────────────────────────────────────────── -->
      <ClassSelector school-name="Colégio Nova Jornada" :show-school-year="false" />

      <!-- ─ Breadcrumb — 2ª linha, acima das tabs (AppBreadcrumb.vue produção) -->
      <AppBreadcrumb />
    </div>

    <!-- ─ Tabs (CSS idêntico ao TabRouter.vue de produção) ─────────── -->
    <div class="d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-md-baseline mb-0">
      <div class="tabs-row d-flex">
        <a
          v-for="(tab, index) in tabs"
          :key="tab.key"
          class="tab-link d-flex align-items-center gap-1"
          :style="`--offset: -10px; --index: ${index}; z-index: ${activeTab === tab.key ? tabs.length : tabs.length - index}`"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </a>
      </div>
    </div>
    <div class="tab-line mb-2" />

    <!-- ─ Filtros (ListMissionsFilter.vue de produção) ───────────────── -->
    <BCard class="mb-2">
      <BRow class="align-items-end g-2">
        <!-- SelectSubject — equivalente exato de produção -->
        <BCol cols="auto">
          <SelectSubject v-model="disciplinaAtiva" />
        </BCol>

        <!-- Status -->
        <BCol>
          <BFormGroup label="Status">
            <ESelect
              v-model="statusAtivo"
              :options="statusOptions"
              label="name"
              track-by="id"
              style="width:100%"
            />
          </BFormGroup>
        </BCol>

        <!-- Nova Missão -->
        <BCol md="auto" cols="12" class="ms-auto">
          <BFormGroup label="&nbsp;">
            <BButton variant="primary" class="d-flex align-items-center justify-content-center gap-1 w-100">
              <span class="material-symbols-outlined" style="font-size:14px">add_circle</span>
              Nova Missão
            </BButton>
          </BFormGroup>
        </BCol>

        <!-- Ações em lote (desabilitado se nenhuma selecionada — igual produção) -->
        <BCol md="auto" cols="12">
          <BFormGroup label="&nbsp;">
            <BDropdown
              variant="outline-primary"
              :disabled="selectedMissions.length < 1"
              text="Ações em lote"
              class="w-100 acoes-lote-dropdown"
            >
              <BDropdownItem>
                <span class="d-flex align-items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size:14px">archive</span>
                  Arquivar Missões
                </span>
              </BDropdownItem>
              <BDropdownItem>
                <span class="d-flex align-items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size:14px">cancel</span>
                  Cancelar Missões
                </span>
              </BDropdownItem>
            </BDropdown>
          </BFormGroup>
        </BCol>
      </BRow>
    </BCard>

    <!-- ─ GuidesLimitAlert — 3 layouts conforme produção ─────────────── -->
    <GuidesLimitAlert :guides-month="guidesMonth" />

    <!-- ─ ListTableSelect — equivalente exato ao componente de produção ─ -->
    <ListTableSelect
      :data-table="filteredMissions"
      :table-columns="tableColumns"
      :total-data="filteredMissions.length"
      :show-select-all="true"
      search-placeholder="Pesquisar missão..."
      @update:selected="onSelectionUpdate"
    >
      <!-- Célula: Título -->
      <template #cell(title)="{ item }">
        <span class="fw-bold text-dark">{{ item.title }}</span>
      </template>

      <!-- Célula: Autor -->
      <template #cell(author)="{ item }">
        <span class="text-muted small">{{ item.author }}</span>
      </template>

      <!-- Célula: Início -->
      <template #cell(start)="{ item }">
        <span class="text-muted small text-nowrap">{{ item.start }}</span>
      </template>

      <!-- Célula: Fim -->
      <template #cell(end)="{ item }">
        <span class="text-muted small text-nowrap">{{ item.end }}</span>
      </template>

      <!-- Célula: Progresso — ProgressBarHorizontalV2 (igual produção) -->
      <template #cell(progress)="{ item }">
        <ProgressBarHorizontalV2
          :value="item.progress"
          :max="100"
          style="min-width:130px"
        />
      </template>

      <!-- Célula: Status -->
      <template #cell(status)="{ item }">
        <span class="status-badge" :class="statusBadgeClass(item.missionStatus)">
          {{ missionStatusLabel[item.missionStatus] }}
        </span>
      </template>

      <!-- Célula: Ações inline (igual jornada produção) -->
      <template #cell(actions)="{ item }">
        <div class="row-actions">
          <button
            v-for="action in missionActions(item).filter(a => a.visible)"
            :key="`${item.id}-${action.icon}-${action.title}`"
            type="button"
            class="action-icon-btn"
            :class="action.class"
            :title="action.title"
            :aria-label="action.title"
            @click="action.action()"
          >
            <span class="material-symbols-outlined">{{ action.icon }}</span>
          </button>
        </div>
      </template>
    </ListTableSelect>

    <!-- ─ LegendEnum — equivalente exato ao componente de produção ───── -->
    <LegendEnum :legends="progressLegends" class="mt-2" />
  </div>
</template>

<style scoped>
.report-top-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

/* ── Tabs — CSS idêntico ao TabRouter.vue de produção ────────────────────── */
.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
}
.tab-link {
  display: inline-block;
  position: relative;
  padding: 14px 24px 10px 24px;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  color: #6e6b7b;
  text-decoration: none;
  background: #fff;
  transform: translateX(calc(var(--index) * var(--offset)));
  white-space: nowrap;
  font-weight: 500;
  font-size: .9rem;
  transition: background-color .15s, color .15s;
}
.tab-link:hover {
  color: #fff !important;
  background-color: #7367f0;
}
.tab-link.active {
  background: #7367f0;
  color: #fff;
  z-index: 1;
}
.tab-line {
  border: 1px solid #7367f0;
  height: 1px;
  width: 100%;
}

/* ── Ações em lote ───────────────────────────────────────────────────────── */
:deep(.acoes-lote-dropdown .dropdown-toggle) {
  width: 100%;
  justify-content: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.status-light-secondary { background: rgba(130, 134, 139, 0.18); color: var(--secondary-dark); }
.status-light-success { background: rgba(40, 199, 111, 0.16); color: var(--success-dark); }
.status-light-warning { background: rgba(255, 159, 67, 0.18); color: var(--warning-dark); }
.status-light-danger { background: rgba(234, 84, 85, 0.15); color: var(--danger-dark); }

.row-actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.action-icon-btn {
  border: none;
  background: transparent;
  padding: 0;
  line-height: 1;
}

.action-icon-btn .material-symbols-outlined {
  font-size: 18px;
}
</style>
