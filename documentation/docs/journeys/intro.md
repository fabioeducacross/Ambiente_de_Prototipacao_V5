import { IconTeacher, IconAdmin, IconStudent, IconChart, IconSearch, IconClipboard, IconTarget, IconCamera, IconCheck, IconConstruction, IconRefresh, IconX, IconCircleRed, IconCircleYellow, IconCircleGreen } from '@site/src/components/MaterialIcon';

# Jornadas de Usuário

Bem-vindo à documentação completa das jornadas de usuário da plataforma Educacross.

## Visão Geral

Esta seção documenta **50+ jornadas** organizadas por contexto de usuário:

- <IconTeacher size={18} /> **[Professor](./teacher/)** - 11 jornadas do contexto educador
- <IconAdmin size={18} /> **[Administrador](./administrator/)** - 6 jornadas administrativas
- <IconStudent size={18} /> **[Estudante](./student/)** - 3 jornadas de aprendizado
- <IconChart size={18} /> **Network Manager** - Jornadas de gestão de rede
- <IconSearch size={18} /> **Auditor** - Jornadas de auditoria

## Formato das Jornadas

Cada jornada documentada segue este formato padronizado:

### <IconClipboard size={20} /> Metadata

| Propriedade | Descrição |
|-------------|-----------|
| **ID** | Identificador único (ex: PROF-001) |
| **Contexto** | Professor, Admin, Estudante, etc. |
| **Rota** | Caminho da URL (`/education-system/books`) |
| **Status** | <IconCheck size={14} /> Ativo, <IconConstruction size={14} /> Em desenvolvimento, <IconX size={14} /> Descontinuado |

### <IconTarget size={20} /> Conteúdo

- **Visão Geral** - Descrição da funcionalidade
- **Fluxo de Usuário** - Diagrama Mermaid interativo
- **Screenshots** - Capturas de tela AS-IS (estado atual)
- **Componentes** - Tabela de componentes utilizados
- **API Endpoints** - Documentação de integração
- **Melhorias Propostas** - Link para protótipos TO-BE

### <IconCamera size={20} /> Screenshots

Todas as jornadas incluem:

- **AS-IS** - Estado atual em produção
- **TO-BE** - Mockups de melhorias propostas (quando aplicável)

## Jornadas Prioritárias

### <IconCircleRed size={16} /> Alta Prioridade

Jornadas mais acessadas (>1000 acessos/dia):

1. [Education System Books](./teacher/education-system-books) - Visualização de livros
2. [Custom Missions](./teacher/custom-missions) - Criação de missões personalizadas
3. [Events Management](./teacher/events-management) - Gestão de eventos educacionais
4. [Mission Reports](./coordinator/mission-reports) - Relatórios de missões

### <IconCircleYellow size={16} /> Média Prioridade

Jornadas regulares (100-1000 acessos/dia):

5. Student Records - Diário de alunos
6. Classes Records - Gestão de turmas
7. High Five Missions - Missões colaborativas

### <IconCircleGreen size={16} /> Baixa Prioridade

Jornadas esporádicas (menos de 100 acessos/dia):

- Library Games - Jogos educacionais
- Library Books - Biblioteca digital
- Writing Phases - Fases de escrita

## Como Usar Esta Documentação

### Para Desenvolvedores

1. **Entender Contexto**: Leia a visão geral da jornada
2. **Analisar Fluxo**: Estude o diagrama Mermaid interativo
3. **Explorar Código**: Veja estrutura de arquivos e composables
4. **Consultar API**: Documentação de endpoints com exemplos

### Para Designers

1. **Análise Visual**: Veja screenshots AS-IS do estado atual
2. **Identificar Gaps**: Compare com mockups TO-BE
3. **Design System**: Links para componentes Storybook
4. **Protótipos**: Acesse protótipos interativos

### Para Product Owners

1. **Métricas**: Prioridade baseada em uso
2. **Propostas**: Visualize melhorias TO-BE
3. **Impacto**: Avalie custo vs benefício
4. **Roadmap**: Acompanhe implementações

## Convenções

### Status de Jornada

- <IconCheck size={16} /> **Ativo** - Em produção e funcionando
- <IconConstruction size={16} /> **Em Desenvolvimento** - Implementação em andamento
- <IconRefresh size={16} /> **Refatoração** - Melhoria técnica planejada
- <IconX size={16} /> **Descontinuado** - Funcionalidade removida

### Badges de Nível

<span class="badge badge-success">Iniciante</span> - Jornada simples, poucos passos

<span class="badge badge-warning">Intermediário</span> - Complexidade média

<span class="badge badge-danger">Avançado</span> - Fluxo complexo, múltiplos sistemas

## Navegação Rápida

### Por Contexto

- [<IconTeacher size={16} /> Jornadas do Professor](./teacher/)
- [<IconAdmin size={16} /> Jornadas Administrativas](./administrator/)
- [<IconStudent size={16} /> Jornadas do Estudante](./student/)

### Por Funcionalidade

- **Sistema Educacional** - Livros, missões, conteúdo
- **Relatórios** - Dashboards e análises
- **Gestão** - Turmas, alunos, rede
- **Biblioteca** - Jogos, livros, recursos

## Próximos Passos

1. Explore as [Jornadas do Professor](./teacher/) - contexto mais completo
2. Veja os [Protótipos TO-BE](../prototypes/) - melhorias propostas
3. Consulte a [Arquitetura](../architecture/) - padrões técnicos
4. Acesse o [Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/) - componentes

---

**Última Atualização**: 3 de fevereiro de 2026  
**Jornadas Documentadas**: 2/50+ (PROF-001, PROF-002)  
**Meta Sprint 1**: 4/4 jornadas alta prioridade
