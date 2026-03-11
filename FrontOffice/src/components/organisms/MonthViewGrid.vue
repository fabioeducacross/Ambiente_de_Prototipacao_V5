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
        <!-- Camada harness para eventos spanning (multi-dia) -->
        <div class="spanning-events-harness">
          <SpanningEventItem
            v-for="spanEvent in week.spanningEvents"
            :key="`span-${spanEvent.id}-${spanEvent.slotIndex}`"
            :event="spanEvent"
            :is-continuation="spanEvent.isContinuation"
            :show-time="showEventTime && !spanEvent.isContinuation"
            :position-style="getSpanningEventPosition(spanEvent)"
            @click="handleEventClick(spanEvent)"
          />
        </div>
        
        <!-- Células de data (renderizam apenas eventos de 1 dia) -->
        <DateCellLarge
          v-for="day in week.days"
          :key="`${day.date}-${day.month}`"
          :day="day.date"
          :is-current-month="day.isCurrentMonth"
          :is-today="day.isToday"
          :disabled="day.disabled"
          :label="day.label"
          :events="day.singleDayEvents"
          :spanning-slot-count="week.maxSpanningSlot"
          :max-visible-events="maxVisibleEvents"
          @click="handleDayClick"
          @event-click="handleEventClick"
          @more-click="handleMoreClick"
        />
      </div>
    </div>
    
    <!-- Popover de eventos extras -->
    <Teleport to="body">
      <div 
        v-if="morePopover.visible" 
        class="more-events-overlay"
        @click="closeMorePopover"
      >
        <div 
          class="more-events-popover"
          :style="morePopoverStyle"
          @click.stop
        >
          <div class="popover-header">
            <span class="popover-date">{{ morePopover.dateLabel }}</span>
            <button class="popover-close" @click="closeMorePopover" aria-label="Fechar">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="popover-events">
            <EventItem
              v-for="event in morePopover.events"
              :key="event.id"
              :event="event"
              variant="compact"
              @click="handlePopoverEventClick(event)"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarMonthHeader from '../molecules/CalendarMonthHeader.vue'
import CalendarDaysHeader from '../molecules/CalendarDaysHeader.vue'
import DateCellLarge from '../atoms/DateCellLarge.vue'
import SpanningEventItem from '../molecules/SpanningEventItem.vue'
import EventItem from '../molecules/EventItem.vue'
import { useFeatureFlags } from '@/composables/useFeatureFlags'

const { showEventTime } = useFeatureFlags()

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
      { value: 'month', label: 'Mês' }
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

// Estado do popover "mais eventos"
const morePopover = ref({
  visible: false,
  day: null,
  events: [],
  dateLabel: '',
  position: { top: 0, left: 0 }
})

// Constantes para cálculo de posição
const DAY_WIDTH_PERCENT = 100 / 7 // ~14.2857%
const EVENT_HEIGHT = 24 // px
const EVENT_GAP = 4 // px
const EVENT_TOP_OFFSET = 30 // px (espaço para número do dia)

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

// Calcular posição do evento spanning (apenas posicionamento, não estilo base)
const getSpanningEventPosition = (event) => {
  const left = event.dayIndexInWeek * DAY_WIDTH_PERCENT
  const right = (7 - event.dayIndexInWeek - event.spanDays) * DAY_WIDTH_PERCENT
  const top = EVENT_TOP_OFFSET + (event.slotIndex * (EVENT_HEIGHT + EVENT_GAP))
  
  return {
    left: `${left}%`,
    right: `${right}%`,
    top: `${top}px`,
    height: `${EVENT_HEIGHT}px`
  }
}

