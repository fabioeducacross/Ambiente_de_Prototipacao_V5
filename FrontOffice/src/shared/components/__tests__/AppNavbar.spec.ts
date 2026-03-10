import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import AppNavbar from '../AppNavbar.vue'

function createTestRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/', component: { template: '<div>home</div>' } },
            { path: '/teacher/missoes', component: { template: '<div>missoes</div>' } }
        ]
    })
}

describe('AppNavbar logo navigation', () => {
    it('bloqueia clique no logo quando embed=drawer', async () => {
        const router = createTestRouter()
        await router.push('/teacher/missoes?embed=drawer')
        await router.isReady()

        const wrapper = mount(AppNavbar, {
            global: {
                plugins: [router]
            }
        })

        const logoLink = wrapper.get('.logo-container')
        expect(logoLink.classes()).toContain('logo-container--locked')
        expect(logoLink.attributes('aria-disabled')).toBe('true')

        wrapper.unmount()
    })

    it('mantem logo habilitado fora do embed', async () => {
        const router = createTestRouter()
        await router.push('/teacher/missoes')
        await router.isReady()

        const wrapper = mount(AppNavbar, {
            global: {
                plugins: [router]
            }
        })

        const logoLink = wrapper.get('.logo-container')
        expect(logoLink.classes()).not.toContain('logo-container--locked')
        expect(logoLink.attributes('aria-disabled')).toBe('false')

        wrapper.unmount()
    })
})
