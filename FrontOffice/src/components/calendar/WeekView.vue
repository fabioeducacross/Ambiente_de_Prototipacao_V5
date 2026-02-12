<template>
  <div class="week-view">
    <!-- Time column + day columns -->
    <div class="week-grid">
      <!-- Time labels column -->
      <div class="time-column">
        <div class="time-header"></div>
        <div 
          v-for="hour in hours" 
          :key="hour"
          class="time-label"
        >
          {{ formatHour(hour) }}
        </div>
      </div>

      <!-- Day columns -->
      <div 
        v-for="day in weekDays" 
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
          <!-- Hour lines -->
          <div 
            v-for="hour in hours" 
            :key="hour"
            class="hour-line"
          ></div>
          
          <!-- Events -->
          <CalendarChip
            v-for="event in day.events"
            :key="event.id"
            :event="event"
            :show-time="true"
            :style="getEventStyle(event)"
            class="week-event"
            @click="$emit('event-click', event)"
          />
        </div>
      </div>
    </div>

    <!-- All-day events -->
    <div v-if="hasAllDayEvents" class="all-day-section">
      <div class="all-day-label">Dia Inteiro</div>
      <div class="all-day-events">
        <div 
          v-for="day in weekDays" 
          :key="`allday-${day.date}`"
          class="all-day-column"
        >
          <CalendarChip
            v-for="event in day.allDayEvents"
            :key="event.id"
            :event="event"
            :show-time="false"
            @click="$emit('event-click', event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
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

// Dias da semana
const weekDays = computed(() => {
  const weekStart = startOfWeek(props.currentDate, { locale: ptBR, weekStartsOn: 0 })
  const weekEnd = endOfWeek(props.currentDate, { locale: ptBR, weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  return days.map(day => {
    const dayEvents = props.events.filter(event => {
      const eventDate = parseISO(event.start_at)
      return isSameDay(eventDate, day) && !event.all_day
    })

    const allDayEvents = props.events.filter(event => {
      const eventDate = parseISO(event.start_at)
      return isSameDay(eventDate, day) && event.all_day
    })

    return {
      date: day.toISOString(),
      dayName: format(day, 'EEE', { locale: ptBR }),
      dayNumber: format(day, 'd'),
      isToday: isToday(day),
      events: dayEvents,
      allDayEvents
    }
  })
})

const hasAllDayEvents = computed(() => {
  return weekDays.value.some(day => day.allDayEvents.length > 0)
})

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

// Calcula posicionamento do evento no timeline
const getEventStyle = (event) => {
  const startDate = parseISO(event.start_at)
  const startHour = getHours(startDate)
  const startMinute = getMinutes(startDate)
  
  const top = (startHour * 60 + startMinute) // minutos desde meia-noite
  const hourHeight = 60 // 60px por hora
  
  let duration = 60 // duração padrão de 1 hora
  if (event.end_at) {
    const endDate = parseISO(event.end_at)
    const endHour = getHours(endDate)
    const endMinute = getMinutes(endDate)
    duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  }
  
  return {
    top: `${top}px`,
    height: `${duration}px`,
    minHeight: '30px'
  }
}
</script>

<style scoped>
.week-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.all-day-section {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px;
  background: #f8f9fa;
  gap: 8px;
}

.all-day-label {
  width: 80px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  flex-shrink: 0;
}

.all-day-events {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.all-day-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.week-grid {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  overflow-x: auto;
}

.time-column {
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
}

.time-header {
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
}

.time-label {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.day-column {
  border-right: 1px solid #e0e0e0;
  min-width: 120px;
}

.day-column.is-today {
  background: #f0efff;
}

.day-header {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #e0e0e0;
  gap: 4px;
}

.day-name {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.day-number {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.today-number {
  background: #7367F0;
  color: white;
}

.day-timeline {
  position: relative;
  height: 1440px; /* 24 hours * 60px */
}

.hour-line {
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
}

.week-event {
  position: absolute;
  left: 4px;
  right: 4px;
  z-index: 1;
}

@media (max-width: 768px) {
  .week-grid {
    grid-template-columns: 60px repeat(7, minmax(100px, 1fr));
  }

  .time-column {
    width: 60px;
  }

  .time-label {
    font-size: 10px;
  }

  .day-number {
    font-size: 16px;
    width: 30px;
    height: 30px;
  }
}
</style>
