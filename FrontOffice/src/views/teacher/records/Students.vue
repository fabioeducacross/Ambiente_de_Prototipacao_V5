<script setup>
import { ref } from 'vue'

const search = ref('')
const selectedStudents = ref([])

const students = ref([
  { id: 1, name: 'Ana Carolina Lima',      turma: '1º Ano A', status: 'Ativo',    lastAccess: '24/02/2026' },
  { id: 2, name: 'Bruno Henrique Costa',   turma: '1º Ano B', status: 'Ativo',    lastAccess: '23/02/2026' },
  { id: 3, name: 'Carla Souza Neves',      turma: '2º Ano A', status: 'Inativo',  lastAccess: '10/01/2026' },
  { id: 4, name: 'Diego Pereira Santos',   turma: '1º Ano A', status: 'Ativo',    lastAccess: '25/02/2026' },
  { id: 5, name: 'Emanuelly Rodrigues',    turma: '3º Ano A', status: 'Ativo',    lastAccess: '25/02/2026' },
  { id: 6, name: 'Felipe Moreira Alves',   turma: '4º Ano B', status: 'Pendente', lastAccess: '—' },
])

const filtered = () =>
  students.value.filter(s =>
    s.name.toLowerCase().includes(search.value.toLowerCase()) ||
    s.turma.toLowerCase().includes(search.value.toLowerCase())
  )

const statusVariant = (status) => ({
  'Ativo':    { bg: 'rgba(40,199,111,.15)', color: '#28C76F' },
  'Inativo':  { bg: 'rgba(234,84,85,.15)',  color: '#EA5455' },
  'Pendente': { bg: 'rgba(255,159,67,.15)', color: '#FF9F43' },
}[status] || { bg: '#eee', color: '#666' })

function toggleAll(e) {
  selectedStudents.value = e.target.checked ? students.value.map(s => s.id) : []
}
</script>

<template>
  <section>
    <!-- Action Bar -->
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="d-flex justify-content-end align-items-center gap-2">
          <button class="btn btn-outline-primary">
            <span class="material-symbols-outlined align-middle" style="font-size:18px">upload_file</span>
            Importar Cadastros
          </button>
          <button class="btn btn-primary">
            <span class="material-symbols-outlined align-middle" style="font-size:18px">person_add</span>
            Novo Aluno
          </button>
          <div class="dropdown">
            <button
              class="btn btn-outline-primary dropdown-toggle"
              :disabled="selectedStudents.length < 2"
              data-bs-toggle="dropdown"
            >
              Ações em Lote
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size:18px">print</span>
                  Gerar Cartas de Acesso
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size:18px">credit_card</span>
                  Gerar Carteirinhas
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size:18px">workspace_premium</span>
                  Gerar Certificados
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size:18px">feed</span>
                  Gerar Boletim
                  <span class="badge rounded-pill" style="background:rgba(115,103,240,.15);color:#7367F0;font-size:10px">Beta</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card">
      <div class="card-header d-flex align-items-center gap-3">
        <div class="input-group" style="max-width: 320px">
          <span class="input-group-text bg-transparent border-end-0">
            <span class="material-symbols-outlined" style="font-size:18px;color:#6c757d">search</span>
          </span>
          <input v-model="search" type="text" class="form-control border-start-0" placeholder="Pesquisar aluno" />
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th style="width:40px">
                  <input type="checkbox" class="form-check-input" @change="toggleAll" />
                </th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Último Acesso</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filtered()" :key="item.id">
                <td>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :value="item.id"
                    v-model="selectedStudents"
                  />
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <span
                      class="badge rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style="width:32px;height:32px;background:#7367F0;color:#fff;font-size:12px"
                    >{{ item.name.split(' ').slice(0,2).map(w=>w[0]).join('') }}</span>
                    <span class="fw-semibold">{{ item.name }}</span>
                  </div>
                </td>
                <td class="text-muted">{{ item.turma }}</td>
                <td class="text-muted">{{ item.lastAccess }}</td>
                <td>
                  <span
                    class="badge rounded-pill"
                    :style="`background:${statusVariant(item.status).bg};color:${statusVariant(item.status).color}`"
                  >{{ item.status }}</span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <span class="material-symbols-outlined text-primary" style="font-size:18px;cursor:pointer" title="Editar">edit</span>
                    <span class="material-symbols-outlined text-muted" style="font-size:18px;cursor:pointer" title="Ver perfil">person</span>
                  </div>
                </td>
              </tr>
              <tr v-if="filtered().length === 0">
                <td colspan="6" class="text-center py-4 text-muted">Nenhum aluno encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-header {
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,.07);
  padding: 1rem 1.25rem;
}
.table th {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #6c757d;
  white-space: nowrap;
}
.table td {
  vertical-align: middle;
  font-size: 0.875rem;
}
</style>
