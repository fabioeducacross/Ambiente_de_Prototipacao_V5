<template>
  <textarea
    :id="id"
    ref="textareaRef"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :rows="rows"
    :maxlength="maxlength"
    :class="textareaClasses"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
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
  rows: {
    type: Number,
    default: 4
  },
  maxlength: {
    type: Number,
    default: null
  },
  resize: {
    type: String,
    default: 'vertical',
    validator: (value) => ['none', 'both', 'horizontal', 'vertical'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const textareaRef = ref(null)
const isFocused = ref(false)

const textareaClasses = computed(() => {
  return [
    'e-textarea',
    `e-textarea--${props.size}`,
    `e-textarea--resize-${props.resize}`,
    {
      'e-textarea--invalid': props.invalid,
      'e-textarea--disabled': props.disabled,
      'e-textarea--readonly': props.readonly,
      'e-textarea--focused': isFocused.value
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

// Expose focus method
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur()
})
</script>

<style scoped>
.e-textarea {
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
.e-textarea--small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.e-textarea--medium {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
}

.e-textarea--large {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
}

/* Resize options */
.e-textarea--resize-none {
  resize: none;
}

.e-textarea--resize-both {
  resize: both;
}

.e-textarea--resize-horizontal {
  resize: horizontal;
}

.e-textarea--resize-vertical {
  resize: vertical;
}

/* States */
.e-textarea::placeholder {
  color: var(--gray-500);
}

.e-textarea:hover:not(:disabled):not(:readonly) {
  border-color: var(--gray-400);
}

.e-textarea:focus,
.e-textarea--focused {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.e-textarea--invalid {
  border-color: var(--danger);
}

.e-textarea--invalid:focus {
  box-shadow: 0 0 0 3px rgba(234, 84, 85, 0.1);
}

.e-textarea--disabled,
.e-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--gray-50);
}

.e-textarea--readonly,
.e-textarea:readonly {
  background-color: var(--gray-50);
  cursor: default;
}
</style>
