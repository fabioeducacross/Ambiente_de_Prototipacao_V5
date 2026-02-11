# Branch: feature/calendar-v0.1 📅

> **Branch dedicada ao desenvolvimento e documentação do módulo de Calendário Educacross**  
> **Data de Criação**: 11 de Fevereiro de 2026  
> **Status**: 🟢 Ativa - Desenvolvimento em Andamento

---

## 🎯 Propósito da Branch

Esta branch foi criada para centralizar todo o desenvolvimento, documentação e iterações relacionadas ao **módulo de Calendário** da plataforma Educacross, seguindo uma abordagem incremental e organizada por sprints.

### Objetivos
- ✅ Documentar jornadas de todos os perfis de usuário (6 personas)
- ✅ Implementar features incrementalmente (Sprint 1 → Sprint 6)
- ✅ Manter histórico claro de decisões de design e arquitetura
- ✅ Facilitar revisões e handoffs entre sprints
- ✅ Isolar trabalho do calendário de outras features

---

## 📦 Conteúdo Atual

### Documentação (3 arquivos)

1. **CALENDAR-USER-JOURNEYS.md** (883 linhas)
   - Matriz de permissões completa por perfil
   - 23 casos de uso documentados (UC-01 a UC-23)
   - 6 personas com jornadas detalhadas
   - Roadmap de 6 sprints
   - Esclarece arquitetura: calendário como VIEW agregada

2. **CALENDAR-FEATURE-ANALYSIS.md** (338 linhas)
   - Análise técnica da feature
   - Componentes e dependências
   - Decisões de arquitetura

3. **HANDOFF-Calendar-SPRINT1-20260211.zip** (115 KB)
   - Pacote de entrega do Sprint 1
   - Componentes completos
   - Documentação técnica
   - Screenshots e evidências

### Componentes Atomic Design (27 arquivos)

#### Atoms (8 componentes)
- `Checkbox.vue` - Checkbox com label customizável
- `DateCellLarge.vue` - Célula de data grande para Month View
- `DayCell.vue` - Célula de dia do mini calendário
- `LegendDot.vue` - Ponto colorido da legenda
- `NavigationButton.vue` - Botão de navegação (← →)
- `ViewToggleButton.vue` - Botão individual do toggle de views
- `WeekdayLabel.vue` - Label de dia da semana (Dom, Seg, Ter...)

#### Molecules (8 componentes)
- `CalendarDaysHeader.vue` - Header com dias da semana
- `CalendarHeader.vue` - Header genérico
- `CalendarMonthHeader.vue` - Header do mês com navegação e toggle
- `CheckboxGroup.vue` - Grupo de checkboxes para filtros
- `LegendItem.vue` - Item individual da legenda
- `ViewToggleGroup.vue` - Grupo de botões de toggle (Mês/Semana/Dia)
- `WeekRow.vue` - Linha de semana do mini calendário
- `WeekdaysRow.vue` - Linha com labels de dias da semana

#### Organisms (4 componentes)
- `CalendarSidebar.vue` - Sidebar completa (mini cal + filtros)
- `DayViewGrid.vue` - Grid de view Dia (604 linhas)
- `MonthViewGrid.vue` - Grid de view Mês (287 linhas)
- `WeekViewGrid.vue` - Grid de view Semana (524 linhas)

#### Templates (1 componente)
- `CalendarLayoutTemplate.vue` - Layout principal do calendário (316 linhas)

### Views

- `Calendar.vue` (Teacher) - View principal do professor (refatorada de 461 para componentes)

---

## 🚀 Status de Implementação

### ✅ Sprint 1 - Calendário do Professor (COMPLETO)
**Status**: 100% implementado e validado  
**Data de Conclusão**: 11/02/2026

#### Funcionalidades Entregues
- [x] Multi-view funcional (Mês/Semana/Dia)
- [x] Navegação entre views (botões toggle)
- [x] Navegação temporal (← mês anterior / próximo →)
- [x] EventDrawer com CRUD completo
- [x] Filtro de turmas (dropdown)
- [x] Filtro de tipos de atividade (checkboxes coloridos)
- [x] Mini calendário lateral para navegação rápida
- [x] Eventos com cores por tipo de atividade
- [x] Responsividade (desktop/tablet/mobile)

