<template>
  <teleport to="body">
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      <transition-group name="toast" tag="div" class="toast-wrapper">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast-${toast.type}`, 'show']"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <i :class="getIcon(toast.type)" class="toast-icon"></i>
            <strong class="me-auto">{{ getTitle(toast.type) }}</strong>
            <button
              type="button"
              class="btn-close"
              :aria-label="'Fechar notificação: ' + toast.message"
              @click="hideToast(toast.id)"
            ></button>
          </div>
          <div class="toast-body">
            {{ toast.message }}
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, hideToast } = useToast()

const getIcon = (type) => {
  const icons = {
    success: 'bi bi-check-circle-fill',
    error: 'bi bi-x-circle-fill',
    warning: 'bi bi-exclamation-triangle-fill',
    info: 'bi bi-info-circle-fill'
  }
  return icons[type] || icons.info
}

const getTitle = (type) => {
  const titles = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Atenção',
    info: 'Informação'
  }
  return titles[type] || titles.info
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.toast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: all;
}

.toast {
  min-width: 300px;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-left: 4px solid;
}

.toast-success {
  border-left-color: var(--success);
}

.toast-error {
  border-left-color: var(--danger);
}

.toast-warning {
  border-left-color: var(--warning);
}

.toast-info {
  border-left-color: var(--info);
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  gap: 8px;
}

.toast-icon {
  font-size: 18px;
}

.toast-success .toast-icon {
  color: var(--success);
}

.toast-error .toast-icon {
  color: var(--danger);
}

.toast-warning .toast-icon {
  color: var(--warning);
}

.toast-info .toast-icon {
  color: var(--info);
}

.toast-header strong {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.btn-close {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  width: 1em;
  height: 1em;
  padding: 0;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-close:hover {
  opacity: 1;
}

.toast-body {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

/* Animações de entrada e saída */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

/* Responsividade mobile */
@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
  }

  .toast {
    min-width: auto;
    width: 100%;
  }
}
</style>
