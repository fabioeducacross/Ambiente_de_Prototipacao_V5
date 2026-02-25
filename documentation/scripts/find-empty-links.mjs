/**
 * find-empty-links.mjs
 *
 * Lista todas as páginas que linkam para páginas sem conteúdo.
 *
 * Detecta três tipos de problema:
 *   1. Links quebrados — o arquivo de destino não existe
 *   2. Links para páginas stub — destino existe mas tem pouco conteúdo real
 *   3. Links para páginas placeholder — destino contém texto indicando "em construção"
 *
 * Uso:
 *   node scripts/find-empty-links.mjs
 *
 * Saída:
 *   Console: resumo
 *   Arquivo: reports/empty-links-report.md
 */

import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, relative, dirname, extname } from 'path';

// ---------------------------------------------------------------------------
// Configuração
// ---------------------------------------------------------------------------

const DOCS_DIR = resolve('./docs');
const REPORT_DIR = resolve('./reports');
const REPORT_FILE = join(REPORT_DIR, 'empty-links-report.md');

/** Número mínimo de linhas de conteúdo real para uma página NÃO ser considerada stub */
const STUB_THRESHOLD = 5;

/** Termos que indicam página placeholder / em construção */
const PLACEHOLDER_TERMS = [
  'Será criado',
  'será criado',
  'Em construção',
  'em construção',
  'TODO',
  'Em breve',
  'em breve',
  'Coming soon',
  'coming soon',
  'work in progress',
  'Work in Progress',
  'WIP',
  'a ser definido',
  'a ser criado',
  'placeholder',
  '🚧',
];

// ---------------------------------------------------------------------------
// Utilitários de sistema de arquivos
// ---------------------------------------------------------------------------

function getAllMdFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllMdFiles(fullPath));
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Parsing de arquivos
// ---------------------------------------------------------------------------

/**
 * Extrai o frontmatter (entre delimitadores ---) e o body do arquivo.
 */
function splitFrontmatterAndBody(content) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') {
    return { frontmatter: '', body: content };
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { frontmatter: '', body: content };
  }
  return {
    frontmatter: lines.slice(0, end + 1).join('\n'),
    body: lines.slice(end + 1).join('\n'),
  };
}

/**
 * Conta linhas de "conteúdo real" no body:
 * Ignora linhas vazias, headings (#), imports, linhas só com ---,
 * e linhas que são apenas tags HTML/JSX.
 */
function countContentLines(body) {
  const lines = body.split('\n');
  let count = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line === '---') continue;
    if (line.startsWith('#')) continue;
    if (line.startsWith('import ')) continue;
    if (/^<[A-Za-z/][^>]*\/?>$/.test(line)) continue; // tag JSX/HTML isolada
    if (line.startsWith(':::')) continue; // admonition docusaurus
    count++;
  }
  return count;
}

/**
 * Verifica se o body contém algum dos termos de placeholder.
 * Retorna array com os termos encontrados.
 */
function findPlaceholderTerms(body) {
  return PLACEHOLDER_TERMS.filter((term) => body.includes(term));
}

/**
 * Extrai todos os links internos do markdown.
 * Retorna array de { text, target }.
 */
function extractInternalLinks(body) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(body)) !== null) {
    const text = match[1];
    const target = match[2].trim();
    // Ignora links externos
    if (/^(https?|ftp|mailto):/.test(target)) continue;
    // Ignora âncoras puras
    if (target.startsWith('#')) continue;
    links.push({ text, target });
  }
  return links;
}

/**
 * Analisa um arquivo .md e retorna metadados.
 */
function parseFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = splitFrontmatterAndBody(content);
  const contentLines = countContentLines(body);
  const placeholderTerms = findPlaceholderTerms(body);
  const links = extractInternalLinks(body);

  return {
    path: filePath,
    relPath: relative(DOCS_DIR, filePath).replace(/\\/g, '/'),
    frontmatter,
    body,
    contentLines,
    links,
    isStub: contentLines < STUB_THRESHOLD,
    isPlaceholder: placeholderTerms.length > 0,
    placeholderTerms,
  };
}

// ---------------------------------------------------------------------------
// Resolução de links
// ---------------------------------------------------------------------------

/**
 * Dado o path do arquivo fonte e o target de um link,
 * tenta encontrar o arquivo de destino.
 *
 * Retorna { found: bool, resolvedPath: string|null }.
 */
