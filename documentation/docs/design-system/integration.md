---
sidebar_position: 1
title: Integração Design System
---

# Integração do Design System Vuexy

Guia completo para usar o Design System Vuexy nos protótipos Vue 3.

## 🎨 Sobre o Design System

O **Design System Vuexy** é um sistema de componentes **HTML-based e framework-agnostic**:

- **Tecnologia**: HTML puro + CSS + JavaScript vanilla
- **Compatibilidade**: Funciona com Vue, React, Angular, ou qualquer framework
- **Documentação**: Storybook interativo
- **URL**: https://fabioeducacross.github.io/DesignSystem-Vuexy

### Vantagens

✅ **Framework Agnostic**: Não depende de Vue ou React  
✅ **HTML Puro**: Fácil de copiar e adaptar  
✅ **Consistência Visual**: Componentes padronizados  
✅ **Acessível**: Seguindo boas práticas de a11y  
✅ **Documentado**: Todos os componentes no Storybook  

## 🎯 Paleta de Cores

### Cores Principais

```css
/* Defina no seu componente Vue ou use as variáveis CSS */
:root {
  --primary: #7367F0;    /* Roxo - Ações principais */
  --success: #28C76F;    /* Verde - Sucesso, Iniciante */
  --warning: #FF9F43;    /* Laranja - Alerta, Intermediário */
  --danger: #EA5455;     /* Vermelho - Erro, Avançado */
  --info: #00CFE8;       /* Ciano - Informações */
}
```

### Uso nos Componentes

**Classes CSS diretas:**

```vue
<button class="btn btn-primary">Ação Principal</button>
<span class="badge badge-success">Iniciante</span>
<div class="alert alert-warning">Atenção!</div>
```

**Badges de Nível (Pattern Padrão):**

```javascript
const getBadgeClass = (nivel) => {
  const classes = {
    'Iniciante': 'badge-success',
    'Intermediário': 'badge-warning',
    'Avançado': 'badge-danger'
  }
  return classes[nivel] || 'badge-primary'
}
```

```vue
<span :class="`badge ${getBadgeClass(jornada.nivel)}`">
  {{ jornada.nivel }}
</span>
```

## 📦 Componentes Disponíveis

### Navegação

#### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-light bg-white">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="/logo.svg" alt="Logo">
    </a>
    <div class="navbar-nav">
      <a class="nav-link" href="#home">Home</a>
      <a class="nav-link" href="#about">Sobre</a>
    </div>
  </div>
</nav>
```

#### Breadcrumb

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Jornadas</a></li>
    <li class="breadcrumb-item active">Detalhes</li>
  </ol>
</nav>
```

### Conteúdo

#### Cards

**Card Básico:**

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{ titulo }}</h4>
    </div>
    <div class="card-body">
      <p class="card-text">{{ conteudo }}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">Ver Mais</button>
    </div>
  </div>
</template>
```

**Card com Imagem:**

```vue
<div class="card">
  <img :src="imagemUrl" class="card-img-top" alt="Imagem">
  <div class="card-body">
    <h5 class="card-title">{{ titulo }}</h5>
    <p class="card-text">{{ descricao }}</p>
    <a href="#" class="btn btn-primary">Ir para detalhes</a>
  </div>
</div>
```

**Card com Hover Effect (Pattern Vuexy):**

```vue
<template>
  <div class="card hover-shadow">
    <!-- Conteúdo do card -->
  </div>
</template>

<style scoped>
.card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.card.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(115, 103, 240, 0.3);
}
</style>
```

#### Badges

```html
<!-- Status -->
<span class="badge badge-primary">Ativo</span>
<span class="badge badge-success">Aprovado</span>
<span class="badge badge-warning">Pendente</span>
<span class="badge badge-danger">Inativo</span>
<span class="badge badge-info">Info</span>

<!-- Pill badges -->
<span class="badge badge-pill badge-primary">99+</span>

<!-- Badges em buttons -->
<button class="btn btn-primary">
  Notificações <span class="badge badge-light">4</span>
</button>
```

### Formulários

#### Input Groups

```vue
<div class="form-group">
  <label for="nome">Nome</label>
  <input
    type="text"
    id="nome"
    v-model="nome"
    class="form-control"
    placeholder="Digite seu nome"
  >
</div>
```

#### Select

```vue
<div class="form-group">
  <label for="nivel">Nível</label>
  <select id="nivel" v-model="nivelSelecionado" class="form-control">
    <option value="">Selecione...</option>
    <option value="iniciante">Iniciante</option>
    <option value="intermediario">Intermediário</option>
    <option value="avancado">Avançado</option>
  </select>
</div>
```

#### Checkbox e Radio

```vue
<!-- Checkbox -->
<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="check1" v-model="aceito">
  <label class="custom-control-label" for="check1">
    Aceito os termos
  </label>
</div>

<!-- Radio -->
<div class="custom-control custom-radio">
  <input type="radio" class="custom-control-input" id="radio1" value="opcao1" v-model="opcao">
  <label class="custom-control-label" for="radio1">
    Opção 1
  </label>
</div>
```

### Buttons

```html
<!-- Variantes -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-info">Info</button>

<!-- Outline -->
<button class="btn btn-outline-primary">Primary Outline</button>

<!-- Tamanhos -->
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- Block -->
<button class="btn btn-primary btn-block">Full Width</button>
```

### Tabelas

```vue
<table class="table table-hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.nome }}</td>
      <td>
        <span :class="`badge badge-${item.statusColor}`">
          {{ item.status }}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary">Editar</button>
      </td>
    </tr>
  </tbody>
</table>
```

### Alerts

```html
<div class="alert alert-primary" role="alert">
  Uma mensagem informativa
</div>

