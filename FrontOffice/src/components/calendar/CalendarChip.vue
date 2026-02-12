<template>
  <div 
    class="calendar-chip"
    :class="chipClasses"
    :style="chipStyles"
    @click="handleClick"
  >
    <div class="chip-header">
      <span class="material-symbols-outlined chip-origin-icon">{{ originIcon }}</span>
      <span class="chip-time" v-if="!event.all_day && showTime">{{ formattedTime }}</span>
    </div>
    <div class="chip-content">
      <span class="chip-title">{{ event.title }}</span>
      <span class="material-symbols-outlined chip-category-icon">{{ categoryIcon }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES, ORIGIN_LEVELS, getCategoryColor, getOriginIcon } from '@/data/calendar-enums'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  showTime: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'default', // 'default' | 'compact' | 'list'
    validator: (value) => ['default', 'compact', 'list'].includes(value)
  }
})

const emit = defineEmits(['click'])

// Cor da categoria
const categoryColor = computed(() => {
  return getCategoryColor(props.event.category)
})

// Ícone da origem
const originIcon = computed(() => {
  return getOriginIcon(props.event.origin_level)
})

// Ícone da categoria
const categoryIcon = computed(() => {
  return CATEGORIES[props.event.category]?.icon || 'event'
})

// Horário formatado
const formattedTime = computed(() => {
  if (!props.event.start_at) return ''
  const date = new Date(props.event.start_at)
  return format(date, 'HH:mm', { locale: ptBR })
})

// Classes do chip
const chipClasses = computed(() => {
  return [
    `chip-variant-${props.variant}`,
    {
      'chip-all-day': props.event.all_day,
      'chip-canceled': props.event.status === 'CANCELED'
    }
  ]
})

// Estilos dinâmicos
const chipStyles = computed(() => {
  return {
    '--chip-category-color': categoryColor.value,
    '--chip-category-color-light': `${categoryColor.value}15`,
    '--chip-category-color-border': `${categoryColor.value}40`
  }
})

const handleClick = () => {
  emit('click', props.event)
}
</script>

<style scoped>
.calendar-chip {
  background: var(--chip-category-color-light);
  border-left: 3px solid var(--chip-category-color);
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  line-height: 1.3;
}

.calendar-chip:hover {
  background: var(--chip-category-color-border);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chip-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}

.chip-origin-icon {
  font-size: 14px;
  color: var(--chip-category-color);
  font-variation-settings: 'FILL' 1;
}

.chip-time {
  font-size: 11px;
  font-weight: 600;
  color: var(--chip-category-color);
}

.chip-content {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.chip-title {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.chip-category-icon {
  font-size: 16px;
  color: var(--chip-category-color);
  flex-shrink: 0;
}

/* Variante Compacta (para visão de mês) */
.chip-variant-compact {
  padding: 4px 6px;
  font-size: 11px;
}

.chip-variant-compact .chip-title {
  -webkit-line-clamp: 1;
}

.chip-variant-compact .chip-category-icon {
  font-size: 14px;
}

/* Variante Lista */
.chip-variant-list {
  padding: 8px 12px;
  border-radius: 6px;
}

.chip-variant-list .chip-title {
  font-size: 14px;
  -webkit-line-clamp: 1;
}

/* Estado Cancelado */
.chip-canceled {
  opacity: 0.5;
}

.chip-canceled .chip-title {
  text-decoration: line-through;
}

/* Evento dia inteiro */
.chip-all-day {
  border-left-width: 4px;
}
</style>
