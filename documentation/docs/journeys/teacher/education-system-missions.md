---
sidebar_position: 2
title: Missões do Livro
---

# Missões do Livro do Sistema Educacional

## 📋 Informações Básicas

| Campo | Valor |
|-------|-------|
| **ID da Jornada** | `PROF-002` |
| **Título** | Visualizar e Gerenciar Missões de um Livro |
| **Contexto** | Professor / Teacher Context |
| **Persona** | Professora Maria - 35 anos, ensina Matemática para 5º ano |
| **Prioridade** | 🔴 Alta |
| **Status** | 📝 Documentado - Aguardando Protótipo |
| **Última Atualização** | 2026-02-03 |

## 🎯 Objetivo da Jornada

Após selecionar um livro, a professora Maria precisa visualizar todas as missões (atividades) daquele livro, acompanhar o progresso e rendimento da turma em cada missão, e realizar ações de gestão como habilitar, pausar ou visualizar detalhes de missões.

**O que a professora quer alcançar:**
- Ver lista completa de missões do livro selecionado
- Identificar missões já habilitadas vs não habilitadas
- Visualizar progresso (% de alunos que fizeram) e rendimento (% de acertos) por missão
- Habilitar novas missões para a turma
- Pausar missões em andamento
- Acessar detalhes e link de compartilhamento de missões
- Filtrar missões por unidade do livro e status

## 👤 Persona

**Nome**: Maria Silva  
**Papel**: Professora de Matemática - 5º ano  
**Contexto**: Acaba de clicar em um livro de Geometria e quer habilitar a próxima missão  
**Experiência**: Intermediária com tecnologia, usa plataforma diariamente

**Necessidades:**
- Visão clara do status de cada missão (habilitada, pausada, não enviada)
- Ações rápidas para habilitar/pausar missões
- Compartilhar link de missão com alunos facilmente
- Filtrar missões por capítulo/unidade do livro
- Ver quais são "Missões Plus" (premium)

## 📍 Contexto de Entrada

**Pré-condições:**
- Professora navegou de "Livros do Sistema Educacional" ([PROF-001](/docs/journeys/teacher/education-system-books))
- Livro específico selecionado (ex: "Geometria Básica")
- Turma e disciplina já selecionadas nos filtros globais
- Sistema educacional configurado

**Ponto de entrada:**
- Origem: Clique no card de livro ou botão "Ver Missões" (PROF-001)
- Rota: `/education-system/missions/:bookId`
- Breadcrumb: `[Sistema Educacional] > [Nome do Livro]`
- Filtro global `book` definido: `{ id: bookId, name: 'Nome do Livro' }`

## 🗺️ Fluxo AS-IS (Estado Atual)

### Diagrama de Fluxo

