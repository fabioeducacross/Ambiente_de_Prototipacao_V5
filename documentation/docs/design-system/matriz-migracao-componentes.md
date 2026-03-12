---
sidebar_position: 8
title: Matriz de Migração de Componentes
description: Mapeamento de todos os componentes do FrontOffice com origem, status atual, criticidade, prioridade e ação recomendada para convergência com produção.
---

# Matriz de Migração e Canonicalização de Componentes

Data: 2026-03-12  
Plano base: `plano-implementacao-storybook-ds.md` — Sprint 3, FASE 4

---

## Objetivo

Este documento lista todos os componentes do FrontOffice e define, para cada um, a ação de convergência com o ambiente de produção (`educacross-frontoffice`).

---

## Legenda

### Status no Registry
| Símbolo | Significado |
|---|---|
| ✅ registrado | Componente presente em `registry.json` com spec canônica |
| 🔲 não registrado | Componente existe no FrontOffice mas não tem entry no registry |

### Criticidade
| Nível | Definição |
|---|---|
| 🔴 Alta | Usado em múltiplas telas, base de formulários ou layout global |
| 🟡 Média | Reutilizável mas de escopo limitado |
| 🟢 Baixa | Feature-specific ou de contexto único |

### Ação Recomendada
| Ação | Significado |
|---|---|
| `catalogar` | Adicionar ao registry + criar spec JSON |
| `adaptar` | Componente existe no legado; refinar para FrontOffice e especificar |
| `especificar` | Já no registry; criar/completar spec se ausente |
| `adiar` | Feature-specific; postergar para sprint futuro |
| `descontinuar` | Componente duplicado ou obsoleto; remover após validação |

---

## Tabela: Componentes Base (`base/`)

Estes são os componentes atômicos fundamentais — inputs, botões, badges, modais.

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `EButton` | ✅ registrado | 🔴 Alta | — | Spec completa. Prioridade máxima de sync com produção. |
| `EInput` | ✅ registrado | 🔴 Alta | — | Spec completa. |
| `ESelect` | ✅ registrado | 🔴 Alta | — | Adaptado. Spec completa. |
| `ETextarea` | ✅ registrado | 🔴 Alta | — | Spec completa. |
| `EFormGroup` | ✅ registrado | 🔴 Alta | — | Spec completa. Usado como wrapper universal de campo. |
| `EBadge` | ✅ registrado | 🔴 Alta | — | Spec completa. |
| `EModal` | ✅ registrado | 🔴 Alta | — | Spec completa. |
| `EConfirmDialog` | ✅ registrado | 🔴 Alta | — | Spec completa. Estende EModal. |
| `EDatePicker` | ✅ registrado | 🟡 Média | — | Adaptado via flatpickr. Spec completa. |
| `EToast` | ✅ registrado | 🔴 Alta | — | Componente global de feedback já catalogado com spec, story e registry. |
| `ProgressBar` | ✅ registrado | 🟡 Média | `normalizar` | Nome público canônico do DS. O runtime técnico permanece em `ProgressBarHorizontalV2.vue`; a Story 4.7 fecha o drift nominal e de governança. |
| `LegendEnum` | ✅ registrado | 🟡 Média | — | Utility de legenda já catalogada como componente de feedback do DS. |
| `SelectSubject` | 🔲 não registrado | 🟢 Baixa | `adiar` | Domain-specific (disciplinas). Catalogar em sprint futuro. |

---

## Tabela: MaterialIcon

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `MaterialIcon` | ✅ registrado | 🔴 Alta | — | Spec completa. Wrapper canônico para Material Symbols. |

---

## Tabela: Componentes de Layout (raiz de `components/`)

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `Sidebar` | ✅ registrado | 🔴 Alta | — | Layout global já catalogado com contrato de navegação e estados de colapso. |
| `AppNavbar` | ✅ registrado | 🔴 Alta | — | Topbar global já catalogada com variações por persona. |
| `AppBreadcrumb` | ✅ registrado | 🟡 Média | — | Sub-componente do AppNavbar já catalogado no DS. |
| `FeatureFlagsPanel` | 🔲 não registrado | 🟢 Baixa | `adiar` | Painel de dev; não é componente de produto. |
| `SubjectIcon` | 🔲 não registrado | 🟡 Média | `adiar` | Domain-specific; postergar. |
| `ActivityLegend` | 🔲 não registrado | 🟡 Média | `adiar` | Domain-specific; postergar. |

---

## Tabela: Componentes de Feature (Drawers / Modais complexos)

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `EventDrawer` | 🔲 não registrado | 🟢 Baixa | `adiar` | Feature-specific do calendário. |
| `JourneyPrototypeDrawer` | 🔲 não registrado | 🟢 Baixa | `adiar` | Feature-specific de jornadas. |
| `TrilhasAZDrawer` | 🔲 não registrado | 🟢 Baixa | `adiar` | Feature-specific de trilhas. |
| `MiniCalendar` | 🔲 não registrado | 🟢 Baixa | `adiar` | Sub-componente do calendário. |

---

