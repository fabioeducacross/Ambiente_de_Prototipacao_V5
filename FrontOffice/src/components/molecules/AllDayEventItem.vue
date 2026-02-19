<template>
  <div 
    class="all-day-event-item"
    :style="eventStyle"
    @click="handleClick"
  >
    <!-- Ícone de tipo de atividade -->
    <span 
      class="material-symbols-outlined all-day-icon" 
      :style="{ color: activityColor }"
    >
      {{ activityIcon }}
    </span>
    
    <!-- Conteúdo -->
    <div class="all-day-content">
      <span class="all-day-title">{{ event.titulo }}</span>
      <span v-if="showDateRange && isMultiDay" class="all-day-period">
        {{ dateRange }}
      </span>
    </div>
    
    <!-- Slot para conteúdo adicional -->
    <slot name="append"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEventRendering } from '@/composables/useEventRendering'
import { useCalendar } from '@/composables/useCalendar'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  showDateRange: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click'])

const { 
  hexToRgba, 
  isMultiDayEvent,
  formatDateRange 
} = useEventRendering()

const { getActivityColor, getActivityMaterialIcon } = useCalendar()

// Computed properties
const activityColor = computed(() => getActivityColor(props.event.tipo))
const activityIcon = computed(() => getActivityMaterialIcon(props.event.tipo))

const isMultiDay = computed(() => isMultiDayEvent(props.event))

const dateRange = computed(() => formatDateRange(props.event.dataInicio, props.event.dataTermino))

const eventStyle = computed(() => ({
  '--event-color': activityColor.value,
  backgroundColor: hexToRgba(activityColor.value, 0.12),
  borderLeftColor: activityColor.value,
  cursor: props.clickable ? 'pointer' : 'default'
}))

// Methods
const handleClick = () => {
  if (props.clickable) {
    emit('click', props.event)
  }
}
</script>

<style scoped>
.all-day-event-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  border-left: 3px solid var(--event-color);
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.all-day-event-item[style*="cursor: pointer"]:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.all-day-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.all-day-content {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.all-day-title {
  font-size: 12px;
  font-weight: 500;
  color: rgba(47, 43, 61, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.all-day-period {
  font-size: 10px;
  color: rgba(47, 43, 61, 0.5);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
