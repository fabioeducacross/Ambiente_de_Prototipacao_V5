// @vitest-environment jsdom

import { computed, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'
import { useProfileSwitcher } from '../useProfileSwitcher'

const ACTIVE_CONTEXT_STORAGE_KEY = 'educacross.profile.active-context'

function createTestRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/manage-account', name: 'ManageAccount', component: { template: '<div>Manage</div>' } },
            { path: '/teacher/calendar', component: { template: '<div>Teacher calendar</div>' } },
            { path: '/teacher/calendar-figma', component: { template: '<div>Teacher calendar figma</div>' } },
            { path: '/professor/calendario', component: { template: '<div>Professor calendar</div>' } },
            { path: '/director', component: { template: '<div>Director</div>' } },
        ],
    })
}

const Harness = defineComponent({
    setup() {
        const { currentProfile } = useProfileSwitcher()

        return {
            profileName: computed(() => currentProfile.value?.name || ''),
        }
    },
    template: '<div data-profile-name>{{ profileName }}</div>',
})

describe('useProfileSwitcher', () => {
    afterEach(() => {
        window.localStorage.clear()
    })

    it('mantem o contexto escolar ativo no calendario compartilhado', async () => {
        window.localStorage.setItem(ACTIVE_CONTEXT_STORAGE_KEY, 'school-director-main')

        const router = createTestRouter()
        await router.push('/professor/calendario')
        await router.isReady()

        const wrapper = mount(Harness, {
            global: {
                plugins: [router],
            },
        })

        expect(wrapper.get('[data-profile-name]').text()).toBe('Diretor')
    })

    it('reaproveita o contexto escolar ativo no calendario legado', async () => {
        window.localStorage.setItem(ACTIVE_CONTEXT_STORAGE_KEY, 'school-director-main')

        const router = createTestRouter()
        await router.push('/teacher/calendar')
        await router.isReady()

        const wrapper = mount(Harness, {
            global: {
                plugins: [router],
            },
        })

        expect(wrapper.get('[data-profile-name]').text()).toBe('Diretor')
    })
})