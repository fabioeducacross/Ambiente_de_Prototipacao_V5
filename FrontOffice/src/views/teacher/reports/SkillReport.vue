<script setup>
import { ref } from 'vue'
import { BCard, BRow, BCol, BFormGroup, BButton } from 'bootstrap-vue-next'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import SelectSubject from '@/components/base/SelectSubject.vue'
import ESelect from '@/components/base/ESelect.vue'

const subject = ref({ id: 1, name: 'Matemática' })

const bnccList = [
  { id: 1, name: 'BNCC 1º Ano' },
  { id: 2, name: 'BNCC 2º Ano' },
  { id: 3, name: 'BNCC 3º Ano' },
]

const periodOptions = [
  { id: 1, name: 'Todo o período' },
  { id: 2, name: 'Última semana' },
  { id: 3, name: 'Último mês' },
]

const bncc = ref(bnccList[0])
const period = ref(periodOptions[0])

const expandedGroups = ref(new Set())

function toggleGroup(index) {
  if (expandedGroups.value.has(index)) {
    expandedGroups.value.delete(index)
  } else {
    expandedGroups.value.add(index)
  }
  // trigger reactivity
  expandedGroups.value = new Set(expandedGroups.value)
}

const skillGroups = [
  {
    title: 'Números',
    percent: 72,
    skills: [
      { code: 'EF07MA01', desc: 'Calcular potências e raízes', students: 28, avg: 80 },
      { code: 'EF07MA02', desc: 'Números racionais e suas operações', students: 28, avg: 65 },
      { code: 'EF07MA03', desc: 'Resolver problemas com números inteiros', students: 28, avg: 70 },
    ],
  },
  {
    title: 'Álgebra',
    percent: 54,
    skills: [
      { code: 'EF07MA13', desc: 'Equações do 1º grau com uma incógnita', students: 28, avg: 58 },
      { code: 'EF07MA14', desc: 'Inequações e representação na reta numérica', students: 28, avg: 50 },
    ],
  },
  {
    title: 'Geometria',
    percent: 68,
    skills: [
      { code: 'EF07MA19', desc: 'Ângulos formados por transversal com retas paralelas', students: 28, avg: 63 },
      { code: 'EF07MA20', desc: 'Triângulos: relações entre lados e ângulos', students: 28, avg: 73 },
    ],
  },
  {
    title: 'Grandezas e Medidas',
    percent: 61,
    skills: [
      { code: 'EF07MA28', desc: 'Resolver problemas de área e perímetro', students: 28, avg: 61 },
      { code: 'EF07MA29', desc: 'Conversão de unidades de medida', students: 28, avg: 60 },
    ],
  },
]
</script>

<template>
  <section>
    <div class="report-top-stack">
      <ClassSelector school-name="Colégio Nova Jornada" :show-school-year="false" />
      <AppBreadcrumb />
    </div>

    <BCard class="skill-filter-card mb-2">
      <BRow class="g-3 align-items-end">
        <BCol cols="12" md="auto">
          <SelectSubject v-model="subject" />
        </BCol>

        <BCol cols="12" md>
          <BFormGroup label="Matriz/Currículo" label-for="bncc">
            <ESelect
              v-model="bncc"
              :options="bnccList"
              label="name"
              :clearable="false"
              :searchable="false"
            />
          </BFormGroup>
        </BCol>

        <BCol cols="12" md>
          <BFormGroup label="Período" label-for="period">
            <ESelect
              v-model="period"
              :options="periodOptions"
              label="name"
              :clearable="false"
              :searchable="false"
            >
              <template #selected-option="item">
                <span class="period-pill">{{ item.name }}</span>
              </template>
            </ESelect>
          </BFormGroup>
        </BCol>
      </BRow>
    </BCard>

    <div
      v-for="(group, idx) in skillGroups"
      :key="group.title"
      class="skill-card mb-2"
      :class="{ open: expandedGroups.has(idx) }"
    >
      <!-- Header (clicável) -->
      <div
        class="skill-card-header d-flex align-items-center justify-content-between gap-3 flex-wrap"
        role="tab"
        :aria-expanded="expandedGroups.has(idx)"
        @click="toggleGroup(idx)"
      >
        <h4 class="skill-title mb-0">{{ group.title }}</h4>

        <div class="skill-metrics d-flex align-items-center gap-3">
          <div class="skill-progress">
            <span class="skill-progress-label">Rendimento do Ano Escolar</span>
            <span class="skill-progress-track">
              <span
                class="skill-progress-fill"
                :style="{ width: `${group.percent}%` }"
              />
            </span>
            <span class="skill-progress-value">{{ group.percent }}%</span>
          </div>

          <span
            class="material-symbols-outlined skill-chevron"
            :class="{ rotated: expandedGroups.has(idx) }"
          >expand_more</span>
        </div>
      </div>

      <!-- Body (expansível) -->
      <div v-show="expandedGroups.has(idx)" class="skill-card-body">
        <div
          v-for="skill in group.skills"
          :key="skill.code"
          class="skill-row d-flex align-items-center justify-content-between flex-wrap gap-2"
        >
          <div>
            <span class="skill-code">{{ skill.code }}</span>
            <p class="skill-desc mb-0">{{ skill.desc }}</p>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="skill-students text-muted">{{ skill.students }} alunos</span>
            <span
              class="skill-badge"
              :class="skill.avg >= 70 ? 'badge-success' : skill.avg >= 50 ? 'badge-warning' : 'badge-danger'"
            >{{ skill.avg }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <BButton variant="outline-primary" size="sm" class="px-3">
        <span class="material-symbols-outlined align-middle me-1" style="font-size:16px">file_download</span>
        Exportar em Excel
      </BButton>
    </div>
  </section>
</template>

<style scoped>
.report-top-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.skill-filter-card {
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

.skill-card {
  background: #fff;
  border: 1px solid var(--gray-200, #ebe9f1);
  border-radius: 0.428rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.skill-card-header {
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid transparent;
}

.skill-card-header:hover {
  background-color: rgba(0, 0, 0, 0.025);
}

.skill-card.open .skill-card-header {
  background-color: rgba(115, 103, 240, 0.05);
  border-bottom-color: var(--gray-200, #ebe9f1);
}

.skill-card-body {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--gray-200, #ebe9f1);
}

.skill-row {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200, #ebe9f1);
}

.skill-row:last-child {
  border-bottom: none;
}

.skill-code {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
}

.skill-desc {
  font-size: 0.9rem;
  color: var(--gray-700, #5e5873);
}

.skill-students {
  font-size: 0.8rem;
}

.skill-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
}

.skill-badge.badge-success { background: var(--success); }
.skill-badge.badge-warning { background: var(--warning); }
.skill-badge.badge-danger  { background: var(--danger); }

.skill-chevron {
  font-size: 20px;
  color: var(--gray-500);
  transition: transform 0.25s ease;
}

.skill-chevron.rotated {
  transform: rotate(-180deg);
}

/* ─── Titles & metrics ─── */
.skill-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--gray-700);
}

.skill-metrics {
  margin-left: auto;
}

.skill-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  min-width: 210px;
}

.skill-progress-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-500);
}

.skill-progress-track {
  width: 100%;
  height: 4px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-progress-fill {
  display: block;
  height: 100%;
  background: var(--primary);
  border-radius: var(--radius-full);
}

.skill-progress-value {
  font-size: 0.75rem;
  color: var(--gray-500);
}


.period-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  background: var(--primary);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
