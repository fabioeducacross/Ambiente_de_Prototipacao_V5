import PageCallout from '../../FrontOffice/src/components/atoms/PageCallout.vue'

export default {
  title: 'Feedback/PageCallout',
  component: PageCallout,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'info', 'warning', 'neutral'] },
    icon:    { control: 'text' },
    title:   { control: 'text' },
    default: { control: 'text', name: 'slot default (mensagem)' },
  }
}

export const Default = {
  args: { variant: 'primary', icon: 'info', title: '', default: 'Você pode criar até 40 missões por mês.' },
  render: (args) => ({
    components: { PageCallout },
    setup() { return { args } },
    template: '<PageCallout v-bind="args">{{ args.default }}</PageCallout>'
  })
}

export const AllVariants = {
  name: 'Todas as variantes',
  render: () => ({
    components: { PageCallout },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; max-width: 500px;">
        <PageCallout variant="primary" icon="info">
          Você pode criar até <strong>40 missões</strong> por mês.
        </PageCallout>
        <PageCallout variant="info" icon="info_outline">
          Sincronização automática ativada — dados atualizados a cada 5 minutos.
        </PageCallout>
        <PageCallout variant="warning" icon="warning">
          Limite próximo — você já criou <strong>35 missões</strong> este mês.
        </PageCallout>
        <PageCallout variant="neutral" icon="help_outline">
          Este recurso está em fase de testes. Suas configurações podem ser resetadas.
        </PageCallout>
      </div>
    `
  })
}

export const WithTitle = {
  name: 'Com título',
  render: () => ({
    components: { PageCallout },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; max-width: 500px;">
        <PageCallout variant="primary" icon="info" title="Sobre as missões">
          Missões são atividades gamificadas que engajam os alunos no aprendizado diário.
        </PageCallout>
        <PageCallout variant="warning" icon="warning" title="Atenção">
          Limite próximo — você já criou 35 missões este mês. O limite é 40.
        </PageCallout>
        <PageCallout variant="info" icon="school" title="Como funciona">
          O progresso é calculado automaticamente com base nas entregas dos alunos.
        </PageCallout>
      </div>
    `
  })
}

export const Patterns = {
  name: 'Patterns de uso real',
  render: () => ({
    components: { PageCallout },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; max-width: 560px;">
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Topo de tela de criação:</p>
          <PageCallout variant="primary" icon="add_circle">
            Preencha os dados abaixo para criar uma nova missão para sua turma.
          </PageCallout>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Aviso em tela de configuração:</p>
          <PageCallout variant="warning" icon="settings" title="Configuração pendente">
            Você ainda não configurou a integração com o Google Classroom. Algumas funcionalidades podem estar limitadas.
          </PageCallout>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px; font-weight: 600;">Informação contextual neutra:</p>
          <PageCallout variant="neutral" icon="history_edu">
            Os dados exibidos são referentes ao último bimestre letivo encerrado.
          </PageCallout>
        </div>
      </div>
    `
  })
}
