<template>
  <teleport to="body">
    <Transition name="journey-drawer-fade">
      <div
        v-if="modelValue"
        class="journey-drawer-backdrop"
        @click="closeDrawer"
      ></div>
    </Transition>

    <Transition name="journey-drawer-slide">
      <aside
        v-if="modelValue"
        class="journey-drawer"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <header class="journey-drawer-header">
          <div class="journey-drawer-headline">
            <div class="journey-drawer-meta">
              <p class="journey-drawer-eyebrow">Jornada prototipada</p>
            </div>
            <h2 :id="titleId" class="journey-drawer-title">
              {{ journeyTitle }}
            </h2>
          </div>

          <div class="journey-drawer-actions">
            <span class="journey-state-badge journey-state-badge-header" :class="`is-${iframeState}`">
              {{ iframeStateLabel }}
            </span>

            <button
              type="button"
              class="btn journey-open-full"
              :disabled="isCtaDisabled"
              @click="emit('open-full-page')"
            >
              Abrir pagina completa
              <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
            </button>

            <button
              type="button"
              class="journey-drawer-toggle"
              :aria-label="contextToggleLabel"
              :aria-pressed="isContextCollapsed"
              :title="contextToggleLabel"
              @click="toggleContextPanel"
            >
              <i
                class="bi"
                :class="isContextCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'"
                aria-hidden="true"
              ></i>
            </button>

            <button
              ref="closeButtonRef"
              type="button"
              class="journey-drawer-close"
              aria-label="Fechar painel"
              @click="closeDrawer"
            >
              <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>
        </header>

        <div
          class="journey-drawer-body"
          :class="{ 'is-context-collapsed': isContextCollapsed }"
        >
          <section class="journey-drawer-preview" :data-state="iframeState">
            <div class="journey-preview-stage">
              <iframe
                v-if="showIframe"
                class="journey-preview-iframe"
                :src="iframeSrc"
                title="Prototipo da jornada"
                @load="onIframeLoad"
                @error="onIframeError"
              ></iframe>

              <div
                v-if="overlayVisible"
                class="journey-preview-overlay"
                :data-state="iframeState"
              >
                <i class="bi bi-window-stack journey-preview-icon" aria-hidden="true"></i>
                <h3 class="journey-preview-overlay-title">{{ overlayTitle }}</h3>
                <p class="journey-preview-overlay-text">{{ overlayText }}</p>
              </div>
            </div>
          </section>

          <aside class="journey-drawer-context" :aria-hidden="isContextCollapsed ? 'true' : 'false'">
            <h3 class="journey-context-title">Contexto da jornada</h3>

            <dl class="journey-context-grid">
              <div class="journey-context-item">
                <dt>Persona</dt>
                <dd>{{ personaName }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>Jornada</dt>
                <dd>{{ journeyTitle }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>Build da branch</dt>
                <dd class="journey-build-meta">
                  <span class="journey-build-branch">{{ branchText }}</span>
                  <span class="journey-build-details">{{ buildText }}</span>
                </dd>
              </div>

              <div class="journey-context-item">
                <dt>Status</dt>
                <dd>{{ statusText }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>JTBD</dt>
                <dd>{{ jtbdText }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>Checklist</dt>
                <dd>
                  <ul v-if="checklistItems.length" class="journey-checklist">
                    <li v-for="(item, index) in checklistItems" :key="`${index}-${item}`">
                      {{ item }}
                    </li>
                  </ul>
                  <span v-else>Sem checklist</span>
                </dd>
              </div>

              <div class="journey-context-item">
                <dt>Responsavel</dt>
                <dd>{{ ownerText }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>Ultima atualizacao</dt>
                <dd>{{ lastUpdateText }}</dd>
              </div>

              <div class="journey-context-item">
                <dt>Proximo passo</dt>
                <dd>{{ nextStepText }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </aside>
    </Transition>
  </teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  journey: { type: Object, default: null },
  persona: { type: Object, default: null },
  validationResult: { type: Object, default: null },
  iframeSrc: { type: String, default: '' },
  triggerEl: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'open-full-page'])

const closeButtonRef = ref(null)
const iframeReady = ref(false)
const iframeFailed = ref(false)
const contextPanelMode = ref('expanded')
const titleId = `journey-prototype-title-${Math.random().toString(36).slice(2, 10)}`
const contextPanelStorageKey = 'journey-drawer-context-panel-mode'
const gitBranch = typeof __GIT_BRANCH__ === 'string' ? __GIT_BRANCH__ : ''
const gitSha = typeof __GIT_SHA__ === 'string' ? __GIT_SHA__ : ''
const appVersion = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''

const isContextCollapsed = computed(() => contextPanelMode.value === 'collapsed')
const contextToggleLabel = computed(() => {
  return isContextCollapsed.value ? 'Expandir contexto' : 'Recolher contexto'
})

const statusFromValidation = computed(() => {
  const raw = props.validationResult?.state ?? props.validationResult?.status ?? ''
  return String(raw).trim().toLowerCase()
})

const isBlocked = computed(() => {
  if (props.validationResult?.blocked === true) return true
  return ['blocked', 'bloqueado'].includes(statusFromValidation.value)
})

const isUnavailable = computed(() => {
  if (!props.iframeSrc) return true
  if (props.validationResult?.unavailable === true) return true
  return ['unavailable', 'indisponivel'].includes(statusFromValidation.value)
})

const iframeState = computed(() => {
  if (isBlocked.value) return 'blocked'
  if (isUnavailable.value) return 'unavailable'
  if (iframeFailed.value) return 'embedError'
  if (!iframeReady.value) return 'loading'
  return 'ready'
})

const showIframe = computed(() => ['loading', 'ready'].includes(iframeState.value))
const overlayVisible = computed(() => iframeState.value !== 'ready')
const isCtaDisabled = computed(() => ['blocked', 'unavailable'].includes(iframeState.value))

const iframeStateLabel = computed(() => {
  const labels = {
    loading: 'Carregando',
    ready: 'Ativo',
    blocked: 'Bloqueado',
    embedError: 'Erro de embed',
    unavailable: 'Indisponivel'
  }
  return labels[iframeState.value]
})

const overlayTitle = computed(() => {
  const titles = {
    loading: 'Carregando o prototipo',
    blocked: 'Visualizacao bloqueada',
    embedError: 'Nao foi possivel exibir o iframe',
    unavailable: 'Prototipo indisponivel'
  }
  return titles[iframeState.value] ?? ''
})

const overlayText = computed(() => {
  if (iframeState.value === 'blocked' || iframeState.value === 'unavailable') {
    return props.validationResult?.message || props.validationResult?.reason || 'Valide as regras da jornada para prosseguir.'
  }

  if (iframeState.value === 'embedError') {
    return 'A exibicao dentro do painel falhou. Tente abrir a pagina completa.'
  }

  return 'Aguarde alguns segundos enquanto a experiencia e carregada.'
})

const journeyContext = computed(() => {
  if (props.journey?.context && typeof props.journey.context === 'object') {
    return props.journey.context
  }

  return null
})

function asReadableText(value) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  return ''
}

function normalizeChecklist(value) {
  if (Array.isArray(value)) {
    return value
      .map(item => (typeof item === 'string' ? item.trim() : String(item ?? '').trim()))
      .filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()]
  }

  return []
}

function formatDateForContext(value) {
  if (!value) return ''

  const raw = String(value).trim()
  if (!raw) return ''

  if (!raw.includes('-')) {
    return raw
  }

  const dateOnlyMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch
    return `${day}/${month}/${year}`
  }

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return raw
  }

  return new Intl.DateTimeFormat('pt-BR').format(parsed)
}

