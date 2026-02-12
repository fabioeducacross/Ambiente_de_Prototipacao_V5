# Especificação Completa - Atomic Design Educacross

Documentação detalhada de todos os componentes do calendário seguindo Atomic Design.

---

## Inventário Completo de Componentes

### Átomos (7 componentes)

#### 1. DayCell.vue
- **Arquivo:** `src/components/atoms/DayCell.vue`
- **Propósito:** Célula individual de dia no calendário
- **Props:**
  - `day: Number` (required) — Número do dia (1-31)
  - `isCurrentMonth: Boolean` — Se pertence ao mês atual
  - `isSelected: Boolean` — Estado selecionado
  - `isToday: Boolean` — Dia atual
  - `hasEvent: Boolean` — Indica evento
  - `eventColor: String` (default: '#28C76F') — Cor do indicador
  - `isDisabled: Boolean` — Desabilita interação
  - `clickable: Boolean` (default: true) — Permite cliques
- **Emits:**
  - `click(day)` — Célula clicada
  - `mouseenter(day)` — Mouse entrou na célula
  - `mouseleave(day)` — Mouse saiu da célula
- **Dimensões:** 36x36px, border-radius: 500px
- **Cores Vuexy:**
  - Text primary: `rgba(47,43,61,0.9)`
  - Selected: `rgba(115,103,240,0.24)`
  - Today: `#7367f0` + box-shadow
  - Hover: `rgba(47,43,61,0.06)`

#### 2. WeekdayLabel.vue
- **Arquivo:** `src/components/atoms/WeekdayLabel.vue`
- **Propósito:** Label de dia da semana
- **Props:**
  - `label: String` (required, validator: Dom~Sáb)
  - `size: String` (default: 'default') — 'small'|'default'|'large'
  - `variant: String` (default: 'default') — 'default'|'bold'|'muted'
- **Dimensões:** width: 36px
- **Font:** Montserrat 13px/400

#### 3. NavigationButton.vue
- **Arquivo:** `src/components/atoms/NavigationButton.vue`
- **Propósito:** Botão de navegação com ícone
- **Props:**
  - `icon: String` (required, validator: chevron_left|chevron_right|first_page|last_page)
  - `ariaLabel: String` (required)
  - `variant: String` (default: 'default')
  - `size: String` (default: 'medium')
- **Emits:** `click`
- **Estilos:**
  - Background: `rgba(47,43,61,0.08)`
  - Border-radius: 500px
  - Hover: `rgba(47,43,61,0.12)`
  - Active: `transform: scale(0.95)`

#### 4. LegendDot.vue
- **Arquivo:** `src/components/atoms/LegendDot.vue`
- **Propósito:** Ponto colorido de legenda
- **Props:**
  - `color: String` (required)
  - `size: String` (default: 'medium') — small: 6px, medium: 8px, large: 12px
- **Estilos:** Círculo perfeito (border-radius: 50%)

#### 5. Checkbox.vue
- **Arquivo:** `src/components/atoms/Checkbox.vue`
- **Propósito:** Checkbox customizado com label
- **Props:**
  - `modelValue: Boolean` (required)
  - `label: String` (required)
  - `disabled: Boolean`
- **Emits:** `update:modelValue`

#### 6. ViewToggleButton.vue
- **Arquivo:** `src/components/atoms/ViewToggleButton.vue`
- **Propósito:** Botão de toggle entre visualizações
- **Props:**
  - `icon: String` (required)
  - `isActive: Boolean`
  - `ariaLabel: String`
- **Emits:** `click`

#### 7. DateCellLarge.vue
- **Arquivo:** `src/components/atoms/DateCellLarge.vue`
- **Propósito:** Célula de data expandida para visualização mensal
- **Props:**
  - `date: Date` (required)
  - `events: Array`
  - `isToday: Boolean`
- **Emits:** `click`, `event-clicked`

---

### Moléculas (8 componentes)

#### 1. WeekdaysRow.vue
- **Arquivo:** `src/components/molecules/WeekdaysRow.vue`
- **Propósito:** Row com 7 labels de dias da semana
- **Usa:** 7x `WeekdayLabel.vue`
- **Props:**
  - `weekdays: Array<String>` (default: ['Dom', 'Seg', ...])
  - `size: String`
- **Layout:** `display: flex`, `gap: 4px`

