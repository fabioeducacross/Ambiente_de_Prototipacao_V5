<script setup>
import { ref } from 'vue'

const islands = ref([
  { id: 1, name: 'Ilha da Aventura',    icon: 'terrain',        turmas: ['3º Ano A', '3º Ano B'], active: true,  subjects: 'Português · Matemática' },
  { id: 2, name: 'Ilha dos Números',    icon: 'calculate',      turmas: ['4º Ano A'],             active: true,  subjects: 'Matemática' },
  { id: 3, name: 'Ilha do Saber',       icon: 'auto_stories',   turmas: ['5º Ano A', '5º Ano B'], active: false, subjects: 'Ciências · História' },
  { id: 4, name: 'Ilha das Letras',     icon: 'spellcheck',     turmas: ['1º Ano A', '1º Ano B'], active: true,  subjects: 'Português' },
  { id: 5, name: 'Ilha da Descoberta',  icon: 'explore',        turmas: ['2º Ano A'],             active: false, subjects: 'Ciências · Geografia' },
  { id: 6, name: 'Ilha do Desafio',     icon: 'emoji_events',   turmas: [],                       active: false, subjects: 'Todos os componentes' },
])
</script>

<template>
  <section>
    <p class="text-muted small mb-4">
      Ative ou desative ilhas de jogos para suas turmas. Alunos só acessam as ilhas habilitadas pelo professor.
    </p>

    <div class="row g-3">
      <div class="col-md-6 col-xl-4" v-for="isle in islands" :key="isle.id">
        <div class="card h-100" :class="{ 'border-primary': isle.active }"
          :style="isle.active ? 'box-shadow:0 2px 12px rgba(115,103,240,.18)' : ''">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <div class="icon-box mb-3" :style="isle.active ? 'background:rgba(115,103,240,.12)' : 'background:#f5f5f5'">
                <span class="material-symbols-outlined" :style="isle.active ? 'color:#7367F0' : 'color:#aaa'" style="font-size:28px">
                  {{ isle.icon }}
                </span>
              </div>
              <!-- Toggle -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" v-model="isle.active"
                  :id="`isle-${isle.id}`" style="width:2.4em;height:1.2em;cursor:pointer" />
              </div>
            </div>

            <h6 class="fw-bold mb-1">{{ isle.name }}</h6>
            <small class="text-muted d-block mb-2">{{ isle.subjects }}</small>

            <div v-if="isle.turmas.length > 0" class="d-flex flex-wrap gap-1">
              <span v-for="t in isle.turmas" :key="t" class="badge rounded-pill"
                style="background:rgba(0,207,232,.12);color:#00CFE8;font-size:.7rem">{{ t }}</span>
            </div>
            <span v-else class="text-muted" style="font-size:.75rem">Nenhuma turma atribuída</span>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small :style="isle.active ? 'color:#28C76F;font-weight:600' : 'color:#aaa'">
              {{ isle.active ? '● Habilitada' : '○ Desabilitada' }}
            </small>
            <button class="btn btn-sm" style="background:rgba(115,103,240,.1);color:#7367F0;border:none">Configurar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card { border-radius: 12px; transition: box-shadow .2s; }
.border-primary { border-color: #7367F0 !important; }
.icon-box {
  width: 56px; height: 56px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.card-footer { background: #fff; border-top: 1px solid rgba(0,0,0,.07); padding: .75rem 1.25rem; }
</style>
