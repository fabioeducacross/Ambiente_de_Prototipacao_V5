<script setup>
import { ref } from 'vue'

const turma = ref('')

const stats = [
  { icon: 'menu_book',         label: 'Livros lidos',     value: '142', color: '#7367F0', bg: 'rgba(115,103,240,.1)' },
  { icon: 'group',             label: 'Alunos ativos',    value: '68',  color: '#28C76F', bg: 'rgba(40,199,111,.1)'  },
  { icon: 'schedule',          label: 'Minutos de leitura', value: '4.320', color: '#FF9F43', bg: 'rgba(255,159,67,.1)' },
  { icon: 'workspace_premium', label: 'Conquistas dadas', value: '93',  color: '#00CFE8', bg: 'rgba(0,207,232,.1)'   },
]

const students = [
  { id: 1, name: 'Ana Carolina',  turma: '3º Ano A', book: 'A Bruxinha e o Robô',      progress: 85, status: 'Lendo' },
  { id: 2, name: 'Bruno Lima',    turma: '3º Ano B', book: 'O Pequeno Príncipe',        progress: 100, status: 'Concluído' },
  { id: 3, name: 'Camila Rocha',  turma: '4º Ano A', book: 'Em Busca do Tesouro',      progress: 52, status: 'Lendo' },
  { id: 4, name: 'Diego F.',      turma: '4º Ano A', book: '—',                          progress: 0,  status: 'Inativo' },
  { id: 5, name: 'Érika N.',      turma: '3º Ano A', book: 'O Homem que Calculava',     progress: 30, status: 'Lendo' },
  { id: 6, name: 'Felipe O.',     turma: '5º Ano B', book: 'Diário de um Banana',       progress: 75, status: 'Lendo' },
]

const barColor     = (s) => s === 'Concluído' ? '#28C76F' : s === 'Inativo' ? '#EA5455' : '#7367F0'
const statusStyle  = (s) => ({
  Lendo:     { bg: 'rgba(115,103,240,.15)', tx: '#7367F0' },
  Concluído: { bg: 'rgba(40,199,111,.15)',  tx: '#28C76F' },
  Inativo:   { bg: 'rgba(234,84,85,.15)',   tx: '#EA5455' },
}[s] || { bg: '#eee', tx: '#888' })

const initials = (n) => n.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()
const filtered  = () => turma.value ? students.filter(s => s.turma === turma.value) : students
</script>

<template>
  <section>
    <!-- Stats -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3" v-for="s in stats" :key="s.label">
        <div class="card">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="icon-box" :style="`background:${s.bg}`">
              <span class="material-symbols-outlined" :style="`color:${s.color};font-size:24px`">{{ s.icon }}</span>
            </div>
            <div>
              <div class="fw-bold fs-5">{{ s.value }}</div>
              <small class="text-muted">{{ s.label }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="row g-2 align-items-center">
          <div class="col-auto">
            <select v-model="turma" class="form-select form-select-sm">
              <option value="">Todas as turmas</option>
              <option>3º Ano A</option><option>3º Ano B</option>
              <option>4º Ano A</option><option>5º Ano B</option>
            </select>
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
                <th>Aluno</th>
                <th>Turma</th>
                <th>Livro Atual</th>
                <th>Progresso</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in filtered()" :key="s.id">
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="text-white fw-bold"
                      style="width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.65rem;background:linear-gradient(135deg,#7367F0,#9E95F5)">
                      {{ initials(s.name) }}
                    </div>
                    <span class="fw-semibold small">{{ s.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge rounded-pill"
                    style="background:rgba(115,103,240,.15);color:#7367F0">{{ s.turma }}</span>
                </td>
                <td class="small text-muted">{{ s.book }}</td>
                <td style="min-width:140px">
                  <div v-if="s.progress > 0" class="d-flex align-items-center gap-2">
                    <div class="progress flex-grow-1" style="height:6px;border-radius:3px">
                      <div class="progress-bar" role="progressbar"
                        :style="`width:${s.progress}%;background:${barColor(s.status)}`"></div>
                    </div>
                    <small class="fw-semibold" :style="`color:${barColor(s.status)}`">{{ s.progress }}%</small>
                  </div>
                  <span v-else class="text-muted small">—</span>
                </td>
                <td>
                  <span class="badge rounded-pill"
                    :style="`background:${statusStyle(s.status).bg};color:${statusStyle(s.status).tx}`">
                    {{ s.status }}
                  </span>
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
.table th { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:#6c757d; }
.table td { vertical-align:middle; font-size:.875rem; }
.icon-box { width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center; }
</style>
