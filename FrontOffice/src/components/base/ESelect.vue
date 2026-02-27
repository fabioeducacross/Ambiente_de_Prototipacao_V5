<template>
  <!-- Main container for the custom select component (based on Educacross ESelect) -->
  <div
    ref="refContainer"
    :class="{ disabled: disabled }"
    class="e-select-wrapper relative cursor-pointer"
  >
    <!-- Dropdown Selector/Trigger Area -->
    <div
      role="combobox"
      :aria-expanded="opened.toString()"
      aria-haspopup="listbox"
      :aria-disabled="disabled ? 'true' : undefined"
      tabindex="0"
      :class="[
        'e-select-container',
        { 'is-invalid': state === false || invalid }
      ]"
      @click="switchDrop"
      @keydown.escape="close"
      @keydown.enter.prevent="switchDrop"
      @keydown.space.prevent="switchDrop"
    >
      <!-- Single Selected Option Display -->
      <div
        v-if="!multiple && selectedOption"
        class="selected-option-display"
      >
        <slot name="selected-option" v-bind="selectedOption">
          <span class="selected-option-single">{{ getLabel(selectedOption) }}</span>
        </slot>
      </div>

      <!-- Placeholder Display -->
      <span v-if="!selectedOption && !multiple" class="text-muted">
        {{ placeholder }}
      </span>

      <!-- Badge Display (when options are selected and multiple is true) -->
      <div
        v-if="multiple && selectedLength > 0"
        class="selected-options-badge cursor-pointer"
      >
        <BBadge :variant="variant">
          <span class="d-flex align-items-center">
            <span v-if="isAllSelected">Todas as opções</span>
            <span v-else-if="selectedLength === 1">{{ getLabel(internalSelectedOptions[0]) }}</span>
            <span v-else>{{ selectedLength }} selecionado(s)</span>
            <span
              v-if="clearable && selectedLength > 0"
              class="material-symbols-outlined clear-button ml-1 cursor-pointer"
              @click.stop="clear"
            >
              close
            </span>
          </span>
        </BBadge>
      </div>

      <!-- Multiple placeholder -->
      <span v-if="multiple && selectedLength === 0" class="text-muted">
        {{ placeholder }}
      </span>

      <!-- Icons Container -->
      <div class="icon-container">
        <!-- Clear Icon (single mode) -->
        <span
          v-if="clearable && !multiple && selectedOption"
          class="material-symbols-outlined clear-icon"
          @click.stop="clear"
        >
          close
        </span>

        <!-- Loading -->
        <BSpinner v-if="loading" small class="mr-1" />

        <!-- Dropdown Icon -->
        <span
          v-if="!loading"
          :class="{ 'revert-drop-icon': opened }"
          class="material-symbols-outlined drop-icon"
        >
          expand_more
        </span>
      </div>
    </div>

    <Teleport to="body">
      <!-- Options List Container -->
      <Transition name="dropdown">
        <ul
          v-show="opened"
          ref="refUl"
          role="listbox"
          class="options-container"
          :style="dropdownStyle"
        >
          <!-- Search Input -->
          <div v-if="searchable" class="option-searchable">
            <BFormInput
              ref="refSearchInput"
              v-model="search"
              type="text"
              :placeholder="searchPlaceholder"
              class="search-input"
              @click.stop
            />
          </div>

          <!-- Select All (multiple mode) -->
          <li
            v-if="multiple && filteredOptions.length > 0"
            role="option"
            class="option option-select-all"
            :class="{ selected: isAllSelected }"
            @click.stop="toggleSelectAll"
          >
            <BFormCheckbox
              :model-value="isAllSelected"
              :indeterminate="isIndeterminate"
              @click.stop
            />
            <span>Selecionar todos</span>
          </li>

          <!-- No Results -->
          <li v-if="filteredOptions.length === 0 && !loading" class="option option-no-results">
            Nenhum resultado encontrado
          </li>

          <!-- Options List -->
          <li
            v-for="option in filteredOptions"
            :key="getOptionKey(option)"
            role="option"
            :aria-selected="isSelected(option).toString()"
            :aria-disabled="option.disabled ? 'true' : undefined"
            :class="[
              'option',
              { selected: isSelected(option), disabled: option.disabled }
            ]"
            @click.stop="toggleSelection(option)"
          >
            <BFormCheckbox
              v-if="multiple"
              :model-value="isSelected(option)"
              :disabled="option.disabled"
              @click.stop
            />
            <slot name="option" v-bind="option">
              {{ getLabel(option) }}
            </slot>
          </li>

          <!-- Loading -->
          <li v-if="loading" class="option option-loading">
            <BSpinner small class="mr-2" />
            Carregando...
          </li>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
