<template>
  <div class="mini-calendar">
    <!-- Header with month/year -->
    <div class="mini-calendar-header">
      <button class="nav-btn" @click="previousMonth">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div class="current-month">
        {{ monthYear }}
      </div>
      <button class="nav-btn" @click="nextMonth">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Weekday headers -->
    <div class="mini-calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <!-- Days grid -->
    <div class="mini-calendar-days">
      <button
        v-for="(dayInfo, index) in calendarDays"
        :key="index"
        class="day-cell"
        :class="{
          'other-month': !dayInfo.isCurrentMonth,
          'today': dayInfo.isToday,
          'selected': isSelectedDate(dayInfo.date)
        }"
        @click="selectDate(dayInfo.date)"
      >
        {{ dayInfo.date.getDate() }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCalendar } from '../composables/useCalendar'

const { getMonthDays, formatDate } = useCalendar()

const props = defineProps({
  selectedDate: {
    type: Date,
    default: () => new Date()
  }
})

const emit = defineEmits(['select-date'])

const currentDate = ref(new Date(props.selectedDate))

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const monthYear = computed(() => {
  return formatDate(currentDate.value, 'month-year')
})

const calendarDays = computed(() => {
  return getMonthDays(currentDate.value)
})

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const selectDate = (date) => {
  emit('select-date', date)
}

const isSelectedDate = (date) => {
  return date.toDateString() === props.selectedDate.toDateString()
}
</script>

<style scoped>
.mini-calendar {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.mini-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.current-month {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e1e2d;
  text-align: center;
  flex: 1;
}

.nav-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.nav-btn:hover {
  background: #f3f4f6;
  color: #1e1e2d;
}

.mini-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 0.5rem;
}

.weekday {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-align: center;
  padding: 0.25rem 0;
}

.mini-calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #1e1e2d;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.day-cell:hover {
  background: #f3f4f6;
}

.day-cell.other-month {
  color: #d1d5db;
}

.day-cell.today {
  background: #7367F0;
  color: white;
  font-weight: 600;
}

.day-cell.today:hover {
  background: #6558d3;
}

.day-cell.selected {
  background: #e0e0ff;
  color: #7367F0;
  font-weight: 600;
}

.day-cell.selected.today {
  background: #7367F0;
  color: white;
}
</style>
