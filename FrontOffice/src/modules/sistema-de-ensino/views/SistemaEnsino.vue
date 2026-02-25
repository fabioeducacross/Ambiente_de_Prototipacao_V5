<template>
  <div class="tz-page">
    <!-- Navbar -->
    <AppNavbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" theme="yellow" />

    <!-- Main content -->
    <main class="tz-main" :class="{ 'sidebar-collapsed': sidebarCollapsed }">

      <!-- ── Topo: turma + escola ── -->
      <div class="tz-topbar">
        <ClassSelector
          :classes="[{ id: '1', name: book.turma, grade: book.ano }]"
          initial-class="1"
          :school-name="book.escola"
        />
      </div>

      <!-- ── Breadcrumb ── -->
      <nav class="tz-breadcrumb">
        <RouterLink to="/" class="bc-item"><span class="material-symbols-outlined" style="font-size:16px">home</span></RouterLink>
        <span class="bc-sep"><span class="material-symbols-outlined" style="font-size:14px">chevron_right</span></span>
        <span class="bc-item">Sistema de ensino</span>
        <span class="bc-sep"><span class="material-symbols-outlined" style="font-size:14px">chevron_right</span></span>
        <span class="bc-item active">{{ book.titulo }}</span>
      </nav>

      <!-- ── Tabs (DS: Tab.vue) ── -->
      <div class="tz-tabs-row">
        <div class="tabs-container">
          <a class="tab-link active" href="#" style="--idx:0" @click.prevent>Livros</a>
          <a class="tab-link" href="#" style="--idx:1" @click.prevent>Alunos</a>
          <a class="tab-link" href="#" style="--idx:2" @click.prevent>Ranking</a>
        </div>
        <span class="tab-title">MISSÕES SISTEMA DE ENSINO</span>
      </div>
      <div class="tab-line"></div>

      <!-- ── Card Título (DS: missions/Title.vue) ── -->
      <div class="ds-card title-card">
        <div class="card-body py-1">
          <div class="row align-items-center">
            <div class="col-md-3 col-12">
              <a href="#" class="voltar-link d-flex align-items-center text-decoration-none" @click.prevent="$router.back()">
                <span class="material-symbols-outlined">chevron_left</span>
                <span class="text-decoration-underline">Voltar</span>
              </a>
            </div>
            <div class="col-md-6 col-12">
              <div class="d-flex align-items-center justify-content-center gap-2 my-2 my-md-0">
                <SubjectIcon :disciplina="book.disciplina" :size="24" />
                <span class="fw-bold">{{ book.titulo }}</span>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="d-flex align-items-center justify-content-md-end">
                <button type="button" class="btn btn-primary btn-relatorio d-flex align-items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size:16px">pie_chart</span>
                  Relatório Sistema de ensino
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Card Filtros (DS: missions/Filters.vue) ── -->
      <div class="ds-card filters-card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 col-12 mb-2 mb-md-0">
              <ESelect
                v-model="selectedUnit"
                :options="unitOptions"
                placeholder="Todas as unidades"
              />
            </div>
            <div class="col-md-6 col-12">
              <ESelect
                v-model="selectedStatus"
                :options="statusOptions"
                placeholder="Todos os status"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Card Tabela (DS: ListTableLocalSorting + missions/List.vue) ── -->
      <div class="ds-card table-card">
        <!-- Toolbar (DS: ListTableLocalSorting toolbar) -->
        <div class="table-toolbar">
          <div class="row align-items-center">
            <!-- Mostrar / Per Page -->
            <div class="col-12 col-md-auto d-flex align-items-center mb-2 mb-md-0">
              <label class="show-label">Mostrar</label>
              <select v-model="pageSize" class="per-page-select">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </div>
            <!-- Search + Export -->
            <div class="col-12 col-md">
              <div class="row justify-content-end align-items-center">
                <div class="col" style="max-width: 520px">
                  <div class="search-input-group">
                    <span class="search-prepend" @click="$refs.searchRef?.focus()">
                      <span class="material-symbols-outlined" style="font-size:18px">search</span>
                    </span>
                    <input
                      ref="searchRef"
                      v-model="searchQuery"
                      type="text"
                      class="search-field"
                      placeholder="Pesquisar por missão"
                    />
                  </div>
                </div>
                <div class="col-auto">
                  <button class="btn btn-outline-primary btn-sm btn-export d-flex align-items-center" style="height: 38px">
                    <div class="d-flex align-items-center justify-content-center gap-2">
                      <span class="material-symbols-outlined" style="font-size:22px">ios_share</span>
                      <span>Exportar em Excel</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela (DS: b-table inside ListTableLocalSorting) -->
        <div class="table-responsive">
          <table class="tz-table">
            <thead>
              <tr class="thead-row">
                <th>
                  <div class="th-content">UNIDADE</div>
                </th>
                <th>
                  <div class="th-content">MISSÃO</div>
                </th>
                <th>
                  <div class="th-content">INÍCIO</div>
                </th>
                <th>
                  <div class="th-content">FIM</div>
                </th>
                <th>
                  <div class="th-content">
                    PROGRESSO DA TURMA
                    <span class="material-symbols-outlined th-info" title="Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.">info</span>
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    RENDIMENTO MÉDIO
                    <span class="material-symbols-outlined th-info" title="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).">info</span>
                  </div>
                </th>
                <th>
                  <div class="th-content">ALUNOS</div>
                </th>
                <th>
                  <div class="th-content">
                    STATUS
                    <span class="material-symbols-outlined th-info" :title="statusColTooltip">info</span>
                  </div>
                </th>
                <th class="col-sticky-right">
                  <div class="th-content">AÇÕES</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chapter in paginatedChapters" :key="chapter.id">
                <!-- Unidade -->
                <td class="fw-bold">Unidade {{ getUnidade(chapter.id) }}</td>

                <!-- Missão (DS: #cell(name) slot) -->
                <td>
                  <div style="min-width: 150px">
                    <span class="fw-bold">{{ chapter.nome }}</span>
                    <div v-if="chapter.isMissaoPlus" class="d-flex gap-1 mt-1">
                      <span class="badge-plus">
                        <span class="plus-icon">+</span>
                        Missão Plus
                      </span>
                    </div>
                  </div>
                </td>

                    <!-- Início (só exibe se período ativo; sem período = '-') -->
                    <td>{{ chapter.periodEnabled ? formatDate(chapter.inicio) : '-' }}</td>

                    <!-- Fim (só exibe se período ativo; sem período = '-') -->
                    <td>{{ chapter.periodEnabled ? formatDate(chapter.fim) : '-' }}</td>

                <!-- Progresso (DS: ProgressBarHorizontalV2 reverse height="12px") -->
                <td>
                  <div class="progress-cell">
                    <span class="progress-pct fw-bold" :style="{ color: progressColor(chapter.progresso) }">
                      {{ chapter.progresso }}%
                    </span>
                    <div class="progress-bar-track">
                      <div
                        class="progress-bar-fill"
                        :style="{
                          width: chapter.progresso + '%',
                          backgroundColor: progressColor(chapter.progresso)
                        }"
                      ></div>
                    </div>
                  </div>
                </td>

                <!-- Rendimento (DS: PerformanceCell) -->
                <!-- Produção: traço em NotSent/NotStarted; PerformanceCell nos demais -->
                <td>
                  <template v-if="chapter.status.key === 'nao_enviada' || chapter.status.key === 'nao_iniciada'">
                    <span class="text-muted">–</span>
                  </template>
                  <template v-else>
                    <div v-if="chapter.rendimento !== null && chapter.rendimento !== undefined" class="performance-cell">
                      <span v-if="chapter.rendimento > 0" class="perf-value">{{ chapter.rendimento }}%</span>
                      <span class="perf-badge" :class="perfBadgeVariant(chapter.rendimento)">
                        {{ perfBadgeLabel(chapter.rendimento) }}
                      </span>
                    </div>
                    <span v-else class="perf-badge perf-nodata">Não há dados para exibir</span>
                  </template>
                </td>

                <!-- Alunos -->
                <td class="text-muted">
                  <span>{{ chapter.linkedCount }} de {{ totalStudents }}</span>
                </td>

                <!-- Status (DS: b-badge pill light variant) -->
                <td>
                  <span class="status-badge" :class="statusBadgeClass(chapter.status.key)">
                    {{ chapter.status.label }}
                  </span>
                </td>

                <!-- Ações (AS-IS: send | group_remove | pie_chart por status) -->
                <td class="col-sticky-right">
                  <div class="actions-flat">
                    <!-- Botão Enviar / Adicionar alunos -->
                    <button
                      v-if="isSendVisible(chapter)"
                      class="action-btn action-btn--send"
                      :title="sendBtnTitle(chapter)"
                      :aria-label="sendBtnTitle(chapter)"
                      @click="handleSendClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:20px">{{ sendBtnIcon(chapter) }}</span>
                    </button>

                    <!-- Botão Desvincular: nao_iniciada, iniciada -->
                    <button
                      v-if="isPauseVisible(chapter)"
                      class="action-btn action-btn--pause"
                      title="Desvincular alunos da missão"
                      aria-label="Desvincular alunos da missão"
                      @click="handlePauseClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:20px">group_remove</span>
                    </button>

                    <!-- Botão Relatório: iniciada, pausada, finalizada -->
                    <button
                      v-if="isReportVisible(chapter)"
                      class="action-btn action-btn--report"
                      title="Relatório da Missão"
                      aria-label="Relatório da Missão"
                      @click="handleReportClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:20px">pie_chart</span>
                    </button>

                    <!-- Botão Detalhes: sempre visível -->
                    <button
                      class="action-btn action-btn--details"
                      title="Detalhes"
                      aria-label="Detalhes da missão"
                      @click="handleDetailsClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:20px">visibility</span>
                    </button>

                    <!-- Botão Copiar Link: apenas iniciada (AS-IS: v-if guideLinkUrl && status === Started) -->
                    <button
                      v-if="isLinkVisible(chapter)"
                      class="action-btn action-btn--link"
                      title="Copiar link da missão"
                      aria-label="Copiar link da missão"
                      @click="handleLinkClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:20px">link</span>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="filteredChapters.length === 0">
                <td colspan="9" class="td-empty">
                  Nenhum capítulo encontrado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação (DS: ListTablePagination) -->
        <div class="table-pagination">
          <span class="pg-info">
            Exibindo {{ paginationFrom }} a {{ paginationTo }} de {{ filteredChapters.length }} entradas
          </span>
          <div class="pg-controls">
            <button class="pg-btn" :disabled="currentPage === 1" @click="currentPage--">
              <span class="material-symbols-outlined" style="font-size:16px">chevron_left</span>
            </button>
            <span
              v-for="p in totalPages"
              :key="p"
              class="pg-num"
              :class="{ active: p === currentPage }"
              @click="currentPage = p"
            >{{ p }}</span>
            <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage++">
              <span class="material-symbols-outlined" style="font-size:16px">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Card Legendas (DS: LegendEnum.vue + SemaphoreStatus) ── -->
      <div class="ds-card legends-card">
        <!-- Progresso -->
        <div class="legend-body">
          <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap text-sm">
            <div>Progresso:</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#14693a"></span> Finalizado = 100%</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#28c76f"></span> Satisfatório ≥ 80%</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#ff9f43"></span> Moderado ≤ 50%</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#ea5455"></span> Crítico &lt; 50%</div>
          </div>
        </div>
        <hr class="legend-hr" />
        <!-- Rendimento -->
        <div class="legend-body">
          <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap text-sm">
            <div>Rendimento:</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#6e63e8"></span> Avançado ≥70% de acertos</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#28c76f"></span> Proficiente ≥50% de acertos</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#ff9f43"></span> Básico ≥25% de acertos</div>
            <div class="semaphore-item"><span class="semaphore-dot" style="background:#ea5455"></span> Abaixo do Básico &lt;25% de acertos</div>
          </div>
        </div>
      </div>

    </main>

    <!-- ── Drawer ── -->
    <TrilhasAZDrawer
      v-model="drawerOpen"
      :chapter="drawerChapter"
      :mode="drawerMode"
      :is-first-enable="drawerIsFirstEnable"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppNavbar       from '@/shared/components/AppNavbar.vue'
