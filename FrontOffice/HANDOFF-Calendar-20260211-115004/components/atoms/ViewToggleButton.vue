<template>
  <button
    class="view-toggle-button"
    :class="[
      { 'view-toggle-active': isActive },
      sizeClass
    ]"
    :aria-label="ariaLabel"
    :aria-pressed="isActive"
    @click="handleClick"
  >
    <span class="button-text">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
    validator: (value) => {
      const validLabels = ['Mês', 'Semana', 'Dia', 'Lista']
      return validLabels.includes(value)
    }
  },
  isActive: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['click'])

const sizeClass = computed(() => {
  const sizeClasses = {
    small: 'view-toggle-sm',
    medium: 'view-toggle-md',
    large: 'view-toggle-lg'
  }
  return sizeClasses[props.size]
})

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.view-toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  background-color: rgba(115, 103, 240, 0.08);
  color: rgba(47, 43, 61, 0.9);
  border-radius: 6px;
}

/* Tamanhos */
.view-toggle-sm {
  padding: 6px 16px;
  font-size: 13px;
  line-height: 20px;
  min-height: 32px;
}

.view-toggle-md {
  padding: 8px 20px;
  font-size: 15px;
  line-height: 22px;
  min-height: 38px;
}

.view-toggle-lg {
  padding: 10px 24px;
  font-size: 15px;
  line-height: 22px;
  min-height: 42px;
}

/* Estados */
.view-toggle-button:hover {
  background-color: rgba(115, 103, 240, 0.12);
}

.view-toggle-button:active {
  transform: scale(0.98);
}

.view-toggle-button.view-toggle-active {
  background-color: #7367f0;
  color: white;
  box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.3);
}

.view-toggle-button.view-toggle-active:hover {
  background-color: #6558e3;
}

/* Focus para acessibilidade */
.view-toggle-button:focus-visible {
  outline: 2px solid #7367f0;
  outline-offset: 2px;
}

.button-text {
  text-transform: capitalize;
}
</style>
