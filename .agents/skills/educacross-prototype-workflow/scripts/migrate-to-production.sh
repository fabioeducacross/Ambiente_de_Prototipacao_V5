#!/bin/bash

##############################################################################
# Script: migrate-to-production.sh
# Propósito: Migrar protótipo TO-BE aprovado para produção
# Uso: npm run migrate-to-production <feature-name>
#      bash scripts/migrate-to-production.sh missoes-gamificadas
##############################################################################

set -e  # Exit no erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Função: imprimir com cor
print_color() {
  local color=$1
  shift
  echo -e "${color}$@${NC}"
}

# Função: validar argumentos
validate_args() {
  if [ -z "$1" ]; then
    print_color $RED "❌ ERRO: Nome da feature não fornecido"
    echo ""
    echo "Uso:"
    echo "  npm run migrate-to-production <feature-name>"
    echo "  bash scripts/migrate-to-production.sh missoes-gamificadas"
    echo ""
    exit 1
  fi
}

# Função: validar repositório de produção
validate_production_repo() {
  if [ ! -d "../educacross-frontoffice" ]; then
    print_color $RED "❌ ERRO: Repositório educacross-frontoffice não encontrado"
    echo ""
    echo "Esperado em: ../educacross-frontoffice"
    echo ""
    exit 1
  fi
}

# Função: validar branch de feature
validate_feature_branch() {
  local feature_branch=$1
  
  if ! git show-ref --verify --quiet refs/heads/prototypes/feature/$feature_branch; then
    print_color $RED "❌ ERRO: Branch 'prototypes/feature/$feature_branch' não encontrada"
    echo ""
    echo "Branches disponíveis:"
    git branch -a | grep "prototypes/feature/" | sed 's/.*prototypes\/feature\//  - /'
    echo ""
    exit 1
  fi
}

# Função: verificar se há alterações não commitadas
check_clean_working_tree() {
  if ! git diff-index --quiet HEAD --; then
    print_color $RED "❌ ERRO: Working tree não está limpo"
    echo ""
    echo "Há alterações não commitadas:"
    git status --short
    echo ""
    echo "Por favor, commite ou descarte as alterações antes de migrar."
    exit 1
  fi
}

# Função: mostrar resumo do protótipo
show_prototype_summary() {
  local feature_branch=$1
  
  print_color $BLUE "📊 Resumo do Protótipo"
  echo ""
  echo "Feature: $feature_branch"
  echo "Branch: prototypes/feature/$feature_branch"
  echo ""
  
  # Commits da feature
  local commit_count=$(git log prototypes/as-is..prototypes/feature/$feature_branch --oneline | wc -l)
  echo "Commits: $commit_count"
  echo ""
  
  print_color $YELLOW "🔍 Últimos 5 commits:"
  git log prototypes/as-is..prototypes/feature/$feature_branch --oneline --decorate --color=always | head -n 5
  echo ""
  
  # Arquivos alterados
  local files_changed=$(git diff --name-only prototypes/as-is prototypes/feature/$feature_branch | wc -l)
  echo "Arquivos alterados: $files_changed"
  echo ""
  
  print_color $YELLOW "🔍 Arquivos alterados (primeiros 10):"
  git diff --name-status prototypes/as-is prototypes/feature/$feature_branch | head -n 10
  if [ $files_changed -gt 10 ]; then
    echo "   ... e mais $((files_changed - 10)) arquivos"
  fi
  echo ""
}

# Função: confirmar migração
confirm_migration() {
  local feature_branch=$1
  
  print_color $MAGENTA "⚠️  ATENÇÃO: Esta operação irá:"
  echo "   1. Copiar código de prototypes/feature/$feature_branch para ../educacross-frontoffice"
  echo "   2. Commitar no repositório de PRODUÇÃO"
  echo "   3. Fazer push para educacross-frontoffice/main"
  echo "   4. Atualizar prototypes/as-is com nova tag"
  echo ""
  
  read -p "$(print_color $YELLOW 'Confirma migração para PRODUÇÃO? (yes/no) ')" -r
  echo
  
  if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    print_color $BLUE "ℹ️  Migração cancelada"
    exit 0
  fi
}

