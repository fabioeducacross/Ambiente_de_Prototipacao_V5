# Educacross Prototype Workflow

**Skill para workflow Git de prototipação AS-IS/TO-BE no Ambiente de Prototipação V5**

---

## 📋 TL;DR

**Problema**: Prototipar inovações sem perder controle da baseline de produção.

**Solução**: Branches `prototypes/as-is` (replica produção) → `prototypes/feature/*` (TO-BE) → aprovação → migração para `educacross-frontoffice`.

**Comandos rápidos**:
```bash
# Criar baseline AS-IS
npm run create-baseline missoes-v2

# Criar protótipo TO-BE
git checkout -b prototypes/feature/missoes-gamificadas

# Migrar para produção (após aprovação)
npm run migrate-to-production missoes-gamificadas
```

**Regra de ouro**: 🚫 **NUNCA programar em `FrontOffice/` (pasta de referência)**

---

## 🌳 Estrutura de Branches

```
educacross-frontoffice (repo produção)
   └── main (código em produção)

Ambiente_de_Prototipacao_V5 (repo protótipos)
   ├── prototypes/as-is (baseline que replica produção)
   │   └── tags: as-is-v1.0, as-is-v1.1, as-is-v1.2
   │
   └── prototypes/feature/* (experimentos TO-BE)
       ├── prototypes/feature/missoes-gamificadas
       ├── prototypes/feature/calendario-interativo
       └── prototypes/feature/novo-sistema-avaliacao
```

### Tipos de Branch

| Branch | Propósito | Regra | Deploy |
|---|---|---|---|
| `prototypes/as-is` | Baseline fiel à produção | ❌ Nunca desenvolver aqui | ✅ Sim (validação) |
| `prototypes/feature/*` | Experimentos TO-BE | ✅ Desenvolver aqui | ✅ Sim (preview) |
| `main` | Desenvolvimento geral (não-protótipos) | ✅ Desenvolvimento normal | ✅ Sim |

---

## 🎯 Workflow Completo

### Fase 1: Criar Baseline AS-IS

**Quando**: Antes de qualquer protótipo, criar snapshot da produção.

```bash
# 1. Garantir que está na main
git checkout main
git pull origin main

# 2. Criar branch AS-IS (se não existir)
git checkout -b prototypes/as-is

# 3. Copiar código de produção (usar script)
npm run create-baseline nome-feature

# 4. Commit inicial
git add .
git commit -m "chore: create AS-IS baseline for nome-feature from educacross-frontoffice"

# 5. Tag de versão
git tag as-is-v1.0
git push origin prototypes/as-is --tags
```

**Script automático** (`scripts/create-baseline.sh`):
```bash
#!/bin/bash
FEATURE_NAME=$1

# Validações
if [ -z "$FEATURE_NAME" ]; then
  echo "Uso: npm run create-baseline <nome-feature>"
  exit 1
fi

# Criar branch
git checkout main
git checkout -b prototypes/as-is

# Copiar de FrontOffice (referência)
rsync -av --exclude='node_modules' --exclude='.git' \
  FrontOffice/src/ src/

# Commit
git add .
git commit -m "chore: create AS-IS baseline for $FEATURE_NAME"

# Tag
LATEST_TAG=$(git tag -l "as-is-v*" | sort -V | tail -n1)
if [ -z "$LATEST_TAG" ]; then
  NEW_TAG="as-is-v1.0"
else
  VERSION=$(echo $LATEST_TAG | sed 's/as-is-v//')
  NEW_VERSION=$(echo $VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
  NEW_TAG="as-is-v$NEW_VERSION"
fi

git tag $NEW_TAG
git push origin prototypes/as-is --tags

echo "✅ Baseline criado: $NEW_TAG"
```

---

### Fase 2: Criar Protótipo TO-BE

**Quando**: Para experimentar inovações a partir da baseline.

