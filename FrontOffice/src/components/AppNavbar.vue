<template>
  <SharedAppNavbar
    v-bind="$props"
    @toggle-sidebar="$emit('toggle-sidebar')"
  />
</template>

<script setup>
import SharedAppNavbar from '@/shared/components/AppNavbar.vue'
import defaultAvatar from '@/assets/images/avatar-default.png'

defineProps({
  userName: { type: String, default: '' },
  userRole: { type: String, default: '' },
  userAvatar: { type: String, default: () => defaultAvatar },
  showStudentView: { type: Boolean, default: true },
  persona: { type: String, default: '' },
})

defineEmits(['toggle-sidebar'])
</script>


