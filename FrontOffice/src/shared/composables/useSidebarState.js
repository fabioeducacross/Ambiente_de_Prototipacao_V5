import { ref, computed } from 'vue'

// Estado compartilhado entre componentes
// Inicia colapsado em mobile (<1024px), expandido em desktop
const sidebarCollapsed = ref(window.innerWidth < 1024)

export function useSidebarState() {
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const initSidebar = () => {
    const handleResize = () => {
      // Auto-expande sidebar em desktop (≥1024px)
      if (window.innerWidth >= 1024) {
        sidebarCollapsed.value = false
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    // Retorna função de cleanup
    return () => window.removeEventListener('resize', handleResize)
  }

  return {
    // Computed readonly para evitar mutação externa direta
    sidebarCollapsed: computed(() => sidebarCollapsed.value),
    toggleSidebar,
    initSidebar
  }
}
