<template>
  <p class="weekday-label" :class="[size, variant]">
    {{ label }}
  </p>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
    validator: (value) => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bold', 'muted'].includes(value)
  }
})
</script>

<style scoped>
.weekday-label {
  width: 36px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-primary, rgba(47, 43, 61, 0.9));
  text-align: center;
  margin: 0;
}

/* Sizes */
.weekday-label.small {
  font-size: 11px;
  line-height: 16px;
  width: 32px;
}

.weekday-label.large {
  font-size: 15px;
  line-height: 22px;
  width: 40px;
}

/* Variants */
.weekday-label.bold {
  font-weight: 600;
}

.weekday-label.muted {
  color: var(--text-secondary, rgba(47, 43, 61, 0.7));
}
</style>
