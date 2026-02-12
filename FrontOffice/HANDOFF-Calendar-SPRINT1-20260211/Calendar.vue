<template>
  <div>
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="calendar-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Sidebar (lateral) -->
      <Sidebar :collapsed="sidebarCollapsed" />

      <!-- Main Content com CalendarLayoutTemplate -->
      <div class="calendar-main">
        <!-- Container com sombra e padding (matching Figma) -->
        <div class="calendar-container">
          <CalendarLayoutTemplate
            :events="calendarEvents"
            :initial-date="currentDate"
            :activity-options="activityOptions"
            :show-sidebar="true"
            @add-event="openDrawer"
            @activity-change="handleActivityChange"
            @day-click="handleDayClick"
            @event-click="handleEventClick"
            @month-change="handleMonthChange"
          >
            <!-- Slot footer para ActivityLegend já está incluído no template -->
          </CalendarLayoutTemplate>
        </div>
      </div>
    </div>

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

// Components
import AppNavbar from '../../components/AppNavbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import EventDrawer from '../../components/EventDrawer.vue'
import CalendarLayoutTemplate from '../../components/templates/CalendarLayoutTemplate.vue'

// State
const sidebarCollapsed = ref(false)
const currentDate = ref(new Date(2022, 0, 13)) // Janeiro 13, 2022 (matching Figma)
const selectedTurma = ref('5a-manha') // Para filtro futuro
const events = ref([])
const isDrawerOpen = ref(false)
const editingEvent = ref(null)

// Activity options para o CalendarLayoutTemplate
const activityOptions = [
  { value: 'missao', label: 'Missões', disabled: false },
  { value: 'olimpiada', label: 'Olimpíadas', disabled: false },
  { value: 'avaliacao', label: 'Avaliações', disabled: false },
  { value: 'trilha', label: 'Trilhas', disabled: false },
  { value: 'expedicao', label: 'Expedições', disabled: false }
]

// Computed - eventos já são filtrados pelo CalendarLayoutTemplate por tipo de atividade
// Aqui podemos adicionar filtro adicional por turma se necessário
const calendarEvents = computed(() => {
  return events.value.filter(event => {
    // Se quisermos filtrar por turma específica
    if (event.turmasAfetadas) {
      return event.turmasAfetadas.includes(selectedTurma.value)
    }
    return true
  })
})

// Methods
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const handleActivityChange = (selectedActivities) => {
  // CalendarLayoutTemplate já filtra os eventos, apenas log para debug
  console.log('Atividades selecionadas:', selectedActivities)
}

const handleDayClick = (date) => {
  console.log('Dia clicado:', date)
  // Possível ação: abrir drawer com data pré-preenchida
}

const handleEventClick = (event) => {
  editingEvent.value = event
  isDrawerOpen.value = true
}

const handleMonthChange = (newDate) => {
  currentDate.value = newDate
  console.log('Mês alterado para:', newDate)
}

const openDrawer = () => {
  editingEvent.value = null
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  editingEvent.value = null
}

const saveEvent = (eventData) => {
  if (eventData.id) {
    // Atualizar evento existente
    const index = events.value.findIndex(e => e.id === eventData.id)
    if (index !== -1) {
      events.value[index] = { ...eventData }
    }
  } else {
    // Criar novo evento
    const newEvent = {
      ...eventData,
      id: Date.now(),
      status: 'ativo',
      origem: 'professor'
    }
    events.value.push(newEvent)
  }
  closeDrawer()
}

const deleteEvent = (eventId) => {
  const index = events.value.findIndex(e => e.id === eventId)
  if (index !== -1) {
    events.value.splice(index, 1)
  }
}

// Load events from JSON
onMounted(async () => {
  try {
    const response = await fetch('/src/data/eventsCalendar.json')
    const data = await response.json()
    events.value = data.events || []  // Corrigido: data.events ao invés de data
  } catch (error) {
    console.error('Erro ao carregar eventos:', error)
    // Fallback: alguns eventos de exemplo
    events.value = []
  }
})
</script>

<style scoped>
.calendar-page {
  display: flex;
  min-height: calc(100vh - 70px);
  padding-top: 70px; /* Altura do AppNavbar fixo */
  background: #f9fafb;
}

.calendar-main {
  flex: 1;
  margin-left: 240px; /* Largura do Sidebar */
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

.calendar-page.sidebar-collapsed .calendar-main {
  margin-left: 70px;
}

/* Container do calendário com sombra (matching Figma) */
.calendar-container {
  background: white;
  border-radius: 6px;
  box-shadow: 0px 3px 12px rgba(47, 43, 61, 0.14);
  overflow: hidden;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .calendar-main {
    margin-left: 0;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .calendar-main {
    padding: 0.5rem;
  }
  
  .calendar-container {
    border-radius: 0;
  }
}
</style>
