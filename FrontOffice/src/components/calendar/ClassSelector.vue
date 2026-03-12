<template>
  <div class="class-selector-header">
    <div class="selector-filters">
      <div
        v-if="showSchoolYear"
        class="class-selector-dropdown"
        @click="toggleSchoolYearDropdown"
      >
        <div class="dropdown-content dropdown-content--school-year">
          <div class="class-info">
            <span class="class-name">{{ selectedSchoolYear.name }}</span>
          </div>
          <span class="material-symbols-outlined chevron-icon">
            {{ isSchoolYearOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <transition name="dropdown">
          <div
            v-if="isSchoolYearOpen"
            class="selector-menu selector-menu--school-year"
          >
            <button
              v-for="schoolYear in normalizedSchoolYears"
              :key="schoolYear.id ?? 'all-school-years'"
              class="dropdown-item"
              :class="{ active: schoolYear.id === selectedSchoolYear.id }"
              @click.stop="selectSchoolYear(schoolYear)"
            >
              <div class="item-content">
                <span class="item-name">{{ schoolYear.name }}</span>
              </div>
            </button>
          </div>
        </transition>
      </div>

      <div class="class-selector-dropdown" @click="toggleDropdown">
        <div class="dropdown-content dropdown-content--class">
          <div class="class-info">
            <span class="class-name">{{ selectedClass.name }}</span>
            <span v-if="selectedClass.grade" class="class-badge">{{ selectedClass.grade }}</span>
          </div>
          <span class="material-symbols-outlined chevron-icon">
            {{ isOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <transition name="dropdown">
          <div v-if="isOpen" class="selector-menu selector-menu--class">
            <button
              v-for="classItem in normalizedClasses"
              :key="classItem.id"
              class="dropdown-item"
              :class="{ active: classItem.id === selectedClass.id }"
              @click.stop="selectClass(classItem)"
            >
              <div class="item-content">
                <span class="item-name">{{ classItem.name }}</span>
                <span v-if="classItem.grade" class="item-badge">{{ classItem.grade }}</span>
              </div>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="school-info">
      <span class="material-symbols-outlined school-icon">school</span>
      <span class="school-name">{{ schoolName }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  schoolYears: {
    type: Array,
    default: () => [],
  },
  classes: {
    type: Array,
    default: () => [
      { id: '5a-manha', name: 'Turma 5º A - Manhã', grade: '5º ano', schoolYearId: '5º ano' },
      { id: '5b-manha', name: 'Turma 5º B - Manhã', grade: '5º ano', schoolYearId: '5º ano' },
      { id: '5a-tarde', name: 'Turma 5º A - Tarde', grade: '5º ano', schoolYearId: '5º ano' },
      { id: '6a-manha', name: 'Turma 6º A - Manhã', grade: '6º ano', schoolYearId: '6º ano' },
      { id: '6b-manha', name: 'Turma 6º B - Manhã', grade: '6º ano', schoolYearId: '6º ano' },
      { id: '7a-manha', name: 'Turma 7º A - Manhã', grade: '7º ano', schoolYearId: '7º ano' },
    ],
  },
  initialClass: {
    type: String,
    default: '5a-manha',
  },
  initialSchoolYear: {
    type: [String, Number],
    default: null,
  },
  showSchoolYear: {
    type: Boolean,
    default: true,
  },
  schoolName: {
    type: String,
    default: 'COLÉGIO FLORESTA ENCANTADA',
  },
})

const emit = defineEmits(['class-change', 'school-year-change'])

const fallbackSchoolYear = { id: null, name: 'Todos' }
const FALLBACK_CLASS_ID = 'all-classes'

const isOpen = ref(false)
const isSchoolYearOpen = ref(false)

const classMatchesSchoolYear = (classItem, schoolYear) => {
  if (!schoolYear || schoolYear.id === null) {
    return true
  }

  return classItem.schoolYearId === schoolYear.id
    || classItem.schoolYearId === schoolYear.name
    || classItem.grade === schoolYear.id
    || classItem.grade === schoolYear.name
}

const normalizedSchoolYears = computed(() => {
  if (props.schoolYears.length > 0) {
    return props.schoolYears
  }

  const seenGrades = new Set()
  const gradeOptions = props.classes
    .map((classItem) => classItem.grade)
    .filter((grade) => {
      if (!grade || seenGrades.has(grade)) {
        return false
      }

      seenGrades.add(grade)
      return true
    })
    .map((grade) => ({ id: grade, name: grade }))

  return [fallbackSchoolYear, ...gradeOptions]
})

const resolveSchoolYearSelection = (schoolYearId) => {
  return normalizedSchoolYears.value.find((schoolYear) => schoolYear.id === schoolYearId)
    || normalizedSchoolYears.value.find((schoolYear) => schoolYear.name === schoolYearId)
    || normalizedSchoolYears.value[0]
    || fallbackSchoolYear
}

const fallbackClass = computed(() => ({
  id: FALLBACK_CLASS_ID,
  name: 'Todas as turmas',
  grade: selectedSchoolYear.value?.id ?? selectedSchoolYear.value?.name ?? 'Todos os anos',
  isAll: true,
}))

const normalizedClasses = computed(() => {
  const filteredClasses = props.classes.filter((classItem) => classMatchesSchoolYear(classItem, selectedSchoolYear.value))
  return [fallbackClass.value, ...filteredClasses]
})

const resolveClassSelection = (classId) => {
  return normalizedClasses.value.find((classItem) => classItem.id === classId)
    || normalizedClasses.value[0]
    || fallbackClass.value
}

const selectedSchoolYear = ref(resolveSchoolYearSelection(props.initialSchoolYear))
const selectedClass = ref(resolveClassSelection(props.initialClass))

watch(
  () => props.initialSchoolYear,
  (schoolYearId) => {
    selectedSchoolYear.value = resolveSchoolYearSelection(schoolYearId)
  }
)

watch(
  normalizedSchoolYears,
  () => {
    selectedSchoolYear.value = resolveSchoolYearSelection(
      selectedSchoolYear.value?.id ?? props.initialSchoolYear
    )
  },
  { deep: true }
)

watch(
  normalizedClasses,
  () => {
    selectedClass.value = resolveClassSelection(selectedClass.value?.id ?? props.initialClass)
  },
  { deep: true }
)

watch(
  () => props.initialClass,
  (classId) => {
    selectedClass.value = resolveClassSelection(classId)
  }
)

const toggleDropdown = () => {
  isSchoolYearOpen.value = false
  isOpen.value = !isOpen.value
}

const toggleSchoolYearDropdown = () => {
  isOpen.value = false
  isSchoolYearOpen.value = !isSchoolYearOpen.value
}

const selectClass = (classItem) => {
  selectedClass.value = classItem
  isOpen.value = false
  emit('class-change', classItem)
}

const selectSchoolYear = (schoolYear) => {
  selectedSchoolYear.value = schoolYear
  selectedClass.value = resolveClassSelection(selectedClass.value?.id)

  if (!classMatchesSchoolYear(selectedClass.value, schoolYear)) {
    selectedClass.value = fallbackClass.value
  }

  isSchoolYearOpen.value = false
  emit('school-year-change', schoolYear)
  emit('class-change', selectedClass.value)
}

const handleOutsideClick = (event) => {
  const target = event.target

  if (!(target instanceof Element) || !target.closest('.class-selector-dropdown')) {
    isOpen.value = false
    isSchoolYearOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleOutsideClick)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleOutsideClick)
  }
})
</script>

