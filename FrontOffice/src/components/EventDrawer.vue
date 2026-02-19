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
        <EBadge :background-color="eventTypeColor" pill>
          {{ eventTypeLabel }}
        </EBadge>

        <!-- Título do evento -->
        <h3 class="event-title">{{ eventData.titulo || eventData.title }}</h3>

        <!-- Informações do evento -->
        <div class="event-info">
          <!-- Período -->
          <div class="info-row">
            <span class="material-symbols-outlined info-icon">calendar_today</span>
            <div class="info-content">
              <span class="info-label">Período</span>
              <span class="info-value">{{ formattedPeriod }}</span>
            </div>
          </div>

          <!-- Horário -->
          <div class="info-row" v-if="showEventTime && hasTime">
            <span class="material-symbols-outlined info-icon">schedule</span>
            <div class="info-content">
              <span class="info-label">Horário</span>
              <span class="info-value">{{ formattedTime }}</span>
            </div>
          </div>

          <!-- Turmas -->
          <div class="info-row" v-if="eventData.turmas && eventData.turmas.length">
            <span class="material-symbols-outlined info-icon">groups</span>
            <div class="info-content">
              <span class="info-label">Turmas</span>
              <div class="turmas-list">
                <EBadge v-for="turma in eventData.turmas" :key="turma" variant="light" pill>
                  {{ formatTurmaName(turma) }}
                </EBadge>
              </div>
            </div>
          </div>

          <!-- Status (unificado: mission_status para atividades, status geral para demais) -->
          <div class="info-row" v-if="displayStatusData">
            <span class="material-symbols-outlined info-icon">info</span>
            <div class="info-content">
              <span class="info-label">Status</span>
              <EBadge
                :background-color="displayStatusData.color"
                pill
              >
                {{ displayStatusData.label }}
              </EBadge>
              <small class="text-muted d-block mt-1" v-if="displayStatusData.description">{{ displayStatusData.description }}</small>
            </div>
          </div>

          <!-- Origem -->
          <div class="info-row" v-if="eventOriginData">
            <span class="material-symbols-outlined info-icon">account_circle</span>
            <div class="info-content">
              <span class="info-label">Origem</span>
              <span class="info-value">{{ eventOriginData.label }}</span>
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
          <EButton variant="outline-primary" @click="closeDrawer">
            Fechar
          </EButton>
          <EButton variant="primary" @click="switchToEdit">
            Editar
          </EButton>
        </div>
      </div>

      <!-- Edit/Create Mode - Form -->
      <form v-else @submit.prevent="handleSubmit" class="drawer-form">
        <!-- Campos do formulário com scroll -->
        <div class="form-fields">
          <!-- Título -->
          <EFormGroup
          id="titulo"
          label="Título"
          :error-message="errors.titulo"
          required
        >
          <template #default="{ invalid, id }">
            <EInput
              :id="id"
              v-model="formData.titulo"
              placeholder="Digite o título do evento"
              :invalid="invalid"
            />
          </template>
        </EFormGroup>

        <!-- Atividade -->
        <EFormGroup
          id="atividade"
          label="Atividade"
          :error-message="errors.atividade"
          required
        >
          <template #default="{ invalid, id }">
            <ESelect
              :id="id"
              v-model="formData.atividade"
              placeholder="Selecione o tipo"
              :invalid="invalid"
              :options="atividadeOptions"
              label="name"
              trackBy="id"
            />
          </template>
        </EFormGroup>

        <!-- Turmas -->
        <EFormGroup
          id="turmas"
          label="Turmas"
          :error-message="errors.turmas"
          hint="Selecione uma ou mais turmas"
        >
          <template #default="{ invalid, id }">
            <ESelect
              :id="id"
              v-model="formData.turmas"
              :invalid="invalid"
              :options="turmaOptions"
              label="name"
              trackBy="id"
              multiple
              searchable
            />
          </template>
        </EFormGroup>

        <!-- Data de início -->
        <EDatePicker
          id="dataInicio"
          v-model="formData.dataInicio"
          label="Data de início"
          placeholder="Selecione a data de início"
          :invalid="!!errors.dataInicio"
          :error-message="errors.dataInicio"
          :required="true"
        />

        <!-- Data de término -->
        <EDatePicker
          id="dataTermino"
          v-model="formData.dataTermino"
          label="Data de término"
          placeholder="Selecione a data de término"
          :invalid="!!errors.dataTermino"
          :error-message="errors.dataTermino"
        />

        <!-- Descrição -->
        <EFormGroup
          id="description"
          label="Descrição"
          :error-message="errors.description"
        >
          <template #default="{ invalid, id }">
            <ETextarea
              :id="id"
              v-model="formData.description"
              placeholder="Descreva os detalhes do evento..."
              :rows="4"
              :invalid="invalid"
            />
          </template>
          </EFormGroup>
        </div>

        <!-- Footer fixo com botões -->
        <div class="form-actions">
          <div class="form-actions-left">
            <EButton
              v-if="eventData"
              type="button"
              variant="danger"
              @click="handleDelete"
            >
              Deletar
            </EButton>
            <EButton
              type="button"
              variant="outline-primary"
              @click="closeDrawer"
            >
              Cancelar
            </EButton>
          </div>
          <EButton type="submit" variant="primary">
            {{ eventData ? 'Atualizar' : 'Adicionar' }}
          </EButton>
        </div>
      </form>
    </aside>
  </Transition>

  <!-- Modal de Confirmação de Deleção -->
  <EConfirmDialog
    v-model="showDeleteConfirm"
    title="Deletar Evento"
    message="Tem certeza que deseja deletar este evento?"
    description="Esta ação não pode ser desfeita."
    variant="danger"
    icon="delete"
    confirm-text="Sim, deletar"
    cancel-text="Cancelar"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { EButton, EInput, ESelect, ETextarea, EFormGroup, EBadge, EDatePicker, EConfirmDialog } from './base'
