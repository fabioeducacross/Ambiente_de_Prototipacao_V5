# Quick Start - GitHub-Inspired UX Implementation

**Feature:** FEATURE-001  
**Time to Start:** 5 minutes  
**Estimated Completion:** 14-19 hours  
**Status:** ✅ READY

---

## 🚀 TL;DR (30 seconds)

```bash
# 1. Create branch
git checkout -b feature/github-inspired-ux

# 2. Install dependencies
cd documentation
npm install --save @cmfcmf/docusaurus-search-local

# 3. Start coding (follow phases in IMPL-001)
npm run start -- --port 3003
```

**What you're building:** GitHub-style homepage with category cards, popular docs section, search, and feedback system.

---

## 📋 Pre-Flight Checklist

Before starting, ensure you have:

- [x] Node.js v22.22.0 installed
- [x] Git configured
- [x] VSCode (recommended)
- [x] Read `.specify/memory/constitution.md` (core principles)
- [x] Read `.specify/research/github-docs-ux-analysis.md` (context)
- [x] Reviewed screenshot: `github-docs-homepage.png`

**Time Investment:** ~20 min to read documentation

---

## 🎯 What You're Building

### Visual Reference
```
┌──────────────────────────────────────────┐
│  📚 Documentação V5                      │  ← Hero Section
│  Regras, produto, jornadas e guias      │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  📈 Documentos Mais Acessados            │  ← Popular Section
│  [Card] [Card] [Card]                    │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  [📘 Regras]  [🎯 Produto]  [🚀 Jornadas]│  ← Category Cards
│  [⚙️ Setup]   [👥 Personas] [❓ FAQ]     │
└──────────────────────────────────────────┘
```

### Components to Create
1. **CategoryCard** - Reusable card component
2. **PopularDocs** - Section with 6 key documents
3. **DocItemFooter** - Feedback component (👍 👎)
4. **Homepage** - Custom index.tsx

---

## 📂 Directory Structure

```
documentation/
├── src/
│   ├── pages/
│   │   ├── index.tsx               ← CREATE (Homepage)
│   │   └── index.module.css        ← CREATE (Styles)
│   ├── components/
│   │   ├── CategoryCard/
│   │   │   ├── index.tsx           ← CREATE
│   │   │   └── CategoryCard.module.css ← CREATE
│   │   ├── PopularDocs/
│   │   │   ├── index.tsx           ← CREATE
│   │   │   └── PopularDocs.module.css ← CREATE
│   │   └── MaterialIcon.tsx        ← EXISTS (reuse)
│   ├── theme/
│   │   └── DocItem/
│   │       └── Footer/
│   │           ├── index.tsx       ← CREATE
│   │           └── DocItemFooter.module.css ← CREATE
│   └── css/
│       └── custom.css              ← MODIFY
├── docusaurus.config.js            ← MODIFY
└── package.json                    ← MODIFY
```

---

## 🏃 Phase-by-Phase Guide

### Phase 1: Foundation (2-3h)

**Goal:** Setup structure and dependencies

```bash
# Navigate to documentation
cd documentation

# Install search plugin
npm install --save @cmfcmf/docusaurus-search-local

# Create directories
mkdir -p src/pages
mkdir -p src/components/CategoryCard
mkdir -p src/components/PopularDocs
mkdir -p src/theme/DocItem/Footer

# Create empty files
touch src/pages/index.tsx
touch src/pages/index.module.css
touch src/components/CategoryCard/index.tsx
touch src/components/CategoryCard/CategoryCard.module.css
touch src/components/PopularDocs/index.tsx
touch src/components/PopularDocs/PopularDocs.module.css
touch src/theme/DocItem/Footer/index.tsx
touch src/theme/DocItem/Footer/DocItemFooter.module.css
```

**Configure Search Plugin:**
```typescript
// docusaurus.config.js - add to plugins array
plugins: [
  [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    {
      indexDocs: true,
      indexBlog: false,
      language: 'pt',
      maxSearchResults: 8,
    },
  ],
],
```

**Test:**
```bash
npm run build
# Should compile without errors
```

---

### Phase 2: Homepage (4-5h)

**Step 1: Create CategoryCard Component**

Copy this template to `src/components/CategoryCard/index.tsx`:

```typescript
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

**Step 2: Style CategoryCard**

Copy to `src/components/CategoryCard/CategoryCard.module.css`:

```css
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
```

**Step 3: Test CategoryCard**

```bash
npm run start -- --port 3003
# Card should render (if you add it to a page)
```

**Full code for homepage:** See `IMPL-001-github-ux.md` Phase 2, Task 2.3

---

### Phase 3: Popular Docs (1-2h)

**Quick Template:**

`src/components/PopularDocs/index.tsx`:

```typescript
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './PopularDocs.module.css';

const popularDocs = [
  {
    icon: '📝',
    title: 'Template PRD',
    description: 'Estrutura completa para documentar requisitos',
    url: '/docs/prds/template',
  },
  // Add 5 more...
];

