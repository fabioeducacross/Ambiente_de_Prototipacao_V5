<template>
  <div class="tz-page">
    <!-- Navbar -->
    <AppNavbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" />

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
        <span class="bc-item">Trilhas AZ</span>
        <span class="bc-sep"><span class="material-symbols-outlined" style="font-size:14px">chevron_right</span></span>
        <span class="bc-item active">{{ book.titulo }}</span>
      </nav>

      <!-- ── Tabs ── -->
      <div class="tz-tabs-row">
        <div class="tz-tabs">
          <button class="tz-tab active" style="--idx:0">Livros</button>
          <button class="tz-tab" style="--idx:1">Alunos</button>
          <button class="tz-tab" style="--idx:2">Ranking</button>
        </div>
        <span class="missoes-label">MISSÕES DO LIVRO</span>
      </div>
      <div class="tz-tab-line"></div>

      <!-- ── Card do livro ── -->
      <div class="tz-book-card">
        <!-- Sub-header -->
        <div class="card-body py-1">
          <div class="row align-items-center">
            <div class="col-md-3 col-12">
              <a href="#" class="text-decoration-none" @click.prevent="$router.back()">
                <div class="d-flex align-items-center">
                  <span class="material-symbols-outlined">chevron_left</span>
                  <span class="text-decoration-underline">Voltar</span>
                </div>
              </a>
            </div>
            <div class="col-md-6 col-12">
              <div class="d-flex align-items-center justify-content-center gap-2 my-2 my-md-0">
                <SubjectIcon :disciplina="book.disciplina" :size="24" />
                <span class="m-0 fw-bold">{{ book.titulo }}</span>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="d-flex align-items-center justify-content-md-end">
                <button type="button" class="btn py-1 px-1 d-flex align-items-center gap-1 btn-primary">
                  <span class="material-symbols-outlined" style="font-size:16px">pie_chart</span> Relatório do livro
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Escolha de unidade -->
        <div class="unit-selector">
          <p class="unit-label">Escolha a unidade que deseja exibir:</p>
          <div class="unit-pills">
            <button
              v-for="u in 4"
              :key="u"
              class="unit-pill"
              :class="{ active: selectedUnit === u }"
              @click="selectedUnit = u"
            >
              Unidade {{ u }}
            </button>
          </div>
        </div>

        <!-- ── Toolbar ── -->
        <div class="tz-toolbar">
          <div class="toolbar-left">
            <span class="show-label">Mostrar</span>
            <select v-model="pageSize" class="show-select">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>
          <div class="toolbar-right">
            <div class="search-wrap">
              <span class="material-symbols-outlined search-icon" style="font-size:16px">search</span>
              <EInput
                v-model="searchQuery"
                placeholder="Pesquisar por missão"
                size="small"
                class="search-input"
              />
            </div>
            <EButton variant="outline-secondary" size="small" icon="file_download">
              Exportar em Excel
            </EButton>
          </div>
        </div>

        <!-- ── Tabela ── -->
        <div class="tz-table-wrap">
          <table class="tz-table">
            <thead>
              <tr>
                <th>MISSÃO <span class="material-symbols-outlined th-icon">swap_vert</span></th>
                <th>INÍCIO <span class="material-symbols-outlined th-icon">swap_vert</span></th>
                <th>FIM <span class="material-symbols-outlined th-icon">swap_vert</span></th>
                <th>
                  PROGRESSO DA TURMA
                  <span class="material-symbols-outlined th-icon">info</span>
                  <span class="material-symbols-outlined th-icon">swap_vert</span>
                </th>
                <th>
                  RENDIMENTO MÉDIO
                  <span class="material-symbols-outlined th-icon">info</span>
                  <span class="material-symbols-outlined th-icon">swap_vert</span>
                </th>
                <th>
                  ALUNOS
                  <span class="material-symbols-outlined th-icon">info</span>
                  <span class="material-symbols-outlined th-icon">swap_vert</span>
                </th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chapter in paginatedChapters" :key="chapter.id">
                <!-- Missão -->
                <td class="td-mission">
                  <span class="mission-name">{{ chapter.nome }}</span>
                  <EBadge
                    v-if="chapter.isMissaoPlus"
                    backgroundColor="rgba(110,99,232,0.12)"
                    color="#6e63e8"
                    pill
                    class="plus-badge"
                  >
                    + Missão Plus
                  </EBadge>
                </td>

                <!-- Início -->
                <td class="td-date">{{ formatDate(chapter.inicio) }}</td>

                <!-- Fim -->
                <td class="td-date">{{ formatDate(chapter.fim) }}</td>

                <!-- Progresso -->
                <td class="td-progress">
                  <div class="progress-wrap">
                    <span class="progress-pct">{{ chapter.progresso }}%</span>
                    <div class="progress-bar-bg">
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

                <!-- Rendimento -->
                <td class="td-rendimento">
                  <template v-if="chapter.rendimento !== null">
                    <span
                      class="rend-dot"
                      :style="{ backgroundColor: rendimentoColor(chapter.rendimento) }"
                    ></span>
                    {{ chapter.rendimento }}%
                  </template>
                  <span v-else class="rend-nodata">–</span>
                </td>

                <!-- Alunos -->
                <td class="td-alunos">
                  {{ chapter.linkedCount }} de {{ getTotalStudents() }}
                </td>

                <!-- Ações -->
                <td class="td-actions">
                  <div class="actions-wrap">
                    <button
                      class="act-btn"
                      :class="actionBtnVariant(chapter)"
                      :title="actionBtnTitle(chapter)"
                      @click="handleActionClick(chapter)"
                    >
                      <span class="material-symbols-outlined" style="font-size:16px">{{ actionBtnIcon(chapter) }}</span>
                    </button>
                    <button class="act-btn act-settings" title="Configurações">
                      <span class="material-symbols-outlined" style="font-size:16px">settings</span>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="filteredChapters.length === 0">
                <td colspan="7" class="td-empty">Nenhum capítulo encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ── Paginação ── -->
        <div class="tz-pagination">
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

        <div class="tz-legends">
          <!-- Linha 1: Progresso -->
          <div class="legend-row">
            <span class="legend-title">Progresso:</span>
            <span class="legend-item"><span class="leg-dot" style="background:#14693a"></span> Finalizado = 100%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#28c76f"></span> Satisfatório ≥ 80%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#ff9f43"></span> Moderado ≤ 50%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#ea5455"></span> Crítico &lt; 50%</span>
          </div>
          <div class="legend-divider"></div>
          <!-- Linha 2: Rendimento -->
          <div class="legend-row">
            <span class="legend-title">Rendimento:</span>
            <span class="legend-item"><span class="leg-dot" style="background:#6e63e8"></span> Avançado ≥70% de acertos</span>
            <span class="legend-item"><span class="leg-dot" style="background:#28c76f"></span> Proficiente ≤50% de acertos</span>
            <span class="legend-item"><span class="leg-dot" style="background:#ff9f43"></span> Básico ≤25% de acertos</span>
            <span class="legend-item"><span class="leg-dot" style="background:#ea5455"></span> Abaixo do Básico ≤35% de acertos</span>
          </div>
        </div>
      </div>

    </main>

    <!-- ── Drawer ── -->
    <TrilhasAZDrawer
      v-model="drawerOpen"
      :chapter="drawerChapter"
      :mode="drawerMode"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '../../components/AppNavbar.vue'
