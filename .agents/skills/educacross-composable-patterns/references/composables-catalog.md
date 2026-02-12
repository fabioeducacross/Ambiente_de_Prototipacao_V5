# Catálogo de Composables - Educacross

**Referência completa de composables do projeto**

---

## 📋 Índice Rápido

| Composable | Propósito | Arquivo | Status |
|------------|-----------|---------|--------|
| `useCalendar` | Lógica de calendário | `src/composables/useCalendar.js` | ✅ Implementado |
| `useEventForm` | Gerenciar formulários de eventos | `src/composables/useEventForm.js` | 🔄 Proposto |
| `useEventValidation` | Validação de eventos | `src/composables/useEventValidation.js` | 🔄 Proposto |
| `usePagination` | Paginação genérica | `src/composables/usePagination.js` | 🔄 Proposto |
| `useFilters` | Filtros de turma/tipo | `src/composables/useFilters.js` | 🔄 Proposto |
| `useDrawer` | Controle de drawers/sidebars | `src/composables/useDrawer.js` | 🔄 Proposto |

---

## 🟢 useCalendar (Implementado)

### Localização
`src/composables/useCalendar.js` (291 linhas)

### Assinatura

```javascript
export function useCalendar() {
  return {
    // Maps
    activityColors: { missao, olimpiada, avaliacao, trilha, expedicao, outro },
    activityIcons: { missao, olimpiada, avaliacao, trilha, expedicao, outro },
    activityLabels: { missao, olimpiada, avaliacao, trilha, expedicao, outro },
    
    // Getters
    getActivityColor: (tipo: string) => string,
    getActivityIcon: (tipo: string) => string,
    getActivityLabel: (tipo: string) => string,
    
    // Filters
    getEventsForDate: (events: Array, date: Date, turma?: string) => Array,
    getEventsForWeek: (events: Array, date: Date, turma?: string) => Array,
    
    // Helpers
    getMonthWeeks: (year: number, month: number) => Array<Array<DayObject>>,
    isToday: (date: Date) => boolean
  }
}
```

### Parâmetros
Nenhum (retorna funções que aceitam parâmetros)

### Retorno

#### `activityColors` (Object)
Mapeamento tipo → cor Vuexy:
- `missao`: `#7367F0` (Primary Purple)
- `olimpiada`: `#00CFE8` (Info Cyan)
- `avaliacao`: `#FF9F43` (Warning Orange)
- `trilha`: `#28C76F` (Success Green)
- `expedicao`: `#EA5455` (Danger Red)
- `outro`: `#82868B` (Secondary Gray)

#### `activityIcons` (Object)
Mapeamento tipo → Bootstrap Icon:
- `missao`: `bi-target`
- `olimpiada`: `bi-trophy`
- `avaliacao`: `bi-clipboard-check`
- `trilha`: `bi-bezier`
- `expedicao`: `bi-compass`
- `outro`: `bi-calendar-event`

#### `activityLabels` (Object)
Mapeamento tipo → label português:
- `missao`: `Missão`
- `olimpiada`: `Olimpíada`
- `avaliacao`: `Avaliação`
- `trilha`: `Trilha`
- `expedicao`: `Expedição`
- `outro`: `Outro`

#### `getActivityColor(tipo)` (Function)
**Entrada**: `tipo` (string) - tipo de atividade  
**Saída**: (string) - cor HEX  
**Lógica**: Retorna cor de `activityColors[tipo]` ou fallback para `outro`

#### `getActivityIcon(tipo)` (Function)
**Entrada**: `tipo` (string)  
**Saída**: (string) - classe Bootstrap Icon  
**Lógica**: Retorna ícone de `activityIcons[tipo]` ou fallback

#### `getActivityLabel(tipo)` (Function)
**Entrada**: `tipo` (string)  
**Saída**: (string) - label português  
**Lógica**: Retorna label de `activityLabels[tipo]` ou 'Outro'

