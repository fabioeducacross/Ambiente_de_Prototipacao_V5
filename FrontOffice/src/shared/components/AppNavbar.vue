<template>
  <header class="app-navbar">
    <div class="nav-left">
      <button class="menu-btn" aria-label="Abrir menu" @click="$emit('toggle-sidebar')">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>

    <div class="nav-center">
      <RouterLink to="/" class="brand">
        <img src="https://fabioeducacross.github.io/educacross-assets/logo-educacross.svg" alt="Educacross" class="logo" />
      </RouterLink>
    </div>

    <div class="nav-right">
      <button class="student-view" aria-label="Visão aluno">
        <MaterialIcon name="person" :size="18" />
        <span>Visão aluno</span>
      </button>

      <div class="user">
        <div class="user-name">Isabela Cross</div>
        <div class="user-role">Professor</div>
        <div class="user-avatar">
          <img src="https://fabioeducacross.github.io/educacross-assets/avatar-owl.png" alt="Avatar" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MaterialIcon from './MaterialIcon.vue'

defineEmits(['toggle-sidebar'])
</script>

<style scoped>
.app-navbar {
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  gap: 1rem;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 110;
}

.nav-left, .nav-center, .nav-right {
  display: flex;
  align-items: center;
}

.nav-center {
  flex: 1;
  justify-content: center;
}

.menu-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #7367F0;
}

.brand .logo {
  height: 34px;
  width: auto;
}

.nav-right {
  gap: 12px;
}

.student-view {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 24px;
  border: 1px solid #7367F0;
  background: transparent;
  color: #7367F0;
  cursor: pointer;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-weight: 600;
  color: #222;
}

.user-role {
  font-size: 12px;
  color: #666;
}

.user-avatar img {
  height: 36px;
  width: 36px;
  border-radius: 50%;
}

</style>
