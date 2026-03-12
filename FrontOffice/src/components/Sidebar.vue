<template>
  <SharedSidebar :collapsed="collapsed" :theme="theme" navigation-mode="legacyTeacher" />
</template>

<script setup>
import SharedSidebar from '@/shared/components/Sidebar.vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'teacher',
  },
})
</script>
