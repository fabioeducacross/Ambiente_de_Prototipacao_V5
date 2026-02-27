<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { BCard, BCol, BRow } from 'bootstrap-vue-next'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import ProgressBarHorizontalV2 from '@/components/base/ProgressBarHorizontalV2.vue'
import LegendEnum from '@/components/base/LegendEnum.vue'

const route = useRoute()

const activeTab = ref('alunos')
const tabs = [
  { key: 'alunos', label: 'Alunos' },
  { key: 'jogos', label: 'Jogos' },
  { key: 'ranking', label: 'Ranking da missão' },
]

const missionId = computed(() => route.params.missionId ?? '1')
const missionTitle = computed(() => route.query.title || 'Missão Finalizada do Fundamental 2')
const missionStart = computed(() => route.query.start || '09/08/2024')
const missionEnd = computed(() => route.query.end || '22/08/2024')
const missionClass = computed(() => route.query.classLabel || '8º ano C - Tarde')
const missionSchoolYear = computed(() => route.query.schoolYear || '8º ano')

const summaryCards = [
  { title: 'Progresso médio', value: '84%', subtitle: 'Satisfatório', icon: 'trending_up', tone: 'success' },
  { title: 'Rendimento médio', value: '80%', subtitle: 'Avançado', icon: 'checklist', tone: 'primary' },
  { title: 'Tempo médio investido', value: '43min 12s', subtitle: '', icon: 'timelapse', tone: 'primary' },
  { title: 'Total de desafios realizados', value: '900', subtitle: '', icon: 'extension', tone: 'primary' },
]

const strengthPoints = [
  { icon: 'calculate', title: 'Adição e subtração', value: '92%' },
  { icon: 'architecture', title: 'Construção de um ângulo reto (90°)', value: '91%' },
  { icon: 'square', title: 'O metro quadrado, seus múltiplos e submúltiplos', value: '85%' },
]

const improvePoints = [
  { icon: 'architecture', title: 'Área do retângulo', value: '5%' },
  { icon: 'calculate', title: 'Multiplicação e divisão', value: '11%' },
  { icon: 'functions', title: 'Expressões algébricas', value: '25%' },
]

