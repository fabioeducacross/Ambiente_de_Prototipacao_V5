<template>
  <div class="week-view">
    <!-- Week header with days -->
    <div class="week-header">
      <div class="time-column-header"></div>
      <div
        v-for="day in weekDays"
        :key="day.date.getTime()"
        class="day-header"
        :class="{ 'today': day.isToday }"
      >
        <div class="day-name">{{ getDayName(day.date) }}</div>
        <div class="day-number">{{ day.date.getDate() }}</div>
      </div>
    </div>

    <!-- Timeline grid -->
    <div class="timeline-container">
      <div class="timeline-grid">
        <!-- Hour labels column -->
        <div class="time-column">
          <div
            v-for="hour in hours"
            :key="hour"
            class="hour-label"
          >
            {{ formatHour(hour) }}
          </div>
        </div>

        <!-- Days columns with events -->
        <div class="days-columns">
          <div
            v-for="day in weekDays"
            :key="day.date.getTime()"
            class="day-column"
          >
            <!-- Hour slots -->
            <div
              v-for="hour in hours"
              :key="`${dayIndex}-${hour}`"
              class="hour-slot"
              @click="handleSlotClick(day.date, hour)"
            ></div>

            <!-- Events overlay -->
            <div
              v-for="event in getEventsForDay(day.date)"
              :key="event.id"
              class="event-block"
              :style="getEventStyle(event)"
              @click.stop="$emit('edit-event', event)"
            >
              <div v-if="showEventTime" class="event-time">{{ formatEventTime(event) }}</div>
              <div class="event-title-block">{{ event.titulo }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalendar } from '../../composables/useCalendar'
import { useFeatureFlags } from '@/shared/composables/useFeatureFlags'

const { showEventTime } = useFeatureFlags()

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

const emit = defineEmits(['select-event', 'edit-event', 'create-event'])

const { getWeekDays, getEventsForDate, getActivityColor } = useCalendar()

// Week days (7 days starting from Sunday)
const weekDays = computed(() => {
  return getWeekDays(props.currentDate)
})

// Hours array (8 AM to 6 PM)
const hours = Array.from({ length: 11 }, (_, i) => i + 8)

// Get day name
const getDayName = (date) => {
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
}

// Format hour
const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

// Get events for specific day
const getEventsForDay = (date) => {
  return getEventsForDate(props.events, date, props.selectedTurma)
}

// Get event style (position and height based on time)
const getEventStyle = (event) => {
  const startDate = new Date(event.dataInicio)
  const endDate = new Date(event.dataTermino)
  
  const startHour = startDate.getHours()
  const startMinute = startDate.getMinutes()
  const endHour = endDate.getHours()
  const endMinute = endDate.getMinutes()
  
  // Calculate position (8 AM = 0, each hour = 60px)
  const top = ((startHour - 8) * 60) + (startMinute / 60 * 60)
  const duration = ((endHour - startHour) * 60) + (endMinute - startMinute)
  const height = (duration / 60) * 60
  
  return {
    top: `${top}px`,
    height: `${Math.max(height, 30)}px`,
    backgroundColor: getActivityColor(event.tipo),
    borderLeft: `4px solid ${adjustColor(getActivityColor(event.tipo), -20)}`
  }
}

// Adjust color brightness
const adjustColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1)
}

// Format event time
const formatEventTime = (event) => {
  const start = new Date(event.dataInicio)
  const end = new Date(event.dataTermino)
  return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`
}

// Handle slot click
const handleSlotClick = (date, hour) => {
  const clickedDate = new Date(date)
  clickedDate.setHours(hour, 0, 0, 0)
  emit('create-event', clickedDate)
}
</script>

<style scoped>
.week-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Week header */
.week-header {
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  border-bottom: 2px solid #e0e0e0;
  background-color: #fff;
  z-index: 2;
}

.time-column-header {
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
}

.day-header {
  padding: 12px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.day-header:hover {
  background-color: #f8f9fa;
}

.day-header.today {
  background-color: #f0efff;
}

.day-name {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 4px;
}

.day-number {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.day-header.today .day-number {
  background-color: var(--primary);
  color: #fff;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Timeline */
.timeline-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.timeline-grid {
  display: grid;
  grid-template-columns: 60px 1fr;
  position: relative;
  min-height: 660px;
}

/* Time column */
.time-column {
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  position: relative;
}

.hour-label {
  height: 60px;
  padding: 8px;
  font-size: 12px;
  color: #6c757d;
  text-align: right;
  border-bottom: 1px solid #e0e0e0;
}

/* Days columns */
.days-columns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-column {
  border-right: 1px solid #e0e0e0;
  position: relative;
}

.hour-slot {
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.hour-slot:hover {
  background-color: #f8f9fa;
}

/* Event blocks */
.event-block {
  position: absolute;
  left: 2px;
  right: 2px;
  padding: 6px 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  z-index: 1;
}

.event-block:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.event-time {
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 2px;
  opacity: 0.9;
}

.event-title-block {
  font-weight: 500;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Scrollbar */
.timeline-container::-webkit-scrollbar {
  width: 8px;
}

.timeline-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.timeline-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.timeline-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .week-header {
    grid-template-columns: 50px repeat(7, 1fr);
  }
  
  .timeline-grid {
    grid-template-columns: 50px 1fr;
  }
  
  .day-name {
    font-size: 10px;
  }
  
  .day-number {
    font-size: 14px;
  }
  
  .hour-label {
    font-size: 10px;
    padding: 4px;
  }
  
  .event-block {
    font-size: 10px;
    padding: 4px;
  }
}
</style>
