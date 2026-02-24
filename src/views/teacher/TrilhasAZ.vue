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
        <div class="tz-turma-pills">
          <span class="turma-pill active">{{ book.turma }}</span>
          <span class="turma-pill">{{ book.ano }}</span>
          <button class="turma-pill turma-expand"><i class="bi bi-chevron-down"></i></button>
        </div>
        <span class="escola-label">
          <i class="bi bi-building"></i>
          {{ book.escola }}
        </span>
      </div>

      <!-- ── Breadcrumb ── -->
      <nav class="tz-breadcrumb">
        <RouterLink to="/" class="bc-item"><i class="bi bi-house-door"></i></RouterLink>
        <span class="bc-sep"><i class="bi bi-chevron-right"></i></span>
        <span class="bc-item">Trilhas AZ</span>
        <span class="bc-sep"><i class="bi bi-chevron-right"></i></span>
        <span class="bc-item active">{{ book.titulo }}</span>
      </nav>

      <!-- ── Tabs ── -->
      <div class="tz-tabs-row">
        <div class="tz-tabs">
          <button class="tz-tab active">Livros</button>
          <button class="tz-tab">Alunos</button>
          <button class="tz-tab">Ranking</button>
        </div>
        <EButton variant="outline-primary" size="small" icon="trophy">
          MISSÕES DO LIVRO
        </EButton>
      </div>

      <!-- ── Card do livro ── -->
      <div class="tz-book-card">
        <!-- Sub-header -->
        <div class="book-subheader">
          <button class="btn-back" @click="$router.back()">
            <i class="bi bi-chevron-left"></i> Voltar
          </button>

          <div class="book-title-section">
            <div class="book-icon">
              <i class="bi bi-book-fill"></i>
            </div>
            <span class="book-title">{{ book.titulo }}</span>
          </div>

          <EButton variant="outline-primary" size="small" icon="bar-chart">
            Relatório do livro
          </EButton>
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
              <i class="bi bi-search search-icon"></i>
              <EInput
                v-model="searchQuery"
                placeholder="Pesquisar por missão"
                size="small"
                class="search-input"
              />
            </div>
            <EButton variant="outline-secondary" size="small" icon="file-earmark-excel">
              Exportar em Excel
            </EButton>
          </div>
        </div>

        <!-- ── Tabela ── -->
        <div class="tz-table-wrap">
          <table class="tz-table">
            <thead>
              <tr>
                <th>MISSÃO <i class="bi bi-arrow-down-up"></i></th>
                <th>INÍCIO <i class="bi bi-arrow-down-up"></i></th>
                <th>FIM <i class="bi bi-arrow-down-up"></i></th>
                <th>
                  PROGRESSO DA TURMA
                  <i class="bi bi-info-circle"></i>
                  <i class="bi bi-arrow-down-up"></i>
                </th>
                <th>
                  RENDIMENTO MÉDIO
                  <i class="bi bi-info-circle"></i>
                  <i class="bi bi-arrow-down-up"></i>
                </th>
                <th>
                  ALUNOS
                  <i class="bi bi-info-circle"></i>
                  <i class="bi bi-arrow-down-up"></i>
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
                    backgroundColor="#7367F0"
                    color="#fff"
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
                  <template v-if="chapter.status.key === 'nao_enviada'">
                    <EButton
                      variant="success"
                      size="small"
                      icon="play-fill"
                      :title="chapter.linkedCount >= getTotalStudents() ? 'Todos os alunos já foram vinculados' : 'Habilitar capítulo'"
                      @click="handleHabilitar(chapter)"
                    >
                      Habilitar
                    </EButton>
                  </template>

                  <template v-else-if="chapter.status.key === 'finalizada'">
                    <EButton
                      variant="outline-secondary"
                      size="small"
                      icon="arrow-clockwise"
                      title="Reiniciar ciclo do capítulo"
                      @click="handleHabilitar(chapter)"
                    >
                      Habilitar
                    </EButton>
                  </template>

                  <template v-else>
                    <EButton
                      variant="primary"
                      size="small"
                      icon="send-fill"
                      :disabled="chapter.linkedCount >= getTotalStudents()"
                      :title="chapter.linkedCount >= getTotalStudents() ? 'Todos os alunos já foram vinculados' : 'Enviar para alunos'"
                      @click="openDrawer(chapter, 'enviar')"
                    >
                      Enviar
                    </EButton>
                    <EButton
                      variant="warning"
                      size="small"
                      icon="pause-fill"
                      :disabled="chapter.linkedCount === 0"
                      :title="chapter.linkedCount === 0 ? 'Nenhum aluno vinculado para pausar' : 'Pausar alunos'"
                      class="ms-1"
                      @click="openDrawer(chapter, 'pausar')"
                    >
                      Pausar
                    </EButton>
                  </template>
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
              <i class="bi bi-chevron-left"></i>
            </button>
            <span
              v-for="p in totalPages"
              :key="p"
              class="pg-num"
              :class="{ active: p === currentPage }"
              @click="currentPage = p"
            >{{ p }}</span>
            <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage++">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- ── Legendas ── -->
        <div class="tz-legends">
          <div class="legend-group">
            <span class="legend-title">Progresso:</span>
            <span class="legend-item"><span class="leg-dot" style="background:#28C76F"></span> Finalizado = 100%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#FF9F43"></span> Satisfatório ≥ 60%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#EA5455"></span> Moderado ≥ 50%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#EA5455"></span> Crítico &lt; 50%</span>
          </div>
          <div class="legend-group">
            <span class="legend-title">Rendimento:</span>
            <span class="legend-item"><span class="leg-dot" style="background:#7367F0"></span> Avançado ≥ 70% de acertos</span>
            <span class="legend-item"><span class="leg-dot" style="background:#00CFE8"></span> Proficiente ≥ 50%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#FF9F43"></span> Básico ≥ 25%</span>
            <span class="legend-item"><span class="leg-dot" style="background:#EA5455"></span> Abaixo do Básico &lt; 25%</span>
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
import Sidebar   from '../../components/SidebarEducation.vue'
import TrilhasAZDrawer from '../../components/TrilhasAZDrawer.vue'
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

