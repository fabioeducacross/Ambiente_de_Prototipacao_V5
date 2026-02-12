# Atomic Design - Calendar System

Estrutura completa de componentes de calendário seguindo a metodologia **Atomic Design** de Brad Frost.

## 🎯 Filosofia

Atomic Design organiza componentes em 5 níveis de complexidade:
1. **Átomos** - Elementos mais básicos (botões, labels, dots)
2. **Moléculas** - Combinações simples de átomos (header, rows)
3. **Organismos** - Componentes complexos autônomos (calendars, legends)
4. **Templates** - Layouts de páginas
5. **Páginas** - Instâncias específicas de templates

---

## 🧱 Estrutura de Componentes

### Nível 1: Átomos (7 componentes)

#### `DayCell.vue`
**Propósito**: Célula individual de dia do calendário  
**Props**:
- `day` (Number, required) - Número do dia (1-31)
- `isCurrentMonth` (Boolean) - Se pertence ao mês atual
- `isSelected` (Boolean) - Estado selecionado (fundo roxo claro)
- `isToday` (Boolean) - Dia atual (fundo roxo escuro + sombra)
- `hasEvent` (Boolean) - Indica presença de evento (fundo verde)
- `eventColor` (String) - Cor do indicador de evento
- `isDisabled` (Boolean) - Desabilita interação
- `clickable` (Boolean) - Permite cliques

**Emits**: `click`, `mouseenter`, `mouseleave`

**Estilos**:
- Tamanho: 36x36px
- Font: Montserrat 15px/400
- Border-radius: 500px (círculo)
- Cores Vuexy:
  - Text primary: `rgba(47,43,61,0.9)`
  - Text disabled: `rgba(47,43,61,0.4)`
  - Selected: `rgba(115,103,240,0.24)`
  - Today: `#7367f0` + `box-shadow: 0px 2px 6px 0px rgba(115,103,240,0.3)`
  - Hover: `rgba(47,43,61,0.06)`

---

#### `WeekdayLabel.vue`
**Propósito**: Label de dia da semana (Dom, Seg, Ter...)  
**Props**:
- `label` (String, required) - Texto do dia (validação: Dom~Seb)
- `size` (String) - 'small'|'default'|'large'
- `variant` (String) - 'default'|'bold'|'muted'

**Estilos**:
- Width: 36px
- Font: Montserrat 13px/400
- Color: `rgba(47,43,61,0.9)`
- Text-align: center

---

#### `NavigationButton.vue`
**Propósito**: Botão de navegação com ícone Material Symbols  
**Props**:
- `icon` (String, required) - Nome do ícone (validação: chevron_left|chevron_right|first_page|last_page)
- `ariaLabel` (String, required) - Acessibilidade
- `variant` (String) - 'default'|'primary'|'ghost'
- `size` (String) - 'small'|'medium'|'large'

**Emits**: `click`

**Estilos**:
- Background: `rgba(47,43,61,0.08)`
- Border-radius: 500px
- Padding: 5px (medium)
- Icon: 20px (medium)
- Hover: `rgba(47,43,61,0.12)`
- Active: `transform: scale(0.95)`

---

#### `LegendDot.vue`
**Propósito**: Ponto colorido de legenda  
**Props**:
- `color` (String, required) - Cor do ponto
- `size` (String) - 'small'|'medium'|'large'

**Estilos**:
- Shape: Círculo perfeito (border-radius: 50%)
- Sizes: 6px (small) | 8px (medium) | 12px (large)

---

#### `Checkbox.vue` ✨ NOVO
**Propósito**: Checkbox customizado com label e check icon  
**Props**:
- `modelValue` (Boolean, required) - Estado checked/unchecked (v-model)
- `label` (String, required) - Texto do label
- `disabled` (Boolean) - Desabilita interação

**Emits**: `update:modelValue`

**Estilos**:
- Checkbox: 18x18px, border 2px, border-radius 4px
- Checked: background #7367f0, border #7367f0
- Icon: Material Symbols 14px, white
- Label: Montserrat 15px/22px
- Gap: 12px entre checkbox e label

---

#### `ViewToggleButton.vue` ✨ NOVO
**Propósito**: Botão para alternar entre views (Mês/Semana/Dia)  
**Props**:
- `label` (String, required) - Texto do botão (validação: Mês|Semana|Dia|Lista)
- `isActive` (Boolean) - Estado ativo (background roxo)
- `ariaLabel` (String) - Acessibilidade
- `size` (String) - 'small'|'medium'|'large'