import Sidebar         from '@/shared/components/Sidebar.vue'
import ClassSelector   from '@/modules/calendario/components/ClassSelector.vue'
import TrilhasAZDrawer from '../components/TrilhasAZDrawer.vue'
import SubjectIcon     from '../components/SubjectIcon.vue'
import { ESelect }     from '@/shared/components/base/index.js'
import { useTrilhasAZ } from '../composables/useTrilhasAZ.js'

const { book, chapters, getTotalStudents, habilitarCapitulo, getLinkedCount } = useTrilhasAZ()

// ── Layout ────────────────────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)
const totalStudents = getTotalStudents()

// ── Estado da view ────────────────────────────────────────────────────────────
const selectedUnit   = ref(null)
const selectedStatus = ref(null)
const searchQuery    = ref('')
const pageSize       = ref(10)
const currentPage    = ref(1)

// Reseta para página 1 sempre que um filtro mudar
watch([selectedUnit, selectedStatus, searchQuery, pageSize], () => {
  currentPage.value = 1
})

// ── Opções dos filtros (DS: Filters.vue) ──────────────────────────────────────
const unitOptions = [
  { value: 1, label: 'Unidade 1' },
  { value: 2, label: 'Unidade 2' },
  { value: 3, label: 'Unidade 3' }
]

