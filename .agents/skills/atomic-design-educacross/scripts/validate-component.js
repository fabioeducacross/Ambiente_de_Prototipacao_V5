#!/usr/bin/env node

/**
 * Script de Validação de Componentes Atomic Design
 * 
 * Valida se um componente Vue segue as convenções do Atomic Design Educacross:
 * - Localização correta (atoms/molecules/organisms/templates)
 * - Props com tipos definidos
 * - Emits declarados
 * - Estilos com scoped
 * - Nomenclatura BEM no CSS
 * - Ausência de utility classes no CSS
 * - Hierarquia de importação válida
 * 
 * Uso:
 *   node validate-component.js src/components/atoms/DayCell.vue
 *   node validate-component.js src/components/  # Valida todos
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Níveis de validação
 */
const ValidationLevel = {
  ATOM: 'atom',
  MOLECULE: 'molecule',
  ORGANISM: 'organism',
  TEMPLATE: 'template'
};

/**
 * Classe principal de validação
 */
class ComponentValidator {
  constructor(filePath) {
    this.filePath = filePath;
    this.fileName = path.basename(filePath);
    this.dirName = path.basename(path.dirname(filePath));
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.errors = [];
    this.warnings = [];
    this.level = this.detectLevel();
  }

  /**
   * Detecta o nível do componente pela localização
   */
  detectLevel() {
    if (this.filePath.includes('/atoms/')) return ValidationLevel.ATOM;
    if (this.filePath.includes('/molecules/')) return ValidationLevel.MOLECULE;
    if (this.filePath.includes('/organisms/')) return ValidationLevel.ORGANISM;
    if (this.filePath.includes('/templates/')) return ValidationLevel.TEMPLATE;
    
    this.errors.push('Componente não está em pasta atoms/, molecules/, organisms/ ou templates/');
    return null;
  }

  /**
   * Executa todas as validações
   */
  validate() {
    if (!this.level) return false;

    this.validatePropsDefinition();
    this.validateEmitsDefinition();
    this.validateScopedStyles();
    this.validateBEMNaming();
    this.validateNoUtilityClassesInCSS();
    this.validateImportHierarchy();
    
    // Validações específicas por nível
    switch (this.level) {
      case ValidationLevel.ATOM:
        this.validateAtomRules();
        break;
      case ValidationLevel.MOLECULE:
        this.validateMoleculeRules();
        break;
      case ValidationLevel.ORGANISM:
        this.validateOrganismRules();
        break;
      case ValidationLevel.TEMPLATE:
        this.validateTemplateRules();
        break;
    }

    return this.errors.length === 0;
  }

  /**
   * Valida se props têm tipos definidos
   */
  validatePropsDefinition() {
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      this.errors.push('Componente não tem seção <script>');
      return;
    }

    const scriptContent = scriptMatch[1];
    
    // Verifica se usa defineProps com TypeScript ou validação
    const hasDefineProps = scriptContent.includes('defineProps');
    
    if (hasDefineProps) {
      // Pattern: defineProps({ propName: Type })
      const propsMatch = scriptContent.match(/defineProps\s*<[\s\S]*?>|defineProps\s*\([\s\S]*?\)/);
      
      if (propsMatch) {
        const propsContent = propsMatch[0];
        
        // Verifica se props têm tipos (String, Number, Boolean, Object, Array, etc.)
        const propsWithoutType = propsContent.match(/:\s*{\s*(?!type|required|default|validator)/g);
        
        if (propsWithoutType && propsWithoutType.length > 0) {
          this.errors.push('Props sem tipo definido encontradas. Use { type: String, required: true, ... }');
        }
      }
    } else {
      // Se não usa defineProps, pode estar usando Options API
      const hasPropsObject = scriptContent.includes('props:');
      
      if (hasPropsObject) {
        this.warnings.push('Componente usa Options API. Prefira <script setup> + defineProps');
      }
    }
  }

