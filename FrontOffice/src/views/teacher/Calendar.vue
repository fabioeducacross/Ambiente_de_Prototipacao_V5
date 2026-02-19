<template>
  <div>
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="calendar-page" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Sidebar (lateral) -->
      <Sidebar :collapsed="sidebarCollapsed" />

      <!-- Main Content com CalendarLayoutTemplate -->
      <div class="calendar-main">
        <ClassSelector 
          :initial-class="selectedTurma"
          @class-change="handleClassChange"
        />
        <!-- Container com sombra e padding (matching Figma) -->
        <div class="calendar-container">
          <CalendarLayoutTemplate
            :events="calendarEvents"
            :initial-date="currentDate"
            :activity-options="activityOptions"
            :show-sidebar="true"
            :sidebar-collapsed="sidebarCollapsed"
            @add-event="openDrawer"
            @activity-change="handleActivityChange"
            @toggle-sidebar="toggleSidebar"
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
      :mode="drawerMode"
      :default-turma="selectedTurma"
      @close="closeDrawer"
      @save="saveEvent"
      @delete="deleteEvent"
      @edit="handleEditEvent"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Components
import AppNavbar from '../../components/AppNavbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import EventDrawer from '../../components/EventDrawer.vue'
import CalendarLayoutTemplate from '../../components/templates/CalendarLayoutTemplate.vue'
import ClassSelector from '../../components/calendar/ClassSelector.vue'

// Composables
import { useSidebarState } from '../../composables/useSidebarState'
import { ORIGIN_LEVELS, normalizeOriginLevel } from '../../data/calendar-enums'

// Mock Data
import calendarMockData from '../../data/calendar-mock-teacher.json'

// Constante para localStorage
const STORAGE_KEY = 'educacross_calendar_events'

// State - usando composable compartilhado
const { sidebarCollapsed, toggleSidebar, initSidebar } = useSidebarState()
const currentDate = ref(new Date(2026, 1, 15)) // Fevereiro 15, 2026 (matching events data)
const selectedTurma = ref('5a-manha') // Para filtro futuro
const events = ref([])
const isDrawerOpen = ref(false)
const editingEvent = ref(null)
const drawerMode = ref('create') // 'view', 'edit', 'create'