# Função: checkout feature branch
checkout_feature() {
  local feature_branch=$1
  
  print_color $BLUE "📝 Fazendo checkout de prototypes/feature/$feature_branch..."
  
  git checkout prototypes/feature/$feature_branch
  git pull origin prototypes/feature/$feature_branch
  
  print_color $GREEN "✅ Checkout completo"
}

# Função: copiar para produção
copy_to_production() {
  local feature_branch=$1
  
  print_color $BLUE "📦 Copiando arquivos para ../educacross-frontoffice/src..."
  
  # rsync com exclusões
  rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.env*' \
    --exclude='*.log' \
    src/ ../educacross-frontoffice/src/
  
  print_color $GREEN "✅ Arquivos copiados com sucesso"
  echo ""
  
  # Mostrar alterações no repo de produção
  cd ../educacross-frontoffice
  
  if git diff --quiet; then
    print_color $YELLOW "⚠️  Nenhuma alteração detectada. Código já está em produção?"
    return 1
  fi
  
  print_color $BLUE "📊 Resumo das alterações em produção:"
  git status --short | head -n 20
  
  local total_changes=$(git status --short | wc -l)
  if [ $total_changes -gt 20 ]; then
    echo "   ... e mais $((total_changes - 20)) arquivos"
  fi
  echo ""
  
  return 0
}

# Função: commitar em produção
commit_to_production() {
  local feature_branch=$1
  
  print_color $BLUE "💾 Commitando em educacross-frontoffice..."
  
  cd ../educacross-frontoffice
  
  local commit_msg="feat: migrate $feature_branch prototype to production

Migrated from: Ambiente_de_Prototipacao_V5
Branch: prototypes/feature/$feature_branch
Date: $(date '+%Y-%m-%d %H:%M:%S')

This migration includes all changes from the approved TO-BE prototype.
"
  
  git add .
  git commit -m "$commit_msg"
  
  local commit_hash=$(git rev-parse --short HEAD)
  print_color $GREEN "✅ Commit criado: $commit_hash"
  
  echo $commit_hash
}

# Função: push para produção
push_to_production() {
  print_color $BLUE "🚀 Fazendo push para educacross-frontoffice/main..."
  
  cd ../educacross-frontoffice
  
  git push origin main
  
  print_color $GREEN "✅ Push para produção completo!"
}

# Função: atualizar baseline AS-IS
update_as_is_baseline() {
  local feature_branch=$1
  
  print_color $BLUE "🔄 Atualizando baseline prototypes/as-is..."
  
  cd ../Ambiente_de_Prototipacao_V5
  
  # Checkout as-is
  git checkout prototypes/as-is
  
  # Copiar código atualizado de produção
  rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.env*' \
    --exclude='*.log' \
    ../educacross-frontoffice/src/ src/
  
  # Commitar
  git add .
  git commit -m "chore: update AS-IS baseline after $feature_branch migration

Synchronized with educacross-frontoffice/main after successful migration."
  
  print_color $GREEN "✅ AS-IS atualizado"
}

