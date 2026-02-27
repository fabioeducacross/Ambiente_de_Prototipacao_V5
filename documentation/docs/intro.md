---
sidebar_position: 1
---

import { IconGraduation, IconTarget, IconBooks, IconTeacher, IconAdmin, IconStudent, IconChart, IconCamera, IconExtension, IconApi, IconSparkle, IconRocket, IconPalette, IconArchitecture, IconRoute, IconStorage, IconClipboard, IconCheck, IconConstruction, IconPending, IconLink, IconBookOpen, IconHandshake, IconPhone, IconGlobe, IconCode, IconAntenna, IconCircleYellow, StatusDone, StatusProgress, StatusPlanned } from '@site/src/components/MaterialIcon';

# Bem-vindo à Documentação Educacross <IconGraduation size={28} />

Documentação técnica completa do **Ambiente de Prototipação V5** - Sistema de documentação AS-IS e prototipação TO-BE para jornadas educacionais.

## <IconTarget size={22} /> Objetivo

Este projeto documenta **50+ jornadas de usuário** da plataforma Educacross e serve como ambiente de prototipação para melhorias.

## <IconBooks size={22} /> Seções Principais

### 1. [Jornadas de Usuário](./journeys/intro)

Documentação AS-IS (estado atual) das jornadas:

- <IconTeacher size={18} /> **[Professor](./journeys/teacher/)** - Gestão de livros e missões
- <IconAdmin size={18} /> **[Administrador](./journeys/administrator/)** - Gestão de usuários e segurança
- <IconAdmin size={18} /> **[Coordenador](./journeys/coordinator/)** - Relatórios e evidências
- <IconAdmin size={18} /> **[Diretor](./journeys/director/)** - Acesso de alunos e visão geral
- <IconAdmin size={18} /> **[Gestor de Rede](./journeys/network-manager/)** - Gerenciamento de rede
- <IconAdmin size={18} /> **[Auditor](./journeys/auditor/)** - Auditoria e conformidade
- <IconStudent size={18} /> **[Estudante](./journeys/student/)** - Dashboard e progresso educacional

Cada jornada inclui:
- <IconChart size={16} /> Fluxo de usuário (diagrama Mermaid)
- <IconCamera size={16} /> Screenshots AS-IS
- <IconExtension size={16} /> Componentes utilizados
- <IconApi size={16} /> Documentação de API
- <IconSparkle size={16} /> Propostas de melhoria TO-BE

### 2. [Protótipos TO-BE](./prototypes/intro)

Protótipos interativos de melhorias propostas:

- <IconRocket size={16} /> **Education System V2** - Wizard de livros (planejado)
- <IconTarget size={16} /> **Missions V3** - Timeline e ações em lote (planejado)
- <IconPalette size={16} /> **Custom Missions Editor V2** - Editor WYSIWYG (ideação)
- <IconChart size={16} /> **Reports Dashboard V2** - Dashboards interativos (ideação)

### 3. [Arquitetura Técnica](./architecture/intro)

Padrões e documentação técnica:

- <IconArchitecture size={16} /> **DDD Pattern** - Estrutura Index → Filters → List
- <IconExtension size={16} /> **Componentes** - ESelect, ListTable, useFilters()
- <IconRoute size={16} /> **Roteamento** - Lazy loading e meta tags
- <IconStorage size={16} /> **Vuex** - State management patterns

## <IconRocket size={22} /> Quick Start

### Para Visualizar a Documentação

```bash
cd documentation
npm install
npm start
```

Acesse: http://localhost:3000/Ambiente_de_Prototipacao_V5/

### Para Prototipar (TO-BE)

```bash
# Voltar para raiz do projeto
cd ..
npm install
npm run dev
```

Acesse: http://localhost:5173

## <IconClipboard size={22} /> Status do Projeto

### Fase 1: Fundação (Semana 1) - <IconCheck size={18} /> 80% Concluída

- [x] Docusaurus customizado com tema Vuexy
- [x] Mermaid integrado para diagramas
- [x] Estrutura de pastas criada
- [x] CSS customizado com paleta Vuexy
- [x] Fonte Montserrat importada
- [ ] Branches Git configurados
- [ ] PROTOTYPES-WORKFLOW.md