function resolveLink(sourcePath, linkTarget) {
  // Remove âncora (ex: ../page#section → ../page)
  const cleanTarget = linkTarget.split('#')[0];
  if (!cleanTarget) return { found: false, resolvedPath: null };

  const sourceDir = dirname(sourcePath);
  const base = resolve(sourceDir, cleanTarget);

  // Candidatos a tentar
  const candidates = [
    base,
    base + '.md',
    base + '.mdx',
    join(base, 'index.md'),
    join(base, 'index.mdx'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return { found: true, resolvedPath: candidate };
    }
  }

  return { found: false, resolvedPath: null };
}

// ---------------------------------------------------------------------------
// Core: análise de todos os arquivos
// ---------------------------------------------------------------------------

function analyzeAll() {
  const files = getAllMdFiles(DOCS_DIR);

  // 1. Parse de todos os arquivos
  const parsed = new Map(); // path → parsedFile
  for (const f of files) {
    parsed.set(f, parseFile(f));
  }

  // 2. Para cada arquivo, analisa cada link interno
  const brokenLinks = [];    // { source, text, target }
  const stubLinks = [];      // { source, text, target, targetRelPath, contentLines }
  const placeholderLinks = []; // { source, text, target, targetRelPath, terms }

  for (const [, page] of parsed) {
    for (const { text, target } of page.links) {
      const { found, resolvedPath } = resolveLink(page.path, target);

      if (!found) {
        brokenLinks.push({
          source: page.relPath,
          text,
          target,
        });
        continue;
      }

      const targetPage = parsed.get(resolvedPath);
      if (!targetPage) continue; // não deveria acontecer

      if (targetPage.isPlaceholder) {
        placeholderLinks.push({
          source: page.relPath,
          text,
          target,
          targetRelPath: targetPage.relPath,
          terms: targetPage.placeholderTerms,
        });
      } else if (targetPage.isStub) {
        stubLinks.push({
          source: page.relPath,
          text,
          target,
          targetRelPath: targetPage.relPath,
          contentLines: targetPage.contentLines,
        });
      }
    }
  }

  // 3. Páginas stub e placeholder autônomas (independente de serem linkadas)
  const standaloneStubs = [...parsed.values()].filter((p) => p.isStub);
  const standalonePlaceholders = [...parsed.values()].filter((p) => p.isPlaceholder);

  return {
    brokenLinks,
    stubLinks,
    placeholderLinks,
    standaloneStubs,
    standalonePlaceholders,
    totalFiles: files.length,
  };
}

// ---------------------------------------------------------------------------
// Geração do relatório markdown
// ---------------------------------------------------------------------------

