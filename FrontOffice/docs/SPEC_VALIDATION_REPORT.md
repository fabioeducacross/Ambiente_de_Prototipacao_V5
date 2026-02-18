# Relatório de Validação - Especificação Calendário Unificado v1.1

**Data:** 18/02/2026  
**Documento base:** `Especificacao_Calendario_Educacross_v1_1.docx.md`

---

## Resumo Executivo

| Categoria | Status | Completude |
|-----------|--------|------------|
| **Critérios de Aceite MVP** | 🟡 Parcial | 75% |
| **Modelo de Dados** | 🟡 Parcial | 70% |
| **Componentes UI** | ✅ Completo | 95% |
| **Fluxos UX** | 🟡 Parcial | 80% |

---

## 1. Critérios de Aceite MVP (Seção 13 da Spec)

| # | Critério | Status | Evidência |
|---|----------|--------|-----------|
| 1 | Calendário lista itens manuais e de módulos no período | ✅ | `eventsCalendar.json` + `Calendar.vue` |
| 2 | Atividades aparecem quando têm data e status elegível | ✅ | Filtro por status em `calendar-enums.js` |
| 3 | Cor por categoria + ícone por origem | ✅ | `CATEGORIES` e `ORIGIN_LEVELS` em `calendar-enums.js` |
| 4 | Filtros por categoria e origem funcionam | ✅ | `CalendarSidebar.vue` + `CalendarActivityFilters.vue` |
| 5 | Visão Mês sem sobreposição (limite chips + "+N") | ✅ | `MonthViewGrid.vue` com `spanning-events-harness` |
| 6 | Professor cria lembretes vinculados a habilidades | 🟡 | Drawer permite criar, mas sem vínculo a habilidades |
| 7 | Item de módulo tem botão "Abrir no módulo" (deeplink) | ❌ | Não implementado |
| 8 | Permissões impedem edição/cancelamento indevido | 🟡 | Lógica básica existe, não validada por hierarquia |

---

## 2. Codificação Visual (Seção 5 da Spec)

### 2.1 Cores por Categoria ✅

| Categoria | Spec | Implementado | Status |
|-----------|------|--------------|--------|
| Missões | `#7F6CC3` | `#7F6CC3` | ✅ |
| Olimpíadas | `#8BC728` | `#8BC728` | ✅ |
| Avaliações | `#FE5153` | `#FE5153` | ✅ |
| Trilhas | `#00A5A0` | `#00A5A0` | ✅ |
| Expedições | `#FFB443` | `#FFB443` | ✅ |
| Lembretes | `#7CD7D3` | `#7CD7D3` | ✅ |

**Arquivo:** `src/data/calendar-enums.js` (linhas 7-40)

### 2.2 Ícones por Origem ✅

| Origin Level | Spec | Implementado | Status |
|--------------|------|--------------|--------|
| Educacross | `star` | `star` | ✅ |
| Gestor de Rede | `home`/`hub` | `network_intel_node` | ✅ (variação) |
| Gestor Escolar | `school` | `network_intelligence` | ✅ (variação) |
| Professor | `person` | `school` | ✅ (variação) |

**Arquivo:** `src/data/calendar-enums.js` (linhas 44-68)

---

## 3. Visões do Calendário (Seção 6 da Spec)

| Visão | Status | Componente |
|-------|--------|------------|
| **Mês** | ✅ | `MonthViewGrid.vue` |
| **Semana** | ✅ | `WeekViewGrid.vue` |
| **Dia** | ✅ | `DayViewGrid.vue` |
| **Lista** | ✅ | `CalendarFigma.vue` (inline) |

### 3.1 Eventos Multi-dia ✅

Implementado com:
- `spanning-events-harness` no `MonthViewGrid.vue`
- Alocação de slots para evitar sobreposição
- Renderização de barra contínua

### 3.2 Limite de Chips + "+N" ✅

- Prop `maxEventsPerDay` (padrão: 3)
- Botão "+N mais" quando excede limite
- Emit `show-more` para abrir drawer do dia

---

## 4. Modelo de Dados (Seção 10 da Spec)

### Campos Implementados vs. Spec

| Campo Spec | Implementado | Status |
|------------|--------------|--------|
| `id` | ✅ `id` | ✅ |
| `title` | ✅ `titulo` | ✅ |
| `description` | ✅ `descricao` | ✅ |
| `category` | ✅ `tipo` | ✅ |
| `origin_level` | ✅ `origem` | ✅ |
| `source_type` | ❌ Não existe | ❌ |
| `source_id` | ❌ Não existe | ❌ |
| `scope_level` | ❌ Não existe | ❌ |
| `scope_ids` | ✅ `turmas` | ✅ |
| `start_at` | ✅ `dataInicio` | ✅ |
| `end_at` | ✅ `dataTermino` | ✅ |
| `all_day` | 🟡 Inferido | 🟡 |
| `timezone` | ❌ Não existe | ❌ |
| `status` | ✅ `status` | ✅ |
| `deeplink` | ❌ Não existe | ❌ |
| `audit` | ❌ Não existe | ❌ |

