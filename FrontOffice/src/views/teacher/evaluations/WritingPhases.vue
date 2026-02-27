<script setup>
import { ref } from 'vue'

const turma = ref('')
const turmas = ['1º Ano A', '1º Ano B', '2º Ano A', '3º Ano A']

const phases = [
  { label: 'Pré-Silábico',      color: '#EA5455', bg: 'rgba(234,84,85,.12)'  },
  { label: 'Silábico',          color: '#FF9F43', bg: 'rgba(255,159,67,.12)' },
  { label: 'Silábico-Alfabético', color: '#00CFE8', bg: 'rgba(0,207,232,.12)'  },
  { label: 'Alfabético',        color: '#28C76F', bg: 'rgba(40,199,111,.12)' },
]

const students = [
  { id: 1, name: 'Ana Carolina',  turma: '1º Ano A', phase: 'Alfabético' },
  { id: 2, name: 'Bruno Lima',    turma: '1º Ano A', phase: 'Silábico-Alfabético' },
  { id: 3, name: 'Camila Rocha',  turma: '1º Ano B', phase: 'Silábico' },
  { id: 4, name: 'Diego F.',      turma: '2º Ano A', phase: 'Alfabético' },
  { id: 5, name: 'Érika N.',      turma: '1º Ano A', phase: 'Pré-Silábico' },
  { id: 6, name: 'Felipe O.',     turma: '1º Ano B', phase: 'Silábico' },
  { id: 7, name: 'Gabriela M.',   turma: '3º Ano A', phase: 'Alfabético' },
  { id: 8, name: 'Hugo Costa',    turma: '2º Ano A', phase: 'Silábico-Alfabético' },
  { id: 9, name: 'Isadora P.',    turma: '1º Ano B', phase: 'Pré-Silábico' },
  { id:10, name: 'Júlio César',   turma: '3º Ano A', phase: 'Alfabético' },
]

const phaseMap = Object.fromEntries(phases.map(p => [p.label, p]))

const filtered = () =>
  turma.value ? students.filter(s => s.turma === turma.value) : students

const initials = (n) => n.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()
</script>

<template>
  <section>
    <!-- Filter + legend -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div class="d-flex gap-2 flex-wrap">
        <span v-for="p in phases" :key="p.label" class="badge rounded-pill"
          :style="`background:${p.bg};color:${p.color};font-size:.75rem`">
          {{ p.label }}
        </span>
      </div>
      <div style="min-width:200px">
        <select v-model="turma" class="form-select form-select-sm">
          <option value="">Todas as turmas</option>
          <option v-for="t in turmas" :key="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <!-- Grid of student cards -->
    <div class="row g-3">
      <div class="col-6 col-md-4 col-xl-3" v-for="s in filtered()" :key="s.id">
        <div class="card text-center student-card">
          <div class="card-body py-3 px-2">
            <div class="avatar-circle mx-auto mb-2"
              :style="`background:${phaseMap[s.phase].bg};color:${phaseMap[s.phase].color};width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem`">
              {{ initials(s.name) }}
            </div>
            <div class="fw-semibold small text-truncate px-1">{{ s.name }}</div>
            <small class="text-muted d-block mb-2">{{ s.turma }}</small>
            <span class="badge rounded-pill"
              :style="`background:${phaseMap[s.phase].bg};color:${phaseMap[s.phase].color};font-size:.7rem`">
              {{ s.phase }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="filtered().length === 0" class="col-12">
        <p class="text-center text-muted py-4">Nenhum aluno encontrado.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.student-card { border-radius: 12px; transition: box-shadow .2s; cursor: pointer; }
.student-card:hover { box-shadow: 0 4px 14px rgba(115,103,240,.15); }
</style>
