<template>
  <div class="calendar-header">
    <div class="header-left">
      <button class="btn btn-icon" @click="$emit('prev')">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <h2 class="header-title">{{ title }}</h2>
      <button class="btn btn-icon" @click="$emit('next')">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>

    <div class="header-center">
      <div class="view-switcher">
        <button 
          v-for="view in views" 
          :key="view.value"
          class="view-btn"
          :class="{ active: currentView === view.value }"
          @click="$emit('view-change', view.value)"
        >
          <span class="material-symbols-outlined">{{ view.icon }}</span>
          <span>{{ view.label }}</span>
        </button>
      </div>
    </div>

    <div class="header-right">
      <button class="btn btn-secondary" @click="$emit('today')">
        Hoje
      </button>
      <button 
        class="btn btn-primary" 
        @click="$emit('create')"
        v-if="canCreate"
      >
        <span class="material-symbols-outlined">add</span>
        Novo Evento
      </button>
      <button class="btn btn-icon" @click="$emit('toggle-filters')">
        <span class="material-symbols-outlined">filter_list</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  currentView: {
    type: String,
    required: true
  },
  canCreate: {
    type: Boolean,
    default: true
  }
})

defineEmits(['prev', 'next', 'today', 'view-change', 'create', 'toggle-filters'])

const views = [
  { value: 'month', label: 'Mês', icon: 'calendar_month' },
  { value: 'week', label: 'Semana', icon: 'view_week' },
  { value: 'day', label: 'Dia', icon: 'view_day' },
  { value: 'list', label: 'Lista', icon: 'list' }
]
</script>

<style scoped>
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  gap: 16px;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left {
  flex: 1;
}

.header-center {
  flex: 0 0 auto;
}

.header-right {
  flex: 1;
  justify-content: flex-end;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  min-width: 200px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon {
  padding: 8px;
  background: transparent;
  color: #666;
}

.btn-icon:hover {
  background: #f5f5f5;
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

.view-switcher {
  display: flex;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.view-btn.active {
  background: white;
  color: #7367F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.material-symbols-outlined {
  font-size: 20px;
}

@media (max-width: 768px) {
  .calendar-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-left,
  .header-center,
  .header-right {
    justify-content: space-between;
  }

  .view-btn span:not(.material-symbols-outlined) {
    display: none;
  }
}
</style>
