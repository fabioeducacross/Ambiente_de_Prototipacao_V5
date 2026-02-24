<template>
  <div class="week-view-grid">
    <!-- Header do calendário semanal -->
    <CalendarMonthHeader
      :month-year="formattedWeekRange"
      :current-view="currentView"
      :show-view-toggle="showViewToggle"
      :available-views="availableViews"
      @previous="handlePreviousWeek"
      @next="handleNextWeek"
      @today="handleToday"
      @view-change="handleViewChange"
    />
    
    <!-- Header dos dias da semana com datas -->
    <div class="week-days-header">
      <div class="time-column-header">Horário</div>
      <div
        v-for="day in weekDays"
        :key="day.dateKey"
        class="day-header"
        :class="{ 'is-today': day.isToday }"
      >
        <div class="day-name">{{ day.dayName }}</div>
        <div class="day-date" :class="{ 'today-badge': day.isToday }">
          {{ day.date }}
        </div>
      </div>
    </div>
    
    <!-- Grid de horários -->
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
        
        <!-- Colunas de dias -->
        <div class="days-columns">
          <div
            v-for="day in weekDays"
            :key="day.dateKey"
            class="day-column"
            :class="{ 'is-today': day.isToday }"
          >
            <!-- Slots de horário -->
            <div
              v-for="hour in hours"
              :key="`${day.dateKey}-${hour}`"
              class="hour-slot"
              @click="handleSlotClick(day, hour)"
            >
              <!-- Grade de linhas -->
              <div class="hour-grid-lines">
                <div class="quarter-line"></div>
                <div class="half-line"></div>
                <div class="quarter-line"></div>
              </div>
            </div>
            
            <!-- Eventos posicionados -->
            <div class="events-layer">
              <div
                v-for="event in day.events"
                :key="event.id"
                class="timed-event"
                :style="getEventStyle(event)"
                @click.stop="handleEventClick(event)"
              >
                <div v-if="showEventTime" class="event-time">{{ formatEventTime(event.horaInicio) }}</div>
                <div class="event-title">{{ event.titulo }}</div>
                <div class="event-activity" :style="{ color: getActivityColor(event.tipoAtividade) }">
                  <i :class="getActivityIcon(event.tipoAtividade)"></i>
                  {{ getActivityLabel(event.tipoAtividade) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarMonthHeader from '../molecules/CalendarMonthHeader.vue'
import { useCalendar } from '../../composables/useCalendar'
import { useFeatureFlags } from '@/shared/composables/useFeatureFlags'

const { showEventTime } = useFeatureFlags()

const props = defineProps({
  currentView: {
    type: String,
    default: 'week'
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
    default: 7
  },
  endHour: {
    type: Number,
    default: 22
  }
})

const emit = defineEmits(['day-click', 'event-click', 'week-change', 'view-change', 'slot-click'])

// Composable
const { getActivityColor, getActivityIcon, getActivityLabel } = useCalendar()

// Estado
const currentDate = ref(new Date(props.initialDate))

// Computed
const hours = computed(() => {
  const hoursList = []
  for (let i = props.startHour; i <= props.endHour; i++) {
    hoursList.push(i)
  }
  return hoursList
})

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const days = []
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    
    const isToday = day.getTime() === today.getTime()
    
    days.push({
      date: day.getDate(),
      dayName: dayNames[i],
      fullDate: day,
      dateKey: day.toISOString().split('T')[0],
      isToday,
      events: getEventsForDay(day)
    })
  }
  
  return days
})

const formattedWeekRange = computed(() => {
  const firstDay = weekDays.value[0].fullDate
  const lastDay = weekDays.value[6].fullDate
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  
  const firstMonth = monthNames[firstDay.getMonth()]
  const lastMonth = monthNames[lastDay.getMonth()]
  const year = lastDay.getFullYear()
  
  if (firstMonth === lastMonth) {
    return `${firstDay.getDate()} - ${lastDay.getDate()} de ${lastMonth} de ${year}`
  } else {
    return `${firstDay.getDate()} de ${firstMonth} - ${lastDay.getDate()} de ${lastMonth} de ${year}`
  }
})

