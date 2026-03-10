import { describe, expect, it } from 'vitest'
import { validateIframeTarget } from '../iframeWhitelist'

describe('validateIframeTarget', () => {
    it('permite rota interna valida', () => {
        const result = validateIframeTarget('/teacher/calendar?month=3')

        expect(result.allowed).toBe(true)
        expect(result.kind).toBe('internal')
        expect(result.reasonCode).toBe('OK')
        expect(result.normalizedUrl).toBe('/teacher/calendar')
    })

    it('permite URL externa em whitelist', () => {
        const result = validateIframeTarget('https://www.youtube.com/embed/abc123')

        expect(result.allowed).toBe(true)
        expect(result.kind).toBe('external-allowed')
        expect(result.reasonCode).toBe('OK')
        expect(result.origin).toBe('https://www.youtube.com')
    })

    it('bloqueia URL externa fora da whitelist', () => {
        const result = validateIframeTarget('https://example.com/embed/abc123')

        expect(result.allowed).toBe(false)
        expect(result.kind).toBe('external-blocked')
        expect(result.reasonCode).toBe('EXTERNAL_NOT_ALLOWED')
    })

    it('bloqueia esquema proibido e URL malformada', () => {
        const prohibited = validateIframeTarget('javascript:alert(1)')
        const malformed = validateIframeTarget('https://%')

        expect(prohibited.allowed).toBe(false)
        expect(prohibited.reasonCode).toBe('PROHIBITED_SCHEME')

        expect(malformed.allowed).toBe(false)
        expect(malformed.reasonCode).toBe('MALFORMED_URL')
    })
})
