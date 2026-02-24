<template>
  <div class="calendar-container">
    <!-- Header -->
    <header class="calendar-header">
      <div class="header-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <RouterLink to="/teacher" class="breadcrumb-item">
            <i class="bi bi-house-door"></i>
            Dashboard
          </RouterLink>
          <span class="breadcrumb-separator"><i class="bi bi-chevron-right"></i></span>
          <span class="breadcrumb-item active">Calendário</span>
        </nav>

        <!-- Title and actions -->
        <div class="header-row">
          <div class="title-section">
            <h1 class="page-title">Calendário de Eventos</h1>
            <p class="page-subtitle">Visualize e gerencie todos os eventos das suas turmas</p>
          </div>

          <div class="actions-section">
            <!-- Turma selector -->
            <select
              v-model="selectedTurma"
              class="turma-selector"
              @change="handleTurmaChange"
            >
              <option value="">Todas as Turmas</option>
              <option value="5a-manha">5° A - Manhã</option>
              <option value="5b-manha">5° B - Manhã</option>
              <option value="5a-tarde">5° A - Tarde</option>
              <option value="6a-manha">6° A - Manhã</option>
              <option value="6b-manha">6° B - Manhã</option>
              <option value="7a-manha">7° A - Manhã</option>
            </select>

            <!-- Add event button -->
            <button class="btn btn-primary"  @click="openDrawer">
              <i class="bi bi-plus-lg"></i>
              Adicionar Evento
            </button>
          </div>
        </div>

        <!-- Navigation and view tabs -->
        <div class="controls-row">
          <!-- Date navigation -->
          <div class="date-navigation">
            <button class="nav-btn" @click="previousPeriod" aria-label="Anterior">
              <i class="bi bi-chevron-left"></i>
            </button>
            <h2 class="current-period">{{ currentPeriodLabel }}</h2>
            <button class="nav-btn" @click="nextPeriod" aria-label="Próximo">
              <i class="bi bi-chevron-right"></i>
            </button>
            <button class="nav-btn today-btn" @click="goToToday">
              Hoje
            </button>
          </div>

          <!-- View tabs -->
          <div class="view-tabs">
            <button
              class="tab-btn"
              :class="{ active: selectedView === 'month' }"
              @click="selectedView = 'month'"
            >
              <i class="bi bi-calendar3"></i>
              Mês
            </button>
            <button
              class="tab-btn"
              :class="{ active: selectedView === 'week' }"
              @click="selectedView = 'week'"
            >
              <i class="bi bi-calendar-week"></i>
              Semana
            </button>
            <button
              class="tab-btn"
              :class="{ active: selectedView === 'day' }"
              @click="selectedView = 'day'"
            >
              <i class="bi bi-calendar-day"></i>
              Dia
            </button>
            <button
              class="tab-btn"
              :class="{ active: selectedView === 'list' }"
              @click="selectedView = 'list'"
            >
              <i class="bi bi-list-ul"></i>
              Lista
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Calendar content -->
    <main class="calendar-content">
      <KeepAlive>
        <component
          :is="currentViewComponent"
          :current-date="currentDate"
          :events="events"
          :selected-turma="selectedTurma"
          @select-date="handleDateSelect"
          @edit-event="handleEditEvent"
          @create-event="handleCreateEventFromView"
        />
      </KeepAlive>
    </main>

    <!-- Activity legend (footer) -->
    <footer class="calendar-footer">
      <div class="legend">
        <span class="legend-title">Tipos de Atividade:</span>
        <div
          v-for="activity in activityTypes"
          :key="activity.tipo"
          class="legend-item"
        >
          <span
            class="legend-dot"
            :style="{ backgroundColor: activity.cor }"
          ></span>
          <span class="legend-label">{{ activity.label }}</span>
        </div>
      </div>
    </footer>

    <!-- Event Drawer -->
    <EventDrawer
      :is-open="isDrawerOpen"
      :event-data="editingEvent"
      @close="closeDrawer"
      @save="saveEvent"
      @delete="deleteEvent"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCalendar } from '../../composables/useCalendar'
import EventDrawer from '../../components/EventDrawer.vue'
import MonthView from './calendar/MonthView.vue'
import WeekView from './calendar/WeekView.vue'
import DayView from './calendar/DayView.vue'
import ListView from './calendar/ListView.vue'
import eventsData from '../../data/eventsCalendar.json'

// State
const currentDate = ref(new Date())
const selectedView = ref('month')
const selectedTurma = ref('')
const isDrawerOpen = ref(false)
const editingEvent = ref(null)
const events = ref([])

// Composable
const { formatDate } = useCalendar()