<div class="alert alert-success" role="alert">
  Ação realizada com sucesso!
</div>

<div class="alert alert-warning" role="alert">
  Atenção: Isso pode causar problemas
</div>

<div class="alert alert-danger" role="alert">
  Erro: Algo deu errado
</div>
```

### Modais

```vue
<template>
  <!-- Botão trigger -->
  <button @click="showModal = true" class="btn btn-primary">
    Abrir Modal
  </button>

  <!-- Modal -->
  <div v-if="showModal" class="modal fade show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Título do Modal</h5>
          <button @click="showModal = false" class="close">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Conteúdo do modal aqui...</p>
        </div>
        <div class="modal-footer">
          <button @click="showModal = false" class="btn btn-secondary">
            Fechar
          </button>
          <button class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Backdrop -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
</script>
```

## 🔧 Integrando no Vue 3

### 1. Consultar o Storybook

Acesse: https://fabioeducacross.github.io/DesignSystem-Vuexy

Navegue até o componente desejado.

### 2. Copiar HTML

Copie o código HTML do componente no Storybook.

### 3. Adaptar para Vue

Cole no `<template>` do seu componente Vue e adapte:

**Antes (HTML puro):**
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título Fixo</h5>
  </div>
</div>
```

**Depois (Vue 3):**
```vue
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const titulo = ref('Título Dinâmico')
</script>
```

### 4. Adicionar Interatividade

Use `v-for`, `v-if`, `@click`, `v-model` para tornar dinâmico:

```vue
<template>
  <div class="row">
    <div v-for="jornada in jornadas" :key="jornada.id" class="col-md-4">
      <div class="card hover-shadow" @click="verDetalhes(jornada.id)">
        <div class="card-body">
          <h5 class="card-title">{{ jornada.titulo }}</h5>
          <p class="card-text">{{ jornada.descricao }}</p>
          <span :class="`badge badge-${getBadgeVariant(jornada.nivel)}`">
            {{ jornada.nivel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jornadas = ref([
  { id: 1, titulo: 'Jornada 1', descricao: 'Desc 1', nivel: 'Iniciante' }
])

const getBadgeVariant = (nivel) => {
  const map = { 'Iniciante': 'success', 'Intermediário': 'warning', 'Avançado': 'danger' }
  return map[nivel] || 'primary'
}

const verDetalhes = (id) => {
  router.push({ name: 'JorneyDetail', params: { id } })
}
</script>

<style scoped>
.hover-shadow {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(115, 103, 240, 0.3);
}
</style>
```

## 🎓 Exemplos Práticos

### Exemplo 1: Lista de Cards

**Objetivo**: Criar grid de cards 3 colunas com jornadas

```vue
<template>
  <div class="container my-5">
    <h2 class="mb-4">Jornadas Educacionais</h2>
    
    <div class="row">
      <div v-for="jornada in jornadas" :key="jornada.id" class="col-md-4 mb-4">
        <div class="card h-100 hover-shadow">
          <div class="card-body">
            <h5 class="card-title">{{ jornada.titulo }}</h5>
            <p class="card-text text-muted">{{ jornada.descricao }}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span :class="`badge badge-${getBadgeClass(jornada.nivel)}`">
                {{ jornada.nivel }}
              </span>
              <small class="text-muted">
                <i class="bi bi-clock"></i> {{ jornada.duracao }}
              </small>
            </div>
          </div>
          
          <div class="card-footer bg-transparent">
            <button @click="verDetalhes(jornada.id)" class="btn btn-primary btn-block">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import journeysData from '@/data/journeys.json'

const router = useRouter()
const jornadas = ref(journeysData)

const getBadgeClass = (nivel) => {
  const map = { 
    'Iniciante': 'success', 
    'Intermediário': 'warning', 
    'Avançado': 'danger' 
  }
  return map[nivel] || 'primary'
}

const verDetalhes = (id) => {
  router.push({ name: 'JourneyDetail', params: { id } })
}
</script>

<style scoped>
.hover-shadow {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(115, 103, 240, 0.3);
}

.card-title {
  color: var(--primary);
}
</style>
```

### Exemplo 2: Hero Section com Gradiente

```vue
<template>
  <section class="hero-gradient text-white text-center py-5">
    <div class="container">
      <h1 class="display-4 fw-bold mb-3">
        Bem-vindo ao Ambiente de Prototipação
      </h1>
      <p class="lead mb-4">
        Documentação e protótipos de jornadas educacionais
      </p>
      <div>
        <button class="btn btn-light btn-lg me-2" @click="explorar">
          Explorar Jornadas
        </button>
        <button class="btn btn-outline-light btn-lg" @click="verDS">
          Design System
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const explorar = () => {
  router.push({ name: 'JourneyList' })
}

const verDS = () => {
  window.open('https://fabioeducacross.github.io/DesignSystem-Vuexy', '_blank')
}
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  min-height: 400px;
  display: flex;
  align-items: center;
}
</style>
```

## 🔗 Recursos

- [Storybook do DS](https://fabioeducacross.github.io/DesignSystem-Vuexy)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vue 3 Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## 📝 Boas Práticas

✅ **DO**:
- Use classes CSS do Vuexy diretamente
- Mantenha consistência com a paleta de cores
- Adicione hover effects nos cards
- Use badges para status e categorias
- Torne componentes responsivos

❌ **DON'T**:
- Não sobrescreva estilos base do DS sem necessidade
- Não misture cores fora da paleta Vuexy
- Não ignore responsividade mobile
- Não hardcode valores que podem vir de props

## 🆘 Suporte

Dúvidas sobre o Design System?

- Consulte o [Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy)
- Veja [exemplos de protótipos](/docs/prototypes)
- Acesse as [Copilot instructions](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/blob/main/.github/copilot-instructions.md)
