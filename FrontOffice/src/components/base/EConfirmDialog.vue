<template>
  <EModal
    v-model="isOpen"
    :title="title"
    size="sm"
    :closable="!loading"
    :close-on-overlay="!loading"
    :close-on-esc="!loading"
    @close="handleCancel"
  >
    <!-- Body com mensagem e ícone -->
    <div class="confirm-dialog-body">
      <div v-if="icon" class="confirm-icon" :class="`icon-${variant}`">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
      <div class="confirm-message">
        <p class="message-text">{{ message }}</p>
        <p v-if="description" class="message-description">{{ description }}</p>
      </div>
    </div>

    <!-- Footer com botões -->
    <template #footer>
      <EButton
        variant="outline-secondary"
        @click="handleCancel"
        :disabled="loading"
      >
        {{ cancelText }}
      </EButton>
      <EButton
        :variant="confirmVariant"
        @click="handleConfirm"
        :disabled="loading"
      >
        <span v-if="loading" class="loading-spinner"></span>
        {{ confirmText }}
      </EButton>
    </template>
  </EModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import EModal from './EModal.vue'
import EButton from './EButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmar ação'
  },
  message: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (value) => ['info', 'warning', 'danger', 'success'].includes(value)
  },
  icon: {
    type: String,
    default: null
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  confirmVariant: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const isOpen = ref(props.modelValue)

// Variante automática do botão confirmação baseada no variant do dialog
const confirmButtonVariant = computed(() => {
  if (props.confirmVariant) return props.confirmVariant
  
  const variants = {
    danger: 'danger',
    warning: 'warning',
    success: 'success',
    info: 'primary'
  }
  return variants[props.variant] || 'primary'
})

// Ícone padrão baseado no variant
const defaultIcon = computed(() => {
  if (props.icon) return props.icon
  
  const icons = {
    danger: 'error',
    warning: 'warning',
    success: 'check_circle',
    info: 'info'
  }
  return icons[props.variant] || 'help'
})

watch(() => props.modelValue, (value) => {
  isOpen.value = value
})

watch(isOpen, (value) => {
  emit('update:modelValue', value)
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  isOpen.value = false
  emit('cancel')
}
</script>

<style scoped>
.confirm-dialog-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

.confirm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.confirm-icon .material-symbols-outlined {
  font-size: 32px;
  font-variation-settings: 
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 32;
}

.icon-danger {
  background-color: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.icon-warning {
  background-color: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.icon-success {
  background-color: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.icon-info {
  background-color: rgba(115, 103, 240, 0.12);
  color: #7367F0;
}

.confirm-message {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2f2b3d;
  font-family: 'Montserrat', sans-serif;
}

.message-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6e6b7b;
}

.loading-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsividade mobile */
@media (max-width: 768px) {
  .confirm-icon {
    width: 56px;
    height: 56px;
  }

  .confirm-icon .material-symbols-outlined {
    font-size: 28px;
  }

  .message-text {
    font-size: 15px;
  }

  .message-description {
    font-size: 13px;
  }
}
</style>
