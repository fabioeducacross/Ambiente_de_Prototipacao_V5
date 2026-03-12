<script setup>
/**
 * ListTableSelect — componente composto canônico com convergência mínima
 * do modo tabela da baseline de produção.
 *
 * Contrato mínimo publicado nesta etapa:
 *   :data-table      → array de dados
 *   :table-columns   → [{ key, label, sortable?, labelClass?, tooltip? }]
 *   :total-data      → total de registros (para paginação)
 *   :loading         → boolean skeleton
 *   :card-class      → string extra no BCard
 *   :empty-text      → texto do empty state
 *   :show-select-all → habilita coluna de seleção
 *   :show-search     → controla a visibilidade da busca
 *   :show-search-query-input → alias explícito de compatibilidade para show-search
 *   :search-placeholder
 *   :selected        → seleção controlada externamente
 *
 * Emits:
 *   update:selected   → array de itens selecionados
 *   page-change       → número da nova página
 *   sort-change       → { sortBy, sortDesc }
 *   search-change     → string de busca
 *
 * Slots de célula (mesmo padrão BTable da produção):
 *   #cell(fieldKey)="{ item, value, index }"
 *
 * Slot empty:
 *   #empty
 */
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { BCard, BRow, BCol } from 'bootstrap-vue-next'
import ESelect from '@/components/base/ESelect.vue'

const instance = getCurrentInstance()

// ────────────────────────────────────────────────────────────────────────────
// Props
// ────────────────────────────────────────────────────────────────────────────
const props = defineProps({
  dataTable:         { type: Array,   default: () => [] },
  tableColumns:      { type: Array,   default: () => [] },
  totalData:         { type: Number,  default: 0 },
  loading:           { type: Boolean, default: false },
  cardClass:         { type: String,  default: '' },
  emptyText:         { type: String,  default: 'Não há dados para exibir.' },
  showSelectAll:     { type: Boolean, default: true },
  showSearch:        { type: Boolean, default: true },
  showSearchQueryInput: { type: Boolean, default: null },
  searchPlaceholder: { type: String,  default: 'Pesquisar...' },
  selected:          { type: Array,   default: () => [] },
})

const emit = defineEmits(['update:selected', 'page-change', 'sort-change', 'search-change'])

// ────────────────────────────────────────────────────────────────────────────
// Per-page
// ────────────────────────────────────────────────────────────────────────────
const PER_PAGE_OPTIONS = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
]
const perPage = ref(PER_PAGE_OPTIONS[0])

// ────────────────────────────────────────────────────────────────────────────
// Search
// ────────────────────────────────────────────────────────────────────────────
const searchQuery = ref('')
let searchDebounce = null
const onSearchInput = (e) => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    emit('search-change', searchQuery.value)
  }, 400)
}

// ────────────────────────────────────────────────────────────────────────────
// Sorting
// ────────────────────────────────────────────────────────────────────────────
const sortColumn = ref('')
const sortDesc   = ref(false)

const hasExplicitShowSearch = computed(() => {
  const vnodeProps = instance?.vnode.props ?? {}

  return Object.prototype.hasOwnProperty.call(vnodeProps, 'showSearch')
    || Object.prototype.hasOwnProperty.call(vnodeProps, 'show-search')
})

const effectiveShowSearch = computed(() => {
  if (hasExplicitShowSearch.value) {
    return props.showSearch
  }

  if (props.showSearchQueryInput !== null) {
    return props.showSearchQueryInput
  }

  return props.showSearch
})

const sortBy = (col) => {
  if (sortColumn.value === col.key) {
    sortDesc.value = !sortDesc.value
  } else {
    sortColumn.value = col.key
    sortDesc.value   = false
  }
  emit('sort-change', { sortBy: sortColumn.value, sortDesc: sortDesc.value })
}

// ────────────────────────────────────────────────────────────────────────────
// Selection
// ────────────────────────────────────────────────────────────────────────────
const selectedKeys = ref(new Set())
const transientItemKeys = new WeakMap()
let transientItemKeySeed = 0

