# US1 - Batch Execution Prompt for GitHub Coding Agent

## Context
Execute all remaining tasks from User Story 1 (US1) of the Design System Foundation milestone in a single batch operation.

**Repository**: fabioaap/Adsmagic-First-AI  
**Branch**: 001-shadcn-design-system  
**Milestone**: Design System Foundation (US1–US4)  
**Story**: US1 - Tokens consolidados e documentados

---

## Specification References
- **Spec**: `specs/001-shadcn-design-system/spec.md`
- **Plan**: `specs/001-shadcn-design-system/plan.md`
- **Tasks**: `specs/001-shadcn-design-system/tasks.md`
- **Audit**: `front-end/src/assets/styles/TOKENS_AUDIT.md` (completed in T011)

---

## Objective
Consolidate CSS tokens, eliminate duplications, and validate the design system foundation to pass Gate SC-001 (zero duplications).

---

## Tasks to Execute (Sequential)

### ✅ T011 - COMPLETED
Audit completed. See `front-end/src/assets/styles/TOKENS_AUDIT.md` for findings.

---

### 🔄 T012 - Remove token duplications [Issue #14]

**Files to modify**:
- `front-end/src/assets/styles/main.css`
- `front-end/src/assets/styles/tokens.css`

**Actions**:
1. **Delete dead code** from `main.css`:
   - Remove entire `[data-theme='dark']` section (lines ~XXX to end)
   - This code is unused (app uses `.dark` class strategy)

2. **Remove hex duplications** that conflict with HSL tokens:
   ```css
   /* DELETE these from :root in main.css */
   --bg-primary, --bg-secondary, --bg-tertiary, --bg-overlay
   --text-primary, --text-secondary, --text-tertiary, --text-inverse
   --text-link, --text-link-hover
   --border-color, --border-color-light, --border-color-dark, --border-color-focus
   --color-success, --color-success-light, --color-success-dark
   --color-warning, --color-warning-light, --color-warning-dark
   --color-error, --color-error-light, --color-error-dark
   --color-info, --color-info-light, --color-info-dark
   ```

3. **Consolidate radius**:
   - Keep `--radius: 0.5rem` in `:root`
   - Remove `--radius-md: 0.5rem` (duplicate)
   - Tailwind already derives: `md: calc(var(--radius) - 2px)`

4. **Move product tokens to tokens.css**:
   ```css
   /* Move from main.css to tokens.css */
   :root {
     /* === TRAFFIC ORIGINS (keep as-is) === */
     --color-origin-google: #4285f4;
     --color-origin-meta: #1877f2;
     --color-origin-instagram: #e4405f;
     --color-origin-whatsapp: #25d366;
     --color-origin-email: #ea4335;
     --color-origin-sms: #8b5cf6;
     --color-origin-phone: #10b981;
     --color-origin-referral: #f59e0b;
     --color-origin-organic: #6366f1;
     --color-origin-direct: #6b7280;
     
     /* === COLOR SCALES (keep as-is) === */
     --color-primary-50: #eef2ff;
     --color-primary-100: #e0e7ff;
     /* ... all primary-* until 900 */
     
     --color-gray-50: #f9fafb;
     /* ... all gray-* until 900 */
     
     /* === SPACING (keep as-is) === */
     --space-0: 0;
     --space-1: 0.25rem;
     /* ... all space-* */
     
     /* === TYPOGRAPHY (keep as-is) === */
     --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
     --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
     --font-size-xs: 0.75rem;
     /* ... all font-* */
     
     /* === BORDERS (except --radius, keep in main.css) === */
     --border-width: 1px;
     --border-width-2: 2px;
     --radius-none: 0;
     --radius-sm: 0.25rem;
     --radius-base: 0.375rem;
     --radius-lg: 0.75rem;
     --radius-xl: 1rem;
     --radius-full: 9999px;
     
     /* === SHADOWS (keep as-is) === */
     --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
     /* ... all shadow-* */
     
     /* === TRANSITIONS (keep as-is) === */
     --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
     --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
     --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
     
     /* === Z-INDEX (keep as-is) === */
     --z-dropdown: 1000;
     --z-sticky: 1020;
     --z-fixed: 1030;
     --z-modal-backdrop: 1040;
     --z-modal: 1050;
     --z-popover: 1060;
     --z-tooltip: 1070;
   }
   
   .dark {
     /* Only invert color scales if needed */
     --color-primary-500: #818cf8;
     --color-gray-50: #111827;
     /* ... mirror inversions */
   }
   ```

