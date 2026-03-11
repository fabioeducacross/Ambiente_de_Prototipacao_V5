import ProgressBarHorizontalV2 from '../../FrontOffice/src/components/base/ProgressBarHorizontalV2.vue'

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBarHorizontalV2,
  tags: ['autodocs'],
  argTypes: {
    value:      { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max:        { control: { type: 'number', min: 0 } },
    showValues: { control: 'boolean' },
    reverse:    { control: 'boolean' },
    height:     { control: 'text' },
  }
}

export const Default = {
  args: { value: 72, max: null, showValues: true, reverse: false, height: '6px' },
  render: (args) => ({
    components: { ProgressBarHorizontalV2 },
    setup() { return { args } },
    template: '<div style="padding: 16px; width: 300px;"><ProgressBarHorizontalV2 v-bind="args" /></div>'
  })
}

export const AllStates = {
  name: 'Todos os estados — variantes automáticas',
  render: () => ({
    components: { ProgressBarHorizontalV2 },
    template: `
      <div style="padding: 16px; width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">Crítico (&lt; 50%) — Danger</p>
          <ProgressBarHorizontalV2 :value="32" :show-values="true" />
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">Moderado (50-79%) — Warning</p>
          <ProgressBarHorizontalV2 :value="65" :show-values="true" />
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">Satisfatório (80-99%) — Success</p>
          <ProgressBarHorizontalV2 :value="85" :show-values="true" />
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">Completo (100%) — Success escuro</p>
          <ProgressBarHorizontalV2 :value="100" :show-values="true" />
        </div>
      </div>
    `
  })
}

export const WithMaxValue = {
  name: 'Com valor absoluto (value + max)',
  render: () => ({
    components: { ProgressBarHorizontalV2 },
    template: `
      <div style="padding: 16px; width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">36 de 50 atividades</p>
          <ProgressBarHorizontalV2 :value="36" :max="50" :show-values="true" />
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">8 de 10 alunos</p>
          <ProgressBarHorizontalV2 :value="8" :max="10" :show-values="true" />
        </div>
        <div>
          <p style="font-size: 0.8rem; color: #6e6b7b; margin-bottom: 6px;">3 de 20 tarefas</p>
          <ProgressBarHorizontalV2 :value="3" :max="20" :show-values="true" />
        </div>
      </div>
    `
  })
}

export const Tall = {
  name: 'Altura customizada',
  render: () => ({
    components: { ProgressBarHorizontalV2 },
    template: `
      <div style="padding: 16px; width: 320px; display: flex; flex-direction: column; gap: 12px;">
        <ProgressBarHorizontalV2 :value="65" height="4px" />
        <ProgressBarHorizontalV2 :value="65" height="8px" />
        <ProgressBarHorizontalV2 :value="65" height="14px" />
        <ProgressBarHorizontalV2 :value="65" height="20px" />
      </div>
    `
  })
}

export const DashboardPattern = {
  name: 'Pattern: Relatório de turmas',
  render: () => ({
    components: { ProgressBarHorizontalV2 },
    template: `
      <div style="padding: 16px; width: 380px; display: flex; flex-direction: column; gap: 16px;">
        <div v-for="turma in turmas" :key="turma.nome" style="border: 1px solid #ebe9f1; border-radius: 6px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; font-size: 0.9rem;">{{ turma.nome }}</span>
            <span style="font-size: 0.8rem; color: #6e6b7b;">{{ turma.alunos }} alunos</span>
          </div>
          <ProgressBarHorizontalV2 :value="turma.progresso" :show-values="true" />
        </div>
      </div>
    `,
    data: () => ({
      turmas: [
        { nome: '5º Ano A', alunos: 28, progresso: 92 },
        { nome: '5º Ano B', alunos: 25, progresso: 67 },
        { nome: '6º Ano A', alunos: 30, progresso: 38 },
        { nome: '6º Ano B', alunos: 27, progresso: 100 },
      ]
    })
  })
}
