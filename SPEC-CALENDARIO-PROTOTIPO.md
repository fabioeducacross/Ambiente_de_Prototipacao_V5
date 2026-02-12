# Especificação: Calendário Unificado (Protótipo)
**Versão**: 1.1 MVP - Adaptado para Prototipagem  
**Data**: 12/02/2026  
**Contexto**: Ambiente de Prototipação V5 - FrontOffice  
**Objetivo**: Prototipar visualmente o Calendário Unificado com dados mockados

---

## 1. Objetivo do Protótipo

Criar interface funcional do **Calendário Unificado** que demonstre:
- Consolidação visual de eventos manuais e atividades de módulos
- Codificação por cores (categoria) e ícones (origem)
- 4 visões: Mês, Semana, Dia, Lista
- Filtros por categoria e origem
- Fluxos de criação/edição (simulados)
- Hierarquia de perfis (6 personas)

## 2. Escopo do Protótipo

### ✅ Incluído
- Interface completa das 4 visões de calendário
- Dados mockados em JSON para demonstração
- Componentes reutilizáveis (chip, drawer, modal)
- Simulação de permissões via mock de perfil
- Fluxos de criação/edição de eventos manuais
- Deeplinking simulado para módulos
- Responsividade (desktop e mobile)

### ❌ Excluído (contexto de produção)
- APIs reais / endpoints backend
- Persistência de dados (banco)
- Autenticação real
- Notificações push/email
- Auditoria técnica
- Feature flags
- Sincronização em tempo real

---

## 3. Perfis (Personas) do Protótipo

Cada perfil terá **visão mockada** do calendário com dados específicos:

| Perfil | View Path | Origin Level | Escopo Padrão |
|--------|-----------|--------------|---------------|
| **Educacross** | `views/educacross/calendar/` | EDUCACROSS | Todas redes |
| **Gestor de Rede** | `views/network-manager/calendar/` | NETWORK | Escolas da rede |
| **Gestor Escolar** | `views/director/calendar/` | SCHOOL | Turmas da escola |
| **Coordenador** | `views/coordinator/calendar/` | SCHOOL | Turmas da escola |
| **Professor** | `views/teacher/calendar/` | TEACHER | Suas turmas |
| **Aluno** | `views/student/calendar/` | - | Sua turma (view-only) |

---

## 4. Estrutura de Dados Mockada

### 4.1 CalendarItem (JSON Mock)

```json
{
  "id": "evt-001",
  "title": "Missão: Frações Equivalentes",
  "description": "Atividade sobre frações para 5º ano",
  "category": "MISSIONS",
  "origin_level": "TEACHER",
  "source_type": "MODULE_MISSION",
  "source_id": "mission-123",
  "scope_level": "CLASS",
  "scope_ids": ["class-5a"],
  "start_at": "2026-02-15T08:00:00-03:00",
  "end_at": "2026-02-15T09:30:00-03:00",
  "all_day": false,
  "status": "ACTIVE",
  "deeplink": "/teacher/missions/123",
  "created_by": "Prof. Maria Silva"
}
```

### 4.2 Enums Mockados

```javascript
// data/calendar-enums.js
export const CATEGORIES = {
  MISSIONS: { label: 'Missões', color: '#7F6CC3', value: 'MISSIONS' },
  OLYMPIADS: { label: 'Olimpíadas', color: '#8BC728', value: 'OLYMPIADS' },
  ASSESSMENTS: { label: 'Avaliações', color: '#FE5153', value: 'ASSESSMENTS' },
  TRAILS: { label: 'Trilhas', color: '#00A5A0', value: 'TRAILS' },
  EXPEDITIONS: { label: 'Expedições', color: '#FFB443', value: 'EXPEDITIONS' },
  REMINDERS: { label: 'Lembretes', color: '#7CD7D3', value: 'REMINDERS' }
}

export const ORIGIN_LEVELS = {
  EDUCACROSS: { label: 'Educacross', icon: 'star' },
  NETWORK: { label: 'Rede', icon: 'hub' },
  SCHOOL: { label: 'Escola', icon: 'school' },
  TEACHER: { label: 'Professor', icon: 'person' }
}

export const STATUS = {
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  SCHEDULED: 'Agendado',
  ACTIVE: 'Ativo',
  CANCELED: 'Cancelado'
}
```

