<template>
  <div class="month-view">
    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <!-- Week days header -->
      <div class="weekday-header">
        <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      </div>
      
      <!-- Calendar days grid -->
      <div class="days-grid">
        <div
          v-for="(dayInfo, index) in calendarDays"
          :key="dayInfo.date.getTime()"
          class="day-cell"
          :class="{
            'other-month': !dayInfo.isCurrentMonth,
            'current-month': dayInfo.isCurrentMonth,
            'today': dayInfo.isToday,
            'hovering': hoveringDay === dayInfo.date.getTime()
          }"
          @click="handleDayClick(dayInfo.date)"
          @mouseenter="hoveringDay = dayInfo.date.getTime()"
          @mouseleave="hoveringDay = null"
        >
          <div class="day-number">{{ dayInfo.date.getDate() }}</div>
          
          <!-- Events for this day -->
          <div class="day-events">
            <div
              v-for="event in getEventsForThisDay(dayInfo.date)"
              :key="event.id"
              class="event-label"
              :style="{ background: getEventBgColor(event.tipo), color: getEventTextColor(event.tipo) }"
              @click.stop="$emit('edit-event', event)"
            >
              <span class="event-title">{{ event.horario ? event.horario + ' ' : '' }}{{ truncate(event.titulo, 30) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCalendar } from '../../composables/useCalendar'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  selectedTurma: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['select-date', 'edit-event'])

const { 
  getMonthDays, 
  getEventsForDate, 
  getActivityColor, 
  getActivityIcon 
} = useCalendar()

const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']

const hoveringDay = ref(null)

// Generate calendar days grid (7x6 = 42 days)
const calendarDays = computed(() => {
  return getMonthDays(props.currentDate)
})

// PERFORMANCE: Pre-compute events by day (single pass)
const eventsByDay = computed(() => {
  const map = new Map()
  calendarDays.value.forEach(dayInfo => {
    const dayKey = dayInfo.date.getTime()
    const events = getEventsForDate(props.events, dayInfo.date, props.selectedTurma)
    map.set(dayKey, events.slice(0, 3))
  })
  return map
})

// Get events for specific day (from cache)
const getEventsForThisDay = (date) => {
  return eventsByDay.value.get(date.getTime()) || []
}

// Get event label background color
const getEventBgColor = (tipo) => {
  const colors = {
    'missao': 'rgba(115, 103, 240, 0.16)',
    'olimpiada': 'rgba(40, 199, 111, 0.16)',
    'avaliacao': 'rgba(255, 76, 81, 0.16)',
    'trilha': 'rgba(0, 186, 209, 0.16)',
    'expedicao': 'rgba(255, 159, 67, 0.16)'
  }
  return colors[tipo] || 'rgba(115, 103, 240, 0.16)'
}

// Get event label text color
const getEventTextColor = (tipo) => {
  const colors = {
    'missao': '#7367F0',
    'olimpiada': '#28C76F',
    'avaliacao': '#FF4C51',
    'trilha': '#00BAD1',
    'expedicao': '#FF9F43'
  }
  return colors[tipo] || '#7367F0'
}

// Handle day click
const handleDayClick = (date) => {
  emit('select-date', date)
}

// Truncate text
const truncate = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
</script>

<style scoped>
.month-view {
  width: 100%;
  height: 100%;
  background: var(--Misc-paper, white);
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Weekday header */
.weekday-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 42px;
  padding-right: 42px;
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 86px;
}

.weekday {
  text-align: center;
  color: rgba(47, 43, 61, 0.90);
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 22px;
}

/* Days grid */
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, minmax(125px, auto));
  flex: 1;
}

.day-cell {
  padding: 8px;
  border-top: 1px solid rgba(47, 43, 61, 0.12);
  border-right: 1px solid rgba(47, 43, 61, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  background: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.day-cell:nth-child(7n) {
  border-right: 1px solid rgba(47, 43, 61, 0.12);
}

.day-cell.hovering {
  background: rgba(47, 43, 61, 0.06);
}

.day-cell.other-month .day-number {
  color: rgba(47, 43, 61, 0.40);
}

.day-cell.current-month .day-number {
  color: rgba(47, 43, 61, 0.70);
}

.day-number {
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  line-height: 22px;
}

/* Events */
.day-events {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.event-label {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 28px;
  padding: 4px 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-label:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 1024px) {
  .day-cell {
    height: 100px;
    padding: 6px;
  }
  
  .weekday-header {
    padding-left: 24px;
    padding-right: 24px;
    gap: 60px;
  }
  
  .event-label {
    padding: 3px 10px;
  }
  
  .event-title {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .weekday-header {
    padding-left: 16px;
    padding-right: 16px;
    gap: 40px;
  }
  
  .weekday {
    font-size: 13px;
  }
  
  .day-cell {
    height: 80px;
    padding: 4px;
  }
  
  .day-number {
    font-size: 13px;
  }
  
  .event-label {
    padding: 2px 8px;
  }
  
  .event-title {
    font-size: 11px;
  }
}
</style>
