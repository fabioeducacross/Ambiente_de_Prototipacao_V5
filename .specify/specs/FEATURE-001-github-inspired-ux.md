# FEATURE-001: GitHub-Inspired UX/UI Improvements

**Status**: Planning  
**Priority**: HIGH  
**Type**: Enhancement  
**Created**: 2026-02-06  
**Target Branch**: `feature/github-inspired-ux`

---

## 📋 Executive Summary

Implementar melhorias de UX/UI na documentação Docusaurus inspiradas nas melhores práticas do GitHub Docs (docs.github.com/pt), visando aumentar a descoberta de conteúdo, reduzir tempo de onboarding e melhorar a experiência geral de navegação.

**Problema Atual:**
- Homepage padrão do Docusaurus é genérica e não destaca conteúdo importante
- Usuários novos não sabem por onde começar
- Navegação plana dificulta a descoberta de documentos relacionados
- Ausência de feedback sobre utilidade da documentação
- Sem mecanismos para identificar conteúdo popular

**Solução Proposta:**
Redesenhar a homepage e adicionar componentes de UX que:
- Organizam conteúdo em cards categorizados visuais
- Destacam documentos mais importantes em seção "Popular"
- Implementam sistema de busca otimizado
- Coletam feedback de usuários (👍 👎)
- Melhoram navegação com breadcrumbs e seletor de perfil

---

## 🎯 Goals & Success Metrics

### Business Goals
1. **Reduzir tempo de onboarding** de novos usuários em 40%
2. **Aumentar taxa de descoberta** de documentos críticos em 60%
3. **Melhorar satisfação** do usuário (medido via feedback 👍 👎)
4. **Reduzir suporte** por dúvidas sobre localização de documentos

### User Goals
- **Como Professor**: Encontrar jornadas educacionais e regras de negócio rapidamente
- **Como Desenvolvedor**: Acessar templates PRD/PDR e arquitetura técnica facilmente
- **Como Gestor**: Navegar entre visão de produto e roadmap sem fricção
- **Como Novo Usuário**: Entender estrutura da documentação em < 1 minuto

### Success Metrics
| Métrica | Baseline | Target | Medição |
|---------|----------|--------|---------|
| Tempo para encontrar doc | N/A | < 30s | Google Analytics |
| Taxa de uso da busca | N/A | > 40% | GA Events |
| Feedback positivo | N/A | > 80% | Componente 👍 👎 |
| Bounce rate homepage | N/A | < 20% | GA |
| Páginas/sessão | N/A | > 3.5 | GA |
| Lighthouse Score | TBD | > 90 | CI/CD |

---

## 👥 User Personas

### Persona 1: Maria (Professora)
- **Contexto**: Precisa entender regras de gestão de turmas
- **Pain Points**: Não sabe se existe documentação sobre diário de classe
- **Needs**: Acesso rápido a regras de negócio organizadas por domínio
- **Success**: Encontra RN001-RN050 em < 20 segundos via card "Regras de Negócio"

### Persona 2: João (Desenvolvedor Frontend)
- **Contexto**: Novo no time, precisa entender padrões do projeto
- **Pain Points**: Template PRD está "escondido" na estrutura de pastas
- **Needs**: Exemplos práticos e templates prontos para usar
- **Success**: Acessa template PRD via seção "Popular" em < 10 segundos

### Persona 3: Ana (Product Owner)
- **Contexto**: Quer revisar visão de produto e roadmap
- **Pain Points**: Navegação por pastas não é intuitiva
- **Needs**: Acesso direto a docs estratégicos
- **Success**: Clica em card "Produto" e vê visão/estratégia/roadmap

### Persona 4: Carlos (Novo Membro)
- **Contexto**: Primeiro dia, precisa de orientação geral
- **Pain Points**: Sobrecarga de informação, não sabe priorizar
- **Needs**: Guia de início rápido e tour pela documentação
- **Success**: Homepage com cards dá mapa mental claro em < 1 minuto

---

## 🔍 Research & Competitive Analysis

### Benchmark: GitHub Docs (docs.github.com/pt)

**Por que GitHub?**
- Referência global em documentação técnica (milhões de usuários)
- Padrões validados e testados em escala
- Suporta múltiplas personas (devs, PMs, admins)
- Open source e bem documentado

**Key Insights Extraídos:**
1. **Homepage com 11 categorias em cards visuais** → Alta escaneabilidade
2. **Seção "Popular"** destaca 4 docs mais acessados → Onboarding rápido
3. **Seletor de versão** (Free/Pro/Team) → Filtragem por contexto
4. **Busca com placeholder inteligente** → Reduz fricção
5. **Footer com "Ajuda e Suporte"** → Suporte proativo
6. **Ícones + cores por categoria** → Hierarquia visual clara
7. **Breadcrumb sempre visível** → Orientação contextual
8. **Links externos marcados** → Transparência
9. **Feedback 👍 👎 em cada página** → Loop de melhoria contínua
10. **Design mobile-first** → Acessibilidade universal

**Validation:**
- ✅ Screenshot capturado: `github-docs-homepage.png`
- ✅ Análise com Playwright MCP confirmada
- ✅ Estrutura HTML e acessibilidade validadas

---

## 📐 Functional Requirements

### FR-001: Homepage com Cards Categorizados
**Priority**: CRITICAL  
**User Story**: Como usuário, quero ver categorias visuais na homepage para identificar rapidamente onde está o conteúdo que procuro.

**Acceptance Criteria:**
- [ ] Homepage customizada substitui padrão Docusaurus
- [ ] Mínimo de 4 categorias exibidas como cards:
  - 📘 Regras de Negócio (149 regras em 6 domínios)
  - 🎯 Documentação de Produto (Visão, PRDs, PDRs)
  - 🚀 Jornadas Educacionais (Templates e exemplos)
  - ⚙️ Setup & Desenvolvimento (Guias técnicos)
- [ ] Cada card contém:
  - Ícone visual (emoji ou SVG)
  - Título (H2)
  - Descrição curta (1 linha)
  - Lista de 3-5 links principais
- [ ] Cards são responsivos: 3 colunas (desktop) → 2 (tablet) → 1 (mobile)
- [ ] Hover effect: `translateY(-4px)` + shadow
- [ ] Border-left colorido por categoria (paleta Vuexy)

