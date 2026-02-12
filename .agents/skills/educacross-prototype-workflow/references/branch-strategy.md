# Estratégia de Branches - Educacross Prototype Workflow

Documentação detalhada do modelo de branches para prototipação AS-IS/TO-BE.

---

## Modelo de Branches

### Branch `prototypes/as-is`

**Propósito**: Representa a baseline fiel ao código em produção (`educacross-frontoffice/main`).

**Características**:
- **READ-ONLY** para desenvolvimento
- Atualizada SOMENTE após migrações para produção
- Versionada com tags semânticas (`as-is-v1.0`, `as-is-v1.1`, ...)
- Deploy automático para validação

**Quando criar**:
- Uma única vez no início do projeto de prototipação
- **NUNCA** criar múltiplas branches `as-is`

**Quando atualizar**:
- Após migração bem-sucedida de protótipo TO-BE para produção
- Após hotfixes diretos em produção
- Sincronização manual quando necessário

**Comandos**:
```bash
# Criar (primeira vez)
git checkout -b prototypes/as-is
rsync -av ../educacross-frontoffice/src/ src/
git add .
git commit -m "chore: create initial AS-IS baseline"
git tag as-is-v1.0
git push origin prototypes/as-is --tags

# Atualizar (após migração)
git checkout prototypes/as-is
rsync -av ../educacross-frontoffice/src/ src/
git add .
git commit -m "chore: update AS-IS baseline after feature-x migration"
git tag as-is-v1.1
git push origin prototypes/as-is --tags
```

---

### Branches `prototypes/feature/*`

**Propósito**: Experimentos TO-BE (estado futuro desejado).

**Características**:
- Criadas a partir de `prototypes/as-is`
- Development ativo permitido
- Deploy automático gera preview URL
- Podem ser descartadas se rejeitadas
- Migradas para produção se aprovadas

**Naming convention**:
```bash
prototypes/feature/<nome-descritivo>

# Exemplos:
prototypes/feature/missoes-gamificadas
prototypes/feature/calendario-atomic-refactor
prototypes/feature/avaliacoes-quiz-interativo
prototypes/feature/dashboard-professor-v2
```

**Lifecycle**:
1. **Criação** (branch de `as-is`)
2. **Desenvolvimento** (commits frequentes)
3. **Preview** (deploy automático)
4. **Validação** (testes com usuários)
5. **Aprovação** ou **Rejeição**
6. **Migração** (se aprovado) ou **Arquivamento** (se rejeitado)
7. **Deleção** (após migração/arquivamento)

**Comandos**:
```bash
# 1. Criar
git checkout prototypes/as-is
git checkout -b prototypes/feature/missoes-gamificadas

# 2. Desenvolver
git add src/components/organisms/MissionsList.vue
git commit -m "feat: add gamification badges"

# 3. Push (gera preview)
git push origin prototypes/feature/missoes-gamificadas
# URL: https://ambiente-de-prototipacao-v5-missoes-gamificadas.vercel.app

# 4. Migrar (se aprovado)
npm run migrate-to-production missoes-gamificadas

# 5. Deletar (após migração)
git branch -D prototypes/feature/missoes-gamificadas
git push origin --delete prototypes/feature/missoes-gamificadas
```

---

### Branch `main`

**Propósito**: Desenvolvimento geral (não-protótipos).

**Características**:
- Branch principal do repositório
- Usado para features definitivas
- Merge direto sem processo de prototipação
- Deploy separado (não conflita com prototypes/)

**Quando usar**:
- Documentação (README, guides)
- Infraestrutura (CI/CD, configs)
- Features 100% novas (não refatoram código de produção)
- Correções de bugs no ambiente de prototipação

**Comandos**:
```bash
git checkout main
git checkout -b feature/novo-dashboard-analytics
# ... desenvolvimento ...
git push origin feature/novo-dashboard-analytics
# ... pull request ...
git checkout main
git merge feature/novo-dashboard-analytics
```

---

## Fluxo de Dados

```
PRODUÇÃO (educacross-frontoffice)
   ↓ rsync (copiar código)
as-is
   ↓ git checkout -b
feature/*
   ↓ npm run migrate-to-production
PRODUÇÃO (educacross-frontoffice)
   ↓ rsync (atualizar baseline)
as-is (nova tag as-is-v1.x)
```

---

## Estratégia de Tags

### Tags `as-is-v*`

**Formato**: `as-is-v<MAJOR>.<MINOR>`

**Versionamento**:
- `MAJOR`: Breaking changes (ex: Vue 2 → Vue 3, Bootstrap → Tailwind)
- `MINOR`: Features migradas, hotfixes, refactorings

