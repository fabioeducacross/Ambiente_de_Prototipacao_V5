<template>
  <div class="mini-calendar">
    <!-- Header com mês/ano e navegação usando CalendarHeader molecule -->
    <CalendarHeader
      :month-year="monthYear"
      aria-label-previous="Mês anterior"
      aria-label-next="Próximo mês"
      @previous="previousMonth"
      @next="nextMonth"
    />

    <!-- Dias da semana usando WeekdaysRow molecule -->
    <WeekdaysRow :weekdays="weekdays" />

    <!-- Grid de dias usando WeekRow molecules -->
    <div class="dates-container">
      <WeekRow
        v-for="(week, index) in weekRows"
        :key="index"
        :days="week"
        @day-click="selectDay"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarHeader from './molecules/CalendarHeader.vue'
import WeekdaysRow from './molecules/WeekdaysRow.vue'
import WeekRow from './molecules/WeekRow.vue'

// Data atual para navegação
const currentDate = ref(new Date(2026, 11, 1)) // Dezembro 2026 (mês 11)
const selectedDate = ref(6) // Dia 6 selecionado (roxo claro)

// Array de dias da semana fixo conforme Figma
const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

// Formatar mês e ano (formato brasileiro)
const monthYear = computed(() => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  return `${months[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
})

// Gerar dias do calendário
const weekRows = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Primeiro dia do mês (0 = Domingo)
  const firstDay = new Date(year, month, 1).getDay()
  
  // Último dia do mês
  const lastDate = new Date(year, month + 1, 0).getDate()
  
  // Último dia do mês anterior
  const prevLastDate = new Date(year, month, 0).getDate()
  
  const days = []
  
  // Dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: prevLastDate - i,
      currentMonth: false,
      selected: false,
      today: false,
      hasEvent: false,
      disabled: false
    })
  }
  
  // Dias do mês atual
  for (let i = 1; i <= lastDate; i++) {
    const isToday = i === 14 // Dia 14 é o "today" conforme Figma (roxo escuro)
    const isSelected = i === selectedDate.value // Dia 6 selecionado (roxo claro)
    
    days.push({
      date: i,
      currentMonth: true,
      selected: isSelected && !isToday, // Selecionado só se não for today
      today: isToday, // Today tem prioridade (roxo escuro + sombra)
      hasEvent: false, // Desativado por enquanto (verde era conflitante)
      disabled: false
    })
  }
  
  // Dias do próximo mês para completar semanas
  const remainingDays = (7 - (days.length % 7)) % 7
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      selected: false,
      today: false,
      hasEvent: false,
      disabled: false
    })
  }
  
  // Dividir em linhas de 7 dias (semanas)
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  
  return weeks
})

// Navegação de mês
function previousMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

function selectDay(day) {
  if (day.currentMonth) {
    selectedDate.value = day.date
  }
}
</script>

<style scoped>
.mini-calendar {
  background: var(--paper, white);
  border-radius: var(--border-radius-md, 6px);
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
  width: 100%;
}

/* Container de datas */
.dates-container {
  display: flex;
  flex-direction: column;
  padding: var(--padding-3, 12px) var(--padding-2, 8px) var(--padding-2, 8px);
  width: 100%;
}
</style>
