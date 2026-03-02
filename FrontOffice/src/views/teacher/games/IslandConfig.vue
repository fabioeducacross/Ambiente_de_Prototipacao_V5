<script setup>
import { ref, computed } from 'vue'
import SelectSubject from '@/components/base/SelectSubject.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'

// Estado — Turma
const selectedTurma = ref('5a')
const handleClassChange = (c) => { selectedTurma.value = c.id }

// Estado — Área de conhecimento
const selectedSubject = ref({ id: 1, name: 'Matemática' })

// Estado — Toggle ilha
const islandEnabled = ref(true)

// Nome dinâmico da ilha baseado na disciplina
const islandName = computed(() =>
  selectedSubject.value ? `Ilhas da ${selectedSubject.value.name}` : 'Ilhas'
)

// Anos escolares
const YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const selectedYears = ref([...YEARS]) // todos marcados por padrão

const allYearsSelected = computed(
  () => selectedYears.value.length === YEARS.length
)

const toggleAllYears = (e) => {
  selectedYears.value = e.target.checked ? [...YEARS] : []
}

const toggleYear = (year, checked) => {
  if (checked) {
    if (!selectedYears.value.includes(year)) selectedYears.value.push(year)
  } else {
    selectedYears.value = selectedYears.value.filter(y => y !== year)
  }
}

const handleSave = () => {
  // mock: noop
}
</script>

<template>
  <section>
    <!-- ClassSelector — igual à produção -->
    <ClassSelector
      :initial-class="selectedTurma"
      @class-change="handleClassChange"
    />

    <!-- Título da página -->
    <h4 class="page-title mb-4">Configure o módulo Explorar para os seus alunos</h4>

    <!-- Card 1: Área de conhecimento + Toggle ilha -->
    <div class="card mb-3">
      <div class="card-body p-0">
        <div class="row g-0 align-items-stretch">

          <!-- Coluna esquerda: Select de disciplina -->
          <div class="col-auto select-col border-end">
            <SelectSubject v-model="selectedSubject" />
          </div>

          <!-- Coluna direita: Toggle da ilha -->
          <div class="col toggle-col">
            <p class="island-title">{{ islandName }}</p>

            <div class="form-check form-switch mt-3 mb-0 ps-0">
              <input
                id="island-toggle"
                v-model="islandEnabled"
                class="form-check-input island-switch"
                type="checkbox"
                role="switch"
              />
              <label for="island-toggle" class="visually-hidden">{{ islandName }}</label>
            </div>

            <small class="d-block mt-2" style="color: rgba(47,43,61,0.55); font-size: 0.8125rem;">
              {{ islandEnabled ? 'Habilitada' : 'Desabilitada' }}
            </small>
          </div>

        </div>
      </div>
    </div>

    <!-- Card 2: Anos escolares -->
    <div class="card">
      <div class="card-body">
        <p class="years-instruction mb-3">
          Ative os jogos que aparecerão para a sua turma de acordo com o ano escolar
        </p>

        <div class="d-flex flex-wrap align-items-center gap-3 mb-4">
          <!-- "Todos os anos escolares" -->
          <div class="form-check mb-0">
            <input
              id="year-all"
              class="form-check-input"
              type="checkbox"
              :checked="allYearsSelected"
              @change="toggleAllYears"
            />
            <label class="form-check-label" for="year-all">Todos os anos escolares</label>
          </div>

          <!-- Anos individuais -->
          <div v-for="year in YEARS" :key="year" class="form-check mb-0">
            <input
              :id="`year-${year}`"
              class="form-check-input"
              type="checkbox"
              :checked="selectedYears.includes(year)"
              @change="e => toggleYear(year, e.target.checked)"
            />
            <label class="form-check-label" :for="`year-${year}`">{{ year }}° Ano</label>
          </div>
        </div>

        <button class="btn btn-primary px-4" @click="handleSave">Salvar</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
}

/* Card 1: colunas internas */
.select-col {
  padding: 1.25rem 1.5rem;
  min-width: 280px;
}

.toggle-col {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.island-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgba(47, 43, 61, 0.9);
  margin-bottom: 0;
}

/* Toggle switch tamanho e cor */
.island-switch {
  width: 2.6em;
  height: 1.35em;
  cursor: pointer;
}
.island-switch:checked {
  background-color: var(--primary);
  border-color: var(--primary);
}
.island-switch:focus {
  box-shadow: 0 0 0 0.2rem rgba(115, 103, 240, 0.25);
}

.text-enabled {
  color: #5a5a5a;
}

.status-label {
  color: rgba(47, 43, 61, 0.68);
  font-size: 0.8125rem;
}

/* Checkboxes de anos */
.years-instruction {
  color: rgba(47, 43, 61, 0.9);
  font-size: 0.9375rem;
}

.form-check-input:checked {
  background-color: var(--primary);
  border-color: var(--primary);
}
.form-check-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.2rem rgba(115, 103, 240, 0.25);
}

@media (max-width: 768px) {
  .select-col {
    min-width: 100%;
    border-end: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>

