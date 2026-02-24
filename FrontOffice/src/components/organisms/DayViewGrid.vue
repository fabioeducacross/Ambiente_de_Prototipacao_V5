<template>
  <div class="day-view-grid">
    <!-- Header do calendário diário -->
    <CalendarMonthHeader
      :month-year="formattedDayTitle"
      :current-view="currentView"
      :show-view-toggle="showViewToggle"
      :available-views="availableViews"
      @previous="handlePreviousDay"
      @next="handleNextDay"
      @today="handleToday"
      @view-change="handleViewChange"
    />
    
    <!-- Header do dia com informações detalhadas -->
    <div class="day-header">
      <div class="day-info">
        <div class="day-number" :class="{ 'is-today': isToday }">
          {{ currentDay }}
        </div>
        <div class="day-details">
          <div class="day-name">{{ dayName }}</div>
          <div class="event-count">{{ events.length }} eventos</div>
        </div>
      </div>
    </div>
    
    <!-- Seção de eventos all-day (multi-dia, lembretes e eventos sem horário) -->
    <div v-if="allDayEvents.length > 0" class="all-day-section">
      <div class="all-day-header">
        <span class="all-day-label">Dia inteiro</span>
        <span class="all-day-count">{{ allDayEvents.length }}</span>
      </div>
      <div class="all-day-events">
        <AllDayEventItem
          v-for="event in allDayEvents"
          :key="`allday-${event.id}`"
          :event="event"
          @click="handleEventClick(event)"
        />
      </div>
    </div>

    <!-- Grid de horários detalhado -->
    <div class="time-grid-container">
      <div class="time-grid">
        <!-- Coluna de horários -->
        <div class="time-column">
          <div
            v-for="hour in hours"
            :key="hour"
            class="time-slot"
          >
            <span class="time-label">{{ formatHour(hour) }}</span>
          </div>
        </div>
        
        <!-- Coluna de eventos -->
        <div class="events-column">
          <!-- Slots de horário -->
          <div
            v-for="hour in hours"
            :key="`slot-${hour}`"
            class="hour-slot"
            @click="handleSlotClick(hour)"
          >
            <!-- Grade de linhas de 15 minutos -->
            <div class="hour-grid-lines">
              <div class="quarter-line"></div>
              <div class="half-line"></div>
              <div class="quarter-line"></div>
            </div>
          </div>
          
          <!-- Eventos posicionados -->
          <div class="events-layer">
            <div
              v-for="event in timedEvents"
              :key="event.id"
              class="timed-event"
              :style="getEventStyle(event)"
              @click.stop="handleEventClick(event)"
            >
              <div class="event-header">
                <div class="event-origin">
                  <EventOriginIcon 
                    :origin="event.origin_level || event.origin || event.origem"
                    :color="getActivityColor(event.tipo)"
                    class="event-icon"
                  />
                </div>
                <div v-if="showEventTime" class="event-time">
                  {{ formatEventTime(event.horaInicio) }} - {{ formatEventTime(event.horaTermino) }}
                </div>
                <div class="event-duration">{{ calculateDuration(event) }}</div>
              </div>
              <div class="event-title">{{ event.titulo || event.title }}</div>
              <div v-if="event.turmas && event.turmas.length" class="event-turmas">
                <i class="bi bi-people-fill"></i>
                {{ event.turmas.join(', ') }}
              </div>
            </div>
          </div>
          
          <!-- Linha indicadora de hora atual -->
          <div v-if="isToday && currentHourPosition >= 0" class="current-time-line" :style="{ top: `${currentHourPosition}px` }">
            <div class="time-indicator"></div>
            <div class="time-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CalendarMonthHeader from '../molecules/CalendarMonthHeader.vue'
import AllDayEventItem from '../molecules/AllDayEventItem.vue'
import EventOriginIcon from '../atoms/EventOriginIcon.vue'
import { useCalendar } from '../../composables/useCalendar'
import { useFeatureFlags } from '@/composables/useFeatureFlags'
import { useEventRendering } from '@/composables/useEventRendering'

