<template>
  <div class="calendar-days-header">
    <div
      v-for="day in daysLabels"
      :key="day.short"
      class="day-label"
      :class="sizeClass"
    >
      {{ showFullNames ? day.full : day.short }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
    ],
    validator: (value) => {
      return value.length === 7 && value.every(day =>
        typeof day.short === 'string' &&
        typeof day.full === 'string'
      )
    }
  },
  showFullNames: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const sizeClass = computed(() => {
  const sizeClasses = {
    small: 'day-label-sm',
    medium: 'day-label-md',
    large: 'day-label-lg'
  }
  return sizeClasses[props.size]
})
</script>

<style scoped>
.calendar-days-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 0;
  background-color: white;
  border-bottom: 1px solid rgba(47, 43, 61, 0.12);
}

.day-label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color: rgba(47, 43, 61, 0.7);
  text-align: center;
  flex: 1;
}

/* Tamanhos */
.day-label-sm {
  font-size: 13px;
  line-height: 20px;
}

.day-label-md {
  font-size: 15px;
  line-height: 22px;
}

.day-label-lg {
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
}

/* Responsividade - em telas pequenas, forçar abreviações */
@media (max-width: 768px) {
  .day-label {
    font-size: 13px;
  }
}
</style>
