/**
 * Script para migrar emojis para Material Icons
 * Executa substituições em batch nos arquivos .md e .mdx
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de emojis para componentes React
const emojiToIcon = {
  // Status
  '✅': '<IconCheck />',
  '❌': '<IconX />',
  '⚠️': '<IconWarning />',
  '🚧': '<IconConstruction />',
  '⏳': '<IconPending />',
  '🔄': '<IconRefresh />',
  
  // Prioridades
  '🔴': '<IconCircleRed />',
  '🟡': '<IconCircleYellow />',
  '🟢': '<IconCircleGreen />',
  
  // Personas
  '👨‍🏫': '<IconTeacher />',
  '👨‍💼': '<IconAdmin />',
  '👨‍🎓': '<IconStudent />',
  '🎓': '<IconGraduation />',
  
  // Navegação
  '🏠': '<IconHome />',
  '🔗': '<IconLink />',
  '🔍': '<IconSearch />',
  '👁️': '<IconEye />',
  '⚙️': '<IconSettings />',
  
  // Conteúdo
  '📚': '<IconBooks />',
  '📖': '<IconBookOpen />',
  '📋': '<IconClipboard />',
  '📝': '<IconEdit />',
  '📄': '<IconDocument />',
  
  // Dados
  '📊': '<IconChart />',
  '📈': '<IconTrending />',
  '🎯': '<IconTarget />',
  
  // Funcionalidades
  '🎮': '<IconGame />',
  '💡': '<IconLightbulb />',
  '✨': '<IconSparkle />',
  '🚀': '<IconRocket />',
  '🎨': '<IconPalette />',
  
  // Arquitetura
  '📐': '<IconArchitecture />',
  '🧩': '<IconExtension />',
  '🔌': '<IconApi />',
  '🛣️': '<IconRoute />',
  '🗄️': '<IconStorage />',
  
  // Comunicação
  '📞': '<IconPhone />',
  '📡': '<IconAntenna />',
  '🌐': '<IconGlobe />',
  
  // Colaboração
  '🤝': '<IconHandshake />',
  '📸': '<IconCamera />',
  
  // Outros
  '🏆': '<IconTrending />',
  '💻': '<IconCode />',
  '🖥️': '<IconCode />',
  '📱': '<IconCode />',
  '🔧': '<IconSettings />',
  '⭐': '<IconSparkle />',
};

// Arquivos que devem ser ignorados (documentação de referência)
const ignoreFiles = [
  'icons-mapping.md',
  'ICON_MIGRATION_REPORT.md',
];

// Diretório raiz dos docs
const docsDir = path.join(__dirname, '..', 'docs');

// Encontra todos os ícones usados em um conteúdo
function findUsedIcons(content) {
  const usedIcons = new Set();
  
  for (const [emoji, iconComponent] of Object.entries(emojiToIcon)) {
    if (content.includes(emoji)) {
      // Extrai o nome do componente
      const match = iconComponent.match(/<(\w+)/);
      if (match) {
        usedIcons.add(match[1]);
      }
    }
  }
  
  return Array.from(usedIcons);
}

// Gera a linha de import
function generateImport(icons) {
  if (icons.length === 0) return '';
  
  // Ordena alfabeticamente
  icons.sort();
  
  // Se tiver muitos ícones, quebra em múltiplas linhas
  if (icons.length > 5) {
    return `import {\n  ${icons.join(',\n  ')}\n} from '@site/src/components/MaterialIcon';\n`;
  }
  
  return `import { ${icons.join(', ')} } from '@site/src/components/MaterialIcon';\n`;
}

// Processa um arquivo
function processFile(filePath) {
  const fileName = path.basename(filePath);
  
  // Verifica se deve ignorar
  if (ignoreFiles.some(f => fileName.includes(f))) {
    console.log(`⏭️  Ignorando: ${fileName}`);
    return { skipped: true };
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Encontra emojis usados
  const usedIcons = findUsedIcons(content);
  
  if (usedIcons.length === 0) {
    console.log(`✓ Sem emojis: ${path.relative(docsDir, filePath)}`);
    return { unchanged: true };
  }
  
  // Substitui emojis
  for (const [emoji, icon] of Object.entries(emojiToIcon)) {
    content = content.split(emoji).join(icon);
  }
  
  // Verifica se já tem import
  const hasImport = content.includes("from '@site/src/components/MaterialIcon'");
  
  if (!hasImport) {
    // Encontra onde inserir o import (após o frontmatter)
    const importStatement = generateImport(usedIcons);
    
    // Verifica se tem frontmatter
    if (content.startsWith('---')) {
      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd !== -1) {
        const insertPos = frontmatterEnd + 4; // Após o ---\n
        content = content.slice(0, insertPos) + '\n' + importStatement + content.slice(insertPos);
      }
    } else {
      // Sem frontmatter, adiciona no início
      content = importStatement + '\n' + content;
    }
  } else {
    // Atualiza import existente se necessário
    const importMatch = content.match(/import \{([^}]+)\} from '@site\/src\/components\/MaterialIcon'/);
    if (importMatch) {
      const existingIcons = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      const allIcons = [...new Set([...existingIcons, ...usedIcons])].sort();
      
      if (allIcons.length > existingIcons.length) {
        const newImport = generateImport(allIcons);
        content = content.replace(/import \{[^}]+\} from '@site\/src\/components\/MaterialIcon';?\n?/, newImport);
      }
    }
  }
  
  // Salva apenas se houver mudanças
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Atualizado: ${path.relative(docsDir, filePath)} (${usedIcons.length} ícones)`);
    return { updated: true, icons: usedIcons.length };
  }
  
  return { unchanged: true };
}

// Encontra todos os arquivos .md e .mdx recursivamente
function findFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findFiles(fullPath, files);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Executa migração
console.log('\n🔄 Iniciando migração de emojis para Material Icons...\n');
console.log(`📂 Diretório: ${docsDir}\n`);

const files = findFiles(docsDir);
console.log(`📄 Arquivos encontrados: ${files.length}\n`);

let stats = { updated: 0, unchanged: 0, skipped: 0, totalIcons: 0 };

for (const file of files) {
  const result = processFile(file);
  
  if (result.updated) {
    stats.updated++;
    stats.totalIcons += result.icons || 0;
  } else if (result.skipped) {
    stats.skipped++;
  } else {
    stats.unchanged++;
  }
}

console.log('\n📊 Resumo:');
console.log(`   ✅ Atualizados: ${stats.updated}`);
console.log(`   ➖ Sem mudanças: ${stats.unchanged}`);
console.log(`   ⏭️  Ignorados: ${stats.skipped}`);
console.log(`   🎯 Total de ícones migrados: ${stats.totalIcons}`);
console.log('\n✨ Migração concluída!\n');
