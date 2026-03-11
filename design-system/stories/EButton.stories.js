import EButton from '../../FrontOffice/src/components/base/EButton.vue'

export default {
  title: 'Base/EButton',
  component: EButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline-primary', 'outline-secondary', 'outline-danger', 'link']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset']
    },
    onClick: { action: 'click' }
  }
}

export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    default: 'Botão Principal'
  },
  render: (args) => ({
    components: { EButton },
    setup() { return { args } },
    template: '<EButton v-bind="args">{{ args.default }}</EButton>'
  })
}

export const AllVariants = {
  render: () => ({
    components: { EButton },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px">
        <EButton variant="primary">Primary</EButton>
        <EButton variant="secondary">Secondary</EButton>
        <EButton variant="success">Success</EButton>
        <EButton variant="danger">Danger</EButton>
        <EButton variant="warning">Warning</EButton>
        <EButton variant="info">Info</EButton>
        <EButton variant="outline-primary">Outline Primary</EButton>
        <EButton variant="outline-secondary">Outline Secondary</EButton>
        <EButton variant="outline-danger">Outline Danger</EButton>
        <EButton variant="link">Link</EButton>
      </div>
    `
  })
}

export const AllSizes = {
  render: () => ({
    components: { EButton },
    template: `
      <div style="display:flex;align-items:center;gap:8px;padding:16px">
        <EButton size="small">Small</EButton>
        <EButton size="medium">Medium</EButton>
        <EButton size="large">Large</EButton>
      </div>
    `
  })
}

export const Loading = {
  args: { variant: 'primary', loading: true },
  render: (args) => ({
    components: { EButton },
    setup() { return { args } },
    template: '<EButton v-bind="args">Salvando...</EButton>'
  })
}

export const Disabled = {
  args: { variant: 'primary', disabled: true },
  render: (args) => ({
    components: { EButton },
    setup() { return { args } },
    template: '<EButton v-bind="args">Desabilitado</EButton>'
  })
}

export const WithIcon = {
  args: { variant: 'primary', icon: 'edit' },
  render: (args) => ({
    components: { EButton },
    setup() { return { args } },
    template: '<EButton v-bind="args">Editar</EButton>'
  })
}

export const Block = {
  render: () => ({
    components: { EButton },
    template: `
      <div style="padding:16px;max-width:300px">
        <EButton variant="primary" :block="true">Botão Full Width</EButton>
      </div>
    `
  })
}
