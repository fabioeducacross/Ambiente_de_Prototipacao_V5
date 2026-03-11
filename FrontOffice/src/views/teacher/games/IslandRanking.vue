<script setup>
import { ref, computed } from 'vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import SelectSubject from '@/components/base/SelectSubject.vue'

const selectedSubject = ref({ id: 1, name: 'Matemática' })

const currentYear = new Date().getFullYear()

const pageTitle    = computed(() => `Ilhas da ${selectedSubject.value?.name || 'Matemática'}`)
const rankingTitle = computed(() => `Ranking de conquistas - Ilhas ${currentYear}`)

const ranking = [
  { nome: 'Ana Carolina Souza',  classe: '1º Ano A', escola: 'Colégio Nova Jornada', geral: 1, ouro: 3, prata: 5, bronze: 2, moedas: 480 },
  { nome: 'Bruno Lima Santos',   classe: '1º Ano A', escola: 'Colégio Nova Jornada', geral: 2, ouro: 2, prata: 4, bronze: 3, moedas: 320 },
  { nome: 'Érika Nascimento',    classe: '1º Ano B', escola: 'Colégio Nova Jornada', geral: 3, ouro: 1, prata: 6, bronze: 4, moedas: 290 },
  { nome: 'Gabriela Martins',    classe: '1º Ano A', escola: 'Colégio Nova Jornada', geral: 4, ouro: 1, prata: 3, bronze: 5, moedas: 210 },
  { nome: 'Felipe de Oliveira',  classe: '1º Ano C', escola: 'Colégio Nova Jornada', geral: 5, ouro: 0, prata: 4, bronze: 6, moedas: 185 },
]
</script>

<template>
  <section>
    <!-- ClassSelector -->
    <ClassSelector class="mb-3" :show-school-year="false" />

    <!-- Título da página -->
    <h4 class="fw-bold mb-4">{{ pageTitle }}</h4>

    <!-- Filtro -->
    <div class="card mb-4">
      <div class="card-body">
        <SelectSubject v-model="selectedSubject" />
      </div>
    </div>

    <!-- Tabela de ranking -->
    <div class="card">
      <div class="card-body pb-0">
        <h6 class="fw-semibold mb-0 ranking-title">{{ rankingTitle }}</h6>
      </div>

      <div class="table-responsive">
        <table class="table ranking-table mb-0">
          <thead>
            <!-- Grupos de colunas -->
            <tr class="group-row">
              <th colspan="4" class="group-header text-center">RANKING</th>
              <th colspan="4" class="group-header text-center insignias-header">INSÍGNIAS</th>
            </tr>
            <!-- Cabeçalhos individuais -->
            <tr>
              <th>NOME</th>
              <th>CLASSE</th>
              <th>ESCOLA</th>
              <th>GERAL</th>
              <th>
                <span class="insignia-icon ouro"><i class="bi bi-hexagon-fill"></i></span>
                OURO
              </th>
              <th>
                <span class="insignia-icon prata"><i class="bi bi-hexagon-fill"></i></span>
                PRATA
              </th>
              <th>
                <span class="insignia-icon bronze"><i class="bi bi-hexagon-fill"></i></span>
                BRONZE
              </th>
              <th>
                <span class="insignia-icon moedas"><i class="bi bi-coin"></i></span>
                MOEDAS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in ranking" :key="r.geral">
              <td class="fw-semibold">{{ r.nome }}</td>
              <td>{{ r.classe }}</td>
              <td>{{ r.escola }}</td>
              <td>
                <span class="geral-badge">{{ r.geral }}</span>
              </td>
              <td>
                <span v-if="r.ouro" class="count-badge ouro-badge">{{ r.ouro }}</span>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <span v-if="r.prata" class="count-badge prata-badge">{{ r.prata }}</span>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <span v-if="r.bronze" class="count-badge bronze-badge">{{ r.bronze }}</span>
                <span v-else class="text-muted">—</span>
              </td>
              <td class="fw-semibold moedas-val">{{ r.moedas }}</td>
            </tr>
            <tr v-if="!ranking.length">
              <td colspan="8" class="text-center py-4 empty-state">
                Nenhum dado encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      <div class="card-footer d-flex justify-content-center py-3">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled">
            <span class="page-link"><i class="bi bi-chevron-left"></i></span>
          </li>
          <li class="page-item active">
            <span class="page-link">1</span>
          </li>
          <li class="page-item disabled">
            <span class="page-link"><i class="bi bi-chevron-right"></i></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Título ── */
.ranking-title {
  padding: 1rem 1.25rem;
  font-size: .9375rem;
  color: rgba(47,43,61,.9);
}

/* ── Grupos de colunas ── */
.group-row .group-header {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .6px;
  color: #6c757d;
  background: #f8f8f8;
  border-bottom: 1px solid rgba(0,0,0,.07);
  padding: .5rem 1rem;
}
.group-row .insignias-header {
  border-left: 2px solid rgba(0,0,0,.07);
}

/* ── Cabeçalhos de coluna ── */
.ranking-table thead tr:last-child th {
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: #6c757d;
  padding: .6rem 1rem;
  white-space: nowrap;
}
.ranking-table thead tr:last-child th:nth-child(5) {
  border-left: 2px solid rgba(0,0,0,.07);
}

/* ── Ícones de insígnia ── */
.insignia-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
  margin-right: .25rem;
  vertical-align: middle;
}
.ouro   { color: #F5A623; }
.prata  { color: #9E9E9E; }
.bronze { color: #CD7F32; }
.moedas { color: #F5A623; }

/* ── Linhas de dados ── */
.ranking-table tbody td {
  font-size: .875rem;
  vertical-align: middle;
  padding: .65rem 1rem;
}
.ranking-table tbody td:nth-child(5) {
  border-left: 2px solid rgba(0,0,0,.07);
}

/* ── Badge posição GERAL ── */
.geral-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(115,103,240,.15);
  color: var(--primary);
  font-weight: 700;
  font-size: .8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ── Badges de contagem ── */
.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  border-radius: 13px;
  font-size: .75rem;
  font-weight: 700;
  padding: 0 6px;
}
.ouro-badge   { background: rgba(245,166,35,.15); color: #F5A623; }
.prata-badge  { background: rgba(158,158,158,.15); color: #9E9E9E; }
.bronze-badge { background: rgba(205,127,50,.15); color: #CD7F32; }

.moedas-val { color: #F5A623; }

/* ── Empty state ── */
.empty-state { color: rgba(47,43,61,.4); font-size: .875rem; }

/* ── Card footer ── */
.card-footer {
  background: #fff;
  border-top: 1px solid rgba(0,0,0,.07);
}

/* ── Pagination ── */
.page-item.active .page-link {
  background: var(--primary);
  border-color: var(--primary);
}
.page-link { color: var(--primary); }
</style>
