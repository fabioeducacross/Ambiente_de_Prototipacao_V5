# Educacross Composable Patterns

**Skill para patterns de composables reutilizáveis Vue 3 Composition API**

---

## 📋 TL;DR

**Problema**: Lógica duplicada em múltiplos componentes, dificulta manutenção.

**Solução**: Composables reutilizáveis seguindo Composition API patterns com `ref()`, `computed()`, `watch()`.

**Pattern principal**:
```javascript
// src/composables/useFeature.js
import { ref, computed } from 'vue'

export function useFeature(initialValue) {
  const state = ref(initialValue)
  const computed Value = computed(() => /* logic */)
  
  function action() {
    // mutations
  }
  
  return { state, computedValue, action }
}
```

**Regra de ouro**: 🔄 **Composables retornam refs/computed/functions, não valores primitivos**

---

## 🎯 Quando Criar um Composable

### ✅ USE composable quando

:
- Lógica de negócio repetida em 2+ componentes
- Estados compartilhados entre componentes relacionados
- Lógica complexa que precisa ser testada isoladamente
- Integrações com APIs externas (fetch, WebSocket, etc.)
- Manipulação de formulários com validação
- Filtros e processamento de dados

### ❌ NÃO USE composable quando:
- Lógica específica de UM componente apenas
- Simples helper functions (use `utils/`)
- Componentes visuais reutilizáveis (use component composition)
- Estados globais (use Vuex/Pinia)

---

## 📁 Estrutura de Arquivos

```
src/composables/
├── useCalendar.js           # Lógica de calendário (291 linhas)
├── useEventForm.js          # Formulários de eventos
├── useEventValidation.js    # Validação de eventos
├── useFilters.js            # Filtros de turma/tipo
├── usePagination.js         # Paginação genérica
└── README.md                # Índice com exemplos
```

**Naming convention**: `use + PascalCase + .js`

---

## 🔧 Pattern 1: useCalendar (Existente)

### Propósito
Lógica compartilhada de calendário: cores, ícones, filtros de eventos.

### Código Completo

```javascript
// src/composables/useCalendar.js
import { computed } from 'vue'

export function useCalendar() {
  
  // Cores Vuexy por tipo
  const activityColors = {
    missao: '#7367F0',      // Primary
    olimpiada: '#00CFE8',   // Info
    avaliacao: '#FF9F43',   // Warning
    trilha: '#28C76F',      // Success
    expedicao: '#EA5455',   // Danger
    outro: '#82868B'        // Secondary
  }

  // Ícones Bootstrap
  const activityIcons = {
    missao: 'bi-target',
    olimpiada: 'bi-trophy',
    avaliacao: 'bi-clipboard-check',
    trilha: 'bi-bezier',
    expedicao: 'bi-compass',
    outro: 'bi-calendar-event'
  }

  // Labels amigáveis
  const activityLabels = {
    missao: 'Missão',
    olimpiada: 'Olimpíada',
    avaliacao: 'Avaliação',
    trilha: 'Trilha',
    expedicao: 'Expedição',
    outro: 'Outro'
  }

  // Getters
  const getActivityColor = (tipo) => activityColors[tipo] || activityColors.outro
  const getActivityIcon = (tipo) => activityIcons[tipo] || activityIcons.outro
  const getActivityLabel = (tipo) => activityLabels[tipo] || 'Outro'

  // Filtrar eventos por data
  const getEventsForDate = (events, date, turma = null) => {
    if (!Array.isArray(events)) return []
    
    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      const eventStart = new Date(event.dataInicio)
      const eventEnd = new Date(event.dataTermino)
      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(0, 0, 0, 0)
      
      const isInDateRange = targetDate >= eventStart && targetDate <= eventEnd
      const matchesTurma = !turma || !event.turmas || event.turmas.includes(turma)
      
      return isInDateRange && matchesTurma
    })
  }

  // Filtrar eventos por semana
  const getEventsForWeek = (events, date, turma = null) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return events.filter(event => {
      const eventStart = new Date(event.dataInicio)
      const eventEnd = new Date(event.dataTermino)
      
      const overlaps = eventStart <= endOfWeek && eventEnd >= startOfWeek
      const matchesTurma = !turma || !event.turmas || event.turmas.includes(turma)
      
      return overlaps && matchesTurma
    })
  }

  // Calcular semanas do mês (6 semanas para grid)
  const getMonthWeeks = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const weeks = []
    let currentDate = new Date(firstDay)
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 6; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        week.push({
          date: new Date(currentDate),
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
          isCurrentMonth: currentDate.getMonth() === month,
          isToday: isToday(currentDate),
          weekday: currentDate.getDay()
        })
        currentDate.setDate(currentDate.getDate() + 1)
      }
      weeks.push(week)
    }
    
    return weeks
  }

  // Helper: verificar se é hoje
  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  return {
    // Maps
    activityColors,
    activityIcons,
    activityLabels,
    
    // Getters
    getActivityColor,
    getActivityIcon,
    getActivityLabel,
    
    // Filters
    getEventsForDate,
    getEventsForWeek,
    
    // Helpers
    getMonthWeeks,
    isToday
  }
}
```

