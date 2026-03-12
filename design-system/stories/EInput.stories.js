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
    }
  }
}

export const CanonicalMinimum = {
  name: 'Contrato canônico mínimo',
  args: {
    placeholder: 'Digite algo...',
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

export const CanonicalSignals = {
  name: 'Sinais recorrentes do baseline',
  render: () => ({
    components: { EInput },
    setup() {
      const values = {
        text: ref(''),
        password: ref(''),
        disabled: ref('Bloqueado')
      }
      return { values }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;max-width:320px">
        <EInput type="text" placeholder="Texto" v-model="values.text.value" />
        <EInput type="password" placeholder="Senha" v-model="values.password.value" />
        <EInput :disabled="true" v-model="values.disabled.value" placeholder="Desabilitado" />
      </div>
    `
  })
}

export const LocalExtensionSizes = {
  name: 'Extensão local - tamanhos',
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

export const LocalExtensionInvalid = {
  name: 'Extensão local - invalid',
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

export const CanonicalDisabled = {
  name: 'Contrato canônico mínimo - disabled',
  args: { disabled: true, modelValue: 'Campo desabilitado' },
  render: (args) => ({
    components: { EInput },
    setup() { return { args } },
    template: '<EInput v-bind="args" style="max-width:300px" />'
  })
}

export const LocalExtensionReadonly = {
  name: 'Extensão local - readonly',
  args: { readonly: true, modelValue: 'Somente leitura' },
  render: (args) => ({
    components: { EInput },
    setup() { return { args } },
    template: '<EInput v-bind="args" style="max-width:300px" />'
  })
}

export const CanonicalTypePassword = {
  name: 'Contrato canônico mínimo - type=password',
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

export const LocalExtensionDateErgonomics = {
  name: 'Extensão local - ergonomia para date/time',
  render: () => ({
    components: { EInput },
    setup() {
      const values = {
        date: ref(''),
        datetime: ref(''),
        time: ref('')
      }
      return { values }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;max-width:320px">
        <EInput type="date" v-model="values.date.value" />
        <EInput type="datetime-local" v-model="values.datetime.value" />
        <EInput type="time" v-model="values.time.value" />
      </div>
    `
  })
}
