<template>
  <div class="calendar-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- Sidebar (300px ou colapsada) -->
    <CalendarSidebar
      v-if="showSidebar"
      :activity-options="activityOptions"
      :selected-activities="selectedActivities"
      @add-event="handleAddEvent"
      @activity-change="handleActivityChange"
    />
    
    <!-- Botão para toggle sidebar em mobile -->
    <button
      v-if="showSidebar"
      class="sidebar-toggle-mobile"
      @click="toggleSidebar"
      aria-label="Alternar menu lateral"
    >
      <span class="material-symbols-outlined">
        {{ sidebarCollapsed ? 'menu' : 'close' }}
      </span>
    </button>
    
    <!-- Conteúdo principal -->
    <main class="calendar-main">
      <!-- Slot para o conteúdo principal (MonthViewGrid, WeekView, DayView, etc.) -->
      <slot name="main">
        <!-- Visualização Mensal -->
        <MonthViewGrid
          v-if="activeView === 'month'"
          :current-view="activeView"
          :events="filteredEvents"
          :initial-date="initialDate"
          @view-change="handleViewChange"
          @day-click="handleDayClick"
          @event-click="handleEventClick"
          @month-change="handleMonthChange"
        />
        
        <!-- Visualização Semanal -->
        <WeekViewGrid
          v-else-if="activeView === 'week'"
          :current-view="activeView"
          :events="filteredEvents"
          :initial-date="initialDate"
          @view-change="handleViewChange"
          @event-click="handleEventClick"
          @week-change="handleWeekChange"
          @slot-click="handleSlotClick"
        />
        
        <!-- Visualização Diária -->
        <DayViewGrid
          v-else-if="activeView === 'day'"
          :current-view="activeView"
          :events="currentDayEvents"
          :initial-date="initialDate"
          @view-change="handleViewChange"
          @event-click="handleEventClick"
          @day-change="handleDayChange"
          @slot-click="handleSlotClick"
        />
      </slot>
      
      <!-- Slot para footer (ex: ActivityLegend) -->
      <div v-if="$slots.footer" class="calendar-footer">
        <slot name="footer" />
      </div>
    </main>
    
    <!-- Overlay para mobile quando sidebar aberta -->
    <div
      v-if="showSidebar && !sidebarCollapsed"
      class="sidebar-overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarSidebar from '../organisms/CalendarSidebar.vue'
import MonthViewGrid from '../organisms/MonthViewGrid.vue'
import WeekViewGrid from '../organisms/WeekViewGrid.vue'
import DayViewGrid from '../organisms/DayViewGrid.vue'

const props = defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  },
  activityOptions: {
    type: Array,
    default: () => [
      { value: 'missao', label: 'Missões', disabled: false },
      { value: 'olimpiada', label: 'Olimpíadas', disabled: false },
      { value: 'avaliacao', label: 'Avaliações', disabled: false },
      { value: 'trilha', label: 'Trilhas', disabled: false },
      { value: 'expedicao', label: 'Expedições', disabled: false }
    ]
  },
  events: {
    type: Array,
    default: () => []
  },
  initialDate: {
    type: Date,
    default: () => new Date()
  },
  currentView: {
    type: String,
    default: 'month',
    validator: (value) => ['month', 'week', 'day'].includes(value)
  }
})

const emit = defineEmits([
  'add-event',
  'activity-change',
  'view-change',
  'day-click',
  'event-click',
  'month-change',
  'week-change',
  'day-change',
  'slot-click'
])

// Estado
const selectedActivities = ref([])
const sidebarCollapsed = ref(false)
const activeView = ref(props.currentView)
const currentDate = ref(new Date(props.initialDate))

// Computed
const filteredEvents = computed(() => {
  if (selectedActivities.value.length === 0) {
    return props.events
  }
  
  return props.events.filter(event =>
    selectedActivities.value.includes(event.type)
  )
})

const currentDayEvents = computed(() => {
  const targetDate = new Date(currentDate.value)
  targetDate.setHours(0, 0, 0, 0)
  
  return filteredEvents.value.filter(event => {
    const eventDate = new Date(event.dataInicio)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate.getTime() === targetDate.getTime()
  })
})

// Methods
const handleAddEvent = () => {
  emit('add-event')
}

const handleActivityChange = (newSelectedActivities) => {
  selectedActivities.value = newSelectedActivities
  emit('activity-change', newSelectedActivities)
}

const handleViewChange = (newView) => {
  activeView.value = newView
  emit('view-change', newView)
}

const handleDayClick = (day) => {
  emit('day-click', day)
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleMonthChange = (date) => {
  currentDate.value = date
  emit('month-change', date)
}

const handleWeekChange = (date) => {
  currentDate.value = date
  emit('week-change', date)
}

const handleDayChange = (date) => {
  currentDate.value = date
  emit('day-change', date)
}

const handleSlotClick = (data) => {
  emit('slot-click', data)
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<style scoped>
.calendar-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  position: relative;
}

/* Main Content */
.calendar-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: #f8f7fa;
}

/* Footer */
.calendar-footer {
  border-top: 1px solid rgba(47, 43, 61, 0.12);
  background-color: white;
}

/* Botão toggle mobile */
.sidebar-toggle-mobile {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1001;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #7367f0;
  color: white;
  border: none;
  box-shadow: 0px 4px 12px 0px rgba(115, 103, 240, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-toggle-mobile:hover {
  background-color: #6558e3;
  transform: scale(1.05);
}

.sidebar-toggle-mobile:active {
  transform: scale(0.95);
}

.sidebar-toggle-mobile .material-symbols-outlined {
  font-size: 24px;
}

/* Overlay mobile */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Responsividade */
@media (max-width: 1024px) {
  .calendar-layout {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .sidebar-toggle-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .calendar-layout:not(.sidebar-collapsed) .sidebar-overlay {
    display: block;
  }
  
  .calendar-layout :deep(.calendar-sidebar) {
    position: fixed;
    left: -300px;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .calendar-layout:not(.sidebar-collapsed) :deep(.calendar-sidebar) {
    left: 0;
  }
}

/* Print */
@media print {
  .sidebar-toggle-mobile,
  .calendar-footer {
    display: none;
  }
  
  .calendar-layout :deep(.calendar-sidebar) {
    display: none;
  }
  
  .calendar-main {
    width: 100%;
  }
}
</style>