const journeyTitle = computed(() => {
  return (
    asReadableText(journeyContext.value?.journeyName) ||
    asReadableText(props.journey?.title) ||
    asReadableText(props.journey?.label) ||
    asReadableText(props.journey?.name) ||
    'Jornada sem titulo'
  )
})

const personaName = computed(() => {
  return (
    asReadableText(journeyContext.value?.persona) ||
    asReadableText(props.persona?.label) ||
    asReadableText(props.persona?.name) ||
    'Nao informado'
  )
})

const branchText = computed(() => asReadableText(gitBranch) || 'Branch nao informada')

const buildText = computed(() => {
  const normalizedVersion = asReadableText(appVersion)
  const normalizedSha = asReadableText(gitSha)
  const parts = []

  if (normalizedVersion) {
    parts.push(`v${normalizedVersion}`)
  }

  if (normalizedSha) {
    parts.push(normalizedSha)
  }

  return parts.join(' · ') || 'Build nao informada'
})

const statusText = computed(() => {
  if (['blocked', 'unavailable', 'embedError'].includes(iframeState.value)) {
    return (
      asReadableText(props.validationResult?.statusLabel) ||
      asReadableText(props.validationResult?.status) ||
      'Nao informado'
    )
  }

  return (
    asReadableText(journeyContext.value?.statusLabel) ||
    asReadableText(props.journey?.status) ||
    asReadableText(props.validationResult?.statusLabel) ||
    asReadableText(props.validationResult?.status) ||
    'Nao informado'
  )
})

