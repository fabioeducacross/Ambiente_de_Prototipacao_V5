/**
 * Composable para gerenciar feature flags do sistema
 * @module useFeatureFlags
 */

import { ref, readonly, computed } from 'vue'

// Estado global de feature flags
const featureFlags = ref({
    // Calendário - Eventos
    showEventTime: false, // Exibição de horário nos eventos (feature em desenvolvimento) - FORÇADO COMO FALSE

    // Outras flags podem ser adicionadas aqui
    // exemplo: enableNotifications: true,
})

// FORÇA o reset da flag ao carregar (ignora cache)
if (typeof window !== 'undefined') {
    featureFlags.value.showEventTime = false
}

/**
 * Hook para acessar e gerenciar feature flags
 * @returns {Object} Objeto com flags e métodos de controle
 */
export function useFeatureFlags() {
    /**
     * Verifica se uma feature flag está habilitada
     * @param {string} flagName - Nome da flag
     * @returns {boolean} Status da flag
     */
    const isEnabled = (flagName) => {
        return featureFlags.value[flagName] ?? false
    }

    /**
     * Habilita uma feature flag
     * @param {string} flagName - Nome da flag
     */
    const enableFeature = (flagName) => {
        if (flagName in featureFlags.value) {
            featureFlags.value[flagName] = true
        } else {
            console.warn(`Feature flag '${flagName}' não existe`)
        }
    }

    /**
     * Desabilita uma feature flag
     * @param {string} flagName - Nome da flag
     */
    const disableFeature = (flagName) => {
        if (flagName in featureFlags.value) {
            featureFlags.value[flagName] = false
        } else {
            console.warn(`Feature flag '${flagName}' não existe`)
        }
    }

    /**
     * Alterna o estado de uma feature flag
     * @param {string} flagName - Nome da flag
     */
    const toggleFeature = (flagName) => {
        if (flagName in featureFlags.value) {
            featureFlags.value[flagName] = !featureFlags.value[flagName]
        } else {
            console.warn(`Feature flag '${flagName}' não existe`)
        }
    }

    /**
     * Retorna todas as flags (somente leitura)
     */
    const getAllFlags = () => {
        return readonly(featureFlags)
    }

    return {
        isEnabled,
        enableFeature,
        disableFeature,
        toggleFeature,
        getAllFlags,
        // Atalhos reativos para flags específicas
        showEventTime: computed(() => featureFlags.value.showEventTime),
    }
}
