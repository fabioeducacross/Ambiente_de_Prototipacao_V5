<template>
  <aside class="sidebar" :class="[{ collapsed }, `theme-${theme}`]">
    <!-- Navigation Menu -->
    <nav class="sidebar-nav">

      <!-- ── PAINEL INICIAL ─────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Painel Inicial</div>
        <RouterLink to="/professor" class="nav-item" :class="{ active: route.path === '/professor' }">
          <MaterialIcon name="home" :size="18" />
          <span>Painel Inicial</span>
        </RouterLink>
      </div>

      <!-- ── MISSÕES DA ESCOLA ──────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Missões da Escola</div>
        <RouterLink to="/professor/missoes/criar" class="nav-item" :class="{ active: route.path === '/professor/missoes/criar' }">
          <MaterialIcon name="add_circle" :size="18" />
          <span>Criar Missão</span>
        </RouterLink>
        <RouterLink to="/professor/missoes" class="nav-item" :class="{ active: isMissionsRoute() }">
          <MaterialIcon name="mountain_flag" :size="18" />
          <span>Missões</span>
        </RouterLink>
      </div>

      <!-- ── RELATÓRIOS GERAIS ───────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Relatórios Gerais</div>
        <RouterLink to="/professor/relatorios/evidencias" class="nav-item" :class="{ active: route.path === '/professor/relatorios/evidencias' }">
          <MaterialIcon name="pie_chart" :size="18" />
          <span>Relatório de Evidências</span>
        </RouterLink>
        <RouterLink to="/professor/relatorios/habilidades" class="nav-item" :class="{ active: route.path === '/professor/relatorios/habilidades' }">
          <MaterialIcon name="graph_5" :size="18" />
          <span>Habilidades</span>
        </RouterLink>
        <RouterLink to="/professor/relatorios/acesso-alunos" class="nav-item" :class="{ active: route.path === '/professor/relatorios/acesso-alunos' }">
          <MaterialIcon name="person_play" :size="18" />
          <span>Acesso dos Alunos</span>
        </RouterLink>
        <RouterLink to="/professor/calendario" class="nav-item" :class="{ active: isCalendarRoute() }">
          <MaterialIcon name="calendar_month" :size="18" />
          <span>Calendário</span>
        </RouterLink>
      </div>

      <!-- ── JOGOS ─────────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Explorar Jogos</div>
        <RouterLink to="/professor/explorar-jogos/configuracao" class="nav-item" :class="{ active: route.path.startsWith('/professor/explorar-jogos') }">
          <MaterialIcon name="videogame_asset" :size="18" />
          <span>Configuração</span>
        </RouterLink>
        <RouterLink to="/professor/jogos/ranking" class="nav-item" :class="{ active: route.path === '/professor/jogos/ranking' }">
          <MaterialIcon name="emoji_events" :size="18" />
          <span>Ranking de Conquistas</span>
        </RouterLink>
      </div>

      <!-- ── GESTÃO (ESCOLA / TURMAS) ───────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Gestão (Escola / Turmas)</div>
        <RouterLink to="/professor/turmas" class="nav-item" :class="{ active: route.path === '/professor/turmas' }">
          <MaterialIcon name="group" :size="18" />
          <span>Turmas</span>
        </RouterLink>
        <RouterLink to="/professor/grupos" class="nav-item" :class="{ active: route.path === '/professor/grupos' }">
          <MaterialIcon name="folder_shared" :size="18" />
          <span>Grupos</span>
        </RouterLink>
        <RouterLink to="/professor/alunos" class="nav-item" :class="{ active: route.path === '/professor/alunos' }">
          <MaterialIcon name="sentiment_satisfied" :size="18" />
          <span>Alunos</span>
        </RouterLink>
      </div>

      <!-- ── PROGRAMAS / SISTEMAS (ATALHOS) ────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Programas / Sistemas (Atalhos)</div>
        <RouterLink to="/professor/programas/alfabetiza-manaus" class="nav-item" :class="{ active: route.path === '/professor/programas/alfabetiza-manaus' }">
          <MaterialIcon name="school" :size="18" />
          <span>Alfabetiza Manaus</span>
        </RouterLink>
        <RouterLink to="/professor/programas/letrar" class="nav-item" :class="{ active: route.path === '/professor/programas/letrar' }">
          <MaterialIcon name="school" :size="18" />
          <span>Letrar+JP</span>
        </RouterLink>
        <RouterLink to="/professor/programas/super-ensino-jp" class="nav-item" :class="{ active: route.path === '/professor/programas/super-ensino-jp' }">
          <MaterialIcon name="school" :size="18" />
          <span>Super Ensino João Pessoa</span>
        </RouterLink>
        <RouterLink to="/professor/programas/super-ensino-manaus" class="nav-item" :class="{ active: route.path === '/professor/programas/super-ensino-manaus' }">
          <MaterialIcon name="school" :size="18" />
          <span>Super Ensino Manaus</span>
        </RouterLink>
        <RouterLink to="/professor/programas/high-five" class="nav-item" :class="{ active: route.path === '/professor/programas/high-five' }">
          <MaterialIcon name="school" :size="18" />
          <span>High Five</span>
        </RouterLink>
      </div>

      <!-- ── AVALIAÇÕES ─────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Avaliações</div>
        <RouterLink to="/professor/avaliacoes/digital" class="nav-item" :class="{ active: route.path === '/professor/avaliacoes/digital' }">
          <MaterialIcon name="assignment" :size="18" />
          <span>Avaliação Digital</span>
        </RouterLink>
        <button class="nav-item">
          <MaterialIcon name="mic" :size="18" />
          <span>Fluência Leitora</span>
        </button>
        <RouterLink to="/professor/avaliacoes/flue-esc" class="nav-item" :class="{ active: route.path === '/professor/avaliacoes/flue-esc' }">
          <MaterialIcon name="record_voice_over" :size="18" />
          <span>FluEsc</span>
        </RouterLink>
        <RouterLink to="/professor/avaliacoes/fases-escrita" class="nav-item" :class="{ active: route.path === '/professor/avaliacoes/fases-escrita' }">
          <MaterialIcon name="checkbook" :size="18" />
          <span>Fases de Escrita</span>
        </RouterLink>
      </div>

      <!-- ── EXPEDIÇÕES ─────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Expedições</div>
        <RouterLink to="/professor/expedicao-leitura" class="nav-item" :class="{ active: route.path === '/professor/expedicao-leitura' }">
          <MaterialIcon name="airplane_ticket" :size="18" />
          <span>Expedição Leitura</span>
        </RouterLink>
      </div>

      <!-- ── EVENTOS ────────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Eventos</div>
        <RouterLink to="/professor/eventos/olimpiadas" class="nav-item" :class="{ active: route.path === '/professor/eventos/olimpiadas' }">
          <MaterialIcon name="emoji_events" :size="18" />
          <span>Olimpíadas</span>
        </RouterLink>
        <RouterLink to="/professor/eventos/extreme" class="nav-item" :class="{ active: route.path === '/professor/eventos/extreme' }">
          <MaterialIcon name="bolt" :size="18" />
          <span>Educacross Extreme</span>
        </RouterLink>
      </div>

      <!-- ── FORMAÇÃO E APOIO ───────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Formação e Apoio</div>
        <RouterLink to="/professor/ajudas-materiais" class="nav-item" :class="{ active: route.path === '/professor/ajudas-materiais' }">
          <MaterialIcon name="folder_open" :size="18" />
          <span>Ajudas e Materiais</span>
        </RouterLink>
        <button class="nav-item">
          <MaterialIcon name="account_balance" :size="18" />
          <span>Academia Educacross</span>
        </button>
      </div>

      <!-- ── EDUCATECA ──────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-title">Educateca</div>
        <RouterLink to="/professor/educateca" class="nav-item" :class="{ active: route.path === '/professor/educateca' }">
          <MaterialIcon name="auto_stories" :size="18" />
          <span>Educateca</span>
        </RouterLink>
      </div>

    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import MaterialIcon from './MaterialIcon.vue'

