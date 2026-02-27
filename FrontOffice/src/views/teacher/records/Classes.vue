<script setup>
import { ref } from 'vue'

const search = ref('')

const classes = ref([
  { id: 1, name: '1º Ano A', serie: '1º Ano', students: 28, teachers: ['Ana S.', 'Carlos M.'] },
  { id: 2, name: '1º Ano B', serie: '1º Ano', students: 25, teachers: ['Ana S.'] },
  { id: 3, name: '2º Ano A', serie: '2º Ano', students: 30, teachers: ['Beatriz O.', 'João P.'] },
  { id: 4, name: '3º Ano A', serie: '3º Ano', students: 27, teachers: ['Carlos M.'] },
  { id: 5, name: '4º Ano B', serie: '4º Ano', students: 22, teachers: ['Beatriz O.'] },
])

const filtered = () =>
  classes.value.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
</script>

<template>
  <section>
    <!-- Top Action Bar -->
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary">
            <span class="material-symbols-outlined align-middle" style="font-size:18px">add</span>
            Nova Turma
          </button>
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
          <input
            v-model="search"
            type="text"
            class="form-control border-start-0"
            placeholder="Pesquisar por turma"
          />
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Turma</th>
                <th>Ano escolar</th>
                <th>Alunos na turma</th>
                <th>Professores</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filtered()" :key="item.id">
                <td>
                  <span class="fw-semibold">{{ item.name }}</span>
                </td>
                <td>
                  <span class="badge rounded-pill" style="background:rgba(115,103,240,0.15);color:#7367F0">
                    {{ item.serie }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <span class="material-symbols-outlined text-primary" style="font-size:16px">group</span>
                    <span class="fw-semibold text-primary">{{ item.students }}</span>
                  </div>
                </td>
                <td>
                  <div class="d-flex gap-1 flex-wrap">
                    <span
                      v-for="t in item.teachers"
                      :key="t"
                      class="badge rounded-circle d-flex align-items-center justify-content-center"
                      style="width:30px;height:30px;background:#7367F0;color:#fff;font-size:11px"
                      :title="t"
                    >{{ t.split(' ').map(w => w[0]).join('') }}</span>
                  </div>
                </td>
                <td>
                  <span class="material-symbols-outlined text-primary cursor-pointer" style="font-size:18px;cursor:pointer" title="Editar">edit</span>
                </td>
              </tr>
              <tr v-if="filtered().length === 0">
                <td colspan="5" class="text-center py-4 text-muted">Nenhuma turma encontrada.</td>
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
