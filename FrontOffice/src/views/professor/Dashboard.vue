<script setup>
import { ref, computed } from 'vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import SubjectIcon from '@/components/SubjectIcon.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'

// ─── Disciplinas (SelectSubject) ─────────────────────────────────────────────
//     Replica: SelectSubject.vue → selectMode=true → usa ESelect
//     Ícone de área fica no prepend (simula MissionMath / MissionPort etc.)
const disciplinas = [
  { id: 1, name: 'Matemática'  },
  { id: 2, name: 'Português'   },
  { id: 3, name: 'Liga'        },
  { id: 4, name: 'Inglês'      },
]
const disciplinaAtiva = ref(disciplinas[0])

// ─── Módulos (MultipleDropdown) ───────────────────────────────────────────────
//     Replica: MultipleDropdown.vue → b-dropdown c/ hover sub-menu
const modulos = [
  { name: 'Todos os módulos',   details: null },
  { name: 'Módulo 1 - Números', details: [{ name: 'Frações' }, { name: 'Inteiros' }] },
  { name: 'Módulo 2 - Geometria',details: [{ name: 'Figuras Planas'}, { name: 'Poliedros' }] },
  { name: 'Módulo 3 - Álgebra', details: null },
]
const moduloSelecionado    = ref(modulos[0])
const subModuloSelecionado = ref(null)
const hoveredModulo        = ref(null)
const multiDropdownOpen    = ref(false)

const setModulo = (item, subItem = null) => {
  moduloSelecionado.value    = item
  subModuloSelecionado.value = subItem
  hoveredModulo.value = null
  multiDropdownOpen.value = false
}
const moduloLabel = computed(() => {
  if (!moduloSelecionado.value) return 'Sem Opções'
  const s = moduloSelecionado.value.name
  return subModuloSelecionado.value ? `${s} - ${subModuloSelecionado.value.name}` : s
})

// ─── Períodos ─────────────────────────────────────────────────────────────────
const periodos = ['Todo o período', 'Janeiro 2026', 'Fevereiro 2026', 'Março 2026']
const periodoSelecionado = ref(periodos[0])

// ─── ViewMode (Exibir) ────────────────────────────────────────────────────────
const viewMode = ref(1) // 1=todos · 2=jogaram · 3=não jogaram

// ─── Alunos mock ──────────────────────────────────────────────────────────────
const allStudents = [
  { id: 1, nome: 'Alice Rodrigues',  acessou: true,  desafios: null, tempo: null,  rendimento: null },
  { id: 2, nome: 'Bruno Souza',      acessou: true,  desafios: 42,   tempo: 3720,  rendimento: 78 },
  { id: 3, nome: 'Carla Mendes',     acessou: true,  desafios: 31,   tempo: 2880,  rendimento: 55 },
  { id: 4, nome: 'Diego Ferreira',   acessou: false, desafios: null, tempo: null,  rendimento: null },
  { id: 5, nome: 'Eduarda Lima',     acessou: true,  desafios: 58,   tempo: 5040,  rendimento: 91 },
  { id: 6, nome: 'Felipe Costa',     acessou: true,  desafios: 19,   tempo: 1620,  rendimento: 38 },
  { id: 7, nome: 'Gabriela Nunes',   acessou: true,  desafios: 47,   tempo: 4200,  rendimento: 82 },
  { id: 8, nome: 'Henrique Barbosa', acessou: false, desafios: null, tempo: null,  rendimento: null },
]

// ─── Tabela: search + per-page ────────────────────────────────────────────────
const searchQuery = ref('')
const perPage     = ref(10)

const studentsFiltered = computed(() => {
  return allStudents.filter(s => {
    const matchName = s.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    if (viewMode.value === 2) return matchName && s.desafios !== null
    if (viewMode.value === 3) return matchName && s.desafios === null
    return matchName
  })
})

// ─── Métricas derivadas ───────────────────────────────────────────────────────
const totalAlunos   = allStudents.length
const totalJogaram  = allStudents.filter(s => s.desafios !== null).length
const totalDesafios = allStudents.reduce((acc, s) => acc + (s.desafios ?? 0), 0)
const pctJogaram    = Math.round((totalJogaram / totalAlunos) * 100)

const alunosComTempo = allStudents.filter(s => s.tempo !== null)
const tempoMedio = alunosComTempo.length
  ? Math.round(alunosComTempo.reduce((a, s) => a + s.tempo, 0) / alunosComTempo.length)
  : 0

const alunosComRend = allStudents.filter(s => s.rendimento !== null)
const rendMedio = alunosComRend.length
  ? Math.round(alunosComRend.reduce((a, s) => a + s.rendimento, 0) / alunosComRend.length)
  : 0

