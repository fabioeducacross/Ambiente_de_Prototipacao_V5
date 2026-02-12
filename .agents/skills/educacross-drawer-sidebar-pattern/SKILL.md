# Educacross Drawer/Sidebar Pattern

**Skill para implementar drawers e sidebars reutilizáveis com overlay e transições**

---

## 📋 TL;DR

**Problema**: Componentes de overlay (drawers, sidebars, modais) implementados de forma diferente em cada arquivo.

**Solução**: Pattern padronizado com:
- **Overlay/Backdrop** com `v-if` e transition fade
- **Drawer** com slot slide-in (left/right)
- **Props** controlados: `isOpen`, `position`, `width`
- **Emits** previsíveis: `@close`, `@submit`
- **Comportamento**: ESC key, click outside, scroll lock

**Pattern base**:
```vue
<template>
  <!-- Overlay com fade transition -->
  <Transition name="fade">
    <div v-if="isOpen" class="drawer-overlay" @click="emit('close')"></div>
  </Transition>

  <!-- Drawer com slide transition -->
  <Transition name="slide-right">
    <aside v-if="isOpen" class="drawer">
      <slot />
    </aside>
  </Transition>
</template>

<style scoped>
/* Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(47, 43, 61, 0.4);
  z-index: 1040;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  right: 0; /* ou left: 0 para sidebar */
  bottom: 0;
  width: 400px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(47, 43, 61, 0.24);
  z-index: 1050;
  overflow-y: auto;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>
```

**Regra de ouro**: 🔐 **Sempre trave scroll do body quando drawer estiver aberto**

---

## 🎯 Quando Usar Drawer vs Sidebar vs Modal

### ✅ USE Drawer quando:
- Formulário que precisa contexto da página (ex: criar evento no calendário)
- Edição rápida sem redirecionar para página separada
- Detalhes ou ações secundárias sobre item da lista
- Preview de conteúdo com quick actions
- Filtros avançados que ocupam espaço vertical

**Características**:
- Abre de **direita** (ou esquerda em RTL)
- Largura: 400-600px (responsive: 90% mobile)
- Overlay escurece página de fundo
- Fecha ao clicar fora ou ESC

### ✅ USE Sidebar quando:
- Navegação persistente em app layout
- Menu de contexto que permanece aberto
- Filtros que coexistem com conteúdo principal
- Tree view ou estrutura hierárquica de navegação

**Características**:
- **Sempre visível** ou colapsável (sem overlay)
- Largura fixa: 250-300px (collapsed: 60-80px)
- Push layout (empurra conteúdo) OU overlay
- Não fecha ao clicar fora (só pelo botão toggle)

### ✅ USE Modal quando:
- Ação crítica que requer atenção exclusiva (confirmar delete, pagamento)
- Workflow multi-step que bloqueia UI temporariamente
- Login, signup flows
- Mensagens de erro críticas

**Características**:
- **Centro da tela**
- Largura: 300-800px dependendo do conteúdo
- Overlay bloqueia toda interação
- Fecha com botão específico (não click outside, geralmente)

---

## 🔧 Pattern 1: EventDrawer (Existente)

### Propósito
Drawer para criar/editar eventos no calendário. Formulário completo com validação, overlay, slide-in transition.

### Estrutura do Componente

```
FrontOffice/src/components/EventDrawer.vue (602 linhas)
├── Template
│   ├── Overlay (fade transition)
│   ├── Drawer (slide transition)
│   │   ├── Header (título + botão close)
│   │   ├── Form (formulário de evento)
│   │   └── Footer (botões submit/cancel/delete)
├── Script
│   ├── Props: isOpen, eventData
│   ├── Emits: close, save
│   ├── formData (ref) - estado local do formulário
│   ├── errors (ref) - erros de validação
│   ├── validate() - validação de regras
│   └── handleSubmit() - submit com validação
└── Style (scoped)
    ├── .drawer-overlay
    ├── .event-drawer
    ├── .drawer-header
    ├── .drawer-form
    ├── .form-actions
    └── Transitions (fade, slide)
```

### Código Completo Simplificado

