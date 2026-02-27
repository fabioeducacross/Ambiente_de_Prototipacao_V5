<script setup>
/**
 * LegendEnum — porta do componente de produção
 * (components/legends/LegendEnum.vue)
 *
 * Uso:
 *   const legends = [{
 *     text: 'Progresso da turma',
 *     enum: [
 *       { text: 'Finalizado ≥ 100%', color: '#14693a' },
 *       { text: 'Satisfatório ≥ 80%', color: '#28c76f' },
 *       { text: 'Moderado ≥ 50%',    color: '#ff9f43' },
 *       { text: 'Crítico < 50%',     color: '#ea5455' },
 *     ]
 *   }]
 *   <LegendEnum :legends="legends" />
 */
import { BCard, BCardBody } from 'bootstrap-vue-next'

const props = defineProps({
  legends:   { type: Array,   required: true },
  border:    { type: Boolean, default: false },
  cardClass: { type: String,  default: '' },
})
</script>

<template>
  <BCard no-body :class="[border ? 'card-border' : '', cardClass]">
    <div v-for="(legend, i) in legends" :key="`${i}-itemEnum`">
      <BCardBody
        class="py-2"
        :class="{
          'pb-0': i < legends.length - 1,
          'pt-0': i !== 0,
        }"
      >
        <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <div v-if="legend.text" class="text-muted small">{{ legend.text }}:</div>
          <div v-for="(item, j) in legend.enum" :key="`${i}-${j}-item`">
            <!-- slot permite substituição via SemaphoreStatus no futuro -->
            <slot name="enum-component" :value="item">
              <span class="d-flex align-items-center gap-1 small text-muted">
                <span :style="`color:${item.color || item.dotColor || '#6e6b7b'};font-size:.9rem`">●</span>
                {{ item.text }}
              </span>
            </slot>
          </div>
        </div>

        <!-- legendas descritivas (item.legend) -->
        <p
          v-for="(item, j) in legend.enum"
          v-show="item.legend"
          :key="`${i}-${j}-legend`"
          class="mt-1 mb-0 small text-muted"
          v-html="item.legend"
        />
      </BCardBody>
      <hr v-if="i < legends.length - 1" class="my-0" />
    </div>
  </BCard>
</template>

<style scoped>
.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>
