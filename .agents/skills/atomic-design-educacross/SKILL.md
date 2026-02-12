# Atomic Design - Educacross Component Architecture

Guia definitivo para classificar, criar e validar componentes Vue seguindo a metodologia **Atomic Design** aplicada ao projeto Educacross.

---

## TL;DR

**Use quando:** Criar novos componentes, decidir onde colocar um componente, ou validar estrutura de componentes existentes.

**Classificação rápida:**
- **Átomos** → Não pode ser dividido (botões, labels, inputs, dots)
- **Moléculas** → 2-4 átomos juntos (header com botões, row de dias)
- **Organismos** → Moléculas + lógica de negócio (calendar completo, sidebar com filtros)
- **Templates** → Layout de página com slots
- **Páginas** → Views em `src/views/`

**Validação automática:**
```bash
node .agents/skills/atomic-design-educacross/scripts/validate-component.js src/components/atoms/DayCell.vue
```

---

## Decision Tree: Onde colocar meu componente?

```
┌─────────────────────────────────────────────────┐
│ Meu componente pode ser dividido em partes     │
│ menores que façam sentido sozinhas?             │
└─────────────┬───────────────────────────────────┘
              │
       ┌──────┴──────┐
       │             │
      NÃO           SIM
       │             │
       │             └──→ Ele combina 2-4 componentes simples?
       │                          │
       │                   ┌──────┴──────┐
       │                   │             │
       │                  SIM           NÃO
       │                   │             │
       ↓                   ↓             ↓
   É um ÁTOMO         É MOLÉCULA    É ORGANISMO
  src/components/    src/components/  src/components/
     atoms/             molecules/      organisms/
       │                   │             │
       │                   │             └──→ Ele gerencia estado,
       │                   │                  faz chamadas API, ou
       │                   │                  tem lógica complexa?
       │                   │                          │
       │                   │                         SIM → ORGANISMO
       │                   │
       │                   └──→ Apenas combina átomos
       │                         sem lógica? → MOLÉCULA
       │
       └──→ Não depende de nada,
            é indivisível? → ÁTOMO
```

**Atalho para casos comuns:**

| Meu componente é... | Classificação | Pasta |
|---|---|---|
| Um botão, input, label, dot, icon | **Átomo** | `atoms/` |
| Header com título + botões | **Molécula** | `molecules/` |
| Row de células de calendário | **Molécula** | `molecules/` |
| Calendário completo com eventos | **Organismo** | `organisms/` |
| Sidebar com filtros e lista | **Organismo** | `organisms/` |
| Página inteira com layout | **Template** | `templates/` |

---

## Filosofia Atomic Design no Educacross

### 5 Níveis de Complexidade

```
Páginas (Views)
    ↓ usa
Templates (Layouts com slots)
    ↓ usa
Organismos (Componentes autônomos com lógica)
    ↓ usa
Moléculas (Grupos simples de átomos)
    ↓ usa
Átomos (Elementos indivisíveis)
```

### Analogia Química

- **Átomos** = Hidrogênio (H), Oxigênio (O) — não podem ser divididos
- **Moléculas** = H₂O (água) — combinação simples e estável
- **Organismos** = Células vivas — sistemas complexos com funções

---

## Regras de Classificação

### 🔴 Átomos (7 no projeto)

**Características:**
- ✅ **Indivisível** — não pode ser quebrado em partes menores
- ✅ **Genérico** — pode ser usado em qualquer contexto
- ✅ **Sem dependências** — não importa outros componentes de negócio
- ✅ **Sem lógica de negócio** — apenas apresentação visual
- ❌ Não faz fetches ou mutações de estado global

**Exemplos reais do projeto:**

1. **`DayCell.vue`** — Célula de dia do calendário (36x36px círculo)
   ```vue
   <!-- Props: day, isToday, isSelected, hasEvent -->
   <!-- Emits: click, mouseenter, mouseleave -->
   <!-- Tamanho: 36x36px, border-radius: 500px -->
   ```

2. **`NavigationButton.vue`** — Botão com ícone Material Symbols
   ```vue
   <!-- Props: icon (chevron_left/right), ariaLabel, variant, size -->
   <!-- Emits: click -->
   <!-- Background: rgba(47,43,61,0.08), padding: 5px -->
   ```

3. **`LegendDot.vue`** — Ponto colorido de legenda
   ```vue
   <!-- Props: color, size (small/medium/large) -->
   <!-- Sizes: 6px / 8px / 12px círculo -->
   ```