const jtbdText = computed(() => {
  return (
    asReadableText(journeyContext.value?.jtbd) ||
    asReadableText(props.journey?.jtbd) ||
    asReadableText(props.journey?.JTBD) ||
    'Nao informado'
  )
})

const checklistItems = computed(() => {
  const fromContext = normalizeChecklist(journeyContext.value?.checklist)
  if (fromContext.length) {
    return fromContext
  }

  return normalizeChecklist(props.journey?.checklist)
})

const ownerText = computed(() => {
  return (
    asReadableText(journeyContext.value?.owner) ||
    asReadableText(props.journey?.owner) ||
    asReadableText(props.validationResult?.owner) ||
    'Nao informado'
  )
})

const lastUpdateText = computed(() => {
  const fromContext = formatDateForContext(journeyContext.value?.lastUpdate)
  if (fromContext) {
    return fromContext
  }

  const fromJourney = formatDateForContext(props.journey?.lastUpdate)
  if (fromJourney) {
    return fromJourney
  }

  return asReadableText(props.validationResult?.lastUpdate) || 'Nao informado'
})

const nextStepText = computed(() => {
  return (
    asReadableText(journeyContext.value?.nextStep) ||
    asReadableText(props.journey?.nextStep) ||
    asReadableText(props.validationResult?.nextStep) ||
    'Nao informado'
  )
})

function resetIframeState() {
  iframeReady.value = false
  iframeFailed.value = false
}

function closeDrawer() {
  emit('update:modelValue', false)
}

function persistContextPanelMode() {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(contextPanelStorageKey, contextPanelMode.value)
}

function restoreContextPanelMode() {
  if (typeof window === 'undefined') return
  const persisted = window.sessionStorage.getItem(contextPanelStorageKey)
  if (persisted === 'collapsed' || persisted === 'expanded') {
    contextPanelMode.value = persisted
  }
}

function toggleContextPanel() {
  contextPanelMode.value = isContextCollapsed.value ? 'expanded' : 'collapsed'
  persistContextPanelMode()
}

function onIframeLoad() {
  iframeReady.value = true
  iframeFailed.value = false
}

function onIframeError() {
  iframeReady.value = false
  iframeFailed.value = true
}

function lockBodyScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  document.body.style.overflow = ''
}

function restoreTriggerFocus() {
  if (props.triggerEl && typeof props.triggerEl.focus === 'function') {
    props.triggerEl.focus()
  }
}

function handleEscKey(event) {
  if (event.key === 'Escape' && props.modelValue) {
    closeDrawer()
  }
}

watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    resetIframeState()
    lockBodyScroll()
    await nextTick()
    closeButtonRef.value?.focus()
    return
  }

  unlockBodyScroll()
  restoreTriggerFocus()
})

watch(() => props.iframeSrc, () => {
  if (props.modelValue) {
    resetIframeState()
  }
})

onMounted(() => {
  restoreContextPanelMode()
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  unlockBodyScroll()
})
</script>

<style scoped>
.journey-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1090;
  background: color-mix(in srgb, var(--black) 64%, transparent);
  backdrop-filter: blur(3px);
}

.journey-drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(100vw, 100%);
  z-index: 1100;
  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--gray-900) 96%, var(--black));
  color: color-mix(in srgb, var(--white) 92%, var(--gray-100));
  box-shadow: var(--shadow-lg);
}

.journey-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: 0.95rem 1.5rem;
  border-bottom: 1px solid color-mix(in srgb, var(--gray-700) 58%, var(--black));
  background: color-mix(in srgb, var(--gray-900) 88%, var(--black));
}

.journey-drawer-headline {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
}

