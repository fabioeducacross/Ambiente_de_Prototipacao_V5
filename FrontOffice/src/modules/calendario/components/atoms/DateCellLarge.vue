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
      <div
        v-for="event in visibleEvents"
        :key="event.id"
        class="event-item"
        :style="getEventStyle(event)"
        :title="event.title"
        @click.stop="handleEventClick(event)"
      >
        <span v-if="showEventTime && event.horaInicio" class="event-time">{{ formatTime(event.horaInicio) }}</span>
        <span
          v-if="isEducacrossOrigin(event.origin_level || event.origin || event.origem)"
          :style="belinhaMaskStyle"
          class="event-icon-coruja"
          role="img"
          aria-label="Educacross"
        />
        <span v-else class="material-symbols-outlined event-icon" aria-hidden="true">
          {{ getOriginIcon(event.origin_level || event.origin || event.origem) }}
        </span>
        <span class="event-title">{{ event.title }}</span>
      </div>
      
      <!-- Indicador de mais eventos -->
      <div v-if="hasMoreEvents" class="more-events" @click.stop="handleMoreClick">
        +{{ moreEventsCount }} mais
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getOriginIcon, normalizeOriginLevel, ORIGIN_LEVELS } from '../../data/calendar-enums'
import { useFeatureFlags } from '@/shared/composables/useFeatureFlags'
import iconeBelinha from '@/assets/icons/icone_belinha.svg'

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

// Converte cor hex para rgba com opacidade especificada
const hexToRgba = (hex, opacity = 0.16) => {
  if (!hex) return `rgba(115, 103, 240, ${opacity})` // fallback para primary
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Estilo do evento com cores claras
const getEventStyle = (event) => {
  return {
    backgroundColor: hexToRgba(event.color, 0.16),
    color: event.color
  }
}

// Formatar horário para exibição (ex: "2:30p", "9:00a")
const formatTime = (time) => {
  if (!time) return ''
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'p' : 'a'
  const hour12 = h % 12 || 12
  return `${hour12}:${minutes}${ampm}`
}

const resolveOrigin = (originValue) => normalizeOriginLevel(originValue)
const isEducacrossOrigin = (originValue) => resolveOrigin(originValue) === ORIGIN_LEVELS.EDUCACROSS.value

const belinhaMaskStyle = {
  WebkitMaskImage: `url(${iconeBelinha})`,
  maskImage: `url(${iconeBelinha})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  backgroundColor: 'currentColor'
}

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.day)
  }
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleMoreClick = () => {
  emit('more-click', { day: props.day, allEvents: props.events })
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

/* Item de evento (apenas eventos de 1 dia) */
.event-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.15s ease;
  min-height: 24px;
}

.event-item:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}

.event-time {
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.event-icon {
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  color: inherit;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.event-icon-coruja {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
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
