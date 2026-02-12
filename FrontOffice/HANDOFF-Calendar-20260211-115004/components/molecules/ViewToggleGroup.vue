<template>
  <div
    class="view-toggle-group"
    role="group"
    :aria-label="ariaLabel"
  >
    <ViewToggleButton
      v-for="view in views"
      :key="view.value"
      :label="view.label"
      :is-active="modelValue === view.value"
      :aria-label="view.ariaLabel || `Alternar para visualização ${view.label.toLowerCase()}`"
      :size="size"
      @click="handleViewChange(view.value)"
    />
  </div>
</template>

<script setup>
import ViewToggleButton from '../atoms/ViewToggleButton.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ['month', 'week', 'day', 'list'].includes(value)
  },
  views: {
    type: Array,
    default: () => [
      { value: 'month', label: 'Mês', ariaLabel: 'Alternar para visualização mensal' },
      { value: 'week', label: 'Semana', ariaLabel: 'Alternar para visualização semanal' },
      { value: 'day', label: 'Dia', ariaLabel: 'Alternar para visualização diária' }
    ],
    validator: (value) => {
      return value.every(view =>
        typeof view.value === 'string' &&
        typeof view.label === 'string'
      )
    }
  },
  ariaLabel: {
    type: String,
    default: 'Alternar visualização do calendário'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleViewChange = (value) => {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<style scoped>
.view-toggle-group {
  display: inline-flex;
  gap: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(47, 43, 61, 0.08);
}

.view-toggle-group :deep(.view-toggle-button) {
  border-radius: 0;
  position: relative;
}

.view-toggle-group :deep(.view-toggle-button:first-child) {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.view-toggle-group :deep(.view-toggle-button:last-child) {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

/* Separador entre botões */
.view-toggle-group :deep(.view-toggle-button:not(:last-child):not(.view-toggle-active))::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 1px;
  background-color: rgba(47, 43, 61, 0.12);
}

/* Remove separador se botão ativo ou próximo ao ativo */
.view-toggle-group :deep(.view-toggle-button.view-toggle-active::after),
.view-toggle-group :deep(.view-toggle-button.view-toggle-active + .view-toggle-button::before) {
  display: none;
}
</style>
