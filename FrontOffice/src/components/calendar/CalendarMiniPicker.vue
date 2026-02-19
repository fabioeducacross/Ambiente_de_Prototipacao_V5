<template>
  <div class="mini-picker-figma">
    <!-- Header com mês e navegação -->
    <div class="picker-header">
      <span class="month-label">{{ monthLabel }}</span>
      <div class="nav-buttons">
        <button class="nav-btn" @click="$emit('prev-month')" aria-label="Mês anterior">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="nav-btn" @click="$emit('next-month')" aria-label="Próximo mês">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
    
    <!-- Dias da semana -->
    <div class="weekdays-row">
      <div v-for="day in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Seb']" 
           :key="day" 
           class="weekday-label">
        {{ day }}
      </div>
    </div>
    
    <!-- Grid de dias -->
    <div class="days-grid">
      <button
        v-for="day in days"
        :key="day.date"
        class="day-button"
        :class="{
          'other-month': day.otherMonth,
          'selected': day.selected,
          'today': day.today
        }"
        @click="handleDayClick(day)"
      >
        {{ day.day }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  selectedDate: {
    type: Date,
    default: null
  },
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['prev-month', 'next-month', 'date-select'])

const monthLabel = computed(() => {
  return format(props.currentDate, 'MMMM yyyy', { locale: ptBR })
})

const days = computed(() => {
  const start = startOfWeek(startOfMonth(props.currentDate), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(props.currentDate), { weekStartsOn: 0 })
  const allDays = eachDayOfInterval({ start, end })
  
  return allDays.map(date => ({
    date: date.toISOString(),
    day: date.getDate(),
    otherMonth: !isSameMonth(date, props.currentDate),
    selected: props.selectedDate && isSameDay(date, props.selectedDate),
    today: isToday(date)
  }))
})

const handleDayClick = (day) => {
  emit('date-select', day.date)
}
</script>

<style scoped>
.mini-picker-figma {
  background: #ffffff;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Header */
.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  gap: 12px;
}

.month-label {
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  text-transform: capitalize;
}

.nav-buttons {
  display: flex;
  gap: 8px;
}

.nav-btn {
  width: 30px;
  height: 30px;
  background: rgba(47, 43, 61, 0.08);
  border: none;
  border-radius: 500px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: rgba(47, 43, 61, 0.12);
}

.nav-btn .material-symbols-outlined {
  font-size: 20px;
  color: rgba(47, 43, 61, 0.9);
}

/* Dias da semana */
.weekdays-row {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(47, 43, 61, 0.9);
  text-align: center;
}

.weekday-label {
  width: 36px;
  flex-shrink: 0;
}

/* Grid de dias */
.days-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 8px 8px 8px;
}

.day-button {
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  text-align: center;
  border-radius: 500px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.day-button:hover:not(.other-month) {
  background: rgba(47, 43, 61, 0.04);
}

/* Dia de outro mês */
.day-button.other-month {
  color: rgba(47, 43, 61, 0.4);
}

/* Dia selecionado */
.day-button.selected {
  background: rgba(115, 103, 240, 0.24);
  color: #7367F0;
}

.day-button.selected:hover {
  background: rgba(115, 103, 240, 0.3);
}

/* Dia de hoje */
.day-button.today {
  background: #7367F0;
  color: #ffffff;
  font-weight: 500;
}

.day-button.today:hover {
  background: #6558d3;
}
</style>