// Algoritmo de alocação de slots verticais para evitar sobreposição
const allocateSlots = (spanningEvents) => {
  // Ordena eventos por início e duração (maiores primeiro)
  const sorted = [...spanningEvents].sort((a, b) => {
    if (a.dayIndexInWeek !== b.dayIndexInWeek) {
      return a.dayIndexInWeek - b.dayIndexInWeek
    }
    return b.spanDays - a.spanDays // Eventos mais longos primeiro
  })
  
  // Track slots ocupados por dia
  const slotsOccupied = Array(7).fill(null).map(() => new Set())
  
  sorted.forEach(event => {
    // Encontrar primeiro slot livre para todos os dias do evento
    let slot = 0
    let foundSlot = false
    
    while (!foundSlot) {
      foundSlot = true
      for (let d = event.dayIndexInWeek; d < event.dayIndexInWeek + event.spanDays && d < 7; d++) {
        if (slotsOccupied[d].has(slot)) {
          foundSlot = false
          slot++
          break
        }
      }
    }
    
    // Atribuir slot e marcar como ocupado
    event.slotIndex = slot
    for (let d = event.dayIndexInWeek; d < event.dayIndexInWeek + event.spanDays && d < 7; d++) {
      slotsOccupied[d].add(slot)
    }
  })
  
  // Retornar slot máximo usado para padding da célula
  const maxSlot = sorted.reduce((max, ev) => Math.max(max, ev.slotIndex), -1)
  return { events: sorted, maxSlot: maxSlot + 1 }
}

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
  
  // Função auxiliar para criar objeto de dia
  const createDayObject = (date, monthOffset, isCurrentMonth, dayIndexInWeek) => {
    const cellYear = monthOffset === 0 ? year : (monthOffset === -1 ? (month === 0 ? year - 1 : year) : (month === 11 ? year + 1 : year))
    const cellMonth = monthOffset === 0 ? month : (monthOffset === -1 ? (month === 0 ? 11 : month - 1) : (month === 11 ? 0 : month + 1))
    const isToday = date === todayDate && cellMonth === todayMonth && cellYear === todayYear
    
    const { singleDayEvents, spanningEvents } = getEventsForDate(cellYear, cellMonth, date, dayIndexInWeek)
    
    return {
      date,
      month: cellMonth,
      isCurrentMonth,
      isToday,
      disabled: !isCurrentMonth,
      label: `${date}`,
      singleDayEvents,
      spanningEvents,
      dayIndexInWeek
    }
  }
  
  // Preencher dias do mês anterior
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayIndexInWeek = firstDayOfWeek - 1 - i
    currentWeek.push(createDayObject(prevMonthLastDay - i, -1, false, dayIndexInWeek))
  }
  
  // Preencher dias do mês atual
  for (let date = 1; date <= lastDate; date++) {
    const dayIndexInWeek = currentWeek.length
    currentWeek.push(createDayObject(date, 0, true, dayIndexInWeek))
    
    // Completou uma semana
    if (currentWeek.length === 7) {
      // Coletar todos os eventos spanning da semana e alocar slots
      const weekSpanningEvents = currentWeek.flatMap(day => day.spanningEvents)
      const { events: allocatedEvents, maxSlot } = allocateSlots(weekSpanningEvents)
      
      weeks.push({
        id: weekId++,
        days: [...currentWeek],
        spanningEvents: allocatedEvents,
        maxSpanningSlot: maxSlot
      })
      currentWeek = []
    }
  }
  
  // Preencher dias do próximo mês
  if (currentWeek.length > 0) {
    let nextMonthDate = 1
    while (currentWeek.length < 7) {
      const dayIndexInWeek = currentWeek.length
      currentWeek.push(createDayObject(nextMonthDate++, 1, false, dayIndexInWeek))
    }
    
    // Coletar eventos spanning e alocar slots
    const weekSpanningEvents = currentWeek.flatMap(day => day.spanningEvents)
    const { events: allocatedEvents, maxSlot } = allocateSlots(weekSpanningEvents)
    
    weeks.push({
      id: weekId++,
      days: [...currentWeek],
      spanningEvents: allocatedEvents,
      maxSpanningSlot: maxSlot
    })
  }
  
  return weeks
})

// Methods

