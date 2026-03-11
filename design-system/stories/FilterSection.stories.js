import { ref } from 'vue'
import FilterSection from '../../FrontOffice/src/components/molecules/FilterSection.vue'
import CheckboxGroup from '../../FrontOffice/src/components/molecules/CheckboxGroup.vue'

export default {
  title: 'Base/FilterSection',
  component: FilterSection,
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    icon:        { control: 'text' },
    defaultOpen: { control: 'boolean' },
    activeCount: { control: { type: 'number', min: 0 } },
  }
}

export const Default = {
  args: { title: 'Disciplinas', icon: 'book', defaultOpen: true, activeCount: 0 },
  render: (args) => ({
    components: { FilterSection },
    setup() { return { args } },
    template: `
      <div style="max-width: 300px; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <FilterSection v-bind="args">
          <div style="padding: 8px 0; color: #6e6b7b; font-size: 0.85rem;">
            Conteúdo de filtro aqui...
          </div>
        </FilterSection>
      </div>
    `
  })
}

export const WithCheckboxGroup = {
  name: 'Com CheckboxGroup (uso real)',
  render: () => ({
    components: { FilterSection, CheckboxGroup },
    setup() {
      const disciplinas = ref([])
      const tipos = ref(['quiz'])
      const disciplinaOptions = [
        { value: 'mat', label: 'Matemática', icon: 'calculate', color: '#7367f0' },
        { value: 'por', label: 'Português', icon: 'book', color: '#28C76F' },
        { value: 'cie', label: 'Ciências', icon: 'science', color: '#00CFE8' },
        { value: 'geo', label: 'Geografia', icon: 'public', color: '#FF9F43' },
      ]
      const tipoOptions = [
        { value: 'quiz',  label: 'Quiz', icon: 'quiz', color: '#7367f0' },
        { value: 'video', label: 'Vídeo', icon: 'play_circle', color: '#EA5455' },
        { value: 'jogo',  label: 'Jogo', icon: 'sports_esports', color: '#FF9F43' },
      ]
      return { disciplinas, tipos, disciplinaOptions, tipoOptions }
    },
    template: `
      <div style="max-width: 280px; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <FilterSection title="Disciplinas" icon="book" :active-count="disciplinas.length">
          <CheckboxGroup v-model="disciplinas" :options="disciplinaOptions" />
        </FilterSection>
        <FilterSection title="Tipo de atividade" icon="assignment" :active-count="tipos.length">
          <CheckboxGroup v-model="tipos" :options="tipoOptions" />
        </FilterSection>
      </div>
    `
  })
}

export const WithActiveBadge = {
  name: 'Badge de contagem ativo',
  render: () => ({
    components: { FilterSection },
    template: `
      <div style="max-width: 280px; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <FilterSection title="Disciplinas" icon="book" :default-open="false" :active-count="3">
          <div style="padding: 8px; color: #6e6b7b; font-size: 0.85rem;">Conteúdo fechado com badge</div>
        </FilterSection>
        <FilterSection title="Tipo" icon="filter_list" :default-open="false" :active-count="0">
          <div style="padding: 8px; color: #6e6b7b; font-size: 0.85rem;">Sem filtros ativos</div>
        </FilterSection>
      </div>
    `
  })
}

export const ControlledMode = {
  name: 'Modo controlado (v-model / accordion)',
  render: () => ({
    components: { FilterSection },
    setup() {
      const openIndex = ref(0)
      const sections = [
        { title: 'Disciplinas', icon: 'book' },
        { title: 'Turmas', icon: 'group' },
        { title: 'Período', icon: 'calendar_today' },
      ]
      const isOpen = (i) => openIndex.value === i
      const toggle = (i, val) => { openIndex.value = val ? i : -1 }
      return { sections, isOpen, toggle }
    },
    template: `
      <div>
        <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 8px;">Comportamento accordion — apenas um aberto por vez:</p>
        <div style="max-width: 280px; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
          <FilterSection
            v-for="(s, i) in sections"
            :key="i"
            :title="s.title"
            :icon="s.icon"
            :model-value="isOpen(i)"
            @update:model-value="val => toggle(i, val)"
          >
            <div style="padding: 8px; color: #6e6b7b; font-size: 0.85rem;">Filtros de {{ s.title }}</div>
          </FilterSection>
        </div>
      </div>
    `
  })
}
