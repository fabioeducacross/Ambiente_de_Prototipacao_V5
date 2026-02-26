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
        <h2 class="drawer-title" id="drawerTitle">{{ drawerTitle }}</h2>
        <button class="drawer-close" @click="close" type="button" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- ── Content (scrollable) ── -->
      <div class="drawer-body">

        <!-- Seção: info da missão -->
        <div class="drawer-section">
          <div class="drawer-label">Missão selecionada</div>
          <div class="drawer-mission">{{ chapter?.nome || '—' }}</div>
          <div class="drawer-meta">
            <div>Total de alunos: <strong>{{ totalStudents }}</strong></div>
            <div>Alunos na missão: <strong>{{ linkedCount }}</strong> de <strong>{{ totalStudents }}</strong></div>
          </div>
        </div>

        <!-- Seção: hint -->
        <div v-if="mode === 'enviar'" class="drawer-section drawer-section--hint">
          <div v-if="isFirstEnable" class="drawer-hint">
            <span class="material-symbols-outlined drawer-hint-icon">info</span>
            Primeiro envio desta missão: selecione os alunos para habilitar e enviar.
          </div>
          <div v-else class="drawer-hint drawer-hint--neutral">
            <span class="material-symbols-outlined drawer-hint-icon">info</span>
            Reenvio da missão: selecione os alunos para enviar novamente.
          </div>
        </div>

        <!-- Seção: período -->
        <div class="drawer-section">
          <label class="check-row">
            <input type="checkbox" v-model="periodEnabled" />
            Definir período
          </label>
          <div v-if="periodEnabled" class="drawer-date-row">
            <EDatePicker
              v-model="startDateValue"
              label="Data de início"
              placeholder="Selecione a data de início"
              input-id="dataInicio"
              :clearable="true"
            />
            <EDatePicker
              v-model="endDateValue"
              label="Data de término"
              placeholder="Selecione a data de término"
              input-id="dataTermino"
              :clearable="true"
            />
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
        <div class="drawer-footer-actions">
          <EButton variant="outline-primary" @click="close">
            Fechar
          </EButton>
          <EButton
            :variant="mode === 'desvincular' ? 'danger' : 'primary'"
            :disabled="isActionDisabled"
            :title="actionTooltip"
            @click="confirm"
          >
            {{ actionLabel }}
          </EButton>
        </div>
      </footer>

    </aside>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted, onUnmounted } from 'vue'
import { useTrilhasAZ } from '../composables/useTrilhasAZ.js'
import EDatePicker from '@/shared/components/base/EDatePicker.vue'
import EButton from '@/shared/components/base/EButton.vue'

const {
  students,
  vincularAlunos,
  desvincularAlunos,
  habilitarCapitulo,
  togglePeriod,
  setEndDate,
  getTotalStudents,
  getLinkedCount
} = useTrilhasAZ()

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  chapter:    { type: Object, default: null },
  mode:       { type: String, default: 'enviar' }, // 'enviar' | 'desvincular'
  isFirstEnable: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

// ── Estado interno ────────────────────────────────────────────────────────────
const searchQuery    = ref('')
const selectedIds    = reactive(new Set())
const periodEnabled  = ref(false)
const startDateValue = ref('')
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
    startDateValue.value = props.chapter?.inicio ?? ''
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

/**
 * Converte data de d/m/Y (formato flatpickr) para ISO YYYY-MM-DD
 * que é o formato esperado por isFutureISO no composable.
 */
function toISO(val) {
  if (!val) return null
  // Já está em ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  // Converte d/m/Y → Y-m-d
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(val)
  if (match) return `${match[3]}-${match[2]}-${match[1]}`
  return val
}

