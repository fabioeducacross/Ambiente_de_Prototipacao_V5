import { ref } from 'vue'
import EDatePicker from '../../FrontOffice/src/components/base/EDatePicker.vue'

export default {
  title: 'Base/EDatePicker',
  component: EDatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multiple', 'range']
    }
  }
}

export const Default = {
  render: () => ({
    components: { EDatePicker },
    setup() {
      const date = ref(null)
      return { date }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker v-model="date" placeholder="Selecione uma data" />
        <p style="margin-top:8px;font-size:12px;color:#666">Data: {{ date || 'não selecionada' }}</p>
      </div>
    `
  })
}

export const WithLabel = {
  render: () => ({
    components: { EDatePicker },
    setup() {
      const date = ref(null)
      return { date }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker
          v-model="date"
          label="Data de início"
          :required="true"
          placeholder="dd/mm/aaaa"
        />
      </div>
    `
  })
}

export const WithTime = {
  render: () => ({
    components: { EDatePicker },
    setup() {
      const datetime = ref(null)
      return { datetime }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker
          v-model="datetime"
          label="Data e hora"
          :enable-time="true"
          date-format="d/m/Y H:i"
          placeholder="dd/mm/aaaa hh:mm"
        />
      </div>
    `
  })
}

export const Range = {
  render: () => ({
    components: { EDatePicker },
    setup() {
      const range = ref(null)
      return { range }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker
          v-model="range"
          label="Período"
          mode="range"
          placeholder="Selecione um período"
        />
      </div>
    `
  })
}

export const WithError = {
  render: () => ({
    components: { EDatePicker },
    setup() {
      const date = ref(null)
      return { date }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker
          v-model="date"
          label="Data de nascimento"
          :invalid="true"
          error-message="Campo obrigatório"
        />
      </div>
    `
  })
}

export const Disabled = {
  render: () => ({
    components: { EDatePicker },
    template: `
      <div style="max-width:300px;padding:16px">
        <EDatePicker :disabled="true" label="Campo desabilitado" placeholder="--/--/----" />
      </div>
    `
  })
}
