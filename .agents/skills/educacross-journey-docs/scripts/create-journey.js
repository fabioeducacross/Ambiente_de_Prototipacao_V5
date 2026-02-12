#!/usr/bin/env node

/**
 * Create Journey Script
 * 
 * Gera scaffold completo para nova journey doc com template, pasta de screenshots e entrada na sidebar
 * 
 * Uso:
 *   node create-journey.js PROF-004 "Exportar Relatórios"
 *   node create-journey.js ALUNO-010 "Submeter Trabalho Final"
 *   node create-journey.js ADMIN-002 "Gerenciar Usuários" --duration="15-20"
 * 
 * Flags:
 *   --duration="X-Y"    Duração estimada em minutos (padrão: 5-10)
 *   --author="Nome"     Nome do autor (padrão: usuário git)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function parseArgs() {
  const args = process.argv.slice(2)
  
  if (args.length < 2) {
    log('❌ Erro: ID e título são obrigatórios', 'red')
    log('')
    log('Uso: node create-journey.js <ID> "<Título>"', 'cyan')
    log('Exemplo: node create-journey.js PROF-004 "Exportar Relatórios"', 'dim')
    log('')
    log('IDs válidos: PROF-XXX, ALUNO-XXX, ADMIN-XXX, GESTOR-XXX', 'dim')
    process.exit(1)
  }

  const id = args[0].toUpperCase()
  const title = args[1]

  // Validar ID
  const idRegex = /^(PROF|ALUNO|ADMIN|GESTOR)-\d{3}$/
  if (!idRegex.test(id)) {
    log(`❌ Erro: ID inválido "${id}"`, 'red')
    log('')
    log('Formato esperado: PROF-001, ALUNO-010, ADMIN-003, GESTOR-002', 'yellow')
    log('   - Perfil: PROF | ALUNO | ADMIN | GESTOR', 'dim')
    log('   - Número: 3 dígitos zero-padded (001-999)', 'dim')
    process.exit(1)
  }

  // Parse flags
  const flags = {
    duration: '5-10',
    author: null
  }

  args.slice(2).forEach(arg => {
    if (arg.startsWith('--duration=')) {
      flags.duration = arg.split('=')[1].replace(/"/g, '')
    }
    if (arg.startsWith('--author=')) {
      flags.author = arg.split('=')[1].replace(/"/g, '')
    }
  })

  // Get git author if not provided
  if (!flags.author) {
    try {
      flags.author = execSync('git config user.name', { encoding: 'utf8' }).trim()
    } catch (error) {
      flags.author = 'Autor Desconhecido'
    }
  }

  return { id, title, flags }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Espaços para hífens
    .replace(/-+/g, '-') // Múltiplos hífens para um
}

function getProfileInfo(id) {
  const profiles = {
    PROF: {
      folder: 'professor',
      emoji: '👨‍🏫',
      label: 'Professor',
      sidebarCategory: 'Jornadas do Professor'
    },
    ALUNO: {
      folder: 'aluno',
      emoji: '🎓',
      label: 'Aluno',
      sidebarCategory: 'Jornadas do Aluno'
    },
    ADMIN: {
      folder: 'admin',
      emoji: '⚙️',
      label: 'Administrador',
      sidebarCategory: 'Jornadas do Administrador'
    },
    GESTOR: {
      folder: 'gestor',
      emoji: '📊',
      label: 'Gestor',
      sidebarCategory: 'Jornadas do Gestor'
    }
  }

  const prefix = id.split('-')[0]
  return profiles[prefix]
}

function generateMarkdown(id, title, slug, profile, flags) {
  const today = new Date().toISOString().split('T')[0]
  const number = id.split('-')[1]

  return `---
title: ${title}
sidebar_position: ${parseInt(number)}
sidebar_label: ${title}
description: [Descreva em 1 linha o que o usuário aprenderá]
keywords: [palavra1, palavra2, palavra3]
tags:
  - ${profile.folder}
  - [categoria]
---

# ${profile.emoji} ${title}

> **Persona**: ${profile.label}  
> **Duração estimada**: ${flags.duration} minutos  
> **Última atualização**: ${today}

---

## 📝 Objetivo

[Descreva em 1-2 parágrafos O QUE o usuário vai alcançar ao seguir esta jornada. Seja específico e orientado a resultado.]

**Ao final desta jornada, você será capaz de:**
- ✅ [Resultado concreto e mensurável 1]
- ✅ [Resultado concreto e mensurável 2]
- ✅ [Resultado concreto e mensurável 3]

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de que:

- [ ] Você está logado na plataforma como **${profile.label}**
- [ ] [Condição técnica prévia]
- [ ] [Recurso disponível]

---

## 📸 Passo a Passo

### Passo 1: [Ação Inicial - Use Verbo no Imperativo]

![Screenshot do Passo 1](./screenshots/${profile.folder}-${number}-001-[slug].png)

**Instruções:**

❶ [Ação específica com elemento UI entre **aspas**]  
❷ [Segunda ação relacionada]  
❸ [Terceira ação se necessário]  

:::tip Dica Útil
[Informação que facilita ou acelera o processo]
:::

---

### Passo 2: [Segunda Ação Principal]

![Screenshot do Passo 2](./screenshots/${profile.folder}-${number}-002-[slug].png)

**Instruções:**

❶ [Ação 1]  
❷ [Ação 2]  

:::caution Atenção
[Alertar sobre possível erro ou cuidado necessário]
:::

---

### Passo 3: [Confirmação/Finalização]

![Screenshot do Passo 3](./screenshots/${profile.folder}-${number}-003-[slug].png)

**Instruções:**

❶ [Ação final]  
❷ [Confirmação]  

:::success Pronto!
Você completou [objetivo da jornada]. [Próxima ação sugerida].
:::

---

## ⚠️ Casos de Erro

### Erro: "[Mensagem de Erro Literal]"

**Causa**: [Explique POR QUÊ este erro acontece]

**Solução**:
1. [Passo claro para resolver 1]
2. [Passo claro para resolver 2]

---

## 🔗 Jornadas Relacionadas

**Próximos passos recomendados**:
- 🚀 [Próxima Jornada](./jornada-proxima.md) - [O que vem depois]

**Features relacionadas**:
- 🔍 [Jornada Complementar](./jornada-relacionada.md) - [Connection point]

---

## 📊 Métricas e Validação

**Como validar que a jornada funcionou**:
- [ ] [Item verificável 1]
- [ ] [Item verificável 2]

**Indicadores de sucesso**:
- Tempo médio de conclusão: ${flags.duration} minutos  
- Taxa de sucesso esperada: [Insira %]  

---

## 🆘 Suporte

Se você encontrou problemas não documentados:

- **Suporte técnico**: suporte@educacross.com.br
- **Base de conhecimento**: [Link para categoria]

---

## 📝 Metadados

| Campo | Valor |
|-------|-------|
| **Autor** | ${flags.author} |
| **Versão** | 1.0.0 |
| **Data de criação** | ${today} |
| **Última revisão** | ${today} |

---

## Changelog

### [1.0.0] - ${today}
- Versão inicial do documento
`
}

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function createJourneyFiles(id, title, slug, profile, flags) {
  const docsDir = path.join(__dirname, '..', '..', '..', 'documentation', 'docs', 'journeys')
  const profileDir = path.join(docsDir, profile.folder)
  const screenshotsDir = path.join(profileDir, 'screenshots')
  
  const filename = `${id}-${slug}.md`
  const filepath = path.join(profileDir, filename)

  // Verificar se já existe
  if (fs.existsSync(filepath)) {
    log(`❌ Erro: Journey já existe!`, 'red')
    log(`   Caminho: ${filepath}`, 'dim')
    process.exit(1)
  }

  // Criar diretórios
  ensureDirectory(profileDir)
  ensureDirectory(screenshotsDir)

  // Criar arquivo Markdown
  const content = generateMarkdown(id, title, slug, profile, flags)
  fs.writeFileSync(filepath, content, 'utf8')

  return {
    filepath,
    screenshotsDir,
    relativePath: `journeys/${profile.folder}/${id}-${slug}`
  }
}

function createPlaceholderREADME(screenshotsDir, id, profile) {
  const readmePath = path.join(screenshotsDir, 'README.md')
  
  if (fs.existsSync(readmePath)) return

  const number = id.split('-')[1]
  const content = `# Screenshots - ${id}

## Naming Convention

Screenshots para esta jornada devem seguir o padrão:

\`${profile.folder}-${number}-XXX-descricao.png\`

Exemplos:
- \`${profile.folder}-${number}-001-dashboard.png\`
- \`${profile.folder}-${number}-002-formulario.png\`
- \`${profile.folder}-${number}-003-confirmacao.png\`

## Requisitos

- **Resolução**: 1440x900 (16:10)
- **Formato**: PNG
- **Peso máximo**: 500KB por imagem
- **Anotações**: Numbered circles (❶❷❸) em vermelho #EA5455

## Validação

Para validar screenshots automaticamente:

\`\`\`bash
node ../../../scripts/validate-screenshots.js ${id}
\`\`\`

## Ferramentas Recomendadas

- **Captura**: Win+Shift+S (Windows), Cmd+Shift+4 (Mac)
- **Anotações**: Greenshot, Skitch, Excalidraw
- **Otimização**: TinyPNG, Squoosh
`

  fs.writeFileSync(readmePath, content, 'utf8')
}

function updateSidebar(id, title, profile) {
  const sidebarPath = path.join(__dirname, '..', '..', '..', 'documentation', 'sidebars.ts')
  
  if (!fs.existsSync(sidebarPath)) {
    log('⚠️  Arquivo sidebars.ts não encontrado', 'yellow')
    log('   Você precisará adicionar manualmente:', 'dim')
    log(`   "${profile.relativePath}"`, 'cyan')
    return
  }

  const content = fs.readFileSync(sidebarPath, 'utf8')
  
  // Detectar se categoria já existe
  const categoryRegex = new RegExp(`label: ['"]${profile.sidebarCategory}['"]`)
  
  if (!categoryRegex.test(content)) {
    log('⚠️  Categoria não encontrada em sidebars.ts', 'yellow')
    log(`   Adicione manualmente a entrada para "${title}"`, 'dim')
    return
  }

  log('ℹ️  Sidebars.ts detectado', 'cyan')
  log('   Adicione manualmente a linha:', 'dim')
  log(`   'journeys/${profile.folder}/${id}-${generateSlug(title)}',`, 'cyan')
}

function main() {
  const { id, title, flags } = parseArgs()
  const slug = generateSlug(title)
  const profile = getProfileInfo(id)

  log('', 'reset')
  log('🚀 Criando nova journey documentation...', 'cyan')
  log('', 'reset')

  log(`📋 Informações:`, 'bold')
  log(`   ID: ${id}`, 'dim')
  log(`   Título: ${title}`, 'dim')
  log(`   Slug: ${slug}`, 'dim')
  log(`   Perfil: ${profile.label} ${profile.emoji}`, 'dim')
  log(`   Duração: ${flags.duration} minutos`, 'dim')
  log(`   Autor: ${flags.author}`, 'dim')
  log('', 'reset')

  // Criar arquivos
  const { filepath, screenshotsDir, relativePath } = createJourneyFiles(id, title, slug, profile, flags)
  
  log(`✅ Arquivo criado: ${filepath}`, 'green')

  // Criar README de screenshots
  createPlaceholderREADME(screenshotsDir, id, profile)
  log(`✅ Screenshot README: ${path.join(screenshotsDir, 'README.md')}`, 'green')

  log('', 'reset')
  log('✨ Journey scaffold criado com sucesso!', 'green')
  log('', 'reset')

  log('📝 Próximos passos:', 'cyan')
  log(`   1. Editar ${id}-${slug}.md para preencher conteúdo`, 'dim')
  log(`   2. Capturar screenshots (1440x900 PNG) e salvar em:`, 'dim')
  log(`      ${screenshotsDir}`, 'dim')
  log(`   3. Adicionar linha em documentation/sidebars.ts:`, 'dim')
  log(`      'journeys/${profile.folder}/${id}-${slug}',`, 'cyan')
  log(`   4. Validar screenshots: node scripts/validate-screenshots.js ${id}`, 'dim')
  log('', 'reset')

  log('💡 Dicas:', 'cyan')
  log(`   - Use template completo em: .agents/skills/educacross-journey-docs/references/journey-template.md`, 'dim')
  log(`   - Screenshots devem ter anotações numeradas (❶❷❸)`, 'dim')
  log(`   - Documente top 3-5 erros mais comuns`, 'dim')
  log('', 'reset')
}

// Run
try {
  main()
} catch (error) {
  log(`❌ Erro: ${error.message}`, 'red')
  console.error(error)
  process.exit(1)
}
