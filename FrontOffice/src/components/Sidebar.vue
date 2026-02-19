<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-title">Painel Inicial</div>
        <RouterLink to="/teacher" class="nav-item">
          <MaterialIcon name="home" :size="18" />
          <span>Dashboard</span>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-title">Relatórios gerais</div>
        
        <button class="nav-item collapsible">
          <MaterialIcon name="pie_chart" :size="18" />
          <span>Acessos</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="pie_chart" :size="18" />
          <span>Evidências</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="graph_5" :size="18" />
          <span>Habilidades</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <RouterLink to="/teacher/calendar" class="nav-item active">
          <MaterialIcon name="calendar_month" :size="18" />
          <span>Calendário</span>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-title">Missões da Escola</div>
        
        <button class="nav-item collapsible">
          <MaterialIcon name="add_circle" :size="18" />
          <span>Criar Missão</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="mountain_flag" :size="18" />
          <span>Missões</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="frame_inspect" :size="18" />
          <span>Revisões</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Trilhas</div>
        
        <button class="nav-item">
          <MaterialIcon name="anchor" :size="18" />
          <span>BNCC</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="location_on" :size="18" />
          <span>SAEB</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="footprint" :size="18" />
          <span>Programa 32</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="auto_stories" :size="18" />
          <span>Super Ensino</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="auto_stories" :size="18" />
          <span>COC</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Avaliações</div>
        
        <button class="nav-item collapsible">
          <MaterialIcon name="thermostat" :size="18" />
          <span>Diagnósticas</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item">
          <MaterialIcon name="quiz" :size="18" />
          <span>Somativas</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="checklist_rtl" :size="18" />
          <span>Simulados</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="mic" :size="18" />
          <span>Fluência Leitora</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="checkbook" :size="18" />
          <span>Testes de Escrita</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Olimpíadas</div>
        <button class="nav-item">
          <MaterialIcon name="emoji_events" :size="18" />
          <span>Olimpíadas</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Educateca</div>
        <button class="nav-item">
          <MaterialIcon name="auto_stories" :size="18" />
          <span>Educateca</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Expedições</div>
        
        <button class="nav-item collapsible">
          <MaterialIcon name="airplane_ticket" :size="18" />
          <span>Expedição Leitura</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="explore" :size="18" />
          <span>Expedição Aprendizagem</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Formação e Apoio</div>
        
        <button class="nav-item collapsible">
          <MaterialIcon name="folder_open" :size="18" />
          <span>Ajudas e Materiais</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>

        <button class="nav-item collapsible">
          <MaterialIcon name="account_balance" :size="18" />
          <span>Academia Educacross</span>
          <MaterialIcon name="expand_more" :size="14" class="chevron" />
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Jornada Super</div>
        
        <button class="nav-item">
          <MaterialIcon name="swords" :size="18" />
          <span>Desafios</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="trophy" :size="18" />
          <span>Ranking</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="shopping_cart" :size="18" />
          <span>Loja</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="crown" :size="18" />
          <span>Especiais</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Administração</div>
        
        <button class="nav-item">
          <MaterialIcon name="sentiment_satisfied" :size="18" />
          <span>Alunos</span>
        </button>

        <button class="nav-item">
          <MaterialIcon name="person_play" :size="18" />
          <span>Permissões</span>
        </button>
      </div>
    </nav>

    <footer class="sidebar-footer">
      <span class="version-note">Calendário v1.2</span>
    </footer>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MaterialIcon from './MaterialIcon.vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
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
  top: 70px;
  z-index: 100;
  height: calc(100vh - 70px);
  transition: width 0.3s ease;
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

.sidebar-footer {
  border-top: 1px solid rgba(161, 165, 183, 0.2);
  padding: 12px 16px;
  margin-top: auto;
}

.version-note {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  color: #a1a5b7;
  text-align: center;
}

.sidebar.collapsed .sidebar-footer {
  display: none;
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

