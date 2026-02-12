#!/usr/bin/env node

/**
 * Script: generate-color-palette.cjs
 * Propósito: Gerar documentação visual da paleta Vuexy em SVG/PNG
 * Uso: node scripts/generate-color-palette.js [--format svg|png]
 */

const fs = require('fs');
const path = require('path');

// Paleta de cores Vuexy
const colors = {
  primary: {
    name: 'Primary',
    base: '#7367F0',
    rgb: 'rgb(115, 103, 240)',
    hover: '#6258d4',
    light: '#9E95F5',
    usage: 'Ações principais, links, missões'
  },
  success: {
    name: 'Success',
    base: '#28C76F',
    rgb: 'rgb(40, 199, 111)',
    hover: '#24b263',
    light: '#48E68B',
    usage: 'Sucesso, confirmações, iniciante'
  },
  warning: {
    name: 'Warning',
    base: '#FF9F43',
    rgb: 'rgb(255, 159, 67)',
    hover: '#e68a2e',
    light: '#FFBC69',
    usage: 'Avisos, intermediário, avaliações'
  },
  danger: {
    name: 'Danger',
    base: '#EA5455',
    rgb: 'rgb(234, 84, 85)',
    hover: '#d33b3c',
    light: '#F07071',
    usage: 'Erros, exclusões, avançado'
  },
  info: {
    name: 'Info',
    base: '#00CFE8',
    rgb: 'rgb(0, 207, 232)',
    hover: '#00b8cf',
    light: '#26E3F5',
    usage: 'Informações, olimpíadas'
  },
  secondary: {
    name: 'Secondary',
    base: '#82868B',
    rgb: 'rgb(130, 134, 139)',
    hover: '#6e7175',
    light: '#9EA1A5',
    usage: 'Elementos secundários, desabilitados'
  }
};

// Cores de texto e background
const neutrals = {
  textPrimary: {
    name: 'Text Primary',
    color: 'rgba(47, 43, 61, 0.9)',
    usage: 'Títulos, textos principais'
  },
  textSecondary: {
    name: 'Text Secondary',
    color: 'rgba(47, 43, 61, 0.6)',
    usage: 'Subtítulos, metadata'
  },
  textDisabled: {
    name: 'Text Disabled',
    color: 'rgba(47, 43, 61, 0.4)',
    usage: 'Elementos desabilitados'
  },
  bgLight: {
    name: 'Background Light',
    color: '#F8F9FA',
    usage: 'Background da página'
  }
};

/**
 * Gera SVG da paleta de cores
 */
function generateSVG() {
  const width = 1200;
  const height = 900;
  const cardWidth = 180;
  const cardHeight = 140;
  const margin = 20;
  const cols = 6;
  
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="font-family: Montserrat, sans-serif;">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#F8F9FA"/>
  
  <!-- Título -->
  <text x="${width/2}" y="40" text-anchor="middle" font-size="32" font-weight="700" fill="#2F2B3D">
    Vuexy Color Palette - Educacross
  </text>
  
  <text x="${width/2}" y="70" text-anchor="middle" font-size="14" fill="rgba(47,43,61,0.6)">
    Design System | 6 cores principais + variantes
  </text>
  
`;

  // Renderizar cards de cores principais
  let index = 0;
  Object.entries(colors).forEach(([key, color]) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = margin + col * (cardWidth + margin);
    const y = 100 + row * (cardHeight + margin);
    
    svg += `
  <!-- ${color.name} -->
  <g filter="url(#shadow)">
    <!-- Base color -->
    <rect x="${x}" y="${y}" width="${cardWidth}" height="80" rx="8" fill="${color.base}"/>
    
    <!-- Color name -->
    <text x="${x + cardWidth/2}" y="${y + 35}" text-anchor="middle" font-size="16" font-weight="600" fill="white">
      ${color.name}
    </text>
    
    <!-- HEX -->
    <text x="${x + cardWidth/2}" y="${y + 55}" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.9)">
      ${color.base}
    </text>
    
    <!-- RGB -->
    <text x="${x + cardWidth/2}" y="${y + 70}" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">
      ${color.rgb}
    </text>
    
    <!-- Variantes (hover e light) -->
    <rect x="${x}" y="${y + 85}" width="${cardWidth/2 - 2}" height="30" rx="4" fill="${color.hover}"/>
    <rect x="${x + cardWidth/2 + 2}" y="${y + 85}" width="${cardWidth/2 - 2}" height="30" rx="4" fill="${color.light}"/>
    
    <text x="${x + cardWidth/4}" y="${y + 105}" text-anchor="middle" font-size="9" fill="white">
      Hover
    </text>
    <text x="${x + 3*cardWidth/4}" y="${y + 105}" text-anchor="middle" font-size="9" fill="white">
      Light
    </text>
    
    <!-- Usage -->
    <text x="${x + cardWidth/2}" y="${y + 130}" text-anchor="middle" font-size="9" fill="rgba(47,43,61,0.7)">
      ${color.usage}
    </text>
  </g>
