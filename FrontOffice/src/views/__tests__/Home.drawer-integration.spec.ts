import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it, vi } from 'vitest'
import Home from '../Home.vue'
import JourneyPrototypeDrawer from '@/components/JourneyPrototypeDrawer.vue'

function createTestRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/', component: { template: '<div>Home</div>' } },
            { path: '/sobre', component: { template: '<div>Sobre</div>' } },
            { path: '/teacher/calendar', component: { template: '<div>Calendar</div>' } },
            { path: '/teacher/:pathMatch(.*)*', component: { template: '<div>Teacher</div>' } },
            { path: '/professor/:pathMatch(.*)*', component: { template: '<div>Professor</div>' } }
        ]
    })
}

describe('Home drawer integration', () => {
    it('abre drawer ao clicar em card ativo da persona', async () => {
        const router = createTestRouter()
        router.push('/')
        await router.isReady()

        const wrapper = mount(Home, {
            attachTo: document.body,
            global: {
                plugins: [router]
            }
        })

        const professorButton = wrapper.findAll('button.nav-persona').find(button =>
            button.text().includes('Professor')
        )

        expect(professorButton).toBeTruthy()
        await professorButton!.trigger('click')

        const activeCard = wrapper.find('button.journey-card--active')
        expect(activeCard.exists()).toBe(true)

        await activeCard.trigger('click')
        await wrapper.vm.$nextTick()

        const dialog = document.body.querySelector('.journey-drawer')
        expect(dialog).not.toBeNull()

        wrapper.unmount()
    })

    it('nao abre drawer ao interagir com card planejado', async () => {
        const router = createTestRouter()
        router.push('/')
        await router.isReady()

        const wrapper = mount(Home, {
            attachTo: document.body,
            global: {
                plugins: [router]
            }
        })

        const professorButton = wrapper.findAll('button.nav-persona').find(button =>
            button.text().includes('Professor')
        )

        expect(professorButton).toBeTruthy()
        await professorButton!.trigger('click')

        const plannedCard = wrapper.find('.journey-card--planned')
        expect(plannedCard.exists()).toBe(true)

        await plannedCard.trigger('click')
        await wrapper.vm.$nextTick()

        const dialog = document.body.querySelector('.journey-drawer')
        expect(dialog).toBeNull()

        wrapper.unmount()
    })

    it('carrega iframe com embed=drawer e abre pagina completa sem embed', async () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
        const router = createTestRouter()
        const pushSpy = vi.spyOn(router, 'push')
        router.push('/')
        await router.isReady()

        const wrapper = mount(Home, {
            attachTo: document.body,
            global: {
                plugins: [router]
            }
        })

        const professorButton = wrapper.findAll('button.nav-persona').find(button =>
            button.text().includes('Professor')
        )

        expect(professorButton).toBeTruthy()
        await professorButton!.trigger('click')

        const activeCard = wrapper.find('button.journey-card--active')
        expect(activeCard.exists()).toBe(true)

        await activeCard.trigger('click')
        await wrapper.vm.$nextTick()

        const iframe = document.body.querySelector('iframe.journey-preview-iframe') as HTMLIFrameElement | null
        expect(iframe).not.toBeNull()
        expect(iframe?.getAttribute('src')).toContain('embed=drawer')

        const drawer = wrapper.findComponent(JourneyPrototypeDrawer)
        expect(drawer.exists()).toBe(true)

        drawer.vm.$emit('open-full-page')
        await wrapper.vm.$nextTick()
        await Promise.resolve()

        const triggeredInternalNavigation = pushSpy.mock.calls.length > 0
        const openedExternally = openSpy.mock.calls.length > 0

        expect(triggeredInternalNavigation || openedExternally).toBe(true)

        if (triggeredInternalNavigation) {
            const [target] = pushSpy.mock.calls[0] || []
            if (typeof target === 'string') {
                expect(target.includes('embed=drawer')).toBe(false)
            }
        }

        pushSpy.mockRestore()
        openSpy.mockRestore()

        wrapper.unmount()
    })
})