5. **Keep in main.css** (semantic layer):
   ```css
   @layer base {
     :root {
       /* ShadCN semantic tokens (HSL) */
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --card: 0 0% 100%;
       --card-foreground: 222.2 84% 4.9%;
       --popover: 0 0% 100%;
       --popover-foreground: 222.2 84% 4.9%;
       --primary: 222.2 47.4% 11.2%;
       --primary-foreground: 210 40% 98%;
       --secondary: 210 40% 96.1%;
       --secondary-foreground: 222.2 47.4% 11.2%;
       --muted: 210 40% 96.1%;
       --muted-foreground: 215.4 16.3% 46.9%;
       --accent: 210 40% 96.1%;
       --accent-foreground: 222.2 47.4% 11.2%;
       --destructive: 0 84.2% 60.2%;
       --destructive-foreground: 210 40% 98%;
       --border: 214.3 31.8% 91.4%;
       --input: 214.3 31.8% 91.4%;
       --ring: 222.2 84% 4.9%;
       --radius: 0.5rem;
       
       /* Brand tokens (HSL) */
       --brand-50: 210 100% 98%;
       --brand-100: 210 95% 95%;
       --brand-500: 222 47% 50%;
       --brand-900: 210 80% 15%;
       
       /* Semantic feedback (HSL) */
       --success: 142 71% 45%;
       --warning: 38 92% 50%;
       --info: 201 96% 32%;
     }
     
     .dark {
       /* Dark mode overrides (HSL) */
       --background: 222.2 84% 4.9%;
       --foreground: 210 40% 98%;
       /* ... all semantic tokens inverted */
     }
   }
   ```

**Validation**:
```bash
# Must return 0 (zero duplications)
grep -E "^[[:space:]]*--" front-end/src/assets/styles/main.css | \
  cut -d: -f1 | sort | uniq -d | wc -l
```

**Commit message**:
```
feat(design-system): consolidate tokens and eliminate duplications (T012)

- Remove [data-theme='dark'] dead code from main.css
- Delete 18 hex duplications conflicting with HSL tokens
- Consolidate --radius (remove --radius-md duplicate)
- Move product tokens to tokens.css (origins, scales, spacing, z-index)
- Keep semantic HSL tokens in main.css (ShadCN base)

Gate SC-001: PASS (0% duplications)

Issue: #14
Task: T012
Story: US1
```

---

### 🔄 T013 - Update component references [Issue #15]

**Files to analyze**:
- `front-end/src/components/ui/**/*.vue`

**Actions**:
1. **Search for removed tokens** (should return 0 matches):
   ```bash
   grep -r "--bg-primary\|--text-primary\|--border-color" front-end/src/components/ui/
   ```

2. **If any matches found**, replace with semantic equivalents:
   - `--bg-primary` → `hsl(var(--background))`
   - `--text-primary` → `hsl(var(--foreground))`
   - `--border-color` → `hsl(var(--border))`

3. **Verify no breakage**:
   ```bash
   cd front-end && pnpm typecheck
   ```