#### `getEventsForDate(events, date, turma)` (Function)
**Entrada**:
- `events` (Array) - lista de eventos
- `date` (Date) - data alvo
- `turma` (string | null) - filtro opcional de turma

**Saída**: (Array) - eventos na data

**Lógica**:
1. Normaliza `date` para 00:00:00
2. Para cada evento:
   - Normaliza `dataInicio` e `dataTermino` para 00:00:00
   - Checa se `date` está entre `dataInicio` e `dataTermino` (inclusive)
   - Se `turma` fornecida, filtra por `event.turmas.includes(turma)`
3. Retorna eventos que satisfazem ambas condições

**Casos de borda**:
- `events` não array → retorna `[]`
- Evento sem `turmas` → inclui em todos os filtros de turma
- Evento multi-dia → aparece em todas as datas no range

#### `getEventsForWeek(events, date, turma)` (Function)
**Entrada**:
- `events` (Array)
- `date` (Date) - qualquer dia da semana alvo
- `turma` (string | null)

**Saída**: (Array) - eventos na semana (domingo a sábado)

**Lógica**:
1. Calcula `startOfWeek`: domingo anterior ou atual
2. Calcula `endOfWeek`: sábado seguinte
3. Para cada evento:
   - Checa overlap: `eventStart <= endOfWeek && eventEnd >= startOfWeek`
   - Aplica filtro de turma
4. Retorna eventos com overlap

**Importante**: Semana começa sempre no **domingo** (padrão US).

#### `getMonthWeeks(year, month)` (Function)
**Entrada**:
- `year` (number)
- `month` (number) - 0-indexado (Janeiro = 0)

**Saída**: (Array<Array<DayObject>>) - 6 semanas × 7 dias

**DayObject**:
```javascript
{
  date: Date,           // Objeto Date completo
  day: number,          // 1-31
  month: number,        // 0-11
  year: number,         // YYYY
  isCurrentMonth: bool, // true se pertence ao mês alvo
  isToday: bool,        // true se é hoje
  weekday: number       // 0-6 (domingo = 0)
}
```

**Lógica**:
1. Calcula primeiro dia do mês
2. Retrocede para domingo anterior (ou próprio se já domingo)
3. Gera 6 semanas × 7 dias (42 dias total)
4. Marca `isCurrentMonth` para dias do mês alvo
5. Marca `isToday` para o dia atual

**Casos de uso**:
- Renderizar grid de calendário mensal
- Preencher dias de meses adjacentes (cinza)
- Destacar dia atual

#### `isToday(date)` (Function)
**Entrada**: `date` (Date)  
**Saída**: (boolean)  
**Lógica**: Compara `date` com `new Date()` em dia/mês/ano, ignorando hora

### Exemplos de Uso

#### Exemplo 1: Renderizar Badge Colorido

```vue
<script setup>
import { useCalendar } from '@/composables/useCalendar'

const { getActivityColor, getActivityIcon, getActivityLabel } = useCalendar()
const event = { tipo: 'missao', titulo: 'Exploração' }
</script>

<template>
  <span 
    class="badge"
    :style="{ 
      backgroundColor: getActivityColor(event.tipo),
      color: '#fff'
    }"
  >
    <i :class="`bi ${getActivityIcon(event.tipo)}`"></i>
    {{ getActivityLabel(event.tipo) }}
  </span>
</template>
```

#### Exemplo 2: Filtrar Eventos do Dia

```vue
<script setup>
import { ref, computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'

const { getEventsForDate } = useCalendar()

const allEvents = ref([
  { 
    id: 1, 
    titulo: 'Missão Alpha', 
    tipo: 'missao',
    dataInicio: '2026-02-12',
    dataTermino: '2026-02-15',
    turmas: ['A1', 'A2']
  },
  // ... mais eventos
])

const selectedDate = ref(new Date('2026-02-13'))
const selectedTurma = ref('A1')

const eventsToday = computed(() => 
  getEventsForDate(allEvents.value, selectedDate.value, selectedTurma.value)
)
</script>

<template>
  <div class="event-list">
    <div v-for="event in eventsToday" :key="event.id">
      {{ event.titulo }}
    </div>
  </div>
</template>
```