// ─── Formatadores ─────────────────────────────────────────────────────────────
const formatTempo = (seg) => {
  if (!seg) return null
  const h = Math.floor(seg / 3600)
  const m = Math.floor((seg % 3600) / 60)
  const s = seg % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

// ─── PerformanceCell: replica getVariantByRule (accuracyPerformance) ──────────
//     Fonte: educacross-frontoffice/src/consts/legends/performanceEnum.js
//     ≥70 → advanced · ≥50 → proficient · ≥25 → basic · <25 → below-basic
const perfVariant = (v) => {
  if (v === null || v === undefined) return null
  if (v >= 70) return { badge: 'Avançado',        cls: 'badge-legend-advanced'  }
  if (v >= 50) return { badge: 'Proficiente',      cls: 'badge-legend-proficient'}
  if (v >= 25) return { badge: 'Básico',           cls: 'badge-legend-basic'    }
  return            { badge: 'Abaixo do Básico',  cls: 'badge-legend-below'   }
}

// ─── ProgressBarHorizontalV2: variant de barra ────────────────────────────────
//     Fonte: ProgressBarHorizontalV2.vue → getVariantByRule → textClass + variant
const barVariant = (v) => {
  if (v >= 70) return { bar: 'bar-primary',  text: 'rend-advanced'  }
  if (v >= 50) return { bar: 'bar-success',  text: 'rend-proficient'}
  if (v >= 25) return { bar: 'bar-warning',  text: 'rend-basic'     }
  return            { bar: 'bar-danger',   text: 'rend-below'    }
}

// ─── LegendEnum: enums de participação e rendimento ──────────────────────────
//     Replicado de: participationEnum.js (variant: legend-complete/proficient/basic/below-basic)
//                 + performanceEnum.js   (variant: legend-advanced/proficient/basic/below-basic)
const legendParticipacao = [
  { label: 'Finalizado',   variant: 'sem-complete',   desc: '100%'    },
  { label: 'Satisfatório', variant: 'sem-proficient',  desc: '≥ 80%'  },
  { label: 'Moderado',     variant: 'sem-basic',       desc: '≥ 50%'  },
  { label: 'Crítico',      variant: 'sem-below',       desc: '< 50%'  },
]
const legendRendimento = [
  { label: 'Avançado',        variant: 'sem-advanced',   desc: '≥ 70% de acertos' },
  { label: 'Proficiente',     variant: 'sem-proficient',  desc: '≥ 50% de acertos' },
  { label: 'Básico',          variant: 'sem-basic',       desc: '≥ 25% de acertos' },
  { label: 'Abaixo do Básico',variant: 'sem-below',       desc: '< 25% de acertos' },
]
</script>

<template>
  <div class="painel-root">

    <!-- ═══════════════════════════════════════════════════════════════════════
         Barra superior: ClassSelector (Turma + Escola)
         Componente reutilizável já implementado no protótipo
    ═══════════════════════════════════════════════════════════════════════════ -->
    <ClassSelector school-name="Colégio Nova Jornada" class="mb-1" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         Card Filtros
         Replica: MultipleDropdown.vue (Módulo) + ESelect nativo (Período)
         + radios viewMode
    ═══════════════════════════════════════════════════════════════════════════ -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3 align-items-end">

          <!-- Área de conhecimento — SelectSubject ──────────────────────────
               Replica: SelectSubject.vue selectMode=true → ESelect com SubjectIcon
          ──────────────────────────────────────────────────────────────────── -->
          <div class="col-12 col-md-auto">
            <label class="form-label">Área de conhecimento</label>
            <div class="dropdown eselect-dropdown">
              <button
                class="subject-toggle btn p-0 eselect-trigger"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="d-flex align-items-center gap-1">
                  <SubjectIcon :disciplina="disciplinaAtiva.name" :size="26" />
                  <span>{{ disciplinaAtiva.name }}</span>
                </div>
                <span class="material-symbols-outlined text-muted" style="font-size:20px">expand_more</span>
              </button>
              <ul class="dropdown-menu">
                <li v-for="d in disciplinas" :key="d.id">
                  <button
                    class="dropdown-item d-flex align-items-center gap-1"
                    :class="{ active: disciplinaAtiva.id === d.id }"
                    @click="disciplinaAtiva = d"
                  >
                    <SubjectIcon :disciplina="d.name" :size="26" />
                    {{ d.name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Módulo — MultipleDropdown ─────────────────────────────────────
               Replica: MultipleDropdown.vue
               - b-dropdown variant="outline-secondary" no-caret block
               - button-content: texto + expand_more icon
               - itens com chevron_right quando tem sub-itens
               - sub-menu na direita ao hover
          ──────────────────────────────────────────────────────────────────── -->
          <div class="col-12 col-md">
            <label class="form-label">Módulo</label>
            <div class="multi-dd-wrap" @mouseleave="multiDropdownOpen = false">
              <button
                class="multi-dd-btn d-flex align-items-center justify-content-between w-100"
                @click.stop="multiDropdownOpen = !multiDropdownOpen"
              >
                <span class="font-normal text-body truncate">{{ moduloLabel }}</span>
                <span class="material-symbols-outlined text-body" style="font-size:20px">expand_more</span>
              </button>

              <div v-if="multiDropdownOpen" class="multi-dd-menu">
                <div
                  v-for="(item, idx) in modulos"
                  :key="idx"
                  class="multi-dd-item position-relative"
                  @mouseover="hoveredModulo = item"
                  @mouseleave="hoveredModulo = null"
                >
                  <div class="w-100 d-flex align-items-center" @click="setModulo(item)">
                    <span class="flex-grow-1">{{ item.name }}</span>
                    <span
                      v-if="item.details"
                      class="material-symbols-outlined text-body"
                      style="font-size:18px"
                    >chevron_right</span>
                  </div>
                  <!-- Sub-menu hover (sub-items do MultipleDropdown) -->
                  <div v-if="hoveredModulo === item && item.details" class="multi-dd-sub">
                    <div
                      v-for="(sub, sIdx) in item.details"
                      :key="sIdx"
                      class="multi-dd-sub-item"
                      @click.stop="setModulo(item, sub)"
                    >{{ sub.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Período ────────────────────────────────────────────────────── -->
          <div class="col-12 col-md">
            <label class="form-label">Período</label>
            <select class="form-select" v-model="periodoSelecionado">
              <option v-for="p in periodos" :key="p">{{ p }}</option>
            </select>
          </div>

          <!-- Nova Missão ─────────────────────────────────────────────────── -->
          <div class="col-12 col-md-auto">
            <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
              <span class="material-symbols-outlined" style="font-size:16px">add_circle</span>
              Nova Missão
            </button>
          </div>
        </div>

        <!-- Radios Exibir ──────────────────────────────────────────────────── -->
        <div class="d-flex align-items-center flex-wrap gap-3 mt-3">
          <span class="exibir-label">Exibir:</span>
          <div
            v-for="opt in [
              { v: 1, label: 'Todos os alunos' },
              { v: 2, label: 'Somente alunos que jogaram' },
              { v: 3, label: 'Somente alunos que não jogaram' },
            ]"
            :key="opt.v"
            class="d-flex align-items-center"
          >
            <div class="radio-inline custom-control custom-radio">
              <input
                type="radio"
                :id="`vm${opt.v}`"
                name="viewMode"
                :value="opt.v"
                v-model="viewMode"
                class="custom-control-input"
              />
              <label class="custom-control-label" :for="`vm${opt.v}`">
                <span class="text-body">{{ opt.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         Cards de Métricas (oculto quando viewMode === 3)
    ═══════════════════════════════════════════════════════════════════════════ -->
    <div v-if="viewMode !== 3" class="row g-3 mb-3">

      <!-- Col-lg-4 → PieChart ──────────────────────────────────────────────
           Replica: PieChart.vue (vue-apexcharts tipo pie)
           Aqui: SVG puro com stroke-dasharray
           Circunferência r=30: 2π×30 ≈ 188.5
      ──────────────────────────────────────────────────────────────────── -->
      <div class="col-12 col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="mb-0 card-title-sm">Atividades</h6>
              <span
                class="material-symbols-outlined"
                title="Atividades finalizadas: o aluno completou todos os desafios propostos."
                style="font-size:16px;color:var(--ec-muted)"
              >info</span>
            </div>
            <!-- SVG Donut -->
            <div class="donut-wrap flex-grow-1 d-flex align-items-center justify-content-center">
              <svg viewBox="0 0 80 80" width="140" height="140" style="overflow:visible">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#f3f2f7" stroke-width="14"/>
                <circle cx="40" cy="40" r="30" fill="none" stroke="#28c76f" stroke-width="14"
                  :stroke-dasharray="`${188.5 * pctJogaram / 100} ${188.5 * (100 - pctJogaram) / 100}`"
                  stroke-dashoffset="0" transform="rotate(-90 40 40)"/>
                <circle cx="40" cy="40" r="30" fill="none" stroke="#ea5455" stroke-width="14"
                  :stroke-dasharray="`${188.5 * (100 - pctJogaram) / 100} ${188.5 * pctJogaram / 100}`"
                  :stroke-dashoffset="`-${188.5 * pctJogaram / 100}`"
                  transform="rotate(-90 40 40)"/>
                <text x="40" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#5e5873">{{ pctJogaram }}%</text>
                <text x="40" y="51" text-anchor="middle" font-size="6" fill="#b9b9c3">Jogaram</text>
              </svg>
            </div>
            <!-- Legenda custom do PieChart (legend show:false na produção → legenda externa) -->
            <div class="mt-2">
              <div class="d-flex justify-content-between align-items-center mb-1 pie-legend-row">
                <div class="d-flex align-items-center gap-2">
                  <span class="range-circle" style="background:#28c76f"></span>
                  <span>Jogaram</span>
                </div>
                <span style="color:#28c76f;font-weight:700">{{ pctJogaram }}%</span>
              </div>
              <div class="d-flex justify-content-between align-items-center pie-legend-row">
                <div class="d-flex align-items-center gap-2">
                  <span class="range-circle" style="background:#ea5455"></span>
                  <span>Não jogaram</span>
                </div>
                <span style="color:#ea5455;font-weight:700">{{ 100 - pctJogaram }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Col-lg-8 → 4 MediaCards ─────────────────────────────────────────
           Replica: MediaCard + ProgressBarHorizontalV2
           ProgressBarHorizontalV2 reverse=false (default):
             barra ACIMA → label % + valores ABAIXO
      ──────────────────────────────────────────────────────────────────── -->
      <div class="col-12 col-lg-8">
        <div class="row g-3">

          <!-- Alunos que jogaram -->
          <div class="col-12 col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div class="flex-grow-1 min-w-0">
                    <div class="d-flex align-items-center gap-1 mb-75">
                      <h6 class="mb-0 card-title-sm">Alunos que jogaram</h6>
                      <span class="material-symbols-outlined"
                        title="Alunos que acessaram e realizaram ao menos 1 desafio."
                        style="font-size:13px;color:var(--ec-muted)">info</span>
                    </div>
                    <!-- ProgressBarHorizontalV2: barra acima, % + valores abaixo -->
                    <div class="pb-v2">
                      <div class="progress mb-50" style="height:6px">
                        <div class="progress-bar bar-primary" :style="`width:${pctJogaram}%`"></div>
                      </div>
                      <div class="d-flex align-items-center">
                        <span :class="barVariant(pctJogaram).text" class="font-bold me-1">{{ pctJogaram }}%</span>
                        <span class="ms-auto" style="font-size:.75rem;color:var(--ec-muted);white-space:nowrap">
                          <strong style="color:var(--ec-text)">{{ totalJogaram }}</strong>
                          /
                          {{ totalAlunos }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="media-avatar flex-shrink-0">
                    <span class="material-symbols-outlined">sentiment_satisfied</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desafios realizados -->
          <div class="col-12 col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div class="flex-grow-1">
                    <h6 class="mb-75 card-title-sm">Desafios realizados</h6>
                    <h5 class="mb-0 metric-value">{{ totalDesafios.toLocaleString('pt-BR') }}</h5>
                  </div>
                  <div class="media-avatar flex-shrink-0">
                    <span class="material-symbols-outlined">extension</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tempo médio -->
          <div class="col-12 col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div class="flex-grow-1">
                    <h6 class="mb-75 card-title-sm">Tempo médio por aluno</h6>
                    <h5 class="mb-0 metric-value">{{ formatTempo(tempoMedio) }}</h5>
                  </div>
                  <div class="media-avatar flex-shrink-0">
                    <span class="material-symbols-outlined">timelapse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rendimento médio -->
          <div class="col-12 col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div class="flex-grow-1 min-w-0">
                    <div class="d-flex align-items-center gap-1 mb-75">
                      <h6 class="mb-0 card-title-sm">Rendimento médio</h6>
                      <span class="material-symbols-outlined"
                        title="Rendimento calculado com base nos acertos e erros dos alunos."
                        style="font-size:13px;color:var(--ec-muted)">info</span>
                    </div>
                    <!-- ProgressBarHorizontalV2 com variant calculado por regra -->
                    <div class="pb-v2">
                      <div class="progress mb-50" style="height:6px">
                        <div
                          class="progress-bar"
                          :class="barVariant(rendMedio).bar"
                          :style="`width:${rendMedio}%`"
                        ></div>
                      </div>
                      <div>
                        <span :class="barVariant(rendMedio).text" class="font-bold">{{ rendMedio }}%</span>
                      </div>
                    </div>
                  </div>
                  <div class="media-avatar flex-shrink-0">
                    <span class="material-symbols-outlined">checklist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         Tabela de Alunos
         Replica: ListTableSelectLocal.vue
         - Toolbar: Mostrar (per-page) | search (prepend icon) | ios_share export
         - selectAll acima da tabela
         - thead-row: uppercase, font-bolder, text-muted
         - PerformanceCell: ConditionalValueDisplay + badge pill text-uppercase
         - ConditionalValueDisplay: badge "NÃO HÁ DADOS" quanto value = null
    ═══════════════════════════════════════════════════════════════════════════ -->
    <div class="card mb-3">

      <!-- Toolbar ─────────────────────────────────────────────────────────── -->
      <div class="p-2">
        <div class="row gx-2 gy-2 align-items-center">
          <!-- Per Page -->
          <div class="col-auto d-flex align-items-center gap-1">
            <label class="mb-0 text-muted text-nowrap" style="font-size:.857rem">Mostrar</label>
            <select class="form-select form-select-sm" style="width:70px" v-model="perPage">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>

          <!-- Search + Export -->
          <div class="col">
            <div class="row gx-2 gy-2 align-items-center justify-content-end">
              <!-- Search input (b-input-group-prepend search icon) -->
              <div class="col-12 col-sm" style="max-width:280px">
                <div class="input-group">
                  <span class="input-group-text border-end-0">
                    <span class="material-symbols-outlined" style="font-size:16px;color:var(--ec-muted)">search</span>
                  </span>
                  <input
                    type="text"
                    class="form-control border-start-0 searchQuery"
                    :placeholder="'Pesquisar aluno'"
                    v-model="searchQuery"
                    style="font-size:.857rem"
                  />
                </div>
              </div>
              <!-- Exportar (ios_share como na produção) -->
              <div class="col-auto">
                <button
                  class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                  style="height:38px;font-size:.857rem"
                >
                  <span class="material-symbols-outlined" style="font-size:20px">ios_share</span>
                  Exportar em Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SelectAll bar ───────────────────────────────────────────────────── -->
      <div class="selectall-bar">
        <div class="d-flex align-items-center gap-2">
          <input type="checkbox" class="form-check-input mt-0" />
          <span style="font-size:.857rem;color:var(--ec-body)">Selecionar toda a tabela</span>
        </div>
        <span style="font-size:.857rem;color:var(--ec-muted)">
          Selecionados: <strong style="color:var(--ec-primary)">0</strong>
        </span>
      </div>

      <!-- Tabela ──────────────────────────────────────────────────────────── -->
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="thead-row">
              <th style="width:36px"><input type="checkbox" class="form-check-input mt-0" /></th>
              <th><div class="th-label">Aluno</div></th>
              <th>
                <div class="th-label d-flex align-items-center gap-1">
                  Desafios Realizados
                  <span class="material-symbols-outlined"
                    title="Desafios que o aluno deve cumprir dentro de um jogo ou quiz."
                    style="font-size:14px">info</span>
                </div>
              </th>
              <th><div class="th-label">Tempo Investido</div></th>
              <th>
                <div class="th-label d-flex align-items-center gap-1">
                  Rendimento Médio
                  <span class="material-symbols-outlined"
                    title="Calculado com base nos erros e acertos de cada aluno."
                    style="font-size:14px">info</span>
                </div>
              </th>
              <th><div class="th-label">Ações</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="aluno in studentsFiltered" :key="aluno.id">
              <td><input type="checkbox" class="form-check-input mt-0" /></td>

              <!-- Aluno -->
              <td>
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span style="font-weight:500;color:var(--ec-text)">{{ aluno.nome }}</span>
                  <span v-if="!aluno.acessou" class="badge-no-access">Não acessou</span>
                </div>
              </td>

              <!-- Desafios — ConditionalValueDisplay (layout='badge') -->
              <td>
                <span
                  v-if="aluno.desafios !== null"
                  style="font-weight:600;color:var(--ec-text)"
                >{{ aluno.desafios.toLocaleString('pt-BR') }}</span>
                <span v-else class="badge-no-data text-uppercase">Não há dados para exibir</span>
              </td>

              <!-- Tempo — ConditionalValueDisplay (layout='badge') -->
              <td>
                <span
                  v-if="aluno.tempo !== null"
                  style="font-weight:600;color:var(--ec-text)"
                >{{ formatTempo(aluno.tempo) }}</span>
                <span v-else class="badge-no-data text-uppercase">Não há dados para exibir</span>
              </td>

              <!-- Rendimento — PerformanceCell replica
                   Fonte: PerformanceCell.vue
                   ConditionalValueDisplay[:value] → slot:
                     <div class="d-flex align-items-center gap-1">
                       <span style="width:50px">78%</span>
                       <b-badge :variant pill class="text-uppercase">Avançado</b-badge>
                     </div>
              -->
              <td>
                <template v-if="aluno.rendimento !== null">
                  <div class="d-flex align-items-center gap-1" style="width:fit-content">
                    <span
                      v-if="aluno.rendimento > 0"
                      class="whitespace-no-wrap"
                      style="width:44px;font-size:.857rem"
                    >{{ aluno.rendimento }}%</span>
                    <span
                      class="ec-badge-pill text-uppercase"
                      :class="perfVariant(aluno.rendimento)?.cls"
                    >{{ perfVariant(aluno.rendimento)?.badge }}</span>
                  </div>
                </template>
                <span v-else class="badge-no-data text-uppercase">Não há dados para exibir</span>
              </td>

              <!-- Ações -->
              <td>
                <span
                  class="material-symbols-outlined action-icon"
                  :class="{ disabled: !aluno.tempo }"
                  :title="aluno.tempo ? 'Ver relatório do aluno' : 'Aluno não acessou a plataforma'"
                >pie_chart</span>
              </td>
            </tr>

            <!-- Empty state  -->
            <tr v-if="studentsFiltered.length === 0">
              <td colspan="6" class="text-center py-4">
                <span class="material-symbols-outlined d-block mb-1" style="font-size:32px;color:var(--ec-muted)">search_off</span>
                <small class="text-muted">Nenhum aluno encontrado.</small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação ────────────────────────────────────────────────────────── -->
      <div class="d-flex align-items-center justify-content-between px-2 py-2 flex-wrap gap-2" style="font-size:.8rem;border-top:1px solid var(--ec-border)">
        <span style="color:var(--ec-body)">
          Exibindo 1 a {{ studentsFiltered.length }} de {{ studentsFiltered.length }} entradas
        </span>
        <div class="d-flex align-items-center gap-1">
          <button class="btn-page" disabled>
            <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle">chevron_left</span>
          </button>
          <button class="btn-page-active">1</button>
          <button class="btn-page" disabled>
            <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         LegendEnum (b-card, dois b-card-body separados por hr)
         + SemaphoreStatus (range-circle 14px + texto)
         Replica exatamente: LegendEnum.vue + SemaphoreStatus.vue
    ═══════════════════════════════════════════════════════════════════════════ -->
    <div class="card">
      <!-- Bloco 1: participationEnum -->
      <div class="card-body text-sm py-3">
        <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div style="font-size:.857rem;color:var(--ec-text);font-weight:600">Alunos que jogaram:</div>
          <div
            v-for="item in legendParticipacao"
            :key="item.label"
            class="d-flex align-items-center justify-content-start gap-2"
          >
            <!-- SemaphoreStatus: range-circle bg-{variant} + slot text -->
            <div class="range-circle" :class="item.variant"></div>
            <span style="font-size:.8rem;color:var(--ec-body)">{{ item.label }}</span>
            <span style="font-size:.75rem;color:var(--ec-muted)">({{ item.desc }})</span>
          </div>
        </div>
      </div>

      <hr class="m-0" style="border-color:var(--ec-border)" />

      <!-- Bloco 2: performanceEnum -->
      <div class="card-body text-sm py-3">
        <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div style="font-size:.857rem;color:var(--ec-text);font-weight:600">Rendimento:</div>
          <div
            v-for="item in legendRendimento"
            :key="item.label"
            class="d-flex align-items-center justify-content-start gap-2"
          >
            <div class="range-circle" :class="item.variant"></div>
            <span style="font-size:.8rem;color:var(--ec-body)">{{ item.label }}</span>
            <span style="font-size:.75rem;color:var(--ec-muted)">({{ item.desc }})</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ────────────────────────────────────────────────────────────────────────────
   Tokens Educacross DS
   Fonte: educacross-frontoffice/src/assets/scss/variables/_variables.scss
   + SKILL.md educacross-design-system

   PRIMARY  #6e63e8  (NÃO #7367F0 — esse é Vuexy genérico)
   SUCCESS  #28c76f  DANGER #ea5455  WARNING #ff9f43  INFO #00cfe8
   TEXT     #5e5873 (heading) · #6e6b7b (body) · #b9b9c3 (muted)
   CARD     border #ebe9f1 · shadow rgba(34,41,47,.1) · radius .428rem
   FONT     .857rem · Montserrat, Helvetica, Arial, sans-serif
──────────────────────────────────────────────────────────────────────────── */
.painel-root {
  --ec-primary:       #6e63e8;
  --ec-primary-light: #eeedfd;
  --ec-success:       #28c76f;
  --ec-danger:        #ea5455;
  --ec-warning:       #ff9f43;
  --ec-info:          #00cfe8;
  --ec-text:          #5e5873;
  --ec-body:          #6e6b7b;
  --ec-muted:         #b9b9c3;
  --ec-border:        #ebe9f1;
  --ec-shadow:        0 4px 24px 0 rgba(34,41,47,.1);
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-size: .857rem;
  color: var(--ec-body);
}

/* ─── Cards ─────────────────────────────────────────────────────────────── */
.painel-root .card {
  border: 1px solid var(--ec-border);
  box-shadow: var(--ec-shadow);
  border-radius: .428rem;
  background: #fff;
}
.painel-root .card-body { padding: 1.5rem; }

/* ─── Tipografia ─────────────────────────────────────────────────────────── */
.card-title-sm { font-size: .857rem; font-weight: 400; color: var(--ec-body); margin-bottom: 0; }
.metric-value  { color: var(--ec-primary); font-weight: 700; }
.font-bold     { font-weight: 700; }
.text-muted    { color: var(--ec-muted) !important; }
.mb-75         { margin-bottom: .75rem; }
.mb-50         { margin-bottom: .5rem; }
.exibir-label  { font-size: .857rem; font-weight: 500; color: var(--ec-text); }

/* ─── Forms ─────────────────────────────────────────────────────────────── */
.painel-root label.form-label {
  font-size: .857rem;
  font-weight: 500;
  color: var(--ec-text);
  margin-bottom: .2857rem;
}
.painel-root .form-select,
.painel-root .form-control {
  font-size: .857rem;
  color: var(--ec-text);
  border-color: var(--ec-border);
  border-radius: .357rem;
}
.painel-root .form-select:focus,
.painel-root .form-control:focus {
  border-color: var(--ec-primary);
  box-shadow: 0 3px 10px 0 rgba(110,99,232,.1);
}
.painel-root .input-group-text {
  border-color: var(--ec-border);
  background: #fff;
}
.painel-root .searchQuery { border-color: var(--ec-border); }

/* ─── Botões ─────────────────────────────────────────────────────────────── */
.painel-root .btn-primary {
  background: var(--ec-primary);
  border-color: var(--ec-primary);
  color: #fff;
  font-weight: 500;
  font-size: .857rem;
  border-radius: .358rem;
}
.painel-root .btn-primary:hover { background: #5d52c4; border-color: #5d52c4; }

.painel-root .btn-outline-primary {
  color: var(--ec-primary);
  border-color: var(--ec-primary);
  font-size: .857rem;
  border-radius: .358rem;
}
.painel-root .btn-outline-primary:hover { background: var(--ec-primary-light); }

.btn-light-secondary {
  background: transparent;
  border: 1px solid var(--ec-border);
  color: var(--ec-text);
  font-size: .857rem;
  border-radius: .357rem;
}
.btn-light-secondary:hover {
  background: var(--ec-primary-light);
  color: var(--ec-primary);
  border-color: var(--ec-primary);
}
.painel-root .dropdown-item { font-size: .857rem; color: var(--ec-text); }
.painel-root .dropdown-item:active { background: var(--ec-primary); color: #fff; }

/* ─── SelectSubject (ESelect mode) ──────────────────────────────────────── */
.subject-toggle {
  display: flex;
  align-items: center;
  gap: .5rem;
  border: 1px solid var(--ec-border);
  border-radius: .357rem;
  padding: .35rem .75rem .35rem .5rem;
  background: #fff;
  min-width: 210px;
  cursor: pointer;
  text-align: left;
}
.subject-toggle:hover,
.subject-toggle:focus { border-color: var(--ec-primary); box-shadow: none; }
.subject-label {
  flex: 1;
  font-size: .857rem;
  color: var(--ec-text);
}

/* ─── Turma badge ────────────────────────────────────────────────────────── */
.badge-serie {
  background: var(--ec-primary-light);
  color: var(--ec-primary);
  font-size: .75rem;
  font-weight: 600;
  border-radius: 20px;
  padding: .2em .7em;
  white-space: nowrap;
}
.escola-label {
  color: var(--ec-primary);
  font-weight: 600;
  font-size: .857rem;
  display: flex;
  align-items: center;
  gap: .25rem;
}

/* ─── Radios custom-control (replica Bootstrap Vue) ─────────────────────── */
.custom-control { padding-left: 1.5rem; }
.custom-control-input {
  position: absolute;
  left: 0;
  width: 1rem;
  height: 1.2rem;
  opacity: 0;
  z-index: -1;
}
.custom-control-label { position: relative; cursor: pointer; }
.custom-control-label::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: .2rem;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--ec-border);
  background: #fff;
  border-radius: 50%;
}
.custom-control-input:checked + .custom-control-label::before {
  background: var(--ec-primary);
  border-color: var(--ec-primary);
}
.custom-control-input:checked + .custom-control-label::after {
  content: '';
  position: absolute;
  left: -1.125rem;
  top: .45rem;
  width: .375rem;
  height: .375rem;
  border-radius: 50%;
  background: #fff;
}

/* ─── MultipleDropdown ──────────────────────────────────────────────────── */
.multi-dd-wrap { position: relative; }
.multi-dd-btn {
  background: #fff;
  border: 1px solid var(--ec-border);
  border-radius: .357rem;
  padding: .5rem .75rem;
  font-size: .857rem;
  color: var(--ec-text);
  cursor: pointer;
}
.multi-dd-btn:hover { border-color: var(--ec-primary); }
.multi-dd-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: #fff;
  border: 1px solid var(--ec-border);
  border-radius: .357rem;
  box-shadow: var(--ec-shadow);
  z-index: 1050;
  overflow: visible;
}
.multi-dd-item {
  padding: .5rem .75rem;
  font-size: .857rem;
  color: var(--ec-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.multi-dd-item:hover { background: var(--ec-primary-light); color: var(--ec-primary); }
/* Sub-menu absoluto à direita (simula MultipleDropdown.sub-items) */
.multi-dd-sub {
  position: absolute;
  left: 100%; top: 0;
  background: #fff;
  border: 1px solid var(--ec-border);
  border-radius: .357rem;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  z-index: 1060;
  min-width: 150px;
}
.multi-dd-sub-item {
  padding: .5rem .75rem;
  font-size: .857rem;
  color: var(--ec-text);
  cursor: pointer;
}
.multi-dd-sub-item:hover { background: var(--ec-primary-light); color: var(--ec-primary); }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.font-normal { font-weight: 400; }
.text-body { color: var(--ec-body) !important; }
.text-secondary { color: var(--ec-muted) !important; }

/* ─── Radios ─────────────────────────────────────────────────────────────── */
.painel-root .form-check-input:checked {
  background-color: var(--ec-primary);
  border-color: var(--ec-primary);
}
.painel-root .form-check-input:focus { box-shadow: 0 0 0 .25rem rgba(110,99,232,.25); }
.painel-root .form-check-label { font-size: .857rem; color: var(--ec-body); cursor: pointer; }

/* ─── PieChart SVG donut ─────────────────────────────────────────────────── */
.donut-wrap { display: flex; justify-content: center; }
.pie-legend-row { font-size: .8rem; color: var(--ec-body); }

/* ─── MediaCard avatar (b-avatar simulado) ───────────────────────────────── */
.media-avatar {
  width: 42px; height: 42px;
  border-radius: .357rem;
  background: var(--ec-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.media-avatar .material-symbols-outlined {
  font-size: 22px;
  color: var(--ec-primary);
}

/* ─── ProgressBarHorizontalV2 ────────────────────────────────────────────── */
/*     reverse=false (padrão): barra acima, label abaixo                     */
.pb-v2 {}
.painel-root .progress { border-radius: 4px; background: #f3f2f7; }
.bar-primary  { background: var(--ec-primary) !important; }
.bar-success  { background: var(--ec-success) !important; }
.bar-warning  { background: var(--ec-warning) !important; }
.bar-danger   { background: var(--ec-danger)  !important; }
/* textClass das variantes (font-bold pela produção usa .font-bold) */
.rend-advanced   { color: var(--ec-primary); font-size: .857rem; }
.rend-proficient { color: var(--ec-success);  font-size: .857rem; }
.rend-basic      { color: var(--ec-warning);  font-size: .857rem; }
.rend-below      { color: var(--ec-danger);   font-size: .857rem; }

/* ─── Tabela (ListTableSelectLocal) ─────────────────────────────────────── */
.selectall-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem .75rem;
  border-top: 1px solid var(--ec-border);
  border-bottom: 1px solid var(--ec-border);
}
.painel-root .table thead th,
.painel-root .table thead .thead-row th {
  font-size: .75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--ec-muted);
  border-bottom: 2px solid var(--ec-border);
  white-space: nowrap;
  vertical-align: middle;
  padding: .75rem;
}
.th-label { display: inline-flex; align-items: center; gap: .25rem; }
.painel-root .table td {
  vertical-align: middle;
  border-color: var(--ec-border);
  padding: .75rem;
  font-size: .857rem;
}
.painel-root .table-hover tbody tr:hover { background: rgba(110,99,232,.04); }
.painel-root .table { color: var(--ec-body); }
.whitespace-no-wrap { white-space: nowrap; }

/* ─── ConditionalValueDisplay (layout='badge') ───────────────────────────── */
.badge-no-data {
  background: #f3f2f7;
  color: var(--ec-muted);
  font-size: .7rem;
  border-radius: 20px;
  padding: .3em .75em;
  font-weight: 500;
  white-space: nowrap;
}
.badge-no-access {
  background: #fde8e8;
  color: var(--ec-danger);
  font-size: .7rem;
  border-radius: 20px;
  padding: .25em .65em;
  font-weight: 500;
}

/* ─── PerformanceCell: b-badge pill text-uppercase ───────────────────────── */
/*     Replica exata de PerformanceCell.vue:                                  */
/*       <b-badge :variant="variant.variant" pill class="text-uppercase">    */
.ec-badge-pill {
  border-radius: 20px;
  padding: .3em .75em;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .3px;
  white-space: nowrap;
}
.badge-legend-advanced  { background: var(--ec-primary-light); color: var(--ec-primary); }
.badge-legend-proficient{ background: #d4f4e2;                 color: #28c76f;           }
.badge-legend-basic     { background: #fff3e3;                 color: #ff9f43;           }
.badge-legend-below     { background: #fde8e8;                 color: #ea5455;           }

/* ─── Ação na tabela ─────────────────────────────────────────────────────── */
.action-icon {
  font-size: 18px;
  cursor: pointer;
  color: var(--ec-primary);
}
.action-icon.disabled { color: var(--ec-muted); cursor: not-allowed; }

/* ─── Paginação ──────────────────────────────────────────────────────────── */
.btn-page-active {
  background: var(--ec-primary);
  color: #fff;
  border: none;
  border-radius: .357rem;
  padding: .25rem .7rem;
  font-size: .857rem;
  font-weight: 600;
}
.btn-page {
  background: transparent;
  border: 1px solid var(--ec-border);
  color: var(--ec-muted);
  border-radius: .357rem;
  padding: .25rem .5rem;
  font-size: .857rem;
  line-height: 1;
}
.btn-page:disabled { opacity: .5; cursor: not-allowed; }

/* ─── LegendEnum + SemaphoreStatus ──────────────────────────────────────── */
/*     SemaphoreStatus: .range-circle ← 14×14 bg-{variant} border-radius 50% */
.range-circle {
  border-radius: 50%;
  height: 14px;
  width: 14px;
  flex-shrink: 0;
}
/* Mapeamento das variantes da produção para cores reais */
.sem-complete   { background: #28c76f; }
.sem-proficient { background: #48da89; }
.sem-basic      { background: #ff9f43; }
.sem-below      { background: #ea5455; }
.sem-advanced   { background: var(--ec-primary); }
</style>
