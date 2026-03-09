export type JourneyStatus = 'Ativo' | 'Planejado'

export interface JourneyContext {
    persona?: string
    journeyName?: string
    statusLabel?: JourneyStatus | string
    jtbd: string
    checklist: string[]
    owner: string
    lastUpdate: string
    nextStep: string
    completionPercent?: number
}

export interface JourneyExperience {
    target: string
    targetType?: 'internal' | 'external'
    openInNewTabLabel?: string
}

export interface Journey {
    id: string
    label: string
    icon: string
    route: string | null
    status: JourneyStatus | string
    experienceTarget?: string
    jtbd?: string
    checklist?: string[]
    owner?: string
    lastUpdate?: string
    nextStep?: string
    context?: JourneyContext
    experience?: JourneyExperience
}

export interface IframeValidationResult {
    kind: 'internal' | 'external-allowed' | 'external-blocked' | 'invalid'
    allowed: boolean
    reasonCode:
    | 'OK'
    | 'INVALID_TARGET'
    | 'PROHIBITED_SCHEME'
    | 'INTERNAL_PATH_NOT_ALLOWED'
    | 'MALFORMED_URL'
    | 'UNSUPPORTED_PROTOCOL'
    | 'EXTERNAL_NOT_ALLOWED'
    | string
    normalizedUrl: string
    origin: string
    path: string
}