const statusOptions = [
  { value: 'nao_enviada',  label: 'Não enviada' },
  { value: 'pausada',      label: 'Pausada' },
  { value: 'nao_iniciada', label: 'Não iniciada' },
  { value: 'iniciada',     label: 'Iniciada' },
  { value: 'finalizada',   label: 'Finalizada' }
]

// ── Drawer ────────────────────────────────────────────────────────────────────
const drawerOpen    = ref(false)
const drawerChapter = ref(null)
const drawerMode    = ref('enviar')
const drawerIsFirstEnable = ref(false)

function openDrawer (chapter, mode, options = {}) {
  drawerChapter.value = chapter
  drawerMode.value    = mode
  drawerIsFirstEnable.value = Boolean(options.isFirstEnable)
  drawerOpen.value    = true
}

// ── Helpers: unidade por capítulo ─────────────────────────────────────────────
function getUnidade (chapterId) {
  return Math.ceil(chapterId / 2) // IDs 1-2 → 1; 3-4 → 2; 5-6 → 3
}

// ── Visibilidade AS-IS (igual a produção teacher-context/educationSystem/missions/List.vue) ─
// send         → nao_enviada | pausada | finalizada
// group_remove → nao_iniciada | iniciada
// pie_chart    → iniciada | pausada | finalizada
// visibility   → sempre visível
// link         → apenas iniciada (+ guideLinkUrl na produção)

