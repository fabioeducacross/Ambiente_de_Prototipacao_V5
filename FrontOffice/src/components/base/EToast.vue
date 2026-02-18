<template>
  <teleport to="body">
    <div class="toast-container position-fixed top-0 end-0 p-3" aria-live="polite" aria-atomic="true">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast-${toast.type}`, 'show']"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <i :class="getIcon(toast.type)" class="toast-icon me-2"></i>
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
/* Toast icon colors - Coordenado com variantes de toast */
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

/* Animações de entrada e saída (Vue Transition) */
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

/* Helper classes do Bootstrap 5 */
.me-2 {
  margin-right: 0.5rem;
}

.me-auto {
  margin-right: auto;
}

.p-3 {
  padding: 1rem;
}

.position-fixed {
  position: fixed !important;
}

.top-0 {
  top: 0 !important;
}

.end-0 {
  right: 0 !important;
}
</style>
