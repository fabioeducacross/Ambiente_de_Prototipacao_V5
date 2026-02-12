# 📦 Inventário Completo de Componentes - Calendário Educacional

**Data**: 11 de fevereiro de 2026  
**Total de componentes**: 21 + 3 suporte = **24 arquivos**  
**Total de linhas**: 2.080 linhas  

---

## 🔢 Métricas por Camada

| Camada | Componentes | Linhas Totais | Média por Componente |
|--------|-------------|---------------|---------------------|
| **Atoms** | 7 | 730 | 104 linhas |
| **Molecules** | 8 | 577 | 72 linhas |
| **Organisms** | 3 | 521 | 174 linhas |
| **Templates** | 1 | 224 | 224 linhas |
| **Support** | 3 | ~400 | ~133 linhas |
| **View** | 1 | 178 | 178 linhas |
| **TOTAL** | **23** | **2.630** | **114 linhas** |

---

## 🎯 Atoms (7 componentes - 730 linhas)

### 1. Checkbox.vue (110 linhas)
**Responsabilidade**: Checkbox customizado com estilo Vuexy  
**Props**:
- `modelValue` (Boolean): Estado do checkbox
- `label` (String): Label do checkbox
- `disabled` (Boolean): Desabilitar checkbox

**Emits**: `update:modelValue`

**Características**:
- Material Symbols icon (check)
- Tamanho: 18x18px
- Cor ativa: #7367F0 (roxo)
- Hover effect
- Acessibilidade (aria-checked)

---

### 2. DateCellLarge.vue (157 linhas)
**Responsabilidade**: Célula de data grande para grid mensal  
**Props**:
- `date` (Number): Dia do mês (1-31)
- `month` (Number): Mês (0-11)
- `year` (Number): Ano
- `isToday` (Boolean): Se é o dia atual
- `isOtherMonth` (Boolean): Se pertence a outro mês
- `isDisabled` (Boolean): Se está desabilitado
- `events` (Array): Eventos do dia
- `maxVisibleEvents` (Number, default: 3): Máximo de eventos visíveis

**Emits**: 
- `click` (date object)
- `event-click` (event object)

**Características**:
- Min-height: 125px
- Exibe até 3 eventos (configurável)
- Indicador "+X mais eventos" se houver mais eventos
- Hover effect com elevação
- Cor de fundo diferente para outros meses
- Border roxo para dia atual

---

### 3. ViewToggleButton.vue (98 linhas)
**Responsabilidade**: Botão individual de toggle de visualização  
**Props**:
- `label` (String, required): Label do botão (Mês/Semana/Dia/Lista)
- `active` (Boolean): Se está ativo
- `size` (String, default: 'medium'): small | medium | large

**Emits**: `click`

**Características**:
- Background roxo quando ativo: rgba(115, 103, 240, 0.24)
- Texto roxo: #7367F0
- 3 tamanhos: small (12px), medium (15px), large (18px)
- Transição suave (0.2s)
- Hover effect

---

### 4. DayCell.vue (165 linhas)
**Responsabilidade**: Célula pequena de dia para mini calendário  
**Props**:
- `date` (Number): Dia do mês
- `month` (Number): Mês
- `year` (Number): Ano
- `isToday` (Boolean): Se é hoje
- `isOtherMonth` (Boolean): Se é outro mês
- `isSelected` (Boolean): Se está selecionado
- `hasEvent` (Boolean): Se tem evento
- `isDisabled` (Boolean): Se está desabilitado

**Emits**:
- `click` (date object)
- `mouseenter` (date object)
- `mouseleave` (date object)

**Características**:
- Tamanho: 36x36px
- Border-radius: 50% quando selecionado
- Background roxo quando selecionado
- Indicador de evento: dot 4px na parte inferior
- Opacity 0.4 para outros meses
- Cursor pointer se não desabilitado

---