### Uso em Componentes

```vue
<script setup>
import { ref, computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'

const { 
  getActivityColor,
  getEventsForDate,
  getMonthWeeks 
} = useCalendar()

const events = ref([/* eventos da API */])
const selectedDate = ref(new Date())

const eventsToday = computed(() => 
  getEventsForDate(events.value, selectedDate.value)
)

const weeks = computed(() => 
  getMonthWeeks(selectedDate.value.getFullYear(), selectedDate.value.getMonth())
)
</script>

<template>
  <div v-for="event in eventsToday" :key="event.id">
    <span :style="{ color: getActivityColor(event.tipo) }">
      {{ event.titulo }}
    </span>
  </div>
</template>
```

---

## 🔧 Pattern 2: useEventForm (Proposta)

### Propósito
Gerenciar estado e validação de formulários de eventos.

### Código

```javascript
// src/composables/useEventForm.js
import { ref, computed, watch } from 'vue'
import { useEventValidation } from './useEventValidation'

export function useEventForm(initialEvent = {}) {
  // Estado do formulário
  const form = ref({
    titulo: '',
    descricao: '',
    tipo: 'missao',
    dataInicio: '',
    dataTermino: '',
    turmas: [],
    ...initialEvent
  })

  // Controle de submissão
  const isSubmitting = ref(false)
  const submitError = ref(null)

  // Validação
  const { validate, errors, isValid } = useEventValidation()

  // Computed: form está pronto para submit?
  const canSubmit = computed(() => {
    return isValid.value && !isSubmitting.value
  })

  // Watch: validar ao mudar campos críticos
  watch(() => form.value.dataInicio, () => {
    if (form.value.dataInicio && form.value.dataTermino) {
      validate(form.value)
    }
  })

  watch(() => form.value.dataTermino, () => {
    validate(form.value)
  })

  // Resetar formulário
  const reset = () => {
    form.value = {
      titulo: '',
      descricao: '',
      tipo: 'missao',
      dataInicio: '',
      dataTermino: '',
      turmas: []
    }
    errors.value = {}
    submitError.value = null
  }

  // Submeter formulário
  const submit = async (apiFunction) => {
    if (!canSubmit.value) return

    isSubmitting.value = true
    submitError.value = null

    try {
      validate(form.value)
      
      if (!isValid.value) {
        throw new Error('Formulário inválido')
      }

      const result = await apiFunction(form.value)
      reset()
      return result
    } catch (error) {
      submitError.value = error.message
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    // Estado
    form,
    isSubmitting,
    submitError,
    
    // Validação
    errors,
    isValid,
    canSubmit,
    
    // Ações
    reset,
    submit,
    validate: () => validate(form.value)
  }
}
```

### Uso

```vue
<script setup>
import { useEventForm } from '@/composables/useEventForm'
import { createEvent } from '@/services/calendar.service'

const {
  form,
  errors,
  canSubmit,
  isSubmitting,
  submit,
  reset
} = useEventForm()

const handleSubmit = async () => {
  try {
    await submit(createEvent)
    // Sucesso: redirecionar ou mostrar toast
  } catch (error) {
    // Erro: já está em submitError
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="form.titulo" placeholder="Título" />
      <span v-if="errors.titulo" class="error">{{ errors.titulo }}</span>
    </div>
    
    <button 
      type="submit" 
      :disabled="!canSubmit"
      :class="{ loading: isSubmitting }"
    >
      {{ isSubmitting ? 'Salvando...' : 'Salvar Evento' }}
    </button>
  </form>
</template>
```

---

## 🔧 Pattern 3: useEventValidation (Proposta)

### Propósito
Validação reutilizável de eventos com regras de negócio.

### Código

