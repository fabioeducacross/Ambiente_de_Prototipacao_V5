<template>
  <div class="sidebar">
    <!-- Logo / Header -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <i class="bi bi-mortarboard-fill"></i>
        <span>educacross</span>
      </div>
    </div>

    <!-- User Info -->
    <div class="sidebar-user">
      <div class="user-avatar">IC</div>
      <div class="user-info">
        <div class="user-name">Isabella Cross</div>
        <div class="user-role">Professora</div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-title">Painel Inicial</div>
        <RouterLink to="/teacher" class="nav-item">
          <i class="bi bi-house-door"></i>
          <span>Dashboard</span>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-title">Relatórios gerais</div>
        
        <button class="nav-item collapsible">
          <i class="bi bi-graph-up"></i>
          <span>Acessos</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-file-earmark-text"></i>
          <span>Evidências</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-star"></i>
          <span>Habilidades</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <RouterLink to="/teacher/calendar" class="nav-item active">
          <i class="bi bi-calendar3"></i>
          <span>Calendário</span>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-title">Missões da Escola</div>
        
        <button class="nav-item collapsible">
          <i class="bi bi-flag"></i>
          <span>Criar Missão</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-trophy"></i>
          <span>Missões</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-clipboard-check"></i>
          <span>Revisões</span>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Trilhas</div>
        
        <button class="nav-item">
          <i class="bi bi-award"></i>
          <span>BNCC</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-columns-gap"></i>
          <span>SAEB</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-diagram-3"></i>
          <span>Programa 3Z</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-book"></i>
          <span>Super Ensino</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-puzzle"></i>
          <span>GOC</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Avaliações</div>
        
        <button class="nav-item collapsible">
          <i class="bi bi-check2-square"></i>
          <span>Diagnóstico</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item">
          <i class="bi bi-file-text"></i>
          <span>Somativas</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-graph-up-arrow"></i>
          <span>Simulados</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-pencil-square"></i>
          <span>Fluência Leitora</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-clipboard-data"></i>
          <span>Testes de Escrita</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Olimpíadas</div>
        <button class="nav-item">
          <i class="bi bi-trophy-fill"></i>
          <span>Olimpíadas</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Educateca</div>
        <button class="nav-item">
          <i class="bi bi-book-half"></i>
          <span>Educateca</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Expedições</div>
        
        <button class="nav-item collapsible">
          <i class="bi bi-compass"></i>
          <span>Expedição Leitum</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-lightbulb"></i>
          <span>Expedições Aprendizagem</span>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Formação e Apoio</div>
        
        <button class="nav-item collapsible">
          <i class="bi bi-file-earmark-arrow-down"></i>
          <span>Ajudas e Materiais</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button class="nav-item collapsible">
          <i class="bi bi-mortarboard"></i>
          <span>Academia Educacross</span>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Jornada Super</div>
        
        <button class="nav-item">
          <i class="bi bi-bullseye"></i>
          <span>Desafios</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-calendar-week"></i>
          <span>Plansnig</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-basket"></i>
          <span>Loja</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-star-fill"></i>
          <span>Especiais</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-title">Administração</div>
        
        <button class="nav-item">
          <i class="bi bi-people"></i>
          <span>Alunos</span>
        </button>

        <button class="nav-item">
          <i class="bi bi-shield-check"></i>
          <span>Permissões</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
  top: 0;
  z-index: 100;
}

/* Custom Scrollbar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a1a27;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #2d2d3f;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #3a3a4d;
}

/* Header */
.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #2d2d3f;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
}

.sidebar-logo i {
  color: #7367F0;
  font-size: 1.5rem;
}

/* User Info */
.sidebar-user {
  padding: 1rem;
  border-bottom: 1px solid #2d2d3f;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7367F0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: #a1a5b7;
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

.nav-item i {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-item span {
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

.nav-item.collapsible i:last-child {
  margin-left: auto;
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

.nav-item.collapsible:hover i:last-child {
  transform: rotate(180deg);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
