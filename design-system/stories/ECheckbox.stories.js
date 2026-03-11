import Checkbox from '../../FrontOffice/src/components/atoms/Checkbox.vue'

export default {
  title: 'Base/ECheckbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    label:      { control: 'text' },
    disabled:   { control: 'boolean' },
    color:      { control: 'color' },
    icon:       { control: 'text' },
  }
}

export const Default = {
  args: { modelValue: false, label: 'Aceito os termos de uso', disabled: false, color: '#7367f0' },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args }
    },
    template: '<Checkbox v-bind="args" @update:model-value="args.modelValue = $event" />'
  })
}

export const Checked = {
  args: { modelValue: true, label: 'Matemática', color: '#7367f0' },
  render: (args) => ({
    components: { Checkbox },
    setup() { return { args } },
    template: '<Checkbox v-bind="args" />'
  })
}

export const Disabled = {
  args: { modelValue: false, label: 'Opção desabilitada', disabled: true },
  render: (args) => ({
    components: { Checkbox },
    setup() { return { args } },
    template: '<Checkbox v-bind="args" />'
  })
}

export const DisabledChecked = {
  name: 'Disabled + Checked',
  args: { modelValue: true, label: 'Opção desabilitada marcada', disabled: true, color: '#7367f0' },
  render: (args) => ({
    components: { Checkbox },
    setup() { return { args } },
    template: '<Checkbox v-bind="args" />'
  })
}

export const WithIcon = {
  name: 'Com ícone Material Symbol',
  args: { modelValue: false, label: 'Português', icon: 'book', color: '#7367f0' },
  render: (args) => ({
    components: { Checkbox },
    setup() { return { args } },
    template: '<Checkbox v-bind="args" />'
  })
}

export const AllVariants = {
  name: 'Todos os estados',
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
        <Checkbox :model-value="false" label="Desmarcado" color="#7367f0" />
        <Checkbox :model-value="true"  label="Marcado" color="#7367f0" />
        <Checkbox :model-value="false" label="Desabilitado" :disabled="true" />
        <Checkbox :model-value="true"  label="Marcado + Desabilitado" :disabled="true" color="#7367f0" />
        <Checkbox :model-value="true"  label="Com ícone" icon="star" color="#FF9F43" />
      </div>
    `
  })
}

export const DisciplinasPattern = {
  name: 'Pattern: Seleção de Disciplinas',
  render: () => ({
    components: { Checkbox },
    setup() {
      const { ref } = window.Vue || require('vue')
      const selected = ref([])
      const disciplinas = [
        { id: 'mat', label: 'Matemática', icon: 'calculate', color: '#7367f0' },
        { id: 'por', label: 'Português', icon: 'book', color: '#28C76F' },
        { id: 'cie', label: 'Ciências', icon: 'science', color: '#00CFE8' },
        { id: 'geo', label: 'Geografia', icon: 'public', color: '#FF9F43' },
      ]
      function toggle(id) {
        if (selected.value.includes(id)) {
          selected.value = selected.value.filter(v => v !== id)
        } else {
          selected.value = [...selected.value, id]
        }
      }
      return { selected, disciplinas, toggle }
    },
    template: `
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
        <Checkbox
          v-for="d in disciplinas"
          :key="d.id"
          :model-value="selected.includes(d.id)"
          :label="d.label"
          :icon="d.icon"
          :color="d.color"
          @update:model-value="toggle(d.id)"
        />
        <p style="margin-top: 8px; font-size: 0.85rem; color: #6e6b7b;">
          Selecionados: {{ selected.join(', ') || 'nenhum' }}
        </p>
      </div>
    `
  })
}
