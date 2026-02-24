#!/usr/bin/env node
/**
 * audit-skill-coverage.js
 * Compara o que está documentado na SKILL.md com o que existe no educacross-frontoffice.
 * Gera relatório de cobertura: mapeado, não documentado e prioridade.
 *
 * Uso: node .agents/scripts/audit-skill-coverage.js
 */

const fs = require('fs')
const path = require('path')

// ─── CONFIGURAÇÃO ────────────────────────────────────────────────────────────

const FRONTOFFICE_BASE = path.resolve(
  'C:/Users/Educacross/Documents/Educacross/educacross-frontoffice/educacross-frontoffice/src'
)
const SKILL_MD = path.resolve(
  __dirname, '../skills/educacross-design-system/SKILL.md'
)

// Prioridade de documentação (grupos com mais impacto visual primeiro)
const PRIORITY_MAP = {
  'badge':        1,
  'card':         1,
  'table':        1,
  'selects':      1,
  'tab':          1,
  'progessBar':   1,
  'chart':        1,
  'missions':     2,
  'mission-plus': 2,
  'legends':      2,
  'subjects':     2,
  'filter':       2,
  'form':         2,
  'modal':        2,
  'question':     3,
  'evaluations':  3,
  'PDFs':         3,
  'player':       3,
  'reading-meter':3,
  'proficiency':  3,
  'divider':      4,
  'cells':        4,
  'teacher':      4,
  'NPS':          4,
  'deeplink':     5,
  'locale':       5,
  'app-collapse': 5,
  'app-language-selector': 5,
  'student-evidence-report': 5,
  'descriptors':  5,
  'exercise-type':5,
  'global':       5,
}

const PRIORITY_LABELS = {
  1: '🔴 ALTA   — componentes-núcleo de tela',
  2: '🟠 MÉDIA  — features principais',
  3: '🟡 BAIXA  — features específicas',
  4: '⚪ MÍNIMA — raramente prototipado',
  5: '🔵 SKIP   — infra/util/fora do escopo UI',
}

// ─── COLETA DE COMPONENTES NO FRONTOFFICE ────────────────────────────────────

function getAllVueComponents(baseDir) {
  const results = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.name.endsWith('.vue')) {
        const rel = path.relative(path.join(baseDir, 'components'), fullPath).replace(/\\/g, '/')
        results.push(rel)
      }
    }
  }
  walk(path.join(baseDir, 'components'))
  return results.sort()
}

function getAllSvgAssets(baseDir) {
  const results = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.name.endsWith('.svg')) {
        const rel = path.relative(path.join(baseDir, 'assets'), fullPath).replace(/\\/g, '/')
        results.push(rel)
      }
    }
  }
  walk(path.join(baseDir, 'assets'))
  return results.sort()
}

// ─── LEITURA DO SKILL.MD ─────────────────────────────────────────────────────

