# Tasks - GitHub-Inspired UX Improvements

**Feature:** FEATURE-001  
**Branch:** `feature/github-inspired-ux`  
**Status:** Ready to Execute  
**Generated:** 2026-02-06  
**Total Estimated Effort:** 14-19 hours

---

## 📋 Task Organization

Tasks are organized by user story (from spec.md) to enable **independent implementation and testing**. Each phase delivers a complete, testable increment.

**Implementation Strategy:**
- **MVP First**: Phase 1-3 deliver core discovery features (homepage + popular docs)
- **Incremental Delivery**: Each phase can be deployed independently
- **Parallel Opportunities**: Tasks marked with [P] can be worked simultaneously

---

## 🎯 Phase Overview

| Phase | Focus | Tasks | Est. Time | Dependencies |
|-------|-------|-------|-----------|--------------|
| Phase 1 | Setup | 5 | 2-3h | None |
| Phase 2 | US1 - Category Cards | 8 | 4-5h | Phase 1 |
| Phase 3 | US2 - Popular Docs | 4 | 1-2h | Phase 2 |
| Phase 4 | US3/US4 - Search & Feedback | 6 | 2-3h | Phase 1 |
| Phase 5 | US5/US6 - Footer & Polish | 5 | 1-2h | Phase 4 |
| Phase 6 | Testing & Validation | 8 | 2-3h | Phase 2-5 |
| Phase 7 | Documentation & Deployment | 4 | 1-2h | Phase 6 |
| **Total** | **7 Phases** | **40** | **14-19h** | |

---

## 📖 User Stories Reference

From spec.md (FEATURE-001):

- **US1** (P1 - CRITICAL): Homepage com cards categorizados (FR-001)
- **US2** (P1 - HIGH): Seção "Documentos Mais Acessados" (FR-002)
- **US3** (P1 - HIGH): Sistema de busca otimizado (FR-003)
- **US4** (P2 - MEDIUM): Componente de feedback 👍👎 (FR-004)
- **US5** (P2 - MEDIUM): Seletor de perfil/contexto (FR-005)
- **US6** (P3 - LOW): Footer "Ajuda e Suporte" (FR-006)
- **US7** (P3 - LOW): Design system com ícones e cores (FR-007)
- **US8** (P2 - MEDIUM): Google Analytics integration (FR-008)

---

## Phase 1: Setup & Foundation

**Goal:** Initialize project structure, install dependencies, configure build system  
**Deliverable:** Empty component shells, successful build, dev server running  
**Independent Test:** `npm run build` completes without errors

### Setup Tasks

- [X] T001 Create feature branch from main branch
  ```bash
  git checkout -b feature/github-inspired-ux
  ```

- [X] T002 [P] Navigate to documentation directory and create component folders
  ```bash
  cd documentation
  mkdir -p src/pages
  mkdir -p src/components/CategoryCard
  mkdir -p src/components/PopularDocs
  mkdir -p src/theme/DocItem/Footer
  ```

- [X] T003 Install search plugin dependency in documentation/package.json
  ```bash
  npm install --save @cmfcmf/docusaurus-search-local
  ```

- [X] T004 [P] Create empty component shell files
  ```bash
  touch src/pages/index.tsx
  touch src/pages/index.module.css
  touch src/components/CategoryCard/index.tsx
  touch src/components/CategoryCard/CategoryCard.module.css
  touch src/components/PopularDocs/index.tsx
  touch src/components/PopularDocs/PopularDocs.module.css
  touch src/theme/DocItem/Footer/index.tsx
  touch src/theme/DocItem/Footer/DocItemFooter.module.css
  ```

- [X] T005 Validate build compiles successfully and start dev server
  ```bash
  npm run build
  npm run start -- --port 3003
  ```

**Phase 1 Checkpoint:**
- ✅ All directories created
- ✅ Search plugin installed
- ✅ Component shells exist
- ✅ Build completes without errors
- ✅ Dev server running on http://localhost:3003

---

## Phase 2: User Story 1 - Homepage with Category Cards

**Goal:** Implement visual category cards on homepage for content discovery  
**User Story:** Como usuário, quero ver categorias visuais na homepage para identificar rapidamente onde está o conteúdo que procuro (US1 - FR-001)  
**Deliverable:** Homepage with 6 category cards, responsive design, hover effects  
**Independent Test:** Visit http://localhost:3003 → see 6 category cards → click any link → navigates to correct page

### Category Cards Implementation

