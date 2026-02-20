<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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

const personas = ref([
  {
    id: 'teacher',
    name: 'Professor',
    icon: 'bi-person-workspace',
    color: '#7367F0',
    description: 'Gestão de turmas, missões e acompanhamento de alunos',
    route: '/teacher'
  },
  {
    id: 'student',
    name: 'Aluno',
    icon: 'bi-person',
    color: '#00CFE8',
    description: 'Missões, conquistas e progresso individual',
    route: '/student'
  },
  {
    id: 'coordinator',
    name: 'Coordenador',
    icon: 'bi-diagram-3',
    color: '#28C76F',
    description: 'Coordenação pedagógica e gestão de turmas',
    route: '/coordinator'
  },
  {
    id: 'director',
    name: 'Diretor',
    icon: 'bi-building',
    color: '#FF9F43',
    description: 'Gestão escolar e indicadores estratégicos',
    route: '/director'
  },
  {
    id: 'administrator',
    name: 'Administrador',
    icon: 'bi-gear',
    color: '#EA5455',
    description: 'Configuração do sistema e gestão de usuários',
    route: '/administrator'
  },
  {
    id: 'network-manager',
    name: 'Gestor de Rede',
    icon: 'bi-globe',
    color: '#9E95F5',
    description: 'Gestão de múltiplas escolas e indicadores de rede',
    route: '/network-manager'
  }
])
</script>

<template>
  <div class="shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-logo"><i class="bi bi-grid-1x2-fill"></i></div>
        <span class="brand-name">Educacross</span>
      </div>

      <nav class="sidebar-nav">
        <span class="nav-label">Navegação</span>
        <a class="nav-link active" href="#">
          <i class="bi bi-house-door"></i> Início
        </a>
        <a class="nav-link" href="#personas">
          <i class="bi bi-people"></i> Personas
        </a>
        <a class="nav-link" href="http://localhost:3000" target="_blank">
          <i class="bi bi-journal-text"></i> Wiki
          <i class="bi bi-arrow-up-right nav-external"></i>
        </a>
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
      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar-breadcrumb">
          <span class="bc-root">Workspace</span>
          <i class="bi bi-chevron-right bc-sep"></i>
          <span class="bc-current">Início</span>
        </div>
        <RouterLink to="/teacher" class="topbar-cta">
          <i class="bi bi-play-fill"></i>
          Abrir Protótipo
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </header>

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
            <div class="quick-card-icon"><i class="bi bi-calendar3"></i></div>
            <div class="quick-card-body">
              <p class="quick-card-title">Calendário do Professor</p>
              <p class="quick-card-desc">Fluxo principal em validação</p>
            </div>
            <i class="bi bi-arrow-right quick-card-arrow"></i>
          </RouterLink>

          <a href="http://localhost:3000" target="_blank" class="quick-card">
            <div class="quick-card-icon"><i class="bi bi-journal-bookmark"></i></div>
            <div class="quick-card-body">
              <p class="quick-card-title">Wiki TO-BE</p>
              <p class="quick-card-desc">Documentação de produto e engenharia</p>
            </div>
            <i class="bi bi-arrow-up-right quick-card-arrow"></i>
          </a>

          <div class="quick-card quick-card--muted">
            <div class="quick-card-icon"><i class="bi bi-kanban"></i></div>
            <div class="quick-card-body">
              <p class="quick-card-title">Kanban de Demandas</p>
              <p class="quick-card-desc">Em breve</p>
            </div>
            <span class="quick-card-badge">Em breve</span>
          </div>
        </div>
      </section>

      <!-- Personas grid -->
      <section id="personas" class="personas-section">
        <div class="personas-header">
          <h2 class="section-label">Personas</h2>
          <span class="personas-count">{{ personas.length }} disponíveis</span>
        </div>
        <div class="personas-grid">
          <RouterLink
            v-for="persona in personas"
            :key="persona.id"
            :to="persona.route"
            class="persona-card"
            :style="{ '--p-color': persona.color }"
          >
            <div class="persona-top">
              <div class="persona-icon" :style="personaIconStyle(persona.color)"><i :class="['bi', persona.icon]"></i></div>
              <span class="persona-status">Ativo</span>
            </div>
            <div class="persona-body">
              <p class="persona-name">{{ persona.name }}</p>
              <p class="persona-desc">{{ persona.description }}</p>
            </div>
            <div class="persona-footer">
              <span class="persona-cta">Abrir jornada <i class="bi bi-arrow-right"></i></span>
            </div>
          </RouterLink>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
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

.nav-external { margin-left: auto; font-size: 11px; opacity: 0.4; }

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

/* ── Topbar ──────────────────── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: rgba(10,10,10,0.88);
  backdrop-filter: blur(8px);
  z-index: 10;
}

.topbar-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.bc-root { color: var(--text-muted); }
.bc-sep { color: var(--text-dim); font-size: 10px; }
.bc-current { color: var(--text); font-weight: 500; }

.topbar-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: var(--r);
  transition: opacity var(--t);
}
.topbar-cta:hover { opacity: 0.82; }

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
  transition: border-color var(--t), background var(--t);
}

.persona-card:hover { border-color: var(--p-color); background: var(--surface-2); }
.persona-card:hover .persona-cta { color: var(--p-color); }

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

</style>