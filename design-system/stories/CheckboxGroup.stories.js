import { ref } from 'vue'
import CheckboxGroup from '../../FrontOffice/src/components/molecules/CheckboxGroup.vue'

export default {
  title: 'Base/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  }
}

const defaultOptions = [
  { value: 'mat', label: 'Matemática', icon: 'calculate', color: '#7367f0' },
  { value: 'por', label: 'Português', icon: 'book', color: '#28C76F' },
  { value: 'cie', label: 'Ciências', icon: 'science', color: '#00CFE8' },
  { value: 'geo', label: 'Geografia', icon: 'public', color: '#FF9F43' },
]

export const Default = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref([])
      return { selected, defaultOptions }
    },
    template: `
      <div style="padding: 16px; max-width: 300px;">
        <CheckboxGroup
          v-model="selected"
          :options="defaultOptions"
          title="Disciplinas"
        />
        <p style="margin-top: 12px; font-size: 0.85rem; color: #6e6b7b;">
          Selecionados: {{ selected.join(', ') || 'nenhum' }}
        </p>
      </div>
    `
  })
}

export const PreSelected = {
  name: 'Pré-selecionados',
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(['mat', 'por'])
      return { selected, defaultOptions }
    },
    template: `
      <div style="padding: 16px; max-width: 300px;">
        <CheckboxGroup v-model="selected" :options="defaultOptions" title="Disciplinas ativas" />
      </div>
    `
  })
}

export const WithDisabledItem = {
  name: 'Com item desabilitado',
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(['mat'])
      const options = [
        { value: 'mat', label: 'Matemática', color: '#7367f0' },
        { value: 'por', label: 'Português', color: '#28C76F' },
        { value: 'his', label: 'História (indisponível)', disabled: true },
        { value: 'geo', label: 'Geografia', color: '#FF9F43' },
      ]
      return { selected, options }
    },
    template: `
      <div style="padding: 16px; max-width: 300px;">
        <CheckboxGroup v-model="selected" :options="options" title="Selecione disciplinas" />
      </div>
    `
  })
}

export const NoTitle = {
  name: 'Sem título',
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref([])
      const options = [
        { value: 'a', label: 'Opção A' },
        { value: 'b', label: 'Opção B' },
        { value: 'c', label: 'Opção C' },
      ]
      return { selected, options }
    },
    template: `
      <div style="padding: 16px; max-width: 300px;">
        <CheckboxGroup v-model="selected" :options="options" />
      </div>
    `
  })
}

export const FiltroAtividades = {
  name: 'Pattern: Filtro de Atividades',
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(['quiz', 'video'])
      const tiposAtividade = [
        { value: 'quiz',     label: 'Quiz', icon: 'quiz', color: '#7367f0' },
        { value: 'video',    label: 'Vídeo', icon: 'play_circle', color: '#EA5455' },
        { value: 'leitura',  label: 'Leitura', icon: 'menu_book', color: '#28C76F' },
        { value: 'jogo',     label: 'Jogo', icon: 'sports_esports', color: '#FF9F43' },
        { value: 'atividade',label: 'Atividade', icon: 'assignment', color: '#00CFE8' },
      ]
      return { selected, tiposAtividade }
    },
    template: `
      <div style="padding: 16px; max-width: 300px;">
        <CheckboxGroup
          v-model="selected"
          :options="tiposAtividade"
          title="Tipos de atividade"
        />
        <p style="margin-top: 12px; font-size: 0.85rem; color: #6e6b7b;">
          Filtros ativos: {{ selected.length }}/{{ tiposAtividade.length }}
        </p>
      </div>
    `
  })
}
