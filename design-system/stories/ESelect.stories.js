import { ref } from 'vue'
import ESelect from '../../FrontOffice/src/components/base/ESelect.vue'

const sampleOptions = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'Português' },
  { id: 3, name: 'Ciências' },
  { id: 4, name: 'História' },
  { id: 5, name: 'Geografia' }
]

export default {
  title: 'Base/ESelect',
  component: ESelect,
  tags: ['autodocs']
}

export const Default = {
  render: () => ({
    components: { ESelect },
    setup() {
      const value = ref(null)
      return { value, sampleOptions }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <ESelect v-model="value" :options="sampleOptions" label="name" track-by="id" placeholder="Selecione a disciplina" />
        <p style="margin-top:8px;font-size:12px;color:#666">Selecionado: {{ value?.name || 'nenhum' }}</p>
      </div>
    `
  })
}

export const WithSearch = {
  render: () => ({
    components: { ESelect },
    setup() {
      const value = ref(null)
      return { value, sampleOptions }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <ESelect
          v-model="value"
          :options="sampleOptions"
          label="name"
          track-by="id"
          :searchable="true"
          placeholder="Buscar disciplina..."
        />
      </div>
    `
  })
}

export const Multiple = {
  render: () => ({
    components: { ESelect },
    setup() {
      const values = ref([])
      return { values, sampleOptions }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <ESelect
          v-model="values"
          :options="sampleOptions"
          label="name"
          track-by="id"
          :multiple="true"
          :searchable="true"
          :clearable="true"
          placeholder="Selecione disciplinas"
        />
        <p style="margin-top:8px;font-size:12px;color:#666">Selecionados: {{ values.length }}</p>
      </div>
    `
  })
}

export const Disabled = {
  render: () => ({
    components: { ESelect },
    setup() {
      return { sampleOptions }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <ESelect :options="sampleOptions" :disabled="true" placeholder="Desabilitado" />
      </div>
    `
  })
}

export const Invalid = {
  render: () => ({
    components: { ESelect },
    setup() {
      const value = ref(null)
      return { value, sampleOptions }
    },
    template: `
      <div style="max-width:300px;padding:16px">
        <ESelect v-model="value" :options="sampleOptions" :invalid="true" placeholder="Campo com erro" />
      </div>
    `
  })
}