function generateReport(results) {
  const now = new Date().toISOString().slice(0, 10);
  const {
    brokenLinks,
    stubLinks,
    placeholderLinks,
    standaloneStubs,
    standalonePlaceholders,
    totalFiles,
  } = results;

  const lines = [];

  lines.push('# Relatório: Links para Páginas Sem Conteúdo');
  lines.push('');
  lines.push(`Gerado em: ${now} | Arquivos analisados: ${totalFiles}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Resumo');
  lines.push('');
  lines.push('| Tipo | Quantidade |');
  lines.push('|------|-----------|');
  lines.push(`| Links quebrados (destino não existe) | ${brokenLinks.length} |`);
  lines.push(`| Links para páginas stub | ${stubLinks.length} |`);
  lines.push(`| Links para páginas placeholder | ${placeholderLinks.length} |`);
  lines.push(`| Páginas stub (autônomas) | ${standaloneStubs.length} |`);
  lines.push(`| Páginas placeholder (autônomas) | ${standalonePlaceholders.length} |`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // --- Links quebrados ---
  lines.push('## Links Quebrados');
  lines.push('');
  lines.push('> Páginas que referenciam arquivos que **não existem** no projeto.');
  lines.push('');
  if (brokenLinks.length === 0) {
    lines.push('_Nenhum link quebrado encontrado._');
  } else {
    lines.push('| Página de Origem | Texto do Link | Caminho Referenciado |');
    lines.push('|------------------|---------------|----------------------|');
    for (const item of brokenLinks) {
      lines.push(`| \`${item.source}\` | ${item.text || '_(sem texto)_'} | \`${item.target}\` |`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // --- Links para stubs ---
  lines.push('## Links para Páginas Stub');
  lines.push('');
  lines.push(`> Páginas que linkam para destinos com menos de ${STUB_THRESHOLD} linhas de conteúdo real.`);
  lines.push('');
  if (stubLinks.length === 0) {
    lines.push('_Nenhum link para página stub encontrado._');
  } else {
    lines.push('| Página de Origem | Texto do Link | Página Alvo | Linhas de Conteúdo |');
    lines.push('|------------------|---------------|-------------|-------------------|');
    for (const item of stubLinks) {
      lines.push(`| \`${item.source}\` | ${item.text || '_(sem texto)_'} | \`${item.targetRelPath}\` | ${item.contentLines} |`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // --- Links para placeholders ---
  lines.push('## Links para Páginas Placeholder');
  lines.push('');
  lines.push('> Páginas que linkam para destinos com texto indicando "em construção".');
  lines.push('');
  if (placeholderLinks.length === 0) {
    lines.push('_Nenhum link para página placeholder encontrado._');
  } else {
    lines.push('| Página de Origem | Texto do Link | Página Alvo | Termo Encontrado |');
    lines.push('|------------------|---------------|-------------|-----------------|');
    for (const item of placeholderLinks) {
      const terms = item.terms.map((t) => `\`${t}\``).join(', ');
      lines.push(`| \`${item.source}\` | ${item.text || '_(sem texto)_'} | \`${item.targetRelPath}\` | ${terms} |`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // --- Páginas stub autônomas ---
  lines.push('## Páginas Stub (autônomas)');
  lines.push('');
  lines.push(`> Arquivos existentes com menos de ${STUB_THRESHOLD} linhas de conteúdo real.`);
  lines.push('');
  if (standaloneStubs.length === 0) {
    lines.push('_Nenhuma página stub encontrada._');
  } else {
    for (const p of standaloneStubs.sort((a, b) => a.relPath.localeCompare(b.relPath))) {
      lines.push(`- \`${p.relPath}\` — ${p.contentLines} linha(s) de conteúdo`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // --- Páginas placeholder autônomas ---
  lines.push('## Páginas Placeholder (autônomas)');
  lines.push('');
  lines.push('> Arquivos que contêm texto de placeholder / "em construção".');
  lines.push('');
  if (standalonePlaceholders.length === 0) {
    lines.push('_Nenhuma página placeholder encontrada._');
  } else {
    for (const p of standalonePlaceholders.sort((a, b) => a.relPath.localeCompare(b.relPath))) {
      const terms = p.placeholderTerms.map((t) => `"${t}"`).join(', ');
      lines.push(`- \`${p.relPath}\` — ${terms}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Saída no console
// ---------------------------------------------------------------------------

function printSummary(results) {
  const { brokenLinks, stubLinks, placeholderLinks, standaloneStubs, standalonePlaceholders, totalFiles } = results;

  console.log('');
  console.log('='.repeat(60));
  console.log('  find-empty-links — Relatório de Links para Páginas Vazias');
  console.log('='.repeat(60));
  console.log(`  Arquivos analisados : ${totalFiles}`);
  console.log(`  Links quebrados     : ${brokenLinks.length}`);
  console.log(`  Links → stubs       : ${stubLinks.length}`);
  console.log(`  Links → placeholder : ${placeholderLinks.length}`);
  console.log(`  Stubs autônomos     : ${standaloneStubs.length}`);
  console.log(`  Placeholders        : ${standalonePlaceholders.length}`);
  console.log('='.repeat(60));

  if (brokenLinks.length > 0) {
    console.log('\n[LINKS QUEBRADOS]');
    for (const item of brokenLinks) {
      console.log(`  ${item.source}`);
      console.log(`    → [${item.text}](${item.target})`);
    }
  }

  if (stubLinks.length > 0) {
    console.log('\n[LINKS PARA STUBS]');
    for (const item of stubLinks) {
      console.log(`  ${item.source}`);
      console.log(`    → [${item.text}] → ${item.targetRelPath} (${item.contentLines} linhas)`);
    }
  }

  if (placeholderLinks.length > 0) {
    console.log('\n[LINKS PARA PLACEHOLDERS]');
    for (const item of placeholderLinks) {
      console.log(`  ${item.source}`);
      console.log(`    → [${item.text}] → ${item.targetRelPath} (${item.terms.join(', ')})`);
    }
  }

  console.log(`\nRelatório completo: ${REPORT_FILE}`);
  console.log('');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const results = analyzeAll();
const report = generateReport(results);

mkdirSync(REPORT_DIR, { recursive: true });
writeFileSync(REPORT_FILE, report, 'utf8');

printSummary(results);
