<template>
  <div>
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="calendar-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <Sidebar :collapsed="sidebarCollapsed" />
      
      <div class="calendar-content">
        <!-- Calendário Unificado -->
        <div class="calendar-unified-container">
          <!-- Class Selector Header -->
          <div class="class-selector-header">
            <div class="class-selector-wrapper">
              <div class="class-selector-button" @click="toggleClassDropdown">
                <div class="class-info">
                  <span class="class-name">{{ selectedClass.name }}</span>
                  <span class="class-badge">{{ selectedClass.grade }}</span>
                </div>
                <span class="material-symbols-outlined chevron">expand_more</span>
              </div>
              
              <!-- Dropdown Menu -->
              <div v-if="showClassDropdown" class="class-dropdown">
                <button
                  v-for="classItem in availableClasses"
                  :key="classItem.id"
                  class="dropdown-item"
                  :class="{ active: selectedClassId === classItem.id }"
                  @click="selectClass(classItem)"
                >
                  <span class="item-name">{{ classItem.name }}</span>
                  <span class="item-badge">{{ classItem.grade }}</span>
                </button>
              </div>
            </div>
            
            <div class="school-info">
              <span class="material-symbols-outlined">school</span>
              <span class="school-name">{{ schoolName }}</span>
            </div>
          </div>
          
          <!-- Layout em 2 colunas seguindo Figma -->
          <div class="calendar-layout">
            <!-- Coluna Esquerda: Mini Picker + Botão + Filtros -->
            <div class="left-column">
              <div class="left-column-content">
                <!-- Botão Adicionar Evento -->
                <button 
                  v-if="canCreateEvent"
                  class="btn-add-event"
                  @click="openCreateModal"
                >
                  <span class="material-symbols-outlined">add</span>
                  Adicionar Evento
                </button>
                
                <!-- Mini Date Picker -->
                <div class="mini-picker-figma">
                  <div class="picker-header">
                    <span class="month-label">{{ miniPickerMonth }}</span>
                    <div class="nav-buttons">
                      <button class="nav-btn" @click="navigatePrevMonth" aria-label="Mês anterior">
                        <span class="material-symbols-outlined">chevron_left</span>
                      </button>
                      <button class="nav-btn" @click="navigateNextMonth" aria-label="Próximo mês">
                        <span class="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  
                  <div class="weekdays-row">
                    <div v-for="day in miniWeekDays" :key="day" class="weekday-label">
                      {{ day }}
                    </div>
                  </div>
                  
                  <div class="days-grid">
                    <button
                      v-for="day in miniCalendarDays"
                      :key="day.date"
                      class="day-button"
                      :class="{
                        'other-month': day.otherMonth,
                        'selected': day.selected,
                        'today': day.today
                      }"
                      @click="handleDateSelect(day.date)"
                    >
                      {{ day.day }}
                    </button>
                  </div>
                </div>
                
                <!-- Divider -->
                <div class="divider"></div>
                
                <!-- Filtros de Atividades -->
                <div class="activity-filters-figma">
                  <h3 class="filters-title">Tipo de Atividade</h3>
                  <div class="filters-list">
                    <label 
                      v-for="category in categories" 
                      :key="category.key"
                      class="filter-item"
                    >
                      <input 
                        type="checkbox" 
                        :value="category.key"
                        :checked="selectedCategories.includes(category.key)"
                        @change="toggleCategory(category.key)"
                        class="visually-hidden"
                      >
                      <div 
                        class="checkbox-custom" 
                        :class="{ 'checked': selectedCategories.includes(category.key) }"
                        :style="{ '--category-color': category.color }"
                      >
                        <span v-if="selectedCategories.includes(category.key)" class="material-symbols-outlined check-icon">
                          check
                        </span>
                      </div>
                      <span class="filter-label">{{ category.label }}</span>
                    </label>
                  </div>
                </div>
                
                <!-- Filtros de Perfil de Origem -->
                <div class="activity-filters-figma">
                  <h3 class="filters-title">Perfil de Origem</h3>
                  <div class="filters-list">
                    <label 
                      v-for="origin in origins" 
                      :key="origin.key"
                      class="filter-item"
                    >
                      <input 
                        type="checkbox" 
                        :value="origin.key"
                        :checked="selectedOrigins.includes(origin.key)"
                        @change="toggleOrigin(origin.key)"
                        class="visually-hidden"
                      >
                      <div 
                        class="checkbox-custom checkbox-origin" 
                        :class="{ 'checked': selectedOrigins.includes(origin.key) }"
                        :style="{ '--category-color': origin.color }"
                      >
                        <span v-if="selectedOrigins.includes(origin.key)" class="material-symbols-outlined check-icon">
                          check
                        </span>
                      </div>
                      <span class="filter-label">{{ origin.label }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Divider Vertical -->
            <div class="vertical-divider"></div>
            
            <!-- Coluna Direita: Calendário Principal -->
            <div class="right-column">
              <!-- Header do Calendário -->
              <div class="calendar-header-figma">
                <div class="header-left">
                  <h2 class="month-title">{{ mainCalendarTitle }}</h2>
                  <div class="month-navigation">
                    <button class="nav-btn" @click="navigatePrev" aria-label="Anterior">
                      <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button class="nav-btn" @click="navigateNext" aria-label="Próximo">
                      <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                    <button class="nav-btn today-btn" @click="navigateToday">Hoje</button>
                  </div>
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
                      @click="currentView = view.value"
                    >
                      {{ view.label }}
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Views do Calendário -->
              <div class="calendar-view-container">
                <!-- Month View -->
                <div v-if="currentView === 'month'" class="month-view-figma">
                  <div class="weekdays-header">
                    <div v-for="day in weekDays" :key="day" class="weekday-label">
                      {{ day }}
                    </div>
                  </div>
                  
                  <div class="calendar-grid">
                    <div
                      v-for="day in calendarDays"
                      :key="day.date"
                      class="day-cell"
                      :class="{
                        'other-month': day.otherMonth,
                        'today': day.isToday,
                        'has-events': day.events.length > 0
                      }"
                    >
                      <div class="day-number">{{ day.dayNumber }}</div>
                      
                      <div class="events-list">
                        <div
                          v-for="event in day.visibleEvents"
                          :key="event.id"
                          class="event-badge"
                          :style="{ 
                            backgroundColor: getEventColor(event.category),
                            borderColor: getEventColor(event.category)
                          }"
                          @click.stop="openEventModal(event)"
                        >
                          <span class="event-title">{{ truncateTitle(event.title) }}</span>
                        </div>
                        
                        <button 
                          v-if="day.events.length > maxEventsPerDay"
                          class="show-more-btn"
                          @click.stop="showMoreEvents(day.date)"
                        >
                          +{{ day.events.length - maxEventsPerDay }} mais
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Week View -->
                <div v-else-if="currentView === 'week'" class="week-view">
                  <div class="week-grid">
                    <div class="time-column">
                      <div class="time-header"></div>
                      <div v-for="hour in hours" :key="hour" class="time-label">
                        {{ formatHour(hour) }}
                      </div>
                    </div>

                    <div 
                      v-for="day in weekViewDays" 
                      :key="day.date"
                      class="day-column"
                      :class="{ 'is-today': day.isToday }"
                    >
                      <div class="day-header">
                        <div class="day-name">{{ day.dayName }}</div>
                        <div class="day-number" :class="{ 'today-number': day.isToday }">
                          {{ day.dayNumber }}
                        </div>
                      </div>
                      <div class="day-timeline">
                        <div v-for="hour in hours" :key="hour" class="hour-line"></div>
                        
                        <!-- Events -->
                        <div
                          v-for="event in day.events"
                          :key="event.id"
                          class="calendar-chip week-event"
                          :style="getEventStyle(event)"
                          @click.stop="openEventModal(event)"
                        >
                          <div class="chip-content">
                            <span class="chip-title">{{ event.title }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Day View -->
                <div v-else-if="currentView === 'day'" class="day-view">
                  <div class="timeline-container">
                    <div class="time-column">
                      <div v-for="hour in hours" :key="hour" class="time-label">
                        {{ formatHour(hour) }}
                      </div>
                    </div>

                    <div class="events-column">
                      <div v-for="hour in hours" :key="hour" class="hour-line">
                        <div class="half-hour-line"></div>
                      </div>

                      <div v-if="isToday(currentDate)" class="current-time-indicator" :style="{ top: currentTimePosition }">
                        <div class="current-time-dot"></div>
                        <div class="current-time-line"></div>
                      </div>

                      <div
                        v-for="event in dayViewEvents"
                        :key="event.id"
                        class="calendar-chip day-event"
                        :style="getEventStyle(event)"
                        @click.stop="openEventModal(event)"
                      >
                         <div class="chip-header">
                            <span class="chip-time">{{ formatTime(event.start_at) }}</span>
                         </div>
                         <div class="chip-content">
                            <span class="chip-title">{{ event.title }}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- List View -->
                <div v-else-if="currentView === 'list'" class="list-view">
                   <div v-for="group in listViewGroups" :key="group.date" class="date-group">
                      <div class="date-header">
                        <div class="date-info">
                          <span class="date-day">{{ group.dayNumber }}</span>
                          <div class="date-text">
                            <span class="date-weekday">{{ group.weekday }}</span>
                            <span class="date-month">{{ group.month }}</span>
                          </div>
                        </div>
                        <span class="event-count">{{ group.events.length }} eventos</span>
                      </div>
                      <div class="events-list">
                         <div 
                           v-for="event in group.events" 
                           :key="event.id" 
                           class="event-item"
                           @click="openEventModal(event)"
                         >
                            <div class="event-color-bar" :style="{ backgroundColor: getEventColor(event.category) }"></div>
                            <div class="event-time">
                               {{ formatTime(event.start_at) }}
                            </div>
                            <div class="event-content">
                               <span class="event-title">{{ event.title }}</span>
                               <span class="event-category">{{ getCategoryLabel(event.category) }}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Event Modal (Inlined) -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isEventModalOpen" class="modal-overlay" @click.self="closeEventModal">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">{{ selectedEvent?.title }}</h3>
              <button class="btn-icon" @click="closeEventModal">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="event-detail-row">
                 <span class="material-symbols-outlined">schedule</span>
                 <div class="event-detail-content">
                    <strong>{{ formatEventDate(selectedEvent?.start_at) }}</strong>
                    <span>{{ formatTime(selectedEvent?.start_at) }} - {{ formatTime(selectedEvent?.end_at) }}</span>
                 </div>
              </div>
              <div class="event-detail-row">
                 <span class="material-symbols-outlined">category</span>
                 <div class="event-detail-content">
                    <span class="badge" :style="{ color: getEventColor(selectedEvent?.category) }">
                       {{ getCategoryLabel(selectedEvent?.category) }}
                    </span>
                 </div>
              </div>
              <div v-if="selectedEvent?.description" class="event-detail-row">
                 <span class="material-symbols-outlined">description</span>
                 <p>{{ selectedEvent?.description }}</p>
              </div>
            </div>
            <div class="modal-footer">
               <button class="btn btn-secondary" @click="closeEventModal">Fechar</button>
               <button class="btn btn-primary" @click="handleEventAction('edit', selectedEvent)">Editar</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  addMonths, 
  subMonths, 
  addWeeks, 
  subWeeks, 
  addDays, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  isSameDay, 
  format, 
  getHours, 
  getMinutes, 
  startOfDay, 
  compareAsc 
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Imports
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import calendarMockData from '@/data/calendar-mock-teacher.json'
import { CATEGORIES, ORIGIN_LEVELS, isVisibleStatus } from '@/data/calendar-enums'
import { useCalendarPermissions } from '@/composables/useCalendarPermissions'
import { useCurrentUser } from '@/composables/useCurrentUser'

const { canCreateEvent } = useCalendarPermissions()
const { setMockUser } = useCurrentUser()

// State
const sidebarCollapsed = ref(false)
const currentView = ref('month')
const currentDate = ref(new Date(2026, 1, 12))
const events = ref(calendarMockData)
const isEventModalOpen = ref(false)
const selectedEvent = ref(null)
const selectedCategories = ref(Object.keys(CATEGORIES))
const selectedOrigins = ref(Object.keys(ORIGIN_LEVELS))
const maxEventsPerDay = ref(3)

// Class Selector
const selectedClassId = ref('5a')
const schoolName = ref('COLÉGIO FLORESTA ENCANTADA')
const showClassDropdown = ref(false)
const availableClasses = ref([
  { id: '5a', name: 'Turma 5º A - Manhã', grade: '5º ano' },
  { id: '5b', name: 'Turma 5º B - Tarde', grade: '5º ano' },
  { id: '6a', name: 'Turma 6º A - Manhã', grade: '6º ano' },
  { id: '6b', name: 'Turma 6º B - Tarde', grade: '6º ano' }
])

const views = [
  { label: 'Mês', value: 'month' },
  { label: 'Semana', value: 'week' },
  { label: 'Dia', value: 'day' },
  { label: 'Lista', value: 'list' }
]

const miniWeekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']
const hours = Array.from({ length: 24 }, (_, i) => i)

// Computed
const categories = computed(() => 
  Object.keys(CATEGORIES).map(key => ({
    key,
    label: CATEGORIES[key].label,
    color: CATEGORIES[key].color
  }))
)

const origins = computed(() => 
  Object.keys(ORIGIN_LEVELS).map(key => ({
    key,
    label: ORIGIN_LEVELS[key].label,
    color: ORIGIN_LEVELS[key].color,
    icon: ORIGIN_LEVELS[key].icon
  }))
)

const selectedClass = computed(() => 
  availableClasses.value.find(c => c.id === selectedClassId.value) || availableClasses.value[0]
)

const miniPickerMonth = computed(() => 
  format(currentDate.value, 'MMMM yyyy', { locale: ptBR })
)

const mainCalendarTitle = computed(() => {
  const formatted = format(currentDate.value, 'MMMM \'de\' yyyy', { locale: ptBR })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    if (!selectedCategories.value.includes(event.category)) return false
    if (!selectedOrigins.value.includes(event.origin_level)) return false
    if (!isVisibleStatus(event.status, false)) return false
    return true
  })
})

const miniCalendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end }).map(date => ({
    date: date.toISOString(),
    day: date.getDate(),
    otherMonth: !isSameMonth(date, currentDate.value),
    selected: isSameDay(date, currentDate.value),
    today: isToday(date)
  }))
})

// Month View Days
const calendarDays = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(date => {
    const dayEvents = filteredEvents.value.filter(event => 
      isSameDay(new Date(event.start_at), date)
    )
    return {
      date: date.toISOString(),
      dayNumber: date.getDate(),
      otherMonth: !isSameMonth(date, currentDate.value),
      isToday: isToday(date),
      events: dayEvents,
      visibleEvents: dayEvents.slice(0, maxEventsPerDay.value)
    }
  })
})

// Week View Days
const weekViewDays = computed(() => {
  if (currentView.value !== 'week') return []
  const start = startOfWeek(currentDate.value, { weekStartsOn: 0 })
  const end = endOfWeek(currentDate.value, { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end }).map(day => {
    const dayEvents = filteredEvents.value.filter(event => 
      isSameDay(new Date(event.start_at), day) && !event.all_day
    )
    return {
      date: day.toISOString(),
      dayName: format(day, 'EEE', { locale: ptBR }),
      dayNumber: format(day, 'd'),
      isToday: isToday(day),
      events: dayEvents
    }
  })
})

