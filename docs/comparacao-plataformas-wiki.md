# 📊 Comparação de Plataformas para Documentação de Jornadas

**Data:** 02/02/2026  
**Projeto:** Educacross - Documentação de 50+ Jornadas de Usuário  
**Objetivo:** Escolher a melhor plataforma para hospedar documentação técnica com automação de screenshots via Playwright

---

## 🆚 Tabela Comparativa Completa

| Critério | Docusaurus | Wiki.js | BookStack | Outline | Notion | GitBook | Confluence |
|----------|-----------|---------|-----------|---------|--------|---------|------------|
| **🎨 Customização CSS** | ✅✅✅ Total | ✅✅ Boa | ✅✅ Boa | ✅ Moderada | ❌ Limitada | 🟡 Parcial | 🟡 Templates |
| **📝 Markdown Puro** | ✅✅✅ 100% | ✅✅✅ Sim | ✅✅ Sim | ✅✅✅ Sim | ❌ Blocos | ✅ Sim | 🟡 Wiki markup |
| **💰 Custo** | ✅✅✅ $0 | ✅✅✅ $0 | ✅✅✅ $0 | ✅✅✅ $0 | 🟡 $8/user | 🟡 $20-50 | ❌ $100+ |
| **🖥️ Self-hosted** | ✅✅✅ Sim | ✅✅✅ Sim | ✅✅✅ Sim | ✅✅✅ Sim | ❌ Cloud | 🟡 Enterprise | 🟡 Data Center |
| **🔧 Backend Necessário** | ❌ Não | ✅ Sim (Node+DB) | ✅ Sim (PHP+MySQL) | ✅ Sim (Node+Redis+S3) | ❌ Cloud | ❌ Cloud | ✅ Sim |
| **📜 Scripts/Automação** | ✅✅✅ Total | ✅✅ API REST/GraphQL | ✅✅ API REST | ✅✅✅ API GraphQL | 🟡 Via API | 🟡 Via API | 🟡 Via API |
| **🚀 Deploy** | ✅✅✅ GitHub Pages | 🟡 Docker/VPS | 🟡 PHP hosting | 🟡 Docker/K8s | ❌ N/A | ✅ GitHub | 🟡 Self-host |
| **📚 Versionamento** | ✅✅✅ Git native | ✅✅ Built-in | ✅ Histórico | ✅✅ Git sync | 🟡 Histórico | ✅ Branches | 🟡 Básico |
| **🔍 Busca** | ✅✅✅ Algolia grátis | ✅✅✅ ElasticSearch/DB | ✅✅ Full-text | ✅✅ Full-text | ✅ Nativa | ✅ Nativa | ✅ Nativa |
| **⚛️ React Components** | ✅✅✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **👥 Editor Visual** | ❌ Não (MD only) | ✅✅✅ WYSIWYG | ✅✅✅ WYSIWYG | ✅✅ Visual | ✅✅✅ Visual | ✅ Hybrid | ✅✅ WYSIWYG |
| **👤 Autenticação** | ❌ Estático | ✅✅✅ Multi (LDAP/OAuth) | ✅✅✅ Multi | ✅✅✅ OAuth/SAML | ✅ Built-in | ✅ SSO | ✅✅✅ Enterprise |
| **💬 Colaboração Real-time** | ❌ Git-based | ❌ Não | ❌ Não | ✅✅✅ Sim | ✅✅✅ Sim | 🟡 Limitado | ✅ Sim |
| **📱 Mobile App** | ✅ PWA | ❌ Não | ❌ Não | ❌ Não | ✅✅ Native | ❌ Não | ✅ Native |
| **🗂️ Hierarquia** | ✅✅ Folders/Sidebar | ✅✅✅ Tree view | ✅✅✅ Books/Chapters | ✅✅ Collections | ✅✅ Pages/DB | ✅ Folders | ✅✅ Spaces |
| **🎭 Playwright Integration** | ✅✅✅ Perfeito | ✅✅ Sim (API) | ✅✅ Sim (API) | ✅✅ Sim (API) | 🟡 Via API | 🟡 Via API | 🟡 Via API |
| **⚡ Performance** | ✅✅✅ Estático (ultra-rápido) | ✅✅ Boa (caching) | ✅ Moderada | ✅✅ Boa | ✅ Boa | ✅✅ Boa | 🟡 Variável |
| **📦 Manutenção** | ✅✅✅ Mínima | 🟡 Média (infra) | 🟡 Média (PHP) | 🟡 Alta (deps) | ❌ Zero (cloud) | ❌ Zero | 🟡 Alta |
| **🌍 i18n (Multilíngue)** | ✅✅✅ Built-in | ✅✅✅ Built-in | ✅✅ Built-in | 🟡 Limitado | 🟡 Manual | ✅ Built-in | ✅ Built-in |
| **📸 Media/Assets** | ✅ Static folder | ✅✅ Upload + storage | ✅✅ Upload + storage | ✅✅✅ S3 integration | ✅ Upload | ✅ Upload | ✅ Upload |
| **🎓 Curva Aprendizado** | 🟡 Média (React) | ✅✅ Fácil | ✅✅✅ Muito fácil | ✅ Fácil | ✅✅✅ Muito fácil | ✅ Fácil | 🟡 Média |

