<template>
  <div class="calendar-header">
    <p class="month-year">{{ monthYear }}</p>
    <div class="navigation-buttons">
      <NavigationButton
        icon="chevron_left"
        :aria-label="ariaLabelPrevious"
        @click="$emit('previous')"
      />
      <NavigationButton
        icon="chevron_right"
        :aria-label="ariaLabelNext"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>

<script setup>
import NavigationButton from '../atoms/NavigationButton.vue'

defineProps({
  monthYear: {
    type: String,
    required: true
  },
  ariaLabelPrevious: {
    type: String,
    default: 'Mês anterior'
  },
  ariaLabelNext: {
    type: String,
    default: 'Próximo mês'
  }
})

defineEmits(['previous', 'next'])
</script>

<style scoped>
.calendar-header {
  display: flex;
  align-items: center;
  gap: var(--padding-3, 12px);
  padding: var(--p-3, 12px) var(--p-4, 16px);
}

.month-year {
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-primary, rgba(47, 43, 61, 0.9));
  margin: 0;
}

.navigation-buttons {
  display: flex;
  gap: var(--padding-2, 8px);
}
</style>
