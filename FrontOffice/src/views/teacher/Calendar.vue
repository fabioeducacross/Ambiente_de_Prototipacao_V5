<template>
  <div class="calendar-page">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="calendar-main">
      <!-- Header -->
      <div class="calendar-header">
        <div class="header-top">
          <div class="turma-selector-wrapper">
            <select
              v-model="selectedTurma"
              class="turma-selector"
            >
              <option value="5a-manha">Turma 5° A - Manhã</option>
              <option value="5b-manha">5° B - Manhã</option>
              <option value="5a-tarde">5° A - Tarde</option>
              <option value="6a-manha">6° A - Manhã</option>
              <option value="6b-manha">6° B - Manhã</option>
              <option value="7a-manha">7° A - Manhã</option>
            </select>
            <span class="badge-year">ano</span>
          </div>

          <button class="btn-add-event" @click="openDrawer">
            <i class="bi bi-plus-lg"></i>
            Adicionar evento
          </button>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="calendar-content">
        <!-- Left Column: Mini Calendar + Legend -->
        <aside class="calendar-sidebar-left">
          <MiniCalendar
            :selected-date="currentDate"
            @select-date="handleDateSelect"
          />
          
          <ActivityLegend
            :visible-activities="visibleActivities"
            @update:visible-activities="visibleActivities = $event"
          />
        </aside>

        <!-- Center Column: Main Calendar -->
        <div class="calendar-center">
          <!-- Navigation Controls -->
          <div class="calendar-navigation">
            <button class="nav-btn" @click="previousPeriod">
              <i class="bi bi-chevron-left"></i>
            </button>
            
            <h2 class="current-period">{{ currentPeriod }}</h2>
            
            <button class="nav-btn" @click="nextPeriod">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>

          <!-- View Tabs -->
          <div class="view-tabs">
            <button
              v-for="view in views"
              :key="view.id"
              class="tab-btn"
              :class="{ active: selectedView === view.id }"
              @click="selectedView = view.id"
            >
              <i :class="view.icon"></i>
              <span>{{ view.label }}</span>
            </button>
          </div>

          <!-- Calendar Views -->
          <div class="calendar-view-content">
            <KeepAlive>
              <component
                :is="currentViewComponent"
                :current-date="currentDate"
                :events="filteredEvents"
                :selected-turma="selectedTurma"
                @edit-event="handleEditEvent"
                @select-date="handleDateSelect"
                @create-event="handleCreateEvent"
              />
            </KeepAlive>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Drawer -->
    <EventDrawer
      :is-open="isDrawerOpen"
      :event-data="editingEvent"
      @close="closeDrawer"
      @save="saveEvent"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCalendar } from '../../composables/useCalendar'
import Sidebar from '../../components/Sidebar.vue'
import MiniCalendar from '../../components/MiniCalendar.vue'
import ActivityLegend from '../../components/ActivityLegend.vue'
import EventDrawer from '../../components/EventDrawer.vue'
import MonthView from './calendar/MonthView.vue'
import WeekView from './calendar/WeekView.vue'
import DayView from './calendar/DayView.vue'
import ListView from './calendar/ListView.vue'

// Composable
const { formatDate, getActivityColor, getActivityIcon, getActivityLabel } = useCalendar()

// State
const currentDate = ref(new Date(2022, 0, 13)) // Janeiro 13, 2022 (matching Figma)
const selectedView = ref('month')
const selectedTurma = ref('5a-manha')
const visibleActivities = ref(['missao', 'olimpiada', 'avaliacao', 'trilha', 'expedicao'])
const events = ref([])
const isDrawerOpen = ref(false)
const editingEvent = ref(null)

// Views configuration
const views = [
  { id: 'month', label: 'Mês', icon: 'bi-calendar3' },
  { id: 'week', label: 'Semana', icon: 'bi-calendar-week' },
  { id: 'day', label: 'Dia', icon: 'bi-calendar-day' },
  { id: 'list', label: 'Lista', icon: 'bi-list-ul' }
]

// Computed
const currentPeriod = computed(() => {
  if (selectedView.value === 'month') {
    return formatDate(currentDate.value, 'month-year')
  } else if (selectedView.value === 'week') {
    return `Semana de ${formatDate(currentDate.value, 'short')}`
  } else if (selectedView.value === 'day') {
    return formatDate(currentDate.value, 'long')
  }
  return 'Lista de Eventos'
})