```javascript
// src/composables/useEventValidation.js
import { ref, computed } from 'vue'

export function useEventValidation() {
  const errors = ref({})

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })

  const validate = (event) => {
    const newErrors = {}

    // Título obrigatório (min 3 chars)
    if (!event.titulo || event.titulo.trim().length < 3) {
      newErrors.titulo = 'Título deve ter pelo menos 3 caracteres'
    }

    // Data início obrigatória
    if (!event.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória'
    }

    // Data término obrigatória
    if (!event.dataTermino) {
      newErrors.dataTermino = 'Data de término é obrigatória'
    }

    // Data término >= Data início
    if (event.dataInicio && event.dataTermino) {
      const inicio = new Date(event.dataInicio)
      const termino = new Date(event.dataTermino)
      
      if (termino < inicio) {
        newErrors.dataTermino = 'Data de término deve ser posterior à data de início'
      }
    }

    // Tipo válido
    const tiposValidos = ['missao', 'olimpiada', 'avaliacao', 'trilha', 'expedicao', 'outro']
    if (!tiposValidos.includes(event.tipo)) {
      newErrors.tipo = 'Tipo de evento inválido'
    }

    // Turmas: pelo menos uma se tipo for avaliacao
    if (event.tipo === 'avaliacao' && (!event.turmas || event.turmas.length === 0)) {
      newErrors.turmas = 'Avaliações devem ter pelo menos uma turma selecionada'
    }

    errors.value = newErrors
    return isValid.value
  }

  const validateField = (field, value) => {
    const tempEvent = { [field]: value }
    validate(tempEvent)
    
    if (errors.value[field]) {
      return errors.value[field]
    }
    
    delete errors.value[field]
    return null
  }

  return {
    errors,
    isValid,
    validate,
    validateField
  }
}
```

---

## 🔧 Pattern 4: usePagination (Genérico)

### Propósito
Paginação reutilizável para listas.

### Código

```javascript
// src/composables/usePagination.js
import { ref, computed } from 'vue'

export function usePagination(items, itemsPerPage = 10) {
  const currentPage = ref(1)
  const perPage = ref(itemsPerPage)

  const totalPages = computed(() => {
    return Math.ceil(items.value.length / perPage.value)
  })

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return items.value.slice(start, end)
  })

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value
  })

  const hasPrevPage = computed(() => {
    return currentPage.value > 1
  })

  const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  const reset = () => {
    currentPage.value = 1
  }

  return {
    // Estado
    currentPage,
    perPage,
    
    // Computed
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    
    // Ações
    goToPage,
    nextPage,
    prevPage,
    reset
  }
}
```

### Uso

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
  hasPrevPage
} = usePagination(allEvents, 10)
</script>

<template>
  <div>
    <div v-for="event in paginatedItems" :key="event.id">
      {{ event.titulo }}
    </div>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="!hasPrevPage">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="!hasNextPage">Próxima</button>
    </div>
  </div>
</template>
```

---

## ✅ Checklist de Composable

Ao criar um novo composable, verificar:

- [ ] Nome segue pattern `use + PascalCase`
- [ ] Arquivo em `src/composables/`
- [ ] Retorna **objeto** com refs/computed/functions (não valores primitivos)
- [ ] Refs/computed nomeados semanticamente (`loading`, `error`, `data`)
- [ ] Funções de ação nomeadas com verbos (`fetch`, `submit`, `validate`)
- [ ] Testes unitários em `tests/unit/composables/`
- [ ] Documentação JSDoc com `@param` e `@returns`
- [ ] Exemplos de uso em comentários ou README
- [ ] Typescript types (se projeto usar TS)

---

## 🚫 Anti-Patterns

### ❌ Retornar valores primitivos

```javascript
// ❌ ERRADO
export function useCounter() {
  const count = ref(0)
  return count.value  // Perde reatividade!
}

// ✅ CORRETO
export function useCounter() {
  const count = ref(0)
  return { count }  // Mantém reatividade
}
```

### ❌ Mutação de props

```javascript
// ❌ ERRADO
export function useForm(props) {
  const submit = () => {
    props.data = { ...newData }  // Mutação de props!
  }
}

// ✅ CORRETO
export function useForm() {
  const data = ref({})
  const submit = () => {
    data.value = { ...newData }
  }
  return { data, submit }
}
```

### ❌ Estado global em composable

```javascript
// ❌ ERRADO (estado compartilhado não intencional)
const globalState = ref(0)

export function useSharedState() {
  return { globalState }
}

// ✅ CORRETO (estado isolado por instância)
export function useLocalState() {
  const localState = ref(0)
  return { localState }
}

// ✅ OU use Vuex/Pinia para estado global explícito
```

---

## 📚 Recursos

- [Composables Existentes](../references/composables-catalog.md) - Catálogo completo
- [Script Gerador](../scripts/generate-composable.js) - CLI para criar composable
- [Vue Composition API Docs](https://vuejs.org/guide/reusability/composables.html)
- [VueUse Collection](https://vueuse.org/) - Biblioteca de composables reutilizáveis


---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
