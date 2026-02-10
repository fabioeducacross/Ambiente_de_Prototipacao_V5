<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const journeys = ref([
  { id: 'REDE-001', name: 'Visão Geral da Rede', description: 'Indicadores consolidados de todas as escolas', status: 'Planejado', color: '#FF9F43' },
  { id: 'REDE-002', name: 'Comparações', description: 'Análise comparativa entre escolas', status: 'Planejado', color: '#FF9F43' },
  { id: 'REDE-003', name: 'Planejamento Estratégico', description: 'Definir metas e estratégias da rede', status: 'Planejado', color: '#FF9F43' }
])

const stats = ref([
  { label: 'Escolas na Rede', value: '24', icon: 'bi-building', color: '#8250DF' },
  { label: 'Alunos Total', value: '18.5K', icon: 'bi-person', color: '#00CFE8' },
  { label: 'Taxa Global', value: '92%', icon: 'bi-graph-up', color: '#28C76F' },
  { label: 'NPS Médio', value: '78', icon: 'bi-star-fill', color: '#FF9F43' }
])
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <RouterLink to="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar</RouterLink>
            <h1 class="header-title"><i class="bi bi-globe"></i>Dashboard Gestor de Rede</h1>
            <p class="header-subtitle">Gestão de múltiplas escolas e indicadores de rede</p>
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
