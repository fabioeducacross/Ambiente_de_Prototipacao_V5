import AppNavbar from '../../FrontOffice/src/components/AppNavbar.vue'

export default {
  title: 'Layout/AppNavbar',
  component: AppNavbar,
  tags: ['autodocs'],
  argTypes: {
    userName:        { control: 'text' },
    userRole:        { control: 'text' },
    showStudentView: { control: 'boolean' },
    persona:         { control: 'text' },
  }
}

export const Default = {
  name: 'Padrão — Professor',
  args: {
    userName: 'Isabela Cross',
    userRole: 'Professor',
    showStudentView: true,
    persona: 'Teacher'
  },
  render: (args) => ({
    components: { AppNavbar },
    setup() { return { args } },
    template: `
      <div style="height: 80px; position: relative; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <AppNavbar v-bind="args" @toggle-sidebar="() => {}" style="position: absolute; width: 100%;" />
      </div>
    `
  })
}

export const StudentPersona = {
  name: 'Persona — Aluno',
  args: {
    userName: 'Pedro Alves',
    userRole: 'Aluno',
    showStudentView: false,
    persona: 'Student'
  },
  render: (args) => ({
    components: { AppNavbar },
    setup() { return { args } },
    template: `
      <div style="height: 80px; position: relative; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <AppNavbar v-bind="args" @toggle-sidebar="() => {}" style="position: absolute; width: 100%;" />
      </div>
    `
  })
}

export const CoordinatorPersona = {
  name: 'Persona — Coordenador',
  args: {
    userName: 'Ana Lima',
    userRole: 'Coordenador',
    showStudentView: false,
    persona: 'Coordinator'
  },
  render: (args) => ({
    components: { AppNavbar },
    setup() { return { args } },
    template: `
      <div style="height: 80px; position: relative; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden;">
        <AppNavbar v-bind="args" @toggle-sidebar="() => {}" style="position: absolute; width: 100%;" />
      </div>
    `
  })
}

export const WithToggleSidebar = {
  name: 'Interactive — Toggle sidebar',
  render: () => ({
    components: { AppNavbar },
    data: () => ({ toggled: false }),
    template: `
      <div>
        <div style="height: 80px; position: relative; border: 1px solid #ebe9f1; border-radius: 8px; overflow: hidden; margin-bottom: 12px;">
          <AppNavbar
            userName="Isabela Cross"
            userRole="Professor"
            :showStudentView="true"
            persona="Teacher"
            @toggle-sidebar="toggled = !toggled"
            style="position: absolute; width: 100%;"
          />
        </div>
        <p style="font-size: 0.85rem; color: #6e6b7b;">
          Sidebar: {{ toggled ? 'colapsar' : 'expandir' }} (emit toggle-sidebar recebido {{ toggled ? 1 : 0 }}x)
        </p>
      </div>
    `
  })
}
