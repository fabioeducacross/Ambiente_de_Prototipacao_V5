<script setup>
import { RouterView } from 'vue-router'
import { EToast } from '@/components/base'
</script>

<template>
  <div id="app">
    <RouterView />
    <EToast />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