---

## 5. Codificação Visual

### 5.1 Cores por Categoria (chips)

```css
/* CSS Variables para cores do calendário */
:root {
  --calendar-missions: #7F6CC3;
  --calendar-olympiads: #8BC728;
  --calendar-assessments: #FE5153;
  --calendar-trails: #00A5A0;
  --calendar-expeditions: #FFB443;
  --calendar-reminders: #7CD7D3;
}

/* Classe do chip */
.calendar-chip {
  background: var(--calendar-missions); /* exemplo */
  color: #133D59; /* texto escuro para contraste */
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

### 5.2 Ícones por Origem (Material Symbols)

```html
<!-- Exemplo de uso no chip -->
<div class="calendar-chip" :style="{ background: categoryColor }">
  <span class="material-symbols-outlined">{{ originIcon }}</span>
  <span>{{ title }}</span>
</div>
```

**Mapeamento**:
- Educacross → `star`
- Rede → `hub` ou `home`
- Escola → `school`
- Professor → `person` ou `edit_square`

---

## 6. Estrutura de Componentes Vue

### 6.1 Arquitetura de Componentes

```
views/{persona}/calendar/
├── Index.vue              # Container principal do calendário
├── MonthView.vue          # Visão Mês (grid 7x5)
├── WeekView.vue           # Visão Semana (horários)
├── DayView.vue            # Visão Dia (timeline)
└── ListView.vue           # Visão Lista (mobile-first)

components/calendar/
├── CalendarHeader.vue     # Toolbar (navegação, filtros, visão)
├── CalendarChip.vue       # Chip do evento (reutilizável)
├── CalendarDayCell.vue    # Célula de dia (visão Mês)
├── EventDrawer.vue        # Drawer lateral de detalhes
├── EventModal.vue         # Modal de criar/editar evento
├── FilterSidebar.vue      # Sidebar de filtros (categoria/origem)
└── QuickAddButton.vue     # Botão "+" flutuante

data/
└── calendar-mock.json     # Dados mockados de eventos
```

### 6.2 Exemplo de Componente CalendarChip.vue

```vue
<template>
  <div 
    class="calendar-chip"
    :style="chipStyle"
    @click="$emit('click', event)"
  >
    <span class="material-symbols-outlined chip-icon">
      {{ originIcon }}
    </span>
    <span class="chip-title">{{ event.title }}</span>
    <span v-if="event.all_day" class="chip-badge">Dia todo</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES, ORIGIN_LEVELS } from '@/data/calendar-enums'

const props = defineProps({
  event: { type: Object, required: true }
})

const emit = defineEmits(['click'])

const chipStyle = computed(() => ({
  background: CATEGORIES[props.event.category]?.color || '#ccc',
  color: '#133D59'
}))

const originIcon = computed(() => 
  ORIGIN_LEVELS[props.event.origin_level]?.icon || 'help'
)
</script>

<style scoped>
.calendar-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.calendar-chip:hover {
  opacity: 0.85;
}

.chip-icon {
  font-size: 14px;
}

.chip-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-badge {
  background: rgba(255, 255, 255, 0.3);
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 10px;
}
</style>
```

---

## 7. Visões do Calendário

### 7.1 MonthView (Visão Mês)

**Comportamento**:
- Grid 7 colunas (domingo a sábado) × 5-6 linhas (semanas)
- Máximo 2 chips por dia
- Quando > 2 eventos: mostrar "+N" que abre lista do dia
- Multi-dia: renderizar barra contínua

**Componente principal**:
```vue
<template>
  <div class="month-grid">
    <div v-for="day in daysInMonth" :key="day.date" class="day-cell">
      <div class="day-number">{{ day.dayNumber }}</div>
      <div class="day-events">
        <CalendarChip 
          v-for="event in day.events.slice(0, 2)" 
          :key="event.id"
          :event="event"
          @click="openEventDetail(event)"
        />
        <div v-if="day.events.length > 2" class="more-events">
          +{{ day.events.length - 2 }}
        </div>
      </div>
    </div>
  </div>
