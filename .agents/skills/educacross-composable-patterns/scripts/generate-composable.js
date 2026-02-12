#!/usr/bin/env node

/**
 * Generate Composable Script
 * 
 * Gera boilerplate para novos composables Vue 3 seguindo patterns Educacross
 * 
 * Uso:
 *   node generate-composable.js useMyFeature
 *   node generate-composable.js useEventForm --with-validation
 *   node generate-composable.js usePagination --type="generic"
 * 
 * Flags:
 *   --with-validation     Inclui ref errors e isValid
 *   --with-api            Inclui estado loading/error para chamadas API
 *   --type="generic"      Composable genérico (sem lógica específica de negócio)
 *   --type="business"     Composable de lógica de negócio (padrão)
 */

const fs = require('fs')
const path = require('path')

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function parseArgs() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args[0].startsWith('--')) {
    log('❌ Erro: Nome do composable é obrigatório', 'red')
    log('')
    log('Uso: node generate-composable.js <nome>', 'cyan')
    log('Exemplo: node generate-composable.js useEventForm', 'dim')
    process.exit(1)
  }

  let name = args[0]
  
  // Validar nome
  if (!name.startsWith('use')) {
    log('⚠️  Aviso: Composables devem começar com "use"', 'yellow')
    name = 'use' + name.charAt(0).toUpperCase() + name.slice(1)
    log(`   Renomeando para: ${name}`, 'dim')
  }

  const flags = {
    withValidation: args.includes('--with-validation'),
    withApi: args.includes('--with-api'),
    type: 'business' // default
  }

  // Parse --type flag
  const typeArg = args.find(arg => arg.startsWith('--type='))
  if (typeArg) {
    flags.type = typeArg.split('=')[1]
    if (!['generic', 'business'].includes(flags.type)) {
      log(`❌ Erro: --type deve ser "generic" ou "business"`, 'red')
      process.exit(1)
    }
  }

  return { name, flags }
}

function generateGenericTemplate(name) {
  const functionName = name
  const description = `Generic logic for ${name.replace('use', '')}`

  return `import { ref, computed } from 'vue'

/**
 * ${functionName}
 * 
 * ${description}
 * 
 * @returns {Object} Composable API
 * 
 * @example
 * const { data, isLoading, fetch } = ${functionName}()
 * await fetch()
 * console.log(data.value)
 */
export function ${functionName}() {
  // Estado
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Computed
  const hasData = computed(() => data.value !== null)

  // Ações
  const fetch = async () => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Implementar lógica
      await new Promise(resolve => setTimeout(resolve, 1000))
      data.value = { message: 'Success' }
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
  }

  return {
    // Estado
    data,
    isLoading,
    error,
    
    // Computed
    hasData,
    
    // Ações
    fetch,
    reset
  }
}
`
}

function generateBusinessTemplate(name, flags) {
  const functionName = name
  const entityName = name.replace('use', '').replace('Form', '')
  const description = `Business logic for ${entityName}`

  let imports = ['ref', 'computed']
  if (flags.withApi) {
    imports.push('watch')
  }

  let template = `import { ${imports.join(', ')} } from 'vue'
`

  if (flags.withValidation) {
    template += `import { ${name}Validation } from './${name}Validation'\n`
  }

  template += `
/**
 * ${functionName}
 * 
 * ${description}
 * 
 * @param {Object} initialData - Dados iniciais (opcional)
 * @returns {Object} Composable API
 * 
 * @example
 * const { form, isValid, submit, reset } = ${functionName}()
 * form.value.field = 'value'
 * if (isValid.value) {
 *   await submit(apiFunction)
 * }
 */
export function ${functionName}(initialData = {}) {
  // Estado do formulário
  const form = ref({
    // TODO: Definir campos
    field1: '',
    field2: '',
    ...initialData
  })

`

  if (flags.withApi) {
    template += `  // Estado de API
  const isSubmitting = ref(false)
  const submitError = ref(null)

`
  }

  if (flags.withValidation) {
    template += `  // Validação
  const { validate, errors, isValid } = ${name}Validation()

  // Computed: pode submeter?
  const canSubmit = computed(() => {
    return isValid.value${flags.withApi ? ' && !isSubmitting.value' : ''}
  })

`
  } else {
    template += `  // Computed
  const isValid = computed(() => {
    // TODO: Implementar validação
    return form.value.field1.length > 0
  })

`
  }

  template += `  // Resetar formulário
  const reset = () => {
    form.value = {
      field1: '',
      field2: ''
    }
`

  if (flags.withValidation) {
    template += `    errors.value = {}\n`
  }
  if (flags.withApi) {
    template += `    submitError.value = null\n`
  }

  template += `  }

`

  if (flags.withApi) {
    template += `  // Submeter formulário
  const submit = async (apiFunction) => {
    if (!${flags.withValidation ? 'canSubmit.value' : 'isValid.value'}) return

    isSubmitting.value = true
    submitError.value = null

    try {
`
    if (flags.withValidation) {
      template += `      validate(form.value)
      
      if (!isValid.value) {
        throw new Error('Formulário inválido')
      }

`
    }
    template += `      const result = await apiFunction(form.value)
      reset()
      return result
    } catch (error) {
      submitError.value = error.message
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

`
  }

  template += `  return {
    // Estado
    form,
`

  if (flags.withApi) {
    template += `    isSubmitting,
    submitError,
`
  }

  if (flags.withValidation) {
    template += `    
    // Validação
    errors,
    isValid,
    canSubmit,
`
  } else {
    template += `    isValid,
`
  }

  template += `    
    // Ações
    reset`

  if (flags.withApi) {
    template += `,
    submit`
  }

  if (flags.withValidation) {
    template += `,
    validate: () => validate(form.value)`
  }

  template += `
  }
}
`

  return template
}