## Tabela: Componentes Compostos (`table/`)

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `ListTableSelect` | ✅ registrado | 🔴 Alta | `adaptar` | Primeiro componente composto da Fase 4. Catalogado com convergência mínima do modo tabela; grid view, exportação e superfície ampla do legado seguem fora do recorte 4.6. |

---

## Tabela: Atoms (`atoms/`)

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `Checkbox` | 🔲 não registrado | 🔴 Alta | `catalogar` | Atom de formulário. Candidato a `ECheckbox` no DS. |
| `PageCallout` | ✅ registrado | 🟡 Média | — | Callout informativo já catalogado com variantes publicadas. |
| `NavigationButton` | 🔲 não registrado | 🟡 Média | `adiar` | Específico de layout de navegação do calendário. |
| `ViewToggleButton` | 🔲 não registrado | 🟢 Baixa | `adiar` | Atom específico de toggle de view do calendário. |
| `LegendDot` | 🔲 não registrado | 🟢 Baixa | `adiar` | Micro-atom decorativo. |
| `EventOriginIcon` | 🔲 não registrado | 🟢 Baixa | `adiar` | Domain-specific. |
| `DayCell` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `DateCellLarge` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `WeekdayLabel` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |

---

## Tabela: Molecules (`molecules/`)

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `CheckboxGroup` | ✅ registrado | 🟡 Média | — | Molecule de formulário já catalogada e publicada no DS. |
| `FilterSection` | ✅ registrado | 🟡 Média | — | Seção de filtros já catalogada com suporte controlado e não-controlado. |
| `ViewToggleGroup` | 🔲 não registrado | 🟡 Média | `adiar` | Específico de toggle de visualização. |
| `CalendarHeader` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `CalendarMonthHeader` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `CalendarDaysHeader` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `AllDayEventItem` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `EventItem` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `SpanningEventItem` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `WeekRow` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `WeekdaysRow` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |
| `LegendItem` | 🔲 não registrado | 🟢 Baixa | `adiar` | Calendar-specific. |

---

## Tabela: Organisms e Templates

| Componente | Status Registry | Criticidade | Ação | Nota |
|---|---|---|---|---|
| `WeekViewGrid` | 🔲 não registrado | 🟢 Baixa | `adiar` | Organism do calendário. |
| `MonthViewGrid` | 🔲 não registrado | 🟢 Baixa | `adiar` | Organism do calendário. |
| `DayViewGrid` | 🔲 não registrado | 🟢 Baixa | `adiar` | Organism do calendário. |
| `CalendarSidebar` | 🔲 não registrado | 🟢 Baixa | `adiar` | Organism do calendário. |
| `CalendarLayoutTemplate` | 🔲 não registrado | 🟢 Baixa | `adiar` | Template de layout do calendário. |

---

## Plano de Execução por Prioridade

### Sprint 4 — Componentes Alta Prioridade (catalogar)

Candidatos imediatos ao próximo sprint de catalogação:

| # | Componente | Ação | Justificativa |
|---|---|---|---|
| 1 | `EToast` | `catalogar` | Feedback de ações; usado em toda a app |
| 2 | `Sidebar` | `catalogar` | Layout global; merece contrato de slots |
| 3 | `AppNavbar` | `catalogar` | Layout global; usado em todas as telas |
| 4 | `Checkbox` | `catalogar` | Atom de form; candidato a `ECheckbox` no DS |
| 5 | `CheckboxGroup` | `catalogar` | Molecule de form reutilizável |
| 6 | `ProgressBar` | `normalizar` | Drift nominal fechado na Story 4.7; runtime técnico permanece em `ProgressBarHorizontalV2.vue` |

### Sprint 5 — Componentes Média Prioridade — ✅ CONCLUÍDO

| # | Componente | Ação | Observação |
|---|---|---|---|
| 1 | `PageCallout` | ✅ catalogado | Faixa informativa, 4 variantes |
| 2 | `FilterSection` | ✅ catalogado | Accordion colapsável, suporte v-model |
| 3 | `LegendEnum` | ✅ catalogado | Legenda de enumeração, porta do legado |
| 4 | `AppBreadcrumb` | ✅ catalogado | Lê route.meta.breadcrumb, mock no Storybook |

### Backlog — Componentes de Feature e Calendar

Todos os calendar-specific e domain-specific ficam como `adiar` até haver demanda de convergência.

---

## Métricas de Cobertura Atual

```text
Total componentes no FrontOffice:      57
  ✅ No registry com spec:             21  (36.8%)
  🔲 Baixa prioridade / adiar:         36  (63.2%)

Cobertura atual do registry:          21/57 = 36.8%
Meta Sprint 4:                        16/57 = 28.1% ✅ ATINGIDA
Meta Sprint 5:                        20/57 = 35.1% ✅ ATINGIDA
Marco pós-4.5:                        21/57 = 36.8% ✅ primeiro composto catalogado
Meta longo prazo (componentes base):  30+/57 = 52%+ (Sprint 6+)
```

---

## Referências

- Registry canônico: `design-system/registry/registry.json`
- Specs existentes: `design-system/specs/`
- Plano base: `documentation/docs/design-system/plano-implementacao-storybook-ds.md`
- Governança: `documentation/docs/design-system/governanca.md`
- Guia de contribuição: `design-system/CONTRIBUTING.md`
