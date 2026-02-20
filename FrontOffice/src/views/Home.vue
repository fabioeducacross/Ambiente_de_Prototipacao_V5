<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

/** Converte hex + alpha (0-1) para rgba */
const hexAlpha = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

const personaIconStyle = (color) => ({
  background: hexAlpha(color, 0.13),
  borderColor: hexAlpha(color, 0.22),
  color
})

const drawerPersona  = ref(null)
const drawerCloseBtn = ref(null)
const openDrawer     = (id) => { drawerPersona.value = id }
const closeDrawer    = () => { drawerPersona.value = null }
const activePersona  = computed(() => personas.value.find(p => p.id === drawerPersona.value) ?? null)

// Fecha com ESC
const onKeydown = (e) => { if (e.key === 'Escape' && drawerPersona.value) closeDrawer() }
onMounted(()  => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

// Foco no botão de fechar ao abrir o drawer
watch(drawerPersona, (val) => { if (val) nextTick(() => drawerCloseBtn.value?.focus()) })

const personas = ref([
  {
    id: 'teacher',
    name: 'Professor',
    icon: 'manage_accounts',
    color: '#7367F0',
    description: 'Gestão de turmas, missões e acompanhamento de alunos',
    route: '/teacher',
    journeys: [
      { id: 'CAL', label: 'Calendário de Eventos', icon: 'calendar_month', route: '/teacher/calendar', status: 'Ativo' },
      { id: 'PROF-001', label: 'Criar Turma', icon: 'group_add', route: null, status: 'Planejado' },
      { id: 'PROF-002', label: 'Criar Missão', icon: 'flag', route: null, status: 'Planejado' },
      { id: 'PROF-003', label: 'Acompanhar Progresso', icon: 'trending_up', route: null, status: 'Planejado' },
      { id: 'PROF-004', label: 'Avaliar Atividades', icon: 'grading', route: null, status: 'Planejado' },
    ]
  },
  {
    id: 'student',
    name: 'Aluno',
    icon: 'school',
    color: '#00CFE8',
    description: 'Missões, conquistas e progresso individual',
    journeys: [
      { id: 'ALUNO-001', label: 'Acessar Missões',      icon: 'flag',         route: null, status: 'Planejado' },
      { id: 'ALUNO-002', label: 'Completar Atividades', icon: 'task_alt',     route: null, status: 'Planejado' },
      { id: 'ALUNO-003', label: 'Ver Conquistas',        icon: 'emoji_events', route: null, status: 'Planejado' },
      { id: 'ALUNO-004', label: 'Receber Feedback',      icon: 'reviews',      route: null, status: 'Planejado' },
    ]
  },
  {
    id: 'coordinator',
    name: 'Coordenador',
    icon: 'account_tree',
    color: '#28C76F',
    description: 'Coordenação pedagógica e gestão de turmas',
    journeys: [
      { id: 'COORD-001', label: 'Gestão Pedagógica',     icon: 'account_tree',  route: null, status: 'Planejado' },
      { id: 'COORD-002', label: 'Suporte a Professores', icon: 'support_agent', route: null, status: 'Planejado' },
      { id: 'COORD-003', label: 'Análise de Turmas',     icon: 'bar_chart',     route: null, status: 'Planejado' },
    ]
  },
  {
    id: 'director',
    name: 'Diretor',
    icon: 'apartment',
    color: '#FF9F43',
    description: 'Gestão escolar e indicadores estratégicos',
    journeys: [
      { id: 'DIR-001', label: 'Indicadores Estratégicos', icon: 'insights',    route: null, status: 'Planejado' },
      { id: 'DIR-002', label: 'Gestão de Recursos',       icon: 'inventory_2', route: null, status: 'Planejado' },
      { id: 'DIR-003', label: 'Relatórios Gerenciais',    icon: 'summarize',   route: null, status: 'Planejado' },
    ]
  },
  {
    id: 'administrator',
    name: 'Administrador',
    icon: 'settings',
    color: '#EA5455',
    description: 'Configuração do sistema e gestão de usuários',
    journeys: [
      { id: 'ADM-001', label: 'Gerenciar Usuários', icon: 'manage_accounts', route: null, status: 'Planejado' },
      { id: 'ADM-002', label: 'Configurar Sistema', icon: 'build',           route: null, status: 'Planejado' },
      { id: 'ADM-003', label: 'Logs e Auditoria',   icon: 'policy',          route: null, status: 'Planejado' },
    ]
  },
  {
    id: 'network-manager',
    name: 'Gestor de Rede',
    icon: 'language',
    color: '#9E95F5',
    description: 'Gestão de múltiplas escolas e indicadores de rede',
    journeys: [
      { id: 'REDE-001', label: 'Visão Geral da Rede',      icon: 'hub',            route: null, status: 'Planejado' },
      { id: 'REDE-002', label: 'Comparações',               icon: 'compare_arrows', route: null, status: 'Planejado' },
      { id: 'REDE-003', label: 'Planejamento Estratégico',  icon: 'route',          route: null, status: 'Planejado' },
    ]
  }
])
</script>

<template>
  <div class="shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-logo"><span class="material-symbols-outlined">grid_view</span></div>
        <span class="brand-name">Educacross</span>
      </div>

      <nav class="sidebar-nav">
        <span class="nav-label">Navegação</span>
        <a class="nav-link active" href="#">
          <span class="material-symbols-outlined">home</span> Início
        </a>
        <a class="nav-link" href="#personas">
          <span class="material-symbols-outlined">group</span> Personas
        </a>
        <a class="nav-link" href="http://localhost:3000" target="_blank">
          <span class="material-symbols-outlined">menu_book</span> Wiki TO-BE
          <span class="material-symbols-outlined nav-external">open_in_new</span>
        </a>
        <span class="nav-link nav-link--disabled">
          <span class="material-symbols-outlined">view_kanban</span> Kanban
          <span class="nav-soon">Em breve</span>
        </span>
      </nav>

      <div class="sidebar-footer">
        <div class="env-badge">
          <span class="env-dot"></span>
          Redesenho-home
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="main">
      <!-- Hero strip -->
      <section class="hero-strip">
        <div class="hero-text">
          <h1 class="hero-title">Ambiente de Prototipação</h1>
          <p class="hero-desc">Explore e valide fluxos de cada persona antes de migrar para produção.</p>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">6</span>
            <span class="stat-label">Personas</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">v1.2</span>
            <span class="stat-label">Baseline</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">3</span>
            <span class="stat-label">Artefatos</span>
          </div>
        </div>
      </section>

      <!-- Quick links -->
      <section class="quick-section">
        <h2 class="section-label">Acesso rápido</h2>
        <div class="quick-grid">
          <RouterLink to="/teacher/calendar" class="quick-card quick-card--featured">
            <div class="quick-card-icon"><span class="material-symbols-outlined">calendar_month</span></div>
            <div class="quick-card-body">
              <p class="quick-card-title">Calendário do Professor</p>
              <p class="quick-card-desc">Fluxo principal em validação</p>
            </div>
            <span class="material-symbols-outlined quick-card-arrow">arrow_forward</span>
          </RouterLink>

        </div>
      </section>

      <!-- Personas grid -->
      <section id="personas" class="personas-section">
        <div class="personas-header">
          <h2 class="section-label">Personas</h2>
          <span class="personas-count">{{ personas.length }} disponíveis</span>
        </div>
        <div class="personas-grid">
          <button
            v-for="persona in personas"
            :key="persona.id"
            type="button"
            class="persona-card"
            :style="{ '--p-color': persona.color }"
            :aria-label="'Ver jornadas de ' + persona.name"
            @click="openDrawer(persona.id)"
          >
            <div class="persona-top">
              <div class="persona-icon" :style="personaIconStyle(persona.color)" aria-hidden="true">
                <span class="material-symbols-outlined">{{ persona.icon }}</span>
              </div>
              <span class="persona-status">Ativo</span>
            </div>
            <div class="persona-body">
              <p class="persona-name">{{ persona.name }}</p>
              <p class="persona-desc">{{ persona.description }}</p>
            </div>
            <div class="persona-footer">
              <span class="persona-cta">
                Ver jornadas
                <span class="material-symbols-outlined cta-icon" aria-hidden="true">chevron_right</span>
              </span>
            </div>
          </button>
        </div>
      </section>
    </main>

    <!-- Drawer overlay -->
    <Transition name="drawer-fade">
      <div
        v-if="drawerPersona"
        class="drawer-overlay"
        aria-hidden="true"
        @click="closeDrawer"
      ></div>
    </Transition>

    <!-- Drawer panel -->
    <Transition name="drawer-slide">
      <div
        v-if="activePersona"
        role="dialog"
        aria-modal="true"
        :aria-label="activePersona.name + ' — Jornadas'"
        class="drawer-panel"
        :style="{ '--p-color': activePersona.color }"
      >

        <!-- Cabeçalho do drawer -->
        <div class="drawer-header">
          <div class="drawer-persona-icon" :style="personaIconStyle(activePersona.color)" aria-hidden="true">
            <span class="material-symbols-outlined">{{ activePersona.icon }}</span>
          </div>
          <div class="drawer-persona-info">
            <p class="drawer-persona-name">{{ activePersona.name }}</p>
            <p class="drawer-persona-meta">{{ activePersona.journeys.length }} jornadas</p>
          </div>
          <button
            ref="drawerCloseBtn"
            class="drawer-close"
            aria-label="Fechar painel"
            @click="closeDrawer"
          >
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        <!-- Descrição -->
        <p class="drawer-persona-desc">{{ activePersona.description }}</p>

        <!-- Lista de jornadas -->
        <div class="drawer-section-label" role="heading" aria-level="3">Jornadas Disponíveis</div>
        <div class="drawer-body">
          <template v-for="j in activePersona.journeys" :key="j.id">

            <RouterLink
              v-if="j.route"
              :to="j.route"
              class="drawer-journey-row"
              @click="closeDrawer"
            >
              <div class="drawer-journey-icon" :style="{ color: activePersona.color }" aria-hidden="true">
                <span class="material-symbols-outlined">{{ j.icon }}</span>
              </div>
              <div class="drawer-journey-body">
                <p class="drawer-journey-label">{{ j.label }}</p>
                <p class="drawer-journey-id">{{ j.id }}</p>
              </div>
              <span class="drawer-journey-status status-ativo">{{ j.status }}</span>
              <span class="material-symbols-outlined drawer-journey-arrow">arrow_forward</span>
            </RouterLink>

            <div v-else class="drawer-journey-row drawer-journey-row--muted">
              <div class="drawer-journey-icon" aria-hidden="true">
                <span class="material-symbols-outlined">{{ j.icon }}</span>
              </div>
              <div class="drawer-journey-body">
                <p class="drawer-journey-label">{{ j.label }}</p>
                <p class="drawer-journey-id">{{ j.id }}</p>
              </div>
              <span class="drawer-journey-status status-planejado">{{ j.status }}</span>
            </div>

          </template>
        </div>

      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* ── Material Symbols ────────── */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
  font-size: inherit;
  line-height: 1;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  user-select: none;
  flex-shrink: 0;
}
.brand-logo .material-symbols-outlined {
  font-size: 15px;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20;
}
.quick-card-icon .material-symbols-outlined { font-size: 17px; }
.persona-icon .material-symbols-outlined { font-size: 18px; }
.journey-row-icon .material-symbols-outlined { font-size: 15px; }
.cta-icon { font-size: 16px; }

