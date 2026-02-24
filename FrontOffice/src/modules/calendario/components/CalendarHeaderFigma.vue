<template>
  <div class="calendar-header-figma">
    <div class="header-left">
      <div class="month-navigation">
        <button class="nav-btn nav-btn-left" @click="$emit('prev')" aria-label="Mês anterior">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="nav-btn nav-btn-right" @click="$emit('next')" aria-label="Próximo mês">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <h2 class="month-title">{{ monthTitle }}</h2>
    </div>
    
    <div class="header-right">
      <div class="view-tabs">
        <button
          v-for="(view, index) in views"
          :key="view.value"
          class="view-tab"
          :class="{ 
            active: currentView === view.value,
            'first-tab': index === 0,
            'last-tab': index === views.length - 1
          }"
          @click="$emit('view-change', view.value)"
        >
          {{ view.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  currentView: {
    type: String,
    default: 'month'
  }
})

defineEmits(['prev', 'next', 'today', 'view-change'])

const views = [
  { label: 'Mês', value: 'month' },
  { label: 'Semana', value: 'week' },
  { label: 'Dia', value: 'day' },
  { label: 'Lista', value: 'list' }
]

const monthTitle = computed(() => {
  const formatted = format(props.currentDate, 'MMMM \'de\' yyyy', { locale: ptBR })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})
</script>

<style scoped>
.calendar-header-figma {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  height: 86px;
  background: #ffffff;
  border-bottom: 1px solid rgba(47, 43, 61, 0.16);
}

/* Left Section */
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.month-navigation {
  display: flex;
  gap: 0;
}

.nav-btn {
  width: 38px;
  height: 38px;
  background: #ffffff;
  border: 1px solid rgba(47, 43, 61, 0.16);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(47, 43, 61, 0.9);
  transition: all 0.2s;
  padding: 0;
}

.nav-btn-left {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-right: none;
}

.nav-btn-right {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.nav-btn:hover {
  background: rgba(115, 103, 240, 0.08);
  color: #7367F0;
}

.nav-btn .material-symbols-outlined {
  font-size: 20px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
}

.month-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: rgba(47, 43, 61, 0.9);
  margin: 0;
}

/* Right Section */
.header-right {
  display: flex;
  align-items: center;
}

.view-tabs {
  display: flex;
  border: 1px solid rgba(47, 43, 61, 0.16);
  border-radius: 6px;
  overflow: hidden;
}

.view-tab {
  padding: 8px 20px;
  height: 38px;
  background: #ffffff;
  border: none;
  border-right: 1px solid rgba(47, 43, 61, 0.16);
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-tab.last-tab {
  border-right: none;
}

.view-tab:hover:not(.active) {
  background: rgba(115, 103, 240, 0.08);
  color: #7367F0;
}

.view-tab.active {
  background: #7367F0;
  color: #ffffff;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .calendar-header-figma {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .month-title {
    font-size: 16px;
  }
  
  .view-tab {
    padding: 6px 12px;
    font-size: 13px;
    height: 34px;
  }
}
</style>