// Day View Events
const dayViewEvents = computed(() => {
  if (currentView.value !== 'day') return []
  return filteredEvents.value.filter(event => 
    isSameDay(new Date(event.start_at), currentDate.value) && !event.all_day
  )
})

// List View Groups
const listViewGroups = computed(() => {
  if (currentView.value !== 'list') return []
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  
  const inRange = filteredEvents.value.filter(event => {
    const d = new Date(event.start_at)
    return d >= monthStart && d <= monthEnd
  })

  // Group by date
  const groups = {}
  inRange.forEach(event => {
    const d = new Date(event.start_at)
    const key = format(startOfDay(d), 'yyyy-MM-dd')
    if (!groups[key]) {
      groups[key] = {
        date: key,
        dayNumber: format(d, 'd'),
        weekday: format(d, 'EEEE', { locale: ptBR }),
        month: format(d, 'MMMM yyyy', { locale: ptBR }),
        events: [],
        sortDate: d
      }
    }
    groups[key].events.push(event)
  })

  return Object.values(groups).sort((a, b) => compareAsc(a.sortDate, b.sortDate))
})

// Current Time Indicator
const currentTimePosition = ref('0px')
let timeInterval = null

// Methods
const getEventColor = (category) => CATEGORIES[category]?.color || '#6c757d'
const getCategoryLabel = (category) => CATEGORIES[category]?.label || 'Evento'
const formatHour = (h) => `${h.toString().padStart(2, '0')}:00`
const formatTime = (dateStr) => dateStr ? format(new Date(dateStr), 'HH:mm') : ''
const formatEventDate = (dateStr) => dateStr ? format(new Date(dateStr), "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''

const truncateTitle = (title) => title.length > 20 ? title.substring(0, 20) + '...' : title
const toggleClassDropdown = () => showClassDropdown.value = !showClassDropdown.value
const selectClass = (item) => { selectedClassId.value = item.id; showClassDropdown.value = false; }
const toggleCategory = (key) => {
  const i = selectedCategories.value.indexOf(key)
  if (i > -1) selectedCategories.value.splice(i, 1)
  else selectedCategories.value.push(key)
}

const toggleOrigin = (key) => {
  const i = selectedOrigins.value.indexOf(key)
  if (i > -1) selectedOrigins.value.splice(i, 1)
  else selectedOrigins.value.push(key)
}

const showMoreEvents = (dateStr) => {
  currentDate.value = new Date(dateStr)
  currentView.value = 'day'
}

const getEventStyle = (event) => {
  const start = new Date(event.start_at)
  const end = event.end_at ? new Date(event.end_at) : addDays(start, 0) // fallback
  
  const startH = getHours(start)
  const startM = getMinutes(start)
  const endH = getHours(end)
  const endM = getMinutes(end)
  
  const hourHeight = currentView.value === 'day' ? 80 : 60
  
  const top = (startH * hourHeight) + (startM / 60) * hourHeight
  
  let durationMinutes = ((endH * 60) + endM) - ((startH * 60) + startM)
  if (durationMinutes <= 0) durationMinutes = 60
  
  const height = (durationMinutes / 60) * hourHeight
  
  return {
    top: `${top}px`,
    height: `${height}px`,
    backgroundColor: getEventColor(event.category) + '30', // adding opacity
    borderLeft: `3px solid ${getEventColor(event.category)}`,
    position: 'absolute',
    left: '4px',
    right: '4px',
    borderRadius: '4px',
    fontSize: '12px',
    padding: '4px',
    overflow: 'hidden',
    cursor: 'pointer'
  }
}

const updateCurrentTime = () => {
  const now = new Date()
  const h = getHours(now)
  const m = getMinutes(now)
  // Only relevant for DayView (80px/hr)
  const hourHeight = 80
  const pos = (h * hourHeight) + (m / 60) * hourHeight
  currentTimePosition.value = `${pos}px`
}

const navigatePrev = () => {
  if (currentView.value === 'month') currentDate.value = subMonths(currentDate.value, 1)
  if (currentView.value === 'week') currentDate.value = subWeeks(currentDate.value, 1)
  if (currentView.value === 'day') currentDate.value = subDays(currentDate.value, 1)
  if (currentView.value === 'list') currentDate.value = subMonths(currentDate.value, 1)
}
const navigateNext = () => {
  if (currentView.value === 'month') currentDate.value = addMonths(currentDate.value, 1)
  if (currentView.value === 'week') currentDate.value = addWeeks(currentDate.value, 1)
  if (currentView.value === 'day') currentDate.value = addDays(currentDate.value, 1)
  if (currentView.value === 'list') currentDate.value = addMonths(currentDate.value, 1)
}
const navigatePrevMonth = () => currentDate.value = subMonths(currentDate.value, 1)
const navigateNextMonth = () => currentDate.value = addMonths(currentDate.value, 1)
const handleDateSelect = (dateStr) => { currentDate.value = new Date(dateStr); currentView.value = 'day'; }

const openEventModal = (event) => { selectedEvent.value = event; isEventModalOpen.value = true; }
const closeEventModal = () => { isEventModalOpen.value = false; selectedEvent.value = null; }
const openCreateModal = () => console.log('Create Event')
const handleEventAction = (action, event) => {
  console.log(action, event)
  closeEventModal()
}
const toggleSidebar = () => sidebarCollapsed.value = !sidebarCollapsed.value

onMounted(() => {
  setMockUser({
    id: 'teacher-001',
    name: 'Prof. Maria Silva',
    role: 'TEACHER',
    origin_level: 'TEACHER',
    scopes: [{ type: 'CLASS', id: 'class-5a', name: '5º Ano A' }]
  })
  updateCurrentTime()
  timeInterval = setInterval(updateCurrentTime, 60000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<style scoped>
/* Base Layout */
.calendar-page { display: flex; min-height: calc(100vh - 70px); padding-top: 70px; }
.calendar-page.sidebar-collapsed .calendar-content { margin-left: 70px; }
.calendar-content { flex: 1; margin-left: 240px; display: flex; flex-direction: column; transition: margin-left 0.3s ease; background: #f5f5f9; }

.calendar-unified-container { flex: 1; display: flex; flex-direction: column; background: #ffffff; }

/* Class Selector */
.class-selector-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid rgba(47, 43, 61, 0.16); background: #ffffff; }
.class-selector-wrapper { position: relative; }
.class-selector-button { display: flex; align-items: center; gap: 12px; padding: 8px 16px; height: 40px; background: #ffffff; border: 1.5px solid #B9B9C3; border-radius: 100px; cursor: pointer; transition: all 0.2s; }
.class-selector-button:hover { border-color: #7367F0; background: rgba(115, 103, 240, 0.04); }
.class-name { font-family: 'Montserrat', sans-serif; font-size: 14px; color: #7367F0; }
.class-badge { padding: 2px 8px; background: rgba(115, 103, 240, 0.12); border-radius: 4px; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 500; color: #7367F0; }
.class-dropdown { position: absolute; top: calc(100% + 8px); left: 0; min-width: 280px; background: #ffffff; border: 1px solid rgba(47, 43, 61, 0.16); border-radius: 6px; box-shadow: 0px 4px 16px rgba(47, 43, 61, 0.12); z-index: 1000; padding: 8px 0; }
.dropdown-item { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: none; border: none; cursor: pointer; }
.dropdown-item:hover { background: rgba(115, 103, 240, 0.08); }
.dropdown-item.active { background: rgba(115, 103, 240, 0.12); }
.school-info { display: flex; align-items: center; gap: 8px; }
.school-name { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500; color: rgba(47, 43, 61, 0.68); text-transform: uppercase; }

/* Layout Columns */
.calendar-layout { display: flex; flex: 1; overflow: hidden; }
.left-column { width: 300px; background: #ffffff; flex-shrink: 0; overflow-y: auto; border-right: 1px solid rgba(47, 43, 61, 0.16); }
.left-column-content { display: flex; flex-direction: column; gap: 20px; padding: 24px 0; }
.right-column { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #ffffff; }

/* Components */
.btn-add-event { margin: 0 24px; padding: 8px 20px; height: 40px; background: #7367F0; color: #ffffff; border: none; border-radius: 6px; font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0px 2px 6px rgba(115, 103, 240, 0.3); }
.btn-add-event:hover { background: #6558d3; }

.mini-picker-figma { margin: 0 16px; background: #ffffff; padding: 8px; border-radius: 6px; display: flex; flex-direction: column; gap: 6px; }
.picker-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; }
.month-label { font-family: 'Montserrat', sans-serif; font-size: 15px; text-transform: capitalize; }
.nav-buttons { display: flex; }
.nav-btn { width: 30px; height: 30px; background: rgba(47, 43, 61, 0.08); border: none; border-radius: 500px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.weekdays-row { display: flex; justify-content: center; font-family: 'Montserrat', sans-serif; font-size: 13px; text-align: center; }
.weekday-label { width: 36px; }
.days-grid { display: flex; flex-wrap: wrap; padding: 12px 8px; }
.day-button { width: 36px; height: 36px; background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif; font-size: 15px; border-radius: 500px; }
.day-button.selected { background: rgba(115, 103, 240, 0.24); color: #7367F0; }
.day-button.today { background: #7367F0; color: #ffffff; }

.divider { height: 1px; background: rgba(47, 43, 61, 0.16); margin: 0 24px; }
.vertical-divider { width: 1px; background: rgba(47, 43, 61, 0.16); }

.activity-filters-figma { display: flex; flex-direction: column; gap: 12px; }
.filters-title { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 500; margin: 0; padding: 0 40px; }
.filters-list { display: flex; flex-direction: column; gap: 12px; padding: 0 40px; }
.filter-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.checkbox-custom { width: 36px; height: 36px; border: 1.5px solid var(--category-color); border-radius: 6px; display: flex; align-items: center; justify-content: center; }
.checkbox-custom.checked { background: var(--category-color); }
.check-icon { font-size: 20px; color: #ffffff; }
.visually-hidden { position: absolute; width: 1px; height: 1px; opacity: 0; }

.calendar-header-figma { display: flex; align-items: center; justify-content: space-between; padding: 24px; min-height: 80px; background: #ffffff; border-bottom: 1px solid rgba(47, 43, 61, 0.16); }
.header-left { display: flex; align-items: center; gap: 24px; }
.month-title { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 500; color: rgba(47, 43, 61, 0.9); margin: 0; min-width: 200px; text-transform: capitalize; }
.month-navigation { display: flex; gap: 8px; }
.nav-btn { width: 38px; height: 38px; background: #7367F0; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 2px 4px rgba(115, 103, 240, 0.4); }
.nav-btn:hover { background: #6558d3; transform: translateY(-1px); }
.today-btn { width: auto; padding: 0 16px; font-weight: 500; font-size: 14px; background: #7367F0; color: #ffffff; border-radius: 6px; border: none; height: 38px; cursor: pointer; }
.header-right { display: flex; align-items: center; }
.view-tabs { display: flex; border: 1px solid rgba(47, 43, 61, 0.16); border-radius: 6px; overflow: hidden; }
.view-tab { padding: 8px 20px; height: 38px; background: #ffffff; border: none; border-right: 1px solid rgba(47, 43, 61, 0.16); font-family: 'Montserrat', sans-serif; font-size: 15px; cursor: pointer; }
.view-tab.active { background: #7367F0; color: #ffffff; }

/* Calendar Views */
.calendar-view-container { flex: 1; overflow: auto; padding: 24px; }

/* Month View */
.month-view-figma { height: 100%; display: flex; flex-direction: column; }
.weekdays-header { display: grid; grid-template-columns: repeat(7, 1fr); padding: 16px 0; border-bottom: 1px solid rgba(47, 43, 61, 0.16); }
.weekdays-header .weekday-label { text-align: center; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500; text-transform: uppercase; }
.calendar-grid { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-auto-rows: 1fr; border-left: 1px solid rgba(47, 43, 61, 0.16); border-top: 1px solid rgba(47, 43, 61, 0.16); }
.day-cell { border-right: 1px solid rgba(47, 43, 61, 0.16); border-bottom: 1px solid rgba(47, 43, 61, 0.16); padding: 8px; min-height: 120px; display: flex; flex-direction: column; cursor: pointer; }
.day-cell.today { background: rgba(115, 103, 240, 0.08); }
.day-cell.other-month { background: rgba(47, 43, 61, 0.02); }
.day-number { font-family: 'Montserrat', sans-serif; font-size: 13px; text-align: right; margin-bottom: 8px; }
.event-badge { padding: 4px 8px; border-radius: 4px; border-left: 3px solid; font-family: 'Montserrat', sans-serif; font-size: 12px; margin-bottom: 4px; background: rgba(255,255,255,0.9); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.show-more-btn { background: none; border: none; font-size: 11px; color: #7367F0; cursor: pointer; }

/* Week & Day View Common */
.week-view, .day-view { background: white; border-radius: 8px; overflow: hidden; }
.week-grid, .timeline-container { display: grid; overflow-x: auto; }
.week-grid { grid-template-columns: 80px repeat(7, 1fr); }
.timeline-container { grid-template-columns: 80px 1fr; }
.time-column { border-right: 1px solid #e0e0e0; background: #fafafa; }
.time-label { height: 60px; display: flex; align-items: center; justify-content: center; font-size: 12px; border-bottom: 1px solid #e0e0e0; }
.day-view .time-label { height: 80px; }
.hour-line { height: 60px; border-bottom: 1px solid #e0e0e0; }
.day-view .hour-line { height: 80px; }
.day-column { border-right: 1px solid #e0e0e0; min-width: 120px; }
.day-header { height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 2px solid #e0e0e0; }
.day-timeline, .events-column { position: relative; }
.calendar-chip { font-family: 'Montserrat', sans-serif; z-index: 10; overflow: hidden; /* Chip styles inline in script */ }
.calendar-chip .chip-title { font-weight: 600; }
.chip-time { font-size: 10px; font-weight: 600; }

/* List View */
.list-view { background: white; border-radius: 8px; }
.date-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #f8f9fa; border-bottom: 1px solid #e0e0e0; }
.date-info { display: flex; gap: 12px; }
.date-day { font-size: 32px; font-weight: 700; color: #7367F0; }
.event-item { display: grid; grid-template-columns: 4px 80px 1fr; gap: 12px; padding: 16px; border-bottom: 1px solid #eee; cursor: pointer; }
.event-item:hover { background: #f9f9f9; }
.event-color-bar { border-radius: 2px; }
.event-time { font-weight: 600; color: #2c3e50; }

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-container { background: white; width: 500px; border-radius: 12px; padding: 0; display: flex; flex-direction: column; }
.modal-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
.modal-body { padding: 20px; max-height: 60vh; overflow-y: auto; }
.modal-footer { padding: 20px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 12px; }
.btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif; font-weight: 500; }
.btn-primary { background: #7367F0; color: white; }
.btn-secondary { background: #f0f0f0; color: #333; }
.btn-icon { background: none; border: none; cursor: pointer; }
.event-detail-row { display: flex; gap: 12px; margin-bottom: 16px; }

/* Responsive specifics */
@media (max-width: 1024px) {
  .calendar-content { margin-left: 0; }
  .left-column { position: absolute; left: 0; top: 70px; height: calc(100vh - 70px); z-index: 100; transform: translateX(-100%); transition: transform 0.3s; }
  .calendar-page:not(.sidebar-collapsed) .left-column { transform: translateX(0); }
}
</style>