import Sidebar        from '../../components/Sidebar.vue'
import ClassSelector  from '../../components/calendar/ClassSelector.vue'
import TrilhasAZDrawer from '../../components/TrilhasAZDrawer.vue'
import SubjectIcon    from '../../components/SubjectIcon.vue'
import { EButton, EBadge, EInput } from '../../components/base/index.js'
import { useTrilhasAZ } from '../../composables/useTrilhasAZ.js'

const { book, chapters, getTotalStudents, habilitarCapitulo } = useTrilhasAZ()

// ── Layout ────────────────────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)

// ── Estado da view ────────────────────────────────────────────────────────────
const selectedUnit  = ref(1)
const searchQuery   = ref('')
const pageSize      = ref(10)
const currentPage   = ref(1)

// ── Drawer ────────────────────────────────────────────────────────────────────
const drawerOpen    = ref(false)
const drawerChapter = ref(null)
const drawerMode    = ref('enviar')

function openDrawer (chapter, mode) {
  drawerChapter.value = chapter
  drawerMode.value    = mode
  drawerOpen.value    = true
}

function handleHabilitar (chapter) {
  habilitarCapitulo(chapter.id)
  openDrawer(chapter, 'enviar')
}

// ── Helpers de ação da tabela ─────────────────────────────────────────────────
function actionBtnIcon (chapter) {
  return chapter.status.key === 'finalizada' ? 'refresh' : 'send'
}