// Tooltip do cabeçalho de STATUS (texto de produção)
const statusColTooltip = [
  '• Não enviada: A missão nunca foi enviada aos alunos. Você poderá enviá-la a qualquer momento.',
  '• Não iniciada: A missão foi habilitada mas ainda não tem alunos vinculados, ou a data de início ainda não chegou.',
  '• Iniciada: A missão está sendo exibida e realizada pelos alunos e você poderá ver o relatório.',
  '• Pausada: A missão já foi enviada pelo menos 1 vez, mas está indisponível temporariamente. Você poderá enviá-la novamente a qualquer momento.',
  '• Finalizada: A missão foi finalizada e você poderá ver o relatório. Missões finalizadas podem ser reenviadas sem perda do histórico.',
].join('\n\n')

/** Ícone e título do botão de envio variam pelo estado do capítulo */
function sendBtnIcon (chapter) {
  const s = chapter?.status?.key
  // Missão habilitada (com ou sem alunos, inclusive pausada) → adicionar/incluir alunos
  return (s === 'nao_iniciada' || s === 'iniciada' || s === 'pausada') ? 'group_add' : 'send'
}

function sendBtnTitle (chapter) {
  const s = chapter?.status?.key
  return (s === 'nao_iniciada' || s === 'iniciada' || s === 'pausada') ? 'Adicionar alunos à missão' : 'Enviar missão'
}