function generateValidationTemplate(name) {
  const functionName = name.replace('Form', 'Validation')
  const entityName = name.replace('use', '').replace('Form', '')

  return `import { ref, computed } from 'vue'

/**
 * ${functionName}
 * 
 * Validação de ${entityName}
 * 
 * @returns {Object} Validation API
 * 
 * @example
 * const { validate, errors, isValid } = ${functionName}()
 * const valid = validate({ field1: 'value' })
 * if (!valid) {
 *   console.log(errors.value)
 * }
 */
export function ${functionName}() {
  const errors = ref({})

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })

  const validate = (data) => {
    const newErrors = {}

    // TODO: Implementar regras de validação
    
    // Exemplo: field1 obrigatório (min 3 chars)
    if (!data.field1 || data.field1.trim().length < 3) {
      newErrors.field1 = 'Field1 deve ter pelo menos 3 caracteres'
    }

    // Exemplo: field2 obrigatório
    if (!data.field2) {
      newErrors.field2 = 'Field2 é obrigatório'
    }

    errors.value = newErrors
    return isValid.value
  }

  const validateField = (field, value) => {
    const tempData = { [field]: value }
    validate(tempData)
    
    if (errors.value[field]) {
      return errors.value[field]
    }
    
    delete errors.value[field]
    return null
  }

  return {
    errors,
    isValid,
    validate,
    validateField
  }
}
`
}

function generateTestTemplate(name, flags) {
  const functionName = name

  return `import { describe, it, expect, beforeEach } from 'vitest'
import { ${functionName} } from '@/composables/${functionName}'

describe('${functionName}', () => {
  let composable

  beforeEach(() => {
    composable = ${functionName}()
  })

  it('should initialize with default values', () => {
    expect(composable.form.value).toBeDefined()
  })

  it('should validate correctly', () => {
    composable.form.value.field1 = 'valid value'
    expect(composable.isValid.value).toBe(true)
  })

  it('should reset form', () => {
    composable.form.value.field1 = 'test'
    composable.reset()
    expect(composable.form.value.field1).toBe('')
  })
${flags.withApi ? `
  it('should submit successfully', async () => {
    composable.form.value.field1 = 'test'
    
    const mockApi = async (data) => ({ success: true, data })
    const result = await composable.submit(mockApi)
    
    expect(result.success).toBe(true)
    expect(composable.isSubmitting.value).toBe(false)
  })

  it('should handle submit errors', async () => {
    const mockApi = async () => {
      throw new Error('API Error')
    }

    try {
      await composable.submit(mockApi)
    } catch (error) {
      expect(error.message).toBe('API Error')
      expect(composable.submitError.value).toBe('API Error')
    }
  })
` : ''}
})
`
}

