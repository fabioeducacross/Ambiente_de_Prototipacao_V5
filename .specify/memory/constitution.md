# Project Constitution - Ambiente de Prototipação V5

**Version:** 1.0  
**Last Updated:** 2026-02-06  
**Status:** ACTIVE

---

## 🎯 Project Vision

Criar um ambiente de documentação técnica e de produto de **classe mundial** para o ecossistema Educacross, que sirva como **single source of truth** para regras de negócio, decisões de produto, jornadas educacionais e conhecimento técnico.

**Inspiração:** GitHub Docs, Stripe Docs, Vercel Docs  
**Diferencial:** Foco em contexto educacional com múltiplas personas (professores, alunos, gestores, desenvolvedores)

---

## 📜 Core Principles

### 1. User-Centric Design
**Princípio:** O usuário sempre vem primeiro. Design decisions são validadas com usuários reais.

**Manifestação:**
- Personas documentadas (Professor, Aluno, Gestor, Coordenador, Desenvolvedor)
- User testing antes de releases grandes
- Feedback loops (👍 👎) em todas as páginas
- Analytics para entender padrões de uso

**Proibido:**
- ❌ Assumir que sabemos o que o usuário quer sem validar
- ❌ Ignorar feedback negativo
- ❌ Otimizar para beleza em detrimento de usabilidade

---

### 2. Accessibility First
**Princípio:** Documentação deve ser acessível a TODOS, independente de habilidades ou tecnologias assistivas.

**Manifestação:**
- WCAG 2.1 Level AA compliance (mínimo)
- Contraste mínimo 4.5:1 em textos
- Navegação por teclado completa
- ARIA labels em elementos interativos
- Screen reader friendly
- Touch targets ≥ 44x44px (mobile)

**Validação:**
- Lighthouse Accessibility > 95
- Teste com NVDA/JAWS/VoiceOver
- Axe DevTools sem violações críticas

**Proibido:**
- ❌ Ícones sem texto alternativo
- ❌ Cores como única forma de comunicar informação
- ❌ Elementos interativos sem feedback visual de foco

---

### 3. Performance is a Feature
**Princípio:** Documentação lenta é documentação que não é usada. Performance é prioridade.

**Manifestação:**
- Lighthouse Performance > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Bundle size < 300KB (gzipped)
- Lazy loading em componentes pesados
- Code splitting por rota
- Imagens otimizadas (WebP + fallback)

**Validação:**
- CI/CD com Lighthouse checks
- Performance budget enforcement
- Real User Monitoring (RUM) em produção

**Proibido:**
- ❌ Bibliotecas pesadas sem justificativa (> 50KB)
- ❌ Imagens não otimizadas
- ❌ Bundle único sem code splitting
- ❌ Blocking scripts no <head>

---

### 4. Content Quality Over Quantity
**Princípio:** Melhor ter 10 páginas excelentes do que 100 páginas medianas.

**Manifestação:**
- Revisão por pares obrigatória
- Templates para consistência (PRD, PDR, Jornadas)
- Exemplos práticos em toda documentação técnica
- Escrita clara, concisa, objetiva (style guide)
- Versionamento de documentos importantes

**Proibido:**
- ❌ Documentação outdated (> 6 meses sem revisão)
- ❌ Placeholders "TODO" em produção
- ❌ Copiar-colar sem adaptar contexto
- ❌ Jargão sem definição (glossário obrigatório)

---

### 5. Single Source of Truth
**Princípio:** Cada informação tem UMA localização canônica. Evitar duplicação a todo custo.

**Manifestação:**
- Linking cross-document em vez de duplicar
- Componentes reutilizáveis (não copiar código)
- Glossário centralizado para termos técnicos
- PRDs e PDRs versionados no mesmo repo
- Git como sistema de controle de versão

**Proibido:**
- ❌ Manter docs em múltiplos lugares (Notion + Confluence + Docs)
- ❌ Copiar conteúdo entre páginas
- ❌ Definições duplicadas de termos

---

### 6. Transparent Decision Making
**Princípio:** Decisões técnicas e de produto devem ser documentadas e rastreáveis.

**Manifestação:**
- PDRs (Product Decision Records) para todas as decisões arquiteturais
- Context, Decision, Consequences sempre documentados
- Alternativas consideradas explicitadas
- Rationale claro e objetivo
- Versionamento de decisões (imutabilidade)

**Proibido:**
- ❌ Decisões em Slack/WhatsApp sem documentação
- ❌ "Porque eu decidi" sem contexto
- ❌ Reescrever histórico de decisões

---

### 7. Progressive Disclosure
**Princípio:** Mostrar informação na hora certa, na quantidade certa. Não sobrecarregar o usuário.

**Manifestação:**
- Homepage com categorias de alto nível
- Documentos com sumário executivo + detalhes
- Acordeões/tabs para conteúdo opcional
- "Leia mais" links em vez de parede de texto
- Glossário com tooltips inline

