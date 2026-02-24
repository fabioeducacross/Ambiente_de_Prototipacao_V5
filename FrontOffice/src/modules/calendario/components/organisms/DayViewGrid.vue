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
              v-for="event in events"
              :key="event.id"
              class="timed-event"
              :style="getEventStyle(event)"
              @click.stop="handleEventClick(event)"
            >
              <div class="event-header">
                <div v-if="showEventTime" class="event-time">
                  {{ formatEventTime(event.horaInicio) }} - {{ formatEventTime(event.horaTermino) }}
                </div>
                <div class="event-duration">{{ calculateDuration(event) }}</div>
              </div>
              <div class="event-title">{{ event.titulo }}</div>
              <div class="event-activity" :style="{ color: getActivityColor(event.tipoAtividade) }">
                <i :class="getActivityIcon(event.tipoAtividade)"></i>
                {{ getActivityLabel(event.tipoAtividade) }}
              </div>
              <div v-if="event.descricao" class="event-description">
                {{ event.descricao }}
              </div>
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
import { useCalendar } from '../../composables/useCalendar'
import { useFeatureFlags } from '@/shared/composables/useFeatureFlags'

const { showEventTime } = useFeatureFlags()

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
const { getActivityColor, getActivityIcon, getActivityLabel } = useCalendar()

// Estado
const currentDate = ref(new Date(props.initialDate))
const currentTime = ref(new Date())
let timeInterval = null

// Computed
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

const getEventStyle = (event) => {
  if (!event.horaInicio || !event.horaTermino) return {}
  
  const [startHour, startMinute] = event.horaInicio.split(':').map(Number)
  const [endHour, endMinute] = event.horaTermino.split(':').map(Number)
  
  const startMinutes = (startHour - props.startHour) * 60 + startMinute
  const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  
  const slotHeight = 60 // 60px por hora
  const top = (startMinutes / 60) * slotHeight
  const height = Math.max((duration / 60) * slotHeight, 45) // Mínimo 45px
  
  return {
    top: `${top}px`,
    height: `${height}px`,
    backgroundColor: `${getActivityColor(event.tipoAtividade)}20`,
    borderLeft: `4px solid ${getActivityColor(event.tipoAtividade)}`
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
  left: 0;
  right: 0;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.timed-event:hover {
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 5;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.event-time {
  font-size: 12px;
  font-weight: 700;
  color: rgba(47, 43, 61, 0.8);
}

.event-duration {
  font-size: 11px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.6);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 6px;
  border-radius: 4px;
}

.event-title {
  font-size: 15px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.95);
  margin-bottom: 6px;
  line-height: 1.3;
}

.event-activity {
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
}

.event-activity i {
  font-size: 11px;
}

.event-description {
  font-size: 12px;
  color: rgba(47, 43, 61, 0.7);
  line-height: 1.4;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
