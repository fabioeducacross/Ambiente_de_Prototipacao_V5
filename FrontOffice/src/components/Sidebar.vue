<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <!-- Painel Inicial -->
      <RouterLink to="/teacher" class="nav-item">
        <MaterialIcon name="grid_view" :size="18" />
        <span>Painel Inicial</span>
      </RouterLink>

      <!-- Missões da Escola (collapsible) -->
      <button class="nav-item collapsible active">
        <MaterialIcon name="flag" :size="18" />
        <span>Missões da Escola</span>
        <MaterialIcon name="chevron_right" :size="14" class="chevron" />
      </button>

      <!-- Relatórios Gerais (collapsible) -->
      <button class="nav-item collapsible">
        <MaterialIcon name="pie_chart" :size="18" />
        <span>Relatórios Gerais</span>
        <MaterialIcon name="chevron_right" :size="14" class="chevron" />
      </button>

      <!-- Explorar Jogos (collapsible) -->
      <button class="nav-item collapsible">
        <MaterialIcon name="map" :size="18" />
        <span>Explorar Jogos</span>
        <MaterialIcon name="chevron_right" :size="14" class="chevron" />
      </button>

      <!-- Turmas -->
      <button class="nav-item">
        <MaterialIcon name="work_outline" :size="18" />
        <span>Turmas</span>
      </button>

      <!-- Grupos -->
      <button class="nav-item">
        <MaterialIcon name="groups" :size="18" />
        <span>Grupos</span>
      </button>

      <!-- Alunos -->
      <button class="nav-item">
        <MaterialIcon name="group" :size="18" />
        <span>Alunos</span>
      </button>

      <!-- Super Trilhas -->
      <button class="nav-item">
        <MaterialIcon name="auto_stories" :size="18" />
        <span>Super Trilhas</span>
      </button>

      <!-- Separador EDUCACROSS -->
      <div class="nav-title">Educacross</div>

      <!-- Instituto J&F -->
      <button class="nav-item">
        <MaterialIcon name="apartment" :size="18" />
        <span>Instituto J&amp;F - Comunidade | Adote uma Escola</span>
      </button>

      <!-- Avaliações (collapsible) -->
      <button class="nav-item collapsible">
        <MaterialIcon name="quiz" :size="18" />
        <span>Avaliações</span>
        <MaterialIcon name="chevron_right" :size="14" class="chevron" />
      </button>

      <!-- Expedição Leitura -->
      <button class="nav-item">
        <MaterialIcon name="book_5" :size="18" />
        <span>Expedição Leitura</span>
      </button>

      <!-- Eventos -->
      <button class="nav-item">
        <MaterialIcon name="calendar_today" :size="18" />
        <span>Eventos</span>
      </button>

      <!-- High Five -->
      <button class="nav-item">
        <MaterialIcon name="camera" :size="18" />
        <span>High Five</span>
      </button>
    </nav>
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
  top: var(--navbar-height);
  z-index: 100;
  height: calc(100vh - var(--navbar-height));
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
  margin: 0;
  width: 100%;
  border-radius: 0;
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

.nav-title {
  padding: 0.75rem 1rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #565674;
  margin-top: 0.25rem;
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
  border-radius: 6px;
  margin: 0 0.5rem;
  width: calc(100% - 1rem);
  padding: 0.625rem 0.5rem;
}

.nav-item.collapsible .chevron {
  transition: transform 0.2s ease;
}

.nav-item.collapsible:hover .chevron {
  transform: rotate(180deg);
}

</style>