// Funções de persistência
const saveToLocalStorage = () => {
  try {
    const data = JSON.stringify(events.value)
    localStorage.setItem(STORAGE_KEY, data)
    console.log('✅ Salvou no localStorage:', events.value.length, 'eventos')
  } catch (error) {
    console.error('❌ Erro ao salvar eventos no localStorage:', error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erro ao carregar eventos do localStorage:', error)
  }
  return null
}

// Watch para sincronizar com localStorage automaticamente
watch(events, (newEvents) => {
  console.log('🔄 Watch detectou mudança nos eventos:', newEvents.length, 'eventos')
  saveToLocalStorage()
}, { deep: true })

// Activity options para o CalendarLayoutTemplate
// Cores conforme Especificacao_Calendario_Educacross_v1_1.docx
const activityOptions = [
  { value: 'missao', label: 'Missões', color: '#7F6CC3', disabled: false },
  { value: 'olimpiada', label: 'Olimpíadas', color: '#8BC728', disabled: false },
  { value: 'avaliacao', label: 'Avaliações', color: '#FE5153', disabled: false },
  { value: 'trilha', label: 'Trilhas', color: '#00A5A0', disabled: false },
  { value: 'expedicao', label: 'Expedições', color: '#FFB443', disabled: false },
  { value: 'lembrete', label: 'Lembretes', color: '#7CD7D3', disabled: false }
]

// Mapeamento tipo → cor
const typeColorMap = {
  missao: '#7F6CC3',
  olimpiada: '#8BC728',
  avaliacao: '#FE5153',
  trilha: '#00A5A0',
  expedicao: '#FFB443',
  lembrete: '#7CD7D3',
  outro: '#888888'
}

// Função para transformar eventos do JSON para o formato dos componentes
const transformEvent = (event) => {
  // calendar-mock-teacher.json usa start_at e end_at (novo schema)
  const startDate = new Date(event.start_at || event.dataInicio)
  const endDate = new Date(event.end_at || event.dataTermino || startDate)
  
  const startHours = startDate.getHours().toString().padStart(2, '0')
  const startMinutes = startDate.getMinutes().toString().padStart(2, '0')
  const endHours = endDate.getHours().toString().padStart(2, '0')
  const endMinutes = endDate.getMinutes().toString().padStart(2, '0')
  
  const originLevel = normalizeOriginLevel(event.origin_level || event.origin || event.origem) || ORIGIN_LEVELS.EDUCACROSS.value
  
  // Mapear category (enum) para tipo (legacy) para compatibilidade
  const categoryToTypeMap = {
    'MISSIONS': 'missao',
    'OLYMPIADS': 'olimpiada',
    'ASSESSMENTS': 'avaliacao',
    'TRAILS': 'trilha',
    'EXPEDITIONS': 'expedicao',
    'REMINDERS': 'lembrete'
  }
  
  const tipo = categoryToTypeMap[event.category] || event.tipo || 'outro'
  
  const transformed = {
    ...event,
    // Campos para compatibilidade com componentes
    title: event.title || event.titulo,
    titulo: event.titulo || event.title,
    tipo: tipo,
    type: tipo,
    date: event.start_at || event.dataInicio,
    dataInicio: event.start_at || event.dataInicio,
    dataTermino: event.end_at || event.dataTermino,
    color: typeColorMap[tipo] || typeColorMap.outro,
    horaInicio: `${startHours}:${startMinutes}`,
    horaTermino: `${endHours}:${endMinutes}`,
    origin_level: originLevel
  }
  
  return transformed
}

// Computed - eventos transformados e filtrados
const calendarEvents = computed(() => {
  const transformed = events.value.map(transformEvent)
  
  const filtered = transformed.filter(event => {
    // Filtrar por turma se necessário
    if (event.turmas) {
      const match = event.turmas.includes(selectedTurma.value)
      return match
    }
    return true
  })
  
  return filtered
})

// Methods
const handleClassChange = (newClass) => {
  selectedTurma.value = newClass.id
}

const handleActivityChange = (selectedActivities) => {
  // CalendarLayoutTemplate já filtra os eventos
}

const handleDayClick = (date) => {
  // Possível ação: abrir drawer com data pré-preenchida
}

const handleEventClick = (event) => {
  editingEvent.value = event
  drawerMode.value = 'view' // Abre em modo visualização
  isDrawerOpen.value = true
}

const handleEditEvent = (event) => {
  editingEvent.value = event
  drawerMode.value = 'edit' // Muda para modo edição
}

const handleMonthChange = (newDate) => {
  currentDate.value = newDate
}

const openDrawer = () => {
  editingEvent.value = null
  drawerMode.value = 'create' // Abre em modo criação
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  editingEvent.value = null
  drawerMode.value = 'create' // Reset para modo padrão
}

const saveEvent = (eventData) => {
  console.log('💾 saveEvent chamado com:', eventData)
  console.log('📊 Eventos antes:', events.value.length)
  
  // Verificar se é atualização de evento existente
  const existingIndex = events.value.findIndex(e => e.id === eventData.id)
  const normalizedOrigin = normalizeOriginLevel(eventData.origin_level || eventData.origin || eventData.origem || 'professor') || ORIGIN_LEVELS.TEACHER.value
  
  if (existingIndex !== -1) {
    // Atualizar evento existente
    console.log('✏️ Atualizando evento existente no índice:', existingIndex)
    events.value[existingIndex] = { ...eventData, origin_level: normalizedOrigin }
  } else {
    // Criar novo evento
    const newEvent = {
      ...eventData,
      id: eventData.id || Date.now(),
      status: 'ativo',
      origem: eventData.origem || 'professor',
      origin_level: normalizedOrigin,
      // Garantir campos de data no formato correto
      start_at: eventData.start_at || eventData.dataInicio,
      end_at: eventData.end_at || eventData.dataTermino
    }
    console.log('➕ Criando novo evento:', newEvent)
    events.value.push(newEvent)
  }
  
  console.log('📊 Eventos depois:', events.value.length)
  // saveToLocalStorage() será chamado automaticamente pelo watch
  closeDrawer()
}

// Load events from JSON or localStorage
onMounted(() => {
  // Inicializar sidebar com listener de resize
  const cleanupSidebar = initSidebar()
  onUnmounted(cleanupSidebar)
  
  // Tentar carregar eventos salvos do localStorage primeiro
  const savedEvents = loadFromLocalStorage()
  
  if (savedEvents && savedEvents.length > 0) {
    // Se houver eventos salvos, usar eles
    events.value = savedEvents
  } else {
    // Caso contrário, carregar dados mockados iniciais
    events.value = calendarMockData
    // Salvar os dados mockados no localStorage para futuras edições
    saveToLocalStorage()
  }
  
  // Debug: Adicionar função global para resetar dados (útil para desenvolvimento)
  if (typeof window !== 'undefined') {
    window.__resetCalendarData__ = () => {
      localStorage.removeItem(STORAGE_KEY)
      events.value = calendarMockData
      saveToLocalStorage()
      console.log('✅ Dados do calendário resetados para o mock original')
    }
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

@media (min-width: 1440px) {
  .calendar-main {
    padding: 1.25rem;
  }

  .calendar-container {
    max-width: none;
    margin: 0;
  }
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
