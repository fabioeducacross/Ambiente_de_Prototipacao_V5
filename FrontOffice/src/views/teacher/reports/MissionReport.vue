<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { BCard, BCol, BRow } from 'bootstrap-vue-next'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import ProgressBarHorizontalV2 from '@/components/base/ProgressBarHorizontalV2.vue'
import { getProgressoTone, getRendimentoTone } from '@/shared/data/tones.js'

const route = useRoute()

const activeTab = ref('alunos')
const tabs = [
  { key: 'alunos', label: 'Alunos' },
  { key: 'jogos', label: 'Jogos' },
  { key: 'ranking', label: 'Ranking da missão' },
]

const missionTitle = computed(() => route.query.title || 'Missão Finalizada do Fundamental 2')
const missionStart = computed(() => route.query.start || '09/08/2024')
const missionEnd = computed(() => route.query.end || '22/08/2024')
const missionClass = computed(() => route.query.classLabel || '8º ano C - Tarde')
const missionSchoolYear = computed(() => route.query.schoolYear || '8º ano')
const currentYear = new Date().getFullYear()

const withBase = (assetPath) => `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, '')}`

const figmaPointsHeaderIcon = withBase('assets/figma-report/family-star.svg')
const figmaPointsIconMath = withBase('assets/figma-report/math-icon.svg')
const figmaPointsIconGeometry = withBase('assets/figma-report/math1-icon.svg')
const figmaPointsIconRuler = withBase('assets/figma-report/ruler-icon.svg')
const figmaImproveHeaderIcon = withBase('assets/figma-report/sentiment-dissatisfied.svg')
const figmaImproveIconGeometry = withBase('assets/figma-report/math1-icon.svg')
const figmaImproveIconMath = withBase('assets/figma-report/math-icon.svg')
const figmaImproveIconFunction = withBase('assets/figma-report/function-icon.svg')
const figmaMissionHeaderTargetIcon = withBase('assets/figma-report/target-icon.svg')
const figmaTurnPotenciasImage = withBase('assets/figma-report/potencias-image.png')
const figmaFooterFacebookIcon = withBase('assets/figma-report/facebook-icon.svg')
const figmaFooterYoutubeIcon = withBase('assets/figma-report/youtube-icon.svg')
const figmaFooterInstagramIcon = withBase('assets/figma-report/instagram-icon.svg')
const figmaMetricProgressIcon = withBase('assets/figma-report/timeline-progress-icon.svg')

const mediaProgressItems = [
  { label: 'Jogo', completed: 20, total: 20, value: 100 },
  { label: 'Questões', completed: 17, total: 20, value: 85 },
  { label: 'Livro', completed: 10, total: 20, value: 50 },
  { label: 'Vídeo', completed: 9, total: 20, value: 45 },
  { label: 'Música', completed: 12, total: 20, value: 60 },
]

const mediaPerformanceItems = [
  { label: 'Jogos', completed: 16, total: 20, value: 80 },
  { label: 'Questões', completed: 15, total: 20, value: 75 },
  { label: 'Livros', completed: 11, total: 20, value: null },
  { label: 'Vídeos', completed: 6, total: 20, value: null },
  { label: 'Músicas', completed: 4, total: 20, value: null },
]

const mediaTimeItems = [
  { label: 'Jogos', completed: 20, total: 20, seconds: 2325 },
  { label: 'Questões', completed: 20, total: 20, seconds: 2470 },
  { label: 'Livros', completed: 20, total: 20, seconds: 2660 },
  { label: 'Vídeos', completed: 20, total: 20, seconds: 2895 },
  { label: 'Músicas', completed: 20, total: 20, seconds: 1980 },
]

const mediaChallengeItems = [
  { label: 'Jogos', value: 260 },
  { label: 'Questões', value: 220 },
  { label: 'Livros', value: 140 },
  { label: 'Vídeos', value: 170 },
  { label: 'Músicas', value: 110 },
]

const activeMetricDrawer = ref(null)

const progressCard = computed(() => summaryCards.value.find((card) => card.key === 'progress') || null)
const performanceCard = computed(() => summaryCards.value.find((card) => card.key === 'performance') || null)
const challengesCard = computed(() => summaryCards.value.find((card) => card.key === 'challenges') || null)
const timeCard = computed(() => summaryCards.value.find((card) => card.key === 'time') || null)
const isMetricDrawerOpen = computed(() => activeMetricDrawer.value !== null)
const isProgressDrawer = computed(() => activeMetricDrawer.value === 'progress')
const isPerformanceDrawer = computed(() => activeMetricDrawer.value === 'performance')
const isChallengesDrawer = computed(() => activeMetricDrawer.value === 'challenges')
const isTimeDrawer = computed(() => activeMetricDrawer.value === 'time')

