<template>
  <aside class="calendar-sidebar">
    <div class="sidebar-header">
      <button
        class="add-event-button"
        @click="handleAddEvent"
        aria-label="Adicionar novo lembrete"
      >
        <span class="material-symbols-outlined button-icon">add</span>
        <span class="button-text">Adicionar Lembrete</span>
      </button>
    </div>
    
    <div class="divider"></div>

    <div class="sidebar-filters">
      <FilterSection
        title="Tipo de Atividade"
        icon="layers"
        :active-count="activeActivityCount"
      >
        <CheckboxGroup
          :options="activityOptions"
          :model-value="selectedActivities"
          @update:model-value="handleActivityChange"
        />
      </FilterSection>

      <FilterSection
        title="Perfil de Origem"
        icon="account_circle"
        :active-count="activeOriginCount"
      >
        <CheckboxGroup
          :options="originOptions"
          :model-value="selectedOrigins"
          @update:model-value="handleOriginChange"
        />
      </FilterSection>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import CheckboxGroup from '../molecules/CheckboxGroup.vue'
import FilterSection from '../molecules/FilterSection.vue'
import iconeBelinha from '../../assets/icons/icone_belinha.svg'
import { ORIGIN_LEVELS } from '@/data/calendar-enums'

const props = defineProps({
  activityOptions: {
    type: Array,
    default: () => [
      { value: 'missao', label: 'Missões', color: '#7F6CC3', disabled: false },
      { value: 'olimpiada', label: 'Olimpíadas', color: '#8BC728', disabled: false },
      { value: 'avaliacao', label: 'Avaliações', color: '#FE5153', disabled: false },
      { value: 'trilha', label: 'Trilhas', color: '#00A5A0', disabled: false },
      { value: 'expedicao', label: 'Expedições', color: '#FFB443', disabled: false },
      { value: 'lembrete', label: 'Lembretes', color: '#7CD7D3', disabled: false }
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
  },
  originOptions: {
    type: Array,
    default: () => [
      { value: ORIGIN_LEVELS.EDUCACROSS.value, label: ORIGIN_LEVELS.EDUCACROSS.label, iconSvg: iconeBelinha, disabled: false },
      { value: ORIGIN_LEVELS.NETWORK.value, label: ORIGIN_LEVELS.NETWORK.label, icon: ORIGIN_LEVELS.NETWORK.icon, disabled: false },
      { value: ORIGIN_LEVELS.SCHOOL.value, label: ORIGIN_LEVELS.SCHOOL.label, icon: ORIGIN_LEVELS.SCHOOL.icon, disabled: false },
      { value: ORIGIN_LEVELS.TEACHER.value, label: ORIGIN_LEVELS.TEACHER.label, icon: ORIGIN_LEVELS.TEACHER.icon, disabled: false }
    ]
  },
  selectedOrigins: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-event', 'activity-change', 'origin-change'])

const activeActivityCount = computed(() => props.selectedActivities.length)
const activeOriginCount = computed(() => props.selectedOrigins.length)

const handleAddEvent = () => {
  emit('add-event')
}

const handleActivityChange = (newSelectedActivities) => {
  emit('activity-change', newSelectedActivities)
}

const handleOriginChange = (newSelectedOrigins) => {
  emit('origin-change', newSelectedOrigins)
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
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px color-mix(in srgb, var(--primary) 30%, transparent);
  transition: all 0.2s ease;
  min-height: 38px;
}

.add-event-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0px 4px 8px 0px color-mix(in srgb, var(--primary) 40%, transparent);
}

.add-event-button:active {
  transform: translateY(0);
  box-shadow: 0px 2px 4px 0px color-mix(in srgb, var(--primary) 30%, transparent);
}

.button-icon {
  font-size: 20px;
  font-variation-settings: 
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(47, 43, 61, 0.12);
}

.sidebar-filters {
  flex: 1;
  overflow-y: auto;
}

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

@media (max-width: 1024px) {
  .calendar-sidebar {
    width: 280px;
  }
  
  .sidebar-header,
  .sidebar-filters {
    padding: 20px;
  }
}
</style>
