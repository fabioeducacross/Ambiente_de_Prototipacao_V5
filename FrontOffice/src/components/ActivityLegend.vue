<template>
  <div class="activity-legend">
    <div class="legend-title">Atividades</div>
    
    <label
      v-for="activity in activities"
      :key="activity.tipo"
      class="activity-item"
    >
      <input
        type="checkbox"
        :checked="isActivityVisible(activity.tipo)"
        @change="toggleActivity(activity.tipo)"
        class="activity-checkbox"
      />
      <span
        class="activity-dot"
        :style="{ backgroundColor: activity.cor }"
      ></span>
      <span class="activity-label">{{ activity.label }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visibleActivities: {
    type: Array,
    default: () => ['missao', 'olimpiada', 'avaliacao', 'trilha', 'expedicao']
  }
})

const emit = defineEmits(['update:visible-activities'])

const activities = [
  { tipo: 'missao', label: 'Missões', cor: '#7367F0' },
  { tipo: 'olimpiada', label: 'Olimpíadas', cor: '#00CFE8' },
  { tipo: 'avaliacao', label: 'Avaliações', cor: '#FF9F43' },
  { tipo: 'trilha', label: 'Trilhas', cor: '#28C76F' },
  { tipo: 'expedicao', label: 'Expedições', cor: '#EA5455' }
]

const isActivityVisible = (tipo) => {
  return props.visibleActivities.includes(tipo)
}

const toggleActivity = (tipo) => {
  const newVisibleActivities = [...props.visibleActivities]
  const index = newVisibleActivities.indexOf(tipo)
  
  if (index > -1) {
    newVisibleActivities.splice(index, 1)
  } else {
    newVisibleActivities.push(tipo)
  }
  
  emit('update:visible-activities', newVisibleActivities)
}
</script>

<style scoped>
.activity-legend {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.legend-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e1e2d;
  margin-bottom: 0.75rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 4px;
  margin: 0 -0.25rem;
  padding-left: 0.25rem;
  user-select: none;
}

.activity-item:hover {
  background: #f9fafb;
}

.activity-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: #7367F0;
}

.activity-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-label {
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}
</style>
