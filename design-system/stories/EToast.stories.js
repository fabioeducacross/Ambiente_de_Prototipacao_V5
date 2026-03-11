import { ref } from 'vue'
import EToast from '../../FrontOffice/src/components/base/EToast.vue'

// EToast é um componente global — sem props, acionado via composable useToast()
// Para demonstrar no Storybook, usamos um wrapper que simula o composable

const ToastDemo = {
  components: { EToast },
  setup() {
    const toasts = ref([])
    let nextId = 1

    function show(type, message, duration = 3000) {
      const id = nextId++
      toasts.value.push({ id, type, message })
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, duration)
    }

    function dismiss(id) {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return { toasts, show, dismiss }
  },
  template: `
    <div style="padding: 24px; min-height: 200px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
        <button class="btn btn-success btn-sm" @click="show('success', 'Evento salvo com sucesso!')">
          toast.success()
        </button>
        <button class="btn btn-danger btn-sm" @click="show('error', 'Ocorreu um erro ao salvar.')">
          toast.error()
        </button>
        <button class="btn btn-warning btn-sm" @click="show('warning', 'Atenção! Verifique os dados.')">
          toast.warning()
        </button>
        <button class="btn btn-info btn-sm" @click="show('info', 'Sincronização concluída.')">
          toast.info()
        </button>
      </div>

      <teleport to="body">
        <div style="position: fixed; top: 1.25rem; right: 1.25rem; z-index: 9999; display: flex; flex-direction: column; gap: 0.625rem;">
          <transition-group name="e-toast" tag="div" style="display: flex; flex-direction: column; gap: 0.625rem;">
            <div
              v-for="item in toasts"
              :key="item.id"
              :class="['e-toast', 'e-toast--' + item.type]"
              role="alert"
              style="display: flex; align-items: center; gap: 0.75rem; min-width: 300px; max-width: 380px; padding: 0.875rem 1rem; border-radius: 0.428rem; box-shadow: 0 4px 24px 0 rgba(34,41,47,0.24); pointer-events: all;"
              :style="{
                backgroundColor: item.type === 'success' ? '#28C76F' : item.type === 'error' ? '#EA5455' : item.type === 'warning' ? '#FF9F43' : '#00CFE8'
              }"
            >
              <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 22px; color: #fff;">
                  {{ item.type === 'success' ? 'check_circle' : item.type === 'error' ? 'cancel' : item.type === 'warning' ? 'warning' : 'info' }}
                </span>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.1rem;">
                <strong style="font-size: 0.875rem; font-weight: 700; color: #fff;">
                  {{ item.type === 'success' ? 'Sucesso' : item.type === 'error' ? 'Erro' : item.type === 'warning' ? 'Atenção' : 'Informação' }}
                </strong>
                <span style="font-size: 0.8125rem; color: rgba(255,255,255,0.88);">{{ item.message }}</span>
              </div>
              <button @click="dismiss(item.id)" style="background: none; border: none; cursor: pointer; padding: 0; opacity: 0.7;" type="button" aria-label="Fechar">
                <span class="material-symbols-outlined" style="font-size: 18px; color: #fff;">close</span>
              </button>
            </div>
          </transition-group>
        </div>
      </teleport>
    </div>
  `
}

export default {
  title: 'Feedback/EToast',
  tags: ['autodocs'],
}

export const Interactive = {
  name: 'Interactive Demo — clique nos botões',
  render: () => ToastDemo
}

export const AllVariants = {
  name: 'Todas as variantes (simultâneas)',
  render: () => ({
    components: {},
    setup() {
      const visible = ref(true)
      return { visible }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px; max-width: 420px;">
        <div v-for="(item, i) in [
          { type: 'success', msg: 'Evento salvo com sucesso!', color: '#28C76F', icon: 'check_circle', title: 'Sucesso' },
          { type: 'error',   msg: 'Ocorreu um erro ao salvar.', color: '#EA5455', icon: 'cancel', title: 'Erro' },
          { type: 'warning', msg: 'Atenção! Verifique os dados.', color: '#FF9F43', icon: 'warning', title: 'Atenção' },
          { type: 'info',    msg: 'Sincronização concluída.', color: '#00CFE8', icon: 'info', title: 'Informação' },
        ]" :key="i"
          :style="{ backgroundColor: item.color, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '0.428rem', boxShadow: '0 4px 24px 0 rgba(34,41,47,0.24)' }"
        >
          <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
            <span class="material-symbols-outlined" style="font-size: 22px; color: #fff; font-variation-settings: 'FILL' 1;">{{ item.icon }}</span>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column;">
            <strong style="font-size: 0.875rem; font-weight: 700; color: #fff;">{{ item.title }}</strong>
            <span style="font-size: 0.8125rem; color: rgba(255,255,255,0.88);">{{ item.msg }}</span>
          </div>
          <span class="material-symbols-outlined" style="font-size: 18px; color: rgba(255,255,255,0.7); cursor: pointer;">close</span>
        </div>
      </div>
    `
  })
}
