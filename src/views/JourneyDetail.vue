<template>
  <div class="journey-detail-page">
    <div v-if="journey" class="content">
      <div class="page-header">
        <div class="container">
          <router-link to="/jornadas" class="back-link">
            <i class="bi bi-arrow-left"></i> Voltar
          </router-link>
          <h1 class="page-title">{{ journey.titulo }}</h1>
          <div class="header-badges">
            <span class="badge" :class="getBadgeClass(journey.nivel)">
              {{ journey.nivel }}
            </span>
            <span class="badge badge-secondary">{{ journey.categoria }}</span>
            <span class="badge badge-info">
              <i class="bi bi-clock"></i> {{ journey.duracao }}
            </span>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="section-title">Descrição</h2>
                <p class="description">{{ journey.descricao }}</p>

                <h2 class="section-title">Objetivos de Aprendizagem</h2>
                <ul class="objectives-list">
                  <li v-for="(objetivo, index) in journey.objetivos" :key="index">
                    <i class="bi bi-check-circle-fill"></i>
                    {{ objetivo }}
                  </li>
                </ul>

                <h2 class="section-title">Módulos do Curso</h2>
                <div class="modules-list">
                  <div 
                    v-for="modulo in journey.modulos" 
                    :key="modulo.id" 
                    class="module-card"
                  >
                    <div class="module-header">
                      <div class="module-number">Módulo {{ modulo.id }}</div>
                      <div class="module-duration">
                        <i class="bi bi-clock"></i> {{ modulo.duracao }}
                      </div>
                    </div>
                    <h3 class="module-title">{{ modulo.nome }}</h3>
                    <div class="module-info">
                      <span class="lesson-count">
                        <i class="bi bi-book"></i> {{ modulo.licoes }} lições
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card sticky-card">
              <div class="card-body">
                <h3 class="sidebar-title">Informações do Curso</h3>
                
                <div class="info-list">
                  <div class="info-item">
                    <i class="bi bi-clock-history"></i>
                    <div>
                      <div class="info-label">Duração</div>
                      <div class="info-value">{{ journey.duracao }}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="bi bi-graph-up"></i>
                    <div>
                      <div class="info-label">Nível</div>
                      <div class="info-value">{{ journey.nivel }}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="bi bi-bookmarks"></i>
                    <div>
                      <div class="info-label">Módulos</div>
                      <div class="info-value">{{ journey.modulos.length }} módulos</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="bi bi-activity"></i>
                    <div>
                      <div class="info-label">Status</div>
                      <div class="info-value">
                        <span class="badge badge-success">{{ journey.status }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button class="btn btn-primary btn-block mt-3">
                  <i class="bi bi-play-circle"></i> Iniciar Jornada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="container">
        <h2>Jornada não encontrada</h2>
        <router-link to="/jornadas" class="btn btn-primary">
          Ver todas as jornadas
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import journeysData from '../data/journeys.json'

const route = useRoute()
const journeyId = computed(() => parseInt(route.params.id))
const journey = ref(journeysData.find(j => j.id === journeyId.value))

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
.journey-detail-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 40px 0;
  color: white;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  margin-bottom: 1rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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

.col-md-8 {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  padding: 0 15px;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .col-md-8,
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-body {
  padding: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  margin-top: 2rem;
}

.section-title:first-child {
  margin-top: 0;
}

.description {
  color: #6c757d;
  line-height: 1.8;
  font-size: 1.125rem;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.6;
}

.objectives-list i {
  color: #28C76F;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.modules-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.module-card:hover {
  border-color: #7367F0;
  box-shadow: 0 4px 8px rgba(115, 103, 240, 0.1);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.module-number {
  font-size: 0.875rem;
  font-weight: 600;
  color: #7367F0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.module-duration {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.module-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.module-info {
  display: flex;
  gap: 1rem;
}

.lesson-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.lesson-count i {
  color: #7367F0;
}

.sticky-card {
  position: sticky;
  top: 20px;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-item > i {
  font-size: 1.5rem;
  color: #7367F0;
  flex-shrink: 0;
}

.info-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.info-value {
  font-weight: 600;
  color: #333;
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

.badge-info {
  background-color: #00CFE8;
  color: white;
}

.badge-primary {
  background-color: #7367F0;
  color: white;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
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

.mt-3 {
  margin-top: 1rem;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found h2 {
  margin-bottom: 2rem;
  color: #333;
}
</style>
