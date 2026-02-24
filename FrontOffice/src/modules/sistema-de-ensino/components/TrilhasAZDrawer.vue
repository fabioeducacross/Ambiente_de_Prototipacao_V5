<template>
  <!-- Overlay / Backdrop -->
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="drawer-overlay"
      @click="close"
    ></div>
  </Transition>

  <!-- Drawer panel -->
  <Transition name="slide">
    <aside v-if="modelValue" class="tz-drawer" role="dialog" aria-modal="true" :aria-labelledby="'drawerTitle'">

      <!-- ── Header ── -->
      <header class="drawer-header">
        <div class="drawer-title" id="drawerTitle">
          {{ drawerTitle }}
        </div>
        <button class="drawer-close" @click="close" type="button" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </header>

      <!-- ── Content (scrollable) ── -->
      <div class="drawer-body">

        <!-- Card: info da missão, contadores e período -->
        <div class="drawer-card">
          <div class="drawer-label">Missão selecionada</div>
          <div class="drawer-mission">{{ chapter?.nome || '—' }}</div>

          <div class="drawer-meta">
            <div>Total de alunos: <strong>{{ totalStudents }}</strong></div>
            <div>Alunos na missão: <strong>{{ linkedCount }}</strong> de <strong>{{ totalStudents }}</strong></div>
          </div>

          <div v-if="isFirstEnable && mode === 'enviar'" class="drawer-hint">
            Primeiro envio desta missão: selecione os alunos para habilitar e enviar.
          </div>

          <div v-else-if="mode === 'enviar'" class="drawer-hint drawer-hint--neutral">
            Reenvio da missão: selecione os alunos para enviar novamente.
          </div>

          <!-- Período -->
          <div class="drawer-periodo">
            <label class="check-row">
              <input type="checkbox" v-model="periodEnabled" />
              Definir período
            </label>

            <div v-if="periodEnabled" class="drawer-date-row">
              <div class="date-field">
                <span class="field-label">Data de fim</span>
                <input type="date" v-model="endDateValue" class="date-input" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filtro por nome -->
        <div class="drawer-filters">
          <div class="drawer-search">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="search-svg">
              <path d="M10 18a8 8 0 1 1 5.3-14A8 8 0 0 1 10 18Z"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Filtrar por nome" class="search-input" />
          </div>
        </div>

        <!-- Tabela de alunos -->
        <div class="drawer-table-wrap">
          <table class="drawer-table">
            <thead>
              <tr>
                <th style="width:48px;">
                  <input
                    type="checkbox"
                    :checked="allSelected"
                    :indeterminate.prop="someSelected && !allSelected"
                    @change="toggleAll"
                    aria-label="Selecionar todos"
                  />
                </th>
                <th>Alunos</th>
                <th style="width:160px;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in filteredStudents" :key="student.id">
                <td>
                  <input
                    type="checkbox"
                    :checked="selectedIds.has(student.id)"
                    @change="toggleStudent(student.id)"
                    :aria-label="'Selecionar ' + student.name"
                  />
                </td>
                <td><strong>{{ student.name }}</strong></td>
                <td>
                  <span class="status-pill" :class="{ 'status-pill--sent': student.isLinked }">
                    {{ student.isLinked ? 'Enviada' : 'Não enviada' }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredStudents.length === 0">
                <td colspan="3" class="no-students">Nenhum aluno encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ── Footer fixo ── -->
      <footer class="drawer-footer">
        <button
          class="drawer-action-btn"
          :class="{ 'is-disabled': isActionDisabled }"
          :title="actionTooltip"
          :aria-disabled="isActionDisabled"
          @click="confirm"
        >
          {{ actionLabel }}
        </button>
      </footer>

    </aside>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted, onUnmounted } from 'vue'
import { useTrilhasAZ } from '../composables/useTrilhasAZ.js'

const {
  students,
  vincularAlunos,
  pausarAlunos,
  habilitarCapitulo,
  togglePeriod,
  setEndDate,
  getTotalStudents,
  getLinkedCount
} = useTrilhasAZ()

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  chapter:    { type: Object, default: null },
  mode:       { type: String, default: 'enviar' }, // 'enviar' | 'pausar'
  isFirstEnable: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

