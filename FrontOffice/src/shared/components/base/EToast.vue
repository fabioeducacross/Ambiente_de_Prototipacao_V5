<!--
  EToast.vue — Componente de notificação toast (shared)
  
  Visual baseado no Toast de produção (educacross-frontoffice):
  - Fundo colorido sólido por variante (success/error/warning/info)
  - Avatar circular (40px) com ícone Material Symbols centralizado
  - Título bold + mensagem em texto branco
  - Botão de fechar (X) branco no canto
  - Animação slide-in da direita
  
  Uso:
    // Registrar uma vez no App.vue ou layout raiz:
    <EToast />
    
    // Em qualquer componente:
    import { useToast } from '@/shared/composables/useToast'
    const toast = useToast()
    toast.success('Evento salvo com sucesso!')
    toast.error('Ocorreu um erro ao salvar.', 5000)
    toast.warning('Atenção! Verifique os dados.')
    toast.info('Sincronização concluída.')
    
  Composable: src/shared/composables/useToast.js
  Variantes: 'success' | 'error' | 'warning' | 'info'
-->
<template>
  <teleport to="body">
    <div class="e-toast-container" aria-live="polite" aria-atomic="true">
      <transition-group name="e-toast" tag="div" class="e-toast-stack">
        <div
          v-for="item in toasts"
          :key="item.id"
          :class="['e-toast', `e-toast--${item.type}`]"
          role="alert"
          :aria-label="`${getTitle(item.type)}: ${item.message}`"
        >
          <!-- Avatar circular com ícone (inspirado no b-avatar de produção) -->
          <div class="e-toast__avatar" aria-hidden="true">
            <span class="material-symbols-outlined e-toast__icon">
              {{ getIcon(item.type) }}
            </span>
          </div>

          <!-- Conteúdo: título + mensagem -->
          <div class="e-toast__body">
            <strong class="e-toast__title">{{ getTitle(item.type) }}</strong>
            <span class="e-toast__message">{{ item.message }}</span>
          </div>

          <!-- Botão fechar -->
          <button
            class="e-toast__close"
            type="button"
            aria-label="Fechar notificação"
            @click="hideToast(item.id)"
          >
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { useToast } from '@/shared/composables/useToast'

const { toasts, hideToast } = useToast()

/** Ícone Material Symbols por variante */
const getIcon = (type) => {
  const icons = {
    success: 'check_circle',
    error:   'cancel',
    warning: 'warning',
    info:    'info',
  }
  return icons[type] ?? icons.info
}

/** Título por variante */
const getTitle = (type) => {
  const titles = {
    success: 'Sucesso',
    error:   'Erro',
    warning: 'Atenção',
    info:    'Informação',
  }
  return titles[type] ?? titles.info
}
</script>

<style scoped>
/* ─── Container principal (canto superior direito) ─────────────────────────── */
.e-toast-container {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  pointer-events: none;
}

.e-toast-stack {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

/* ─── Toast individual ──────────────────────────────────────────────────────── */
.e-toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
  max-width: 380px;
  padding: 0.875rem 1rem;
  border-radius: 0.428rem;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.24);
  pointer-events: all;
  cursor: default;
}

/* ─── Variantes de cor (fundo sólido, texto branco) ────────────────────────── */
.e-toast--success { background-color: var(--success, #28C76F); }
.e-toast--error   { background-color: var(--danger,  #EA5455); }
.e-toast--warning { background-color: var(--warning, #FF9F43); }
.e-toast--info    { background-color: var(--info,    #00CFE8); }

/* ─── Avatar circular ───────────────────────────────────────────────────────── */
.e-toast__avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.e-toast__icon {
  font-size: 22px;
  color: #fff;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  line-height: 1;
}

/* ─── Corpo (título + mensagem) ─────────────────────────────────────────────── */
.e-toast__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.e-toast__title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.e-toast__message {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.4;
  word-break: break-word;
}

/* ─── Botão fechar ──────────────────────────────────────────────────────────── */
.e-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.15s ease;
  align-self: flex-start;
}

.e-toast__close:hover {
  opacity: 1;
}

.e-toast__close .material-symbols-outlined {
  font-size: 18px;
  color: #fff;
  line-height: 1;
}

/* ─── Animações (slide-in da direita) ───────────────────────────────────────── */
.e-toast-enter-active,
.e-toast-leave-active {
  transition: all 0.3s ease;
}

.e-toast-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.e-toast-leave-to {
  opacity: 0;
  transform: translateX(80px) scale(0.9);
}

.e-toast-move {
  transition: transform 0.3s ease;
}
</style>
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
import { useToast } from '@/shared/composables/useToast'

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