4. **`WeekdayLabel.vue`** — Label "Dom", "Seg", "Ter"...
   ```vue
   <!-- Props: label (validação Dom~Sáb), size, variant -->
   <!-- Font: Montserrat 13px, width: 36px -->
   ```

5. **`Checkbox.vue`** — Checkbox customizado
6. **`ViewToggleButton.vue`** — Botão de toggle de visualização
7. **`DateCellLarge.vue`** — Célula de data expandida

**Quando criar um átomo:**
- Você está duplicando código de botão/input em 3+ lugares
- O componente pode ser usado fora do contexto do calendário
- Não precisa saber sobre turmas, matérias ou eventos

---

### 🔵 Moléculas (8 no projeto)

**Características:**
- ✅ **Combina 2-4 átomos** — agrupa elementos relacionados
- ✅ **Sem lógica de negócio** — apenas composição visual
- ✅ **Props são primitivos** — recebe strings, numbers, arrays simples (não objetos de domínio complexos)
- ✅ **Stateless** — não gerencia estado reativo local
- ❌ Não faz chamadas API ou acessa Vuex

**Exemplos reais do projeto:**

1. **`WeekdaysRow.vue`** — Row com 7 `WeekdayLabel`
   ```vue
   <!-- Usa 7x WeekdayLabel.vue -->
   <!-- Props: weekdays (array de strings) -->
   <!-- Display: flex, gap: 4px -->
   ```

2. **`CalendarHeader.vue`** — Título + botões de navegação
   ```vue
   <!-- Usa NavigationButton.vue (4x) -->
   <!-- Props: currentMonth, currentYear -->
   <!-- Emits: previous-month, next-month, previous-year, next-year -->
   ```

3. **`CalendarDaysHeader.vue`** — Header com mês/ano + navegação + toggle
   ```vue
   <!-- Usa: CalendarMonthHeader + ViewToggleGroup -->
   <!-- Combina título com controles -->
   ```

4. **`LegendItem.vue`** — Dot + texto de legenda
   ```vue
   <!-- Usa: LegendDot + texto -->
   <!-- Props: color, label -->
   ```

5. **`WeekRow.vue`** — Row com 7 `DayCell`
6. **`CheckboxGroup.vue`** — Grupo de checkboxes
7. **`ViewToggleGroup.vue`** — Grupo de botões de toggle
8. **`CalendarMonthHeader.vue`** — Cabeçalho simplificado

**Quando criar uma molécula:**
- Você repete a combinação de 2-4 átomos em múltiplos lugares
- A estrutura é sempre a mesma (ex: sempre 7 dias na row)
- Não precisa fazer fetch ou ter lógica condicional complexa

---

### 🟢 Organismos (3 no projeto)

**Características:**
- ✅ **Autônomo** — funciona independentemente
- ✅ **Props são objetos de domínio** — recebe `event`, `user`, `filters`
- ✅ **Gerencia estado local** — usa `ref()`, `reactive()`, `computed()`
- ✅ **Lógica de negócio** — filtragem, formatação, validação
- ✅ **Pode fazer fetch** — chamadas API (mas não obrigatório)
- ✅ **Combina moléculas + átomos** — estrutura complexa

**Exemplos reais do projeto:**

1. **`CalendarGrid.vue`** — Grid completo de calendário com eventos
   ```vue
   <!-- Usa: CalendarDaysHeader + WeekRow (6x) -->
   <!-- Props: events (array), selectedDate, filters -->
   <!-- Emits: date-selected, event-clicked -->
   <!-- Lógica: filtra eventos por data, calcula semanas do mês -->
   <script setup>
   import { ref, computed } from 'vue'
   const weeks = computed(() => calculateWeeks(currentMonth.value))
   const filteredEvents = computed(() => filterEventsByDate(events.value))
   </script>
   ```

2. **`ActivityLegend.vue`** — Legenda de tipos de atividade com filtros
   ```vue
   <!-- Usa: LegendItem (3x) + Checkbox -->
   <!-- Props: activities (array de objetos) -->
   <!-- Emits: filter-changed -->
   <!-- Lógica: gerencia estado de filtros ativos -->
   <script setup>
   const activeFilters = ref(['missao', 'olimpiada', 'avaliacao'])
   const toggleFilter = (type) => { /* lógica */ }
   </script>
   ```

