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
    <aside v-if="modelValue" class="tz-drawer">

      <!-- ── Header ── -->
      <header class="drawer-header">
        <div class="drawer-title-wrap">
          <span class="drawer-mode-badge" :style="{ backgroundColor: modeColor }">
            <i :class="modeIcon"></i>
          </span>
          <h2 class="drawer-title">{{ drawerTitle }}</h2>
        </div>
        <button class="btn-close" @click="close" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- ── Content (scrollable) ── -->
      <div class="drawer-content">

        <!-- Info do capítulo -->
        <div class="chapter-info" v-if="chapter">
          <i class="bi bi-book"></i>
          <span>{{ chapter.nome }}</span>
        </div>

        <!-- Buscador -->
        <div class="search-wrap">
          <i class="bi bi-search search-icon"></i>
          <EInput
            v-model="searchQuery"
            placeholder="Buscar aluno..."
            size="small"
            class="search-input"
          />
        </div>

        <!-- Controles da lista -->
        <div class="list-controls">
          <label class="checkbox-master">
            <input
              type="checkbox"
              :checked="allSelected"
              :indeterminate.prop="someSelected && !allSelected"
              @change="toggleAll"
            />
            <span class="chk-label">
              {{ allSelected ? 'Desmarcar todos' : 'Selecionar todos' }}
              <span class="count-badge">{{ displayedStudents.length }}</span>
            </span>
          </label>
          <span class="selected-count" v-if="selectedIds.length > 0">
            {{ selectedIds.length }} selecionado(s)
          </span>
        </div>

        <!-- Lista de alunos -->
        <ul class="student-list">
          <li
            v-for="student in displayedStudents"
            :key="student.id"
            class="student-item"
            :class="{ selected: selectedIds.includes(student.id) }"
            @click="toggleStudent(student.id)"
          >
            <input
              type="checkbox"
              :checked="selectedIds.includes(student.id)"
              @click.stop
              @change="toggleStudent(student.id)"
            />
            <div class="student-avatar" :style="{ backgroundColor: avatarColor(student.id) }">
              {{ student.initials }}
            </div>
            <span class="student-name">{{ student.name }}</span>
          </li>
          <li v-if="displayedStudents.length === 0" class="student-empty">
            <span v-if="mode === 'enviar'">Todos os alunos já estão vinculados.</span>
            <span v-else>Nenhum aluno vinculado para pausar.</span>
          </li>
        </ul>

        <!-- Definir período (só no modo Enviar) -->
        <div v-if="mode === 'enviar'" class="period-section">
          <label class="period-toggle">
            <input type="checkbox" v-model="definirPeriodo" />
            <span class="chk-label">Definir período de encerramento</span>
          </label>

          <div v-if="definirPeriodo" class="period-input-wrap">
            <label class="period-label">Data de encerramento</label>
            <EInput
              type="date"
              v-model="endDate"
              :min="chapter ? chapter.inicio : ''"
              size="small"
              :invalid="dateInvalid"
            />
            <span v-if="dateInvalid" class="date-error">
              A data deve ser posterior ao início do capítulo ({{ chapter ? formatDate(chapter.inicio) : '' }}).
            </span>
          </div>
        </div>

      </div>

      <!-- ── Footer fixo ── -->
      <footer class="drawer-footer">
        <EButton variant="outline-secondary" size="medium" @click="close">
          Cancelar
        </EButton>
        <EButton
          :variant="mode === 'enviar' ? 'primary' : 'warning'"
          size="medium"
          :icon="mode === 'enviar' ? 'send-fill' : 'pause-fill'"
          :disabled="selectedIds.length === 0 || dateInvalid"
          :title="selectedIds.length === 0 ? 'Selecione ao menos um aluno' : ''"
          @click="confirm"
        >
          {{ confirmLabel }}
        </EButton>
      </footer>

    </aside>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { EButton, EInput } from './base/index.js'
import { useTrilhasAZ } from '../composables/useTrilhasAZ.js'

const { students, vincularAlunos, pausarAlunos } = useTrilhasAZ()

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  chapter:    { type: Object, default: null },
  mode:       { type: String, default: 'enviar' } // 'enviar' | 'pausar'
})

const emit = defineEmits(['update:modelValue'])

// ── Estado interno ────────────────────────────────────────────────────────────
const searchQuery   = ref('')
const selectedIds   = ref([])
const definirPeriodo = ref(false)
const endDate       = ref('')