</template>
```

### 7.2 WeekView (Visão Semana)

**Comportamento**:
- Timeline vertical (00:00 - 23:59)
- 7 colunas (dias da semana)
- Eventos posicionados por horário (`start_at`)
- Sobreposição horizontal quando conflito

### 7.3 DayView (Visão Dia)

**Comportamento**:
- Timeline vertical de 1 dia
- Largura cheia para eventos únicos
- Empilhamento horizontal quando sobreposição

### 7.4 ListView (Visão Lista)

**Comportamento**:
- Lista linear ordenada por data
- Agrupamento por dia (header com data)
- Ideal para mobile
- Scroll infinito (paginated mock)

---

## 8. Filtros e Controles

### 8.1 CalendarHeader.vue

```vue
<template>
  <div class="calendar-header">
    <!-- Navegação -->
    <div class="nav-controls">
      <button @click="previousPeriod">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <button @click="goToToday">Hoje</button>
      <button @click="nextPeriod">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
      <h2>{{ currentPeriodLabel }}</h2>
    </div>

    <!-- Toggle de Visão -->
    <div class="view-toggle">
      <button 
        v-for="view in views" 
        :key="view.value"
        :class="{ active: currentView === view.value }"
        @click="changeView(view.value)"
      >
        {{ view.label }}
      </button>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <button @click="toggleFilterSidebar">
        <span class="material-symbols-outlined">filter_list</span>
        Filtros
      </button>
      <button @click="toggleContextSelector">
        <span class="material-symbols-outlined">school</span>
        {{ selectedContext }}
      </button>
    </div>

    <!-- Adicionar Evento -->
    <button 
      v-if="canCreateEvent" 
      class="btn-primary"
      @click="openCreateModal"
    >
      <span class="material-symbols-outlined">add</span>
      Adicionar Evento
    </button>
  </div>
</template>
```

### 8.2 FilterSidebar.vue

```vue
<template>
  <aside class="filter-sidebar" :class="{ open: isOpen }">
    <h3>Filtros</h3>

    <!-- Filtro por Categoria -->
    <div class="filter-group">
      <h4>Categorias</h4>
      <label v-for="cat in categories" :key="cat.value">
        <input 
          type="checkbox" 
          :value="cat.value"
          v-model="selectedCategories"
        />
        <span 
          class="color-dot" 
          :style="{ background: cat.color }"
        ></span>
        {{ cat.label }}
      </label>
    </div>

    <!-- Filtro por Origem -->
    <div class="filter-group">
      <h4>Origem</h4>
      <label v-for="origin in origins" :key="origin.value">
        <input 
          type="checkbox" 
          :value="origin.value"
          v-model="selectedOrigins"
        />
        <span class="material-symbols-outlined">{{ origin.icon }}</span>
        {{ origin.label }}
      </label>
    </div>

    <!-- Botões -->
    <div class="filter-actions">
      <button @click="applyFilters">Aplicar</button>
      <button @click="clearFilters">Limpar</button>
    </div>
  </aside>
