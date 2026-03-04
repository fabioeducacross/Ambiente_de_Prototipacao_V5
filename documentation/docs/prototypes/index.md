---
sidebar_position: 1
title: Protótipos
description: Telas e componentes interativos do Educacross
---
import {
  IconBooks,
  IconChart,
  IconClipboard,
  IconLink,
  IconPalette,
  IconRocket,
  IconTarget,
  IconWarning
} from '@site/src/components/MaterialIcon';


# Protótipos Interativos

Área dedicada aos protótipos funcionais e componentes visuais do **Educacross**.

## <IconTarget /> Objetivo

Os protótipos servem para:

1. **Validar** soluções TO-BE antes de implementar
2. **Testar** interações e fluxos com usuários reais
3. **Demonstrar** funcionalidades para stakeholders
4. **Documentar** o Design System em ação

---

## <IconBooks /> Storybook - Biblioteca de Componentes

O **Design System Vuexy** está documentado no Storybook, organizado por contexto:

### <IconLink /> Acesso Direto

<span class="material-symbols-outlined">arrow_forward</span> **[Abrir Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy/)**

---

## <span class="material-symbols-outlined">folder_copy</span> Protótipos por Persona

> Todos os protótipos rodam em **http://localhost:5174**. Inicie o servidor com `npm run dev:fo` na raiz do workspace.

### <span class="material-symbols-outlined">school</span> Professor

#### Dashboards & Navegação

| Tela | Rota | Descrição |
|------|------|-----------|
| Home – Seletor de Personas | `/` | Ponto de entrada geral, seleção de persona |
| Dashboard Professor | `/teacher` | Dashboard legado (componentes isolados) |
| Dashboard Professor (Jornada Completa) | `/professor` | Dashboard com sidebar e navegação completa |
| Calendário | `/professor/calendario` | Calendário de atividades pedagógicas |
| Calendário Unificado (Figma) | `/teacher/calendar-figma` | Versão baseada no layout Figma |

#### Gestão de Alunos e Turmas

| Tela | Rota | Descrição |
|------|------|-----------|
| Turmas | `/professor/turmas` | Lista e gestão de turmas da escola |
| Alunos | `/professor/alunos` | Lista de alunos por turma |
| Grupos | `/professor/grupos` | Grupos de alunos para atividades |

#### Missões

| Tela | Rota | Descrição |
|------|------|-----------|
| Lista de Missões | `/professor/missoes` | Missões ativas da escola |
| Nova Missão | `/professor/missoes/criar` | Criação de nova missão |
| Relatório da Missão | `/professor/missoes/:id/relatorio` | Desempenho dos alunos por missão |

#### Avaliações

| Tela | Rota | Descrição |
|------|------|-----------|
| Avaliação Digital | `/professor/avaliacoes/digital` | Criação de avaliações online |
| FluEsc | `/professor/avaliacoes/flue-esc` | Fluência em escrita |
| Fases da Escrita | `/professor/avaliacoes/fases-escrita` | Diagnóstico de fases de escrita |

#### Relatórios

| Tela | Rota | Descrição |
|------|------|-----------|
| Relatório de Evidências | `/professor/relatorios/evidencias` | Evidências de aprendizagem por turma |
| Relatório de Habilidades | `/professor/relatorios/habilidades` | Progresso por habilidade / BNCC |
| Acesso de Alunos | `/professor/relatorios/acesso-alunos` | Frequência e engajamento dos alunos |

#### Jogos e Gamificação

| Tela | Rota | Descrição |
|------|------|-----------|
| Configuração da Ilha | `/professor/explorar-jogos/configuracao` | Parâmetros do jogo Ilha |
| Ranking de Conquistas | `/professor/jogos/ranking` | Ranking da turma no jogo |

#### Expedições e Eventos

| Tela | Rota | Descrição |
|------|------|-----------|
| Expedição de Leitura | `/professor/expedicao-leitura` | Portal de expedições literárias |
| Olimpíadas | `/professor/eventos/olimpiadas` | Gestão das olimpíadas escolares |
| Educacross Extreme | `/professor/eventos/extreme` | Evento competitivo Extreme |

#### Conteúdo e Formação