function isSendVisible (chapter) {
  const s = chapter?.status?.key
  // Casos base AS-IS: não enviada, pausada total (0 vinculados) ou finalizada
  if (s === 'nao_enviada' || s === 'pausada' || s === 'finalizada') return true
  // Estado parcial: missão ativa mas ainda há alunos sem receber a missão.
  // O drawer abrirá em modo 'enviar' e mostrará apenas os alunos sem isLinked.
  if (s === 'iniciada' || s === 'nao_iniciada') {
    return chapter.studentsData?.some(sd => !sd.isLinked) ?? false
  }
  return false
}

function isPauseVisible (chapter) {
  const s = chapter?.status?.key
  if (s !== 'nao_iniciada' && s !== 'iniciada') return false
  // Só mostra desvincular se há alunos vinculados (sem alunos não há o que desvincular)
  return chapter.studentsData?.some(sd => sd.isLinked) ?? false
}

function isReportVisible (chapter) {
  const s = chapter?.status?.key
  return s === 'iniciada' || s === 'pausada' || s === 'finalizada'
}

// link → apenas iniciada (AS-IS: guideLinkUrl && status === Started)
function isLinkVisible (chapter) {
  const s = chapter?.status?.key
  return s === 'iniciada'
}

// ── Handlers (AS-IS: botões sempre clicáveis quando visíveis) ───────────────────────
function handleSendClick (chapter) {
  const isFirstEnable = !chapter.enabled
  openDrawer(chapter, 'enviar', { isFirstEnable })
}

function handlePauseClick (chapter) {
  openDrawer(chapter, 'desvincular')
}

function handleReportClick (chapter) {
  // Placeholder — rota de relatório ainda não implementada
  alert(`Relatório da missão: ${chapter.nome}`)
}

function handleDetailsClick (chapter) {
  // Placeholder — abre drawer/modal de detalhes da missão
  alert(`Detalhes: ${chapter.nome}`)
}

function handleLinkClick (chapter) {
  // AS-IS: copia deeplink para clipboard
  const fakeUrl = `https://app.educacross.com.br/mission/${chapter.id}`
  navigator.clipboard.writeText(fakeUrl).then(() => {
    alert(`Link copiado: ${fakeUrl}`)
  }).catch(() => {
    alert(`Link da missão: ${fakeUrl}`)
  })
}

// ── Filtragem composta (busca + unidade + status) ─────────────────────────────
const filteredChapters = computed(() => {
  let result = chapters.value

  // Filtro por unidade (ESelect emite o objeto inteiro; extrai .value)
  const unitVal = selectedUnit.value?.value ?? selectedUnit.value
  if (unitVal != null) {
    result = result.filter(c => getUnidade(c.id) === unitVal)
  }

  // Filtro por status (ESelect emite o objeto inteiro; extrai .value)
  const statusVal = selectedStatus.value?.value ?? selectedStatus.value
  if (statusVal != null) {
    result = result.filter(c => c.status.key === statusVal)
  }

  // Filtro por busca
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.nome.toLowerCase().includes(q))
  }

  return result
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredChapters.value.length / pageSize.value))
)

const paginatedChapters = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredChapters.value.slice(start, start + pageSize.value)
})

