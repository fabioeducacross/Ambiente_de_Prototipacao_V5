<template>
  <div 
    class="spanning-event-item"
    :class="{ 
      'spanning-event-item--continuation': isContinuation,
      'spanning-event-item--clickable': clickable 
    }"
    :style="[eventStyle, positionStyle]"
    :title="eventTitle"
    @click="handleClick"
  >
    <!-- Horário (apenas no primeiro segmento) -->
    <span 
      v-if="showTime && !isContinuation && eventTime" 
      class="spanning-event-item__time"
    >
      {{ formattedTime }}
    </span>
    
    <!-- Ícone de origem -->
    <EventOriginIcon 
      v-if="showIcon"
      :origin="eventOrigin" 
      :color="iconColor"
      size="16px"
      class="spanning-event-item__icon"
    />
    
    <!-- Título do evento -->
    <span class="spanning-event-item__title">
      {{ eventTitle }}
    </span>
  </div>
</template>

<script setup>
/**
 * SpanningEventItem - Evento multi-dia (spanning) no MonthViewGrid
 * 
 * Renderiza eventos que abrangem múltiplos dias como barras horizontais
 * posicionadas absolutamente sobre a grade do calendário.
 * 
 * Características:
 * - Possui tarja lateral colorida
 * - Horário só aparece no primeiro segmento
 * - Ícone de origem + título
 * - Posicionamento via CSS Grid columns
 * 
 * @example
 * <SpanningEventItem 
 *   :event="spanEvent"
 *   :position-style="getSpanningEventStyle(spanEvent)"
 *   :is-continuation="spanEvent.isContinuation"
 *   show-time
 *   @click="handleEventClick"
 * />
 */
import { computed } from 'vue'
import EventOriginIcon from '@/components/atoms/EventOriginIcon.vue'
import { useEventRendering } from '@/composables/useEventRendering'

const props = defineProps({
  /**
   * Objeto do evento spanning
   */
  event: {
    type: Object,
    required: true
  },
  /**
   * Se é uma continuação do evento (não mostra horário)
   */
  isContinuation: {
    type: Boolean,
    default: false
  },
  /**
   * Exibir horário de início
   */
  showTime: {
    type: Boolean,
    default: false
  },
  /**
   * Exibir ícone de origem
   */
  showIcon: {
    type: Boolean,
    default: true
  },
  /**
   * Estilo de posicionamento (grid-column, top, etc.)
   */
  positionStyle: {
    type: Object,
    default: () => ({})
  },
  /**
   * Se o item é clicável
   */
  clickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click'])

// Composable
const { 
  hexToRgba, 
  formatTimeCompact,
  getEventOrigin 
} = useEventRendering()

// Computed - Dados do evento
const eventTitle = computed(() => 
  props.event.title || props.event.titulo || 'Sem título'
)

const eventTime = computed(() => 
  props.event.horaInicio || props.event.start_time || ''
)

const eventColor = computed(() => 
  props.event.color || '#7367F0'
)

const eventOrigin = computed(() => 
  getEventOrigin(props.event)
)

// Computed - Formatação
const formattedTime = computed(() => 
  formatTimeCompact(eventTime.value)
)

const iconColor = computed(() => 
  `var(--event-color, ${eventColor.value})`
)

// Computed - Estilos
const eventStyle = computed(() => ({
  backgroundColor: hexToRgba(eventColor.value, 0.12),
  borderLeftColor: eventColor.value,
  '--event-color': eventColor.value
}))

// Handlers
const handleClick = (e) => {
  if (props.clickable) {
    e.stopPropagation()
    emit('click', props.event, e)
  }
}
</script>

<style scoped>
.spanning-event-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  border-left: 3px solid;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  height: 24px;
  box-sizing: border-box;
  z-index: 1;
  overflow: hidden;
  transition: filter 0.2s ease, transform 0.15s ease;
}

.spanning-event-item--clickable {
  cursor: pointer;
  pointer-events: auto; /* Reativa cliques mesmo com harness pai tendo pointer-events: none */
}

.spanning-event-item--clickable:hover {
  filter: brightness(0.95);
  z-index: 2;
}

.spanning-event-item__time {
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--event-color, inherit);
}

.spanning-event-item__icon {
  flex-shrink: 0;
}

.spanning-event-item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  color: rgba(47, 43, 61, 0.9);
}

/* Responsive */
@media (max-width: 1024px) {
  .spanning-event-item {
    font-size: 12px;
    padding: 3px 6px;
    height: 22px;
  }
}

@media (max-width: 768px) {
  .spanning-event-item {
    font-size: 11px;
    padding: 2px 4px;
    height: 20px;
    gap: 4px;
  }
  
  .spanning-event-item__time {
    display: none;
  }
}
</style>
