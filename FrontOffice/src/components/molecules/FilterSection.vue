<template>
  <div class="filter-section">
    <div class="filter-section-header">
      <div class="header-left">
        <span v-if="icon" class="material-symbols-outlined section-icon">{{ icon }}</span>
        <h3 class="section-title">{{ title }}</h3>
        <span v-if="activeCount > 0" class="active-badge">
          {{ activeCount }}
        </span>
      </div>
    </div>

    <div class="filter-section-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  activeCount: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.filter-section {
  border-bottom: 1px solid rgba(47, 43, 61, 0.08);
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  background: transparent;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.section-icon {
  font-size: 18px;
  color: var(--primary);
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(47, 43, 61, 0.78);
  margin: 0;
}

.active-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: color-mix(in srgb, var(--primary) 16%, transparent);
  color: var(--primary);
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  margin-left: 4px;
}

.filter-section-content {
  padding: 0 24px 20px 24px;
}

.filter-section-content :deep(.checkbox-list) {
  padding-left: 12px;
  border-left: 2px solid rgba(47, 43, 61, 0.08);
  margin-left: 4px;
}
</style>