export default function PopularDocs(): JSX.Element {
  return (
    <section className={styles.popularSection}>
      <h2>📈 Documentos Mais Acessados</h2>
      <div className="row">
        {popularDocs.map((doc, idx) => (
          <div key={idx} className="col col--6">
            <Link to={doc.url} className={styles.popularCard}>
              <span className={styles.icon}>{doc.icon}</span>
              <div>
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

**Styles:** See `IMPL-001-github-ux.md` Phase 3, Task 3.2

---

### Phase 4: Search & Feedback (2-3h)

**Feedback Component Template:**

`src/theme/DocItem/Footer/index.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import styles from './DocItemFooter.module.css';

export default function DocItemFooter(): JSX.Element {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
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
          aria-label="Sim, esta página foi útil"
        >
          👍 Sim
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={hasVoted}
          aria-label="Não, esta página não foi útil"
        >
          👎 Não
        </button>
      </div>
      {hasVoted && (
        <p className={styles.feedbackThanks}>
          {feedback ? '✅ Obrigado! 🎉' : '📝 Obrigado! Vamos melhorar.'}
        </p>
      )}
    </div>
  );
}
```

**Search Config:**
Already added in Phase 1 `docusaurus.config.js`

---

### Phase 5: Footer & Polish (1-2h)

**Footer Configuration:**

Add to `docusaurus.config.js` → `themeConfig`:

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
},
```

**Color Palette:**

Add to `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #7367F0;
  --ifm-color-success: #28C76F;
  --ifm-color-warning: #FF9F43;
  --ifm-color-danger: #EA5455;
  --ifm-color-info: #00CFE8;
}
```

---

### Phase 6: Testing (2-3h)

**Production Build:**
```bash
npm run build
npx http-server ./build -p 3003
```

**Lighthouse Audit:**
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3003
```

**Expected Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Manual Checklist:**
- [ ] Homepage renders
- [ ] All cards visible
- [ ] Popular docs section present
- [ ] Search works (type "PRD")
- [ ] Feedback component on doc pages
- [ ] Click 👍 → shows thank you
- [ ] Reload → buttons disabled
- [ ] Mobile: cards stack vertically
- [ ] Footer has links
- [ ] External links open in new tab

---

### Phase 7: Commit & Push (1h)

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: implement GitHub-inspired UX improvements

- Add homepage with 6 category cards
- Create PopularDocs section
- Integrate search plugin
- Add feedback component (👍 👎)
- Configure footer with help links
- Apply Vuexy + GitHub color palette

Closes FEATURE-001"

# Push to remote
git push origin feature/github-inspired-ux
```

**Create PR on GitHub:**
- Title: `feat: GitHub-inspired UX improvements`
- Link to FEATURE-001 spec
- Add screenshots
- Request review

---

## 🧪 Testing Commands

```bash
# Development server
npm run start -- --port 3003

# Production build
npm run build

# Serve production build
npx http-server ./build -p 3003

# Lighthouse audit
npx @lhci/cli autorun --collect.url=http://localhost:3003

# Clear cache (if hot reload stuck)
rm -rf .docusaurus
```

---

## 🚨 Common Issues

### Issue: Build fails with "Module not found"
**Fix:**
```bash
npm install
rm -rf .docusaurus
npm run build
```

### Issue: Hot reload not working
**Fix:**
```bash
# Stop server (Ctrl+C)
rm -rf .docusaurus
npm run start -- --port 3003
```

### Issue: Search returns no results
**Fix:**
```bash
npm run build  # Rebuild search index
```

### Issue: Feedback component doesn't track
**Fix:**
```typescript
// Check if gtag is loaded in browser console
console.log(window.gtag);
// If undefined, add GA tracking ID in docusaurus.config.js
```

---

## 📊 Success Criteria

**You're done when:**
- [x] Homepage has 6 category cards
- [x] Popular docs section visible
- [x] Search returns results
- [x] Feedback component on all doc pages
- [x] Footer configured
- [x] Production build successful
- [x] Lighthouse Performance > 90
- [x] Lighthouse Accessibility > 95
- [x] Mobile responsive
- [x] PR created and reviewed

---

## 📚 Full Documentation

- **Feature Spec:** `.specify/specs/FEATURE-001-github-inspired-ux.md`
- **Implementation Plan:** `.specify/plans/IMPL-001-github-ux.md`
- **Research:** `.specify/research/github-docs-ux-analysis.md`
- **Constitution:** `.specify/memory/constitution.md`

---

## 🎯 Next Steps After This Feature

1. Deploy to staging
2. User testing (5-10 users)
3. Collect feedback metrics (1 week)
4. Iterate based on data
5. Deploy to production
6. Monitor analytics (bounce rate, pages/session, feedback ratio)

---

## 💬 Need Help?

- **GitHub Discussions:** https://github.com/educacross/ambiente-prototipacao-v5/discussions
- **Issues:** https://github.com/educacross/ambiente-prototipacao-v5/issues
- **Team Chat:** [Slack/Discord channel]

---

**Quick Start Version:** 1.0  
**Last Updated:** 2026-02-06  
**Estimated Time:** 14-19 hours total  
**Ready to Start?** → `git checkout -b feature/github-inspired-ux`