```mermaid
graph TD
    Start([📚 Origem: Grid de Livros<br/>PROF-001]) --> ClickBook[🖱️ Clica em livro<br/>exemplo: Geometria]
    ClickBook --> LoadMissions[⚙️ Sistema carrega<br/>Missões do Livro]
    LoadMissions --> ViewFilters[👀 Visualiza Filtros<br/>Unidade + Status]
    ViewFilters --> ViewTable[📋 Visualiza Tabela<br/>de Missões]
    
    ViewTable --> FilterDecision{🤔 Quer<br/>filtrar?}
    
    FilterDecision -->|✅ Sim| SelectFilter[🔍 Seleciona filtro<br/>Unidade ou Status]
    SelectFilter --> UpdateTable[🔄 Tabela atualiza<br/>com filtro aplicado]
    FilterDecision -->|❌ Não| ActionDecision
    UpdateTable --> ActionDecision{💭 Qual<br/>ação?}
    
    ActionDecision -->|▶️ Habilitar| ActionEnable[🎬 Clica ícone play]
    ActionDecision -->|⏸️ Pausar| ActionPause[⏸️ Clica ícone pause]
    ActionDecision -->|👁️ Ver Detalhes| ActionView[🔍 Clica ícone visibility]
    ActionDecision -->|🔗 Copiar Link| ActionLink[📎 Clica ícone link]
    ActionDecision -->|📖 Abrir| ActionOpen[📄 Clica no nome da missão]
    
    ActionEnable --> ModalEnable[📝 Modal: Confirmar<br/>habilitação + agendar]
    ModalEnable --> ResultEnable[✅ Missão habilitada<br/>status atualizado]
    
    ActionPause --> ModalPause[📝 Modal: Confirmar<br/>pausa da missão]
    ModalPause --> ResultPause[⏸️ Missão pausada<br/>status atualizado]
    
    ActionView --> ModalDetails[📄 Modal: Detalhes<br/>conteúdo da missão]
    
    ActionLink --> ResultLink[✅ Link copiado<br/>tooltip de feedback]
    
    ActionOpen --> ResultRedirect[➡️ Redireciona para<br/>tela de exercícios]
    
    ResultEnable --> End([🏁 Fim])
    ResultPause --> End
    ModalDetails --> End
    ResultLink --> End
    ResultRedirect --> End
    
    classDef startEnd fill:#e1f5e1,stroke:#4caf50,stroke-width:3px,color:#000
    classDef action fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#000
    classDef decision fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000
    classDef system fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000
    classDef modal fill:#fce4ec,stroke:#e91e63,stroke-width:2px,color:#000
    classDef success fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#000
    
    class Start,End startEnd
    class ClickBook,ViewFilters,ViewTable,SelectFilter,UpdateTable,ActionEnable,ActionPause,ActionView,ActionLink,ActionOpen action
    class FilterDecision,ActionDecision decision
    class LoadMissions system
    class ModalEnable,ModalPause,ModalDetails modal
    class ResultEnable,ResultPause,ResultLink,ResultRedirect success
```

### Passos Detalhados

1. **Carregamento da Página de Missões**
   - Descrição: Sistema busca e exibe missões do livro selecionado
   - Tela: `missions/Index.vue` com componentes `Filters.vue`, `List.vue`, `Title.vue`
   - Ações do sistema:
     - Registra módulo Vuex `EducationSystemMissions`
     - Define `book.value = { id: bookId, name: '' }`
     - Define `mission.value = { id: null, name: 'Todas as missões' }`
     - Atualiza breadcrumb: `[Sistema Educacional] > [Nome do Livro]`
     - Chama API para buscar missões: `fetchDetails()`
   - Dados carregados: Lista de missões com progresso, rendimento, status

2. **Visualização dos Filtros**
   - Descrição: Filtros permitem refinar visualização das missões
   - Componente: `Filters.vue`
   - Filtros disponíveis:
     - **Unidades do livro**: Dropdown com capítulos/unidades (ex: "Unidade 1", "Unidade 2", "Todas")
     - **Status**: Dropdown com opções (Todas, Não enviada, Não iniciada, Em andamento, Pausada, Finalizada)
   - Comportamento: Alteração de filtro dispara `resetAndfetch()` que atualiza tabela

3. **Visualização da Tabela de Missões**
   - Descrição: Tabela exibe todas as missões com indicadores visuais
   - Componente: `List.vue` com `ListTableLocalSorting`
   - Colunas da tabela:
     - **Nome**: Nome da missão + badge "Missão Plus" (se premium)
     - **Progresso**: Barra horizontal com % de alunos que fizeram (cores: verde/amarelo/vermelho)
     - **Rendimento**: Badge colorido com % de acertos médios
     - **Status**: Badge pill (Não enviada, Habilitada, Pausada, Finalizada)
     - **Ações**: Ícones clicáveis (play, pause, visibility, link)
   - Funcionalidades:
     - Busca por nome de missão (search bar)
     - Ordenação por colunas (clique no header)
     - Scroll interno (não paginada, usa `ListTableLocalSorting`)