// Calcula eventos para uma célula específica, separando single-day e spanning
const getEventsForDate = (year, month, date, dayIndexInWeek) => {
  const cellDate = new Date(year, month, date)
  cellDate.setHours(0, 0, 0, 0)
  
  const singleDayEvents = []
  const spanningEvents = []
  
  props.events.forEach(event => {
    const eventStartStr = event.date || event.dataInicio
    if (!eventStartStr) {
      return
    }
    
    const eventStart = new Date(eventStartStr)
    eventStart.setHours(0, 0, 0, 0)
    
    // Data de término (ou mesmo dia se não existir)
    const eventEndStr = event.dataTermino || event.dataFim || eventStartStr
    const eventEnd = new Date(eventEndStr)
    eventEnd.setHours(0, 0, 0, 0)  // Normalizar para meia-noite (igual ao eventStart)
    
    // Criar cópia para comparação de range (com hora final do dia)
    const eventEndForRange = new Date(eventEndStr)
    eventEndForRange.setHours(23, 59, 59, 999)
    
    // Verificar se o evento está ativo nesta data
    const isActiveOnDate = cellDate >= eventStart && cellDate <= eventEndForRange
    if (!isActiveOnDate) return
    
    // Calcular duração em dias (ambas datas normalizadas para meia-noite)
    const totalDays = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1
    const isMultiDay = totalDays > 1
    
    if (isMultiDay) {
      // Evento multi-dia: só renderizar no dia de início OU primeiro dia da semana
      const isEventStart = cellDate.getTime() === eventStart.getTime()
      const isFirstDayOfWeek = dayIndexInWeek === 0
      const eventStartedBeforeWeek = eventStart < cellDate
      
      if (isEventStart || (isFirstDayOfWeek && eventStartedBeforeWeek)) {
        // Calcular quantos dias o evento se estende a partir desta célula
        const daysUntilEndOfWeek = 7 - dayIndexInWeek
        const daysUntilEventEnd = Math.round((eventEnd - cellDate) / (1000 * 60 * 60 * 24)) + 1
        const spanDays = Math.min(daysUntilEndOfWeek, daysUntilEventEnd)
        
        spanningEvents.push({
          ...event,
          spanDays,
          isContinuation: eventStart < cellDate,
          dayIndexInWeek,
          slotIndex: 0 // Será calculado pelo allocateSlots
        })
      }
    } else {
      // Evento de 1 dia: renderizar na célula
      singleDayEvents.push({
        ...event,
        spanDays: 1,
        isContinuation: false,
        dayIndexInWeek
      })
    }
  })
  
  return { singleDayEvents, spanningEvents }
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

const handleMoreClick = (data, nativeEvent) => {
  // Calcular posição do popover baseado no elemento clicado
  const cell = nativeEvent?.target?.closest('.date-cell-large')
  const rect = cell ? cell.getBoundingClientRect() : { top: 100, left: 100 }
  
  // Formatar data para o header do popover
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const year = currentDate.value.getFullYear()
  const monthIndex = currentDate.value.getMonth()
  
  // Calcular posição com boundary detection
  let left = rect.left
  let top = rect.top
  const popoverWidth = 260
  const popoverHeight = 280
  
  // Ajustar se sair da tela pela direita
  if (left + popoverWidth > window.innerWidth - 16) {
    left = window.innerWidth - popoverWidth - 16
  }
  // Ajustar se sair da tela por baixo
  if (top + popoverHeight > window.innerHeight - 16) {
    top = rect.top - popoverHeight + rect.height
  }
  
  morePopover.value = {
    visible: true,
    day: data.day,
    events: data.allEvents,
    dateLabel: `${data.day} de ${monthNames[monthIndex]} de ${year}`,
    position: { top, left }
  }
  
  emit('more-click', data)
}

// Estilo posicional do popover
const morePopoverStyle = computed(() => ({
  top: `${morePopover.value.position.top}px`,
  left: `${morePopover.value.position.left}px`
}))

const closeMorePopover = () => {
  morePopover.value.visible = false
}

const handlePopoverEventClick = (event) => {
  closeMorePopover()
  emit('event-click', event)
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
  flex: 1; /* Distribui espaço igualmente entre as semanas */
  position: relative; /* Para harness de eventos spanning */
}

/* Camada harness para eventos spanning (multi-dia) */
.spanning-events-harness {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Permite cliques nas células abaixo */
  z-index: 10;
}

/* Popover de mais eventos */
.more-events-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: transparent;
}

.more-events-popover {
  position: fixed;
  min-width: 220px;
  max-width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1001;
  animation: popoverFadeIn 0.15s ease-out;
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
  background: rgba(47, 43, 61, 0.02);
}

.popover-date {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
}

.popover-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(47, 43, 61, 0.5);
  transition: all 0.15s ease;
}

.popover-close:hover {
  background: rgba(47, 43, 61, 0.08);
  color: rgba(47, 43, 61, 0.9);
}

.popover-close .material-symbols-outlined {
  font-size: 18px;
}

.popover-events {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  max-height: 240px;
  overflow-y: auto;
}
</style>