3. **`CalendarSidebar.vue`** — Sidebar com mini-calendário + filtros
   ```vue
   <!-- Usa: CalendarGrid (versão mini) + CheckboxGroup + LegendItem -->
   <!-- Props: events, filters -->
   <!-- Emits: filter-changed, date-changed -->
   <!-- Lógica: sincroniza filtros com calendário principal -->
   ```

**Quando criar um organismo:**
- Precisa fazer fetch de API
- Gerencia múltiplos estados relacionados (filtros, seleção, edição)
- Combina 3+ moléculas com lógica condicional
- Poderia ser extraído e usado em outro projeto com adaptações mínimas

---

### 🟡 Templates (1 no projeto)

**Características:**
- ✅ **Layout de página** — estrutura com header/sidebar/main/footer
- ✅ **Usa slots** — define áreas substituíveis
- ✅ **Sem props de dados** — apenas props de configuração (ex: `hasSidebar`)
- ✅ **Sem lógica de negócio** — apenas posicionamento

**Exemplo real:**

1. **`CalendarLayoutTemplate.vue`** — Layout 2 colunas com sidebar
   ```vue
   <template>
     <div class="calendar-layout">
       <aside v-if="hasSidebar" class="sidebar">
         <slot name="sidebar" />
       </aside>
       <main class="main-content">
         <header class="header">
           <slot name="header" />
         </header>
         <section class="content">
           <slot name="content" />
         </section>
       </main>
     </div>
   </template>
   
   <script setup>
   defineProps({
     hasSidebar: { type: Boolean, default: true },
     sidebarWidth: { type: String, default: '300px' }
   })
   </script>
   ```

**Quando criar um template:**
- Você repete o mesmo layout em 3+ páginas
- A estrutura é fixa mas o conteúdo varia
- Precisa de responsividade consistente

---

### 🟣 Páginas (Views em `src/views/`)

**Não são componentes reutilizáveis!** São instâncias específicas que:
- Importam Templates + Organismos
- Conectam com Vuex/Pinia
- Fazem fetches iniciais
- Gerenciam rotas

**Exemplo:**
```vue
<!-- src/views/teacher/Calendar.vue -->
<template>
  <CalendarLayoutTemplate has-sidebar>
    <template #sidebar>
      <CalendarSidebar :events="events" @filter-changed="handleFilter" />
    </template>
    <template #content>
      <CalendarGrid :events="filteredEvents" />
    </template>
  </CalendarLayoutTemplate>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEvents } from '@/services/calendar.service'

const events = ref([])
onMounted(async () => {
  events.value = await getEvents()
})
</script>
```

---

## Workflow: Criando um Novo Componente

### 1️⃣ Planejamento (5 min)

**Perguntas obrigatórias:**

```
❓ O que esse componente faz?
→ Resposta curta (ex: "Exibe célula de dia do calendário")

❓ Ele pode ser dividido em partes menores?
→ SIM: Não é átomo → vá para pergunta 2
→ NÃO: É átomo → pasta atoms/

❓ Quantos outros componentes ele usa?
→ 0-1: Átomo
→ 2-4 sem lógica: Molécula
→ 5+ com lógica: Organismo

❓ Ele faz fetch ou gerencia estado complexo?
→ SIM: Organismo
→ NÃO: Molécula ou átomo
```

**Decision Script:**
```bash
# Responda as perguntas e o script sugere a pasta
node .agents/skills/atomic-design-educacross/scripts/classify-component.js
```

---

### 2️⃣ Estrutura de Arquivo

**Template base (todos os níveis):**

```vue
<template>
  <!-- HTML com classes BEM -->
  <div class="component-name">
    <span class="component-name__element">{{ prop }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props com validação
const props = defineProps({
  propName: {
    type: String,
    required: true,
    validator: (value) => ['option1', 'option2'].includes(value)
  }
})

// Emits tipados
const emit = defineEmits(['event-name'])

// Computed (se necessário)
const computedValue = computed(() => props.propName.toUpperCase())

// Métodos
const handleClick = () => {
  emit('event-name', computedValue.value)
}
</script>

<style lang="scss" scoped>
// BEM naming
.component-name {
  // Usar CSS custom properties do Vuexy
  color: var(--primary);
  
  &__element {
    font-size: 15px;
  }
  
  &--modifier {
    background: rgba(47, 43, 61, 0.08);
  }
}
</style>
```

---

### 3️⃣ Regras de Props

