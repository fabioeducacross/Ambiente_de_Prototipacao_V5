<template>
  <button
    type="button"
    class="user-access-card"
    :class="{ 'user-access-card--current': isCurrent, 'user-access-card--disabled': !isAvailable && !isCurrent }"
    :style="cardVars"
    :disabled="isCurrent || !isAvailable"
    @click="$emit('select', profile.accessContextId || profile.id)"
  >
    <div class="user-access-card__header" :class="`user-access-card__header--${profile.cardVariant || 'staff'}`">
      <span class="user-access-card__role-badge">{{ profile.roleLabel || profile.name }}</span>
      <span v-if="isCurrent" class="user-access-card__status">Perfil atual</span>
      <span v-else-if="!isAvailable" class="user-access-card__status">Planejado</span>
    </div>

    <div class="user-access-card__body">
      <div>
        <h2 class="user-access-card__title">{{ profile.name }}</h2>
        <p class="user-access-card__description">{{ profile.description }}</p>
      </div>

      <div class="user-access-card__badges">
        <span
          v-for="journey in journeyLabels.slice(0, 4)"
          :key="journey"
          class="user-access-card__badge-chip"
        >
          {{ journey }}
        </span>
        <span v-if="!journeyLabels.length" class="user-access-card__badge-chip user-access-card__badge-chip--muted">
          Fluxos mapeados
        </span>
      </div>

      <div class="user-access-card__divider"></div>

      <div class="user-access-card__meta">
        <div class="user-access-card__meta-item">
          <p>Jornadas</p>
          <span>{{ activeJourneys }}</span>
        </div>
        <div class="user-access-card__meta-item">
          <p>Fluxos</p>
          <span>{{ totalJourneys }}</span>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import avatarDefault from '@/assets/images/avatar-default.png'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  activeJourneys: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  totalJourneys: {
    type: Number,
    default: 0,
  },
  journeyLabels: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['select'])

const headerArtwork = computed(() => {
  if (props.profile.cardVariant === 'student') {
    return avatarDefault
  }

  return props.profile.artwork
})

const cardVars = computed(() => ({
  '--profile-accent': props.profile.accentColor,
  '--profile-artwork': headerArtwork.value ? `url('${headerArtwork.value}')` : 'none',
}))
</script>

<style scoped>
.user-access-card {
  appearance: none;
  -webkit-appearance: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
  border: 1px solid var(--ec-border);
  border-radius: var(--radius-md);
  background: var(--white);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-align: left;
  padding: 0;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.user-access-card:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in srgb, var(--profile-accent) 20%, var(--ec-border));
}

.user-access-card:disabled {
  cursor: default;
  background: var(--white);
}

.user-access-card--disabled {
  opacity: 0.82;
}

.user-access-card--current {
  border-color: color-mix(in srgb, var(--profile-accent) 28%, var(--ec-border));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--profile-accent) 16%, transparent), var(--shadow-lg);
}

.user-access-card__header {
  position: relative;
  flex-shrink: 0;
  height: 97px;
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-image:
    var(--profile-artwork),
    url('/assets/bg-bolinhas.svg'),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%),
    linear-gradient(135deg, color-mix(in srgb, var(--profile-accent) 84%, white) 0%, color-mix(in srgb, var(--profile-accent) 92%, black) 100%);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: center center, center center, center center, center center;
  background-size: 80px, cover, cover, cover;
}

.user-access-card__role-badge,
.user-access-card__status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.user-access-card__role-badge {
  background: var(--white);
  color: var(--profile-accent);
}

.user-access-card__status {
  background: rgba(255, 255, 255, 0.18);
  color: var(--white);
}

.user-access-card__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  min-height: 303px;
  padding: 18px 18px 16px;
}

.user-access-card__title {
  margin: 0;
  color: var(--primary);
  font-size: var(--font-size-xl);
  font-weight: 700;
  text-align: center;
}

.user-access-card__description {
  margin: 10px 0 0;
  color: var(--ec-body);
  font-size: var(--font-size-sm);
  text-align: center;
  min-height: 66px;
}

.user-access-card__badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}

.user-access-card__badge-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--profile-accent) 12%, white);
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

.user-access-card__badge-chip--muted {
  color: var(--ec-body);
}

.user-access-card__divider {
  margin: 16px 0 14px;
  border-top: 1px solid var(--ec-border);
}

.user-access-card__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.user-access-card__meta-item {
  text-align: center;
}

.user-access-card__meta p {
  margin: 0;
  color: var(--ec-body);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.user-access-card__meta span {
  display: inline-block;
  margin-top: 4px;
  color: var(--primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

@media (max-width: 768px) {
  .user-access-card__body {
    min-height: 0;
  }
}
</style>