---

## 🔍 Análise Detalhada por Plataforma

### 1. 🏆 Docusaurus (Meta/Facebook)

**Stack:** React + Node.js + Markdown  
**Site:** https://docusaurus.io

#### Prós
- ✅ **Customização CSS Total** - Controle completo de estilos (CSS Variables + CSS Modules + Styled Components)
- ✅ **React Components** - Criar componentes customizados (cards, tabs, diagramas interativos)
- ✅ **Zero Infraestrutura** - Deploy no GitHub Pages gratuitamente
- ✅ **Performance Ultra-rápida** - Site estático otimizado
- ✅ **Versionamento Git Nativo** - Histórico completo no GitHub
- ✅ **Algolia Search Grátis** - Para projetos open source
- ✅ **MDX Support** - Markdown + JSX (componentes inline)
- ✅ **Plugins Ecosystem** - Extensível via plugins
- ✅ **Swizzling** - Sobrescrever qualquer componente do tema
- ✅ **Usado por:** React, Jest, Redux, Babel, Prettier

#### Contras
- ❌ **Sem Editor Visual** - Apenas markdown (mas gera via script!)
- ❌ **Sem Backend** - Não há autenticação/permissões
- ❌ **Git-based** - Colaboração via pull requests

#### Customização CSS Exemplo
```css
/* src/css/custom.css */
:root {
  --ifm-color-primary: #7367F0;
  --ifm-color-success: #28C76F;
  --ifm-color-danger: #EA5455;
  --ifm-color-warning: #FF9F43;
  --ifm-font-family-base: 'Montserrat', sans-serif;
}

.navbar {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
}

.menu__link--active {
  background: linear-gradient(90deg, #7367F0 0%, rgba(115, 103, 240, 0.1) 100%);
  border-left: 3px solid #7367F0;
}
```

#### Estrutura de Projeto
```
docs/
├── docusaurus.config.js    # Configuração
├── sidebars.js              # Estrutura da sidebar
├── docs/                    # Markdown files
│   └── journeys/
│       ├── teacher/
│       └── admin/
├── src/
│   ├── components/          # React components
│   ├── css/
│   │   └── custom.css
│   └── pages/
└── static/
    ├── img/
    │   └── screenshots/     # Playwright screenshots
    └── videos/
```

#### Deploy
```bash
npm run build
npm run serve  # Preview local
# Deploy: Git push → GitHub Actions → GitHub Pages (automático)
```

#### Custo
- **Hospedagem:** $0 (GitHub Pages)
- **Search:** $0 (Algolia DocSearch para OSS)
- **Domínio:** ~$10/ano (opcional)
- **Total:** $0-10/ano

---

### 2. 🥈 Wiki.js

**Stack:** Node.js + Vue.js + Database (PostgreSQL/MySQL/SQLite)  
**Site:** https://js.wiki

#### Prós
- ✅ **Interface Moderna** - Vue.js, design bonito
- ✅ **Editor Visual + Markdown** - Flexibilidade total
- ✅ **Git Sync** - Versionamento automático no GitHub
- ✅ **API GraphQL** - Automação poderosa
- ✅ **Autenticação Robusta** - LDAP, OAuth2, SAML, Active Directory
- ✅ **Multi-idioma Nativo** - i18n built-in
- ✅ **Plugins/Extensões** - Ecosystem rico
- ✅ **Themes Customizáveis** - CSS custom via admin panel

#### Contras
- ❌ **Requer Infraestrutura** - Servidor Node.js + Banco de dados
- ❌ **Custo de Hosting** - VPS/Docker (~$5-10/mês)
- ❌ **Manutenção** - Updates, backups, monitoramento
- ❌ **Sem React Components** - Limitado ao editor visual

