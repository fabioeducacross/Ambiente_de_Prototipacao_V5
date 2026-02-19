<template>
  <div :class="formGroupClasses">
    <label v-if="label" :for="id" class="e-form-group__label">
      {{ label }}
      <span v-if="required" class="e-form-group__required">*</span>
    </label>
    
    <div class="e-form-group__control">
      <slot :invalid="invalid" :id="id" />
    </div>
    
    <span v-if="errorMessage || hint" class="e-form-group__message">
      {{ errorMessage || hint }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const invalid = computed(() => !!props.errorMessage)

const formGroupClasses = computed(() => {
  return [
    'e-form-group',
    `e-form-group--${props.size}`,
    {
      'e-form-group--invalid': invalid.value,
      'e-form-group--required': props.required
    }
  ]
})
</script>

<style scoped>
.e-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Label */
.e-form-group__label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-900);
  line-height: 1.4;
}

.e-form-group--small .e-form-group__label {
  font-size: var(--font-size-xs);
}

.e-form-group--large .e-form-group__label {
  font-size: var(--font-size-base);
}

.e-form-group__required {
  color: var(--danger);
  margin-left: 2px;
}

/* Control wrapper */
.e-form-group__control {
  display: flex;
  flex-direction: column;
}

/* Message (error or hint) */
.e-form-group__message {
  display: block;
  font-size: var(--font-size-xs);
  line-height: 1.4;
  color: var(--gray-600);
}

.e-form-group--invalid .e-form-group__message {
  color: var(--danger);
}

/* Spacing between form groups */
.e-form-group + .e-form-group {
  margin-top: var(--spacing-md);
}

.e-form-group--small + .e-form-group--small {
  margin-top: var(--spacing-md);
}

.e-form-group--large + .e-form-group--large {
  margin-top: var(--spacing-xl);
}
</style>
