<script setup>
import { ref } from 'vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import ClassSelector   from '@/components/calendar/ClassSelector.vue'
import AppBreadcrumb   from '@/components/AppBreadcrumb.vue'

const classes = ref([
  { id: 1, name: 'G2 ads - Tarde',   serie: 'G2', students: 7,  teachers: ['Paulo Alves', 'Pedro Dias', 'Lucas Martins', 'Maria Costa', 'João Souza'] },
  { id: 2, name: 'G2 AG2 - Manhã',   serie: 'G2', students: 1,  teachers: ['Amanda Lima', 'Leonardo Ferreira', 'Quênia Rocha'] },
  { id: 3, name: 'G2 S@s - Manhã',   serie: 'G2', students: 0,  teachers: ['Amanda Lima', 'Fabio Alves'] },
  { id: 4, name: 'G2 TES - Manhã',   serie: 'G2', students: 14, teachers: ['Marcos Teixeira', 'Alice Andrade', 'Roberto Gomes', 'Ana Silva', 'Carlos Mota'] },
  { id: 5, name: 'G2 TST - Manhã',   serie: 'G2', students: 0,  teachers: ['Amanda Lima', 'Fabio Alves'] },
  { id: 6, name: 'G2 xxx - Manhã',   serie: 'G2', students: 0,  teachers: ['Amanda Lima', 'Thiago Guedes', 'Fabio Alves'] },
  { id: 7, name: 'G2 zxc - Tarde',   serie: 'G2', students: 0,  teachers: ['Amanda Lima', 'Fabio Alves'] },
  { id: 8, name: 'G3 TES - Tarde',   serie: 'G3', students: 2,  teachers: ['Marcos Teixeira', 'Pedro Esteves', 'Diego Moura'] },
  { id: 9, name: 'G4 TES - Manhã',   serie: 'G4', students: 1,  teachers: ['Marcos Teixeira', 'Daniel Costa', 'Amanda Lima'] },
  { id: 10, name: 'G5 G5 - Manhã',   serie: 'G5', students: 5,  teachers: ['Pedro Esteves', 'Amanda Lima', 'Bruno Oliveira'] },
])

const tableColumns = [
  { key: 'name',     label: 'Turma',           sortable: true  },
  { key: 'serie',    label: 'Ano Escolar',      sortable: true  },
  { key: 'students', label: 'Alunos na Turma',  sortable: true  },
  { key: 'teachers', label: 'Professores',      sortable: false },
  { key: 'actions',  label: 'Ações',            sortable: false },
]

const AVATAR_COLORS = ['#28C76F', '#00CFE8', '#7367F0', '#FF9F43', '#EA5455', '#1E9E8E', '#9E95F5']
const avatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length]

const initials = (name) =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()

const MAX_AVATARS = 3
</script>

<template>
  <div>
    <div class="report-top-stack">
      <ClassSelector school-name="Colégio Nova Jornada" :show-school-year="false" />
      <AppBreadcrumb />
    </div>

    <ListTableSelect
      :data-table="classes"
      :table-columns="tableColumns"
      :total-data="classes.length"
      :show-select-all="false"
      search-placeholder="Pesquisar por turma"
      empty-text="Nenhuma turma encontrada."
    >
      <!-- Turma -->
      <template #cell(name)="{ item }">
        <span class="fw-semibold">{{ item.name }}</span>
      </template>

      <!-- Ano Escolar -->
      <template #cell(serie)="{ item }">
        <span class="badge rounded-pill serie-badge">{{ item.serie }}</span>
      </template>

      <!-- Alunos na Turma -->
      <template #cell(students)="{ item }">
        <span>{{ item.students }}</span>
      </template>

      <!-- Professores -->
      <template #cell(teachers)="{ item }">
        <div class="d-flex align-items-center gap-1">
          <span
            v-for="(t, i) in item.teachers.slice(0, MAX_AVATARS)"
            :key="t"
            class="teacher-avatar"
            :style="{ background: avatarColor(i) }"
            :title="t"
          >{{ initials(t) }}</span>
          <span
            v-if="item.teachers.length > MAX_AVATARS"
            class="teacher-overflow"
          >+{{ item.teachers.length - MAX_AVATARS }}</span>
        </div>
      </template>

      <!-- Ações -->
      <template #cell(actions)="{ item }">
        <span class="flag-action" :title="item.name">🇧🇷</span>
      </template>
    </ListTableSelect>
  </div>
</template>

<style scoped>
/* Ano Escolar badge */
.serie-badge {
  background: rgba(0, 207, 232, 0.15);
  color: #00CFE8;
  font-weight: 600;
}

/* Professor avatar */
.teacher-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  flex-shrink: 0;
}

/* Overflow badge "+N" */
.teacher-overflow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(115,103,240,.15);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  flex-shrink: 0;
}

/* Ações — flag */
.flag-action {
  font-size: 20px;
  cursor: default;
}

/* Tipografia da tabela — 14px, igual à produção */
:deep(.b-table td),
:deep(.b-table th) {
  font-size: 0.875rem;
}
:deep(.b-table tbody td) {
  font-size: 0.875rem;
  vertical-align: middle;
}
</style>