</template>
```

---

## 9. Fluxos de Interação (Protótipo)

### 9.1 Criar Evento Manual

1. Usuário clica em "+ Adicionar Evento"
2. Abrir `EventModal.vue` com formulário:
   - Título (input obrigatório)
   - Categoria (select: Missões, Lembretes, etc)
   - Data/Hora (date-time picker ou toggle "Dia todo")
   - Contexto (select: Turma X, Turma Y)
   - Descrição (textarea opcional)
3. Botões: "Salvar como Rascunho" | "Publicar"
4. Ao salvar: **simular adição ao mock JSON** (estado local do Vue)
5. Fechar modal e atualizar calendário

### 9.2 Abrir Detalhe do Evento

1. Usuário clica em chip de evento
2. Abrir `EventDrawer.vue` (drawer lateral) com:
   - Header com cor da categoria e ícone de origem
   - Título do evento
   - Meta: origem, data/hora, status
   - Descrição
   - **Se source_type = módulo**: botão "Abrir no Módulo" (deeplink simulado)
   - **Se evento manual**: botões "Editar" | "Duplicar" | "Cancelar"
3. Fechar drawer: ESC ou clique fora

### 9.3 Editar Evento Manual

1. No EventDrawer, clicar "Editar"
2. Abrir EventModal em modo edição (pre-filled)
3. Permitir edição se permissões OK (mock)
4. Salvar: atualizar mock local

### 9.4 Filtrar Eventos

1. Clicar em "Filtros"
2. Abrir FilterSidebar
3. Marcar/desmarcar categorias e origens
4. Clicar "Aplicar"
5. Re-renderizar calendário com filtros aplicados (computed property)

---

## 10. Permissões (Simuladas)

### 10.1 Mock de Perfil Atual

```javascript
// composables/useCurrentUser.js
export function useCurrentUser() {
  const currentUser = ref({
    id: 'user-001',
    name: 'Prof. Maria Silva',
    role: 'TEACHER', // ou DIRECTOR, NETWORK_MANAGER, etc.
    origin_level: 'TEACHER',
    scopes: [
      { level: 'CLASS', id: 'class-5a', name: '5º Ano A' },
      { level: 'CLASS', id: 'class-5b', name: '5º Ano B' }
    ]
  })

  return { currentUser }
}
```

### 10.2 Regras de Exibição (Computed)

```javascript
// composables/useCalendarPermissions.js
export function useCalendarPermissions() {
  const { currentUser } = useCurrentUser()

  const canCreateEvent = computed(() => {
    // Professor pode criar em suas turmas
    // Diretor pode criar em sua escola
    // etc.
    return ['TEACHER', 'DIRECTOR', 'NETWORK_MANAGER'].includes(currentUser.value.role)
  })

  const canEditEvent = (event) => {
    // Só edita se criador ou nível superior
    return event.origin_level === currentUser.value.origin_level
  }

  const canCancelEvent = (event) => {
    return canEditEvent(event) && event.status !== 'CANCELED'
  }

  return { canCreateEvent, canEditEvent, canCancelEvent }
}
```

---

## 11. Dados Mockados (Exemplo)

### 11.1 Arquivo: `data/calendar-mock-teacher.json`

```json
[
  {
    "id": "evt-001",
    "title": "Missão: Frações Equivalentes",
    "description": "Atividade sobre frações para 5º ano",
    "category": "MISSIONS",
    "origin_level": "TEACHER",
    "source_type": "MODULE_MISSION",
    "source_id": "mission-123",
    "scope_level": "CLASS",
    "scope_ids": ["class-5a"],
    "start_at": "2026-02-15T08:00:00-03:00",
    "end_at": "2026-02-15T09:30:00-03:00",
    "all_day": false,
    "status": "ACTIVE",
    "deeplink": "/teacher/missions/123",
    "created_by": "Prof. Maria Silva"
  },
  {
    "id": "evt-002",
    "title": "Avaliação Diagnóstica - Matemática",
    "category": "ASSESSMENTS",
    "origin_level": "SCHOOL",
    "source_type": "MODULE_ASSESSMENT",
    "source_id": "assessment-456",
    "scope_level": "SCHOOL",
    "scope_ids": ["school-001"],
    "start_at": "2026-02-18T09:00:00-03:00",
    "end_at": "2026-02-18T10:30:00-03:00",
    "all_day": false,
    "status": "SCHEDULED",
    "deeplink": "/teacher/evaluations/diagnostic/456",
    "created_by": "Coord. João Santos"
  },
  {
    "id": "evt-003",
    "title": "Lembrete: Revisar habilidade EF05MA08",
    "description": "Preparar revisão para frações",
    "category": "REMINDERS",
    "origin_level": "TEACHER",
    "source_type": "CALENDAR_MANUAL",
    "scope_level": "CLASS",
    "scope_ids": ["class-5a"],
    "start_at": "2026-02-20T00:00:00-03:00",
    "all_day": true,
    "status": "PUBLISHED",
    "created_by": "Prof. Maria Silva"
  },
  {
    "id": "evt-004",
    "title": "Olimpíada de Matemática - Inscrições",
    "category": "OLYMPIADS",
    "origin_level": "EDUCACROSS",
    "source_type": "MODULE_OLYMPIAD",
    "source_id": "olympiad-789",
    "scope_level": "NETWORK",
    "scope_ids": ["network-all"],
    "start_at": "2026-02-22T00:00:00-03:00",
    "end_at": "2026-02-28T23:59:59-03:00",
    "all_day": true,
    "status": "ACTIVE",
    "deeplink": "/teacher/olympics/789",
    "created_by": "Educacross"
  }
]
```

---

## 12. Regras Visuais Específicas

### 12.1 Empilhamento (Visão Mês)

```javascript
// utils/calendar-layout.js
export function limitEventsPerDay(events, maxVisible = 2) {
  return {
    visible: events.slice(0, maxVisible),
    hidden: events.slice(maxVisible),
    hasMore: events.length > maxVisible,
    moreCount: Math.max(0, events.length - maxVisible)
  }
}
```

### 12.2 Eventos Multi-dia (Barra Contínua)

```vue
<template>
  <div 
    v-for="event in multiDayEvents" 
    class="multi-day-bar"
    :style="multiDayStyle(event)"
  >
    {{ event.title }}
  </div>
