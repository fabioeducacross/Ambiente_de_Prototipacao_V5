<script setup>
import { ref } from 'vue'

const search = ref('')

const evaluations = ref([
  { id: 1, title: 'Diagnóstico Inicial 2025',       turmas: ['3º Ano A', '3º Ano B'],  date: '02/06/2025', status: 'Encerrada' },
  { id: 2, title: 'Avaliação Bimestral — Maio',     turmas: ['4º Ano A'],              date: '15/05/2025', status: 'Encerrada' },
  { id: 3, title: 'Sondagem de Leitura',             turmas: ['1º Ano A', '1º Ano B'], date: '10/06/2025', status: 'Ativa' },
  { id: 4, title: 'Quiz de Ciências — EF3',          turmas: ['3º Ano A'],              date: '18/06/2025', status: 'Agendada' },
  { id: 5, title: 'Verificação de Aprendizagem EF4', turmas: ['4º Ano A', '4º Ano B'], date: '20/06/2025', status: 'Agendada' },
  { id: 6, title: 'Avaliação Final — 1º Bimestre',  turmas: ['5º Ano A', '5º Ano B'], date: '25/06/2025', status: 'Ativa' },
])

const statusStyle = (s) => ({
  Ativa:     { bg: 'rgba(40,199,111,.15)',  tx: '#28C76F' },
  Encerrada: { bg: 'rgba(115,103,240,.15)', tx: '#7367F0' },
  Agendada:  { bg: 'rgba(255,159,67,.15)',  tx: '#FF9F43' },
}[s] || { bg: '#eee', tx: '#888' })

const filtered = () =>
  evaluations.value.filter(e =>
    e.title.toLowerCase().includes(search.value.toLowerCase())
  )
</script>

<template>
  <section>
    <!-- Toolbar -->
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="input-group" style="max-width:320px">
            <span class="input-group-text bg-transparent border-end-0">
              <span class="material-symbols-outlined" style="font-size:18px;color:#6c757d">search</span>
            </span>
            <input v-model="search" type="text" class="form-control border-start-0" placeholder="Pesquisar avaliação" />
          </div>
          <button class="btn btn-primary">
            <span class="material-symbols-outlined align-middle me-1" style="font-size:16px">add</span>
            Nova Avaliação
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Título</th>
                <th>Turmas</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in filtered()" :key="e.id">
                <td class="fw-semibold small">{{ e.title }}</td>
                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="t in e.turmas" :key="t" class="badge rounded-pill"
                      style="background:rgba(0,207,232,.12);color:#00CFE8;font-size:.7rem">{{ t }}</span>
                  </div>
                </td>
                <td class="text-muted small">{{ e.date }}</td>
                <td>
                  <span class="badge rounded-pill"
                    :style="`background:${statusStyle(e.status).bg};color:${statusStyle(e.status).tx}`">
                    {{ e.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <span class="material-symbols-outlined text-primary" style="font-size:18px;cursor:pointer" title="Editar">edit</span>
                    <span class="material-symbols-outlined text-muted" style="font-size:18px;cursor:pointer" title="Ver resultados">bar_chart</span>
                  </div>
                </td>
              </tr>
              <tr v-if="filtered().length === 0">
                <td colspan="5" class="text-center py-4 text-muted">Nenhuma avaliação encontrada.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-body { padding: .75rem 1rem; }
.table th { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:#6c757d; }
.table td { vertical-align:middle; font-size:.875rem; }
</style>