watch(endDateValue, (val) => {
  if (props.chapter) {
    setEndDate(props.chapter.id, toISO(val))
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
 *   - Desvincular: mostra os ENVIADOS (vinculados)
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
// Bloqueio apenas quando não há alunos elegíveis — seleção não é obrigatória.
// Sem seleção explícita, a ação é aplicada a todos os elegíveis.
const isActionDisabled = computed(() => eligibleStudents.value.length === 0)

const actionTooltip = computed(() => {
  if (eligibleStudents.value.length === 0) {
    return props.mode === 'enviar'
      ? 'Não há alunos para enviar'
      : 'Não há alunos para desvincular'
  }
  return ''
})

const drawerTitle = computed(() => {
  if (props.mode === 'desvincular') return 'Desvincular alunos da missão'
  return props.isFirstEnable ? 'Habilitar e enviar missão em lote' : 'Enviar missão em lote'
})

const actionLabel = computed(() => {
  if (props.mode === 'desvincular') return 'Desvincular'
  return 'Enviar'
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

  const hasSelection = eligibleStudents.value.some(s => selectedIds.has(s.id))

  if (props.mode === 'enviar') {
    // Habilita o capítulo na primeira vez (ou reenvio)
    if (props.isFirstEnable) habilitarCapitulo(props.chapter.id)

    if (hasSelection) {
      // Alunos explicitamente selecionados → vincula e inicia simulação
      const ids = eligibleStudents.value
        .filter(s => selectedIds.has(s.id))
        .map(s => s.id)
      vincularAlunos(
        props.chapter.id,
        ids,
        periodEnabled.value && endDateValue.value ? toISO(endDateValue.value) : null,
        periodEnabled.value && startDateValue.value ? toISO(startDateValue.value) : null
      )
    }
    // Sem seleção → capítulo habilitado, ninguém vinculado → NÃO INICIADA
  } else {
    // Modo desvincular: selecionados ou todos os elegíveis se nenhum marcado
    const ids = hasSelection
      ? eligibleStudents.value.filter(s => selectedIds.has(s.id)).map(s => s.id)
      : eligibleStudents.value.map(s => s.id)
    if (ids.length === 0) return
    desvincularAlunos(props.chapter.id, ids)
  }

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
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* ── Drawer panel ─────────────────────────────────────────────────────────── */
.tz-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 90vw;
  background: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
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
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  flex-shrink: 0;
}

.drawer-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #6c757d;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  padding: 0;
}

.drawer-close i {
  font-size: 16px;
}

.drawer-close:hover {
  background-color: #f8f9fa;
  color: #2c3e50;
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
.drawer-body {
  flex: 1;
  min-height: 0;
  overflow-y: scroll;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* Gradiente no final para indicar que há mais conteúdo */
  background:
    linear-gradient(white 30%, transparent) center top,
    linear-gradient(transparent, white 70%) center bottom,
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.08), transparent) center top,
    radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.08), transparent) center bottom;
  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 12px, 100% 12px;
  background-attachment: local, local, scroll, scroll;
}

/* ── Seções flat (padrão Vuexy customizer-section) ───────────────────────── */
.drawer-section {
  padding-bottom: 12px;
  border-bottom: 1px solid #ebe9f1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-section--hint {
  padding-top: 0;
  border-bottom: none;
  padding-bottom: 0;
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
  font-weight: 600;
  color: #2c3e50;
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
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(110, 99, 232, 0.08);
  color: #6e63e8;
  font-size: 12px;
  font-weight: 600;
}

.drawer-hint-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.drawer-hint--neutral {
  background: rgba(0, 207, 232, 0.08);
  color: #00cfe8;
}

/* ── Período ──────────────────────────────────────────────────────────────── */
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
  flex-direction: column;
  gap: 12px;
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
  color: #6e6b7b;
  background: transparent;
}

.search-input::placeholder {
  color: #b4b7bd;
}

/* ── Tabela de alunos ─────────────────────────────────────────────────────── */
.drawer-table-wrap {
  min-height: 160px;
  max-height: min(300px, 38vh);
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
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  background: #fff;
  flex-shrink: 0;
}

.drawer-footer-actions {
  display: flex;
  gap: 12px;
}

.drawer-footer-actions .e-button {
  flex: 1;
}

/* ── Transitions ──────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from,
.slide-leave-to     { transform: translateX(100%); }

/* ── Scrollbar ────────────────────────────────────────────────────────────── */
.drawer-body::-webkit-scrollbar {
  width: 6px;
}

.drawer-body::-webkit-scrollbar-track {
  background: transparent;
}

.drawer-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.drawer-body::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .tz-drawer {
    width: 100%;
    max-width: 100%;
  }

  .drawer-header {
    padding: 16px;
  }

  .drawer-body {
    padding: 16px;
  }

  .drawer-footer {
    padding: 12px 16px;
  }
}
</style>