#### Exemplo 3: Grid de Calendário Mensal

```vue
<script setup>
import { ref, computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'

const { getMonthWeeks, isToday, getEventsForDate } = useCalendar()

const currentYear = ref(2026)
const currentMonth = ref(1) // Fevereiro (0-indexado)

const weeks = computed(() => 
  getMonthWeeks(currentYear.value, currentMonth.value)
)

const events = ref([/* eventos */])

const getEventsForDay = (day) => {
  return getEventsForDate(events.value, day.date)
}
</script>

<template>
  <div class="calendar-grid">
    <div v-for="week in weeks" :key="week[0].date" class="week">
      <div 
        v-for="day in week" 
        :key="day.date"
        :class="{
          'day-cell': true,
          'other-month': !day.isCurrentMonth,
          'today': day.isToday
        }"
      >
        <div class="day-number">{{ day.day }}</div>
        <div class="events">
          <span v-for="event in getEventsForDay(day)" :key="event.id">
            {{ event.titulo }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
```

### Dependências
- Vue 3: `ref`, `computed`, `watch`
- JavaScript nativo: `Date`, `Array.filter`, `Array.includes`

### Onde Usado
- `src/components/organisms/Calendar.vue` - Grid mensal
- `src/components/molecules/DayCell.vue` - Renderização de dia
- `src/components/molecules/EventDrawer.vue` - Badge de tipo (indiretamente)
- `src/views/CalendarView.vue` - Filtros e listagem

---

## 🔵 useEventForm (Proposto)

### Propósito
Gerenciar estado de formulário de eventos com validação integrada.

### Assinatura

```javascript
export function useEventForm(initialEvent = {}) {
  return {
    // Estado
    form: Ref<EventObject>,
    isSubmitting: Ref<boolean>,
    submitError: Ref<string | null>,
    
    // Validação
    errors: Ref<Record<string, string>>,
    isValid: Ref<boolean>,
    canSubmit: Ref<boolean>,
    
    // Ações
    reset: () => void,
    submit: (apiFunction: Function) => Promise<any>,
    validate: () => boolean
  }
}
```

### Parâmetros

- `initialEvent` (Object, opcional): Valores iniciais do formulário

### EventObject Schema

```javascript
{
  titulo: string,        // Título do evento
  descricao: string,     // Descrição longa
  tipo: string,          // 'missao' | 'olimpiada' | etc.
  dataInicio: string,    // ISO date: '2026-02-12'
  dataTermino: string,   // ISO date
  turmas: Array<string>  // ['A1', 'B2']
}
```

### Retorno

- `form` (Ref): Objeto reativo com dados do formulário
- `isSubmitting` (Ref): `true` durante chamada API
- `submitError` (Ref): Mensagem de erro da API ou null
- `errors` (Ref): Map de campo → mensagem de erro de validação
- `isValid` (Ref): `true` se sem erros de validação
- `canSubmit` (Ref): `isValid && !isSubmitting`
- `reset()`: Limpa formulário e erros
- `submit(apiFunction)`: Valida, chama API, e reseta se sucesso
- `validate()`: Valida formulário manualmente

### Exemplo de Uso

```vue
<script setup>
import { useEventForm } from '@/composables/useEventForm'
import { createEvent } from '@/services/calendar.service'

// Modo criação
const { form, errors, canSubmit, submit } = useEventForm()

// OU modo edição
const existingEvent = { id: 1, titulo: 'Evento X', /* ... */ }
const { form, errors, canSubmit, submit } = useEventForm(existingEvent)

const handleSubmit = async () => {
  try {
    const result = await submit(createEvent)
    // Redirecionar ou toast
    console.log('Evento criado:', result)
  } catch (error) {
    // Erro já está em submitError
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.titulo" />
    <span v-if="errors.titulo" class="error">{{ errors.titulo }}</span>
    
    <textarea v-model="form.descricao"></textarea>
    
    <select v-model="form.tipo">
      <option value="missao">Missão</option>
      <option value="olimpiada">Olimpíada</option>
    </select>
    
    <input type="date" v-model="form.dataInicio" />
    <span v-if="errors.dataInicio" class="error">{{ errors.dataInicio }}</span>
    
    <button type="submit" :disabled="!canSubmit">Salvar</button>
  </form>
</template>
```

