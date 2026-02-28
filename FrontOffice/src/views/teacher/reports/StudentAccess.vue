<script setup>
import { ref, computed } from 'vue'
import { BCard } from 'bootstrap-vue-next'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'

const MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
const MONTH_LABELS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const ACTIVE_MONTHS = new Set(['jan','fev'])

const students = [
  { id:  1, name: 'ALUNO EXCLUIR LISTAGEM',   lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  2, name: 'Anderson',                 lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  3, name: 'Consultor Caio',           lastAccess: '16/02/2026', monthly: { jan:0, fev:1 } },
  { id:  4, name: 'Consultor Val',            lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  5, name: 'Diego Daniel Torini',      lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  6, name: 'Domus01',                  lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  7, name: 'Felipe Zanini Fundamental',lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  8, name: 'Filhos do carlos',         lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id:  9, name: 'Francisco guerra',         lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id: 10, name: 'GabrielzinJr',             lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id: 11, name: 'Helena Braz',              lastAccess: '10/02/2026', monthly: { jan:2, fev:4 } },
  { id: 12, name: 'Igor Mendes',              lastAccess: '05/02/2026', monthly: { jan:1, fev:2 } },
  { id: 13, name: 'Juliana Costa',            lastAccess: '01/02/2026', monthly: { jan:0, fev:1 } },
  { id: 14, name: 'Kaique Silva',             lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id: 15, name: 'Larissa Nunes',            lastAccess: '14/02/2026', monthly: { jan:3, fev:5 } },
  { id: 16, name: 'Matheus Rocha',            lastAccess: null,         monthly: { jan:0, fev:0 } },
  { id: 17, name: 'Natalia Fernandes',        lastAccess: '20/02/2026', monthly: { jan:0, fev:3 } },
  { id: 18, name: 'Otavio Borges',            lastAccess: null,         monthly: { jan:0, fev:0 } },
]

const pageSizeOptions = [10, 25, 50]
const pageSize = ref(10)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(students.length / pageSize.value))
const paginated  = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return students.slice(start, start + pageSize.value)
})
const pageFrom = computed(() => (currentPage.value - 1) * pageSize.value + 1)
const pageTo   = computed(() => Math.min(currentPage.value * pageSize.value, students.length))

function goTo(p) {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p
}
function onPageSize(v) {
  pageSize.value = Number(v)
  currentPage.value = 1
}

const sortMonth = ref(null)
const sortDir   = ref('desc')
function toggleSort(m) {
  if (!ACTIVE_MONTHS.has(m)) return
  if (sortMonth.value === m) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortMonth.value = m; sortDir.value = 'desc' }
  currentPage.value = 1
}

function cellValue(student, month) {
  if (!ACTIVE_MONTHS.has(month)) return null
  return student.monthly[month] ?? 0
}

function cellClass(student, month) {
  const v = cellValue(student, month)
  if (v === null) return ''
  if (v === 0) return 'less-activity'
  return 'almost-full-activity'
}
</script>

