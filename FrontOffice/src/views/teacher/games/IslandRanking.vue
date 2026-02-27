<script setup>
import { ref } from 'vue'

const turma = ref('')
const turmas = ['3º Ano A', '3º Ano B', '4º Ano A', '5º Ano A']

const top3 = [
  { place: 2, name: 'Bruno Lima', turma: '3º Ano A', pts: 4820, icon: '🥈' },
  { place: 1, name: 'Ana Carolina', turma: '4º Ano A', pts: 5640, icon: '🥇' },
  { place: 3, name: 'Érika Nascimento', turma: '3º Ano B', pts: 4210, icon: '🥉' },
]

const ranking = [
  { pos: 1,  name: 'Ana Carolina Souza',    turma: '4º Ano A', pontos: 5640, conquistas: 12 },
  { pos: 2,  name: 'Bruno Lima Santos',     turma: '3º Ano A', pontos: 4820, conquistas: 9  },
  { pos: 3,  name: 'Érika Nascimento',      turma: '3º Ano B', pontos: 4210, conquistas: 8  },
  { pos: 4,  name: 'Gabriela Martins',      turma: '4º Ano A', pontos: 3980, conquistas: 7  },
  { pos: 5,  name: 'Felipe de Oliveira',    turma: '5º Ano A', pontos: 3670, conquistas: 6  },
  { pos: 6,  name: 'Camila Rocha Alves',    turma: '3º Ano A', pontos: 3210, conquistas: 5  },
  { pos: 7,  name: 'Hugo Costa',            turma: '3º Ano B', pontos: 2890, conquistas: 4  },
  { pos: 8,  name: 'Diego Fernandes',       turma: '4º Ano A', pontos: 2400, conquistas: 4  },
]

const posBadge = (p) => p === 1 ? '#FF9F43' : p === 2 ? '#6c757d' : p === 3 ? '#CD7F32' : 'rgba(115,103,240,.15)'
const posTxt   = (p) => p <= 3 ? '#fff' : '#7367F0'

const initials = (n) => n.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()
</script>

<template>
  <section>
    <!-- Filter -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-4">
            <label class="form-label small fw-semibold">Filtrar por turma</label>
            <select v-model="turma" class="form-select">
              <option value="">Todas as turmas</option>
              <option v-for="t in turmas" :key="t">{{ t }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Podium -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0 fw-bold">Top 3 — Ilha da Aventura</h6></div>
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-end gap-4 py-2">
          <div v-for="p in top3" :key="p.place" class="text-center">
            <div class="podium-avatar mx-auto mb-2"
              :class="`place-${p.place}`">
              {{ initials(p.name) }}
            </div>
            <div class="fw-bold small">{{ p.icon }}</div>
            <div class="fw-semibold small">{{ p.name }}</div>
            <div class="text-muted" style="font-size:.75rem">{{ p.turma }}</div>
            <div class="fw-bold" style="color:#7367F0">{{ p.pts.toLocaleString('pt-BR') }} pts</div>
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
                <th>Pos.</th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Pontos</th>
                <th>Conquistas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in ranking" :key="r.pos">
                <td>
                  <span class="badge rounded-circle fw-bold"
                    :style="`background:${posBadge(r.pos)};color:${posTxt(r.pos)};width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center`">
                    {{ r.pos }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="text-white fw-bold"
                      style="width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.7rem;background:linear-gradient(135deg,#7367F0,#9E95F5)">
                      {{ initials(r.name) }}
                    </div>
                    <span class="fw-semibold small">{{ r.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge rounded-pill"
                    style="background:rgba(115,103,240,.15);color:#7367F0">{{ r.turma }}</span>
                </td>
                <td class="fw-bold" style="color:#7367F0">{{ r.pontos.toLocaleString('pt-BR') }}</td>
                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="n in Math.min(r.conquistas, 5)" :key="n"
                      class="badge rounded-pill"
                      style="background:rgba(255,159,67,.15);color:#FF9F43;font-size:.65rem">⭐</span>
                    <span v-if="r.conquistas > 5" class="text-muted small">+{{ r.conquistas - 5 }}</span>
                  </div>
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

.podium-avatar {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: .85rem; color: #fff;
}
.place-1 { background: linear-gradient(135deg,#FF9F43,#FFD700); width:68px!important; height:68px!important; font-size:1rem!important; }
.place-2 { background: linear-gradient(135deg,#7367F0,#9E95F5); }
.place-3 { background: linear-gradient(135deg,#CD7F32,#e8a870); }
</style>