| Tela | Rota | Descrição |
|------|------|-----------|
| Sistema de Ensino (Trilhas A-Z) | `/teacher/trilhas-az` | Catálogo de trilhas de aprendizagem |
| Ajudas e Materiais | `/professor/ajudas-materiais` | Materiais de apoio pedagógico |
| Educateca | `/professor/educateca` | Repositório de conteúdos |

#### Programas e Projetos Especiais

| Tela | Rota | Descrição |
|------|------|-----------|
| Alfabetiza Manaus | `/professor/programas/alfabetiza-manaus` | Programa municipal de alfabetização |
| Letrar+JP | `/professor/programas/letrar` | Programa de letramento João Pessoa |
| Super Ensino João Pessoa | `/professor/programas/super-ensino-jp` | Programa João Pessoa |
| Super Ensino Manaus | `/professor/programas/super-ensino-manaus` | Programa Manaus |
| High Five | `/professor/programas/high-five` | Programa bilíngue High Five |

---

### <span class="material-symbols-outlined">person</span> Aluno

#### KPIs do Dashboard

| Indicador | Valor mockado | Descrição |
|-----------|--------------|-----------|
| Missões Ativas | 5 | Missões em andamento |
| Conquistas | 23 | Badges e troféus acumulados |
| Pontos | 1.840 | Pontuação total na plataforma |
| Nível | 12 | Nível de progressão gamificada |

#### Jornadas (status atual: Planejado)

| Tela | Rota | Jornada ID | Descrição |
|------|------|-----------|-----------|
| Dashboard Aluno | `/student` | — | Hub principal: missões, conquistas e progresso |
| Acessar Missões | `/student` *(a implementar)* | ALUNO-001 | Visualizar e iniciar missões disponíveis |
| Completar Atividades | `/student` *(a implementar)* | ALUNO-002 | Realizar e entregar atividades das missões |
| Ver Conquistas | `/student` *(a implementar)* | ALUNO-003 | Acompanhar badges e evolução pessoal |
| Receber Feedback | `/student` *(a implementar)* | ALUNO-004 | Visualizar correções e comentários do professor |

---

### <span class="material-symbols-outlined">manage_accounts</span> Coordenador

#### KPIs do Dashboard

| Indicador | Valor mockado | Descrição |
|-----------|--------------|-----------|
| Turmas | 24 | Total de turmas ativas na escola |
| Professores | 18 | Professores vinculados |
| Alunos | 680 | Alunos matriculados |
| Aproveitamento | 89% | Taxa de aproveitamento global |

#### Jornadas (status atual: Planejado)

| Tela | Rota | Jornada ID | Descrição |
|------|------|-----------|-----------|
| Dashboard Coordenador | `/coordinator` | — | Hub principal: indicadores pedagógicos e turmas |
| Gestão Pedagógica | `/coordinator` *(a implementar)* | COORD-001 | Acompanhar indicadores pedagógicos da escola |
| Suporte a Professores | `/coordinator` *(a implementar)* | COORD-002 | Apoiar professores em questões pedagógicas |
| Análise de Turmas | `/coordinator` *(a implementar)* | COORD-003 | Monitorar desempenho das turmas |

---

### <span class="material-symbols-outlined">supervisor_account</span> Diretor

#### KPIs do Dashboard

| Indicador | Valor mockado | Descrição |
|-----------|--------------|-----------|
| Alunos Total | 1.250 | Total de alunos na escola |
| Taxa de Aprovação | 94% | Percentual de aprovação |
| Professores | 45 | Total de professores |
| Satisfação | 4,6 | NPS / nota de satisfação |

#### Jornadas (status atual: Planejado)

| Tela | Rota | Jornada ID | Descrição |
|------|------|-----------|-----------|
| Dashboard Diretor | `/director` | — | Hub principal: KPIs estratégicos e gestão escolar |
| Indicadores Estratégicos | `/director` *(a implementar)* | DIR-001 | Visualizar KPIs e métricas da escola |
| Gestão de Recursos | `/director` *(a implementar)* | DIR-002 | Alocar e gerenciar recursos escolares |
| Relatórios Gerenciais | `/director` *(a implementar)* | DIR-003 | Gerar relatórios executivos |

