# Vuexy Design System - Educacross

**Skill para sistema de design Vuexy com paleta de cores, CSS custom properties e utility-first CSS philosophy**

---

## 📋 TL;DR

**Problema**: Manter consistência visual em 100+ componentes sem duplicação de estilos.

**Solução**: CSS custom properties (CSS variables) com paleta Vuexy + utility-first classes para espaçamento/layout.

**Cores principais**:
```css
--primary: #7367F0 (roxo Educacross)
--success: #28C76F (verde)
--warning: #FF9F43 (laranja)
--danger: #EA5455 (vermelho)
--info: #00CFE8 (ciano)
```

**Regra de ouro**: 🎨 **Estilos customizados em `<style scoped>`, utility classes apenas no template HTML**

---

## 🎨 Paleta de Cores Vuexy

### Cores Primárias

| Nome | Hex | RGB | Uso |
|---|---|---|---|
| Primary | `#7367F0` | `rgb(115, 103, 240)` | Ações principais, links, botões CTA |
| Secondary | `#82868B` | `rgb(130, 134, 139)` | Elementos secundários, texto muted |
| Success | `#28C76F` | `rgb(40, 199, 111)` | Sucesso, confirmações, badges |
| Danger | `#EA5455` | `rgb(234, 84, 85)` | Erros, exclusões, alertas críticos |
| Warning | `#FF9F43` | `rgb(255, 159, 67)` | Avisos, chamadas de atenção |
| Info | `#00CFE8` | `rgb(0, 207, 232)` | Informações, dicas, tooltips |
| Light | `#F8F9FA` | `rgb(248, 249, 250)` | Backgrounds claros |
| Dark | `#333333` | `rgb(51, 51, 51)` | Textos, elementos escuros |

### Cores de Atividades Educacross

| Atividade | Hex | RGB | Uso |
|---|---|---|---|
| Missão | `#7367F0` | `rgb(115, 103, 240)` | Missões educacionais (usa primary) |
| Olimpíada | `#00CFE8` | `rgb(0, 207, 232)` | Olimpíadas (usa info) |
| Avaliação | `#FF9F43` | `rgb(255, 159, 67)` | Avaliações (usa warning) |

### Variantes de Opacity

**Pattern**: `rgba(R, G, B, opacity)`

```css
/* Primary variants */
rgba(115, 103, 240, 1.0)    /* Sólido */
rgba(115, 103, 240, 0.24)   /* Selected bg */
rgba(115, 103, 240, 0.12)   /* Hover bg */
rgba(115, 103, 240, 0.08)   /* Light bg */

/* Text variants */
rgba(47, 43, 61, 0.9)       /* Text primary */
rgba(47, 43, 61, 0.6)       /* Text secondary */
rgba(47, 43, 61, 0.4)       /* Text disabled */
rgba(47, 43, 61, 0.06)      /* Hover overlay */
```

---

## 🔧 CSS Custom Properties

### Definição (src/style.css)

```css
:root {
  /* Primary colors */
  --primary: #7367F0;
  --primary-rgb: 115, 103, 240;
  
  --secondary: #82868B;
  --success: #28C76F;
  --danger: #EA5455;
  --warning: #FF9F43;
  --info: #00CFE8;
  
  --light: #F8F9FA;
  --dark: #333333;
  
  /* Text colors */
  --text-primary: rgba(47, 43, 61, 0.9);
  --text-secondary: rgba(47, 43, 61, 0.6);
  --text-disabled: rgba(47, 43, 61, 0.4);
  
  /* Background colors */
  --bg-light: #F8F9FA;
  --bg-hover: rgba(47, 43, 61, 0.06);
  --bg-selected: rgba(115, 103, 240, 0.24);
  --bg-overlay: rgba(47, 43, 61, 0.08);
  
  /* Activity colors */
  --activity-missao: #7367F0;
  --activity-olimpiada: #00CFE8;
  --activity-avaliacao: #FF9F43;
  
  /* Shadows */
  --shadow-sm: 0 2px 6px rgba(47, 43, 61, 0.1);
  --shadow-md: 0 4px 12px rgba(47, 43, 61, 0.15);
  --shadow-lg: 0 8px 24px rgba(47, 43, 61, 0.2);
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 500px; /* Círculos */
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Uso em Componentes

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Título</h3>
    </div>
    <div class="card-body">
      Conteúdo
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--bg-overlay);
}

.card-title {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
  color: var(--text-secondary);
}
</style>
```