  /**
   * Valida se emits estão declarados
   */
  validateEmitsDefinition() {
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return;

    const scriptContent = scriptMatch[1];
    
    // Verifica se há emits no template
    const templateMatch = this.content.match(/<template>([\s\S]*?)<\/template>/);
    if (templateMatch) {
      const templateContent = templateMatch[1];
      const hasEmitInTemplate = templateContent.includes('$emit(') || templateContent.includes('@click=') || templateContent.includes('@change=');
      
      if (hasEmitInTemplate) {
        // Deve ter defineEmits
        const hasDefineEmits = scriptContent.includes('defineEmits');
        
        if (!hasDefineEmits) {
          this.errors.push('Componente emite eventos mas não declara defineEmits');
        }
      }
    }
  }

  /**
   * Valida se estilos têm scoped
   */
  validateScopedStyles() {
    const styleMatch = this.content.match(/<style([^>]*)>/);
    
    if (styleMatch) {
      const styleTag = styleMatch[1];
      
      if (!styleTag.includes('scoped')) {
        this.errors.push('Estilos não têm atributo "scoped". Use <style scoped>');
      }
      
      // Verifica se usa SCSS/SASS
      if (!styleTag.includes('scss') && !styleTag.includes('sass')) {
        this.warnings.push('Considere usar <style scoped lang="scss"> para melhor organização');
      }
    }
  }