```bash
# 1. Partir do AS-IS
git checkout prototypes/as-is
git pull origin prototypes/as-is

# 2. Criar branch de feature
git checkout -b prototypes/feature/missoes-gamificadas

# 3. Desenvolver protótipo
# ... código Vue 3, componentes Atomic Design, etc.

# 4. Commits frequentes
git add src/views/missions/MissionsList.vue
git commit -m "feat: add gamification badges to missions list"

# 5. Push para deploy preview
git push origin prototypes/feature/missoes-gamificadas
```

**Convenções de commit**:
- `feat:` - Nova funcionalidade
- `refactor:` - Refatoração de código existente
- `style:` - Mudanças visuais (CSS, UI)
- `fix:` - Correção de bug
- `chore:` - Tarefas de manutenção

---

### Fase 3: Validação e Aprovação

**Quando**: Protótipo TO-BE pronto para revisão.

**Stakeholders**:
- Product Owner (valida requisitos)
- Designers (valida fidelidade visual)
- Desenvolvedores (code review)
- Usuários-piloto (testes de usabilidade)

**Checklist de Aprovação**:
- [ ] Deploy preview funcionando
- [ ] Testes com usuários-piloto realizados
- [ ] Feedback coletado e incorporado
- [ ] Code review aprovado
- [ ] Documentação atualizada (journeys + screenshots)
- [ ] Performance validada (Lighthouse score)
- [ ] Decisão: **APROVAR** ou **REJEITAR**

**Preview URL automática**:
```
https://ambiente-de-prototipacao-v5-{branch-name}.vercel.app
```

---

### Fase 4: Migração para Produção

**Quando**: Protótipo TO-BE aprovado e pronto para produção.

**Script automático** (`scripts/migrate-to-production.sh`):
```bash
#!/bin/bash
FEATURE_BRANCH=$1

# Validações
if [ -z "$FEATURE_BRANCH" ]; then
  echo "Uso: npm run migrate-to-production <nome-feature>"
  exit 1
fi

# Verificar se branch existe
git show-ref --verify --quiet refs/heads/prototypes/feature/$FEATURE_BRANCH
if [ $? -ne 0 ]; then
  echo "❌ Branch prototypes/feature/$FEATURE_BRANCH não encontrado"
  exit 1
fi

# 1. Checkout da feature
git checkout prototypes/feature/$FEATURE_BRANCH

# 2. Copiar para educacross-frontoffice
echo "📦 Copiando arquivos para ../educacross-frontoffice..."
rsync -av --exclude='node_modules' --exclude='.git' \
  src/ ../educacross-frontoffice/src/

# 3. Commit no repo de produção
cd ../educacross-frontoffice
git add .
git commit -m "feat: migrate $FEATURE_BRANCH prototype to production

Migrated from: Ambiente_de_Prototipacao_V5
Branch: prototypes/feature/$FEATURE_BRANCH
Date: $(date +%Y-%m-%d)"

# 4. Push para produção
git push origin main

# 5. Atualizar AS-IS baseline
cd ../Ambiente_de_Prototipacao_V5
git checkout prototypes/as-is

# Copiar código atualizado de produção
rsync -av --exclude='node_modules' --exclude='.git' \
  ../educacross-frontoffice/src/ src/

git add .
git commit -m "chore: update AS-IS baseline after $FEATURE_BRANCH migration"

# Tag nova versão
LATEST_TAG=$(git tag -l "as-is-v*" | sort -V | tail -n1)
VERSION=$(echo $LATEST_TAG | sed 's/as-is-v//')
NEW_VERSION=$(echo $VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
NEW_TAG="as-is-v$NEW_VERSION"

git tag $NEW_TAG
git push origin prototypes/as-is --tags

echo "✅ Migração completa!"
echo "   Produção: ../educacross-frontoffice"
echo "   Novo AS-IS: $NEW_TAG"

# 6. Deletar branch de feature (opcional)
read -p "Deletar branch prototypes/feature/$FEATURE_BRANCH? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git branch -D prototypes/feature/$FEATURE_BRANCH
  git push origin --delete prototypes/feature/$FEATURE_BRANCH
  echo "🗑️ Branch deletado"
fi
```