// ── Reset ao abrir ────────────────────────────────────────────────────────────
watch(() => props.modelValue, (open) => {
  if (open) {
    searchQuery.value    = ''
    selectedIds.value    = []
    definirPeriodo.value = false
    endDate.value        = ''
    // Bloquear scroll do body
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// ── Computed ──────────────────────────────────────────────────────────────────
const drawerTitle = computed(() =>
  props.mode === 'enviar' ? 'Enviar para Alunos' : 'Pausar Alunos'
)

const modeColor = computed(() =>
  props.mode === 'enviar' ? '#7367F0' : '#FF9F43'
)

const modeIcon = computed(() =>
  props.mode === 'enviar' ? 'bi bi-send-fill' : 'bi bi-pause-fill'
)

const confirmLabel = computed(() => {
  const n = selectedIds.value.length
  if (props.mode === 'enviar') return n > 0 ? `ENVIAR ${n} ALUNO${n > 1 ? 'S' : ''}` : 'ENVIAR'
  return n > 0 ? `PAUSAR ${n} ALUNO${n > 1 ? 'S' : ''}` : 'PAUSAR'
})

/** Filtra alunos por modo (linked/unlinked) e busca por nome */
const displayedStudents = computed(() => {
  if (!props.chapter) return []

  const q = searchQuery.value.toLowerCase().trim()

  return students.filter(student => {
    const entry = props.chapter.studentsData.find(sd => sd.studentId === student.id)
    if (!entry) return false

    const matchMode = props.mode === 'enviar' ? !entry.isLinked : entry.isLinked
    if (!matchMode) return false

    return q ? student.name.toLowerCase().includes(q) : true
  })
})

const allSelected  = computed(() =>
  displayedStudents.value.length > 0 &&
  displayedStudents.value.every(s => selectedIds.value.includes(s.id))
)

const someSelected = computed(() =>
  displayedStudents.value.some(s => selectedIds.value.includes(s.id))
)

const dateInvalid = computed(() => {
  if (!definirPeriodo.value || !endDate.value || !props.chapter?.inicio) return false
  return endDate.value < props.chapter.inicio
})

// ── Métodos ───────────────────────────────────────────────────────────────────
function toggleStudent (id) {
  const idx = selectedIds.value.indexOf(id)
  if (idx === -1) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value.splice(idx, 1)
  }
}

function toggleAll () {
  if (allSelected.value) {
    // Desmarcar apenas os da lista filtrada
    const filteredIds = displayedStudents.value.map(s => s.id)
    selectedIds.value = selectedIds.value.filter(id => !filteredIds.includes(id))
  } else {
    const filteredIds = displayedStudents.value.map(s => s.id)
    const unique = new Set([...selectedIds.value, ...filteredIds])
    selectedIds.value = [...unique]
  }
}

function confirm () {
  if (selectedIds.value.length === 0 || dateInvalid.value) return

  if (props.mode === 'enviar') {
    vincularAlunos(
      props.chapter.id,
      selectedIds.value,
      definirPeriodo.value && endDate.value ? endDate.value : null
    )
  } else {
    pausarAlunos(props.chapter.id, selectedIds.value)
  }

  close()
}

function close () {
  emit('update:modelValue', false)
}

// ── Helpers visuais ───────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  '#7367F0', '#28C76F', '#FF9F43', '#00CFE8', '#EA5455',
  '#7F6CC3', '#8BC728', '#FFB443', '#00A5A0', '#FE5153'
]

function avatarColor (id) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length]
}

function formatDate (dateStr) {
  if (!dateStr) return '–'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}
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
  width: 420px;
  max-width: 92vw;
  background: #fff;
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.14);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Header ───────────────────────────────────────────────────────────────── */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  flex-shrink: 0;
}

.drawer-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drawer-mode-badge {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  flex-shrink: 0;
}

.drawer-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-800, #1f2937);
}

.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--gray-500, #6b7280);
  cursor: pointer;
  border-radius: var(--radius-sm, 4px);
  transition: all var(--transition-fast, 0.15s);
  padding: 0;
}

.btn-close:hover {
  background: var(--gray-100, #f3f4f6);
  color: var(--gray-800, #1f2937);
}

/* ── Content ──────────────────────────────────────────────────────────────── */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Info capítulo */
.chapter-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--gray-50, #f9fafb);
  border-radius: var(--radius-md, 8px);
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-700, #374151);
  border-left: 3px solid var(--primary, #7367F0);
}

/* Buscador */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  font-size: 13px;
  color: var(--gray-400, #9ca3af);
  pointer-events: none;
  z-index: 1;
}

.search-input {
  padding-left: 32px !important;
}

/* Controles da lista */
.list-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.checkbox-master {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-master input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--primary, #7367F0);
  cursor: pointer;
}

.chk-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-700, #374151);
  display: flex;
  align-items: center;
  gap: 6px;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  background: var(--gray-200, #e5e7eb);
  border-radius: var(--radius-full, 9999px);
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-600, #4b5563);
}

.selected-count {
  font-size: 12px;
  color: var(--primary, #7367F0);
  font-weight: 600;
}

/* Lista de alunos */
.student-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.student-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background var(--transition-fast, 0.15s);
}

.student-item:hover {
  background: var(--gray-50, #f9fafb);
}

.student-item.selected {
  background: rgba(115, 103, 240, 0.06);
}

.student-item input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: var(--primary, #7367F0);
  cursor: pointer;
  flex-shrink: 0;
}

.student-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.student-name {
  font-size: 13px;
  color: var(--gray-800, #1f2937);
  flex: 1;
}

.student-empty {
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--gray-400, #9ca3af);
}

/* Período */
.period-section {
  border-top: 1px solid var(--gray-100, #f3f4f6);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.period-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.period-toggle input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--primary, #7367F0);
  cursor: pointer;
}

.period-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.period-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-600, #4b5563);
}

.date-error {
  font-size: 11px;
  color: var(--danger, #EA5455);
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid var(--gray-200, #e5e7eb);
  background: #fff;
  flex-shrink: 0;
}

/* ── Transitions ──────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity var(--transition-base, 0.25s); }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform var(--transition-base, 0.25s) ease; }
.slide-enter-from,
.slide-leave-to     { transform: translateX(100%); }
</style>
