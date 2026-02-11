<template>
  <label 
    class="checkbox-container"
    :class="{ 'checkbox-disabled': disabled }"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      class="checkbox-input"
    />
    <span class="checkbox-custom" :class="{ 'checkbox-checked': modelValue }">
      <span v-if="modelValue" class="material-symbols-outlined check-icon">check</span>
    </span>
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  padding: 6px 0;
  min-height: 36px;
}

.checkbox-container.checkbox-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Input nativo oculto */
.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Checkbox customizado */
.checkbox-custom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(47, 43, 61, 0.4);
  border-radius: 4px;
  background-color: transparent;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox-custom:hover {
  border-color: rgba(47, 43, 61, 0.7);
}

.checkbox-custom.checkbox-checked {
  background-color: #7367f0;
  border-color: #7367f0;
}

/* Ícone de check */
.check-icon {
  font-size: 14px;
  color: white;
  font-variation-settings: 
    'FILL' 1,
    'wght' 500,
    'GRAD' 0,
    'opsz' 20;
}

/* Label */
.checkbox-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  flex: 1;
}

.checkbox-disabled .checkbox-label {
  color: rgba(47, 43, 61, 0.4);
}

/* Focus visible para acessibilidade */
.checkbox-input:focus-visible + .checkbox-custom {
  outline: 2px solid #7367f0;
  outline-offset: 2px;
}
</style>