---

### <span class="material-symbols-outlined">admin_panel_settings</span> Administrador

#### KPIs do Dashboard

| Indicador | Valor mockado | Descrição |
|-----------|--------------|-----------|
| Usuários Ativos | 1.850 | Usuários ativos na plataforma |
| Escolas | 12 | Escolas configuradas |
| Uptime | 99,9% | Disponibilidade do sistema |
| Tickets Abertos | 4 | Chamados de suporte em aberto |

#### Jornadas (status atual: Planejado)

| Tela | Rota | Jornada ID | Descrição |
|------|------|-----------|-----------|
| Dashboard Administrador | `/administrator` | — | Hub principal: saúde do sistema e gestão de usuários |
| Gerenciar Usuários | `/administrator` *(a implementar)* | ADM-001 | Criar, editar e desabilitar usuários |
| Configurar Sistema | `/administrator` *(a implementar)* | ADM-002 | Ajustar parâmetros e configurações |
| Logs e Auditoria | `/administrator` *(a implementar)* | ADM-003 | Visualizar logs de sistema |

---

### <span class="material-symbols-outlined">hub</span> Gestor de Rede

#### KPIs do Dashboard

| Indicador | Valor mockado | Descrição |
|-----------|--------------|-----------|
| Escolas na Rede | 24 | Total de escolas gerenciadas |
| Alunos Total | 18,5K | Total de alunos na rede |
| Taxa Global | 92% | Aproveitamento consolidado da rede |
| NPS Médio | 78 | Satisfação média entre as escolas |

#### Jornadas (status atual: Planejado)

| Tela | Rota | Jornada ID | Descrição |
|------|------|-----------|-----------|
| Dashboard Gestor de Rede | `/network-manager` | — | Hub principal: visão consolidada de múltiplas escolas |
| Visão Geral da Rede | `/network-manager` *(a implementar)* | REDE-001 | Indicadores consolidados de todas as escolas |
| Comparações | `/network-manager` *(a implementar)* | REDE-002 | Análise comparativa entre escolas |
| Planejamento Estratégico | `/network-manager` *(a implementar)* | REDE-003 | Definir metas e estratégias da rede |

---

## <span class="material-symbols-outlined">palette</span> Design System – Componentes Front-Office

Componentes documentados no [Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy/).

### Front-Office (Usuário Final)

| Componente | Descrição | Link |
|------------|-----------|------|
| **AcceptOrRejectAccess** | Modal de aceitar/recusar perfil | [Ver no Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/docs/front-office-modals-acceptorrejectaccess--documentation) |
| Recusar Perfil | Estado de confirmação de recusa | [Ver Story](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/story/front-office-modals-acceptorrejectaccess--recusar-perfil) |
| Recusar Perfil (Loading) | Estado de loading durante ação | [Ver Story](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/story/front-office-modals-acceptorrejectaccess--recusar-perfil-loading) |
| Aceitar Perfil | Estado de confirmação de aceite | [Ver Story](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/story/front-office-modals-acceptorrejectaccess--aceitar-perfil) |
| Aceitar Perfil (Termos) | Com checkbox de termos | [Ver Story](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/story/front-office-modals-acceptorrejectaccess--aceitar-perfil-termos-aceitos) |

### Vuexy Design System