const itemKey = (item) => {
  if (item && typeof item === 'object') {
    if (item.id !== undefined && item.id !== null) {
      return item.id
    }

    if (!transientItemKeys.has(item)) {
      transientItemKeys.set(item, `row-${transientItemKeySeed++}`)
    }

    return transientItemKeys.get(item)
  }

  return String(item)
}

const selectedItems = computed(() =>
  props.dataTable.filter((item) => selectedKeys.value.has(itemKey(item)))
)

watch(selectedItems, (val) => emit('update:selected', val))

watch(() => props.selected, (nextSelected) => {
  const nextKeys = new Set(
    (nextSelected || []).map((item) => itemKey(item))
  )

  selectedKeys.value = nextKeys
}, { immediate: true, deep: true })

const toggleItem = (item) => {
  const key = itemKey(item)
  if (selectedKeys.value.has(key)) {
    selectedKeys.value.delete(key)
  } else {
    selectedKeys.value.add(key)
  }
  selectedKeys.value = new Set(selectedKeys.value)
}

const onRowClick = (item) => {
  toggleItem(item)
}

const isPageSelected = computed(() => {
  if (!paginatedData.value.length) return false
  return paginatedData.value.every((item) => selectedKeys.value.has(itemKey(item)))
})

const isSelectAll = ref(false)

const toggleSelectAll = () => {
  if (selectedKeys.value.size === props.dataTable.length) {
    selectedKeys.value = new Set()
    isSelectAll.value = false
  } else {
    selectedKeys.value = new Set(props.dataTable.map((item) => itemKey(item)))
    isSelectAll.value = true
  }
}

const toggleSelectPage = () => {
  const newSet = new Set(selectedKeys.value)
  if (isPageSelected.value) {
    paginatedData.value.forEach((item) => newSet.delete(itemKey(item)))
  } else {
    paginatedData.value.forEach((item) => newSet.add(itemKey(item)))
  }
  selectedKeys.value = newSet
}

// ────────────────────────────────────────────────────────────────────────────
// Pagination
// ────────────────────────────────────────────────────────────────────────────
const currentPage = ref(1)

const effectiveTotal = computed(() => (
  searchQuery.value ? filteredData.value.length : (props.totalData || filteredData.value.length)
))

const totalPages = computed(() =>
  Math.max(1, Math.ceil(effectiveTotal.value / perPage.value.value))
)

const paginationStart = computed(() =>
  effectiveTotal.value === 0
    ? 0
    : Math.min((currentPage.value - 1) * perPage.value.value + 1, effectiveTotal.value)
)
const paginationEnd = computed(() =>
  effectiveTotal.value === 0
    ? 0
    : Math.min(currentPage.value * perPage.value.value, effectiveTotal.value)
)

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  emit('page-change', page)
}

// Reset to page 1 when per-page changes
watch(perPage, () => { currentPage.value = 1 })
watch(searchQuery, () => { currentPage.value = 1 })
watch([sortColumn, sortDesc], () => { currentPage.value = 1 })
watch(totalPages, (nextTotalPages) => {
  if (currentPage.value > nextTotalPages) {
    currentPage.value = nextTotalPages
  }
})

// Visible page buttons (max 5 + ellipsis)
const visiblePages = computed(() => {
  const total = totalPages.value
  const cur   = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  if (cur <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i)
    pages.push('…')
    pages.push(total)
  } else if (cur >= total - 3) {
    pages.push(1)
    pages.push('…')
    for (let i = total - 4; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    pages.push('…')
    for (let i = cur - 1; i <= cur + 1; i++) pages.push(i)
    pages.push('…')
    pages.push(total)
  }
  return pages
})

// ────────────────────────────────────────────────────────────────────────────
// Data pipeline: sort → filter local → paginate
// ────────────────────────────────────────────────────────────────────────────
const sortedData = computed(() => {
  const data = [...props.dataTable]
  if (!sortColumn.value) return data
  return data.sort((a, b) => {
    const av = a[sortColumn.value]
    const bv = b[sortColumn.value]
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
    return sortDesc.value ? -cmp : cmp
  })
})

