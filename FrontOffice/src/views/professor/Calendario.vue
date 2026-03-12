<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import EventDrawer from '@/components/EventDrawer.vue'
import CalendarLayoutTemplate from '@/components/templates/CalendarLayoutTemplate.vue'
import ClassSelector from '@/components/calendar/ClassSelector.vue'
import { ORIGIN_LEVELS, normalizeOriginLevel } from '@/data/calendar-enums'
import calendarMockData from '@/data/calendar-mock-teacher.json'
import { useProfileSwitcher } from '@/shared/composables/useProfileSwitcher'

const STORAGE_KEY = 'educacross_calendar_events'
const { currentProfile } = useProfileSwitcher()

const classCatalog = [
  { id: '5a-manha', name: 'Turma 5º A - Manhã', grade: '5º ano', schoolYearId: '5º ano' },
  { id: '5b-manha', name: 'Turma 5º B - Manhã', grade: '5º ano', schoolYearId: '5º ano' },
  { id: '5a-tarde', name: 'Turma 5º A - Tarde', grade: '5º ano', schoolYearId: '5º ano' },
  { id: '6a-manha', name: 'Turma 6º A - Manhã', grade: '6º ano', schoolYearId: '6º ano' },
  { id: '6b-manha', name: 'Turma 6º B - Manhã', grade: '6º ano', schoolYearId: '6º ano' },
  { id: '7a-manha', name: 'Turma 7º A - Manhã', grade: '7º ano', schoolYearId: '7º ano' },
]
const ALL_CLASSES_ID = 'all-classes'

const currentDate = ref(new Date(2026, 1, 15))
const selectedTurma = ref('5a-manha')
const events = ref([])
const isDrawerOpen = ref(false)
const editingEvent = ref(null)
const drawerMode = ref('create')
const selectedSchoolYear = ref(null)
const hideSchoolYear = computed(() => currentProfile.value?.id === 'teacher')
const hideDrawerSchoolYearField = computed(() => currentProfile.value?.id === 'teacher')
const currentCalendarYear = computed(() => currentDate.value.getFullYear())
const schoolYearOptions = computed(() => {
  const turmaGrades = [...new Set(classCatalog.map((classItem) => classItem.schoolYearId))]
  return [
    { id: null, name: 'Todos' },
    ...turmaGrades.map((grade) => ({ id: grade, name: grade })),
  ]
})
const turmaOptions = computed(() => classCatalog)
const turmaGradeMap = computed(() => Object.fromEntries(classCatalog.map((classItem) => [classItem.id, classItem.grade])))

const matchesSelectedSchoolYear = (turmaId) => {
  if (!selectedSchoolYear.value || selectedSchoolYear.value.id === null) {
    return true
  }

  const turmaGrade = turmaGradeMap.value[turmaId]
  return turmaGrade === selectedSchoolYear.value.id || turmaGrade === selectedSchoolYear.value.name
}

const saveToLocalStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.value))
  } catch (e) { /* noop */ }
}

const migrateDateField = (value) => {
  if (!value || typeof value !== 'string') return value
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})(T.+)?$/)
  if (match) {
    const [, day, month, year, time = 'T00:00:00'] = match
    return `${year}-${month}-${day}${time}`
  }
  return value
}

const migrateEvent = (e) => ({
  ...e,
  dataInicio: migrateDateField(e.dataInicio),
  dataTermino: migrateDateField(e.dataTermino),
  start_at: migrateDateField(e.start_at),
  end_at: migrateDateField(e.end_at),
  tipo: e.tipo === 'outro' ? 'lembrete' : e.tipo,
  type: e.type === 'outro' ? 'lembrete' : e.type,
})

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored).map(migrateEvent)
  } catch { /* noop */ }
  return null
}

watch(events, () => saveToLocalStorage(), { deep: true })

const activityOptions = [
  { value: 'missao', label: 'Missões', color: '#7F6CC3', disabled: false },
  { value: 'olimpiada', label: 'Olimpíadas', color: '#8BC728', disabled: false },
  { value: 'avaliacao', label: 'Avaliações', color: '#FE5153', disabled: false },
  { value: 'trilha', label: 'Trilhas', color: '#00A5A0', disabled: false },
  { value: 'expedicao', label: 'Expedições', color: '#FFB443', disabled: false },
  { value: 'lembrete', label: 'Lembretes', color: '#7CD7D3', disabled: false },
]

const typeColorMap = {
  missao: '#7F6CC3', olimpiada: '#8BC728', avaliacao: '#FE5153',
  trilha: '#00A5A0', expedicao: '#FFB443', lembrete: '#7CD7D3',
}