| Categoria | Componentes | Link |
|-----------|-------------|------|
| **Atoms** | Buttons, Badges, Icons | [Ver Atoms](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/docs/vuexy-atoms-buttons--docs) |
| **Molecules** | Cards, Forms, Inputs | [Ver Molecules](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/docs/vuexy-molecules-cards--docs) |
| **Organisms** | Tables, Modals, Sidebars | [Ver Organisms](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/docs/vuexy-organisms-table--docs) |
| **Templates** | Layouts, Pages | [Ver Templates](https://fabioeducacross.github.io/DesignSystem-Vuexy/?path=/docs/vuexy-templates--docs) |
| **Foundations** | Colors, Typography, Spacing | [Ver Foundations](https://fabioeducacross.github.io/DesignSystem-Vuexy/) |

---

## <IconPalette /> Preview: Modal Aceitar/Recusar Perfil

Este é um dos componentes principais documentados:

![Modal Recusar Perfil](/img/fluxos/modal-recusar-perfil.png)

### Variantes Disponíveis

| Variante | Uso | Estado |
|----------|-----|--------|
| Recusar Perfil | Confirmação de recusa | Default |
| Recusar Perfil (Loading) | Durante requisição | Loading |
| Aceitar Perfil | Confirmação de aceite | Default |
| Aceitar Perfil (Termos) | Com aceite de termos | Checkbox |
| Aceitar Perfil (Loading) | Durante requisição | Loading |
| Todos os Perfis | Lista consolidada | Overview |

### Código de Exemplo

```html
<!-- HTML/Vanilla -->
<div class="modal-container">
  <span class="warning-icon"><IconWarning /></span>
  <h1 class="modal-title">
    Deseja <span class="text-danger">recusar</span> esse perfil?
  </h1>
  <div class="profile-info">
    <p>Perfil: <span class="text-primary">Professor</span></p>
    <p>Escola: <span class="text-primary">Escola Devs</span></p>
  </div>
  <div class="actions-container">
    <button class="btn btn-outline-danger">Cancelar</button>
    <button class="btn btn-danger">Recusar perfil</button>
  </div>
</div>
```

---

## <IconRocket /> Protótipos Vue 3 (Ambiente Local)
├── JourneyList.vue             # Lista de jornadas (3 colunas)
└── JourneyDetail.vue           # Detalhes da jornada (layout 2 colunas)
```

## <IconPalette /> Usando o Design System

### Paleta de Cores Vuexy

Use as CSS custom properties definidas em `src/style.css`:

```css
--primary: #7367F0    /* Roxo - ações principais */
--success: #28C76F    /* Verde - nível iniciante */
--warning: #FF9F43    /* Laranja - nível intermediário */
--danger: #EA5455     /* Vermelho - nível avançado */
--info: #00CFE8       /* Ciano - informações */
```

### Badges de Nível

Pattern reutilizável para badges de dificuldade:

```javascript
const getBadgeClass = (nivel) => {
  const classes = {
    'Iniciante': 'badge-success',
    'Intermediário': 'badge-warning',
    'Avançado': 'badge-danger'
  }
  return classes[nivel] || 'badge-primary'
}
```

### Importando Componentes do DS

O Design System Vuexy é HTML-based, então você importa o markup:

1. Acesse o [Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy)
2. Encontre o componente desejado
3. Copie o HTML do componente
4. Cole no template Vue e adapte com `v-bind`, `v-for`, etc.

**Exemplo: Card do DS**

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{ title }}</h4>
    </div>
    <div class="card-body">
      {{ content }}
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">Ação</button>
    </div>
  </div>
</template>
```

## <IconRocket /> Criando um Novo Protótipo

### 1. Definir a Jornada

Antes de criar um protótipo, certifique-se de que a jornada está documentada em `/docs/journeys/`.

### 2. Criar Estrutura de Arquivos

```bash
mkdir -p src/views/[contexto]/[feature]
touch src/views/[contexto]/[feature]/Index.vue
touch src/views/[contexto]/[feature]/use[Feature].js
```

### 3. Criar Rota

Adicione a rota em `src/router/index.js`:

```javascript
{
  path: '/[path]',
  name: '[RouteName]',
  component: () => import('@/views/[contexto]/[feature]/Index.vue')
}
```

### 4. Implementar Componente

**Index.vue** (Orquestrador):

```vue
<script setup>
import { ref } from 'vue'
import use[Feature] from './use[Feature]'

const { data, loading, fetchData } = use[Feature]()

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container">
    <h1>Título da Feature</h1>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <!-- Conteúdo -->
    </div>
  </div>
</template>

<style scoped>
/* Estilos com escopo */
</style>
```

**use[Feature].js** (Composable):

```javascript
import { ref } from 'vue'
import journeysData from '@/data/journeys.json'

export default function use[Feature]() {
  const data = ref([])
  const loading = ref(false)

  const fetchData = () => {
    loading.value = true
    // Simular API call com JSON local
    setTimeout(() => {
      data.value = journeysData
      loading.value = false
    }, 500)
  }

  return {
    data,
    loading,
    fetchData
  }
}
```

### 5. Adicionar Dados (se necessário)

Dados estáticos ficam em `src/data/journeys.json`:

```json
[
  {
    "id": 1,
    "titulo": "Nome da Jornada",
    "descricao": "Descrição...",
    "categoria": "Categoria",
    "nivel": "Iniciante",
    "status": "ativo"
  }
]
```

### 6. Testar Localmente

```bash
npm run dev
```

Acesse: http://localhost:5173/[path]

### 7. Deploy (Opcional)

```bash
npm run build
```

Os arquivos de build ficam em `dist/` prontos para deploy.

## <span class="material-symbols-outlined">smart_toy</span> Workflow com Claude AI

Como designer vibecoder, você trabalha assim com Claude:

### 1. Descrever a Funcionalidade

```
"Preciso de uma página que lista jornadas educacionais em cards.
Cada card deve mostrar título, descrição, nível de dificuldade 
(com badge colorido: verde=iniciante, laranja=intermediário, 
vermelho=avançado) e duração. Os cards devem ter hover effect 
com shadow. Layout responsivo de 3 colunas no desktop."
```

### 2. Claude Gera o Código

Claude criará automaticamente:
- Componente Vue 3 com `<script setup>`
- Template HTML usando classes Vuexy
- Estilos scoped
- Lógica de dados

### 3. Revisar Visualmente

Copie o código, execute `npm run dev`, e veja no navegador.

### 4. Iterar

Se precisa ajustes, descreva para o Claude:

```
"O espaçamento entre os cards está muito pequeno. 
Aumenta para 24px e adiciona um gradiente roxo no hover."
```

## <IconClipboard /> Checklist de Qualidade

Antes de considerar um protótipo completo:

- [ ] Componente segue estrutura DDD (Index.vue + composable)
- [ ] Usa cores do Design System Vuexy
- [ ] Template é responsivo (mobile, tablet, desktop)
- [ ] Código usa Composition API com `<script setup>`
- [ ] Estilos são scoped para evitar conflitos
- [ ] Lógica de negócio está no composable, não no componente
- [ ] Dados vêm de `src/data/` (não hardcoded)
- [ ] Componente está documentado em JSDoc

## <IconLink /> Links Úteis

- [Design System Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy) - Catálogo de componentes
- [Vue 3 Docs](https://vuejs.org/) - Documentação oficial
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) - Guia da Composition API
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Ícones disponíveis

## <IconChart /> Protótipos Existentes

### 1. Journey List

**Jornada**: Catálogo de Jornadas  
**Rota**: `/journeys`  
**Arquivo**: `src/views/JourneyList.vue`  
**Features**:
- Grid 3 colunas responsivo
- Cards com hover effect
- Badges de nível coloridos
- Botão "Ver Detalhes"

### 2. Journey Detail

**Jornada**: Visualizar Detalhes da Jornada  
**Rota**: `/journey/:id`  
**Arquivo**: `src/views/JourneyDetail.vue`  
**Features**:
- Layout 2 colunas (8/4)
- Sidebar sticky com info
- Lista de módulos
- Gradiente Vuexy

### 3. Home (Landing Page)

**Jornada**: Entrada no Ambiente  
**Rota**: `/`  
**Arquivo**: `src/views/Home.vue`  
**Features**:
- Hero section com gradiente
- Cards de features
- Call-to-action

## <span class="material-symbols-outlined">fiber_new</span> Próximos Protótipos

Baseado nas jornadas prioritárias:

1. **Login e Autenticação** (PROF-001)
2. **Dashboard Professor** (PROF-002)
3. **Livros do Sistema Educacional** (PROF-003)
4. **Missões e Exercícios** (ALUNO-001)
5. **Criar Avaliação** (PROF-004)

## <span class="material-symbols-outlined">chat</span> Suporte

Dúvidas sobre protótipos?

- Consulte o [guia de configuração](/docs/getting-started/setup)
- Veja o [template de jornada](/docs/templates/journey-template)
- Acesse as [Copilot instructions](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/blob/main/.github/copilot-instructions.md)
