---
sidebar_position: 2
title: Calendário Unificado
description: Documentação de requisitos do Calendário Unificado para todas as personas
---

import { IconCheck, IconWarning, IconConstruction, PriorityHigh, PriorityMedium, PriorityLow } from '@site/src/components/StatusIcons';

# PRD: Calendário Unificado

Este documento detalha o funcionamento do **Calendário Unificado**, uma peça central da plataforma Educacross que consolida eventos, missões e atividades pedagógicas em uma interface única.

---

## <span class="material-symbols-outlined">assignment</span> Metadados

| Campo | Valor |
|-------|-------|
| **ID** | PRD-001 |
| **Título** | Calendário Unificado |
| **Autor** | Equipe de Produto |
| **Data de Criação** | 2026-02-12 |
| **Última Atualização** | 2026-02-12 |
| **Status** | <IconConstruction /> Em Desenvolvimento (Protótipo) |
| **Prioridade** | <PriorityHigh /> Alta |
| **Trimestre** | Q1 2026 |
| **Squad** | FrontOffice / Experiência do Professor |

---

## <span class="material-symbols-outlined">track_changes</span> 1. Contexto e Problema

### 1.1 Qual é o Problema?

Atualmente, as informações sobre atividades pedagógicas (missões, trilhas, avaliações) e eventos administrativos (reuniões, feriados) estão fragmentadas em diferentes áreas da plataforma ou fora dela.

**Dores identificadas:**
- Professores têm dificuldade em planejar a semana sem uma visão consolidada de prazos.
- Alunos perdem prazos de missões por falta de visibilidade centralizada.
- Gestores não conseguem visualizar a carga de atividades pedagógicas de uma escola de forma macro.

### 1.2 Para Quem é Este Problema?

**Personas afetadas:**
- [x] [Professor](../personas/professor.md)
- [x] [Aluno](../personas/aluno.md)
- [x] [Coordenador](../personas/coordinator.md)
- [x] [Diretor](../personas/director.md)
- [x] [Gestor de Rede](../personas/network-manager.md)
- [x] [Administrador](../personas/administrator.md)

### 1.3 Por Que Agora?

A centralização da jornada pedagógica em um calendário é o principal pedido de UX para aumentar a retenção diária (Stickiness) de professores e alunos, sendo um pilar fundamental para a Visão de Produto 2026.

---

## <span class="material-symbols-outlined">track_changes</span> 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivo da Feature

Criar uma interface única (Calendário Unificado) que permita a visualização de todos os eventos e atividades pedagógicas, diferenciando-os por categoria e origem de forma clara e intuitiva.

### 2.2 Métricas de Sucesso (KPIs)

| Métrica | Meta (TO-BE) |
|---------|--------------|
| **DAU (Daily Active Users) no Calendário** | > 60% da base ativa |
| **Tempo para encontrar uma atividade** | < 10 segundos |
| **Redução de suporte por "perda de prazo"** | -30% |
| **NPS específico da funcionalidade** | > 8.5 |

---

## <span class="material-symbols-outlined">palette</span> 3. Experiência do Usuário (UX)

### 3.1 Codificação de Cores e Ícones

Para facilitar a escaneabilidade, o calendário utiliza um sistema de cores por **Categoria** e ícones por **Origem**.

#### Cores por Categoria
- **Missões**: `#7F6CC3` (Roxo)
- **Olimpíadas**: `#8BC728` (Verde)
- **Avaliações**: `#FE5153` (Vermelho)
- **Trilhas**: `#00A5A0` (Ciano)
- **Expedições**: `#FFB443` (Laranja)
- **Lembretes/Feriados**: `#7CD7D3` (Azul Claro)

#### Ícones por Origem
- **Educacross**: `star` (Estrela)
- **Rede**: `hub` (Rede/Hub)
- **Escola**: `school` (Chapéu de Formatura)
- **Professor**: `person` (Pessoa)

---

## <span class="material-symbols-outlined">handyman</span> 4. Requisitos Funcionais

### 4.1 Visualizações (Views)
| Requisito | Descrição | Status |
|-----------|-----------|--------|
| **Visão Mensal** | Grade 7x5 padrão para planejamento macro. | <span class="material-symbols-outlined">check_circle</span> Protótipo |
| **Visão Semanal** | Timeline vertical de horários para rotina diária. | <span class="material-symbols-outlined">check_circle</span> Protótipo |
| **Visão Diária** | Detalhamento de compromissos do dia. | <span class="material-symbols-outlined">check_circle</span> Protótipo |
| **Visão Lista** | Agenda corrida, ideal para dispositivos mobile. | <span class="material-symbols-outlined">check_circle</span> Protótipo |

### 4.2 Gestão de Eventos
- [ ] **Criação de Eventos**: Professores e Gestores podem criar eventos manuais.
- [ ] **Edição**: Alteração de horários via Drag-and-Drop.
- [ ] **Filtros**: Filtragem dinâmica por categoria (ex: ver apenas avaliações).
- [ ] **Deeplink**: Ao clicar em uma missão, o usuário é levado diretamente para a execução/gestão da mesma.

---

## <span class="material-symbols-outlined">folder_open</span> 5. Especificação Técnica (Resumo)

### 5.1 Arquitetura
O calendário segue o padrão de **Atomic Design**, sendo composto por:
- **Atoms**: `CalendarChip.vue`, `StatusBadge.vue`.
- **Molecules**: `CalendarHeader.vue`, `WeekRow.vue`.
- **Organisms**: `MonthView.vue`, `EventDrawer.vue`.
- **Templates**: `CalendarTemplate.vue`.

### 5.2 Estrutura de Dados
Os eventos seguem o schema definido no projeto frontoffice, garantindo que a origem (`origin_level`) dite o ícone e a categoria (`category`) dite a cor.

---

## <span class="material-symbols-outlined">trending_up</span> 6. Roadmap e Próximos Passos

1. **Fase 1 (Atual)**: Prototipagem de UI e fluxos de navegação.
2. **Fase 2**: Integração com API real de missões e avaliações.
3. **Fase 3**: Implementação de sistema de notificações integrado ao calendário.
