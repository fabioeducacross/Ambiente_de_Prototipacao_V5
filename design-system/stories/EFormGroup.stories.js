import { ref } from 'vue'
import EFormGroup from '../../FrontOffice/src/components/base/EFormGroup.vue'
import EInput from '../../FrontOffice/src/components/base/EInput.vue'
import ESelect from '../../FrontOffice/src/components/base/ESelect.vue'
import ETextarea from '../../FrontOffice/src/components/base/ETextarea.vue'

export default {
  title: 'Base/EFormGroup',
  component: EFormGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    }
  }
}

export const WithInput = {
  render: () => ({
    components: { EFormGroup, EInput },
    setup() {
      const nome = ref('')
      return { nome }
    },
    template: `
      <div style="max-width:360px;padding:16px">
        <EFormGroup id="nome" label="Nome completo" :required="true">
          <template #default="{ invalid, id }">
            <EInput :id="id" v-model="nome" placeholder="Digite seu nome" :invalid="invalid" />
          </template>
        </EFormGroup>
      </div>
    `
  })
}

export const WithError = {
  render: () => ({
    components: { EFormGroup, EInput },
    setup() {
      const email = ref('email-invalido')
      return { email }
    },
    template: `
      <div style="max-width:360px;padding:16px">
        <EFormGroup id="email" label="E-mail" error-message="E-mail inválido. Use o formato usuario@dominio.com">
          <template #default="{ invalid, id }">
            <EInput :id="id" v-model="email" type="email" :invalid="invalid" />
          </template>
        </EFormGroup>
      </div>
    `
  })
}

export const WithHint = {
  render: () => ({
    components: { EFormGroup, EInput },
    setup() {
      const senha = ref('')
      return { senha }
    },
    template: `
      <div style="max-width:360px;padding:16px">
        <EFormGroup id="senha" label="Senha" hint="Mínimo 8 caracteres, 1 letra maiúscula e 1 número">
          <template #default="{ invalid, id }">
            <EInput :id="id" v-model="senha" type="password" placeholder="Digite sua senha" :invalid="invalid" />
          </template>
        </EFormGroup>
      </div>
    `
  })
}

export const CompleteForm = {
  name: 'Formulário Completo',
  render: () => ({
    components: { EFormGroup, EInput, ESelect, ETextarea },
    setup() {
      const form = ref({ nome: '', nivel: null, descricao: '' })
      const niveis = [
        { id: 'iniciante', name: 'Iniciante' },
        { id: 'intermediario', name: 'Intermediário' },
        { id: 'avancado', name: 'Avançado' }
      ]
      return { form, niveis }
    },
    template: `
      <div style="max-width:400px;padding:16px;display:flex;flex-direction:column;gap:16px">
        <EFormGroup id="nome" label="Nome da jornada" :required="true">
          <template #default="{ invalid, id }">
            <EInput :id="id" v-model="form.nome" placeholder="Ex: Jornada de Matemática" :invalid="invalid" />
          </template>
        </EFormGroup>

        <EFormGroup id="nivel" label="Nível" :required="true">
          <template #default>
            <ESelect v-model="form.nivel" :options="niveis" placeholder="Selecione o nível" />
          </template>
        </EFormGroup>

        <EFormGroup id="descricao" label="Descrição" hint="Descreva os objetivos da jornada">
          <template #default="{ invalid, id }">
            <ETextarea :id="id" v-model="form.descricao" placeholder="Descreva a jornada..." :rows="3" :invalid="invalid" />
          </template>
        </EFormGroup>
      </div>
    `
  })
}
