#!/bin/bash

##############################################################################
# Script: create-baseline.sh
# Propósito: Criar branch prototypes/as-is replicando código de produção
# Uso: npm run create-baseline <feature-name>
#      bash scripts/create-baseline.sh <feature-name>
##############################################################################

set -e  # Exit no erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
    echo "  npm run create-baseline <feature-name>"
    echo "  bash scripts/create-baseline.sh missoes-gamificadas"
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
    echo "Soluções:"
    echo "  1. Clone o repo de produção:"
    echo "     cd .."
    echo "     git clone <url> educacross-frontoffice"
    echo ""
    echo "  2. Ou ajuste o caminho neste script"
    echo ""
    exit 1
  fi
  
  if [ ! -d "../educacross-frontoffice/src" ]; then
    print_color $RED "❌ ERRO: Diretório src/ não encontrado em educacross-frontoffice"
    exit 1
  fi
}

# Função: verificar se as-is já existe
check_as_is_exists() {
  if git show-ref --verify --quiet refs/heads/prototypes/as-is; then
    print_color $YELLOW "⚠️  Branch 'prototypes/as-is' já existe!"
    echo ""
    read -p "Deseja atualizar (a) ou abortar (n)? " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Aa]$ ]]; then
      print_color $BLUE "ℹ️  Operação cancelada"
      exit 0
    fi
    
    return 1  # Já existe
  fi
  
  return 0  # Não existe
}

# Função: criar nova branch as-is
create_as_is_branch() {
  local feature_name=$1
  
  print_color $BLUE "📝 Criando branch prototypes/as-is..."
  
  # Garantir que está na main
  git checkout main
  git pull origin main
  
  # Criar branch as-is
  git checkout -b prototypes/as-is
  
  print_color $GREEN "✅ Branch criada: prototypes/as-is"
}

# Função: copiar código de produção
copy_from_production() {
  local feature_name=$1
  
  print_color $BLUE "📦 Copiando arquivos de ../educacross-frontoffice/src..."
  
  # Criar diretório src se não existir
  mkdir -p src
  
  # rsync com exclusões
  rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.env*' \
    --exclude='*.log' \
    ../educacross-frontoffice/src/ src/
  
  # Verificar se houve alterações
  if git diff --quiet; then
    print_color $YELLOW "⚠️  Nenhuma alteração detectada. Código já sincronizado."
    return 1
  fi
  
  print_color $GREEN "✅ Arquivos copiados com sucesso"
  
  # Mostrar resumo de alterações
  echo ""
  print_color $BLUE "📊 Resumo das alterações:"
  git status --short | head -n 20
  
  local total_changes=$(git status --short | wc -l)
  if [ $total_changes -gt 20 ]; then
    echo "   ... e mais $((total_changes - 20)) arquivos"
  fi
  echo ""
  
  return 0
}

# Função: atualizar as-is existente
update_as_is_branch() {
  local feature_name=$1
  
  print_color $BLUE "🔄 Atualizando branch prototypes/as-is existente..."
  
  # Checkout as-is
  git checkout prototypes/as-is
  git pull origin prototypes/as-is
  
  # Copiar de produção
  copy_from_production "$feature_name"
  
  if [ $? -eq 1 ]; then
    # Nenhuma alteração
    print_color $GREEN "✅ AS-IS já está sincronizado com produção"
    exit 0
  fi
}

# Função: commitar alterações
commit_changes() {
  local feature_name=$1
  local is_update=$2
  
  if [ "$is_update" = true ]; then
    local commit_msg="chore: update AS-IS baseline for $feature_name from production"
  else
    local commit_msg="chore: create AS-IS baseline for $feature_name from educacross-frontoffice"
  fi
  
  print_color $BLUE "💾 Commitando alterações..."
  
  git add .
  git commit -m "$commit_msg"
  
  print_color $GREEN "✅ Commit criado: $(git rev-parse --short HEAD)"
}

# Função: criar tag de versão
create_version_tag() {
  local feature_name=$1
  
  print_color $BLUE "🏷️  Criando tag de versão..."
  
  # Buscar última tag
  local latest_tag=$(git tag -l "as-is-v*" | sort -V | tail -n1)
  
  if [ -z "$latest_tag" ]; then
    # Primeira tag
    local new_tag="as-is-v1.0"
  else
    # Incrementar versão
    local version=$(echo $latest_tag | sed 's/as-is-v//')
    local new_version=$(echo $version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    local new_tag="as-is-v$new_version"
  fi
  
  git tag $new_tag
  
  print_color $GREEN "✅ Tag criada: $new_tag"
  
  # Retornar tag para uso posterior
  echo $new_tag
}

# Função: fazer push
push_to_remote() {
  local new_tag=$1
  
  print_color $BLUE "🚀 Fazendo push..."
  
  git push origin prototypes/as-is --tags
  
  print_color $GREEN "✅ Push completo!"
  echo ""
  print_color $GREEN "🎉 Baseline criado com sucesso!"
  echo ""
  echo "📌 Detalhes:"
  echo "   Branch: prototypes/as-is"
  echo "   Tag: $new_tag"
  echo "   Feature: $feature_name"
  echo ""
  echo "🔗 Próximos passos:"
  echo "   1. Criar branch de feature:"
  echo "      git checkout -b prototypes/feature/$feature_name"
  echo ""
  echo "   2. Desenvolver protótipo TO-BE"
  echo ""
  echo "   3. Após aprovação, migrar para produção:"
  echo "      npm run migrate-to-production $feature_name"
  echo ""
}

##############################################################################
# MAIN
##############################################################################

main() {
  local feature_name=$1
  
  print_color $BLUE "🚀 Educacross Prototype Baseline Creator"
  echo ""
  
  # Validações
  validate_args "$feature_name"
  validate_production_repo
  
  # Verificar se as-is já existe
  local is_update=false
  if ! check_as_is_exists; then
    is_update=true
    update_as_is_branch "$feature_name"
  else
    # Criar nova branch
    create_as_is_branch "$feature_name"
    copy_from_production "$feature_name"
    
    if [ $? -eq 1 ]; then
      print_color $YELLOW "⚠️  Nenhuma alteração para commitar"
      exit 0
    fi
  fi
  
  # Commitar
  commit_changes "$feature_name" $is_update
  
  # Criar tag
  local new_tag=$(create_version_tag "$feature_name")
  
  # Push
  push_to_remote "$new_tag"
}

# Executar
main "$1"