`;
    
    index++;
  });
  
  // Seção de cores neutras
  const neutralY = 100 + 2 * (cardHeight + margin) + 40;
  
  svg += `
  <!-- Neutrals Section -->
  <text x="${margin}" y="${neutralY}" font-size="20" font-weight="600" fill="#2F2B3D">
    Neutrals & Text Colors
  </text>
`;
  
  let neutralIndex = 0;
  Object.entries(neutrals).forEach(([key, neutral]) => {
    const x = margin + neutralIndex * (cardWidth + margin);
    const y = neutralY + 20;
    
    // Determinar cor de texto (branco ou preto) baseado no background
    const textColor = neutral.color.startsWith('#') ? '#2F2B3D' : 'white';
    const bgColor = neutral.color.startsWith('#') ? neutral.color : '#FFFFFF';
    const borderColor = bgColor === '#FFFFFF' ? 'rgba(47,43,61,0.2)' : 'none';
    
    svg += `
  <g filter="url(#shadow)">
    <rect x="${x}" y="${y}" width="${cardWidth}" height="100" rx="8" fill="${bgColor}" stroke="${borderColor}" stroke-width="1"/>
    
    <text x="${x + cardWidth/2}" y="${y + 35}" text-anchor="middle" font-size="14" font-weight="600" fill="${textColor}">
      ${neutral.name}
    </text>
    
    <text x="${x + cardWidth/2}" y="${y + 55}" text-anchor="middle" font-size="11" fill="${textColor}" opacity="0.8">
      ${neutral.color}
    </text>
    
    <text x="${x + cardWidth/2}" y="${y + 80}" text-anchor="middle" font-size="9" fill="${textColor}" opacity="0.7">
      ${neutral.usage}
    </text>
  </g>
`;
    
    neutralIndex++;
  });
  
  // Seção de gradientes
  const gradY = neutralY + 150;
  
  svg += `
  <!-- Gradients Section -->
  <text x="${margin}" y="${gradY}" font-size="20" font-weight="600" fill="#2F2B3D">
    Gradients
  </text>
  
  <defs>
    <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7367F0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9E95F5;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="gradSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#28C76F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#48E68B;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="gradWarning" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF9F43;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFBC69;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="gradInfo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00CFE8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#26E3F5;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <g filter="url(#shadow)">
    <rect x="${margin}" y="${gradY + 20}" width="270" height="60" rx="8" fill="url(#gradPrimary)"/>
    <text x="${margin + 135}" y="${gradY + 55}" text-anchor="middle" font-size="14" font-weight="600" fill="white">
      Primary Gradient
    </text>
  </g>
  
  <g filter="url(#shadow)">
    <rect x="${margin + 290}" y="${gradY + 20}" width="270" height="60" rx="8" fill="url(#gradSuccess)"/>
    <text x="${margin + 425}" y="${gradY + 55}" text-anchor="middle" font-size="14" font-weight="600" fill="white">
      Success Gradient
    </text>
  </g>
  
  <g filter="url(#shadow)">
    <rect x="${margin + 580}" y="${gradY + 20}" width="270" height="60" rx="8" fill="url(#gradWarning)"/>
    <text x="${margin + 715}" y="${gradY + 55}" text-anchor="middle" font-size="14" font-weight="600" fill="white">
      Warning Gradient
    </text>
  </g>
  
  <g filter="url(#shadow)">
    <rect x="${margin + 870}" y="${gradY + 20}" width="270" height="60" rx="8" fill="url(#gradInfo)"/>
    <text x="${margin + 1005}" y="${gradY + 55}" text-anchor="middle" font-size="14" font-weight="600" fill="white">
      Info Gradient
    </text>
  </g>
  
  <!-- Footer -->
  <text x="${width/2}" y="${height - 20}" text-anchor="middle" font-size="11" fill="rgba(47,43,61,0.5)">
    Gerado em ${new Date().toLocaleDateString('pt-BR')} | Educacross Design System v1.0.0
  </text>
  