**Emits**: `click`

**Estilos**:
- Background default: `rgba(115,103,240,0.08)`
- Background active: `#7367f0` + `box-shadow: 0px 2px 6px 0px rgba(115,103,240,0.3)`
- Font: Montserrat 15px/500 (medium)
- Padding: 8px 20px (medium)
- Border-radius: 6px

---

#### `DateCellLarge.vue` ✨ NOVO
**Propósito**: Célula grande do calendário mensal (118x125px) com eventos  
**Props**:
- `day` (Number, required) - Número do dia
- `isCurrentMonth` (Boolean) - Pertence ao mês atual
- `isToday` (Boolean) - Dia atual
- `disabled` (Boolean) - Desabilita interação
- `label` (String) - Label acessibilidade
- `events` (Array) - Array de objetos evento `{id, title, color}`
- `maxVisibleEvents` (Number) - Máximo de eventos visíveis (default: 3)

**Emits**: `click`, `event-click`

**Estilos**:
- Tamanho: 118x125px (min-height)
- Font: Montserrat 15px/22px
- Border: 1px solid rgba(47,43,61,0.12)
- Hover: background rgba(115,103,240,0.04), border rgba(115,103,240,0.3)
- Today: background rgba(115,103,240,0.08), color #7367f0
- Event item: padding 4px 8px, border-radius 4px, font 13px

---

### Nível 2: Moléculas (8 componentes)

#### `CalendarHeader.vue`
**Composição**: 1 `<p>` + 2 `NavigationButton`  
**Props**:
- `monthYear` (String, required) - Ex: "Dezembro 2026"
- `ariaLabelPrevious` (String) - Label botão anterior
- `ariaLabelNext` (String) - Label botão próximo

**Emits**: `previous`, `next`

**Layout**:
```
┌─────────────────────────────────────┐
│ Dezembro 2026        [<]  [>]      │
└─────────────────────────────────────┘
```

---

#### `WeekdaysRow.vue`
**Composição**: 7 `WeekdayLabel` em flexbox  
**Props**:
- `weekdays` (Array) - Default: ['Dom','Seg','Ter','Qua','Qui','Sex','Seb']
- `size` (String) - Tamanho dos labels
- `variant` (String) - Variante visual

**Layout**:
```
┌───────────────────────────────────────┐
│  Dom  Seg  Ter  Qua  Qui  Sex  Seb   │
└───────────────────────────────────────┘
```

---

#### `WeekRow.vue`
**Composição**: 7 `DayCell` em flexbox  
**Props**:
- `days` (Array, required) - Array de 7 objetos day
- `clickable` (Boolean) - Permite interação

**Emits**: `day-click`, `day-hover`, `day-leave`

**Estrutura de `day` object**:
```javascript
{
  date: 15,               // Número do dia
  currentMonth: true,     // Pertence ao mês atual
  selected: false,        // Estado selecionado
  today: false,           // Dia atual
  hasEvent: false,        // Tem evento
  eventColor: '#28C76F',  // Cor do evento
  disabled: false         // Desabilitado
}
```

**Layout**:
```
┌───────────────────────────────────────┐
│  [1]  [2]  [3]  [4]  [5]  [6]  [7]  │
└───────────────────────────────────────┘
```

---

#### `LegendItem.vue`
**Composição**: `LegendDot` + `<span>`  
**Props**:
- `color` (String, required) - Cor do dot
- `label` (String, required) - Texto do label
- `dotSize` (String) - Tamanho do dot
- `labelSize` (String) - Tamanho do texto
- `interactive` (Boolean) - Permite clique

**Emits**: `click`

**Layout**:
```
● Missões    ● Olimpíadas    ● Avaliações
```

---

#### `CheckboxGroup.vue` ✨ NOVO
**Composição**: Título (h5) + N `Checkbox` em coluna  
**Props**:
- `title` (String) - Título do grupo
- `options` (Array, required) - Array de objetos `{value, label, disabled}`
- `modelValue` (Array) - Array de valores selecionados (v-model)

**Emits**: `update:modelValue`, `change`

