<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :title="title"
    @click="handleClick"
  >
    <span v-if="loading" class="e-button-spinner"></span>
    <i v-if="icon && !loading" :class="`bi bi-${icon}`"></i>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  },
  type: {
    type: String,
    default: 'button'
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
  },
  title: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => [
  'e-button',
  `e-button--${props.variant}`,
  `e-button--${props.size}`,
  {
    'e-button--block': props.block,
    'e-button--loading': props.loading
  }
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.e-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: all var(--transition-base, 0.25s);
  white-space: nowrap;
  text-decoration: none;
}

.e-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.e-button:active:not(:disabled) {
  transform: translateY(0);
}

.e-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.e-button--block {
  width: 100%;
}

/* Sizes */
.e-button--small {
  padding: 5px 12px;
  font-size: 12px;
}

.e-button--medium {
  padding: 8px 18px;
  font-size: 14px;
}

.e-button--large {
  padding: 12px 24px;
  font-size: 16px;
}

/* Variants */
.e-button--primary {
  background-color: var(--primary, #7367F0);
  border-color: var(--primary, #7367F0);
  color: #fff;
}

.e-button--primary:hover:not(:disabled) {
  background-color: #5e50ee;
  border-color: #5e50ee;
}

.e-button--secondary {
  background-color: var(--secondary, #82868B);
  border-color: var(--secondary, #82868B);
  color: #fff;
}

.e-button--success {
  background-color: var(--success, #28C76F);
  border-color: var(--success, #28C76F);
  color: #fff;
}

.e-button--danger {
  background-color: var(--danger, #EA5455);
  border-color: var(--danger, #EA5455);
  color: #fff;
}

.e-button--warning {
  background-color: var(--warning, #FF9F43);
  border-color: var(--warning, #FF9F43);
  color: #fff;
}

.e-button--info {
  background-color: var(--info, #00CFE8);
  border-color: var(--info, #00CFE8);
  color: #fff;
}

.e-button--outline-primary {
  background-color: transparent;
  border-color: var(--primary, #7367F0);
  color: var(--primary, #7367F0);
}

.e-button--outline-primary:hover:not(:disabled) {
  background-color: var(--primary, #7367F0);
  color: #fff;
}

.e-button--outline-secondary {
  background-color: transparent;
  border-color: var(--secondary, #82868B);
  color: var(--secondary, #82868B);
}

.e-button--outline-secondary:hover:not(:disabled) {
  background-color: var(--secondary, #82868B);
  color: #fff;
}

.e-button--outline-danger {
  background-color: transparent;
  border-color: var(--danger, #EA5455);
  color: var(--danger, #EA5455);
}

.e-button--outline-danger:hover:not(:disabled) {
  background-color: var(--danger, #EA5455);
  color: #fff;
}

.e-button--outline {
  background-color: transparent;
  border-color: var(--primary, #7367F0);
  color: var(--primary, #7367F0);
}

.e-button--outline:hover:not(:disabled) {
  background-color: var(--primary, #7367F0);
  color: #fff;
}

.e-button--link {
  background-color: transparent;
  border-color: transparent;
  color: var(--primary, #7367F0);
  padding-left: 0;
  padding-right: 0;
}

.e-button--link:hover:not(:disabled) {
  text-decoration: underline;
  transform: none;
  box-shadow: none;
}

/* Spinner */
.e-button-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
</style>
