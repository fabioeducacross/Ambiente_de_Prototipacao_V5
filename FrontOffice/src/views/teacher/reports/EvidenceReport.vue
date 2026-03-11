<script setup>
import { ref, computed, watch } from 'vue'
import {
  BCard, BRow, BCol, BFormGroup, BFormCheckbox, BFormCheckboxGroup, BOverlay, BButton, BSpinner, BTooltip,
} from 'bootstrap-vue-next'
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

const currentMonth = new Date().getMonth() + 1

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
const startMonth  = ref(monthsList.find((month) => month.value === currentMonth) ?? monthsList[0])
const endMonth    = ref(monthsList.find((month) => month.value === currentMonth) ?? monthsList[0])

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
const isGeneratingPdf    = ref(false)
const loading            = ref(false)

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

const hasStudents = computed(() => studentsMock.length > 0)

function changeShowStudents() {
  if (!hasStudents.value) return
  showStudents.value = !showStudents.value
}

function unactiveMonthsStartMonth(monthValue) {
  return monthValue > (endMonth.value?.value ?? 0)
}

function unactiveMonthsEndMonth(monthValue) {
  return monthValue < (startMonth.value?.value ?? 0)
}

async function gerarPDF() {
  if (disableButton.value || isGeneratingPdf.value) return

  isGeneratingPdf.value = true

  await new Promise((resolve) => {
    setTimeout(resolve, 900)
  })

  isGeneratingPdf.value = false
  alert('Gerando relatório em PDF...')
}
</script>

<template>
  <section>
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
            >
              <template #option="item">
                <div>
                  <span
                    :id="`month-start-${item.value}`"
                    :class="{ 'text-muted': unactiveMonthsStartMonth(item.value) }"
                  >
                    {{ item.label }}
                  </span>
                  <BTooltip
                    v-if="unactiveMonthsStartMonth(item.value)"
                    :target="`month-start-${item.value}`"
                    triggers="hover"
                  >
                    O mês inicial não pode ser maior que o mês final
                  </BTooltip>
                </div>
              </template>
            </ESelect>
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
            >
              <template #option="item">
                <div>
                  <span
                    :id="`month-end-${item.value}`"
                    :class="{ 'text-muted': unactiveMonthsEndMonth(item.value) }"
                  >
                    {{ item.label }}
                  </span>
                  <BTooltip
                    v-if="unactiveMonthsEndMonth(item.value)"
                    :target="`month-end-${item.value}`"
                    triggers="hover"
                  >
                    O mês final não pode ser maior que o mês inicial
                  </BTooltip>
                </div>
              </template>
            </ESelect>
          </BFormGroup>
        </BCol>
      </BRow>
    </BCard>

    <!-- ── Card 2: Opções do relatório ──────────────────────────────── -->
    <BCard class="mb-2">
      <BOverlay :show="loading">
        <div class="studentEvidence-report studentEvidence-reportOptions">
          <h3 class="text-body">Selecione as opções que serão exibidas no relatório</h3>
          <hr />

          <!-- Opção 1: Painel Geral -->
          <div class="studentEvidence-option">
            <BFormCheckbox
              v-model="optDashboard"
              class="studentEvidence-optionCheckbox"
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
            <BFormCheckbox
              v-model="optClassProficiency"
              class="studentEvidence-optionCheckbox"
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
            <BFormCheckbox
              v-model="allStudentsSelected"
              :indeterminate="indeterminate"
              class="studentEvidence-optionCheckbox"
              aria-describedby="students"
              aria-controls="students"
              @change="toggleAll"
            />
            <div class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">3 - Habilidades por Alunos</h2>
              <p class="studentEvidence-optionLegend">
                <strong
                  class="studentEvidence-showStudents"
                  :class="{ 'studentEvidence-disabled': !hasStudents }"
                  @click="changeShowStudents"
                >Clique aqui</strong>
                para gerar os dados de habilidade de um aluno específico.
              </p>
            </div>
          </div>

          <div v-if="showStudents" class="studentEvidence-students">
            <BFormCheckboxGroup
              id="students"
              v-model="selectedStudents"
              :options="studentsMock"
              class="student-group"
              value-field="id"
              text-field="name"
            />
          </div>
        </div>
      </BOverlay>
    </BCard>

    <!-- ── Card 3: Botão PDF ─────────────────────────────────────────── -->
    <BCard>
      <div>
        <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
          <span
            id="reportToPdf"
            class="d-inline-block"
            tabindex="0"
          >
            <BButton
              class="button d-flex align-items-center justify-content-center gap-2"
              variant="primary"
              :disabled="disableButton || isGeneratingPdf"
              tabindex="1"
              @click="gerarPDF"
            >
              <BSpinner v-if="isGeneratingPdf" small variant="light" />
              <span v-else class="material-symbols-outlined">picture_as_pdf</span>
              Gerar relatório em PDF
            </BButton>
          </span>
          <BTooltip target="reportToPdf" triggers="hover" :disabled="!disableButton">
            Selecione uma opção para habilitar a exportação em PDF
          </BTooltip>
        </div>
      </div>
    </BCard>
  </section>
</template>

<style scoped>
.studentEvidence-report hr {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}

.studentEvidence-reportOptions {
  background: var(--white);
  border-radius: 10px;
}

.studentEvidence-optionTitle {
  font-weight: 500;
  font-size: var(--font-size-base);
  line-height: 22px;
  color: var(--gray-900);
  margin: 0;
}

.studentEvidence-optionLegend {
  font-weight: 400;
  font-size: var(--font-size-base);
  line-height: 19px;
  color: var(--ec-body);
  margin: 0;
}

.studentEvidence-option {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.studentEvidence-optionCheckbox {
  flex-shrink: 0;
}

:deep(.studentEvidence-optionCheckbox .form-check-input) {
  width: 1.1em;
  height: 1.1em;
  margin-top: 0;
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

:deep(.student-group) {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
}

:deep(.student-group .form-check) {
  margin-bottom: 0;
}

:deep(.student-group .form-check-label) {
  color: var(--ec-text);
}

@media (max-width: 768px) {
  :deep(.student-group) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.studentEvidence-showStudents {
  color: var(--primary);
  text-decoration: underline;
  cursor: pointer;
}

.studentEvidence-disabled {
  color: var(--ec-muted) !important;
  text-decoration: none;
  cursor: not-allowed;
}
</style>