import { useFeatureFlags } from '@/composables/useFeatureFlags'
import { useToast } from '@/composables/useToast'
import { 
  CATEGORIES,
  ORIGIN_LEVELS,
  MISSION_STATUS_TEACHER, 
  getMissionStatusData, 
  getEventStatusData, 
  isEducationalActivity, 
  isMissionEvent 
} from '@/data/calendar-enums'

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

// Feature Flags
const { showEventTime } = useFeatureFlags()

// Toast Notifications
const toast = useToast()

// Delete Confirmation State
const showDeleteConfirm = ref(false)

// Helper: Get category data from CATEGORIES enum
const getCategoryData = (categoryValue) => {
  if (!categoryValue) return { color: '#888888', label: 'Outro' }
  const uppercased = categoryValue.toString().toUpperCase()
  return CATEGORIES[uppercased] || { color: '#888888', label: 'Outro' }
}

// Helper: Get origin level data from ORIGIN_LEVELS enum  
const getOriginData = (originValue) => {
  if (!originValue) return { label: 'Não definido' }
  const uppercased = originValue.toString().toUpperCase()
  const originData = ORIGIN_LEVELS[uppercased]
  return originData ? { label: originData.label } : { label: originValue }
}

// Verificar se é uma missão
const isMission = computed(() => {
  if (!props.eventData) return false
  return isMissionEvent(props.eventData)
})

// Verificar se é uma atividade educacional (tem controle do professor)
const isActivity = computed(() => {
  if (!props.eventData) return false
  return isEducationalActivity(props.eventData)
})

// Obter dados de status geral do evento
const eventStatusData = computed(() => {
  if (!props.eventData) return null
  const statusValue = props.eventData?.status || 'ACTIVE'
  return getEventStatusData(statusValue)
})

// Obter dados de status de controle (professor)
const activityStatusData = computed(() => {
  if (!isActivity.value) return null
  const statusValue = props.eventData?.mission_status || 'NOT_SENT'
  return getMissionStatusData(statusValue)
})

