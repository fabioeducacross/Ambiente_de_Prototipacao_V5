<template>
  <div class="calendar-page">
    <!-- Page Header -->
    <header class="page-header">
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
          >
            <option value="">Todas as Turmas</option>
            <option value="5a-manha">5° A - Manhã</option>
            <option value="5b-manha">5° B - Manhã</option>
            <option value="5a-tarde">5° A - Tarde</option>
            <option value="6a-manha">6° A - Manhã</option>
            <option value="6b-manha">6° B - Manhã</option>
            <option value="7a-manha">7° A - Manhã</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Calendar Layout Template -->
    <CalendarLayoutTemplate
      :events="filteredEvents"
      :activity-options="activityOptions"
      :initial-date="currentDate"
      :current-view="selectedView"
      @add-event="openDrawer"
      @activity-change="handleActivityChange"
      @view-change="selectedView = $event"
      @day-click="handleDayClick"
      @event-click="handleEventClick"
      @month-change="handleMonthChange"
    >
      <!-- Footer slot: Activity Legend -->
      <template #footer>
        <ActivityLegend
          title="Tipos de Atividade"
          :activities="activityTypes"
          :interactive="false"
        />
      </template>
    </CalendarLayoutTemplate>

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
import { RouterLink } from 'vue-router'
import CalendarLayoutTemplate from '../../components/templates/CalendarLayoutTemplate.vue'
import ActivityLegend from '../../components/organisms/ActivityLegend.vue'
import EventDrawer from '../../components/EventDrawer.vue'
import eventsData from '../../data/eventsCalendar.json'

// Debug: Verificar import do JSON
console.log('🔍 eventsData importado:', eventsData)
console.log('🔍 eventsData.events existe?', !!eventsData.events)
console.log('🔍 eventsData.events é array?', Array.isArray(eventsData.events))
console.log('🔍 Quantidade de eventos:', eventsData.events?.length)

// State
const currentDate = ref(new Date())
const selectedView = ref('month')
const selectedTurma = ref('')
const selectedActivities = ref([])
const isDrawerOpen = ref(false)
const editingEvent = ref(null)
const events = ref([])

// Activity types for legend and filters
const activityTypes = [
  { tipo: 'missao', cor: '#7367F0', label: 'Missões' },
  { tipo: 'olimpiada', cor: '#00CFE8', label: 'Olimpíadas' },
  { tipo: 'avaliacao', cor: '#FF9F43', label: 'Avaliações' },
  { tipo: 'trilha', cor: '#28C76F', label: 'Trilhas' },
  { tipo: 'expedicao', cor: '#EA5455', label: 'Expedições' },
  { tipo: 'outro', cor: '#82868B', label: 'Outros' }
]

// Activity options for checkboxes
const activityOptions = computed(() => 
  activityTypes.map(activity => ({
    value: activity.tipo,
    label: activity.label,
    disabled: false
  }))
)

// Filtered events by turma
const filteredEvents = computed(() => {
  console.log('🔎 DEBUG - Type of events.value:', typeof events.value, Array.isArray(events.value))
  console.log('🔎 DEBUG - events.value:', events.value)
  
  // Garantir que events.value é array
  if (!Array.isArray(events.value)) {
    console.error('❌ events.value NÃO é array!', events.value)
    return []
  }
  
  let filtered = events.value

  // Filter by turma
  if (selectedTurma.value) {
    filtered = filtered.filter(event => 
      event.turmas?.includes(selectedTurma.value)
    )
  }

  console.log('🔍 Filtro aplicado - selectedTurma:', selectedTurma.value || '(todas)')
  console.log('📊 Eventos após filtro:', filtered.length)

  // Convert to format expected by CalendarLayoutTemplate
  const converted = filtered.map(event => ({
    id: event.id,
    title: event.titulo,
    date: event.dataInicio,
    type: event.atividade || event.tipo || 'outro',
    color: activityTypes.find(a => a.tipo === (event.atividade || event.tipo))?.cor || '#82868B',
    turmas: event.turmas,
    horaInicio: event.horaInicio,
    horaTermino: event.horaTermino || event.horaFim
  }))

  console.log('✨ Eventos convertidos para template:', converted.length)
  if (converted.length > 0) {
    console.log('📅 Amostra de eventos convertidos:', converted.slice(0, 2))
  }

  return converted
})

// Event handlers
const handleActivityChange = (activities) => {
  selectedActivities.value = activities
  console.log('Atividades filtradas:', activities)
}

const handleDayClick = (day) => {
  console.log('Dia clicado:', day)
}

const handleEventClick = (event) => {
  // Find original event data
  const originalEvent = events.value.find(e => e.id === event.id)
  if (originalEvent) {
    handleEditEvent(originalEvent)
  }
}

const handleMonthChange = (newDate) => {
  currentDate.value = newDate
  console.log('Mês alterado:', newDate)
}

const openDrawer = () => {
  editingEvent.value = null
  isDrawerOpen.value = true
}

const handleEditEvent = (event) => {
  editingEvent.value = event
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
    const newEvent = {
      ...eventPayload,
      id: Date.now() // Simple ID generation
    }
    events.value.push(newEvent)
  }
  
  console.log('Evento salvo:', eventPayload)
  closeDrawer()
}

// Load events on mount
onMounted(() => {
  events.value = eventsData.events || []
  console.log('✅ Events carregados:', events.value.length, 'eventos')
  console.log('📅 Primeiros 3 eventos:', events.value.slice(0, 3).map(e => ({
    id: e.id,
    titulo: e.titulo,
    dataInicio: e.dataInicio,
    turmas: e.turmas
  })))
})
</script>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f7fa;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 24px 32px;
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.breadcrumb-item:hover {
  opacity: 0.8;
}

.breadcrumb-item.active {
  color: white;
  font-weight: 500;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

/* Header Row */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.title-section {
  flex: 1;
}

.page-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.page-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
}

/* Actions Section */
.actions-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.turma-selector {
  padding: 10px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
}

.turma-selector:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.turma-selector option {
  background-color: white;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 1024px) {
  .page-header {
    padding: 20px 24px;
  }
  
  .header-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .actions-section {
    width: 100%;
  }
  
  .turma-selector {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .turma-selector {
    min-width: auto;
  }
}
</style>
