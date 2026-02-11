<template>
  <button
    class="navigation-button"
    :class="[variant, size]"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <span class="material-symbols-outlined">{{ icon }}</span>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
    validator: (value) => ['chevron_left', 'chevron_right', 'first_page', 'last_page'].includes(value)
  },
  ariaLabel: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

defineEmits(['click'])
</script>

<style scoped>
.navigation-button {
  background: var(--action-selected, rgba(47, 43, 61, 0.08));
  border: none;
  border-radius: var(--border-round, 500px);
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;
}

.navigation-button:hover {
  background: var(--action-hover, rgba(47, 43, 61, 0.12));
}

.navigation-button:active {
  transform: scale(0.95);
}

.navigation-button .material-symbols-outlined {
  font-size: 20px;
  color: var(--text-primary, rgba(47, 43, 61, 0.9));
}

/* Sizes */
.navigation-button.small {
  padding: 3px;
}

.navigation-button.small .material-symbols-outlined {
  font-size: 16px;
}

.navigation-button.large {
  padding: 8px;
}

.navigation-button.large .material-symbols-outlined {
  font-size: 24px;
}

/* Variants */
.navigation-button.primary {
  background: var(--primary-main, #7367f0);
}

.navigation-button.primary:hover {
  background: var(--primary-dark, #5e50ee);
}

.navigation-button.primary .material-symbols-outlined {
  color: white;
}

.navigation-button.ghost {
  background: transparent;
}

.navigation-button.ghost:hover {
  background: var(--action-hover, rgba(47, 43, 61, 0.06));
}
</style>
