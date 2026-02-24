<template>
  <teleport to="body">
    <!-- Modal Backdrop -->
    <transition name="fade">
      <div
        v-if="modelValue"
        class="modal-backdrop fade"
        :class="{ 'show': modelValue }"
      ></div>
    </transition>

    <!-- Modal Dialog -->
    <div
      v-if="modelValue"
      class="modal fade"
      :class="{ 'show': modelValue }"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      style="display: block"
      @click.self="handleOverlayClick"
    >
      <div
        class="modal-dialog"
        :class="[
          `modal-${size}`,
          { 'modal-dialog-centered': centered },
          { 'modal-dialog-scrollable': scrollable }
        ]"
        role="document"
      >
        <div class="modal-content" :class="contentClass">
          <!-- Header -->
          <div v-if="showHeader" class="modal-header">
            <slot name="header">
              <h5 :id="titleId" class="modal-title">{{ title }}</h5>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="btn-close"
              @click="handleClose"
              aria-label="Fechar modal"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer || showFooter" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  centered: {
    type: Boolean,
    default: true
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  contentClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])

// Gerar ID único para aria-labelledby
const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && props.closable) {
    handleClose()
  }
}

const handleEscKey = (event) => {
  if (event.key === 'Escape' && props.closeOnEsc && props.closable && props.modelValue) {
    handleClose()
  }
}

// Prevenir scroll do body quando modal aberto
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Fade transition para backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Sobrescritas específicas do componente (se necessário) */
/* As classes do Bootstrap 5 já estão no style.css global */
</style>
