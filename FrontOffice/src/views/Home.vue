<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

/** Converte hex + alpha (0-1) para rgba */
const hexAlpha = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

const journeyIconStyle = (color) => ({
  background: hexAlpha(color, 0.13),
  borderColor: hexAlpha(color, 0.22),
  color
})

// Master-detail inline
const selectedPersonaId = ref(null)
const selectedPersona   = computed(() => personas.value.find(p => p.id === selectedPersonaId.value) ?? null)
const selectPersona     = (id) => { selectedPersonaId.value = id }
const goHome            = () => { selectedPersonaId.value = null }

// Acesso rápido — jornadas com rota ativa, cap 4
const QUICK_CAP = 4
const allQuickLinks = computed(() =>
  personas.value.flatMap(p =>
    (p.journeys ?? []).filter(j => j.route).map(j => ({
      ...j, personaId: p.id, personaName: p.name, personaColor: p.color, personaIcon: p.icon
    }))
  )
)
const quickLinks    = computed(() => allQuickLinks.value.slice(0, QUICK_CAP))
const hasMoreLinks  = computed(() => allQuickLinks.value.length > QUICK_CAP)

// Stats computados do estado real das personas
const totalJornadas  = computed(() => personas.value.flatMap(p => p.journeys).length)
const jornadasAtivas = computed(() => personas.value.flatMap(p => p.journeys).filter(j => j.route).length)
const coberturaPercent = computed(() => totalJornadas.value ? Math.round(jornadasAtivas.value / totalJornadas.value * 100) : 0)
const personasProgress = computed(() => personas.value.map(p => ({
  ...p,
  ativas: p.journeys.filter(j => j.route).length,
  total:  p.journeys.length,
  pct:    p.journeys.length ? Math.round(p.journeys.filter(j => j.route).length / p.journeys.length * 100) : 0
})))

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
        <a
          class="nav-link"
          :class="{ active: !selectedPersonaId }"
          href="#"
          @click.prevent="goHome"
        >
          <span class="material-symbols-outlined">home</span> Início
        </a>

        <span class="nav-label nav-label--personas">Personas</span>
        <button
          v-for="persona in personas"
          :key="persona.id"
          type="button"
          class="nav-persona"
          :class="{ 'nav-persona--active': selectedPersonaId === persona.id }"
          :style="{ '--p-color': persona.color }"
          :aria-label="'Ver jornadas de ' + persona.name"
          :aria-current="selectedPersonaId === persona.id ? 'page' : undefined"
          @click="selectPersona(persona.id)"
        >
          <span class="material-symbols-outlined nav-persona-icon" aria-hidden="true">{{ persona.icon }}</span>
          <span class="nav-persona-name">{{ persona.name }}</span>
          <span class="material-symbols-outlined nav-persona-arrow" aria-hidden="true">chevron_right</span>
        </button>

        <span class="nav-label">Recursos</span>
        <RouterLink class="nav-link" to="/sobre">
          <span class="material-symbols-outlined">info</span> Sobre
        </RouterLink>
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

      <!-- Vista: Home (nenhuma persona selecionada) -->
      <template v-if="!selectedPersona">
        <!-- Hero strip -->
        <section class="hero-strip">
          <div class="hero-text">
            <h1 class="hero-title">Ambiente de Prototipação</h1>
            <p class="hero-desc">Explore e valide fluxos de cada persona antes de migrar para produção.</p>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">{{ jornadasAtivas }}<span class="stat-value-total">/{{ totalJornadas }}</span></span>
              <span class="stat-label">Jornadas Ativas</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">{{ coberturaPercent }}<span class="stat-value-unit">%</span></span>
              <span class="stat-label">Cobertura</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">{{ personas.length }}</span>
              <span class="stat-label">Personas</span>
            </div>
          </div>
        </section>

        <!-- Progresso por persona -->
        <section class="progress-section">
          <span class="section-label">Progresso por Persona</span>
          <div class="progress-grid">
            <button
              v-for="p in personasProgress"
              :key="p.id"
              type="button"
              class="progress-card"
              :class="{ 'progress-card--done': p.pct === 100 }"
              :style="{ '--p-color': p.color }"
              :aria-label="'Ver jornadas de ' + p.name"
              @click="selectPersona(p.id)"
            >
              <div class="progress-card-header">
                <div class="progress-card-icon" :style="journeyIconStyle(p.color)" aria-hidden="true">
                  <span class="material-symbols-outlined">{{ p.icon }}</span>
                </div>
                <span class="progress-card-name">{{ p.name }}</span>
                <span class="progress-card-count">{{ p.ativas }}<span class="progress-card-total">/{{ p.total }}</span></span>
              </div>
              <div class="progress-bar-track" role="progressbar" :aria-valuenow="p.pct" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar-fill" :style="{ width: p.pct + '%', '--p-color': p.color }"></div>
              </div>
            </button>
          </div>
        </section>

        <!-- Acesso rápido (dinâmico) -->
        <section v-if="quickLinks.length" class="quick-section">
          <div class="quick-section-header">
            <h2 class="section-label">Acesso rápido</h2>
            <a v-if="hasMoreLinks" href="#" class="quick-see-all" @click.prevent="selectPersona(quickLinks[0].personaId)">
              Ver todas <span class="material-symbols-outlined">arrow_downward</span>
            </a>
          </div>
          <div class="quick-grid">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.id"
              :to="link.route"
              class="quick-card"
              :style="{ '--q-color': link.personaColor }"
            >
              <div class="quick-card-top">
                <div class="quick-card-icon"><span class="material-symbols-outlined">{{ link.icon }}</span></div>
                <span class="material-symbols-outlined quick-card-arrow">arrow_forward</span>
              </div>
              <p class="quick-card-title">{{ link.label }}</p>
              <p class="quick-card-desc">{{ link.personaName }}</p>
            </RouterLink>
          </div>
        </section>

        <!-- CTA → Sobre o Ambiente -->
        <section class="about-cta-section">
          <RouterLink to="/sobre" class="about-cta-card">
            <div class="about-cta-icon">
              <span class="material-symbols-outlined">layers</span>
            </div>
            <div class="about-cta-body">
              <p class="about-cta-title">Sobre este ambiente</p>
              <p class="about-cta-desc">Vue 3.5 + Vite · 50+ jornadas · 6 personas · Azure DevOps</p>
            </div>
            <span class="material-symbols-outlined about-cta-arrow">arrow_forward</span>
          </RouterLink>
        </section>
      </template>

      <!-- Vista: Jornadas da persona selecionada -->
      <template v-else>
        <!-- Header da persona -->
        <section class="persona-view-header" :style="{ '--p-color': selectedPersona.color }">
          <button type="button" class="back-btn" @click="goHome" aria-label="Voltar ao início">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="persona-view-icon" :style="journeyIconStyle(selectedPersona.color)" aria-hidden="true">
            <span class="material-symbols-outlined">{{ selectedPersona.icon }}</span>
          </div>
          <div class="persona-view-info">
            <h1 class="persona-view-name">{{ selectedPersona.name }}</h1>
            <p class="persona-view-desc">{{ selectedPersona.description }}</p>
          </div>
        </section>

        <!-- Grid de jornadas -->
        <section class="journeys-section">
          <h2 class="section-label">Jornadas</h2>
          <div class="journeys-grid">
            <template v-for="j in selectedPersona.journeys" :key="j.id">

              <!-- Jornada ativa: RouterLink -->
              <RouterLink
                v-if="j.route"
                :to="j.route"
                class="journey-card journey-card--active"
                :style="{ '--p-color': selectedPersona.color }"
              >
                <div class="journey-card-top">
                  <div class="journey-card-icon" :style="journeyIconStyle(selectedPersona.color)" aria-hidden="true">
                    <span class="material-symbols-outlined">{{ j.icon }}</span>
                  </div>
                  <span class="journey-status status-ativo">{{ j.status }}</span>
                </div>
                <p class="journey-card-label">{{ j.label }}</p>
                <p class="journey-card-id">{{ j.id }}</p>
              </RouterLink>

              <!-- Jornada planejada: div muted -->
              <div v-else class="journey-card journey-card--planned">
                <div class="journey-card-top">
                  <div class="journey-card-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">{{ j.icon }}</span>
                  </div>
                  <span class="journey-status status-planejado">{{ j.status }}</span>
                </div>
                <p class="journey-card-label">{{ j.label }}</p>
                <p class="journey-card-id">{{ j.id }}</p>
              </div>

            </template>
          </div>
        </section>
      </template>

    </main>

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

