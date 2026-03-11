// AppBreadcrumb lê route.meta.breadcrumb — depende do Vue Router.
// No Storybook usamos um wrapper que simula a estrutura sem router real.

export default {
  title: 'Layout/AppBreadcrumb',
  tags: ['autodocs'],
}

// Wrapper que simula o HTML gerado pelo AppBreadcrumb
const BreadcrumbMock = {
  props: {
    items: { type: Array, default: () => [] }
  },
  template: `
    <ol class="breadcrumb pl-0 mb-0" style="font-size: .875rem; font-family: Montserrat, Helvetica, Arial, sans-serif; list-style: none; display: flex; flex-wrap: wrap; padding: 0; margin: 0; align-items: center; gap: 4px;">
      <!-- Home icon -->
      <li class="breadcrumb-item" style="display: flex; align-items: center;">
        <a href="#" style="color: #6e6b7b; text-decoration: none;" aria-label="Início" @click.prevent>
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-top;">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </a>
      </li>
      <!-- Dynamic items -->
      <li
        v-for="item in items"
        :key="item.text"
        class="breadcrumb-item"
        :class="{ active: item.active }"
        style="display: flex; align-items: center;"
      >
        <span v-if="item.active" :aria-current="'location'" style="color: #7367f0; font-weight: 600;">
          {{ item.text }}
        </span>
        <a v-else href="#" style="color: #6e6b7b; text-decoration: none;" @click.prevent>
          {{ item.text }}
        </a>
      </li>
    </ol>
  `
}

const sep = `
  <style>
    .breadcrumb-item + .breadcrumb-item::before {
      content: '/';
      padding: 0 6px;
      color: #b9b9c3;
    }
  </style>
`

export const Single = {
  name: 'Página raiz de persona',
  render: () => ({
    components: { BreadcrumbMock },
    setup() {
      return {
        items: [{ text: 'Painel Inicial', active: true }]
      }
    },
    template: `${sep}<div style="padding: 12px;"><BreadcrumbMock :items="items" /></div>`
  })
}

export const TwoLevels = {
  name: 'Dois níveis (seção + página)',
  render: () => ({
    components: { BreadcrumbMock },
    setup() {
      return {
        items: [
          { text: 'Missões', to: '/teacher/missions' },
          { text: 'Nova Missão', active: true }
        ]
      }
    },
    template: `${sep}<div style="padding: 12px;"><BreadcrumbMock :items="items" /></div>`
  })
}

export const ThreeLevels = {
  name: 'Três níveis (calendário → evento)',
  render: () => ({
    components: { BreadcrumbMock },
    setup() {
      return {
        items: [
          { text: 'Calendário', to: '/teacher/calendar' },
          { text: 'Outubro 2025', to: '/teacher/calendar?month=10' },
          { text: 'Prova de Matemática', active: true }
        ]
      }
    },
    template: `${sep}<div style="padding: 12px;"><BreadcrumbMock :items="items" /></div>`
  })
}

export const AllPersonas = {
  name: 'Exemplos por persona',
  render: () => ({
    components: { BreadcrumbMock },
    template: `
      ${sep}
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="font-size: 0.75rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Teacher — Calendário</p>
          <BreadcrumbMock :items="[{text:'Calendário', active:true}]" />
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Teacher — Edição de missão</p>
          <BreadcrumbMock :items="[{text:'Missões',to:'/teacher/missions'},{text:'Editar Missão',active:true}]" />
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Coordinator — Trilhas → Detalhe</p>
          <BreadcrumbMock :items="[{text:'Trilhas A-Z',to:'/coordinator/trilhas'},{text:'Trilha de Matemática',active:true}]" />
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Director — Relatórios → Turma → Aluno</p>
          <BreadcrumbMock :items="[{text:'Relatórios',to:'/director/reports'},{text:'5º Ano A',to:'/director/reports/5a'},{text:'João Silva',active:true}]" />
        </div>
      </div>
    `
  })
}

export const MetaFormat = {
  name: 'Referência: formato de route.meta',
  render: () => ({
    template: `
      <div style="padding: 16px; font-family: monospace; font-size: 0.85rem; background: #f8f7fa; border-radius: 8px; max-width: 520px;">
        <p style="font-weight: 700; margin-bottom: 12px; font-family: sans-serif; font-size: 0.9rem;">Como configurar no router.js:</p>
        <pre style="margin: 0; white-space: pre-wrap; color: #3a3541;">{
  path: '/teacher/calendar/new',
  component: NewEventView,
  meta: {
    persona: 'teacher',
    breadcrumb: [
      { text: 'Calendário', to: '/teacher/calendar' },
      { text: 'Novo Evento', active: true }
    ]
  }
}</pre>
      </div>
    `
  })
}
