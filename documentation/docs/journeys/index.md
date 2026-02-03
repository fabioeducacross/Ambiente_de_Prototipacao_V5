---
sidebar_position: 1
title: Catálogo de Jornadas
---

# Catálogo de Jornadas Educacross

Documentação completa de todas as jornadas de usuário mapeadas no sistema Educacross Front Office.

## 📊 Visão Geral

O sistema Educacross possui **50+ jornadas** documentadas, organizadas por contexto de usuário:

- **Professor Context** (Teacher Context)
- **Aluno Context** (Student Context)
- **Admin Context** (Gestor/Coordenador)
- **Network Manager Context** (Gestor de Rede)
- **Auditor Context**
- **Responsável Context** (Pais/Responsáveis)

## 🎯 Objetivos da Documentação

Para cada jornada, documentamos:

1. **Estado Atual (AS-IS)**: Como funciona hoje no educacross-frontoffice
2. **Pontos de Dor**: Problemas identificados na experiência atual
3. **Proposta (TO-BE)**: Como deveria funcionar no futuro
4. **Protótipo**: Implementação funcional da solução proposta

## 📂 Estrutura das Jornadas

### Navegação e Descoberta
- Acesso ao sistema (login/autenticação)
- Dashboard inicial por contexto
- Navegação entre módulos

### Professor Context

#### Sistema Educacional
- Visualizar livros do sistema educacional
- Acessar missões do livro
- Visualizar questões e exercícios
- Acompanhar progresso dos alunos

#### Avaliações
- Criar avaliações personalizadas
- Aplicar avaliações para turmas
- Corrigir avaliações discursivas
- Visualizar resultados e relatórios

#### Gestão de Turma
- Visualizar lista de alunos
- Acompanhar frequência
- Gerenciar atividades e tarefas

### Aluno Context

#### Aprendizagem
- Acessar missões do sistema educacional
- Realizar exercícios e questões
- Responder avaliações
- Visualizar feedback do professor

#### Progresso
- Acompanhar pontuação e ranking
- Ver certificados e conquistas
- Consultar desempenho por matéria

### Admin Context

#### Gestão Escolar
- Gerenciar professores e turmas
- Configurar períodos letivos
- Acompanhar indicadores da escola

#### Relatórios
- Relatórios de desempenho geral
- Análise de uso da plataforma
- Indicadores de engajamento

### Network Manager Context

#### Visão de Rede
- Dashboard consolidado de múltiplas escolas
- Comparativo entre instituições
- Indicadores de rede

#### Gestão Multi-escola
- Configuração em lote
- Relatórios consolidados
- Gestão de acessos

## 📝 Template de Jornada

Todas as jornadas seguem o [template padronizado](/docs/templates/journey-template) com:

- Informações básicas (título, contexto, persona)
- Fluxograma AS-IS
- Lista de pontos de dor
- Proposta de solução TO-BE
- Mockups/Wireframes
- Critérios de aceite
- Referências ao protótipo

## 🗂️ Índice de Jornadas (Em Construção)

:::info
Esta seção será populada gradualmente com a documentação de cada jornada.
Use o template para documentar novas jornadas.
:::

### Jornadas Prioritárias

Estas jornadas serão as primeiras a serem documentadas e prototipadas:

1. **Login e Autenticação** - Acesso inicial ao sistema
2. **Dashboard Professor** - Visão geral do professor
3. **Livros do Sistema Educacional** - Navegação nos conteúdos
4. **Missões e Exercícios** - Fluxo de realização de atividades
5. **Criar Avaliação** - Processo de criação de provas

### Como Documentar uma Nova Jornada

1. Copie o [template de jornada](/docs/templates/journey-template)
2. Crie novo arquivo em `docs/journeys/[contexto]/[nome-jornada].md`
3. Preencha todas as seções do template
4. Adicione link nesta página índice
5. Crie protótipo correspondente em `src/views/`

## 🔗 Recursos Relacionados

- [Template de Jornada](/docs/templates/journey-template) - Use para documentar novas jornadas
- [Protótipos](/docs/prototypes) - Veja implementações das soluções
- [Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy) - Componentes disponíveis
- [Referência educacross-frontoffice](https://github.com/fabioeducacross/educacross-frontoffice) - Sistema original

## 📈 Status da Documentação

| Contexto | Jornadas Identificadas | Jornadas Documentadas | Protótipos Criados |
|----------|------------------------|------------------------|---------------------|
| Professor | 15+ | 0 | 0 |
| Aluno | 10+ | 0 | 0 |
| Admin | 12+ | 0 | 0 |
| Network Manager | 8+ | 0 | 0 |
| Auditor | 5+ | 0 | 0 |
| Responsável | 3+ | 0 | 0 |
| **TOTAL** | **50+** | **0** | **0** |

:::tip
A documentação está sendo construída iterativamente. Contribua documentando jornadas usando o template!
:::
