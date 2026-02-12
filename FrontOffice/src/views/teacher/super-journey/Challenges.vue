<template>
  <div class="page-container">
    <h1 class="page-title">{{ pageTitle }}</h1>
    <p class="page-description">Protótipo em desenvolvimento...</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pageTitle = ref('Jornada Super - Desafios')
</script>

<style scoped>
.page-container {
  padding: 24px;
}

.page-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: rgba(47, 43, 61, 0.9);
  margin-bottom: 8px;
}

.page-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: rgba(47, 43, 61, 0.7);
}
</style>
