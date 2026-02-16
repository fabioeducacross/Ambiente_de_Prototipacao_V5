/**
 * Composable para gerenciar permissões do calendário
 * Baseado em SPEC-CALENDARIO-PROTOTIPO.md - Seção 9
 */

import { computed } from 'vue'
import { useCurrentUser } from './useCurrentUser'
import { USER_ROLES, ORIGIN_LEVELS } from '@/data/calendar-enums'

export function useCalendarPermissions() {
  const { currentUser } = useCurrentUser()

  // Permissão para criar eventos manuais
  const canCreateEvent = computed(() => {
    return [
      USER_ROLES.EDUCACROSS,
      USER_ROLES.NETWORK_MANAGER,
      USER_ROLES.DIRECTOR,
      USER_ROLES.COORDINATOR,
      USER_ROLES.TEACHER
    ].includes(currentUser.value.role)
  })

  // Permissão para criar atividades em módulos
  const canCreateModuleActivity = computed(() => {
    return [
      USER_ROLES.EDUCACROSS,
      USER_ROLES.NETWORK_MANAGER,
      USER_ROLES.DIRECTOR,
      USER_ROLES.TEACHER
    ].includes(currentUser.value.role)
  })

  // Permissão para editar evento manual
  const canEditEvent = (event) => {
    if (!event) return false

    // Só edita eventos manuais
    if (event.source_type !== 'CALENDAR_MANUAL') return false

    // Regra: mesmo origin_level ou superior
    const hierarchy = [
      ORIGIN_LEVELS.EDUCACROSS.value,
      ORIGIN_LEVELS.NETWORK.value,
      ORIGIN_LEVELS.SCHOOL.value,
      ORIGIN_LEVELS.TEACHER.value
    ]

    const userLevel = currentUser.value.origin_level
    const eventLevel = event.origin_level

    const userIndex = hierarchy.indexOf(userLevel)
    const eventIndex = hierarchy.indexOf(eventLevel)

    return userIndex <= eventIndex
  }

  // Permissão para cancelar evento
  const canCancelEvent = (event) => {
    if (!event) return false
    if (event.status === 'CANCELED') return false

    return canEditEvent(event)
  }

  // Permissão para duplicar evento
  const canDuplicateEvent = computed(() => {
    return canCreateEvent.value
  })

  // Permissão para visualizar evento (sempre true exceto rascunhos de outros)  
  const canViewEvent = (event) => {
    if (!event) return false

    // Rascunhos só são visíveis para o criador
    if (event.status === 'DRAFT') {
      return event.created_by === currentUser.value.name
    }

    return true
  }

  // Permissão para editar atividade de módulo (redireciona ao módulo)
  const canEditModuleActivity = (event) => {
    if (!event) return false
    if (event.source_type === 'CALENDAR_MANUAL') return false

    // Verifica se tem permissão no módulo de origem
    const hierarchy = [
      ORIGIN_LEVELS.EDUCACROSS.value,
      ORIGIN_LEVELS.NETWORK.value,
      ORIGIN_LEVELS.SCHOOL.value,
      ORIGIN_LEVELS.TEACHER.value
    ]

    const userLevel = currentUser.value.origin_level
    const eventLevel = event.origin_level

    const userIndex = hierarchy.indexOf(userLevel)
    const eventIndex = hierarchy.indexOf(eventLevel)

    return userIndex <= eventIndex
  }

  // Texto do botão de ação principal
  const getPrimaryActionLabel = (event) => {
    if (!event) return ''

    if (event.source_type === 'CALENDAR_MANUAL') {
      return canEditEvent(event) ? 'Editar Evento' : 'Ver Detalhes'
    }

    return 'Abrir no Módulo'
  }

  // Ações disponíveis no menu do evento
  const getAvailableActions = (event) => {
    const actions = []

    if (event.source_type === 'CALENDAR_MANUAL') {
      if (canEditEvent(event)) {
        actions.push({ id: 'edit', label: 'Editar', icon: 'edit' })
      }
      if (canDuplicateEvent.value) {
        actions.push({ id: 'duplicate', label: 'Duplicar', icon: 'content_copy' })
      }
      if (canCancelEvent(event)) {
        actions.push({ id: 'cancel', label: 'Cancelar', icon: 'cancel', danger: true })
      }
    } else {
      if (canEditModuleActivity(event)) {
        actions.push({ id: 'open_module', label: 'Abrir no Módulo', icon: 'open_in_new' })
      }
    }

    return actions
  }

  return {
    canCreateEvent,
    canCreateModuleActivity,
    canEditEvent,
    canCancelEvent,
    canDuplicateEvent,
    canViewEvent,
    canEditModuleActivity,
    getPrimaryActionLabel,
    getAvailableActions
  }
}
