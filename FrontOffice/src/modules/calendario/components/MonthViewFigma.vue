<template>
  <div class="month-view-figma">
    <!-- Days of Week Header -->
    <div class="weekdays-header">
      <div 
        v-for="day in weekDays" 
        :key="day" 
        class="weekday-label"
      >
        {{ day }}
      </div>
    </div>
    
    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="day-cell"
        :class="{
          'other-month': day.otherMonth,
          'today': day.isToday,
          'has-events': day.events.length > 0
        }"
      >
        <div class="day-number">{{ day.dayNumber }}</div>
        
        <div class="events-list">
          <div
            v-for="event in day.visibleEvents"
            :key="event.id"
            class="event-badge"
            :style="{ 
              backgroundColor: getEventColor(event.category),
              borderColor: getEventColor(event.category)
            }"
            @click.stop="$emit('event-click', event)"
          >
            <span class="event-title">{{ truncateTitle(event.title) }}</span>
          </div>
          
          <button 
            v-if="day.events.length > props.maxEventsPerDay"
            class="show-more-btn"
            @click.stop="$emit('show-more', day.date)"
          >
            +{{ day.events.length - props.maxEventsPerDay }} mais
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  isSameDay
} from 'date-fns'
import { CATEGORIES } from '../data/calendar-enums'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  maxEventsPerDay: {
    type: Number,
    default: 3
  }
})

defineEmits(['event-click', 'show-more'])

const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']

const getEventColor = (category) => {
  return CATEGORIES[category]?.color || '#6c757d'
}

const truncateTitle = (title) => {
  return title.length > 20 ? title.substring(0, 20) + '...' : title
}

const calendarDays = computed(() => {
  const monthStart = startOfMonth(props.currentDate)
  const monthEnd = endOfMonth(props.currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  
  return allDays.map(date => {
    const dayEvents = props.events.filter(event => {
      const eventDate = new Date(event.start_at)
      return isSameDay(eventDate, date)
    })
    
    return {
      date: date.toISOString(),
      dayNumber: date.getDate(),
      otherMonth: !isSameMonth(date, props.currentDate),
      isToday: isToday(date),
      events: dayEvents,
      visibleEvents: dayEvents.slice(0, props.maxEventsPerDay)
    }
  })
})
</script>

<style scoped>
.month-view-figma {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

/* Weekdays Header */
.weekdays-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  padding: 16px 0;
  border-bottom: 1px solid rgba(47, 43, 61, 0.16);
}

.weekday-label {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: rgba(47, 43, 61, 0.9);
  text-transform: uppercase;
}

/* Calendar Grid */
.calendar-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  gap: 0;
  border-left: 1px solid rgba(47, 43, 61, 0.16);
  border-top: 1px solid rgba(47, 43, 61, 0.16);
}

.day-cell {
  border-right: 1px solid rgba(47, 43, 61, 0.16);
  border-bottom: 1px solid rgba(47, 43, 61, 0.16);
  padding: 8px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  transition: background 0.2s;
  cursor: pointer;
}

.day-cell:hover {
  background: rgba(115, 103, 240, 0.04);
}

.day-cell.other-month {
  background: rgba(47, 43, 61, 0.02);
}

.day-cell.other-month .day-number {
  color: rgba(47, 43, 61, 0.4);
}

.day-cell.today {
  background: rgba(115, 103, 240, 0.08);
}

/* Day Number */
.day-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(47, 43, 61, 0.9);
  margin-bottom: 8px;
  text-align: right;
  padding-right: 4px;
}

.day-cell.today .day-number {
  color: #7367F0;
  font-weight: 600;
}

/* Events List */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.event-badge {
  padding: 4px 8px;
  border-radius: 4px;
  border-left: 3px solid;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(47, 43, 61, 0.9);
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0px 1px 3px rgba(47, 43, 61, 0.1);
}

.event-badge:hover {
  transform: translateX(2px);
  box-shadow: 0px 2px 6px rgba(47, 43, 61, 0.15);
}

.event-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Show More Button */
.show-more-btn {
  padding: 4px 8px;
  margin-top: 4px;
  background: none;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: #7367F0;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;
}

.show-more-btn:hover {
  color: #6558d3;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1024px) {
  .day-cell {
    min-height: 100px;
    padding: 6px;
  }
  
  .event-badge {
    font-size: 11px;
    padding: 4px 6px;
  }
}

@media (max-width: 768px) {
  .weekday-label {
    font-size: 11px;
  }
  
  .day-cell {
    min-height: 80px;
    padding: 4px;
  }
  
  .day-number {
    font-size: 12px;
  }
  
  .event-badge {
    font-size: 10px;
    padding: 3px 4px;
  }
}
</style>
