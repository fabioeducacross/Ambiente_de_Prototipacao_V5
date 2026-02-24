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
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'].includes(value)
  },
  pill: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  },
  backgroundColor: {
    type: String,
    default: null
  }
})

const badgeClasses = computed(() => [
  'e-badge',
  `e-badge-${props.variant}`,
  { 'e-badge-pill': props.pill }
])

const customStyle = computed(() => {
  const style = {}
  if (props.color) style.color = props.color
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
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

.e-badge-pill {
  border-radius: var(--radius-full);
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
}

.e-badge-primary { background-color: var(--primary); color: #fff; }
.e-badge-secondary { background-color: var(--secondary); color: #fff; }
.e-badge-success { background-color: var(--success); color: #fff; }
.e-badge-info { background-color: var(--info); color: #fff; }
.e-badge-warning { background-color: var(--warning); color: var(--gray-900, #1a1a1a); }
.e-badge-danger { background-color: var(--danger); color: #fff; }
.e-badge-light { background-color: var(--gray-200, #e9ecef); color: var(--gray-900, #1a1a1a); }
.e-badge-dark { background-color: var(--gray-900, #1a1a1a); color: #fff; }
</style>
