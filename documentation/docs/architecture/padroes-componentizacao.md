---
sidebar_position: 2
title: Padrões de Componentização (Calendário)
description: Detalhes da arquitetura Atomic Design aplicada ao Calendário
---

# Padrões de Componentização: Atomic Design

O Sistema de Calendário foi construído utilizando os princípios de **Atomic Design**, garantindo alta reusabilidade e facilidade de manutenção em um projeto complexo com múltiplas visões.

---

## 🏗️ Estrutura de Camadas

### 1. Atoms (Átomos)
Componentes indivisíveis que não possuem lógica de negócio complexa.
*   `CalendarChip.vue`: Renderiza o card colorido de um evento com seu ícone de origem.
*   `StatusBadge.vue`: Pequeno indicador de status (Ativo, Agendado, Cancelado).
*   `NavigationButton.vue`: Setas de navegação (Próximo/Anterior) estilizadas.

### 2. Molecules (Moléculas)
Grupos de átomos que funcionam juntos como uma unidade.
*   `CalendarHeader.vue`: Barra superior com título do mês/ano, botões de navegação e seletor de visualização (Mês/Semana/Dia).
*   `WeekRow.vue`: Uma linha representando 7 dias, usada na visão mensal.
*   `FilterChipGroup.vue`: Grupo de filtros clicáveis para categorias de eventos.

### 3. Organisms (Organismos)
Seções complexas da interface que formam uma funcionalidade distinta.
*   `MonthView.vue`: O grid principal 7x5 do calendário. Responsável por calcular os dias do mês atual e preencher com eventos.
*   `EventDrawer.vue`: Painel lateral que surge para mostrar detalhes ou edição de um evento selecionado.
*   `MiniCalendar.vue`: Versão reduzida do calendário usada em sidebars (ex: Dashboard do Professor).

### 4. Templates
Layouts que organizam os organismos na página.
*   `CalendarLayout.vue`: Estrutura de 2 colunas: Sidebar de filtros à esquerda e View do calendário à direita.

---

## 🧠 Gestão de Estado: `useCalendar.js`

Em vez de espalhar a lógica de datas por todos os componentes, centralizamos no Composable **`useCalendar`**.

**Responsabilidades:**
1.  **Navegação Temporal**: Métodos `nextMonth()`, `prevMonth()`, `setToday()`.
2.  **Cálculo de Grid**: Função que retorna um array de objetos `Date` para preencher o calendário, incluindo dias do mês anterior/próximo para completar a semana.
3.  **Filtragem de Dados**: Lógica reativa para filtrar os eventos do JSON baseado nas seleções do usuário (Categoria/Origem).

```javascript
// Exemplo simplificado do fluxo
const { 
  currentDate, 
  calendarDays, 
  filteredEvents 
} = useCalendar(allEventsFromData)
```

---

## 🎨 Estilização e Temas

Utilizamos **CSS Custom Properties** (Variáveis) para permitir mudanças rápidas na paleta de cores sem precisar editar componentes individuais.

```css
/* Definido globalmente na aplicação */
:root {
  --calendar-missions: #7F6CC3;
  --calendar-event-padding: 8px;
  --calendar-border-color: #E6E6E8;
}
```

Essa abordagem permite que o Calendário se adapte facilmente ao "Dark Mode" ou a diferentes temas de cores de Redes Escolares específicas no futuro.