# Função: criar nova tag AS-IS
create_as_is_tag() {
  local feature_branch=$1
  
  print_color $BLUE "🏷️  Criando nova tag AS-IS..."
  
  # Buscar última tag
  local latest_tag=$(git tag -l "as-is-v*" | sort -V | tail -n1)
  
  if [ -z "$latest_tag" ]; then
    local new_tag="as-is-v1.0"
  else
    local version=$(echo $latest_tag | sed 's/as-is-v//')
    local new_version=$(echo $version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    local new_tag="as-is-v$new_version"
  fi
  
  git tag $new_tag
  
  print_color $GREEN "✅ Nova tag criada: $new_tag"
  
  echo $new_tag
}

# Função: push AS-IS atualizado
push_as_is() {
  local new_tag=$1
  
  print_color $BLUE "🚀 Fazendo push de prototypes/as-is..."
  
  git push origin prototypes/as-is --tags
  
  print_color $GREEN "✅ AS-IS sincronizado com tag $new_tag"
}

# Função: deletar branch de feature
delete_feature_branch() {
  local feature_branch=$1
  
  echo ""
  read -p "$(print_color $YELLOW 'Deletar branch prototypes/feature/'$feature_branch'? (y/n) ')" -n 1 -r
  echo
  
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_color $BLUE "ℹ️  Branch mantida"
    return
  fi
  
  print_color $BLUE "🗑️  Deletando branch..."
  
  # Checkout para main primeiro
  git checkout main
  
  # Deletar local
  git branch -D prototypes/feature/$feature_branch
  
  # Deletar remoto
  git push origin --delete prototypes/feature/$feature_branch
  
  print_color $GREEN "✅ Branch deletada"
}

# Função: gerar relatório final
generate_report() {
  local feature_branch=$1
  local production_commit=$2
  local new_tag=$3
  
  echo ""
  echo "======================================================================="
  print_color $GREEN "🎉 MIGRAÇÃO COMPLETA!"
  echo "======================================================================="
  echo ""
  echo "📌 Detalhes da Migração:"
  echo ""
  echo "   Feature: $feature_branch"
  echo "   Branch original: prototypes/feature/$feature_branch"
  echo ""
  echo "   ✅ Produção (educacross-frontoffice):"
  echo "      Commit: $production_commit"
  echo "      Branch: main"
  echo ""
  echo "   ✅ Baseline (Ambiente_de_Prototipacao_V5):"
  echo "      Branch: prototypes/as-is"
  echo "      Nova tag: $new_tag"
  echo ""
  echo "======================================================================="
  echo ""
  print_color $BLUE "🔗 Próximos passos:"
  echo ""
  echo "   1. Verificar deploy de produção:"
  echo "      https://educacross.com.br"
  echo ""
  echo "   2. Monitorar erros (Sentry, logs):"
  echo "      Primeiras 24h críticas"
  echo ""
  echo "   3. Comunicar aos stakeholders:"
  echo "      - Product Owner"
  echo "      - Equipe de QA"
  echo "      - Usuários-piloto"
  echo ""
  echo "   4. Atualizar documentação:"
  echo "      - Journeys (screenshots atualizados)"
  echo "      - Release notes"
  echo "      - Changelog"
  echo ""
  print_color $YELLOW "⚠️  Rollback (se necessário):"
  echo "   git checkout as-is-v<versão-anterior>"
  echo "   npm run migrate-to-production <nome-reverso>"
  echo ""
}

##############################################################################
# MAIN
##############################################################################

main() {
  local feature_branch=$1
  
  print_color $BLUE "🚀 Educacross Prototype Migration Tool"
  echo ""
  
  # Validações
  validate_args "$feature_branch"
  validate_production_repo
  validate_feature_branch "$feature_branch"
  check_clean_working_tree
  
  # Resumo
  show_prototype_summary "$feature_branch"
  
  # Confirmação
  confirm_migration "$feature_branch"
  
  echo ""
  print_color $MAGENTA "🔧 Iniciando migração..."
  echo ""
  
  # Checkout feature
  checkout_feature "$feature_branch"
  
  # Copiar para produção
  copy_to_production "$feature_branch"
  
  if [ $? -eq 1 ]; then
    print_color $YELLOW "⚠️  Nenhuma alteração para migrar. Operação cancelada."
    exit 0
  fi
  
  # Commitar em produção
  local production_commit=$(commit_to_production "$feature_branch")
  
  # Push para produção
  push_to_production
  
  # Atualizar AS-IS
  update_as_is_baseline "$feature_branch"
  
  # Criar tag AS-IS
  local new_tag=$(create_as_is_tag "$feature_branch")
  
  # Push AS-IS
  push_as_is "$new_tag"
  
  # Deletar branch (opcional)
  delete_feature_branch "$feature_branch"
  
  # Relatório final
  generate_report "$feature_branch" "$production_commit" "$new_tag"
}

# Executar
main "$1"
