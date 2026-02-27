<script setup>
import { ref } from 'vue'

const search = ref('')

const games = [
  { id: 1,  title: 'Caça-Palavras Mágico',  subject: 'Português',   age: '6-8',  icon: 'font_download',  color: '#7367F0',  desc: 'Encontre as palavras escondidas antes do tempo acabar!' },
  { id: 2,  title: 'Conta & Conta',          subject: 'Matemática',  age: '7-9',  icon: 'calculate',      color: '#28C76F',  desc: 'Treine adição e subtração de forma divertida.' },
  { id: 3,  title: 'Ilha das Letras',        subject: 'Português',   age: '6-7',  icon: 'spellcheck',     color: '#00CFE8',  desc: 'Forme sílabas e palavras para desbloquear tesouros.' },
  { id: 4,  title: 'Quiz Bicho Sabido',      subject: 'Ciências',    age: '8-10', icon: 'nature',         color: '#FF9F43',  desc: 'Responda perguntas sobre animais e meio ambiente.' },
  { id: 5,  title: 'Mestre das Tabuadas',    subject: 'Matemática',  age: '8-12', icon: 'grid_on',        color: '#EA5455',  desc: 'Desafie os colegas na batalha de multiplicação.' },
  { id: 6,  title: 'Alfabeto Encantado',     subject: 'Português',   age: '6-7',  icon: 'abc',            color: '#7367F0',  desc: 'Aprenda o alfabeto com histórias e músicas.' },
  { id: 7,  title: 'Explore o Brasil',       subject: 'Geografia',   age: '9-12', icon: 'map',            color: '#28C76F',  desc: 'Descubra estados, capitais e curiosidades do país.' },
  { id: 8,  title: 'Frase Detetive',         subject: 'Português',   age: '9-11', icon: 'manage_search',  color: '#00CFE8',  desc: 'Monte frases corretas e ganhe pontos.' },
]

const filtered = () =>
  games.filter(g =>
    g.title.toLowerCase().includes(search.value.toLowerCase()) ||
    g.subject.toLowerCase().includes(search.value.toLowerCase())
  )

const subjectColor = (s) => ({
  Português:  { bg: 'rgba(115,103,240,.12)', tx: '#7367F0' },
  Matemática: { bg: 'rgba(40,199,111,.12)',  tx: '#28C76F' },
  Ciências:   { bg: 'rgba(255,159,67,.12)',  tx: '#FF9F43' },
  Geografia:  { bg: 'rgba(0,207,232,.12)',   tx: '#00CFE8' },
}[s] || { bg: '#eee', tx: '#888' })
</script>

<template>
  <section>
    <!-- Search -->
    <div class="card mb-4">
      <div class="card-body py-2">
        <div class="input-group" style="max-width:380px">
          <span class="input-group-text bg-transparent border-end-0">
            <span class="material-symbols-outlined" style="font-size:18px;color:#6c757d">search</span>
          </span>
          <input v-model="search" type="text" class="form-control border-start-0" placeholder="Buscar jogo ou componente" />
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="row g-3">
      <div class="col-md-6 col-xl-3" v-for="g in filtered()" :key="g.id">
        <div class="card h-100 game-card">
          <div class="card-body d-flex flex-column gap-2">
            <div class="icon-box" :style="`background:${g.color}18`">
              <span class="material-symbols-outlined" :style="`color:${g.color};font-size:32px`">{{ g.icon }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="fw-bold mb-0">{{ g.title }}</h6>
              <small class="text-muted flex-shrink-0 ms-2">{{ g.age }} anos</small>
            </div>
            <p class="text-muted small flex-grow-1 mb-1">{{ g.desc }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge rounded-pill"
                :style="`background:${subjectColor(g.subject).bg};color:${subjectColor(g.subject).tx};font-size:.7rem`">
                {{ g.subject }}
              </span>
              <button class="btn btn-sm" :style="`background:${g.color}1A;color:${g.color};border:none`">
                <span class="material-symbols-outlined align-middle me-1" style="font-size:14px">play_arrow</span>
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filtered().length === 0" class="col-12">
        <p class="text-center text-muted py-5">Nenhum jogo encontrado.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-card {
  border-radius: 14px;
  transition: box-shadow .2s, transform .15s;
}
.game-card:hover {
  box-shadow: 0 6px 20px rgba(115,103,240,.18);
  transform: translateY(-4px);
}
.icon-box {
  width: 64px; height: 64px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
</style>