.journey-drawer-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.journey-drawer-eyebrow {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--gray-400) 72%, var(--white));
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.journey-drawer-title {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: color-mix(in srgb, var(--white) 94%, var(--gray-200));
}

.journey-drawer-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: nowrap;
  justify-content: flex-end;
  min-width: 0;
}

.journey-drawer-toggle,
.journey-drawer-close {
  width: 2rem;
  height: 2rem;
  border: 1px solid color-mix(in srgb, var(--gray-600) 68%, var(--black));
  border-radius: calc(var(--radius-sm) + 0.12rem);
  background: color-mix(in srgb, var(--gray-800) 86%, var(--black));
  color: color-mix(in srgb, var(--gray-300) 78%, var(--white));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
}

.journey-drawer-toggle i,
.journey-drawer-close i {
  font-size: 0.85rem;
}

.journey-drawer-toggle:hover,
.journey-drawer-toggle:focus-visible,
.journey-drawer-close:hover,
.journey-drawer-close:focus-visible {
  color: color-mix(in srgb, var(--white) 96%, var(--gray-100));
  border-color: color-mix(in srgb, var(--gray-500) 70%, var(--primary));
  background: color-mix(in srgb, var(--gray-700) 84%, var(--black));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 12%, transparent);
}

.journey-drawer-toggle:active,
.journey-drawer-close:active {
  transform: translateY(1px);
}

.journey-drawer-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.8fr minmax(15rem, 0.7fr);
  transition: grid-template-columns var(--transition-base);
}

.journey-drawer-body.is-context-collapsed {
  grid-template-columns: minmax(0, 1fr) 0;
}

.journey-drawer-preview {
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid color-mix(in srgb, var(--gray-700) 58%, var(--black));
}

.journey-state-badge-header {
  align-self: center;
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
}

.journey-state-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  padding: 0 0.62rem;
  font-size: 0.66rem;
  font-weight: 500;
  line-height: 1;
  border: 1px solid color-mix(in srgb, var(--gray-600) 66%, var(--black));
  border-radius: calc(var(--radius-sm) + 0.12rem);
  background: color-mix(in srgb, var(--gray-800) 84%, var(--black));
  color: color-mix(in srgb, var(--gray-300) 76%, var(--white));
  white-space: nowrap;
}

.journey-state-badge.is-loading {
  color: var(--info-dark);
  border-color: color-mix(in srgb, var(--info) 28%, var(--ec-border));
  background: color-mix(in srgb, var(--info) 8%, var(--white));
}

.journey-state-badge.is-ready {
  color: var(--success);
  border-color: color-mix(in srgb, var(--success) 20%, transparent);
  background: color-mix(in srgb, var(--success) 10%, transparent);
}

.journey-state-badge.is-blocked,
.journey-state-badge.is-embedError,
.journey-state-badge.is-unavailable {
  color: var(--danger-dark);
  border-color: color-mix(in srgb, var(--danger) 28%, var(--ec-border));
  background: color-mix(in srgb, var(--danger) 8%, var(--white));
}

.journey-preview-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  background: color-mix(in srgb, var(--gray-800) 78%, var(--black));
  border-left: 1px solid color-mix(in srgb, var(--gray-600) 56%, var(--black));
  border-right: 1px solid color-mix(in srgb, var(--gray-600) 56%, var(--black));
  border-bottom: 1px solid color-mix(in srgb, var(--gray-600) 56%, var(--black));
  border-radius: calc(var(--radius-md) + 0.1rem);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gray-700) 52%, var(--black));
}

.journey-preview-iframe {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid color-mix(in srgb, var(--gray-500) 30%, var(--white));
  border-radius: var(--radius-md);
  box-shadow: 0 0 0 7px color-mix(in srgb, var(--gray-700) 54%, var(--black)), 0 14px 30px color-mix(in srgb, var(--black) 42%, transparent);
  background: var(--white);
}

.journey-preview-overlay {
  position: absolute;
  inset: 0.45rem;
  display: grid;
  place-content: center;
  justify-items: center;
  text-align: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  border: 1px solid color-mix(in srgb, var(--gray-600) 58%, var(--black));
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--black) 58%, transparent);
}

.journey-preview-icon {
  font-size: 1.625rem;
  color: color-mix(in srgb, var(--gray-300) 84%, var(--white));
}

