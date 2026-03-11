import LegendEnum from '../../FrontOffice/src/components/base/LegendEnum.vue'

export default {
  title: 'Feedback/LegendEnum',
  component: LegendEnum,
  tags: ['autodocs'],
  argTypes: {
    border: { control: 'boolean' },
  }
}

const progressLegend = [
  {
    text: 'Progresso da turma',
    enum: [
      { text: 'Finalizado ≥ 100%', color: '#14693a' },
      { text: 'Satisfatório ≥ 80%', color: '#28c76f' },
      { text: 'Moderado ≥ 50%',    color: '#ff9f43' },
      { text: 'Crítico < 50%',     color: '#ea5455' },
    ]
  }
]

export const Default = {
  args: { legends: progressLegend, border: false },
  render: (args) => ({
    components: { LegendEnum },
    setup() { return { args } },
    template: '<div style="padding: 16px; max-width: 460px;"><LegendEnum v-bind="args" /></div>'
  })
}

export const WithBorder = {
  name: 'Com borda',
  args: { legends: progressLegend, border: true },
  render: (args) => ({
    components: { LegendEnum },
    setup() { return { args } },
    template: '<div style="padding: 16px; max-width: 460px;"><LegendEnum v-bind="args" /></div>'
  })
}

export const MultipleGroups = {
  name: 'Múltiplos grupos',
  render: () => ({
    components: { LegendEnum },
    setup() {
      const legends = [
        {
          text: 'Progresso de atividades',
          enum: [
            { text: 'Completo',     color: '#28c76f' },
            { text: 'Em andamento', color: '#ff9f43' },
            { text: 'Não iniciado', color: '#ea5455' },
          ]
        },
        {
          text: 'Tipo de conteúdo',
          enum: [
            { text: 'Quiz',   color: '#7367f0' },
            { text: 'Vídeo',  color: '#00CFE8' },
            { text: 'Leitura',color: '#FF9F43' },
          ]
        }
      ]
      return { legends }
    },
    template: '<div style="padding: 16px; max-width: 500px;"><LegendEnum :legends="legends" :border="true" /></div>'
  })
}

export const NoGroupLabel = {
  name: 'Sem rótulo de grupo',
  render: () => ({
    components: { LegendEnum },
    setup() {
      const legends = [
        {
          enum: [
            { text: 'Ativo',    color: '#28c76f' },
            { text: 'Pendente', color: '#ff9f43' },
            { text: 'Inativo',  color: '#ea5455' },
          ]
        }
      ]
      return { legends }
    },
    template: '<div style="padding: 16px; max-width: 400px;"><LegendEnum :legends="legends" /></div>'
  })
}

export const DashboardPattern = {
  name: 'Pattern: Relatório de turmas com ProgressBar',
  render: () => ({
    components: { LegendEnum },
    setup() {
      const legends = [
        {
          text: 'Referência de cores da barra de progresso',
          enum: [
            { text: 'Crítico < 50%',      color: '#ea5455', legend: 'Turmas precisam de atenção urgente' },
            { text: 'Moderado 50–79%',    color: '#ff9f43', legend: 'Turmas em desenvolvimento' },
            { text: 'Satisfatório 80–99%', color: '#28c76f' },
            { text: 'Finalizado 100%',    color: '#14693a' },
          ]
        }
      ]
      return { legends }
    },
    template: `
      <div style="padding: 16px; max-width: 500px;">
        <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 8px; font-weight: 600;">
          Legenda do relatório de turmas:
        </p>
        <LegendEnum :legends="legends" :border="true" />
      </div>
    `
  })
}