function actionBtnVariant (chapter) {
  if (chapter.status.key === 'finalizada') return 'act-secondary'
  if (chapter.status.key === 'nao_enviada') return 'act-success'
  return 'act-primary'
}

function actionBtnTitle (chapter) {
  if (chapter.status.key === 'finalizada') return 'Reiniciar ciclo do capítulo'
  if (chapter.status.key === 'nao_enviada') return 'Habilitar capítulo'
  if (chapter.linkedCount >= getTotalStudents()) return 'Todos os alunos já foram vinculados'
  return 'Enviar para alunos'
}

function handleActionClick (chapter) {
  if (chapter.status.key === 'nao_enviada' || chapter.status.key === 'finalizada') {
    handleHabilitar(chapter)
  } else {
    openDrawer(chapter, 'enviar')
  }
}

const filteredChapters = computed(() => {
  if (!searchQuery.value.trim()) return chapters.value
  const q = searchQuery.value.toLowerCase()
  return chapters.value.filter(c => c.nome.toLowerCase().includes(q))
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

function progressColor (pct) {
  if (pct >= 100) return '#14693a'  // Finalizado — $legend-complete
  if (pct >= 80)  return '#28c76f'  // Satisfatório — $legend-proficient
  if (pct >= 50)  return '#ff9f43'  // Moderado — $legend-basic
  return '#ea5455'                   // Crítico — $legend-below-basic
}

function rendimentoColor (rend) {
  if (rend === null || rend === undefined) return '#b4b7bd'  // $legend-not-completed
  if (rend >= 70) return '#6e63e8'   // $legend-advanced
  if (rend >= 50) return '#28c76f'   // $legend-proficient
  if (rend >= 25) return '#ff9f43'   // $legend-basic
  return '#ea5455'                    // $legend-below-basic
}
</script>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────── */
.tz-page {
  min-height: 100vh;
  background: #efefef; /* $theme-background */
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #6e6b7b; /* $color-gray-themeBodyText */
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

/* topbar delegado ao ClassSelector */

/* ── Breadcrumb ──────────────────────────────────────────────────────────── */
.tz-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 13px;
  color: var(--gray-500, #6b7280);
}

.bc-item {
  color: #6e6b7b;
  text-decoration: none;
}

a.bc-item {
  color: var(--primary, #7367F0);
}

a.bc-item:hover {
  color: var(--primary-dark, #5E50EE);
}

.bc-item.active {
  color: #2c2c2c;
  font-weight: 500;
}

.bc-sep {
  font-size: 11px;
  color: #b4b7bd;
  display: inline-flex;
  align-items: center;
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.tz-tabs-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 24px;
  margin-bottom: 0;
}

.tz-tab-line {
  border: 1px solid var(--primary, #7367F0);
  height: 1px;
  width: 100%;
  margin-bottom: 1rem;
}

.tz-tabs {
  display: flex;
  align-items: flex-end;
}

.tz-tab {
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
  transform: translateX(calc(var(--idx, 0) * -8px));
  white-space: nowrap;
  transition: all 0.15s;
}

.tz-tab.active {
  background: var(--primary, #6e63e8);
  color: #fff;
  z-index: 2;
}

.tz-tab:hover:not(.active) {
  background: var(--primary, #6e63e8);
  color: #fff;
}

.missoes-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary, #7367F0);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding-bottom: 10px;
}

/* ── Book card ───────────────────────────────────────────────────────────── */
.tz-book-card {
  margin: 16px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(30,30,30,0.09);
  overflow: hidden;
}

/* Seletor de unidade */
.unit-selector {
  padding: 12px 20px;
  border-bottom: 1px solid var(--gray-100, #f3f4f6);
  display: flex;
  align-items: center;
  gap: 16px;
}

.unit-label {
  font-size: 13px;
  color: #6e6b7b;
  margin: 0;
  white-space: nowrap;
}

.unit-pills {
  display: flex;
  gap: 8px;
}

.unit-pill {
  padding: 5px 14px;
  border-radius: 50rem;
  border: 1px solid #babfc7;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #5e5873;
  cursor: pointer;
  transition: all 0.15s;
}

.unit-pill.active {
  background: #6e63e8;
  border-color: #6e63e8;
  color: #fff;
}

/* ── Toolbar ─────────────────────────────────────────────────────────────── */
.tz-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--gray-100, #f3f4f6);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.show-label {
  font-size: 13px;
  color: #6e6b7b;
}

.show-select {
  padding: 5px 10px;
  border: 1px solid #babfc7;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #5e5873;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.show-select:focus {
  border-color: #6e63e8;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  font-size: 14px;
  color: var(--gray-400, #9ca3af);
  pointer-events: none;
  z-index: 1;
}

.search-input {
  padding-left: 32px !important;
  min-width: 220px;
}

/* ── Tabela ──────────────────────────────────────────────────────────────── */
.tz-table-wrap {
  overflow-x: auto;
}

.tz-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.tz-table thead tr {
  background: #f8f8f8;
  border-bottom: 2px solid #ebe9f1;
}

.tz-table th {
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6e6b7b;
  white-space: nowrap;
}

.th-icon {
  font-size: 13px;
  cursor: pointer;
  opacity: 0.5;
  vertical-align: middle;
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
}

.td-empty {
  text-align: center;
  color: var(--gray-400, #9ca3af);
  padding: 32px !important;
}

/* Missão */
.td-mission {
  max-width: 260px;
}

.mission-name {
  display: block;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 3px;
}

.plus-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px !important;
  margin-top: 3px;
  border: 1px solid rgba(110,99,232,0.25);
}

/* Datas */
.td-date {
  color: #6e6b7b;
  white-space: nowrap;
  font-size: 13px;
}

/* Progresso */
.td-progress { min-width: 160px; }

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-pct {
  font-size: 12px;
  font-weight: 700;
  min-width: 34px;
  color: #2c2c2c;
}

.progress-bar-bg {
  flex: 1;
  height: 8px;
  background: #ebe9f1;
  border-radius: 50rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-full, 9999px);
  transition: width 0.4s ease;
}

/* Rendimento */
.td-rendimento {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  font-size: 13px;
}

.td-rendimento .rend-nodata {
  color: var(--gray-400, #9ca3af);
}

.rend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Alunos */
.td-alunos {
  font-size: 13px;
  color: #5e5873;
  white-space: nowrap;
  font-weight: 600;
}

/* Ações */
.td-actions {
  white-space: nowrap;
}

.actions-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.act-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
  background: transparent;
  padding: 0;
}

.act-btn:hover {
  filter: brightness(0.85);
  transform: scale(1.08);
}

.act-btn.act-primary  { color: #6e63e8; background: rgba(110,99,232,0.12); }
.act-btn.act-success  { color: #28c76f; background: rgba(40,199,111,0.12); }
.act-btn.act-secondary { color: #b4b7bd; background: rgba(180,183,189,0.12); }
.act-settings          { color: #b4b7bd; background: rgba(180,183,189,0.12); }

.ms-1 { margin-left: 6px; }

/* ── Paginação ───────────────────────────────────────────────────────────── */
.tz-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid var(--gray-100, #f3f4f6);
}

.pg-info {
  font-size: 12px;
  color: #6e6b7b;
}

.pg-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pg-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #babfc7;
  border-radius: 4px;
  color: #5e5873;
  cursor: pointer;
  transition: all 0.15s;
}

.pg-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pg-btn:not(:disabled):hover {
  border-color: #6e63e8;
  color: #6e63e8;
}

.pg-num {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #5e5873;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
}

.pg-num:hover { border-color: #babfc7; }

.pg-num.active {
  background: #6e63e8;
  color: #fff;
}

/* ── Legendas ────────────────────────────────────────────────────────────── */
.tz-legends {
  display: flex;
  flex-direction: column;
  padding: 8px 20px 16px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 8px 0;
}

.legend-divider {
  width: 100%;
  height: 1px;
  background: #ebe9f1;
}

.legend-title {
  font-size: 11px;
  font-weight: 700;
  color: #5e5873;
  white-space: nowrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6e6b7b;
  white-space: nowrap;
}

.leg-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
