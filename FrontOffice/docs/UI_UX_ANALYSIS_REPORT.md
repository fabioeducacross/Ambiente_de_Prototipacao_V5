# Relatório de Análise UI/UX - Calendário Educacross

**Data:** 18/02/2026  
**Versão analisada:** FrontOffice v0.1  
**Métodos:** Inspeção visual, teste de responsividade, análise de acessibilidade  

---

## 1. Resumo Executivo

| Área | Nota | Principais Issues |
|------|------|-------------------|
| **Layout e Hierarquia** | 8/10 | Mini-calendar redundante, falta "Hoje" |
| **Drawer de Eventos** | 6/10 | Dados inconsistentes, falta validação |
| **Responsividade** | 7/10 | Mobile precisa ajustes de layout |
| **Acessibilidade** | 8/10 | Bom uso de ARIA, falta skip links |
| **Feedback Visual** | 7/10 | Falta loading states, toasts |

**Nota Geral:** 7.2/10 - Boa fundação, precisa refinamento crítico

---

## 2. Problemas Críticos Detectados 🔴

### 2.1 Drawer de Edição - Inconsistência de Dados

**Problema:** Ao clicar em evento de 10/02, drawer abre com data **20/06/2026**

**Impacto:** Alto - usuário pode alterar data sem perceber

**Evidência:**
- Evento: "Missão: Jogo das Tabuadas" (10/02)
- Drawer exibe: "20/06/2026" no campo Data de início

**Solução:**
```vue
<!-- EventDrawer.vue - linha ~180 -->
// Garantir que formData.dataInicio seja preenchida corretamente
watch(() => props.eventData, (newData) => {
  if (newData) {
    formData.dataInicio = newData.dataInicio || newData.start_at
    formData.dataTermino = newData.dataTermino || newData.end_at
    // ...resto dos campos
  }
}, { immediate: true, deep: true })
```

---

### 2.2 Campo Título Vazio no Modo Edição

**Problema:** Título do evento não aparece no campo ao abrir para editar

**Impacto:** Médio/Alto - usuário precisa redigitar título

**Evidência:** Campo "Título *" está vazio quando deveria mostrar "Missão: Jogo das Tabuadas"

**Solução:**
```vue
// Verificar mapeamento de campos
formData.titulo = eventData.titulo || eventData.title || ''
```

---

### 2.3 Turmas Não Selecionadas no Modo Edição

**Problema:** Dropdown de turmas mostra "Selecione uma opção" mesmo quando evento já tem turmas

**Impacto:** Alto - perda de dados ao salvar

**Solução:**
```vue
// EventDrawer.vue - transformar turmas em formato do ESelect
formData.turmas = (eventData.turmas || []).map(id => {
  return turmaOptions.find(opt => opt.id === id)
}).filter(Boolean)
```

---

## 3. Problemas de UI/UX (Média Prioridade) 🟡

### 3.1 Mini-calendar + Sidebar Redundantes

**Problema:** Dois calendários na mesma tela (sidebar + main)

**Sugestão:**
- Remover mini-calendar do sidebar OU
- Torná-lo date picker rápido (clicar no dia navega para aquele dia no main calendar)

---

### 3.2 Falta Botão "Hoje"

**Problema:** Usuário precisa navegar mês a mês para voltar ao dia atual

**Solução:**
```vue
<!-- CalendarHeader.vue -->
<button @click="goToToday" class="btn-today">
  Hoje
</button>
```

---

### 3.3 Feedback Visual Ausente

**Problemas:**
- Sem loading state ao carregar eventos
- Sem toast/notificação ao salvar
- Sem confirmação ao deletar (risco de deleção acidental)

**Solução:**
```vue
// EventDrawer.vue - antes de deletar
const confirmDelete = async () => {
  if (confirm('Tem certeza que deseja deletar este evento?')) {
    await handleDelete()
    showToast('Evento deletado com sucesso', 'success')
  }
}
```

---

### 3.4 Eventos Multi-dia: Difícil Identificar Duração

**Problema:** Barra spanning não mostra visualmente quantos dias o evento ocupa

**Sugestão:**
- Adicionar texto "X dias" no evento
- Ou mostrar tooltip com duração ao hover

---

### 3.5 Cores dos Filtros Não Match com Eventos

**Problema:** Checkboxes dos filtros usam cores como borda, mas eventos usam como fundo

**Impacto:** Inconsistência visual leve

**Sug gestão:** Padronizar uso de cor (ambos com fundo colorido ou ambos com borda)

---

## 4. Acessibilidade

