<template>
  <div class="filter-section" :class="{ 'filter-section-open': isOpen }">
    <!-- Header clicável -->
    <button 
      type="button"
      class="filter-section-header"
      @click="toggle"
      :aria-expanded="isOpen"
    >
      <div class="header-left">
        <span v-if="icon" class="material-symbols-outlined section-icon">{{ icon }}</span>
        <h3 class="section-title">{{ title }}</h3>
        <!-- Badge de contagem quando fechado -->
        <span v-if="!isOpen && activeCount > 0" class="active-badge">
          {{ activeCount }}
        </span>
      </div>
      <span class="material-symbols-outlined chevron-icon">
        {{ isOpen ? 'expand_less' : 'expand_more' }}
      </span>
    </button>
    
    <!-- Conteúdo expansível -->
    <div v-show="isOpen" class="filter-section-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  defaultOpen: {
    type: Boolean,
    default: true
  },
  activeCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['toggle'])

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}
</script>

<style scoped>
.filter-section {
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-section-header:hover {
  background-color: rgba(47, 43, 61, 0.04);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 18px;
  color: #7367F0;
  font-variation-settings: 
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(47, 43, 61, 0.78);
  margin: 0;
  transition: color 0.2s ease;
}

.filter-section-header:hover .section-title {
  color: #7367F0;
}

.active-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: rgba(115, 103, 240, 0.16);
  color: #7367F0;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  margin-left: 4px;
}

.chevron-icon {
  font-size: 20px;
  color: rgba(47, 43, 61, 0.4);
  transition: transform 0.2s ease, color 0.2s ease;
  font-variation-settings: 
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}

.filter-section-open .chevron-icon {
  color: #7367F0;
}

.filter-section-content {
  padding: 0 24px 20px 24px;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Borda esquerda decorativa nos itens do conteúdo */
.filter-section-content :deep(.checkbox-list) {
  padding-left: 12px;
  border-left: 2px solid rgba(47, 43, 61, 0.08);
  margin-left: 4px;
}
</style>
