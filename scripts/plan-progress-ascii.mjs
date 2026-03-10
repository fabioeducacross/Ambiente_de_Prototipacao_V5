import fs from 'node:fs'
import path from 'node:path'

const CHECKBOX_RE = /^- \[( |x|X)\]\s+(T\d{3})\s+(.*)$/
const TASK_PHASE_RE = /^##\s+Fase\s+(\d+)\s+-\s+(.*)$/i
const PLAN_PHASE_RE = /^###\s+Fase\s+(\d+)\s+-\s+(.*)$/i

function readText(filePath) {
    return fs.readFileSync(filePath, 'utf8')
}

function percent(done, total) {
    if (!total) return 0
    return Math.round((done / total) * 100)
}

function bar(pct, width = 26) {
    const filled = Math.max(0, Math.min(width, Math.round((pct / 100) * width)))
    return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}]`
}

function phaseStatus(pct, total) {
    if (!total) return 'N/A'
    if (pct >= 100) return 'DONE'
    if (pct > 0) return 'WIP '
    return 'TODO'
}

function pad(str, len) {
    const value = String(str)
    return value.length >= len ? value : value + ' '.repeat(len - value.length)
}

function truncate(str, len) {
    const value = String(str)
    if (value.length <= len) return value
    if (len <= 3) return value.slice(0, len)
    return `${value.slice(0, len - 3)}...`
}

function parseTasks(tasksContent) {
    const lines = tasksContent.split(/\r?\n/)
    const phases = []
    let current = null

    for (const line of lines) {
        const phaseMatch = line.match(TASK_PHASE_RE)
        if (phaseMatch) {
            current = {
                number: phaseMatch[1],
                title: phaseMatch[2].trim(),
                done: 0,
                total: 0,
                tasks: []
            }
            phases.push(current)
            continue
        }

        if (!current) continue

        const taskMatch = line.match(CHECKBOX_RE)
        if (taskMatch) {
            const isDone = taskMatch[1].toLowerCase() === 'x'
            current.total += 1
            if (isDone) current.done += 1
            current.tasks.push({
                id: taskMatch[2],
                done: isDone,
                summary: taskMatch[3].trim()
            })
        }
    }

    return phases
}

function parsePlanPhases(planContent) {
    const lines = planContent.split(/\r?\n/)
    const phases = []

    for (const line of lines) {
        const match = line.match(PLAN_PHASE_RE)
        if (match) {
            phases.push({ number: match[1], title: match[2].trim() })
        }
    }

    return phases
}

function findFeatureDir(specsDir, featureArg) {
    if (featureArg) {
        const directPath = path.isAbsolute(featureArg)
            ? featureArg
            : path.join(specsDir, featureArg)

        if (fs.existsSync(directPath) && fs.statSync(directPath).isDirectory()) {
            return directPath
        }

        throw new Error(`Feature nao encontrada: ${featureArg}`)
    }

    const entries = fs.readdirSync(specsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort((a, b) => b.localeCompare(a, 'pt-BR', { numeric: true }))

    if (!entries.length) {
        throw new Error('Nenhuma feature encontrada em /specs')
    }

    return path.join(specsDir, entries[0])
}

function printReport(featureDir, taskPhases, planPhases) {
    const featureName = path.basename(featureDir)
    const totalDone = taskPhases.reduce((acc, phase) => acc + phase.done, 0)
    const totalTasks = taskPhases.reduce((acc, phase) => acc + phase.total, 0)
    const totalPct = percent(totalDone, totalTasks)

    const line = '='.repeat(78)
    console.log(line)
    console.log(`PROGRESSO ASCII DO PLANO  |  Feature: ${featureName}`)
    console.log(line)
    console.log(`Geral: ${bar(totalPct)} ${pad(`${totalPct}%`, 5)}  ${totalDone}/${totalTasks} tarefas\n`)

    console.log('Fases de execucao (tasks.md)')
    console.log('-'.repeat(78))
    console.log(`${pad('FASE', 4)} ${pad('ST', 4)} ${pad('PROGRESSO', 33)} ${pad('DONE', 7)} TITULO`)

    for (const phase of taskPhases) {
        const pct = percent(phase.done, phase.total)
        console.log(
            `${pad(phase.number, 4)} ${pad(phaseStatus(pct, phase.total), 4)} ${pad(`${bar(pct)} ${pct}%`, 33)} ${pad(`${phase.done}/${phase.total}`, 7)} ${truncate(phase.title, 24)}`
        )
    }

    console.log('\nFases de planejamento (plan.md)')
    console.log('-'.repeat(78))

    if (!planPhases.length) {
        console.log('Nenhuma fase no formato "### Fase X - ..." encontrada em plan.md')
    } else {
        for (const phase of planPhases) {
            const linked = taskPhases.find((tp) => tp.number === phase.number)
            if (!linked) {
                console.log(`Fase ${phase.number}: ${truncate(phase.title, 44)} -> sem mapeamento`)
                continue
            }
            const pct = percent(linked.done, linked.total)
            console.log(`Fase ${phase.number}: ${pad(truncate(phase.title, 38), 38)} ${bar(pct, 16)} ${pct}%`)
        }
    }

    console.log('\nLegenda: TODO = nao iniciado | WIP = em andamento | DONE = concluido')
    console.log(line)
}

function main() {
    const repoRoot = process.cwd()
    const specsDir = path.join(repoRoot, 'specs')
    const featureArg = process.argv[2]

    if (!fs.existsSync(specsDir)) {
        throw new Error('Diretorio /specs nao encontrado no workspace atual')
    }

    const featureDir = findFeatureDir(specsDir, featureArg)
    const tasksPath = path.join(featureDir, 'tasks.md')
    const planPath = path.join(featureDir, 'plan.md')

    if (!fs.existsSync(tasksPath)) {
        throw new Error(`Arquivo tasks.md nao encontrado em: ${featureDir}`)
    }

    if (!fs.existsSync(planPath)) {
        throw new Error(`Arquivo plan.md nao encontrado em: ${featureDir}`)
    }

    const tasksContent = readText(tasksPath)
    const planContent = readText(planPath)

    const taskPhases = parseTasks(tasksContent)
    const planPhases = parsePlanPhases(planContent)

    if (!taskPhases.length) {
        throw new Error('Nenhuma fase de tarefas foi reconhecida no tasks.md')
    }

    printReport(featureDir, taskPhases, planPhases)
}

try {
    main()
} catch (error) {
    console.error(`Erro: ${error.message}`)
    process.exit(1)
}