**Technical Notes:**
- Implementar em `documentation/src/pages/index.tsx`
- Componente `CategoryCard.tsx` reutilizável
- CSS Module para isolamento de estilos
- Grid layout com breakpoints: 996px, 768px

**Dependencies:**
- Nenhuma (trabalho independente)

---

### FR-002: Seção "Documentos Mais Acessados"
**Priority**: HIGH  
**User Story**: Como novo usuário, quero ver documentos importantes destacados para começar pelo que é mais relevante.

**Acceptance Criteria:**
- [ ] Componente `PopularDocs.tsx` criado
- [ ] Lista 4-6 documentos estratégicos:
  - Template PRD
  - Visão de Produto
  - RN001-RN010 (Gestão de Turmas)
  - Guia de Início Rápido
  - PDR-001 (Arquitetura de Dados)
  - FAQ
- [ ] Cada item contém:
  - Ícone
  - Título
  - Descrição contextual (1-2 linhas)
  - Link direto
- [ ] Seção posicionada entre hero e cards
- [ ] Responsivo: 2 colunas (desktop) → 1 (mobile)
- [ ] Analytics tracking em cliques

**Technical Notes:**
- Popular docs definidos manualmente (v1)
- Futuramente: integrar com GA para popular dinâmico
- Event tracking: `gtag('event', 'popular_doc_click', { doc_id })`

**Dependencies:**
- FR-001 (homepage base)

---

### FR-003: Sistema de Busca Otimizado
**Priority**: HIGH  
**User Story**: Como usuário, quero buscar conteúdo de forma rápida e intuitiva sem navegar manualmente.

**Acceptance Criteria:**
- [ ] Plugin de busca local instalado (`@cmfcmf/docusaurus-search-local`)
- [ ] Placeholder customizado: "Pesquisar na documentação... 🔍"
- [ ] Busca funciona offline
- [ ] Resultados classificados por relevância
- [ ] Destacar documentos "populares" nos resultados (boost)
- [ ] Debounce de 300ms para performance
- [ ] Suporta busca em português (stemming)
- [ ] Indexa docs/, prds/, pdrs/, personas/
- [ ] Keyboard shortcut: Ctrl+K ou / para focar busca

**Technical Notes:**
```typescript
// docusaurus.config.js
plugins: [
  [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    {
      indexDocs: true,
      indexBlog: false,
      language: 'pt',
      maxSearchResults: 8,
      highlightSearchTermsOnTargetPage: true,
    },
  ],
],
```

**Dependencies:**
- Nenhuma (plugin standalone)

---

### FR-004: Componente de Feedback (👍 👎)
**Priority**: MEDIUM  
**User Story**: Como autor, quero saber se a documentação está ajudando os usuários para melhorá-la continuamente.

**Acceptance Criteria:**
- [ ] Footer de página com "Esta página foi útil? 👍 👎"
- [ ] Clique envia evento para Google Analytics
- [ ] Feedback visual após votação ("Obrigado!")
- [ ] Botões desabilitados após voto (1 voto por sessão)
- [ ] Não bloqueia renderização (lazy loading)
- [ ] Dados armazenados em GA Events:
  - `event: 'doc_feedback'`
  - `helpful: true/false`
  - `page: window.location.pathname`
  - `timestamp`

**Technical Notes:**
- Implementar em `documentation/src/theme/DocItem/Footer/index.tsx`
- Usar React hooks (useState para estado local)
- localStorage para prevenir múltiplos votos

**Dependencies:**
- FR-008 (Google Analytics configurado)

---

### FR-005: Seletor de Perfil/Contexto
**Priority**: MEDIUM  
**User Story**: Como usuário com perfil específico, quero filtrar documentação relevante para meu contexto.

**Acceptance Criteria:**
- [ ] Dropdown no navbar: "Perfil: Todos"
- [ ] Opções:
  - 👨‍🏫 Professor
  - 👨‍🎓 Aluno
  - 👔 Gestor
  - 🔧 Desenvolvedor
  - 📊 Product Owner
  - 🎯 Todos (default)
- [ ] Seleção persiste em localStorage
- [ ] Filtra sidebar com query param: `?perfil=professor`
- [ ] Badge visual no card se aplicável a múltiplos perfis
- [ ] Analytics tracking de mudanças de perfil

**Technical Notes:**
- V1: Query param manual (não filtra automaticamente)
- V2: Filtro dinâmico via plugin customizado
- Usar `window.location.search` para ler perfil

**Dependencies:**
- FR-001 (homepage com cards)

---

### FR-006: Footer "Ajuda e Suporte"
**Priority**: LOW  
**User Story**: Como usuário com dúvida, quero ter acesso fácil a canais de suporte.

**Acceptance Criteria:**
- [ ] Footer com 3 colunas:
  - 📚 Documentação (links principais)
  - 🤝 Ajuda e Suporte (comunidade, issues, FAQ)
  - 🔗 Links Úteis (Educacross, Design System)
- [ ] Links externos abrem em nova aba
- [ ] Ícone 🔗 adicionado automaticamente em links externos
- [ ] `rel="noopener noreferrer"` para segurança
- [ ] Copyright dinâmico: `© 2026 Educacross`

**Technical Notes:**
```typescript
// docusaurus.config.js - themeConfig.footer
footer: {
  style: 'dark',
  links: [
    {
      title: '🤝 Ajuda e Suporte',
      items: [
        {
          label: 'GitHub Discussions',
          href: 'https://github.com/educacross/...',
        },
        {
          label: 'Reportar Bug',
          href: 'https://github.com/educacross/.../issues/new',
        },
        { label: 'FAQ', to: '/docs/faq' },
      ],
    },
  ],
}
```

**Dependencies:**
- Nenhuma

---

### FR-007: Design System com Ícones e Cores
**Priority**: LOW  
**User Story**: Como usuário, quero navegação visualmente clara com hierarquia de cores.

**Acceptance Criteria:**
- [ ] Paleta de cores definida em `custom.css`:
  - Vuexy base: Primary #7367F0, Success #28C76F, Warning #FF9F43, Danger #EA5455, Info #00CFE8
  - GitHub-inspired: Intro #0969DA, Collab #8250DF, DevOps #1A7F37, Security #D1242F
