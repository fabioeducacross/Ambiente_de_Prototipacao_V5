<template>
  <div class="calendar-month-header">
    <!-- Navegação e Título -->
    <div class="header-left">
      <div class="navigation-buttons">
        <NavigationButton
          icon="chevron_left"
          aria-label="Mês anterior"
          @click="handlePrevious"
        />
        <NavigationButton
          icon="chevron_right"
          aria-label="Próximo mês"
          @click="handleNext"
        />
      </div>
      
      <h4 class="month-title">{{ monthYear }}</h4>
    </div>
    
    <!-- Toggle de Views -->
    <div v-if="showViewToggle" class="header-right">
      <ViewToggleGroup
        :model-value="currentView"
        :views="availableViews"
        :size="viewToggleSize"
        @update:model-value="handleViewChange"
      />
    </div>
  </div>
</template>

<script setup>
import NavigationButton from '../atoms/NavigationButton.vue'
import ViewToggleGroup from './ViewToggleGroup.vue'

const props = defineProps({
  monthYear: {
    type: String,
    required: true
  },
  currentView: {
    type: String,
    default: 'month',
    validator: (value) => ['month', 'week', 'day', 'list'].includes(value)
  },
  showViewToggle: {
    type: Boolean,
    default: true
  },
  availableViews: {
    type: Array,
    default: () => [
      { value: 'month', label: 'Mês', ariaLabel: 'Visualização mensal' },
      { value: 'week', label: 'Semana', ariaLabel: 'Visualização semanal' },
      { value: 'day', label: 'Dia', ariaLabel: 'Visualização diária' }
    ]
  },
  viewToggleSize: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['previous', 'next', 'view-change'])

const handlePrevious = () => {
  emit('previous')
}

const handleNext = () => {
  emit('next')
}

const handleViewChange = (newView) => {
  emit('view-change', newView)
}
</script>

<style scoped>
.calendar-month-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  min-height: 86px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.12);
  background-color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.navigation-buttons {
  display: flex;
  gap: 0;
}

.month-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 38px;
  color: rgba(47, 43, 61, 0.9);
  margin: 0;
  text-transform: capitalize;
}

.header-right {
  display: flex;
  align-items: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .calendar-month-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-left {
    width: 100%;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
  
  .month-title {
    font-size: 20px;
    line-height: 32px;
  }
}

@media (max-width: 480px) {
  .calendar-month-header {
    padding: 16px;
  }
  
  .month-title {
    font-size: 18px;
    line-height: 28px;
  }
}
</style>
