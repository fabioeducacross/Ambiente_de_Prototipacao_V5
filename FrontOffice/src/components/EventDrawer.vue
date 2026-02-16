<template>
  <!-- Overlay/Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="drawer-overlay"
      @click="closeDrawer"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <aside v-if="isOpen" class="event-drawer">
      <!-- Header -->
      <header class="drawer-header">
        <h2>{{ drawerTitle }}</h2>
        <button
          class="btn-close"
          @click="closeDrawer"
          aria-label="Fechar"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- View Mode - Visualização do evento -->
      <div v-if="mode === 'view' && eventData" class="drawer-content">
        <!-- Badge do tipo -->
        <div class="event-type-badge" :style="{ backgroundColor: eventTypeColor }">
          {{ eventTypeLabel }}
        </div>

        <!-- Título do evento -->
        <h3 class="event-title">{{ eventData.titulo || eventData.title }}</h3>

        <!-- Informações do evento -->
        <div class="event-info">
          <!-- Período -->
          <div class="info-row">
            <i class="bi bi-calendar3"></i>
            <div class="info-content">
              <span class="info-label">Período</span>
              <span class="info-value">{{ formattedPeriod }}</span>
            </div>
          </div>

          <!-- Horário -->
          <div class="info-row" v-if="hasTime">
            <i class="bi bi-clock"></i>
            <div class="info-content">
              <span class="info-label">Horário</span>
              <span class="info-value">{{ formattedTime }}</span>
            </div>
          </div>

          <!-- Turmas -->
          <div class="info-row" v-if="eventData.turmas && eventData.turmas.length">
            <i class="bi bi-people"></i>
            <div class="info-content">
              <span class="info-label">Turmas</span>
              <div class="turmas-list">
                <span v-for="turma in eventData.turmas" :key="turma" class="turma-badge">
                  {{ formatTurmaName(turma) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="info-row">
            <i class="bi bi-flag"></i>
            <div class="info-content">
              <span class="info-label">Status</span>
              <span 
                class="status-badge" 
                :class="eventData.status === 'ativo' ? 'status-active' : 'status-inactive'"
              >
                {{ eventData.status === 'ativo' ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
          </div>

          <!-- Origem -->
          <div class="info-row" v-if="eventData.origem">
            <i class="bi bi-building"></i>
            <div class="info-content">
              <span class="info-label">Origem</span>
              <span class="info-value">{{ eventData.origem === 'escola' ? 'Escola' : 'Professor' }}</span>
            </div>
          </div>
        </div>

        <!-- Descrição -->
        <div class="event-description" v-if="eventData.descricao || eventData.description">
          <h4>Descrição</h4>
          <p>{{ eventData.descricao || eventData.description }}</p>
        </div>

        <!-- Ações -->
        <div class="view-actions">
          <button class="btn btn-primary" @click="switchToEdit">
            <i class="bi bi-pencil"></i>
            Editar
          </button>
          <button class="btn btn-outline-secondary" @click="closeDrawer">
            Fechar
          </button>
        </div>
      </div>

      <!-- Edit/Create Mode - Form -->
      <form v-else @submit.prevent="handleSubmit" class="drawer-form">
        <!-- Título -->
        <div class="form-group">
          <label for="titulo" class="form-label">Título</label>
          <input
            id="titulo"
            v-model="formData.titulo"
            type="text"
            class="form-control"
            placeholder="Selecione"
            :class="{ 'is-invalid': errors.titulo }"
          />
          <span v-if="errors.titulo" class="error-message">
            {{ errors.titulo }}
          </span>
        </div>

        <!-- Atividade -->
        <div class="form-group">
          <label for="atividade" class="form-label">Atividade</label>
          <select
            id="atividade"
            v-model="formData.atividade"
            class="form-control form-select"
            :class="{ 'is-invalid': errors.atividade }"
          >
            <option value="">Select Status</option>
            <option value="missao">Missão</option>
            <option value="olimpiada">Olimpíada</option>
            <option value="avaliacao">Avaliação</option>
            <option value="trilha">Trilha</option>
            <option value="expedicao">Expedição</option>
            <option value="outro">Outro</option>
          </select>
          <span v-if="errors.atividade" class="error-message">
            {{ errors.atividade }}
          </span>
        </div>

        <!-- Turmas -->
        <div class="form-group">
          <label for="turmas" class="form-label">Turmas</label>
          <select
            id="turmas"
            v-model="formData.turmas"
            class="form-control form-select"
            :class="{ 'is-invalid': errors.turmas }"
            multiple
          >
            <option value="5a-manha">5° A - Manhã</option>
            <option value="5b-manha">5° B - Manhã</option>
            <option value="5a-tarde">5° A - Tarde</option>
            <option value="6a-manha">6° A - Manhã</option>
            <option value="6b-manha">6° B - Manhã</option>
            <option value="7a-manha">7° A - Manhã</option>
          </select>
          <span v-if="errors.turmas" class="error-message">
            {{ errors.turmas }}
          </span>
        </div>

        <!-- Data de início -->
        <div class="form-group">
          <label for="dataInicio" class="form-label">Data de início</label>
          <input
            id="dataInicio"
            v-model="formData.dataInicio"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.dataInicio }"
          />
          <span v-if="errors.dataInicio" class="error-message">
            {{ errors.dataInicio }}
          </span>
        </div>

        <!-- Data de término -->
        <div class="form-group">
          <label for="dataTermino" class="form-label">Data de término</label>
          <input
            id="dataTermino"
            v-model="formData.dataTermino"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.dataTermino }"
          />
          <span v-if="errors.dataTermino" class="error-message">
            {{ errors.dataTermino }}
          </span>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-control form-textarea"
            placeholder="Enter category description..."
            rows="4"
            :class="{ 'is-invalid': errors.description }"
          ></textarea>
          <span v-if="errors.description" class="error-message">
            {{ errors.description }}
          </span>
        </div>

        <!-- Buttons -->
        <div class="form-actions">
          <div class="form-actions-left">
            <button type="submit" class="btn btn-primary">
              {{ eventData ? 'Atualizar' : 'Adicionar' }}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="closeDrawer"
            >
              Cancelar
            </button>
          </div>
          <button
            v-if="eventData"
            type="button"
            class="btn btn-danger"
            @click="handleDelete"
          >
            Deletar
          </button>
        </div>
      </form>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  eventData: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'edit',
    validator: (value) => ['view', 'edit', 'create'].includes(value)
  },
  defaultTurma: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'save', 'delete', 'edit'])