// ── Estado interno ────────────────────────────────────────────────────────────
const searchQuery    = ref('')
const selectedIds    = reactive(new Set())
const periodEnabled  = ref(false)
const endDateValue   = ref('')

// ── Contadores ────────────────────────────────────────────────────────────────
const totalStudents = computed(() => getTotalStudents())
const linkedCount   = computed(() => props.chapter ? getLinkedCount(props.chapter.id) : 0)

// ── Reset ao abrir ────────────────────────────────────────────────────────────
watch(() => props.modelValue, (open) => {
  if (open) {
    searchQuery.value    = ''
    selectedIds.clear()
    periodEnabled.value  = props.chapter?.periodEnabled ?? false
    endDateValue.value   = props.chapter?.fim ?? ''
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// ── Propagar alterações de período e data para o state ────────────────────────
watch(periodEnabled, (val) => {
  if (props.chapter) {
    togglePeriod(props.chapter.id, val)
  }
})

watch(endDateValue, (val) => {
  if (props.chapter) {
    setEndDate(props.chapter.id, val)
  }
})

// ── Lista de alunos elegíveis ─────────────────────────────────────────────────
/**
 * Alunos com flag de status (isLinked).
 */
const allStudentsWithStatus = computed(() => {
  if (!props.chapter) return []

  return students.map(student => {
    const entry = props.chapter.studentsData?.find(sd => sd.studentId === student.id)
    return {
      ...student,
      isLinked: entry ? entry.isLinked : false
    }
  })
})

/**
 * Alunos elegíveis para a ação:
 *   - Enviar: mostra os NÃO enviados (não vinculados)
 *   - Pausar: mostra os ENVIADOS (vinculados)
 */
const eligibleStudents = computed(() => {
  if (props.mode === 'enviar') {
    if (props.chapter?.status?.key === 'finalizada') {
      return allStudentsWithStatus.value
    }
    return allStudentsWithStatus.value.filter(s => !s.isLinked)
  }
  return allStudentsWithStatus.value.filter(s => s.isLinked)
})

/** Alunos filtrados pelo campo de busca */
const filteredStudents = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  const base = eligibleStudents.value
  if (!q) return base
  return base.filter(s => s.name.toLowerCase().includes(q))
})

// ── Select All ────────────────────────────────────────────────────────────────
const allSelected = computed(() =>
  filteredStudents.value.length > 0 &&
  filteredStudents.value.every(s => selectedIds.has(s.id))
)

const someSelected = computed(() =>
  filteredStudents.value.some(s => selectedIds.has(s.id))
)

// ── Estado do botão de ação ───────────────────────────────────────────────────
const isActionDisabled = computed(() => {
  if (eligibleStudents.value.length === 0) return true
  const selectedCount = eligibleStudents.value.filter(s => selectedIds.has(s.id)).length
  return selectedCount === 0
})

const actionTooltip = computed(() => {
  if (eligibleStudents.value.length === 0) {
    return props.mode === 'enviar'
      ? 'Não há alunos para enviar'
      : 'Não há alunos para pausar'
  }
  const selectedCount = eligibleStudents.value.filter(s => selectedIds.has(s.id)).length
  if (selectedCount === 0) return 'Selecione alunos'
  return ''
})

const drawerTitle = computed(() => {
  if (props.mode === 'pausar') return 'Pausar missão em lote'
  return props.isFirstEnable ? 'Habilitar e enviar missão em lote' : 'Enviar missão em lote'
})

const actionLabel = computed(() => {
  if (props.mode === 'pausar') return 'Pausar'
  return props.isFirstEnable ? 'Habilitar e enviar' : 'Enviar'
})

// ── Métodos ───────────────────────────────────────────────────────────────────
function toggleStudent (id) {
  if (selectedIds.has(id)) {
    selectedIds.delete(id)
  } else {
    selectedIds.add(id)
  }
}

function toggleAll () {
  if (allSelected.value) {
    filteredStudents.value.forEach(s => selectedIds.delete(s.id))
  } else {
    filteredStudents.value.forEach(s => selectedIds.add(s.id))
  }
}

function confirm () {
  if (isActionDisabled.value) return

  const ids = eligibleStudents.value
    .filter(s => selectedIds.has(s.id))
    .map(s => s.id)

  if (ids.length === 0) return

  if (props.mode === 'enviar') {
    // Habilita o capítulo na primeira vez, apenas ao confirmar o envio
    if (props.isFirstEnable) habilitarCapitulo(props.chapter.id)
    vincularAlunos(
      props.chapter.id,
      ids,
      periodEnabled.value && endDateValue.value ? endDateValue.value : null
    )
  } else {
    pausarAlunos(props.chapter.id, ids)
  }

  // Limpar seleção (state é reativo — lista se atualiza automaticamente)
  selectedIds.clear()
  close()
}

function close () {
  emit('update:modelValue', false)
}

// ── Fechar com Escape ─────────────────────────────────────────────────────────
function onKeydown (e) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ── Overlay ────────────────────────────────────────────────────────────── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* ── Drawer panel ─────────────────────────────────────────────────────────── */
.tz-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 460px;
  max-width: 92vw;
  background: #fff;
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.14);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

