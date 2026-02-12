<template>
  <div class="weekdays-row">
    <WeekdayLabel
      v-for="day in weekdays"
      :key="day"
      :label="day"
      :size="size"
      :variant="variant"
    />
  </div>
</template>

<script setup>
import WeekdayLabel from '../atoms/WeekdayLabel.vue'

defineProps({
  weekdays: {
    type: Array,
    default: () => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Seb']
  },
  size: {
    type: String,
    default: 'default'
  },
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<style scoped>
.weekdays-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
