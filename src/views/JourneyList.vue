<template>
  <div class="journey-list-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Jornadas Educacionais</h1>
        <p class="page-subtitle">Explore as jornadas de aprendizado disponíveis</p>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <!-- Card especial: Calendário (nova feature) -->
        <div class="col-md-4">
          <router-link to="/teacher/calendar" class="journey-card-link">
            <div class="card journey-card calendar-card">
              <div class="card-header">
                <span class="badge badge-info">Nova Feature</span>
                <span class="badge badge-primary">PROF-XXX</span>
              </div>
              <div class="card-body">
                <div class="calendar-icon">
                  <i class="bi bi-calendar3"></i>
                </div>
                <h3 class="card-title">Calendário de Eventos</h3>
                <p class="card-text">Visualize e gerencie todos os eventos das suas turmas em Mês, Semana, Dia ou Lista</p>
                
                <div class="journey-info">
                  <div class="info-item">
                    <i class="bi bi-eye"></i>
                    <span>4 visualizações</span>
                  </div>
                  <div class="info-item">
                    <i class="bi bi-plus-circle"></i>
                    <span>Criar eventos</span>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <span class="btn btn-primary btn-block">
                  Acessar Calendário
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Demais jornadas -->
        <div class="col-md-4" v-for="journey in journeys" :key="journey.id">
          <div class="card journey-card">
            <div class="card-header">
              <span class="badge" :class="getBadgeClass(journey.nivel)">
                {{ journey.nivel }}
              </span>
              <span class="badge badge-secondary">{{ journey.categoria }}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ journey.titulo }}</h3>
              <p class="card-text">{{ journey.descricao }}</p>
              
              <div class="journey-info">
                <div class="info-item">
                  <i class="bi bi-clock"></i>
                  <span>{{ journey.duracao }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-book"></i>
                  <span>{{ journey.modulos.length }} módulos</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <router-link 
                :to="`/jornada/${journey.id}`" 
                class="btn btn-primary btn-block"
              >
                Ver Detalhes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import journeysData from '../data/journeys.json'

const journeys = ref(journeysData)

const getBadgeClass = (nivel) => {
  const classes = {
    'Iniciante': 'badge-success',
    'Intermediário': 'badge-warning',
    'Avançado': 'badge-danger'
  }
  return classes[nivel] || 'badge-primary'
}
</script>

<style scoped>
.journey-list-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 60px 0;
  color: white;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.journey-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  gap: 0.5rem;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

.card-text {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.journey-info {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.info-item i {
  color: #7367F0;
}

.card-footer {
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25rem;
}

.badge-success {
  background-color: #28C76F;
  color: white;
}

.badge-warning {
  background-color: #FF9F43;
  color: white;
}

.badge-danger {
  background-color: #EA5455;
  color: white;
}

.badge-secondary {
  background-color: #82868B;
  color: white;
}

.badge-primary {
  background-color: #7367F0;
  color: white;
}

.badge-info {
  background-color: #00CFE8;
  color: white;
}

/* Calendar card special styling */
.journey-card-link {
  text-decoration: none;
  display: block;
}

.calendar-card {
  border: 2px solid var(--primary);
  position: relative;
  overflow: hidden;
}

.calendar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #7367F0, #00CFE8, #28C76F);
}

.calendar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.calendar-icon i {
  font-size: 32px;
  color: white;
}

.calendar-card .card-title {
  color: var(--primary);
}

.calendar-card:hover {
  border-color: var(--info);
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(115, 103, 240, 0.3);
}

.badge-primary {
  background-color: #7367F0;
  color: white;
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: #7367F0;
  color: white;
}

.btn-primary:hover {
  background-color: #6258d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(115, 103, 240, 0.3);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