/* ── Header ───────────────────────────────────────────────────────────────── */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #ebe9f1;
  flex-shrink: 0;
}

.drawer-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #2c2c2c;
}

.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 24px;
  color: #6e6b7b;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s;
  padding: 0;
  line-height: 1;
}

.drawer-close:hover {
  background: #f8f7ff;
  color: #2c2c2c;
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Card info missão ─────────────────────────────────────────────────────── */
.drawer-card {
  background: #f9f9fb;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.drawer-label {
  font-size: 12px;
  font-weight: 600;
  color: #b4b7bd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.drawer-mission {
  font-size: 15px;
  font-weight: 700;
  color: #2c2c2c;
}

.drawer-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #6e6b7b;
}

.drawer-meta strong {
  font-weight: 700;
  color: #2c2c2c;
}

.drawer-hint {
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(110, 99, 232, 0.08);
  color: #6e63e8;
  font-size: 12px;
  font-weight: 600;
}

.drawer-hint--neutral {
  background: rgba(0, 207, 232, 0.08);
  color: #00cfe8;
}

/* ── Período ──────────────────────────────────────────────────────────────── */
.drawer-periodo {
  border-top: 1px solid #ebe9f1;
  padding-top: 12px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  font-weight: 600;
  color: #5e5873;
}

.check-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #6e63e8;
  cursor: pointer;
}

.drawer-date-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: #5e5873;
}

.date-input {
  width: 100%;
  padding: 7px 12px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  font-size: 13px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.date-input:focus {
  border-color: #6e63e8;
}

/* ── Filtro ────────────────────────────────────────────────────────────────── */
.drawer-filters {
  display: flex;
}

.drawer-search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  padding: 0 12px;
  background: #fff;
  transition: border-color 0.15s;
}

.drawer-search:focus-within {
  border-color: #6e63e8;
}

.search-svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #b4b7bd;
  stroke-width: 2;
  stroke-linecap: round;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  padding: 8px 0;
  font-size: 13px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  background: transparent;
}

.search-input::placeholder {
  color: #b4b7bd;
}

/* ── Tabela de alunos ─────────────────────────────────────────────────────── */
.drawer-table-wrap {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #ebe9f1;
  border-radius: 6px;
}

.drawer-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.drawer-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f9f9fb;
}

.drawer-table th {
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6e6b7b;
  border-bottom: 1px solid #ebe9f1;
  text-align: left;
}

.drawer-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #f5f5f5;
  color: #5e5873;
}

.drawer-table tbody tr:hover {
  background: #f8f7ff;
}

.drawer-table input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #6e63e8;
  cursor: pointer;
}

.no-students {
  text-align: center;
  color: #b4b7bd;
  padding: 24px !important;
}

/* ── Status pill ──────────────────────────────────────────────────────────── */
.status-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 50rem;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: #f0f0f2;
  color: #888;
}

.status-pill--sent {
  background: rgba(40, 199, 111, 0.12);
  color: #28c76f;
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #ebe9f1;
  background: #fff;
  flex-shrink: 0;
}

.drawer-action-btn {
  padding: 10px 28px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #fff;
  background: #6e63e8;
  cursor: pointer;
  transition: all 0.15s;
}

.drawer-action-btn:hover:not(.is-disabled) {
  background: #5a50d6;
}

.drawer-action-btn.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Transitions ──────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from,
.slide-leave-to     { transform: translateX(100%); }
</style>
