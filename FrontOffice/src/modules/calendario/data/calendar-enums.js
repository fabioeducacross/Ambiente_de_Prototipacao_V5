/**
 * Enums e configurações do Calendário Unificado
 * Baseado em SPEC-CALENDARIO-PROTOTIPO.md v1.1
 */

export const CATEGORIES = {
  MISSIONS: {
    value: 'MISSIONS',
    label: 'Missões',
    color: '#7F6CC3',
    icon: 'assignment'
  },
  OLYMPIADS: {
    value: 'OLYMPIADS',
    label: 'Olimpíadas',
    color: '#8BC728',
    icon: 'emoji_events'
  },
  ASSESSMENTS: {
    value: 'ASSESSMENTS',
    label: 'Avaliações',
    color: '#FE5153',
    icon: 'quiz'
  },
  TRAILS: {
    value: 'TRAILS',
    label: 'Trilhas',
    color: '#00A5A0',
    icon: 'route'
  },
  EXPEDITIONS: {
    value: 'EXPEDITIONS',
    label: 'Expedições',
    color: '#FFB443',
    icon: 'explore'
  },
  REMINDERS: {
    value: 'REMINDERS',
    label: 'Lembretes',
    color: '#7CD7D3',
    icon: 'notifications'
  }
}

export const ORIGIN_LEVELS = {
  EDUCACROSS: {
    value: 'EDUCACROSS',
    label: 'Educacross',
    icon: 'star',
    color: '#7367F0'
  },
  NETWORK: {
    value: 'NETWORK',
    label: 'Gestor de Rede',
    icon: 'network_intel_node',
    color: '#00CFE8'
  },
  SCHOOL: {
    value: 'SCHOOL',
    label: 'Gestor Escolar',
    icon: 'network_intelligence',
    color: '#28C76F'
  },
  TEACHER: {
    value: 'TEACHER',
    label: 'Professor',
    icon: 'school',
    color: '#FF9F43'
  }
}

export const STATUS = {
  DRAFT: { value: 'DRAFT', label: 'Rascunho', color: '#B8C2CC' },
  PUBLISHED: { value: 'PUBLISHED', label: 'Publicado', color: '#28C76F' },
  SCHEDULED: { value: 'SCHEDULED', label: 'Agendado', color: '#00CFE8' },
  ACTIVE: { value: 'ACTIVE', label: 'Ativo', color: '#7367F0' },
  CANCELED: { value: 'CANCELED', label: 'Cancelado', color: '#EA5455' },
  ARCHIVED: { value: 'ARCHIVED', label: 'Arquivado', color: '#B8C2CC' }
}

// Status específicos de controle de missões pelo Professor
export const MISSION_STATUS_TEACHER = {
  NOT_SENT: {
    value: 'NOT_SENT',
    label: 'Não Enviada',
    color: '#B8C2CC',  // cinza - não ativa
    icon: 'schedule_send',
    description: 'Missão ainda não foi enviada para a turma'
  },
  ENABLED: {
    value: 'ENABLED',
    label: 'Habilitada',
    color: '#28C76F',  // verde - missão ativa
    icon: 'play_circle',
    description: 'Missão liberada para a turma'
  },
  PAUSED: {
    value: 'PAUSED',
    label: 'Pausada',
    color: '#FF9F43',  // laranja - atenção
    icon: 'pause_circle',
    description: 'Missão pausada temporariamente'
  },
  FINISHED: {
    value: 'FINISHED',
    label: 'Finalizada',
    color: '#7367F0',  // roxo - concluída
    icon: 'check_circle',
    description: 'Missão encerrada'
  }
}

export const SOURCE_TYPES = {
  CALENDAR_MANUAL: 'CALENDAR_MANUAL',
  MODULE_MISSION: 'MODULE_MISSION',
  MODULE_ASSESSMENT: 'MODULE_ASSESSMENT',
  MODULE_TRAIL: 'MODULE_TRAIL',
  MODULE_EXPEDITION: 'MODULE_EXPEDITION',
  MODULE_OLYMPIAD: 'MODULE_OLYMPIAD'
}

