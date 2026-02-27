<script setup>
const classes = [
  { id: 1, name: '1º Ano A', total: 28, avaliados: 20, concluidos: 12, pct: 43 },
  { id: 2, name: '1º Ano B', total: 25, avaliados: 15, concluidos: 9,  pct: 36 },
  { id: 3, name: '2º Ano A', total: 30, avaliados: 28, concluidos: 25, pct: 83 },
  { id: 4, name: '3º Ano A', total: 27, avaliados: 27, concluidos: 27, pct: 100 },
  { id: 5, name: '4º Ano A', total: 32, avaliados: 18, concluidos: 10, pct: 31 },
]

const barColor = (p) => p >= 80 ? '#28C76F' : p >= 50 ? '#FF9F43' : '#EA5455'
</script>

<template>
  <section>
    <div class="alert" style="background:rgba(0,207,232,.08);border:1px solid rgba(0,207,232,.2);color:#00CFE8;border-radius:10px" role="alert">
      <span class="material-symbols-outlined align-middle me-2" style="font-size:18px">info</span>
      <strong>FluEsc</strong> avalia a fluência em escrita dos alunos. Inicie uma avaliação por turma.
    </div>

    <div class="row g-3 mt-1">
      <div class="col-md-6 col-xl-4" v-for="c in classes" :key="c.id">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h6 class="fw-bold mb-0">{{ c.name }}</h6>
                <small class="text-muted">{{ c.total }} alunos matriculados</small>
              </div>
              <span class="badge rounded-pill"
                :style="`background:${barColor(c.pct)}22;color:${barColor(c.pct)}`">
                {{ c.pct }}%
              </span>
            </div>

            <div class="mb-3">
              <div class="d-flex justify-content-between small mb-1">
                <span class="text-muted">Concluídos</span>
                <span class="fw-semibold">{{ c.concluidos }} / {{ c.total }}</span>
              </div>
              <div class="progress" style="height:8px;border-radius:4px">
                <div class="progress-bar" role="progressbar"
                  :style="`width:${c.pct}%;background:${barColor(c.pct)}`"></div>
              </div>
            </div>

            <div class="d-flex justify-content-between">
              <small class="text-muted">Avaliados: <strong>{{ c.avaliados }}</strong></small>
              <button class="btn btn-sm btn-primary">
                <span class="material-symbols-outlined align-middle me-1" style="font-size:14px">assignment</span>
                Avaliar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card { border-radius: 12px; }
</style>
