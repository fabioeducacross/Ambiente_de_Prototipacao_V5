<template>
  <div class="class-selector-header">
    <div class="selector-filters">
      <div v-if="showSchoolYear" class="class-selector-dropdown" @click="toggleSchoolYearDropdown">
        <div class="dropdown-content dropdown-content--school-year">
          <div class="class-info">
            <span class="class-name">{{ selectedSchoolYear.name }}</span>
          </div>
          <span class="material-symbols-outlined chevron-icon">
            {{ isSchoolYearOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <transition name="dropdown">
          <div v-if="isSchoolYearOpen" class="dropdown-menu dropdown-menu--school-year">
            <button
              v-for="schoolYear in schoolYears"
              :key="schoolYear.id"
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

      <!-- Dropdown de Seleção de Turma -->
      <div class="class-selector-dropdown" @click="toggleDropdown">
        <div class="dropdown-content dropdown-content--class">
          <div class="class-info">
            <span class="class-name">{{ selectedClass.name }}</span>
            <span class="class-badge">{{ selectedClass.grade }}</span>
          </div>
          <span class="material-symbols-outlined chevron-icon">
            {{ isOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <transition name="dropdown">
          <div v-if="isOpen" class="dropdown-menu dropdown-menu--class">
            <button
              v-for="classItem in classes"
              :key="classItem.id"
              class="dropdown-item"
              :class="{ active: classItem.id === selectedClass.id }"
              @click.stop="selectClass(classItem)"
            >
              <div class="item-content">
                <span class="item-name">{{ classItem.name }}</span>
                <span class="item-badge">{{ classItem.grade }}</span>
              </div>
            </button>
          </div>
        </transition>
      </div>
    </div>
    
    <!-- Informação da Escola -->
    <div class="school-info">
      <span class="material-symbols-outlined school-icon">school</span>
      <span class="school-name">{{ schoolName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  schoolYears: {
    type: Array,
    default: () => [
      { id: '2026', name: 'Ano escolar 2026' },
      { id: '2025', name: 'Ano escolar 2025' },
      { id: '2024', name: 'Ano escolar 2024' }
    ]
  },
  classes: {
    type: Array,
    default: () => [
      { id: '5a', name: 'Turma 5º A - Manhã', grade: '5º ano' },
      { id: '5b', name: 'Turma 5º B - Tarde', grade: '5º ano' },
      { id: '6a', name: 'Turma 6º A - Manhã', grade: '6º ano' },
      { id: '6b', name: 'Turma 6º B - Tarde', grade: '6º ano' }
    ]
  },
  initialClass: {
    type: String,
    default: '5a'
  },
  initialSchoolYear: {
    type: String,
    default: '2026'
  },
  showSchoolYear: {
    type: Boolean,
    default: true
  },
  schoolName: {
    type: String,
    default: 'COLÉGIO FLORESTA ENCANTADA'
  }
})

const emit = defineEmits(['class-change', 'school-year-change'])

const isOpen = ref(false)
const isSchoolYearOpen = ref(false)
const selectedSchoolYear = ref(props.schoolYears.find(y => y.id === props.initialSchoolYear) || props.schoolYears[0])
const selectedClass = ref(props.classes.find(c => c.id === props.initialClass) || props.classes[0])

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
  isSchoolYearOpen.value = false
  emit('school-year-change', schoolYear)
}

// Fechar dropdown ao clicar fora
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.class-selector-dropdown')) {
      isOpen.value = false
      isSchoolYearOpen.value = false
    }
  })
}
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

/* Dropdown de Turma */
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

/* Dropdown Menu */
.dropdown-menu {
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

.dropdown-menu--school-year {
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

/* Transição do Dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Informação da Escola */
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
    width: 100%;
    flex-wrap: wrap;
  }

  .dropdown-content--school-year,
  .dropdown-content--class {
    min-width: unset;
    width: 100%;
  }
  
  .school-info {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .class-name {
    font-size: 13px;
  }
  
  .school-name {
    font-size: 13px;
  }
  
  .dropdown-menu {
    min-width: 100%;
  }
}
</style>