</template>

<script setup>
function multiDayStyle(event) {
  const startDay = getDayIndex(event.start_at)
  const endDay = getDayIndex(event.end_at)
  const span = endDay - startDay + 1
  
  return {
    gridColumn: `${startDay + 1} / span ${span}`,
    background: CATEGORIES[event.category].color
  }
}
</script>
```

### 12.3 Indicador "+N"

```vue
<template>
  <div class="day-events">
    <CalendarChip 
      v-for="event in visibleEvents" 
      :key="event.id"
      :event="event"
    />
    <button 
      v-if="hasMore" 
      class="more-button"
      @click="openDayDrawer(day)"
    >
      +{{ moreCount }}
    </button>
  </div>
</template>
```

---

## 13. Rotas do Protótipo (FrontOffice)

### 13.1 Rotas de Calendário por Perfil

```javascript
// router/modules/teacher.routes.js
{
  path: '/teacher/calendar',
  name: 'TeacherCalendar',
  component: () => import('@/views/teacher/calendar/Index.vue'),
  meta: {
    title: 'Calendário | Professor',
    persona: 'Professor',
    breadcrumb: 'Calendário'
  }
}

// router/modules/student.routes.js
{
  path: '/student/calendar',
  name: 'StudentCalendar',
  component: () => import('@/views/student/calendar/Index.vue'),
  meta: {
    title: 'Calendário | Aluno',
    persona: 'Aluno',
    breadcrumb: 'Calendário'
  }
}

