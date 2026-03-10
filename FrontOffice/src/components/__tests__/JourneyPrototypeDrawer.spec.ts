import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import JourneyPrototypeDrawer from '../JourneyPrototypeDrawer.vue'

const baseJourney = {
    id: 'J1',
    title: 'Calendario de Eventos',
    status: 'Ativo',
    jtbd: 'Planejar a rotina semanal sem conflitos.',
    checklist: ['Conferir eventos multi-dia', 'Validar filtros'],
    owner: 'Squad Calendario',
    lastUpdate: '2026-03-05',
    nextStep: 'Rodada de feedback com professores.'
}

const basePersona = {
    id: 'teacher',
    label: 'Professor'
}

beforeEach(() => {
    window.sessionStorage.removeItem('journey-drawer-context-panel-mode')
})

describe('JourneyPrototypeDrawer', () => {
    it('renderiza dialogo com atributos basicos de acessibilidade', () => {
        const wrapper = mount(JourneyPrototypeDrawer, {
            attachTo: document.body,
            props: {
                modelValue: true,
                journey: baseJourney,
                persona: basePersona,
                validationResult: { state: 'ready', status: 'Ativo' },
                iframeSrc: '/teacher/calendar'
            }
        })

        const dialog = document.body.querySelector('.journey-drawer')

        expect(dialog).not.toBeNull()
        expect(dialog?.getAttribute('role')).toBe('dialog')
        expect(dialog?.getAttribute('aria-modal')).toBe('true')
        expect(dialog?.getAttribute('aria-labelledby')).toBeTruthy()

        wrapper.unmount()
    })

    it('emite fechamento ao pressionar ESC', async () => {
        const wrapper = mount(JourneyPrototypeDrawer, {
            attachTo: document.body,
            props: {
                modelValue: true,
                journey: baseJourney,
                persona: basePersona,
                validationResult: { state: 'ready', status: 'Ativo' },
                iframeSrc: '/teacher/calendar'
            }
        })

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

        wrapper.unmount()
    })

    it('renderiza contexto obrigatorio da jornada', () => {
        const wrapper = mount(JourneyPrototypeDrawer, {
            attachTo: document.body,
            props: {
                modelValue: true,
                journey: baseJourney,
                persona: basePersona,
                validationResult: { state: 'ready', status: 'Ativo' },
                iframeSrc: '/teacher/calendar'
            }
        })

        const text = document.body.textContent || ''
        expect(text).toContain('Contexto da jornada')
        expect(text).toContain('Professor')
        expect(text).toContain('Calendario de Eventos')
        expect(text).toContain('Build da branch')
        expect(text).toContain('test')
        expect(text).toContain('vtest · 0000000')
        expect(text).toContain('Planejar a rotina semanal sem conflitos.')
        expect(text).toContain('Conferir eventos multi-dia')

        wrapper.unmount()
    })

    it('desabilita CTA quando estado do iframe esta bloqueado', () => {
        const wrapper = mount(JourneyPrototypeDrawer, {
            attachTo: document.body,
            props: {
                modelValue: true,
                journey: baseJourney,
                persona: basePersona,
                validationResult: { state: 'blocked', blocked: true, message: 'Destino bloqueado' },
                iframeSrc: ''
            }
        })

        const cta = document.body.querySelector('button.journey-open-full') as HTMLButtonElement | null
        expect(cta).not.toBeNull()
        expect(cta?.disabled).toBe(true)

        wrapper.unmount()
    })

    it('recolhe e persiste o painel de contexto na sessao', async () => {
        const wrapper = mount(JourneyPrototypeDrawer, {
            attachTo: document.body,
            props: {
                modelValue: true,
                journey: baseJourney,
                persona: basePersona,
                validationResult: { state: 'ready', status: 'Ativo' },
                iframeSrc: '/teacher/calendar'
            }
        })

        const toggle = document.body.querySelector('button.journey-drawer-toggle') as HTMLButtonElement | null
        expect(toggle).not.toBeNull()

        await toggle?.click()
        await wrapper.vm.$nextTick()

        const body = document.body.querySelector('.journey-drawer-body')
        expect(body?.classList.contains('is-context-collapsed')).toBe(true)
        expect(window.sessionStorage.getItem('journey-drawer-context-panel-mode')).toBe('collapsed')

        wrapper.unmount()
    })
})