/* ── Tokens dark ─────────────── */
.shell {
  --bg: #0a0a0a;
  --surface: #111111;
  --surface-2: #1a1a1a;
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.16);
  --text: #ededed;
  --text-muted: #888;
  --text-dim: #555;
  --accent: #7367F0;
  --accent-glow: rgba(115,103,240,0.18);
  --r: 8px;
  --r-lg: 12px;
  --t: 150ms ease;

  min-height: 100vh;
  display: grid;
  grid-template-columns: 220px 1fr;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-family-base);
  overflow-x: hidden;
}

/* ── Sidebar ─────────────────── */
.sidebar {
  border-right: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  position: sticky;
  top: 0;
  height: 100vh;
  min-width: 0;
  overflow: hidden;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px 18px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 14px;
}

.brand-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.brand-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0 8px 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--r);
  text-decoration: none;
  color: var(--text-muted);
  font-size: 13.5px;
  transition: background var(--t), color var(--t);
}

.nav-link:hover { background: var(--surface-2); color: var(--text); }
.nav-link.active { background: var(--accent-glow); color: var(--accent); }
.nav-link--disabled { opacity: 0.38; cursor: default; pointer-events: none; }
.nav-soon { margin-left: auto; font-size: 10px; font-weight: 500; color: var(--text-dim); background: var(--surface-2); border: 1px solid var(--border); padding: 1px 6px; border-radius: 20px; }