#### Bug Fixes Aplicados
- [x] Botão "Hoje" removido (simplificação de UX)
- [x] Typo "Seb" → "Sab" corrigido em 5 arquivos

#### Componentes Criados
- 27 componentes Atomic Design (8 atoms + 8 molecules + 4 organisms + 1 template)

#### Métricas
- **Linhas de Código**: 4.843 linhas adicionadas
- **Arquivos Modificados**: 27 arquivos
- **Cobertura de Testes**: Pendente (Sprint 2)
- **Validação**: ✅ Browser validation (0 errors)

---

### 🟡 Sprint 2 - Calendário do Aluno (PLANEJADO)
**Status**: Documentado, não implementado  
**Previsão**: 2 semanas após aprovação

#### Funcionalidades Planejadas
- [ ] Rota `/student/calendar`
- [ ] View read-only (sem criar/editar eventos)
- [ ] Filtro automático por turmas do aluno
- [ ] Badges de status em missões (Pendente/Concluída)
- [ ] Botão "Acessar Missão" em eventos de missão
- [ ] Exportar para iCal/Google Calendar
- [ ] Notificações de lembretes

#### Casos de Uso
- UC-07: Visualizar Calendário de Aulas
- UC-08: Ver Detalhes de Missão (read-only)
- UC-09: Exportar Calendário Pessoal
- UC-10: Receber Lembrete de Prazo

---

### 🟡 Sprint 3 - Calendário do Coordenador (PLANEJADO)
**Status**: Documentado, não implementado  
**Previsão**: 3 semanas

#### Funcionalidades Planejadas
- [ ] Rota `/coordinator/calendar`
- [ ] Filtro "Ver Calendário de" (dropdown professores)
- [ ] Criar eventos institucionais (origem: 'escola')
- [ ] Heatmap de densidade de avaliações
- [ ] Exportar relatório Excel consolidado
- [ ] Dashboard com métricas por professor

#### Casos de Uso
- UC-11: Criar Evento Institucional
- UC-12: Monitorar Calendário de Professor
- UC-13: Validar Densidade de Avaliações
- UC-14: Exportar Relatório Mensal

---

### 🟡 Sprint 4 - Calendário do Diretor (PLANEJADO)
**Previsão**: 2 semanas

#### Funcionalidades Planejadas
- [ ] Dashboard executivo com métricas agregadas
- [ ] Workflow de aprovação de eventos de alto impacto
- [ ] Exportar calendário anual em PDF

---

### 🟡 Sprint 5 - Gestor de Rede (PLANEJADO)
**Previsão**: 3 semanas

#### Funcionalidades Planejadas
- [ ] Comparativo de escolas (split-screen)
- [ ] Criar eventos da rede (propagar para todas escolas)
- [ ] Relatório de conformidade

---

### 🟡 Sprint 6 - Administrador (PLANEJADO)
**Previsão**: 2 semanas

#### Funcionalidades Planejadas
- [ ] Auditoria de logs
- [ ] Gestão de tipos de atividade
- [ ] Restore de eventos deletados

---

## 📊 Estatísticas da Branch

### Commits
- **Total**: 2 commits
- **Commit 1**: `docs: adiciona documentação completa de jornadas de usuários do calendário (v0.1)`
  - 20 arquivos alterados
  - 2.580 linhas adicionadas
  - 389 linhas removidas
- **Commit 2**: `feat: adiciona componentes organisms/templates e handoff Sprint 1`
  - 7 arquivos alterados
  - 2.263 linhas adicionadas

### Totais Acumulados
- **Arquivos**: 27 arquivos novos/modificados
- **Linhas**: 4.843 linhas adicionadas
- **Documentação**: 1.221 linhas (3 documentos)
- **Código**: 3.622 linhas (24 componentes)

---

## 🎨 Arquitetura do Calendário

### Princípio: VIEW Agregada

⚠️ **IMPORTANTE**: O calendário é uma **VIEW AGREGADA**. Ele **NÃO cria** objetos de outros módulos.

#### Fluxo de Dados

```
┌─────────────────┐
│ Módulo Missões  │──┐
└─────────────────┘  │
                      │
┌─────────────────┐  │    ┌──────────────────┐
│ Módulo Avalia.  │──┼───►│   CALENDÁRIO     │
└─────────────────┘  │    │  (VIEW AGREGADA) │
                      │    └──────────────────┘
┌─────────────────┐  │              ▲
│ Módulo Olimp.   │──┘              │
└─────────────────┘                 │
                              Cria eventos
                              genéricos aqui
```