### 5. LegendDot.vue (40 linhas)
**Responsabilidade**: Dot colorido para legendas  
**Props**:
- `color` (String, required): Cor hexadecimal (#7367F0)
- `size` (String, default: 'medium'): small | medium | large

**Características**:
- Sizes: small (6px), medium (8px), large (12px)
- Border-radius: 50%
- Display: inline-block
- Alinhamento vertical: middle

---

### 6. NavigationButton.vue (100 linhas)
**Responsabilidade**: Botão de navegação com chevron  
**Props**:
- `direction` (String, required): 'left' | 'right'
- `variant` (String, default: 'default'): default | primary | ghost
- `size` (String, default: 'medium'): small | medium | large
- `disabled` (Boolean): Desabilitar botão

**Emits**: `click`

**Características**:
- Material Symbols: chevron_left / chevron_right
- 3 variantes: default (transparente), primary (roxo), ghost (outline)
- 3 tamanhos: small (32px), medium (40px), large (48px)
- Border-radius: 50%
- Hover effect
- Disabled state (opacity 0.5)

---

### 7. WeekdayLabel.vue (60 linhas)
**Responsabilidade**: Label de dia da semana  
**Props**:
- `day` (String, required): Dom | Seg | Ter | Qua | Qui | Sex | Sab
- `size` (String, default: 'medium'): small | medium | large
- `variant` (String, default: 'default'): default | bold | muted

**Características**:
- Width: 36px
- Text-align: center
- 3 tamanhos: small (12px), medium (14px), large (16px)
- 3 variantes: default (normal), bold (600), muted (0.6 opacity)

---

## 🧩 Molecules (8 componentes - 577 linhas)

### 1. CalendarMonthHeader.vue (150 linhas)
**Responsabilidade**: Header completo do calendário mensal  
**Props**:
- `monthYear` (String, required): "Janeiro de 2022"
- `showViewToggle` (Boolean, default: true): Mostrar toggle de visualizações
- `currentView` (String, default: 'month'): View ativa
- `availableViews` (Array): Views disponíveis

**Emits**:
- `previous`: Navegar para mês anterior
- `next`: Navegar para próximo mês
- `view-change` (view): Mudar visualização

**Composição**:
- NavigationButton (left)
- NavigationButton (right)
- h2 (título mês/ano)
- ViewToggleGroup (right side)

**Layout**: Flex row, space-between, 24px padding

---

### 2. CalendarDaysHeader.vue (79 linhas)
**Responsabilidade**: Header com dias da semana (Dom~Sáb)  
**Props**:
- `daysLabels` (Array, default: ['Dom.', 'Seg.', ...]): Labels customizáveis
- `showFullNames` (Boolean, default: false): Mostrar nomes completos

**Composição**:
- 7 WeekdayLabel components em grid
- Grid: repeat(7, 1fr)

**Características**:
- Background: light gray
- Border-bottom: 1px solid
- Padding: 12px 0

---

### 3. ViewToggleGroup.vue (87 linhas)
**Responsabilidade**: Grupo de botões de visualização  
**Props**:
- `modelValue` (String, required): View ativa
- `views` (Array, default: [month, week, day, list]): Views disponíveis

**Emits**: `update:modelValue`

**Composição**:
- 4 ViewToggleButton components
- Border-radius: 6px
- Separadores entre botões (sem separador para botão ativo)

**Características**:
- Single selection
- Background agrupado: rgba(115, 103, 240, 0.16)
- Border-right entre botões

---

### 4. CheckboxGroup.vue (61 linhas)
**Responsabilidade**: Grupo de checkboxes com título  
**Props**:
- `title` (String): Título do grupo
- `options` (Array, required): [{ value, label, disabled }]
- `modelValue` (Array): Valores selecionados

**Emits**: 
- `update:modelValue`
- `change` (newValues)

**Composição**:
- h3 (título)
- múltiplos Checkbox components

**Características**:
- v-model array (multiple selection)
- Add/remove values on click
- Suporta disabled individual

---

### 5. CalendarHeader.vue (55 linhas)
**Responsabilidade**: Header simplificado para mini calendário  
**Props**:
- `monthYear` (String, required): "Janeiro de 2022"

**Emits**:
- `previous`: Mês anterior
- `next`: Próximo mês

**Composição**:
- NavigationButton (left)
- p (mês/ano)
- NavigationButton (right)

**Layout**: Flex row, space-between, 16px padding

---

### 6. LegendItem.vue (70 linhas)
**Responsabilidade**: Item de legenda com dot + label  
**Props**:
- `color` (String, required): Cor do dot
- `label` (String, required): Texto da legenda
- `labelSize` (String, default: 'medium'): small | medium | large
- `interactive` (Boolean, default: false): Hover e click

**Emits**: `click` (se interactive)

**Composição**:
- LegendDot
- span (label)

**Layout**: Flex row, 8px gap, align-items center

---

### 7. WeekdaysRow.vue (30 linhas)
**Responsabilidade**: Linha com 7 dias da semana  
**Props**:
- `weekdays` (Array, default: ['Dom', 'Seg', ...]): Labels

**Composição**:
- 7 WeekdayLabel components

**Layout**: Flex row, no gap

---

### 8. WeekRow.vue (45 linhas)
**Responsabilidade**: Linha com 7 células de dias  
**Props**:
- `days` (Array, required, length 7): Array de objetos day
- `clickable` (Boolean, default: true): Permitir cliques

**Emits**:
- `day-click` (day)
- `day-hover` (day)
- `day-leave` (day)

**Composição**:
- 7 DayCell components

**Layout**: Grid 7 colunas

---

## 🏢 Organisms (3 componentes - 521 linhas)

### 1. CalendarSidebar.vue (147 linhas)
**Responsabilidade**: Sidebar completa do calendário  
**Props**:
- `activityOptions` (Array): Opções de atividades
- `selectedActivities` (Array): Atividades selecionadas

**Emits**:
- `add-event`: Clique no botão adicionar
- `activity-change` (activities): Mudança nos filtros

**Composição**:
- Button "Adicionar Evento" (roxo, Material icon add)
- Divider (1px)
- MiniCalendar (seletor de datas)
- Divider (1px)
- CheckboxGroup (filtros de atividades)

**Características**:
- Width: 300px
- Fixed position em mobile
- Slide-in animation (left: -300px → 0)
- Custom scrollbar
- Border-right: 1px solid

**Bug fixado**: Linha 76 tinha "disp lay" → corrigido para "display"

---

### 2. MonthViewGrid.vue (224 linhas)
**Responsabilidade**: Grid completo do mês com eventos  
**Props**:
- `currentView` (String, default: 'month'): View ativa
- `showViewToggle` (Boolean, default: true): Toggle views
- `availableViews` (Array): Views disponíveis
- `daysLabels` (Array): Labels dos dias
- `showFullDayNames` (Boolean, default: false): Nomes completos
- `maxVisibleEvents` (Number, default: 3): Eventos visíveis por dia
- `initialDate` (Date, default: new Date()): Data inicial
- `events` (Array, default: []): Array de eventos

**Emits**:
- `view-change` (view)
- `day-click` (date)
- `event-click` (event)
- `month-change` (newDate)

**Composição**:
- CalendarMonthHeader (navegação + título + toggle)
- CalendarDaysHeader (Dom~Sáb)
- dates-grid: 5-6 weeks com DateCellLarge

**Computed**:
- `formattedMonthYear`: Formata "Janeiro de 2022"
- `weeksGrid`: **Algoritmo complexo** que gera estrutura de semanas:
  1. Calcula primeiro dia do mês (ex: Qui = 4)
  2. Preenche dias do mês anterior (para completar primeira semana)
  3. Preenche dias do mês atual (1 a último dia)
  4. Marca dia atual (isToday: true)
  5. Anexa eventos do dia (via getEventsForDate)
  6. Preenche dias do mês seguinte (última semana)
  7. Retorna array de 5-6 semanas, cada com 7 dias

**Methods**:
- `getEventsForDate(y, m, d)`: Filtra eventos por data exata
- `handlePreviousMonth()`: currentDate -= 1 mês
- `handleNextMonth()`: currentDate += 1 mês
- `handleDayClick(day)`: Emite day-click
- `handleEventClick(event)`: Emite event-click
- `handleViewChange(view)`: Emite view-change

**Grid**: 7 colunas, min-height 125px por semana

**Responsive**:
- @1024px: min-height 100px
- @768px: min-height 80px

---

### 3. ActivityLegend.vue (150 linhas)
**Responsabilidade**: Legenda interativa de atividades  
**Props**:
- `visibleActivities` (Array): Atividades visíveis

**Emits**: `update:visible-activities`

**Composição**:
- 5 custom checkboxes com ícones e cores:
  1. **Missões** (#7367F0, roxo)
  2. **Olimpíadas** (#28C76F, verde)
  3. **Avaliações** (#EA5455, vermelho)
  4. **Trilhas** (#00CFE8, ciano)
  5. **Expedições** (#FF9F43, laranja)

**Características**:
- Checkboxes customizados (não usa Checkbox.vue)
- MaterialIcon para cada atividade
- Toggle visibility on/off
- Padding: 24px
- Background: white

**Nota**: Já existia no FrontOffice, não foi modificado

---

## 📐 Templates (1 componente - 224 linhas)

### CalendarLayoutTemplate.vue (224 linhas)
**Responsabilidade**: Layout completo do calendário  
**Props**:
- `showSidebar` (Boolean, default: true): Exibir sidebar
- `activityOptions` (Array, default: 5 atividades): Opções de filtro
- `events` (Array, default: []): Eventos do calendário
- `initialDate` (Date, default: new Date()): Data inicial
- `currentView` (String, default: 'month'): View inicial

**Emits**:
- `add-event`: Clique em adicionar evento
- `activity-change` (activities): Mudança nos filtros
- `view-change` (view): Mudança de visualização
- `day-click` (date): Clique em dia
- `event-click` (event): Clique em evento
- `month-change` (newDate): Navegação entre meses

**Composição**:
- CalendarSidebar (v-if showSidebar)
- sidebar-toggle-mobile button (v-if showSidebar, mobile only)
- main.calendar-main (slot "main")
  - Slot default: MonthViewGrid
- div.calendar-footer (v-if $slots.footer)
  - Slot "footer"
- sidebar-overlay (v-if showSidebar && !sidebarCollapsed, mobile only)

**State**:
- `selectedActivities` (ref []): Atividades selecionadas
- `sidebarCollapsed` (ref false): Sidebar colapsada

**Computed**:
- `filteredEvents`: Filtra events por selectedActivities
  - Se selectedActivities vazio: retorna todos
  - Senão: filtra por event.type in selectedActivities

**Methods**:
- `handleAddEvent()`: Emite add-event
- `handleActivityChange(acts)`: Atualiza selectedActivities, emite activity-change
- `handleViewChange(v)`: Emite view-change
- `handleDayClick(d)`: Emite day-click
- `handleEventClick(e)`: Emite event-click
- `handleMonthChange(d)`: Emite month-change
- `toggleSidebar()`: Alterna sidebarCollapsed

**Layout**:
- Flex row
- Height: 100vh
- Background: white
- Overflow: hidden

**Sidebar**:
- Width: 300px
- Height: 100%
- Border-right: 1px

**Main**:
- Flex: 1
- Overflow: auto
- Padding (opcional)

**Mobile (<768px)**:
- Sidebar: position fixed, left -300px
- Sidebar aberta: left 0, transition 0.3s
- Toggle button: display block, position fixed, bottom 20px, left 20px, z-index 1001
- Overlay: display block, fixed inset 0, background rgba(0,0,0,0.5), z-index 999

**Print**:
- Sidebar: display none
- Toggle button: display none
- Footer: display none
- Main: width 100%

---

## 🛠️ Support Components (3 componentes - ~400 linhas)

### 1. MiniCalendar.vue (~150 linhas)
**Responsabilidade**: Calendário mini para seleção de datas  
**Emits**: `select-date` (date)

**Características**:
- Calendário compacto (7x6 grid)
- Navegação entre meses
- Marca dia selecionado
- Marca dia atual
- Clique em dia emite evento

---

### 2. EventDrawer.vue (~200 linhas)
**Responsabilidade**: Drawer lateral para CRUD de eventos  
**Props**:
- `isOpen` (Boolean): Se drawer está aberto
- `eventData` (Object): Dados do evento (null para novo)

**Emits**:
- `close`: Fechar drawer
- `save` (eventData): Salvar evento

**Características**:
- Slide-in from right
- Form completo (título, descrição, data início/fim, tipo, cor, turmas)
- Validação de campos
- Botões Salvar/Cancelar

---

### 3. MaterialIcon.vue (~50 linhas)
**Responsabilidade**: Wrapper para Material Symbols  
**Props**:
- `name` (String, required): Nome do ícone
- `size` (Number|String, default: 24): Tamanho em px
- `color` (String): Cor customizada

**Características**:
- Class: material-symbols-outlined
- Font-size dinâmico
- Color dinâmica

---

## 📄 View (1 arquivo - 178 linhas)

### Calendar.vue (178 linhas)
**Responsabilidade**: View principal da rota /teacher/calendar  

**Composição**:
- AppNavbar (@toggle-sidebar)
- div.calendar-page (:class sidebar-collapsed)
  - Sidebar (:collapsed)
  - div.calendar-main
    - CalendarLayoutTemplate (todos os props e eventos)
- EventDrawer (:is-open, :event-data, @close, @save)

**State**:
- `sidebarCollapsed` (ref false): Sidebar do AppNavbar colapsada
- `currentDate` (ref 13/01/2022): Data inicial (matching Figma)
- `selectedTurma` (ref '5a-manha'): Turma selecionada (filtro futuro)
- `events` (ref []): Array de eventos
- `isDrawerOpen` (ref false): Drawer aberto/fechado
- `editingEvent` (ref null): Evento sendo editado

**Constants**:
- `activityOptions`: 5 atividades (missao, olimpiada, avaliacao, trilha, expedicao)

**Computed**:
- `calendarEvents`: Filtra events por selectedTurma (se event.turmasAfetadas inclui selectedTurma)

**Methods**:
- `toggleSidebar()`: Alterna sidebarCollapsed
- `handleActivityChange(acts)`: Log debug das atividades selecionadas
- `handleDayClick(date)`: Log debug do dia clicado
- `handleEventClick(event)`: Abre drawer com evento selecionado
- `handleMonthChange(date)`: Atualiza currentDate
- `openDrawer()`: Abre drawer sem evento (criar novo)
- `closeDrawer()`: Fecha drawer e limpa editingEvent
- `saveEvent(data)`: CRUD de evento:
  - Se data.id: atualiza evento existente no array
  - Senão: cria novo evento (id: Date.now(), status: ativo, origem: professor)

**Lifecycle**:
- `onMounted`: Fetch de /src/data/eventsCalendar.json, popula events array

**Styles** (25 linhas):
- `.calendar-page`: flex, min-height 100vh, background #f9fafb
- `.calendar-main`: flex: 1, margin-left 240px (Sidebar), transition 0.3s
- `.sidebar-collapsed .calendar-main`: margin-left 70px
- `@media 1024px`: margin-left 0

---

## 📊 Resumo de Dependências

### Internas (Atomic Design)
```
Calendar.vue
└── CalendarLayoutTemplate
    ├── CalendarSidebar
    │   ├── MiniCalendar (support)
    │   └── CheckboxGroup
    │       └── Checkbox (atom)
    └── MonthViewGrid
        ├── CalendarMonthHeader
        │   ├── NavigationButton (atom)
        │   └── ViewToggleGroup
        │       └── ViewToggleButton (atom)
        └── CalendarDaysHeader
            └── WeekdayLabel (atom)
        └── DateCellLarge (atom)
            └── LegendDot (atom)
```

### Externas
- **Vue 3**: Composition API, `<script setup>`, `ref`, `computed`, `onMounted`
- **Material Symbols Outlined**: Ícones (add, chevron_left, chevron_right, menu, close)
- **Bootstrap Icons**: Ícones legados (bi-plus-lg, etc.)
- **Montserrat**: Google Fonts

---

## 🎨 Design Tokens

### Colors
```javascript
{
  primary: '#7367F0',       // Roxo principal
  success: '#28C76F',       // Verde (Missões)
  warning: '#FF9F43',       // Laranja (Expedições)
  danger: '#EA5455',        // Vermelho (Avaliações)
  info: '#00CFE8',          // Ciano (Trilhas)
  secondary: '#6E6B7B',     // Cinza secundário
  textPrimary: 'rgba(47, 43, 61, 0.90)',
  textSecondary: 'rgba(47, 43, 61, 0.68)',
  border: 'rgba(47, 43, 61, 0.12)',
  background: '#F9FAFB'
}
```

### Spacing
```javascript
{
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
}
```

### Border Radius
```javascript
{
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '50%'
}
```

### Shadows
```javascript
{
  sm: '0px 2px 4px rgba(47, 43, 61, 0.08)',
  md: '0px 3px 12px rgba(47, 43, 61, 0.14)',
  lg: '0px 4px 20px rgba(47, 43, 61, 0.20)',
  primary: '0px 2px 6px rgba(115, 103, 240, 0.30)'
}
```

---

## ✅ Checklist de Qualidade

### Código
- [x] Todos os componentes usam `<script setup>`
- [x] Props com validação (type, default, validator)
- [x] Emits declarados explicitamente
- [x] Computed para valores derivados
- [x] Sem `watch` desnecessários
- [x] Sem mutações de props
- [x] Nomes de componentes em PascalCase
- [x] Props em camelCase
- [x] Eventos em kebab-case

### Estilo
- [x] Scoped styles em todos os componentes
- [x] Variáveis CSS reutilizáveis
- [x] BEM ou nomenclatura consistente
- [x] Sem !important desnecessário
- [x] Mobile-first responsive

### Acessibilidade
- [x] Aria-label em botões sem texto
- [x] Aria-checked em checkboxes
- [x] Roles semânticos (button, checkbox, etc.)
- [x] Contraste adequado (WCAG AA)
- [x] Navegação por teclado funcional

### Performance
- [x] Code splitting (lazy loading de views)
- [x] Computed em vez de methods quando possível
- [x] v-if vs v-show usado adequadamente
- [x] Componentes não fazem fetch diretamente (props/events)
- [x] Sem re-renders desnecessários

---

**Fim do inventário** ✅
