#!/usr/bin/env node

/**
 * Validate Screenshots Script
 * 
 * Valida screenshots de jornadas: resolução, tamanho, naming convention
 * 
 * Uso:
 *   node validate-screenshots.js PROF-001
 *   node validate-screenshots.js professor/
 *   node validate-screenshots.js --all
 * 
 * Validações:
 *   ✓ Resolução: 1440x900 (16:10)
 *   ✓ Formato: PNG
 *   ✓ Peso: ≤ 500KB
 *   ✓ Naming: {perfil}-{num}-{seq}-{slug}.png
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

// Check if ImageMagick is available
function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' })
    return true
  } catch {
    try {
      execSync('convert --version', { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }
}

function getImageDimensions(filepath) {
  try {
    // Try ImageMagick first (faster and more reliable)
    if (checkImageMagick()) {
      try {
        const output = execSync(`magick identify -format "%wx%h" "${filepath}"`, { 
          encoding: 'utf8' 
        }).trim()
        const [width, height] = output.split('x').map(Number)
        return { width, height }
      } catch {
        // Fallback to convert command
        const output = execSync(`convert "${filepath}" -print "%wx%h" null:`, { 
          encoding: 'utf8' 
        }).trim()
        const [width, height] = output.split('x').map(Number)
        return { width, height }
      }
    }

    // Fallback: read PNG header manually
    const buffer = fs.readFileSync(filepath)
    
    // PNG signature check
    if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || 
        buffer[2] !== 0x4E || buffer[3] !== 0x47) {
      throw new Error('Not a PNG file')
    }

    // Read IHDR chunk (starts at byte 16)
    const width = buffer.readUInt32BE(16)
    const height = buffer.readUInt32BE(20)

    return { width, height }
  } catch (error) {
    return null
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function validateFilename(filename, journeyId = null) {
  // Pattern: {perfil}-{num}-{seq}-{slug}.png
  const regex = /^(prof|aluno|admin|gestor)-(\d{3})-(\d{3})-([a-z0-9-]+)\.png$/i
  const match = filename.toLowerCase().match(regex)

  if (!match) {
    return { valid: false, reason: 'Nome não segue padrão {perfil}-{num}-{seq}-{slug}.png' }
  }

  const [, profile, docNum, seq, slug] = match

  // Se journeyId fornecido, validar contra ele
  if (journeyId) {
    const [expectedProfile, expectedNum] = journeyId.toLowerCase().split('-')
    if (profile !== expectedProfile.toLowerCase() || docNum !== expectedNum) {
      return { 
        valid: false, 
        reason: `Esperado ${expectedProfile}-${expectedNum}, encontrado ${profile}-${docNum}` 
      }
    }
  }

  // Validar sequência numérica
  const seqNum = parseInt(seq)
  if (seqNum < 1 || seqNum > 999) {
    return { valid: false, reason: 'Sequência deve ser 001-999' }
  }

  return { valid: true, profile, docNum, seq, slug }
}

function validateScreenshot(filepath, journeyId = null) {
  const filename = path.basename(filepath)
  const stats = fs.statSync(filepath)
  const sizeBytes = stats.size

  const result = {
    filename,
    filepath,
    valid: true,
    warnings: [],
    errors: []
  }

  // 1. Validar nome do arquivo
  const nameValidation = validateFilename(filename, journeyId)
  if (!nameValidation.valid) {
    result.valid = false
    result.errors.push(`Nome inválido: ${nameValidation.reason}`)
  } else {
    result.profile = nameValidation.profile
    result.docNum = nameValidation.docNum
    result.seq = nameValidation.seq
    result.slug = nameValidation.slug
  }

  // 2. Validar extensão PNG
  if (!filename.toLowerCase().endsWith('.png')) {
    result.valid = false
    result.errors.push('Formato deve ser PNG')
    return result // Não continuar se não for PNG
  }

  // 3. Validar dimensões
  const dimensions = getImageDimensions(filepath)
  if (!dimensions) {
    result.warnings.push('Não foi possível ler dimensões (ImageMagick não instalado?)')
  } else {
    result.width = dimensions.width
    result.height = dimensions.height

    if (dimensions.width !== 1440 || dimensions.height !== 900) {
      result.valid = false
      result.errors.push(
        `Resolução incorreta: ${dimensions.width}x${dimensions.height} (esperado 1440x900)`
      )
    }
  }

  // 4. Validar tamanho do arquivo
  result.size = sizeBytes
  result.sizeFormatted = formatBytes(sizeBytes)

  const maxSize = 500 * 1024 // 500 KB
  if (sizeBytes > maxSize) {
    result.warnings.push(
      `Arquivo grande: ${result.sizeFormatted} (recomendado ≤ 500KB)`
    )
  }

  if (sizeBytes > 1024 * 1024) { // 1 MB
    result.errors.push(
      `Arquivo muito grande: ${result.sizeFormatted} (máximo absoluto 1MB)`
    )
    result.valid = false
  }

  return result
}

function findScreenshots(targetPath) {
  const docsDir = path.join(__dirname, '..', '..', '..', 'documentation', 'docs', 'journeys')
  
  let searchPaths = []

  if (targetPath === '--all') {
    // Todos os screenshots
    const profiles = ['professor', 'aluno', 'admin', 'gestor']
    profiles.forEach(profile => {
      const screenshotsDir = path.join(docsDir, profile, 'screenshots')
      if (fs.existsSync(screenshotsDir)) {
        searchPaths.push({ path: screenshotsDir, journeyId: null })
      }
    })
  } else if (targetPath.match(/^(PROF|ALUNO|ADMIN|GESTOR)-\d{3}$/i)) {
    // Journey ID específico (ex: PROF-001)
    const journeyId = targetPath.toUpperCase()
    const [profilePrefix, number] = journeyId.split('-')
    
    const profileMap = {
      PROF: 'professor',
      ALUNO: 'aluno',
      ADMIN: 'admin',
      GESTOR: 'gestor'
    }
    
    const profile = profileMap[profilePrefix]
    const screenshotsDir = path.join(docsDir, profile, 'screenshots')
    
    if (!fs.existsSync(screenshotsDir)) {
      log(`❌ Pasta de screenshots não encontrada: ${screenshotsDir}`, 'red')
      process.exit(1)
    }
    
    searchPaths.push({ path: screenshotsDir, journeyId })
  } else if (targetPath.endsWith('/') || !path.extname(targetPath)) {
    // Pasta (ex: professor/)
    const profileDir = path.join(docsDir, targetPath.replace(/\/$/, ''))
    const screenshotsDir = path.join(profileDir, 'screenshots')
    
    if (!fs.existsSync(screenshotsDir)) {
      log(`❌ Pasta de screenshots não encontrada: ${screenshotsDir}`, 'red')
      process.exit(1)
    }
    
    searchPaths.push({ path: screenshotsDir, journeyId: null })
  }

  // Coletar todos os arquivos PNG
  const screenshots = []
  searchPaths.forEach(({ path: dirPath, journeyId }) => {
    if (!fs.existsSync(dirPath)) return

    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
      if (file.toLowerCase().endsWith('.png')) {
        const filepath = path.join(dirPath, file)
        
        // Filtrar por journeyId se fornecido
        if (journeyId) {
          const [profilePrefix, number] = journeyId.split('-')
          const profileMap = {
            PROF: 'prof',
            ALUNO: 'aluno',
            ADMIN: 'admin',
            GESTOR: 'gestor'
          }
          const expectedPrefix = `${profileMap[profilePrefix]}-${number}`
          
          if (file.toLowerCase().startsWith(expectedPrefix)) {
            screenshots.push({ filepath, journeyId })
          }
        } else {
          screenshots.push({ filepath, journeyId: null })
        }
      }
    })
  })

  return screenshots
}

function printReport(results) {
  log('', 'reset')
  log('═'.repeat(80), 'dim')
  log('📊 RELATÓRIO DE VALIDAÇÃO', 'bold')
  log('═'.repeat(80), 'dim')
  log('', 'reset')

  const totalFiles = results.length
  const validFiles = results.filter(r => r.valid).length
  const invalidFiles = totalFiles - validFiles
  const warnings = results.reduce((sum, r) => sum + r.warnings.length, 0)

  log(`Total de arquivos: ${totalFiles}`, 'cyan')
  log(`✅ Válidos: ${validFiles}`, validFiles > 0 ? 'green' : 'dim')
  log(`❌ Inválidos: ${invalidFiles}`, invalidFiles > 0 ? 'red' : 'dim')
  log(`⚠️  Avisos: ${warnings}`, warnings > 0 ? 'yellow' : 'dim')
  log('', 'reset')

  // Resultados individuais
  results.forEach(result => {
    if (result.valid && result.warnings.length === 0) {
      // Sucesso total
      log(`✅ ${result.filename}`, 'green')
      if (result.width && result.height) {
        log(`   ${result.width}x${result.height} | ${result.sizeFormatted}`, 'dim')
      }
    } else if (result.valid && result.warnings.length > 0) {
      // Válido mas com avisos
      log(`⚠️  ${result.filename}`, 'yellow')
      if (result.width && result.height) {
        log(`   ${result.width}x${result.height} | ${result.sizeFormatted}`, 'dim')
      }
      result.warnings.forEach(warning => {
        log(`   ⚠️  ${warning}`, 'yellow')
      })
    } else {
      // Inválido
      log(`❌ ${result.filename}`, 'red')
      if (result.width && result.height) {
        log(`   ${result.width}x${result.height} | ${result.sizeFormatted}`, 'dim')
      } else if (result.size) {
        log(`   ${result.sizeFormatted}`, 'dim')
      }
      result.errors.forEach(error => {
        log(`   ❌ ${error}`, 'red')
      })
      result.warnings.forEach(warning => {
        log(`   ⚠️  ${warning}`, 'yellow')
      })
    }
    log('', 'reset')
  })

  log('═'.repeat(80), 'dim')

  // Recomendações
  if (invalidFiles > 0 || warnings > 0) {
    log('', 'reset')
    log('💡 Recomendações:', 'cyan')
    
    if (results.some(r => r.errors.some(e => e.includes('Resolução')))) {
      log('   • Redimensione imagens para 1440x900:', 'dim')
      log('     magick convert input.png -resize 1440x900! output.png', 'cyan')
    }
    
    if (results.some(r => r.warnings.some(w => w.includes('grande')))) {
      log('   • Comprima imagens grandes:', 'dim')
      log('     https://tinypng.com/ ou https://squoosh.app/', 'cyan')
    }
    
    if (results.some(r => r.errors.some(e => e.includes('Nome inválido')))) {
      log('   • Renomeie seguindo o padrão:', 'dim')
      log('     {perfil}-{num}-{seq}-{slug}.png', 'cyan')
      log('     Exemplo: prof-001-001-dashboard.png', 'cyan')
    }
  }

  log('', 'reset')

  // Exit code
  if (invalidFiles > 0) {
    process.exit(1)
  }
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    log('❌ Erro: Especifique um alvo para validar', 'red')
    log('')
    log('Uso:', 'cyan')
    log('  node validate-screenshots.js PROF-001       # Journey específico', 'dim')
    log('  node validate-screenshots.js professor/     # Pasta de perfil', 'dim')
    log('  node validate-screenshots.js --all          # Todos os screenshots', 'dim')
    process.exit(1)
  }

  const target = args[0]

  log('🔍 Validando screenshots...', 'cyan')
  log('', 'reset')

  // Check ImageMagick
  if (!checkImageMagick()) {
    log('⚠️  ImageMagick não detectado - validação de dimensões será limitada', 'yellow')
    log('   Instale: https://imagemagick.org/script/download.php', 'dim')
    log('', 'reset')
  }

  // Encontrar screenshots
  const screenshots = findScreenshots(target)

  if (screenshots.length === 0) {
    log('⚠️  Nenhum screenshot encontrado', 'yellow')
    process.exit(0)
  }

  log(`Encontrados ${screenshots.length} arquivo(s) PNG`, 'cyan')
  log('', 'reset')

  // Validar cada screenshot
  const results = screenshots.map(({ filepath, journeyId }) => {
    return validateScreenshot(filepath, journeyId)
  })

  // Imprimir relatório
  printReport(results)
}

// Run
try {
  main()
} catch (error) {
  log(`❌ Erro: ${error.message}`, 'red')
  console.error(error)
  process.exit(1)
}
