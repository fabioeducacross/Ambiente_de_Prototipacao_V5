<template>
  <span
    class="legend-dot"
    :class="[size]"
    :style="{ backgroundColor: color }"
    :aria-label="`Cor: ${color}`"
  ></span>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<style scoped>
.legend-dot {
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-dot.small {
  width: 6px;
  height: 6px;
}

.legend-dot.medium {
  width: 8px;
  height: 8px;
}

.legend-dot.large {
  width: 12px;
  height: 12px;
}
</style>