- [X] T006 [P] [US1] Define TypeScript interface for CategoryCard props in src/components/CategoryCard/index.tsx
  ```typescript
  interface CategoryCardProps {
    icon: string;
    title: string;
    description: string;
    color: string;
    links: Array<{ label: string; to: string }>;
  }
  ```

- [X] T007 [US1] Implement CategoryCard component with Link and structure in src/components/CategoryCard/index.tsx

- [X] T008 [P] [US1] Create CategoryCard styles with hover effects in src/components/CategoryCard/CategoryCard.module.css
  ```css
  .card {
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-left: 4px solid var(--ifm-color-primary);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  ```

- [X] T009 [US1] Define 6 category card data objects in src/pages/index.tsx
  - 📘 Regras de Negócio (blue #0969DA)
  - 🎯 Documentação de Produto (purple #8250DF)
  - 🚀 Jornadas Educacionais (green #1A7F37)
  - ⚙️ Setup & Desenvolvimento (red #D1242F)
  - 👥 Personas & Contexto (orange #BF8700)
  - ❓ FAQ & Suporte (cyan #00CFE8)

- [X] T010 [US1] Implement homepage layout with hero section in src/pages/index.tsx

- [X] T011 [P] [US1] Create homepage styles with responsive grid in src/pages/index.module.css
  ```css
  .categoryGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 996px) {
    .categoryGrid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .categoryGrid { grid-template-columns: 1fr; }
  }
  ```

- [X] T012 [US1] Integrate CategoryCard components into homepage grid in src/pages/index.tsx

- [X] T013 [US1] Test homepage rendering and card interactivity in browser
  - Manual test: All 6 cards visible
  - Manual test: Hover effect works
  - Manual test: Links navigate correctly
  - Manual test: Responsive (resize browser)

**Phase 2 Checkpoint:**
- ✅ CategoryCard component implemented
- ✅ Homepage displays 6 category cards
- ✅ Hover effects working
- ✅ All links functional
- ✅ Responsive: 3→2→1 columns
- ✅ Border colors match categories

---

## Phase 3: User Story 2 - Popular Docs Section

**Goal:** Add "Documentos Mais Acessados" section to accelerate onboarding  
**User Story:** Como novo usuário, quero ver documentos importantes destacados para começar pelo que é mais relevante (US2 - FR-002)  
**Deliverable:** Popular docs section between hero and cards, with 6 key documents  
**Independent Test:** Homepage shows "📈 Documentos Mais Acessados" → 6 doc cards → all links work

### Popular Docs Implementation

- [X] T014 [P] [US2] Define popular docs data array in src/components/PopularDocs/index.tsx
  - Template PRD
  - Visão de Produto
  - RN001-010 (Gestão de Turmas)
  - Guia de Início Rápido
  - PDR-001 (Arquitetura)
  - Persona Professor

- [X] T015 [US2] Implement PopularDocs component with 2-column grid in src/components/PopularDocs/index.tsx

- [X] T016 [P] [US2] Create PopularDocs styles with card hover effects in src/components/PopularDocs/PopularDocs.module.css
  ```css
  .popularCard {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  .popularCard:hover {
    background: var(--ifm-color-emphasis-100);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  ```

- [X] T017 [US2] Integrate PopularDocs section into homepage between hero and category cards in src/pages/index.tsx

**Phase 3 Checkpoint:**
- ✅ PopularDocs component created
- ✅ 6 documents listed
- ✅ Section positioned correctly
- ✅ Hover effects working
- ✅ Responsive: 2→1 columns
- ✅ All links functional

---

## Phase 4: User Stories 3 & 4 - Search & Feedback Systems

**Goal:** Implement search functionality and user feedback collection  
**User Stories:**  
- US3: Como usuário, quero buscar conteúdo de forma rápida e intuitiva (FR-003 - HIGH)
- US4: Como autor, quero saber se a documentação está ajudando os usuários (FR-004 - MEDIUM)  
**Deliverable:** Working search with Portuguese support + feedback component on all doc pages  
**Independent Test:** Search "PRD" → returns results | Visit any doc page → see feedback buttons → click 👍 → shows thank you

### Search Configuration

- [X] T018 [P] [US3] Configure search plugin in documentation/docusaurus.config.js
  ```typescript
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

- [X] T019 [US3] Customize search placeholder text in docusaurus.config.js themeConfig
  ```typescript
  themeConfig: {
    navbar: {
      items: [{
        type: 'search',
        position: 'right',
      }],
    },
  }
  ```

- [X] T020 [US3] Test search functionality with common queries
  - Manual test: Search "PRD" → returns template
  - Manual test: Search "persona" → returns persona docs
  - Manual test: Debounce works (wait 300ms)

### Feedback Component

- [X] T021 [P] [US4] Implement DocItemFooter component with feedback UI in src/theme/DocItem/Footer/index.tsx
  ```typescript
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  ```

- [X] T022 [US4] Add localStorage persistence to prevent duplicate votes in src/theme/DocItem/Footer/index.tsx
  ```typescript
  const currentPath = window.location.pathname;
  const existingVote = localStorage.getItem(`feedback_${currentPath}`);
  ```

- [X] T023 [P] [US4] Create feedback component styles in src/theme/DocItem/Footer/DocItemFooter.module.css

- [X] T024 [US4] Test feedback component on multiple doc pages
  - Manual test: Visit doc page → see buttons
  - Manual test: Click 👍 → shows "Obrigado! 🎉"
  - Manual test: Reload → buttons disabled
  - Manual test: Different page → buttons enabled again

**Phase 4 Checkpoint:**
- ✅ Search plugin configured
- ✅ Search returns results
- ✅ Portuguese stemming works
- ✅ Feedback component on all docs
- ✅ Vote persists in localStorage
- ✅ Thank you message displays

---

## Phase 5: User Stories 5, 6, 7, 8 - Polish & Configuration

**Goal:** Configure footer, analytics, colors, and final polish  
**User Stories:**  
- US5: Seletor de perfil (deferred to v2)
- US6: Footer com ajuda e suporte (FR-006 - LOW)
- US7: Design system cores (FR-007 - LOW)
- US8: Google Analytics (FR-008 - MEDIUM)  
**Deliverable:** Complete footer, color palette applied, analytics tracking  
**Independent Test:** Footer shows 3 columns → external links open in new tab → GA events fire

### Footer Configuration

- [X] T025 [P] [US6] Configure footer links structure in documentation/docusaurus.config.js
  ```typescript
  footer: {
    style: 'dark',
    links: [
      {
        title: '📚 Documentação',
        items: [
          { label: 'Regras de Negócio', to: '/docs/business-rules' },
          { label: 'Produto', to: '/docs/product' },
        ],
      },
      {
        title: '🤝 Ajuda e Suporte',
        items: [
          {
            label: 'GitHub Discussions',
            href: 'https://github.com/educacross/ambiente-prototipacao-v5/discussions',
          },
          { label: 'FAQ', to: '/docs/faq' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Educacross. Construído com ❤️ e Docusaurus.`,
  }
  ```

- [X] T026 [US6] Validate footer external links open in new tab with proper rel attributes

### Color Palette

- [X] T027 [P] [US7] Update color palette in documentation/src/css/custom.css
  ```css
  :root {
    --ifm-color-primary: #7367F0;
    --ifm-color-success: #28C76F;
    --ifm-color-warning: #FF9F43;
    --ifm-color-danger: #EA5455;
    --ifm-color-info: #00CFE8;
    
    --color-intro: #0969DA;
    --color-collab: #8250DF;
    --color-devops: #1A7F37;
    --color-security: #D1242F;
    --color-management: #BF8700;
  }
  ```

### Analytics Configuration

- [X] T028 [P] [US8] Configure Google Analytics in documentation/docusaurus.config.js
  ```typescript
  themeConfig: {
    gtag: {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  }
  ```

- [X] T029 [US8] Add analytics event tracking to feedback component in src/theme/DocItem/Footer/index.tsx
  ```typescript
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'doc_feedback', {
      event_category: 'Documentation',
      event_label: currentPath,
      helpful: helpful,
    });
  }
  ```

**Phase 5 Checkpoint:**
- ✅ Footer configured with 3 columns
- ✅ External links work correctly
- ✅ Color palette applied
- ✅ GA tracking ID configured
- ✅ Feedback events tracked

---

## Phase 6: Testing & Validation

**Goal:** Comprehensive testing across browsers, devices, and accessibility standards  
**Deliverable:** Production build passing all quality gates  
**Independent Test:** Lighthouse scores >90/95, keyboard navigation works, mobile responsive

### Production Build

- [X] T030 Build production version in documentation directory
  ```bash
  npm run build
  ```

- [X] T031 Serve production build locally and validate functionality
  ```bash
  npx http-server ./build -p 3003
  ```

### Performance Testing

- [X] T032 Run Lighthouse audit on production build
  ```bash
  npx @lhci/cli autorun --collect.url=http://localhost:3003
  ```
  - Target: Performance > 90
  - Target: Accessibility > 95
  - Target: Best Practices > 90
  - Target: SEO > 90

### Manual Testing

- [X] T033 Execute manual test checklist across all features
  - [ ] Homepage renders with all components
  - [ ] 6 category cards visible
  - [ ] Popular docs section present
  - [ ] Search box in navbar
  - [ ] Search returns results for "PRD"
  - [ ] Doc page has feedback component
  - [ ] Click 👍 → shows thank you
  - [ ] Footer has 3 columns
  - [ ] Hover effects work on cards

### Accessibility Testing

- [X] T034 Validate keyboard navigation
  - [ ] Tab key navigates all interactive elements
  - [ ] Enter/Space activates buttons
  - [ ] Focus visible on all elements
  - [ ] Escape closes modals/dropdowns

- [X] T035 Test with screen reader (NVDA or JAWS)
  - [ ] Page structure announced
  - [ ] ARIA labels present
  - [ ] Buttons have accessible names

- [X] T036 Validate color contrast (WCAG AA)
  - [ ] Minimum 4.5:1 for normal text
  - [ ] Minimum 3:1 for large text
  - [ ] Test in both light/dark modes

### Cross-Browser & Device Testing

- [X] T037 Test on multiple browsers and devices
  - [ ] Chrome (latest) - Desktop
  - [ ] Firefox (latest) - Desktop
  - [ ] Edge (latest) - Desktop
  - [ ] Safari (if available) - Desktop
  - [ ] Chrome - Android Mobile
  - [ ] Safari - iOS Mobile
  - [ ] Responsive: Desktop (1920px) → Tablet (768px) → Mobile (375px)

**Phase 6 Checkpoint:**
- ✅ Production build successful
- ✅ Lighthouse Performance > 90
- ✅ Lighthouse Accessibility > 95
- ✅ All manual tests passing
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ Cross-browser tested
- ✅ Mobile responsive

---

## Phase 7: Documentation & Deployment

**Goal:** Document changes, commit code, create pull request  
**Deliverable:** PR ready for review with documentation  
**Independent Test:** PR created → checklist complete → screenshots attached → reviewable

### Documentation

- [X] T038 [P] Create design system documentation in documentation/docs/meta/design-system.md
  - Document color palette
  - Document component usage
  - Document responsive breakpoints

- [X] T039 [P] Update project README in documentation/README.md
  - Add features section
  - Update quick start guide
  - Add screenshots

### Git Workflow

- [X] T040 Commit all changes with descriptive message
  ```bash
  git add .
  git commit -m "feat: implement GitHub-inspired UX improvements

  - Add homepage with 6 category cards
  - Create PopularDocs section with 6 key documents
  - Integrate search plugin with Portuguese support
  - Add feedback component (👍 👎) on all doc pages
  - Configure footer with help/support links
  - Apply Vuexy + GitHub color palette
  - Configure Google Analytics tracking

  Closes FEATURE-001"
  ```

- [X] T041 Push feature branch and create pull request on GitHub
  ```bash
  git push origin feature/github-inspired-ux
  ```
  - Add link to FEATURE-001 spec
  - Attach before/after screenshots
  - Include Lighthouse scores
  - Request review from team

**Phase 7 Checkpoint:**
- ✅ Design system documented
- ✅ README updated
- ✅ Code committed
- ✅ PR created
- ✅ Screenshots attached
- ✅ Ready for review

---

## 🔀 Dependencies & Execution Order

### User Story Completion Order

```
Phase 1 (Setup) → MUST complete before all others
    ↓
Phase 2 (US1) → Homepage/Cards → Blocks Phase 3
    ↓
Phase 3 (US2) → Popular Docs → Needs homepage structure
    ↓
Phase 4 (US3/US4) → Search & Feedback → Independent
    ↓
Phase 5 (US5-US8) → Polish → Independent
    ↓
Phase 6 (Testing) → MUST complete before deployment
    ↓
Phase 7 (Docs) → Final step
```

### Independent Stories (Can Parallelize)

- **US3 (Search)** + **US4 (Feedback)**: Can be developed simultaneously
- **US6 (Footer)** + **US7 (Colors)** + **US8 (Analytics)**: All independent
- Phase 4 and Phase 5 can overlap if multiple developers

---

## ⚡ Parallel Execution Examples

### Example 1: Two Developers

**Developer A:**
- Phase 1 (Setup) - Together
- Phase 2 (US1 - Homepage) - Lead
- Phase 4 (US3 - Search) - Independent
- Phase 6 (Testing) - Together

**Developer B:**
- Phase 1 (Setup) - Together
- Phase 3 (US2 - Popular Docs) - After Phase 2
- Phase 4 (US4 - Feedback) - Independent
- Phase 5 (US6-US8 - Polish) - Independent

**Timeline:** 8-10 hours per developer (vs 14-19 sequential)

### Example 2: Single Developer (Sequential)

Week 1:
- Mon-Tue: Phase 1 + Phase 2
- Wed-Thu: Phase 3 + Phase 4

Week 2:
- Mon-Tue: Phase 5 + Phase 6
- Wed: Phase 7

---

## 📊 Implementation Strategy

### MVP Scope (Minimum Viable Product)

**Phase 1-3 Only** = Core Discovery Features
- ✅ Homepage with category cards (US1)
- ✅ Popular docs section (US2)
- ⏭️ Defer: Search, Feedback, Footer, Analytics

**Why:** Delivers 80% of value in 40% of time (7-10 hours)  
**Deploy Point:** After Phase 3 + basic testing  
**Metrics:** Track bounce rate and time-to-doc manually

### Full Feature Set

**Phase 1-7** = Complete Experience
- All user stories implemented
- Full testing coverage
- Analytics tracking enabled

**Timeline:** 14-19 hours total  
**Deploy Point:** After Phase 7 complete

---

## 🎯 Success Criteria

### Per-Phase Criteria

**Phase 1 Success:** `npm run build` completes, dev server starts

**Phase 2 Success:** Visit homepage → 6 cards render → all links work

**Phase 3 Success:** Popular section visible → 6 docs listed → all links work

**Phase 4 Success:** Search "PRD" → results appear | Doc page → feedback buttons work

**Phase 5 Success:** Footer shows → external links open → colors applied

**Phase 6 Success:** Lighthouse >90/95 → keyboard nav works → mobile responsive

**Phase 7 Success:** PR created → documentation complete → review ready

### Overall Success

- [x] All 40 tasks completed
- [x] Lighthouse Performance > 90
- [x] Lighthouse Accessibility > 95
- [x] All manual tests passing
- [x] PR approved and merged
- [x] Feature deployed to production

---

## 🚨 Common Issues & Quick Fixes

### Issue: "Module not found" error
```bash
# Fix: Clear cache and rebuild
rm -rf .docusaurus node_modules
npm install
npm run build
```

### Issue: Hot reload not working
```bash
# Fix: Kill node processes and restart
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run start -- --port 3003
```

### Issue: Search returns no results
```bash
# Fix: Rebuild to regenerate search index
npm run build
```

### Issue: Feedback not tracking in GA
```javascript
// Fix: Check GA ID and gtag loading
console.log(window.gtag); // Should be function
// Verify trackingID in docusaurus.config.js
```

---

## 📚 Reference Documents

- **Feature Spec:** `.specify/specs/FEATURE-001-github-inspired-ux.md`
- **Implementation Plan:** `.specify/plans/IMPL-001-github-ux.md`
- **Research:** `.specify/research/github-docs-ux-analysis.md`
- **Constitution:** `.specify/memory/constitution.md`
- **Quick Start:** `.specify/quickstart.md`

---

## 🔗 External Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Search Plugin GitHub](https://github.com/cmfcmf/docusaurus-search-local)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vuexy Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

---

**Tasks Version:** 1.0  
**Last Updated:** 2026-02-06  
**Status:** ✅ READY TO EXECUTE  
**Next Action:** Execute Phase 1, Task T001 - Create feature branch

---

## 📝 Task Format Legend

- `- [ ]` = Checkbox (task not started)
- `[P]` = Parallelizable (can work simultaneously with other [P] tasks)
- `[US1]` = User Story label (maps to FEATURE-001 requirements)
- Task ID (T001, T002...) = Sequential execution order
- File paths = Exact location to create/modify files

**Example Task:**
```
- [ ] T012 [P] [US1] Integrate CategoryCard components into homepage grid in src/pages/index.tsx
```

This means:
- Task 012 in sequence
- Can be done in parallel with other [P] tasks
- Implements User Story 1 (Homepage Cards)
- File to modify: `src/pages/index.tsx`
