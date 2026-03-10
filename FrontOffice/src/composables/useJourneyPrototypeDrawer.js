import { ref } from 'vue'
import { validateIframeTarget } from '@/utils/iframeWhitelist'
import { logIframeAccessBlocked } from '@/utils/iframeAudit'

function resolveJourneyTarget(journey) {
    if (!journey || typeof journey !== 'object') {
        return ''
    }

    const experienceTarget = typeof journey.experienceTarget === 'string'
        ? journey.experienceTarget.trim()
        : ''

    if (experienceTarget) {
        return experienceTarget
    }

    const routeTarget = typeof journey.route === 'string' ? journey.route.trim() : ''
    return routeTarget
}

function toBlockedResult(validation, target) {
    return {
        state: 'blocked',
        status: 'Bloqueado',
        statusLabel: 'Bloqueado',
        blocked: true,
        reasonCode: validation.reasonCode,
        kind: validation.kind,
        normalizedUrl: validation.normalizedUrl,
        target,
        message: 'Destino bloqueado pela whitelist de iframe.'
    }
}

function toUnavailableResult(reasonCode, target) {
    return {
        state: 'unavailable',
        status: 'Indisponivel',
        statusLabel: 'Indisponivel',
        unavailable: true,
        reasonCode,
        kind: 'invalid',
        normalizedUrl: '',
        target,
        message: 'A jornada ainda nao possui um destino valido para visualizacao.'
    }
}

function toAllowedResult(validation, target) {
    return {
        state: 'ready',
        status: 'Ativo',
        statusLabel: 'Ativo',
        blocked: false,
        unavailable: false,
        reasonCode: validation.reasonCode,
        kind: validation.kind,
        normalizedUrl: validation.normalizedUrl,
        target,
        message: ''
    }
}

function appendQueryParam(url, key, value) {
    if (typeof url !== 'string' || !url.trim()) {
        return url
    }

    const [pathAndQuery, hashPart = ''] = url.split('#')
    const hashSuffix = hashPart ? `#${hashPart}` : ''
    const queryStart = pathAndQuery.indexOf('?')
    const hasQuery = queryStart >= 0
    const basePath = hasQuery ? pathAndQuery.slice(0, queryStart) : pathAndQuery
    const existingQuery = hasQuery ? pathAndQuery.slice(queryStart + 1) : ''

    const params = new URLSearchParams(existingQuery)
    params.set(key, value)

    return `${basePath}?${params.toString()}${hashSuffix}`
}

function normalizeInternalIframeSrc(validation, target) {
    if (validation && validation.kind === 'internal') {
        const internalTarget = validation.normalizedUrl || target
        // Prefixa BASE_URL para funcionar tanto em dev (/) quanto em GitHub Pages (/Ambiente_de_Prototipacao_V5/)
        const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
        const withBase = base + (internalTarget.startsWith('/') ? internalTarget : '/' + internalTarget)
        return appendQueryParam(withBase, 'embed', 'drawer')
    }

    return (validation && validation.normalizedUrl) || target
}

function logBlocked(journey, persona, target, reasonCode) {
    logIframeAccessBlocked({
        journeyId: journey?.id || 'unknown',
        personaId: persona?.id || 'unknown',
        target,
        reasonCode: reasonCode || 'UNKNOWN_REASON'
    })
}

export function useJourneyPrototypeDrawer(options = {}) {
    const router = options.router

    const isOpen = ref(false)
    const activeJourney = ref(null)
    const activePersona = ref(null)
    const triggerEl = ref(null)
    const validationResult = ref(null)
    const iframeSrc = ref('')

    function openJourneyDrawer({ journey, persona, triggerElement }) {
        activeJourney.value = journey || null
        activePersona.value = persona || null
        triggerEl.value = triggerElement || null

        const target = resolveJourneyTarget(journey)

        if (!target) {
            validationResult.value = toUnavailableResult('EMPTY_TARGET', target)
            iframeSrc.value = ''
            isOpen.value = true
            return
        }

        const validation = validateIframeTarget(target)

        if (!validation.allowed) {
            validationResult.value = toBlockedResult(validation, target)
            iframeSrc.value = ''
            logBlocked(journey, persona, target, validation.reasonCode)
            isOpen.value = true
            return
        }

        validationResult.value = toAllowedResult(validation, target)
        iframeSrc.value = normalizeInternalIframeSrc(validation, target)
        isOpen.value = true
    }

    function closeJourneyDrawer() {
        isOpen.value = false
    }

    function openFullPage() {
        const journey = activeJourney.value
        const persona = activePersona.value
        const target = resolveJourneyTarget(journey)

        if (!target) {
            validationResult.value = toUnavailableResult('EMPTY_TARGET', target)
            return
        }

        const validation = validateIframeTarget(target)

        if (!validation.allowed) {
            validationResult.value = toBlockedResult(validation, target)
            logBlocked(journey, persona, target, validation.reasonCode)
            return
        }

        validationResult.value = toAllowedResult(validation, target)

        if (validation.kind === 'internal') {
            const internalTarget = validation.normalizedUrl || target
            if (router && typeof router.push === 'function') {
                router.push(internalTarget)
            } else if (typeof window !== 'undefined') {
                window.location.assign(internalTarget)
            }
            return
        }

        const externalTarget = validation.normalizedUrl || target
        if (typeof window !== 'undefined') {
            window.open(externalTarget, '_blank', 'noopener,noreferrer')
        }
    }

    return {
        isOpen,
        activeJourney,
        activePersona,
        triggerEl,
        validationResult,
        iframeSrc,
        openJourneyDrawer,
        closeJourneyDrawer,
        openFullPage
    }
}
