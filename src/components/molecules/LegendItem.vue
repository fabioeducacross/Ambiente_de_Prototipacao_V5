<template>
  <div class="legend-item" :class="{ interactive: interactive }" @click="handleClick">
    <LegendDot :color="color" :size="dotSize" />
    <span class="legend-label" :class="[labelSize]">{{ label }}</span>
  </div>
</template>

<script setup>
import LegendDot from '../atoms/LegendDot.vue'

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  dotSize: {
    type: String,
    default: 'medium'
  },
  labelSize: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.interactive) {
    emit('click')
  }
}
</script>

<style scoped>
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-item.interactive {
  cursor: pointer;
  transition: opacity 0.2s;
}

.legend-item.interactive:hover {
  opacity: 0.8;
}

.legend-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-primary, rgba(47, 43, 61, 0.9));
}

.legend-label.small {
  font-size: 11px;
  line-height: 16px;
}

.legend-label.large {
  font-size: 15px;
  line-height: 22px;
}
</style>