export const SCOPE_LEVELS = {
  NETWORK: 'NETWORK',
  SCHOOL: 'SCHOOL',
  CLASS: 'CLASS'
}

export const USER_ROLES = {
  EDUCACROSS: 'EDUCACROSS',
  NETWORK_MANAGER: 'NETWORK_MANAGER',
  DIRECTOR: 'DIRECTOR',
  COORDINATOR: 'COORDINATOR',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT'
}

// Normaliza diferentes formatos de origem (ex.: "escola", "gestor-rede") para os valores padrão
export function normalizeOriginLevel(originValue) {
  if (!originValue) return null

  const value = originValue.toString().trim().toLowerCase()
  const aliasMap = {
    educacross: ORIGIN_LEVELS.EDUCACROSS.value,
    'gestor-rede': ORIGIN_LEVELS.NETWORK.value,
    'gestor_rede': ORIGIN_LEVELS.NETWORK.value,
    rede: ORIGIN_LEVELS.NETWORK.value,
    network: ORIGIN_LEVELS.NETWORK.value,
    'gestor-escolar': ORIGIN_LEVELS.SCHOOL.value,
    'gestor_escolar': ORIGIN_LEVELS.SCHOOL.value,
    escola: ORIGIN_LEVELS.SCHOOL.value,
    school: ORIGIN_LEVELS.SCHOOL.value,
    professor: ORIGIN_LEVELS.TEACHER.value,
    teacher: ORIGIN_LEVELS.TEACHER.value
  }

  if (aliasMap[value]) return aliasMap[value]

  const upper = originValue.toString().trim().toUpperCase()
  if (ORIGIN_LEVELS[upper]) return ORIGIN_LEVELS[upper].value

  return upper
}

// Helper para obter cor de categoria
export function getCategoryColor(categoryValue) {
  return CATEGORIES[categoryValue]?.color || '#B8C2CC'
}

// Helper para obter ícone de origem
export function getOriginIcon(originValue) {
  const normalized = normalizeOriginLevel(originValue)
  return ORIGIN_LEVELS[normalized]?.icon || 'help'
}

// Helper para status visível no calendário
export function isVisibleStatus(statusValue) {
  return ['PUBLISHED', 'SCHEDULED', 'ACTIVE'].includes(statusValue)
}

// Helper para obter dados de status geral do evento
export function getEventStatusData(statusValue) {
  if (!statusValue) return STATUS.ACTIVE

  const normalized = statusValue.toString().toUpperCase()
  return STATUS[normalized] || STATUS.ACTIVE
}

// Helper para obter dados de status de missão (Professor)
export function getMissionStatusData(statusValue) {
  if (!statusValue) return MISSION_STATUS_TEACHER.NOT_SENT

  const normalized = statusValue.toString().toUpperCase()
  return MISSION_STATUS_TEACHER[normalized] || MISSION_STATUS_TEACHER.NOT_SENT
}

// Helper para verificar se um evento é uma atividade educacional (tem controle do professor)
export function isEducationalActivity(event) {
  const educationalCategories = ['MISSIONS', 'TRAILS', 'OLYMPIADS', 'ASSESSMENTS', 'EXPEDITIONS']
  const educationalSourceTypes = ['MODULE_MISSION', 'MODULE_TRAIL', 'MODULE_OLYMPIAD', 'MODULE_ASSESSMENT', 'MODULE_EXPEDITION']

  return (
    educationalCategories.includes(event?.category) ||
    educationalSourceTypes.includes(event?.source_type)
  )
}

// Alias para compatibilidade (missões são atividades educacionais)
export function isMissionEvent(event) {
  return event?.category === 'MISSIONS' || event?.source_type === 'MODULE_MISSION'
}
