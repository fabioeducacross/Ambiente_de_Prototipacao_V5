<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { EBadge } from '@/components/base'

const journeys = ref([
  { id: 'ALUNO-001', name: 'Acessar Missões', description: 'Visualizar e iniciar missões disponíveis', status: 'Planejado', color: '#FF9F43' },
  { id: 'ALUNO-002', name: 'Completar Atividades', description: 'Realizar e entregar atividades das missões', status: 'Planejado', color: '#FF9F43' },
  { id: 'ALUNO-003', name: 'Ver Conquistas', description: 'Acompanhar badges e evolução pessoal', status: 'Planejado', color: '#FF9F43' },
  { id: 'ALUNO-004', name: 'Receber Feedback', description: 'Visualizar correções e comentários do professor', status: 'Planejado', color: '#FF9F43' }
])

const stats = ref([
  { label: 'Missões Ativas', value: '5', icon: 'bi-flag', color: '#7367F0' },
  { label: 'Conquistas', value: '23', icon: 'bi-trophy', color: '#FF9F43' },
  { label: 'Pontos', value: '1840', icon: 'bi-star', color: '#28C76F' },
  { label: 'Nível', value: '12', icon: 'bi-graph-up', color: '#00CFE8' }
])
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <RouterLink to="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar</RouterLink>
            <h1 class="header-title"><i class="bi bi-person"></i>Dashboard Aluno</h1>
            <p class="header-subtitle">Acesso a missões, conquistas e progresso pessoal</p>
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
