<template>
  <div class="month-view-grid">
    <!-- Header do calendário mensal -->
    <CalendarMonthHeader
      :month-year="formattedMonthYear"
      :current-view="currentView"
      :show-view-toggle="showViewToggle"
      :available-views="availableViews"
      @previous="handlePreviousMonth"
      @next="handleNextMonth"
      @today="handleToday"
      @view-change="handleViewChange"
    />
    
    <!-- Header dos dias da semana -->
    <CalendarDaysHeader
      :days-labels="daysLabels"
      :show-full-names="showFullDayNames"
      size="large"
    />
    
    <!-- Grid de datas -->
    <div class="dates-grid">
      <div
        v-for="week in weeksGrid"
        :key="week.id"
        class="week-row"
      >
        <DateCellLarge
          v-for="day in week.days"
          :key="`${day.date}-${day.month}`"
          :day="day.date"
          :is-current-month="day.isCurrentMonth"
          :is-today="day.isToday"
          :disabled="day.disabled"
          :label="day.label"
          :events="day.events"
          :max-visible-events="maxVisibleEvents"
          @click="handleDayClick"
          @event-click="handleEventClick"
          @more-click="handleMoreClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarMonthHeader from '../molecules/CalendarMonthHeader.vue'
import CalendarDaysHeader from '../molecules/CalendarDaysHeader.vue'
import DateCellLarge from '../atoms/DateCellLarge.vue'

const props = defineProps({
  currentView: {
    type: String,
    default: 'month'
  },
  showViewToggle: {
    type: Boolean,
    default: true
  },
  availableViews: {
    type: Array,
    default: () => [
      { value: 'month', label: 'Mês' },
      { value: 'week', label: 'Semana' },
      { value: 'day', label: 'Dia' }
    ]
  },
  daysLabels: {
    type: Array,
    default: () => [
      { short: 'Dom.', full: 'Domingo' },
      { short: 'Seg.', full: 'Segunda' },
      { short: 'Ter.', full: 'Terça' },
      { short: 'Qua.', full: 'Quarta' },
      { short: 'Qui.', full: 'Quinta' },
      { short: 'Sex.', full: 'Sexta' },
      { short: 'Sáb.', full: 'Sábado' }
    ]
  },
  showFullDayNames: {
    type: Boolean,
    default: false
  },
  maxVisibleEvents: {
    type: Number,
    default: 3
  },
  initialDate: {
    type: Date,
    default: () => new Date()
  },
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['day-click', 'event-click', 'month-change', 'view-change'])

// Estado
const currentDate = ref(new Date(props.initialDate))

// Computed
const formattedMonthYear = computed(() => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const month = monthNames[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} de ${year}`
})

const weeksGrid = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1)
  const firstDayOfWeek = firstDay.getDay()
  
  // Último dia do mês
  const lastDay = new Date(year, month + 1, 0)
  const lastDate = lastDay.getDate()
  
  // Data de hoje para comparação
  const today = new Date()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()
  
  const weeks = []
  let weekId = 0
  let currentWeek = []
  
  // Preencher dias do mês anterior
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    currentWeek.push({
      date: prevMonthLastDay - i,
      month: month - 1,
      isCurrentMonth: false,
      isToday: false,
      disabled: true,
      label: `${prevMonthLastDay - i} de ${month === 0 ? 'Dezembro' : 'mês anterior'}`,
      events: []
    })
  }
  
  // Preencher dias do mês atual
  for (let date = 1; date <= lastDate; date++) {
    const isToday = date === todayDate && month === todayMonth && year === todayYear
    
    currentWeek.push({
      date,
      month,
      isCurrentMonth: true,
      isToday,
      disabled: false,
      label: `${date} de ${formattedMonthYear.value}`,
      events: getEventsForDate(year, month, date)
    })
    
    // Completou uma semana
    if (currentWeek.length === 7) {
      weeks.push({
        id: weekId++,
        days: [...currentWeek]
      })
      currentWeek = []
    }
  }
  
  // Preencher dias do próximo mês
  if (currentWeek.length > 0) {
    let nextMonthDate = 1
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: nextMonthDate++,
        month: month + 1,
        isCurrentMonth: false,
        isToday: false,
        disabled: true,
        label: `${nextMonthDate - 1} de ${month === 11 ? 'Janeiro' : 'próximo mês'}`,
        events: []
      })
    }
    weeks.push({
      id: weekId++,
      days: [...currentWeek]
    })
  }
  
  return weeks
})

// Methods
const getEventsForDate = (year, month, date) => {
  return props.events.filter(event => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month &&
      eventDate.getDate() === date
    )
  })
}

const handlePreviousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
  emit('month-change', currentDate.value)
}

const handleNextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
  emit('month-change', currentDate.value)
}

const handleToday = () => {
  currentDate.value = new Date()
  emit('month-change', currentDate.value)
}

const handleDayClick = (day) => {
  emit('day-click', day)
}

const handleEventClick = (event) => {
  emit('event-click', event)
}

const handleMoreClick = (data) => {
  // Pode abrir um popover ou expandir célula com todos os eventos
  emit('more-click', data)
}

const handleViewChange = (newView) => {
  emit('view-change', newView)
}
</script>

<style scoped>
.month-view-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}

.dates-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 125px;
}

/* Responsive */
@media (max-width: 1024px) {
  .week-row {
    min-height: 100px;
  }
}

@media (max-width: 768px) {
  .week-row {
    min-height: 80px;
  }
}
</style>