```vue
<template>
  <!-- Overlay/Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="drawer-overlay"
      @click="closeDrawer"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <aside v-if="isOpen" class="event-drawer">
      <!-- Header -->
      <header class="drawer-header">
        <h2>{{ eventData ? 'Editar evento' : 'Adicionar evento' }}</h2>
        <button
          class="btn-close"
          @click="closeDrawer"
          aria-label="Fechar"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="drawer-form">
        <!-- Título -->
        <div class="form-group">
          <label for="titulo" class="form-label">Título</label>
          <input
            id="titulo"
            v-model="formData.titulo"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.titulo }"
          />
          <span v-if="errors.titulo" class="error-message">
            {{ errors.titulo }}
          </span>
        </div>

        <!-- Atividade (select) -->
        <div class="form-group">
          <label for="atividade" class="form-label">Atividade</label>
          <select
            id="atividade"
            v-model="formData.atividade"
            class="form-control form-select"
            :class="{ 'is-invalid': errors.atividade }"
          >
            <option value="">Selecione</option>
            <option value="missao">Missão</option>
            <option value="olimpiada">Olimpíada</option>
            <option value="avaliacao">Avaliação</option>
          </select>
          <span v-if="errors.atividade" class="error-message">
            {{ errors.atividade }}
          </span>
        </div>

        <!-- Turmas (multiple select) -->
        <div class="form-group">
          <label for="turmas" class="form-label">Turmas</label>
          <select
            id="turmas"
            v-model="formData.turmas"
            class="form-control form-select"
            multiple
            :class="{ 'is-invalid': errors.turmas }"
          >
            <option value="5a-manha">5° A - Manhã</option>
            <option value="5b-manha">5° B - Manhã</option>
            <option value="6a-manha">6° A - Manhã</option>
          </select>
          <span v-if="errors.turmas" class="error-message">
            {{ errors.turmas }}
          </span>
        </div>

        <!-- Data de início -->
        <div class="form-group">
          <label for="dataInicio" class="form-label">Data de início</label>
          <input
            id="dataInicio"
            v-model="formData.dataInicio"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.dataInicio }"
          />
          <span v-if="errors.dataInicio" class="error-message">
            {{ errors.dataInicio }}
          </span>
        </div>

        <!-- Data de término -->
        <div class="form-group">
          <label for="dataTermino" class="form-label">Data de término</label>
          <input
            id="dataTermino"
            v-model="formData.dataTermino"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.dataTermino }"
          />
          <span v-if="errors.dataTermino" class="error-message">
            {{ errors.dataTermino }}
          </span>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description" class="form-label">Descrição</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-control form-textarea"
            rows="4"
            :class="{ 'is-invalid': errors.description }"
          ></textarea>
          <span v-if="errors.description" class="error-message">
            {{ errors.description }}
          </span>
        </div>

        <!-- Buttons -->
        <div class="form-actions">
          <div class="form-actions-left">
            <button type="submit" class="btn btn-primary">
              {{ eventData ? 'Atualizar' : 'Adicionar' }}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="closeDrawer"
            >
              Cancelar
            </button>
          </div>
          <button
            v-if="eventData"
            type="button"
            class="btn btn-outline-danger"
            @click="handleDelete"
          >
            <i class="bi bi-trash"></i>
            Deletar
          </button>
        </div>
      </form>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  eventData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Estado do formulário
const formData = ref({
  titulo: '',
  atividade: '',
  turmas: [],
  dataInicio: '',
  dataTermino: '',
  description: ''
})

const errors = ref({})

// Watch: resetar ou popular form quando abre
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.eventData) {
      // Modo edição: popular dados
      formData.value = { ...props.eventData }
    } else {
      // Modo criação: resetar
      formData.value = {
        titulo: '',
        atividade: '',
        turmas: [],
        dataInicio: '',
        dataTermino: '',
        description: ''
      }
    }
    errors.value = {}
    
    // Travar scroll do body
    document.body.style.overflow = 'hidden'
  } else {
    // Destravar scroll
    document.body.style.overflow = ''
  }
})

// Validação
const validate = () => {
  const newErrors = {}

  if (!formData.value.titulo || formData.value.titulo.trim().length < 3) {
    newErrors.titulo = 'Título deve ter pelo menos 3 caracteres'
  }

  if (!formData.value.atividade) {
    newErrors.atividade = 'Selecione um tipo de atividade'
  }

  if (!formData.value.turmas || formData.value.turmas.length === 0) {
    newErrors.turmas = 'Selecione pelo menos uma turma'
  }

  if (!formData.value.dataInicio) {
    newErrors.dataInicio = 'Data de início é obrigatória'
  }

  if (!formData.value.dataTermino) {
    newErrors.dataTermino = 'Data de término é obrigatória'
  }

  if (formData.value.dataInicio && formData.value.dataTermino) {
    const inicio = new Date(formData.value.dataInicio)
    const termino = new Date(formData.value.dataTermino)

    if (termino < inicio) {
      newErrors.dataTermino = 'Data de término deve ser posterior à data de início'
    }
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Submit
const handleSubmit = () => {
  if (!validate()) return

  emit('save', { ...formData.value })
  closeDrawer()
}

// Delete
const handleDelete = () => {
  if (confirm('Tem certeza que deseja deletar este evento?')) {
    emit('delete', props.eventData.id)
    closeDrawer()
  }
}

// Close
const closeDrawer = () => {
  emit('close')
}
</script>

<style scoped>
/* Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(47, 43, 61, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1040;
  cursor: pointer;
}

/* Drawer */
.event-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 450px;
  max-width: 90vw;
  background: #fff;
  box-shadow: -4px 0 24px rgba(47, 43, 61, 0.24);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
  flex-shrink: 0;
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2F2B3D;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #82868B;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #2F2B3D;
}

/* Form */
.drawer-form {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2F2B3D;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #7367F0;
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.12);
}

.form-control.is-invalid {
  border-color: #EA5455;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #EA5455;
}

/* Actions */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-top: 1px solid #E0E0E0;
  background: #F8F8F8;
  flex-shrink: 0;
}

.form-actions-left {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #7367F0;
  color: #fff;
}

.btn-primary:hover {
  background: #5E50EE;
  box-shadow: 0 2px 6px rgba(115, 103, 240, 0.24);
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid #7367F0;
  color: #7367F0;
}

.btn-outline-primary:hover {
  background: rgba(115, 103, 240, 0.08);
}

.btn-outline-danger {
  background: transparent;
  border: 1px solid #EA5455;
  color: #EA5455;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline-danger:hover {
  background: rgba(234, 84, 85, 0.08);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .event-drawer {
    width: 100%;
    max-width: 100vw;
  }
}
</style>
```