4. **Ações Disponíveis por Missão**
   
   **4.1. Habilitar Missão** (ícone `play_arrow`)
   - Condição: Missão com status "Não enviada" ou "Pausada"
   - Ação: Clique abre modal `EducationSystemMissionsEnableModal`
   - Modal contém: Confirmação + opção de agendar data/hora
   - Resultado: Missão habilitada, status muda para "Habilitada", alunos podem acessar

   **4.2. Pausar Missão** (ícone `pause`)
   - Condição: Missão com status "Habilitada" ou "Em andamento"
   - Ação: Clique abre modal de confirmação `ModalConfirm`
   - Modal contém: "Tem certeza que deseja pausar? A missão será ocultada para [Turma]"
   - Resultado: Missão pausada, alunos não veem mais

   **4.3. Ver Detalhes** (ícone `visibility`)
   - Condição: Missões Plus (premium)
   - Ação: Clique abre modal `MissionBookDetails`
   - Modal contém: Descrição da missão, objetivos, questões, preview
   - Resultado: Professora visualiza conteúdo sem habilitar

   **4.4. Copiar Link** (ícone `link`)
   - Condição: Missão com status "Habilitada" e possui `guideLinkUrl`
   - Ação: Clique copia URL para clipboard
   - Feedback: Tooltip verde "Link copiado" por 2 segundos
   - Resultado: Professora pode compartilhar link em WhatsApp/Google Classroom

   **4.5. Abrir Missão** (clique no nome)
   - Condição: Qualquer missão
   - Ação: Redireciona para tela de exercícios da missão
   - Destino: `/education-system/mission/:missionId/exercises`
   - Resultado: Visualiza questões individuais da missão

5. **Feedback Visual e Legendas**
   - Descrição: Indicadores coloridos auxiliam interpretação rápida
   - Legendas exibidas embaixo da tabela (`LegendEnum`):
     - **Progresso**: Verde (`>70%`), Amarelo (`30-70%`), Vermelho (`<30%`)
     - **Rendimento**: Verde (`>70%`), Amarelo (`40-70%`), Vermelho (`<40%`)
   - Badge "Missão Plus": Identifica missões premium com ícone especial

### Telas do Fluxo Atual

**Tela 1: Lista de Missões com Filtros**
- Componente: `src/views/pages/teacher-context/educationSystem/missions/Index.vue`
- Sub-componentes:
  - `Title.vue` - Breadcrumb e título do livro
  - `Filters.vue` - Card com filtros (Unidade + Status)
  - `List.vue` - Tabela com missões
  - `LegendEnum.vue` - Legendas de progresso e rendimento
- Rota: `/education-system/missions/:bookId`
- Estado Vuex: `store.state.EducationSystemMissions`

<!-- IMAGEM: Screenshot da tela completa de missões -->
<!-- Capturar de: educacross-frontoffice rodando localmente -->
<!-- URL: /education-system/missions/:bookId -->
<!-- Mostrar: Filtros no topo, tabela com múltiplas missões, legendas embaixo -->
![Screenshot AS-IS: Lista de Missões do Livro](../../../static/img/screenshots/prof-002-mission-list-as-is.png)

**Detalhe: Linha da Tabela com Ações**
<!-- IMAGEM: Close-up de uma linha da tabela -->
<!-- Mostrar: Nome da missão, barra de progresso, badge de rendimento, status, ícones de ação -->
![Screenshot AS-IS: Linha de Missão com Ações](../../../static/img/screenshots/prof-002-mission-row-detail.png)

**Modal: Habilitar Missão**
<!-- IMAGEM: Screenshot do modal de habilitação -->
<!-- Mostrar: Modal com título, campo de data/hora, botões Cancelar/Confirmar -->
![Screenshot AS-IS: Modal de Habilitar Missão](../../../static/img/screenshots/prof-002-enable-modal.png)

**Modal: Detalhes Missão Plus**
<!-- IMAGEM: Screenshot do modal de detalhes -->
<!-- Mostrar: Modal com descrição, objetivos, preview de questões -->
![Screenshot AS-IS: Modal de Detalhes Missão Plus](../../../static/img/screenshots/prof-002-details-modal.png)

## 😓 Pontos de Dor (Pain Points)

