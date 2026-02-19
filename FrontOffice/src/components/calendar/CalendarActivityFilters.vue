<template>
  <div class="activity-filters-figma">
    <h3 class="filters-title">Atividades</h3>
    <div class="filters-list">
      <label 
        v-for="category in categories" 
        :key="category.key"
        class="filter-item"
      >
        <input 
          type="checkbox" 
          :value="category.key"
          :checked="isSelected(category.key)"
          @change="handleToggle(category.key)"
          class="visually-hidden"
        >
        <div 
          class="checkbox-custom" 
          :class="{ 'checked': isSelected(category.key) }"
          :style="{ '--category-color': category.color }"
        >
          <span v-if="isSelected(category.key)" class="material-symbols-outlined check-icon">
            check
          </span>
        </div>
        <span class="filter-label">{{ category.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { CATEGORIES } from '@/data/calendar-enums'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const categories = Object.keys(CATEGORIES).map(key => ({
  key,
  label: CATEGORIES[key].label,
  color: CATEGORIES[key].color
}))

const isSelected = (key) => {
  return props.modelValue.includes(key)
}

const handleToggle = (key) => {
  const newValue = isSelected(key)
    ? props.modelValue.filter(k => k !== key)
    : [...props.modelValue, key]
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.activity-filters-figma {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filters-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
  margin: 0;
  padding: 0 16px;
}

.filters-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* Esconder checkbox nativo */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Checkbox customizado */
.checkbox-custom {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--category-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-custom:hover {
  border-width: 2px;
}

.checkbox-custom.checked {
  background: var(--category-color);
  border-color: var(--category-color);
}

.check-icon {
  font-size: 20px;
  color: #ffffff;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20;
}

.filter-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(47, 43, 61, 0.9);
}

/* Hover Effects */
.filter-item:hover .checkbox-custom {
  transform: scale(1.02);
}
</style>
