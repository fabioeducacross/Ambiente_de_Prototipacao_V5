---
sidebar_position: 2
title: "PDR 002: Arquitetura Modular por Jornada"
description: Decisão sobre organização modular do FrontOffice (Calendário, Sistema de Ensino, Shared)
---

# PDR 002: Arquitetura Modular por Jornada

*   **Status**: <span class="material-symbols-outlined">check_circle</span> Aceito (atualizado)
*   **Data**: 2026-02-23
*   **Atualizado**: 2026-02-23
*   **Autor**: Equipe de Produto / Frontend

---

## <span class="material-symbols-outlined">assignment</span> Contexto

### Problema original (v1 desta PDR)

O projeto possuía múltiplas jornadas do professor (Calendário, Trilhas AZ, etc.) que compartilhavam um único componente `Sidebar.vue`. Durante o desenvolvimento, a Sidebar foi modificada para atender ao Sistema de Ensino, quebrando a experiência visual do Calendário.

### Problema estrutural descoberto (v2 desta PDR)

Ao investigar o problema da Sidebar, foi identificado que **protótipos existiam duplicados** em duas raízes distintas (`src/` e `FrontOffice/src/`), violando a regra de que todos os protótipos devem ficar dentro de `FrontOffice/`. Além disso, todos os componentes (calendário, sistema de ensino, shared) ficavam misturados em uma única pasta `components/`, dificultando manutenção, isolamento e onboarding.

---

## <span class="material-symbols-outlined">balance</span> Decisão

Decidimos **reorganizar o FrontOffice em módulos por jornada**, com pastas isoladas para cada domínio funcional:

### Regras

1. **Todo protótipo dentro de `FrontOffice/`** — nada de UI em `src/` raiz
2. **Cada módulo de jornada é auto-contido** — views, componentes, composables e data próprios
3. **Componentes compartilhados em `shared/`** — Sidebar, AppNavbar, MaterialIcon, base (Design System)
4. **Sidebar do Calendário restaurada da branch `v1.1`** como fonte de verdade

---

## <span class="material-symbols-outlined">folder</span> Nova Estrutura de Arquivos

```
FrontOffice/src/
├── modules/
│   ├── calendario/                          # <span class="material-symbols-outlined">calendar_month</span> Módulo Calendário
│   │   ├── components/
│   │   │   ├── atoms/                       # DayCell, Checkbox, DateCellLarge, etc
│   │   │   ├── molecules/                   # CalendarHeader, CheckboxGroup, FilterSection, etc
│   │   │   ├── organisms/                   # CalendarSidebar, MonthViewGrid, WeekViewGrid, etc
│   │   │   ├── templates/                   # CalendarLayoutTemplate
│   │   │   ├── EventDrawer.vue
│   │   │   ├── MiniCalendar.vue
│   │   │   ├── ActivityLegend.vue
│   │   │   ├── ClassSelector.vue
│   │   │   ├── CalendarActivityFilters.vue
│   │   │   ├── CalendarHeaderFigma.vue
│   │   │   ├── CalendarMiniPicker.vue
│   │   │   ├── MonthViewFigma.vue
│   │   │   └── index.js                    # Barrel export
│   │   ├── composables/
│   │   │   ├── useCalendar.js
│   │   │   └── useCalendarPermissions.js
│   │   ├── data/
│   │   │   ├── calendar-enums.js
│   │   │   ├── calendar-mock-teacher.json
│   │   │   └── eventsCalendar.json
│   │   └── views/
│   │       ├── Calendar.vue                 # Rota: /teacher/calendar
│   │       ├── CalendarFigma.vue            # Rota: /teacher/calendar-figma
│   │       └── calendar/
│   │           ├── DayView.vue
│   │           ├── WeekView.vue
│   │           ├── MonthView.vue
│   │           └── ListView.vue
│   │
│   └── sistema-de-ensino/                   # <span class="material-symbols-outlined">library_books</span> Módulo Sistema de Ensino
│       ├── components/
│       │   ├── TrilhasAZDrawer.vue
│       │   ├── SubjectIcon.vue
│       │   └── index.js                    # Barrel export
│       ├── composables/
│       │   └── useTrilhasAZ.js
│       ├── data/
│       │   └── trilhas-az.json
│       └── views/
│           └── TrilhasAZ.vue                # Rota: /teacher/trilhas-az
│
├── shared/                                  # <span class="material-symbols-outlined">link</span> Compartilhados entre módulos
│   ├── components/
│   │   ├── base/                            # Design System (EButton, EInput, ESelect, etc)
│   │   │   └── index.js
│   │   ├── AppNavbar.vue
│   │   ├── Sidebar.vue                      # Fonte: branch v1.1
│   │   ├── MaterialIcon.vue
│   │   ├── FeatureFlagsPanel.vue
│   │   └── index.js                        # Barrel export
│   └── composables/
│       ├── useCurrentUser.js
│       ├── useFeatureFlags.js
│       ├── useSidebarState.js
│       └── useToast.js
│
├── views/                                   # Views globais (Home, Dashboards por persona)
│   ├── Home.vue
│   ├── About.vue
│   ├── teacher/Dashboard.vue
│   ├── student/Dashboard.vue
│   ├── administrator/Dashboard.vue
│   ├── coordinator/Dashboard.vue
│   ├── director/Dashboard.vue
│   └── network-manager/Dashboard.vue
│
├── router/index.js                          # Importa views dos módulos
├── App.vue
├── main.js
└── style.css
```