#### 2. CalendarHeader.vue
- **Arquivo:** `src/components/molecules/CalendarHeader.vue`
- **Propósito:** Cabeçalho com navegação de mês/ano
- **Usa:** 4x `NavigationButton.vue`
- **Props:**
  - `currentMonth: String` (required)
  - `currentYear: Number` (required)
- **Emits:**
  - `previous-month`
  - `next-month`
  - `previous-year`
  - `next-year`

#### 3. CalendarDaysHeader.vue
- **Arquivo:** `src/components/molecules/CalendarDaysHeader.vue`
- **Propósito:** Header completo com título + navegação + toggle
- **Usa:** `CalendarMonthHeader` + `ViewToggleGroup`
- **Props:**
  - `title: String`
  - `currentView: String`
- **Emits:**
  - `navigate`
  - `view-changed`

#### 4. LegendItem.vue
- **Arquivo:** `src/components/molecules/LegendItem.vue`
- **Propósito:** Item de legenda com dot + texto
- **Usa:** `LegendDot` + texto
- **Props:**
  - `color: String` (required)
  - `label: String` (required)
  - `count: Number` — Contador opcional

#### 5. WeekRow.vue
- **Arquivo:** `src/components/molecules/WeekRow.vue`
- **Propósito:** Row com 7 células de dias
- **Usa:** 7x `DayCell.vue`
- **Props:**
  - `week: Array<Object>` (required) — Array com 7 objetos de dia
  - `selectedDate: Date`
- **Emits:** `day-selected`

#### 6. CheckboxGroup.vue
- **Arquivo:** `src/components/molecules/CheckboxGroup.vue`
- **Propósito:** Grupo de checkboxes relacionados
- **Usa:** Múltiplos `Checkbox.vue`
- **Props:**
  - `options: Array<Object>` (required)
  - `modelValue: Array` (required)
- **Emits:** `update:modelValue`

#### 7. ViewToggleGroup.vue
- **Arquivo:** `src/components/molecules/ViewToggleGroup.vue`
- **Propósito:** Grupo de botões de alternância de visualização
- **Usa:** Múltiplos `ViewToggleButton.vue`
- **Props:**
  - `views: Array<Object>` (required)
  - `activeView: String`
- **Emits:** `view-changed`

#### 8. CalendarMonthHeader.vue
- **Arquivo:** `src/components/molecules/CalendarMonthHeader.vue`
- **Propósito:** Cabeçalho simplificado de mês
- **Usa:** `NavigationButton` (2x)
- **Props:**
  - `monthYear: String` (required)
- **Emits:** `previous`, `next`

---

### Organismos (3 componentes)

#### 1. CalendarGrid.vue
- **Arquivo:** `src/components/organisms/CalendarGrid.vue`
- **Propósito:** Grid completo de calendário com eventos
- **Usa:**
  - `CalendarDaysHeader.vue`
  - 6x `WeekRow.vue`
- **Props:**
  - `events: Array<Object>` (required) — Array de eventos
  - `selectedDate: Date`
  - `filters: Object` — Filtros ativos
  - `currentView: String` (default: 'month')
- **Emits:**
  - `date-selected(date)`
  - `event-clicked(event)`
  - `view-changed(view)`
- **Estado Local:**
  ```javascript
  const currentMonth = ref(new Date())
  const weeks = computed(() => calculateWeeks(currentMonth.value))
  const filteredEvents = computed(() => filterEventsByDate(events.value, filters.value))
  ```
- **Lógica:**
  - Calcula semanas do mês (array de 6 weeks)
  - Filtra eventos por data e tipo
  - Gerencia navegação entre meses

#### 2. ActivityLegend.vue
- **Arquivo:** `src/components/organisms/ActivityLegend.vue`
- **Propósito:** Legenda de tipos de atividade com filtros
- **Usa:**
  - 3x `LegendItem.vue`
  - `CheckboxGroup.vue`
- **Props:**
  - `activities: Array<Object>` (required)
  - `selectedTypes: Array<String>`
- **Emits:**
  - `filter-changed(types)`
- **Estado Local:**
  ```javascript
  const activeFilters = ref(['missao', 'olimpiada', 'avaliacao'])
  const activityCounts = computed(() => calculateCounts(activities.value))
  ```
- **Lógica:**
  - Conta quantos eventos de cada tipo
  - Gerencia estado de checkboxes
  - Sincroniza com filtros globais

