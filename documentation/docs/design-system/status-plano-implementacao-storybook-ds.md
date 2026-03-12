---
sidebar_position: 3
title: Status do Plano - Storybook e Expansao do Design System
description: Status de execucao do plano de implementacao do terceiro asset (Storybook + tokens + specs + registry MCP).
---

# Status do Plano - Storybook e Expansao do Design System (ASCII)

Atualizado em: 2026-03-12 (Sprint 5 concluido; recorte 4.1-4.5 dos componentes-base encerrado; primeiro componente composto catalogado)
Plano base: `documentation/docs/design-system/plano-implementacao-storybook-ds.md`

## Resumo executivo

- Status atual do asset estrutural (Sprints 0+1+2+3+4+5): **concluido**.
- Status atual do plano operacional: **Fase 4 segue em andamento no plano base, com o recorte 4.1-4.5 dos componentes-base fechado e o primeiro recorte de componente composto ja executado via Story 4.6**.
- Documento de plano publicado: `plano-implementacao-storybook-ds.md`.
- Asset `design-system/` criado com Storybook interno, stories, tokens, specs e registry.
- MCP com tools `get_spec` e `get_registry` ativas, documentadas e validadas por IA.
- Documentacao de governanca publicada: `CONTRIBUTING.md` + `governanca.md`.
- Sprint 3: validacao MCP (PASS), fluxo designer→dev e Matriz de Migracao publicados.
- Sprint 4: +6 componentes de alta prioridade catalogados (registry 10→16).
- Sprint 5: +4 componentes de media prioridade catalogados (registry 16→20, 35% do FrontOffice).
- Tokens sincronizados com `FrontOffice/src/style.css` (v1.4.0, +ec-text/body/muted/border, +layout).
- Build Storybook validado: 21 stories publicadas no catalogo atual.
- Stories 4.1 a 4.5 fecharam o recorte atual dos componentes-base com baseline verificável, parity mínima e convergência funcional/documental dos contratos publicados.
- Story 4.6 iniciou a trilha de componentes compostos ao catalogar o ListTableSelect com contrato mínimo do modo tabela e bridge única de visibilidade da busca.
- Story 4.7 saneou o drift nominal do componente ProgressBar sem alterar cobertura do catálogo, estabilizando adapter, Storybook e matriz em torno do nome público canônico.

> Nota: este documento registra o fechamento estrutural do asset Storybook/Design System e da expansao catalogada ate o Sprint 5. Ele nao substitui o status operacional da convergencia com producao, que continua sendo governado pelo plano base e pelas stories ativas da Fase 4.

## Grafico geral

```text
Planejamento e diretrizes      [####################] 100%  (documentado e validado)
Governanca de escopo           [####################] 100%  (separacao drawer x DS registrada)
Execucao tecnica Storybook     [####################] 100%  (Sprint 1 concluido)
Execucao tecnica Tokens/Specs  [####################] 100%  (Sprint 1 concluido, tokens v1.4.0)
Execucao tecnica Registry MCP  [####################] 100%  (tools get_spec/get_registry ativas + docs publicados)
Validacao MCP por IA           [####################] 100%  (Sprint 3: 7 tools, 10 specs, fluxo validado)
Fluxo designer -> story -> dev [####################] 100%  (Sprint 3: guia end-to-end publicado)
Convergencia com producao      [###############-----] 75%   (plano base: recorte 4.1-4.5 fechado; primeiro composto catalogado; Fase 4 macro segue aberta)
Catalogo alta prioridade       [####################] 100%  (Sprint 4: 6 componentes catalogados)
Catalogo media prioridade      [####################] 100%  (Sprint 5: 4 componentes catalogados)

STATUS ATUAL DO PLANO          [################█░░░] 85%  (asset estrutural concluido; Fase 4 operacional avancou para o primeiro componente composto)

> Atualização operacional: a Story 4.7 foi concluída como recorte de governança nominal do ProgressBar. Esse passo saneia drift documental e contratual, mas não aumenta a contagem de componentes catalogados.
```

## O que ja esta fechado

```text
Plano macro aprovado/documentado              [##########] 100%
Arquitetura alvo definida                     [##########] 100%
Fases de execucao definidas                   [##########] 100%
Backlog inicial por sprint definido           [##########] 100%
Criterios de sucesso definidos                [##########] 100%
Asset design-system/ criado                   [##########] 100%
Storybook interno funcional                   [##########] 100%
Stories base publicados (10 componentes)      [##########] 100%
Specs de componentes publicadas (10)          [##########] 100%
Tokens (tokens.json) publicados               [##########] 100%
Registry canonico (registry.json) criado      [##########] 100%
Tools MCP get_spec e get_registry ativas      [##########] 100%
CONTRIBUTING.md de governanca publicado       [##########] 100%
Wiki de governanca (governanca.md) publicada  [##########] 100%
```

## Sprint 4 — Concluido

```text
EToast catalogado (spec + story + registry)          [##########] 100%
Sidebar catalogada (spec + story + registry)         [##########] 100%
AppNavbar catalogada (spec + story + registry)       [##########] 100%
ECheckbox catalogado (spec + story + registry)       [##########] 100%
CheckboxGroup catalogado (spec + story + registry)   [##########] 100%
ProgressBar catalogado (spec + story + registry)     [##########] 100%
Registry expandido: 10 → 16 componentes (28.1%)      [##########] 100%
```

