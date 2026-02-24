<template>
  <span
    v-if="isEducacross"
    :style="[belinhaMaskStyle, colorStyle]"
    class="event-origin-icon event-origin-icon--coruja"
    role="img"
    aria-label="Educacross"
  />
  <span 
    v-else 
    class="material-symbols-outlined event-origin-icon"
    :style="colorStyle"
    aria-hidden="true"
  >
    {{ iconName }}
  </span>
</template>

<script setup>
/**
 * EventOriginIcon - Ícone de origem do evento
 * 
 * Renderiza o ícone apropriado baseado na origem do evento:
 * - Educacross: Coruja Belinha (SVG mask)
 * - Gestor de Rede: network_intel_node
 * - Gestor Escolar: network_intelligence
 * - Professor: school (chapéu)
 * 
 * @example
 * <EventOriginIcon origin="TEACHER" color="#FF9F43" size="16px" />
 * <EventOriginIcon :origin="event.origin_level" :color="event.color" />
 */
import { computed } from 'vue'
import { useEventRendering } from '@/composables/useEventRendering'

const props = defineProps({
  /**
   * Valor da origem do evento
   * Aceita: 'EDUCACROSS', 'NETWORK', 'SCHOOL', 'TEACHER' ou aliases
   */
  origin: {
    type: String,
    default: ''
  },
  /**
   * Cor do ícone (CSS color value)
   * Se não fornecida, usa 'inherit'
   */
  color: {
    type: String,
    default: 'inherit'
  },
  /**
   * Tamanho do ícone (CSS size value)
   */
  size: {
    type: String,
    default: '16px'
  }
})

const { 
  belinhaMaskStyle, 
  isEducacrossOrigin, 
  getOriginIcon 
} = useEventRendering()

// Computed
const isEducacross = computed(() => isEducacrossOrigin(props.origin))
const iconName = computed(() => getOriginIcon(props.origin))

const colorStyle = computed(() => ({
  color: props.color
}))
</script>

<style scoped>
.event-origin-icon {
  font-size: v-bind(size);
  line-height: 1;
  flex-shrink: 0;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.event-origin-icon--coruja {
  width: v-bind(size);
  height: v-bind(size);
  display: inline-block;
  object-fit: contain;
}
</style>
