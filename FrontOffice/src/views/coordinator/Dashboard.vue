<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const journeys = ref([
  { id: 'COORD-001', name: 'Gestão Pedagógica', description: 'Acompanhar indicadores pedagógicos da escola', status: 'Planejado', color: '#FF9F43' },
  { id: 'COORD-002', name: 'Suporte a Professores', description: 'Apoiar professores em questões pedagógicas', status: 'Planejado', color: '#FF9F43' },
  { id: 'COORD-003', name: 'Análise de Turmas', description: 'Monitorar desempenho das turmas', status: 'Planejado', color: '#FF9F43' }
])

const stats = ref([
  { label: 'Turmas', value: '24', icon: 'bi-people', color: '#28C76F' },
  { label: 'Professores', value: '18', icon: 'bi-person-workspace', color: '#7367F0' },
  { label: 'Alunos', value: '680', icon: 'bi-person', color: '#00CFE8' },
  { label: 'Aproveitamento', value: '89%', icon: 'bi-graph-up', color: '#28C76F' }
])
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <RouterLink to="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar</RouterLink>
            <h1 class="header-title"><i class="bi bi-diagram-3"></i>Dashboard Coordenador</h1>
            <p class="header-subtitle">Coordenação pedagógica e gestão de turmas</p>
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
              <span class="badge" :style="{ backgroundColor: journey.color, color: 'white' }">{{ journey.status }}</span>
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
@import '../teacher/Dashboard.vue';
</style>