**Layout**:
```
Atividades
☑ Missões
☐ Olimpíadas
☑ Avaliações
☐ Trilhas
☐ Expedições
```

**Uso**: Filtros de atividades, configurações com múltiplas opções

---

#### `ViewToggleGroup.vue` ✨ NOVO
**Composição**: 3 `ViewToggleButton` em linha (button group)  
**Props**:
- `modelValue` (String, required) - View atual ('month'|'week'|'day'|'list')
- `views` (Array) - Array de objetos `{value, label, ariaLabel}`
- `ariaLabel` (String) - Label do grupo
- `size` (String) - Tamanho dos botões

**Emits**: `update:modelValue`, `change`

**Layout**:
```
┌──────────────────────────┐
│  Mês  │ Semana │  Dia   │
└──────────────────────────┘
```

**Estilos**:
- Botões conectados (border-radius apenas nas pontas)
- Separador 1px entre botões não ativos
- Ativo: background #7367f0, sem separador

---

#### `CalendarDaysHeader.vue` ✨ NOVO
**Composição**: 7 labels de dias da semana em flexbox  
**Props**:
- `daysLabels` (Array) - Array de objetos `{short, full}` (default: Dom. ~ Sáb.)
- `showFullNames` (Boolean) - Mostrar nomes completos (Domingo ~ Sábado)
- `size` (String) - 'small'|'medium'|'large'

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Dom.    Seg.    Ter.    Qua.    Qui.    Sex.    Sáb.      │
└─────────────────────────────────────────────────────────────┘
```

**Estilos**:
- Border-bottom: 1px solid rgba(47,43,61,0.12)
- Text-align: center
- Color: rgba(47,43,61,0.7)
- Flex: 1 por label (distribui uniformemente)

---

#### `CalendarMonthHeader.vue` ✨ NOVO
**Composição**: Navegação (2 `NavigationButton`) + Título (h4) + `ViewToggleGroup`  
**Props**:
- `monthYear` (String, required) - Ex: "Janeiro de 2022"
- `currentView` (String) - View atual ('month'|'week'|'day')
- `showViewToggle` (Boolean) - Mostrar toggle de views
- `availableViews` (Array) - Array de views disponíveis
- `viewToggleSize` (String) - Tamanho do toggle

**Emits**: `previous`, `next`, `view-change`

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [<][>] Janeiro de 2022        [Mês][Semana][Dia]         │
└─────────────────────────────────────────────────────────────┘
```

**Estilos**:
- Min-height: 86px
- Padding: 24px
- Border-bottom: 1px solid rgba(47,43,61,0.12)
- Justify-content: space-between
- Responsivo: empilha verticalmente em mobile

---

### Nível 3: Organismos (10 componentes)

#### `MiniCalendar.vue` ✅ REFATORADO
**Composição**:
- 1 `CalendarHeader`
- 1 `WeekdaysRow`
- 5-6 `WeekRow` (semanas do mês)

**Data**:
- `currentDate` (Date) - Data de navegação
- `selectedDate` (Number) - Dia selecionado
- `weekdays` (Array) - Array fixo de dias da semana

**Methods**:
- `previousMonth()` - Navega para mês anterior
- `nextMonth()` - Navega para próximo mês
- `selectDay(day)` - Seleciona um dia

**Computed**:
- `monthYear` - Formata "Janeiro 2026"
- `weekRows` - Gera array de semanas com dias

**Tamanho**: 284x286px (conforme Figma)

**Uso Recomendado**: Sidebars, dashboards, date pickers compactos

---

#### `ActivityLegend.vue` ✅ NOVO
**Composição**:
- 1 `<span>` título
- N `LegendItem` (quantos activity types existirem)

**Props**:
- `title` (String) - Título da legenda
- `activities` (Array, required) - Array de objetos activity
- `dotSize` (String) - Tamanho dos dots
- `labelSize` (String) - Tamanho dos textos
- `interactive` (Boolean) - Permite filtro por clique

**Emits**: `activity-click(type)`

**Estrutura de `activity` object**:
```javascript
{
  type: 'missao',      // ID único
  color: '#7367F0',    // Cor Vuexy
  label: 'Missões'     // Label exibido
}
```

**Layout**:
```
┌──────────────────────────────────────────────────────┐
│ Tipos de Atividade:  ● Missões  ● Olimpíadas  ...  │
└──────────────────────────────────────────────────────┘
```

