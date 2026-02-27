<script setup>
import { ref } from 'vue'

const open = ref({ videos: true, docs: false, guides: false })
const toggle = (key) => { open.value[key] = !open.value[key] }

const sections = [
  {
    key: 'videos',
    label: 'Videoaulas e Tutoriais',
    icon: 'play_circle',
    items: [
      { type: 'video', title: 'Como criar uma missão personalizada',   duration: '4:32' },
      { type: 'video', title: 'Configurando ilhas de jogos',           duration: '3:18' },
      { type: 'video', title: 'Gerando relatórios de habilidades',     duration: '5:47' },
      { type: 'video', title: 'Tour pela Expedição de Leitura',        duration: '6:10' },
    ],
  },
  {
    key: 'docs',
    label: 'Documentos e Apostilas',
    icon: 'description',
    items: [
      { type: 'pdf', title: 'Guia do Professor — Educacross 2025',    size: '2.4 MB' },
      { type: 'pdf', title: 'Apostila de Uso da Plataforma',          size: '1.1 MB' },
      { type: 'doc', title: 'Plano de Aula Integrado (Word)',         size: '380 KB' },
      { type: 'pdf', title: 'Catálogo de Habilidades BNCC',          size: '3.2 MB' },
    ],
  },
  {
    key: 'guides',
    label: 'Guias Rápidos',
    icon: 'tips_and_updates',
    items: [
      { type: 'link', title: 'Primeiros passos: missões',            tag: 'Missões' },
      { type: 'link', title: 'Configuração inicial de turmas',       tag: 'Turmas' },
      { type: 'link', title: 'Avaliações diagnósticas — passo a passo', tag: 'Avaliações' },
      { type: 'link', title: 'Dicas de gamificação em sala',         tag: 'Jogos' },
    ],
  },
]

const typeIcon = (t) => ({ video: 'play_circle', pdf: 'picture_as_pdf', doc: 'article', link: 'link' }[t] || 'attach_file')
const typeColor = (t) => ({ video: '#7367F0', pdf: '#EA5455', doc: '#00CFE8', link: '#FF9F43' }[t] || '#888')
</script>

<template>
  <section>
    <div v-for="sec in sections" :key="sec.key" class="card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center"
        style="cursor:pointer" @click="toggle(sec.key)">
        <div class="d-flex align-items-center gap-2">
          <span class="material-symbols-outlined text-primary" style="font-size:20px">{{ sec.icon }}</span>
          <span class="fw-semibold">{{ sec.label }}</span>
          <span class="badge rounded-pill" style="background:rgba(115,103,240,.12);color:#7367F0">{{ sec.items.length }}</span>
        </div>
        <span class="material-symbols-outlined text-muted"
          style="font-size:20px;transition:transform .2s"
          :style="open[sec.key] ? 'transform:rotate(180deg)' : ''">
          expand_more
        </span>
      </div>
      <div v-show="open[sec.key]" class="card-body">
        <div class="row g-3">
          <div class="col-md-6 col-xl-3" v-for="item in sec.items" :key="item.title">
            <div class="material-card d-flex flex-column h-100 p-3 rounded-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="material-symbols-outlined" :style="`color:${typeColor(item.type)};font-size:22px`">
                  {{ typeIcon(item.type) }}
                </span>
                <span v-if="item.duration" class="badge rounded-pill"
                  style="background:rgba(115,103,240,.1);color:#7367F0;font-size:.7rem">{{ item.duration }}</span>
                <span v-if="item.size" class="badge rounded-pill"
                  style="background:rgba(234,84,85,.1);color:#EA5455;font-size:.7rem">{{ item.size }}</span>
                <span v-if="item.tag" class="badge rounded-pill"
                  style="background:rgba(255,159,67,.1);color:#FF9F43;font-size:.7rem">{{ item.tag }}</span>
              </div>
              <p class="fw-semibold small mb-2 flex-grow-1">{{ item.title }}</p>
              <button class="btn btn-sm" style="background:rgba(115,103,240,.08);color:#7367F0;border:none">
                {{ item.type === 'video' ? 'Assistir' : item.type === 'link' ? 'Ler guia' : 'Baixar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-header { background:#fff; border-bottom:1px solid rgba(0,0,0,.07); padding:1rem 1.25rem; }
.material-card { border: 1px solid rgba(0,0,0,.07); transition: box-shadow .2s; }
.material-card:hover { box-shadow: 0 3px 12px rgba(115,103,240,.14); }
</style>
