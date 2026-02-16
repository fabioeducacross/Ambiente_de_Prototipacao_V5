/**
 * Composable para gerenciar o usuário atual (mock)
 * Simula contexto de autenticação para permissões
 */

import { ref, computed } from 'vue'
import { USER_ROLES, ORIGIN_LEVELS } from '@/data/calendar-enums'

const currentUser = ref({
  id: 'user-001',
  name: 'Prof. Maria Silva',
  role: USER_ROLES.TEACHER,
  origin_level: ORIGIN_LEVELS.TEACHER.value,
  scopes: [
    { level: 'CLASS', id: 'class-5a', name: '5º Ano A' },
    { level: 'CLASS', id: 'class-5b', name: '5º Ano B' }
  ],
  school: {
    id: 'school-001',
    name: 'Escola Municipal Dom Pedro II'
  },
  network: {
    id: 'network-sp-001',
    name: 'Rede Municipal São Paulo'
  }
})

export function useCurrentUser() {
  const setMockUser = (userData) => {
    currentUser.value = { ...currentUser.value, ...userData }
  }

  const selectedScope = ref(currentUser.value.scopes[0])

  const setSelectedScope = (scope) => {
    selectedScope.value = scope
  }

  const selectedScopeLabel = computed(() => {
    return selectedScope.value?.name || 'Selecione um contexto'
  })

  return {
    currentUser,
    selectedScope,
    selectedScopeLabel,
    setMockUser,
    setSelectedScope
  }
}