const paginationFrom = computed(() =>
  filteredChapters.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1
)

const paginationTo = computed(() =>
  Math.min(currentPage.value * pageSize.value, filteredChapters.value.length)
)

// ── Helpers visuais ───────────────────────────────────────────────────────────
function formatDate (dateStr) {
  if (!dateStr) return '–'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

// Cores de progresso (DS: getVariantByRule enum="progress")
function progressColor (pct) {
  if (pct >= 100) return '#14693a'  // Finalizado
  if (pct >= 80)  return '#28c76f'  // Satisfatório — $success
  if (pct >= 50)  return '#ff9f43'  // Moderado — $warning
  return '#ea5455'                   // Crítico — $danger
}

// Variante do badge de rendimento (DS: PerformanceCell → getVariantByRule)
function perfBadgeVariant (rend) {
  if (rend >= 70) return 'perf-primary'   // Avançado — $primary
  if (rend >= 50) return 'perf-success'   // Proficiente — $success
  if (rend >= 25) return 'perf-warning'   // Básico — $warning
  return 'perf-danger'                     // Abaixo do Básico — $danger
}

function perfBadgeLabel (rend) {
  if (rend >= 70) return 'Avançado'
  if (rend >= 50) return 'Proficiente'
  if (rend >= 25) return 'Básico'
  return 'Abaixo do Básico'
}

// Classe do badge de status (regras de negócio: laranja/verde/roxo)
function statusBadgeClass (statusKey) {
  const map = {
    nao_enviada:  'status-light-warning',
    pausada:      'status-light-danger',
    nao_iniciada: 'status-light-info',
    iniciada:     'status-light-success',
    finalizada:   'status-light-primary'
  }
  return map[statusKey] || 'status-light-warning'
}
</script>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────── */
.tz-page {
  min-height: 100vh;
  background: #efefef;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
}

.tz-main {
  margin-left: 240px;
  padding-top: 70px;
  padding-bottom: 40px;
  transition: margin-left 0.25s;
  min-height: 100vh;
}

.tz-main.sidebar-collapsed {
  margin-left: 70px;
}

/* ── Topbar ──────────────────────────────────────────────────────────────── */
.tz-topbar {
  padding: 12px 24px 0;
}

/* ── Breadcrumb ──────────────────────────────────────────────────────────── */
.tz-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 13px;
  color: #6e6b7b;
}