### ✅ O que está bom

- Labels associados a inputs (`<EFormGroup>`)
- Ícones com roles adequados
- Contraste de cores OK
- Checkboxes com estados visíveis

### ❌ O que falta

#### 4.1 Skip Links

**Problema:** Usuário de teclado precisa tabar por toda sidebar e navbar

**Solução:**
```vue
<!-- App.vue -->
<a href="#main-content" class="skip-link">
  Pular para conteúdo principal
</a>
```

#### 4.2 Focus Trap no Drawer

**Problema:** Ao abrir drawer, foco não é capturado (Tab escapa para sidebar)

**Solução:** Usar `useFocusTrap` do VueUse

```js
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const drawerRef = ref(null)
const { activate, deactivate } = useFocusTrap(drawerRef)

watch(() => isOpen.value, (open) => {
  if (open) activate()
  else deactivate()
})
```

#### 4.3 ARIA Live Regions

**Problema:** Mudanças dinâmicas (filtros, navegação de mês) não são anunciadas

**Solução:**
```vue
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {{ accessibilityMessage }}
</div>

// Quando mudar mês:
accessibilityMessage.value = `Calendário atualizado para ${format(currentDate, 'MMMM yyyy', { locale: ptBR })}`
```

---

## 5. Responsividade

### Desktop (1920px) ✅
- Layout 3 colunas: sidebar | calendar | (drawer quando aberto)
- Bem espaçado, legível

### Tablet (768px) 🟡
- Sidebar se mantém (deveria colapsar para menu hamburguer?)
- Calendário fica comprimido mas funcional
- Drawer sobrepõe todo conteúdo (OK)

### Mobile (375px) ❌
**Problemas detectados:**
- Sidebar não colapsa (ocupa espaço precioso)
- Grid do calendário fica ilegível (células muito pequenas)
- Mini-calendar sidebar totalmente dispensável em mobile

**Solução:**
```vue
<!-- CalendarSidebar.vue -->
<aside 
  class="calendar-sidebar"
  :class="{ 'mobile-collapsed': !sidebarOpen && isMobile }"
>
  <!-- Mobile: botão hamburguer para abrir -->
  <button v-if="isMobile" @click="toggleSidebar" class="mobile-toggle">
    <span class="material-symbols-outlined">menu</span>
  </button>
  
  <!-- Conteúdo só renderiza se desktop OU se mobile com sidebar aberta -->
  <div v-if="!isMobile || sidebarOpen" class="sidebar-content">
    <!-- Filtros, etc -->
  </div>
</aside>
```

**CSS Mobile:**
```css
@media (max-width: 768px) {
  .calendar-sidebar {
    position: fixed;
    left: -300px;
    transition: left 0.3s ease;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  }
  
  .calendar-sidebar.mobile-open {
    left: 0;
  }
  
  /* Esconder mini-calendar em mobile */
  .sidebar-picker {
    display: none;
  }
  
  /* Grid do calendário: fonte menor */
  .month-view-grid .event-badge {
    font-size: 10px;
    padding: 2px 4px;
  }
}
```

---

## 6. Melhorias de Usabilidade

### 6.1 Atalhos de Teclado

**Sugestão:**
- `T` → Ir para Hoje
- `N` → Novo evento
- `← / →` → Navegar meses
- `M / W / D` → Mudar visão (Month/Week/Day)
- `Esc` → Fechar drawer

**Implementação:**
```js
// composable: useKeyboardShortcuts.js
export function useKeyboardShortcuts(handlers) {
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
  
  function handleKeyDown(e) {
    // Se estiver em input, ignorar
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
    
    if (e.key === 't' && handlers.onToday) handlers.onToday()
    if (e.key === 'n' && handlers.onNew) handlers.onNew()
    // ...
  }
}
```

---

### 6.2 Arrastar e Soltar Eventos

**Contexto:** Especificação menciona gerenciar atividades, mas não permite mover eventos arrastando

**Impacto no MVP:** Baixo (funcionalidade v2)

**Sugestão:** Adicionar para v1.1 usando `@vueuse/gesture`

---

### 6.3 Visualização Rápida (Quick View)

**Problema:** Sempre que clico em evento, drawer completo abre (pesado)

**Sugestão:** Tooltip expandido ao hover com info resumida + ação "Ver mais"

