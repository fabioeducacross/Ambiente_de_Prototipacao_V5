<template>
  <div class="mini-calendar">
    <!-- Header com mês/ano e navegação -->
    <div class="mini-calendar-header">
      <div class="current-month">{{ monthYear }}</div>
      <div class="nav-buttons">
        <button class="nav-btn" @click="previousMonth" aria-label="Mês anterior">
          <MaterialIcon name="chevron_left" size="20" />
        </button>
        <button class="nav-btn" @click="nextMonth" aria-label="Próximo mês">
          <MaterialIcon name="chevron_right" size="20" />
        </button>
      </div>
    </div>

    <!-- Weekday headers -->
    <div class="mini-calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <!-- Days grid -->
    <div class="mini-calendar-days">
      <template v-for="(week, weekIndex) in weekRows" :key="weekIndex">
        <div class="day-row">
          <div
            v-for="(dayInfo, dayIndex) in week"
            :key="`${weekIndex}-${dayIndex}`"
            class="day-cell"
            :class="{
              'other-month': !dayInfo.isCurrentMonth,
              'today': dayInfo.isToday,
              'selected': isSelectedDate(dayInfo.date),
              'has-event': dayInfo.hasEvent
            }"
            @click="selectDate(dayInfo.date)"
          >
            {{ dayInfo.date.getDate() }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCalendar } from '../composables/useCalendar'
import MaterialIcon from './MaterialIcon.vue'

const { getMonthDays, formatDate } = useCalendar()

const props = defineProps({
  selectedDate: {
    type: Date,
    default: () => new Date()
  }
})

const emit = defineEmits(['select-date'])

const currentDate = ref(new Date(props.selectedDate))

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Seb']

const monthYear = computed(() => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const month = months[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} ${year}`
})

const calendarDays = computed(() => {
  return getMonthDays(currentDate.value)
})

const weekRows = computed(() => {
  const days = calendarDays.value
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
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
  width: 100%;
  height: 100%;
  background: var(--Misc-paper, white);
  overflow: hidden;
  border-radius: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  display: inline-flex;
}

.mini-calendar-header {
  align-self: stretch;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  display: inline-flex;
}

.current-month {
  flex: 1 1 0;
  color: var(--Theme-text-primary, rgba(47, 43, 61, 0.90));
  font-size: 18px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 27px;
  word-wrap: break-word;
}

.nav-buttons {
  display: flex;
  gap: 0;
}

.nav-btn {
  background: var(--Theme-action-selected, rgba(47, 43, 61, 0.08));
  border-radius: 500px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
  border: none;
  padding: 5px;
  cursor: pointer;
  transition: background 0.2s ease;
  color: var(--Theme-text-secondary, rgba(47, 43, 61, 0.70));
}

.nav-btn:hover {
  background: rgba(47, 43, 61, 0.12);
}

.mini-calendar-weekdays {
  align-self: stretch;
  overflow: hidden;
  justify-content: center;
  align-items: flex-start;
  display: inline-flex;
}

.weekday {
  width: 36px;
  text-align: center;
  color: var(--Theme-text-secondary, rgba(47, 43, 61, 0.70));
  font-size: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.mini-calendar-days {
  align-self: stretch;
  padding-top: 12px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.day-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.day-cell {
  width: 36px;
  height: 36px;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: var(--Theme-text-primary, rgba(47, 43, 61, 0.90));
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  line-height: 22px;
  word-wrap: break-word;
  cursor: pointer;
  border-radius: 500px;
  transition: background 0.2s ease;
}

.day-cell:hover {
  background: var(--Theme-action-hover, rgba(47, 43, 61, 0.06));
}

.day-cell.other-month {
  color: var(--Theme-text-disabled, rgba(47, 43, 61, 0.40));
}

.day-cell.selected {
  background: var(--Color-Palette-primary-opacity-main, rgba(115, 103, 240, 0.24));
  color: var(--Color-Primary-primary-500, #7367F0);
}

.day-cell.today {
  background: var(--Color-Palette-primary-main, #7367F0);
  box-shadow: 0px 2px 6px rgba(115, 103, 240, 0.30);
  color: var(--Misc-bg-white, white);
}

.day-cell.today:hover {
  background: #6558d3;
}

.day-cell.has-event {
  background: var(--Color-Palette-success-opacity-light, rgba(40, 199, 111, 0.16));
  color: var(--Color-Palette-success-main, #28C76F);
}

.day-cell.has-event.selected {
  background: var(--Color-Palette-primary-opacity-main, rgba(115, 103, 240, 0.24));
  color: var(--Color-Primary-primary-500, #7367F0);
}
</style>