function extractMentionedFiles(skillContent) {
  const mentioned = new Set()

  // Pega tudo que parece caminho de arquivo .vue ou .svg mencionado no SKILL.md
  const vuePattern = /(?:src\/[^\s`'"]+\.vue|components\/[^\s`'"]+\.vue|([A-Z][a-zA-Z]+\.vue))/g
  const svgPattern = /(?:assets\/[^\s`'"]+\.svg|icons\/[^\s`'"]+\.svg|images\/[^\s`'"]+\.svg)/g
  const componentNamePattern = /`((?:[A-Z][a-zA-Z]+(?:\.vue)?)|(?:[a-z-]+\/[A-Z][a-zA-Z]+\.vue))`/g

  let m
  while ((m = vuePattern.exec(skillContent)) !== null) mentioned.add(m[0])
  while ((m = svgPattern.exec(skillContent)) !== null) mentioned.add(m[0])
  while ((m = componentNamePattern.exec(skillContent)) !== null) mentioned.add(m[1])

  // Nomes explícitos que sabemos estar documentados (mapeados por leitura direta)
  const explicitComponents = [
    'MediaCard.vue', 'MediaCardIcon.vue', 'DynamicMediaCard.vue',
    'ESelect.vue', 'ListTable.vue', 'EFormCheck.vue',
    'ExpandableFilterArea.vue', 'BadgeStatus.vue',
    'Tab.vue', 'ProgressBarHorizontal.vue',
    'PieChart.vue', 'RadialBar.vue', 'BarChart.vue', 'DefaultChart.vue', 'RadialBarChart.vue',
    'DefaultFAQModal.vue', 'GameDetailsModal.vue', 'StudentGameDetailsModal.vue', 'ZipLoading.vue',
    'MissionDetails.vue', // tem CSS documentado
  ]
  explicitComponents.forEach(c => mentioned.add(c))

  // SVGs explicitamente documentados na seção 5
  const explicitSvgs = [
    'images/logo/logo.svg', 'images/logo/google.svg', 'images/logo/microsoft.svg',
    'images/educacross/logo-mini-menu.svg',
    'images/belinha/confusion.svg', 'images/belinha/maintenance.svg',
    'images/belinha/mochila.svg', 'images/belinha/redirecting.svg', 'images/belinha/regua.svg',
    'icons/mission-icons/missao-portugues.svg', 'icons/mission-icons/missao-math.svg',
    'icons/mission-icons/missao-math-ing.svg', 'icons/mission-icons/missao-liga.svg',
    'icons/mission-icons/missao-coletiva.svg', 'icons/mission-icons/missao-individual.svg',
    'icons/mission-icons/missao-ldc.svg', 'icons/mission-icons/missao-mista.svg',
    'icons/mission-icons/belinha-opcao-todas.svg',
    'icons/exercises-types/full-text.svg', 'icons/exercises-types/word-list.svg',
    'icons/whatsapp.svg', 'icons/whatsapp-primary.svg', 'icons/help-circle.svg',
    'icons/classroom.svg', 'icons/house.svg', 'icons/videogame-asset.svg', 'icons/warning.svg',
    'icons/events/studant-hat.svg', 'icons/events/progress-classes.svg',
    'icons/events/open-book.svg',
    'images/pages/login/background.svg', 'images/pages/login/Belinha.svg',
    'images/pages/login/Eugenio.svg', 'images/pages/login/LogoLogin.svg',
    'images/pages/error.svg', 'images/pages/warning.svg',
    'images/pdf/bg-certificate.svg',
    'images/questionAnswerStatus/Right.svg', 'images/questionAnswerStatus/Unanswered.svg',
    'images/questionAnswerStatus/Undisplayed.svg', 'images/questionAnswerStatus/Annulled.svg',
  ]
  explicitSvgs.forEach(s => mentioned.add(s))

  return mentioned
}

// ─── COMPARAÇÃO ──────────────────────────────────────────────────────────────

function getFolder(relPath) {
  return relPath.split('/')[0]
}

function getPriority(relPath) {
  const folder = getFolder(relPath)
  return PRIORITY_MAP[folder] ?? 4
}

function isDocumented(relPath, mentionedSet) {
  const filename = path.basename(relPath)
  // Verifica por nome exato ou trecho do caminho
  for (const m of mentionedSet) {
    if (m === filename || m.endsWith('/' + filename) || relPath.includes(m) || m.includes(relPath)) {
      return true
    }
  }
  return false
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

function main() {
  const skillContent = fs.readFileSync(SKILL_MD, 'utf8')
  const mentioned = extractMentionedFiles(skillContent)

  const allComponents = getAllVueComponents(FRONTOFFICE_BASE)
  const allSvgs = getAllSvgAssets(FRONTOFFICE_BASE)

  // Separar documentados / faltando
  const covered = []
  const missing = []

  for (const c of allComponents) {
    if (isDocumented(c, mentioned)) {
      covered.push({ file: c, type: 'component', priority: getPriority(c) })
    } else {
      missing.push({ file: c, type: 'component', priority: getPriority(c) })
    }
  }

  const coveredSvgs = []
  const missingSvgs = []

  for (const s of allSvgs) {
    if (isDocumented(s, mentioned)) {
      coveredSvgs.push(s)
    } else {
      missingSvgs.push(s)
    }
  }

  // ── Relatório ───────────────────────────────────────────────────────────────

  const pct = c => ((covered.length / allComponents.length) * 100).toFixed(1)

  console.log('\n' + '═'.repeat(70))
  console.log(' AUDIT — SKILL.md Coverage vs educacross-frontoffice')
  console.log('═'.repeat(70))
  console.log(`\n📦 COMPONENTES VUE`)
  console.log(`   Total no projeto : ${allComponents.length}`)
  console.log(`   Documentados     : ${covered.length}  (${pct()}%)`)
  console.log(`   Faltando         : ${missing.length}`)

  // Agrupados por prioridade
  for (let p = 1; p <= 5; p++) {
    const group = missing.filter(x => x.priority === p)
    if (!group.length) continue
    console.log(`\n  ${PRIORITY_LABELS[p]}`)
    group.forEach(x => console.log(`    • ${x.file}`))
  }

  console.log(`\n🎨 ASSETS SVG`)
  console.log(`   Total no projeto : ${allSvgs.length}`)
  console.log(`   Documentados     : ${coveredSvgs.length}  (${((coveredSvgs.length/allSvgs.length)*100).toFixed(1)}%)`)
  console.log(`   Faltando         : ${missingSvgs.length}`)

  const missingSvgByFolder = {}
  for (const s of missingSvgs) {
    const folder = s.split('/').slice(0,2).join('/')
    if (!missingSvgByFolder[folder]) missingSvgByFolder[folder] = []
    missingSvgByFolder[folder].push(s.split('/').pop())
  }
  for (const [folder, files] of Object.entries(missingSvgByFolder).sort()) {
    console.log(`\n    📁 ${folder}/`)
    files.slice(0, 8).forEach(f => console.log(`       • ${f}`))
    if (files.length > 8) console.log(`       … e mais ${files.length - 8}`)
  }

  console.log('\n' + '─'.repeat(70))
  console.log(' PRÓXIMA AÇÃO RECOMENDADA')
  const topMissing = missing.filter(x => x.priority === 1).slice(0, 5)
  if (topMissing.length) {
    console.log(' Documentar na SKILL.md (prioridade ALTA):')
    topMissing.forEach(x => console.log(`   → ${x.file}`))
  } else {
    console.log(' ✅ Todos os componentes de ALTA prioridade estão documentados!')
  }
  console.log('═'.repeat(70) + '\n')
}

main()