### Uso no Componente Pai

```vue
<script setup>
import { ref } from 'vue'
import EventDrawer from '@/components/EventDrawer.vue'

const isDrawerOpen = ref(false)
const selectedEvent = ref(null)

const openDrawer = (event = null) => {
  selectedEvent.value = event
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  selectedEvent.value = null
}

const handleSave = (eventData) => {
  if (selectedEvent.value) {
    // Atualizar evento existente
    console.log('Atualizar:', eventData)
  } else {
    // Criar novo evento
    console.log('Criar:', eventData)
  }
}

const handleDelete = (eventId) => {
  console.log('Deletar:', eventId)
}
</script>

<template>
  <div>
    <!-- Botão para abrir drawer -->
    <button @click="openDrawer()">Adicionar Evento</button>

    <!-- Lista de eventos -->
    <div v-for="event in events" :key="event.id">
      {{ event.titulo }}
      <button @click="openDrawer(event)">Editar</button>
    </div>

    <!-- Drawer -->
    <EventDrawer
      :is-open="isDrawerOpen"
      :event-data="selectedEvent"
      @close="closeDrawer"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>
```

---

## 🔧 Pattern 2: Sidebar (Navegação Persistente)

### Propósito
Sidebar para navegação que pode colapsar, sem overlay (parte do layout).

### Código

