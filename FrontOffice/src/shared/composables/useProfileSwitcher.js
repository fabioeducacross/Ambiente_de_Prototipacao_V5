import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
    getProfileAccessContextById,
    getProfileAccessById,
    listProfileAccessContexts,
    resolveProfileAccessByPath,
} from '@/shared/data/profileAccess'

const STORAGE_PREFIX = 'educacross.profile.last-route.'
const ACTIVE_CONTEXT_STORAGE_KEY = 'educacross.profile.active-context'
const SHARED_PROTOTYPE_PREFIX = '/professor'
const SHARED_SCHOOL_ROUTE_PREFIXES = ['/teacher/calendar', '/teacher/calendar-figma']

const getStoredRoute = (profileId) => {
    if (typeof window === 'undefined') {
        return null
    }

    return window.localStorage.getItem(`${STORAGE_PREFIX}${profileId}`)
}

const storeRoute = (profileId, routePath) => {
    if (typeof window === 'undefined' || !profileId || !routePath) {
        return
    }

    window.localStorage.setItem(`${STORAGE_PREFIX}${profileId}`, routePath)
}

const getStoredActiveContextId = () => {
    if (typeof window === 'undefined') {
        return null
    }

    return window.localStorage.getItem(ACTIVE_CONTEXT_STORAGE_KEY)
}

const storeActiveContextId = (accessContextId) => {
    if (typeof window === 'undefined' || !accessContextId) {
        return
    }

    window.localStorage.setItem(ACTIVE_CONTEXT_STORAGE_KEY, accessContextId)
}

const isSharedPrototypeRoute = (routePath) => {
    return typeof routePath === 'string' && routePath.startsWith(SHARED_PROTOTYPE_PREFIX)
}

const isSharedSchoolExperienceRoute = (routePath) => {
    if (typeof routePath !== 'string') {
        return false
    }

    return isSharedPrototypeRoute(routePath)
        || SHARED_SCHOOL_ROUTE_PREFIXES.some((prefix) => routePath.startsWith(prefix))
}

const getStoredActiveContext = () => {
    return getProfileAccessContextById(getStoredActiveContextId())
}

const isRouteCompatibleWithProfile = (profile, routePath) => {
    if (!profile || !routePath) {
        return false
    }

    if (profile.source === 'school' && isSharedSchoolExperienceRoute(routePath)) {
        return true
    }

    return profile.routePrefixes.some((prefix) => routePath.startsWith(prefix))
}

const resolveExistingRoute = (router, candidateRoutes = []) => {
    return candidateRoutes.find((candidate) => {
        if (!candidate) {
            return false
        }

        const resolved = router.resolve(candidate)
        return resolved.matched?.length > 0
    }) || null
}

const isExistingRoute = (router, routePath) => {
    if (!routePath) {
        return false
    }

    return router.resolve(routePath).matched?.length > 0
}

export function useProfileSwitcher() {
    const route = useRoute()
    const router = useRouter()

    const accessContexts = computed(() => listProfileAccessContexts())

    const currentAccessContext = computed(() => {
        const storedActiveContext = getStoredActiveContext()

        if (storedActiveContext?.source === 'school' && isSharedSchoolExperienceRoute(route.path)) {
            return storedActiveContext
        }

        const byPath = resolveProfileAccessByPath(route.path)
        if (byPath) {
            return getProfileAccessContextById(byPath.accessContextId)
        }

        if (isSharedPrototypeRoute(route.path)) {
            return storedActiveContext || getProfileAccessById('teacher')
        }

        const returnTo = typeof route.query?.returnTo === 'string' ? route.query.returnTo : null
        if (returnTo) {
            if (storedActiveContext?.source === 'school' && isSharedSchoolExperienceRoute(returnTo)) {
                return storedActiveContext
            }

            const byReturn = resolveProfileAccessByPath(returnTo)
            if (byReturn) {
                return getProfileAccessContextById(byReturn.accessContextId)
            }

            if (isSharedPrototypeRoute(returnTo)) {
                return storedActiveContext || getProfileAccessById('teacher')
            }
        }

        return storedActiveContext
    })

    const currentProfile = computed(() => currentAccessContext.value || resolveProfileAccessByPath(route.path))

    watch(
        () => route.fullPath,
        (fullPath) => {
            if (route.name === 'ManageAccount') {
                return
            }

            const activeContext = currentAccessContext.value
            if (activeContext) {
                storeRoute(activeContext.id, fullPath)
                storeActiveContextId(activeContext.accessContextId)
            }
        },
        { immediate: true }
    )

    const resolveTargetRoute = (targetContext) => {
        const storedRoute = getStoredRoute(targetContext.id)
        if (isRouteCompatibleWithProfile(targetContext, storedRoute) && isExistingRoute(router, storedRoute)) {
            return storedRoute
        }

        const returnTo = typeof route.query?.returnTo === 'string' ? route.query.returnTo : null
        if (isRouteCompatibleWithProfile(targetContext, returnTo) && isExistingRoute(router, returnTo)) {
            return returnTo
        }

        const preferredRoute = resolveExistingRoute(router, targetContext.preferredRoutes)
        if (preferredRoute) {
            return preferredRoute
        }

        return targetContext.defaultRoute
    }

    const switchToAccessContext = async (accessContextId) => {
        const targetContext = getProfileAccessContextById(accessContextId)
        if (!targetContext) {
            return false
        }

        const targetRoute = resolveTargetRoute(targetContext)
        if (!targetRoute) {
            return false
        }

        storeActiveContextId(targetContext.accessContextId)
        await router.push(targetRoute)
        return true
    }

    const switchToProfile = async (profileId) => {
        const targetProfile = getProfileAccessById(profileId)
        if (!targetProfile?.accessContextId) {
            return false
        }

        return switchToAccessContext(targetProfile.accessContextId)
    }

    const goToManageAccount = async () => {
        await router.push({
            name: 'ManageAccount',
            query: route.fullPath ? { returnTo: route.fullPath } : undefined,
        })
    }

    const goToStudentView = async () => {
        const switched = await switchToProfile('student')
        if (!switched) {
            await goToManageAccount()
        }
    }

    return {
        profiles: accessContexts,
        accessContexts,
        currentAccessContext,
        currentProfile,
        goToManageAccount,
        goToStudentView,
        switchToAccessContext,
        switchToProfile,
    }
}