**Uso**:
```bash
npm run migrate-to-production missoes-gamificadas
```

---

### Fase 5: Atualização da Baseline

**Quando**: Após migração para produção, atualizar AS-IS.

```bash
# 1. Já feito pelo script migrate-to-production.sh
# 2. Verificar nova tag
git tag -l "as-is-v*"

# Output:
# as-is-v1.0
# as-is-v1.1  ← Nova tag
```

**Versionamento de tags**:
- `as-is-v1.0` - Baseline inicial
- `as-is-v1.1` - Após migração feature 1
- `as-is-v1.2` - Após migração feature 2
- `as-is-v2.0` - Breaking changes (ex: Vue 2 → Vue 3)

---

## 🚨 Regras Críticas

### ❌ Nunca Fazer

1. **Programar em `FrontOffice/` diretamente**
   ```bash
   # ❌ ERRADO
   code FrontOffice/src/views/Calendar.vue
   ```
   ☝️ `FrontOffice/` é **SOMENTE PARA CONSULTA** de referência.

2. **Desenvolver em `prototypes/as-is`**
   ```bash
   # ❌ ERRADO
   git checkout prototypes/as-is
   # ... fazer alterações ...
   git commit -m "feat: new feature"
   ```
   ☝️ AS-IS é **READ-ONLY** (exceto para atualizações pós-migração).

3. **Merge de feature para AS-IS**
   ```bash
   # ❌ ERRADO
   git checkout prototypes/as-is
   git merge prototypes/feature/missoes-gamificadas
   ```
   ☝️ AS-IS só atualiza copiando de produção.

4. **Commits sem prefixo semântico**
   ```bash
   # ❌ ERRADO
   git commit -m "updated calendar"
   
   # ✅ CORRETO
   git commit -m "feat: add event filtering to calendar"
   ```

### ✅ Sempre Fazer

1. **Criar feature branch a partir de AS-IS**
   ```bash
   git checkout prototypes/as-is
   git checkout -b prototypes/feature/nome-feature
   ```

2. **Deploy preview antes de code review**
   ```bash
   git push origin prototypes/feature/nome-feature
   # → Gera URL: https://...vercel.app
   # → Compartilhar com stakeholders
   ```

3. **Documentar decisões em commits**
   ```bash
   git commit -m "refactor: extract DayCell atom from CalendarGrid

   ANTES: CalendarGrid tinha 36x36px cell inline
   DEPOIS: DayCell reutilizável em atoms/
   
   DECISÃO: Atomic Design guideline - células devem ser átomos
   REF: ATOMIC-DESIGN.md linha 45"
   ```

4. **Atualizar documentação junto com código**
   ```bash
   git add src/components/organisms/CalendarGrid.vue
   git add documentation/docs/journeys/PROF-001-calendario.md
   git commit -m "feat: add event filtering to CalendarGrid

   - Added filter by activity type (missao, olimpiada, avaliacao)
   - Updated PROF-001 journey with new screenshots
   - Added FilterLegend molecule"
   ```

---

## 📁 Estrutura de Pastas

```
Ambiente_de_Prototipacao_V5/
├── src/                        # ✅ Desenvolver aqui
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── views/
│   ├── router/
│   └── data/
│
├── FrontOffice/                # ❌ SOMENTE CONSULTA
│   └── src/                    # Arquivos de referência
│       ├── components/         # Ver estrutura de produção
│       └── views/              # Ver jornadas implementadas
│
├── documentation/              # ✅ Atualizar junto com protótipos
│   └── docs/
│       └── journeys/           # Screenshots + jornadas documentadas
│
├── .github/
│   └── workflows/
│       └── deploy-preview.yml  # CI/CD automático
│
└── scripts/
    ├── create-baseline.sh      # Criar AS-IS
    └── migrate-to-production.sh # Migrar TO-BE → produção
```