### 1. Ausência de Visão de Sequência Pedagógica
- **Descrição**: Missões são listadas em tabela linear sem indicar ordem sugerida ou pré-requisitos
- **Impacto**: Alto
- **Frequência**: Sempre
- **Evidência**: Tabela ordenável por qualquer coluna, mas sem indicador de "próxima missão sugerida"
- **Citação do usuário**: _"Não sei qual missão devo habilitar primeiro. Elas têm uma ordem certa?"_

### 2. Filtro de Status com Muitas Opções Pouco Usadas
- **Descrição**: Dropdown de status tem 6 opções, mas professoras usam principalmente "Todas" e "Não enviada"
- **Impacto**: Baixo
- **Frequência**: Frequente
- **Evidência**: Código mostra 6 status, UX research indica foco em 2-3
- **Citação do usuário**: _"Só quero ver as que posso habilitar agora. O resto não importa muito."_

### 3. Ações Pouco Descobríveis em Ícones Pequenos
- **Descrição**: Ícones de ação (play, pause, visibility, link) são pequenos e sem texto, dependem de tooltip
- **Impacto**: Médio
- **Frequência**: Ocasional (usuários novos)
- **Evidência**: Ícones Material Symbols sem labels, tooltip apenas ao hover
- **Citação do usuário**: _"No começo eu não sabia que tinha como copiar o link. Achei por acaso."_

### 4. Falta de Contexto sobre "Missão Plus"
- **Descrição**: Badge "Missão Plus" aparece mas não explica o que é (conteúdo premium) até clicar
- **Impacto**: Baixo
- **Frequência**: Ocasional
- **Evidência**: Badge com ícone e texto, mas sem tooltip explicativo
- **Citação do usuário**: _"O que é Missão Plus? É melhor que as outras?"_

### 5. Processo de Habilitar é Lento para Múltiplas Missões
- **Descrição**: Para habilitar 5 missões, precisa clicar → modal → confirmar → fechar, 5 vezes
- **Impacto**: Alto
- **Frequência**: Frequente (início de bimestre)
- **Evidência**: Modal individual para cada missão
- **Citação do usuário**: _"Queria poder marcar várias e habilitar todas de uma vez."_

### Métricas do Problema

| Métrica | Valor Atual | Objetivo Ideal |
|---------|-------------|----------------|
| Tempo para habilitar 5 missões | 2 minutos | 30 segundos |
| Taxa de uso do filtro de unidade | 35% | 70% |
| Cliques até copiar link | 2 cliques | 1 clique |
| Taxa de descoberta de ação "link" | 45% (usuários novos) | 90% |
| Dúvidas sobre ordem pedagógica | 8 tickets/mês | 2 tickets/mês |

---

## 🔗 Referências

### Documentação Relacionada

- [Jornada: Livros do Sistema Educacional](/docs/journeys/teacher/education-system-books) - PROF-001 (origem)
- Jornada: Exercícios da Missão (PROF-003 - documentação em breve) - Destino ao clicar no nome
- Filtros Globais useFilters (documentação em breve) - Sistema de filtros
- Padrão DDD (documentação em breve) - Arquitetura

### Recursos Externos

- [Design System Vuexy - Tables](https://fabioeducacross.github.io/DesignSystem-Vuexy)
- [Bootstrap Icons - Education](https://icons.getbootstrap.com/?q=book)
- [Material Symbols - Actions](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:play_arrow)

### Código Fonte AS-IS

**Arquivos de Referência (educacross-frontoffice)**:  
- `src/views/pages/teacher-context/educationSystem/missions/Index.vue`
- `src/views/pages/teacher-context/educationSystem/missions/List.vue`
- `src/views/pages/teacher-context/educationSystem/missions/Filters.vue`
- `src/store/pageModules/educationSystem/module-education-system-missions.js`
- `src/views/pages/teacher-context/educationSystem/missions/useEducationSystemMissions.js`

---

## 📅 Histórico de Mudanças

| Data | Versão | Autor | Mudanças |
|------|--------|-------|----------|
| 2026-02-03 | 1.0 | Fábio Educacross | Criação inicial da documentação AS-IS |
