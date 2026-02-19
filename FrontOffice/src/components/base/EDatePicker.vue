<template>
  <div class="e-datepicker-wrapper">
    <label v-if="label" :for="inputId" class="e-datepicker-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <div class="e-datepicker-input-wrapper">
      <flat-pickr
        :id="inputId"
        v-model="internalValue"
        :config="flatpickrConfig"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @on-change="handleChange"
        @on-close="handleClose"
        @on-open="handleOpen"
      />
      <div class="e-datepicker-icons">
        <span
          v-if="clearable && internalValue"
          class="material-symbols-outlined clear-icon"
          @click="clear"
        >
          close
        </span>
        <span class="material-symbols-outlined calendar-icon">
          calendar_month
        </span>
      </div>
    </div>
    <span v-if="errorMessage" class="e-datepicker-error">
      {{ errorMessage }}
    </span>
    <span v-else-if="hint" class="e-datepicker-hint">
      {{ hint }}
    </span>
  </div>
</template>

<script setup>
/**
 * EDatePicker - Componente de Date Picker
 * Baseado no uso de Flatpickr no educacross-frontoffice
 * Portado para Vue 3 Composition API
 */
import { ref, computed, watch } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

const props = defineProps({
  modelValue: {
    type: [String, Date, Array],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Selecione uma data'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  invalid: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  // Flatpickr options
  enableTime: {
    type: Boolean,
    default: false
  },
  noCalendar: {
    type: Boolean,
    default: false
  },
  dateFormat: {
    type: String,
    default: 'd/m/Y'
  },
  minDate: {
    type: [String, Date],
    default: null
  },
  maxDate: {
    type: [String, Date],
    default: null
  },
  mode: {
    type: String,
    default: 'single',
    validator: (v) => ['single', 'multiple', 'range'].includes(v)
  },
  inline: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'open', 'close', 'clear'])

// Internal state
const internalValue = ref(props.modelValue)

// Computed
const inputId = computed(() => props.id || `datepicker-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => [
  'e-datepicker-input',
  {
    'is-invalid': props.invalid || props.errorMessage,
    'is-disabled': props.disabled
  }
])

const flatpickrConfig = computed(() => ({
  locale: Portuguese,
  dateFormat: props.dateFormat,
  enableTime: props.enableTime,
  noCalendar: props.noCalendar,
  minDate: props.minDate,
  maxDate: props.maxDate,
  mode: props.mode,
  inline: props.inline,
  time_24hr: true,
  allowInput: true,
  altInput: true,
  altFormat: props.enableTime ? 'd/m/Y H:i' : 'd/m/Y',
  disableMobile: true,
  onReady: (selectedDates, dateStr, instance) => {
    // Ícones de navegação: < e > como no FrontOffice original
    const prevButton = instance.calendarContainer.querySelector('.flatpickr-prev-month')
    const nextButton = instance.calendarContainer.querySelector('.flatpickr-next-month')
    
    if (prevButton) {
      // Sinal de menor <
      prevButton.innerHTML = '<span style="color: white; font-size: 20px; font-weight: bold; line-height: 1;">&lt;</span>'
      prevButton.style.display = 'flex'
      prevButton.style.alignItems = 'center'
      prevButton.style.justifyContent = 'center'
      prevButton.style.cursor = 'pointer'
      
      prevButton.addEventListener('mouseenter', () => {
        const span = prevButton.querySelector('span')
        if (span) span.style.color = '#EEEEEE'
      })
      prevButton.addEventListener('mouseleave', () => {
        const span = prevButton.querySelector('span')
        if (span) span.style.color = 'white'
      })
    }
    
    if (nextButton) {
      // Sinal de maior >
      nextButton.innerHTML = '<span style="color: white; font-size: 20px; font-weight: bold; line-height: 1;">&gt;</span>'
      nextButton.style.display = 'flex'
      nextButton.style.alignItems = 'center'
      nextButton.style.justifyContent = 'center'
      nextButton.style.cursor = 'pointer'
      
      nextButton.addEventListener('mouseenter', () => {
        const span = nextButton.querySelector('span')
        if (span) span.style.color = '#EEEEEE'
      })
      nextButton.addEventListener('mouseleave', () => {
        const span = nextButton.querySelector('span')
        if (span) span.style.color = 'white'
      })
    }
  },
  onOpen: (selectedDates, dateStr, instance) => {
    // Garante que os ícones persistam ao abrir
    const prevButton = instance.calendarContainer.querySelector('.flatpickr-prev-month')
    const nextButton = instance.calendarContainer.querySelector('.flatpickr-next-month')
    
    if (prevButton && !prevButton.querySelector('span')) {
      prevButton.innerHTML = '<span style="color: white; font-size: 20px; font-weight: bold; line-height: 1;">&lt;</span>'
      prevButton.style.display = 'flex'
      prevButton.style.alignItems = 'center'
      prevButton.style.justifyContent = 'center'
    }
    
    if (nextButton && !nextButton.querySelector('span')) {
      nextButton.innerHTML = '<span style="color: white; font-size: 20px; font-weight: bold; line-height: 1;">&gt;</span>'
      nextButton.style.display = 'flex'
      nextButton.style.alignItems = 'center'
      nextButton.style.justifyContent = 'center'
    }
  }
}))

// Methods
const handleChange = (selectedDates, dateStr) => {
  emit('update:modelValue', dateStr)
  emit('change', { selectedDates, dateStr })
}

const handleOpen = () => {
  emit('open')
}

const handleClose = () => {
  emit('close')
}

const clear = () => {
  internalValue.value = null
  emit('update:modelValue', null)
  emit('clear')
}

// Watch external value changes
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

// Expose
defineExpose({
  clear
})
</script>

<style scoped>
.e-datepicker-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.e-datepicker-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-900);
  line-height: 1.4;
}

.required-indicator {
  color: var(--danger);
  margin-left: 2px;
}

.e-datepicker-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.e-datepicker-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  padding-right: calc(var(--spacing-xl) * 2);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.e-datepicker-input:hover:not(:disabled) {
  border-color: var(--gray-400);
}

.e-datepicker-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.e-datepicker-input.is-invalid {
  border-color: var(--danger);
}

.e-datepicker-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(234, 84, 85, 0.1);
}

.e-datepicker-input.is-disabled,
.e-datepicker-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--gray-50);
}

.e-datepicker-input::placeholder {
  color: var(--gray-500);
}

.e-datepicker-icons {
  position: absolute;
  right: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  pointer-events: none;
}

.calendar-icon {
  font-size: 20px;
  color: var(--gray-500);
}

.clear-icon {
  font-size: 16px;
  color: var(--gray-500);
  cursor: pointer;
  pointer-events: auto;
}

.clear-icon:hover {
  color: var(--danger);
}

.e-datepicker-error {
  font-size: var(--font-size-xs);
  color: var(--danger);
}

.e-datepicker-hint {
  font-size: var(--font-size-xs);
  color: var(--gray-600);
}
</style>

<style>
/* ========================================
   FLATPICKR - Design System Vuexy/Educacross
   Baseado no Figma: Educa Guidelines 1.0
   node-id=2273-4086
   ======================================== */

/* ===== CONTAINER GERAL ===== */
.flatpickr-calendar {
  background: white !important;
  border-radius: 6px !important;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  width: 266px !important;
  font-family: 'Montserrat', sans-serif !important;
  overflow: hidden !important;
}

/* ===== HEADER (MESES) ===== */
/* Fundo ROXO (primary) */
.flatpickr-months {
  background: #7367F0 !important;
  border-radius: 6px 6px 0 0 !important;
  display: flex !important;
  align-items: center !important;
  padding: 8px 12px !important;
  height: 44px !important;
}

/* Container central do mês */
.flatpickr-months .flatpickr-month {
  background: transparent !important;
  color: white !important;
  fill: white !important;
  height: 100% !important;
  overflow: visible !important;
  flex: 1 !important;
}

/* Setas de navegação < > - BRANCAS/CLARAS */
.flatpickr-months .flatpickr-prev-month,
.flatpickr-months .flatpickr-next-month {
  position: static !important;
  height: 24px !important;
  width: 24px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 4px !important;
  fill: white !important;
  color: white !important;
  opacity: 0.8 !important;
  visibility: visible !important;
}

.flatpickr-months .flatpickr-prev-month:hover,
.flatpickr-months .flatpickr-next-month:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  opacity: 1 !important;
}

.flatpickr-months .flatpickr-prev-month svg,
.flatpickr-months .flatpickr-next-month svg {
  fill: white !important;
  width: 14px !important;
  height: 14px !important;
}

.flatpickr-months .flatpickr-prev-month svg path,
.flatpickr-months .flatpickr-next-month svg path {
  fill: white !important;
}

/* Container do mês e ano - centralizado */
.flatpickr-current-month {
  position: relative !important;
  width: auto !important;
  left: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 0 !important;
  height: 100% !important;
  font-size: 14px !important;
}

/* Select de mês - "February" em branco/claro */
.flatpickr-current-month .flatpickr-monthDropdown-months {
  background: transparent !important;
  color: white !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 23px !important;
  border: none !important;
  padding: 0 4px !important;
  cursor: pointer !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}

.flatpickr-current-month .flatpickr-monthDropdown-months:hover {
  opacity: 0.8 !important;
}

.flatpickr-current-month .flatpickr-monthDropdown-months option {
  background: #5E5873 !important;
  color: white !important;
}

/* Nome do mês (span alternativo) */
.flatpickr-current-month span.cur-month {
  color: white !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}

/* Wrapper do input de ano */
.flatpickr-current-month .numInputWrapper {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  width: auto !important;
  margin-left: 8px !important;
}

/* Input de ano - "2020" mais claro que o mês */
.flatpickr-current-month input.cur-year {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.7) !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 21px !important;
  border: none !important;
  padding: 0 !important;
  width: 4ch !important;
  text-align: center !important;
  cursor: default !important;
}

.flatpickr-current-month input.cur-year:hover,
.flatpickr-current-month input.cur-year:focus {
  color: white !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

/* Esconde spinner nativo e setas do ano */
.flatpickr-current-month input.cur-year::-webkit-inner-spin-button,
.flatpickr-current-month input.cur-year::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  display: none !important;
}

/* Esconde setas do numInputWrapper */
.flatpickr-current-month .numInputWrapper span {
  display: none !important;
}

/* ===== DIAS DA SEMANA ===== */
/* Fundo branco, texto cinza */
.flatpickr-weekdays {
  background: white !important;
  padding: 12px 8px 8px !important;
  height: auto !important;
}

.flatpickr-weekday {
  color: #5E5873 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 18px !important;
}

/* ===== DIAS DO CALENDÁRIO ===== */
/* Container dos dias */
.flatpickr-days {
  background: white !important;
  border-radius: 0 0 6px 6px !important;
  width: 100% !important;
}

.dayContainer {
  padding: 0 8px 8px !important;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
}

/* Dia padrão */
.flatpickr-day {
  color: #6E6B7B !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  border-radius: 50% !important;
  width: 36px !important;
  height: 36px !important;
  max-width: 36px !important;
  line-height: 36px !important;
  border: 2px solid transparent !important;
  margin: 0 !important;
  transition: all 0.15s ease !important;
}

/* Dia de outro mês (prev/next) - cor MUTED como no Figma */
.flatpickr-day.prevMonthDay,
.flatpickr-day.nextMonthDay {
  color: #B9B9C3 !important;
}

/* Hover no dia */
.flatpickr-day:hover {
  background: rgba(115, 103, 240, 0.08) !important;
  border-color: transparent !important;
}

/* Dia selecionado - fundo roxo (como dia 13 no Figma) */
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange {
  background: #7367F0 !important;
  color: white !important;
  border-color: #7367F0 !important;
}

.flatpickr-day.selected:hover,
.flatpickr-day.startRange:hover,
.flatpickr-day.endRange:hover {
  background: #7367F0 !important;
  color: white !important;
}

/* Dia com foco - borda roxa fina (como dia 25 no Figma) */
.flatpickr-day:focus,
.flatpickr-day.focus {
  background: white !important;
  border-color: #7367F0 !important;
  outline: none !important;
}

/* Dia com estado hover/focus leve (como dia 10 no Figma) - borda cinza */
.flatpickr-day.today {
  border-color: #DBDADE !important;
  background: white !important;
}

.flatpickr-day.today:hover {
  background: #7367F0 !important;
  color: white !important;
  border-color: #7367F0 !important;
}

/* Range no meio (inRange) */
.flatpickr-day.inRange {
  background: rgba(115, 103, 240, 0.12) !important;
  border-color: transparent !important;
  color: #6E6B7B !important;
  box-shadow: none !important;
}

/* Dia desabilitado */
.flatpickr-day.flatpickr-disabled,
.flatpickr-day.flatpickr-disabled:hover {
  color: #B9B9C3 !important;
  background: transparent !important;
  cursor: not-allowed !important;
}

.flatpickr-innerContainer {
  background: white !important;
}
</style>
