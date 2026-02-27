<script setup>
/**
 * GuidesLimitAlert — porta do componente de produção
 * (components/missions/GuidesLimitAlert.vue)
 *
 * 3 layouts baseados em guidesMonth:
 *   < 26  → variant="primary"  layout 1 (info normal)
 *   < 40  → variant="danger"   layout 2 (atenção)
 *   ≥ 40  → variant="danger"   layout 3 (esgotado)
 *
 * Em produção, guidesMonth é buscado via API (getClassesGuidesMonth).
 * No protótipo é passado diretamente como prop.
 *
 * Uso: <GuidesLimitAlert :guides-month="guidesMonth" />
 */
import { computed } from 'vue'
import { BAlert } from 'bootstrap-vue-next'

const props = defineProps({
  // null = sem dados ainda (alert não renderiza)
  guidesMonth: { type: Number, default: null },
})

const TOOLTIP_TEXT = 'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'

const guidesData = computed(() => {
  if (props.guidesMonth === null) return null
  if (props.guidesMonth < 26)    return { variant: 'primary', layout: 1 }
  if (props.guidesMonth < 40)    return { variant: 'danger',  layout: 2 }
  return                                { variant: 'danger',  layout: 3 }
})

const missionLabel = computed(() => props.guidesMonth === 1 ? 'missão' : 'missões')
</script>

<template>
  <BAlert v-if="guidesData" :variant="guidesData.variant" :model-value="true" class="mb-2">
    <div class="alert-body">
      <div class="d-flex justify-content-center align-items-center">

        <!-- Layout 1: primary — informativo (< 26 missões) -->
        <div
          v-if="guidesData.layout === 1"
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined">edit_calendar</span>
          É permitida a criação de até 40 missões ao mês por turma. Este mês, você criou:
          <span class="fw-bold">{{ guidesMonth }} {{ missionLabel }}.</span>
          <span
            :title="TOOLTIP_TEXT"
            style="font-size:15px;cursor:help"
            class="material-symbols-outlined"
          >info</span>
        </div>

        <!-- Layout 2: danger — atenção (26–39 missões) -->
        <div
          v-if="guidesData.layout === 2"
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined">edit_calendar</span>
          Atenção: é permitida a criação de até 40 missões ao mês por turma. Este mês, você criou:
          <span class="fw-bold">{{ guidesMonth }} missões.</span>
          <span
            :title="TOOLTIP_TEXT"
            style="font-size:15px;cursor:help"
            class="material-symbols-outlined"
          >info</span>
        </div>

        <!-- Layout 3: danger — esgotado (≥ 40 missões) -->
        <div
          v-if="guidesData.layout === 3"
          class="d-flex flex-column flex-lg-row align-items-center gap-2"
        >
          <span class="material-symbols-outlined">edit_calendar</span>
          <span>
            <span class="fw-bold">As missões dessa turma se esgotaram.</span>
            É permitida a criação até 40 missões ao mês por turma, exclua uma missão para criar uma nova.
            <span
              :title="TOOLTIP_TEXT"
              style="font-size:15px;vertical-align:text-bottom;cursor:help"
              class="material-symbols-outlined"
            >info</span>
          </span>
        </div>

      </div>
    </div>
  </BAlert>
</template>

<style scoped>
</style>