- [ ] Cada categoria tem cor única
- [ ] Border-left de 4px nos cards com cor da categoria
- [ ] Ícones SVG inline (MaterialIcon component)
- [ ] Hover effects suaves (transition 0.2s)
- [ ] Dark mode compatível

**Technical Notes:**
- CSS custom properties em `:root`
- Componente MaterialIcon já existe no projeto
- Testar contraste WCAG AA em ambos os temas

**Dependencies:**
- FR-001 (cards para aplicar cores)

---

### FR-008: Google Analytics Integration
**Priority**: MEDIUM  
**User Story**: Como gestor, quero métricas de uso da documentação para priorizar melhorias.

**Acceptance Criteria:**
- [ ] GA4 configurado em `docusaurus.config.js`
- [ ] Tracking ID configurado via env var: `GOOGLE_ANALYTICS_ID`
- [ ] Eventos customizados:
  - `doc_feedback` (👍 👎)
  - `popular_doc_click` (seção Popular)
  - `search_query` (termos buscados)
  - `profile_change` (mudança de perfil)
  - `category_card_click` (clique em card)
- [ ] Page views automáticos
- [ ] User ID anonimizado (LGPD compliance)
- [ ] Cookie consent banner (opcional v1)

**Technical Notes:**
```typescript
// docusaurus.config.js
themeConfig: {
  gtag: {
    trackingID: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

**Dependencies:**
- Nenhuma (standalone)

---

## 🎨 Non-Functional Requirements

### NFR-001: Performance
- [ ] Lighthouse Performance Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size < 300KB (gzipped)
- [ ] Images otimizadas (WebP com fallback PNG)
- [ ] Lazy loading em componentes pesados
- [ ] Code splitting por rota

### NFR-002: Accessibility (WCAG AA)
- [ ] Contraste mínimo 4.5:1 em textos
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] ARIA labels em elementos interativos
- [ ] Breadcrumb com `aria-label="breadcrumb"`
- [ ] Focus visible em todos os elementos clicáveis
- [ ] Screen reader friendly (testar com NVDA)
- [ ] Área de toque mínima: 44x44px (mobile)

### NFR-003: SEO
- [ ] Títulos H1-H3 com hierarquia semântica
- [ ] Meta descriptions em todas as páginas (< 160 chars)
- [ ] Sitemap.xml gerado automaticamente
- [ ] Robots.txt configurado
- [ ] Open Graph tags para compartilhamento social
- [ ] Structured data (JSON-LD) para documentação
- [ ] URLs amigáveis (kebab-case)

### NFR-004: Responsividade
- [ ] Breakpoints: 320px, 768px, 996px, 1200px
- [ ] Mobile-first CSS
- [ ] Touch-friendly (gestos de swipe em mobile)
- [ ] Viewport meta tag configurado
- [ ] Imagens responsivas (srcset)
- [ ] Fontes otimizadas para mobile (system fonts)

### NFR-005: Browser Support
- [ ] Chrome 90+ (✅)
- [ ] Firefox 88+ (✅)
- [ ] Safari 14+ (✅)
- [ ] Edge 90+ (✅)
- [ ] Mobile Safari iOS 14+ (✅)
- [ ] Chrome Android 90+ (✅)

### NFR-006: Security
- [ ] Content Security Policy (CSP) configurado
- [ ] HTTPS obrigatório em produção
- [ ] `rel="noopener noreferrer"` em links externos
- [ ] XSS protection (React auto-escaping)
- [ ] Nenhum dado sensível em analytics
- [ ] Cookie consent (LGPD/GDPR)

---

## 🏗️ Architecture & Technical Design

### Tech Stack
- **Frontend**: Docusaurus 3.9.2 + React 18 + TypeScript
- **Build**: Node v22.22.0, npm
- **Styling**: CSS Modules + CSS Custom Properties
- **Analytics**: Google Analytics 4
- **Search**: @cmfcmf/docusaurus-search-local
- **Icons**: Material Symbols (via MaterialIcon component)
- **Deployment**: Static build → http-server (dev) | Vercel/Netlify (prod)

### Directory Structure
```
documentation/
├── src/
│   ├── pages/
│   │   ├── index.tsx               # Homepage customizada
│   │   └── index.module.css        # Estilos do index
│   ├── components/
│   │   ├── CategoryCard/
│   │   │   ├── index.tsx
│   │   │   └── CategoryCard.module.css
│   │   ├── PopularDocs/
│   │   │   ├── index.tsx
│   │   │   └── PopularDocs.module.css
│   │   └── MaterialIcon.tsx       # (já existe)
│   ├── theme/
│   │   └── DocItem/
│   │       └── Footer/
│   │           └── index.tsx       # Feedback component
│   └── css/
│       └── custom.css              # Paleta de cores global
├── docs/                           # Documentação existente
├── static/
│   └── img/                        # Assets otimizados
├── docusaurus.config.js            # Configuração central
├── sidebars.js                     # Sidebar configuration
└── package.json
```

### Component Hierarchy
```
index.tsx (Homepage)
├── Hero Section
│   ├── Heading
│   └── Subtitle
├── PopularDocs
│   └── PopularCard (x6)
│       ├── Icon
│       ├── Title
│       └── Description
└── CategoryGrid
    └── CategoryCard (x4-6)
        ├── Icon
        ├── Title
        ├── Description
        └── LinkList
            └── Link (x3-5)
```

### Data Flow
```
User Action → Component → Analytics Event → GA4
                ↓
          State Update (React)
                ↓
           Render UI Feedback
```

**Example: Feedback Component**
```
1. User clicks 👍
2. useState updates: feedback = true
3. gtag('event', 'doc_feedback', { helpful: true, page: '/docs/prds/template' })
4. localStorage.setItem('feedback_/docs/prds/template', 'true')
5. Render: "Obrigado! 🎉" + disable buttons
```

### Build Process
```
npm run build
  → TypeScript Compilation
  → MDX Processing
  → React SSR (Static Generation)
  → CSS Minification
  → Asset Optimization
  → Generate sitemap.xml
  → Output to build/
