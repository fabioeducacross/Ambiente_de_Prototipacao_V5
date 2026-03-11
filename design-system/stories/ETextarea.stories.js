import { ref } from 'vue'
import ETextarea from '../../FrontOffice/src/components/base/ETextarea.vue'

export default {
  title: 'Base/ETextarea',
  component: ETextarea,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'radio',
      options: ['none', 'vertical', 'horizontal', 'both']
    }
  }
}

export const Default = {
  args: {
    placeholder: 'Digite uma descrição...',
    rows: 4
  },
  render: (args) => ({
    components: { ETextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<ETextarea v-bind="args" v-model="value" style="max-width:400px;display:block" />'
  })
}

export const WithMaxlength = {
  render: () => ({
    components: { ETextarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width:400px;padding:16px">
        <ETextarea v-model="value" :maxlength="200" placeholder="Máximo 200 caracteres..." :rows="4" />
        <p style="font-size:12px;color:#666;margin-top:4px">{{ value.length }}/200</p>
      </div>
    `
  })
}

export const Disabled = {
  args: { disabled: true, modelValue: 'Campo desabilitado' },
  render: (args) => ({
    components: { ETextarea },
    setup() { return { args } },
    template: '<ETextarea v-bind="args" style="max-width:400px;display:block" />'
  })
}

export const Invalid = {
  args: { invalid: true, placeholder: 'Campo com erro' },
  render: (args) => ({
    components: { ETextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<ETextarea v-bind="args" v-model="value" style="max-width:400px;display:block" />'
  })
}

export const NoResize = {
  args: { resize: 'none', placeholder: 'Sem redimensionamento', rows: 3 },
  render: (args) => ({
    components: { ETextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<ETextarea v-bind="args" v-model="value" style="max-width:400px;display:block" />'
  })
}
