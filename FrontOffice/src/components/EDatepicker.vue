<template>
  <div class="e-datepicker-wrapper" :class="{ 'has-value': modelValue }">
    <label v-if="label" :for="inputId" class="e-datepicker-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <div class="e-datepicker-input-wrapper">
      <input
        :id="inputId"
        type="date"
        class="e-datepicker-input form-control"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :min="min"
        :max="max"
      />
      <div class="e-datepicker-icons">
        <span
          v-if="modelValue"
          class="material-symbols-outlined clear-icon"
          @click="$emit('update:modelValue', '')"
          title="Limpar"
        >close</span>
        <span class="material-symbols-outlined calendar-icon">calendar_month</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Selecione uma data' },
  inputId: { type: String, default: () => `datepicker-${Math.random().toString(36).slice(2, 7)}` },
  required: { type: Boolean, default: false },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.e-datepicker-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.e-datepicker-label {
  font-size: 12px;
  font-weight: 600;
  color: #5e5873;
  margin-bottom: 2px;
}

.e-datepicker-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.e-datepicker-input {
  width: 100%;
  padding: 7px 70px 7px 12px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  font-size: 13px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

/* esconde o ícone nativo do browser */
.e-datepicker-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  cursor: pointer;
}

.e-datepicker-input:focus {
  border-color: #6e63e8;
  box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.1);
}

.e-datepicker-icons {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;
}

.e-datepicker-icons .material-symbols-outlined {
  font-size: 16px;
  line-height: 1;
}

.clear-icon {
  color: #b4b7bd;
  pointer-events: all;
  cursor: pointer;
  transition: color 0.15s;
}

.clear-icon:hover {
  color: #ea5455;
}

.calendar-icon {
  color: #6e63e8;
}
</style>