<template>
  <section>
    <div class="report-top-stack">
      <ClassSelector school-name="Colégio Nova Jornada" />
      <AppBreadcrumb />
    </div>

    <BCard class="p-0">
      <div class="m-2">
        <!-- Info bar: ultima atualizacao + total de alunos -->
        <div class="d-flex justify-content-between align-items-center info-bar">
          <span class="text-muted info-bar-text">Última atualização: 26/02/2026</span>
          <span class="info-bar-text">
            Total de alunos na turma:
            <strong class="text-primary">{{ students.length }}</strong>
          </span>
        </div>

        <!-- Row: Mostrar -->
        <div class="row mb-1">
          <div class="d-flex align-items-center justify-content-start mb-1 mb-md-0 col-md-auto col-12">
            <label class="me-1">Mostrar</label>
            <select
              class="per-page-selector form-select d-inline-block"
              style="width: auto"
              :value="pageSize"
              @change="e => onPageSize(e.target.value)"
            >
              <option v-for="n in pageSizeOptions" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
        </div>

        <!-- Tabela -->
        <div class="table-responsive">
          <table id="table-access" role="table" aria-busy="false" class="table b-table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <div class="d-inline-flex align-items-center gap-1 fw-bolder text-uppercase">Aluno</div>
                </th>
                <th scope="col" class="whitespace-no-wrap">
                  <div class="d-inline-flex align-items-center gap-1 fw-bolder text-uppercase">Último acesso</div>
                </th>
                <th
                  v-for="(m, i) in MONTHS"
                  :key="m"
                  scope="col"
                  class="position-relative"
                  :class="{ 'sortable-col': ACTIVE_MONTHS.has(m) }"
                  :tabindex="ACTIVE_MONTHS.has(m) ? 0 : undefined"
                  @click="toggleSort(m)"
                  @keydown.enter="toggleSort(m)"
                >
                  <div class="d-inline-flex align-items-center gap-1 fw-bolder text-uppercase">
                    {{ MONTH_LABELS[i] }}
                    <span
                      class="material-symbols-outlined sort-icon"
                      :class="{ active: sortMonth === m, inactive: !ACTIVE_MONTHS.has(m) }"
                    >{{ sortMonth === m && sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="text-black">
              <tr v-for="s in paginated" :key="s.id">
                <!-- Nome -->
                <td>
                  <div>
                    <span class="font-bold text-body whitespace-no-wrap">{{ s.name }}</span>
                  </div>
                </td>
                <!-- Ultimo acesso -->
                <td class="whitespace-no-wrap">
                  <div class="text-center">
                    <span class="text-body whitespace-no-wrap">{{ s.lastAccess ?? '-' }}</span>
                  </div>
                </td>
                <!-- Celulas mensais -->
                <td
                  v-for="m in MONTHS"
                  :key="m"
                  class="position-relative"
                >
                  <div class="cell-access">
                    <div
                      class="position-absolute cell-access-content d-flex justify-content-center align-items-center"
                      :class="cellClass(s, m)"
                    >
                      <span class="text-black">{{ cellValue(s, m) ?? '-' }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginacao -->
        <div class="row mt-1 align-items-center">
          <div class="col-sm-6 col-12 d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">
              Exibindo {{ pageFrom }} a {{ pageTo }} de <strong>{{ students.length }}</strong> entradas
            </span>
          </div>
          <div class="col-sm-6 col-12 d-flex align-items-center justify-content-center justify-content-sm-end">
            <ul class="pagination mb-0">
              <li class="page-item prev-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="goTo(currentPage - 1)">
                  <span class="material-symbols-outlined" style="font-size:18px">chevron_left</span>
                </button>
              </li>
              <li
                v-for="p in totalPages"
                :key="p"
                class="page-item"
                :class="{ active: p === currentPage }"
              >
                <button class="page-link" @click="goTo(p)">{{ p }}</button>
              </li>
              <li class="page-item next-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="goTo(currentPage + 1)">
                  <span class="material-symbols-outlined" style="font-size:18px">chevron_right</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BCard>
  </section>
</template>

<style scoped>
.report-top-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

/* ── Info bar ─────────────────────────────────────── */
.info-bar {
  padding: 0.85rem 0.5rem 0.6rem;
  border-bottom: 1px solid #ebe9f1;
  margin-bottom: 0.75rem;
}

.info-bar-text {
  font-size: 0.875rem;
  color: #5e5873;
}

/* ── Helpers ─────────────────────────────────────── */
.whitespace-no-wrap { white-space: nowrap; }
.font-bold { font-weight: 700; }

/* ── Table ─────────────────────────────────────── */
#table-access th {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  padding: 0.75rem 0.5rem;
  white-space: nowrap;
  border-bottom: 2px solid #ebe9f1;
  background: #fff;
}

#table-access td {
  padding: 0;
  vertical-align: middle;
}

/* Aluno + Último acesso cells keep normal padding */
#table-access td:first-child,
#table-access td:nth-child(2) {
  padding: 0.72rem 0.75rem;
}

/* ── Sort icons (all months) ─────────────────────── */
.sortable-col { cursor: pointer; user-select: none; }
.sortable-col:hover { background: #f5f3ff; }

.sort-icon {
  font-size: 12px;
  line-height: 1;
  color: #6e6b7b;
  opacity: 0.8;
}
.sort-icon.inactive { opacity: 0.35; }
.sort-icon.active   { color: var(--primary); opacity: 1; }

/* ── Heatmap cells — exact production pattern ──────── */
.cell-access {
  position: relative;
  height: 46px; /* aligns with row height */
  margin: 0;
}

.cell-access-content {
  position: absolute;
  inset: 0;
  font-size: 0.82rem;
  font-weight: 600;
}

/* less-activity = vermelho/rosa */
.cell-access-content.less-activity {
  background-color: #ffbdbd;
  color: #333;
}

/* almost-full-activity = verde claro */
.cell-access-content.almost-full-activity {
  background-color: #b9f5cc;
  color: #333;
}

/* ── per-page select ────────────────────────────── */
.per-page-selector {
  min-width: 72px;
  font-size: 0.875rem;
  border-radius: 0.357rem;
  border-color: #d8d6de;
  padding: 0.25rem 1.8rem 0.25rem 0.6rem;
  background-size: 14px;
  color: #6e6b7b;
}

/* ── Pagination ────────────────────────────────── */
.pagination { gap: 2px; }

.page-item .page-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  color: #5e5873;
  border: none;
  background: transparent;
  border-radius: 50%;
  padding: 0;
}

.page-item.active .page-link {
  background-color: var(--primary);
  color: #fff;
}

.page-item .page-link:hover { background: #f0eeff; color: var(--primary); }
.page-item.disabled .page-link { opacity: 0.4; pointer-events: none; }

/* striped tbody rows */
#table-access.table-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: rgba(115, 103, 240, 0.02);
}
</style>
