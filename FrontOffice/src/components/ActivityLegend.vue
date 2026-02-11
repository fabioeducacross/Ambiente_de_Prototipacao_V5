<template>
  <div class="activity-legend">
    <div class="legend-title">Atividades</div>
    
    <div class="activity-list">
      <label
        v-for="activity in activities"
        :key="activity.tipo"
        class="activity-item"
      >
        <div class="checkbox-wrapper">
          <div class="custom-checkbox-container">
            <input
              type="checkbox"
              :checked="isActivityVisible(activity.tipo)"
              @change="toggleActivity(activity.tipo)"
              class="activity-checkbox-hidden"
            />
            <div 
              class="custom-checkbox"
              :class="{ 'checked': isActivityVisible(activity.tipo) }"
              :style="{ 
                background: isActivityVisible(activity.tipo) ? activity.cor : 'transparent',
                boxShadow: isActivityVisible(activity.tipo) ? `0px 2px 6px ${activity.corOpacity}` : 'none'
              }"
            >
              <MaterialIcon 
                v-if="isActivityVisible(activity.tipo)" 
                name="check" 
                size="12" 
                style="color: white;"
              />
            </div>
          </div>
        </div>
        <span class="activity-label">{{ activity.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MaterialIcon from './MaterialIcon.vue'

const props = defineProps({
  visibleActivities: {
    type: Array,
    default: () => ['missao', 'olimpiada', 'avaliacao', 'trilha', 'expedicao']
  }
})

const emit = defineEmits(['update:visible-activities'])

const activities = [
  { tipo: 'missao', label: 'Missões', cor: '#7367F0', corOpacity: 'rgba(115, 103, 240, 0.30)' },
  { tipo: 'olimpiada', label: 'Olimpíadas', cor: '#28C76F', corOpacity: 'rgba(40, 199, 111, 0.30)' },
  { tipo: 'avaliacao', label: 'Avaliações', cor: '#FF4C51', corOpacity: 'rgba(255, 76, 81, 0.30)' },
  { tipo: 'trilha', label: 'Trilhas', cor: '#00BAD1', corOpacity: 'rgba(0, 186, 209, 0.30)' },
  { tipo: 'expedicao', label: 'Expedições', cor: '#FF9F43', corOpacity: 'rgba(255, 159, 67, 0.30)' }
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
  background: var(--Misc-paper, white);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
}

.legend-title {
  color: rgba(47, 43, 61, 0.90);
  font-size: 18px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 28px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
}

.activity-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}

.checkbox-wrapper {
  padding: 6px;
  border-radius: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.custom-checkbox-container {
  padding: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.activity-checkbox-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(47, 43, 61, 0.20);
  transition: all 0.2s ease;
}

.custom-checkbox.checked {
  border-color: transparent;
}

.activity-label {
  color: rgba(47, 43, 61, 0.90);
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  line-height: 22px;
}
</style>