const missionTurns = [
  { id: 1, title: 'Adição e subtração', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA01', icon: 'calculate', tone: 'warning', image: '/img/missions/custom.svg' },
  { id: 2, title: 'Construção de um ângulo reto (90°)', knowledge: 'Construções e transformações geométricas', theme: 'Geometria', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA15', icon: 'architecture', tone: 'primary', image: '/img/missions/educacross.svg' },
  { id: 3, title: 'Multiplicação e divisão', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: null, avgTime: '6min 25s', tag: 'EF08MA15', icon: 'calculate', tone: 'warning', image: '/img/missions/shared.svg' },
  { id: 4, title: 'Potências de base 10', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: null, avgTime: '6min 25s', tag: 'EF06MA15', icon: 'deployed_code', tone: 'info', image: '/img/missions/books.svg' },
  { id: 5, title: 'Expressões algébricas', knowledge: 'Expressões algébricas e monômios', theme: 'Álgebra', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA06', icon: 'functions', tone: 'info', image: '/img/missions/inclusion.svg' },
]

const progressLegends = [
  {
      text: 'Progresso',
      enum: [
        { text: 'Finalizado = 100%', color: 'var(--success-dark)' },
        { text: 'Satisfatório ≥ 80%', color: 'var(--success)' },
        { text: 'Moderado ≥ 50%', color: 'var(--warning)' },
        { text: 'Crítico < 50%', color: 'var(--danger)' },
      ],
    },
  {
      text: 'Rendimento',
      enum: [
        { text: 'Avançado ≥ 70% de acertos', color: 'var(--primary)' },
        { text: 'Proficiente ≥ 50% de acertos', color: 'var(--success)' },
        { text: 'Básico ≥ 25% de acertos', color: 'var(--warning)' },
        { text: 'Abaixo do Básico < 25% de acertos', color: 'var(--danger)' },
      ],
    },
  ]

const toneClass = (tone) => ({
  success: 'tone-success',
  warning: 'tone-warning',
  primary: 'tone-primary',
  info: 'tone-info',
}[tone] || 'tone-primary')

const progressVariant = (percent) => {
  if (percent >= 100) return { variant: 'success', textClass: 'text-success', color: 'var(--success-dark)' }
  if (percent >= 80) return { variant: 'success', textClass: 'text-success', color: 'var(--success)' }
  if (percent >= 50) return { variant: 'warning', textClass: 'text-warning', color: 'var(--warning)' }
  return { variant: 'danger', textClass: 'text-danger', color: 'var(--danger)' }
}

const performanceVariant = (percent) => {
  if (percent >= 70) return { variant: 'primary', textClass: 'text-primary', color: 'var(--primary)' }
  if (percent >= 50) return { variant: 'success', textClass: 'text-success', color: 'var(--success)' }
  if (percent >= 25) return { variant: 'warning', textClass: 'text-warning', color: 'var(--warning)' }
  return { variant: 'danger', textClass: 'text-danger', color: 'var(--danger)' }
}
</script>

<template>
  <section class="mission-report-page">
    <div class="report-top-stack">
      <ClassSelector school-name="COLÉGIO FLORESTA ENCANTADA" />
      <span class="feature-disabled">Função desabilitada</span>
      <AppBreadcrumb />
    </div>

    <div class="tabs-row d-flex">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        type="button"
        class="tab-link"
        :style="`--offset: -10px; --index: ${index}; z-index: ${activeTab === tab.key ? tabs.length : tabs.length - index}`"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-line mb-2" />

    <BCard class="mission-head-card mb-2">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div class="d-flex align-items-center gap-1 flex-wrap">
          <span class="mission-chip-icon material-symbols-outlined">target</span>
          <strong class="mission-chip-title">{{ missionTitle }}</strong>
          <span class="mission-chip-date">· {{ missionStart }} a {{ missionEnd }}</span>
          <span class="mission-chip-status">Finalizada</span>
        </div>
        <div class="d-flex align-items-center gap-1">
          <span class="mission-chip-class">{{ missionClass }}</span>
          <span class="mission-chip-year">{{ missionSchoolYear }}</span>
        </div>
      </div>
    </BCard>

    <BRow class="g-2 mb-2">
      <BCol v-for="card in summaryCards" :key="card.title" cols="12" md="6" lg="3">
        <BCard class="metric-card h-100">
          <div class="d-flex align-items-start justify-content-between gap-2">
            <div class="flex-grow-1">
              <div class="metric-title">{{ card.title }}</div>
              <div class="metric-value" :class="toneClass(card.tone)">{{ card.value }}</div>
              <span v-if="card.subtitle" class="metric-pill">{{ card.subtitle }}</span>
              <button
                v-if="card.title === 'Progresso médio' || card.title === 'Rendimento médio'"
                type="button"
                class="metric-link"
              >
                Ver detalhes
              </button>
            </div>
            <span class="metric-icon material-symbols-outlined">{{ card.icon }}</span>
          </div>
        </BCard>
      </BCol>
    </BRow>

    <BRow class="g-2 mb-2">
      <BCol cols="12" lg="6">
        <BCard class="points-card h-100">
          <div class="points-header points-header-success">
            <span class="material-symbols-outlined">stars</span>
            PONTOS ADEQUADOS E FORTES
            <span class="ms-auto">RENDIMENTO</span>
          </div>
          <div v-for="item in strengthPoints" :key="item.title" class="points-row">
            <div class="d-flex align-items-center gap-1 min-w-0">
              <span class="point-icon point-icon-success material-symbols-outlined">{{ item.icon }}</span>
              <span class="point-title">{{ item.title }}</span>
            </div>
            <strong class="text-success">{{ item.value }}</strong>
          </div>
        </BCard>
      </BCol>

      <BCol cols="12" lg="6">
        <BCard class="points-card h-100">
          <div class="points-header points-header-danger">
            <span class="material-symbols-outlined">sentiment_dissatisfied</span>
            PONTOS A MELHORAR
            <span class="ms-auto">RENDIMENTO</span>
          </div>
          <div v-for="item in improvePoints" :key="item.title" class="points-row">
            <div class="d-flex align-items-center gap-1 min-w-0">
              <span class="point-icon point-icon-danger material-symbols-outlined">{{ item.icon }}</span>
              <span class="point-title">{{ item.title }}</span>
            </div>
            <strong class="text-danger">{{ item.value }}</strong>
          </div>
        </BCard>
      </BCol>
    </BRow>

    <h3 class="turns-title">Turnos da missão</h3>

    <BCard v-for="turn in missionTurns" :key="turn.id" class="turn-card mb-2">
      <div class="turn-grid">
        <div class="d-flex align-items-start gap-2">
          <div class="turn-thumb" :class="toneClass(turn.tone)">
            <img
              v-if="turn.image"
              :src="turn.image"
              :alt="turn.title"
              class="turn-thumb-image"
            />
            <span v-else class="material-symbols-outlined">{{ turn.icon }}</span>
          </div>
          <div class="min-w-0">
            <div class="turn-name">{{ turn.title }}</div>
            <div class="turn-meta">Objeto do conhecimento: <strong>{{ turn.knowledge }}</strong></div>
            <div class="turn-meta">Temática: <strong>{{ turn.theme }}</strong></div>
            <span class="turn-tag">{{ turn.tag }}</span>
          </div>
        </div>

        <div class="turn-metrics">
          <div class="metric-line">
            <span>Progresso médio da turma</span>
            <strong class="text-danger">{{ turn.progress }}%</strong>
          </div>
          <ProgressBarHorizontalV2 :value="turn.progress" :max="100" :get-variant="progressVariant" height="5px" />

          <template v-if="turn.performance !== null">
            <div class="metric-line">
              <span>Rendimento médio da turma</span>
              <strong class="text-primary">{{ turn.performance }}%</strong>
            </div>
            <ProgressBarHorizontalV2 :value="turn.performance" :max="100" :get-variant="performanceVariant" height="5px" />
          </template>

          <div class="metric-line">
            <span>Tempo médio da turma</span>
            <strong class="text-primary">{{ turn.avgTime }}</strong>
          </div>
        </div>
      </div>
    </BCard>

    <LegendEnum :legends="progressLegends" class="mb-2" :border="true" />

    <div class="mission-footer">{{ missionId }} · 2026 © Educacross. Todos os direitos reservados.</div>
  </section>
</template>

<style scoped>
.mission-report-page {
  color: #5e5873;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

.report-top-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.feature-disabled {
  width: fit-content;
  padding: 3px 10px;
  border-radius: 9999px;
  background: #e5e5e8;
  color: #6e6b7b;
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
}

.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
}

.tab-link {
  border: none;
  display: inline-block;
  position: relative;
  padding: 14px 24px 10px;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  color: #6e6b7b;
  background: #fff;
  transform: translateX(calc(var(--index) * var(--offset)));
  white-space: nowrap;
  font: 500 14px/20px 'Montserrat', Helvetica, Arial, sans-serif;
  transition: background-color .15s, color .15s;
}

.tab-link:hover,
.tab-link.active {
  background: #7367f0;
  color: #fff;
}

.tab-line {
  border: 1px solid #7367f0;
  height: 1px;
  width: 100%;
}

.mission-head-card,
.metric-card,
.points-card,
.turn-card {
  border: 1px solid #ebe9f1;
  box-shadow: 0 4px 18px rgba(34, 41, 47, 0.08);
}

.mission-chip-icon {
  color: #00cfe8;
  font-size: 18px;
}

.mission-chip-title {
  color: #5e5873;
  font: 600 16px/24px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-chip-date {
  color: #6e6b7b;
  font-size: 13px;
  line-height: 18px;
}

.mission-chip-status {
  background: rgba(115, 103, 240, 0.16);
  color: #7367f0;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
}

.mission-chip-class {
  color: #7367f0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
}

.mission-chip-year {
  background: rgba(115, 103, 240, 0.16);
  color: #7367f0;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 600;
}

.metric-title {
  font-size: 13px;
  line-height: 18px;
  color: #6e6b7b;
  margin-bottom: 2px;
}

.metric-value {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
}

.metric-icon {
  border-radius: 8px;
  background: rgba(115, 103, 240, 0.14);
  color: #7367f0;
  padding: 8px;
  font-size: 20px;
}

.metric-pill {
  display: inline-flex;
  margin-top: 6px;
  padding: 2px 9px;
  border: 1px solid #28c76f;
  border-radius: 9999px;
  color: #28c76f;
  font-size: 10px;
  line-height: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.metric-link {
  display: block;
  margin-top: 8px;
  border: none;
  padding: 0;
  background: transparent;
  color: #7367f0;
  font: 600 12px/16px 'Montserrat', Helvetica, Arial, sans-serif;
}

.points-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  margin-bottom: 4px;
  border-bottom: 1px solid #ebe9f1;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.points-header-success {
  color: #28c76f;
}

.points-header-danger {
  color: #ea5455;
}

.points-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #ebe9f1;
  font-size: 13px;
  line-height: 18px;
}

.points-row:last-child {
  border-bottom: none;
}

.point-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.point-icon {
  font-size: 16px;
  padding: 6px;
  border-radius: 8px;
  color: #fff;
}

.point-icon-success {
  background: #ff9f43;
}

.point-icon-danger {
  background: #7367f0;
}

.turns-title {
  color: #7367f0;
  margin: 12px 0 8px;
  font: 600 24px/30px 'Montserrat', Helvetica, Arial, sans-serif;
}

.turn-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 16px;
}

.turn-thumb {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.turn-thumb .material-symbols-outlined {
  color: #fff;
  font-size: 30px;
}

.turn-name {
  color: #7367f0;
  font: 600 20px/26px 'Montserrat', Helvetica, Arial, sans-serif;
  margin-bottom: 2px;
}

.turn-meta {
  color: #6e6b7b;
  font-size: 13px;
  line-height: 18px;
}

.turn-meta strong {
  color: #5e5873;
  font-weight: 600;
}

.turn-tag {
  display: inline-flex;
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 9999px;
  background: #00cfe8;
  color: #fff;
  font-size: 10px;
  line-height: 13px;
  font-weight: 700;
}

.turn-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  color: #6e6b7b;
}

:deep(.turn-metrics .progress) {
  background: #f3f2f7;
}

:deep(.turn-metrics .progress-bar) {
  border-radius: 9999px;
}

:deep(.turn-metrics > .d-flex.gap-2) {
  margin-bottom: 4px;
}

:deep(.turn-metrics > .d-flex.gap-2 > div:last-child) {
  display: none !important;
}

.mission-footer {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
  line-height: 16px;
  color: #b9b9c3;
}

.tone-success {
  color: #28c76f;
  background: rgba(40, 199, 111, 0.14);
}

.tone-warning {
  color: #ff9f43;
  background: rgba(255, 159, 67, 0.14);
}

.tone-primary {
  color: #7367f0;
  background: rgba(115, 103, 240, 0.14);
}

.tone-info {
  color: #00cfe8;
  background: rgba(0, 207, 232, 0.14);
}

@media (max-width: 992px) {
  .turn-grid {
    grid-template-columns: 1fr;
  }
}
</style>