```

### Deployment Pipeline (Future)
```
git push origin feature/github-inspired-ux
  → GitHub Actions Trigger
  → npm ci (install deps)
  → npm run build
  → Lighthouse CI (performance audit)
  → Deploy to Vercel/Netlify
  → Smoke tests
  → Production URL
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)
```typescript
// __tests__/CategoryCard.test.tsx
import { render, screen } from '@testing-library/react';
import CategoryCard from '../CategoryCard';

describe('CategoryCard', () => {
  it('renders title and description', () => {
    render(
      <CategoryCard
        title="Regras de Negócio"
        description="149 regras organizadas"
        links={[{ label: 'RN001', to: '/docs/rules/rn001' }]}
      />
    );
    expect(screen.getByText('Regras de Negócio')).toBeInTheDocument();
    expect(screen.getByText('149 regras organizadas')).toBeInTheDocument();
  });

  it('renders all links', () => {
    const links = [
      { label: 'Link 1', to: '/link1' },
      { label: 'Link 2', to: '/link2' },
    ];
    render(<CategoryCard title="Test" links={links} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
```

### Integration Tests
- [ ] Homepage renders all cards
- [ ] PopularDocs section visible
- [ ] Search returns results
- [ ] Feedback component tracks analytics
- [ ] Profile selector updates URL

### E2E Tests (Playwright)
```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate from homepage to PRD template', async ({ page }) => {
  await page.goto('http://localhost:3003');
  
  // Click on "Popular" section
  await page.click('text=Template PRD');
  
  // Verify navigation
  await expect(page).toHaveURL(/.*\/docs\/prds\/template/);
  await expect(page.locator('h1')).toContainText('Template PRD');
  
  // Verify feedback component
  await expect(page.locator('text=Esta página foi útil?')).toBeVisible();
});
```

### Performance Tests (Lighthouse CI)
```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3003', 'http://localhost:3003/docs/prds/template'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

### Accessibility Tests (axe-core)
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3003');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
```

### Manual Testing Checklist
- [ ] Visual regression (screenshot comparison)
- [ ] Cross-browser testing (BrowserStack)
- [ ] Mobile device testing (iOS Safari, Chrome Android)
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Esc)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Print stylesheet (optional)

---

## 📅 Implementation Plan

### Phase 0: Preparation (30 min)
- [x] Research GitHub Docs UX patterns
- [x] Capture screenshots and validate findings
- [x] Document insights and recommendations
- [ ] Review with stakeholders
- [ ] Create feature branch: `feature/github-inspired-ux`

### Phase 1: Foundation (2-3 hours)
**Week 1, Days 1-2**

**Tasks:**
1. [ ] Create directory structure (`src/pages`, `src/components`, etc.)
2. [ ] Setup custom.css with color palette
3. [ ] Install dependencies:
   ```bash
   cd documentation
   npm install --save @cmfcmf/docusaurus-search-local
   ```
4. [ ] Configure `docusaurus.config.js`:
   - Enable search plugin
   - Setup Google Analytics (placeholder)
   - Configure footer links
5. [ ] Create base components (empty shells):
   - `CategoryCard/index.tsx`
   - `PopularDocs/index.tsx`
   - `DocItem/Footer/index.tsx`

**Deliverables:**
- ✅ Project structure
- ✅ Dependencies installed
- ✅ Config file updated
- ✅ Empty component files

**Testing:**
```bash
npm run build
# Should compile without errors
```

---

### Phase 2: Homepage Implementation (4-5 hours)
**Week 1, Days 3-4**