/**
 * ESelect - Componente de Select customizado
 * Baseado no ESelect original da Educacross (educacross-frontoffice)
 * Portado para Vue 3 Composition API + BootstrapVue Next
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { BBadge, BFormInput, BFormCheckbox, BSpinner } from 'bootstrap-vue-next'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: 'name'
  },
  trackBy: {
    type: String,
    default: 'id'
  },
  loading: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'primary'
  },
  state: {
    type: [String, Boolean],
    default: null
  },
  invalid: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: false
  },
  searchable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Selecione uma opção'
  },
  searchPlaceholder: {
    type: String,
    default: 'Buscar...'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'clear', 'open', 'close'])

// Refs
const refContainer = ref(null)
const refUl = ref(null)
const refSearchInput = ref(null)

// State
const opened = ref(false)
const search = ref('')
const internalSelectedOptions = ref([])
const dropdownStyle = ref({
  top: '0px',
  left: '0px',
  width: '0px'
})

// Computed
const selectedLength = computed(() => internalSelectedOptions.value.length)

const selectedOption = computed(() => {
  if (props.multiple) return null
  return internalSelectedOptions.value[0] || null
})

const isAllSelected = computed(() => {
  return filteredOptions.value.length > 0 &&
    filteredOptions.value.every(opt => isSelected(opt))
})

const isIndeterminate = computed(() => {
  return selectedLength.value > 0 && !isAllSelected.value
})

const filteredOptions = computed(() => {
  const opts = props.options || []
  if (!search.value) return opts
  const query = search.value.toLowerCase()
  return opts.filter(opt => {
    const label = getLabel(opt).toLowerCase()
    return label.includes(query)
  })
})

// Methods
const getLabel = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option)
  }
  return option[props.label] || option.name || option.label || String(option)
}

const getOptionKey = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  }
  return option[props.trackBy] || option.id || JSON.stringify(option)
}

const isSelected = (option) => {
  return internalSelectedOptions.value.some(sel => isSameOption(sel, option))
}

const isSameOption = (opt1, opt2) => {
  if (props.trackBy && typeof opt1 === 'object' && typeof opt2 === 'object') {
    return opt1[props.trackBy] === opt2[props.trackBy]
  }
  return opt1 === opt2 || JSON.stringify(opt1) === JSON.stringify(opt2)
}

const toggleSelection = (option) => {
  if (option.disabled) return

  if (props.multiple) {
    const index = internalSelectedOptions.value.findIndex(sel => isSameOption(sel, option))
    if (index > -1) {
      internalSelectedOptions.value.splice(index, 1)
    } else {
      internalSelectedOptions.value.push(option)
    }
    emitValue()
  } else {
    internalSelectedOptions.value = [option]
    emitValue()
    if (props.closeOnSelect) {
      close()
    }
  }
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    internalSelectedOptions.value = []
  } else {
    internalSelectedOptions.value = [...filteredOptions.value.filter(opt => !opt.disabled)]
  }
  emitValue()
}

const clear = () => {
  internalSelectedOptions.value = []
  emitValue()
  emit('clear')
}

const updateDropdownPosition = () => {
  const triggerEl = refContainer.value?.querySelector('.e-select-container')
  if (!triggerEl) return

  const rect = triggerEl.getBoundingClientRect()
  dropdownStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`
  }
}

const emitValue = () => {
  const value = props.multiple
    ? internalSelectedOptions.value
    : (internalSelectedOptions.value[0] || null)
  emit('update:modelValue', value)
  emit('change', value)
}

const open = () => {
  if (props.disabled) return
  opened.value = true
  emit('open')
  nextTick(() => {
    updateDropdownPosition()
    if (props.searchable && refSearchInput.value) {
      refSearchInput.value.focus()
    }
  })
}

const close = () => {
  opened.value = false
  search.value = ''
  emit('close')
}

const switchDrop = () => {
  if (props.disabled) return
  if (opened.value) {
    close()
  } else {
    open()
  }
}

// Click outside handler
const handleClickOutside = (event) => {
  const clickedInsideTrigger = refContainer.value && refContainer.value.contains(event.target)
  const clickedInsideDropdown = refUl.value && refUl.value.contains(event.target)

  if (!clickedInsideTrigger && !clickedInsideDropdown) {
    close()
  }
}

const handleViewportChange = () => {
  if (opened.value) {
    updateDropdownPosition()
  }
}

// Watch modelValue changes
watch(() => props.modelValue, (newVal) => {
  if (props.multiple) {
    internalSelectedOptions.value = Array.isArray(newVal) ? [...newVal] : []
  } else {
    internalSelectedOptions.value = newVal ? [newVal] : []
  }
}, { immediate: true, deep: true })

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange, true)
})

// Expose
defineExpose({
  open,
  close,
  clear
})
</script>

<style scoped>
.e-select-wrapper {
  position: relative;
  width: 100%;
}

.e-select-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 42px;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}

.e-select-container:hover {
  border-color: var(--gray-400);
}

.e-select-container:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.1);
}

.e-select-container.is-invalid {
  border-color: var(--danger);
}

.e-select-container.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(234, 84, 85, 0.1);
}

.disabled .e-select-container {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--gray-50);
}

.selected-option-display {
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.selected-option-single {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-muted {
  color: var(--gray-500);
}

.selected-options-badge {
  flex: 1;
  min-width: 0;
}

/* Override Bootstrap badge colors to use Design System primary (purple) */
.selected-options-badge :deep(.badge) {
  background-color: var(--primary) !important;
  color: white !important;
  border: none !important;
}