const isMetricCardWithDrawer = (card) => card.key === 'progress' || card.key === 'performance' || card.key === 'challenges' || card.key === 'time'

const openMetricDrawer = (card) => {
  if (!isMetricCardWithDrawer(card)) return
  activeMetricDrawer.value = card.key
}

const closeMetricDrawer = () => {
  activeMetricDrawer.value = null
}

const getPerformanceToneClass = (value) =>
  `metric-drawer-item-bar-fill-${getProgressoTone(value).key}`

const getPerformanceLabel = (value) =>
  getProgressoTone(value).label

const hasPerformanceData = (value) => value !== null && value !== undefined

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}min ${String(secs).padStart(2, '0')}s`
}

const getPerformanceLevelLabel = (value) =>
  getRendimentoTone(value)?.label ?? 'Abaixo do Básico'

const avgProgressValue = computed(() => {
  if (!mediaProgressItems.length) return 0
  const total = mediaProgressItems.reduce((sum, item) => sum + item.value, 0)
  return Math.round(total / mediaProgressItems.length)
})

const avgPerformanceValue = computed(() => {
  const measuredItems = mediaPerformanceItems.filter((item) => hasPerformanceData(item.value))
  if (!measuredItems.length) return null
  const total = measuredItems.reduce((sum, item) => sum + item.value, 0)
  return Math.round(total / measuredItems.length)
})

const avgTimeSeconds = computed(() => {
  if (!mediaTimeItems.length) return 0
  const total = mediaTimeItems.reduce((sum, item) => sum + item.seconds, 0)
  return Math.round(total / mediaTimeItems.length)
})

const totalChallenges = computed(() => mediaChallengeItems.reduce((sum, item) => sum + item.value, 0))

const summaryCards = computed(() => [
  {
    key: 'progress',
    title: 'Progresso médio',
    value: `${avgProgressValue.value}%`,
    subtitle: getPerformanceLabel(avgProgressValue.value),
    icon: 'trending_up',
    iconUrl: figmaMetricProgressIcon,
    iconTone: 'primary',
    tone: 'success',
    bar: avgProgressValue.value,
  },
  {
    key: 'performance',
    title: 'Rendimento médio',
    value: avgPerformanceValue.value === null ? '—' : `${avgPerformanceValue.value}%`,
    subtitle: avgPerformanceValue.value === null ? '' : getPerformanceLevelLabel(avgPerformanceValue.value),
    icon: 'checklist',
    tone: 'primary',
    bar: avgPerformanceValue.value === null ? 0 : avgPerformanceValue.value,
  },
  {
    key: 'time',
    title: 'Tempo médio investido',
    value: formatDuration(avgTimeSeconds.value),
    subtitle: '',
    icon: 'timelapse',
    tone: 'primary',
  },
  {
    key: 'challenges',
    title: 'Total de desafios realizados',
    value: String(totalChallenges.value),
    subtitle: '',
    icon: 'extension',
    tone: 'primary',
  },
])

const strengthPoints = [
  { iconUrl: figmaPointsIconMath, iconTone: 'warning', title: 'Adição e subtração', value: '92%' },
  { iconUrl: figmaPointsIconGeometry, iconTone: 'primary', title: 'Construção de um ângulo reto (90°)', value: '91%' },
  { iconUrl: figmaPointsIconRuler, iconTone: 'ruler', title: 'O metro quadrado, seus múltiplos e submúltiplos', value: '85%' },
]

const improvePoints = [
  { iconUrl: figmaImproveIconGeometry, iconTone: 'primary', title: 'Área do retângulo', value: '5%' },
  { iconUrl: figmaImproveIconMath, iconTone: 'warning', title: 'Multiplicação e divisão', value: '11%' },
  { iconUrl: figmaImproveIconFunction, iconTone: 'danger', title: 'Expressões algébricas', value: '25%' },
]

const pointsSections = [
  {
    key: 'strength',
    title: 'PONTOS ADEQUADOS E FORTES',
    headerClass: 'points-header-success',
    headerIcon: figmaPointsHeaderIcon,
    valueClass: 'text-success',
    items: strengthPoints,
  },
  {
    key: 'improve',
    title: 'PONTOS A MELHORAR',
    headerClass: 'points-header-danger',
    headerIcon: figmaImproveHeaderIcon,
    valueClass: 'text-danger',
    items: improvePoints,
  },
]

const missionTurns = [
  { id: 1, mediaType: 'jogos', title: 'Adição e subtração', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA01', icon: 'sports_esports', tone: 'warning', image: withBase('img/missions/custom.svg') },
  { id: 2, mediaType: 'questoes', title: 'Construção de um ângulo reto (90°)', knowledge: 'Construções e transformações geométricas', theme: 'Geometria', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA15', icon: 'quiz', tone: 'primary', image: withBase('img/missions/educacross.svg') },
  { id: 3, mediaType: 'livros', title: 'Multiplicação e divisão', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: null, avgTime: '6min 25s', tag: 'EF08MA15', icon: 'book_5', tone: 'primary', image: withBase('img/missions/shared.svg') },
  { id: 4, mediaType: 'videos', title: 'Potências de base 10', knowledge: 'Notação Científica', theme: 'Números', progress: 20, performance: null, avgTime: '6min 25s', tag: 'EF06MA15', icon: 'smart_display', tone: 'info', image: figmaTurnPotenciasImage },
  { id: 5, mediaType: 'musica', title: 'Expressões algébricas', knowledge: 'Expressões algébricas e monômios', theme: 'Álgebra', progress: 20, performance: null, avgTime: '6min 25s', tag: 'EF08MA06', icon: 'music_note', tone: 'success', image: withBase('img/missions/collective.svg') },
  { id: 6, mediaType: 'jogos', title: 'Frações e equivalências', knowledge: 'Números racionais e equivalência de frações', theme: 'Números', progress: 20, performance: 80, avgTime: '6min 25s', tag: 'EF08MA07', icon: 'sports_esports', tone: 'warning', image: withBase('img/missions/custom.svg') },
]

const mediaTypeLabelMap = {
  jogos: 'Jogos',
  questoes: 'Questões',
  livros: 'Livros',
  videos: 'Vídeos',
  musica: 'Músicas',
}

// Mapa canônico de ícones — 3 confirmados em produção, 2 sugestões para o protótipo
const mediaTypeIconMap = {
  jogos:    { icon: 'sports_esports', tone: 'warning' },   // ✓ MissionReportGames.vue
  questoes: { icon: 'quiz',            tone: 'primary' },   // ✓ teacher.js nav
  livros:   { icon: 'book_5',          tone: 'primary' },   // ✓ GeneralDashboard.vue
  videos:   { icon: 'smart_display',   tone: 'info' },      // ⚠ sugestão protótipo
  musica:   { icon: 'music_note',      tone: 'success' },   // ⚠ sugestão protótipo
}

const getMediaTypeTag = (mediaType) => mediaTypeIconMap[mediaType] || { icon: 'category', tone: 'muted' }

const getTurnMediaTypeLabel = (turn) => mediaTypeLabelMap[turn.mediaType] || 'Não definido'

const mediaTypeByLabelMap = Object.fromEntries(
  Object.entries(mediaTypeLabelMap).map(([mediaType, label]) => [label, mediaType])
)

const getDrawerMediaIcon = (label) => getMediaTypeTag(mediaTypeByLabelMap[label])?.icon || 'category'

const mediaTypesWithoutPerformance = new Set(['livros', 'videos', 'musica'])
const shouldShowTurnPerformance = (turn) => !mediaTypesWithoutPerformance.has(turn.mediaType) && turn.performance !== null && turn.performance !== undefined

const toneClass = (tone) => ({
  success: 'tone-success',
  warning: 'tone-warning',
  primary: 'tone-primary',
  info: 'tone-info',
  trilha: 'tone-trilha',
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
        <div class="d-flex align-items-center flex-wrap mission-head-left">
          <img :src="figmaMissionHeaderTargetIcon" alt="" class="mission-chip-icon-image" />
          <strong class="mission-chip-title">{{ missionTitle }}</strong>
          <span class="mission-chip-date">· {{ missionStart }} a {{ missionEnd }}</span>
          <span class="mission-chip-status">Finalizada</span>
        </div>
        <div class="d-flex align-items-center mission-head-right">
          <span class="mission-chip-class">{{ missionClass }}</span>
          <span class="mission-chip-year">{{ missionSchoolYear }}</span>
        </div>
      </div>
    </BCard>

    <BRow class="g-2 mb-2">
      <BCol v-for="card in summaryCards" :key="card.title" cols="12" md="6" lg="3">
        <BCard
          class="metric-card h-100"
          :class="{
            'metric-card-with-bar': card.bar,
            'metric-card-plain': !card.bar,
            'metric-card-clickable': isMetricCardWithDrawer(card),
          }"
          @click="openMetricDrawer(card)"
        >
          <div class="metric-content">
            <div class="metric-main">
              <div class="metric-text" :class="{ 'metric-text-with-bar': card.bar, 'metric-text-plain': !card.bar }">
                <div class="metric-title">{{ card.title }}</div>
                <template v-if="card.bar">
                  <div class="metric-bar">
                    <span class="metric-bar-fill" :class="`metric-bar-fill-${card.tone}`" :style="{ width: `${card.bar}%` }" />
                  </div>
                  <div class="metric-meta">
                    <div class="metric-value" :class="`metric-value-${card.tone}`">{{ card.value }}</div>
                    <span v-if="card.subtitle" class="metric-pill" :class="`metric-pill-${card.tone}`">{{ card.subtitle }}</span>
                  </div>
                </template>
                <div v-else class="metric-value" :class="`metric-value-${card.tone}`">{{ card.value }}</div>
              </div>
              <span class="metric-icon" :class="`metric-icon-${card.iconTone || card.tone}`">
                <img v-if="card.iconUrl" :src="card.iconUrl" alt="" class="metric-icon-image" />
                <span v-else class="material-symbols-outlined">{{ card.icon }}</span>
              </span>
            </div>
            <button type="button" class="metric-link" @click.stop="openMetricDrawer(card)">
              <span>Ver detalhes</span>
              <i class="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </BCard>
      </BCol>
    </BRow>

    <BRow class="g-2 mb-2">
      <BCol v-for="section in pointsSections" :key="section.key" cols="12" lg="6">
        <BCard class="points-card h-100">
          <div class="points-header" :class="section.headerClass">
            <img :src="section.headerIcon" alt="" class="points-header-icon" />
            {{ section.title }}
            <span class="ms-auto">RENDIMENTO</span>
          </div>
          <div v-for="item in section.items" :key="item.title" class="points-row">
            <div class="d-flex align-items-center gap-1 min-w-0">
              <span class="point-icon" :class="`point-icon-${item.iconTone}`">
                <img :src="item.iconUrl" alt="" class="point-icon-image" />
              </span>
              <span class="point-title">{{ item.title }}</span>
            </div>
            <strong :class="section.valueClass">{{ item.value }}</strong>
          </div>
        </BCard>
      </BCol>
    </BRow>

    <h3 class="turns-title">Turnos da missão</h3>

    <BCard v-for="turn in missionTurns" :key="turn.id" class="turn-card mb-2" :data-media-type="turn.mediaType || 'unknown'">
      <div class="turn-grid">
        <div class="d-flex align-items-center turn-info-block">
          <div class="turn-thumb" :class="toneClass(turn.tone)">
            <img
              v-if="turn.image"
              :src="turn.image"
              :alt="turn.title"
              class="turn-thumb-image"
              :class="{ 'turn-thumb-image-contain': turn.imageContain }"
            />
            <span v-else class="material-symbols-outlined">{{ turn.icon }}</span>
          </div>
          <div class="min-w-0">
            <div class="turn-name">{{ turn.title }}</div>
            <div class="turn-meta">Objeto do conhecimento: <strong>{{ turn.knowledge }}</strong></div>
            <div class="turn-meta">Temática: <strong>{{ turn.theme }}</strong></div>
            <div class="turn-tag-bar">
              <span
                class="media-type-tag"
                :class="`media-type-tag--${getMediaTypeTag(turn.mediaType).tone}`"
                :title="`Tipo de mídia: ${getTurnMediaTypeLabel(turn)}`"
              >
                <span class="material-symbols-outlined media-type-tag__icon">{{ getMediaTypeTag(turn.mediaType).icon }}</span>
                {{ getTurnMediaTypeLabel(turn) }}
              </span>
              <span class="turn-tag">{{ turn.tag }}</span>
            </div>
          </div>
        </div>

        <div class="turn-metrics">
          <div class="metric-line">
            <span>Progresso médio da turma</span>
            <strong class="text-danger">{{ turn.progress }}%</strong>
          </div>
          <ProgressBarHorizontalV2 :value="turn.progress" :max="100" :get-variant="progressVariant" height="5px" />

          <template v-if="shouldShowTurnPerformance(turn)">
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

    <Transition name="fade">
      <div v-if="isMetricDrawerOpen" class="metric-drawer-overlay" @click="closeMetricDrawer" />
    </Transition>

    <Transition name="slide">
      <aside v-if="isMetricDrawerOpen" class="metric-drawer" role="dialog" aria-modal="true" aria-labelledby="metricDrawerTitle">
        <header class="metric-drawer-header">
          <h3 id="metricDrawerTitle">{{ isProgressDrawer ? 'Progresso médio por mídia' : isPerformanceDrawer ? 'Rendimento médio por mídia' : isChallengesDrawer ? 'Total de desafios por mídia' : 'Tempo médio por mídia' }}</h3>
          <button type="button" class="metric-drawer-close" aria-label="Fechar" @click="closeMetricDrawer">
            <i class="bi bi-x-lg" />
          </button>
        </header>

        <div class="metric-drawer-body">
          <div class="metric-drawer-summary">
            <span class="metric-drawer-summary-label">{{ isProgressDrawer ? 'Progresso médio da missão' : isPerformanceDrawer ? 'Rendimento médio da missão' : isChallengesDrawer ? 'Total de desafios da missão' : 'Tempo médio da missão' }}</span>
            <strong
              class="metric-drawer-summary-value"
              :class="{ 'metric-drawer-summary-value-primary': isPerformanceDrawer || isChallengesDrawer || isTimeDrawer }"
            >
              {{ isProgressDrawer ? (progressCard?.value || '—') : isPerformanceDrawer ? (performanceCard?.value || '—') : isChallengesDrawer ? (challengesCard?.value || '—') : (timeCard?.value || '—') }}
            </strong>
          </div>

          <template v-if="isProgressDrawer">
            <div class="metric-drawer-list">
              <div v-for="item in mediaProgressItems" :key="item.label" class="metric-drawer-item">
                <div class="metric-drawer-item-head">
                  <span class="metric-drawer-item-label">
                    <span class="material-symbols-outlined metric-drawer-item-icon">{{ getDrawerMediaIcon(item.label) }}</span>
                    {{ item.label }}
                  </span>
                  <strong>{{ item.completed }} de {{ item.total }}</strong>
                </div>
                <div class="metric-drawer-item-bar">
                  <span
                    class="metric-drawer-item-bar-fill"
                    :class="getPerformanceToneClass(item.value)"
                    :style="{ width: `${item.value}%` }"
                  />
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="isPerformanceDrawer">
            <div class="metric-drawer-list">
              <div v-for="item in mediaPerformanceItems" :key="item.label" class="metric-drawer-item">
                <div class="metric-drawer-item-head">
                  <span class="metric-drawer-item-label">
                    <span class="material-symbols-outlined metric-drawer-item-icon">{{ getDrawerMediaIcon(item.label) }}</span>
                    {{ item.label }}
                  </span>
                  <strong :class="{ 'metric-drawer-empty': !hasPerformanceData(item.value) }">
                    <template v-if="hasPerformanceData(item.value)">
                      {{ item.value }}%
                    </template>
                    <template v-else>Não se aplica</template>
                  </strong>
                </div>
                <template v-if="hasPerformanceData(item.value)">
                  <div class="metric-drawer-item-bar">
                    <span
                      class="metric-drawer-item-bar-fill"
                      :class="getPerformanceToneClass(item.value)"
                      :style="{ width: `${item.value}%` }"
                    />
                  </div>
                </template>
              </div>
            </div>
            <div v-if="mediaPerformanceItems.some(i => !hasPerformanceData(i.value))" class="drawer-hint drawer-hint--neutral">
              <span class="material-symbols-outlined drawer-hint-icon">info</span>
              <div>
                <p class="metric-drawer-empty-notice-title">Rendimento disponível apenas para Jogos e Questões</p>
                <p class="metric-drawer-empty-notice-desc">Em Livros, Vídeos e Músicas, exibimos apenas progresso e tempo de uso.</p>
              </div>
            </div>
          </template>

          <template v-else-if="isChallengesDrawer">
            <div class="metric-drawer-list">
              <div v-for="item in mediaChallengeItems" :key="item.label" class="metric-drawer-item">
                <div class="metric-drawer-item-head">
                  <span class="metric-drawer-item-label">
                    <span class="material-symbols-outlined metric-drawer-item-icon">{{ getDrawerMediaIcon(item.label) }}</span>
                    {{ item.label }}
                  </span>
                  <strong>{{ item.value }}</strong>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="metric-drawer-list">
              <div v-for="item in mediaTimeItems" :key="item.label" class="metric-drawer-item">
                <div class="metric-drawer-item-head">
                  <span class="metric-drawer-item-label">
                    <span class="material-symbols-outlined metric-drawer-item-icon">{{ getDrawerMediaIcon(item.label) }}</span>
                    {{ item.label }}
                  </span>
                  <strong>{{ item.completed }} de {{ item.total }}</strong>
                </div>
              </div>
            </div>
          </template>
        </div>
      </aside>
    </Transition>

    <div class="mission-footer">
      <p class="mission-footer-text">
        {{ currentYear }} © <span class="mission-footer-brand">Educacross</span>. Todos os direitos reservados.
      </p>
      <div class="mission-footer-social" aria-label="Redes sociais Educacross">
        <img :src="figmaFooterFacebookIcon" alt="Facebook" class="mission-footer-social-icon" />
        <img :src="figmaFooterYoutubeIcon" alt="YouTube" class="mission-footer-social-icon" />
        <img :src="figmaFooterInstagramIcon" alt="Instagram" class="mission-footer-social-icon" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-report-page {
  color: var(--ec-text);
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

.report-top-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
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
  color: var(--gray-600);
  background: var(--white);
  transform: translateX(calc(var(--index) * var(--offset)));
  white-space: nowrap;
  font: 500 14px/20px 'Montserrat', Helvetica, Arial, sans-serif;
  transition: background-color .15s, color .15s;
}

.tab-link:hover,
.tab-link.active {
  background: var(--primary);
  color: var(--white);
}

.tab-line {
  border: 1px solid var(--primary);
  height: 1px;
  width: 100%;
}

.mission-head-card,
.metric-card,
.points-card,
.turn-card {
  border: 1px solid var(--ec-border);
  box-shadow: var(--ec-card-shadow);
}

.mission-head-card :deep(.card-body) {
  padding: 16px 20px;
}

.metric-card {
  border-radius: var(--ec-card-radius);
}

.metric-card-clickable {
  cursor: pointer;
}

.metric-card :deep(.card-body) {
  padding: 20px;
}

.metric-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-height: 124px;
}

.metric-main {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.metric-text {
  flex: 1;
  min-width: 0;
}

.metric-text-with-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-text-with-bar .metric-meta {
  margin-top: 6px;
}

.metric-text-plain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.metric-meta {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}

.mission-head-left {
  gap: 5px;
}

.mission-head-right {
  gap: 10px;
}

.mission-chip-icon-image {
  width: 24px;
  height: 24px;
  display: block;
}

.mission-chip-title {
  color: var(--gray-700);
  font: 700 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-chip-date {
  color: var(--ec-body);
  font: 400 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-chip-status {
  background: var(--primary);
  color: var(--white);
  padding: 1px 9px;
  border-radius: 17px;
  font: 600 12px/18px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-chip-class {
  color: var(--primary);
  font: 700 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-chip-year {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
  color: var(--primary);
  padding: 1px 9px;
  border-radius: 17px;
  font: 700 12px/18px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-title {
  font-size: 16px;
  line-height: 100%;
  color: var(--ec-body);
  margin-bottom: 0;
}

.metric-value {
  display: block;
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  margin-bottom: 0;
  white-space: nowrap;
}

.metric-value-success { color: var(--success); }
.metric-value-primary { color: var(--ec-primary); }
.metric-value-warning { color: var(--warning); }
.metric-value-info    { color: var(--info); }

.metric-icon {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: color-mix(in srgb, var(--primary) 12%, var(--white));
  color: var(--ec-primary);
  font-size: 24px;
}

.metric-icon-image {
  width: 26px;
  height: 26px;
  display: block;
}

.metric-icon-success { background: color-mix(in srgb, var(--success) 14%, var(--white)); color: var(--success); }
.metric-icon-warning { background: color-mix(in srgb, var(--warning) 14%, var(--white)); color: var(--warning); }
.metric-icon-info    { background: color-mix(in srgb, var(--info)    14%, var(--white)); color: var(--info); }
.metric-icon-primary { background: color-mix(in srgb, var(--primary) 12%, var(--white)); color: var(--primary); }

.metric-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  padding: 0 5px;
  min-height: 16px;
  border: 1px solid var(--success);
  border-radius: 9999px;
  background: color-mix(in srgb, var(--success) 12%, var(--white));
  color: var(--success);
  font-size: 10px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
}

.metric-pill-primary { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 12%, var(--white)); color: var(--primary); }
.metric-pill-warning { border-color: var(--warning); background: color-mix(in srgb, var(--warning) 12%, var(--white)); color: var(--warning); }
.metric-pill-info    { border-color: var(--info); background: color-mix(in srgb, var(--info) 12%, var(--white)); color: var(--info); }
.metric-pill-danger  { border-color: var(--danger); background: color-mix(in srgb, var(--danger) 12%, var(--white)); color: var(--danger); }

.metric-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  border: none;
  padding: 10px 22px;
  border-radius: 5px;
  background: transparent;
  color: var(--primary);
  font: 500 14px/100% 'Montserrat', Helvetica, Arial, sans-serif;
  letter-spacing: 0.4px;
  cursor: pointer;
  text-align: center;
}

.metric-card-with-bar .metric-link {
  margin-top: 2px;
}

.metric-card-plain .metric-link {
  margin-top: 8px;
}

.metric-link:hover { text-decoration: underline; }

.metric-bar {
  height: 6px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--primary) 12%, var(--white));
  overflow: hidden;
}

.metric-bar-fill {
  display: block;
  height: 100%;
  border-radius: 9999px;
}

.metric-bar-fill-success {
  background: var(--success);
}

.metric-bar-fill-primary {
  background: var(--ec-primary);
}

.points-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--gray-200);
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.points-header-icon {
  width: 24px;
  height: 24px;
  display: block;
}

.points-header-success {
  color: var(--success);
}

.points-header-danger {
  color: var(--danger);
}

.points-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-200);
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
  width: 40px;
  min-width: 40px;
  flex: 0 0 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.point-icon-image {
  width: 20px;
  height: 20px;
  display: block;
}

.point-icon-success {
  background: var(--warning);
}

.point-icon-warning {
  background: var(--warning);
}

.point-icon-danger {
  background: var(--primary);
}

.point-icon-primary {
  background: var(--primary);
}

.point-icon-ruler {
  background: var(--danger);
}

.point-icon-info {
  background: var(--danger);
}

.turns-title {
  color: var(--primary);
  margin: 12px 0 8px;
  font: 600 24px/30px 'Montserrat', Helvetica, Arial, sans-serif;
}

.turn-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 356px;
  gap: 40px;
}

.turn-info-block {
  gap: 10px;
}

.turn-card :deep(.card-body) {
  padding: 20px;
}

.turn-thumb {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.turn-thumb .material-symbols-outlined {
  color: var(--white);
  font-size: 30px;
}

.turn-thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.turn-thumb-image-contain {
  object-fit: contain;
  padding: 24px;
}

.turn-name {
  color: var(--primary);
  font: 500 18px/100% 'Montserrat', Helvetica, Arial, sans-serif;
  margin-bottom: 2px;
}

.turn-meta {
  color: var(--ec-body);
  font-size: 14px;
  line-height: 21px;
}

.turn-meta strong {
  color: var(--primary);
  font-weight: 700;
}

.turn-tag-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.turn-tag {
  display: inline-flex;
  margin-top: 0;
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--category-trilha);
  color: var(--white);
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
}

/* ── Media-type tag (pill com ícone + label) ───────────── */
.media-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px 2px 6px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
}

.media-type-tag__icon {
  font-size: 14px !important;
  line-height: 1;
}

/* Tons — fundo leve + texto/ícone saturado */
.media-type-tag--warning {
  background: rgba(255, 159, 67, 0.12);
  color: var(--warning);
}
.media-type-tag--primary {
  background: rgba(115, 103, 240, 0.12);
  color: var(--primary);
}
.media-type-tag--info {
  background: rgba(0, 207, 232, 0.12);
  color: var(--info);
}
.media-type-tag--success {
  background: rgba(40, 199, 111, 0.12);
  color: var(--success);
}
.media-type-tag--muted {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

.turn-metrics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.metric-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  color: var(--ec-body);
  font-weight: 600;
}

.metric-line strong {
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
}

:deep(.turn-metrics .progress) {
  background: var(--gray-100);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px 0;
}

.mission-footer-text {
  margin: 0;
  color: var(--ec-body);
  font: 400 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.mission-footer-brand {
  color: var(--primary);
}

.mission-footer-social {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.mission-footer-social-icon {
  width: 24px;
  height: 24px;
  display: block;
}

.metric-drawer-overlay {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--black) 45%, transparent);
  z-index: 1190;
}

.metric-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 92vw;
  background: var(--white);
  border-left: 1px solid var(--ec-border);
  box-shadow: var(--shadow-xl);
  z-index: 1200;
  display: flex;
  flex-direction: column;
}

.metric-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--ec-border);
}

.metric-drawer-header h3 {
  margin: 0;
  color: var(--ec-text);
  font: 600 20px/26px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-close {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--ec-body);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.metric-drawer-close:hover {
  background: var(--gray-100);
}

.metric-drawer-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.metric-drawer-summary {
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric-drawer-summary-label {
  color: var(--ec-body);
  font: 500 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-summary-value {
  color: var(--success);
  font: 700 16px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-summary-value-primary {
  color: var(--primary);
}

.metric-drawer-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.metric-drawer-legend {
  border: 1px solid var(--ec-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.metric-drawer-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ec-body);
  font: 500 12px/18px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  display: inline-block;
}

.metric-drawer-dot-finalizado { background: var(--success-dark); }
.metric-drawer-dot-satisfatorio { background: var(--success); }
.metric-drawer-dot-moderado { background: var(--warning); }
.metric-drawer-dot-critico { background: var(--danger); }

.metric-drawer-pill-time-otimo {
  color: var(--success-dark);
  background: color-mix(in srgb, var(--success-dark) 14%, var(--white));
}

.metric-drawer-pill-time-adequado {
  color: var(--success);
  background: color-mix(in srgb, var(--success) 14%, var(--white));
}

.metric-drawer-pill-time-atencao {
  color: var(--warning-dark);
  background: color-mix(in srgb, var(--warning) 18%, var(--white));
}

.metric-drawer-pill-time-alto {
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 14%, var(--white));
}

.metric-drawer-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-drawer-item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--ec-body);
  font: 500 14px/21px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-item-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.metric-drawer-item-icon {
  font-size: 16px;
  line-height: 1;
  color: var(--ec-body);
}

.metric-drawer-item-head strong {
  color: var(--primary);
  font-weight: 700;
}

.metric-drawer-item-head strong.metric-drawer-empty {
  color: var(--ec-muted);
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0;
}

.drawer-hint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--ec-primary) 8%, transparent);
  color: var(--ec-primary);
  font-size: 12px;
  font-weight: 600;
}

.drawer-hint-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.drawer-hint--neutral {
  background: color-mix(in srgb, var(--info) 8%, transparent);
  color: var(--info);
}

.drawer-hint--warning {
  background: color-mix(in srgb, var(--warning) 8%, transparent);
  color: var(--warning);
}

.metric-drawer-empty-notice-title {
  font-size: 11px;
  font-weight: 600;
  line-height: 17px;
  color: var(--ec-text);
  margin-bottom: 3px;
  white-space: nowrap;
}

.metric-drawer-empty-notice-desc {
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
  color: var(--ec-body);
}

.metric-drawer-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 2px 8px;
  border-radius: 9999px;
  font: 600 11px/16px 'Montserrat', Helvetica, Arial, sans-serif;
}

.metric-drawer-pill-finalizado {
  color: var(--success-dark);
  background: color-mix(in srgb, var(--success-dark) 14%, var(--white));
}

.metric-drawer-pill-satisfatorio {
  color: var(--success);
  background: color-mix(in srgb, var(--success) 14%, var(--white));
}

.metric-drawer-pill-moderado {
  color: var(--warning-dark);
  background: color-mix(in srgb, var(--warning) 18%, var(--white));
}

.metric-drawer-pill-critico {
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 14%, var(--white));
}

.metric-drawer-item-bar {
  height: 8px;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--primary) 12%, var(--white));
  overflow: hidden;
}

.metric-drawer-item-bar-fill {
  display: block;
  height: 100%;
  border-radius: 9999px;
}

.metric-drawer-item-bar-fill-finalizado {
  background: var(--success-dark);
}

.metric-drawer-item-bar-fill-satisfatorio {
  background: var(--success);
}

.metric-drawer-item-bar-fill-moderado {
  background: var(--warning);
}

.metric-drawer-item-bar-fill-critico {
  background: var(--danger);
}

.metric-drawer-item-bar-fill-time-otimo {
  background: var(--success-dark);
}

.metric-drawer-item-bar-fill-time-adequado {
  background: var(--success);
}

.metric-drawer-item-bar-fill-time-atencao {
  background: var(--warning);
}

.metric-drawer-item-bar-fill-time-alto {
  background: var(--danger);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.tone-success {
  color: var(--success);
  background: var(--success-light);
  background: color-mix(in srgb, var(--success) 14%, var(--white));
}

.tone-warning {
  color: var(--warning);
  background: var(--warning-light);
  background: color-mix(in srgb, var(--warning) 14%, var(--white));
}

.tone-primary {
  color: var(--ec-primary);
  background: var(--ec-primary-soft);
}

.tone-info {
  color: var(--info);
  background: var(--info-light);
  background: color-mix(in srgb, var(--info) 14%, var(--white));
}

.tone-trilha {
  color: var(--white);
  background: var(--category-trilha);
}

@media (max-width: 992px) {
  .turn-grid {
    grid-template-columns: 1fr;
  }
}
</style>