// Status unificado: prioriza mission_status para atividades educacionais
const displayStatusData = computed(() => {
  // Atividades educacionais mostram mission_status
  if (isActivity.value && activityStatusData.value) {
    return activityStatusData.value
  }
  // Demais eventos mostram status geral
  return eventStatusData.value
})

// Computed properties para modo visualização
const drawerTitle = computed(() => {
  if (props.mode === 'view') return 'Detalhes do Evento'
  return props.eventData ? 'Editar evento' : 'Adicionar evento'
})

const eventCategoryData = computed(() => {
  const categoryValue = props.eventData?.category || props.eventData?.tipo || props.eventData?.type
  return getCategoryData(categoryValue)
})

const eventTypeColor = computed(() => eventCategoryData.value.color)
const eventTypeLabel = computed(() => eventCategoryData.value.label)

const eventOriginData = computed(() => {
  const originValue = props.eventData?.origin_level || props.eventData?.origem
  return originValue ? getOriginData(originValue) : null
})

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
  atividade: null,
  turmas: [],
  dataInicio: '',
  dataTermino: '',
  description: ''
})

// Options para selects
const atividadeOptions = [
  { id: 'missao', name: 'Missão' },
  { id: 'olimpiada', name: 'Olimpíada' },
  { id: 'avaliacao', name: 'Avaliação' },
  { id: 'trilha', name: 'Trilha' },
  { id: 'expedicao', name: 'Expedição' },
  { id: 'outro', name: 'Outro' }
]

const turmaOptions = [
  { id: '5a-manha', name: '5° A - Manhã' },
  { id: '5b-manha', name: '5° B - Manhã' },
  { id: '5a-tarde', name: '5° A - Tarde' },
  { id: '6a-manha', name: '6° A - Manhã' },
  { id: '6b-manha', name: '6° B - Manhã' },
  { id: '7a-manha', name: '7° A - Manhã' }
]

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
    // Título: suporta tanto 'titulo' quanto 'title'
    formData.titulo = newData.titulo || newData.title || ''
    
    // Converter tipo para objeto da lista de opções
    const tipoId = newData.tipo || newData.type || ''
    formData.atividade = atividadeOptions.find(opt => opt.id === tipoId) || null
    
    // Converter turmas para objetos da lista de opções
    const turmaIds = newData.turmas || newData.classes || []
    formData.turmas = turmaOptions.filter(opt => turmaIds.includes(opt.id))
    
    // Datas: suporta tanto formato ISO quanto formato brasileiro
    const dataInicioRaw = newData.dataInicio || newData.start_at || newData.date || ''
    const dataTerminoRaw = newData.dataTermino || newData.end_at || ''
    
    formData.dataInicio = dataInicioRaw ? dataInicioRaw.split('T')[0] : ''
    formData.dataTermino = dataTerminoRaw ? dataTerminoRaw.split('T')[0] : ''
    
    // Descrição: suporta tanto 'descricao' quanto 'description'
    formData.description = newData.descricao || newData.description || ''
  }
}, { immediate: true, deep: true })

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
      tipo: formData.atividade?.id || formData.atividade,
      turmas: formData.turmas.map(t => t.id || t),
      dataInicio: `${formData.dataInicio}T08:00:00`,
      dataTermino: `${formData.dataTermino}T18:00:00`,
      descricao: formData.description,
      status: 'ativo',
      origem: 'professor'
    }
    emit('save', eventPayload)
    
    // Feedback visual
    const isEdit = props.eventData?.id
    toast.success(
      isEdit ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!',
      3000
    )
    
    resetForm()
    closeDrawer()
  } else {
    // Feedback de erro de validação
    toast.error('Preencha todos os campos obrigatórios corretamente', 4000)
  }
}

// Close drawer
const closeDrawer = () => {
  emit('close')
  setTimeout(resetForm, 300) // Wait for animation
}

