<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="feature-flags-panel">
      <div class="panel-header">
        <h3>🚩 Feature Flags</h3>
        <button @click="togglePanel" class="btn-close" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div class="panel-content">
        <p class="panel-description">
          Controle de features em desenvolvimento
        </p>
        
        <div class="flags-list">
          <div
            v-for="(value, key) in allFlags"
            :key="key"
            class="flag-item"
          >
            <label class="flag-label">
              <input
                type="checkbox"
                :checked="value"
                @change="handleToggle(key)"
                class="flag-checkbox"
              />
              <span class="flag-name">{{ formatFlagName(key) }}</span>
              <span
                class="flag-status"
                :class="value ? 'status-on' : 'status-off'"
              >
                {{ value ? 'ON' : 'OFF' }}
              </span>
            </label>
            <span class="flag-description">
              {{ getFlagDescription(key) }}
            </span>
          </div>
        </div>
        
        <div class="panel-footer">
          <button @click="refreshPage" class="btn-refresh">
            <i class="bi bi-arrow-clockwise"></i>
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Toggle Button -->
  <button
    v-if="isDev"
    @click="togglePanel"
    class="feature-flags-toggle"
    :class="{ 'panel-open': isVisible }"
    aria-label="Feature Flags"
  >
    <i class="bi bi-flag-fill"></i>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFeatureFlags } from '@/shared/composables/useFeatureFlags'

const isDev = import.meta.env.DEV
const isVisible = ref(false)
const { getAllFlags, toggleFeature } = useFeatureFlags()

const allFlags = computed(() => getAllFlags().value)

const flagDescriptions = {
  showEventTime: 'Exibe horário dos eventos no EventDrawer'
}

const togglePanel = () => {
  isVisible.value = !isVisible.value
}

const handleToggle = (flagName) => {
  toggleFeature(flagName)
}

const formatFlagName = (name) => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

const getFlagDescription = (key) => {
  return flagDescriptions[key] || 'Sem descrição'
}

const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
.feature-flags-panel {
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 380px;
  max-height: 600px;
  background: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-xl);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: var(--white);
}

.panel-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.panel-description {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
}

.flags-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.flag-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
  transition: var(--transition-fast);
}

.flag-item:hover {
  background: var(--gray-100);
  border-color: var(--primary);
}

.flag-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  margin: 0;
  font-weight: 500;
}

.flag-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
}

.flag-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--gray-900);
}

.flag-status {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-on {
  background: rgba(40, 199, 111, 0.15);
  color: var(--success);
}

.status-off {
  background: rgba(130, 134, 139, 0.15);
  color: var(--secondary);
}

.flag-description {
  font-size: var(--font-size-xs);
  color: var(--gray-600);
  margin-left: 26px;
}

.panel-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--gray-200);
}

.btn-refresh {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  color: var(--gray-900);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: var(--transition-fast);
}

.btn-refresh:hover {
  background: var(--gray-200);
  border-color: var(--gray-400);
}

.feature-flags-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: var(--white);
  border: none;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 9998;
  transition: var(--transition-base);
}

.feature-flags-toggle:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-xl);
}

.feature-flags-toggle.panel-open {
  bottom: 620px;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