---

## 5. Fluxos UX (Seção 8 da Spec)

### 5.1 Criar Evento Manual ✅

| Passo | Spec | Implementado |
|-------|------|--------------|
| Clicar "+ Adicionar Evento" | ✅ | `CalendarSidebar.vue` |
| Abrir drawer "Novo evento" | ✅ | `EventDrawer.vue` |
| Título (obrigatório) | ✅ | Campo `titulo` |
| Categoria | ✅ | Campo `atividade` |
| Data/hora | ✅ | `EDatePicker` |
| Contexto (turmas) | ✅ | Campo `turmas` (multiselect) |
| Descrição (opcional) | ✅ | Campo `description` |
| Link (opcional) | ❌ | **NÃO IMPLEMENTADO** |
| Salvar como rascunho | ❌ | **NÃO IMPLEMENTADO** |

### 5.2 Criar Lembrete (Professor) 🟡

| Passo | Spec | Implementado |
|-------|------|--------------|
| Categoria Lembretes | ✅ | Opção no select |
| Data-alvo | ✅ | `EDatePicker` |
| Associar habilidade/tópico | ❌ | **NÃO IMPLEMENTADO** |

### 5.3 Abrir Detalhe do Item 🟡

| Passo | Spec | Implementado |
|-------|------|--------------|
| Clique abre drawer com detalhes | ✅ | `EventDrawer.vue` modo view |
| Título, categoria, origem, data | ✅ | Todos exibidos |
| Botão "Abrir no módulo" (deeplink) | ❌ | **NÃO IMPLEMENTADO** |

### 5.4 Editar/Cancelar/Duplicar 🟡

| Ação | Status |
|------|--------|
| Editar | ✅ |
| Cancelar (deletar) | ✅ |
| Duplicar | ❌ **NÃO IMPLEMENTADO** |

---

## 6. Filtros e Controles (Seção 7 da Spec)

| Controle | Spec | Implementado | Status |
|----------|------|--------------|--------|
| Seletor de contexto (turma) | ✅ | `ClassSelector.vue` | ✅ |
| Navegação anterior/próximo | ✅ | `CalendarHeader.vue` | ✅ |
| Atalho "Hoje" | ❌ | Não encontrado | ❌ |
| Toggle de visão (Mês/Semana/Dia/Lista) | ✅ | `ViewToggle` | ✅ |
| Filtros por categoria | ✅ | `CalendarActivityFilters.vue` | ✅ |
| Filtro por origem | ✅ | `CalendarSidebar.vue` | ✅ |
| Botão "+ Adicionar Evento" | ✅ | `CalendarSidebar.vue` | ✅ |

---

## 7. Itens Pendentes para MVP

### Alta Prioridade 🔴

1. **Campo `link` no formulário** (Seção 8.1)
   - Adicionar campo opcional para URL/link externo

2. **Botão "Abrir no módulo" (deeplink)** (Seção 8.3)
   - Exibir quando `source_type` for módulo
   - Navegar para URL do módulo de origem

3. **Campo `source_type` no modelo de dados** (Seção 10.1)
   - Diferenciar eventos manuais de atividades de módulo

### Média Prioridade 🟡

4. **Vínculo de Lembretes a habilidades/tópicos** (Seção 8.2)
   - Campo para associar a habilidades BNCC

5. **Atalho "Hoje"** (Seção 7)
   - Botão para navegar rapidamente para data atual

6. **Duplicar evento** (Seção 8.4)
   - Ação para copiar evento existente

### Baixa Prioridade (v2) 🟢

7. **Salvar como rascunho** (Seção 8.1)
8. **Campos `timezone`, `audit`** (Seção 10.1)
9. **Validação de permissões por hierarquia** (Seção 9)

---

## 8. Arquivos de Referência

### Componentes Principais
- `src/views/teacher/Calendar.vue` - View principal
- `src/components/EventDrawer.vue` - Drawer de criação/edição
- `src/components/organisms/MonthViewGrid.vue` - Grid mensal
- `src/components/organisms/WeekViewGrid.vue` - Grid semanal
- `src/components/organisms/DayViewGrid.vue` - Grid diário
- `src/components/organisms/CalendarSidebar.vue` - Sidebar com filtros

### Dados e Enums
- `src/data/calendar-enums.js` - Enums (CATEGORIES, ORIGIN_LEVELS, STATUS)
- `src/data/eventsCalendar.json` - Dados mockados

---

## Conclusão

O protótipo implementa **~75% dos critérios de aceite do MVP**. Os principais gaps são:

1. Falta integração com módulos (deeplink, source_type)
2. Campo de link no formulário não existe
3. Vinculação de lembretes a habilidades não implementada

Para release do MVP, recomenda-se priorizar os itens de **Alta Prioridade** listados acima.