.selected-options-badge :deep(.badge):hover {
  background-color: var(--primary-dark) !important;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-left: var(--spacing-sm);
}

.drop-icon {
  font-size: 20px;
  color: var(--gray-600);
  transition: transform var(--transition-fast);
}

.revert-drop-icon {
  transform: rotate(180deg);
}

.clear-icon,
.clear-button {
  font-size: 16px;
  color: var(--gray-500);
  cursor: pointer;
}

.clear-icon:hover,
.clear-button:hover {
  color: var(--danger);
}

/* Options Dropdown */
.options-container {
  position: fixed;
  z-index: 4000;
  max-height: 300px;
  margin: var(--spacing-xs) 0 0 0;
  padding: var(--spacing-xs) 0;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow-y: auto;
  list-style: none;
}

.option-searchable {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--gray-200);
}

.search-input {
  width: 100%;
}

.option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.option:hover:not(.disabled):not(.option-no-results):not(.option-loading) {
  background-color: var(--gray-50);
}

.option.selected {
  background-color: rgba(115, 103, 240, 0.08);
  color: var(--primary);
}

.option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-select-all {
  border-bottom: 1px solid var(--gray-200);
  font-weight: 500;
}

.option-no-results,
.option-loading {
  color: var(--gray-500);
  cursor: default;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Override Bootstrap checkbox colors to use Design System primary (purple) */
:deep(.form-check-input:checked) {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
}

:deep(.form-check-input:focus) {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 0.25rem rgba(115, 103, 240, 0.25) !important;
}

:deep(.form-check-input:checked:focus) {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 0.25rem rgba(115, 103, 240, 0.25) !important;
}

:deep(.form-check-input:indeterminate) {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
}
</style>