---

## 🔄 Fluxograma Visual

```
┌─────────────────────────────────────────────────────────────┐
│  PRODUÇÃO (educacross-frontoffice)                          │
│  ┌────────────┐                                             │
│  │    main    │ ← Código em produção (Vue 2.7, Bootstrap)  │
│  └─────┬──────┘                                             │
└────────┼────────────────────────────────────────────────────┘
         │ rsync (copiar para baseline)
         ▼
┌─────────────────────────────────────────────────────────────┐
│  PROTOTIPAÇÃO (Ambiente_de_Prototipacao_V5)                 │
│  ┌──────────────────┐                                       │
│  │ prototypes/as-is │ ← Baseline (tags: v1.0, v1.1, ...)   │
│  └────────┬─────────┘                                       │
│           │ git checkout -b                                 │
│           │                                                 │
│           ▼                                                 │
│  ┌──────────────────────────────────────┐                  │
│  │ prototypes/feature/missoes-gamif.    │ ← Protótipo TO-BE│
│  │ prototypes/feature/calendario-v2     │                  │
│  │ prototypes/feature/avaliacoes-novas  │                  │
│  └────────┬─────────────────────────────┘                  │
│           │ git push → Deploy Preview                       │
│           │ https://...vercel.app                           │
│           │                                                 │
│           │ ✅ APROVADO?                                    │
│           │                                                 │
│           ▼                                                 │
│  ┌──────────────────────┐                                  │
│  │ migrate-to-production│ ← Script rsync                   │
│  └────────┬─────────────┘                                  │
└───────────┼─────────────────────────────────────────────────┘
            │ rsync (copiar para produção)
            ▼
┌─────────────────────────────────────────────────────────────┐
│  PRODUÇÃO (educacross-frontoffice)                          │
│  ┌────────────┐                                             │
│  │    main    │ ← Novo código em produção                  │
│  └─────┬──────┘                                             │
└────────┼────────────────────────────────────────────────────┘
         │ rsync (atualizar baseline)
         ▼
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐                                       │
│  │ prototypes/as-is │ ← Atualizado, nova tag as-is-v1.2    │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 Casos de Uso Reais

### Caso 1: Prototipar Nova Feature do Zero

**Contexto**: Criar sistema de gamificação para missões.

**Passo a passo**:
```bash
# 1. Criar baseline (se não existir)
npm run create-baseline gamificacao-missoes

# 2. Criar branch TO-BE
git checkout prototypes/as-is
git checkout -b prototypes/feature/missoes-gamificadas

# 3. Desenvolver
mkdir -p src/components/organisms/GameBadges
code src/components/organisms/GameBadges/BadgeDisplay.vue
code src/views/missions/MissionsListGamified.vue

# 4. Commits
git add .
git commit -m "feat: add badge display organism for gamification

- Created BadgeDisplay.vue organism
- Added bronze/silver/gold badge variants
- Integrated with missions list view
- REF: PRD-gamificacao.md"

# 5. Deploy preview
git push origin prototypes/feature/missoes-gamificadas
# URL gerada: https://ambiente-de-prototipacao-v5-missoes-gamificadas.vercel.app

# 6. Compartilhar com PO e designers
# 7. Iterar baseado em feedback
# 8. Após aprovação, migrar
npm run migrate-to-production missoes-gamificadas
```

---

### Caso 2: Refatorar Feature Existente

**Contexto**: Melhorar calendário existente com Atomic Design.

**Passo a passo**:
```bash
# 1. Partir do AS-IS
git checkout prototypes/as-is
git checkout -b prototypes/feature/calendario-atomic-refactor

# 2. Consultar FrontOffice/ para ver implementação atual
ls FrontOffice/src/views/teacher/Calendar.vue
code FrontOffice/src/views/teacher/Calendar.vue  # READ-ONLY