```vue
<!-- EventCard.vue -->
<div 
  @mouseenter="showQuickView" 
  @mouseleave="hideQuickView"
  @click="openFullDrawer"
>
  <!-- Card do evento -->
</div>

<Teleport to="body">
  <div v-if="quickViewOpen" class="quick-view-tooltip" :style="position">
    <h4>{{ event.title }}</h4>
    <p class="quick-meta">
      <span>{{ formatDate(event.start_at) }}</span>
      <EBadge>{{ event.category }}</EBadge>
    </p>
    <p class="quick-description">{{ truncate(event.description, 100) }}</p>
    <button @click.stop="openFullDrawer" class="link-btn">Ver detalhes →</button>
  </div>
</Teleport>
```

---

## 7. Hierarquia de Informação

### Drawer de Visualização ✅

**O que está bom:**
- Badge de categoria no topo (cor destaque)
- Título H3 (hierarquia correta)
- Info rows com ícones + labels
- Descrição separada visualmente

**O que pode melhorar:**
- Origem poderia ter badge ao invés de text simples (mais destaque visual)
- Status deveria terprioridade maior que Origem

---

### Drawer de Edição 🟡

**Problemas:**
- Campos obrigatórios (*) não têm destaque visual forte
- Hint "Selecione uma ou mais turmas" compete visualmente com label
- Botão "Deletar" tem peso visual igual a "Atualizar" (deveria ser secundário/danger)

**Sugestão:**
```vue
<!-- Destaque de campo obrigatório -->
<style>
.form-label::after {
  content: ' *';
  color: #EA5455;
  font-weight: 600;
}
</style>

<!-- Hierarquia de botões -->
<div class="form-actions">
  <div class="danger-zone">
    <EButton variant="danger" size="small" @click="confirmDelete">
      Deletar
    </EButton>
  </div>
  <div class="primary-actions">
    <EButton variant="outline-primary" @click="closeDrawer">
      Cancelar
    </EButton>
    <EButton type="submit" variant="primary">
      Atualizar
    </EButton>
  </div>
</div>
```

---

## 8. Performance e Otimização

### 8.1 Renderização de Eventos

**Problema potencial:** Com +100 eventos no mês, pode ficar lento

**Solução:** Virtual scrolling para visão Lista

```js
import { useVirtualList } from '@vueuse/core'

const { list: virtualEvents, containerProps, wrapperProps } = useVirtualList(
  filteredEvents,
  { itemHeight: 80 }
)
```

---

### 8.2 Filtros Reativos

**Observação:** Filtros re-calculam todos os eventos a cada mudança

**Otimização:**
```js
// Usar computed com cache
const filteredEvents = computed(() => {
  return events.value.filter(event => {
    // Filtros...
  })
})

// OU memoizar resultado
const filteredEvents = useMemoize((categories, origins) => {
  return events.value.filter(/* ... */)
})
```

---

## 9. Checklist de Implementação Prioritária

### Alta Prioridade (P0) - Corrigir Agora

- [ ] **Drawer edição:** Preencher corretamente título, data e turmas
- [ ] **Confirmação de deleção:** Dialog antes de deletar evento
- [ ] **Toast de feedback:** Ao salvar/deletar/criar evento
- [ ] **Mobile:** Sidebar colapsável

### Média Prioridade (P1) - Próxima Sprint

- [ ] **Botão "Hoje"** no header do calendário
- [ ] **Focus trap** no drawer
- [ ] **ARIA live regions** para anúncios dinâmicos
- [ ] **Quick view tooltip** ao hover em eventos
- [ ] **Loading states** ao buscar/salvar dados

### Baixa Prioridade (P2) - Backlog

- [ ] **Atalhos de teclado**
- [ ] **Arrastar e soltar** eventos
- [ ] **Virtual scrolling** na visão Lista
- [ ] **Skip links** para acessibilidade
- [ ] **Remover mini-calendar** do sidebar (redundante)

---

## 10. Métricas de Sucesso

Para validar melhorias, medir:

| Métrica | Baseline | Meta |
|---------|----------|------|
| **Tempo para criar evento** | ? | < 30s |
| **Taxa de erro em formulário** | ? | < 5% |
| **Lighthouse Accessibility Score** | ? | > 95 |
| **Taxa de conclusão da ação "Editar"** | ? | > 90% |
| **Mobile usability (Google)** | ? | 100/100 |

---

## Conclusão

O calendário tem **ótima fundação arquitetural** (componentes bem organizados, design system consistente), mas precisa de **refinamento crítico na experiência de usuário**, especialmente:

1. **Integridade de dados** no drawer de edição
2. **Feedback visual** claro para ações do usuário
3. **Responsividade real** em mobile

Priorizando os itens P0, a experiência melhora significativamente com ~8h de desenvolvimento.
