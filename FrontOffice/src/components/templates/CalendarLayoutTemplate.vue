<template>
  <div class="calendar-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- Sidebar (300px ou colapsada) -->
    <CalendarSidebar
      v-if="showSidebar"
      :current-date="currentDate"
      :activity-options="activityOptions"
      :selected-activities="selectedActivities"
      :origin-options="originOptions"
      :selected-origins="selectedOrigins"
      @add-event="handleAddEvent"
      @activity-change="handleActivityChange"
      @origin-change="handleOriginChange"
      @day-click="handleSidebarDaySelect"
    />
    
    <!-- Botão para toggle sidebar em mobile -->
    <button
      v-if="showSidebar"
      class="sidebar-toggle-mobile"
      @click="toggleSidebar"
      aria-label="Alternar menu lateral"
    >
      <span class="material-symbols-outlined">
        {{ sidebarCollapsed ? 'close' : 'menu' }}
      </span>
    </button>
    
    <!-- Conteúdo principal -->
    <main class="calendar-main">
      <!-- Slot para o conteúdo principal (MonthViewGrid, WeekView, DayView, etc.) -->
      <slot name="main">
        <!-- Visualização Mensal -->
        <MonthViewGrid
          v-if="activeView === 'month'"
          :key="monthViewKey"
          :current-view="activeView"
          :events="filteredEvents"
          :initial-date="currentDate"
          @view-change="handleViewChange"
          @day-click="handleDayClick"
          @event-click="handleEventClick"
          @month-change="handleMonthChange"
        />
        
        <!-- Visualização Semanal -->
        <WeekViewGrid
          v-else-if="activeView === 'week'"
          :key="weekViewKey"
          :current-view="activeView"
          :events="filteredEvents"
          :initial-date="currentDate"
          @view-change="handleViewChange"
          @event-click="handleEventClick"
          @week-change="handleWeekChange"
          @slot-click="handleSlotClick"
        />
        
        <!-- Visualização Diária -->
        <DayViewGrid
          v-else-if="activeView === 'day'"
          :key="dayViewKey"
          :current-view="activeView"
          :events="currentDayEvents"
          :initial-date="currentDate"
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
      v-if="showSidebar && sidebarCollapsed"
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
import iconeBelinha from '../../assets/icons/icone_belinha.svg'
import { ORIGIN_LEVELS, normalizeOriginLevel } from '@/data/calendar-enums'

const props = defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  },
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  activityOptions: {
    type: Array,
    default: () => [
      { value: 'missao', label: 'Missões', color: '#7F6CC3', disabled: false },
      { value: 'olimpiada', label: 'Olimpíadas', color: '#8BC728', disabled: false },
      { value: 'avaliacao', label: 'Avaliações', color: '#FE5153', disabled: false },
      { value: 'trilha', label: 'Trilhas', color: '#00A5A0', disabled: false },
      { value: 'expedicao', label: 'Expedições', color: '#FFB443', disabled: false },
      { value: 'lembrete', label: 'Lembretes', color: '#7CD7D3', disabled: false }
    ]
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
  'origin-change',
  'view-change',
  'day-click',
  'event-click',
  'month-change',
  'week-change',
  'day-change',
  'slot-click',
  'toggle-sidebar'
])

// Estado - inicializa com todos os filtros selecionados
const selectedActivities = ref(props.activityOptions.map(opt => opt.value))
const selectedOrigins = ref(props.originOptions.map(opt => opt.value))
const activeView = ref(props.currentView)
const currentDate = ref(new Date(props.initialDate))

// Chaves únicas para forçar remonte das views ao navegar via mini calendário
const monthViewKey = computed(() => `month-${currentDate.value.getFullYear()}-${currentDate.value.getMonth()}`)
const weekViewKey = computed(() => `week-${currentDate.value.toDateString()}`)
const dayViewKey = computed(() => `day-${currentDate.value.toDateString()}`)

// Computed
const normalizeEventOrigin = (originValue) => normalizeOriginLevel(originValue)

const filteredEvents = computed(() => {
  const filtered = props.events.filter(event => {
    // Filtro por Tipo de Atividade (suporta 'type', 'tipo' e 'category')
    const eventType = event.type || event.tipo || event.category
    const passesActivityFilter = selectedActivities.value.length === 0 || 
      selectedActivities.value.includes(eventType)
    
    // Filtro por Perfil de Origem (suporta 'origin', 'origem' e 'origin_level')
    const eventOrigin = normalizeEventOrigin(event.origin || event.origem || event.origin_level)
    const passesOriginFilter = selectedOrigins.value.length === 0 || 
      !eventOrigin || selectedOrigins.value.includes(eventOrigin)
    
    return passesActivityFilter && passesOriginFilter
  })
  
  return filtered
})

const currentDayEvents = computed(() => {
  const targetDate = new Date(currentDate.value)
  targetDate.setHours(0, 0, 0, 0)
  
  return filteredEvents.value.filter(event => {
    const eventStart = new Date(event.dataInicio)
    const eventEnd = new Date(event.dataTermino || event.dataInicio)
    eventStart.setHours(0, 0, 0, 0)
    eventEnd.setHours(23, 59, 59, 999)
    
    // Inclui eventos que estejam ativos no dia selecionado
    return targetDate >= eventStart && targetDate <= eventEnd
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

const handleOriginChange = (newSelectedOrigins) => {
  selectedOrigins.value = newSelectedOrigins
  emit('origin-change', newSelectedOrigins)
}

const handleViewChange = (newView) => {
  activeView.value = newView
  emit('view-change', newView)
}

const handleDayClick = (day) => {
  emit('day-click', day)
}

// Navega para o dia clicado no mini calendário e muda para a view de dia
const handleSidebarDaySelect = (date) => {
  currentDate.value = date
  activeView.value = 'day'
  emit('day-click', date)
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
  emit('toggle-sidebar')
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
  
  .calendar-layout.sidebar-collapsed .sidebar-overlay {
    display: block;
  }
  
  .calendar-layout :deep(.calendar-sidebar) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .calendar-layout.sidebar-collapsed :deep(.calendar-sidebar) {
    transform: translateX(0);
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