#### Customização CSS
```css
/* Admin Panel > Theme > Custom CSS */
.v-toolbar {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%) !important;
}

.v-list-item--active {
  border-left: 3px solid #7367F0 !important;
  background: rgba(115, 103, 240, 0.1) !important;
}
```

#### Deploy
```yaml
# docker-compose.yml
version: '3'
services:
  wiki:
    image: ghcr.io/requarks/wiki:2
    ports:
      - "3000:3000"
    environment:
      DB_TYPE: postgres
      DB_HOST: db
    volumes:
      - ./data:/wiki/data
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: wiki
      POSTGRES_USER: wiki
      POSTGRES_PASSWORD: wikisecret
```

#### Custo
- **VPS:** $5-10/mês (DigitalOcean/Linode)
- **Domínio:** ~$10/ano
- **Total:** $70-130/ano

---

### 3. 🥉 BookStack

**Stack:** PHP (Laravel) + MySQL  
**Site:** https://www.bookstackapp.com

#### Prós
- ✅ **UX Excelente** - Interface mais intuitiva de todas
- ✅ **Estrutura Books/Chapters/Pages** - Perfeito para documentação
- ✅ **Editor WYSIWYG** - TinyMCE (drag & drop de imagens)
- ✅ **Permissões Granulares** - Por página/capítulo/livro
- ✅ **API REST Completa** - Automação fácil
- ✅ **Fácil de Instalar** - PHP tradicional (shared hosting)
- ✅ **Markdown Suportado** - Alternativa ao WYSIWYG

#### Contras
- ❌ **PHP** - Stack diferente do projeto (Vue/JS)
- ❌ **Customização CSS Limitada** - Comparado ao Docusaurus
- ❌ **Sem Git Sync Nativo** - Precisa de workarounds
- ❌ **Performance Moderada** - PHP + queries dinâmicas

#### Customização CSS
```html
<!-- Settings > Customization > Custom HTML Head -->
<style>
.header {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
}

.book-contents .chapter {
  border-left: 3px solid #7367F0;
}

.entity-list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(115, 103, 240, 0.2);
}
</style>
```

#### Estrutura Lógica
```
📕 Books (Contextos)
├── 👨‍🏫 Professor
│   ├── 📖 Sistema Educacional
│   │   ├── Livros (Page)
│   │   ├── Missões (Page)
│   │   └── Relatórios (Page)
│   └── 📖 Cadastros
│       ├── Alunos (Page)
│       └── Turmas (Page)
└── 📕 Admin
    └── ...
```

#### Custo
- **Shared Hosting:** $5-10/mês
- **Domínio:** ~$10/ano
- **Total:** $70-130/ano

---

### 4. Outline

**Stack:** Node.js + React + PostgreSQL + Redis + S3  
**Site:** https://www.getoutline.com

#### Prós
- ✅ **Interface Tipo Notion** - UX moderna e fluida
- ✅ **Colaboração Real-time** - Múltiplos usuários simultâneos
- ✅ **Editor Prosemirror** - Visual excelente
- ✅ **API GraphQL** - Automação poderosa
- ✅ **Git Sync Opcional** - Backup no GitHub
- ✅ **Collections Flexíveis** - Organização livre

#### Contras
- ❌ **Setup Complexo** - 4 serviços (Node + Postgres + Redis + S3)
- ❌ **Requer S3/MinIO** - Para assets (imagens/vídeos)
- ❌ **Customização CSS Limitada** - Themes pré-definidos
- ❌ **Footprint Maior** - Mais pesado que as outras opções

#### Stack Necessária
```yaml
services:
  outline:
    image: outlinewiki/outline
  postgres:
    image: postgres:15
  redis:
    image: redis:7
  minio:  # S3-compatible
    image: minio/minio
```

#### Custo
- **VPS:** $10-20/mês (requer mais recursos)
- **S3/MinIO:** $5-10/mês (storage)
- **Total:** $180-360/ano

---

### 5. Notion (Comercial)

**Stack:** Proprietário (Cloud)  
**Site:** https://notion.so

#### Prós
- ✅ **UX Impecável** - Melhor interface visual
- ✅ **Zero Manutenção** - Tudo gerenciado
- ✅ **Colaboração Real-time** - Nativa
- ✅ **Mobile Apps** - iOS/Android
- ✅ **Templates Rico** - Galeria extensa

#### Contras
- ❌ **Custo Alto** - $8-10/usuário/mês
- ❌ **Customização CSS Limitada** - Temas pré-definidos
- ❌ **Vendor Lock-in** - Dependência da plataforma
- ❌ **Não é Markdown Puro** - Blocos proprietários
- ❌ **API Limitada** - Menos flexível para automação

