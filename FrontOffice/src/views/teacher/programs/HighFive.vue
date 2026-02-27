<script setup>
const program = {
  name: 'High Five',
  logo: 'back_hand',
  color: '#EA5455',
  description: 'Programa de leitura e fluência oral que incentiva estudantes a desenvolver confiança na leitura em voz alta por meio de atividades gamificadas e avaliações periódicas.',
  tags: ['1º ao 5º Ano', 'Fluência Leitora'],
}
</script>

<template>
  <section class="d-flex justify-content-center">
    <div class="card text-center" style="max-width:520px;width:100%">
      <div class="card-body py-5 px-4">
        <div class="program-icon mx-auto mb-4">
          <span class="material-symbols-outlined" :style="`color:${program.color};font-size:48px`">{{ program.logo }}</span>
        </div>
        <h4 class="fw-bold mb-2">{{ program.name }}</h4>
        <p class="text-muted mb-4">{{ program.description }}</p>
        <div class="d-flex flex-wrap gap-2 justify-content-center mb-4">
          <span v-for="tag in program.tags" :key="tag" class="badge rounded-pill"
            style="background:rgba(234,84,85,.12);color:#EA5455">{{ tag }}</span>
        </div>
        <button class="btn px-4" style="background:#EA5455;color:#fff" disabled>
          <span class="material-symbols-outlined align-middle me-1" style="font-size:16px">open_in_new</span>
          Acessar Programa
        </button>
        <p class="text-muted mt-3 mb-0" style="font-size:.75rem">Acesso disponível apenas em produção.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.program-icon {
  width: 96px; height: 96px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(234,84,85,.1);
}
</style>