Novos artefatos:
- `design-system/specs/` → +6 specs (EToast, Sidebar, AppNavbar, ECheckbox, CheckboxGroup, ProgressBar)
- `design-system/stories/` → +6 stories
- `design-system/registry/registry.json` → 16 componentes, 3 categorias (base, layout, feedback)
- `documentation/docs/design-system/matriz-migracao-componentes.md` → cobertura 16/57

## Sprint 5 — Concluido

```text
PageCallout catalogado (spec + story + registry)         [##########] 100%
FilterSection catalogado (spec + story + registry)       [##########] 100%
LegendEnum catalogado (spec + story + registry)          [##########] 100%
AppBreadcrumb catalogado (spec + story + registry)       [##########] 100%
Registry expandido: 16 → 20 componentes (35.1%)          [##########] 100%
Tokens sincronizados (v1.3.0→v1.4.0)                    [##########] 100%
Build Storybook validado: 20 stories OK                  [##########] 100%

## Avanco adicional da Fase 4 — Componente composto inicial

```text
ListTableSelect catalogado (spec + story + registry)      [##########] 100%
Adapter Vue3 atualizado para o componente                 [##########] 100%
Matriz de migracao atualizada para 21/57                  [##########] 100%
Story 4.6 encerrada com GO final                          [##########] 100%
```

Novos artefatos:
- `design-system/specs/` → +1 spec (ListTableSelect)
- `design-system/stories/` → +1 story
- `design-system/registry/registry.json` → 21 componentes, 4 categorias (base, layout, feedback, composed)
- `design-system/adapters/vue3/index.js` → export adicional do `ListTableSelect`
- `documentation/docs/design-system/matriz-migracao-componentes.md` → cobertura 21/57
```

Novos artefatos:
- `design-system/specs/` → +4 specs (PageCallout, FilterSection, LegendEnum, AppBreadcrumb)
- `design-system/stories/` → +4 stories
- `design-system/registry/registry.json` → 20 componentes, 3 categorias (base, layout, feedback)
- `design-system/tokens/tokens.json` → v1.4.0: +layout (navbar-height), +text (ec-text/body/muted), +ui (ec-border/card-*)
- `design-system/tokens/tokens.css` → sincronizado com tokens.json v1.4.0
- `documentation/docs/design-system/matriz-migracao-componentes.md` → cobertura 20/57

## Gates de validacao deste plano (Storybook/DS)

```text
1. Plano de implementacao publicado              [#] PASS
2. Escopo e nao-escopo definidos                 [#] PASS
3. Fases e backlog definidos                     [#] PASS
4. Status de execucao separado do drawer         [#] PASS
5. Asset design-system criado                    [#] PASS
6. Storybook interno funcional                   [#] PASS
7. Stories base publicados                       [#] PASS
8. Specs de componente publicadas                [#] PASS
9. Registry MCP estruturado publicado            [#] PASS (registry.json + tools get_spec/get_registry + docs)
```

Formula atual do asset estrutural:

```text
9 gates PASS / 9 gates totais = 100%
STATUS ESTRUTURAL DO ASSET = 100% (todos os Sprints concluidos)

Leitura operacional complementar:

- O plano base continua com a Fase 4 ativa.
- O recorte 4.1-4.5 dos componentes-base foi concluido com baseline verificável, parity mínima e convergência funcional/documental já registradas em stories fechadas.
- A Story 4.6 abre o eixo de componentes compostos com o ListTableSelect catalogado em convergência mínima e sem parity total com a baseline de produção.
- A continuidade da Fase 4 passa a depender dos próximos compostos e gaps macro fora do bloco atual de componentes-base.
```

## Proximo passo objetivo

O plano estrutural de implementacao do Storybook e Design System (Sprint 0-5) esta **100% concluido**.

A continuidade operacional da Fase 4 permanece aberta no plano base, mas o recorte atual dos componentes-base tambem foi fechado e o primeiro componente composto ja entrou no catalogo.

Proximo recorte executavel a definir:

- nova story da Fase 4 para o proximo componente composto prioritario ou para outro gap macro ainda fora do bloco 4.1-4.5.

Cobertura atual: **21/57 componentes do FrontOffice** (~36.8%) com spec + story + registry.

Para continuidade futura de catalogacao, consultar a **Matriz de Migracao** (`matriz-migracao-componentes.md`):

**Sprint 6+ — Baixa Prioridade (restante):**
- 36 componentes marcados como `catalogar-futuro`
- Priorizar por frequencia de uso nas telas de prototipacao
- Cada componente novo segue o fluxo: spec JSON → story → registry

## Fontes usadas neste status

- `documentation/docs/design-system/plano-implementacao-storybook-ds.md`
- `documentation/docs/design-system/integration.md`
- `documentation/docs/design-system/governanca.md`
- `design-system/CONTRIBUTING.md`
- `design-system/registry/registry.json`
- `documentation/docs/design-system/sprint3-validacao-mcp.md`
- `documentation/docs/design-system/sprint3-fluxo-designer-dev.md`
- `documentation/docs/design-system/matriz-migracao-componentes.md`
- `documentation/docs/design-system/status-plano-implementacao-storybook-ds.md`