#### Custo
- **Team Plan:** $10/usuário/mês
- **10 usuários:** $100/mês = $1.200/ano

---

### 6. GitBook (Comercial)

**Stack:** Proprietário (Cloud) + GitHub Integration  
**Site:** https://gitbook.com

#### Prós
- ✅ **Integração GitHub** - Sync automático
- ✅ **Markdown Puro** - 100% compatível
- ✅ **Versionamento** - Branches e versões
- ✅ **API** - Automação possível
- ✅ **Search Otimizado** - Nativo

#### Contras
- ❌ **Custo** - $20-50/mês
- ❌ **Customização Limitada** - Themes pré-definidos
- ❌ **Cloud Only** - Não é self-hosted

#### Custo
- **Plus:** $29/mês = $348/ano
- **Pro:** $99/mês = $1.188/ano

---

### 7. Confluence (Enterprise)

**Stack:** Java (Atlassian) + Database  
**Site:** https://www.atlassian.com/software/confluence

#### Prós
- ✅ **Integração Jira** - Ecosystem Atlassian
- ✅ **Enterprise Features** - Permissões robustas
- ✅ **Templates Poderosos** - Para documentação técnica

#### Contras
- ❌ **Custo Muito Alto** - $100+/mês
- ❌ **UI Pesada** - Menos moderna
- ❌ **Customização Limitada** - Via templates
- ❌ **Complexo** - Curva de aprendizado

#### Custo
- **Standard:** $5.75/usuário/mês (mínimo 10 usuários) = $690/ano
- **Premium:** $11/usuário/mês = $1.320/ano

---

## 🎯 Matriz de Decisão

### Use Docusaurus se:
- ✅ Time 100% técnico (devs confortáveis com React/JS)
- ✅ Prioriza **customização total** (CSS, componentes, layout)
- ✅ Quer **zero infraestrutura** (GitHub Pages gratuito)
- ✅ Documentação é **read-only** (sem edição via web)
- ✅ Quer integração perfeita com **scripts de automação**
- ✅ Performance ultra-rápida é crítica (site estático)
- ✅ Versionamento Git é suficiente

### Use Wiki.js se:
- ✅ Time misto (devs + não-devs precisam editar via web)
- ✅ Quer editor visual + markdown
- ✅ Precisa de **autenticação robusta** (LDAP/SAML)
- ✅ Quer **Git sync** (versionamento GitHub)
- ✅ Pode manter servidor Node.js + banco de dados
- ✅ Quer interface moderna e customizável
- ✅ API GraphQL é importante

### Use BookStack se:
- ✅ Prioriza **facilidade de uso** (UX mais intuitiva)
- ✅ Estrutura Books/Chapters faz sentido
- ✅ Time tem experiência com PHP/Laravel
- ✅ Quer setup rápido (shared hosting PHP)
- ✅ Permissões granulares são importantes
- ✅ Editor WYSIWYG é preferido
- ❌ Não precisa de Git sync

### Use Outline se:
- ✅ Quer experiência tipo **Notion** (colaboração real-time)
- ✅ Time trabalha colaborativamente (muitos editores simultâneos)
- ✅ Pode manter stack completa (Postgres + Redis + S3)
- ✅ Busca poderosa é crítica
- ❌ Setup complexo não é problema

### Use Notion se:
- ✅ Time 100% não-técnico
- ✅ Zero manutenção/infra é prioridade
- ✅ Pode pagar $100+/mês
- ❌ Aceita limitações de customização

---

## 📊 Score Final - Projeto Educacross

| Solução | Score | Custo/ano | Setup | Manutenção | Customização | Automação |
|---------|-------|-----------|-------|------------|--------------|-----------|
| **Docusaurus** | 🏆 95/100 | $0-10 | 2h | Mínima | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Wiki.js** | 🥈 85/100 | $70-130 | 4h | Média | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **BookStack** | 🥉 70/100 | $70-130 | 3h | Média | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Outline** | 65/100 | $180-360 | 8h | Alta | ⭐⭐ | ⭐⭐⭐⭐ |
| Notion | 60/100 | $1.200+ | 0h | Zero | ⭐ | ⭐⭐ |
| GitBook | 75/100 | $348+ | 1h | Mínima | ⭐⭐ | ⭐⭐⭐ |
| Confluence | 55/100 | $690+ | 6h | Alta | ⭐⭐ | ⭐⭐ |

---

## 💎 Recomendação Final

### 🥇 **1ª Opção: Docusaurus** (95% fit)

