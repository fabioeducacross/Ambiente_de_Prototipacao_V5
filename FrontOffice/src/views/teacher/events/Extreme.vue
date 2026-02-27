<script setup>
const events = [
  { id: 1, name: 'Extreme de Leitura — SF',   modality: 'Leitura',       date: '22/07/2025', status: 'Aberto',    inscritos: 18 },
  { id: 2, name: 'Extreme Matemático',         modality: 'Matemática',    date: '29/07/2025', status: 'Aberto',    inscritos: 24 },
  { id: 3, name: 'Extreme de Ciências 2024',   modality: 'Ciências',      date: '14/11/2024', status: 'Encerrado', inscritos: 60 },
  { id: 4, name: 'Extreme Vocabulário',        modality: 'Inglês',        date: '05/09/2025', status: 'Em breve',  inscritos: 0  },
]

const statusStyle = (s) => ({
  Aberto:     { bg: 'rgba(40,199,111,.15)',  tx: '#28C76F' },
  'Em breve': { bg: 'rgba(255,159,67,.15)',  tx: '#FF9F43' },
  Encerrado:  { bg: 'rgba(115,103,240,.15)', tx: '#7367F0' },
}[s] || { bg: '#eee', tx: '#888' })
</script>

<template>
  <section>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0 fw-bold">Extreme</h6>
        <button class="btn btn-primary btn-sm">
          <span class="material-symbols-outlined align-middle me-1" style="font-size:14px">add</span>
          Inscrever Alunos
        </button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Nome</th>
                <th>Modalidade</th>
                <th>Data</th>
                <th>Status</th>
                <th>Inscritos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in events" :key="e.id">
                <td class="fw-semibold small">{{ e.name }}</td>
                <td>
                  <span class="badge rounded-pill"
                    style="background:rgba(115,103,240,.12);color:#7367F0">{{ e.modality }}</span>
                </td>
                <td class="text-muted small">{{ e.date }}</td>
                <td>
                  <span class="badge rounded-pill"
                    :style="`background:${statusStyle(e.status).bg};color:${statusStyle(e.status).tx}`">
                    {{ e.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <span class="material-symbols-outlined" style="font-size:15px;color:#6c757d">group</span>
                    <span class="fw-semibold">{{ e.inscritos }}</span>
                  </div>
                </td>
                <td>
                  <span class="material-symbols-outlined text-primary" style="font-size:18px;cursor:pointer" title="Ver detalhes">visibility</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-header { background:#fff; border-bottom:1px solid rgba(0,0,0,.07); padding:1rem 1.25rem; }
.table th { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:#6c757d; }
.table td { vertical-align:middle; font-size:.875rem; }
</style>
