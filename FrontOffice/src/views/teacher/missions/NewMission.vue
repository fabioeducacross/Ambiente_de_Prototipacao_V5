<script setup>
import { ref } from 'vue'
import {
  BRow, BCol, BCard, BCardTitle, BCardText,
  BBadge, BButton, BAlert,
  BFormGroup,
} from 'bootstrap-vue-next'
import ESelect from '@/components/base/ESelect.vue'
import SubjectIcon from '@/components/SubjectIcon.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'

// ─── Disciplinas (mock) ───────────────────────────────────────────────────────
const disciplinas = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'Português' },
  { id: 3, name: 'Liga' },
  { id: 4, name: 'Inglês' },
]
const disciplinaAtiva = ref(disciplinas[0])

// ─── Alert de limite ──────────────────────────────────────────────────────────
const guidesMonth = ref(0)

// ─── Tipos de missão (espelhando produção) ─────────────────────────────────────
const missions = [
  {
    type: 'custom',
    img: '/img/missions/custom.svg',
    title: 'Missão personalizada',
    description: 'Selecione jogos específicos para compor uma missão, tendo como base seu plano de aula.',
  },
  {
    type: 'educacross',
    img: '/img/missions/educacross.svg',
    title: 'Missão Educacross',
    description: 'Conjuntos de jogos sugeridos pelo nosso time pedagógico e alinhados à BNCC.',
  },
  {
    type: 'shared',
    img: '/img/missions/shared.svg',
    title: 'Missão compartilhada',
    description: 'Conjuntos de jogos sugeridos e compartilhados por professores que utilizam a plataforma.',
  },
  {
    type: 'inclusion',
    img: '/img/missions/inclusion.svg',
    isNew: true,
    title: 'Missão inclusiva',
    description: 'Conjuntos de jogos elaborados e sugeridos pelo nosso time pedagógico para atender crianças com necessidades especiais.',
  },
  {
    type: 'books',
    img: '/img/missions/books.svg',
    title: 'Missão dos livros',
    description: 'Conjuntos de jogos mapeados pelo time nosso pedagógico com base em materiais didáticos de sistemas de ensino.',
  },
]

const disableCreation = ref(false)
const loading = ref(false)
</script>

<template>
  <div>
    <!-- ClassSelector (turma + escola) -->
    <ClassSelector school-name="Colégio Nova Jornada" class="mb-2" />

    <!-- Row 1: Seletor de disciplina + card informativo -->
    <BRow class="match-height mb-2">
      <!-- Card: Área de conhecimento (SelectSubject) -->
      <BCol cols="12" md="auto">
        <BCard>
          <BFormGroup label="Área de conhecimento" label-for="subject-select" class="mb-0">
            <ESelect
              id="subject-select"
              :value="disciplinaAtiva"
              :options="disciplinas"
              label="name"
              track-by="id"
              style="min-width: 215px"
              @change="disciplinaAtiva = $event"
            >
              <template #option="item">
                <div class="d-flex align-items-center gap-1">
                  <SubjectIcon :disciplina="item.name" :size="26" />
                  <span>{{ item.name }}</span>
                </div>
              </template>
              <template #selected-option="item">
                <div class="d-flex align-items-center gap-1">
                  <SubjectIcon :disciplina="item.name" :size="26" />
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </ESelect>
          </BFormGroup>
        </BCard>
      </BCol>

      <!-- Card: Texto informativo -->
      <BCol cols="12" md>
        <BCard body-class="d-flex flex-column align-items-start justify-content-center">
          <p class="mb-0">
            Missões são conjuntos de jogos que você pode enviar para uma turma inteira ou para alunos específicos.
          </p>
          <p class="mb-0">
            Você pode criar uma <span class="font-bold text-primary">missão personalizada</span> ou
            selecionar uma das missões sugeridas pelo nosso time pedagógico ou por outros professores.
          </p>
        </BCard>
      </BCol>
    </BRow>

    <!-- Alert: limite de missões (GuidesLimitAlert) -->
    <BAlert variant="primary" :model-value="true" class="mb-2">
      <div class="alert-body">
        <div class="d-flex justify-content-center align-items-center font-normal">
          <div class="d-flex flex-column flex-lg-row align-items-center gap-1">
            <span class="material-symbols-outlined">edit_calendar</span>
            É permitida a criação de até 40 missões ao mês por turma. Este mês, você criou:
            <span class="font-bold">{{ guidesMonth }} {{ guidesMonth === 1 ? 'missão' : 'missões' }}.</span>
            <span
              class="material-symbols-outlined"
              style="font-size: 15px"
              title="Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas."
            >info</span>
          </div>
        </div>
      </div>
    </BAlert>

    <!-- Row 2: Cards de tipo de missão -->
    <BRow v-if="!loading" class="match-height">
        <BCol
          v-for="mission in missions"
          :key="mission.type"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <BCard
            :img-src="mission.img"
            :img-alt="mission.title"
            img-top
            body-class="d-flex flex-column align-items-center justify-content-center text-center"
            class="mission-card"
          >
            <BBadge
              v-if="mission.isNew"
              pill
              variant="light-info"
              class="mb-1"
            >
              Super novo
            </BBadge>

            <BCardTitle title-tag="h3">
              <span class="text-primary h3 align-middle">{{ mission.title }}</span>
            </BCardTitle>

            <BCardText>{{ mission.description }}</BCardText>

            <div class="d-flex justify-content-center mt-auto">
              <BButton
                class="d-flex align-items-center justify-content-center gap-1"
                variant="primary"
                :disabled="disableCreation"
              >
                <span class="material-symbols-outlined">add_circle</span>
                Nova missão
              </BButton>
            </div>
          </BCard>
        </BCol>
      </BRow>
  </div>
</template>

<style scoped>
/* ─── Mission cards ───────────────────────────────────────────────────────── */
.mission-card {
  border: 1px solid rgba(47, 43, 61, .08);
  transition: box-shadow .2s ease, transform .15s ease;
  cursor: pointer;
}
.mission-card:hover {
  box-shadow: 0 4px 18px rgba(110, 99, 232, .18);
  transform: translateY(-3px);
}
:deep(.mission-card .card-img-top) {
  object-fit: cover;
  width: 100%;
}
</style>


