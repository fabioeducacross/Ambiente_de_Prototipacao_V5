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

### Racional de design

#### Por que existe um componente separado para drawers?

Drawers são contextos **compactos e focados em tarefa**. O Bootstrap `.alert` e o `BAlert` foram projetados para ocupá-ro nível de página — têm espaçamento generoso, bordas, e constroem hierarquia visual de página. Dentro de um drawer, esse peso visual é excessivo e compete com o conteúdo principal. O `drawer-hint` usa padding reduzido (`10px 12px`), borda-raio menor e fundo com 8% de opacidade — quase imperceptível, mas presente o suficiente para contextualizar a orientação.

#### Por que primário vs. neutro — e não uma escala de severidade?

A distinção **não é de severidade** (não é "roxo = mais perigoso"). É um eixo de **novidade da ação**:

- **Primário (roxo)** → o usuário ainda não fez isso antes; a ação tem consequências que ele precisa entender antes de prosseguir. Ex: primeiro envio de missão, que habilita acesso dos alunos.
- **Neutro (ciano)** → a ação já é conhecida; o hint é apenas um lembrete contextual, sem peso emocional. Ex: reenvio de uma missão que o professor já realizou antes.

Essa distinção espelha exatamente o que o Adobe Spectrum chama de `neutral` vs. `informative` — a diferença é o grau de atenção que o usuário precisa dedicar, não o risco envolvido.

#### Por que sem botão fechar?

O `drawer-hint` não é feedback de uma ação — é orientação prévia. O Carbon Design System (IBM) define seu componente equivalente (`Callout`) explicitamente como persistente:

> *"Unlike other notifications, callouts do not dismiss because they are used to highlight important information for the user that cannot be missed."*

Se o usuário pudesse fechar o hint, ele poderia iniciar a ação sem compreender o contexto — exatamente o problema que o componente existe para prevenir.

#### Por que máximo 2 linhas?

Carbon e MUI convergem para esse limite. Acima de 2 linhas, a carga cognitiva dentro do drawer se torna alta demais — o hint começa a competir com o conteúdo principal. Se a explicação precisa de mais espaço, o design do fluxo deve ser revisado, ou o conteúdo deve ir para um modal ou página de detalhe.

#### Por que não usar `--success` ou `--danger`?

O `drawer-hint` é um componente de **orientação antes da ação**, não de **feedback após a ação**. O Carbon é explícito sobre isso: seu `Callout` permite apenas `informational` e `warning` — `success` e `error` são exclusivos do `Inline Notification`, disparado por resultado de ação. Dentro de um drawer de envio, um `--danger` vermelho geraria confusão — o usuário interpretaria como "algo deu errado" quando na verdade apenas há uma atenção necessária.

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

Em março/2026 foi feito um benchmark comparativo com os principais Design Systems do mercado para validar as decisões arquiteturais do `drawer-hint`. Abaixo os achados por sistema.

### Carbon Design System (IBM) — `Callout`

O componente mais próximo do `drawer-hint`. A definição do Carbon é quase idêntica ao nosso uso:

> *"Callouts are used to highlight important information contextually within the contents of the page. Unlike other notifications they are not triggered by the user or system — they load with the contents. They are persistent and always present on screen."*

**O que valida:**
- Persistente, sem botão fechar → confirma nossa decisão de não ter `x`
- Apenas variantes `informational` e `warning` → sem `success`/`error` no contexto de orientação prévia → confirma que `--danger` seria errado no `drawer-hint`
- Título é opcional: *"omit the title when it would break the reading flow"* → confirma nosso modo texto simples (sem título)

### Adobe Spectrum — `In-line alert`

Especificação mais detalhada de variantes semânticas. Define 5 níveis:

| Variante Spectrum | Equivalente nosso | Observação |
|---|---|---|
| `neutral` | `.drawer-hint--neutral` | Sem ícone, tom cinza — informação sem emoção |
| `informative` (azul) | `.drawer-hint` (primário) | Requer atenção extra vs. o neutro |
| `notice` (laranja) | `.drawer-hint--warning` | Situação que pode precisar de ação em breve |
| `negative` (vermelho) | — (não implementado) | Erro/falha — não faz sentido em hint de orientação |
| `positive` (verde) | — (não implementado) | Confirmação de ação — é feedback, não orientação |

**O que valida:** a distinção primário vs. neutro é exatamente a distinção `informative` vs. `neutral` do Spectrum — grau de atenção, não severidade.

### Polaris (Shopify) — `Banner` contextual

O Polaris tem uma regra explícita de posicionamento que valida a existência do `drawer-hint` como componente separado:

> *"Banners related to a section of a page (card, popover, or modal) should be placed inside that section, below any section heading. These banners have less spacing and a pared-back design to fit within a content context."*

Além disso, o Polaris define um antipadrão que adotamos como regra:

> *"Not be used to call attention to what a merchant needs to do in the UI instead of making the action clear in the UI itself."*

Traduzido: se o hint existe péra explicar o botão, o botão está mal rotulado.

### MUI (Material UI) e Ant Design — `Alert`

Ambos usam o modelo clássico de 4 severidades (`success`, `info`, `warning`, `error`) sem distinção por contexto de posicionamento. O que validam:
- `info` e `warning` são as variantes mais usadas em contextos inline compactos
- MUI permite separar `severity` de `variant` visual (`outlined`, `filled`, `standard`) — reforça que forma e semântica são independentes

### Atlassian Design System — `InlineMessage`

Abordagem diferente: sem fundo colorido, apenas ícone + texto; ao clicar abre um popover. Válido para tabelas densas. **Não é o padrão correto para drawers** — o `drawer-hint` com fundo sutil é mais adequado porque o professor precisa ver a orientação sem precisar clicar.

---

### Resumo de consistência

| Decisão do `drawer-hint` | Validado por |
|---|---|
| Persistente, sem fechar | Carbon Callout, Spectrum In-line alert |
| Sem `--success` / `--danger` | Carbon (proibido no Callout) |
| Neutro vs. primário = novidade, não severidade | Spectrum (`neutral` vs. `informative`) |
| Máximo 2 linhas | Carbon + MUI |
| Hint não substitui label de botão | Polaris antipattern |
| Fundo compacto 8% opacidade | Polaris ("pared-back design" em painéis) |