<template>
  <aside class="calendar-sidebar">
    <!-- Botão Adicionar Evento -->
    <div class="sidebar-header">
      <button
        class="add-event-button"
        @click="handleAddEvent"
        aria-label="Adicionar novo evento"
      >
        <span class="material-symbols-outlined button-icon">add</span>
        <span class="button-text">Adicionar Evento</span>
      </button>
    </div>
    
    <div class="divider"></div>
    
    <!-- Mini Calendar (DatePicker) -->
    <div class="sidebar-picker">
      <MiniCalendar />
    </div>
    
    <div class="divider"></div>
    
    <!-- Filtros de Atividades -->
    <div class="sidebar-filters">
      <CheckboxGroup
        title="Atividades"
        :options="activityOptions"
        :model-value="selectedActivities"
        @update:model-value="handleActivityChange"
      />
    </div>
  </aside>
</template>

<script setup>
import MiniCalendar from '../MiniCalendar.vue'
import CheckboxGroup from '../molecules/CheckboxGroup.vue'

const props = defineProps({
  activityOptions: {
    type: Array,
    default: () => [
      { value: 'missao', label: 'Missões', disabled: false },
      { value: 'olimpiada', label: 'Olimpíadas', disabled: false },
      { value: 'avaliacao', label: 'Avaliações', disabled: false },
      { value: 'trilha', label: 'Trilhas', disabled: false },
      { value: 'expedicao', label: 'Expedições', disabled: false }
    ],
    validator: (value) => {
      return value.every(option =>
        typeof option.value === 'string' &&
        typeof option.label === 'string'
      )
    }
  },
  selectedActivities: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-event', 'activity-change'])

const handleAddEvent = () => {
  emit('add-event')
}

const handleActivityChange = (newSelectedActivities) => {
  emit('activity-change', newSelectedActivities)
}
</script>

<style scoped>
.calendar-sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  background-color: white;
  border-right: 1px solid rgba(47, 43, 61, 0.12);
  overflow-y: auto;
}

/* Header */
.sidebar-header {
  padding: 24px;
}

.add-event-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px 20px;
  background-color: #7367f0;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.3);
  transition: all 0.2s ease;
  min-height: 38px;
}

.add-event-button:hover {
  background-color: #6558e3;
  transform: translateY(-1px);
  box-shadow: 0px 4px 8px 0px rgba(115, 103, 240, 0.4);
}

.add-event-button:active {
  transform: translateY(0);
  box-shadow: 0px 2px 4px 0px rgba(115, 103, 240, 0.3);
}

.button-icon {
  font-size: 20px;
  font-variation-settings: 
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}

/* Divider */
.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(47, 43, 61, 0.12);
}

/* Picker */
.sidebar-picker {
  padding: 8px;
}

/* Filtros */
.sidebar-filters {
  padding: 24px;
  flex: 1;
}

/* Scrollbar customizado */
.calendar-sidebar::-webkit-scrollbar {
  width: 6px;
}

.calendar-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.calendar-sidebar::-webkit-scrollbar-thumb {
  background: rgba(47, 43, 61, 0.2);
  border-radius: 3px;
}

.calendar-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(47, 43, 61, 0.3);
}

/* Responsividade */
@media (max-width: 1024px) {
  .calendar-sidebar {
    width: 280px;
  }
  
  .sidebar-header,
  .sidebar-filters {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .calendar-sidebar {
    position: fixed;
    left: -300px;
    top: 0;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
  }
  
  .calendar-sidebar.sidebar-open {
    left: 0;
  }
}
</style>