.nav-label--personas { margin-top: 8px; }

.nav-persona {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: var(--r);
  border: none;
  background: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: background var(--t), color var(--t);
}
.nav-persona:hover { background: var(--surface-2); color: var(--text); }
.nav-persona:hover .nav-persona-icon { color: var(--p-color); }
.nav-persona:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; border-radius: var(--r); }
.nav-persona-icon { font-size: 15px; color: var(--text-dim); transition: color var(--t); flex-shrink: 0; }
.nav-persona-name { flex: 1; }
.nav-persona-arrow { font-size: 13px; color: var(--text-dim); opacity: 0; transition: opacity var(--t); }
.nav-persona:hover .nav-persona-arrow { opacity: 1; }
.nav-persona--active { background: var(--surface-2); color: var(--text); }
.nav-persona--active .nav-persona-icon { color: var(--p-color); }
.nav-persona--active .nav-persona-arrow { opacity: 1; color: var(--p-color); }

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
.stat-value { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.stat-value-total { font-size: 13px; font-weight: 400; color: var(--text-dim); }
.stat-value-unit  { font-size: 13px; font-weight: 400; color: var(--text-muted); }
.stat-label { font-size: 10.5px; color: var(--text-dim); margin-top: 2px; }
.stat-divider { width: 1px; height: 30px; background: var(--border); }

/* ── Progress section ────────── */
.progress-section { padding: 24px 24px 0; }

.progress-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.progress-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  color: var(--text);
  transition: border-color var(--t), background var(--t);
  touch-action: manipulation;
}
.progress-card:hover {
  border-color: var(--p-color);
  background: var(--surface-2);
}
.progress-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.progress-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-card-icon {
  width: 28px; height: 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.progress-card-icon .material-symbols-outlined { font-size: 15px; }

.progress-card-name {
  flex: 1;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-card-count {
  font-size: 12px;
  font-weight: 700;
  color: var(--p-color);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.progress-card-total { font-size: 10.5px; font-weight: 400; color: var(--text-dim); }

.progress-bar-track {
  height: 3px;
  background: var(--surface-2);
  border-radius: 99px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: var(--p-color);
  border-radius: 99px;
  transition: width 400ms ease;
  min-width: 0;
}

/* ── Quick section ───────────── */
.quick-section { padding: 24px 24px 0; }

.quick-section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}
.quick-section-header .section-label { margin-bottom: 0; }

.quick-see-all {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--t);
}
.quick-see-all .material-symbols-outlined { font-size: 13px; }
.quick-see-all:hover { color: var(--text); }

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
  grid-auto-rows: 1fr;
  gap: 8px;
}

