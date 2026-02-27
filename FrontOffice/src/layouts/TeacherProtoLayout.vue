<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/shared/components/Sidebar.vue'

// ─── Sidebar ───────────────────────────────────────────────────────────────
const sidebarOpen = ref(true)
const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value }
</script>

<template>
  <div class="proto-wrapper">
  <AppNavbar @toggle-sidebar="toggleSidebar" />
  <div class="proto-layout" :class="{ 'sidebar-collapsed': !sidebarOpen }">

    <!-- ═══ SIDEBAR ══════════════════════════════════════════════════════════ -->
    <Sidebar :collapsed="!sidebarOpen" />

    <!-- ═══ MAIN AREA ═════════════════════════════════════════════════════════ -->
    <div class="proto-main">
      <!-- Page content -->
      <main class="proto-content">
        <RouterView />
      </main>
    </div>

  </div>
  </div>
</template>

<style scoped>
/* ── Wrapper externo ────────────────────────────────────── */
.proto-wrapper {
  min-height: 100vh;
  background: #f8f7fa;
}

/* ── Layout base ─────────────────────────────────────────── */
.proto-layout {
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background: #f8f7fa;
}

/* ── Main area ───────────────────────────────────────────── */
.proto-main {
  margin-left: 240px;
  transition: margin-left .3s ease;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
}

.sidebar-collapsed .proto-main {
  margin-left: 70px;
}

.proto-content {
  padding: 1.5rem;
  flex: 1;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .proto-main { margin-left: 70px; }
}
</style>
