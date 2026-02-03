---
sidebar_position: 1
---

# Bem-vindo à Documentação Educacross 🎓

Documentação técnica completa do **Ambiente de Prototipação V5** - Sistema de documentação AS-IS e prototipação TO-BE para jornadas educacionais.

## 🎯 Objetivo

Este projeto documenta **50+ jornadas de usuário** da plataforma Educacross e serve como ambiente de prototipação para melhorias, seguindo o workflow definido no [PLANO.md](../../PLANO.md).

## 📚 Seções Principais

### 1. [Jornadas de Usuário](./journeys/intro.md)

Documentação AS-IS (estado atual) das jornadas:

- 👨‍🏫 **[Professor](./journeys/teacher/)** - 11 jornadas (2 documentadas)
- 👨‍💼 **[Admin](./journeys/admin/)** - 6 jornadas (0 documentadas)
- 👨‍🎓 **[Estudante](./journeys/student/)** - 3 jornadas (0 documentadas)

Cada jornada inclui:
- 📊 Fluxo de usuário (diagrama Mermaid)
- 📸 Screenshots AS-IS
- 🧩 Componentes utilizados
- 🔌 Documentação de API
- ✨ Propostas de melhoria TO-BE

### 2. [Protótipos TO-BE](./prototypes/intro.md)

Protótipos interativos de melhorias propostas:

- 🚀 **Education System V2** - Wizard de livros (planejado)
- 🎯 **Missions V3** - Timeline e ações em lote (planejado)
- 🎨 **Custom Missions Editor V2** - Editor WYSIWYG (ideação)
- 📊 **Reports Dashboard V2** - Dashboards interativos (ideação)

### 3. [Arquitetura Técnica](./architecture/intro.md)

Padrões e documentação técnica:

- 📐 **DDD Pattern** - Estrutura Index → Filters → List
- 🧩 **Componentes** - ESelect, ListTable, useFilters()
- 🛣️ **Roteamento** - Lazy loading e meta tags
- 🗄️ **Vuex** - State management patterns

## 🚀 Quick Start

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

## 📋 Status do Projeto

### Fase 1: Fundação (Semana 1) - ✅ 80% Concluída

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
| PROF-001 | Education System Books | Professor | ✅ Documentado |
| PROF-002 | Education System Missions | Professor | ✅ Documentado |
| PROF-003 | Custom Missions | Professor | 🚧 Sprint 1 |
| PROF-004 | Events Management | Professor | 🚧 Sprint 1 |
| ADMIN-001 | Mission Reports | Admin | 🚧 Sprint 1 |
| ... | ... | ... | ⏳ Pendente |

**Progresso**: 2/50+ jornadas documentadas (4%)

## 🎨 Design System

Este projeto utiliza o **Design System Vuexy** com componentes disponíveis em:

🔗 [fabioeducacross.github.io/DesignSystem-Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

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

## 📖 Como Usar Esta Documentação

### Para Desenvolvedores

1. **Entenda o Contexto**: Leia as [jornadas documentadas](./journeys/intro.md)
2. **Estude a Arquitetura**: Consulte os [padrões técnicos](./architecture/intro.md)
3. **Veja Protótipos**: Explore os [protótipos TO-BE](./prototypes/intro.md)
4. **Contribua**: Siga o [workflow Git](../../PLANO.md#-workflow-de-prototipação)

### Para Designers

1. **Analise Screenshots**: Veja estado atual (AS-IS)
2. **Explore Melhorias**: Revise protótipos TO-BE
3. **Componentes**: Acesse o [Storybook](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
4. **Feedback**: Use GitHub Issues

### Para Product Owners

1. **Veja Métricas**: Priorização por uso
2. **Avalie Propostas**: Compare AS-IS vs TO-BE
3. **Aprove Protótipos**: Via Pull Requests
4. **Acompanhe Roadmap**: [PLANO.md](../../PLANO.md#-roadmap-de-implementação)

## 🔗 Links Úteis

- 📋 [PLANO.md](../../PLANO.md) - Planejamento completo do projeto
- 🎨 [Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- 🌐 [Educacross](https://educacross.com.br/)
- 🐙 [Repositório GitHub](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5)
- 📡 [API Test](https://apieducacrossmanager-test.azurewebsites.net/index.html)

## 🤝 Contribuindo

Para contribuir com esta documentação:

1. **Fork o Repositório**
2. **Crie uma Branch**: `docs/nome-da-jornada`
3. **Documente**: Siga o [template de jornada](./journeys/intro.md#formato-das-jornadas)
4. **Pull Request**: Para `develop`

## 📞 Contato

- **Organização**: Educacross
- **Repositório**: [fabioeducacross/Ambiente_de_Prototipacao_V5](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5)

---

**Última Atualização**: 3 de fevereiro de 2026  
**Versão**: 1.0.0  
**Status**: 🟡 Em Desenvolvimento (Fase 1 - 80% completa)
