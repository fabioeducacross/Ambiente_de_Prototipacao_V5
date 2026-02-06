# Implementation Plan: GitHub-Inspired UX Improvements

**Feature:** FEATURE-001  
**Branch:** `feature/github-inspired-ux`  
**Status:** READY TO START  
**Estimated Effort:** 14-19 hours  
**Timeline:** 2 weeks (part-time)

---

## 🎯 Quick Summary

Redesign documentation homepage and add UX components inspired by GitHub Docs to improve content discovery, reduce onboarding time, and enhance user experience.

**Key Changes:**
- Homepage with visual category cards (6 categories)
- "Popular Docs" section (6 most important documents)
- Full-text search in Portuguese
- User feedback system (👍 👎) on all pages
- Improved footer with help/support links
- Responsive mobile-first design

---

## 📋 Phase Breakdown

### Phase 1: Foundation (2-3h) - Week 1, Days 1-2
**Goal:** Setup project structure and dependencies

**Tasks:**
1. Create directory structure
2. Install search plugin: `npm install @cmfcmf/docusaurus-search-local`
3. Configure `docusaurus.config.js`
4. Create empty component shells

**Deliverable:** Project structure ready, build compiles

**Command:**
```bash
cd documentation
mkdir -p src/pages src/components/CategoryCard src/components/PopularDocs
mkdir -p src/theme/DocItem/Footer
npm install --save @cmfcmf/docusaurus-search-local
```

---

### Phase 2: Homepage (4-5h) - Week 1, Days 3-4
**Goal:** Implement homepage with category cards

**Tasks:**
1. Create `CategoryCard` component (1.5h)
2. Style `CategoryCard` with CSS modules (1h)
3. Create homepage (`src/pages/index.tsx`) (1.5h)
4. Style homepage with hero section (30min)

**Deliverable:** Homepage with 6 category cards, responsive

**Files:**
- `src/components/CategoryCard/index.tsx`
- `src/components/CategoryCard/CategoryCard.module.css`
- `src/pages/index.tsx`
- `src/pages/index.module.css`

---

### Phase 3: Popular Docs (1-2h) - Week 1, Day 4
**Goal:** Add "Popular Docs" section

**Tasks:**
1. Create `PopularDocs` component (1h)
2. Style with hover effects (30min)

**Deliverable:** Popular docs section between hero and cards

**Files:**
- `src/components/PopularDocs/index.tsx`
- `src/components/PopularDocs/PopularDocs.module.css`

---

### Phase 4: Search & Feedback (2-3h) - Week 2, Days 1-2
**Goal:** Implement search and feedback systems

**Tasks:**
1. Configure search plugin (30min)
2. Customize search placeholder (15min)
3. Create feedback component (1.5h)
4. Style feedback component (30min)

**Deliverable:** Working search + feedback on all docs

**Files:**
- `docusaurus.config.js` (updated)
- `src/theme/DocItem/Footer/index.tsx`
- `src/theme/DocItem/Footer/DocItemFooter.module.css`
- `src/css/custom.css` (updated)

---

### Phase 5: Footer & Polish (1-2h) - Week 2, Day 3
**Goal:** Configure footer and final polish

**Tasks:**
1. Configure footer links (30min)
2. Add external link icons (30min)
3. Update color palette (30min)

**Deliverable:** Complete footer, polished design

**Files:**
- `docusaurus.config.js` (footer config)
- `src/theme/Footer/index.tsx` (optional swizzle)
- `src/css/custom.css` (colors)

---

### Phase 6: Testing (2-3h) - Week 2, Days 4-5
**Goal:** Validate quality and fix bugs

**Tasks:**
1. Production build & manual testing (1h)
2. Lighthouse audit (30min)
3. Accessibility testing (30min)
4. Cross-browser testing (30min)
5. Bug fixes (30min)

**Deliverable:** Production-ready build, all tests passing

**Commands:**
```bash
npm run build
npx http-server ./build -p 3003
npx @lhci/cli autorun --collect.url=http://localhost:3003
```

**Checklist:**
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Mobile responsive
- [ ] All links work

---

### Phase 7: Documentation (1-2h) - Week 2, Day 5
**Goal:** Document changes and deploy

**Tasks:**
1. Create design system doc (30min)
2. Update README (15min)
3. Commit changes (15min)
4. Push & create PR (15min)

**Deliverable:** PR ready for review

**Commands:**
```bash
git add .
git commit -m "feat: implement GitHub-inspired UX improvements"
git push origin feature/github-inspired-ux
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22.22.0
- npm
- Git

### Quick Start
```bash
# 1. Create feature branch
git checkout -b feature/github-inspired-ux

# 2. Navigate to documentation
cd documentation

# 3. Install dependencies
npm install --save @cmfcmf/docusaurus-search-local

# 4. Start development server
npm run start -- --port 3003

# 5. Open browser
# http://localhost:3003
```

### Development Workflow
```bash
# Make changes to components
# Save file → Hot reload kicks in
# View changes in browser
# Iterate until satisfied

# Build production version
npm run build