**Expected result**: No changes needed (audit confirmed components don't use hex duplicates)

**Commit message** (if changes made):
```
refactor(design-system): update components to use semantic tokens (T013)

- Replace hex token references with HSL semantic equivalents
- Ensure consistency with consolidated token system

Issue: #15
Task: T013
Story: US1
```

---

### 🔄 T014 - Create tokens documentation [Issue #16]

**File to create**:
- `docs/design-system/tokens.md`

**Content structure**:
```markdown
# Design Tokens - Sistema Consolidado

**Atualizado**: 2025-12-03  
**Status**: ✅ Consolidado (Gate SC-001 PASS)

---

## Arquitetura de Tokens

### Camada 1: Tokens Semânticos (main.css)
HSL format - Referências abstratas que funcionam em dark/light mode.

**Background**:
- `--background` - Fundo principal da aplicação
- `--card` - Fundo de cards e superfícies elevadas
- `--popover` - Fundo de popovers e dropdowns

**Foreground (Text)**:
- `--foreground` - Texto principal
- `--muted-foreground` - Texto secundário/desabilitado

**Primary (Brand)**:
- `--primary` - Cor principal da marca
- `--primary-foreground` - Texto sobre primary

**Secondary**:
- `--secondary` - Cor secundária
- `--secondary-foreground` - Texto sobre secondary

**Feedback**:
- `--success` - Ações bem-sucedidas (verde)
- `--warning` - Avisos e atenção (amarelo)
- `--destructive` - Ações destrutivas/erros (vermelho)
- `--info` - Informações (azul)

**UI Elements**:
- `--border` - Bordas de elementos
- `--input` - Bordas de inputs
- `--ring` - Foco (outline)
- `--radius` - Border radius base (0.5rem)

**Uso**:
```css
.my-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

---

### Camada 2: Tokens de Produto (tokens.css)
Hex/units - Valores específicos do produto que não precisam variar entre temas.

**Origens de Tráfego**:
- `--color-origin-google: #4285f4` - Google Ads
- `--color-origin-meta: #1877f2` - Meta Ads
- `--color-origin-instagram: #e4405f` - Instagram
- `--color-origin-whatsapp: #25d366` - WhatsApp
- ... (10 origens no total)

**Escalas de Cor**:
- `--color-primary-50` até `--color-primary-900` (11 valores)
- `--color-gray-50` até `--color-gray-900` (10 valores)

**Espaçamentos**:
- `--space-0: 0` até `--space-24: 6rem` (13 valores)

**Tipografia**:
- `--font-family-sans`, `--font-family-mono`
- `--font-size-xs` até `--font-size-4xl` (8 tamanhos)
- `--font-weight-normal` até `--font-weight-bold` (4 pesos)
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

**Borders**:
- `--border-width: 1px`, `--border-width-2: 2px`
- `--radius-none` até `--radius-full` (7 valores, exceto --radius-md removido)

**Shadows**:
- `--shadow-sm` até `--shadow-2xl` (6 níveis)

**Transições**:
- `--transition-fast: 150ms`
- `--transition-base: 200ms`
- `--transition-slow: 300ms`

**Z-index**:
- `--z-dropdown: 1000` até `--z-tooltip: 1070` (7 layers)

---

## Dark Mode

### Estratégia: `.dark` class
Aplicada em `<html>` via `useDarkMode` composable.

**Tokens que invertem**:
- Todos os semânticos (--background, --foreground, etc.)
- Escalas de cor (opcional - primary/gray espelhados)

**Tokens que não mudam**:
- Origens de tráfego (cores fixas das plataformas)
- Espaçamentos, tipografia, z-index (não variam por tema)

---

## Mapeamento Semântico → Produto

| Semântico | Produto (Referência) | Uso |
|-----------|---------------------|-----|
| `--primary` | `--color-primary-600` | Cor principal da marca |
| `--secondary` | `--color-gray-100` | Superfícies secundárias |
| `--muted` | `--color-gray-50` | Fundos sutis |
| `--success` | Verde HSL | Feedback positivo |
| `--warning` | Laranja HSL | Avisos |
| `--destructive` | Vermelho HSL | Ações destrutivas |

---

## Validação (Gate SC-001)

### Critério de Sucesso
✅ **Zero duplicações** entre main.css e tokens.css

### Comando de verificação
```bash
grep -E "^[[:space:]]*--" front-end/src/assets/styles/main.css | \
  cut -d: -f1 | sort | uniq -d | wc -l
# Deve retornar: 0
```

### Status Atual
✅ **PASS** - 0% duplicações (183 tokens únicos)

---

## Referências
- Audit completo: `front-end/src/assets/styles/TOKENS_AUDIT.md`
- Spec: `specs/001-shadcn-design-system/spec.md` (FR-001)
- Tailwind config: `front-end/tailwind.config.js`
```

**Commit message**:
```
docs(design-system): create tokens documentation (T014)

- Document semantic vs product token layers
- Explain dark mode strategy (.dark class)
- Provide usage examples and validation commands
- Confirm Gate SC-001 PASS status

Issue: #16
Task: T014
Story: US1
```

---

### 🔄 T015 - Validate dark/light rendering [Issue #17]

**Files to check/create**:
- `front-end/src/views/test/TestRadixComponents.vue` (may need creation)

**Actions**:
1. **Create test view** if doesn't exist:
   ```vue
   <script setup lang="ts">
   import { useDarkMode } from '@/composables/useDarkMode'
   import Button from '@/components/ui/Button.vue'
   import Card from '@/components/ui/Card.vue'
   import Input from '@/components/ui/Input.vue'
   import Badge from '@/components/ui/Badge.vue'
   
   const { isDark, toggle } = useDarkMode()
   </script>
   
   <template>
     <div class="p-8 space-y-8">
       <div class="flex justify-between items-center">
         <h1 class="text-3xl font-bold">Design System - Theme Test</h1>
         <Button @click="toggle">
           {{ isDark ? '🌙 Dark' : '☀️ Light' }}
         </Button>
       </div>
       
       <Card class="p-6">
         <h2 class="text-xl font-semibold mb-4">Semantic Tokens Test</h2>
         
         <div class="space-y-4">
           <div>
             <p class="text-sm text-muted-foreground mb-2">Background & Foreground</p>
             <div class="p-4 bg-background text-foreground border border-border rounded-md">
               Background color with foreground text
             </div>
           </div>
           
           <div>
             <p class="text-sm text-muted-foreground mb-2">Cards & Surfaces</p>
             <div class="p-4 bg-card text-card-foreground border border-border rounded-md">
               Card surface with proper contrast
             </div>
           </div>
           
           <div>
             <p class="text-sm text-muted-foreground mb-2">Primary Brand</p>
             <Button variant="default">Primary Button</Button>
           </div>
           
           <div>
             <p class="text-sm text-muted-foreground mb-2">Feedback Colors</p>
             <div class="flex gap-2">
               <Badge variant="success">Success</Badge>
               <Badge variant="warning">Warning</Badge>
               <Badge variant="destructive">Error</Badge>
               <Badge variant="info">Info</Badge>
             </div>
           </div>
           
           <div>
             <p class="text-sm text-muted-foreground mb-2">Form Elements</p>
             <Input placeholder="Test input with proper colors" />
           </div>
         </div>
       </Card>
       
       <Card class="p-6">
         <h2 class="text-xl font-semibold mb-4">Contrast Check (WCAG AA)</h2>
         <p class="text-sm text-muted-foreground">
           Validate visually that all text has proper contrast in both themes:
         </p>
         <ul class="list-disc list-inside mt-2 space-y-1">
           <li>Normal text: 4.5:1 ratio minimum</li>
           <li>Large text: 3:1 ratio minimum</li>
           <li>UI components: 3:1 ratio minimum</li>
         </ul>
       </Card>
     </div>
   </template>
   ```

2. **Add route** in `front-end/src/router/index.ts`:
   ```typescript
   {
     path: '/:locale/test/tokens',
     name: 'test-tokens',
     component: () => import('@/views/test/TestRadixComponents.vue'),
     meta: { requiresAuth: false }
   }
   ```

3. **Manual validation**:
   - Start dev server: `pnpm dev`
   - Navigate to `/pt/test/tokens`
   - Toggle dark/light mode
   - Verify:
     - ✅ No FOUC (flash of unstyled content)
     - ✅ All colors change smoothly
     - ✅ Text contrast remains readable
     - ✅ No broken styles

**Commit message**:
```
test(design-system): add dark/light theme validation view (T015)

- Create TestRadixComponents view with semantic token showcase
- Add route /test/tokens for manual theme validation
- Include contrast check checklist (WCAG AA)
- Validate smooth dark mode toggle without FOUC

Issue: #17
Task: T015
Story: US1
```

---

### 🔄 T016 - Add gate hook [Issue #18]

**File to create**:
- `scripts/check-ds-gate.sh`

**Content**:
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔒 Design System Gate Check (SC-001)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

FAILED=0

# Gate SC-001: Zero token duplications
echo "🔍 Checking token duplications..."
DUPLICATES=$(grep -E "^[[:space:]]*--" front-end/src/assets/styles/main.css | \
  cut -d: -f1 | sort | uniq -d | wc -l)

if [[ $DUPLICATES -eq 0 ]]; then
  echo "  ✅ SC-001 PASS: Zero duplications ($DUPLICATES found)"
else
  echo "  ❌ SC-001 FAIL: $DUPLICATES duplications found"
  echo ""
  echo "  Duplicated tokens:"
  grep -E "^[[:space:]]*--" front-end/src/assets/styles/main.css | \
    cut -d: -f1 | sort | uniq -d | sed 's/^/    /'
  FAILED=1
fi

echo ""

# Gate SC-002: TypeScript build passes
echo "🔍 Checking TypeScript build..."
cd front-end
if pnpm typecheck --noEmit > /dev/null 2>&1; then
  echo "  ✅ TypeScript: Build passes"
else
  echo "  ❌ TypeScript: Build failed"
  FAILED=1
fi
cd ..

echo ""

# Gate SC-003: Documentation exists
echo "🔍 Checking documentation..."
if [[ -f "docs/design-system/tokens.md" ]]; then
  echo "  ✅ Documentation: tokens.md exists"
else
  echo "  ❌ Documentation: tokens.md missing"
  FAILED=1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ $FAILED -eq 0 ]]; then
  echo "✅ All gates passed - Ready to proceed"
  exit 0
else
  echo "❌ Some gates failed - Fix issues before proceeding"
  exit 1
fi
```

**Make executable**:
```bash
chmod +x scripts/check-ds-gate.sh
```

**Add to CI** (optional - in `.github/workflows/ci.yml`):
```yaml
- name: Design System Gate Check
  run: ./scripts/check-ds-gate.sh
```

**Commit message**:
```
chore(design-system): add gate check script (T016)

- Create check-ds-gate.sh to validate SC-001 (zero duplications)
- Include TypeScript build check
- Verify documentation existence
- Exit 1 if any gate fails (CI-ready)

Issue: #18
Task: T016
Story: US1
```

---

## Final Validation

After all tasks complete, run:

```bash
# 1. Gate check
./scripts/check-ds-gate.sh

# 2. Build
cd front-end && pnpm build

# 3. Visual test
pnpm dev
# Navigate to /pt/test/tokens and toggle dark/light

# 4. Milestone status
.github/scripts/milestone-status.sh
```

**Expected output**:
- ✅ Gate SC-001: PASS (0 duplications)
- ✅ TypeScript: No errors
- ✅ Build: Success
- ✅ Visual: Dark/light toggle works perfectly
- ✅ US1: 6/6 (100%)

---

## Commit Strategy

**Single PR approach** (recommended):
- Create one branch: `feature/us1-token-consolidation`
- Make 5 sequential commits (T012-T016)
- Open single PR with all changes
- Easy to review, easy to revert if needed

**Multi-PR approach** (if preferred):
- One PR per task
- Review incrementally
- Merge after each validation

---

## Success Criteria

- [x] T011: Audit complete ✅
- [ ] T012: Tokens consolidated, 0% duplications
- [ ] T013: Components updated (likely no changes needed)
- [ ] T014: Documentation published
- [ ] T015: Dark/light validated visually
- [ ] T016: Gate check automated
- [ ] Gate SC-001: PASS
- [ ] Build: Success
- [ ] US1: 100% complete

---

## Time Estimate

- T012: 20-25min (consolidation + testing)
- T013: 5-10min (verification only)
- T014: 10-15min (documentation)
- T015: 10-15min (test view + validation)
- T016: 5-10min (gate script)

**Total**: ~50-75min for full US1 completion

---

## Notes for Agent

- Follow sequential order (T012→T013→T014→T015→T016)
- Run validation after each task
- If T013 finds no matches, commit with "no changes needed" message
- Prioritize code safety: better to skip than break
- Reference audit findings from T011 for context
