<template>
  <div class="filter-sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <h3>Filtros</h3>
      <button class="btn-icon" @click="$emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <div class="sidebar-content">
      <!-- Filtro por Categoria -->
      <div class="filter-section">
        <h4 class="filter-title">Categorias</h4>
        <div class="filter-options">
          <label 
            v-for="category in categoryOptions" 
            :key="category.value"
            class="filter-checkbox"
          >
            <input 
              type="checkbox" 
              :value="category.value"
              :checked="isChecked('categories', category.value)"
              @change="handleFilterChange('categories', category.value)"
            />
            <span class="checkbox-label">
              <span 
                class="color-indicator" 
                :style="{ backgroundColor: category.color }"
              ></span>
              <span class="material-symbols-outlined">{{ category.icon }}</span>
              <span>{{ category.label }}</span>
            </span>
          </label>
        </div>
      </div>

      <!-- Filtro por Origem -->
      <div class="filter-section">
        <h4 class="filter-title">Origem</h4>
        <div class="filter-options">
          <label 
            v-for="origin in originOptions" 
            :key="origin.value"
            class="filter-checkbox"
          >
            <input 
              type="checkbox" 
              :value="origin.value"
              :checked="isChecked('origins', origin.value)"
              @change="handleFilterChange('origins', origin.value)"
            />
            <span class="checkbox-label">
              <span class="material-symbols-outlined">{{ origin.icon }}</span>
              <span>{{ origin.label }}</span>
            </span>
          </label>
        </div>
      </div>

      <!-- Filtro por Status -->
      <div class="filter-section">
        <h4 class="filter-title">Status</h4>
        <div class="filter-options">
          <label class="filter-checkbox">
            <input 
              type="checkbox" 
              :checked="filters.showCanceled"
              @change="$emit('update:filters', { ...filters, showCanceled: $event.target.checked })"
            />
            <span class="checkbox-label">
              <span>Mostrar Cancelados</span>
            </span>
          </label>
        </div>
      </div>

      <!-- Filtro de Busca -->
      <div class="filter-section">
        <h4 class="filter-title">Buscar</h4>
        <input 
          type="text" 
          class="search-input"
          placeholder="Buscar por título..."
          :value="filters.searchText"
          @input="$emit('update:filters', { ...filters, searchText: $event.target.value })"
        />
      </div>
    </div>

    <div class="sidebar-footer">
      <button class="btn btn-secondary btn-block" @click="clearFilters">
        Limpar Filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { CATEGORIES, ORIGIN_LEVELS } from '@/data/calendar-enums'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update:filters'])

const categoryOptions = Object.values(CATEGORIES)
const originOptions = Object.values(ORIGIN_LEVELS)

const isChecked = (filterType, value) => {
  return props.filters[filterType]?.includes(value) ?? true
}

const handleFilterChange = (filterType, value) => {
  const currentValues = props.filters[filterType] || []
  let newValues

  if (currentValues.includes(value)) {
    newValues = currentValues.filter(v => v !== value)
  } else {
    newValues = [...currentValues, value]
  }

  emit('update:filters', {
    ...props.filters,
    [filterType]: newValues
  })
}

const clearFilters = () => {
  emit('update:filters', {
    categories: Object.keys(CATEGORIES),
    origins: Object.keys(ORIGIN_LEVELS),
    showCanceled: false,
    searchText: ''
  })
}
</script>

<style scoped>
.filter-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 320px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.filter-checkbox:hover {
  background: #f5f5f5;
}

.filter-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2c3e50;
}

.color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #7367F0;
}

.sidebar-footer {
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: white;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.btn-block {
  width: 100%;
}

.btn-icon {
  padding: 8px;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.btn-icon:hover {
  background: #f5f5f5;
}

.material-symbols-outlined {
  font-size: 20px;
}
</style>
