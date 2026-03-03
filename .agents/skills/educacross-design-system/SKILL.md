---
name: educacross-design-system
description: "Guia operacional do DS Educacross — governa UI, protótipos, componentes e organização do repositório no FrontOffice (Vue 3 + Bootstrap)."
compatibility: ">=1.0.0"
user-invokable: false
metadata:
  when_to_use: "SEMPRE que for construir, revisar ou ajustar qualquer tela, componente, protótipo ou padrão de DS no FrontOffice."
---

# Educacross Design System — CORE

Governa **UI, protótipos, componentes documentados e organização do repositório**.

- Escopo ativo: `FrontOffice/` — nunca usar `src/` legado nem programar em `educacross-frontoffice`
- Portas: FrontOffice → **5174** · Wiki Docusaurus → **3000**

---

## Categorias de regras (por prioridade)

| # | Categoria | Prioridade | Tags |
|---|-----------|-----------|------|
| 1 | Tokens e cores | CRÍTICO | color, token |
| 2 | Reaproveitamento de componente | CRÍTICO | component |
| 3 | Stack e estrutura Vue | ALTO | vue, code |
| 4 | Ícones | ALTO | icon |
| 5 | Componentes documentados (estados) | ALTO | component, state |
| 6 | Gerenciamento de protótipos | MÉDIO | prototype, git |
| 7 | Layout e responsividade | MÉDIO | layout |
| 8 | Validação visual | MÉDIO | qa |

---

## Quick Reference

### Tokens de cor

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#7367F0` | Ações principais, links ativos |
| `--ec-primary` | `#6E63E8` | Variante saturation-DS |
| `--success` | `#28C76F` | Confirmação, conclusão |
| `--info` | `#00CFE8` | Informativo, neutro |
| `--warning` | `#FF9F43` | Atenção, pendente |
| `--danger` | `#EA5455` | Erro, destrutivo |
| `--ec-text` | `#5E5873` | Títulos e labels |
| `--ec-body` | `#6E6B7B` | Corpo de texto |
| `--ec-muted` | `#B9B9C3` | Texto desabilitado / vazio |
| `--ec-border` | `#EBE9F1` | Bordas e divisores |

**Regras inegociáveis:**
- Nunca usar hex inline — sempre `var(--token)`
- Fundos suaves: `color-mix(in srgb, var(--token) 8%, transparent)`
- Nunca usar `rgba(var(--primary), 1)` — sintaxe inválida no FrontOffice

### Ícones

| Biblioteca | Como usar | Quando |
|------------|-----------|--------|
| Bootstrap Icons | classe `bi bi-*` | Ícones gerais de UI |
| Material Symbols | `<MaterialIcon name="..." />` | Ícones educacionais / contextuais |

Nunca usar emojis como ícones de UI.

### Stack

- Vue 3 `<script setup>` — sem Options API, sem `defineComponent`
- Bootstrap 5 + `bootstrap-vue-next`
- Sem chamadas de API real — apenas mocks locais / JSON estático
- CSS sempre `<style scoped>`
- Priorizar utilitários Bootstrap antes de escrever CSS novo

---

## Componentes documentados

Esta seção é o inventário vivo dos componentes **criados no FrontOffice** que ainda não existem em produção. Ao criar um padrão novo, documentar aqui antes de reutilizar.

---

### `drawer-hint` — Dica contextual em drawer

**Arquivo de referência:** `FrontOffice/src/modules/sistema-de-ensino/components/TrilhasAZDrawer.vue`

**Uso:** faixa informativa compacta dentro de um drawer, para orientar a ação do usuário ou comunicar um estado.

#### Variantes e estados

| Variante | Classe | Cor de fundo | Cor de texto | Quando usar |
|----------|--------|-------------|--------------|-------------|
| **Primário** (padrão) | `.drawer-hint` | `--ec-primary` 8% | `--ec-primary` | Instrução de ação obrigatória ("primeiro envio", "preencha X antes") |
| **Neutro / Info** | `.drawer-hint drawer-hint--neutral` | `--info` 8% | `--info` | Informação contextual, reenvio, estado neutro sem urgência |

> **Não existem ainda:** variantes `--success`, `--warning`, `--danger`. Criar se necessário, seguindo o padrão abaixo.

#### Template padrão

```vue
<div class="drawer-hint drawer-hint--neutral">
  <span class="material-symbols-outlined drawer-hint-icon">info</span>
  Texto da dica aqui.
</div>
```

#### CSS base (copiar para o componente que usar)

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

#### Regras de uso

- Usar sempre ícone `info` (Material Symbols) como primeiro elemento
- Texto em `font-weight: 600`, tamanho 12px — nunca corpo de parágrafo
- Para mensagens com título + descrição, usar estrutura `<div>` interna com `<p>` separados (ver `MissionReport.vue`)
- Não usar Bootstrap `.alert` para esse padrão — o `.drawer-hint` já é o componente correto

---

### `GuidesLimitAlert` — Alerta de limite em página

**Arquivo:** `FrontOffice/src/components/missions/GuidesLimitAlert.vue`
**Port de produção:** `components/missions/GuidesLimitAlert.vue`

**Uso:** alertas de limite, bloqueio ou estado crítico em nível de **página** (fora de drawers). Usa `BAlert` do `bootstrap-vue-next`.

#### Variantes

| Variante | Prop `variant` | Quando usar |
|----------|---------------|-------------|
| Informativo | `primary` | Contagem normal, orientação |
| Atenção / Esgotado | `danger` | Limite próximo ou atingido |

