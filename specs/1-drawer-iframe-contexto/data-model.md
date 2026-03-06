# Modelo de Dados - Drawer Iframe Contexto

## 1) Entidade: Journey
Representa um card de jornada exibido na Home.

Campos:
- `id: string` (obrigatorio, unico)
- `personaKey: 'teacher' | 'student' | 'coordinator' | 'director' | 'administrator' | 'network-manager'` (obrigatorio)
- `title: string` (obrigatorio)
- `status: 'active' | 'planned'` (obrigatorio)
- `context: JourneyContext` (obrigatorio)
- `experience: JourneyExperience` (obrigatorio para `active`, opcional para `planned`)

Regras:
- `status='active'` exige `experience.target` valido (interno ou externo permitido).
- `status='planned'` nao inicia iframe; usa fluxo informativo.

## 2) Entidade: JourneyContext
Metadados obrigatorios do painel contextual no drawer.

Campos obrigatorios:
- `persona: string`
- `journeyName: string`
- `statusLabel: 'Ativo' | 'Planejado'`
- `jtbd: string`
- `checklist: JourneyChecklistItem[]`
- `owner: string`
- `lastUpdate: string` (ISO-8601)
- `nextStep: string`

Campos derivados/recomendados:
- `completionPercent?: number` (0..100, derivado da checklist)

Regras:
- `checklist.length >= 1` para jornadas ativas.
- Em metadata incompleta, drawer abre e sinaliza campo faltante sem quebrar renderizacao.

## 3) Entidade: JourneyChecklistItem
Item de progresso contextual.

Campos:
- `id: string` (obrigatorio)
- `label: string` (obrigatorio)
- `done: boolean` (obrigatorio)

## 4) Entidade: JourneyExperience
Destino da experiencia renderizada no drawer.

Campos:
- `target: string` (obrigatorio para active)
- `targetType?: 'internal' | 'external'` (opcional; pode ser inferido)
- `openInNewTabLabel?: string` (default: "Abrir pagina completa")

Regras:
- URL interna: rota relativa iniciando com `/`.
- URL externa: `https://` obrigatorio e dominio/path conforme whitelist.

## 5) Entidade: IframeWhitelistConfig
Configuracao de seguranca para external URLs.

Campos:
- `allowedOrigins: string[]` (ex.: `https://docs.educacross.com.br`)
- `allowedExactUrls?: string[]`
- `allowedPathPrefixesByOrigin?: Record<string, string[]>`
- `allowQueryParams?: boolean` (default `true`)

Regras:
- Match de origem e case-insensitive para host.
- Bloqueio default (deny by default).
- `javascript:`, `data:`, `file:` sempre bloqueados.

## 6) Entidade: IframeValidationResult
Saida da funcao de validacao de destino.

Campos:
- `kind: 'internal' | 'external-allowed' | 'external-blocked' | 'invalid'`
- `normalizedTarget?: string`
- `reasonCode?: 'MISSING' | 'MALFORMED' | 'SCHEME_BLOCKED' | 'ORIGIN_NOT_ALLOWED' | 'PATH_NOT_ALLOWED'`
- `message?: string`
- `auditEvent?: IframeAuditEvent`

## 7) Entidade: IframeAuditEvent
Evento registravel para rastreabilidade.

Campos:
- `timestamp: string` (ISO-8601)
- `journeyId: string`
- `target: string`
- `result: 'blocked' | 'invalid'`
- `reasonCode: string`
- `actor: 'frontoffice-user'`

## Relacionamentos
- `Journey 1:1 JourneyContext`
- `JourneyContext 1:N JourneyChecklistItem`
- `Journey 1:1 JourneyExperience`
- `JourneyExperience 1:1 IframeValidationResult` (em runtime)

## Transicoes de Estado (Drawer)
- `closed -> opening -> open.loading -> open.ready`
- `open.loading -> open.blocked` (URL bloqueada/invalida)
- `open.loading -> open.embedError` (X-Frame-Options/CSP)
- `open.* -> closing -> closed` (restaurando foco no acionador)
