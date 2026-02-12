<template>
  <span 
    class="material-symbols-outlined"
    :style="{ fontSize: `${size}px` }"
  >
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 20
  }
})
</script>

<style scoped>
.material-symbols-outlined {
  vertical-align: middle;
  user-select: none;
}
</style>
