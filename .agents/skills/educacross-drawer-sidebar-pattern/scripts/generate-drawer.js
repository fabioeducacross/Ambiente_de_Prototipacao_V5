#!/usr/bin/env node

/**
 * Generate Drawer Script
 * 
 * Gera componente drawer completo com overlay, transitions e validação
 * 
 * Uso:
 *   node generate-drawer.js EventDrawer
 *   node generate-drawer.js UserDrawer --position="left"
 *   node generate-drawer.js FilterDrawer --width="350px"
 * 
 * Flags:
 *   --position="left|right"    Posição do drawer (padrão: right)
 *   --width="XXXpx"            Largura (padrão: 400px)
 *   --with-form                Incluir scaffold de formulário
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
  dim: '\x1b[2m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function parseArgs() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args[0].startsWith('--')) {
    log('❌ Erro: Nome do drawer é obrigatório', 'red')
    log('')
    log('Uso: node generate-drawer.js <NomeDoDrawer>', 'cyan')
    log('Exemplo: node generate-drawer.js EventDrawer', 'dim')
    process.exit(1)
  }

  let name = args[0]
  
  // Validar nome
  if (!name.endsWith('Drawer')) {
    log('⚠️  Aviso: Drawers devem terminar com "Drawer"', 'yellow')
    name = name + 'Drawer'
    log(`   Renomeando para: ${name}`, 'dim')
  }

  if (name[0] !== name[0].toUpperCase()) {
    name = name[0].toUpperCase() + name.slice(1)
    log(`⚠️  Convertendo para PascalCase: ${name}`, 'yellow')
  }

  const flags = {
    position: 'right',
    width: '400px',
    withForm: args.includes('--with-form')
  }

  // Parse --position flag
  const positionArg = args.find(arg => arg.startsWith('--position='))
  if (positionArg) {
    flags.position = positionArg.split('=')[1].replace(/"/g, '')
    if (!['left', 'right'].includes(flags.position)) {
      log(`❌ Erro: --position deve ser "left" ou "right"`, 'red')
      process.exit(1)
    }
  }

  // Parse --width flag
  const widthArg = args.find(arg => arg.startsWith('--width='))
  if (widthArg) {
    flags.width = widthArg.split('=')[1].replace(/"/g, '')
  }

  return { name, flags }
}

function generateDrawerTemplate(name, flags) {
  const slotContent = flags.withForm ? `<!-- Form -->
      <form @submit.prevent="handleSubmit" class="drawer-form">
        <!-- Campo exemplo -->
        <div class="form-group">
          <label for="field1" class="form-label">Campo 1</label>
          <input
            id="field1"
            v-model="formData.field1"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.field1 }"
          />
          <span v-if="errors.field1" class="error-message">
            {{ errors.field1 }}
          </span>
        </div>

        <!-- Adicione mais campos conforme necessário -->
      </form>` : `<p>Conteúdo do drawer aqui</p>`

  const footerSlot = flags.withForm ? `
      <!-- Footer com botões -->
      <template #footer>
        <div class="form-actions-left">
          <button type="button" class="btn btn-primary" @click="handleSubmit">
            Salvar
          </button>
          <button type="button" class="btn btn-outline-primary" @click="close">
            Cancelar
          </button>
        </div>
        <button
          v-if="editMode"
          type="button"
          class="btn btn-outline-danger"
          @click="handleDelete"
        >
          <i class="bi bi-trash"></i>
          Deletar
        </button>
      </template>` : ''

  return `<template>
  <!-- Overlay/Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="drawer-overlay"
      @click="close"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="slide-${flags.position}">
    <aside
      v-if="isOpen"
      class="drawer drawer-${flags.position}"
      role="dialog"
      aria-modal="true"
      aria-label="${name}"
    >
      <!-- Header -->
      <header class="drawer-header">
        <h2 class="drawer-title">{{ title }}</h2>
        <button
          class="btn-close"
          @click="close"
          aria-label="Fechar"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <!-- Content -->
      <div class="drawer-content">
        ${slotContent}
      </div>${footerSlot}
    </aside>
  </Transition>
</template>

<script setup>
import { ref, watch${flags.withForm ? ', computed' : ''} } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  ${flags.withForm ? `
  data: {
    type: Object,
    default: null
  }` : ''}
})

const emit = defineEmits(['close'${flags.withForm ? ", 'save'" : ''}])

${flags.withForm ? `
// Estado do formulário
const formData = ref({
  field1: ''
  // Adicione mais campos
})

const errors = ref({})

const editMode = computed(() => props.data !== null)

// Título dinâmico
const title = computed(() => {
  return editMode.value ? 'Editar Item' : 'Adicionar Item'
})

// Watch: resetar ou popular form quando abre
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.data) {
      // Modo edição: popular dados
      formData.value = { ...props.data }
    } else {
      // Modo criação: resetar
      formData.value = {
        field1: ''
      }
    }
    errors.value = {}
    
    // Travar scroll do body
    document.body.style.overflow = 'hidden'
  } else {
    // Destravar scroll
    document.body.style.overflow = ''
  }
})

// Validação
const validate = () => {
  const newErrors = {}

  if (!formData.value.field1 || formData.value.field1.trim().length < 3) {
    newErrors.field1 = 'Campo deve ter pelo menos 3 caracteres'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Submit
const handleSubmit = () => {
  if (!validate()) return

  emit('save', { ...formData.value })
  close()
}

// Delete
const handleDelete = () => {
  if (confirm('Tem certeza que deseja deletar?')) {
    emit('delete', props.data.id)
    close()
  }
}
` : `
const title = ref('${name}')

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
`}

// Close
const close = () => {
  emit('close')
}
</script>

<style scoped>
/* Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(47, 43, 61, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1040;
  cursor: pointer;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: ${flags.width};
  max-width: 90vw;
  background: #fff;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-right {
  right: 0;
  box-shadow: -4px 0 24px rgba(47, 43, 61, 0.24);
}

.drawer-left {
  left: 0;
  box-shadow: 4px 0 24px rgba(47, 43, 61, 0.24);
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
  flex-shrink: 0;
}

.drawer-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2F2B3D;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #82868B;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #2F2B3D;
}

/* Content */
.drawer-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #F8F8F8;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #D9D9D9;
  border-radius: 3px;
}