**Átomos e Moléculas (primitivos):**
```javascript
// ✅ BOM
defineProps({
  label: { type: String, required: true },
  size: { type: Number, default: 36 },
  isActive: { type: Boolean, default: false },
  colors: { type: Array, default: () => [] }
})

// ❌ RUIM (objetos complexos em átomos)
defineProps({
  event: { type: Object } // NÃO! Use em organismos
})
```

**Organismos (objetos de domínio):**
```javascript
// ✅ BOM
defineProps({
  events: { 
    type: Array, 
    required: true,
    validator: (events) => events.every(e => e.id && e.date)
  },
  filters: {
    type: Object,
    default: () => ({ types: [], dates: [] })
  }
})
```

---

### 4️⃣ Regras de Emits

**Sempre documente eventos:**
```javascript
// ✅ BOM
const emit = defineEmits([
  'click',           // Emitido quando célula é clicada
  'date-selected',   // Emitido com objeto { date, events }
  'filter-changed'   // Emitido com array de tipos ativos
])

// ❌ RUIM (sem documentação)
const emit = defineEmits(['update'])
```

**Nomenclatura:**
- Átomos: verbos simples (`click`, `change`, `input`)
- Moléculas: verbos + contexto (`day-clicked`, `month-changed`)
- Organismos: ações de domínio (`filter-applied`, `event-created`, `date-selected`)

---

### 5️⃣ Regras de Estilos

**OBRIGATÓRIO:**
```vue
<style lang="scss" scoped>
// ✅ Sempre usar scoped
// ✅ Sempre usar BEM naming
// ✅ Sempre usar CSS custom properties do Vuexy

.day-cell {
  width: 36px;
  height: 36px;
  border-radius: 500px;
  color: var(--text-primary); // Vuexy var
  
  &__indicator {
    width: 6px;
    height: 6px;
  }
  
  &--selected {
    background: rgba(var(--primary-rgb), 0.24);
  }
  
  &:hover:not(.day-cell--disabled) {
    background: rgba(47, 43, 61, 0.06);
  }
}
</style>
```

**PROIBIDO:**
```vue
<style>
/* ❌ Sem scoped */
.cell { color: red; }
</style>

<style scoped>
/* ❌ Classes utility inline (usar no template) */
.cell { 
  display: flex; /* Use class="d-flex" */
  margin-bottom: 1rem; /* Use class="mb-1" */
}
</style>
```

**Quando usar CSS customizado vs classes utility:**
- **Utility classes** (template): layout (flex, grid), espaçamento (mb-1, p-2), cores (text-primary)
- **CSS scoped** (style): dimensões específicas (36px), border-radius (500px), transitions, hover states customizados

---

## Validação Automática

### Script: `validate-component.js`

**Uso:**
```bash
# Validar um componente específico
node .agents/skills/atomic-design-educacross/scripts/validate-component.js src/components/atoms/DayCell.vue

# Validar todos os componentes de uma pasta
node .agents/skills/atomic-design-educacross/scripts/validate-component.js src/components/atoms/

# Output:
# ✅ DayCell.vue: VÁLIDO
#    - Pasta correta: atoms/
#    - Props com tipos: day (Number), isSelected (Boolean)
#    - Emits documentados: click, mouseenter
#    - Estilo scoped: ✓
#    - BEM naming: ✓
#
# ❌ BadComponent.vue: INVÁLIDO
#    - Props sem validação: color
#    - Estilo não scoped
#    - Classes utility no CSS (use no template)
```

**Verificações:**

1. **Localização** — componente está na pasta correta (atoms/molecules/organisms)
2. **Props** — todas têm `type`, `required` ou `default`
3. **Emits** — declarados no `defineEmits()`
4. **Estilos** — `<style scoped>` presente
5. **BEM naming** — classes seguem padrão `component__element--modifier`
6. **CSS utilities** — não há `display: flex`, `margin-bottom` no CSS (usar classes no template)
7. **Importações** — átomos não importam organismos

---

## Exemplos de Refatoração

### Caso 1: Extrair átomo duplicado

**Antes (código duplicado em 3 lugares):**
```vue
<!-- WeekRow.vue -->
<div class="day" @click="selectDay(1)">1</div>
<div class="day" @click="selectDay(2)">2</div>
<!-- ... -->
<style scoped>
.day {
  width: 36px;
  height: 36px;
  border-radius: 500px;
  /* ... 20 linhas de estilo ... */
}
</style>

<!-- MiniCalendar.vue -->
<div class="cell" @click="pickDate(day)">{{ day }}</div>
<style scoped>
.cell {
  width: 36px; /* mesmo estilo! */
  height: 36px;
  /* ... duplicação ... */
}
</style>
```

