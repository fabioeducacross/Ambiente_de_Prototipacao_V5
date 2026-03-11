import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const STRATEGIC_PLAN = path.join(ROOT, 'documentation', 'docs', 'design-system', 'plano-implementacao-storybook-ds.md')
const STORIES_DIR = path.join(ROOT, 'docs', 'stories')

function readFileSafe(filePath) {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null
}

function extractCurrentPhase(planContent) {
    const match = planContent.match(/Fase atual principal:\s*\*\*Fase\s+(\d+)\s+—\s+([^*]+)\*\*/)
    if (!match) {
        return null
    }

    return {
        number: match[1],
        title: match[2].trim()
    }
}

function listStoryFiles(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return []
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const files = []

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)
        if (entry.isDirectory()) {
            files.push(...listStoryFiles(fullPath))
            continue
        }

        if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath)
        }
    }

    return files
}

function extractStoryMeta(content) {
    const statusMatch = content.match(/\*\*Status:\*\*\s*([^\n\r]+)/)
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const storyIdMatch = content.match(/\*\*Story ID:\*\*\s*([^\n\r]+)/)

    return {
        title: titleMatch ? titleMatch[1].trim() : 'Sem titulo',
        storyId: storyIdMatch ? storyIdMatch[1].trim() : 'Sem ID',
        status: statusMatch ? statusMatch[1].trim() : 'Desconhecido'
    }
}

function findActiveStory() {
    const priority = ['InProgress', 'InReview', 'Ready', 'Draft']
    const stories = listStoryFiles(STORIES_DIR)
        .map((filePath) => {
            const content = readFileSafe(filePath)
            if (!content) {
                return null
            }

            return {
                filePath,
                ...extractStoryMeta(content)
            }
        })
        .filter(Boolean)

    stories.sort((left, right) => {
        const leftIndex = priority.indexOf(left.status)
        const rightIndex = priority.indexOf(right.status)

        const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex
        const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex

        if (normalizedLeft !== normalizedRight) {
            return normalizedLeft - normalizedRight
        }

        return left.filePath.localeCompare(right.filePath)
    })

    return stories[0] ?? null
}

function relative(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/')
}

function main() {
    const planContent = readFileSafe(STRATEGIC_PLAN)
    if (!planContent) {
        throw new Error('Plano estrategico nao encontrado.')
    }

    const currentPhase = extractCurrentPhase(planContent)
    const activeStory = findActiveStory()

    console.log('CONTEXTO ATIVO DO DESIGN SYSTEM')
    console.log('')
    console.log('1. PLANO ESTRATEGICO (fonte de verdade)')
    console.log(`   ${relative(STRATEGIC_PLAN)}`)

    if (currentPhase) {
        console.log(`   Fase atual: ${currentPhase.number} - ${currentPhase.title}`)
    }

    console.log('')
    console.log('2. STORY ATIVA (fonte de verdade executavel)')
    if (activeStory) {
        console.log(`   ${relative(activeStory.filePath)}`)
        console.log(`   ${activeStory.storyId} - ${activeStory.title}`)
        console.log(`   Status: ${activeStory.status}`)
    } else {
        console.log('   Nenhuma story encontrada em docs/stories/')
    }

    console.log('')
    console.log('3. PLANO DE SESSAO')
    console.log('   .copilot/session-state/**/plan.md')
    console.log('   Uso permitido: memoria temporaria da sessao')
    console.log('   Uso proibido: substituir plano estrategico ou story ativa')
}

try {
    main()
} catch (error) {
    console.error(`Erro: ${error.message}`)
    process.exit(1)
}