${flags.withForm ? `
/* Form */
.drawer-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2F2B3D;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #7367F0;
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.12);
}

.form-control.is-invalid {
  border-color: #EA5455;
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #EA5455;
}

/* Footer */
.form-actions-left {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #7367F0;
  color: #fff;
}

.btn-primary:hover {
  background: #5E50EE;
  box-shadow: 0 2px 6px rgba(115, 103, 240, 0.24);
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid #7367F0;
  color: #7367F0;
}

.btn-outline-primary:hover {
  background: rgba(115, 103, 240, 0.08);
}

.btn-outline-danger {
  background: transparent;
  border: 1px solid #EA5455;
  color: #EA5455;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline-danger:hover {
  background: rgba(234, 84, 85, 0.08);
}
` : ''}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-${flags.position}-enter-active,
.slide-${flags.position}-leave-active {
  transition: transform 0.3s ease;
}

.slide-${flags.position}-enter-from,
.slide-${flags.position}-leave-to {
  transform: translateX(${flags.position === 'right' ? '100%' : '-100%'});
}

/* Responsive */
@media (max-width: 768px) {
  .drawer {
    width: 100%;
    max-width: 100vw;
  }
}
</style>
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

  log('🚀 Gerando drawer...', 'cyan')
  log('')

  const componentsDir = path.join(__dirname, '..', '..', 'src', 'components')
  const drawerPath = path.join(componentsDir, `${name}.vue`)

  if (fs.existsSync(drawerPath)) {
    log(`❌ Erro: ${name}.vue já existe!`, 'red')
    log(`   Caminho: ${drawerPath}`, 'dim')
    process.exit(1)
  }

  const template = generateDrawerTemplate(name, flags)

  writeFile(drawerPath, template)
  log(`✅ Criado: ${drawerPath}`, 'green')
  log('')

  log('✨ Drawer gerado com sucesso!', 'green')
  log('')
  log('📝 Próximos passos:', 'cyan')
  log(`   1. Editar ${name}.vue para customizar conteúdo`, 'dim')
  log(`   2. Importar em componente pai:`, 'dim')
  log(`      import ${name} from '@/components/${name}.vue'`, 'cyan')
  log(`   3. Usar no template:`, 'dim')
  log(`      <${name} :is-open="isOpen" @close="close" />`, 'cyan')
  log('')

  log('💡 Exemplo de uso:', 'cyan')
  log(`   const isOpen = ref(false)`, 'dim')
  log(`   const open = () => { isOpen.value = true }`, 'dim')
  log(`   const close = () => { isOpen.value = false }`, 'dim')
  log('')

  log('⚙️  Configuração:', 'cyan')
  log(`   Posição: ${flags.position}`, 'dim')
  log(`   Largura: ${flags.width}`, 'dim')
  log(`   Com formulário: ${flags.withForm ? 'Sim' : 'Não'}`, 'dim')
  log('')
}

// Run
try {
  main()
} catch (error) {
  log(`❌ Erro: ${error.message}`, 'red')
  process.exit(1)
}
