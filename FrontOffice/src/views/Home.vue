<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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
    description: 'Acesso a missões, conquistas e acompanhamento de progresso',
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
    color: '#8250DF',
    description: 'Gestão de múltiplas escolas e indicadores de rede',
    route: '/network-manager'
  }
])
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Educacross</span>
            <br />
            Protótipos de Jornadas
          </h1>
          <p class="hero-subtitle">
            Explore as jornadas de cada persona da plataforma educacional.
            <br />
            Selecione um perfil abaixo para navegar pelo protótipo interativo.
          </p>
          <div class="hero-badges">
            <span class="badge badge-primary">
              <i class="bi bi-lightbulb"></i> Protótipos V1.0
            </span>
            <span class="badge bg-success">
              <i class="bi bi-check-circle"></i> 6 Personas
            </span>
            <span class="badge bg-info">
              <i class="bi bi-palette"></i> Design System Vuexy
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Personas Grid -->
    <section class="personas-section">
      <div class="container">
        <div class="grid grid-cols-3">
          <RouterLink
            v-for="persona in personas"
            :key="persona.id"
            :to="persona.route"
            class="persona-card"
            :style="{ '--persona-color': persona.color }"
          >
            <div class="persona-icon">
              <i :class="persona.icon"></i>
            </div>
            <div class="persona-content">
              <h3 class="persona-name">{{ persona.name }}</h3>
              <p class="persona-description">{{ persona.description }}</p>
            </div>
            <div class="persona-arrow">
              <i class="bi bi-arrow-right"></i>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="info-card">
          <div class="info-header">
            <i class="bi bi-info-circle"></i>
            <h3>Sobre  este ambiente</h3>
          </div>
          <div class="info-content">
            <p>
              Este é o <strong>Ambiente de Prototipação FrontOffice</strong> da plataforma Educacross.
              Aqui você pode explorar protótipos interativos das jornadas de cada persona, 
              construídos com <strong>Vue 3 + Vite</strong> usando o <strong>Design System Vuexy</strong>.
            </p>
            <ul class="info-list">
              <li><i class="bi bi-check2"></i> Protótipos navegáveis por persona</li>
              <li><i class="bi bi-check2"></i> Design system consistente (Vuexy)</li>
              <li><i class="bi bi-check2"></i> Baseado na documentação oficial</li>
              <li><i class="bi bi-check2"></i> Desenvolvimento iterativo e incremental</li>
            </ul>
            <a 
              href="http://localhost:3003" 
              target="_blank" 
              class="btn btn-outline-primary"
            >
              <i class="bi bi-book"></i>
              Ver Documentação Completa
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  color: white;
  padding: 4rem 0 5rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="white" opacity="0.05"/></svg>');
  background-size: 100px 100px;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(90deg, #fff 0%, #f0f0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
}

.hero-badges {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-badges .badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Personas Section */
.personas-section {
  padding: 4rem 0;
  background: var(--gray-50);
}

.persona-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  border-left: 4px solid var(--persona-color);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
}

.persona-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.persona-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: var(--persona-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.persona-content {
  flex: 1;
}

.persona-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.persona-description {
  color: var(--gray-600);
  line-height: 1.6;
  font-size: 0.9375rem;
}

.persona-arrow {
  color: var(--persona-color);
  font-size: 1.5rem;
  align-self: flex-end;
  transition: transform var(--transition-fast);
}

.persona-card:hover .persona-arrow {
  transform: translateX(4px);
}

/* Info Section */
.info-section {
  padding: 4rem 0;
  background: white;
}

.info-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--gray-50);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  border: 1px solid var(--gray-200);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-header i {
  font-size: 2rem;
  color: var(--primary);
}

.info-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
}

.info-content p {
  margin-bottom: 1.5rem;
  color: var(--gray-700);
  line-height: 1.8;
}

.info-list {
  list-style: none;
  margin: 1.5rem 0 2rem;
}

.info-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--gray-700);
}

.info-list i {
  color: var(--success);
  font-size: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
