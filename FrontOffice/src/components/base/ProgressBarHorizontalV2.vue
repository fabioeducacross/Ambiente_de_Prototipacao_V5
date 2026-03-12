<script setup>
/**
 * ProgressBarHorizontalV2 — runtime técnico do componente canônico ProgressBar
 * (components/progessBar/ProgressBarHorizontalV2.vue)
 *
 * Governança:
 * - Nome público do catálogo: ProgressBar
 * - Nome técnico deste arquivo: ProgressBarHorizontalV2
 * - Não há alias público nesta rodada
 *
 * Uso: <ProgressBarHorizontalV2 :value="72" />
 *      <ProgressBarHorizontalV2 :value="30" :max="100" show-values />
 */
import { computed } from 'vue'
import { BProgress } from 'bootstrap-vue-next'

const props = defineProps({
  value:        { type: Number,   default: 0 },
  max:          { type: Number,   default: null },
  showValues:   { type: Boolean,  default: false },
  reverse:      { type: Boolean,  default: false },
  height:       { type: String,   default: '6px' },
  valuesDivisor:{ type: String,   default: '/' },
  // Função externa para retornar { variant, textClass }
  // Se não informada usa o padrão de cores do DS Educacross
  getVariant:   { type: Function, default: null },
})

const percent = computed(() => {
  if (props.max) return Math.round((props.value / props.max) * 100)
  return props.value
})

/**
 * Regra de variantes — espelha getColorsEnum usado em produção:
 *   ≥100 → verde escuro (finalizado)
 *   ≥ 80 → verde (satisfatório)
 *   ≥ 50 → amarelo (moderado)
 *    < 50 → vermelho (crítico)
 */
const DEFAULT_VARIANT = (p) => {
  if (p >= 100) return { variant: 'success', textClass: 'text-success', color: '#14693a' }
  if (p >= 80)  return { variant: 'success', textClass: 'text-success', color: '#28c76f' }
  if (p >= 50)  return { variant: 'warning', textClass: 'text-warning', color: '#ff9f43' }
  return { variant: 'danger',  textClass: 'text-danger',  color: '#ea5455' }
}

const variant = computed(() => {
  if (props.getVariant) return props.getVariant(percent.value)
  return DEFAULT_VARIANT(percent.value)
})
</script>

<template>
  <div :class="`d-flex gap-2 flex-column${reverse ? '-reverse' : ''}`">
    <BProgress
      :variant="variant.variant"
      :value="percent"
      :max="100"
      :height="height"
      class="w-100"
    />
    <slot :item="{ value, max, showValues, variant, percent }">
      <div class="d-flex">
        <span :class="variant.textClass" class="fw-bold me-1">{{ percent }}%</span>
        <span v-if="showValues" class="ms-auto text-nowrap">
          <span class="fw-bold">{{ value }}</span>
          {{ valuesDivisor }}
          {{ max }}
        </span>
      </div>
    </slot>
  </div>
</template>

<style scoped>
</style>