---

## 🧩 Utility-First CSS Philosophy

### Quando Usar Utility Classes

✅ **USE utility classes para** (direto no template HTML):
- Layout e espaçamento (`mt-3`, `mb-4`, `p-2`)
- Alinhamento (`text-center`, `d-flex`, `justify-content-between`)
- Visibilidade responsiva (`d-none`, `d-md-block`)
- Display (`d-block`, `d-inline`, `d-flex`)

❌ **NÃO USE utility classes para** (use `<style scoped>`):
- Cores customizadas do projeto
- Borders e shadows específicos
- Transições e animações
- Estados hover/active/focus
- Tamanhos fixos de componentes (width, height)

### Exemplos Corretos

#### ✅ CORRETO - Layout com utilities

```vue
<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="text-primary">Título</h1>
    <button class="btn-custom">Ação</button>
  </div>
</template>

<style scoped>
.btn-custom {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background var(--transition-base);
}

.btn-custom:hover {
  background: #6258d4; /* Darker primary */
}
</style>
```

#### ❌ ERRADO - Cores no CSS

```vue
<style scoped>
/* ❌ NÃO FAZER: Definir utility classes no CSS */
.mt-3 {
  margin-top: 1rem;
}

.text-primary {
  color: #7367F0;
}
</style>
```

☝️ Utilities já existem globalmente em `src/style.css`.

---

## 🎭 Estados de Componentes

### Padrão de Estados Visuais

```vue
<template>
  <button
    class="button-component"
    :class="{
      'is-disabled': disabled,
      'is-loading': loading,
      'is-active': active,
      'is-primary': variant === 'primary',
      'is-success': variant === 'success'
    }"
  >
    <span v-if="loading">Carregando...</span>
    <span v-else><slot /></span>
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
  loading: Boolean,
  active: Boolean,
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'danger', 'warning'].includes(v)
  }
})
</script>

<style scoped>
.button-component {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

/* Estado padrão (primary) */
.button-component.is-primary {
  background: var(--primary);
  color: white;
}

.button-component.is-primary:hover:not(.is-disabled) {
  background: #6258d4;
  box-shadow: var(--shadow-md);
}

/* Variantes de cor */
.button-component.is-success {
  background: var(--success);
  color: white;
}

.button-component.is-success:hover:not(.is-disabled) {
  background: #24b263;
}

/* Estados especiais */
.button-component.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-component.is-loading {
  opacity: 0.8;
  cursor: wait;
}

.button-component.is-active {
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.3);
}
</style>
```

---

## 📐 Componentes Base Estilizados

### Card (Padrão Vuexy)

```vue
<template>
  <div class="vuexy-card">
    <div v-if="$slots.header" class="vuexy-card__header">
      <slot name="header" />
    </div>
    
    <div class="vuexy-card__body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="vuexy-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.vuexy-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: box-shadow var(--transition-base);
}

.vuexy-card:hover {
  box-shadow: var(--shadow-lg);
}

.vuexy-card__header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--bg-overlay);
  background: var(--bg-light);
}

.vuexy-card__body {
  padding: 1.5rem;
}

.vuexy-card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--bg-overlay);
  background: var(--bg-light);
}
</style>
```

### Badge (Padrão Vuexy)

```vue
<template>
  <span
    class="vuexy-badge"
    :class="`vuexy-badge--${variant}`"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'danger', 'warning', 'info'].includes(v)
  }
})
</script>

<style scoped>
.vuexy-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
}

.vuexy-badge--primary {
  background: rgba(115, 103, 240, 0.12);
  color: var(--primary);
}

.vuexy-badge--success {
  background: rgba(40, 199, 111, 0.12);
  color: var(--success);
}

.vuexy-badge--danger {
  background: rgba(234, 84, 85, 0.12);
  color: var(--danger);
}

.vuexy-badge--warning {
  background: rgba(255, 159, 67, 0.12);
  color: var(--warning);
}

.vuexy-badge--info {
  background: rgba(0, 207, 232, 0.12);
  color: var(--info);
}
</style>
```

---

## 🌈 Gradientes Vuexy

### Gradientes Predefinidos

