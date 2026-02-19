<template>
  <div 
    class="event-item"
    :class="[
      `event-item--${variant}`,
      { 'event-item--clickable': clickable }
    ]"
    :style="[eventStyle, positionStyle]"
    :title="eventTitle"
    @click="handleClick"
  >
    <!-- Slot para conteúdo antes do ícone -->
    <slot name="prepend" />
    
    <!-- Horário (opcional) -->
    <span v-if="showTime && eventTime" class="event-item__time">
      {{ formattedTime }}
    </span>
    
    <!-- Ícone de origem -->
    <EventOriginIcon 
      v-if="showIcon"
      :origin="eventOrigin" 
      :color="iconColor"
      :size="iconSize"
      class="event-item__icon"
    />
    
    <!-- Título do evento -->
    <span class="event-item__title">
      {{ eventTitle }}
    </span>
    
    <!-- Slot para conteúdo adicional -->
    <slot name="append" />
  </div>
</template>

<script setup>
/**
 * EventItem - Componente base para renderizar eventos no calendário
 * 
 * Usado em: DateCellLarge (eventos de 1 dia), popover "+X mais"
 * 
 * Variantes:
 * - compact: Menos padding, fonte menor (para células pequenas)
 * - default: Tamanho padrão
 * - expanded: Mais padding, fonte maior (para popover/drawer)
 * 
 * @example
 * <!-- Uso básico -->
 * <EventItem :event="event" @click="handleEventClick" />
 * 
 * <!-- Com horário -->
 * <EventItem :event="event" show-time />
 * 
 * <!-- Variante compacta -->
 * <EventItem :event="event" variant="compact" />
 * 
 * <!-- Com posicionamento personalizado -->
 * <EventItem :event="event" :position-style="{ top: '10px', left: '0' }" />
 */
import { computed } from 'vue'
import EventOriginIcon from '@/components/atoms/EventOriginIcon.vue'
import { useEventRendering } from '@/composables/useEventRendering'

const props = defineProps({
  /**
   * Objeto do evento
   * Aceita formatos: { title, color, origin_level, horaInicio } ou 
   *                  { titulo, color, origem, horaInicio }
   */
  event: {
    type: Object,
    required: true
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
   * Variante visual
   */
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['compact', 'default', 'expanded'].includes(v)
  },
  /**
   * Estilo de posicionamento (top, left, width, height)
   * Usado quando evento precisa ser posicionado absolutamente
   */
  positionStyle: {
    type: Object,
    default: () => ({})
  },
  /**
   * Se o item é clicável (adiciona hover effects)
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

// Computed - Dados do evento normalizados
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

// Computed - Tamanhos por variante
const iconSize = computed(() => {
  const sizes = { compact: '14px', default: '16px', expanded: '18px' }
  return sizes[props.variant]
})

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
    emit('click', props.event, e)
  }
}
</script>

<style scoped>
.event-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  border-left: 3px solid;
  font-family: 'Montserrat', sans-serif;
  transition: filter 0.2s ease, transform 0.15s ease;
  min-height: 24px;
  box-sizing: border-box;
}

.event-item--clickable {
  cursor: pointer;
}

.event-item--clickable:hover {
  filter: brightness(0.95);
}

/* Variante Compact */
.event-item--compact {
  padding: 2px 6px;
  min-height: 20px;
  gap: 4px;
}

.event-item--compact .event-item__title {
  font-size: 12px;
  line-height: 1.2;
}

.event-item--compact .event-item__time {
  font-size: 11px;
}

/* Variante Expanded */
.event-item--expanded {
  padding: 8px 12px;
  min-height: 32px;
  gap: 8px;
}

.event-item--expanded .event-item__title {
  font-size: 14px;
}

.event-item--expanded .event-item__time {
  font-size: 13px;
}

/* Elementos internos */
.event-item__time {
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--event-color, inherit);
}

.event-item__icon {
  flex-shrink: 0;
}

.event-item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
  color: rgba(47, 43, 61, 0.9);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
}
</style>