// Methods
const getEventsForDay = (date) => {
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  
  return props.events.filter(event => {
    const eventDate = new Date(event.dataInicio)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate.getTime() === targetDate.getTime()
  })
}

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

const formatEventTime = (time) => {
  if (!time) return ''
  return time.substring(0, 5) // HH:MM
}

const getEventStyle = (event) => {
  if (!event.horaInicio || !event.horaTermino) return {}
  
  const [startHour, startMinute] = event.horaInicio.split(':').map(Number)
  const [endHour, endMinute] = event.horaTermino.split(':').map(Number)
  
  const startMinutes = (startHour - props.startHour) * 60 + startMinute
  const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  
  const slotHeight = 60 // 60px por hora
  const top = (startMinutes / 60) * slotHeight
  const height = (duration / 60) * slotHeight
  
  return {
    top: `${top}px`,
    height: `${height}px`,
    backgroundColor: `${getActivityColor(event.tipoAtividade)}20`,
    borderLeft: `3px solid ${getActivityColor(event.tipoAtividade)}`
  }
}

const handlePreviousWeek = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    currentDate.value.getDate() - 7
  )
  emit('week-change', currentDate.value)
}

const handleNextWeek = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    currentDate.value.getDate() + 7
  )
  emit('week-change', currentDate.value)
}

const handleToday = () => {
  currentDate.value = new Date()
  emit('week-change', currentDate.value)
}

const handleSlotClick = (day, hour) => {
  emit('slot-click', { date: day.fullDate, hour })
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleViewChange = (newView) => {
  emit('view-change', newView)
}
</script>

<style scoped>
.week-view-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}

.week-days-header {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  border-bottom: 1px solid rgba(47, 43, 61, 0.12);
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}

.time-column-header {
  padding: 16px 12px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.6);
  text-align: center;
  border-right: 1px solid rgba(47, 43, 61, 0.12);
}

.day-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-right: 1px solid rgba(47, 43, 61, 0.12);
}

.day-header:last-child {
  border-right: none;
}

.day-header.is-today {
  background-color: rgba(115, 103, 240, 0.04);
}

.day-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.6);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.day-date {
  font-size: 24px;
  font-weight: 500;
  color: rgba(47, 43, 61, 0.9);
}

.day-date.today-badge {
  background-color: #7367F0;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.time-grid-container {
  flex: 1;
  overflow-y: auto;
}

.time-grid {
  display: grid;
  grid-template-columns: 80px 1fr;
  min-height: 100%;
}

.time-column {
  border-right: 1px solid rgba(47, 43, 61, 0.12);
}

.time-slot {
  height: 60px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
  display: flex;
  align-items: flex-start;
}

.time-label {
  font-size: 12px;
  color: rgba(47, 43, 61, 0.6);
  font-weight: 500;
}

.days-columns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
}

.day-column {
  border-right: 1px solid rgba(47, 43, 61, 0.12);
  position: relative;
}

.day-column:last-child {
  border-right: none;
}

.day-column.is-today {
  background-color: rgba(115, 103, 240, 0.02);
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
  left: 4px;
  right: 4px;
  bottom: 0;
  pointer-events: none;
}

.timed-event {
  position: absolute;
  left: 0;
  right: 0;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.timed-event:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  z-index: 5;
}

.event-time {
  font-size: 11px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.7);
  margin-bottom: 2px;
}

.event-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-activity {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-activity i {
  font-size: 10px;
}

/* Responsive */
@media (max-width: 1024px) {
  .time-column-header,
  .time-column {
    width: 60px;
  }
  
  .day-date {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .week-days-header {
    grid-template-columns: 50px repeat(7, 1fr);
  }
  
  .day-name {
    font-size: 10px;
  }
  
  .day-date {
    font-size: 16px;
  }
  
  .event-title {
    font-size: 11px;
  }
}
</style>
