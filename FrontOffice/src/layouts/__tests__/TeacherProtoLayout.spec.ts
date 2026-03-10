import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import TeacherProtoLayout from '../TeacherProtoLayout.vue'

function createTestRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            {
                path: '/teacher',
                component: TeacherProtoLayout,
                children: [
                    {
                        path: 'calendar',
                        component: { template: '<div class="test-page">calendar</div>' }
                    }
                ]
            }
        ]
    })
}

describe('TeacherProtoLayout layout shell', () => {
    it('mantem a sidebar quando a rota esta em embed=drawer', async () => {
        const router = createTestRouter()
        await router.push('/teacher/calendar?embed=drawer')
        await router.isReady()

        const wrapper = mount(TeacherProtoLayout, {
            global: {
                plugins: [router],
                stubs: {
                    AppNavbar: { template: '<div class="app-navbar-stub"></div>' },
                    Sidebar: { name: 'Sidebar', template: '<aside class="sidebar-stub"></aside>' },
                    RouterView: { template: '<div class="router-view-stub"></div>' }
                }
            }
        })

        expect(wrapper.find('.sidebar-stub').exists()).toBe(true)
        expect(wrapper.get('.proto-layout').classes()).not.toContain('proto-layout--embed')

        wrapper.unmount()
    })

    it('mantem a sidebar fora do embed', async () => {
        const router = createTestRouter()
        await router.push('/teacher/calendar')
        await router.isReady()

        const wrapper = mount(TeacherProtoLayout, {
            global: {
                plugins: [router],
                stubs: {
                    AppNavbar: { template: '<div class="app-navbar-stub"></div>' },
                    Sidebar: { name: 'Sidebar', template: '<aside class="sidebar-stub"></aside>' },
                    RouterView: { template: '<div class="router-view-stub"></div>' }
                }
            }
        })

        expect(wrapper.find('.sidebar-stub').exists()).toBe(true)
        expect(wrapper.get('.proto-layout').classes()).not.toContain('proto-layout--embed')

        wrapper.unmount()
    })
})