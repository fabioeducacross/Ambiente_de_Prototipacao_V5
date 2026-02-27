<script setup>
/**
 * SelectSubject — porta do SelectSubject.vue de produção
 * (layouts/components/SelectSubject.vue)
 *
 * Modo select (padrão): ESelect com ícone de disciplina + nome
 * Props: modelValue, showLabel, label, optionAll
 */
import { computed } from 'vue'
import { BFormGroup } from 'bootstrap-vue-next'
import ESelect from '@/components/base/ESelect.vue'
import SubjectIcon from '@/components/SubjectIcon.vue'

const props = defineProps({
  modelValue:  { type: Object,  default: null },
  showLabel:   { type: Boolean, default: true },
  label:       { type: String,  default: 'Área de conhecimento' },
  optionAll:   { type: Boolean, default: false },
  disabled:    { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

// Lista estática para prototipação (em produção vem de useFilters().subjects)
const BASE_SUBJECTS = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'Língua Portuguesa' },
  { id: 3, name: 'Matemática Inglês' },
]

const subjectsList = computed(() => {
  if (props.optionAll) return [{ id: null, name: 'Todas' }, ...BASE_SUBJECTS]
  return BASE_SUBJECTS
})

const onChange = (val) => emit('update:modelValue', val)
</script>

<template>
  <div class="w-100">
    <BFormGroup :label="showLabel ? label : ''" label-for="subject-dropdown">
      <ESelect
        :model-value="modelValue"
        :options="subjectsList"
        label="name"
        track-by="id"
        :disabled="disabled"
        style="min-width: 215px"
        @update:model-value="onChange"
      >
        <!-- Opção no dropdown -->
        <template #option="item">
          <div class="d-flex align-items-center gap-1">
            <SubjectIcon :disciplina="item.name" :size="26" />
            <span>{{ item.name }}</span>
          </div>
        </template>

        <!-- Opção selecionada (trigger) -->
        <template #selected-option="item">
          <div class="d-flex align-items-center gap-1">
            <SubjectIcon :disciplina="item.name" :size="26" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </ESelect>
    </BFormGroup>
  </div>
</template>

<style scoped>
</style>