```vue
<template>
  <aside class="app-sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Logo/Branding -->
    <div class="sidebar-header">
      <img v-if="!isCollapsed" src="@/assets/logo.png" alt="Logo" />
      <img v-else src="@/assets/logo-icon.png" alt="Icon" />
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :title="isCollapsed ? item.label : ''"
      >
        <i :class="`bi ${item.icon}`"></i>
        <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Toggle button -->
    <button class="sidebar-toggle" @click="$emit('toggle')">
      <i :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
    </button>
  </aside>
</template>

<script setup>
defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'bi-grid' },
  { path: '/calendar', label: 'Calendário', icon: 'bi-calendar3' },
  { path: '/students', label: 'Alunos', icon: 'bi-people' },
  { path: '/settings', label: 'Configurações', icon: 'bi-gear' }
]
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1030;
}

.app-sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-header img {
  max-width: 100%;
  height: auto;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #82868B;
  text-decoration: none;
  transition: all 0.2s ease;
}

.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem 1rem;
}

.nav-item:hover {
  background: rgba(115, 103, 240, 0.08);
  color: #7367F0;
}

.nav-item.router-link-active {
  background: rgba(115, 103, 240, 0.12);
  color: #7367F0;
  border-right: 3px solid #7367F0;
}

.nav-item i {
  font-size: 1.25rem;
}

.collapsed .nav-label {
  display: none;
}

.sidebar-toggle {
  padding: 1rem;
  background: none;
  border: none;
  border-top: 1px solid #E0E0E0;
  cursor: pointer;
  color: #82868B;
  transition: color 0.2s ease;
}

.sidebar-toggle:hover {
  color: #7367F0;
}
</style>
```

---

## ✅ Checklist de Drawer/Sidebar

Ao criar um novo drawer ou sidebar:

- [ ] Props `isOpen` (drawer) ou `isCollapsed` (sidebar) controlado pelo pai
- [ ] Emit `@close` para fechar drawer
- [ ] Overlay com `v-if` e transition `fade`
- [ ] Drawer com transition `slide` (left ou right)
- [ ] **Body scroll lock** quando drawer aberto
- [ ] **ESC key** fecha drawer (via `@keydown.esc`)
- [ ] **Click outside** fecha drawer (overlay com `@click`)
- [ ] Focus trap (primeiro campo focado ao abrir)
- [ ] **Acessibilidade**: `aria-label`, `role="dialog"`, `aria-modal="true"`
- [ ] Z-index: overlay 1040, drawer 1050 (acima de navbar)
- [ ] Responsive: drawer 90-100% width em mobile
- [ ] Loading state para submit buttons
- [ ] Validação inline de formulário (se aplicável)

---

## 🚫 Anti-Patterns

### ❌ Não travar scroll do body

```vue
<!-- ❌ ERRADO -->
<Transition name="slide">
  <aside v-if="isOpen" class="drawer">
    <slot />
  </aside>
</Transition>

<!-- Problema: usuário pode scrollar página de fundo, causando confusão -->
```

**Solução**: Travar scroll no `watch` do `isOpen`:

```javascript
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
```

### ❌ Esquecer de limpar estado

```vue
<!-- ❌ ERRADO: formulário mantém dados da última edição -->
<script setup>
const formData = ref({ titulo: '' })
// Sem reset ao fechar
</script>
```

**Solução**: Resetar state quando fecha:

```javascript
watch(() => props.isOpen, (newVal) => {
  if (newVal && !props.eventData) {
    // Modo criação: resetar
    formData.value = getInitialFormData()
  } else if (newVal && props.eventData) {
    // Modo edição: popular
    formData.value = { ...props.eventData }
  }
})
```

### ❌ Múltiplos z-index conflitantes

```css
/* ❌ ERRADO */
.drawer-overlay { z-index: 9999; }
.drawer { z-index: 10000; }
.navbar { z-index: 1000; }
.modal { z-index: 99999; }
```

**Solução**: Escala padronizada (Bootstrap/Vuexy):

```css
/* ✅ CORRETO */
/* navbar: 1030 */
/* sidebar: 1030 */
/* drawer overlay: 1040 */
/* drawer: 1050 */
/* modal overlay: 1060 */
/* modal: 1070 */
/* tooltip: 1080 */
```

---

## 📚 Recursos

- [Template Drawer](../references/drawer-template.vue)
- [Template Sidebar](../references/sidebar-template.vue)
- [Script Gerador](../scripts/generate-drawer.js)
- [Vue Transition Docs](https://vuejs.org/guide/built-ins/transition.html)
- [Focus Trap](https://github.com/focus-trap/focus-trap)

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