// ── Filtro / Paginação ────────────────────────────────────────────────────────
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
  if (pct >= 100) return '#28C76F'
  if (pct >= 60)  return '#FF9F43'
  return '#EA5455'
}

function rendimentoColor (rend) {
  if (rend === null || rend === undefined) return '#adb5bd'
  if (rend >= 70) return '#7367F0'   // Avançado
  if (rend >= 50) return '#00CFE8'   // Proficiente
  if (rend >= 25) return '#FF9F43'   // Básico
  return '#EA5455'                    // Abaixo do Básico
}
</script>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────── */
.tz-page {
  min-height: 100vh;
  background: #f4f5f7;
}

.tz-main {
  margin-left: 240px;
  padding-top: 70px;
  padding-bottom: 40px;
  transition: margin-left var(--transition-base, 0.25s);
  min-height: 100vh;
}

.tz-main.sidebar-collapsed {
  margin-left: 70px;
}

/* ── Topbar ──────────────────────────────────────────────────────────────── */
.tz-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 0;
}

.tz-turma-pills {
  display: flex;
  gap: 6px;
  align-items: center;
}

.turma-pill {
  padding: 5px 14px;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--primary, #7367F0);
  background: transparent;
  color: var(--primary, #7367F0);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast, 0.15s);
}

.turma-pill.active {
  background: var(--primary, #7367F0);
  color: #fff;
}

.turma-pill.turma-expand {
  padding: 5px 10px;
}

.escola-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary, #7367F0);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

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
  color: var(--gray-500, #6b7280);
  text-decoration: none;
}

.bc-item.active {
  color: var(--gray-700, #374151);
  font-weight: 500;
}

.bc-item:hover:not(.active) {
  color: var(--primary, #7367F0);
}

.bc-sep {
  font-size: 11px;
  color: var(--gray-400, #9ca3af);
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.tz-tabs-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  margin-bottom: 0;
}

.tz-tabs {
  display: flex;
  gap: 0;
}

.tz-tab {
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-500, #6b7280);
  cursor: pointer;
  transition: all var(--transition-fast, 0.15s);
}

.tz-tab.active {
  color: var(--primary, #7367F0);
  border-bottom-color: var(--primary, #7367F0);
}

.tz-tab:hover:not(.active) {
  color: var(--gray-700, #374151);
}

/* ── Book card ───────────────────────────────────────────────────────────── */
.tz-book-card {
  margin: 16px 24px;
  background: #fff;
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-md, 0 3px 12px rgba(47,43,61,0.12));
  overflow: hidden;
}

/* Sub-header do livro */
.book-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--gray-100, #f3f4f6);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: var(--primary, #7367F0);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-back:hover { text-decoration: underline; }

.book-title-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.book-icon {
  width: 32px;
  height: 32px;
  background: var(--primary, #7367F0);
  border-radius: var(--radius-md, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}

.book-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-800, #1f2937);
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
  color: var(--gray-500, #6b7280);
  margin: 0;
  white-space: nowrap;
}

.unit-pills {
  display: flex;
  gap: 8px;
}

.unit-pill {
  padding: 5px 14px;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--gray-300, #d1d5db);
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-600, #4b5563);
  cursor: pointer;
  transition: all var(--transition-fast, 0.15s);
}

.unit-pill.active {
  background: var(--primary, #7367F0);
  border-color: var(--primary, #7367F0);
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
  color: var(--gray-600, #4b5563);
}

.show-select {
  padding: 5px 10px;
  border: 1px solid var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 8px);
  font-size: 13px;
  color: var(--gray-700, #374151);
  background: #fff;
  cursor: pointer;
  outline: none;
}

.show-select:focus {
  border-color: var(--primary, #7367F0);
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
  background: #f9fafb;
  border-bottom: 2px solid var(--gray-200, #e5e7eb);
}

.tz-table th {
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gray-500, #6b7280);
  white-space: nowrap;
}

.tz-table th i {
  cursor: pointer;
  margin-left: 3px;
  font-size: 10px;
  opacity: 0.5;
}

.tz-table tbody tr {
  border-bottom: 1px solid var(--gray-100, #f3f4f6);
  transition: background var(--transition-fast, 0.15s);
}

.tz-table tbody tr:hover {
  background: #fafafe;
}

.tz-table td {
  padding: 12px 16px;
  vertical-align: middle;
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
  color: var(--gray-800, #1f2937);
  margin-bottom: 3px;
}

.plus-badge {
  font-size: 10px;
  padding: 2px 8px !important;
  margin-top: 2px;
}

/* Datas */
.td-date {
  color: var(--gray-600, #4b5563);
  white-space: nowrap;
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
  color: var(--gray-700, #374151);
}

.progress-bar-bg {
  flex: 1;
  height: 8px;
  background: var(--gray-100, #f3f4f6);
  border-radius: var(--radius-full, 9999px);
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
  color: var(--gray-600, #4b5563);
  white-space: nowrap;
}

/* Ações */
.td-actions {
  white-space: nowrap;
}

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
  color: var(--gray-500, #6b7280);
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
  border: 1px solid var(--gray-300, #d1d5db);
  border-radius: var(--radius-sm, 4px);
  color: var(--gray-600, #4b5563);
  cursor: pointer;
  font-size: 12px;
  transition: all var(--transition-fast, 0.15s);
}

.pg-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pg-btn:not(:disabled):hover {
  border-color: var(--primary, #7367F0);
  color: var(--primary, #7367F0);
}

.pg-num {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm, 4px);
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-600, #4b5563);
  cursor: pointer;
  transition: all var(--transition-fast, 0.15s);
  border: 1px solid transparent;
}

.pg-num:hover { border-color: var(--gray-300, #d1d5db); }

.pg-num.active {
  background: var(--primary, #7367F0);
  color: #fff;
}

/* ── Legendas ────────────────────────────────────────────────────────────── */
.tz-legends {
  display: flex;
  gap: 32px;
  padding: 10px 20px 16px;
  flex-wrap: wrap;
}

.legend-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.legend-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-600, #4b5563);
  white-space: nowrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--gray-500, #6b7280);
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
