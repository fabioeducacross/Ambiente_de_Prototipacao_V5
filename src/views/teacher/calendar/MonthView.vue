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
            'today': dayInfo.isToday
          }"
          @click="handleDayClick(dayInfo.date)"
        >
          <div class="day-number">{{ dayInfo.date.getDate() }}</div>
          
          <!-- Events for this day -->
          <div class="day-events">
            <div
              v-for="event in getEventsForThisDay(dayInfo.date)"
              :key="event.id"
              class="event-pill"
              :style="{ backgroundColor: getActivityColor(event.tipo) }"
              @click.stop="$emit('edit-event', event)"
            >
              <i :class="['bi', getActivityIcon(event.tipo)]"></i>
              <span class="event-title">{{ truncate(event.titulo, 15) }}</span>
            </div>
            
            <!-- Overflow indicator -->
            <div 
              v-if="getEventsForThisDay(dayInfo.date).length > 3"
              class="event-overflow"
            >
              +{{ getEventsForThisDay(dayInfo.date).length - 3 }} mais
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalendar } from '../../../composables/useCalendar'

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

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Weekday header */
.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f8f9fa;
  border-bottom: 2px solid #e0e0e0;
}

.weekday {
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
  text-transform: uppercase;
}

/* Days grid */
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  flex: 1;
  gap: 1px;
  background-color: #e0e0e0;
}

.day-cell {
  background-color: #fff;
  padding: 8px;
  min-height: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.day-cell:hover {
  background-color: #f8f9fa;
}

.day-cell.other-month {
  background-color: #fafafa;
  opacity: 0.5;
}

.day-cell.today {
  background-color: #f0efff;
  border: 2px solid var(--primary);
}

.day-number {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 6px;
  text-align: right;
}

.day-cell.other-month .day-number {
  color: #adb5bd;
}

.day-cell.today .day-number {
  color: var(--primary);
  background-color: var(--primary);
  color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: auto;
}

/* Events */
.day-events {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow: hidden;
}

.event-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.event-pill:hover {
  transform: translateX(2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.event-pill i {
  font-size: 11px;
  flex-shrink: 0;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.event-overflow {
  font-size: 11px;
  color: #6c757d;
  padding: 4px 8px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 1024px) {
  .day-cell {
    min-height: 80px;
    padding: 6px;
  }
  
  .event-pill {
    font-size: 11px;
    padding: 3px 6px;
  }
}

@media (max-width: 768px) {
  .weekday {
    padding: 8px;
    font-size: 12px;
  }
  
  .day-cell {
    min-height: 60px;
    padding: 4px;
  }
  
  .day-number {
    font-size: 12px;
  }
  
  .event-pill {
    font-size: 10px;
    padding: 2px 4px;
  }
  
  .event-pill i {
    display: none;
  }
}
</style>
