# Análise Comparativa: Calendário Atual vs Vuexy Reference

## 📊 Status Geral

**Data da análise:** 11 de fevereiro de 2026  
**Referência:** https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/apps/calendar

---

## ✅ Funcionalidades JÁ IMPLEMENTADAS

### 1. **Sidebar com Filtros** ✅
- ✅ Botão "Adicionar Evento"
- ✅ Mini calendário para navegação
- ✅ Checkboxes de categorias (Missões, Olimpíadas, Avaliações, Trilhas, Expedições)
- ✅ Filtro funcional (eventos filtrados por categoria)

### 2. **Grid do Calendário** ✅
- ✅ Visualização mensal
- ✅ Eventos com cores por categoria
- ✅ Navegação mês anterior/próximo
- ✅ Header com dias da semana
- ✅ Indicador de dia atual (today)
- ✅ Layout responsivo

### 3. **Eventos** ✅
- ✅ Renderização de eventos nas células
- ✅ Cores distintas por tipo de atividade
- ✅ Click em evento abre drawer de detalhes
- ✅ Click em dia vazio abre drawer para criar evento
- ✅ Data de início e fim

### 4. **Drawer de Evento** ✅
- ✅ Formulário completo (título, atividade, turmas, datas)
- ✅ Validação de campos
- ✅ Modo criação/edição
- ✅ Botões Salvar/Cancelar

### 5. **Layout e Design** ✅
- ✅ Container com shadow (Figma matching)
- ✅ Navbar fixo
- ✅ Sidebar fixa
- ✅ Design System Vuexy (cores, tipografia, spacing)

---

## ❌ Funcionalidades FALTANDO (Vuexy tem)

### 1. **Multi-View (Week/Day/List)** ❌ CRÍTICO
**Status:** Só temos Month view  
**Vuexy tem:** 
- Botões toggle: Month / Week / Day
- Week view: grade horária 00:00-23:00 com eventos posicionados
- Day view: dia único com grade horária
- List view (menos comum, mas útil)

**Impacto:** Alto - usuários podem preferir diferentes visualizações

**Implementação necessária:**
- Criar `WeekViewGrid.vue` (organism)
- Criar `DayViewGrid.vue` (organism)
- Criar `ListView.vue` (organism)
- Adicionar toggle de view no `CalendarMonthHeader`
- Implementar lógica de mudança de view no `CalendarLayoutTemplate`

---

### 2. **Drag and Drop de Eventos** ❌ CRÍTICO
**Status:** Eventos são estáticos  
**Vuexy tem:** 
- Arrastar evento para outro dia
- Feedback visual durante drag
- Drop atualiza automaticamente a data

**Impacto:** Alto - melhora drasticamente UX para reagendar

**Implementação necessária:**
- Adicionar `draggable="true"` nos eventos
- Handlers: `@dragstart`, `@dragover`, `@drop`
- Atualizar estado do evento após drop
- Visual feedback (cursor, opacity)

**Tecnologias possíveis:**
- Native HTML5 Drag & Drop API
- Biblioteca: `@vueuse/core` (useDraggable)
- FullCalendar.js (mais pesado, mas completo)

---

### 3. **Resize de Eventos** ❌ MÉDIO
**Status:** Duração de evento é fixa  
**Vuexy tem:** 
- Handles (alças) no topo/bottom do evento
- Arrastar alça altera duração
- Feedback visual

**Impacto:** Médio - útil para ajustar duração rapidamente

**Implementação necessária:**
- Adicionar handles de resize (`<div class="resize-handle">`)
- Detectar mousedown/mousemove/mouseup
- Calcular nova data de fim baseado na posição do mouse
- Atualizar evento

**Complexidade:** Média-Alta (requer matemática de posicionamento)

---

### 4. **Indicador "+X more"** ❌ IMPORTANTE
**Status:** Não temos limite de eventos por célula  
**Vuexy tem:** 
- Mostra primeiros 2-3 eventos
- Se houver mais, exibe "+2 more"
- Click em "+X more" expande ou abre modal

**Impacto:** Alto - evita overflow visual em dias com muitos eventos

**Implementação necessária:**
- Em `DateCellLarge.vue`: limitar eventos visíveis (prop `maxVisibleEvents`)
- Calcular quantos eventos sobraram
- Renderizar `<div class="more-events">+{{ remaining }} more</div>`
- Click em "+X more" pode abrir popover ou expandir célula

**Já temos:** Prop `maxVisibleEvents` declarada mas não implementada!

---

### 5. **Horário nos Eventos** ❌ IMPORTANTE
**Status:** Eventos não mostram horário  
**Vuexy tem:** 
- "12:38p Design Review"
- Formato 12h com am/pm

**Impacto:** Médio-Alto - contexto temporal é essencial

**Implementação necessária:**
- Adicionar campo `horaInicio` nos eventos (JSON)
- Em `DateCellLarge.vue`: renderizar horário se existir
- Formato: `HH:MM` ou `h:mma` (ex: "2:30p")

**Já temos parcial:** JSON tem campos `horaInicio`/`horaFim` mas não renderiza

---

### 6. **Botão "Hoje"** ❌ FÁCIL
**Status:** Navegação só com setas  
**Vuexy tem:** 
- Botão "Today" entre setas < >
- Click volta para mês atual

**Impacto:** Baixo mas melhora UX

**Implementação necessária:**
- Adicionar botão "Hoje" no `CalendarMonthHeader`
- Emit `@today`
- No parent: `currentDate = new Date()`

---

### 7. **Popover de Detalhes Rápidos** ❌ OPCIONAL
**Status:** Click abre drawer (pesado)  
**Vuexy tem:** 
- Hover ou click mostra popover com resumo
- Botões rápidos: Edit / Delete no popover

