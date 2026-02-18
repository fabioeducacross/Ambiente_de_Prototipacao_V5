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
@import '../teacher/Dashboard.vue';
</style>