// Delete event
const handleDelete = () => {
  if (props.eventData) {
    showDeleteConfirm.value = true
  }
}

// Confirm delete after modal confirmation
const confirmDelete = () => {
  if (props.eventData) {
    emit('delete', props.eventData.id)
    toast.success('Evento deletado com sucesso!', 3000)
    showDeleteConfirm.value = false
    closeDrawer()
  }
}

// Reset form
const resetForm = () => {
  formData.titulo = ''
  formData.atividade = null
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
      // Converter ID da turma para objeto da lista de opções
      const turmaObj = turmaOptions.find(opt => opt.id === props.defaultTurma)
      if (turmaObj) {
        formData.turmas = [turmaObj]
      }
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Campos do formulário com scroll */
.form-fields {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Form actions - Footer fixo (seguindo Design System - padrão view-actions) */
.form-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg) 24px 24px 24px;
  border-top: 1px solid var(--gray-200);
}

.form-actions-left {
  display: flex;
  flex: 1;
  gap: var(--spacing-md);
}

.form-actions .e-button {
  flex: 1;
}

/* Estilos específicos dos botões do formulário */
.form-actions .btn-outline-secondary {
  background-color: var(--gray-100) !important;
  color: var(--gray-700) !important;
  border: 1px solid var(--gray-300) !important;
}

.form-actions .btn-outline-secondary:hover {
  background-color: var(--gray-200) !important;
  color: var(--gray-800) !important;
  border-color: var(--gray-400) !important;
}

.form-actions .btn-danger {
  background-color: var(--danger) !important;
  border-color: var(--danger) !important;
  color: white !important;
}

.form-actions .btn-danger:hover {
  background-color: var(--danger-dark) !important;
  border-color: var(--danger-dark) !important;
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
.form-fields::-webkit-scrollbar {
  width: 6px;
}

.form-fields::-webkit-scrollbar-track {
  background: transparent;
}

.form-fields::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.form-fields::-webkit-scrollbar-thumb:hover {
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

  .form-fields {
    padding: 16px;
  }

  .form-actions {
    padding: 12px 16px;
    flex-direction: column-reverse;
    gap: 8px;
  }
  
  .form-actions-left {
    width: 100%;
  }
  
  .form-actions .btn-danger {
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

.event-title {
  margin: var(--spacing-md) 0 var(--spacing-lg) 0;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-900);
  line-height: 1.3;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.info-icon {
  font-size: 20px;
  color: var(--primary);
  margin-top: 2px;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Evitar que badges se expandam no container flex */
.info-content .e-badge {
  align-self: flex-start;
}

.info-label {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: var(--font-size-sm);
  color: var(--gray-900);
}

.turmas-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.event-description {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--gray-200);
}

.event-description h4 {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--gray-900);
}

.event-description p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  line-height: 1.6;
}

.view-actions {
  display: flex;
  width: calc(100% + 48px);
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  margin-left: -24px;
  margin-right: -24px;
  padding-top: var(--spacing-lg);
  padding-left: 24px;
  padding-right: 24px;
  border-top: 1px solid var(--gray-200);
}

.view-actions .e-button {
  flex: 1;
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

<!-- Estilos não-scoped para sobrescrever Bootstrap nos botões -->
<style>
.event-drawer .form-actions .btn-outline-secondary {
  background-color: var(--gray-100) !important;
  color: var(--gray-700) !important;
  border: 1px solid var(--gray-300) !important;
}

.event-drawer .form-actions .btn-outline-secondary:hover {
  background-color: var(--gray-200) !important;
  color: var(--gray-800) !important;
  border-color: var(--gray-400) !important;
}

.event-drawer .form-actions .btn-danger {
  background-color: var(--danger) !important;
  border-color: var(--danger) !important;
  color: white !important;
}

.event-drawer .form-actions .btn-danger:hover {
  background-color: var(--danger-dark) !important;
  border-color: var(--danger-dark) !important;
}
</style>