.nav-external { margin-left: auto; font-size: 13px; opacity: 0.4; }

.sidebar-footer {
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.env-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: var(--text-dim);
  padding: 4px 8px;
}

.env-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #28C76F;
  flex-shrink: 0;
}

/* ── Main ────────────────────── */
.main { display: flex; flex-direction: column; min-width: 0; }

/* ── Hero strip ──────────────── */
.hero-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 24px 24px;
  border-bottom: 1px solid var(--border);
}

.hero-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.hero-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; max-width: 480px; }

.hero-stats { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }

.stat { display: flex; flex-direction: column; align-items: center; }
.stat-value { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; line-height: 1; }
.stat-label { font-size: 10.5px; color: var(--text-dim); margin-top: 2px; }
.stat-divider { width: 1px; height: 30px; background: var(--border); }

/* ── Quick section ───────────── */
.quick-section { padding: 24px 24px 0; }

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-bottom: 10px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.quick-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  text-decoration: none;
  color: var(--text);
  transition: border-color var(--t), background var(--t);
}

.quick-card:hover { border-color: var(--border-hover); background: var(--surface-2); }

.quick-card--featured {
  border-color: rgba(115,103,240,0.3);
  background: rgba(115,103,240,0.06);
}
.quick-card--featured:hover {
  border-color: rgba(115,103,240,0.55);
  background: rgba(115,103,240,0.11);
}

