<template>
  <div class="list-view">
    <!-- Event groups -->
    <div v-if="sortedEvents.length > 0" class="events-list">
      <!-- Hoje -->
      <div v-if="groupedEvents.hoje.length > 0" class="event-group">
        <h3 class="group-title">
          <i class="bi bi-circle-fill today-dot"></i>
          Hoje
        </h3>
        <EventItem
          v-for="event in groupedEvents.hoje"
          :key="event.id"
          :event="event"
          @click="$emit('edit-event', event)"
        />
      </div>

      <!-- Amanhã -->
      <div v-if="groupedEvents.amanha.length > 0" class="event-group">
        <h3 class="group-title">
          <i class="bi bi-circle-fill tomorrow-dot"></i>
          Amanhã
        </h3>
        <EventItem
          v-for="event in groupedEvents.amanha"
          :key="event.id"
          :event="event"
          @click="$emit('edit-event', event)"
        />
      </div>

      <!-- Esta Semana -->
      <div v-if="groupedEvents.semana.length > 0" class="event-group">
        <h3 class="group-title">
          <i class="bi bi-circle-fill week-dot"></i>
          Esta Semana
        </h3>
        <EventItem
          v-for="event in groupedEvents.semana"
          :key="event.id"
          :event="event"
          @click="$emit('edit-event', event)"
        />
      </div>

      <!-- Mais Adiante -->
      <div v-if="groupedEvents.futuro.length > 0" class="event-group">
        <h3 class="group-title">
          <i class="bi bi-circle-fill future-dot"></i>
          Mais Adiante
        </h3>
        <EventItem
          v-for="event in groupedEvents.futuro"
          :key="event.id"
          :event="event"
          @click="$emit('edit-event', event)"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <i class="bi bi-calendar-x"></i>
      <p>Nenhum evento encontrado</p>
      <p class="empty-subtitle">Crie um novo evento para começar</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalendar } from '../../../composables/useCalendar'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  selectedTurma: {
    type: String,
    default: null
  },
  dateRange: {
    type: Object,
    default: () => ({ start: new Date(), end: null })
  }
})

const emit = defineEmits(['edit-event'])

const { groupEventsByPeriod, getActivityColor, getActivityIcon, getActivityLabel } = useCalendar()

// Filter events by turma
const filteredEvents = computed(() => {
  if (!props.selectedTurma) return props.events
  return props.events.filter(event => 
    !event.turmas || event.turmas.includes(props.selectedTurma)
  )
})

// Sort events by date
const sortedEvents = computed(() => {
  return [...filteredEvents.value].sort((a, b) => {
    return new Date(a.dataInicio) - new Date(b.dataInicio)
  })
})

// Group events by period
const groupedEvents = computed(() => {
  return groupEventsByPeriod(sortedEvents.value)
})
</script>

<script>
// EventItem component
import { defineComponent, h } from 'vue'