const filteredData = computed(() => {
  if (!searchQuery.value) return sortedData.value
  const q = searchQuery.value.toLowerCase()
  return sortedData.value.filter(item =>
    Object.values(item).some(v => String(v ?? '').toLowerCase().includes(q))
  )
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value.value
  return filteredData.value.slice(start, start + perPage.value.value)
})
</script>

<template>
  <BCard no-body :class="cardClass">
    <!-- ─── Toolbar: per-page + search ─────────────────────────────────── -->
    <BRow class="p-2 align-items-center">
      <BCol cols="12" md="auto" class="d-flex align-items-center gap-2 mb-1 mb-md-0">
        <span class="toolbar-label">Mostrar</span>
        <ESelect
          v-model="perPage"
          :options="PER_PAGE_OPTIONS"
          label="label"
          track-by="value"
          :clearable="false"
          :searchable="false"
          style="width:80px"
        />
      </BCol>

      <BCol cols="12" md>
        <div class="d-flex justify-content-end">
          <div v-if="effectiveShowSearch" class="input-group toolbar-search-wrap" style="max-width:420px">
            <span class="input-group-text bg-transparent toolbar-search-icon-wrap">
              <span class="material-symbols-outlined toolbar-search-icon">search</span>
            </span>
            <input
              v-model="searchQuery"
              type="search"
              class="form-control border-start-0 toolbar-search-input"
              :placeholder="searchPlaceholder"
              @input="onSearchInput"
            />
          </div>
        </div>
      </BCol>
    </BRow>

    <!-- ─── Select-all row (selectAll-container — igual produção) ───────── -->
    <div v-if="showSelectAll" class="selectAll-container">
      <label class="d-flex align-items-center gap-2 cursor-pointer mb-0" style="user-select:none">
        <input
          type="checkbox"
          class="form-check-input mt-0"
          :checked="selectedKeys.size === dataTable.length && dataTable.length > 0"
          :disabled="dataTable.length < 1"
          @change="toggleSelectAll"
        />
        <span>Selecionar toda a tabela</span>
      </label>
      <span v-if="selectedItems.length > 0" class="text-primary small">
        Selecionados: <strong class="text-primary">{{ selectedItems.length }}</strong>
      </span>
    </div>

    <!-- ─── Skeleton ────────────────────────────────────────────────────── -->
    <div v-if="loading" class="p-3">
      <div
        v-for="i in perPage.value"
        :key="i"
        class="skeleton-row mb-2"
      />
    </div>

    <!-- ─── Table ───────────────────────────────────────────────────────── -->
    <div v-else class="table-responsive">
      <table class="table table-hover mb-0 align-middle">
        <thead>
          <tr>
            <!-- Checkbox de página -->
            <th v-if="showSelectAll" class="ps-2 select-col">
              <input
                type="checkbox"
                class="form-check-input"
                :checked="isPageSelected"
                @change="toggleSelectPage"
              />
            </th>

            <th
              v-for="col in tableColumns"
              :key="col.key"
              :class="[col.labelClass, col.sortable ? 'sortable-th' : '']"
              @click="col.sortable ? sortBy(col) : null"
            >
              <div class="d-inline-flex align-items-center gap-1 header-label">
                {{ col.label }}
                <span v-if="col.tooltip" class="material-symbols-outlined" style="font-size:14px" :title="col.tooltip">info</span>
                <span v-if="col.sortable" class="material-symbols-outlined sort-icon" style="font-size:14px">
                  {{ sortColumn === col.key ? (sortDesc ? 'arrow_downward' : 'arrow_upward') : 'unfold_more' }}
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Empty state -->
          <tr v-if="paginatedData.length === 0">
            <td :colspan="tableColumns.length + (showSelectAll ? 1 : 0)" class="text-center py-5">
              <slot name="empty">
                <div class="d-flex flex-column align-items-center">
                  <img
                    src="@/assets/images/belinha/confusion.svg"
                    alt="Sem dados"
                    class="mb-1"
                  />
                  <span class="text-center text-primary fw-bold empty-text-label">{{ emptyText }}</span>
                </div>
              </slot>
            </td>
          </tr>

          <tr
            v-for="(item, rowIndex) in paginatedData"
            :key="itemKey(item)"
            :class="{ 'row-selected': selectedKeys.has(itemKey(item)) }"
          >
            <td v-if="showSelectAll" class="ps-2">
              <input
                type="checkbox"
                class="form-check-input"
                :checked="selectedKeys.has(itemKey(item))"
                @change="toggleItem(item)"
                @click.stop
              />
            </td>

            <td v-for="col in tableColumns" :key="col.key">
              <slot :name="`cell(${col.key})`" :item="item" :value="item[col.key]" :index="rowIndex">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ─── Pagination ──────────────────────────────────────────────────── -->
    <div
      v-if="effectiveTotal > 0"
      class="d-flex align-items-center justify-content-between px-2 py-2 flex-wrap gap-1"
    >
      <span class="text-muted small">
        Exibindo {{ paginationStart }}–{{ paginationEnd }} de {{ effectiveTotal }}
      </span>

      <nav v-if="totalPages > 1" aria-label="Paginação">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Anterior">
              &lsaquo;
            </button>
          </li>
          <li
            v-for="(page, idx) in visiblePages"
            :key="`page-${idx}`"
            class="page-item"
            :class="{ active: page === currentPage, disabled: page === '…' }"
          >
            <button class="page-link" @click="page !== '…' && changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Próximo">
              &rsaquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </BCard>