.quick-card {
  display: flex;
  flex-direction: column;
  padding: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  text-decoration: none;
  color: var(--text);
  transition: border-color var(--t), background var(--t);
}
.quick-card:hover {
  border-color: var(--q-color, var(--border-hover));
  background: var(--surface-2);
}
.quick-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.quick-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.quick-card-icon {
  width: 34px; height: 34px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--q-color, var(--accent)) 13%, transparent);
  border: 1px solid color-mix(in srgb, var(--q-color, var(--accent)) 28%, transparent);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: var(--q-color, var(--accent));
  flex-shrink: 0;
}
.quick-card-icon .material-symbols-outlined { font-size: 17px; }

.quick-card-arrow {
  font-size: 14px;
  color: var(--text-dim);
  transition: color var(--t);
}
.quick-card:hover .quick-card-arrow { color: var(--q-color, var(--text-muted)); }

.quick-card-title { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.3; margin-bottom: 3px; }
.quick-card-desc { font-size: 11.5px; color: var(--text-muted); }

/* ── About CTA ───────────────── */
.about-cta-section { padding: 24px 24px 28px; }

.about-cta-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 14px 16px;
  text-decoration: none;
  color: var(--text);
  transition: border-color var(--t), background var(--t);
}
.about-cta-card:hover {
  border-color: var(--accent);
  background: var(--surface-2);
}

.about-cta-icon {
  width: 32px; height: 32px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}
.about-cta-icon .material-symbols-outlined { font-size: 16px; }

.about-cta-body { flex: 1; min-width: 0; }
.about-cta-title { font-size: 13px; font-weight: 500; color: var(--text); }
.about-cta-desc  { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }

.about-cta-arrow {
  font-size: 16px;
  color: var(--text-dim);
  flex-shrink: 0;
  transition: color var(--t);
}
.about-cta-card:hover .about-cta-arrow { color: var(--accent); }

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
  .nav-label, .sidebar-footer, .nav-persona { display: none; }
  .quick-grid { grid-template-columns: 1fr; }

  .hero-strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .hero-stats { align-self: flex-start; }
}

@media (min-width: 1440px) {
  .shell { grid-template-columns: 240px 1fr; }
}

/* ── Persona view header ─────── */
.persona-view-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--border);
}

.back-btn {
  width: 32px; height: 32px;
  border-radius: var(--r);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  transition: background var(--t), color var(--t), border-color var(--t);
}
.back-btn:hover { background: var(--surface-2); color: var(--text); border-color: var(--border-hover); }
.back-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.persona-view-icon {
  width: 42px; height: 42px;
  border-radius: 10px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.persona-view-info { min-width: 0; }
.persona-view-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.3;
}
.persona-view-desc { font-size: 12.5px; color: var(--text-muted); margin-top: 2px; }

/* ── Journeys grid ───────────── */
.journeys-section { padding: 20px 24px 24px; }

.journeys-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 8px;
  margin-top: 10px;
}

.journey-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 14px;
  text-decoration: none;
  color: var(--text);
  transition: border-color var(--t), background var(--t);
}

.journey-card--active {
  cursor: pointer;
}
.journey-card--active:hover {
  border-color: var(--p-color);
  background: var(--surface-2);
}
.journey-card--active:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.journey-card--planned {
  opacity: 0.42;
  cursor: default;
}

.journey-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.journey-card-icon {
  width: 34px; height: 34px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: var(--surface-2);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}

.journey-card-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
  flex: 1;
  margin-bottom: 3px;
}
.journey-card-id {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  color: var(--accent);
  letter-spacing: 0.02em;
}

.journey-status {
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

</style>