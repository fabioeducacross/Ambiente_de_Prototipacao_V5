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
import {
  BCard, BRow, BCol, BFormGroup, BButton,
  BDropdown, BDropdownItem, BDropdownDivider,
  BBadge,
} from 'bootstrap-vue-next'
import ClassSelector             from '@/components/calendar/ClassSelector.vue'
import AppBreadcrumb             from '@/components/AppBreadcrumb.vue'
import ESelect                   from '@/components/base/ESelect.vue'
import SelectSubject             from '@/components/base/SelectSubject.vue'
import GuidesLimitAlert          from '@/components/missions/GuidesLimitAlert.vue'
import ListTableSelect           from '@/components/table/ListTableSelect.vue'
import ProgressBarHorizontalV2   from '@/components/base/ProgressBarHorizontalV2.vue'
import LegendEnum                from '@/components/base/LegendEnum.vue'

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
  { id: 1, title: 'Interpretação de Textos — Semana 1', author: 'Profª Ana Lima',  start: '10/06/2025', end: '17/06/2025', progress: 72,  status: 'ativa'     },
  { id: 2, title: 'Tabuada do 6 e 7',                   author: 'Profº Carlos M.', start: '12/06/2025', end: '20/06/2025', progress: 48,  status: 'ativa'     },
  { id: 3, title: 'Quiz das Capitais',                   author: 'Profª Ana Lima',  start: '08/06/2025', end: '22/06/2025', progress: 85,  status: 'ativa'     },
  { id: 4, title: 'Escrita Criativa',                    author: 'Profº João P.',   start: '13/06/2025', end: '18/06/2025', progress: 30,  status: 'ativa'     },
  { id: 5, title: 'Fonemas e Sílabas',                   author: 'Profª Maria S.',  start: '01/06/2025', end: '07/06/2025', progress: 100, status: 'arquivada' },
  { id: 6, title: 'Adição e Subtração',                  author: 'Profº Carlos M.', start: '02/06/2025', end: '09/06/2025', progress: 100, status: 'arquivada' },
  { id: 7, title: 'Leitura Interpretada',                author: 'Profª Ana Lima',  start: '28/05/2025', end: '04/06/2025', progress: 95,  status: 'arquivada' },
]

const filteredMissions = computed(() => {
  const tab = activeTab.value
  const s   = statusAtivo.value.id
  return allMissions.filter(m => {
    const matchTab    = m.status === (tab === 'ativas' ? 'ativa' : 'arquivada')
    const matchStatus = s === 'todas' || m.status === s
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

// ── Status badge — espelha missionStatusEnum de produção ─────────────────────
const missionStatusMap = {
  ativa:     { variant: 'success',   label: 'Ativa'     },
  arquivada: { variant: 'secondary', label: 'Arquivada' },
  rascunho:  { variant: 'warning',   label: 'Rascunho'  },
  cancelada: { variant: 'danger',    label: 'Cancelada' },
}
const getStatusVariant = (s) => `light-${missionStatusMap[s]?.variant ?? 'secondary'}`
const getStatusLabel   = (s) => missionStatusMap[s]?.label ?? s

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

// ── Ações do dropdown de cada linha (mesmo padrão do ListMissionsList.vue) ────
const getRowActions = (mission) => [
  { label: 'Ver relatório',   icon: 'pie_chart',    action: () => console.log('relatório', mission.id)   },
  { label: 'Compartilhar',    icon: 'share',        action: () => console.log('compartilhar', mission.id) },
  { label: 'Copiar link',     icon: 'content_copy', action: () => console.log('copiar link', mission.id) },
  { divider: true },
  { label: 'Arquivar missão', icon: 'archive',      action: () => console.log('arquivar', mission.id),   class: '' },
  { label: 'Cancelar missão', icon: 'cancel',       action: () => console.log('cancelar', mission.id),  class: 'text-danger' },
]
</script>

<template>
  <div>
    <!-- ─ Seletor de Turma ──────────────────────────────────────────── -->
    <ClassSelector school-name="Colégio Nova Jornada" class="mb-2" />

    <!-- ─ Breadcrumb — 2ª linha, acima das tabs (AppBreadcrumb.vue produção) --> 
    <AppBreadcrumb class="mb-1" />

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
        <span class="fw-semibold text-dark">{{ item.title }}</span>
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

      <!-- Célula: Status — BBadge pill (mesmo padrão de produção) -->
      <template #cell(status)="{ item }">
        <BBadge pill :variant="getStatusVariant(item.status)">
          {{ getStatusLabel(item.status) }}
        </BBadge>
      </template>

      <!-- Célula: Ações — BDropdown more_vert (mesmo padrão de produção) -->
      <template #cell(actions)="{ item }">
        <BDropdown
          variant="link"
          no-caret
          toggle-class="p-0 text-muted"
        >
          <template #button-content>
            <span class="material-symbols-outlined" style="font-size:20px">more_vert</span>
          </template>
          <template v-for="action in getRowActions(item)" :key="action.label ?? 'div'">
            <BDropdownDivider v-if="action.divider" />
            <BDropdownItem
              v-else
              :class="action.class"
              @click="action.action()"
            >
              <span class="d-flex align-items-center gap-1">
                <span class="material-symbols-outlined" style="font-size:16px">{{ action.icon }}</span>
                {{ action.label }}
              </span>
            </BDropdownItem>
          </template>
        </BDropdown>
      </template>
    </ListTableSelect>

    <!-- ─ LegendEnum — equivalente exato ao componente de produção ───── -->
    <LegendEnum :legends="progressLegends" class="mt-2" />
  </div>
</template>

<style scoped>
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
</style>
