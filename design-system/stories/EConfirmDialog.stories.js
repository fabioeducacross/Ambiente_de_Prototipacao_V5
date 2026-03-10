import { ref } from 'vue'
import EConfirmDialog from '../../FrontOffice/src/components/base/EConfirmDialog.vue'
import EButton from '../../FrontOffice/src/components/base/EButton.vue'

export default {
  title: 'Base/EConfirmDialog',
  component: EConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['warning', 'danger', 'info', 'success']
    }
  }
}

export const Default = {
  render: () => ({
    components: { EConfirmDialog, EButton },
    setup() {
      const show = ref(false)
      const resultado = ref(null)
      const confirmar = () => { resultado.value = 'Confirmado!'; show.value = false }
      const cancelar = () => { resultado.value = 'Cancelado'; show.value = false }
      return { show, resultado, confirmar, cancelar }
    },
    template: `
      <div style="padding:16px">
        <EButton @click="show = true">Abrir Confirmação</EButton>
        <p v-if="resultado" style="margin-top:12px;color:#28C76F">{{ resultado }}</p>
        <EConfirmDialog
          v-model="show"
          message="Tem certeza que deseja prosseguir com esta ação?"
          @confirm="confirmar"
          @cancel="cancelar"
        />
      </div>
    `
  })
}

export const Danger = {
  render: () => ({
    components: { EConfirmDialog, EButton },
    setup() {
      const show = ref(false)
      return { show }
    },
    template: `
      <div style="padding:16px">
        <EButton variant="danger" @click="show = true">Excluir Item</EButton>
        <EConfirmDialog
          v-model="show"
          variant="danger"
          title="Excluir permanentemente"
          message="Esta ação não pode ser desfeita."
          description="Todos os dados associados serão removidos."
          confirm-text="Sim, excluir"
          cancel-text="Cancelar"
          @confirm="show = false"
          @cancel="show = false"
        />
      </div>
    `
  })
}

export const WithLoading = {
  render: () => ({
    components: { EConfirmDialog, EButton },
    setup() {
      const show = ref(false)
      const loading = ref(false)
      const confirmar = () => {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          show.value = false
        }, 2000)
      }
      return { show, loading, confirmar }
    },
    template: `
      <div style="padding:16px">
        <EButton @click="show = true">Confirmar com Loading</EButton>
        <EConfirmDialog
          v-model="show"
          message="Processando esta ação pode demorar alguns segundos."
          :loading="loading"
          confirm-text="Processar"
          @confirm="confirmar"
          @cancel="show = false"
        />
      </div>
    `
  })
}
