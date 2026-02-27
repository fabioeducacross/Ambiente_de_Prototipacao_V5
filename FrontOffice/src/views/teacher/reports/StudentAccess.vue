<script setup>
import { ref } from 'vue'

const turma = ref('')
const turmas = ['1º Ano A', '1º Ano B', '2º Ano A', '3º Ano A', '4º Ano A', '5º Ano B']

const students = [
  { id: 1, name: 'Ana Carolina Souza',   turma: '3º Ano A', lastAccess: '13/06/2025 14:32', total: 42, status: 'Ativo' },
  { id: 2, name: 'Bruno Lima Santos',    turma: '3º Ano A', lastAccess: '12/06/2025 09:10', total: 38, status: 'Ativo' },
  { id: 3, name: 'Camila Rocha Alves',   turma: '4º Ano A', lastAccess: '10/06/2025 16:45', total: 21, status: 'Ativo' },
  { id: 4, name: 'Diego Fernandes',      turma: '2º Ano A', lastAccess: '05/06/2025 11:20', total: 8,  status: 'Inativo' },
  { id: 5, name: 'Érika Nascimento',     turma: '3º Ano A', lastAccess: '13/06/2025 10:05', total: 55, status: 'Ativo' },
  { id: 6, name: 'Felipe de Oliveira',   turma: '5º Ano B', lastAccess: '—',                total: 0,  status: 'Pendente' },
  { id: 7, name: 'Gabriela Martins',     turma: '4º Ano A', lastAccess: '11/06/2025 08:50', total: 17, status: 'Ativo' },
  { id: 8, name: 'Hugo Costa',           turma: '2º Ano A', lastAccess: '01/06/2025 15:30', total: 5,  status: 'Inativo' },
]

const statusStyle = (s) => ({
  Ativo:    { bg: 'rgba(40,199,111,.15)', tx: '#28C76F' },
  Inativo:  { bg: 'rgba(234,84,85,.15)',  tx: '#EA5455' },
  Pendente: { bg: 'rgba(255,159,67,.15)', tx: '#FF9F43' },
}[s] || { bg: '#eee', tx: '#888' })

const initials = (n) => n.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()

const filtered = () => turma.value ? students.filter(s => s.turma === turma.value) : students
</script>

<template>
  <section>
    <div class="card mb-4">
      <div class="card-header">
        <h6 class="mb-0 fw-bold">Filtrar por turma</h6>
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
          <div class="col-auto">
            <button class="btn btn-outline-secondary" @click="turma=''">Limpar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Último Acesso</th>
                <th>Total de Acessos</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in filtered()" :key="s.id">
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="avatar-circle text-white fw-bold"
                      style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.7rem;background:linear-gradient(135deg,#7367F0,#9E95F5)">
                      {{ initials(s.name) }}
                    </div>
                    <span class="fw-semibold small">{{ s.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge rounded-pill"
                    style="background:rgba(115,103,240,.15);color:#7367F0">{{ s.turma }}</span>
                </td>
                <td class="small text-muted">{{ s.lastAccess }}</td>
                <td>
                  <span class="fw-bold"
                    :style="s.total === 0 ? 'color:#EA5455' : s.total < 10 ? 'color:#FF9F43' : 'color:#28C76F'">
                    {{ s.total }}
                  </span>
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
.card-header { background:#fff; border-bottom:1px solid rgba(0,0,0,.07); padding:1rem 1.25rem; }
.table th { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:#6c757d; }
.table td { vertical-align:middle; font-size:.875rem; }
</style>