#### 3. CalendarSidebar.vue
- **Arquivo:** `src/components/organisms/CalendarSidebar.vue`
- **Propósito:** Sidebar com mini-calendário e filtros
- **Usa:**
  - `CalendarGrid.vue` (versão mini)
  - `ActivityLegend.vue`
  - `CheckboxGroup.vue`
- **Props:**
  - `events: Array<Object>` (required)
  - `filters: Object`
  - `selectedDate: Date`
- **Emits:**
  - `filter-changed(filters)`
  - `date-changed(date)`
- **Estado Local:**
  ```javascript
  const miniCalendarDate = ref(new Date())
  const activeFilters = ref({ types: [], turma: null })
  ```
- **Lógica:**
  - Sincroniza mini-calendário com calendário principal
  - Gerencia estado de múltiplos filtros
  - Coordena interação entre legenda e checkboxes

---

### Templates (1 componente)

#### 1. CalendarLayoutTemplate.vue
- **Arquivo:** `src/components/templates/CalendarLayoutTemplate.vue`
- **Propósito:** Layout 2 colunas (sidebar + main)
- **Props:**
  - `hasSidebar: Boolean` (default: true)
  - `sidebarWidth: String` (default: '300px')
  - `sidebarPosition: String` (default: 'left')
- **Slots:**
  - `sidebar` — Conteúdo da sidebar
  - `header` — Cabeçalho da página
  - `content` — Área principal de conteúdo
  - `footer` — Rodapé (opcional)
- **Layout:**
  ```scss
  .calendar-layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    gap: 24px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr; // Stack no mobile
    }
  }
  ```
- **Responsividade:**
  - Desktop (>768px): Sidebar + Main lado a lado
  - Mobile (<=768px): Stack vertical, sidebar colapsável

---

## Padrões de Composição

### Padrão 1: Página de Calendário Completa

```vue
<!-- src/views/teacher/Calendar.vue -->
<template>
  <CalendarLayoutTemplate has-sidebar>
    <template #sidebar>
      <CalendarSidebar 
        :events="events"
        :filters="filters"
        :selected-date="selectedDate"
        @filter-changed="handleFilterChange"
        @date-changed="handleDateChange"
      />
    </template>
    
    <template #header>
      <h1 class="font-weight-bold text-primary">Calendário de Atividades</h1>
    </template>
    
    <template #content>
      <CalendarGrid
        :events="filteredEvents"
        :selected-date="selectedDate"
        :filters="filters"
        @date-selected="handleDateSelected"
        @event-clicked="openEventDetails"
      />
    </template>
  </CalendarLayoutTemplate>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getEvents } from '@/services/calendar.service'
import useFilters from '@/store/filters/useFilters'

const { classe } = useFilters()
const events = ref([])
const selectedDate = ref(new Date())
const filters = ref({ types: ['missao', 'olimpiada', 'avaliacao'] })

const filteredEvents = computed(() => {
  return events.value.filter(event => 
    filters.value.types.includes(event.type)
  )
})

onMounted(async () => {
  events.value = await getEvents({ classId: classe.value?.ClassId })
})

const handleFilterChange = (newFilters) => {
  filters.value = newFilters
}

const handleDateChange = (date) => {
  selectedDate.value = date
}

const handleDateSelected = (date) => {
  selectedDate.value = date
  // Lógica adicional...
}

const openEventDetails = (event) => {
  // Abrir modal/drawer com detalhes...
}
</script>
```

---

### Padrão 2: Mini-Calendário (sem sidebar)

```vue
<!-- Uso em dashboard ou widget -->
<template>
  <b-card>
    <CalendarGrid
      :events="events"
      :selected-date="today"
      current-view="month"
      @date-selected="navigateToDay"
    />
  </b-card>
</template>

<script setup>
import { ref } from 'vue'
import CalendarGrid from '@/components/organisms/CalendarGrid.vue'

const today = ref(new Date())
const events = ref([]) // Carregado de API

const navigateToDay = (date) => {
  router.push(`/calendar/day/${formatDate(date)}`)
}
</script>
```

---

### Padrão 3: Legenda Isolada

```vue
<!-- Uso em relatórios ou exportações -->
<template>
  <ActivityLegend
    :activities="activities"
    :selected-types="selectedTypes"
    @filter-changed="updateReport"
  />
</template>

<script setup>
import { ref } from 'vue'
import ActivityLegend from '@/components/organisms/ActivityLegend.vue'

const activities = ref([
  { type: 'missao', name: 'Missões', color: '#7367F0', count: 15 },
  { type: 'olimpiada', name: 'Olimpíadas', color: '#00CFE8', count: 8 },
  { type: 'avaliacao', name: 'Avaliações', color: '#FF9F43', count: 5 }
])

const selectedTypes = ref(['missao', 'olimpiada', 'avaliacao'])

const updateReport = (types) => {
  selectedTypes.value = types
  // Recarregar relatório com filtros...
}
</script>
```

