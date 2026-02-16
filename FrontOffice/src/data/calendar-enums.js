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
    icon: 'hub',
    color: '#00CFE8'
  },
  SCHOOL: {
    value: 'SCHOOL',
    label: 'Gestor Escolar',
    icon: 'school',
    color: '#28C76F'
  },
  TEACHER: {
    value: 'TEACHER',
    label: 'Professor',
    icon: 'person',
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

// Helper para obter cor de categoria
export function getCategoryColor(categoryValue) {
  return CATEGORIES[categoryValue]?.color || '#B8C2CC'
}

// Helper para obter ícone de origem
export function getOriginIcon(originValue) {
  return ORIGIN_LEVELS[originValue]?.icon || 'help'
}

// Helper para status visível no calendário
export function isVisibleStatus(statusValue) {
  return ['PUBLISHED', 'SCHEDULED', 'ACTIVE'].includes(statusValue)
}
