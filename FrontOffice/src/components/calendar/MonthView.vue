<template>
  <div class="month-view">
    <!-- Cabeçalho dos dias da semana -->
    <div class="weekday-header">
      <div v-for="day in weekDays" :key="day" class="weekday-cell">
        {{ day }}
      </div>
    </div>

    <!-- Grid de dias -->
    <div class="month-grid">
      <div 
        v-for="day in calendarDays" 
        :key="day.date"
        class="day-cell"
        :class="dayCellClasses(day)"
      >
        <div class="day-header">
          <span class="day-number">{{ day.dayNumber }}</span>
          <span v-if="day.isToday" class="today-badge">Hoje</span>
        </div>
        <div class="day-events">
          <CalendarChip
            v-for="event in day.events.slice(0, 3)"
            :key="event.id"
            :event="event"
            variant="compact"
            :show-time="false"
            @click="$emit('event-click', event)"
          />
          <button 
            v-if="day.events.length > 3"
            class="more-events-btn"
            @click="$emit('show-more', day)"
          >
            +{{ day.events.length - 3 }} mais
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
  format, 
  isSameMonth, 
  isToday,
  isSameDay,
  parseISO
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

defineEmits(['event-click', 'show-more'])

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// Calcula todos os dias do mês (incluindo dias de preenchimento)
const calendarDays = computed(() => {
  const monthStart = startOfMonth(props.currentDate)
  const monthEnd = endOfMonth(props.currentDate)
  const calendarStart = startOfWeek(monthStart, { locale: ptBR })
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return days.map(day => {
    const dayEvents = props.events.filter(event => {
      const eventDate = parseISO(event.start_at)
      return isSameDay(eventDate, day)
    })

    return {
      date: day.toISOString(),
      dayNumber: format(day, 'd'),
      isCurrentMonth: isSameMonth(day, props.currentDate),
      isToday: isToday(day),
      events: dayEvents
    }
  })
})

// Classes CSS para cada célula de dia
const dayCellClasses = (day) => {
  return {
    'other-month': !day.isCurrentMonth,
    'is-today': day.isToday,
    'has-events': day.events.length > 0
  }
}
</script>

<style scoped>
.month-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.weekday-cell {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 1px;
  background: #e0e0e0;
}

.day-cell {
  background: white;
  padding: 8px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: background 0.2s ease;
}

.day-cell:hover {
  background: #f8f9fa;
}

.day-cell.other-month {
  background: #fafafa;
  opacity: 0.5;
}

.day-cell.is-today {
  background: #f0efff;
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.day-number {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.is-today .day-number {
  background: #7367F0;
  color: white;
}

.today-badge {
  font-size: 10px;
  font-weight: 600;
  color: #7367F0;
  background: #7367F020;
  padding: 2px 6px;
  border-radius: 4px;
}

.day-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.more-events-btn {
  background: transparent;
  border: none;
  color: #7367F0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.more-events-btn:hover {
  background: #7367F015;
}

@media (max-width: 768px) {
  .month-grid {
    grid-auto-rows: minmax(80px, auto);
  }

  .day-cell {
    min-height: 80px;
    padding: 4px;
  }

  .weekday-cell {
    padding: 8px 4px;
    font-size: 12px;
  }

  .day-number {
    font-size: 12px;
    width: 24px;
    height: 24px;
  }

  .today-badge {
    display: none;
  }
}
</style>
