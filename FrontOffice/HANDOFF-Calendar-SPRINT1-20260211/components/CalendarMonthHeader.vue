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
      <div class="view-toggle-wrapper">
        <ViewToggleGroup
          :model-value="currentView"
          :views="availableViews"
          :size="viewToggleSize"
          @update:model-value="handleViewChange"
        />
        <button
          class="view-toggle-button view-toggle-md today-button"
          @click="handleToday"
          aria-label="Voltar para hoje"
        >
          <span class="button-text">Hoje</span>
        </button>
      </div>
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

const emit = defineEmits(['previous', 'next', 'today', 'view-change'])

const handlePrevious = () => {
  emit('previous')
}

const handleNext = () => {
  emit('next')
}

const handleToday = () => {
  emit('today')
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
  gap: 8px;
  align-items: center;
}

/* Container do grupo de botões - Figma spec */
.view-toggle-wrapper {
  display: inline-flex;
  gap: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(47, 43, 61, 0.08);
}

/* Estilos base dos botões - Figma spec */
.view-toggle-wrapper :deep(.view-toggle-button) {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  /* Background não ativo - 16% opacidade */
  background-color: rgba(115, 103, 240, 0.16);
  /* Texto roxo primário */
  color: #7367f0;
  border-radius: 0;
  padding: 8px 20px;
  font-size: 15px;
  line-height: 22px;
  min-height: 38px;
}

/* Estado ativo - 24% opacidade */
.view-toggle-wrapper :deep(.view-toggle-button.view-toggle-active) {
  background-color: rgba(115, 103, 240, 0.24);
  color: #7367f0;
}

/* Hover - opacidade intermediária */
.view-toggle-wrapper :deep(.view-toggle-button:hover) {
  background-color: rgba(115, 103, 240, 0.20);
}

/* Texto capitalizado */
.view-toggle-wrapper :deep(.button-text) {
  text-transform: capitalize;
}

/* Border radius nos extremos do grupo */
.view-toggle-wrapper :deep(.view-toggle-button:first-child) {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

/* Botão Hoje - último do grupo */
.view-toggle-wrapper .today-button {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
}

/* Separador antes do botão Hoje */
.view-toggle-wrapper .today-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 1px;
  background-color: rgba(47, 43, 61, 0.12);
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