# Test production build
npx http-server ./build -p 3003
```

---

## 📊 Key Files to Create/Modify

### New Files (Create)
- [ ] `src/pages/index.tsx` - Homepage
- [ ] `src/pages/index.module.css` - Homepage styles
- [ ] `src/components/CategoryCard/index.tsx` - Card component
- [ ] `src/components/CategoryCard/CategoryCard.module.css` - Card styles
- [ ] `src/components/PopularDocs/index.tsx` - Popular section
- [ ] `src/components/PopularDocs/PopularDocs.module.css` - Popular styles
- [ ] `src/theme/DocItem/Footer/index.tsx` - Feedback component
- [ ] `src/theme/DocItem/Footer/DocItemFooter.module.css` - Feedback styles

### Existing Files (Modify)
- [ ] `docusaurus.config.js` - Add plugins, footer config, analytics
- [ ] `src/css/custom.css` - Update color palette, transitions

---

## 🎨 Design Tokens

### Colors (Vuexy Palette)
```css
--ifm-color-primary: #7367F0;
--ifm-color-success: #28C76F;
--ifm-color-warning: #FF9F43;
--ifm-color-danger: #EA5455;
--ifm-color-info: #00CFE8;
```

### Category Colors (GitHub-Inspired)
```css
--color-intro: #0969DA;       /* Introdução */
--color-collab: #8250DF;      /* Colaboração */
--color-devops: #1A7F37;      /* DevOps */
--color-security: #D1242F;    /* Segurança */
--color-management: #BF8700;  /* Gestão */
--color-dev: #0550AE;         /* Desenvolvimento */
```

### Spacing
```css
--ifm-spacing-horizontal: 1rem;
--ifm-spacing-vertical: 1rem;
```

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 996px
- Desktop: > 996px

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] Homepage loads correctly
- [ ] All 6 category cards render
- [ ] Popular docs section visible
- [ ] Search box in navbar
- [ ] Search returns results for "PRD"
- [ ] Click card link → navigates to page
- [ ] Doc page has feedback component
- [ ] Click 👍 → shows "Obrigado! 🎉"
- [ ] Reload page → buttons disabled
- [ ] Footer has 3 columns
- [ ] External links open in new tab
- [ ] Hover effects on cards work
- [ ] Mobile: cards stack vertically
- [ ] Mobile: hamburger menu works

### Performance Testing
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:3003

# Expected:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 90
```

### Accessibility Testing
- [ ] Tab key navigates all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Focus visible on all elements
- [ ] Screen reader announces page structure
- [ ] ARIA labels present on buttons
- [ ] Minimum contrast 4.5:1

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if available)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

---

## 🚨 Common Issues & Solutions

### Issue 1: Search Plugin Not Working
**Symptom:** Search box empty or no results

**Solution:**
```bash
# Clear build cache
rm -rf .docusaurus build

# Rebuild
npm run build

# Check that search-index.json exists
ls -la build/search-index.json
```

### Issue 2: Hot Reload Not Working
**Symptom:** Changes don't reflect in browser

**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .docusaurus

# Restart
npm run start -- --port 3003
```

### Issue 3: Production Build Fails
**Symptom:** `npm run build` errors

**Solution:**
```bash
# Check for broken links
npm run build 2>&1 | grep "Error"

# Fix links or add to broken links config
# docusaurus.config.js:
onBrokenLinks: 'warn',  // Instead of 'throw'
```

### Issue 4: Feedback Component Not Tracking
**Symptom:** No events in Google Analytics

**Solution:**
```javascript
// Check gtag is loaded in browser console
console.log(window.gtag);

// If undefined, verify GA ID in docusaurus.config.js
themeConfig: {
  gtag: {
    trackingID: 'G-XXXXXXXXXX',  // Replace with real ID
  },
}
```

---

## 📈 Success Metrics

### Development Metrics (Phase 6)
- [x] Lighthouse Performance > 90
- [x] Lighthouse Accessibility > 95
- [x] Build time < 30 seconds
- [x] Bundle size < 300KB (gzipped)
- [x] Zero console errors

### User Metrics (Post-Launch, 2 weeks)
- [ ] Bounce rate homepage < 20%
- [ ] Pages per session > 3.5
- [ ] Search usage rate > 40%
- [ ] Positive feedback (👍) > 80%
- [ ] Time to find document < 30 seconds

---

## 🔗 Resources

### Documentation
- [Docusaurus Official Docs](https://docusaurus.io/docs)
- [Search Plugin Docs](https://github.com/cmfcmf/docusaurus-search-local)
- [GitHub Docs Analysis](../github-docs-homepage.png)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Design
- [Vuexy Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [Material Symbols](https://fonts.google.com/icons)

---

## 👥 Team & Roles

**Developer 1** (Primary)
- Phases 1-4: Components and functionality
- Phase 6: Testing and bug fixes

**Developer 2** (Optional, Support)
- Phase 5: Footer and polish
- Phase 7: Documentation

**Reviewer** (Required)
- Review PR before merge
- Validate accessibility
- Sign off on design

---

## 📅 Timeline

### Week 1
- **Mon-Tue**: Phase 1 (Foundation)
- **Wed-Thu**: Phase 2 (Homepage)
- **Thu-Fri**: Phase 3 (Popular Docs)

### Week 2
- **Mon-Tue**: Phase 4 (Search & Feedback)
- **Wed**: Phase 5 (Footer & Polish)
- **Thu-Fri**: Phase 6 (Testing)
- **Fri**: Phase 7 (Documentation & PR)

**Total:** 10 working days (part-time, ~2h/day)

---

## ✅ Ready to Start?

```bash
# Create branch
git checkout -b feature/github-inspired-ux

# Start Phase 1
cd documentation
npm install --save @cmfcmf/docusaurus-search-local

# Begin development
npm run start -- --port 3003
```

**Next Step:** Phase 1, Task 1 - Create directory structure

**Questions?** Check [FEATURE-001 spec](./specs/FEATURE-001-github-inspired-ux.md) for detailed requirements.

---

**Plan Version:** 1.0  
**Last Updated:** 2026-02-06  
**Status:** ✅ READY TO IMPLEMENT
