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
| **Warning** | `.drawer-hint drawer-hint--warning` | `--warning` (#FF9F43) | Atenção necessária, situação que pode precisar de ação em breve |

![Prévia das variantes do componente drawer-hint](/img/ds/drawer-hint-variants.png)

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

.drawer-hint--warning {
  background: color-mix(in srgb, var(--warning) 8%, transparent);
  color: var(--warning);
}
```

### Regras

- Sempre começar com ícone `info` (primário e neutro) ou `warning` (variante warning) do Material Symbols
- Texto `font-weight: 600`, tamanho `12px` — não usar parágrafo solto
- **Máximo 2 linhas de conteúdo** — se precisar de mais, usar página ou modal
- **Sem botão fechar** — o hint é persistente; não é feedback, é orientação
- **Não usar para explicar o que o botão deveria dizer** — se precisa de um hint pra explicar o botão, o botão está mal rotulado
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
| Bootstrap `.alert` dentro de drawer | `.drawer-hint` || Hint para explicar o que o botão já deveria dizer | Melhorar o label do botão |
| Criar nova variante com hex ad-hoc | Usar `--warning`, `--info`, `--ec-primary` existentes |

---

## Benchmark de referência

Este componente foi comparado com as implementações de ponta do mercado. A abordagem atual está alinhada com:

| DS | Componente equivalente | O que valida |
|----|------------------------|---------------|
| **Carbon (IBM)** | `Callout` | Persistente, sem fechar, orienta antes da ação. Só `informational` + `warning` — sem `success`/`error` |
| **Spectrum (Adobe)** | `In-line alert` | Distância semântica entre `neutral` (sem emoção) e `informative` (mais chamativo) — equivalente ao nosso primário vs. neutro |
| **Polaris (Shopify)** | `Banner` contextual | Reça menor e menos espaçamento quando dentro de painel lateral — equivalente ao nosso formato compacto |
| **MUI / Ant Design** | `Alert` | Valida o modelo de 4 severidades; `info` e `warning` são as mais usadas em contextos inline |

> **Consistência confirmada:** nossa escolha de 2 variantes ativas (primário + neutro) + 1 reserva (`--warning`) espelha exatamente o modelo do Carbon Callout.