# Tasks - Documentação e Prototipação Educacross

> **Tracking Executivo** - Acompanhamento rápido de progresso  
> **Última Atualização**: 2 de fevereiro de 2026  
> 📖 **Detalhes técnicos**: Ver [PLANO.md](./PLANO.md)

---

## 🎯 Visão Geral do Progresso

| Fase | Status | Progresso | Prazo |
|------|--------|-----------|-------|
| **Fase 1: Fundação** | 🟡 Em Andamento | 2/4 | Semana 1 |
| **Fase 2: Automação** | ⏸️ Aguardando | 0/5 | Semana 2 |
| **Fase 3: Documentação AS-IS Sprint 1** | ⏸️ Aguardando | 0/4 | Semana 3-4 |
| **Fase 4: Baseline AS-IS** | ⏸️ Aguardando | 0/5 | Semana 5 |
| **Fase 5: Prototipação TO-BE** | ⏸️ Aguardando | 0/6 | Semana 6-8 |
| **Fase 6: Migração Produção** | ⏸️ Aguardando | 0/6 | Semana 9-10 |
| **Fase 7: Escala** | ⏸️ Aguardando | 0/5 | Semana 11+ |

---

## 🟢 Fase 1: Fundação (Semana 1)

**Objetivo**: Preparar infraestrutura de documentação e prototipação  
**Detalhes**: [PLANO.md - Fase 1](./PLANO.md#fase-1-fundação-semana-1-)

### Infraestrutura Base
- [x] ✅ Criar .github/copilot-instructions.md com warning de referência
- [x] ✅ Comparar plataformas wiki (Docusaurus escolhido)
- [x] ✅ Criar docs/comparacao-plataformas-wiki.md
- [x] ✅ Criar PLANO.md consolidado
- [x] ✅ Criar TASKS.md para tracking

### Docusaurus Setup
- [ ] 📦 Instalar Docusaurus no diretório `docs/`
- [ ] 🎨 Customizar tema Vuexy (CSS custom properties)
- [ ] 📁 Criar estrutura de pastas (journeys/, prototypes/, architecture/)
- [ ] 🚀 Testar build local (localhost:3000)
- [ ] 📝 Criar template `docs/templates/journey-template.md`

### Git e Deploy
- [ ] 🌿 Configurar branches Git no Ambiente_de_Prototipacao_V5
  - [ ] Branch `prototypes/as-is` (baseline)
  - [ ] Estratégia de feature branches documentada
- [ ] ☁️ Configurar Vercel para deploy automático
- [ ] 📖 Escrever PROTOTYPES-WORKFLOW.md com comandos Git
- [ ] 🔧 GitHub Actions para CI/CD

**Entregáveis**:
- Docusaurus rodando em localhost:3000
- Ambiente_de_Prototipacao_V5 com branches configuradas
- Pipeline de deploy funcionando

---

## 🟡 Fase 2: Automação (Semana 2)

**Objetivo**: Criar scripts para análise, captura e geração de docs  
**Detalhes**: [PLANO.md - Fase 2](./PLANO.md#fase-2-automação-semana-2-)

### Scripts de Análise
- [ ] 🔍 `scripts/analyze-routes.js`
  - [ ] Parser de rotas do educacross-frontoffice
  - [ ] Geração de journeys-metadata.json
  - [ ] Teste com 1 arquivo de rotas (professor-routes.js)
  
### Scripts de Captura (Playwright)
- [ ] 📸 `scripts/capture-screenshots.js`
  - [ ] Setup Playwright com login automático
  - [ ] Captura de 1 jornada piloto
  - [ ] Screenshots salvos em docs/static/img/screenshots/
  
### Pipeline Unificado
- [ ] ⚙️ `scripts/generate-docs-pipeline.js`
  - [ ] Integração: análise → captura → markdown
  - [ ] Teste completo com 1 jornada
  - [ ] Validação de outputs

### Documentação de Scripts
- [ ] 📝 README.md em scripts/ com uso de cada script
- [ ] 🔐 Documentar variáveis de ambiente necessárias

**Entregáveis**:
- Scripts gerando JSON correto
- 1 jornada piloto totalmente documentada (markdown + screenshots)
- Pipeline validado

---

## 📚 Fase 3: Documentação AS-IS - Sprint 1 (Semana 3-4)

**Objetivo**: Documentar 4 jornadas de alta prioridade  
**Detalhes**: [PLANO.md - Fase 3](./PLANO.md#fase-3-documentação-as-is---sprint-1-semana-3-4-)

### Jornadas Alta Prioridade
- [ ] 📘 **Education System Books** (Professor)
  - [ ] Análise de rotas e componentes
  - [ ] Screenshots (lista, filtros, detalhes)
  - [ ] Markdown completo com diagramas Mermaid
  
- [ ] 🎯 **Custom Missions** (Professor)
  - [ ] Análise de rotas e componentes
  - [ ] Screenshots (criação, listagem, configuração)
  - [ ] Markdown completo com diagramas Mermaid
  
- [ ] 🎪 **Events Management** (Professor)
  - [ ] Análise de rotas e componentes
  - [ ] Screenshots (eventos ativos, ranking, relatórios)
  - [ ] Markdown completo com diagramas Mermaid
  
- [ ] 📊 **Mission Reports** (Admin)
  - [ ] Análise de rotas e componentes
  - [ ] Screenshots (filtros, tabelas, exportação)
  - [ ] Markdown completo com diagramas Mermaid

### Qualidade
- [ ] ✅ Review de documentação (QA)
- [ ] 🔗 Links para Design System Storybook funcionando
- [ ] 🎨 Diagramas Mermaid validados

**Entregáveis**:
- 4 páginas publicadas no Docusaurus
- Screenshots de alta qualidade (1920x1080)
- Diagramas de fluxo de usuário

---

## 🎨 Fase 4: Baseline AS-IS (Semana 5)

**Objetivo**: Criar baseline de protótipos replicando produção  
**Detalhes**: [PLANO.md - Fase 4](./PLANO.md#fase-4-baseline-as-is-semana-5-)

### Branch AS-IS
- [ ] 🌿 Criar branch `prototypes/as-is`
- [ ] 📦 Estrutura base do projeto
- [ ] 🏷️ Tag inicial `as-is-v1.0`

### Integração Design System
- [ ] ⏳ **AGUARDANDO**: MCP do Design System (usuário criará)
- [ ] 🔌 Criar `src/plugins/ds-mcp.js`
- [ ] 🎁 Criar `src/components/DSWrapper.vue`
- [ ] 🧪 Testar integração com 1 componente

### Réplica de Jornadas
- [ ] 🔄 Replicar Education System Books
- [ ] 🔄 Replicar Custom Missions
- [ ] 🔄 Replicar Events Management
- [ ] 🔄 Replicar Mission Reports

### Deploy
- [ ] 🚀 Push para GitHub
- [ ] ☁️ Deploy Vercel: https://prototypes-as-is.vercel.app
- [ ] ✅ Validação de funcionamento

**Entregáveis**:
- Branch prototypes/as-is com 4 telas funcionais
- Design System integrado via MCP
- Deploy em preview URL

---

## 🚀 Fase 5: Prototipação TO-BE (Semana 6-8)

**Objetivo**: Criar protótipos de melhorias  
**Detalhes**: [PLANO.md - Fase 5](./PLANO.md#fase-5-prototipação-to-be-semana-6-8-)

### Protótipo 1: Education System v2
- [ ] 🌿 Branch `prototypes/feature/education-system-v2`
- [ ] 🧙 Desenvolver wizard de seleção de livros (3 steps)
- [ ] 🎨 UI com componentes do Design System
- [ ] 🚀 Deploy preview: https://proto-education-v2.vercel.app
- [ ] 📝 Documentar no Docusaurus (docs/prototypes/)
- [ ] 👥 Coletar feedback de stakeholders

### Protótipo 2: Missions v3
- [ ] 🌿 Branch `prototypes/feature/missions-v3`
- [ ] ✨ Desenvolver fluxo simplificado de criação
- [ ] 🎨 UI com componentes do Design System
- [ ] 🚀 Deploy preview: https://proto-missions-v3.vercel.app
- [ ] 📝 Documentar no Docusaurus (docs/prototypes/)
- [ ] 👥 Coletar feedback de stakeholders

### Iteração
- [ ] 🔄 Ajustar protótipos baseado em feedback
- [ ] ✅ Aprovação final do Product Owner

**Entregáveis**:
- 2 protótipos TO-BE funcionais
- Deploy previews acessíveis
- Feedback documentado

---

## 🏭 Fase 6: Migração para Produção (Semana 9-10)

**Objetivo**: Implementar protótipos aprovados em produção  
**Detalhes**: [PLANO.md - Fase 6](./PLANO.md#fase-6-migração-para-produção-semana-9-10-)

### Aprovação e Planning
- [ ] ✅ Aprovação formal dos protótipos
- [ ] 📋 Tickets de desenvolvimento (EC-XXXX)
- [ ] 🎯 Sprint planning com equipe

### Desenvolvimento em Produção
- [ ] 🌿 Feature branches em educacross-frontoffice
  - [ ] `feature/EC-XXXX-education-system-v2`
  - [ ] `feature/EC-XXXX-missions-v3`
- [ ] 💻 Migrar código dos protótipos
- [ ] 🔧 Ajustes para produção (APIs, validações, etc.)

### Testes e Deploy
- [ ] 🧪 Testes de integração
- [ ] 🐛 QA em homologação
- [ ] 🚀 Deploy para produção
- [ ] 📊 Monitoramento pós-deploy

### Atualização AS-IS
- [ ] 🔄 Executar `scripts/sync-prototype-to-as-is.js`
- [ ] 🏷️ Tag `as-is-v1.1`
- [ ] 📝 Atualizar documentação AS-IS
- [ ] 📖 Atualizar CHANGELOG.md

**Entregáveis**:
- 2 features em produção
- AS-IS baseline atualizado
- Documentação sincronizada

---

## 📈 Fase 7: Escala (Semana 11+)

**Objetivo**: Documentar restante das 50+ jornadas  
**Detalhes**: [PLANO.md - Fase 7](./PLANO.md#fase-7-escala-semana-11-)

### Sprint 2: Jornadas Média Prioridade
- [ ] 📚 Documentar 8 jornadas (Student Records, Classes Records, etc.)
- [ ] 📸 Capturas de tela automatizadas
- [ ] 📝 Markdown gerado via pipeline

### Sprint 3: Jornadas Baixa Prioridade
- [ ] 📚 Documentar 3 jornadas (Library Games, Books, Writing Phases)
- [ ] 📸 Capturas de tela automatizadas
- [ ] 📝 Markdown gerado via pipeline

### Automação e Manutenção
- [ ] 🤖 CI/CD para atualização contínua de docs
- [ ] 🔄 Script de sincronização automática AS-IS
- [ ] 📊 Dashboard de coverage de documentação

### Treinamento
- [ ] 📖 Documentação de workflow para equipe
- [ ] 🎓 Sessão de treinamento prático
- [ ] ❓ FAQ e troubleshooting guide

**Entregáveis**:
- 15 jornadas core totalmente documentadas
- Pipeline de CI/CD funcionando
- Equipe treinada no workflow

---

## 🎯 Dependências Críticas

### Bloqueadores Externos
- [ ] ⏳ **MCP do Design System** (usuário criará)
  - **Impacto**: Fase 4 não pode iniciar sem isso
  - **Mitigação**: Continuar Fases 1-3 enquanto aguarda
  
### Credenciais e Acessos
- [ ] 🔐 Credenciais de teste para Playwright
  - `TEST_USER_EMAIL` e `TEST_USER_PASSWORD`
- [ ] 🔑 Token Algolia DocSearch (para busca no Docusaurus)
- [ ] ☁️ Acesso Vercel para deploy

### Aprovações Necessárias
- [ ] 👥 Product Owner para priorização de jornadas
- [ ] 🎨 Design Team para validação de protótipos
- [ ] 💻 Tech Lead para merge em produção

---

## 📊 Métricas de Sucesso

### Fase 1-3 (Fundação + Documentação)
- [ ] Docusaurus acessível publicamente
- [ ] 4 jornadas documentadas com qualidade
- [ ] Scripts executando em <5min por jornada

### Fase 4-6 (Protótipos + Produção)
- [ ] 2 protótipos aprovados e implementados
- [ ] Feedback positivo de usuários (>80% satisfação)
- [ ] Zero critical bugs pós-deploy

### Fase 7 (Escala)
- [ ] 15 jornadas core documentadas
- [ ] Pipeline de CI/CD funcionando
- [ ] Equipe autonoma no workflow

---

## 🚨 Riscos e Mitigações

| Risco | Status | Mitigação | Responsável |
|-------|--------|-----------|-------------|
| MCP não criado | 🟡 Monitorando | Focar Fases 1-3 primeiro | Usuário |
| Screenshots quebradas | 🟢 OK | Fallback manual + retry logic | Dev |
| Protótipos não aprovados | 🟢 OK | Validar wireframes antes | PO |
| Falta de tempo | 🟡 Monitorando | Priorizar 4 jornadas core | Tech Lead |

---

## 📅 Próximas Ações (Esta Semana)

### Prioridade Alta 🔴
1. [ ] Setup Docusaurus com tema Vuexy
2. [ ] Configurar branches Git (prototypes/as-is)
3. [ ] Criar template de documentação

### Prioridade Média 🟡
4. [ ] Implementar analyze-routes.js
5. [ ] Setup Playwright para screenshots
6. [ ] Configurar Vercel

### Prioridade Baixa 🟢
7. [ ] Documentar workflow Git em PROTOTYPES-WORKFLOW.md
8. [ ] Preparar apresentação para equipe

---

## 📝 Notas e Observações

### Decisões Tomadas
- ✅ Docusaurus escolhido (95/100 score vs alternativas)
- ✅ Git branches para versionamento (não folders)
- ✅ Ambiente_de_Prototipacao_V5 para protótipos
- ✅ educacross-frontoffice SOMENTE referência

### Pendente de Decisão
- ⏳ Frequência de atualização da documentação AS-IS
- ⏳ Processo de code review para protótipos
- ⏳ Critérios de aprovação de protótipos

### Lições Aprendidas
- _A ser preenchido após Fase 1_

---

**🔗 Links Úteis**
- [PLANO.md - Documentação Completa](./PLANO.md)
- [.github/copilot-instructions.md](../.github/copilot-instructions.md)
- [Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [API Test](https://apieducacrossmanager-test.azurewebsites.net/index.html)

---

_Última atualização: 2 de fevereiro de 2026 • Versão: 1.0_
