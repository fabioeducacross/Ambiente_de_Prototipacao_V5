import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

/**
 * Composable para gerenciar notificações toast
 * 
 * @example
 * const { showToast, hideToast } = useToast()
 * showToast('Evento salvo com sucesso!', 'success')
 */
export function useToast() {
  /**
   * Exibe uma notificação toast
   * 
   * @param {string} message - Mensagem a ser exibida
   * @param {('success'|'error'|'warning'|'info')} type - Tipo da notificação
   * @param {number} duration - Duração em milissegundos (0 = não fecha automaticamente)
   * @returns {number} ID do toast criado
   */
  const showToast = (message, type = 'info', duration = 4000) => {
    const id = ++toastId
    toasts.value.push({
      id,
      message,
      type,
      visible: true
    })

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }

    return id
  }

  /**
   * Oculta uma notificação específica
   * 
   * @param {number} id - ID do toast a ser ocultado
   */
  const hideToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Atalhos para tipos específicos de notificação
   */
  const success = (message, duration) => showToast(message, 'success', duration)
  const error = (message, duration) => showToast(message, 'error', duration)
  const warning = (message, duration) => showToast(message, 'warning', duration)
  const info = (message, duration) => showToast(message, 'info', duration)

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info
  }
}