### Jornadas Documentadas

| ID | Jornada | Contexto | Status |
|----|---------|----------|--------|
| PROF-001 | Education System Books | Professor | <StatusDone /> |
| PROF-002 | Education System Missions | Professor | <StatusDone /> |
| PROF-003 | Custom Missions | Professor | <StatusProgress>Sprint 1</StatusProgress> |
| PROF-004 | Events Management | Professor | <StatusProgress>Sprint 1</StatusProgress> |
| ADMIN-001 | Mission Reports | Admin | <StatusProgress>Sprint 1</StatusProgress> |
| ... | ... | ... | <StatusPlanned>Pendente</StatusPlanned> |

**Progresso**: 2/50+ jornadas documentadas (4%)

## <IconPalette size={22} /> Design System

Este projeto utiliza o **Design System Vuexy** com componentes disponíveis em:

<IconLink size={16} /> [fabioeducacross.github.io/DesignSystem-Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

### Paleta de Cores

- **Primary**: `#7367F0` (Roxo Vuexy)
- **Success**: `#28C76F` (Verde)
- **Warning**: `#FF9F43` (Laranja)
- **Danger**: `#EA5455` (Vermelho)
- **Info**: `#00CFE8` (Ciano)

<div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
  <div style={{width: '80px', height: '80px', background: '#7367F0', borderRadius: '8px'}}></div>
  <div style={{width: '80px', height: '80px', background: '#28C76F', borderRadius: '8px'}}></div>
  <div style={{width: '80px', height: '80px', background: '#FF9F43', borderRadius: '8px'}}></div>
  <div style={{width: '80px', height: '80px', background: '#EA5455', borderRadius: '8px'}}></div>
  <div style={{width: '80px', height: '80px', background: '#00CFE8', borderRadius: '8px'}}></div>
</div>

## <IconBookOpen size={22} /> Como Usar Esta Documentação

### Para Desenvolvedores

1. **Entenda o Contexto**: Leia as [jornadas documentadas](./journeys/intro)
2. **Estude a Arquitetura**: Consulte os [padrões técnicos](./architecture/intro)
3. **Veja Protótipos**: Explore os [protótipos TO-BE](./prototypes/intro)
4. **Contribua**: Consulte o workflow Git no repositório

### Para Designers

1. **Analise Screenshots**: Veja estado atual (AS-IS)
2. **Explore Melhorias**: Revise protótipos TO-BE
3. **Componentes**: Acesse o [Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
4. **Feedback**: Use GitHub Issues

### Para Product Owners

1. **Veja Métricas**: Priorização por uso
2. **Avalie Propostas**: Compare AS-IS vs TO-BE
3. **Aprove Protótipos**: Via Pull Requests
4. **Acompanhe Roadmap**: Versão de desenvolvimento em `develop` branch

## <IconLink size={22} /> Links Úteis

- <IconClipboard size={16} /> **Planejamento** - Workflow e estratégia de prototipação
- <IconPalette size={16} /> [Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- <IconGlobe size={16} /> [Educacross](https://educacross.com.br/)
- <IconCode size={16} /> [Repositório GitHub](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5)
- <IconAntenna size={16} /> [API Test](https://apieducacrossmanager-test.azurewebsites.net/index.html)

## <IconHandshake size={22} /> Contribuindo

Para contribuir com esta documentação:

1. **Fork o Repositório**
2. **Crie uma Branch**: `docs/nome-da-jornada`
3. **Documente**: Siga o [template de jornada](./journeys/intro#formato-das-jornadas)
4. **Pull Request**: Para `develop`

## <IconPhone size={22} /> Contato

- **Organização**: Educacross
- **Repositório**: [fabioeducacross/Ambiente_de_Prototipacao_V5](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5)

---

**Última Atualização**: 5 de fevereiro de 2026  
**Versão**: 1.0.0  
**Status**: <IconCircleYellow /> Em Desenvolvimento (Fase 1 - 80% completa)
