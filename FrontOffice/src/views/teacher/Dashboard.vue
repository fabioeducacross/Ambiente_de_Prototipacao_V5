<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const journeys = ref([
  {
    id: 'PROF-001',
    name: 'Criar Turma',
    description: 'Processo completo de criação de uma nova turma',
    status: 'Em desenvolvimento',
    color: '#28C76F'
  },
  {
    id: 'PROF-002',
    name: 'Criar Missão',
    description: 'Criação e configuração de missões educacionais',
    status: 'Planejado',
    color: '#FF9F43'
  },
  {
    id: 'PROF-003',
    name: 'Acompanhar Progresso',
    description: 'Visualização e análise do desempenho dos alunos',
    status: 'Planejado',
    color: '#FF9F43'
  },
  {
    id: 'PROF-004',
    name: 'Avaliar Atividades',
    description: 'Correção e feedback de atividades entregues',
    status: 'Planejado',
    color: '#FF9F43'
  }
])

const stats = ref([
  { label: 'Turmas Ativas', value: '12', icon: 'bi-people', color: '#7367F0' },
  { label: 'Missões Criadas', value: '48', icon: 'bi-flag', color: '#28C76F' },
  { label: 'Alunos Total', value: '384', icon: 'bi-person', color: '#00CFE8' },
  { label: 'Taxa Conclusão', value: '87%', icon: 'bi-graph-up', color: '#FF9F43' }
])
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <RouterLink to="/" class="back-link">
              <i class="bi bi-arrow-left"></i> Voltar
            </RouterLink>
            <h1 class="header-title">
              <i class="bi bi-person-workspace"></i>
              Dashboard Professor
            </h1>
            <p class="header-subtitle">
              Gestão de turmas, missões e acompanhamento de alunos
            </p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline-primary">
              <i class="bi bi-gear"></i> Configurações
            </button>
            <button class="btn btn-primary">
              <i class="bi bi-plus-lg"></i> Nova Missão
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Stats Grid -->
    <section class="stats-section">
      <div class="container">
        <div class="grid grid-cols-4">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="stat-card"
            :style="{ '--stat-color': stat.color }"
          >
            <div class="stat-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Journeys Section -->
    <section class="journeys-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <i class="bi bi-map"></i>
            Jornadas Disponíveis
          </h2>
          <p class="section-subtitle">
            Protótipos interativos das principais jornadas do professor
          </p>
        </div>

        <div class="grid grid-cols-2">
          <div 
            v-for="journey in journeys"
            :key="journey.id"
            class="journey-card"
          >
            <div class="journey-header">
              <div class="journey-id">{{ journey.id }}</div>
              <span 
                class="badge"
                :style="{ backgroundColor: journey.color, color: 'white' }"
              >
                {{ journey.status }}
              </span>
            </div>
            <h3 class="journey-title">{{ journey.name }}</h3>
            <p class="journey-description">{{ journey.description }}</p>
            <div class="journey-footer">
              <button 
                class="btn btn-primary"
                :disabled="journey.status === 'Planejado'"
              >
                <i class="bi bi-play-circle"></i>
                {{ journey.status === 'Planejado' ? 'Em breve' : 'Iniciar Jornada' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Documentation Link -->
    <section class="doc-section">
      <div class="container">
        <div class="doc-card">
          <div class="doc-icon">
            <i class="bi bi-book"></i>
          </div>
          <div class="doc-content">
            <h3>Documentação Completa</h3>
            <p>Acesse a documentação completa das jornadas, personas e regras de negócio</p>
            <a 
              href="http://localhost:3003/docs/journeys/teacher" 
              target="_blank"
              class="btn btn-outline-primary"
            >
              <i class="bi bi-box-arrow-up-right"></i>
              Ver Documentação
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: var(--gray-50);
}

/* Header */
.dashboard-header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  color: white;
  padding: 2rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  transition: opacity var(--transition-fast);
}

.back-link:hover {
  opacity: 1;
}

.header-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

/* Stats Section */
.stats-section {
  padding: 2rem 0;
  margin-top: -2rem;
}

.stat-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--stat-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

/* Journeys Section */
.journeys-section {
  padding: 3rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.journey-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all var(--transition-base);
}

.journey-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.journey-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.journey-id {
  font-family: var(--font-family-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  background: rgba(115, 103, 240, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
}

.journey-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0;
}

.journey-description {
  color: var(--gray-600);
  line-height: 1.6;
  flex: 1;
}

.journey-footer {
  padding-top: 0.5rem;
  border-top: 1px solid var(--gray-200);
}

/* Documentation Section */
.doc-section {
  padding: 2rem 0 4rem;
}

.doc-card {
  background: linear-gradient(135deg, #f5f5ff 0%, #ffffff 100%);
  border: 2px solid var(--primary);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.doc-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  flex-shrink: 0;
}

.doc-content {
  flex: 1;
}

.doc-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.doc-content p {
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .stats-section .grid-cols-4,
  .journeys-section .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .doc-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
