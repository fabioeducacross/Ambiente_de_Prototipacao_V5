import { ref } from 'vue'
import EInput from '../../FrontOffice/src/components/base/EInput.vue'

export default {
  title: 'Base/EInput',
  component: EInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'datetime-local', 'time']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    }
  }
}

export const Default = {
  args: {
    placeholder: 'Digite algo...',
    size: 'medium',
    type: 'text'
  },
  render: (args) => ({
    components: { EInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<EInput v-bind="args" v-model="value" />'
  })
}

export const AllSizes = {
  render: () => ({
    components: { EInput },
    setup() {
      const vals = { small: ref(''), medium: ref(''), large: ref('') }
      return { vals }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;max-width:300px">
        <EInput size="small" placeholder="Small" v-model="vals.small.value" />
        <EInput size="medium" placeholder="Medium" v-model="vals.medium.value" />
        <EInput size="large" placeholder="Large" v-model="vals.large.value" />
      </div>
    `
  })
}

export const Invalid = {
  args: { invalid: true, placeholder: 'Campo com erro' },
  render: (args) => ({
    components: { EInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<EInput v-bind="args" v-model="value" style="max-width:300px" />'
  })
}

export const Disabled = {
  args: { disabled: true, modelValue: 'Campo desabilitado' },
  render: (args) => ({
    components: { EInput },
    setup() { return { args } },
    template: '<EInput v-bind="args" style="max-width:300px" />'
  })
}

export const Readonly = {
  args: { readonly: true, modelValue: 'Somente leitura' },
  render: (args) => ({
    components: { EInput },
    setup() { return { args } },
    template: '<EInput v-bind="args" style="max-width:300px" />'
  })
}

export const Password = {
  args: { type: 'password', placeholder: 'Senha...' },
  render: (args) => ({
    components: { EInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<EInput v-bind="args" v-model="value" style="max-width:300px" />'
  })
}