.bc-item { color: #6e6b7b; text-decoration: none; }
a.bc-item { color: #6e63e8; }
a.bc-item:hover { color: #5a50d6; }
.bc-item.active { color: #2c2c2c; font-weight: 500; }

.bc-sep {
  font-size: 11px;
  color: #b4b7bd;
  display: inline-flex;
  align-items: center;
}

/* ── Tabs (DS: Tab.vue) ──────────────────────────────────────────────────── */
.tz-tabs-row {
  display: flex;
  flex-direction: column-reverse;
  padding: 0 24px;
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .tz-tabs-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.tabs-container {
  display: flex;
  align-items: flex-end;
}

.tab-link {
  padding: 14px 24px 10px 24px;
  background: #fff;
  border: none;
  border-radius: 15px 15px 0 0;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  cursor: pointer;
  position: relative;
  z-index: 0;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.14);
  transform: translateX(calc(var(--idx, 0) * -10px));
  white-space: nowrap;
  transition: all 0.15s;
  text-decoration: none;
  display: inline-block;
}

.tab-link.active {
  background: #6e63e8;
  color: #fff;
  z-index: 1;
}

.tab-link:hover:not(.active) {
  background: #6e63e8;
  color: #fff;
}

.tab-title {
  font-size: 12px;
  font-weight: 700;
  color: #6e63e8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding-bottom: 10px;
}

.tab-line {
  border: 1px solid #6e63e8;
  height: 1px;
  width: 100%;
  margin-bottom: 1rem;
}

/* ── Cards DS ────────────────────────────────────────────────────────────── */
.ds-card {
  margin: 0 24px 16px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  overflow: hidden;
}

/* ── Title Card (DS: missions/Title.vue — b-card body-class="py-1") ────── */
.title-card .card-body {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.voltar-link {
  color: #6e6b7b;
  font-size: 14px;
  transition: color 0.15s;
}

.voltar-link:hover { color: #6e63e8; }

.btn-relatorio {
  padding: 0.5rem 1rem; /* DS: py-50 px-1 */
  font-size: 13px;
  font-weight: 500;
}

/* ── Filters Card (DS: missions/Filters.vue) ─────────────────────────────── */
.filters-card .card-body {
  padding: 1rem 1.5rem;
}

/* ── Table Card (DS: ListTableLocalSorting) ──────────────────────────────── */
.table-card {
  overflow: visible;
}

.table-toolbar {
  padding: 1rem 1.5rem;
}

.show-label {
  font-size: 14px;
  color: #6e6b7b;
  white-space: nowrap;
  margin-right: 0;
}

.per-page-select {
  width: 90px;
  min-width: 90px;
  padding: 6px 10px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  background: #fff;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
}

.per-page-select:focus {
  border-color: #6e63e8;
}

/* Search Input Group (DS: b-input-group com prepend) */
.search-input-group {
  display: flex;
  align-items: stretch;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.15s;
}

.search-input-group:focus-within {
  border-color: #6e63e8;
}

.search-prepend {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  background: #efefef;
  border-right: 1px solid #d8d6de;
  color: #6e6b7b;
  cursor: pointer;
}

.search-prepend .material-symbols-outlined {
  font-size: 18px;
}

.search-field {
  border: 0;
  outline: none;
  padding: 7px 12px;
  font-size: 14px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b;
  width: 100%;
  background: transparent;
}

.search-field::placeholder {
  color: #b4b7bd;
}

.btn-export {
  white-space: nowrap;
  font-size: 13px;
}

/* ── Tabela (DS: b-table dentro de ListTableLocalSorting) ─────────────────── */
.table-responsive {
  overflow-x: auto;
}

.tz-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tz-table .thead-row {
  background: transparent;
  border-bottom: 2px solid #ebe9f1;
}

.tz-table th {
  padding: 10px 16px;
  vertical-align: middle;
}

.th-content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6e6b7b;
  white-space: nowrap;
}

.th-info {
  font-size: 16px;
  cursor: help;
  opacity: 0.5;
}

.tz-table tbody tr {
  border-bottom: 1px solid #ebe9f1;
  transition: background 0.15s;
}

.tz-table tbody tr:hover {
  background: #f8f7ff;
}

.tz-table td {
  padding: 12px 16px;
  vertical-align: middle;
  color: #6e6b7b;
  font-size: 14px;
}

/* ── Sticky column (ações) — padrão TanStack Table ────────────────────── */
/* inset box-shadow funciona com border-collapse:collapse porque renderiza
   dentro da célula, sem ser recortado pelo collapse */
.tz-table .col-sticky-right {
  position: sticky;
  right: 0;
  z-index: 2;
  background-color: #fff;
  box-shadow: inset 4px 0 8px -4px rgba(34, 41, 47, 0.18);
}

/* thead sticky: fundo do cabeçalho */
.tz-table .thead-row .col-sticky-right {
  background-color: #fff;
}

/* hover: mantém o fundo ligeiramente roxo como as demais células */
.tz-table tbody tr:hover .col-sticky-right {
  background-color: #f8f7ff;
}

.td-empty {
  text-align: center;
  color: #b4b7bd;
  padding: 32px !important;
}

/* ── Badge Missão Plus (DS: b-badge variant="light-primary" pill) ──────── */
.badge-plus {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 50rem;
  background: rgba(110, 99, 232, 0.12);
  color: #6e63e8;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.plus-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-weight: 700;
  font-size: 14px;
}

/* ── Progresso (DS: ProgressBarHorizontalV2 reverse height="12px") ─────── */
.progress-cell {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  min-width: 120px;
}

.progress-pct {
  font-size: 13px;
}

.progress-bar-track {
  width: 100%;
  height: 12px;
  background: #ebe9f1;
  border-radius: 50rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 50rem;
  transition: width 0.4s ease;
}

/* ── Rendimento (DS: PerformanceCell) ──────────────────────────────────── */
.performance-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.perf-value {
  white-space: nowrap;
  width: 50px;
  font-size: 14px;
}

.perf-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50rem;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
}

.perf-primary  { background: rgba(110,99,232,0.12);  color: #6e63e8; }
.perf-success  { background: rgba(40,199,111,0.12);   color: #28c76f; }
.perf-warning  { background: rgba(255,159,67,0.12);   color: #ff9f43; }
.perf-danger   { background: rgba(234,84,85,0.12);    color: #ea5455; }
.perf-nodata   { background: rgba(110,99,232,0.12);   color: #7367f0; }

/* ── Status Badge (DS: b-badge pill variant="light-*") ────────────────── */
.status-badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 50rem;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.status-light-secondary { background: rgba(180,183,189,0.12); color: #b4b7bd; }
.status-light-info      { background: rgba(0,207,232,0.12);   color: #00cfe8; }
.status-light-primary   { background: rgba(110,99,232,0.12);  color: #6e63e8; }
.status-light-warning   { background: rgba(255,159,67,0.12);  color: #ff9f43; }
.status-light-success   { background: rgba(40,199,111,0.12);  color: #28c76f; }

/* ── Ações (botões de ação por linha) ──────────────────────────────────── */
.actions-flat {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s;
  padding: 0;
}

.action-btn:hover:not(.is-disabled) {
  background: rgba(0, 0, 0, 0.06);
}

.action-btn--send .material-symbols-outlined {
  color: #28c76f;
}

.action-btn--pause .material-symbols-outlined {
  color: #ea5455;
}

.action-btn--report .material-symbols-outlined {
  color: #7367f0;
}

.action-btn--details .material-symbols-outlined {
  color: #7367f0;
}

.action-btn--link .material-symbols-outlined {
  color: #7367f0;
}

.action-btn.is-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.action-btn.is-disabled .material-symbols-outlined {
  color: #b4b7bd;
}

/* ── Paginação (DS: ListTablePagination) ──────────────────────────────── */
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #ebe9f1;
}

.pg-info {
  font-size: 14px;
  color: #6e6b7b;
}

.pg-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pg-btn {
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  color: #6e6b7b;
  cursor: pointer;
  transition: all 0.15s;
}

.pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pg-btn:not(:disabled):hover { border-color: #6e63e8; color: #6e63e8; }

.pg-num {
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #6e6b7b;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
}

.pg-num:hover { border-color: #d8d6de; }
.pg-num.active { background: #6e63e8; color: #fff; border-color: #6e63e8; }

/* ── Legendas (DS: LegendEnum.vue + SemaphoreStatus) ──────────────────── */
.legends-card {
  border: none;
}

.legend-body {
  padding: 0.75rem 1.25rem;
}

.legend-hr {
  margin: 0;
  border: 0;
  border-top: 1px solid #ebe9f1;
}

.text-sm { font-size: 13px; }

.semaphore-item {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.semaphore-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Responsividade ──────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .tz-main {
    margin-left: 0 !important;
    padding-left: 16px;
    padding-right: 16px;
  }

  .ds-card {
    margin-left: 0;
    margin-right: 0;
  }

  .tz-tabs-row,
  .tz-breadcrumb {
    padding-left: 0;
    padding-right: 0;
  }

  .table-toolbar {
    padding: 0.75rem;
  }

  .tz-table td,
  .tz-table th {
    padding: 8px 10px;
  }

  .actions-flat {
    gap: 8px;
  }

  .action-icon {
    font-size: 18px;
  }
}
</style>