const { showEventTime } = useFeatureFlags()
const { hexToRgba } = useEventRendering()

const props = defineProps({
  currentView: {
    type: String,
    default: 'day'
  },
  showViewToggle: {
    type: Boolean,
    default: true
  },
  availableViews: {
    type: Array,
    default: () => [
      { value: 'month', label: 'Mês' },
      { value: 'week', label: 'Semana' },
      { value: 'day', label: 'Dia' }
    ]
  },
  initialDate: {
    type: Date,
    default: () => new Date()
  },
  events: {
    type: Array,
    default: () => []
  },
  startHour: {
    type: Number,
    default: 6
  },
  endHour: {
    type: Number,
    default: 23
  }
})

const emit = defineEmits(['event-click', 'day-change', 'view-change', 'slot-click'])

// Composable
const { getActivityColor, getActivityIcon, getActivityLabel, getActivityMaterialIcon } = useCalendar()

// Estado
const currentDate = ref(new Date(props.initialDate))
const currentTime = ref(new Date())
let timeInterval = null

// Computed
// Separar eventos all-day (multi-dia) dos eventos com horário em um único dia
const allDayEvents = computed(() => {
  return props.events.filter(event => {
    // Verificar se é evento multi-dia (mais de 1 dia)
    const startDate = new Date(event.dataInicio)
    const endDate = new Date(event.dataTermino || event.dataInicio)
    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    const totalDays = Math.round((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1
    return totalDays > 1
  })
})

const timedEvents = computed(() => {
  return props.events.filter(event => {
    // Evento de um único dia (eventos com horário)
    const startDate = new Date(event.dataInicio)
    const endDate = new Date(event.dataTermino || event.dataInicio)
    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    const totalDays = Math.round((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1
    return totalDays === 1
  })
})

const hours = computed(() => {
  const hoursList = []
  for (let i = props.startHour; i <= props.endHour; i++) {
    hoursList.push(i)
  }
  return hoursList
})

const currentDay = computed(() => {
  return currentDate.value.getDate()
})

const dayName = computed(() => {
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  return dayNames[currentDate.value.getDay()]
})

const formattedDayTitle = computed(() => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  
  const day = currentDate.value.getDate()
  const month = monthNames[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  
  return `${day} de ${month} de ${year}`
})

const isToday = computed(() => {
  const today = new Date()
  return currentDate.value.getDate() === today.getDate() &&
         currentDate.value.getMonth() === today.getMonth() &&
         currentDate.value.getFullYear() === today.getFullYear()
})

const currentHourPosition = computed(() => {
  if (!isToday.value) return -1
  
  const now = currentTime.value
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  
  if (currentHour < props.startHour || currentHour > props.endHour) return -1
  
  const minutesSinceStart = (currentHour - props.startHour) * 60 + currentMinute
  const slotHeight = 60 // 60px por hora
  return (minutesSinceStart / 60) * slotHeight
})

// Methods
const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

const formatEventTime = (time) => {
  if (!time) return ''
  return time.substring(0, 5) // HH:MM
}

const calculateDuration = (event) => {
  if (!event.horaInicio || !event.horaTermino) return ''
  
  const [startHour, startMinute] = event.horaInicio.split(':').map(Number)
  const [endHour, endMinute] = event.horaTermino.split(':').map(Number)
  
  const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}min`
  }
}

// Detecta sobreposição entre dois eventos
const eventsOverlap = (event1, event2) => {
  if (!event1.horaInicio || !event1.horaTermino || !event2.horaInicio || !event2.horaTermino) {
    return false
  }
  
  const [start1Hour, start1Minute] = event1.horaInicio.split(':').map(Number)
  const [end1Hour, end1Minute] = event1.horaTermino.split(':').map(Number)
  const [start2Hour, start2Minute] = event2.horaInicio.split(':').map(Number)
  const [end2Hour, end2Minute] = event2.horaTermino.split(':').map(Number)
  
  const start1 = start1Hour * 60 + start1Minute
  const end1 = end1Hour * 60 + end1Minute
  const start2 = start2Hour * 60 + start2Minute
  const end2 = end2Hour * 60 + end2Minute
  
  return start1 < end2 && start2 < end1
}

// Calcula layout de colunas para eventos sobrepostos
const calculateEventColumns = () => {
  const sortedEvents = [...props.events].sort((a, b) => {
    if (!a.horaInicio || !b.horaInicio) return 0
    const [aHour, aMinute] = a.horaInicio.split(':').map(Number)
    const [bHour, bMinute] = b.horaInicio.split(':').map(Number)
    return (aHour * 60 + aMinute) - (bHour * 60 + bMinute)
  })
  
  const columns = []
  
  sortedEvents.forEach(event => {
    // Encontra a primeira coluna disponível
    let placed = false
    for (let i = 0; i < columns.length; i++) {
      const overlaps = columns[i].some(existingEvent => eventsOverlap(event, existingEvent))
      if (!overlaps) {
        columns[i].push(event)
        event._column = i
        placed = true
        break
      }
    }
    
    // Se não encontrou coluna disponível, cria nova
    if (!placed) {
      event._column = columns.length
      columns.push([event])
    }
  })
  
  // Calcula total de colunas para cada evento (eventos que se sobrepõem)
  sortedEvents.forEach(event => {
    const overlappingEvents = sortedEvents.filter(e => 
      e !== event && eventsOverlap(event, e)
    )
    const maxColumn = Math.max(
      event._column,
      ...overlappingEvents.map(e => e._column || 0)
    )
    event._totalColumns = maxColumn + 1
  })
  
  return sortedEvents
}

const getEventStyle = (event) => {
  if (!event.horaInicio || !event.horaTermino) return {}
  
  const [startHour, startMinute] = event.horaInicio.split(':').map(Number)
  const [endHour, endMinute] = event.horaTermino.split(':').map(Number)
  
  const startMinutes = (startHour - props.startHour) * 60 + startMinute
  const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  
  const slotHeight = 60 // 60px por hora
  const top = (startMinutes / 60) * slotHeight
  const height = Math.max((duration / 60) * slotHeight, 45) // Mínimo 45px
  
  // Calcula posição horizontal para eventos sobrepostos
  calculateEventColumns()
  
  const column = event._column || 0
  const totalColumns = event._totalColumns || 1
  const widthPercent = 100 / totalColumns
  const leftPercent = widthPercent * column
  
  const eventColor = event.color || getActivityColor(event.tipo || event.category)
  return {
    top: `${top}px`,
    height: `${height}px`,
    width: `calc(${widthPercent}% - 4px)`,
    left: `${leftPercent}%`,
    backgroundColor: `${eventColor}1F`,
    borderLeftColor: eventColor,
    '--event-color': eventColor
  }
}

const handlePreviousDay = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    currentDate.value.getDate() - 1
  )
  emit('day-change', currentDate.value)
}

const handleNextDay = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    currentDate.value.getDate() + 1
  )
  emit('day-change', currentDate.value)
}

const handleToday = () => {
  currentDate.value = new Date()
  emit('day-change', currentDate.value)
}

const handleSlotClick = (hour) => {
  emit('slot-click', { date: currentDate.value, hour })
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleViewChange = (newView) => {
  emit('view-change', newView)
}

const updateCurrentTime = () => {
  currentTime.value = new Date()
}

// Lifecycle
onMounted(() => {
  // Atualizar indicador de hora atual a cada minuto
  timeInterval = setInterval(updateCurrentTime, 60000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.day-view-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}

.day-header {
  padding: 24px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.12);
  background-color: white;
}

/* Seção de eventos all-day */
.all-day-section {
  border-bottom: 1px solid rgba(47, 43, 61, 0.12);
  background-color: #fafafa;
}

.all-day-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  font-size: 12px;
  color: rgba(47, 43, 61, 0.68);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
}

.all-day-label {
  font-weight: 500;
}

.all-day-count {
  background-color: rgba(115, 103, 240, 0.16);
  color: #7367F0;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.all-day-events {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 24px;
  max-height: 150px;
  overflow-y: auto;
}

.day-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.day-number {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background-color: rgba(47, 43, 61, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
  transition: all 0.3s ease;
}

.day-number.is-today {
  background-color: #7367F0;
  color: white;
  box-shadow: 0 4px 12px rgba(115, 103, 240, 0.3);
}

.day-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.day-name {
  font-size: 24px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
}

.event-count {
  font-size: 14px;
  color: rgba(47, 43, 61, 0.6);
}

.time-grid-container {
  flex: 1;
  overflow-y: auto;
}

.time-grid {
  display: grid;
  grid-template-columns: 100px 1fr;
  min-height: 100%;
}

.time-column {
  border-right: 1px solid rgba(47, 43, 61, 0.12);
  background-color: #fafafa;
}

.time-slot {
  height: 60px;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
  display: flex;
  align-items: flex-start;
}

.time-label {
  font-size: 13px;
  color: rgba(47, 43, 61, 0.6);
  font-weight: 600;
}

.events-column {
  position: relative;
}

.hour-slot {
  height: 60px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
  cursor: pointer;
  position: relative;
  transition: background-color 0.15s ease;
}

.hour-slot:hover {
  background-color: rgba(115, 103, 240, 0.04);
}

.hour-grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.quarter-line,
.half-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(47, 43, 61, 0.04);
}

.quarter-line:first-child {
  top: 25%;
}

.half-line {
  top: 50%;
  background-color: rgba(47, 43, 61, 0.06);
}

.quarter-line:last-child {
  top: 75%;
}

.events-layer {
  position: absolute;
  top: 0;
  left: 8px;
  right: 8px;
  bottom: 0;
  pointer-events: none;
}

.timed-event {
  position: absolute;
  padding: 8px;
  border-radius: 4px;
  border-left: 3px solid;
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  transition: filter 0.2s ease, transform 0.15s ease;
}

.timed-event:hover {
  filter: brightness(0.95);
  transform: translateX(-2px);
  z-index: 5;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
}

.event-origin {
  flex-shrink: 0;
}

.event-icon {
  font-size: 16px;
  line-height: 1;
  color: var(--event-color, inherit);
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.event-time {
  font-size: 11px;
  font-weight: 600;
  color: var(--event-color, rgba(47, 43, 61, 0.8));
  flex: 1;
}

.event-duration {
  font-size: 10px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.6);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 6px;
  border-radius: 4px;
}

.event-title {
  font-size: 13px;
  font-weight: 500;
  color: rgba(47, 43, 61, 0.9);
  margin-top: 4px;
  margin-bottom: 6px;
  line-height: 1.2;
}

.event-turmas {
  font-size: 11px;
  color: rgba(47, 43, 61, 0.6);
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-turmas i {
  font-size: 10px;
}

/* Linha indicadora de hora atual */
.current-time-line {
  position: absolute;
  left: 0;
  right: 8px;
  height: 2px;
  background-color: #EA5455;
  z-index: 10;
  pointer-events: none;
}

.time-indicator {
  position: absolute;
  left: -8px;
  top: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #EA5455;
  border: 2px solid white;
}

.time-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background-color: #EA5455;
}

/* Responsive */
@media (max-width: 1024px) {
  .day-number {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }
  
  .day-name {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .time-grid {
    grid-template-columns: 60px 1fr;
  }
  
  .day-header {
    padding: 16px;
  }
  
  .day-info {
    gap: 12px;
  }
  
  .day-number {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  
  .day-name {
    font-size: 18px;
  }
  
  .event-title {
    font-size: 13px;
  }
}
</style>