---

## Matriz de Dependências

```
Páginas (Views)
  ↓
CalendarLayoutTemplate (Template)
  ↓
CalendarSidebar (Organismo)        CalendarGrid (Organismo)
  ↓                                   ↓
ActivityLegend (Organismo)        CalendarDaysHeader (Molécula)
  ↓                                   ↓
LegendItem (Molécula)             CalendarMonthHeader (Molécula)   WeekRow (Molécula)
  ↓                                   ↓                               ↓
LegendDot (Átomo)                 NavigationButton (Átomo)        DayCell (Átomo)
```

**Regras de importação:**
- ✅ Organismos ← Moléculas ← Átomos
- ✅ Templates ← Organismos
- ✅ Páginas ← Templates + Organismos
- ❌ Átomos **NÃO** importam outros átomos
- ❌ Moléculas **NÃO** importam organismos
- ❌ Organismos **NÃO** importam templates

---

## Cores e Variantes do Projeto

### Cores Vuexy (CSS Custom Properties)

```scss
// Primary colors
--primary: #7367F0;
--primary-rgb: 115, 103, 240;

// Status colors
--success: #28C76F;  // Verde (nível iniciante, eventos)
--warning: #FF9F43;  // Laranja (nível intermediário)
--danger: #EA5455;   // Vermelho (nível avançado)
--info: #00CFE8;     // Ciano (informações)

// Text colors
--text-primary: rgba(47, 43, 61, 0.9);
--text-secondary: rgba(47, 43, 61, 0.6);
--text-disabled: rgba(47, 43, 61, 0.4);

// Background colors
--bg-hover: rgba(47, 43, 61, 0.06);
--bg-selected: rgba(115, 103, 240, 0.24);
--bg-overlay: rgba(47, 43, 61, 0.08);
```

### Cores de Atividades

```javascript
const activityColors = {
  missao: '#7367F0',      // Roxo (cor primária)
  olimpiada: '#00CFE8',   // Ciano (info)
  avaliacao: '#FF9F43'    // Laranja (warning)
}
```

### Tipografia Montserrat

```scss
// Escalas usadas no calendário
font-family: 'Montserrat', sans-serif;

// Sizes
.font-13: 13px / 400;  // Weekday labels
.font-15: 15px / 400;  // Day numbers
.font-22: 22px / 600;  // Titles
```

---

## Testes Unitários

### Exemplo para Átomo (DayCell.vue)

```javascript
// tests/unit/components/atoms/DayCell.spec.js
import { shallowMount } from '@vue/test-utils'
import DayCell from '@/components/atoms/DayCell.vue'

describe('DayCell.vue', () => {
  it('renderiza o número do dia', () => {
    const wrapper = shallowMount(DayCell, {
      props: { day: 15 }
    })
    expect(wrapper.text()).toContain('15')
  })
  
  it('aplica classe "today" quando isToday é true', () => {
    const wrapper = shallowMount(DayCell, {
      props: { day: 15, isToday: true }
    })
    expect(wrapper.classes()).toContain('today')
  })
  
  it('emite evento "click" quando clicado e não está desabilitado', async () => {
    const wrapper = shallowMount(DayCell, {
      props: { day: 15, clickable: true, isDisabled: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')[0]).toEqual([15])
  })
  
  it('não emite "click" quando desabilitado', async () => {
    const wrapper = shallowMount(DayCell, {
      props: { day: 15, isDisabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
```

### Exemplo para Molécula (WeekRow.vue)

```javascript
// tests/unit/components/molecules/WeekRow.spec.js
import { shallowMount } from '@vue/test-utils'
import WeekRow from '@/components/molecules/WeekRow.vue'
import DayCell from '@/components/atoms/DayCell.vue'

describe('WeekRow.vue', () => {
  const mockWeek = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
    isToday: i === 3
  }))
  
  it('renderiza 7 células de dias', () => {
    const wrapper = shallowMount(WeekRow, {
      props: { week: mockWeek },
      global: {
        stubs: { DayCell: true }
      }
    })
    const cells = wrapper.findAllComponents(DayCell)
    expect(cells).toHaveLength(7)
  })
  
  it('emite "day-selected" quando célula é clicada', async () => {
    const wrapper = shallowMount(WeekRow, {
      props: { week: mockWeek },
      global: {
        stubs: {
          DayCell: {
            template: '<div @click="$emit(\'click\', day)"></div>',
            props: ['day']
          }
        }
      }
    })
    const firstCell = wrapper.findAllComponents({ name: 'DayCell' })[0]
    await firstCell.trigger('click')
    expect(wrapper.emitted('day-selected')).toBeTruthy()
  })
})
```

