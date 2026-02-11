<template>
  <div>
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="calendar-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Sidebar (lateral) -->
      <Sidebar :collapsed="sidebarCollapsed" />

      <!-- Main Content -->
      <div class="calendar-main">
      <!-- Content Grid -->
      <div class="calendar-content">
        <!-- Left Column: Add Event Button + Mini Calendar + Legend -->
        <aside class="calendar-sidebar-left">
          <button class="btn btn-primary btn-add-event" @click="openDrawer">
            <i class="bi bi-plus-lg"></i>
            Adicionar Evento
          </button>

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
            <div class="nav-buttons">
              <button class="nav-btn" @click="previousPeriod" aria-label="Período anterior">
                <MaterialIcon name="chevron_left" size="22" />
              </button>
              <button class="nav-btn" @click="nextPeriod" aria-label="Próximo período">
                <MaterialIcon name="chevron_right" size="22" />
              </button>
            </div>
            
            <h2 class="current-period">{{ currentPeriod }}</h2>

            <!-- View Tabs -->
            <div class="view-tabs">
              <button
                v-for="view in views"
                :key="view.id"
                class="btn"
                :class="{ active: selectedView === view.id }"
                @click="selectedView = view.id"
              >
                {{ view.label }}
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="calendar-divider"></div>

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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCalendar } from '../../composables/useCalendar'
import AppNavbar from '../../components/AppNavbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import MiniCalendar from '../../components/MiniCalendar.vue'
import ActivityLegend from '../../components/ActivityLegend.vue'
import MaterialIcon from '../../components/MaterialIcon.vue'
import EventDrawer from '../../components/EventDrawer.vue'
import MonthView from './calendar/MonthView.vue'
import WeekView from './calendar/WeekView.vue'
import DayView from './calendar/DayView.vue'
import ListView from './calendar/ListView.vue'

// Sidebar state
const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

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
  margin-left: 240px; /* Largura do Sidebar */
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  transition: margin-left 0.3s ease;
  padding: 1.5rem 2rem;
}

.calendar-page.sidebar-collapsed .calendar-main {
  margin-left: 70px;
}

/* Content Grid */
.calendar-content {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 0;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0px 3px 12px rgba(47, 43, 61, 0.14);
  border-radius: 6px;
  overflow: hidden;
  background: white;
}

.calendar-sidebar-left {
  width: 300px;
  background: var(--Misc-paper, white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid rgba(47, 43, 61, 0.12);
}

.btn-add-event {
  width: 100%;
  justify-content: center;
  padding: 24px;
  background: #7367F0;
  box-shadow: 0px 2px 6px rgba(115, 103, 240, 0.30);
  border: none;
  border-radius: 0;
  color: white;
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
}

.btn-add-event:hover {
  background: #6558d3;
}

.btn-add-event i {
  font-size: 16px;
}

.calendar-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--Misc-paper, white);
}

/* Navigation */
.calendar-navigation {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  color: rgba(47, 43, 61, 0.90);
}

.nav-btn:hover {
  background: rgba(47, 43, 61, 0.08);
}

.current-period {
  flex: 1;
  text-align: center;
  color: rgba(47, 43, 61, 0.90);
  font-size: 24px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 38px;
  margin: 0;
}

.calendar-divider {
  width: 100%;
  height: 1px;
  background: rgba(47, 43, 61, 0.12);
}

/* View Tabs */
.view-tabs {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  align-self: flex-end;
  margin-right: 24px;
}

.view-tabs .btn {
  background: rgba(115, 103, 240, 0.16);
  color: #7367F0;
  border: none;
  border-radius: 0;
  border-right: 1px solid rgba(115, 103, 240, 0.32);
  padding: 8px 20px;
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 22px;
  transition: background 0.2s ease;
}

.view-tabs .btn:first-child {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.view-tabs .btn:last-child {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-right: none;
}

.view-tabs .btn:hover {
  background: rgba(115, 103, 240, 0.24);
}

.view-tabs .btn.active,
.btn.btn-outline-primary.active {
  background: rgba(115, 103, 240, 0.24);
  border-color: rgba(115, 103, 240, 0.32);
  color: #7367F0;
}

.view-tabs .btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.view-tabs .btn i {
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
  
  .sidebar-open ~ .calendar-main {
    margin-left: 240px;
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
  .view-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .view-tabs .btn span {
    display: none;
  }
  
  .btn-add-event {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
}
</style>
