import Sidebar from '../../FrontOffice/src/components/Sidebar.vue'

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' }
  }
}

export const Expanded = {
  name: 'Expandida (padrão)',
  args: { collapsed: false },
  render: (args) => ({
    components: { Sidebar },
    setup() { return { args } },
    template: `
      <div style="height: 500px; position: relative; overflow: hidden; border: 1px solid #ebe9f1; border-radius: 8px;">
        <Sidebar v-bind="args" style="position: absolute;" />
      </div>
    `
  })
}

export const Collapsed = {
  name: 'Colapsada (só ícones)',
  args: { collapsed: true },
  render: (args) => ({
    components: { Sidebar },
    setup() { return { args } },
    template: `
      <div style="height: 500px; position: relative; overflow: hidden; border: 1px solid #ebe9f1; border-radius: 8px;">
        <Sidebar v-bind="args" style="position: absolute;" />
      </div>
    `
  })
}

export const Toggle = {
  name: 'Interactive — Toggle colapso',
  render: () => ({
    components: { Sidebar },
    data: () => ({ collapsed: false }),
    template: `
      <div>
        <button
          class="btn btn-outline-primary btn-sm mb-3"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? 'Expandir sidebar' : 'Colapsar sidebar' }}
        </button>
        <div style="height: 480px; position: relative; overflow: hidden; border: 1px solid #ebe9f1; border-radius: 8px;">
          <Sidebar :collapsed="collapsed" style="position: absolute;" />
        </div>
      </div>
    `
  })
}
