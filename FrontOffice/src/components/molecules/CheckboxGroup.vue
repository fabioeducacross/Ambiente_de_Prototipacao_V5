<template>
  <div class="checkbox-group">
    <h5 v-if="title" class="checkbox-group-title">{{ title }}</h5>
    
    <div class="checkbox-list">
      <Checkbox
        v-for="option in options"
        :key="option.value"
        :model-value="modelValue.includes(option.value)"
        :label="option.label"
        :disabled="option.disabled || false"
        :color="option.color || '#7367f0'"
        :icon="option.icon || ''"
        :icon-svg="option.iconSvg || ''"
        @update:model-value="handleChange(option.value, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import Checkbox from '../atoms/Checkbox.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(option => 
        typeof option.value !== 'undefined' &&
        typeof option.label === 'string'
      )
    }
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (value, isChecked) => {
  let newValue
  
  if (isChecked) {
    // Adiciona o valor se ainda não está no array
    newValue = [...props.modelValue, value]
  } else {
    // Remove o valor do array
    newValue = props.modelValue.filter(v => v !== value)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  color: rgba(47, 43, 61, 0.9);
  margin: 0 0 8px 0;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
