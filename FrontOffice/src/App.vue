<script setup>
import { RouterView } from 'vue-router'
import { EToast } from '@/components/base'
</script>

<template>
  <div class="app-root">
    <RouterView />
    <EToast />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
}
</style>