**Task 2.1: Create CategoryCard Component (1.5h)**
```typescript
// src/components/CategoryCard/index.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  links: Array<{ label: string; to: string }>;
}

export default function CategoryCard({
  icon,
  title,
  description,
  color,
  links,
}: CategoryCardProps): JSX.Element {
  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h2>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <ul className={styles.linkList}>
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Task 2.2: Style CategoryCard (1h)**
```css
/* src/components/CategoryCard/CategoryCard.module.css */
.card {
  background: var(--ifm-card-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-left: 4px solid var(--ifm-color-primary);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.icon {
  font-size: 2rem;
}

.header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.description {
  color: var(--ifm-color-emphasis-700);
  margin-bottom: 1rem;
}

.linkList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.linkList li {
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 1.5rem;
  }
}
```

**Task 2.3: Create Homepage (1.5h)**
```typescript
// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CategoryCard from '@site/src/components/CategoryCard';
import PopularDocs from '@site/src/components/PopularDocs';
import styles from './index.module.css';

const categories = [
  {
    icon: '📘',
    title: 'Regras de Negócio',
    description: '149 regras organizadas por domínio funcional',
    color: '#0969DA',
    links: [
      { label: 'Gestão de Turmas', to: '/docs/business-rules/class-management' },
      { label: 'Registro de Diário', to: '/docs/business-rules/diary-records' },
      { label: 'Jornadas Educacionais', to: '/docs/business-rules/educational-journeys' },
      { label: 'Gestão de Pessoas', to: '/docs/business-rules/people-management' },
      { label: 'Ver Todas →', to: '/docs/business-rules' },
    ],
  },
  {
    icon: '🎯',
    title: 'Documentação de Produto',
    description: 'Visão estratégica, PRDs e decisões de produto',
    color: '#8250DF',
    links: [
      { label: 'Visão e Estratégia', to: '/docs/product/vision' },
      { label: 'Templates PRD', to: '/docs/prds' },
      { label: 'PDRs - Decisões Técnicas', to: '/docs/pdrs' },
      { label: 'Roadmap', to: '/docs/product/roadmap' },
    ],
  },
  {
    icon: '🚀',
    title: 'Jornadas Educacionais',
    description: 'Templates e exemplos de jornadas de aprendizagem',
    color: '#1A7F37',
    links: [
      { label: 'Template de Jornada', to: '/docs/journeys/template' },
      { label: 'Exemplos Práticos', to: '/docs/journeys/examples' },
      { label: 'Melhores Práticas', to: '/docs/journeys/best-practices' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Setup & Desenvolvimento',
    description: 'Guias técnicos e configuração de ambiente',
    color: '#D1242F',
    links: [
      { label: 'Guia de Início Rápido', to: '/docs/getting-started' },
      { label: 'Configurar Ambiente', to: '/docs/development/setup' },
      { label: 'Padrões de Código', to: '/docs/development/standards' },
      { label: 'Contribuir', to: '/docs/contributing' },
    ],
  },
  {
    icon: '👥',
    title: 'Personas & Contexto',
    description: 'Entenda os diferentes perfis de usuários',
    color: '#BF8700',
    links: [
      { label: 'Professor', to: '/docs/personas/professor' },
      { label: 'Aluno', to: '/docs/personas/aluno' },
      { label: 'Gestor', to: '/docs/personas/administrator' },
      { label: 'Coordenador', to: '/docs/personas/coordinator' },
    ],
  },
  {
    icon: '❓',
    title: 'FAQ & Suporte',
    description: 'Perguntas frequentes e ajuda',
    color: '#00CFE8',
    links: [
      { label: 'Perguntas Frequentes', to: '/docs/faq' },
      { label: 'Glossário', to: '/docs/glossary' },
      { label: 'Reportar Bug', to: 'https://github.com/educacross/ambiente-prototipacao-v5/issues' },
      { label: 'Contato', to: '/docs/support' },
    ],
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Documentação"
      description="Documentação completa do Ambiente de Prototipação V5">
      <main>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              📚 Documentação do Ambiente de Prototipação V5
            </h1>
            <p className={styles.heroSubtitle}>
              Regras de negócio, documentação de produto, jornadas educacionais e guias técnicos em um só lugar.
            </p>
          </div>
        </div>

        <div className="container">
          <PopularDocs />

          <div className={styles.categoriesSection}>
            <div className="row">
              {categories.map((category, idx) => (
                <div key={idx} className={clsx('col col--4')}>
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
```

**Task 2.4: Style Homepage (30min)**
```css
/* src/pages/index.module.css */
.hero {
  background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
  padding: 4rem 0;
  margin-bottom: 3rem;
  color: white;
  text-align: center;
}

.heroTitle {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.heroSubtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
}

.categoriesSection {
  margin-top: 3rem;
  margin-bottom: 4rem;
}

@media screen and (max-width: 996px) {
  .heroTitle {
    font-size: 2rem;
  }
  
  .heroSubtitle {
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }
  
  .heroTitle {
    font-size: 1.75rem;
  }
  
  .heroSubtitle {
    font-size: 1rem;
  }
}
```

**Deliverables:**
- ✅ CategoryCard component
- ✅ Homepage with 6 category cards
- ✅ Responsive layout
- ✅ Hover effects working

**Testing:**
```bash
npm run start -- --port 3003
# Navigate to http://localhost:3003
# Test:
# 1. All cards render
# 2. Hover effects work
# 3. Links are clickable
# 4. Responsive on mobile (DevTools)
```

---

### Phase 3: Popular Docs Component (1-2 hours)
**Week 1, Day 4**

**Task 3.1: Create PopularDocs Component (1h)**
```typescript
// src/components/PopularDocs/index.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './PopularDocs.module.css';

const popularDocs = [
  {
    icon: '📝',
    title: 'Template PRD - Requisitos de Produto',
    description: 'Estrutura completa para documentar requisitos funcionais e não funcionais',
    url: '/docs/prds/template',
  },
  {
    icon: '🏫',
    title: 'RN001-010 - Gestão de Turmas',
    description: 'Regras de negócio para criação, edição e exclusão de turmas',
    url: '/docs/business-rules/class-management',
  },
  {
    icon: '🎯',
    title: 'Visão de Produto - Estratégia 2025',
    description: 'Roadmap estratégico e objetivos do produto',
    url: '/docs/product/vision',
  },
  {
    icon: '🗄️',
    title: 'PDR-001 - Arquitetura de Dados',
    description: 'Decisão técnica sobre modelagem de banco de dados',
    url: '/docs/pdrs/001-data-architecture',
  },
  {
    icon: '👨‍🏫',
    title: 'Persona: Professor',
    description: 'Contexto, necessidades e jornada do professor',
    url: '/docs/personas/professor',
  },
  {
    icon: '🚀',
    title: 'Guia de Início Rápido',
    description: 'Comece a usar o ambiente em 5 minutos',
    url: '/docs/getting-started',
  },
];

export default function PopularDocs(): JSX.Element {
  return (
    <section className={styles.popularSection}>
      <h2 className={styles.sectionTitle}>
        📈 Documentos Mais Acessados
      </h2>
      <div className="row">
        {popularDocs.map((doc, idx) => (
          <div key={idx} className="col col--6">
            <Link to={doc.url} className={styles.popularCard}>
              <span className={styles.icon}>{doc.icon}</span>
              <div className={styles.content}>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Task 3.2: Style PopularDocs (30min)**
```css
/* src/components/PopularDocs/PopularDocs.module.css */
.popularSection {
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--ifm-color-emphasis-200);
  border-bottom: 1px solid var(--ifm-color-emphasis-200);
}

.sectionTitle {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--ifm-color-primary);
}

.popularCard {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 8px;
  margin-bottom: 1rem;
  background: var(--ifm-background-surface-color);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.popularCard:hover {
  border-color: var(--ifm-color-primary);
  box-shadow: 0 2px 12px rgba(115, 103, 240, 0.15);
  text-decoration: none;
  color: inherit;
}

.icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--ifm-color-primary);
}

.content p {
  margin: 0;
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}

@media screen and (max-width: 768px) {
  .popularCard {
    flex-direction: column;
    text-align: center;
  }
  
  .icon {
    margin: 0 auto;
  }
}
```

**Deliverables:**
- ✅ PopularDocs component
- ✅ 6 popular documents listed
- ✅ Responsive 2-column → 1-column layout
- ✅ Hover effects

**Testing:**
```bash
# Verify PopularDocs renders between hero and category cards
# Test hover states
# Test links navigate correctly
```

---

### Phase 4: Search & Feedback (2-3 hours)
**Week 2, Days 1-2**

**Task 4.1: Configure Search Plugin (30min)**
```typescript
// docusaurus.config.js
module.exports = {
  // ... existing config
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        language: 'pt',
        maxSearchResults: 8,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      items: [
        // ... existing items
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
  },
};
```

**Task 4.2: Customize Search Placeholder (15min)**
```css
/* src/css/custom.css */
.navbar__search-input::placeholder {
  content: 'Pesquisar na documentação... 🔍';
}

.DocSearch-Button-Placeholder {
  font-size: 0.9rem;
}
```

**Task 4.3: Create Feedback Component (1.5h)**
```typescript
// src/theme/DocItem/Footer/index.tsx
import React, { useState, useEffect } from 'react';
import styles from './DocItemFooter.module.css';

export default function DocItemFooter(): JSX.Element {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check if user already voted for this page
    const currentPath = window.location.pathname;
    const existingVote = localStorage.getItem(`feedback_${currentPath}`);
    if (existingVote) {
      setHasVoted(true);
      setFeedback(existingVote === 'true');
    }
  }, []);

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful);
    setHasVoted(true);

    // Save to localStorage
    const currentPath = window.location.pathname;
    localStorage.setItem(`feedback_${currentPath}`, helpful.toString());

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'doc_feedback', {
        event_category: 'Documentation',
        event_label: currentPath,
        helpful: helpful,
        value: helpful ? 1 : 0,
      });
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <h3>Esta página foi útil?</h3>
      <div className={styles.feedbackButtons}>
        <button
          onClick={() => handleFeedback(true)}
          disabled={hasVoted}
          className={styles.thumbsUp}
          aria-label="Sim, esta página foi útil"
        >
          👍 Sim
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={hasVoted}
          className={styles.thumbsDown}
          aria-label="Não, esta página não foi útil"
        >
          👎 Não
        </button>
      </div>
      {hasVoted && (
        <p className={styles.feedbackThanks}>
          {feedback
            ? '✅ Obrigado pelo feedback! 🎉'
            : '📝 Obrigado! Vamos melhorar esta página.'}
        </p>
      )}
    </div>
  );
}
```

**Task 4.4: Style Feedback Component (30min)**
```css
/* src/theme/DocItem/Footer/DocItemFooter.module.css */
.feedbackContainer {
  margin-top: 3rem;
  padding: 2rem;
  border-top: 1px solid var(--ifm-color-emphasis-200);
  text-align: center;
}

.feedbackContainer h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--ifm-color-emphasis-800);
}

.feedbackButtons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.feedbackButtons button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 2px solid var(--ifm-color-emphasis-300);
  border-radius: 8px;
  background: var(--ifm-background-color);
  color: var(--ifm-color-emphasis-800);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.feedbackButtons button:hover:not(:disabled) {
  border-color: var(--ifm-color-primary);
  background: var(--ifm-color-primary-lightest);
  transform: translateY(-2px);
}

.feedbackButtons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.thumbsUp:hover:not(:disabled) {
  border-color: var(--ifm-color-success);
  background: var(--ifm-color-success-lightest);
}

.thumbsDown:hover:not(:disabled) {
  border-color: var(--ifm-color-danger);
  background: var(--ifm-color-danger-lightest);
}

.feedbackThanks {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ifm-color-success);
}

@media screen and (max-width: 768px) {
  .feedbackButtons {
    flex-direction: column;
  }
  
  .feedbackButtons button {
    width: 100%;
  }
}
```

**Deliverables:**
- ✅ Search plugin configured
- ✅ Search placeholder customized
- ✅ Feedback component in all doc pages
- ✅ Analytics tracking working
- ✅ LocalStorage prevents duplicate votes

**Testing:**
```bash
# Test search:
# 1. Type "PRD" → should show template
# 2. Type "RN001" → should show business rules
# 3. Type gibberish → should show "No results"

# Test feedback:
# 1. Click 👍 → should show "Obrigado! 🎉"
# 2. Check localStorage → should have `feedback_/docs/...`
# 3. Reload page → buttons should be disabled
# 4. Open DevTools → verify gtag event in Network tab
```

---

### Phase 5: Footer & Polish (1-2 hours)
**Week 2, Day 3**

**Task 5.1: Configure Footer (30min)**
```typescript
// docusaurus.config.js - themeConfig.footer
footer: {
  style: 'dark',
  links: [
    {
      title: '📚 Documentação',
      items: [
        { label: 'Regras de Negócio', to: '/docs/business-rules' },
        { label: 'Documentação de Produto', to: '/docs/product' },
        { label: 'Jornadas Educacionais', to: '/docs/journeys' },
        { label: 'Personas', to: '/docs/personas' },
      ],
    },
    {
      title: '🤝 Ajuda e Suporte',
      items: [
        {
          label: 'GitHub Discussions',
          href: 'https://github.com/educacross/ambiente-prototipacao-v5/discussions',
        },
        {
          label: 'Reportar Bug',
          href: 'https://github.com/educacross/ambiente-prototipacao-v5/issues/new',
        },
        {
          label: 'FAQ',
          to: '/docs/faq',
        },
        {
          label: 'Glossário',
          to: '/docs/glossary',
        },
      ],
    },
    {
      title: '🔗 Links Úteis',
      items: [
        {
          label: 'Educacross',
          href: 'https://educacross.com.br',
        },
        {
          label: 'Design System Vuexy',
          href: 'https://fabioeducacross.github.io/DesignSystem-Vuexy/',
        },
        {
          label: 'GitHub Repository',
          href: 'https://github.com/educacross/ambiente-prototipacao-v5',
        },
        {
          label: 'Contribuir',
          to: '/docs/contributing',
        },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Educacross. Construído com ❤️ e Docusaurus.`,
},
```

**Task 5.2: Add External Link Icons (30min)**
```typescript
// src/theme/Footer/index.tsx (swizzle component)
import React from 'react';
import Footer from '@theme-original/Footer';

function CustomFooter(props) {
  // Add external link icons after render
  React.useEffect(() => {
    document.querySelectorAll('.footer a[href^="http"]').forEach((link) => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        if (!link.textContent.includes('🔗')) {
          link.innerHTML += ' 🔗';
        }
      }
    });
  }, []);

  return <Footer {...props} />;
}

export default CustomFooter;
```

**Task 5.3: Update Color Palette (30min)**
```css
/* src/css/custom.css */
:root {
  /* Vuexy Base Colors */
  --ifm-color-primary: #7367F0;
  --ifm-color-primary-dark: #5E55D8;
  --ifm-color-primary-darker: #5349CC;
  --ifm-color-primary-darkest: #443DA8;
  --ifm-color-primary-light: #8B81F3;
  --ifm-color-primary-lighter: #9E95F5;
  --ifm-color-primary-lightest: #BCB5F7;

  --ifm-color-success: #28C76F;
  --ifm-color-success-dark: #24B263;
  --ifm-color-success-light: #48D989;

  --ifm-color-warning: #FF9F43;
  --ifm-color-warning-dark: #F58F32;
  --ifm-color-warning-light: #FFAE5F;

  --ifm-color-danger: #EA5455;
  --ifm-color-danger-dark: #E73D3E;
  --ifm-color-danger-light: #EE6C6D;

  --ifm-color-info: #00CFE8;
  --ifm-color-info-dark: #00BACC;
  --ifm-color-info-light: #1AD8ED;

  /* GitHub-Inspired Category Colors */
  --color-intro: #0969DA;
  --color-collab: #8250DF;
  --color-devops: #1A7F37;
  --color-security: #D1242F;
  --color-management: #BF8700;
  --color-dev: #0550AE;

  /* Typography */
  --ifm-font-family-base: 'Inter', system-ui, -apple-system, sans-serif;
  --ifm-font-family-monospace: 'Fira Code', monospace;
  --ifm-heading-font-weight: 600;
  --ifm-font-size-base: 16px;
}

[data-theme='dark'] {
  --ifm-color-primary: #9E95F5;
  --ifm-background-color: #1a1a2e;
  --ifm-background-surface-color: #16213e;
}

/* Ensure touch targets are 44x44px */
.navbar__link,
.navbar__item,
button {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
```

**Deliverables:**
- ✅ Footer with 3 columns
- ✅ External link icons (🔗)
- ✅ Updated color palette
- ✅ Smooth transitions

---

### Phase 6: Testing & Validation (2-3 hours)
**Week 2, Days 4-5**

**Task 6.1: Build Production & Test (1h)**
```bash
cd documentation
npm run build

# Check for errors
# Expected warnings: broken links (OK for now)

# Serve locally
npx http-server ./build -p 3003

# Manual testing checklist:
# [ ] Homepage renders correctly
# [ ] All category cards visible
# [ ] PopularDocs section visible
# [ ] Search works
# [ ] Feedback component on doc pages
# [ ] Footer links work
# [ ] External links open in new tab
# [ ] Responsive on mobile (Chrome DevTools)
```

**Task 6.2: Performance Audit (30min)**
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:3003

# Target scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 90
```

**Task 6.3: Accessibility Testing (30min)**
```bash
# Test with keyboard navigation:
# 1. Tab through all interactive elements
# 2. Enter/Space activates buttons/links
# 3. Esc closes modals (if any)

# Test with screen reader (NVDA on Windows):
# 1. Install NVDA (free)
# 2. Navigate through homepage
# 3. Verify announcements make sense
```

**Task 6.4: Cross-Browser Testing (30min)**
```
# Test in:
# [ ] Chrome (latest)
# [ ] Firefox (latest)
# [ ] Edge (latest)
# [ ] Safari (if available)

# Check:
# [ ] Layout consistent
# [ ] Colors render correctly
# [ ] Hover effects work
# [ ] Search functions
```

**Task 6.5: Fix Issues & Iterate (30min)**
```bash
# Address any issues found in testing
# Common fixes:
# - Contrast issues in dark mode
# - Mobile layout breaks
# - Search index incomplete
# - Missing ARIA labels
```

**Deliverables:**
- ✅ Production build successful
- ✅ Lighthouse score > 90
- ✅ Accessibility WCAG AA compliant
- ✅ Cross-browser compatible
- ✅ All bugs fixed

---

### Phase 7: Documentation & Deployment (1-2 hours)
**Week 2, Day 5**

**Task 7.1: Create Design System Doc (30min)**
```bash
# Already planned - create at:
# documentation/docs/meta/design-system.md
```

**Task 7.2: Update README (15min)**
```markdown
<!-- documentation/README.md -->
# Documentação Educacross - Ambiente de Prototipação V5

## 🚀 Quick Start

```bash
npm install
npm run start -- --port 3003
```

Visit: http://localhost:3003

## 🎨 Features

- ✅ GitHub-inspired homepage with category cards
- ✅ "Popular Docs" section for quick access
- ✅ Full-text search (Portuguese)
- ✅ User feedback system (👍 👎)
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Google Analytics integration

## 📦 Tech Stack

- Docusaurus 3.9.2
- React 18
- TypeScript
- @cmfcmf/docusaurus-search-local

## 🧪 Testing

```bash
npm run build  # Production build
npm run test   # Unit tests (TODO)
```

## 📊 Analytics

Feedback and usage metrics tracked via Google Analytics 4.

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)
```

**Task 7.3: Commit Changes (15min)**
```bash
git add .
git status  # Review changes
git commit -m "feat: implement GitHub-inspired UX improvements

- Add homepage with 6 category cards
- Create PopularDocs section with 6 key documents
- Integrate search plugin with Portuguese support
- Add user feedback component (thumbs up/down) to all doc pages
- Configure footer with help & support links
- Implement responsive design (mobile-first)
- Add Vuexy + GitHub-inspired color palette
- External links open in new tab with 🔗 icon
- Google Analytics tracking for feedback events

Deliverables:
- CategoryCard component (src/components/CategoryCard/)
- PopularDocs component (src/components/PopularDocs/)
- DocItemFooter component (src/theme/DocItem/Footer/)
- Custom homepage (src/pages/index.tsx)
- Updated color palette (src/css/custom.css)
- Search configuration (docusaurus.config.js)
- Footer configuration (docusaurus.config.js)

Testing:
- [x] Production build successful
- [x] Lighthouse Performance > 90
- [x] WCAG AA accessibility
- [x] Cross-browser compatibility
- [x] Mobile responsive

Closes #FEATURE-001"
```

**Task 7.4: Push & Create PR (15min)**
```bash
git push origin feature/github-inspired-ux

# Create PR on GitHub with description:
# - Link to FEATURE-001 spec
# - Screenshots (before/after)
# - Testing checklist
# - Lighthouse scores
# - Request review from team
```

**Deliverables:**
- ✅ README updated
- ✅ Design system documented
- ✅ Changes committed
- ✅ PR created

---

## 🎯 Phase Summary

### Phase 0: Preparation ✅
- Duration: 30 min
- Status: COMPLETED
- Deliverables: Research, screenshots, spec document

### Phase 1: Foundation
- Duration: 2-3 hours
- Effort: LOW
- Risk: LOW
- Dependencies: None

### Phase 2: Homepage Implementation
- Duration: 4-5 hours
- Effort: MEDIUM
- Risk: LOW
- Dependencies: Phase 1

### Phase 3: Popular Docs
- Duration: 1-2 hours
- Effort: LOW
- Risk: LOW
- Dependencies: Phase 1

### Phase 4: Search & Feedback
- Duration: 2-3 hours
- Effort: MEDIUM
- Risk: MEDIUM (analytics config)
- Dependencies: Phase 1

### Phase 5: Footer & Polish
- Duration: 1-2 hours
- Effort: LOW
- Risk: LOW
- Dependencies: None

### Phase 6: Testing & Validation
- Duration: 2-3 hours
- Effort: MEDIUM
- Risk: MEDIUM (performance tuning)
- Dependencies: Phases 1-5

### Phase 7: Documentation & Deployment
- Duration: 1-2 hours
- Effort: LOW
- Risk: LOW
- Dependencies: Phase 6

**Total Estimated Time: 14-19 hours**  
**Timeline: 2 weeks (part-time)**  
**Recommended Team: 1-2 developers**

---

## 📊 Milestones & Checkpoints

### Milestone 1: Foundation Complete
**Date**: Week 1, Day 2  
**Criteria:**
- [ ] Directory structure created
- [ ] Dependencies installed
- [ ] Config files updated
- [ ] Build compiles without errors

**Gate:** Team review of structure and config

---

### Milestone 2: Homepage MVP
**Date**: Week 1, Day 4  
**Criteria:**
- [ ] CategoryCard component functional
- [ ] PopularDocs component functional
- [ ] Homepage renders correctly
- [ ] Responsive layout working

**Gate:** Stakeholder demo of homepage

---

### Milestone 3: Feature Complete
**Date**: Week 2, Day 3  
**Criteria:**
- [ ] Search plugin working
- [ ] Feedback component integrated
- [ ] Footer configured
- [ ] All components polished

**Gate:** Internal QA testing

---

### Milestone 4: Production Ready
**Date**: Week 2, Day 5  
**Criteria:**
- [ ] All tests passing
- [ ] Lighthouse score > 90
- [ ] Accessibility WCAG AA
- [ ] Cross-browser validated
- [ ] Documentation complete

**Gate:** Final approval for deployment

---

## 🚧 Risks & Mitigation

### Risk 1: Search Plugin Performance Issues
**Likelihood**: MEDIUM  
**Impact**: HIGH  
**Mitigation:**
- Test with full documentation set early
- Implement index size limits (<500 pages)
- Consider Algolia migration if slow

**Contingency:**
- Use Docusaurus default search temporarily
- Optimize indexing (exclude certain files)

---

### Risk 2: Feedback Component Increases Page Load Time
**Likelihood**: LOW  
**Impact**: MEDIUM  
**Mitigation:**
- Lazy load component (React.lazy)
- Use code splitting
- Analytics beacon API (non-blocking)

**Contingency:**
- Remove component if performance < 85
- Implement server-side alternative

---

### Risk 3: Homepage Customization Breaks Docusaurus Updates
**Likelihood**: MEDIUM  
**Impact**: MEDIUM  
**Mitigation:**
- Minimize swizzling (only override what's needed)
- Document all customizations
- Test updates in staging first

**Contingency:**
- Maintain default homepage as fallback
- Version lock Docusaurus until compatible

---

### Risk 4: Google Analytics GDPR/LGPD Compliance
**Likelihood**: MEDIUM  
**Impact**: HIGH  
**Mitigation:**
- Anonymize IP addresses
- Implement cookie consent banner
- Provide opt-out mechanism
- Document data collection practices

**Contingency:**
- Disable analytics until compliance verified
- Use privacy-friendly alternative (Plausible, Fathom)

---

## 📈 Success Criteria

### Phase 0-3: Development Success
- [ ] All components render correctly
- [ ] No console errors in browser
- [ ] Build completes without errors
- [ ] Search returns relevant results
- [ ] Feedback tracking works

### Phase 6: Quality Gates
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Manual testing checklist 100% complete
- [ ] Cross-browser testing passed

### Post-Launch: Business Success
**Measure after 2 weeks:**
- [ ] Bounce rate homepage < 20% (GA4)
- [ ] Pages per session > 3.5 (GA4)
- [ ] Search usage rate > 40% (GA4)
- [ ] Positive feedback > 80% (feedback component)
- [ ] Time to find document < 30 seconds (user testing)

---

## 🔄 Maintenance & Iteration

### Weekly
- Review feedback metrics (👍 👎 ratios)
- Check search analytics (top queries)
- Monitor Lighthouse scores in CI

### Monthly
- Update popular docs based on GA data
- Review and fix broken links
- Add new categories if content grows
- A/B test card descriptions

### Quarterly
- User testing sessions (5-10 users)
- Stakeholder review of homepage
- Competitive analysis (check GitHub Docs updates)
- Performance optimization pass

---

## 📚 References & Resources

### Documentation
- [Docusaurus Official Docs](https://docusaurus.io/docs)
- [GitHub Docs Analysis](../github-docs-homepage.png)
- [Vuexy Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Best Practices
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Web Vitals](https://web.dev/vitals/)
- [React Patterns](https://reactpatterns.com/)

---

## ✅ Definition of Done

A task is complete when:
- [ ] Code is written and tested locally
- [ ] Component renders correctly in dev mode
- [ ] Responsive design validated (mobile/tablet/desktop)
- [ ] Accessibility checked (keyboard nav, screen reader)
- [ ] Performance acceptable (no console errors, smooth interactions)
- [ ] Code reviewed by peer (if team > 1)
- [ ] Committed with descriptive message
- [ ] Documentation updated (inline comments, README)

A phase is complete when:
- [ ] All tasks in phase are done
- [ ] Phase deliverables produced
- [ ] Gate criteria met
- [ ] Stakeholder approval (if required)
- [ ] Changes merged to feature branch

The feature is complete when:
- [ ] All phases complete
- [ ] Production build successful
- [ ] All success criteria met
- [ ] PR approved and merged
- [ ] Deployed to staging/production
- [ ] Post-launch monitoring in place

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-06  
**Author:** GitHub Copilot + Educacross Team  
**Status:** READY FOR IMPLEMENTATION