```css
/* Primary gradient */
.gradient-primary {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
}

/* Success gradient */
.gradient-success {
  background: linear-gradient(135deg, #28C76F 0%, #48E68B 100%);
}

/* Warning gradient */
.gradient-warning {
  background: linear-gradient(135deg, #FF9F43 0%, #FFBC69 100%);
}

/* Info gradient */
.gradient-info {
  background: linear-gradient(135deg, #00CFE8 0%, #26E3F5 100%);
}
```

### Uso em Hero Sections

```vue
<template>
  <div class="hero-section">
    <h1 class="hero-title">Bem-vindo ao Educacross</h1>
    <p class="hero-subtitle">Plataforma educacional gamificada</p>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}
</style>
```

---

## 🎯 Dark Mode Support (Futuro)

### Preparar Componentes para Dark Mode

```css
/* Adicionar em :root */
:root {
  --bg-page: #F8F9FA;
  --bg-card: #FFFFFF;
  --text-primary: rgba(47, 43, 61, 0.9);
  --border-color: rgba(47, 43, 61, 0.08);
}

/* Dark mode (quando implementado) */
[data-theme="dark"] {
  --bg-page: #1A1D2E;
  --bg-card: #252838;
  --text-primary: rgba(255, 255, 255, 0.9);
  --border-color: rgba(255, 255, 255, 0.08);
}
```

Componentes já usando custom properties adaptarão automaticamente!

---

## 🔍 Inspeção e Debug

### Script de Validação de Cores

```javascript
// Executar no console do navegador
const usedColors = new Set();

document.querySelectorAll('*').forEach(el => {
  const computedStyle = getComputedStyle(el);
  ['color', 'background-color', 'border-color'].forEach(prop => {
    const value = computedStyle[prop];
    if (value && value !== '' && value !== 'rgba(0, 0, 0, 0)') {
      usedColors.add(value);
    }
  });
});

console.log('Cores usadas na página:', Array.from(usedColors).sort());
```

### Gerar Palete Visual

```bash
# Executar script (a criar)
node scripts/generate-color-palette.js
# Output: assets/vuexy-palette.png
```

---

## 📚 Recursos e Referências

- [Paleta Vuexy Completa](../references/vuexy-colors.md) - Todas as cores com exemplos
- [Gerador de Paleta](../scripts/generate-color-palette.js) - Script Node.js
- [Vuexy Palette Preview](../assets/vuexy-palette.png) - Preview visual
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Utility-First CSS](https://tailwindcss.com/docs/utility-first) - Filosofia Tailwind aplicada

---

## ❓ FAQ

### P: Posso criar minhas próprias custom properties?
**R**: ✅ Sim! Mas prefira adicionar em `:root` no `src/style.css` centralmente:
```css
:root {
  --my-custom-spacing: 2.5rem;
  --my-custom-color: #FF6B9D;
}
```

### P: Como usar RGB separado para opacity dinâmica?
**R**: Use variável `-rgb`:
```css
:root {
  --primary: #7367F0;
  --primary-rgb: 115, 103, 240; /* Separado */
}

/* Uso com opacity dinâmica */
.element {
  background: rgba(var(--primary-rgb), 0.24);
}

.element:hover {
  background: rgba(var(--primary-rgb), 0.32);
}
```

### P: Posso sobrescrever utilities do Bootstrap?
**R**: ❌ Não. Utilities são globais. Se precisar customizar, crie classe com nome diferente:
```css
/* ❌ ERRADO */
.mt-3 { margin-top: 2rem; } /* Sobrescreve global */

/* ✅ CORRETO */
.mt-custom { margin-top: 2rem; }
```

### P: Como escolher entre utility class e CSS scoped?
**R**: Regra prática:
- **Utility**: Layout, espaçamento, display (reutilizável em qualquer lugar)
- **Scoped**: Cores customizadas, hover effects, animações (específico do componente)

### P: Cores de atividades devem ser hard-coded?
**R**: ❌ Não. Sempre usar custom properties:
```vue
<!-- ❌ ERRADO -->
<div :style="{ color: '#7367F0' }">Missão</div>

<!-- ✅ CORRETO -->
<div class="activity-badge activity-badge--missao">Missão</div>

<style scoped>
.activity-badge--missao {
  color: var(--activity-missao);
}
</style>
```

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
