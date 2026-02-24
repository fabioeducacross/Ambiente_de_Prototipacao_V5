<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      
      <div class="nav-section">
        <div class="nav-title">Navegação</div>
        
        <RouterLink to="/teacher" class="nav-item">
          <MaterialIcon name="home" :size="18" />
          <span>Painel Inicial</span>
        </RouterLink>

        <RouterLink
          to="/teacher/calendar"
          class="nav-item"
          :class="{ active: route.path === '/teacher/calendar' || route.path.includes('/teacher/calendar') }"
        >
          <MaterialIcon name="calendar_month" :size="18" />
          <span>Calendário</span>
        </RouterLink>

        <a class="nav-item">
          <MaterialIcon name="group" :size="18" />
          <span>Minhas Turmas</span>
        </a>

        <a class="nav-item">
          <MaterialIcon name="event_note" :size="18" />
          <span>Eventos</span>
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-title">Configurações</div>
        
        <a class="nav-item">
          <MaterialIcon name="settings" :size="18" />
          <span>Preferências</span>
        </a>
        
        <a class="nav-item">
           <MaterialIcon name="help" :size="18" />
           <span>Ajuda</span>
        </a>
      </div>

    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import MaterialIcon from './MaterialIcon.vue'

const route = useRoute()

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
  scrollbar-width: thin;
  scrollbar-color: #3a3a4d transparent;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar.collapsed .nav-title,
.sidebar.collapsed .nav-item > span:not(.material-symbols-outlined) {
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

/* Scrollbar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: #3a3a4d;
  border-radius: 3px;
}
.sidebar::-webkit-scrollbar-thumb:hover {
  background: #4a4a5d;
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
  border-left: 3px solid transparent;
}

.nav-item .material-symbols-outlined {
  flex-shrink: 0;
  font-size: 18px;
}

.nav-item span:not(.material-symbols-outlined) {
  flex: 1;
}

.nav-item:hover {
  background: #2d2d3f;
  color: #ffffff;
}

.nav-item.active {
  background: #7367F0;
  color: #ffffff;
  border-left-color: #00CFE8;
}
</style>