**Proibido:**
- ❌ Páginas com > 10.000 palavras sem estrutura
- ❌ Forçar usuário a ler tudo para encontrar uma info
- ❌ Hierarquia plana (tudo no mesmo nível)

---

### 8. Mobile-First, Responsive Always
**Princípio:** 40-60% dos usuários acessam docs no celular. Mobile é a prioridade.

**Manifestação:**
- CSS mobile-first
- Breakpoints: 320px, 768px, 996px, 1200px
- Touch-friendly (44x44px targets)
- Hamburger menu no mobile
- Scroll hijacking proibido

**Validação:**
- Teste em dispositivos reais (iOS, Android)
- Chrome DevTools responsive mode
- Lighthouse mobile score > 90

**Proibido:**
- ❌ Desktop-only designs
- ❌ Hover-only interactions (sem alternativa touch)
- ❌ Fixed width layouts
- ❌ Small text (< 16px base)

---

### 9. Security & Privacy
**Princípio:** Proteger dados do usuário e garantir segurança da plataforma.

**Manifestação:**
- HTTPS obrigatório
- Content Security Policy (CSP)
- `rel="noopener noreferrer"` em links externos
- Nenhum dado sensível em analytics
- Cookie consent (LGPD/GDPR)
- Anonymize IP no Google Analytics

**Proibido:**
- ❌ HTTP em produção
- ❌ Injeção de scripts de terceiros não auditados
- ❌ Tracking sem consentimento
- ❌ Dados pessoais em logs públicos

---

### 10. Continuous Improvement
**Princípio:** Documentação é um produto vivo. Iteração contínua baseada em dados.

**Manifestação:**
- Analytics tracking (pageviews, time on page, search queries)
- Feedback component (👍 👎) em todas as páginas
- Revisão trimestral de docs mais acessados
- A/B testing para mudanças grandes
- Changelog público de updates

**Proibido:**
- ❌ "Set and forget" mentality
- ❌ Ignorar métricas de insatisfação
- ❌ Resistir a mudanças baseadas em dados

---

## 🚫 Anti-Patterns (Proibido)

