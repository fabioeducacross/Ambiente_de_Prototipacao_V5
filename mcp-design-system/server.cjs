/**
 * mcp-design-system/server.cjs
 *
 * MCP Server (stdio) para lookup on-demand de componentes do educacross-frontoffice.
 * Expõe 4 ferramentas ao GitHub Copilot:
 *   - list_components  : lista todos os .vue em src/components/
 *   - get_component    : lê e retorna o conteúdo de um componente pelo caminho relativo
 *   - get_consts       : lê um arquivo de src/consts/
 *   - search_component : busca componente por nome parcial
 *
 * Registrado em mcp.json como type "stdio".
 * O VS Code inicia este processo automaticamente ao abrir o workspace.
 */

const { McpServer } = require('./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js')
const { StdioServerTransport } = require('./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js')
const fs = require('fs')
const path = require('path')
const { z } = require('zod')

// ─── Configuração do caminho base ────────────────────────────────────────────

const FRONTOFFICE_BASE = path.resolve(
  process.env.FRONTOFFICE_PATH ||
  'C:/Users/Educacross/Documents/Educacross/educacross-frontoffice/educacross-frontoffice/src'
)

const COMPONENTS_DIR = path.join(FRONTOFFICE_BASE, 'components')
const CONSTS_DIR     = path.join(FRONTOFFICE_BASE, 'consts')
const SCSS_DIR       = path.join(FRONTOFFICE_BASE, 'assets', 'scss')
const STORE_DIR      = path.join(FRONTOFFICE_BASE, 'store')

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Varredura recursiva que retorna todos os arquivos com extensão dada.
 */
function walkDir(dir, ext) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath, ext))
    } else if (!ext || entry.name.endsWith(ext)) {
      results.push(fullPath)
    }
  }
  return results
}

/**
 * Retorna caminho relativo a uma base, com separadores unix.
 */
function relPath(base, full) {
  return path.relative(base, full).replace(/\\/g, '/')
}

/**
 * Lê um arquivo com segurança, limitando a MAX_CHARS caracteres.
 */
const MAX_CHARS = 24_000
function safeRead(filePath) {
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, 'utf8')
  if (content.length > MAX_CHARS) {
    return content.slice(0, MAX_CHARS) + `\n\n[... truncado em ${MAX_CHARS} chars — arquivo tem ${content.length} chars total]`
  }
  return content
}

/**
 * Garante que o caminho resolvido esteja dentro da base (evita path traversal).
 */
function safePath(base, userPath) {
  const resolved = path.resolve(base, userPath)
  if (!resolved.startsWith(path.resolve(base))) {
    throw new Error('Caminho inválido: fora do diretório permitido')
  }
  return resolved
}

// ─── MCP Server ───────────────────────────────────────────────────────────────

const server = new McpServer({
  name: 'educacross-design-system',
  version: '1.0.0',
})

// ─── Tool: list_components ────────────────────────────────────────────────────
server.tool(
  'list_components',
  'Lista todos os componentes Vue do educacross-frontoffice agrupados por pasta. Use antes de get_component para descobrir o caminho exato.',
  {},
  async () => {
    const files = walkDir(COMPONENTS_DIR, '.vue')

    // Agrupar por pasta
    const groups = {}
    for (const f of files) {
      const rel    = relPath(COMPONENTS_DIR, f)
      const folder = rel.includes('/') ? rel.split('/')[0] : '(raiz)'
      if (!groups[folder]) groups[folder] = []
      groups[folder].push(rel)
    }

    const lines = [`Total: ${files.length} componentes\n`]
    for (const [folder, items] of Object.entries(groups).sort()) {
      lines.push(`📁 ${folder}/`)
      items.sort().forEach(i => lines.push(`   • ${i}`))
    }

    return {
      content: [{ type: 'text', text: lines.join('\n') }],
    }
  }
)