const route = useRoute()

const isCalendarRoute = () => route.path.startsWith('/professor/calendario') || route.path.startsWith('/teacher/calendar')
const isMissionsRoute = () =>
  (route.path.startsWith('/professor/missoes') && !route.path.startsWith('/professor/missoes/criar')) ||
  route.path === '/teacher/trilhas-az'
const isSistemaEnsinoRoute = () => route.path === '/teacher/trilhas-az'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'dark'
  }
})
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: #1e1e2d;
  color: #a1a5b7;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: var(--navbar-height);
  z-index: 100;
  height: calc(100vh - var(--navbar-height));
  transition: width 0.3s ease;
}

.sidebar.theme-yellow {
  background: #FFD643;
  color: #5e5873;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar.collapsed .nav-title,
.sidebar.collapsed .nav-item > span:not(.material-symbols-outlined),
.sidebar.collapsed .chevron {
  display: none;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px 0;
}

.sidebar.collapsed .nav-section {
  padding: 0;
  margin-bottom: 0.25rem;
}

/* Logo Header */
.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo {
  height: 32px;
  width: auto;
  display: block;
}

/* User Info */
.sidebar::-webkit-scrollbar-thumb:hover {
  background: #3a3a4d;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 0.5rem 0;
}

.nav-section {
  margin-bottom: 0.5rem;
}

.nav-title {
  padding: 0.75rem 1rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #565674;
}

.sidebar.theme-yellow .nav-title {
  color: #6e6b7b;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  color: #a1a5b7;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.sidebar.theme-yellow .nav-item {
  color: #5e5873;
  font-weight: 500;
}

.nav-item .material-symbols-outlined {
  flex-shrink: 0;
  font-size: 18px;
}

.nav-item span:not(.material-symbols-outlined) {
  flex: 1;
}

.nav-item .chevron {
  margin-left: auto;
  opacity: 0.6;
  font-size: 14px;
}

.nav-item:hover {
  background: #2d2d3f;
  color: #ffffff;
}

.sidebar.theme-yellow .nav-item:hover {
  background: rgba(110, 99, 232, 0.12);
  color: #2c2c2c;
}

.sidebar.theme-yellow .nav-item.active {
  background: #6e63e8;
  color: #ffffff;
}

.sidebar.theme-yellow .nav-item.active .material-symbols-outlined,
.sidebar.theme-yellow .nav-item.active .chevron {
  color: #ffffff;
  opacity: 1;
}

.nav-item.active {
  background: #7367F0;
  color: #ffffff;
}

.nav-item.collapsible .chevron {
  transition: transform 0.2s ease;
}

.nav-item.collapsible:hover .chevron {
  transform: rotate(180deg);
}

</style>