</svg>`;
  
  return svg;
}

/**
 * Gera JSON da палета
 */
function generateJSON() {
  const palette = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    colors: {},
    neutrals: {},
    gradients: {}
  };
  
  // Colors
  Object.entries(colors).forEach(([key, color]) => {
    palette.colors[key] = {
      name: color.name,
      base: color.base,
      rgb: color.rgb,
      hover: color.hover,
      light: color.light,
      usage: color.usage
    };
  });
  
  // Neutrals
  Object.entries(neutrals).forEach(([key, neutral]) => {
    palette.neutrals[key] = {
      name: neutral.name,
      color: neutral.color,
      usage: neutral.usage
    };
  });
  
  // Gradients
  palette.gradients = {
    primary: 'linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)',
    success: 'linear-gradient(135deg, #28C76F 0%, #48E68B 100%)',
    warning: 'linear-gradient(135deg, #FF9F43 0%, #FFBC69 100%)',
    info: 'linear-gradient(135deg, #00CFE8 0%, #26E3F5 100%)'
  };
  
  return JSON.stringify(palette, null, 2);
}

/**
 * Gerar CSS custom properties
 */
function generateCSS() {
  let css = `/* Vuexy Color Palette - Auto-generated */
/* Generated: ${new Date().toISOString()} */

:root {
  /* Primary colors */
`;

  Object.entries(colors).forEach(([key, color]) => {
    css += `  --${key}: ${color.base};\n`;
    css += `  --${key}-hover: ${color.hover};\n`;
    css += `  --${key}-light: ${color.light};\n`;
  });
  
  css += `\n  /* Neutral colors */\n`;
  
  Object.entries(neutrals).forEach(([key, neutral]) => {
    const varName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    css += `  --${varName}: ${neutral.color};\n`;
  });
  
  css += `\n  /* Gradients */\n`;
  css += `  --gradient-primary: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);\n`;
  css += `  --gradient-success: linear-gradient(135deg, #28C76F 0%, #48E68B 100%);\n`;
  css += `  --gradient-warning: linear-gradient(135deg, #FF9F43 0%, #FFBC69 100%);\n`;
  css += `  --gradient-info: linear-gradient(135deg, #00CFE8 0%, #26E3F5 100%);\n`;
  
  css += `}\n`;
  
  return css;
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2);
  const format = args[0] || 'svg';
  
  console.log('🎨 Vuexy Color Palette Generator\n');
  
  const outputDir = path.join(__dirname, '../assets');
  
  // Criar diretório se não existir
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Gerar SVG
  if (format === 'svg' || format === 'all') {
    const svg = generateSVG();
    const svgPath = path.join(outputDir, 'vuexy-palette.svg');
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ SVG gerado: ${svgPath}`);
  }
  
  // Gerar JSON
  if (format === 'json' || format === 'all') {
    const json = generateJSON();
    const jsonPath = path.join(outputDir, 'vuexy-palette.json');
    fs.writeFileSync(jsonPath, json);
    console.log(`✅ JSON gerado: ${jsonPath}`);
  }
  
  // Gerar CSS
  if (format === 'css' || format === 'all') {
    const css = generateCSS();
    const cssPath = path.join(outputDir, 'vuexy-palette.css');
    fs.writeFileSync(cssPath, css);
    console.log(`✅ CSS gerado: ${cssPath}`);
  }
  
  console.log('\n🎉 Paleta gerada com sucesso!');
  console.log('\nUso:');
  console.log('  - SVG: abrir assets/vuexy-palette.svg em navegador');
  console.log('  - JSON: importar para ferramentas de design');
  console.log('  - CSS: adicionar ao projeto para usar custom properties');
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { generateSVG, generateJSON, generateCSS };
