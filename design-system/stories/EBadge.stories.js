import { ref } from 'vue'
import EBadge from '../../FrontOffice/src/components/base/EBadge.vue'

export default {
  title: 'Base/EBadge',
  component: EBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
    }
  }
}

export const Default = {
  args: { variant: 'primary', default: 'Badge' },
  render: (args) => ({
    components: { EBadge },
    setup() { return { args } },
    template: '<EBadge v-bind="args">{{ args.default }}</EBadge>'
  })
}

export const AllVariants = {
  render: () => ({
    components: { EBadge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px">
        <EBadge variant="primary">Primary</EBadge>
        <EBadge variant="secondary">Secondary</EBadge>
        <EBadge variant="success">Success</EBadge>
        <EBadge variant="info">Info</EBadge>
        <EBadge variant="warning">Warning</EBadge>
        <EBadge variant="danger">Danger</EBadge>
        <EBadge variant="light">Light</EBadge>
        <EBadge variant="dark">Dark</EBadge>
      </div>
    `
  })
}

export const Pill = {
  render: () => ({
    components: { EBadge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px">
        <EBadge variant="primary" :pill="true">99+</EBadge>
        <EBadge variant="success" :pill="true">Ativo</EBadge>
        <EBadge variant="danger" :pill="true">Inativo</EBadge>
        <EBadge variant="warning" :pill="true">Pendente</EBadge>
      </div>
    `
  })
}

export const NivelDificuldade = {
  name: 'Pattern: Nível de Dificuldade',
  render: () => ({
    components: { EBadge },
    template: `
      <div style="display:flex;gap:8px;padding:16px">
        <EBadge variant="success">Iniciante</EBadge>
        <EBadge variant="warning">Intermediário</EBadge>
        <EBadge variant="danger">Avançado</EBadge>
      </div>
    `
  })
}

export const StatusItems = {
  name: 'Pattern: Status',
  render: () => ({
    components: { EBadge },
    template: `
      <div style="display:flex;gap:8px;padding:16px">
        <EBadge variant="success">Ativo</EBadge>
        <EBadge variant="warning">Pendente</EBadge>
        <EBadge variant="danger">Inativo</EBadge>
        <EBadge variant="info">Em Revisão</EBadge>
      </div>
    `
  })
}