**Por quê:**
- ✅ Time técnico (desenvolvedores Vue/JS)
- ✅ Scripts Playwright se integram perfeitamente
- ✅ Customização CSS total (Vuexy theme)
- ✅ Zero custo + zero manutenção
- ✅ Deploy GitHub Pages em segundos
- ✅ Performance ultra-rápida
- ✅ Markdown puro (pode gerar via script)

**Trade-off:**
- ❌ Sem editor web (mas você vai gerar via script!)
- ❌ Não-devs não podem editar facilmente (mas a documentação é técnica mesmo)

**ROI:** Infinito (custo zero, valor alto)

---

### 🥈 **2ª Opção: Wiki.js** (85% fit)

**Por quê:**
- ✅ Se precisar de editor web no futuro
- ✅ Git sync = versionamento GitHub
- ✅ API GraphQL para automação Playwright
- ✅ Customização CSS boa
- ✅ Interface moderna

**Trade-off:**
- ❌ Precisa manter servidor (Docker/VPS)
- ❌ Custo de infra (~$5-10/mês)
- ❌ Mais complexo que Docusaurus

**ROI:** Bom ($130/ano, valor alto)

---

### 🥉 **3ª Opção: BookStack** (70% fit)

**Quando considerar:**
- ✅ Se time não-técnico também vai editar
- ✅ Se estrutura Books/Chapters/Pages faz sentido perfeito
- ✅ Se já tem hosting PHP

**Trade-off:**
- ❌ PHP (time é JS/Vue)
- ❌ Customização CSS mais limitada

**ROI:** Moderado ($130/ano, valor médio)

---

## 🚀 Plano de Implementação Recomendado

### Fase 1: **Docusaurus** (Imediato - 2 horas)
1. Setup inicial do projeto
2. Customização do tema com cores Vuexy
3. Estrutura de pastas para jornadas
4. Deploy no GitHub Pages
5. Integração com scripts de geração automática

**Entregável:** Wiki funcionando em https://educacross.github.io/docs

### Fase 2: **Automação** (3-4 dias)
1. Script de análise de rotas (extrair metadados)
2. Script Playwright (capturar screenshots/vídeos)
3. Pipeline integrado (análise + capturas + markdown)
4. GitHub Actions (CI/CD automático)

**Entregável:** Documentação gerada automaticamente a cada commit

### Fase 3: **Conteúdo** (2-3 semanas)
1. Documentar 15 jornadas core (Fase 1)
2. Documentar 20 jornadas secundárias (Fase 2)
3. Documentar 15+ jornadas de suporte (Fase 3)
4. Revisar e validar com stakeholders

**Entregável:** 50+ jornadas documentadas com screenshots

### Fase 4 (Opcional - Futuro): **Migração para Wiki.js**
- Quando time não-técnico precisar editar
- Mantém Git sync (melhor dos dois mundos)
- Migração fácil (markdown é compatível)

---

## 🎁 Benefícios da Solução Escolhida

### Docusaurus + Playwright + GitHub Pages

**Técnicos:**
- ⚡ Performance: 100/100 (Lighthouse)
- 🔍 SEO: Otimizado (site estático)
- 📱 PWA: Funciona offline
- 🌐 i18n: Multi-idioma ready
- 🔒 HTTPS: Automático (GitHub Pages)

**Operacionais:**
- 💰 Custo: $0/ano
- ⏱️ Setup: 2 horas
- 🔧 Manutenção: Mínima
- 🚀 Deploy: Automático (git push)
- 📦 Backup: Git (histórico completo)

**Desenvolvimento:**
- 🎨 Customização: 100%
- 🤖 Automação: Total
- 📸 Screenshots: Playwright integrado
- 🎬 Vídeos: Suportado
- 📊 Diagramas: Mermaid.js nativo

**Time:**
- 👨‍💻 Devs: Full control
- 📝 Escritores: Markdown (simples)
- 🔄 Colaboração: Pull requests
- 📚 Versionamento: Git completo

---

## 📞 Contato e Suporte

**Documentação Oficial:**
- Docusaurus: https://docusaurus.io/docs
- Playwright: https://playwright.dev/docs/intro

**Comunidade:**
- Discord: https://discord.gg/docusaurus
- GitHub Discussions: https://github.com/facebook/docusaurus/discussions

**Recursos:**
- Showcase: https://docusaurus.io/showcase
- Templates: https://github.com/facebook/docusaurus/tree/main/examples

---

_Documento preparado para o projeto Educacross - Ambiente de Prototipação V5_