# 3. Refatorar aplicando Atomic Design
code src/components/atoms/DayCell.vue
code src/components/molecules/WeekRow.vue
code src/components/organisms/CalendarGrid.vue

# 4. Commits com ANTES/DEPOIS
git commit -m "refactor: extract DayCell atom from Calendar

ANTES:
- CalendarGrid.vue: 563 linhas, células inline
- Duplicação de estilos 36x36px em 3 lugares

DEPOIS:
- DayCell.vue: 160 linhas (átomo reutilizável)
- WeekRow.vue: 80 linhas (molécula com 7 DayCells)
- CalendarGrid.vue: 291 linhas (organismo simplificado)

MELHORIA:
- -272 linhas totais
- +3 componentes reutilizáveis
- Props tipadas com validation
- Estilos BEM com scoped

REF: ATOMIC-DESIGN.md, DayCell specs linha 45-78"

# 5. Deploy preview
git push origin prototypes/feature/calendario-atomic-refactor

# 6. Validar com designers (fidelidade pixel-perfect)
# 7. Code review com equipe dev
# 8. Migrar
npm run migrate-to-production calendario-atomic-refactor
```

---

### Caso 3: Protótipo Rejeitado

**Contexto**: Protótipo de novo sistema de avaliações rejeitado após testes.

**Passo a passo**:
```bash
# 1. Protótipo desenvolvido
git checkout prototypes/feature/avaliacoes-quiz-interativo

# 2. Deploy preview testado
# URL: https://...vercel.app

# 3. Feedback dos usuários-piloto:
#    - Interface confusa
#    - Performance ruim (carrega muito lento)
#    - Não atende requisito X

# 4. DECISÃO: Rejeitar protótipo

# 5. Documentar decisão
git checkout prototypes/feature/avaliacoes-quiz-interativo
echo "## Decisão: REJEITADO

Data: 2024-01-15
Motivo: Feedback negativo de usuários-piloto

Problemas identificados:
- Interface confusa (5/7 usuários não conseguiram completar tarefa)
- Performance: Lighthouse score 32/100
- Não atende requisito: suporte offline

Lições aprendidas:
- Testar com usuários mais cedo no processo
- Implementar lazy loading para imagens
- Considerar PWA desde o início

Próximos passos:
- Criar novo protótipo com abordagem diferente
- Focar em simplicidade e performance

" > REJECTED_REPORT.md

git add REJECTED_REPORT.md
git commit -m "docs: document rejection of quiz-interativo prototype"
git push

# 6. Arquivar branch (não deletar - aprendizados)
git checkout main
git tag prototype-archived/avaliacoes-quiz-interativo prototypes/feature/avaliacoes-quiz-interativo
git push origin --tags

# 7. Deletar branch (opcional)
git branch -D prototypes/feature/avaliacoes-quiz-interativo
git push origin --delete prototypes/feature/avaliacoes-quiz-interativo

# 8. Criar novo protótipo com lições aprendidas
git checkout prototypes/as-is
git checkout -b prototypes/feature/avaliacoes-simples-v2
```

---

## 🤖 Automação CI/CD

### Deploy Preview Automático

**Arquivo**: `.github/workflows/deploy-preview.yml`

```yaml
name: Deploy Preview

on:
  push:
    branches:
      - 'prototypes/feature/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Comment PR with preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Deploy preview ready!\n\nURL: https://ambiente-de-prototipacao-v5-${context.ref}.vercel.app`
            })
```

---

## 📊 Métricas e Relatórios

### Tracking de Protótipos

**Criar dashboard em `docs/PROTOTYPES_TRACKER.md`**:

```markdown
# Tracker de Protótipos