// ... repetir para director, coordinator, network-manager, administrator
```

---

## 14. Critérios de Aceite (Protótipo)

### ✅ Funcional
1. Calendário renderiza eventos mockados no período selecionado
2. Chips exibem cor por categoria e ícone por origem
3. 4 visões funcionais: Mês, Semana, Dia, Lista
4. Navegação entre períodos (anterior/próximo/hoje)
5. Filtros por categoria e origem atualizam a visualização
6. Limite de 2 chips por dia em visão Mês + "+N"
7. Clique em chip abre drawer de detalhes
8. Eventos de módulo exibem botão "Abrir no Módulo" (deeplink simulado)
9. Modal de criar evento funcional (simula adição ao estado)
10. Permissões mockadas impedem ações indevidas

### ✅ Visual
11. Paleta de cores Educacross aplicada corretamente
12. Ícones Material Symbols carregados
13. Responsivo: desktop (grid) e mobile (lista)
14. Transições suaves em modals/drawers
15. Estados de hover/active em chips e botões

### ✅ UX
16. Tooltip com título completo em chips truncados
17. Feedback visual ao aplicar filtros
18. Loading state simulado ao trocar período
19. Empty state quando não há eventos no período
20. Breadcrumb no header indica "Calendário > [Visão Atual]"

---

## 15. Decisões de Prototipagem

### ✅ Definido
- Usar **Vue 3 Composition API** + `<script setup>`
- Dados mockados em **JSON estático** (sem localStorage por enquanto)
- Biblioteca de datas: **date-fns** (já usado no projeto)
- Ícones: **Material Symbols** (via CDN)
- Filtros: **computed properties** (reatividade Vue)
- Multi-day events: **CSS Grid** para barras contínuas

### ⏳ Para decidir depois (fora do MVP)
- Recorrência de eventos (semanal/mensal)
- Drag & drop para reposicionar eventos
- Sincronização entre perfis (ex: aluno ver evento do professor)
- Notificações in-app ao criar/editar
- Export para PDF/iCal
- Integração com Google Calendar

---

## 16. Próximos Passos para Implementação

### Fase 1: Estrutura Base (1-2 dias)
1. Criar estrutura de componentes em `components/calendar/`
2. Criar mocks JSON para cada perfil em `data/calendar-mock-{persona}.json`
3. Criar enums em `data/calendar-enums.js`
4. Criar composables `useCurrentUser.js` e `useCalendarPermissions.js`

### Fase 2: Visão Mês (2-3 dias)
5. Implementar `MonthView.vue` com grid de dias
6. Implementar `CalendarChip.vue` com cores e ícones
7. Implementar limite de chips + "+N"
8. Implementar `EventDrawer.vue` para detalhes

### Fase 3: Outras Visões (2-3 dias)
9. Implementar `WeekView.vue` com timeline
10. Implementar `DayView.vue` com timeline de dia único
11. Implementar `ListView.vue` com scroll infinito mockado

### Fase 4: Interações (2-3 dias)
12. Implementar `EventModal.vue` para criar/editar
13. Implementar `FilterSidebar.vue` com checkboxes
14. Implementar lógica de filtros (computed)
15. Implementar permissões mockadas (show/hide de botões)

### Fase 5: Refinamento (1-2 dias)
16. Ajustar responsividade (mobile + desktop)
17. Adicionar transições e animações
18. Testar fluxos em todos os 6 perfis
19. Documentar uso no README

**Total estimado**: 8-13 dias de desenvolvimento front-end

---

## 17. Glossário (Contexto de Protótipo)

| Termo | Definição |
|-------|-----------|
| **Mock** | Dados simulados em JSON sem backend real |
| **Deeplink** | Rota interna Vue Router (ex: `/teacher/missions/123`) |
| **Computed** | Propriedade reativa do Vue que recalcula ao mudar dependências |
| **Drawer** | Painel lateral que abre sobre o conteúdo (ex: detalhes do evento) |
| **Chip** | Badge colorido exibindo resumo do evento (categoria + título) |
| **Origin Level** | Nível hierárquico de quem criou o item (Educacross > Rede > Escola > Professor) |
| **Scope** | Para quem o item é válido (Rede, Escola, Turma) |
| **All-day** | Evento que ocupa o dia inteiro (sem horário específico) |
| **Multi-day** | Evento que se estende por múltiplos dias consecutivos |

---

## 18. Referências Visuais

### Cores (Hex)
```
Missões:     #7F6CC3
Olimpíadas:  #8BC728
Avaliações:  #FE5153
Trilhas:     #00A5A0
Expedições:  #FFB443
Lembretes:   #7CD7D3
```

### Ícones Material Symbols
```
star              → Educacross
hub / home        → Rede
school            → Escola
person / edit     → Professor
chevron_left      → Voltar
chevron_right     → Avançar
filter_list       → Filtros
add               → Adicionar
close             → Fechar
more_horiz        → Menu de ações
```

---

**Documento pronto para uso pela equipe de design e engenharia front-end do protótipo!** 🎨🚀
