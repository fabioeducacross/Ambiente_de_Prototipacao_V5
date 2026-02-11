<template>
  <div
    class="day-cell"
    :class="{
      'other-month': !isCurrentMonth,
      'selected': isSelected,
      'today': isToday,
      'has-event': hasEvent,
      'disabled': isDisabled
    }"
    :aria-label="`Dia ${day}`"
    :aria-selected="isSelected"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="day-number">{{ day }}</span>
    <span v-if="hasEvent" class="event-indicator" :style="{ backgroundColor: eventColor }"></span>
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
  isSelected: {
    type: Boolean,
    default: false
  },
  isToday: {
    type: Boolean,
    default: false
  },
  hasEvent: {
    type: Boolean,
    default: false
  },
  eventColor: {
    type: String,
    default: '#28C76F'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click', 'mouseenter', 'mouseleave'])

const handleClick = () => {
  if (props.clickable && !props.isDisabled) {
    emit('click', props.day)
  }
}

const handleMouseEnter = () => {
  if (props.clickable && !props.isDisabled) {
    emit('mouseenter', props.day)
  }
}

const handleMouseLeave = () => {
  if (props.clickable) {
    emit('mouseleave', props.day)
  }
}
</script>

<style scoped>
.day-cell {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 0;
  text-align: center;
  color: var(--text-primary, rgba(47, 43, 61, 0.9));
  border-radius: var(--border-round, 500px);
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.day-number {
  line-height: 22px;
  margin: 0;
}

/* Indicador de evento (bolinha) */
.event-indicator {
  position: absolute;
  bottom: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

/* Estado: dias de outros meses */
.day-cell.other-month {
  color: var(--text-disabled, rgba(47, 43, 61, 0.4));
  cursor: default;
}

.day-cell.other-month .event-indicator {
  opacity: 0.5;
}

/* Estado: dia selecionado */
.day-cell.selected {
  background: var(--primary-opacity, rgba(115, 103, 240, 0.24));
  color: var(--primary-main, #7367f0);
}

/* Estado: hoje */
.day-cell.today {
  background: var(--primary-main, #7367f0);
  color: var(--bg-white, white);
  box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.3);
  font-weight: 500;
}

/* Estado: tem evento (fundo colorido suave) */
.day-cell.has-event:not(.today):not(.selected) {
  background: var(--success-opacity, rgba(40, 199, 111, 0.16));
}

/* Estado: hover (apenas se clicável e não disabled) */
.day-cell:not(.other-month):not(.disabled):hover {
  background: var(--action-hover, rgba(47, 43, 61, 0.06));
}

/* Preserve selected/today background on hover */
.day-cell.selected:hover,
.day-cell.today:hover {
  opacity: 0.9;
}

/* Estado: desabilitado */
.day-cell.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