### 1. Over-Engineering
**Não fazer:**
- Componentes genéricos demais (YAGNI - You Aren't Gonna Need It)
- Abstração prematura
- Tecnologias hype sem justificativa

### 2. Inconsistência Visual
**Não fazer:**
- Estilos inline em vez de CSS classes
- Cores hardcoded (usar CSS variables)
- Fontes/tamanhos inconsistentes

### 3. Broken Links
**Não fazer:**
- Links para páginas que não existem
- URLs hardcoded (usar componentes Link do Docusaurus)
- Ignorar warnings de broken links no build

### 4. Documentação Auto-Gerada Sem Revisão
**Não fazer:**
- Publicar JSDoc auto-generated sem contexto humano
- README gerado por IA sem validação
- Code comments como documentação de produto

### 5. Emoji Abuse
**Não fazer:**
- Emojis em excesso (max 1-2 por parágrafo)
- Emojis sem significado claro
- Depender de emoji para transmitir informação crítica

---

## ✅ Quality Gates

### Pre-Commit
- [ ] ESLint passa
- [ ] Prettier formatado
- [ ] TypeScript compila sem erros
- [ ] Spell check (cSpell)

### Pre-Merge (PR)
- [ ] Revisão por pelo menos 1 pessoa
- [ ] Build de produção bem-sucedido
- [ ] Lighthouse CI passa (Performance > 90, Accessibility > 95)
- [ ] Screenshots de mudanças visuais anexados
- [ ] Changelog atualizado

### Pre-Deploy
- [ ] Smoke tests passam (manual ou automatizado)
- [ ] Links quebrados < 5 (apenas para docs futuros)
- [ ] Performance regression < 5% vs. baseline
- [ ] Approval de stakeholder (para mudanças grandes)

---

## 🎨 Design System

### Paleta de Cores (Vuexy Base)
```css
--ifm-color-primary: #7367F0;      /* Roxo */
--ifm-color-success: #28C76F;      /* Verde */
--ifm-color-warning: #FF9F43;      /* Laranja */
--ifm-color-danger: #EA5455;       /* Vermelho */
--ifm-color-info: #00CFE8;         /* Ciano */
```

### Tipografia
- **Fonte Base:** Inter, system-ui, sans-serif
- **Fonte Código:** Fira Code, monospace
- **Tamanhos:** Base 16px, H1 2.5rem, H2 2rem, H3 1.5rem

### Espaçamento (8px Grid)
- **Pequeno:** 8px
- **Médio:** 16px
- **Grande:** 24px
- **XL:** 32px

### Componentes Obrigatórios
- `CategoryCard` - Cards da homepage
- `PopularDocs` - Seção de documentos populares
- `DocItemFooter` - Feedback component (👍 👎)
- `MaterialIcon` - Ícones SVG inline

---

## 🧪 Testing Strategy

### Pirâmide de Testes
```
      /\
     /  \    E2E (Playwright)
    /    \   - Critical user flows
   /------\  
  /        \ Integration
 /          \ - Component interactions
/------------\
|            | Unit (Jest + RTL)
|            | - Component logic
|            | - Utilities
--------------
```

### Coverage Requirements
- **Unit Tests:** > 70% coverage
- **Integration Tests:** Critical paths (homepage, search, navigation)
- **E2E Tests:** Happy paths + 1 error scenario

### Manual Testing
- Cross-browser (Chrome, Firefox, Edge, Safari)
- Mobile devices (iOS Safari, Chrome Android)
- Screen readers (NVDA on Windows, VoiceOver on Mac)
- Keyboard navigation (Tab, Enter, Esc)

---

## 📊 Metrics & KPIs

### Development Metrics
- **Build Time:** < 30 segundos
- **Hot Reload:** < 3 segundos
- **Lighthouse Performance:** > 90
- **Lighthouse Accessibility:** > 95
- **Bundle Size:** < 300KB (gzipped)

### User Metrics (Post-Launch)
- **Bounce Rate Homepage:** < 20%
- **Pages per Session:** > 3.5
- **Search Usage Rate:** > 40%
- **Positive Feedback:** > 80% (👍 vs. 👎)
- **Time to Find Document:** < 30 segundos (user testing)

### Business Metrics
- **Support Tickets Reduction:** 20% em 3 meses
- **Onboarding Time:** 40% faster para novos membros
- **Doc Adoption:** 80% do time usa docs semanalmente

---

## 🔄 Change Management

### Pequenas Mudanças (< 1 dia de trabalho)
- Pode ir direto para `main` com revisão de 1 pessoa
- Exemplos: Fix de typo, link quebrado, ajuste de cor

### Mudanças Médias (1-3 dias)
- Feature branch → PR → Review → Merge
- Exemplos: Novo componente, nova página, refactor

### Mudanças Grandes (> 3 dias)
- Feature spec (FEATURE-XXX.md)
- Implementation plan (IMPL-XXX.md)
- Stakeholder review antes de iniciar
- Demo mid-implementation
- Exemplos: Homepage redesign, search system, new section

---

## 🎓 Learning & Onboarding

### Novo Membro - Checklist
- [ ] Ler esta constituição
- [ ] Configurar ambiente (README.md)
- [ ] Revisar design system
- [ ] Estudar 3 docs existentes (PRD, RN, Persona)
- [ ] Fazer primeiro PR (small fix)
- [ ] Participar de review de PR
- [ ] Criar primeira feature (com mentoria)

### Recursos de Aprendizado
- Docusaurus Official Docs: https://docusaurus.io/docs
- Vuexy Design System: https://fabioeducacross.github.io/DesignSystem-Vuexy/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- GitHub Docs (inspiração): https://docs.github.com/pt

---

## 📝 Amendment Process

Esta constituição é um documento vivo. Para propor mudanças:

1. **Criar Issue**: "Constitution Amendment: [título]"
2. **Discussão**: Mínimo 3 dias para feedback do time
3. **PR**: Proposta de mudança no documento
4. **Approval**: Maioria do time (> 50%) + 1 tech lead
5. **Merge**: Atualizar versão (1.0 → 1.1)
6. **Comunicação**: Anunciar mudança para todo o time

**Versionamento:**
- Major (1.0 → 2.0): Mudança de princípios core
- Minor (1.0 → 1.1): Adição de novos princípios
- Patch (1.1 → 1.1.1): Clarificações, exemplos

---

## 🤝 Code of Conduct

### Revisão de Código
- **Seja gentil**: Critique o código, não a pessoa
- **Seja construtivo**: Sugira alternativas, não só aponte problemas
- **Seja claro**: Explique o "porquê", não só o "o quê"
- **Seja ágil**: Responda PRs em < 24h

### Comunicação
- **Documentação > Reunião**: Prefira assíncrono
- **GitHub > Slack**: Discussões técnicas no repo (issues, PRs)
- **Transparência**: Decisões públicas, não DM
- **Inclusão**: Considere diferentes timezones e estilos de trabalho

---

## 🎯 Success Definition

Este projeto é bem-sucedido quando:

1. **Desenvolvedores** encontram templates e padrões facilmente
2. **Product Owners** acessam PRDs e roadmap sem fricção
3. **Professores** entendem regras de negócio rapidamente
4. **Novos membros** fazem onboarding em < 1 semana
5. **Support** reduz tickets de "onde está X?" em 50%
6. **Time** contribui ativamente (> 5 PRs/mês)
7. **Usuários** reportam satisfação > 80% (feedback 👍 👎)
8. **Métricas** mostram engajamento crescente mês a mês

---

**Assinaturas (Simbólicas):**
- 🤖 GitHub Copilot (AI Assistant) - 2026-02-06
- 👤 [Nome do Tech Lead] - [Data]
- 👤 [Nome do Product Owner] - [Data]

**Status:** ✅ ATIVO  
**Revisão Próxima:** 2026-05-06 (3 meses)