**Exemplos**:
```bash
as-is-v1.0  # Baseline inicial (snapshot produção em 2024-01-01)
as-is-v1.1  # Após migração: missoes-gamificadas
as-is-v1.2  # Após hotfix: bug crítico calendário
as-is-v1.3  # Após migração: calendario-atomic-refactor
as-is-v2.0  # Breaking change: migração Vue 2 → Vue 3
```

**Uso**:
```bash
# Listar tags
git tag -l "as-is-v*"

# Checkout de versão específica
git checkout as-is-v1.2

# Comparar versões
git diff as-is-v1.0..as-is-v1.3

# Criar nova tag
git tag as-is-v1.4
git push origin --tags
```

### Tags `prototype-archived/*`

**Formato**: `prototype-archived/<nome-feature>`

**Propósito**: Preservar histórico de protótipos rejeitados para lições aprendidas.

**Exemplos**:
```bash
prototype-archived/avaliacoes-quiz-interativo
prototype-archived/dashboard-3d-experimental
prototype-archived/chat-realtime-v1
```

**Uso**:
```bash
# Arquivar protótipo rejeitado
git tag prototype-archived/avaliacoes-quiz-interativo prototypes/feature/avaliacoes-quiz-interativo
git push origin --tags

# Deletar branch (após arquivar)
git branch -D prototypes/feature/avaliacoes-quiz-interativo
git push origin --delete prototypes/feature/avaliacoes-quiz-interativo

# Recuperar para análise
git checkout prototype-archived/avaliacoes-quiz-interativo
```

---

## Proteção de Branches

### Regras para `prototypes/as-is`

**GitHub Settings → Branches → Branch protection rules**:

```yaml
Branch name pattern: prototypes/as-is

Protections:
  ✅ Require pull request reviews before merging
     - Required approving reviews: 1
     - Dismiss stale pull request approvals when new commits are pushed
  
  ✅ Require status checks to pass before merging
     - Require branches to be up to date before merging
     - Status checks: build, test
  
  ✅ Require conversation resolution before merging
  
  ✅ Require signed commits
  
  ✅ Include administrators (forçar regras para admins também)
  
  ✅ Restrict who can push to matching branches
     - Apenas: @tech-lead, @ci-bot
```

**Objetivo**: Prevenir commits acidentais direto em `as-is`.

---

### Regras para `prototypes/feature/*`

```yaml
Branch name pattern: prototypes/feature/*

Protections:
  ✅ Require status checks to pass before merging
     - Status checks: build, test, lighthouse
  
  ⬜ Require pull request reviews (não obrigatório - protótipos)
  
  ✅ Require conversation resolution before merging
```

**Objetivo**: Permitir desenvolvimento rápido mas com qualidade mínima.

---

## Hooks Git

### Pre-commit Hook

**Arquivo**: `.git/hooks/pre-commit`

```bash
#!/bin/bash

# Prevenir commits diretos em prototypes/as-is
BRANCH=$(git symbolic-ref --short HEAD)

if [ "$BRANCH" = "prototypes/as-is" ]; then
  echo "❌ ERRO: Commits diretos em 'prototypes/as-is' não são permitidos!"
  echo "   Use 'npm run create-baseline' ou 'npm run migrate-to-production'"
  exit 1
fi

# Validar formato de commit message (semantic commits)
COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

if ! echo "$COMMIT_MSG" | grep -Eq '^(feat|fix|refactor|style|chore|docs): '; then
  echo "❌ ERRO: Commit message deve seguir formato semântico:"
  echo "   feat: descrição"
  echo "   fix: descrição"
  echo "   refactor: descrição"
  echo "   style: descrição"
  echo "   chore: descrição"
  echo "   docs: descrição"
  exit 1
fi

exit 0
```

**Instalação**:
```bash
chmod +x .git/hooks/pre-commit
```

---

### Pre-push Hook

**Arquivo**: `.git/hooks/pre-push`

```bash
#!/bin/bash

# Prevenir push de branches feature/* para prototypes/as-is
BRANCH=$(git symbolic-ref --short HEAD)
REMOTE_BRANCH=$2

if [ "$BRANCH" = "prototypes/as-is" ]; then
  echo "⚠️  ATENÇÃO: Fazendo push para 'prototypes/as-is'"
  echo "   Confirme que está atualizando baseline após migração."
  read -p "   Continuar? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

exit 0
```

---

## Sincronização Between Repos

### Script de Sincronização Manual

**Arquivo**: `scripts/sync-from-production.sh`