// Mapeamento de tipos para cores e labels
const typeConfig = {
  missao: { color: '#7F6CC3', label: 'Missão' },
  olimpiada: { color: '#8BC728', label: 'Olimpíada' },
  avaliacao: { color: '#FE5153', label: 'Avaliação' },
  trilha: { color: '#00A5A0', label: 'Trilha' },
  expedicao: { color: '#FFB443', label: 'Expedição' },
  lembrete: { color: '#7CD7D3', label: 'Lembrete' },
  outro: { color: '#888888', label: 'Outro' }
}

// Computed properties para modo visualização
const drawerTitle = computed(() => {
  if (props.mode === 'view') return 'Detalhes do Evento'
  return props.eventData ? 'Editar evento' : 'Adicionar evento'
})

const eventType = computed(() => props.eventData?.tipo || props.eventData?.type || 'outro')
const eventTypeColor = computed(() => typeConfig[eventType.value]?.color || typeConfig.outro.color)
const eventTypeLabel = computed(() => typeConfig[eventType.value]?.label || typeConfig.outro.label)

const formattedPeriod = computed(() => {
  if (!props.eventData) return ''
  const start = props.eventData.dataInicio || props.eventData.date
  const end = props.eventData.dataTermino
  
  if (!start) return ''
  
  const startDate = new Date(start)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  const startStr = startDate.toLocaleDateString('pt-BR', options)
  
  if (end) {
    const endDate = new Date(end)
    const endStr = endDate.toLocaleDateString('pt-BR', options)
    if (startStr === endStr) return startStr
    return `${startStr} até ${endStr}`
  }
  
  return startStr
})

const hasTime = computed(() => {
  if (!props.eventData) return false
  const start = props.eventData.dataInicio || props.eventData.date
  if (!start) return false
  const date = new Date(start)
  return date.getHours() !== 0 || date.getMinutes() !== 0
})

const formattedTime = computed(() => {
  if (!props.eventData) return ''
  const start = props.eventData.dataInicio || props.eventData.date
  const end = props.eventData.dataTermino
  
  if (!start) return ''
  
  const startDate = new Date(start)
  const startTime = startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  
  if (end) {
    const endDate = new Date(end)
    const endTime = endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    return `${startTime} - ${endTime}`
  }
  
  return startTime
})

const formatTurmaName = (turmaId) => {
  const turmaMap = {
    '5a-manha': '5° A - Manhã',
    '5b-manha': '5° B - Manhã',
    '5a-tarde': '5° A - Tarde',
    '6a-manha': '6° A - Manhã',
    '6b-manha': '6° B - Manhã',
    '7a-manha': '7° A - Manhã'
  }
  return turmaMap[turmaId] || turmaId
}

const switchToEdit = () => {
  emit('edit', props.eventData)
}

// Form data
const formData = reactive({
  titulo: '',
  atividade: '',
  turmas: [],
  dataInicio: '',
  dataTermino: '',
  description: ''
})

// Errors
const errors = reactive({
  titulo: '',
  atividade: '',
  turmas: '',
  dataInicio: '',
  dataTermino: '',
  description: ''
})

// Watch for eventData changes (edit mode)
watch(() => props.eventData, (newData) => {
  if (newData) {
    formData.titulo = newData.titulo || ''
    formData.atividade = newData.tipo || ''
    formData.turmas = newData.turmas || []
    formData.dataInicio = newData.dataInicio ? newData.dataInicio.split('T')[0] : ''
    formData.dataTermino = newData.dataTermino ? newData.dataTermino.split('T')[0] : ''
    formData.description = newData.descricao || ''
  }
}, { immediate: true })

