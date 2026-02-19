<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { EBadge } from '@/components/base'

const journeys = ref([
  { id: 'DIR-001', name: 'Indicadores Estratégicos', description: 'Visualizar KPIs e métricas da escola', status: 'Planejado', color: '#FF9F43' },
  { id: 'DIR-002', name: 'Gestão de Recursos', description: 'Alocar e gerenciar recursos escolares', status: 'Planejado', color: '#FF9F43' },
  { id: 'DIR-003', name: 'Relatórios Gerenciais', description: 'Gerar relatórios executivos', status: 'Planejado', color: '#FF9F43' }
])

const stats = ref([
  { label: 'Alunos Total', value: '1250', icon: 'bi-person', color: '#00CFE8' },
  { label: 'Taxa Aprovação', value: '94%', icon: 'bi-check-circle', color: '#28C76F' },
  { label: 'Professores', value: '45', icon: 'bi-person-workspace', color: '#7367F0' },
  { label: 'Satisfação', value: '4.6', icon: 'bi-star-fill', color: '#FF9F43' }
])
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <RouterLink to="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar</RouterLink>
            <h1 class="header-title"><i class="bi bi-building"></i>Dashboard Diretor</h1>
            <p class="header-subtitle">Gestão escolar e indicadores estratégicos</p>
          </div>
        </div>
      </div>
    </header>

    <section class="stats-section">
      <div class="container">
        <div class="grid grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="stat-card" :style="{ '--stat-color': stat.color }">
            <div class="stat-icon"><i :class="stat.icon"></i></div>
            <div class="stat-content">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="journeys-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title"><i class="bi bi-map"></i>Jornadas Disponíveis</h2>
        </div>
        <div class="grid grid-cols-2">
          <div v-for="journey in journeys" :key="journey.id" class="journey-card">
            <div class="journey-header">
              <div class="journey-id">{{ journey.id }}</div>
              <EBadge :background-color="journey.color" color="white" pill>{{ journey.status }}</EBadge>
            </div>
            <h3 class="journey-title">{{ journey.name }}</h3>
            <p class="journey-description">{{ journey.description }}</p>
            <div class="journey-footer">
              <button class="btn btn-primary" disabled><i class="bi bi-play-circle"></i>Em breve</button>
            </div>
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

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  
  .stats-section .grid-cols-4,
  .journeys-section .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
