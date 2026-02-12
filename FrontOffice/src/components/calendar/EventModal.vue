<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title-wrapper">
              <span 
                class="material-symbols-outlined category-icon" 
                :style="{ color: categoryColor }"
              >
                {{ categoryIcon }}
              </span>
              <h3 class="modal-title">{{ event.title }}</h3>
            </div>
            <button class="btn-icon" @click="closeModal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- Data e Horário -->
            <div class="event-detail-row">
              <span class="material-symbols-outlined">schedule</span>
              <div class="event-detail-content">
                <strong>{{ formattedDate }}</strong>
                <span v-if="!event.all_day">{{ formattedTime }}</span>
                <span v-else class="badge badge-info">Dia inteiro</span>
              </div>
            </div>

            <!-- Categoria e Origem -->
            <div class="event-detail-row">
              <span class="material-symbols-outlined">category</span>
              <div class="event-detail-content">
                <span 
                  class="badge" 
                  :style="{ backgroundColor: categoryColor + '20', color: categoryColor }"
                >
                  {{ categoryLabel }}
                </span>
                <span class="origin-badge">
                  <span class="material-symbols-outlined">{{ originIcon }}</span>
                  {{ originLabel }}
                </span>
              </div>
            </div>

            <!-- Descrição -->
            <div v-if="event.description" class="event-detail-row">
              <span class="material-symbols-outlined">description</span>
              <div class="event-detail-content">
                <p>{{ event.description }}</p>
              </div>
            </div>

            <!-- Escopo -->
            <div v-if="event.scope_level" class="event-detail-row">
              <span class="material-symbols-outlined">groups</span>
              <div class="event-detail-content">
                <span class="scope-label">{{ scopeLabel }}</span>
              </div>
            </div>

            <!-- Status -->
            <div class="event-detail-row">
              <span class="material-symbols-outlined">info</span>
              <div class="event-detail-content">
                <span 
                  class="badge"
                  :style="{ backgroundColor: statusColor + '20', color: statusColor }"
                >
                  {{ statusLabel }}
                </span>
              </div>
            </div>

            <!-- Criado por -->
            <div v-if="event.created_by" class="event-detail-row">
              <span class="material-symbols-outlined">person</span>
              <div class="event-detail-content">
                <small>Criado por <strong>{{ event.created_by }}</strong></small>
                <small v-if="event.created_at"> em {{ formattedCreatedAt }}</small>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button 
              v-for="action in availableActions" 
              :key="action.id"
              class="btn"
              :class="action.danger ? 'btn-danger' : 'btn-secondary'"
              @click="handleAction(action.id)"
            >
              <span class="material-symbols-outlined">{{ action.icon }}</span>
              {{ action.label }}
            </button>
            <button 
              class="btn btn-primary"
              @click="handlePrimaryAction"
            >
              {{ primaryActionLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CATEGORIES, ORIGIN_LEVELS, STATUS, getCategoryColor, getOriginIcon } from '@/data/calendar-enums'
import { useCalendarPermissions } from '@/composables/useCalendarPermissions'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'action'])

const { getPrimaryActionLabel, getAvailableActions } = useCalendarPermissions()

// Cor da categoria
const categoryColor = computed(() => getCategoryColor(props.event.category))

// Ícone e label da categoria
const categoryIcon = computed(() => CATEGORIES[props.event.category]?.icon || 'event')
const categoryLabel = computed(() => CATEGORIES[props.event.category]?.label || 'Evento')

// Ícone e label da origem
const originIcon = computed(() => getOriginIcon(props.event.origin_level))
const originLabel = computed(() => ORIGIN_LEVELS[props.event.origin_level]?.label || 'Origem')

// Status
const statusColor = computed(() => STATUS[props.event.status]?.color || '#B8C2CC')
const statusLabel = computed(() => STATUS[props.event.status]?.label || 'Status')

// Data formatada
const formattedDate = computed(() => {
  if (!props.event.start_at) return ''
  const date = new Date(props.event.start_at)
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
})

// Horário formatado
const formattedTime = computed(() => {
  if (!props.event.start_at || props.event.all_day) return ''
  const startDate = new Date(props.event.start_at)
  const startTime = format(startDate, 'HH:mm', { locale: ptBR })
  
  if (props.event.end_at) {
    const endDate = new Date(props.event.end_at)
    const endTime = format(endDate, 'HH:mm', { locale: ptBR })
    return `${startTime} às ${endTime}`
  }
  
  return startTime
})

// Data de criação
const formattedCreatedAt = computed(() => {
  if (!props.event.created_at) return ''
  const date = new Date(props.event.created_at)
  return format(date, "d 'de' MMMM 'às' HH:mm", { locale: ptBR })
})

// Escopo
const scopeLabel = computed(() => {
  const scopes = {
    'NETWORK': 'Toda a Rede',
    'SCHOOL': 'Toda a Escola',
    'CLASS': 'Turma específica'
  }
  return scopes[props.event.scope_level] || 'Não especificado'
})

// Ações disponíveis
const availableActions = computed(() => getAvailableActions(props.event))

// Label do botão principal
const primaryActionLabel = computed(() => getPrimaryActionLabel(props.event))

const closeModal = () => {
  emit('close')
}

const handleAction = (actionId) => {
  emit('action', { action: actionId, event: props.event })
}

const handlePrimaryAction = () => {
  if (props.event.source_type === 'CALENDAR_MANUAL') {
    emit('action', { action: 'edit', event: props.event })
  } else {
    emit('action', { action: 'open_module', event: props.event })
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-title-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.category-icon {
  font-size: 32px;
  font-variation-settings: 'FILL' 1;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.event-detail-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.event-detail-row:last-child {
  margin-bottom: 0;
}

.event-detail-row > .material-symbols-outlined {
  font-size: 24px;
  color: #666;
  flex-shrink: 0;
}

.event-detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-detail-content strong {
  color: #2c3e50;
}

.event-detail-content p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
}

.badge-info {
  background: #00CFE820;
  color: #00CFE8;
}

.origin-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 14px;
}

.origin-badge .material-symbols-outlined {
  font-size: 18px;
}

.scope-label {
  color: #666;
  font-size: 14px;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: white;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.btn-primary {
  background: #7367F0;
  color: white;
}

.btn-primary:hover {
  background: #6257d8;
}

.btn-danger {
  background: #EA5455;
  color: white;
}

.btn-danger:hover {
  background: #d63e3f;
}

.btn-icon {
  padding: 8px;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.btn-icon:hover {
  background: #f5f5f5;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