</template>

<style scoped>
/* ── Cabeçalho da tabela ─────────────────────────────────────────────────── */
.header-label {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: #4b4b6a;
  letter-spacing: .04em;
  text-transform: uppercase;
  white-space: nowrap;
}
th {
  border-bottom: 2px solid #ebe9f1;
  background: #fff;
  padding: 1rem .85rem;
  vertical-align: middle;
}
.selectAll-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #ebe9f1;
  padding: .875rem 1.175rem;
  font-size: .875rem;
}
td {
  font-size: var(--font-size-lg);
  color: #6e6b7b;
  border-bottom: 1px solid #f3f2f7;
  padding: 1.1rem .85rem;
}
tbody tr:last-child td {
  border-bottom: none;
}
.select-col { width: 40px; }

.toolbar-label {
  font-size: var(--font-size-lg);
  color: #5e5873;
  font-weight: 500;
}

.toolbar-search-wrap {
  min-height: 44px;
}

.toolbar-search-icon-wrap {
  border-right: 0;
}

.toolbar-search-input {
  min-height: 44px;
}

.toolbar-search-icon {
  font-size: 20px;
  color: #b9b9c3;
}

/* ── Sorting ─────────────────────────────────────────────────────────────── */
.sortable-th { cursor: pointer; }
.sortable-th:hover .sort-icon { color: #7367f0; }
.sort-icon { color: #c4c4c4; transition: color .15s; }

/* ── Linha selecionada ───────────────────────────────────────────────────── */
.row-selected td { background: rgba(115, 103, 240, .06) !important; }

/* ── Skeleton animation ──────────────────────────────────────────────────── */
.skeleton-row {
  height: 38px;
  background: linear-gradient(90deg, #f3f2f7 25%, #eae8f0 50%, #f3f2f7 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: skeleton-sweep 1.5s infinite;
}
@keyframes skeleton-sweep {
  0%   { background-position: 200% 0 }
  100% { background-position: -200% 0 }
}

/* ── Paginação ───────────────────────────────────────────────────────────── */
.pagination .page-item.active .page-link {
  background-color: #7367f0;
  border-color: #7367f0;
}
.pagination .page-link {
  color: #7367f0;
}

.empty-text-label {
  white-space: pre-line;
}
</style>