**Depois (átomo reutilizável):**
```vue
<!-- src/components/atoms/DayCell.vue -->
<template>
  <div class="day-cell" @click="$emit('click', day)">
    {{ day }}
  </div>
</template>

<script setup>
defineProps({
  day: { type: Number, required: true }
})
defineEmits(['click'])
</script>

<style lang="scss" scoped>
.day-cell {
  width: 36px;
  height: 36px;
  border-radius: 500px;
  /* estilo centralizado */
}
</style>

<!-- Uso em WeekRow.vue -->
<DayCell v-for="d in 7" :key="d" :day="d" @click="selectDay" />

<!-- Uso em MiniCalendar.vue -->
<DayCell :day="day" @click="pickDate" />
```

**Benefícios:**
- ✅ Estilo centralizado (1 fonte de verdade)
- ✅ Mudanças propagam automaticamente
- ✅ Menos CSS total no bundle

---

### Caso 2: Promover molécula para organismo

**Quando promover:**
- Molécula começa a fazer fetch
- Molécula gerencia estado complexo (múltiplos refs relacionados)
- Molécula tem lógica de negócio (filtragem, validação)

**Antes (molécula sobrecarregada):**
```vue
<!-- src/components/molecules/CalendarHeader.vue -->
<template>
  <div class="header">
    <NavigationButton icon="chevron_left" @click="previousMonth" />
    <h2>{{ currentMonth }}</h2>
    <NavigationButton icon="chevron_right" @click="nextMonth" />
    
    <!-- Começou a adicionar filtros... -->
    <Checkbox v-model="showMissions" label="Missões" />
    <Checkbox v-model="showEvaluations" label="Avaliações" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getEvents } from '@/services/calendar.service'

// Estado crescendo...
const currentDate = ref(new Date())
const showMissions = ref(true)
const showEvaluations = ref(true)
const events = ref([])

// Lógica de negócio...
const currentMonth = computed(() => formatMonth(currentDate.value))

watch([showMissions, showEvaluations], async () => {
  events.value = await getEvents({ /* filtros */ })
})

// Red flag: molécula fazendo fetch!
</script>
```

**Depois (organismo):**
```vue
<!-- src/components/organisms/CalendarControls.vue -->
<template>
  <div class="calendar-controls">
    <CalendarHeader 
      :current-month="currentMonth"
      @previous-month="handlePreviousMonth"
      @next-month="handleNextMonth"
    />
    
    <FilterGroup 
      v-model="activeFilters"
      :options="filterOptions"
      @change="fetchEvents"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getEvents } from '@/services/calendar.service'
import CalendarHeader from '@/components/molecules/CalendarHeader.vue'
import FilterGroup from '@/components/molecules/FilterGroup.vue'

// Organismo gerencia lógica complexa
const currentDate = ref(new Date())
const activeFilters = ref(['missao', 'avaliacao'])
const events = ref([])

const fetchEvents = async () => {
  events.value = await getEvents({
    month: currentDate.value,
    types: activeFilters.value
  })
}

defineExpose({ events }) // Expõe dados para testes
</script>
```

---

## Anti-Patterns (O que NÃO fazer)

### ❌ Átomo fazendo fetch

```vue
<!-- atoms/UserAvatar.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { getUser } from '@/services/user.service'

const user = ref(null)

// ❌ ERRADO: átomo fazendo fetch!
onMounted(async () => {
  user.value = await getUser(props.userId)
})
</script>
```

**Solução:** Mova fetch para organismo/página e passe `user` como prop.

---

### ❌ Molécula importando organismo

```vue
<!-- molecules/CalendarRow.vue -->
<script setup>
// ❌ ERRADO: molécula dependendo de organismo!
import CalendarSidebar from '@/components/organisms/CalendarSidebar.vue'
</script>
```

**Hierarquia de importação permitida:**
- Páginas → Templates, Organismos
- Templates → Organismos
- Organismos → Moléculas, Átomos
- Moléculas → Átomos
- Átomos → **NADA** (exceto utilitários)

---

### ❌ Props de objeto complexo em átomo

```vue
<!-- atoms/DayCell.vue -->
<script setup>
// ❌ ERRADO: átomo recebendo objeto de domínio!
defineProps({
  event: { type: Object, required: true } // { id, date, type, title... }
})
</script>
```