// Activity types for legend
const activityTypes = [
  { tipo: 'missao', cor: '#7367F0', label: 'Missões' },
  { tipo: 'olimpiada', cor: '#00CFE8', label: 'Olimpíadas' },
  { tipo: 'avaliacao', cor: '#FF9F43', label: 'Avaliações' },
  { tipo: 'trilha', cor: '#28C76F', label: 'Trilhas' },
  { tipo: 'expedicao', cor: '#EA5455', label: 'Expedições' },
  { tipo: 'outro', cor: '#82868B', label: 'Outros' }
]

// Current view component
const currentViewComponent = computed(() => {
  const views = {
    month: MonthView,
    week: WeekView,
    day: DayView,
    list: ListView
  }
  return views[selectedView.value] || MonthView
})

// Current period label
const currentPeriodLabel = computed(() => {
  if (selectedView.value === 'month') {
    return formatDate(currentDate.value, 'month-year')
  }
  if (selectedView.value === 'week') {
    const weekStart = new Date(currentDate.value)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    return `${formatDate(weekStart, 'short')} - ${formatDate(weekEnd, 'short')}`
  }
  if (selectedView.value === 'day') {
    return formatDate(currentDate.value, 'long')
  }
  return 'Lista de Eventos'
})

// Navigation methods
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

// Event handlers
const handleDateSelect = (date) => {
  currentDate.value = new Date(date)
  selectedView.value = 'day'
}

const handleTurmaChange = () => {
  // Filter is reactive via computed in views
  console.log('Turma selecionada:', selectedTurma.value)
}

const openDrawer = () => {
  editingEvent.value = null
  isDrawerOpen.value = true
}

const handleEditEvent = (event) => {
  editingEvent.value = event
  isDrawerOpen.value = true
}

const handleCreateEventFromView = (date) => {
  // Pre-fill date in drawer
  const tempEvent = {
    dataInicio: date.toISOString().split('T')[0],
    dataTermino: date.toISOString().split('T')[0]
  }
  editingEvent.value = tempEvent
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  setTimeout(() => {
    editingEvent.value = null
  }, 300)
}

const saveEvent = (eventPayload) => {
  if (editingEvent.value?.id) {
    // Update existing event
    const index = events.value.findIndex(e => e.id === editingEvent.value.id)
    if (index !== -1) {
      events.value[index] = eventPayload
    }
  } else {
    // Add new event
    events.value.push(eventPayload)
  }
  
  console.log('Evento salvo:', eventPayload)
}

const deleteEvent = (eventId) => {
  events.value = events.value.filter(e => e.id !== eventId)
  console.log('Evento deletado:', eventId)
}

// Load events on mount
onMounted(() => {
  events.value = eventsData.events || []
})
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
}

/* Header */
.calendar-header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  color: #fff;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 20px;
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}

.breadcrumb-item:hover {
  color: #fff;
}

.breadcrumb-item.active {
  color: #fff;
  font-weight: 600;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.6);
}

/* Header row */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.title-section h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}

.actions-section {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Turma selector */
.turma-selector {
  padding: 10px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
}

.turma-selector:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.turma-selector:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.25);
}

.turma-selector option {
  background-color: #fff;
  color: #2c3e50;
}

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-primary {
  background-color: #fff;
  color: var(--primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Controls row */
.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

/* Date navigation */
.date-navigation {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.today-btn {
  width: auto;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
}

.current-period {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  min-width: 250px;
  text-align: center;
  text-transform: capitalize;
}

/* View tabs */
.view-tabs {
  display: flex;
  gap: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 4px;
  border-radius: 8px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.tab-btn.active {
  background-color: #fff;
  color: var(--primary);
}

.tab-btn i {
  font-size: 16px;
}

/* Content */
.calendar-content {
  flex: 1;
  overflow: hidden;
  background-color: #fff;
}

/* Footer */
.calendar-footer {
  background-color: #fff;
  border-top: 2px solid #e0e0e0;
  padding: 16px 24px;
}

.legend {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-label {
  font-size: 13px;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 1024px) {
  .header-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .actions-section {
    width: 100%;
    flex-direction: column;
  }
  
  .turma-selector,
  .btn {
    width: 100%;
  }
  
  .controls-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .date-navigation {
    width: 100%;
    justify-content: center;
  }
  
  .view-tabs {
    width: 100%;
  }
  
  .tab-btn {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .calendar-header {
    padding: 16px;
  }
  
  .title-section h1 {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .current-period {
    font-size: 16px;
    min-width: auto;
  }
  
  .tab-btn span {
    display: none;
  }
  
  .legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .legend-title {
    width: 100%;
  }
}
</style>
