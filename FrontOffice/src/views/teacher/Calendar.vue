<template>
  <div>
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="calendar-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <Sidebar :collapsed="sidebarCollapsed" />
      
      <div class="calendar-content">
        <!-- Calendar Header -->
        <CalendarHeader
      :title="headerTitle"
      :current-view="currentView"
      :can-create="canCreateEvent"
      @prev="navigatePrev"
      @next="navigateNext"
      @today="navigateToday"
      @view-change="changeView"
      @create="openCreateModal"
      @toggle-filters="toggleFilters"
    />

    <!-- Calendar Views -->
    <div class="calendar-body">
      <MonthView 
        v-if="currentView === 'month'"
        :current-date="currentDate"
        :events="filteredEvents"
        @event-click="openEventModal"
        @show-more="handleShowMore"
      />
      
      <WeekView 
        v-else-if="currentView === 'week'"
        :current-date="currentDate"
        :events="filteredEvents"
        @event-click="openEventModal"
      />
      
      <DayView 
        v-else-if="currentView === 'day'"
        :current-date="currentDate"
        :events="filteredEvents"
        @event-click="openEventModal"
      />
      
      <ListView 
        v-else-if="currentView === 'list'"
        :events="filteredEvents"
        :start-date="listViewStart"
        :end-date="listViewEnd"
        @event-click="openEventModal"
      />
    </div>

    <!-- Filter Sidebar -->
    <FilterSidebar
      :is-open="isFilterOpen"
      :filters="filters"
      @close="toggleFilters"
      @update:filters="updateFilters"
    />

    <!-- Event Modal -->
    <EventModal
      :is-open="isEventModalOpen"
      :event="selectedEvent"
      @close="closeEventModal"
      @action="handleEventAction"
    />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  addMonths, 
  subMonths, 
  addWeeks, 
  subWeeks, 
  addDays, 
  subDays,
  startOfMonth,
  endOfMonth,
  format
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Components
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import CalendarHeader from '@/components/calendar/CalendarHeader.vue'
import MonthView from '@/components/calendar/MonthView.vue'
import WeekView from '@/components/calendar/WeekView.vue'
import DayView from '@/components/calendar/DayView.vue'
import ListView from '@/components/calendar/ListView.vue'
import FilterSidebar from '@/components/calendar/FilterSidebar.vue'
import EventModal from '@/components/calendar/EventModal.vue'

// Data & Composables
import calendarMockData from '@/data/calendar-mock-teacher.json'
import { CATEGORIES, ORIGIN_LEVELS, isVisibleStatus } from '@/data/calendar-enums'
import { useCalendarPermissions } from '@/composables/useCalendarPermissions'

const { canCreateEvent } = useCalendarPermissions()

// State
const sidebarCollapsed = ref(false)
const currentView = ref('month')
const currentDate = ref(new Date(2026, 1, 12)) // 12 de fevereiro de 2026
const events = ref(calendarMockData)
const isFilterOpen = ref(false)
const isEventModalOpen = ref(false)
const selectedEvent = ref(null)

// Filtros
const filters = ref({
  categories: Object.keys(CATEGORIES),
  origins: Object.keys(ORIGIN_LEVELS),
  showCanceled: false,
  searchText: ''
})

// Computed
const headerTitle = computed(() => {
  switch (currentView.value) {
    case 'month':
      return format(currentDate.value, "MMMM 'de' yyyy", { locale: ptBR })
    case 'week':
      return format(currentDate.value, "'Semana de' d 'de' MMMM", { locale: ptBR })
    case 'day':
      return format(currentDate.value, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
    case 'list':
      return 'Lista de Eventos'
    default:
      return ''
  }
})

const listViewStart = computed(() => startOfMonth(currentDate.value))
const listViewEnd = computed(() => endOfMonth(currentDate.value))

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    // Filtro de status
    if (!filters.value.showCanceled && !isVisibleStatus(event.status)) {
      return false
    }

    // Filtro de categorias
    if (!filters.value.categories.includes(event.category)) {
      return false
    }

    // Filtro de origens
    if (!filters.value.origins.includes(event.origin_level)) {
      return false
    }

    // Filtro de busca
    if (filters.value.searchText) {
      const searchLower = filters.value.searchText.toLowerCase()
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower)
      )
    }

    return true
  })
})

// Navigation Methods
const navigatePrev = () => {
  switch (currentView.value) {
    case 'month':
      currentDate.value = subMonths(currentDate.value, 1)
      break
    case 'week':
      currentDate.value = subWeeks(currentDate.value, 1)
      break
    case 'day':
      currentDate.value = subDays(currentDate.value, 1)
      break
  }
}

const navigateNext = () => {
  switch (currentView.value) {
    case 'month':
      currentDate.value = addMonths(currentDate.value, 1)
      break
    case 'week':
      currentDate.value = addWeeks(currentDate.value, 1)
      break
    case 'day':
      currentDate.value = addDays(currentDate.value, 1)
      break
  }
}

const navigateToday = () => {
  currentDate.value = new Date()
}

const changeView = (view) => {
  currentView.value = view
}

// Filter Methods
const toggleFilters = () => {
  isFilterOpen.value = !isFilterOpen.value
}

const updateFilters = (newFilters) => {
  filters.value = newFilters
}

// Event Modal Methods
const openEventModal = (event) => {
  selectedEvent.value = event
  isEventModalOpen.value = true
}

const closeEventModal = () => {
  isEventModalOpen.value = false
  selectedEvent.value = null
}

const openCreateModal = () => {
  console.log('Abrir modal de criação de evento')
  // TODO: Implementar modal de criação
}

const handleEventAction = ({ action, event }) => {
  console.log('Ação do evento:', action, event)
  
  switch (action) {
    case 'edit':
      console.log('Editar evento:', event.id)
      // TODO: Implementar edição
      break
    case 'duplicate':
      console.log('Duplicar evento:', event.id)
      // TODO: Implementar duplicação
      break
    case 'cancel':
      console.log('Cancelar evento:', event.id)
      // TODO: Implementar cancelamento
      break
    case 'open_module':
      if (event.deeplink) {
        window.location.href = event.deeplink
      }
      break
  }
  
  closeEventModal()
}

const handleShowMore = (day) => {
  currentDate.value = new Date(day.date)
  currentView.value = 'day'
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<style scoped>
.calendar-page {
  display: flex;
  min-height: calc(100vh - 70px);
  padding-top: 70px;
}

.calendar-page.sidebar-collapsed .calendar-content {
  margin-left: 70px;
}

.calendar-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  background: #f5f5f5;
}

.calendar-body {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

@media (max-width: 1024px) {
  .calendar-content {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .calendar-body {
    padding: 12px;
  }
}
</style>