| Feature | Branch | Status | Preview URL | Aprovado? | Migrado em |
|---|---|---|---|---|---|
| Missões Gamificadas | `prototypes/feature/missoes-gamificadas` | ✅ Completo | [Link](https://...vercel.app) | ✅ Sim | 2024-01-10 |
| Calendário Atomic | `prototypes/feature/calendario-atomic-refactor` | ✅ Completo | [Link](https://...vercel.app) | ✅ Sim | 2024-01-15 |
| Quiz Interativo | `prototypes/feature/avaliacoes-quiz-interativo` | ⛔ Rejeitado | [Link](https://...vercel.app) | ❌ Não | - |
| Sistema Avaliações V2 | `prototypes/feature/avaliacoes-simples-v2` | 🚧 Em desenvolvimento | [Link](https://...vercel.app) | ⏳ Aguardando | - |
```

### Relatório de Ciclo

```bash
# Script para gerar relatório
git log --oneline --graph --all --grep="migrate" --since="1 month ago"

# Output:
* a3f9b21 (tag: as-is-v1.2) chore: update AS-IS baseline after calendario-atomic-refactor migration
* 8e4c2a1 feat: migrate calendario-atomic-refactor prototype to production
* d1b5f3e (tag: as-is-v1.1) chore: update AS-IS baseline after missoes-gamificadas migration
* 4a2e8c9 feat: migrate missoes-gamificadas prototype to production

# Estatísticas
git log --since="1 month ago" prototypes/feature/* --format='%h' | wc -l
# 127 commits em prototypes/feature/ no último mês
```

---

## ❓ FAQ

### P: Quando criar uma nova branch `prototypes/as-is`?
**R**: Nunca criar múltiplas `as-is`. Existe **apenas UMA** branch `prototypes/as-is` que é atualizada após cada migração. Use tags (`as-is-v1.0`, `as-is-v1.1`) para versionar.

### P: Como testar protótipos localmente?
**R**: 
```bash
git checkout prototypes/feature/nome-feature
npm run dev  # http://localhost:5173
```

### P: E se precisar fazer hotfix em produção durante desenvolvimento do protótipo?
**R**: Hotfix vai direto em `educacross-frontoffice/main`. Depois, sincronizar AS-IS:
```bash
cd educacross-frontoffice
git checkout main
# ... hotfix ...
git commit -m "fix: critical bug"
git push

cd ../Ambiente_de_Prototipacao_V5
git checkout prototypes/as-is
rsync -av ../educacross-frontoffice/src/ src/
git commit -m "chore: sync AS-IS with hotfix from production"
git push
```

### P: Posso criar protótipos sem AS-IS (diretamente de `main`)?
**R**: ✅ Sim, se não envolver código de produção. Exemplo: prototipar nova página 100% do zero.
```bash
git checkout main
git checkout -b prototypes/feature/novo-dashboard
```

### P: Como reverter um protótipo já migrado?
**R**: 
```bash
# 1. Encontrar tag anterior
git tag -l "as-is-v*"
# as-is-v1.0  ← Versão antes da migração problemática
# as-is-v1.1  ← Versão com protótipo problemático

# 2. Restaurar versão anterior
git checkout as-is-v1.0
rsync -av src/ ../educacross-frontoffice/src/

cd ../educacross-frontoffice
git add .
git commit -m "revert: rollback to as-is-v1.0 (before feature X)"
git push origin main
```

### P: Diferença entre `prototypes/feature/*` e branches normais de feature?
**R**:
- `prototypes/feature/*`: Experimentos TO-BE, podem ser descartados
- `feature/*` (normal): Features definitivas para `main`, sempre serão mergeadas

---

## 🔗 Recursos

- [PROTOTYPES-WORKFLOW.md](../../../PROTOTYPES-WORKFLOW.md) - Documento completo original (578 linhas)
- [scripts/create-baseline.sh](../scripts/create-baseline.sh) - Script de criação de baseline
- [scripts/migrate-to-production.sh](../scripts/migrate-to-production.sh) - Script de migração
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/) - Conceitos de Git flow
- [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) - Padrões de commit

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
