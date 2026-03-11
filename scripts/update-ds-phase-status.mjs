import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_TARGET = path.join(
    process.cwd(),
    'documentation',
    'docs',
    'design-system',
    'plano-implementacao-storybook-ds.md'
)

const START_MARKER = '<!-- DS_PHASE_STATUS:START -->'
const END_MARKER = '<!-- DS_PHASE_STATUS:END -->'
const INSERT_AFTER_HEADING = '## Fases de Execução'

const PHASES = [
    { number: 0, title: 'Descoberta e mapeamento' },
    { number: 1, title: 'Storybook interno com a stack atual' },
    { number: 2, title: 'Camada canônica de contratos' },
    { number: 3, title: 'Registry para MCP' },
    { number: 4, title: 'Convergência com produção' }
]

const STATUS_LABELS = {
    'done': 'CONCLUIDA',
    'in-progress': 'EM ANDAMENTO',
    'not-started': 'NAO INICIADA',
    'blocked': 'BLOQUEADA'
}

const STATUS_PCT = {
    'done': 100,
    'in-progress': 50,
    'not-started': 0,
    'blocked': 0
}

function parseArgs(argv) {
    const config = {
        file: DEFAULT_TARGET,
        updated: new Date().toISOString().slice(0, 10),
        current: 4,
        notes: [
            'Sprints 0, 1 e 2 estão concluídas.',
            'A Fase 4 foi iniciada com o recorte interno da Story 4.1.',
            'A convergência total com produção segue parcial e dependente de acesso válido à referência real do legado.',
            'O status detalhado e cumulativo do plano continua em `status-plano-implementacao-storybook-ds.md`.'
        ],
        phases: {
            0: { status: 'done', pct: 100 },
            1: { status: 'done', pct: 100 },
            2: { status: 'done', pct: 100 },
            3: { status: 'done', pct: 100 },
            4: { status: 'in-progress', pct: 50 }
        }
    }

    for (let i = 2; i < argv.length; i += 1) {
        const arg = argv[i]

        if (arg === '--file') {
            config.file = path.resolve(argv[++i])
            continue
        }

        if (arg === '--updated') {
            config.updated = argv[++i]
            continue
        }

        if (arg === '--current') {
            config.current = Number(argv[++i])
            continue
        }

        if (arg === '--note') {
            config.notes.push(argv[++i])
            continue
        }

        if (arg === '--clear-notes') {
            config.notes = []
            continue
        }

        if (arg === '--phase') {
            const raw = argv[++i]
            const match = raw.match(/^(\d+)=(done|in-progress|not-started|blocked)(?:@(\d{1,3}))?$/)
            if (!match) {
                throw new Error(`Formato invalido para --phase: ${raw}`)
            }

            const number = Number(match[1])
            const status = match[2]
            const pct = match[3] ? Number(match[3]) : STATUS_PCT[status]

            config.phases[number] = { status, pct }
            continue
        }

        throw new Error(`Argumento nao reconhecido: ${arg}`)
    }

    return config
}

function bar(percent, width = 10) {
    const safe = Math.max(0, Math.min(100, percent))
    const filled = Math.round((safe / 100) * width)
    return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}]`
}

function padRight(value, size) {
    const text = String(value)
    return text.length >= size ? text : `${text}${' '.repeat(size - text.length)}`
}

function buildPhaseLine(phase, phaseState) {
    const pct = phaseState?.pct ?? 0
    const status = phaseState?.status ?? 'not-started'
    const label = STATUS_LABELS[status] ?? STATUS_LABELS['not-started']

    return `${padRight(`FASE ${phase.number}`, 7)} ${bar(pct)} ${padRight(`${pct}%`, 5)} ${padRight(label, 14)} ${phase.title}`
}

function buildManagedBlock(config) {
    const currentPhase = PHASES.find((phase) => phase.number === config.current)
    if (!currentPhase) {
        throw new Error(`Fase atual invalida: ${config.current}`)
    }

    const lines = [
        START_MARKER,
        `Atualizado em: ${config.updated}`,
        '',
        `Fase atual principal: **Fase ${currentPhase.number} — ${currentPhase.title}**`,
        '',
        '```text',
        `>>> FASE ATUAL: ${currentPhase.number}`,
        ''
    ]

    for (const phase of PHASES) {
        lines.push(buildPhaseLine(phase, config.phases[phase.number]))
    }

    lines.push('```', '', 'Resumo operacional:', '')

    for (const note of config.notes) {
        lines.push(`- ${note}`)
    }

    lines.push(END_MARKER)
    return lines.join('\n')
}

function updateDocument(filePath, block) {
    const content = fs.readFileSync(filePath, 'utf8')

    if (content.includes(START_MARKER) && content.includes(END_MARKER)) {
        const pattern = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`)
        return content.replace(pattern, block)
    }

    const anchor = `${INSERT_AFTER_HEADING}\n`
    if (!content.includes(anchor)) {
        throw new Error(`Nao encontrei o heading de ancoragem "${INSERT_AFTER_HEADING}" em ${filePath}`)
    }

    return content.replace(anchor, `${anchor}\n${block}\n`)
}

function main() {
    const config = parseArgs(process.argv)

    if (!fs.existsSync(config.file)) {
        throw new Error(`Arquivo nao encontrado: ${config.file}`)
    }

    const block = buildManagedBlock(config)
    const updatedContent = updateDocument(config.file, block)
    fs.writeFileSync(config.file, updatedContent, 'utf8')

    console.log(`Status das fases atualizado em: ${config.file}`)
    console.log(`Fase atual: ${config.current}`)
}

try {
    main()
} catch (error) {
    console.error(`Erro: ${error.message}`)
    process.exit(1)
}