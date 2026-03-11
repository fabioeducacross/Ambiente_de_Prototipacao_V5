import { ref } from 'vue'
import EModal from '../../FrontOffice/src/components/base/EModal.vue'
import EButton from '../../FrontOffice/src/components/base/EButton.vue'

export default {
  title: 'Base/EModal',
  component: EModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl']
    }
  }
}

export const Default = {
  render: () => ({
    components: { EModal, EButton },
    setup() {
      const show = ref(false)
      return { show }
    },
    template: `
      <div style="padding:16px">
        <EButton @click="show = true">Abrir Modal</EButton>
        <EModal v-model="show" title="Título do Modal">
          <p>Conteúdo do modal. Adicione qualquer elemento aqui.</p>
          <template #footer>
            <EButton variant="outline-secondary" @click="show = false">Cancelar</EButton>
            <EButton variant="primary" @click="show = false">Confirmar</EButton>
          </template>
        </EModal>
      </div>
    `
  })
}

export const Large = {
  render: () => ({
    components: { EModal, EButton },
    setup() {
      const show = ref(false)
      return { show }
    },
    template: `
      <div style="padding:16px">
        <EButton @click="show = true">Abrir Modal Large</EButton>
        <EModal v-model="show" title="Modal Grande" size="lg">
          <p>Modal de tamanho lg com mais conteúdo.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
          <template #footer>
            <EButton variant="primary" @click="show = false">Fechar</EButton>
          </template>
        </EModal>
      </div>
    `
  })
}

export const Scrollable = {
  render: () => ({
    components: { EModal, EButton },
    setup() {
      const show = ref(false)
      return { show }
    },
    template: `
      <div style="padding:16px">
        <EButton @click="show = true">Modal com Scroll</EButton>
        <EModal v-model="show" title="Modal Scrollable" :scrollable="true">
          <div>
            <p v-for="i in 20" :key="i" style="margin-bottom:12px">
              Linha {{ i }} de conteúdo longo que força o scroll interno do modal.
            </p>
          </div>
          <template #footer>
            <EButton variant="primary" @click="show = false">Fechar</EButton>
          </template>
        </EModal>
      </div>
    `
  })
}