const currentViewComponent = computed(() => {
  const components = {
    month: MonthView,
    week: WeekView,
    day: DayView,
    list: ListView
  }
  return components[selectedView.value]
})

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    // Filter by visible activities
    if (!visibleActivities.value.includes(event.tipo)) {
      return false
    }
    
    // Filter by turma
    if (selectedTurma.value && !event.turmas.includes(selectedTurma.value)) {
      return false
    }
    
    return true
  })
})

// Methods
const previousPeriod = () => {
  const newDate = new Date(currentDate.value)
  
  if (selectedView.value === 'month') {
    newDate.setMonth(newDate.getMonth() - 1)
  } else if (selectedView.value === 'week') {
    newDate.setDate(newDate.getDate() - 7)
  } else if (selectedView.value === 'day') {
    newDate.setDate(newDate.getDate() - 1)
  }
  
  currentDate.value = newDate
}

const nextPeriod = () => {
  const newDate = new Date(currentDate.value)
  
  if (selectedView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + 1)
  } else if (selectedView.value === 'week') {
    newDate.setDate(newDate.getDate() + 7)
  } else if (selectedView.value === 'day') {
    newDate.setDate(newDate.getDate() + 1)
  }
  
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
}

const handleDateSelect = (date) => {
  currentDate.value = date
  if (selectedView.value === 'month') {
    selectedView.value = 'day'
  }
}

const openDrawer = () => {
  editingEvent.value = null
  isDrawerOpen.value = true
}

const handleEditEvent = (event) => {
  editingEvent.value = { ...event }
  isDrawerOpen.value = true
}

const handleCreateEvent = (prefilledData) => {
  editingEvent.value = prefilledData || null
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  editingEvent.value = null
}

const saveEvent = (eventData) => {
  if (eventData.id) {
    // Update existing
    const index = events.value.findIndex(e => e.id === eventData.id)
    if (index !== -1) {
      events.value[index] = { ...eventData }
    }
  } else {
    // Create new
    events.value.push({
      ...eventData,
      id: Date.now(),
      status: 'ativo',
      origem: 'professor'
    })
  }
  
  closeDrawer()
}

// Load mock data
onMounted(async () => {
  try {
    const response = await fetch('/src/data/eventsCalendar.json')
    const data = await response.json()
    events.value = data.events || []
  } catch (error) {
    console.error('Error loading events:', error)
  }
})
</script>

<style scoped>
.calendar-page {
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
}

.calendar-main {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.calendar-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.25rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1600px;
  margin: 0 auto;
}

.turma-selector-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.turma-selector {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #1e1e2d;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.turma-selector:hover {
  border-color: #7367F0;
}

.turma-selector:focus {
  outline: none;
  border-color: #7367F0;
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.badge-year {
  padding: 0.25rem 0.625rem;
  background: #e0e0ff;
  color: #7367F0;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
}

.btn-add-event {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: #7367F0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-event:hover {
  background: #6558d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(115, 103, 240, 0.3);
}

/* Content Grid */
.calendar-content {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.calendar-sidebar-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.calendar-center {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* Navigation */
.calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  background: white;
  color: #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #1e1e2d;
}

.current-period {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e1e2d;
  margin: 0;
  min-width: 200px;
  text-align: center;
}

/* View Tabs */
.view-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #f9fafb;
  color: #1e1e2d;
}

.tab-btn.active {
  background: #7367F0;
  border-color: #7367F0;
  color: white;
}

.tab-btn i {
  font-size: 1rem;
}

/* Calendar View Content */
.calendar-view-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 1280px) {
  .calendar-content {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 1024px) {
  .calendar-main {
    margin-left: 0;
  }
  
  .calendar-content {
    grid-template-columns: 1fr;
  }
  
  .calendar-sidebar-left {
    flex-direction: row;
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .turma-selector-wrapper {
    justify-content: center;
  }
  
  .btn-add-event {
    width: 100%;
    justify-content: center;
  }
  
  .view-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tab-btn span {
    display: none;
  }
}
</style>
