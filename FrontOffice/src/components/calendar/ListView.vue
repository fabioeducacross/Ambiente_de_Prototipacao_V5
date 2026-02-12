<template>
  <div class="list-view">
    <!-- Agrupamento por data -->
    <div 
      v-for="group in groupedEvents" 
      :key="group.date"
      class="date-group"
    >
      <div class="date-header">
        <div class="date-info">
          <span class="date-day">{{ group.dayNumber }}</span>
          <div class="date-text">
            <span class="date-weekday">{{ group.weekday }}</span>
            <span class="date-month">{{ group.month }}</span>
          </div>
        </div>
        <span class="event-count">{{ group.events.length }} {{ group.events.length === 1 ? 'evento' : 'eventos' }}</span>
      </div>

      <div class="events-list">
        <div 
          v-for="event in group.events" 
          :key="event.id"
          class="event-item"
          @click="$emit('event-click', event)"
        >
          <div 
            class="event-color-bar"
            :style="{ backgroundColor: getCategoryColor(event.category) }"
          ></div>
          <div class="event-time" v-if="!event.all_day">
            {{ formatTime(event.start_at) }}
          </div>
          <div class="event-time all-day" v-else>
            <span class="material-symbols-outlined">schedule</span>
            Dia inteiro
          </div>
          <div class="event-content">
            <div class="event-title-row">
              <span class="event-title">{{ event.title }}</span>
              <span class="material-symbols-outlined origin-icon">
                {{ getOriginIcon(event.origin_level) }}
              </span>
            </div>
            <div class="event-meta">
              <span class="event-category">
                <span class="material-symbols-outlined category-icon">
                  {{ getCategoryIcon(event.category) }}
                </span>
                {{ getCategoryLabel(event.category) }}
              </span>
              <span v-if="event.scope_level" class="event-scope">
                • {{ getScopeLabel(event.scope_level) }}
              </span>
            </div>
            <p v-if="event.description" class="event-description">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="groupedEvents.length === 0" class="empty-state">
      <span class="material-symbols-outlined">search_off</span>
      <p>Nenhum evento encontrado</p>
      <span class="empty-hint">Tente ajustar os filtros</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  format, 
  parseISO,
  startOfDay,
  compareAsc
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  CATEGORIES, 
  ORIGIN_LEVELS, 
  getCategoryColor, 
  getOriginIcon 
} from '@/data/calendar-enums'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  }
})

defineEmits(['event-click'])

// Agrupa eventos por data
const groupedEvents = computed(() => {
  // Filtra eventos por período se especificado
  let filteredEvents = props.events

  if (props.startDate && props.endDate) {
    filteredEvents = props.events.filter(event => {
      const eventDate = parseISO(event.start_at)
      return eventDate >= props.startDate && eventDate <= props.endDate
    })
  }

  // Agrupa por data
  const groups = filteredEvents.reduce((acc, event) => {
    const eventDate = parseISO(event.start_at)
    const dayKey = format(startOfDay(eventDate), 'yyyy-MM-dd')

    if (!acc[dayKey]) {
      acc[dayKey] = {
        date: dayKey,
        dayNumber: format(eventDate, 'd'),
        weekday: format(eventDate, 'EEEE', { locale: ptBR }),
        month: format(eventDate, 'MMMM yyyy', { locale: ptBR }),
        events: [],
        sortDate: eventDate
      }
    }

    acc[dayKey].events.push(event)
    return acc
  }, {})

  // Ordena eventos dentro de cada grupo
  Object.values(groups).forEach(group => {
    group.events.sort((a, b) => {
      // Dia inteiro vem primeiro
      if (a.all_day && !b.all_day) return -1
      if (!a.all_day && b.all_day) return 1
      
      // Ordena por horário
      const dateA = parseISO(a.start_at)
      const dateB = parseISO(b.start_at)
      return compareAsc(dateA, dateB)
    })
  })

  // Retorna grupos ordenados por data
  return Object.values(groups).sort((a, b) => compareAsc(a.sortDate, b.sortDate))
})

const formatTime = (dateString) => {
  const date = parseISO(dateString)
  return format(date, 'HH:mm', { locale: ptBR })
}

const getCategoryIcon = (category) => {
  return CATEGORIES[category]?.icon || 'event'
}

const getCategoryLabel = (category) => {
  return CATEGORIES[category]?.label || 'Evento'
}

const getScopeLabel = (scope) => {
  const labels = {
    'NETWORK': 'Toda a Rede',
    'SCHOOL': 'Toda a Escola',
    'CLASS': 'Turma'
  }
  return labels[scope] || scope
}
</script>

<style scoped>
.list-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.date-group {
  border-bottom: 1px solid #e0e0e0;
}

.date-group:last-child {
  border-bottom: none;
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-day {
  font-size: 32px;
  font-weight: 700;
  color: #7367F0;
  line-height: 1;
}

.date-text {
  display: flex;
  flex-direction: column;
}

.date-weekday {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: capitalize;
}

.date-month {
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
}

.event-count {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  background: white;
  padding: 4px 12px;
  border-radius: 12px;
}

.events-list {
  padding: 8px;
}

.event-item {
  display: grid;
  grid-template-columns: 4px 80px 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.event-item:last-child {
  margin-bottom: 0;
}

.event-item:hover {
  background: #f8f9fa;
  transform: translateX(4px);
}

.event-color-bar {
  width: 4px;
  border-radius: 2px;
}

.event-time {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.event-time.all-day {
  font-size: 12px;
  color: #666;
  gap: 4px;
}

.event-time.all-day .material-symbols-outlined {
  font-size: 16px;
}

.event-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.event-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  flex: 1;
}

.origin-icon {
  font-size: 20px;
  color: #999;
  flex-shrink: 0;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  flex-wrap: wrap;
}

.event-category {
  display: flex;
  align-items: center;
  gap: 4px;
}

.category-icon {
  font-size: 16px;
}

.event-scope {
  color: #999;
}

.event-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.empty-state .material-symbols-outlined {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.empty-hint {
  font-size: 14px;
  color: #bbb;
}

@media (max-width: 768px) {
  .event-item {
    grid-template-columns: 4px 1fr;
    gap: 8px;
  }

  .event-time {
    grid-column: 2 / 3;
    font-size: 12px;
    margin-bottom: -4px;
  }

  .event-content {
    grid-column: 2 / 3;
  }
}
</style>