### Dependências
- `useEventValidation` - validação de regras
- Vue 3: `ref`, `computed`, `watch`

---

## 🔵 useEventValidation (Proposto)

### Propósito
Validação centralizada de eventos com regras de negócio.

### Assinatura

```javascript
export function useEventValidation() {
  return {
    errors: Ref<Record<string, string>>,
    isValid: Ref<boolean>,
    validate: (event: EventObject) => boolean,
    validateField: (field: string, value: any) => string | null
  }
}
```

### Regras de Validação

1. **Título**:
   - Obrigatório
   - Min 3 caracteres
   - Max 100 caracteres

2. **Data Início**:
   - Obrigatória
   - Formato ISO date válido

3. **Data Término**:
   - Obrigatória
   - >= Data Início

4. **Tipo**:
   - Obrigatório
   - Enum: `['missao', 'olimpiada', 'avaliacao', 'trilha', 'expedicao', 'outro']`

5. **Turmas** (condicional):
   - Se tipo = `avaliacao` → pelo menos 1 turma

### Retorno

- `errors` (Ref): Map campo → mensagem de erro
- `isValid` (Ref): `true` se `errors` vazio
- `validate(event)`: Valida evento completo, retorna `isValid.value`
- `validateField(field, value)`: Valida 1 campo, retorna erro ou null

### Exemplo de Uso

```javascript
import { useEventValidation } from '@/composables/useEventValidation'

const { validate, errors, isValid } = useEventValidation()

const event = {
  titulo: 'Mi',  // Muito curto!
  dataInicio: '2026-02-15',
  dataTermino: '2026-02-10',  // Antes do início!
  tipo: 'avaliacao',
  turmas: []  // Avaliação precisa de turmas!
}

validate(event)

console.log(errors.value)
// {
//   titulo: 'Título deve ter pelo menos 3 caracteres',
//   dataTermino: 'Data de término deve ser posterior à data de início',
//   turmas: 'Avaliações devem ter pelo menos uma turma selecionada'
// }

console.log(isValid.value)  // false
```

---

## 🔵 usePagination (Proposto)

### Propósito
Paginação genérica para qualquer lista reativa.

### Assinatura

```javascript
export function usePagination(
  items: Ref<Array>,
  itemsPerPage: number = 10
) {
  return {
    currentPage: Ref<number>,
    perPage: Ref<number>,
    totalPages: Ref<number>,
    paginatedItems: Ref<Array>,
    hasNextPage: Ref<boolean>,
    hasPrevPage: Ref<boolean>,
    goToPage: (page: number) => void,
    nextPage: () => void,
    prevPage: () => void,
    reset: () => void
  }
}
```

### Parâmetros

- `items` (Ref<Array>): Lista reativa a ser paginada
- `itemsPerPage` (number): Items por página (default: 10)

### Retorno

- `currentPage`: Página atual (1-indexado)
- `perPage`: Items por página (mutável)
- `totalPages`: Total de páginas calculado
- `paginatedItems`: Slice da lista atual
- `hasNextPage`: `true` se existe próxima página
- `hasPrevPage`: `true` se existe página anterior
- `goToPage(n)`: Navega para página `n` (valida range)
- `nextPage()`: Avança 1 página (se possível)
- `prevPage()`: Retrocede 1 página (se possível)
- `reset()`: Volta para página 1

### Exemplo de Uso