function generateREADME(name, flags) {
  const functionName = name
  const entityName = name.replace('use', '').replace('Form', '')

  return `# ${functionName}

**${entityName} composable logic**

## 📝 Descrição

Composable para gerenciar lógica de ${entityName.toLowerCase()}.

## 🔧 Uso

\`\`\`javascript
import { ${functionName} } from '@/composables/${functionName}'

// Em <script setup>
const {
  form,
  isValid,
  ${flags.withApi ? 'submit,\n  ' : ''}reset
} = ${functionName}()

// Manipular form
form.value.field1 = 'value'

// Verificar validade
console.log(isValid.value)  // true/false

${flags.withApi ? `// Submeter
await submit(apiFunction)

` : ''}// Resetar
reset()
\`\`\`

## 📚 API

### Retorno

#### Estado

- \`form\` (Ref): Dados do formulário
${flags.withApi ? `- \`isSubmitting\` (Ref): Estado de submissão
- \`submitError\` (Ref): Erro de submissão
` : ''}
#### Validação

${flags.withValidation ? `- \`errors\` (Ref): Map de erros por campo
` : ''}- \`isValid\` (Ref): Formulário válido?
${flags.withValidation ? `- \`canSubmit\` (Ref): Pode submeter?
` : ''}
#### Ações

- \`reset()\`: Limpar formulário
${flags.withApi ? `- \`submit(apiFunction)\`: Submeter formulário
` : ''}${flags.withValidation ? `- \`validate()\`: Validar manualmente
` : ''}
## ✅ Testes

\`\`\`bash
npm run test -- ${functionName}.spec.js
\`\`\`

## 📖 Referências

- [Composables Catalog](../references/composables-catalog.md)
- [Vue Composition API](https://vuejs.org/guide/reusability/composables.html)

---

**Gerado automaticamente** - Editar conforme necessário
`
}

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath)
  ensureDirectory(dir)
  fs.writeFileSync(filePath, content, 'utf8')
}

function main() {
  const { name, flags } = parseArgs()

  log('🚀 Gerando composable...', 'cyan')
  log('')

  const composablesDir = path.join(__dirname, '..', '..', 'src', 'composables')
  const testsDir = path.join(__dirname, '..', '..', 'tests', 'unit', 'composables')

  // Gerar arquivo principal
  const composablePath = path.join(composablesDir, `${name}.js`)
  
  if (fs.existsSync(composablePath)) {
    log(`❌ Erro: ${name}.js já existe!`, 'red')
    log(`   Caminho: ${composablePath}`, 'dim')
    process.exit(1)
  }

  const template = flags.type === 'generic' 
    ? generateGenericTemplate(name)
    : generateBusinessTemplate(name, flags)

  writeFile(composablePath, template)
  log(`✅ Criado: ${composablePath}`, 'green')

  // Gerar validação se solicitado
  if (flags.withValidation && flags.type === 'business') {
    const validationName = name.replace('Form', 'Validation')
    const validationPath = path.join(composablesDir, `${validationName}.js`)

    if (!fs.existsSync(validationPath)) {
      const validationTemplate = generateValidationTemplate(name)
      writeFile(validationPath, validationTemplate)
      log(`✅ Criado: ${validationPath}`, 'green')
    } else {
      log(`⚠️  Validação já existe: ${validationPath}`, 'yellow')
    }
  }

  // Gerar teste
  const testPath = path.join(testsDir, `${name}.spec.js`)
  if (!fs.existsSync(testPath)) {
    const testTemplate = generateTestTemplate(name, flags)
    writeFile(testPath, testTemplate)
    log(`✅ Criado: ${testPath}`, 'green')
  } else {
    log(`⚠️  Teste já existe: ${testPath}`, 'yellow')
  }

  // Gerar README
  const readmePath = path.join(path.dirname(composablePath), `${name}.README.md`)
  if (!fs.existsSync(readmePath)) {
    const readmeContent = generateREADME(name, flags)
    writeFile(readmePath, readmeContent)
    log(`✅ Criado: ${readmePath}`, 'green')
  }

  log('')
  log('✨ Composable gerado com sucesso!', 'green')
  log('')
  log('📝 Próximos passos:', 'cyan')
  log(`   1. Editar ${name}.js para implementar lógica`, 'dim')
  log(`   2. Adicionar testes em ${name}.spec.js`, 'dim')
  log(`   3. Documentar no README.md`, 'dim')
  log(`   4. Importar em componentes: import { ${name} } from '@/composables/${name}'`, 'dim')
  log('')

  // Mostrar exemplo de uso
  log('💡 Exemplo de uso:', 'cyan')
  log(`   const { form, isValid, reset } = ${name}()`, 'dim')
  log(`   console.log(form.value)`, 'dim')
  log('')
}

// Run
try {
  main()
} catch (error) {
  log(`❌ Erro: ${error.message}`, 'red')
  process.exit(1)
}