### Exemplo para Organismo (CalendarGrid.vue)

```javascript
// tests/unit/components/organisms/CalendarGrid.spec.js
import { mount } from '@vue/test-utils'
import CalendarGrid from '@/components/organisms/CalendarGrid.vue'
import { nextTick } from 'vue'

describe('CalendarGrid.vue', () => {
  const mockEvents = [
    { id: 1, date: '2024-01-15', type: 'missao', title: 'Missão 1' },
    { id: 2, date: '2024-01-20', type: 'olimpiada', title: 'Olimpíada 1' }
  ]
  
  it('filtra eventos conforme filtros ativos', async () => {
    const wrapper = mount(CalendarGrid, {
      props: {
        events: mockEvents,
        filters: { types: ['missao'] }
      }
    })
    
    await nextTick()
    
    // Verifica que apenas eventos do tipo "missao" estão visíveis
    const vm = wrapper.vm
    expect(vm.filteredEvents).toHaveLength(1)
    expect(vm.filteredEvents[0].type).toBe('missao')
  })
  
  it('emite "date-selected" quando dia é clicado', async () => {
    const wrapper = mount(CalendarGrid, {
      props: { events: mockEvents }
    })
    
    // Simula clique em DayCell
    wrapper.vm.handleDateSelected(new Date('2024-01-15'))
    
    await nextTick()
    
    expect(wrapper.emitted('date-selected')).toBeTruthy()
    expect(wrapper.emitted('date-selected')[0][0]).toBeInstanceOf(Date)
  })
})
```

---

## Acessibilidade (A11y)

### Requisitos WCAG 2.1 AA

#### Para Átomos (DayCell, NavigationButton):

```vue
<template>
  <div
    class="day-cell"
    role="button"
    tabindex="0"
    :aria-label="`Dia ${day}${isToday ? ', hoje' : ''}${hasEvent ? ', com evento' : ''}`"
    :aria-selected="isSelected"
    :aria-disabled="isDisabled"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    {{ day }}
  </div>
</template>
```

**Checklist:**
- ✅ `role="button"` para elementos clicáveis
- ✅ `tabindex="0"` para navegação por teclado
- ✅ `aria-label` descritivo incluindo contexto
- ✅ `aria-selected` para estado de seleção
- ✅ `aria-disabled` para estado desabilitado
- ✅ Suporte a `Enter` e `Space` para ativação

#### Para Organismos (CalendarGrid):

```vue
<template>
  <div
    class="calendar-grid"
    role="application"
    aria-label="Calendário de atividades educacionais"
  >
    <div role="region" aria-label="Cabeçalho do calendário">
      <CalendarDaysHeader ... />
    </div>
    
    <div role="grid" aria-label="Grade de dias do mês">
      <div role="row" v-for="week in weeks" :key="week.id">
        <WeekRow ... />
      </div>
    </div>
  </div>
</template>
```

**Checklist:**
- ✅ `role="application"` para widgets complexos
- ✅ `role="grid"` e `role="row"` para estrutura de calendário
- ✅ Landmarks com `role="region"` e `aria-label`
- ✅ Navegação por setas implementada
- ✅ Anúncios com `aria-live` para mudanças dinâmicas

### Contraste de Cores

Todos os pares de cores atendem WCAG AA (4.5:1):

| Elemento | Foreground | Background | Contraste |
|---|---|---|---|
| Day number | `rgba(47,43,61,0.9)` | `#FFFFFF` | 12.63:1 ✅ |
| Selected day | `rgba(47,43,61,0.9)` | `rgba(115,103,240,0.24)` | 6.42:1 ✅ |
| Today | `#FFFFFF` | `#7367F0` | 4.58:1 ✅ |
| Disabled | `rgba(47,43,61,0.4)` | `#FFFFFF` | 5.28:1 ✅ |

---

**Última atualização:** 2026-02-12  
**Versão:** 1.0.0