**Solução:** Átomo deve receber primitivos:
```javascript
// ✅ CORRETO
defineProps({
  hasEvent: { type: Boolean },
  eventColor: { type: String }
})
```

---

### ❌ Estilo global sem scoped

```vue
<style>
/* ❌ ERRADO: estilo global vazando para outros componentes! */
.day {
  width: 36px;
  height: 36px;
}
</style>
```

**Solução:**
```vue
<style lang="scss" scoped>
/* ✅ CORRETO: estilo isolado */
.day-cell {
  width: 36px;
  height: 36px;
}
</style>
```

---

## Checklist de Revisão

Antes de commitar um novo componente:

### Para TODOS os níveis:

- [ ] Arquivo está na pasta correta (`atoms/`, `molecules/`, `organisms/`, `templates/`)
- [ ] Nome do arquivo é PascalCase (`DayCell.vue`, não `dayCell.vue`)
- [ ] Todas as props têm `type`, `required` ou `default`
- [ ] Props com opções limitadas têm `validator`
- [ ] Emits estão declarados no `defineEmits()`
- [ ] Estilos usam `<style lang="scss" scoped>`
- [ ] Classes CSS seguem BEM: `.component__element--modifier`
- [ ] Usa CSS custom properties do Vuexy: `var(--primary)`, `rgba(var(--primary-rgb), 0.24)`
- [ ] Não há utility classes no CSS (`display: flex` → use `class="d-flex"`)
- [ ] Componente roda `npm run lint` sem erros

### Para Átomos:

- [ ] Não importa outros componentes (exceto utilitários)
- [ ] Props são primitivos (String, Number, Boolean, Array simples)
- [ ] Não faz fetch ou acessa Vuex/Pinia
- [ ] Não tem lógica de negócio (apenas apresentação)
- [ ] Pode ser usado fora do contexto do calendário

### Para Moléculas:

- [ ] Combina 2-4 átomos
- [ ] Não faz fetch ou acessa Vuex/Pinia
- [ ] Props são primitivos ou arrays simples
- [ ] Não tem estado reativo local (`ref()`, `reactive()`)

### Para Organismos:

- [ ] Combina moléculas e/ou átomos
- [ ] Pode fazer fetch (mas não obrigatório)
- [ ] Props podem ser objetos de domínio
- [ ] Gerencia estado local se necessário
- [ ] Tem testes unitários (mínimo: render + eventos)

---

## Recursos

- **Spec completa:** [references/atomic-design-spec.md](./references/atomic-design-spec.md)
- **Script de validação:** [scripts/validate-component.js](./scripts/validate-component.js)
- **Decision tree SVG:** [assets/decision-tree.svg](./assets/decision-tree.svg)
- **Documentação oficial:** [ATOMIC-DESIGN.md](../../../ATOMIC-DESIGN.md)
- **Brad Frost (criador):** [atomicdesign.bradfrost.com](https://atomicdesign.bradfrost.com/)

---

## FAQ

**P: Meu componente combina 2 átomos mas tem um `computed`. É molécula ou organismo?**  
R: **Molécula**. `computed` básico é permitido em moléculas. Se o computed faz filtragem complexa ou chama API, aí é organismo.

**P: Posso ter estado local (`ref()`) em molécula?**  
R: Apenas para **estado de UI** interno (ex: `isHovered`). Para estado de negócio, use organismo.

**P: Átomo pode importar outro átomo?**  
R: **Não**. Átomos devem ser independentes. Se precisa compor, é molécula.

**P: Onde coloco componentes de modais e drawers?**  
R: Normalmente **organismos** (têm overlay, animações, gerenciam estado aberto/fechado). Exemplo: `EventDrawer.vue` em `organisms/`.

**P: E componentes de terceiros (Bootstrap Vue)?**  
R: Não precisam estar na estrutura atomic. Importe direto: `import { BButton } from 'bootstrap-vue'`.

**P: Meu organismo ficou com 800 linhas. O que fazer?**  
R: Extraia moléculas privadas para uma subpasta `components/` dentro do organismo:
```
organisms/
  CalendarGrid.vue (organismo principal)
  components/ (subcomponentes privados)
    CalendarWeek.vue
    EventPopover.vue
```

---

**Última atualização:** 2026-02-12  
**Versão:** 1.0.0  
**Autor:** Educacross Development Team