const transformEvent = (event) => {
  const startDate = new Date(event.start_at || event.dataInicio)
  const endDate = new Date(event.end_at || event.dataTermino || startDate)
  if (isNaN(startDate.getTime())) return null
  const pad = (n) => String(n).padStart(2, '0')
  const categoryToTypeMap = {
    MISSIONS: 'missao', OLYMPIADS: 'olimpiada', ASSESSMENTS: 'avaliacao',
    TRAILS: 'trilha', EXPEDITIONS: 'expedicao', REMINDERS: 'lembrete',
  }
  const tipo = categoryToTypeMap[event.category] || event.tipo || 'outro'
  return {
    ...event,
    title: event.title || event.titulo,
    titulo: event.titulo || event.title,
    tipo, type: tipo,
    date: event.start_at || event.dataInicio,
    dataInicio: event.start_at || event.dataInicio,
    dataTermino: event.end_at || event.dataTermino,
    color: typeColorMap[tipo] || typeColorMap.lembrete,
    horaInicio: `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`,
    horaTermino: `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`,
    origin_level: normalizeOriginLevel(event.origin_level || event.origin || event.origem) || ORIGIN_LEVELS.EDUCACROSS.value,
  }
}

const calendarEvents = computed(() =>
  events.value.map(transformEvent).filter(Boolean)
    .filter((ev) => {
      const turmaIds = ev.turmas || []
      const yearMatches = turmaIds.length === 0 || turmaIds.some((turmaId) => matchesSelectedSchoolYear(turmaId))
      const classMatches = selectedTurma.value === ALL_CLASSES_ID || turmaIds.length === 0 || turmaIds.includes(selectedTurma.value)
      return yearMatches && classMatches
    })
)

const handleClassChange = (c) => { selectedTurma.value = c.id }
const handleSchoolYearChange = (year) => {
  selectedSchoolYear.value = year
}
const handleMonthChange = (d) => { currentDate.value = d }
const handleDayClick = () => {}
const handleActivityChange = () => {}

const handleEventClick = (event) => {
  editingEvent.value = event
  drawerMode.value = 'view'
  isDrawerOpen.value = true
}
const handleEditEvent = (event) => {
  editingEvent.value = event
  drawerMode.value = 'edit'
}
const openDrawer = () => {
  editingEvent.value = null
  drawerMode.value = 'create'
  isDrawerOpen.value = true
}
const closeDrawer = () => {
  isDrawerOpen.value = false
  editingEvent.value = null
  drawerMode.value = 'create'
}
const saveEvent = (eventData) => {
  const payload = {
    ...eventData,
    schoolYear: eventData.schoolYear || currentCalendarYear.value,
    school_year: eventData.school_year || currentCalendarYear.value,
  }
  const idx = events.value.findIndex(e => e.id === payload.id)
  const origin = normalizeOriginLevel(payload.origin_level || 'professor') || ORIGIN_LEVELS.TEACHER.value
  if (idx !== -1) {
    events.value[idx] = { ...payload, origin_level: origin }
  } else {
    events.value.push({
      ...payload,
      id: payload.id || Date.now(),
      status: 'ativo',
      origem: payload.origem || 'professor',
      origin_level: origin,
      start_at: payload.start_at || payload.dataInicio,
      end_at: payload.end_at || payload.dataTermino,
    })
  }
  closeDrawer()
}
const deleteEvent = (eventId) => {
  events.value = events.value.filter(e => String(e.id) !== String(eventId))
  saveToLocalStorage()
}

onMounted(() => {
  const saved = loadFromLocalStorage()
  events.value = (saved && saved.length > 0) ? saved : calendarMockData
  if (!saved || saved.length === 0) saveToLocalStorage()
  if (typeof window !== 'undefined') {
    window.__resetCalendarData__ = () => {
      localStorage.removeItem(STORAGE_KEY)
      events.value = calendarMockData
      saveToLocalStorage()
    }
  }
})
</script>

<template>
  <div class="calendario-wrapper">
    <ClassSelector
      :classes="turmaOptions"
      :initial-class="selectedTurma"
      :initial-school-year="selectedSchoolYear?.id ?? null"
      :school-years="schoolYearOptions"
      :show-school-year="!hideSchoolYear"
      @class-change="handleClassChange"
      @school-year-change="handleSchoolYearChange"
    />

    <div class="calendar-container">
      <CalendarLayoutTemplate
        :events="calendarEvents"
        :initial-date="currentDate"
        :activity-options="activityOptions"
        :show-sidebar="true"
        @add-event="openDrawer"
        @activity-change="handleActivityChange"
        @day-click="handleDayClick"
        @event-click="handleEventClick"
        @month-change="handleMonthChange"
      />
    </div>

    <EventDrawer
      :is-open="isDrawerOpen"
      :event-data="editingEvent"
      :mode="drawerMode"
      :default-turma="selectedTurma"
      :selected-school-year="selectedSchoolYear"
      :show-school-year-field="!hideDrawerSchoolYearField"
      :school-year="currentCalendarYear"
      :school-year-options="schoolYearOptions"
      :turma-options="turmaOptions"
      @close="closeDrawer"
      @save="saveEvent"
      @delete="deleteEvent"
      @edit="handleEditEvent"
    />
  </div>
</template>

<style scoped>
.calendario-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.calendar-container {
  background: white;
  border-radius: 6px;
  box-shadow: 0px 3px 12px rgba(47, 43, 61, 0.14);
  overflow: hidden;
  width: 100%;
}

@media (max-width: 768px) {
  .calendario-wrapper {
    gap: 0.75rem;
  }
}
</style>
