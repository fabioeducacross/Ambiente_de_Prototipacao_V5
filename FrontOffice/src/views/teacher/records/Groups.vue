<script setup>
import { ref } from 'vue'

const search = ref('')

const groups = ref([
  { id: 1, name: 'Grupo Avançado',     alunos: 8,  turma: '3º Ano A' },
  { id: 2, name: 'Reforço Leitura',    alunos: 5,  turma: '1º Ano A' },
  { id: 3, name: 'Matemática Extra',   alunos: 6,  turma: '2º Ano A' },
  { id: 4, name: 'Desafio Escrita',    alunos: 10, turma: '4º Ano B' },
  { id: 5, name: 'Grupo Iniciantes',   alunos: 7,  turma: '1º Ano B' },
])

const filtered = () =>
  groups.value.filter(g =>
    g.name.toLowerCase().includes(search.value.toLowerCase())
  )
</script>

<template>
  <section>
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary">
            <span class="material-symbols-outlined align-middle" style="font-size:18px">group_add</span>
            Novo Grupo
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header d-flex align-items-center gap-3">
        <div class="input-group" style="max-width: 320px">
          <span class="input-group-text bg-transparent border-end-0">
            <span class="material-symbols-outlined" style="font-size:18px;color:#6c757d">search</span>
          </span>
          <input v-model="search" type="text" class="form-control border-start-0" placeholder="Pesquisar grupo" />
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Nome do Grupo</th>
                <th>Alunos</th>
                <th>Turma</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filtered()" :key="item.id">
                <td class="fw-semibold">{{ item.name }}</td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <span class="material-symbols-outlined text-primary" style="font-size:16px">group</span>
                    <span class="fw-semibold text-primary">{{ item.alunos }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge rounded-pill" style="background:rgba(115,103,240,.15);color:#7367F0">
                    {{ item.turma }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <span class="material-symbols-outlined text-primary" style="font-size:18px;cursor:pointer" title="Editar">edit</span>
                    <span class="material-symbols-outlined text-danger" style="font-size:18px;cursor:pointer" title="Excluir">delete</span>
                  </div>
                </td>
              </tr>
              <tr v-if="filtered().length === 0">
                <td colspan="4" class="text-center py-4 text-muted">Nenhum grupo encontrado.</td>
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
}
.table td { vertical-align: middle; font-size: 0.875rem; }
</style>