.journey-preview-overlay-title {
  margin: 0;
  font-size: var(--font-size-lg);
  color: color-mix(in srgb, var(--white) 94%, var(--gray-100));
}

.journey-preview-overlay-text {
  margin: 0;
  max-width: 30rem;
  color: color-mix(in srgb, var(--gray-300) 80%, var(--white));
  font-size: var(--font-size-sm);
}

.journey-open-full {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.32rem;
  width: auto;
  min-height: 2rem;
  padding: 0.38rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--gray-600) 64%, var(--black));
  background: color-mix(in srgb, var(--gray-800) 86%, var(--black));
  color: color-mix(in srgb, var(--gray-200) 84%, var(--white));
  border-radius: calc(var(--radius-sm) + 0.12rem);
  letter-spacing: 0.005em;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}

.journey-open-full i {
  font-size: 0.78rem;
  line-height: 1;
}

.journey-open-full:hover,
.journey-open-full:focus-visible {
  border-color: color-mix(in srgb, var(--gray-500) 72%, var(--primary));
  background: color-mix(in srgb, var(--gray-700) 84%, var(--black));
  color: color-mix(in srgb, var(--white) 94%, var(--gray-100));
}

.journey-open-full:disabled {
  border-color: color-mix(in srgb, var(--gray-700) 62%, var(--black));
  color: color-mix(in srgb, var(--gray-500) 72%, var(--white));
  background: color-mix(in srgb, var(--gray-800) 78%, var(--black));
}

.journey-drawer-context {
  min-height: 0;
  overflow-y: auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: color-mix(in srgb, var(--gray-900) 90%, var(--black));
  transition: padding var(--transition-base), opacity var(--transition-base);
}

.journey-drawer-body.is-context-collapsed .journey-drawer-preview {
  border-right: 0;
}

.journey-drawer-body.is-context-collapsed .journey-drawer-context {
  padding-left: 0;
  padding-right: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}

.journey-context-title {
  margin: 0 0 var(--spacing-lg);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: color-mix(in srgb, var(--white) 90%, var(--gray-100));
}

.journey-context-grid {
  margin: 0;
  display: grid;
  gap: var(--spacing-md);
}

.journey-context-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid color-mix(in srgb, var(--gray-700) 56%, var(--black));
}

.journey-context-item dt {
  margin-bottom: 0.25rem;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--gray-500) 70%, var(--white));
  font-weight: 700;
}

.journey-context-item dd {
  margin: 0;
  color: color-mix(in srgb, var(--gray-200) 82%, var(--white));
  font-size: var(--font-size-sm);
}

.journey-build-meta {
  display: grid;
  gap: 0.18rem;
}

.journey-build-branch {
  font-weight: 700;
  color: color-mix(in srgb, var(--white) 94%, var(--gray-100));
}

.journey-build-details {
  color: color-mix(in srgb, var(--gray-400) 76%, var(--white));
  font-size: var(--font-size-xs);
  letter-spacing: 0.02em;
}

.journey-checklist {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
}

.journey-drawer-fade-enter-active,
.journey-drawer-fade-leave-active {
  transition: opacity var(--transition-base);
}

.journey-drawer-fade-enter-from,
.journey-drawer-fade-leave-to {
  opacity: 0;
}

.journey-drawer-slide-enter-active,
.journey-drawer-slide-leave-active {
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.journey-drawer-slide-enter-from,
.journey-drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 992px) {
  .journey-drawer-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    justify-content: start;
    gap: 0.55rem;
    padding: 0.875rem 1.1rem;
  }

  .journey-drawer-actions {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 0.35rem;
  }

  .journey-drawer-toggle {
    display: none;
  }

  .journey-drawer-body {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .journey-drawer-body.is-context-collapsed {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .journey-drawer-preview {
    border-right: 0;
    border-bottom: 1px solid var(--ec-border);
  }

  .journey-drawer-context {
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }

  .journey-open-full {
    width: auto;
    min-height: 1.9rem;
    font-size: 0.75rem;
  }

  .journey-drawer-body.is-context-collapsed .journey-drawer-context {
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
    opacity: 1;
    overflow-y: auto;
    pointer-events: auto;
  }
}

@media (max-width: 768px) {
  .journey-drawer-title {
    font-size: var(--font-size-xl);
  }

  .journey-drawer-context {
    max-height: 42vh;
  }
}
</style>