```bash
#!/bin/bash

# Sincroniza AS-IS com produção manualmente

set -e

echo "🔄 Sincronizando prototypes/as-is com educacross-frontoffice/main..."

# Validar que repos existem
if [ ! -d "../educacross-frontoffice" ]; then
  echo "❌ Repositório educacross-frontoffice não encontrado em ../educacross-frontoffice"
  exit 1
fi

# Checkout as-is
git checkout prototypes/as-is

# Backup local (caso algo dê errado)
git branch backup/as-is-$(date +%Y%m%d%H%M%S)

# Copiar de produção
echo "📦 Copiando arquivos de ../educacross-frontoffice/src..."
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='.env*' \
  ../educacross-frontoffice/src/ src/

# Verificar mudanças
if git diff --quiet; then
  echo "✅ Nenhuma mudança detectada. AS-IS já está sincronizado."
  exit 0
fi

# Mostrar mudanças
echo "
📊 Mudanças detectadas:"
git status --short

# Confirmar commit
read -p "Commitar mudanças? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Sincronização cancelada."
  git checkout .
  exit 1
fi

# Commit
TODAY=$(date +%Y-%m-%d)
git add .
git commit -m "chore: sync AS-IS with production (manual sync $TODAY)"

# Nova tag
LATEST_TAG=$(git tag -l "as-is-v*" | sort -V | tail -n1)
if [ -z "$LATEST_TAG" ]; then
  NEW_TAG="as-is-v1.0"
else
  VERSION=$(echo $LATEST_TAG | sed 's/as-is-v//')
  NEW_VERSION=$(echo $VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
  NEW_TAG="as-is-v$NEW_VERSION"
fi

git tag $NEW_TAG

echo "
✅ Sincronização completa!"
echo "   Commit: $(git rev-parse --short HEAD)"
echo "   Tag: $NEW_TAG"
echo ""
read -p "Fazer push? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push origin prototypes/as-is --tags
  echo "✅ Push completo!"
else
  echo "⚠️  Lembre-se de fazer push manualmente:"
  echo "   git push origin prototypes/as-is --tags"
fi
```

**Uso**:
```bash
npm run sync-from-production
# ou
bash scripts/sync-from-production.sh
```

---

## Troubleshooting

### Problema: Commit acidental em `prototypes/as-is`

**Solução**:
```bash
# 1. Reverter último commit (não pushed)
git reset HEAD~1

# 2. Criar branch feature correta
git checkout -b prototypes/feature/nome-feature

# 3. Refazer commit
git add .
git commit -m "feat: descrição"
git push origin prototypes/feature/nome-feature
```

---

### Problema: Push acidental em `prototypes/as-is`

**Solução**:
```bash
# 1. Reverter commit remoto
git checkout prototypes/as-is
git reset --hard HEAD~1
git push origin prototypes/as-is --force

# 2. Notificar equipe
echo "⚠️  ALERTA: Revertido push acidental em prototypes/as-is"
```

---

### Problema: Conflito de merge ao atualizar AS-IS

**Solução**:
```bash
# NÃO resolver conflito - substituir completamente
git checkout prototypes/as-is

# Substituir tudo com produção (force)
rsync -av --delete ../educacross-frontoffice/src/ src/

git add .
git commit -m "chore: force sync AS-IS with production (resolved conflicts by overwriting)"
```

---

## Checklist de Conformidade

### ✅ Branch `prototypes/as-is`

- [ ] Tag presente para cada versão (`as-is-v1.0`, `as-is-v1.1`, ...)
- [ ] Commits SOMENTE de tipo `chore: sync...` ou `chore: update...`
- [ ] Código idêntico a `educacross-frontoffice/main` (verificar com `rsync --dry-run`)
- [ ] Proteção de branch ativa no GitHub
- [ ] Pre-commit hook instalado

### ✅ Branches `prototypes/feature/*`

- [ ] Naming convention: `prototypes/feature/<nome-descritivo>`
- [ ] Criadas a partir de `prototypes/as-is` (não de `main`)
- [ ] Commits semânticos (`feat:`, `fix:`, `refactor:`, etc.)
- [ ] Deploy preview funcionando
- [ ] Documentação atualizada (journeys + screenshots)
- [ ] Code review aprovado antes de migração

### ✅ Processo de Migração

- [ ] Script `migrate-to-production.sh` executado
- [ ] Código copiado para `educacross-frontoffice`
- [ ] Testes de regressão rodados em produção
- [ ] AS-IS atualizado com nova tag
- [ ] Branch feature deletada
- [ ] Documentação de migração commitada

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0