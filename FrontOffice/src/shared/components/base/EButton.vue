<template>
  <BButton
    :type="type"
    :variant="bsVariant"
    :size="bsSize"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <BSpinner v-if="loading" small class="me-2" />
    <span v-if="icon && !loading" class="material-symbols-outlined e-button-icon">{{ icon }}</span>
    <slot />
  </BButton>
</template>

<script setup>
/**
 * EButton - Componente de Botão
 * Baseado no ButtonWaitAction.vue da Educacross
 * Usa BButton do BootstrapVue portado para Vue 3
 */
import { computed } from 'vue'
import { BButton, BSpinner } from 'bootstrap-vue-next'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'outline-primary', 'outline-secondary', 'outline-danger', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  block: {
    type: Boolean,
    default: false
  }
})

// Mapeamento de variants para Bootstrap
const bsVariant = computed(() => {
  const mapping = {
    'primary': 'primary',
    'secondary': 'secondary',
    'success': 'success',
    'danger': 'danger',
    'warning': 'warning',
    'info': 'info',
    'outline': 'outline-primary',
    'outline-primary': 'outline-primary',
    'outline-secondary': 'outline-secondary',
    'outline-danger': 'outline-danger',
    'link': 'link'
  }
  return mapping[props.variant] || 'primary'
})

// Mapeamento de sizes para Bootstrap
const bsSize = computed(() => {
  const mapping = {
    'small': 'sm',
    'medium': 'md',
    'large': 'lg'
  }
  return mapping[props.size] || 'md'
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'e-button',
    {
      'e-button--block': props.block,
      'e-button--loading': props.loading
    }
  ]
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Custom styling layered on top of Bootstrap */
.e-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: var(--font-family-base);
  transition: var(--transition-base);
}

.e-button-icon {
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
}

.e-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.e-button:active:not(:disabled) {
  transform: translateY(0);
}

.e-button--block {
  width: 100%;
  display: flex;
}

.e-button--loading {
  pointer-events: none;
}

/* Override Bootstrap colors with Design System */
:deep(.btn-primary) {
  --bs-btn-bg: var(--primary);
  --bs-btn-border-color: var(--primary);
  --bs-btn-hover-bg: var(--primary-dark);
  --bs-btn-hover-border-color: var(--primary-dark);
  --bs-btn-active-bg: var(--primary-dark);
  --bs-btn-active-border-color: var(--primary-dark);
}

:deep(.btn-secondary) {
  --bs-btn-bg: var(--secondary);
  --bs-btn-border-color: var(--secondary);
  --bs-btn-hover-bg: var(--secondary-dark);
  --bs-btn-hover-border-color: var(--secondary-dark);
}

:deep(.btn-success) {
  --bs-btn-bg: var(--success);
  --bs-btn-border-color: var(--success);
  --bs-btn-hover-bg: var(--success-dark);
  --bs-btn-hover-border-color: var(--success-dark);
}

:deep(.btn-danger) {
  --bs-btn-bg: var(--danger);
  --bs-btn-border-color: var(--danger);
  --bs-btn-hover-bg: var(--danger-dark);
  --bs-btn-hover-border-color: var(--danger-dark);
}

:deep(.btn-warning) {
  --bs-btn-bg: var(--warning);
  --bs-btn-border-color: var(--warning);
  --bs-btn-hover-bg: var(--warning-dark);
  --bs-btn-hover-border-color: var(--warning-dark);
}

:deep(.btn-info) {
  --bs-btn-bg: var(--info);
  --bs-btn-border-color: var(--info);
  --bs-btn-hover-bg: var(--info-dark);
  --bs-btn-hover-border-color: var(--info-dark);
}

:deep(.btn-outline-primary) {
  --bs-btn-color: var(--primary);
  --bs-btn-border-color: var(--primary);
  --bs-btn-hover-bg: var(--primary);
  --bs-btn-hover-border-color: var(--primary);
}

:deep(.btn-outline-secondary) {
  --bs-btn-color: var(--gray-700) !important;
  --bs-btn-bg: var(--gray-100) !important;
  --bs-btn-border-color: var(--gray-300) !important;
  --bs-btn-hover-bg: var(--gray-200) !important;
  --bs-btn-hover-border-color: var(--gray-400) !important;
  --bs-btn-hover-color: var(--gray-800) !important;
  background-color: var(--gray-100) !important;
  color: var(--gray-700) !important;
  border-color: var(--gray-300) !important;
}

:deep(.btn-outline-secondary:hover) {
  background-color: var(--gray-200) !important;
  color: var(--gray-800) !important;
  border-color: var(--gray-400) !important;
}

:deep(.btn-outline-danger) {
  --bs-btn-color: var(--danger);
  --bs-btn-border-color: var(--danger);
  --bs-btn-hover-bg: var(--danger);
  --bs-btn-hover-border-color: var(--danger);
}
</style>