// Validation
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Título
  if (!formData.titulo.trim()) {
    errors.titulo = 'Título é obrigatório'
    isValid = false
  }

  // Atividade
  if (!formData.atividade) {
    errors.atividade = 'Selecione um tipo de atividade'
    isValid = false
  }

  // Turmas
  if (formData.turmas.length === 0) {
    errors.turmas = 'Selecione ao menos uma turma'
    isValid = false
  }

  // Data de início
  if (!formData.dataInicio) {
    errors.dataInicio = 'Data de início é obrigatória'
    isValid = false
  }

  // Data de término
  if (!formData.dataTermino) {
    errors.dataTermino = 'Data de término é obrigatória'
    isValid = false
  }

  // Validar se data término >= data início
  if (formData.dataInicio && formData.dataTermino) {
    const inicio = new Date(formData.dataInicio)
    const termino = new Date(formData.dataTermino)
    if (termino < inicio) {
      errors.dataTermino = 'Data de término deve ser posterior à data de início'
      isValid = false
    }
  }

  return isValid
}

// Handle submit
const handleSubmit = () => {
  if (validateForm()) {
    const eventPayload = {
      id: props.eventData?.id || Date.now(),
      titulo: formData.titulo,
      tipo: formData.atividade,
      turmas: formData.turmas,
      dataInicio: `${formData.dataInicio}T08:00:00`,
      dataTermino: `${formData.dataTermino}T18:00:00`,
      descricao: formData.description,
      status: 'ativo',
      origem: 'professor'
    }
    emit('save', eventPayload)
    resetForm()
    closeDrawer()
  }
}

// Close drawer
const closeDrawer = () => {
  emit('close')
  setTimeout(resetForm, 300) // Wait for animation
}

// Delete event
const handleDelete = () => {
  if (props.eventData && confirm('Tem certeza que deseja deletar este evento?')) {
    emit('delete', props.eventData.id)
    closeDrawer()
  }
}

// Reset form
const resetForm = () => {
  formData.titulo = ''
  formData.atividade = ''
  formData.turmas = []
  formData.dataInicio = ''
  formData.dataTermino = ''
  formData.description = ''
  
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

// Prevent body scroll when drawer is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    // Pré-selecionar turma no modo criação
    if (props.mode === 'create' && props.defaultTurma) {
      formData.turmas = [props.defaultTurma]
    }
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Overlay */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Drawer */
.event-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 90vw;
  background-color: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  flex-shrink: 0;
}

.drawer-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.btn-close {
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

.btn-close:hover {
  background-color: #f8f9fa;
  color: #2c3e50;
}

.btn-close i {
  font-size: 18px;
}

/* Form */
.drawer-form {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  transition: all 0.2s ease;
  background-color: #fff;
  color: #2c3e50;
  font-family: inherit;
}

.form-control::placeholder {
  color: #98a2b3;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.form-control.is-invalid {
  border-color: var(--danger);
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(234, 84, 85, 0.1);
}

/* Select */
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236C757D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  cursor: pointer;
}

.form-select[multiple] {
  background-image: none;
  padding-right: 14px;
  min-height: 100px;
}

/* Textarea */
.form-textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

/* Error message */
.error-message {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--danger);
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
  margin-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.form-actions-left {
  display: flex;
  gap: 12px;
  flex: 1;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-danger {
  background-color: var(--danger);
  color: #fff;
  flex: 0 0 auto;
  min-width: 100px;
}

.btn-danger:hover {
  background-color: #d43f40;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(234, 84, 85, 0.3);
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background-color: #5f54d4;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(115, 103, 240, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-outline {
  background-color: transparent;
  color: #6c757d;
  border: 1px solid #d0d5dd;
}

.btn-outline:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Scrollbar */
.drawer-form::-webkit-scrollbar {
  width: 6px;
}

.drawer-form::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.drawer-form::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.drawer-form::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .event-drawer {
    width: 100%;
    max-width: 100%;
  }

  .drawer-header {
    padding: 16px;
  }

  .drawer-form {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}

/* ======================================
   VIEW MODE STYLES
   ====================================== */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.event-type-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.event-title {
  margin: 0 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-row i {
  font-size: 18px;
  color: #7367f0;
  margin-top: 2px;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  font-weight: 500;
  color: #98a2b3;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: 14px;
  color: #2c3e50;
}

.turmas-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.turma-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f3f2ff;
  color: #7367f0;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.status-active {
  background-color: #e8f8f0;
  color: #28c76f;
}

.status-inactive {
  background-color: #fef3f3;
  color: #ea5455;
}

.event-description {
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.event-description h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.event-description p {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
}

.view-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.view-actions .btn {
  flex: 1;
}

.view-actions .btn i {
  margin-right: 6px;
}

.btn-outline-secondary {
  background-color: transparent;
  color: #6c757d;
  border: 1px solid #d0d5dd;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
}

.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
