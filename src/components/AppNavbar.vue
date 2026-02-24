<template>
  <header class="app-navbar">
    <!-- Coluna esquerda: menu -->
    <div class="navbar-column">
      <span
        class="material-symbols-outlined text-primary cursor-pointer"
        style="vertical-align: middle;"
        @click="$emit('toggle-sidebar')"
      >menu</span>
    </div>

    <!-- Coluna central: logo -->
    <div class="navbar-column d-flex justify-content-center">
      <RouterLink to="/" class="logo-container">
        <img :src="logoUrl" alt="logo" class="d-sm-inline d-none" />
        <img :src="logoUrlSmall" alt="logo" class="d-sm-none" />
      </RouterLink>
    </div>

    <!-- Coluna direita: ações + usuário -->
    <div class="navbar-column d-flex justify-content-end">
      <ul class="navbar-nav nav align-items-center flex-nowrap gap-2">

        <!-- Botão Visão aluno -->
        <button
          type="button"
          class="btn d-flex align-items-center gap-2 btn-outline-primary rounded-pill"
        >
          <span class="material-symbols-outlined text-primary" style="font-size: 14px; vertical-align: middle;">joystick</span>
          <span class="d-xl-inline d-none">Visão aluno</span>
        </button>

        <!-- Usuário -->
        <li class="nav-item dropdown dropdown-user">
          <a
            role="button"
            class="nav-link d-flex align-items-center gap-2 dropdown-user-link"
            href="#"
            @click.prevent
          >
            <!-- Nome + perfil (oculto em telas pequenas) -->
            <div class="d-xl-flex d-none user-nav">
              <p class="user-name d-flex flex-column justify-content-center align-items-end mb-0" style="line-height: 1.5rem;">
                <span class="profileName d-inline-block text-truncate" style="font-weight: 500;">Isabela Cross</span>
                <span class="permissionUser" style="font-weight: bold;">Professor</span>
              </p>
            </div>

            <!-- Avatar -->
            <span class="user-avatar-wrapper rounded-circle">
              <img :src="avatarUrl" alt="avatar" class="user-avatar-img" />
            </span>
          </a>
        </li>

      </ul>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import logoUrl from '../assets/images/MainLogo.svg'
import avatarUrl from '../assets/images/avatar-default.png'
const logoUrlSmall = logoUrl

defineEmits(['toggle-sidebar'])
</script>

<style scoped>
.app-navbar {
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 110;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}

.navbar-column {
  display: flex;
  align-items: center;
}

.navbar-column:nth-child(1) {
  flex: 1;
}

.navbar-column:nth-child(3) {
  flex: 1;
  justify-content: flex-end;
}

.cursor-pointer {
  cursor: pointer;
}

.logo-container {
  text-decoration: none;
}

.logo-container img {
  height: 34px;
  width: auto;
}

.navbar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dropdown-user-link {
  text-decoration: none;
  color: inherit;
}

.user-nav {
  align-items: center;
  margin-right: 0.5rem;
}

.profileName {
  font-size: 0.875rem;
  color: #5e5873;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.permissionUser {
  font-size: 0.75rem;
  color: var(--primary);
}

.user-avatar-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background-color: #eeedfd;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-avatar-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