.quick-card--muted { opacity: 0.45; cursor: default; pointer-events: none; }

.quick-card-icon {
  width: 32px; height: 32px;
  border-radius: 7px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 14px; color: var(--text-muted);
}
.quick-card--featured .quick-card-icon { background: var(--accent-glow); border-color: rgba(115,103,240,0.28); color: var(--accent); }

.quick-card-body { flex: 1; min-width: 0; }
.quick-card-title { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.3; }
.quick-card-desc { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }
.quick-card-arrow { color: var(--text-dim); font-size: 14px; flex-shrink: 0; }
.quick-card-badge {
  font-size: 10.5px; padding: 2px 6px; border-radius: 4px;
  background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); flex-shrink: 0;
}

/* ── Personas ────────────────── */
.personas-section { padding: 24px; }
.personas-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.personas-count { font-size: 11.5px; color: var(--text-dim); }

.personas-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.persona-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 14px;
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: border-color var(--t), background var(--t);
  /* reset button element */
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  width: 100%;
}
.persona-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.persona-card:hover { border-color: var(--p-color); background: var(--surface-2); }
.persona-card:hover .persona-cta { color: var(--p-color); }
.persona-card[style*='--p-color']:hover .persona-cta { color: var(--p-color); }

.persona-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.persona-icon {
  width: 34px; height: 34px;
  border-radius: 7px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
}

.persona-status {
  font-size: 10px; padding: 2px 6px;
  border-radius: 4px;
  background: rgba(40,199,111,0.1);
  border: 1px solid rgba(40,199,111,0.22);
  color: #28C76F;
  font-weight: 500;
}

.persona-body { flex: 1; margin-bottom: 12px; }
.persona-name { font-size: 13.5px; font-weight: 600; color: var(--text); letter-spacing: -0.01em; margin-bottom: 3px; }
.persona-desc { font-size: 11.5px; color: var(--text-muted); line-height: 1.5; }

