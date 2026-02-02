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
    </div>
  </div>
</template>

<script setup>
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

@media (max-width: 768px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
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
</style>