const EventItem = defineComponent({
  props: {
    event: Object
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { getActivityColor, getActivityIcon, getActivityLabel, formatDate } = useCalendar()
    
    const formatEventDate = (event) => {
      const start = new Date(event.dataInicio)
      const end = new Date(event.dataTermino)
      
      const isSameDay = start.toDateString() === end.toDateString()
      
      if (isSameDay) {
        return {
          date: start.toLocaleDateString('pt-BR', { 
            weekday: 'short', 
            day: '2-digit', 
            month: 'short' 
          }),
          time: `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`
        }
      }
      
      return {
        date: `${start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${end.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`,
        time: 'Múltiplos dias'
      }
    }
    
    const formatTurmas = (turmas) => {
      if (!turmas || turmas.length === 0) return 'Todas as turmas'
      if (turmas.length === 1) return turmas[0]
      return `${turmas.length} turmas`
    }
    
    return () => {
      const dateInfo = formatEventDate(props.event)
      
      return h('div', {
        class: 'event-item',
        onClick: () => emit('click')
      }, [
        // Left colored bar
        h('div', {
          class: 'event-color-bar',
          style: { backgroundColor: getActivityColor(props.event.tipo) }
        }),
        
        // Date column
        h('div', { class: 'event-date-col' }, [
          h('div', { class: 'event-date' }, dateInfo.date),
          h('div', { class: 'event-time' }, dateInfo.time)
        ]),
        
        // Content column
        h('div', { class: 'event-content-col' }, [
          h('div', { class: 'event-header-row' }, [
            h('i', { 
              class: ['bi', getActivityIcon(props.event.tipo)],
              style: { color: getActivityColor(props.event.tipo) }
            }),
            h('h4', { class: 'event-title-list' }, props.event.titulo)
          ]),
          h('p', { class: 'event-description' }, props.event.descricao || 'Sem descrição'),
          h('div', { class: 'event-footer-row' }, [
            h('span', {
              class: 'event-type-badge',
              style: { backgroundColor: getActivityColor(props.event.tipo) }
            }, getActivityLabel(props.event.tipo)),
            h('span', { class: 'event-turmas-text' }, formatTurmas(props.event.turmas)),
            h('span', { 
              class: 'event-origin-badge',
              classList: props.event.origem === 'professor' ? 'origin-professor' : 'origin-escola'
            }, props.event.origem === 'professor' ? 'Customizado' : 'Escola')
          ])
        ]),
        
        // Actions
        h('div', { class: 'event-actions' }, [
          h('i', { class: 'bi bi-chevron-right' })
        ])
      ])
    }
  }
})

export default { EventItem }
</script>

<style scoped>
.list-view {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  background-color: #f8f9fa;
}

.events-list {
  max-width: 900px;
  margin: 0 auto;
}

/* Event groups */
.event-group {
  margin-bottom: 32px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0e0e0;
}

.group-title i {
  font-size: 12px;
}

.today-dot {
  color: var(--primary);
}

.tomorrow-dot {
  color: var(--info);
}

.week-dot {
  color: var(--success);
}

.future-dot {
  color: var(--secondary);
}

/* Event item */
.event-item {
  display: grid;
  grid-template-columns: 4px 140px 1fr 40px;
  gap: 16px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.event-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
}

.event-color-bar {
  border-radius: 2px;
}

/* Date column */
.event-date-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-date {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: capitalize;
  margin-bottom: 4px;
}

.event-time {
  font-size: 12px;
  color: #6c757d;
}

/* Content column */
.event-content-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-header-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-header-row i {
  font-size: 18px;
}

.event-title-list {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.event-description {
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.event-footer-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.event-type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
}

.event-turmas-text {
  font-size: 12px;
  color: #6c757d;
}

.event-origin-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.origin-professor {
  background-color: #e0f2ff;
  color: #0066cc;
}

.origin-escola {
  background-color: #f0efff;
  color: var(--primary);
}

/* Actions */
.event-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
}

.event-actions i {
  font-size: 18px;
  transition: all 0.2s ease;
}

.event-item:hover .event-actions i {
  color: var(--primary);
  transform: translateX(4px);
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-state i {
  font-size: 72px;
  color: #d0d5dd;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 20px;
  font-weight: 600;
  color: #6c757d;
  margin: 0 0 8px 0;
}

.empty-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #adb5bd;
}

/* Scrollbar */
.list-view::-webkit-scrollbar {
  width: 8px;
}

.list-view::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.list-view::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.list-view::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .list-view {
    padding: 16px;
  }
  
  .event-item {
    grid-template-columns: 4px 1fr 40px;
    gap: 12px;
  }
  
  .event-date-col {
    display: none;
  }
  
  .group-title {
    font-size: 16px;
  }
  
  .event-title-list {
    font-size: 14px;
  }
  
  .event-description {
    font-size: 13px;
    -webkit-line-clamp: 1;
  }
}
</style>
