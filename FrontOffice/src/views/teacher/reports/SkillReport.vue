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

const skillGroups = [
  { title: 'Números', percent: 0 },
  { title: 'Álgebra', percent: 0 },
  { title: 'Geometria', percent: 0 },
  { title: 'Grandezas e Medidas', percent: 0 },
]
</script>

<template>
  <section>
    <div class="report-top-stack">
      <ClassSelector school-name="Colégio Nova Jornada" />
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

    <BCard
      v-for="group in skillGroups"
      :key="group.title"
      class="skill-card mb-2"
    >
      <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap">
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

          <span class="material-symbols-outlined skill-chevron">expand_more</span>
        </div>
      </div>
    </BCard>

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
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

.skill-card :deep(.card-body) {
  padding: 1rem 1.25rem;
}

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

.skill-chevron {
  font-size: 20px;
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
