<script setup>
import { ref } from 'vue'

const turma   = ref('')
const periodo = ref('')

const turmas  = ['1º Ano A', '1º Ano B', '2º Ano A', '3º Ano A', '4º Ano A', '5º Ano B']

const skills = [
  { code: 'EF01LP01', desc: 'Reconhecer que palavras diferentes compartilham letras.',      acerto: 87 },
  { code: 'EF01LP05', desc: 'Identificar o número de sílabas de palavras ao falar.',        acerto: 74 },
  { code: 'EF02LP01', desc: 'Ler palavras com correspondências regulares diretas.',          acerto: 66 },
  { code: 'EF02MA03', desc: 'Resolver adições e subtrações com números naturais.',           acerto: 55 },
  { code: 'EF03LP01', desc: 'Identificar a função e os usos da escrita na sociedade.',       acerto: 82 },
  { code: 'EF03MA08', desc: 'Multiplicar e dividir usando tabelas e propriedades.',           acerto: 49 },
  { code: 'EF04LP12', desc: 'Reconhecer relações entre textos de diferentes épocas.',        acerto: 38 },
  { code: 'EF04CI04', desc: 'Identificar características dos seres vivos.',                  acerto: 91 },
]

const barColor = (v) => v >= 80 ? '#28C76F' : v >= 60 ? '#FF9F43' : '#EA5455'
</script>

<template>
  <section>
    <!-- Filters -->
    <div class="card mb-4">
      <div class="card-header">
        <h6 class="mb-0 fw-bold">Filtros</h6>
      </div>
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-4">
            <label class="form-label small fw-semibold">Turma</label>
            <select v-model="turma" class="form-select">
              <option value="">Todas as turmas</option>
              <option v-for="t in turmas" :key="t">{{ t }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-semibold">Período</label>
            <select v-model="periodo" class="form-select">
              <option value="">Selecionar</option>
              <option>Última semana</option>
              <option>Último mês</option>
            </select>
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary w-100">
              <span class="material-symbols-outlined align-middle me-1" style="font-size:16px">search</span>
              Aplicar
            </button>
          </div>
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
                <th style="width:140px">Código BNCC</th>
                <th>Descrição da Habilidade</th>
                <th style="width:220px">% de Acerto</th>
                <th style="width:80px">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in skills" :key="s.code">
                <td>
                  <span class="badge rounded-pill" style="background:rgba(115,103,240,.15);color:#7367F0;font-family:monospace">
                    {{ s.code }}
                  </span>
                </td>
                <td class="small">{{ s.desc }}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="progress flex-grow-1" style="height:8px;border-radius:4px">
                      <div class="progress-bar" role="progressbar"
                        :style="`width:${s.acerto}%;background:${barColor(s.acerto)}`"></div>
                    </div>
                    <small class="fw-semibold" :style="`color:${barColor(s.acerto)};min-width:32px`">{{ s.acerto }}%</small>
                  </div>
                </td>
                <td>
                  <span class="badge rounded-pill"
                    :style="`background:${barColor(s.acerto)}22;color:${barColor(s.acerto)}`">
                    {{ s.acerto >= 80 ? 'Bom' : s.acerto >= 60 ? 'Regular' : 'Baixo' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end gap-2">
        <button class="btn btn-sm btn-outline-primary">Exportar CSV</button>
        <button class="btn btn-sm btn-primary">Gerar PDF</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-header { background:#fff; border-bottom:1px solid rgba(0,0,0,.07); padding:1rem 1.25rem; }
.table th { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:#6c757d; }
.table td { vertical-align:middle; font-size:.875rem; }
</style>