// ─── Tool: get_component ──────────────────────────────────────────────────────
server.tool(
  'get_component',
  'Lê e retorna o conteúdo completo de um componente Vue pelo caminho relativo (ex: "badge/BadgeStatus.vue"). Inclui template, script e style.',
  { componentPath: z.string().describe('Caminho relativo dentro de src/components/, ex: "table/ListTable.vue"') },
  async ({ componentPath }) => {
    let filePath
    try {
      filePath = safePath(COMPONENTS_DIR, componentPath)
    } catch {
      return { content: [{ type: 'text', text: `Erro: caminho inválido "${componentPath}"` }], isError: true }
    }

    const content = safeRead(filePath)
    if (!content) {
      // Tentar busca parcial como fallback
      const name    = path.basename(componentPath)
      const matches = walkDir(COMPONENTS_DIR, '.vue').filter(f => path.basename(f) === name)
      if (matches.length === 1) {
        const fallback = safeRead(matches[0])
        return {
          content: [{
            type: 'text',
            text: `[Redirecionado para: ${relPath(COMPONENTS_DIR, matches[0])}]\n\n${fallback}`,
          }],
        }
      }
      if (matches.length > 1) {
        return {
          content: [{
            type: 'text',
            text: `Componente não encontrado em "${componentPath}". Matches parciais:\n${matches.map(m => relPath(COMPONENTS_DIR, m)).join('\n')}`,
          }],
          isError: true,
        }
      }
      return { content: [{ type: 'text', text: `Componente não encontrado: "${componentPath}"` }], isError: true }
    }

    return { content: [{ type: 'text', text: content }] }
  }
)

// ─── Tool: get_consts ─────────────────────────────────────────────────────────
server.tool(
  'get_consts',
  'Lê um arquivo de src/consts/ ou src/store/ do frontoffice. Útil para enums, legends, useFilters e SubjectEnum. Ex: "legends/index.js", "SubjectEnum.js", "filters/useFilters.js".',
  { fileName: z.string().describe('Caminho relativo dentro de src/consts/ ou src/store/, ex: "legends/index.js"') },
  async ({ fileName }) => {
    // Tenta em consts/ primeiro, depois em store/
    let filePath = null
    const candidates = [
      safePath(CONSTS_DIR, fileName),
      safePath(STORE_DIR,  fileName),
      safePath(SCSS_DIR,   fileName),
    ]

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        filePath = candidate
        break
      }
    }

    if (!filePath) {
      // Busca parcial pelo nome do arquivo em consts/
      const name    = path.basename(fileName)
      const matches = walkDir(CONSTS_DIR, null).filter(f => path.basename(f) === name)
      if (matches.length) {
        filePath = matches[0]
      }
    }

    if (!filePath) {
      return {
        content: [{ type: 'text', text: `Arquivo não encontrado: "${fileName}"` }],
        isError: true,
      }
    }

    const content = safeRead(filePath)
    return { content: [{ type: 'text', text: content }] }
  }
)

// ─── Tool: search_component ───────────────────────────────────────────────────
server.tool(
  'search_component',
  'Busca componentes Vue por nome parcial (case-insensitive). Retorna a lista de caminhos relativos que contêm o termo. Use quando não souber o caminho exato.',
  { query: z.string().describe('Nome parcial do componente, ex: "mission", "table", "badge"') },
  async ({ query }) => {
    const q       = query.toLowerCase()
    const files   = walkDir(COMPONENTS_DIR, '.vue')
    const matches = files.filter(f => relPath(COMPONENTS_DIR, f).toLowerCase().includes(q))

    if (!matches.length) {
      return { content: [{ type: 'text', text: `Nenhum componente encontrado para "${query}"` }] }
    }

    const lines = [`${matches.length} resultado(s) para "${query}":\n`]
    matches.sort().forEach(m => lines.push(`• ${relPath(COMPONENTS_DIR, m)}`))

    return { content: [{ type: 'text', text: lines.join('\n') }] }
  }
)

// ─── Tool: get_scss ───────────────────────────────────────────────────────────
server.tool(
  'get_scss',
  'Lê arquivos SCSS do frontoffice. Use para verificar variáveis, mixins e utilitários. Ex: "variables/_variables.scss", "main.scss".',
  { scssPath: z.string().describe('Caminho relativo dentro de src/assets/scss/, ex: "variables/_variables.scss"') },
  async ({ scssPath }) => {
    let filePath
    try {
      filePath = safePath(SCSS_DIR, scssPath)
    } catch {
      return { content: [{ type: 'text', text: `Caminho inválido: "${scssPath}"` }], isError: true }
    }

    const content = safeRead(filePath)
    if (!content) {
      return { content: [{ type: 'text', text: `Arquivo SCSS não encontrado: "${scssPath}"` }], isError: true }
    }

    return { content: [{ type: 'text', text: content }] }
  }
)

// ─── Iniciar transporte stdio ─────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  // stderr é seguro para logs (stdout é reservado para protocolo MCP)
  process.stderr.write('✅ educacross-design-system MCP server iniciado (stdio)\n')
}

main().catch(err => {
  process.stderr.write(`❌ Erro ao iniciar MCP: ${err.message}\n`)
  process.exit(1)
})
