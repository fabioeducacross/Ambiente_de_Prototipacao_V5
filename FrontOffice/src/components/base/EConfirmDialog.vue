<template>
  <EModal
    v-model="isOpen"
    :title="title"
    size="sm"
    :show-header="false"
    :closable="!loading"
    :close-on-overlay="!loading"
    :close-on-esc="!loading"
    @close="handleCancel"
  >
    <!-- Body com mensagem e ícone -->
    <div class="confirm-dialog-body">
      <div class="confirm-icon" :class="`icon-${variant}`">
        <i :class="['bi', dialogIconClass]"></i>
      </div>
      <div class="confirm-message">
        <p class="message-text">{{ message }}</p>
        <p v-if="description" class="message-description">{{ description }}</p>
      </div>
    </div>

    <!-- Footer com botões -->
    <template #footer>
      <div class="confirm-footer">
        <EButton
          variant="outline-secondary"
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </EButton>
        <EButton
          :variant="confirmButtonVariant"
          @click="handleConfirm"
          :disabled="loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ confirmText }}
        </EButton>
      </div>
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

// Ícone baseado no variant ou no valor informado (Bootstrap Icons)
const dialogIconClass = computed(() => {
  // Se vier um ícone custom, tenta mapear palavras-chave para Bootstrap Icons
  if (props.icon) {
    const keywordMap = {
      delete: 'bi-trash-fill',
      trash: 'bi-trash-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill',
      success: 'bi-check-circle-fill',
      danger: 'bi-x-circle-fill'
    }
    if (props.icon.startsWith('bi-')) return props.icon
    return keywordMap[props.icon] || 'bi-question-circle-fill'
  }
  const icons = {
    danger: 'bi-trash-fill',
    warning: 'bi-exclamation-triangle-fill',
    success: 'bi-check-circle-fill',
    info: 'bi-info-circle-fill'
  }
  return icons[props.variant] || 'bi-question-circle-fill'
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
:deep(.modal-dialog) {
  max-width: 520px;
}

:deep(.modal-content) {
  border: 1px solid #e5e3f3;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

:deep(.modal-body) {
  padding: 28px 28px 18px;
  text-align: center;
}

:deep(.modal-footer) {
  border: none;
  padding: 0 24px 24px;
}

.confirm-dialog-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}

.confirm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: 52px;
  color: #e25757;
}

.icon-danger {
  background-color: transparent;
  color: #e25757;
}

.icon-warning {
  background-color: transparent;
  color: #ff9f43;
}

.icon-success {
  background-color: transparent;
  color: #28c76f;
}

.icon-info {
  background-color: transparent;
  color: #7367f0;
}

.confirm-message {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.confirm-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
}

:deep(.confirm-footer .btn) {
  min-width: 130px;
  height: 42px;
  font-weight: 600;
  border-radius: 8px;
}

:deep(.confirm-footer .btn-outline-secondary) {
  color: #7367f0;
  border-color: #7367f0;
  background-color: #fff;
}

:deep(.confirm-footer .btn-danger) {
  background-color: #e25757;
  border-color: #e25757;
  box-shadow: 0 6px 18px rgba(226, 87, 87, 0.25);
}

.message-text {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #4a4a4a;
  font-family: 'Montserrat', sans-serif;
}

.message-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #6a6a78;
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
