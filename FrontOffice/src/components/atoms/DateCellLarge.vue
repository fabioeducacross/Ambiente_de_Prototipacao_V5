<template>
  <div
    class="date-cell-large"
    :class="{
      'date-cell-disabled': disabled,
      'date-cell-other-month': !isCurrentMonth,
      'date-cell-today': isToday
    }"
    :aria-label="`${label}`"
    @click="handleClick"
  >
    <!-- Número do dia -->
    <div class="date-number">{{ day }}</div>
    
    <!-- Área de eventos (apenas eventos de 1 dia) -->
    <div class="events-container" :style="eventsContainerStyle">
      <EventItem
        v-for="event in visibleEvents"
        :key="event.id"
        :event="event"
        :show-time="showEventTime"
        variant="compact"
        @click="handleEventClick(event)"
      />
      
      <!-- Indicador de mais eventos -->
      <div v-if="hasMoreEvents" class="more-events" @click.stop="handleMoreClick($event)">
        +{{ moreEventsCount }} mais
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeatureFlags } from '@/composables/useFeatureFlags'
import EventItem from '@/components/molecules/EventItem.vue'

const { showEventTime } = useFeatureFlags()

// Constantes consistentes com MonthViewGrid
const EVENT_HEIGHT = 24 // px
const EVENT_GAP = 4 // px

const props = defineProps({
  day: {
    type: Number,
    required: true
  },
  isCurrentMonth: {
    type: Boolean,
    default: true
  },
  isToday: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  events: {
    type: Array,
    default: () => []
  },
  spanningSlotCount: {
    type: Number,
    default: 0
  },
  maxVisibleEvents: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['click', 'event-click', 'more-click'])

// Eventos visíveis (limitados por maxVisibleEvents)
const visibleEvents = computed(() => {
  return props.events.slice(0, props.maxVisibleEvents)
})

const hasMoreEvents = computed(() => props.events.length > props.maxVisibleEvents)

const moreEventsCount = computed(() => props.events.length - props.maxVisibleEvents)

// Estilo do container de eventos com padding-top para eventos spanning
const eventsContainerStyle = computed(() => {
  if (props.spanningSlotCount > 0) {
    const paddingTop = props.spanningSlotCount * (EVENT_HEIGHT + EVENT_GAP)
    return { paddingTop: `${paddingTop}px` }
  }
  return {}
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.day)
  }
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleMoreClick = (nativeEvent) => {
  emit('more-click', { day: props.day, allEvents: props.events }, nativeEvent)
}
</script>

<style scoped>
.date-cell-large {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 125px;
  height: 100%; /* Preenche toda a altura da linha */
  width: 100%;
  padding: 8px;
  background-color: white;
  border: 1px solid rgba(47, 43, 61, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden; /* Célula não transborda, spanning fica na camada harness */
}

.date-cell-large:hover {
  background-color: rgba(115, 103, 240, 0.04);
  border-color: rgba(115, 103, 240, 0.3);
}

/* Número do dia */
.date-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  margin-bottom: 4px;
}

/* Container de eventos */
.events-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  position: relative;
}

/* Indicador "mais eventos" */
.more-events {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: rgba(47, 43, 61, 0.7);
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.more-events:hover {
  color: #7367f0;
}

/* Estado: célula desabilitada */
.date-cell-large.date-cell-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.date-cell-large.date-cell-disabled:hover {
  background-color: white;
  border-color: rgba(47, 43, 61, 0.12);
}

/* Estado: outro mês */
.date-cell-large.date-cell-other-month .date-number {
  color: rgba(47, 43, 61, 0.4);
}

/* Estado: hoje */
.date-cell-large.date-cell-today {
  background-color: rgba(115, 103, 240, 0.08);
}

.date-cell-large.date-cell-today .date-number {
  color: #7367f0;
  font-weight: 500;
}
</style>