**Cores Padrão Vuexy**:
- Missões: `#7367F0` (Primary)
- Olimpíadas: `#00CFE8` (Info)
- Avaliações: `#FF9F43` (Warning)
- Trilhas: `#28C76F` (Success)
- Expedições: `#EA5455` (Danger)
- Outros: `#82868B` (Secondary)

**Uso Recomendado**: Footers de calendários, legendas de gráficos, filtros de eventos

---

#### `CalendarSidebar.vue` ✨ NOVO
**Composição**:
- Botão "Adicionar Evento" (roxo #7367f0)
- `MiniCalendar` (date picker)
- `CheckboxGroup` (filtros de atividades)
- Dividers entre seções

**Props**:
- `activityOptions` (Array) - Array de objetos `{value, label, disabled}` para checkboxes
- `selectedActivities` (Array) - Atividades filtradas (v-model)

**Emits**: `add-event`, `activity-change`

**Layout Vertical**:
```
┌─────────────────────┐
│ [+ Adicionar Evento]│
├─────────────────────┤
│  MiniCalendar       │
│  (284x286px)        │
├─────────────────────┤
│  Atividades         │
│  ☑ Missões         │
│  ☐ Olimpíadas      │
│  ☑ Avaliações      │
│  ☐ Trilhas         │
│  ☐ Expedições      │
└─────────────────────┘
```

**Estilos**:
- Width: 300px
- Background: white
- Border-right: 1px solid rgba(47,43,61,0.12)
- Scrollbar customizado (6px width)
- Mobile: Fixed position com overlay

**Uso**: Sidebar de calendários, filtros e ações rápidas

---

#### `MonthViewGrid.vue` ✨ NOVO
**Composição**:
- `CalendarMonthHeader` (navegação + título + view toggle)
- `CalendarDaysHeader` (Dom. ~ Sáb.)
- Grid de 5-6 semanas × 7 dias (`DateCellLarge`)

**Props**:
- `currentView` (String) - View atual ('month'|'week'|'day')
- `showViewToggle` (Boolean) - Mostrar toggle de views
- `availableViews` (Array) - Views disponíveis
- `daysLabels` (Array) - Labels dos dias da semana
- `showFullDayNames` (Boolean) - Mostrar nomes completos
- `maxVisibleEvents` (Number) - Máximo de eventos por célula (default: 3)
- `initialDate` (Date) - Data inicial
- `events` (Array) - Array de eventos `{id, title, date, type, color}`

**Emits**: `day-click`, `event-click`, `month-change`, `view-change`

**Computed**:
- `formattedMonthYear` - Formata "Janeiro de 2022"
- `weeksGrid` - Gera grid de semanas com dias e eventos

**Methods**:
- `handlePreviousMonth()` - Navega para mês anterior
- `handleNextMonth()` - Navega para próximo mês
- `getEventsForDate(year, month, date)` - Filtra eventos por data

**Layout**:
```
┌──────────────────────────────────────────────────────┐
│  [<][>] Janeiro 2022        [Mês][Semana][Dia]      │
├──────────────────────────────────────────────────────┤
│  Dom.   Seg.   Ter.   Qua.   Qui.   Sex.   Sáb.    │
├──────────────────────────────────────────────────────┤
│ [26] [27] [28] [29] [30] [31] [1]                   │
│     ...eventos...                                    │
├──────────────────────────────────────────────────────┤
│ [2]  [3]  [4]  [5]  [6]  [7]  [8]                   │
│     ...eventos...                                    │
└──────────────────────────────────────────────────────┘
```

**Estilos**:
- Grid: repeat(7, 1fr)
- Min-height por célula: 125px (desktop), 100px (tablet), 80px (mobile)
- Overflow-y: auto (scroll vertical se necessário)

**Uso**: Visualização completa mensal com eventos, substituir MonthView.vue existente

---

#### Outros Organismos (já existentes, podem ser refatorados)
- `MonthView.vue` - Visualização mensal completa (pode usar MonthViewGrid)
- `WeekView.vue` - Visualização semanal
- `DayView.vue` - Visualização diária
- `ListView.vue` - Lista de eventos  
- `EventDrawer.vue` - Drawer lateral para criar/editar eventos

---

### Nível 4: Templates (1 componente)

#### `CalendarLayoutTemplate.vue` ✨ NOVO
**Composição**:
- `CalendarSidebar` (300px, colapsável em mobile)
- Main content (flex: 1):
  - Slot `#main` (padrão: `MonthViewGrid`)
  - Slot `#footer` (ex: `ActivityLegend`)
- Botão toggle mobile (fixed bottom-left, 56x56px)
- Overlay mobile (fundo escuro quando sidebar aberta)

**Props**:
- `showSidebar` (Boolean) - Mostrar sidebar (default: true)
- `activityOptions` (Array) - Opções de filtros
- `events` (Array) - Array de eventos
- `initialDate` (Date) - Data inicial
- `currentView` (String) - View atual ('month'|'week'|'day')

**Emits**: `add-event`, `activity-change`, `view-change`, `day-click`, `event-click`, `month-change`

**State Interno**:
- `selectedActivities` (ref) - Atividades selecionadas nos filtros
- `sidebarCollapsed` (ref) - Estado de colapso da sidebar

**Computed**:
- `filteredEvents` - Filtra eventos por atividades selecionadas

**Methods**:
- `toggleSidebar()` - Alterna visibilidade da sidebar (mobile)

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│ Sidebar │ Main Content (MonthViewGrid ou slot)     │
│ 300px   │                                            │
│         │                                            │
│         │                                            │
│         ├────────────────────────────────────────────┤
│         │ Footer (ActivityLegend ou slot)           │
└─────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────┐
│ Main Content (full width)       │
│                                  │
│                                  │
│          [☰] <- Toggle Button   │
└─────────────────────────────────┘

Sidebar aberta (overlay):
┌──────────┬──────────────────────┐
│ Sidebar  │ Main (escurecido)    │
│          │ Overlay clickável    │
│          │                      │
└──────────┴──────────────────────┘
```

**Estilos**:
- Height: 100vh
- Display: flex
- Background: white
- Sidebar mobile: position fixed, left -300px (colapsada), left 0 (aberta)
- Toggle button: background #7367f0, border-radius 50%, box-shadow
- Overlay: rgba(0,0,0,0.5), z-index 999
- Print: oculta sidebar e botões

**Uso**: Layout completo para páginas de calendário (Calendar.vue, EventScheduler.vue, Availability.vue)

---

### Nível 5: Páginas

#### `Calendar.vue` (views/teacher/Calendar.vue)
**Rota**: `/teacher/calendar`  
**Instância específica** do CalendarLayoutTemplate com:
- Data do professor
- Eventos das turmas
- Filtros de turma
- Actions (adicionar evento)

**Pode ser refatorado** para usar CalendarLayoutTemplate como base

---

## 🎨 Design Tokens Vuexy

Todas os componentes usam CSS custom properties do Vuexy:

### Cores
```css
--primary: #7367F0           /* Roxo principal */
--success: #28C76F           /* Verde trilhas */
--warning: #FF9F43           /* Laranja avaliações */
--danger: #EA5455            /* Vermelho expedições */
--info: #00CFE8              /* Ciano olimpíadas */
--secondary: #82868B         /* Cinza outros */

--text-primary: rgba(47,43,61,0.9)
--text-secondary: rgba(47,43,61,0.7)
--text-disabled: rgba(47,43,61,0.4)

--action-selected: rgba(47,43,61,0.08)
--action-hover: rgba(47,43,61,0.06)
```

### Spacing
```css
--padding-2: 8px
--padding-3: 12px
--p-3: 12px
--p-4: 16px
```

### Border Radius
```css
--border-radius-md: 6px
--border-round: 500px
```

### Shadows
```css
box-shadow: 0px 2px 6px 0px rgba(115,103,240,0.3)  /* Today cell */
```

---

## 📦 Importação e Uso

### Exemplo: MiniCalendar

```vue
<template>
  <div class="sidebar">
    <MiniCalendar />
  </div>
</template>

<script setup>
import MiniCalendar from '@/components/MiniCalendar.vue'
</script>
```

### Exemplo: ActivityLegend

```vue
<template>
  <ActivityLegend
    title="Tipos de Atividade:"
    :activities="activityTypes"
    interactive
    @activity-click="filterByActivity"
  />
</template>

<script setup>
import ActivityLegend from '@/components/organisms/ActivityLegend.vue'

const activityTypes = [
  { type: 'missao', color: '#7367F0', label: 'Missões' },
  { type: 'olimpiada', color: '#00CFE8', label: 'Olimpíadas' },
  { type: 'avaliacao', color: '#FF9F43', label: 'Avaliações' },
  { type: 'trilha', color: '#28C76F', label: 'Trilhas' },
  { type: 'expedicao', color: '#EA5455', label: 'Expedições' },
  { type: 'outro', color: '#82868B', label: 'Outros' }
]

const filterByActivity = (type) => {
  console.log('Filter by:', type)
  // Lógica de filtro aqui
}
</script>
```

### Exemplo: Compondo Custom Calendar

```vue
<template>
  <div class="custom-calendar">
    <!-- Header personalizado -->
    <CalendarHeader
      :month-year="monthYear"
      @previous="goToPrevMonth"
      @next="goToNextMonth"
    />
    
    <!-- Weekdays -->
    <WeekdaysRow :weekdays="['D','S','T','Q','Q','S','S']" size="small" />
    
    <!-- Semanas personalizadas -->
    <div class="weeks">
      <WeekRow
        v-for="week in weeks"
        :key="week.id"
        :days="week.days"
        @day-click="handleDayClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarHeader from '@/components/molecules/CalendarHeader.vue'
import WeekdaysRow from '@/components/molecules/WeekdaysRow.vue'
import WeekRow from '@/components/molecules/WeekRow.vue'

// Lógica customizada aqui...
</script>
```

---

## ✅ Benefícios do Atomic Design

### 1. **Reusabilidade**
- Átomos podem ser usados em qualquer contexto
- Moléculas combinam átomos de forma previsível
- Organismos são autônomos e plugáveis

### 2. **Manutenibilidade**
- Mudanças em átomos propagam automaticamente
- Fácil localizar e corrigir bugs
- Testes mais focados e simples

### 3. **Escalabilidade**
- Adicionar novos componentes é direto
- Padrões claros para toda a equipe
- Design system consistente

### 4. **Colaboração**
- Designers e devs falam a mesma linguagem
- Documentação autoexplicativa
- Protótipos rápidos com componentes prontos

### 5. **Performance**
- Componentes pequenos carregam rápido
- Tree-shaking otimizado
- Code-splitting natural

---

## 🧪 Próximos Passos

### Testes
```javascript
// DayCell.spec.js
describe('DayCell', () => {
  it('aplica classe .today quando isToday=true', () => {
    // Test...
  })
  
  it('emite click quando clicado e clickable=true', () => {
    // Test...
  })
})
```

### Storybook
```javascript
// DayCell.stories.js
export default {
  title: 'Atoms/DayCell',
  component: DayCell
}

export const Default = () => ({
  components: { DayCell },
  template: '<DayCell :day="15" />'
})

export const Today = () => ({
  components: { DayCell },
  template: '<DayCell :day="15" :is-today="true" />'
})
```

### Acessibilidade
- ✅ `aria-label` em DayCell
- ✅ `aria-selected` em dias selecionados
- ⏳ Navegação por teclado (Tab, Arrow keys, Enter)
- ⏳ Screen reader support
- ⏳ Focus management

---

## 📚 Referências

- [Atomic Design - Brad Frost](https://atomicdesign.bradfrost.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuexy Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [Material Symbols Icons](https://fonts.google.com/icons)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎯 Checklist de Qualidade

### Código
- ✅ Props com validação de tipo
- ✅ Emits documentados
- ✅ Computed properties otimizadas
- ✅ Responsive design (mobile-first)
- ✅ No hardcoded values (usa design tokens)

### Performance
- ✅ Componentes pequenos (<200 linhas)
- ✅ Lazy loading de organismos pesados
- ✅ v-for com :key adequado
- ✅ Event delegation onde possível

### Acessibilidade
- ✅ Contrast AA (WCAG 2.1)
- ✅ Aria labels em elementos interativos
- ⏳ Keyboard navigation
- ⏳ Focus visible

### Design System
- ✅ Cores do Vuexy palette
- ✅ Tipografia Montserrat
- ✅ Spacing consistente (8px grid)
- ✅ Border-radius padrão (6px containers, 500px círculos)

---

**Última atualização**: 11 de fevereiro de 2026  
**Versão**: 1.0.0  
**Status**: ✅ Completo (Átomos + Moléculas + Organismos)