```vue
<script setup>
import { ref } from 'vue'
import { usePagination } from '@/composables/usePagination'

const allEvents = ref([/* 100 eventos */])

const {
  paginatedItems,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  hasNextPage,
  hasPrevPage,
  goToPage
} = usePagination(allEvents, 10)
</script>

<template>
  <div>
    <!-- Lista paginada -->
    <div v-for="event in paginatedItems" :key="event.id">
      {{ event.titulo }}
    </div>
    
    <!-- Controles de paginação -->
    <div class="pagination">
      <button @click="prevPage" :disabled="!hasPrevPage">
        <i class="bi bi-chevron-left"></i>
      </button>
      
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      
      <button @click="nextPage" :disabled="!hasNextPage">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>
```

---

## 🔵 useFilters (Proposto)

### Propósito
Filtros reutilizáveis de turma e tipo de evento.

### Assinatura

```javascript
export function useFilters(events: Ref<Array>) {
  return {
    selectedTurma: Ref<string | null>,
    selectedTipo: Ref<string | null>,
    searchQuery: Ref<string>,
    filteredEvents: Ref<Array>,
    availableTurmas: Ref<Array<string>>,
    availableTipos: Ref<Array<string>>,
    clearFilters: () => void
  }
}
```

### Exemplo

```vue
<script setup>
import { ref } from 'vue'
import { useFilters } from '@/composables/useFilters'

const allEvents = ref([/* eventos */])

const {
  selectedTurma,
  selectedTipo,
  searchQuery,
  filteredEvents,
  availableTurmas,
  clearFilters
} = useFilters(allEvents)
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Buscar..." />
    
    <select v-model="selectedTurma">
      <option :value="null">Todas as turmas</option>
      <option v-for="turma in availableTurmas" :key="turma">
        {{ turma }}
      </option>
    </select>
    
    <button @click="clearFilters">Limpar Filtros</button>
    
    <div v-for="event in filteredEvents" :key="event.id">
      {{ event.titulo }}
    </div>
  </div>
</template>
```

---

## 🔵 useDrawer (Proposto)

### Propósito
Controlar abertura/fechamento de drawers e sidebars.

### Assinatura

```javascript
export function useDrawer(initialOpen = false) {
  return {
    isOpen: Ref<boolean>,
    open: () => void,
    close: () => void,
    toggle: () => void
  }
}
```

### Exemplo

```vue
<script setup>
import { useDrawer } from '@/composables/useDrawer'

const { isOpen, open, close } = useDrawer()
</script>

<template>
  <button @click="open">Abrir Drawer</button>
  
  <div v-if="isOpen" class="drawer-overlay" @click="close">
    <div class="drawer" @click.stop>
      <button @click="close">X</button>
      <!-- Conteúdo -->
    </div>
  </div>
</template>
```

---

## 📝 Notas de Implementação

### Prioridade de Implementação

1. **Alta**: `useEventForm`, `useEventValidation` (refatorar EventDrawer.vue)
2. **Média**: `useFilters` (usado em múltiplas views)
3. **Baixa**: `usePagination`, `useDrawer` (nice-to-have)

### Testes

Todos os composables devem ter testes unitários em `tests/unit/composables/`:

```javascript
// tests/unit/composables/useCalendar.spec.js
import { describe, it, expect } from 'vitest'
import { useCalendar } from '@/composables/useCalendar'

describe('useCalendar', () => {
  it('getActivityColor retorna cor correta', () => {
    const { getActivityColor } = useCalendar()
    expect(getActivityColor('missao')).toBe('#7367F0')
  })
  
  it('getEventsForDate filtra eventos corretamente', () => {
    const { getEventsForDate } = useCalendar()
    const events = [
      { dataInicio: '2026-02-10', dataTermino: '2026-02-15', turmas: ['A1'] }
    ]
    const result = getEventsForDate(events, new Date('2026-02-12'), 'A1')
    expect(result).toHaveLength(1)
  })
})
```

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
