<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import { personasJourneys } from '@/data/journeys'
import ProfileAccessCard from '@/shared/components/profile-switch/ProfileAccessCard.vue'
import { useProfileSwitcher } from '@/shared/composables/useProfileSwitcher'

const router = useRouter()
const { accessContexts, currentProfile, switchToAccessContext } = useProfileSwitcher()
const selectedFilter = ref('all')

const filterOptions = [
  { id: 'all', label: 'Todos os perfis' },
  { id: 'available', label: 'Perfis disponíveis' },
  { id: 'planned', label: 'Perfis planejados' },
]

const resolveAvailableRoute = (profile) => {
  const candidateRoutes = [...(profile.preferredRoutes || []), profile.defaultRoute].filter(Boolean)

  return candidateRoutes.find((candidate) => router.resolve(candidate).matched?.length > 0) || null
}

const personaStats = computed(() => {
  return accessContexts.value.map((profile) => {
    const persona = personasJourneys.find((item) => item.id === profile.id)
    const journeys = persona?.journeys || []
    const activeJourneys = journeys.filter((journey) => journey.route).length
    const journeyBadges = journeys.slice(0, 4).map((journey) => journey.label)

    return {
      ...profile,
      activeJourneys,
      totalJourneys: journeys.length,
      isAvailable: Boolean(resolveAvailableRoute(profile)),
      journeyBadges,
      journeyLabels: journeys.filter((journey) => journey.route).slice(0, 3).map((journey) => journey.label),
    }
  })
})

const currentProfileName = computed(() => currentProfile.value?.name || 'Professor')
const filteredProfiles = computed(() => {
  if (selectedFilter.value === 'available') {
    return personaStats.value.filter((profile) => profile.isAvailable)
  }

  if (selectedFilter.value === 'planned') {
    return personaStats.value.filter((profile) => !profile.isAvailable)
  }

  return personaStats.value
})

const handleSelectProfile = async (profileId) => {
  await switchToAccessContext(profileId)
}
</script>

<template>
  <div class="manage-account-view">
    <AppNavbar :show-student-view="false" :user-role="currentProfileName" />

    <main class="manage-account-content">
      <section class="manage-account-hero-card">
        <h1 class="manage-account-title">Seja bem-vindo(a)!</h1>
      </section>

      <section class="manage-account-layout">
        <aside class="manage-account-filters">
          <button
            v-for="filter in filterOptions"
            :key="filter.id"
            type="button"
            class="manage-account-filter"
            :class="{ 'manage-account-filter--active': selectedFilter === filter.id }"
            @click="selectedFilter = filter.id"
          >
            <span>{{ filter.label }}</span>
          </button>
        </aside>

        <section class="manage-account-grid-panel">
          <div class="manage-account-grid">
            <ProfileAccessCard
              v-for="profile in filteredProfiles"
              :key="profile.id"
              :profile="profile"
              :is-current="currentProfile?.id === profile.id"
              :active-journeys="profile.activeJourneys"
              :total-journeys="profile.totalJourneys"
              :is-available="profile.isAvailable"
              :journey-labels="profile.journeyBadges"
              @select="handleSelectProfile"
            />
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<style scoped>
.manage-account-view {
  min-height: 100vh;
  background: var(--gray-50);
}

.manage-account-content {
  padding: calc(var(--navbar-height) + 24px) 24px 32px;
  max-width: 1440px;
  margin: 0 auto;
}

.manage-account-hero-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 112px;
  padding: 24px 28px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: url('/assets/bg-estrelas.svg') center center / cover no-repeat, var(--white);
  box-shadow: var(--shadow-md);
}

.manage-account-title {
  margin: 0;
  color: var(--primary);
  font-size: clamp(2rem, 2.8vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
}

.manage-account-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.manage-account-filters {
  position: sticky;
  top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.manage-account-filter {
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--primary);
  border-radius: var(--radius-full);
  background: var(--white);
  color: var(--primary);
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.manage-account-filter--active {
  background: var(--primary);
  color: var(--white);
}

.manage-account-grid-panel {
  min-width: 0;
}

.manage-account-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.manage-account-grid :deep(.user-access-card) {
  width: 300px;
}

@media (max-width: 768px) {
  .manage-account-content {
    padding: calc(var(--navbar-height) + 24px) 16px 24px;
  }

  .manage-account-layout {
    grid-template-columns: 1fr;
  }

  .manage-account-filters {
    position: static;
  }

  .manage-account-grid {
    display: grid;
    grid-template-columns: 1fr;
  }

  .manage-account-grid :deep(.user-access-card) {
    width: 100%;
  }
}
</style>