<template>
  <div class="week-row">
    <DayCell
      v-for="(day, index) in days"
      :key="`${day.date}-${index}`"
      :day="day.date"
      :is-current-month="day.currentMonth"
      :is-selected="day.selected"
      :is-today="day.today"
      :has-event="day.hasEvent"
      :event-color="day.eventColor"
      :is-disabled="day.disabled"
      :clickable="clickable"
      @click="handleDayClick(day)"
      @mouseenter="$emit('day-hover', day)"
      @mouseleave="$emit('day-leave', day)"
    />
  </div>
</template>

<script setup>
import DayCell from '../atoms/DayCell.vue'

const props = defineProps({
  days: {
    type: Array,
    required: true,
    validator: (value) => value.length === 7
  },
  clickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['day-click', 'day-hover', 'day-leave'])

const handleDayClick = (day) => {
  if (props.clickable && day.currentMonth && !day.disabled) {
    emit('day-click', day)
  }
}
</script>

<style scoped>
.week-row {
  display: flex;
  align-items: center;
}
</style>
