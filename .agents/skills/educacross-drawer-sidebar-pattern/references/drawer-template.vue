<template>
  <!-- Overlay/Backdrop com fade transition -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="drawer-overlay"
      @click="close"
      aria-hidden="true"
    ></div>
  </Transition>

  <!-- Drawer com slide transition -->
  <Transition :name="`slide-${position}`">
    <aside
      v-if="isOpen"
      class="drawer"
      :class="`drawer-${position}`"
      :style="{ width: width }"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <!-- Header -->
      <header class="drawer-header">
        <h2 class="drawer-title">{{ title }}</h2>
        <button
          class="btn-close"
          @click="close"
          aria-label="Fechar"
          type="button"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- Content (slot) -->
      <div class="drawer-content">
        <slot />
      </div>

      <!-- Footer (optional slot) -->
      <footer v-if="$slots.footer" class="drawer-footer">
        <slot name="footer" />
      </footer>
    </aside>
  </Transition>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /**
   * Controla abertura/fechamento do drawer
   */
  isOpen: {
    type: Boolean,
    required: true
  },

  /**
   * Título exibido no header
   */
  title: {
    type: String,
    default: 'Drawer'
  },

  /**
   * Posição do drawer: 'left' ou 'right'
   */
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },

  /**
   * Largura do drawer
   */
  width: {
    type: String,
    default: '400px'
  },

  /**
   * Se deve fechar ao pressionar ESC
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },

  /**
   * Se deve fechar ao clicar no overlay
   */
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'opened', 'closed'])

// Fechar drawer
const close = () => {
  if (!props.closeOnOverlay) return
  emit('close')
}

// Travar/destravar scroll do body
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    emit('opened')
  } else {
    document.body.style.overflow = ''
    emit('closed')
  }
})

// ESC key handler
const handleEscKey = (event) => {
  if (props.closeOnEsc && props.isOpen && event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  // Garantir que scroll seja destravado ao desmontar
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ===========================
   OVERLAY
   =========================== */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(47, 43, 61, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1040;
  cursor: pointer;
}

/* ===========================
   DRAWER BASE
   =========================== */
.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0 8px 24px rgba(47, 43, 61, 0.24);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-right {
  right: 0;
  box-shadow: -4px 0 24px rgba(47, 43, 61, 0.24);
}

.drawer-left {
  left: 0;
  box-shadow: 4px 0 24px rgba(47, 43, 61, 0.24);
}

/* ===========================
   HEADER
   =========================== */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
  flex-shrink: 0;
  background: #fff;
}

.drawer-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2F2B3D;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #82868B;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  color: #2F2B3D;
}

.btn-close:focus {
  outline: 2px solid #7367F0;
  outline-offset: 2px;
}

/* ===========================
   CONTENT
   =========================== */
.drawer-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Scrollbar styles (opcional, para melhor UX) */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #F8F8F8;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #D9D9D9;
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: #82868B;
}

/* ===========================
   FOOTER
   =========================== */
.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid #E0E0E0;
  background: #F8F8F8;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ===========================
   TRANSITIONS
   =========================== */

/* Fade (Overlay) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Right (drawer from right) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Slide Left (drawer from left) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 768px) {
  .drawer {
    width: 100% !important;
    max-width: 100vw;
  }
}
</style>
