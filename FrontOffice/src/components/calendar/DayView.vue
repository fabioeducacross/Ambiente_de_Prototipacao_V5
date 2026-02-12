<template>
  <div class="day-view">
    <!-- All-day events section -->
    <div v-if="allDayEvents.length > 0" class="all-day-section">
      <div class="all-day-label">Dia Inteiro</div>
      <div class="all-day-events">
        <CalendarChip
          v-for="event in allDayEvents"
          :key="event.id"
          :event="event"
          :show-time="false"
          variant="list"
          @click="$emit('event-click', event)"
        />
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline-container">
      <div class="time-column">
        <div 
          v-for="hour in hours" 
          :key="hour"
          class="time-label"
        >
          {{ formatHour(hour) }}
        </div>
      </div>

      <div class="events-column">
        <!-- Hour lines -->
        <div 
          v-for="hour in hours" 
          :key="hour"
          class="hour-line"
        >
          <div class="half-hour-line"></div>
        </div>

        <!-- Current time indicator -->
        <div 
          v-if="showCurrentTime"
          class="current-time-indicator"
          :style="{ top: currentTimePosition }"
        >
          <div class="current-time-dot"></div>
          <div class="current-time-line"></div>
        </div>

        <!-- Events -->
        <CalendarChip
          v-for="event in timedEvents"
          :key="event.id"
          :event="event"
          :show-time="true"
          :style="getEventStyle(event)"
          class="day-event"
          @click="$emit('event-click', event)"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="allEvents.length === 0" class="empty-state">
      <span class="material-symbols-outlined">event_available</span>
      <p>Nenhum evento para este dia</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { 
  format, 
  isToday,
  isSameDay,
  parseISO,
  getHours,
  getMinutes
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import CalendarChip from './CalendarChip.vue'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  }
})

defineEmits(['event-click'])

const hours = Array.from({ length: 24 }, (_, i) => i)
const currentTimePosition = ref('0px')

// Eventos do dia selecionado
const allEvents = computed(() => {
  return props.events.filter(event => {
    const eventDate = parseISO(event.start_at)
    return isSameDay(eventDate, props.currentDate)
  })
})

const allDayEvents = computed(() => {
  return allEvents.value.filter(event => event.all_day)
})

const timedEvents = computed(() => {
  return allEvents.value.filter(event => !event.all_day)
})

const showCurrentTime = computed(() => {
  return isToday(props.currentDate)
})

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

// Calcula posicionamento do evento
const getEventStyle = (event) => {
  const startDate = parseISO(event.start_at)
  const startHour = getHours(startDate)
  const startMinute = getMinutes(startDate)
  
  const top = (startHour * 80 + (startMinute / 60) * 80) // 80px por hora
  
  let duration = 60 // duração padrão de 1 hora
  if (event.end_at) {
    const endDate = parseISO(event.end_at)
    const endHour = getHours(endDate)
    const endMinute = getMinutes(endDate)
    duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  }
  
  const height = (duration / 60) * 80 // converter minutos para pixels
  
  return {
    top: `${top}px`,
    height: `${height}px`,
    minHeight: '40px'
  }
}

// Atualiza posição do indicador de hora atual
const updateCurrentTime = () => {
  const now = new Date()
  const hours = getHours(now)
  const minutes = getMinutes(now)
  const totalMinutes = hours * 60 + minutes
  const position = (totalMinutes / 60) * 80 // 80px por hora
  currentTimePosition.value = `${position}px`
}

let timeInterval = null

onMounted(() => {
  updateCurrentTime()
  timeInterval = setInterval(updateCurrentTime, 60000) // atualiza a cada minuto
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.day-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.all-day-section {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.all-day-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.all-day-events {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-container {
  display: grid;
  grid-template-columns: 80px 1fr;
  overflow: auto;
  max-height: 800px;
}

.time-column {
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
}

.time-label {
  height: 80px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.events-column {
  position: relative;
}

.hour-line {
  height: 80px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.half-hour-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #f0f0f0;
}

.current-time-indicator {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  pointer-events: none;
}

.current-time-dot {
  position: absolute;
  left: -6px;
  top: -6px;
  width: 12px;
  height: 12px;
  background: #EA5455;
  border-radius: 50%;
  border: 2px solid white;
}

.current-time-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #EA5455;
}

.day-event {
  position: absolute;
  left: 8px;
  right: 8px;
  z-index: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state .material-symbols-outlined {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 768px) {
  .timeline-container {
    grid-template-columns: 60px 1fr;
    max-height: 600px;
  }

  .hour-line {
    height: 60px;
  }

  .time-label {
    height: 60px;
    font-size: 11px;
  }
}
</style>
