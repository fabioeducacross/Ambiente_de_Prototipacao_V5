import { describe, expect, it, vi } from 'vitest'
import { useJourneyPrototypeDrawer } from '../useJourneyPrototypeDrawer'

describe('useJourneyPrototypeDrawer embed mode', () => {
    it('adiciona embed=drawer no iframe de destino interno', () => {
        const router = { push: vi.fn() }
        const drawer = useJourneyPrototypeDrawer({ router })

        drawer.openJourneyDrawer({
            journey: { route: '/teacher/missoes' },
            persona: { id: 'teacher' },
            triggerElement: null
        })

        expect(drawer.isOpen.value).toBe(true)
        expect(drawer.iframeSrc.value).toBe('/teacher/missoes?embed=drawer')
    })

    it('openFullPage usa rota limpa sem embed para navegacao interna', () => {
        const router = { push: vi.fn() }
        const drawer = useJourneyPrototypeDrawer({ router })

        drawer.openJourneyDrawer({
            journey: { route: '/teacher/missoes' },
            persona: { id: 'teacher' },
            triggerElement: null
        })

        drawer.openFullPage()

        expect(router.push).toHaveBeenCalledWith('/teacher/missoes')
    })
})
