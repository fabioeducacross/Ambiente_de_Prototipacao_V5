<template>
  <div class="day-view">
    <!-- Day header -->
    <div class="day-header">
      <div class="day-info">
        <h2 class="day-title">{{ formatDate(currentDate, 'long') }}</h2>
        <p class="day-subtitle">{{ getEventCount() }}</p>
      </div>
    </div>

    <!-- Timeline -->
    <div class="day-timeline">
      <div class="timeline-grid">
        <!-- Time labels -->
        <div class="time-labels">
          <div
            v-for="hour in hours"
            :key="hour"
            class="time-slot-label"
          >
            {{ formatHour(hour) }}
          </div>
        </div>

        <!-- Events column -->
        <div class="events-column">
          <!-- Hour slots -->
          <div
            v-for="hour in hours"
            :key="`slot-${hour}`"
            class="time-slot"
            @click="handleSlotClick(hour)"
          >
            <div class="slot-line"></div>
          </div>

          <!-- Events overlay -->
          <div
            v-for="event in dayEvents"
            :key="event.id"
            class="event-card"
            :style="getEventStyle(event)"
            @click="$emit('edit-event', event)"
          >
            <div class="event-header">
              <i :class="['bi', getActivityIcon(event.tipo)]"></i>
              <span v-if="showEventTime" class="event-time-range">{{ formatEventTime(event) }}</span>
            </div>
            <div class="event-title-day">{{ event.titulo }}</div>
            <div class="event-meta">
              <span class="event-badge" :style="{ backgroundColor: getActivityColor(event.tipo) }">
                {{ getActivityLabel(event.tipo) }}
              </span>
              <span class="event-turmas">{{ formatTurmas(event.turmas) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="dayEvents.length === 0" class="empty-state">
      <i class="bi bi-calendar-x"></i>
      <p>Nenhum evento agendado para este dia</p>
      <button class="btn btn-primary" @click="handleAddEvent">
        <i class="bi bi-plus-lg"></i>
        Adicionar Evento
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalendar } from '../../../composables/useCalendar'
import { useFeatureFlags } from '@/composables/useFeatureFlags'

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

const emit = defineEmits(['edit-event', 'create-event'])

const { 
  getEventsForDate, 
  getActivityColor, 
  getActivityIcon, 
  getActivityLabel,
  formatDate 
} = useCalendar()

// Hours (6 AM to 10 PM)
const hours = Array.from({ length: 17 }, (_, i) => i + 6)

// Get events for current day
const dayEvents = computed(() => {
  return getEventsForDate(props.events, props.currentDate, props.selectedTurma)
})

// Get event count text
const getEventCount = () => {
  const count = dayEvents.value.length
  if (count === 0) return 'Nenhum evento'
  if (count === 1) return '1 evento'
  return `${count} eventos`
}

// Format hour
const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

// Get event style
const getEventStyle = (event) => {
  const startDate = new Date(event.dataInicio)
  const endDate = new Date(event.dataTermino)
  
  const startHour = startDate.getHours()
  const startMinute = startDate.getMinutes()
  const endHour = endDate.getHours()
  const endMinute = endDate.getMinutes()
  
  // Calculate position (6 AM = 0, each hour = 80px)
  const top = ((startHour - 6) * 80) + (startMinute / 60 * 80)
  const duration = ((endHour - startHour) * 60) + (endMinute - startMinute)
  const height = (duration / 60) * 80
  
  return {
    top: `${top}px`,
    height: `${Math.max(height, 60)}px`,
    borderLeft: `4px solid ${getActivityColor(event.tipo)}`
  }
}

// Format event time
const formatEventTime = (event) => {
  const start = new Date(event.dataInicio)
  const end = new Date(event.dataTermino)
  return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`
}

// Format turmas
const formatTurmas = (turmas) => {
  if (!turmas || turmas.length === 0) return ''
  if (turmas.length === 1) return turmas[0]
  return `${turmas[0]} +${turmas.length - 1}`
}

// Handle slot click
const handleSlotClick = (hour) => {
  const clickedDate = new Date(props.currentDate)
  clickedDate.setHours(hour, 0, 0, 0)
  emit('create-event', clickedDate)
}

// Handle add event button
const handleAddEvent = () => {
  const today = new Date(props.currentDate)
  today.setHours(9, 0, 0, 0)
  emit('create-event', today)
}
</script>

<style scoped>
.day-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

/* Day header */
.day-header {
  padding: 24px;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  color: #fff;
}

.day-info {
  max-width: 1200px;
  margin: 0 auto;
}

.day-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-transform: capitalize;
}

.day-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}

/* Timeline */
.day-timeline {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.timeline-grid {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  position: relative;
  min-height: 1360px;
}

/* Time labels */
.time-labels {
  display: flex;
  flex-direction: column;
}

.time-slot-label {
  height: 80px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
}

/* Events column */
.events-column {
  position: relative;
}

.time-slot {
  height: 80px;
  cursor: pointer;
  position: relative;
}

.slot-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e0e0e0;
}

.time-slot:hover {
  background-color: #f8f9fa;
  border-radius: 4px;
}

/* Event cards */
.event-card {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.event-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateX(4px);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.event-header i {
  font-size: 16px;
  color: #6c757d;
}

.event-time-range {
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
}

.event-title-day {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.4;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.event-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
}

.event-turmas {
  font-size: 12px;
  color: #6c757d;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-state i {
  font-size: 64px;
  color: #d0d5dd;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background-color: #5f54d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(115, 103, 240, 0.3);
}

/* Scrollbar */
.day-timeline::-webkit-scrollbar {
  width: 8px;
}

.day-timeline::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.day-timeline::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.day-timeline::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .day-header {
    padding: 16px;
  }
  
  .day-title {
    font-size: 20px;
  }
  
  .day-subtitle {
    font-size: 14px;
  }
  
  .day-timeline {
    padding: 16px;
  }
  
  .timeline-grid {
    grid-template-columns: 60px 1fr;
    gap: 12px;
  }
  
  .time-slot-label {
    font-size: 12px;
  }
  
  .event-card {
    padding: 8px;
  }
  
  .event-title-day {
    font-size: 14px;
  }
}
</style>