<style scoped>
.class-selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 12px;
  gap: 20px;
}

.selector-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.class-selector-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  background: var(--white);
  border: 1px solid var(--ec-border);
  border-radius: 100px;
  padding: 10px 20px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 19px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.dropdown-content--school-year {
  min-width: 190px;
  justify-content: space-between;
}

.dropdown-content--class {
  min-width: 280px;
  justify-content: space-between;
}

.dropdown-content:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--primary) 20%, transparent);
}

.class-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.class-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: var(--primary);
  white-space: nowrap;
}

.class-badge {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
  color: var(--primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  padding: 2px 8px;
  border-radius: 100px;
  white-space: nowrap;
}

.chevron-icon {
  font-size: 16px;
  color: var(--primary);
  transition: transform 0.2s;
}

.dropdown-content:hover .chevron-icon {
  transform: translateY(2px);
}

.selector-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 280px;
  background: var(--white);
  border: 1px solid var(--ec-border);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  padding: 8px;
  z-index: 1000;
  overflow: hidden;
}

.selector-menu--school-year {
  min-width: 190px;
}

.dropdown-item {
  width: 100%;
  background: none;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  text-align: left;
}

.dropdown-item:hover {
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.dropdown-item.active {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--primary);
}

.item-badge {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
  color: var(--primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 100px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.school-info {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}

.school-icon {
  font-size: 24px;
  color: var(--primary);
}

.school-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: var(--primary);
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .class-selector-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .selector-filters {
    flex-wrap: wrap;
    width: 100%;
  }

  .dropdown-content--school-year,
  .dropdown-content--class {
    min-width: min(100%, 280px);
  }

  .school-info {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .class-selector-header {
    padding: 4px 0 8px;
  }

  .selector-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .class-selector-dropdown,
  .dropdown-content--school-year,
  .dropdown-content--class,
  .selector-menu,
  .selector-menu--school-year {
    width: 100%;
    min-width: 100%;
  }

  .school-info {
    width: 100%;
  }

  .school-name {
    white-space: normal;
  }
}
</style>
