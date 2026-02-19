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
    :class="inputClasses"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'datetime-local', 'time'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
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
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputRef = ref(null)
const isFocused = ref(false)

const inputClasses = computed(() => {
  return [
    'e-input',
    `e-input--${props.size}`,
    {
      'e-input--invalid': props.invalid,
      'e-input--disabled': props.disabled,
      'e-input--readonly': props.readonly,
      'e-input--focused': isFocused.value
    }
  ]
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

// Tornar todo o campo de data clicável
onMounted(() => {
  if (inputRef.value && ['date', 'datetime-local', 'time'].includes(props.type)) {
    inputRef.value.addEventListener('click', (e) => {
      // Se showPicker está disponível (navegadores modernos)
      if (inputRef.value.showPicker) {
        try {
          inputRef.value.showPicker()
        } catch (err) {
          // Fallback silencioso se showPicker falhar
        }
      }
    })
  }
})

// Expose focus method
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped>
.e-input {
  width: 100%;
  font-family: var(--font-family-base);
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  transition: var(--transition-base);
}

/* Sizes */
.e-input--small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.e-input--medium {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
}

.e-input--large {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
}

/* States */
.e-input::placeholder {
  color: var(--gray-500);
}

.e-input:hover:not(:disabled):not(:readonly) {
  border-color: var(--gray-400);
}

.e-input:focus,
.e-input--focused {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.e-input--invalid {
  border-color: var(--danger);
}

.e-input--invalid:focus {
  box-shadow: 0 0 0 3px rgba(234, 84, 85, 0.1);
}

.e-input--disabled,
.e-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--gray-50);
}

.e-input--readonly,
.e-input:readonly {
  background-color: var(--gray-50);
  cursor: default;
}

/* Date inputs */
.e-input[type="date"],
.e-input[type="datetime-local"],
.e-input[type="time"] {
  cursor: pointer;
  /* Sobrescrever estilos padrão do navegador mantendo funcionalidade */
  font-family: var(--font-family-base);
  border-style: solid !important;
  /* Garantir que o campo inteiro seja clicável */
  position: relative;
  /* Cor roxa no calendário nativo */
  accent-color: var(--primary);
  color-scheme: light;
}

/* Pseudo-elementos do WebKit para tentar customizar o calendário */
.e-input[type="date"]::-webkit-datetime-edit,
.e-input[type="datetime-local"]::-webkit-datetime-edit,
.e-input[type="time"]::-webkit-datetime-edit {
  color: var(--gray-900);
}

.e-input[type="date"]::-webkit-datetime-edit-fields-wrapper,
.e-input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper,
.e-input[type="time"]::-webkit-datetime-edit-fields-wrapper {
  color: var(--gray-900);
}

.e-input[type="date"]::-webkit-inner-spin-button,
.e-input[type="datetime-local"]::-webkit-inner-spin-button,
.e-input[type="time"]::-webkit-inner-spin-button {
  display: none;
}

/* Garantir padding nos diferentes tamanhos para date inputs */
.e-input[type="date"].e-input--small,
.e-input[type="datetime-local"].e-input--small,
.e-input[type="time"].e-input--small {
  padding: var(--spacing-sm) var(--spacing-md);
}

.e-input[type="date"].e-input--medium,
.e-input[type="datetime-local"].e-input--medium,
.e-input[type="time"].e-input--medium {
  padding: var(--spacing-md) var(--spacing-lg);
}

.e-input[type="date"].e-input--large,
.e-input[type="datetime-local"].e-input--large,
.e-input[type="time"].e-input--large {
  padding: var(--spacing-lg) var(--spacing-xl);
}

/* Estilizar o ícone do calendário (webkit) */
.e-input[type="date"]::-webkit-calendar-picker-indicator,
.e-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
.e-input[type="time"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity var(--transition-fast);
}

.e-input[type="date"]::-webkit-calendar-picker-indicator:hover,
.e-input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover,
.e-input[type="time"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
