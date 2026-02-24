<template>
  <span
    :class="badgeClasses"
    :style="customStyle"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Variante do badge
   * @values primary, secondary, success, info, warning, danger, light, dark
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary',
      'secondary',
      'success',
      'info',
      'warning',
      'danger',
      'light',
      'dark'
    ].includes(value)
  },

  /**
   * Formato pill (bordas totalmente arredondadas)
   */
  pill: {
    type: Boolean,
    default: false
  },

  /**
   * Cor customizada (sobrescreve variant)
   */
  color: {
    type: String,
    default: null
  },

  /**
   * Cor de fundo customizada (sobrescreve variant)
   */
  backgroundColor: {
    type: String,
    default: null
  }
})

const badgeClasses = computed(() => [
  'e-badge',
  `e-badge-${props.variant}`,
  {
    'e-badge-pill': props.pill
  }
])

const customStyle = computed(() => {
  const style = {}
  
  if (props.color) {
    style.color = props.color
  }
  
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  
  return style
})
</script>

<style scoped>
.e-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

/* Pill shape */
.e-badge-pill {
  border-radius: var(--radius-full);
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
}

/* Variantes de cor */
.e-badge-primary {
  background-color: var(--primary);
  color: var(--white);
}

.e-badge-secondary {
  background-color: var(--secondary);
  color: var(--white);
}

.e-badge-success {
  background-color: var(--success);
  color: var(--white);
}

.e-badge-info {
  background-color: var(--info);
  color: var(--white);
}

.e-badge-warning {
  background-color: var(--warning);
  color: var(--gray-900);
}

.e-badge-danger {
  background-color: var(--danger);
  color: var(--white);
}

.e-badge-light {
  background-color: var(--gray-200);
  color: var(--gray-900);
}

.e-badge-dark {
  background-color: var(--gray-900);
  color: var(--white);
}

/* Hover state (opcional) */
.e-badge:hover {
  filter: brightness(1.1);
}
</style>