**Impacto:** Baixo - drawer funciona bem

**Implementação necessária:**
- Criar `EventPopover.vue`
- Detectar hover/click
- Posicionar popover próximo ao evento
- Botões: "Ver detalhes" (abre drawer) / "Deletar"

---

### 8. **All Day Events** ❌ MÉDIO
**Status:** Eventos com horário específico  
**Vuexy tem:** 
- Checkbox "All day" no drawer
- Eventos all-day aparecem no topo da célula (diferentes de horários)

**Impacto:** Médio - útil para feriados, aniversários

**Implementação necessária:**
- Adicionar campo `allDay: boolean` nos eventos
- Checkbox no `EventDrawer`
- Renderizar eventos all-day no topo da célula (sem horário)
- CSS diferenciado (mais baixo, background diferente)

---

### 9. **Guest/Convidados** ❌ BAIXO
**Status:** Não temos  
**Vuexy tem:** 
- Campo "Guests" no drawer (emails separados por vírgula)
- Útil para reuniões/eventos compartilhados

**Impacto:** Baixo para contexto educacional

---

### 10. **Location** ❌ BAIXO
**Status:** Não temos  
**Vuexy tem:** 
- Campo "Location" (Local do evento)

**Impacto:** Baixo - pode ser substituído por "Sala"

---

### 11. **Description** ❌ MÉDIO
**Status:** Não temos campo de descrição  
**Vuexy tem:** 
- Textarea "Description" no drawer

**Impacto:** Médio - útil para contexto adicional

**Implementação necessária:**
- Adicionar `<textarea>` no `EventDrawer.vue`
- Campo `descricao` no JSON

---

## 🎯 Priorização de Implementação

### 🔴 PRIORIDADE ALTA (Implementar AGORA)
1. **Indicador "+X more"** - Já temos estrutura, fácil implementar ⚡
2. **Botão "Hoje"** - Simples, melhora UX ⚡
3. **Horário nos eventos** - Dados já existem no JSON ⚡
4. **Multi-view (Week/Day)** - Feature crítica mas complexa 🔨
5. **Deletar evento** - Botão já existe no drawer, falta lógica 🔨

### 🟡 PRIORIDADE MÉDIA (Próxima sprint)
6. **Drag and Drop** - UX excelente mas complexo 🚀
7. **All Day Events** - Útil para feriados/eventos especiais
8. **Campo Description** - Contexto adicional

### 🟢 PRIORIDADE BAIXA (Backlog)
9. **Resize de eventos** - Menos usado que drag
10. **Popover de detalhes** - Drawer funciona bem
11. **Guest/Location** - Menos relevante para contexto educacional

---

## 📦 Dependências Recomendadas

### Opção 1: Implementação Nativa (Recomendado)
- ✅ Sem dependências externas
- ✅ Controle total
- ❌ Mais trabalho manual

### Opção 2: FullCalendar + Wrapper Vue
```bash
npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
```
- ✅ Drag/drop/resize grátis
- ✅ Multi-view incluso
- ❌ Pesado (~300KB)
- ❌ Menos controle de design

### Opção 3: VueUse (Hybrid)
```bash
npm install @vueuse/core
```
- ✅ Composables prontos (`useDraggable`, `useDropZone`)
- ✅ Leve (~50KB)
- ✅ Mantém controle de design

**Recomendação final:** Opção 3 (VueUse) para drag/drop + implementação nativa para o resto

---

## 🚀 Plano de Execução

### Sprint 1 (Rápida - 2-3h)
- [ ] Implementar "+X more" indicator
- [ ] Adicionar botão "Hoje"
- [ ] Mostrar horário nos eventos
- [ ] Adicionar botão Delete no drawer

### Sprint 2 (Média - 1 dia)
- [ ] Criar WeekViewGrid.vue
- [ ] Criar DayViewGrid.vue
- [ ] Toggle de views no header
- [ ] Lógica de mudança de view

### Sprint 3 (Complexa - 2 dias)
- [ ] Implementar Drag and Drop com VueUse
- [ ] Visual feedback durante drag
- [ ] Atualização de eventos após drop
- [ ] Testes de UX

### Sprint 4 (Refinamento - 1 dia)
- [ ] All Day Events
- [ ] Campo Description
- [ ] Testes finais
- [ ] Atualizar handoff ZIP

---

## 📸 Screenshots de Referência

**Vuexy Calendar:**
- Arquivo salvo: `vuexy-calendar-reference.png`
- Multi-view toggle visível
- "+2 more" indicator presente
- Eventos com horário (ex: "12:38p Design Review")
- Drag handles visíveis

**Nosso Calendar Atual:**
- Container com shadow ✅
- Sidebar fixa ✅
- Filtros funcionais ✅
- Falta: multi-view, drag/drop, "+X more"

---

## 🎨 Design System Already Matching

✅ Cores Vuexy (primary, success, warning, danger, info)  
✅ Tipografia (Montserrat/Inter)  
✅ Box-shadow: `0px 3px 12px rgba(47, 43, 61, 0.14)`  
✅ Border-radius: 6px  
✅ Spacing system (2rem, 1rem, 0.5rem)

---

## 📝 Notas Técnicas

1. **FullCalendar** seria mais rápido mas menos customizável
2. **VueUse** oferece melhor balance (performance + controle)
3. **Drag & Drop nativo** é viável mas trabalhoso
4. Week/Day views precisam de **grade horária** (00:00-23:00)
5. Eventos podem ser **multi-dia** (span columns)

---

**Decisão:** Começar com Sprint 1 (implementações rápidas) para validar com usuário, depois avançar para multi-view e drag/drop.
