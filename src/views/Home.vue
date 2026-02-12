<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">Ambiente de Prototipação Educacross</h1>
        <p class="hero-subtitle">
          Crie e teste protótipos de jornadas educacionais usando o Design System Vuexy
        </p>
        <div class="hero-actions">
          <router-link to="/jornadas" class="btn btn-primary">
            Ver Jornadas
          </router-link>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="feature-icon">
                <i class="bi bi-journal-text"></i>
              </div>
              <h3 class="card-title">Jornadas Educacionais</h3>
              <p class="card-text">
                Crie e gerencie jornadas de aprendizado personalizadas para seus alunos
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="feature-icon">
                <i class="bi bi-palette"></i>
              </div>
              <h3 class="card-title">Design System Vuexy</h3>
              <p class="card-text">
                Interface moderna e responsiva usando componentes do Vuexy
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="feature-icon">
                <i class="bi bi-database"></i>
              </div>
              <h3 class="card-title">Dados em JSON</h3>
              <p class="card-text">
                Sistema de dados simples e eficiente usando arquivos JSON
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Demonstração do MiniCalendar -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="section-title text-center mb-4">Componente MiniCalendar</h2>
          <p class="text-center text-muted mb-4">Calendário implementado pixel-perfect do Figma Design System</p>
        </div>
        <div class="col-md-4 offset-md-4">
          <MiniCalendar />
        </div>
      </div>

      <!-- Demonstração da ActivityLegend -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="section-title text-center mb-4">Componente ActivityLegend</h2>
          <p class="text-center text-muted mb-4">Legenda de tipos de atividades com Atomic Design</p>
        </div>
        <div class="col-12">
          <ActivityLegend
            title="Tipos de Atividade:"
            :activities="activityTypes"
            interactive
            @activity-click="handleActivityClick"
          />
        </div>
      </div>

      <!-- Demonstração do CalendarLayoutTemplate (Layout Completo) -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="section-title text-center mb-4">Layout Completo do Calendário</h2>
          <p class="text-center text-muted mb-4">Template com sidebar, filtros e visualização mensal integrada</p>
        </div>
        <div class="col-12">
          <div class="calendar-demo-container">
            <CalendarLayoutTemplate
              :events="sampleEvents"
              :activity-options="activityOptions"
              :initial-date="new Date(2022, 0, 1)"
              @add-event="handleAddEvent"
              @activity-change="handleActivityChange"
              @day-click="handleDayClick"
              @event-click="handleEventClick"
              @view-change="handleViewChange"
              @month-change="handleMonthChange"
            >
              <template #footer>
                <ActivityLegend
                  title="Legenda de Atividades:"
                  :activities="activityTypes"
                  interactive
                  @activity-click="handleActivityClick"
                />
              </template>
            </CalendarLayoutTemplate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MiniCalendar from '../components/MiniCalendar.vue'
import ActivityLegend from '../components/organisms/ActivityLegend.vue'
import CalendarLayoutTemplate from '../components/templates/CalendarLayoutTemplate.vue'

// Activity types para a legenda
const activityTypes = [
  { type: 'missao', color: '#7367F0', label: 'Missões' },
  { type: 'olimpiada', color: '#00CFE8', label: 'Olimpíadas' },
  { type: 'avaliacao', color: '#FF9F43', label: 'Avaliações' },
  { type: 'trilha', color: '#28C76F', label: 'Trilhas' },
  { type: 'expedicao', color: '#EA5455', label: 'Expedições' },
  { type: 'outro', color: '#82868B', label: 'Outros' }
]

// Activity options para filtros (checkbox format)
const activityOptions = [
  { value: 'missao', label: 'Missões', disabled: false },
  { value: 'olimpiada', label: 'Olimpíadas', disabled: false },
  { value: 'avaliacao', label: 'Avaliações', disabled: false },
  { value: 'trilha', label: 'Trilhas', disabled: false },
  { value: 'expedicao', label: 'Expedições', disabled: false }
]

// Sample events para demo
const sampleEvents = [
  {
    id: 1,
    title: 'Missão: Matemática Básica',
    date: '2022-01-05',
    type: 'missao',
    color: '#7367F0'
  },
  {
    id: 2,
    title: 'Olimpíada de Português',
    date: '2022-01-10',
    type: 'olimpiada',
    color: '#00CFE8'
  },
  {
    id: 3,
    title: 'Avaliação Trimestral',
    date: '2022-01-15',
    type: 'avaliacao',
    color: '#FF9F43'
  },
  {
    id: 4,
    title: 'Trilha: Ciências',
    date: '2022-01-20',
    type: 'trilha',
    color: '#28C76F'
  },
  {
    id: 5,
    title: 'Expedição Virtual',
    date: '2022-01-25',
    type: 'expedicao',
    color: '#EA5455'
  },
  {
    id: 6,
    title: 'Reunião de Pais',
    date: '2022-01-28',
    type: 'outro',
    color: '#82868B'
  },
  // Múltiplos eventos no mesmo dia
  {
    id: 7,
    title: 'Missão: História do Brasil',
    date: '2022-01-15',
    type: 'missao',
    color: '#7367F0'
  },
  {
    id: 8,
    title: 'Trilha: Geografia',
    date: '2022-01-15',
    type: 'trilha',
    color: '#28C76F'
  }
]

// Handlers
const handleActivityClick = (activityType) => {
  console.log('Activity clicked:', activityType)
}

const handleAddEvent = () => {
  console.log('Add event clicked')
  alert('Funcionalidade "Adicionar Evento" - Abriria modal ou drawer')
}

const handleActivityChange = (selectedActivities) => {
  console.log('Selected activities:', selectedActivities)
}

const handleDayClick = (day) => {
  console.log('Day clicked:', day)
}

const handleEventClick = (event) => {
  console.log('Event clicked:', event)
  alert(`Evento: ${event.title}`)
}

const handleViewChange = (newView) => {
  console.log('View changed to:', newView)
}

const handleMonthChange = (date) => {
  console.log('Month changed to:', date)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 100px 0;
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  margin-top: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
}

.offset-md-4 {
  margin-left: 33.333333%;
}

@media (max-width: 768px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .offset-md-4 {
    margin-left: 0;
  }
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  color: #7367F0;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.card-text {
  color: #6c757d;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
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
  background-color: white;
  color: #7367F0;
}

.btn-primary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.mt-5 {
  margin-top: 3rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.text-center {
  text-align: center;
}

.text-muted {
  color: #6c757d;
  font-size: 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2F2B3D;
}

.calendar-demo-container {
  height: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .calendar-demo-container {
    height: 600px;
  }
}
</style>