#### Template padrão

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

#### Regras de uso

- Sempre usar `BAlert` (bootstrap-vue-next) — nunca `<div class="alert">` manual em páginas
- `:model-value="true"` para manter visível
- Conteúdo sempre dentro de `.alert-body`
- Para lógica multi-layout, encapsular em componente dedicado (padrão `GuidesLimitAlert`)
- **Não usar para avisos dentro de drawer** — usar `.drawer-hint`

> **Documentação completa:** `documentation/docs/design-system/componentes-de-aviso.md`

---

## Gerenciamento de protótipos

### Estrutura de personas e rotas

| Persona | Rota base | Dashboard |
|---------|-----------|-----------|
| Professor | `/teacher` | `teacher/Dashboard.vue` |
| Aluno | `/student` | `student/Dashboard.vue` |
| Coordenador | `/coordinator` | `coordinator/Dashboard.vue` |
| Diretor | `/director` | `director/Dashboard.vue` |
| Administrador | `/administrator` | `administrator/Dashboard.vue` |
| Gestor de Rede | `/network-manager` | `network-manager/Dashboard.vue` |

### Branching de protótipos

| Branch | Propósito |
|--------|-----------|
| `prototypes/as-is` | Baseline — nunca desenvolver aqui |
| `prototypes/feature/*` | Protótipos TO-BE ativos |
| `main` | Branch principal — recebe features prontas |

**Fluxo:** partir de `prototypes/as-is` → desenvolver na feature branch → aprovar → merge em `main` → deletar feature branch → atualizar `prototypes/as-is` com tag.

### Variáveis globais de build (sem import)

```js
__GIT_BRANCH__    // branch atual
__GIT_SHA__       // short SHA
__APP_VERSION__   // versão do FrontOffice/package.json
__WIKI_URL__      // dev: "http://localhost:3000" | build: GitHub Pages
```

---

## Fluxo de reaproveitamento de componente

**Passo 1 — Buscar no FrontOffice**

```
file_search: FrontOffice/src/components/**/*Nome*
grep_search: "NomeDoComponente" em FrontOffice/src/**
```

Se encontrar → **reutilizar, não recriar**.

**Passo 2 — Buscar em produção via MCP**

```
search_component("Nome") → get_component("pasta/Componente.vue")
```

Ao adaptar de Vue 2 para Vue 3: migrar para `<script setup>`, trocar BootstrapVue por `bootstrap-vue-next`, preservar comportamento visual.

**Passo 3 — Se não existir em nenhum dos dois**

Criar em `FrontOffice/src/components/` e **documentar na seção "Componentes documentados" desta SKILL**.

---

## Pre-delivery checklist

### Tokens e cores
- [ ] Nenhuma cor hex inline — somente `var(--token)`
- [ ] Fundos suaves usando `color-mix(in srgb, var(--token) 8%, transparent)`
- [ ] Texto com contraste suficiente (`--ec-text` ou `--ec-body`)

### Componentes
- [ ] Componente buscado no FrontOffice antes de criar
- [ ] Se novo, documentado na seção "Componentes documentados"
- [ ] Variante/estado correto para o contexto (ver tabela do componente)

### Ícones
- [ ] Bootstrap Icons via `bi bi-*` ou Material Symbols via `<MaterialIcon />`
- [ ] Nenhum emoji usado como ícone

### Código
- [ ] `<script setup>` sem Options API
- [ ] `<style scoped>`
- [ ] Sem chamadas de API real

### Responsividade
- [ ] Grid Bootstrap (`.col-md-*`)
- [ ] Ajustes em `@media (max-width: 768px)` quando necessário

### Validação visual
- [ ] Rota abre sem erro
- [ ] Layout visualmente equivalente ao padrão Educacross
- [ ] Screenshot capturado e comparado com produção/Figma

---

## Anti-patterns (proibido)

| Proibido | Correto |
|----------|---------|
| Hex inline `#7367F0` | `var(--primary)` |
| `rgba(255, 193, 7, 0.1)` | `color-mix(in srgb, var(--warning) 10%, transparent)` |
| `font-family: 'Montserrat'` hardcoded | `var(--font-family-base)` |
| Bootstrap `.alert` em drawer | `.drawer-hint` |
| Criar componente sem buscar antes | Buscar → reutilizar → só então criar |
| Desenvolver em `src/` legado | Desenvolver em `FrontOffice/src/` |
| API real | Mocks locais / JSON estático |
| Concluir sem validação visual | Screenshot + comparação obrigatórios |

---

## Servidores MCP disponíveis

| Servidor | Tipo | Ferramentas principais |
|----------|------|----------------------|
| `design-system` | stdio | `list_components`, `get_component`, `search_component`, `get_scss` |
| `figma` | HTTP | `get_design_context`, `generate_diagram` |

Usar MCP local sempre antes de navegar na web.

---

## Referências

- Instruções FrontOffice: `.github/instructions/frontoffice.instructions.md`
- Copilot instructions: `.github/copilot-instructions.md`
- Status do projeto: `PROJECT_STATUS.md`
- Workflow de protótipos: `PROTOTYPES-WORKFLOW.md`
- DS público: `https://fabioeducacross.github.io/DesignSystem-Vuexy/`
- DS local (somente leitura): `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice\`
- Wiki — Componentes de Aviso: `documentation/docs/design-system/componentes-de-aviso.md`
