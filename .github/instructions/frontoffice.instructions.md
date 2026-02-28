---
name: FrontOffice Vue Rules
description: Regras de desenvolvimento Vue 3 para o FrontOffice do Educacross
applyTo: "FrontOffice/src/**/*.vue,FrontOffice/src/**/*.js,FrontOffice/src/**/*.ts"
---

# Regras de desenvolvimento — Educacross FrontOffice

Ao editar qualquer arquivo do FrontOffice, siga SEMPRE estas regras.

## Stack obrigatória

- **Vue 3** com `<script setup>` — nunca Options API nem `defineComponent`
- **Bootstrap 5.3** + **bootstrap-vue-next 0.43** (via npm, não CDN)
- **Bootstrap Icons**: classes `bi bi-*` para ícones inline
- **MaterialIcon**: `<MaterialIcon name="..." />` para Material Symbols

## Cores — CSS vars em `FrontOffice/src/style.css`

```css
var(--primary)   /* #7367F0 */   var(--success)  /* #28C76F */
var(--warning)   /* #FF9F43 */   var(--danger)   /* #EA5455 */
var(--info)      /* #00CFE8 */
```

❌ Nunca use hex direto. Use sempre `var(--primary)`, `var(--success)` etc.  
❌ Nunca use `rgba(var(...), 1)` — esse formato é da produção (Vue 2), não do FrontOffice.

## Estrutura de componente

```vue
<script setup>
import { ref, computed } from 'vue'
// composables, outros imports
</script>
<template><!-- Bootstrap 5 HTML --></template>
<style scoped>/* sempre scoped */</style>
```

## Antes de criar qualquer componente novo

1. Verificar `FrontOffice/src/components/` — pode já existir
2. Consultar a skill `educacross-design-system` (`SKILL.md` para fluxo rápido ou `SKILL.full.md` para inventário completo)
3. Se não existir no FrontOffice → buscar no MCP `design-system` (fluxo de reaproveitamento da skill)
4. Só criar do zero se não houver equivalente

## Dados

- Sem chamadas API — usar apenas JSON local ou dados mockados no componente
- Mock data: array/objeto no `<script setup>` ou arquivo em `FrontOffice/src/data/`

## Responsividade

- Usar classes `.col-md-*` do Bootstrap 5
- Media queries em `@media (max-width: 768px)` para mobile

## Anti-patterns — nunca fazer

| ❌ Errado | ✅ Correto |
|---|---|
| `import Vue from 'vue'` | `import { ref } from 'vue'` |
| `export default { ... }` (Options API) | `<script setup>` |
| `color: #7367F0` | `color: var(--primary)` |
| `<style>` sem scoped | `<style scoped>` |
| `<link rel="stylesheet" href="bootstrap.cdn">` | Bootstrap já importado via `main.js` |

## Para detalhes completos do Design System

Use a skill `educacross-design-system` digitando `/educacross-design-system` no chat.  
`SKILL.md` = versão core (rápida, operacional).  
`SKILL.full.md` = versão completa (referência detalhada para casos complexos).  
Ela contém: paleta completa, tipografia, todos os componentes, rotas, padrões Vue 3.
