<template>
  <div class="activity-legend">
    <span class="legend-title">{{ title }}</span>
    <div class="legend-items">
      <LegendItem
        v-for="activity in activities"
        :key="activity.type"
        :color="activity.color"
        :label="activity.label"
        :dot-size="dotSize"
        :label-size="labelSize"
        :interactive="interactive"
        @click="$emit('activity-click', activity.type)"
      />
    </div>
  </div>
</template>

<script setup>
import LegendItem from '../molecules/LegendItem.vue'

defineProps({
  title: {
    type: String,
    default: 'Tipos de Atividade:'
  },
  activities: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => item.type && item.color && item.label)
  },
  dotSize: {
    type: String,
    default: 'medium'
  },
  labelSize: {
    type: String,
    default: 'default'
  },
  interactive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['activity-click'])
</script>

<style scoped>
.activity-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: var(--background-paper, white);
  border-top: 1px solid var(--divider, rgba(47, 43, 61, 0.12));
}

.legend-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--text-secondary, rgba(47, 43, 61, 0.7));
  margin-right: 8px;
}

.legend-items {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
