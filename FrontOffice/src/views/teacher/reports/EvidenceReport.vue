<script setup>
import { ref, computed, watch } from 'vue'
import {
  BCard, BRow, BCol, BFormGroup, BButton,
} from 'bootstrap-vue-next'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import SelectSubject from '@/components/base/SelectSubject.vue'
import ESelect from '@/components/base/ESelect.vue'

// ── Dados mockados ────────────────────────────────────────────────────────────
const bnccList = [
  { id: null,  name: 'Todas as BNCCs' },
  { id: 1,     name: 'BNCC 2019 - Matemática' },
  { id: 2,     name: 'BNCC 2020 - Língua Portuguesa' },
  { id: 3,     name: 'BNCC 2022 - Ciências' },
]

const modulos = [
  { value: 1, label: 'Todos' },
  { value: 2, label: 'Missão' },
  { value: 3, label: 'Ilha' },
  { value: 4, label: 'Sistema de ensino' },
]

const educationSystems = [
  { id: 1, name: 'Sistema Municipal' },
  { id: 2, name: 'Sistema Estadual' },
]

const monthsList = [
  { value: 1,  label: 'Janeiro' },
  { value: 2,  label: 'Fevereiro' },
  { value: 3,  label: 'Março' },
  { value: 4,  label: 'Abril' },
  { value: 5,  label: 'Maio' },
  { value: 6,  label: 'Junho' },
  { value: 7,  label: 'Julho' },
  { value: 8,  label: 'Agosto' },
  { value: 9,  label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

const studentsMock = [
  { id: 1,  name: 'Ana Lima' },
  { id: 2,  name: 'Bruno Souza' },
  { id: 3,  name: 'Carla Mendes' },
  { id: 4,  name: 'Diego Rocha' },
  { id: 5,  name: 'Eduarda Ferreira' },
  { id: 6,  name: 'Felipe Gomes' },
  { id: 7,  name: 'Gabriela Costa' },
  { id: 8,  name: 'Hugo Almeida' },
  { id: 9,  name: 'Isabela Martins' },
  { id: 10, name: 'João Pedro Silva' },
  { id: 11, name: 'Kauã Ribeiro' },
  { id: 12, name: 'Larissa Nunes' },
  { id: 13, name: 'Mateus Carvalho' },
  { id: 14, name: 'Natália Borges' },
  { id: 15, name: 'Otávio Dias' },
]

// ── State filtros ──────────────────────────────────────────────────────────────
const bncc        = ref(bnccList[0])
const modulo      = ref(modulos[0])
const eduSystem   = ref(null)
const startMonth  = ref(monthsList[1])   // Fevereiro
const endMonth    = ref(monthsList[1])

const showEduSystem = computed(() => modulo.value?.value === 4)

watch(startMonth, (n, o) => { if (n?.value > endMonth.value?.value) startMonth.value = o })
watch(endMonth,   (n, o) => { if (n?.value < startMonth.value?.value) endMonth.value = o })

// ── State opções do relatório ──────────────────────────────────────────────────
const optDashboard       = ref(false)
const optClassProficiency = ref(false)
const selectedStudents   = ref([])
const allStudentsSelected = ref(false)
const indeterminate      = ref(false)
const showStudents       = ref(false)

watch(selectedStudents, (v) => {
  if (v.length === 0)                       { indeterminate.value = false; allStudentsSelected.value = false }
  else if (v.length === studentsMock.length) { indeterminate.value = false; allStudentsSelected.value = true  }
  else                                       { indeterminate.value = true;  allStudentsSelected.value = false }
})

function toggleAll(e) {
  const checked = typeof e === 'boolean' ? e : e.target.checked
  selectedStudents.value = checked ? studentsMock.map(s => s.id) : []
}

const disableButton = computed(() =>
  !optDashboard.value && !optClassProficiency.value && selectedStudents.value.length === 0
)

function gerarPDF() {
  alert('Gerando relatório em PDF...')
}
</script>

<template>
  <section>
    <AppBreadcrumb />

    <ClassSelector school-name="Colégio Nova Jornada" class="mb-2" />

    <!-- ── Card 1: Filtros ───────────────────────────────────────────── -->
    <BCard class="mb-2">
      <BRow class="match-height">
        <!-- Disciplina -->
        <BCol cols="12" md="auto">
          <SelectSubject />
        </BCol>

        <!-- Matriz / Currículo -->
        <BCol cols="12" md>
          <BFormGroup label="Matriz/Currículo" label-for="bncc">
            <ESelect
              v-model="bncc"
              :options="bnccList"
              label="name"
              placeholder="Todas as BNCCs"
              :clearable="false"
            />
          </BFormGroup>
        </BCol>

        <!-- Módulo -->
        <BCol cols="12" md>
          <BFormGroup label="Módulo" label-for="modulo">
            <ESelect
              v-model="modulo"
              :options="modulos"
              label="label"
              placeholder="Selecione um Módulo"
              :clearable="false"
              :searchable="false"
            />
          </BFormGroup>
        </BCol>
      </BRow>

      <BRow>
        <!-- Sistema de ensino (condicional) -->
        <BCol v-if="showEduSystem" cols="12" md>
          <BFormGroup label="Sistema de ensino" label-for="eduSystem">
            <ESelect
              v-model="eduSystem"
              :options="educationSystems"
              label="name"
              placeholder="Selecione um sistema de educação"
              :clearable="false"
            />
          </BFormGroup>
        </BCol>

        <!-- Mês inicial -->
        <BCol cols="12" md>
          <BFormGroup label="Mês inicial" label-for="startMonth">
            <ESelect
              v-model="startMonth"
              :options="monthsList"
              label="label"
              placeholder="Selecione um mês inicial"
              :clearable="false"
            />
          </BFormGroup>
        </BCol>

        <!-- Mês final -->
        <BCol cols="12" md>
          <BFormGroup label="Mês final" label-for="endMonth">
            <ESelect
              v-model="endMonth"
              :options="monthsList"
              label="label"
              placeholder="Selecione um mês final"
              :clearable="false"
            />
          </BFormGroup>
        </BCol>
      </BRow>
    </BCard>

    <!-- ── Card 2: Opções do relatório ──────────────────────────────── -->
    <BCard class="mb-2">
      <div class="studentEvidence-report">
        <h3 class="text-body">Selecione as opções que serão exibidas no relatório</h3>
        <hr />

        <!-- Opção 1: Painel Geral -->
        <div class="studentEvidence-option">
          <input
            type="checkbox"
            class="form-check-input studentEvidence-optionCheckbox"
            v-model="optDashboard"
          />
          <div class="studentEvidence-optionContent">
            <h2 class="studentEvidence-optionTitle">1 - Painel Geral</h2>
            <p class="studentEvidence-optionLegend">
              Veja o desempenho dos alunos por objetivo de aprendizagem e desenvolvimento da BNCC
              e a quantidade de jogos que cada um finalizou.
            </p>
          </div>
        </div>

        <hr />

        <!-- Opção 2: Habilidades da Turma -->
        <div class="studentEvidence-option">
          <input
            type="checkbox"
            class="form-check-input studentEvidence-optionCheckbox"
            v-model="optClassProficiency"
          />
          <div class="studentEvidence-optionContent">
            <h2 class="studentEvidence-optionTitle">2 - Habilidades da Turma</h2>
            <p class="studentEvidence-optionLegend">
              Veja os objetivos de aprendizagem e desenvolvimento da turma.
            </p>
          </div>
        </div>

        <hr />

        <!-- Opção 3: Habilidades por Alunos -->
        <div class="studentEvidence-option">
          <input
            type="checkbox"
            class="form-check-input studentEvidence-optionCheckbox"
            :checked="allStudentsSelected"
            :indeterminate.prop="indeterminate"
            @change="toggleAll"
          />
          <div class="studentEvidence-optionContent">
            <h2 class="studentEvidence-optionTitle">3 - Habilidades por Alunos</h2>
            <p class="studentEvidence-optionLegend">
              <strong class="studentEvidence-showStudents" @click="showStudents = !showStudents">
                Clique aqui
              </strong>
              para gerar os dados de habilidade de um aluno específico.
            </p>
          </div>
        </div>

        <!-- Lista de alunos (expansível) -->
        <div v-if="showStudents" class="studentEvidence-students">
          <div class="student-group">
            <label
              v-for="student in studentsMock"
              :key="student.id"
              class="d-flex align-items-center gap-2 mb-0 cursor-pointer"
              style="user-select: none"
            >
              <input
                type="checkbox"
                class="form-check-input mt-0"
                :value="student.id"
                v-model="selectedStudents"
              />
              <span>{{ student.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </BCard>

    <!-- ── Card 3: Botão PDF ─────────────────────────────────────────── -->
    <BCard>
      <div class="d-flex flex-column flex-md-row justify-content-center" style="gap: 16px">
        <BButton
          variant="primary"
          class="d-flex align-items-center justify-content-center gap-2"
          :disabled="disableButton"
          @click="gerarPDF"
        >
          <span class="material-symbols-outlined" style="font-size: 18px">picture_as_pdf</span>
          Gerar relatório em PDF
        </BButton>
      </div>
    </BCard>
  </section>
</template>

<style scoped>
.studentEvidence-report hr {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}

.studentEvidence-optionTitle {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #2c2c2c;
  margin: 0;
}

.studentEvidence-optionLegend {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #6e6b7b;
  margin: 0;
}

.studentEvidence-option {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.studentEvidence-optionCheckbox {
  flex-shrink: 0;
  width: 1.1em;
  height: 1.1em;
  margin-right: 0;
}

.studentEvidence-optionContent {
  margin-left: 1.2rem;
}

.studentEvidence-students {
  padding: 0 3rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.studentEvidence-students .student-group {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .studentEvidence-students .student-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

.studentEvidence-showStudents {
  color: #7367f0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