.persona-footer { padding-top: 10px; border-top: 1px solid var(--border); }
.persona-cta { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--text-dim); transition: color var(--t); }

/* ── Responsivo ──────────────── */
@media (max-width: 1024px) {
  .shell { grid-template-columns: 1fr; }

  .sidebar {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border);
    flex-direction: row;
    align-items: center;
    padding: 10px 14px;
    width: 100%;
    overflow: visible;
    gap: 12px;
  }

  .sidebar-nav { flex-direction: row; align-items: center; flex: 1; }
  .nav-label, .sidebar-footer { display: none; }
  .personas-grid, .quick-grid { grid-template-columns: 1fr; }

  .hero-strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .hero-stats { align-self: flex-start; }
}

@media (min-width: 1440px) {
  .shell { grid-template-columns: 240px 1fr; }
  .personas-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1800px) {
  .personas-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

/* ── Drawer lateral ─────────── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(3px);
  z-index: 200;
}

.drawer-panel {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 380px;
  max-width: calc(100vw - 40px);
  background: var(--surface);
  border-left: 1px solid var(--border);
  z-index: 201;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overscroll-behavior: contain;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.drawer-persona-icon {
  width: 40px; height: 40px;
  border-radius: 9px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.drawer-persona-info { flex: 1; min-width: 0; }
.drawer-persona-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.drawer-persona-meta { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }

.drawer-close {
  width: 30px; height: 30px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  transition: background var(--t), color var(--t);
  flex-shrink: 0;
}
.drawer-close:hover { background: var(--surface-2); color: var(--text); }
.drawer-close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  background: var(--surface-2);
}

.drawer-persona-desc {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.55;
  padding: 12px 18px 0;
  flex-shrink: 0;
}

.drawer-section-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-dim);
  padding: 16px 18px 8px;
  flex-shrink: 0;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overscroll-behavior: contain;
}

.drawer-journey-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  border-radius: 0;
  text-decoration: none;
  color: var(--text);
  border: 1px solid transparent;
  border-left: 2px solid transparent;
  transition: background var(--t), border-color var(--t);
  cursor: pointer;
  touch-action: manipulation;
}
.drawer-journey-row:not(.drawer-journey-row--muted):hover {
  background: rgba(115,103,240,0.07);
  border-left-color: var(--p-color);
}
.drawer-journey-row--muted { opacity: 0.42; cursor: default; touch-action: none; }

.drawer-journey-icon {
  width: 34px; height: 34px;
  border-radius: 7px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.drawer-journey-body { flex: 1; min-width: 0; }
.drawer-journey-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: pretty;
}
.drawer-journey-id {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  color: var(--accent);
  margin-top: 2px;
  letter-spacing: 0.02em;
}

.drawer-journey-status {
  font-size: 10px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 4px;
  flex-shrink: 0;
  white-space: nowrap;
}
.status-ativo {
  background: rgba(40,199,111,0.1);
  border: 1px solid rgba(40,199,111,0.2);
  color: #28C76F;
}
.status-planejado {
  background: rgba(255,159,67,0.1);
  border: 1px solid rgba(255,159,67,0.2);
  color: #FF9F43;
}

.drawer-journey-arrow { font-size: 15px; color: var(--text-dim); flex-shrink: 0; }

/* ── Transições drawer ───────── */
.drawer-fade-enter-active, .drawer-fade-leave-active { transition: opacity 200ms ease; }
.drawer-fade-enter-from, .drawer-fade-leave-to { opacity: 0; }

.drawer-slide-enter-active, .drawer-slide-leave-active {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-slide-enter-from, .drawer-slide-leave-to { transform: translateX(100%); }

/* ── prefers-reduced-motion ─── */
@media (prefers-reduced-motion: reduce) {
  .drawer-fade-enter-active,
  .drawer-fade-leave-active,
  .drawer-slide-enter-active,
  .drawer-slide-leave-active {
    transition: none;
  }
}

</style>