  /**
   * Valida nomenclatura BEM no CSS
   */
  validateBEMNaming() {
    const styleMatch = this.content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    
    if (styleMatch) {
      const styleContent = styleMatch[1];
      
      // Verifica se há classes CSS definidas
      const classesMatch = styleContent.match(/\.([a-zA-Z0-9_-]+)/g);
      
      if (classesMatch) {
        // Remove duplicatas
        const uniqueClasses = [...new Set(classesMatch)];
        
        // Extrai o nome do componente (ex: DayCell → day-cell)
        const componentName = this.fileName
          .replace('.vue', '')
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, '');
        
        // Verifica se classes seguem BEM pattern
        const invalidClasses = uniqueClasses.filter(cls => {
          const className = cls.replace('.', '');
          
          // Classes BEM válidas:
          // .component
          // .component__element
          // .component--modifier
          // .component__element--modifier
          const bemPattern = new RegExp(`^${componentName}(__[a-z-]+)?(--[a-z-]+)?$`);
          
          // Ignora pseudo-classes/elementos
          if (className.includes(':')) return false;
          
          return !bemPattern.test(className);
        });
        
        if (invalidClasses.length > 0) {
          this.warnings.push(`Classes CSS não seguem padrão BEM: ${invalidClasses.join(', ')}`);
        }
      }
    }
  }

  /**
   * Valida ausência de utility classes no CSS
   */
  validateNoUtilityClassesInCSS() {
    const styleMatch = this.content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    
    if (styleMatch) {
      const styleContent = styleMatch[1];
      
      // Utility classes comuns (Bootstrap, Tailwind, etc.)
      const utilityPatterns = [
        /\.m-[0-9]/,      // margin utilities
        /\.p-[0-9]/,      // padding utilities
        /\.d-flex/,       // display utilities
        /\.text-/,        // text utilities
        /\.bg-/,          // background utilities
        /\.w-[0-9]/,      // width utilities
        /\.h-[0-9]/,      // height utilities
        /\.justify-/,     // flexbox utilities
        /\.align-/,       // alignment utilities
      ];
      
      const foundUtilities = [];
      
      utilityPatterns.forEach(pattern => {
        const match = styleContent.match(pattern);
        if (match) {
          foundUtilities.push(match[0]);
        }
      });
      
      if (foundUtilities.length > 0) {
        this.errors.push(`Utility classes encontradas no CSS: ${foundUtilities.join(', ')}. Use classes utility diretamente no template HTML, não no <style>`);
      }
    }
  }

  /**
   * Valida hierarquia de importação
   */
  validateImportHierarchy() {
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return;

    const scriptContent = scriptMatch[1];
    const imports = scriptContent.match(/import\s+.*from\s+['"](.*)['"];?/g) || [];
    
    const componentImports = imports
      .filter(imp => imp.includes('components/'))
      .map(imp => {
        const match = imp.match(/from\s+['"](.*)['"]/);
        return match ? match[1] : '';
      });

    const invalidImports = [];

    componentImports.forEach(importPath => {
      switch (this.level) {
        case ValidationLevel.ATOM:
          // Átomos NÃO devem importar outros componentes
          if (importPath.includes('components/')) {
            invalidImports.push(`Átomo importando componente: ${importPath}`);
          }
          break;
          
        case ValidationLevel.MOLECULE:
          // Moléculas só importam átomos
          if (importPath.includes('/molecules/') || 
              importPath.includes('/organisms/') || 
              importPath.includes('/templates/')) {
            invalidImports.push(`Molécula importando componente inválido: ${importPath}`);
          }
          break;
          
        case ValidationLevel.ORGANISM:
          // Organismos só importam átomos e moléculas
          if (importPath.includes('/organisms/') || 
              importPath.includes('/templates/')) {
            invalidImports.push(`Organismo importando componente inválido: ${importPath}`);
          }
          break;
          
        case ValidationLevel.TEMPLATE:
          // Templates só importam organismos, não outros templates
          if (importPath.includes('/templates/')) {
            invalidImports.push(`Template importando outro template: ${importPath}`);
          }
          break;
      }
    });

    if (invalidImports.length > 0) {
      this.errors.push(`Hierarquia de importação violada:\n  ${invalidImports.join('\n  ')}`);
    }
  }

  /**
   * Validações específicas para átomos
   */
  validateAtomRules() {
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return;

    const scriptContent = scriptMatch[1];
    
    // Átomos não devem ter estado complexo
    if (scriptContent.includes('reactive(') || scriptContent.includes('useState(')) {
      this.warnings.push('Átomo com estado complexo. Considere promover para molécula ou organismo');
    }
    
    // Átomos não devem fazer fetch
    if (scriptContent.includes('fetch(') || scriptContent.includes('axios.') || scriptContent.includes('api.')) {
      this.errors.push('Átomo não deve fazer chamadas de API. Mova lógica para organismo');
    }
    
    // Props devem ser primitivas
    const propsMatch = scriptContent.match(/defineProps\s*\([\s\S]*?\)/);
    if (propsMatch) {
      const propsContent = propsMatch[0];
      
      if (propsContent.includes('type: Object') || propsContent.includes('type: Array')) {
        this.warnings.push('Átomo com props Object/Array. Considere usar props primitivas (String, Number, Boolean)');
      }
    }
  }

  /**
   * Validações específicas para moléculas
   */
  validateMoleculeRules() {
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return;

    const scriptContent = scriptMatch[1];
    
    // Moléculas não devem fazer fetch
    if (scriptContent.includes('fetch(') || scriptContent.includes('axios.') || scriptContent.includes('api.')) {
      this.errors.push('Molécula não deve fazer chamadas de API. Mova lógica para organismo');
    }
    
    // Moléculas não devem ter lógica de negócio complexa
    const hasComplexLogic = scriptContent.includes('computed(') && 
                           (scriptContent.match(/computed\(/g) || []).length > 3;
    
    if (hasComplexLogic) {
      this.warnings.push('Molécula com muitos computed. Considere promover para organismo');
    }
  }

  /**
   * Validações específicas para organismos
   */
  validateOrganismRules() {
    // Organismos têm mais liberdade, mas ainda seguem convenções
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return;

    const scriptContent = scriptMatch[1];
    
    // Verifica se gerencia estado (deve ter ref/reactive)
    const hasState = scriptContent.includes('ref(') || scriptContent.includes('reactive(');
    
    if (!hasState) {
      this.warnings.push('Organismo sem estado local. Verifique se não deveria ser uma molécula');
    }
  }

  /**
   * Validações específicas para templates
   */
  validateTemplateRules() {
    const templateMatch = this.content.match(/<template>([\s\S]*?)<\/template>/);
    if (!templateMatch) return;

    const templateContent = templateMatch[1];
    
    // Templates devem ter slots
    if (!templateContent.includes('<slot')) {
      this.errors.push('Template deve ter pelo menos um <slot> para composição');
    }
    
    // Templates não devem ter lógica de negócio
    const scriptMatch = this.content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      const scriptContent = scriptMatch[1];
      
      if (scriptContent.includes('fetch(') || scriptContent.includes('axios.') || scriptContent.includes('api.')) {
        this.errors.push('Template não deve fazer chamadas de API');
      }
      
      if (scriptContent.includes('computed(')) {
        this.warnings.push('Template com computed. Verifique se não há lógica de negócio que deveria estar em organismo');
      }
    }
  }

  /**
   * Imprime relatório de validação
   */
  printReport() {
    const levelName = this.level ? this.level.toUpperCase() : 'UNKNOWN';
    const levelColor = this.level ? colors.cyan : colors.red;
    
    console.log(`\n${levelColor}[${levelName}]${colors.reset} ${colors.blue}${this.fileName}${colors.reset}`);
    console.log(`  ${colors.magenta}Caminho:${colors.reset} ${this.filePath}`);
    
    if (this.errors.length > 0) {
      console.log(`\n  ${colors.red}❌ ERROS (${this.errors.length}):${colors.reset}`);
      this.errors.forEach(err => {
        console.log(`     • ${err}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log(`\n  ${colors.yellow}⚠️  AVISOS (${this.warnings.length}):${colors.reset}`);
      this.warnings.forEach(warn => {
        console.log(`     • ${warn}`);
      });
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(`  ${colors.green}✅ Componente válido!${colors.reset}`);
    }
    
    console.log('');
  }
}

/**
 * Valida um ou múltiplos arquivos
 */
async function validateFiles(pattern) {
  let files;
  
  if (fs.existsSync(pattern) && fs.statSync(pattern).isFile()) {
    // Arquivo único
    files = [pattern];
  } else if (fs.existsSync(pattern) && fs.statSync(pattern).isDirectory()) {
    // Diretório - busca todos .vue recursivamente
    files = await glob(`${pattern}/**/*.vue`);
  } else {
    // Pattern glob
    files = await glob(pattern);
  }
  
  if (files.length === 0) {
    console.error(`${colors.red}Nenhum arquivo encontrado para: ${pattern}${colors.reset}`);
    process.exit(1);
  }
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let validComponents = 0;
  
  console.log(`${colors.cyan}Validando ${files.length} componente(s)...${colors.reset}`);
  
  for (const file of files) {
    const validator = new ComponentValidator(file);
    const isValid = validator.validate();
    
    validator.printReport();
    
    totalErrors += validator.errors.length;
    totalWarnings += validator.warnings.length;
    
    if (isValid && validator.warnings.length === 0) {
      validComponents++;
    }
  }
  
  // Resumo final
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${colors.cyan}RESUMO DA VALIDAÇÃO${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Total de componentes: ${files.length}`);
  console.log(`${colors.green}✅ Válidos: ${validComponents}${colors.reset}`);
  console.log(`${colors.red}❌ Erros: ${totalErrors}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Avisos: ${totalWarnings}${colors.reset}`);
  console.log('');
  
  // Exit code baseado em erros
  if (totalErrors > 0) {
    process.exit(1);
  }
}

/**
 * Ponto de entrada
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`${colors.cyan}Uso:${colors.reset}`);
    console.log(`  node validate-component.js <arquivo.vue>`);
    console.log(`  node validate-component.js <diretório>`);
    console.log(`  node validate-component.js "src/components/**/*.vue"`);
    console.log('');
    console.log(`${colors.cyan}Exemplos:${colors.reset}`);
    console.log(`  node validate-component.js src/components/atoms/DayCell.vue`);
    console.log(`  node validate-component.js src/components/atoms/`);
    console.log(`  node validate-component.js src/components/`);
    process.exit(0);
  }
  
  const pattern = args[0];
  
  try {
    await validateFiles(pattern);
  } catch (error) {
    console.error(`${colors.red}Erro ao validar arquivos:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Executa se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { ComponentValidator, ValidationLevel };