---

## <span class="material-symbols-outlined">link</span> Mapeamento de Imports (Router)

```javascript
// Módulo Calendário
const TeacherCalendar     = () => import('../modules/calendario/views/Calendar.vue')
const TeacherCalendarFigma = () => import('../modules/calendario/views/CalendarFigma.vue')

// Módulo Sistema de Ensino
const TeacherTrilhasAZ    = () => import('../modules/sistema-de-ensino/views/TrilhasAZ.vue')

// Views globais (continuam em views/)
const TeacherDashboard    = () => import('../views/teacher/Dashboard.vue')
```

---

## <span class="material-symbols-outlined">shuffle</span> Padrão de Imports nos Módulos

| Tipo de dependência | Padrão de import |
|---------------------|------------------|
| **Intra-módulo** (mesmo módulo) | Caminho relativo: `../components/EventDrawer.vue` |
| **Cross-módulo** (outro módulo) | Alias: `@/modules/calendario/components/ClassSelector.vue` |
| **Shared** (compartilhado) | Alias: `@/shared/components/Sidebar.vue` |
| **Assets** (imagens, ícones) | Alias: `@/assets/icons/icone_belinha.svg` |

---

## <span class="material-symbols-outlined">sync</span> Alternativas Consideradas

### Alternativa A: Manter tudo flat em `components/` (status quo)
*   **Contra**: Mistura de domínios, difícil saber o que pertence a cada módulo, alto risco de regressão cruzada.

### Alternativa B: Módulos por jornada com shared (escolhida <span class="material-symbols-outlined">check_circle</span>)
*   **Pró**: Isolamento por domínio, cada módulo é auto-contido, fácil onboarding, menor risco de regressão cruzada.
*   **Contra**: Mais pastas, imports mais longos (mitigado por barrel exports e alias `@`).

### Alternativa C: Monorepo com packages separados por módulo
*   **Contra**: Over-engineering para estágio de prototipação.

---

## <span class="material-symbols-outlined">warning</span> Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Imports quebrados após movimentação | 44 imports mapeados e corrigidos em 21 arquivos |
| Sidebar do Calendário sobrescrita | Restaurar via `git checkout v1.1 -- FrontOffice/src/shared/components/Sidebar.vue` |
| Arquivos antigos nas pastas originais | Remover após validação completa da compilação |
| Confusão sobre onde criar novos componentes | Consultar esta PDR e árvore de estrutura acima |

---

## <span class="material-symbols-outlined">edit_note</span> Notas de Migração (23/02/2026)

- **40 arquivos** movidos para `modules/calendario/`
- **5 arquivos** movidos para `modules/sistema-de-ensino/`
- **15 arquivos** movidos para `shared/`
- **44 imports** atualizados em **21 arquivos**
- **3 barrel exports** (`index.js`) criados para facilitar imports futuros
- Router atualizado para importar views dos módulos
- Arquivos antigos em `components/`, `composables/`, `data/` permanecem temporariamente até validação completa