### Tipos de Eventos

| Tipo | Origem | Criado Em | Editável no Calendário |
|---|---|---|:---:|
| **Missão** | `missao` | Módulo de Missões | ❌ Read-only |
| **Avaliação** | `avaliacao` | Módulo de Avaliações | ❌ Read-only |
| **Olimpíada** | `olimpiada` | Módulo de Olimpíadas | ❌ Read-only |
| **Evento Escola** | `escola` | Coordenação/Direção | ✅ Por coordenador |
| **Evento Genérico** | `professor` | Diretamente no Calendário | ✅ CRUD completo |

### Exemplos de Eventos Genéricos

✅ **Válidos** (criados no calendário):
- "Revisão extra de Matemática"
- "Atendimento individual - Aluno João"
- "Plantão de dúvidas"
- "Ensaio de apresentação"

❌ **Inválidos** (usar módulos específicos):
- "Missão: Projeto de Ciências" → Criar no módulo de Missões
- "Avaliação: Prova de História" → Criar no módulo de Avaliações
- "Olimpíada de Matemática" → Inscrever no módulo de Olimpíadas

---

## 🔄 Workflow de Desenvolvimento

### Fluxo de Trabalho nesta Branch

1. **Documentar** antes de implementar
   - Casos de uso
   - Permissões
   - Fluxos de interação

2. **Implementar** incrementalmente por sprint
   - Atomic Design (bottom-up)
   - Componentes testáveis e reutilizáveis

3. **Validar** em browser com Playwright
   - Zero erros de console
   - Screenshots de evidência

4. **Documentar** entrega
   - Handoff package (.zip)
   - Análise técnica
   - Decisões de arquitetura

5. **Commitar** com mensagens descritivas
   - Tipo: `docs:`, `feat:`, `fix:`, `refactor:`
   - Descrição clara do que foi feito

### Branch Protection

⚠️ **Esta branch não deve receber merges de outras features não relacionadas ao calendário.**

Para trabalhar em outras features, crie branches separadas:
- `feature/missoes-v1`
- `feature/avaliacoes-v1`
- `feature/dashboard-analytics`

---

## 📚 Documentos de Referência

### Internos (nesta branch)
- [CALENDAR-USER-JOURNEYS.md](./docs/CALENDAR-USER-JOURNEYS.md) - Jornadas de usuários
- [CALENDAR-FEATURE-ANALYSIS.md](./CALENDAR-FEATURE-ANALYSIS.md) - Análise técnica
- [HANDOFF-Calendar-SPRINT1-20260211.zip](./HANDOFF-Calendar-SPRINT1-20260211.zip) - Pacote Sprint 1

### Externos (outras pastas)
- `documentation/docs/journeys/teacher/calendar.md` - Especificação original (883 linhas)
- `.github/copilot-instructions.md` - Guia de desenvolvimento

### Design System
- [Figma - Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- Paleta de cores: `--primary`, `--success`, `--warning`, `--danger`
- Bootstrap Icons via CDN

---

## 🚦 Próximos Passos

### Imediato (Esta Sessão)
- [x] Criar branch `feature/calendar-v0.1`
- [x] Commitar documentação de jornadas
- [x] Commitar componentes Atomic Design
- [x] Commitar handoff Sprint 1
- [x] Criar README da branch

### Sprint 2 (Próxima Iteração)
- [ ] Implementar calendário do Aluno (read-only)
- [ ] Criar rota `/student/calendar`
- [ ] Filtrar eventos por turmas do aluno
- [ ] Badges de status em missões
- [ ] Exportar para Google Calendar
- [ ] Testes E2E com Playwright

---

## 📞 Contatos

**Product Owner**: Isabella Cross (isabella@educacross.com)  
**Tech Lead**: Carlos Tech (carlos@educacross.com)  
**UX Designer**: Maria Design (maria@educacross.com)

---

**Branch criada em**: 11/02/2026  
**Última atualização**: 11/02/2026  
**Commits**: 2  
**Arquivos**: 27  
**Linhas**: 4.843+
