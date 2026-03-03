---
sidebar_position: 3
title: Componentes de Aviso
description: Padrões de faixas informativas, alertas e notices usados no FrontOffice
---

# Componentes de Aviso

Existem dois padrões de aviso no FrontOffice, cada um para um contexto específico. **Use o padrão correto para cada situação** — não misturar nem criar variações ad-hoc.

---

## 1. `drawer-hint` — Aviso contextual em drawer

**Quando usar:** orientação ou estado informativo dentro de um painel lateral (drawer). Compacto, sem título, texto único.

**Arquivos de referência:**
- `FrontOffice/src/modules/sistema-de-ensino/components/TrilhasAZDrawer.vue`
- `FrontOffice/src/views/teacher/reports/MissionReport.vue`
- `FrontOffice/src/views/teacher/evaluations/FluEsc.vue`

### Variantes

| Variante | Classe | Cor | Quando usar |
|----------|--------|-----|-------------|
| **Primário** | `.drawer-hint` | `--ec-primary` (#6E63E8) | Ação obrigatória, instrução de primeiro uso |
| **Neutro / Info** | `.drawer-hint drawer-hint--neutral` | `--info` (#00CFE8) | Estado informativo, reenvio, aviso sem urgência |

### Uso (texto simples)

```vue
<div class="drawer-hint drawer-hint--neutral">
  <span class="material-symbols-outlined drawer-hint-icon">info</span>
  Reenvio da missão: selecione os alunos para enviar novamente.
</div>
```

### Uso (título + descrição)

```vue
<div class="drawer-hint drawer-hint--neutral">
  <span class="material-symbols-outlined drawer-hint-icon">info</span>
  <div>
    <p class="hint-title">Alguns tipos de mídia ainda não têm dados</p>
    <p class="hint-desc">O rendimento é calculado somente após os alunos interagirem com atividades desse tipo.</p>
  </div>
</div>
```

### CSS base

Copiar para o componente que usar (scoped):

```css
.drawer-hint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--ec-primary) 8%, transparent);
  color: var(--ec-primary);
  font-size: 12px;
  font-weight: 600;
}

.drawer-hint-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.drawer-hint--neutral {
  background: color-mix(in srgb, var(--info) 8%, transparent);
  color: var(--info);
}
```

### Regras

- Sempre começar com ícone `info` (Material Symbols) como primeiro elemento
- Texto `font-weight: 600`, tamanho `12px` — não usar parágrafo solto
- **Não usar Bootstrap `.alert`** para este contexto
- Não usar hex inline — apenas `var(--token)`

---

## 2. `BAlert` (bootstrap-vue-next) — Alerta de página

**Quando usar:** avisos de limite, bloqueios ou estados críticos em nível de **página** (fora de drawers). Suporta múltiplos layouts e variantes semânticas.

**Componente de referência:** `FrontOffice/src/components/missions/GuidesLimitAlert.vue`

**Porta de produção:** `components/missions/GuidesLimitAlert.vue` (BootstrapVue 2 → bootstrap-vue-next)

### Variantes semânticas

| Variante | Cor | Quando usar |
|----------|-----|-------------|
| `primary` | azul-roxo | Informativo — contagem normal, orientação |
| `danger` | vermelho | Atenção ou esgotamento — limite próximo ou atingido |

### Exemplo de uso

```vue
<script setup>
import { BAlert } from 'bootstrap-vue-next'
</script>

<template>
  <BAlert variant="primary" :model-value="true">
    <div class="alert-body">
      <!-- conteúdo -->
    </div>
  </BAlert>
</template>
```

### Regras

- Usar sempre `bootstrap-vue-next` (`BAlert`) — não escrever `<div class="alert">` manualmente em páginas
- `:model-value="true"` para manter visível (sem fechar)
- Conteúdo sempre dentro de `.alert-body`
- Para lógica multi-layout, encapsular em componente dedicado (padrão `GuidesLimitAlert`)

---

## Quando usar cada um

| Contexto | Padrão correto |
|----------|---------------|
| Dentro de um drawer (painel lateral) | `drawer-hint` |
| Tela/página principal | `BAlert` (bootstrap-vue-next) |
| Inline em formulário ou card | `drawer-hint` |
| Limite, bloqueio ou estado crítico global | `BAlert variant="danger"` |

---

## Anti-patterns (proibido)

| Proibido | Correto |
|----------|---------|
| `<div class="alert" style="background:rgba(...)">` | `<div class="drawer-hint">` ou `<BAlert>` |
| Hex hardcoded no style | `var(--info)`, `var(--danger)` |
| `color-mix` com `var(--white)` | `color-mix(in srgb, var(--token) 8%, transparent)` |
| Bootstrap `.alert` dentro de drawer | `.drawer-hint` |
