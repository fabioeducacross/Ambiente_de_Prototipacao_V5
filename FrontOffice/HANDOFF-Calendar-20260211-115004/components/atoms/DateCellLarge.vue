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
    
    <!-- Área de eventos -->
    <div class="events-container">
      <div
        v-for="event in events"
        :key="event.id"
        class="event-item"
        :style="{ backgroundColor: event.color }"
        :title="event.title"
      >
        <span class="event-title">{{ event.title }}</span>
      </div>
      
      <!-- Indicador de mais eventos -->
      <div v-if="hasMoreEvents" class="more-events">
        + {{ moreEventsCount }} mais
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
    default: () => [],
    validator: (value) => {
      return value.every(event => 
        typeof event.id !== 'undefined' &&
        typeof event.title === 'string' &&
        typeof event.color === 'string'
      )
    }
  },
  maxVisibleEvents: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['click', 'event-click'])

const hasMoreEvents = computed(() => props.events.length > props.maxVisibleEvents)

const moreEventsCount = computed(() => props.events.length - props.maxVisibleEvents)

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.day)
  }
}
</script>

<style scoped>
.date-cell-large {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 125px;
  width: 100%;
  padding: 8px;
  background-color: white;
  border: 1px solid rgba(47, 43, 61, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
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
  overflow: hidden;
}

/* Item de evento */
.event-item {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;
  min-height: 24px;
}

.event-item:hover {
  opacity: 0.85;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
