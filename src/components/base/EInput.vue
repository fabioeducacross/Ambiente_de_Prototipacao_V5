<template>
  <input
    :id="id"
    ref="inputRef"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :min="min"
    :max="max"
    :class="inputClasses"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  size: { type: String, default: 'medium' },
  min: { type: String, default: undefined },
  max: { type: String, default: undefined }
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const inputRef = ref(null)

const inputClasses = computed(() => [
  'e-input',
  `e-input--${props.size}`,
  {
    'e-input--invalid': props.invalid,
    'e-input--disabled': props.disabled
  }
])

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped>
.e-input {
  width: 100%;
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-900, #333);
  background-color: #fff;
  border: 1px solid var(--gray-300, #dee2e6);
  transition: border-color var(--transition-base, 0.25s), box-shadow var(--transition-base, 0.25s);
  outline: none;
}

.e-input--small {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: var(--radius-sm, 4px);
}

.e-input--medium {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: var(--radius-md, 8px);
}

.e-input--large {
  padding: 12px 16px;
  font-size: 16px;
  border-radius: var(--radius-lg, 12px);
}

.e-input::placeholder { color: var(--gray-500, #adb5bd); }

.e-input:hover:not(:disabled):not(:read-only) {
  border-color: var(--gray-400, #ced4da);
}

.e-input:focus {
  border-color: var(--primary, #7367F0);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.e-input--invalid {
  border-color: var(--danger, #EA5455);
}

.e-input--disabled,
.e-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background-color: var(--gray-50, #f8f9fa);
}

.e-input[type="date"],
.e-input[type="datetime-local"] {
  cursor: pointer;
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
  accent-color: var(--primary, #7367F0);
}

.e-input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
}

.e-input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
