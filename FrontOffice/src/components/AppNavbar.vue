<template>
  <header class="app-navbar" :class="persona">
    <!-- Coluna esquerda: menu -->
    <div class="navbar-column">
      <span
        class="material-symbols-outlined text-primary navbar-menu-icon"
        @click="$emit('toggle-sidebar')"
      >menu</span>
    </div>

    <!-- Coluna central: logo -->
    <div class="navbar-column d-flex justify-content-center">
      <RouterLink
        to="/"
        class="logo-container"
        :class="{ 'logo-container--locked': isLogoNavigationLocked }"
        :aria-disabled="isLogoNavigationLocked ? 'true' : 'false'"
        :tabindex="isLogoNavigationLocked ? -1 : 0"
        @click="handleLogoClick"
      >
        <img :src="logoUrl" alt="Educacross" class="navbar-logo d-sm-inline d-none" />
        <img :src="logoUrl" alt="Educacross" class="navbar-logo navbar-logo--sm d-sm-none" />
      </RouterLink>
    </div>

    <!-- Coluna direita: ações + usuário -->
    <div class="navbar-column d-flex justify-content-end">
      <ul class="navbar-nav nav align-items-center flex-nowrap gap-2">

        <!-- Botão Visão aluno -->
        <li v-if="showStudentView" class="nav-item">
          <button
            type="button"
            class="btn d-flex align-items-center gap-2 btn-outline-primary rounded-pill navbar-student-btn"
          >
            <span class="material-symbols-outlined text-primary" style="font-size: 14px; vertical-align: middle;">joystick</span>
            <span class="d-xl-inline d-none">Visão aluno</span>
          </button>
        </li>

        <!-- Usuário + Dropdown -->
        <li class="nav-item dropdown dropdown-user" ref="dropdownRef">
          <a
            role="button"
            class="nav-link d-flex align-items-center gap-2 dropdown-user-link"
            href="#"
            @click.prevent="toggleDropdown"
            :aria-expanded="dropdownOpen.toString()"
          >
            <!-- Nome + perfil (xl+) -->
            <div class="d-xl-flex d-none user-nav">
              <p class="user-name mb-0">
                <span class="navbar-profile-name d-inline-block text-truncate">{{ userName }}</span>
                <span class="navbar-permission-name">{{ userRole }}</span>
              </p>
            </div>

            <!-- Avatar -->
            <span class="user-avatar-wrapper">
              <img :src="userAvatar" alt="avatar" class="user-avatar-img" />
            </span>
          </a>

          <!-- Dropdown Menu -->
          <ul class="dropdown-menu dropdown-menu-end navbar-user-dropdown" :class="{ show: dropdownOpen }">
            <!-- Cabeçalho do dropdown -->
            <li class="dropdown-header px-3 pt-2 pb-1">
              <div class="d-flex align-items-center gap-2">
                <span class="user-avatar-wrapper user-avatar-wrapper--sm">
                  <img :src="userAvatar" alt="avatar" class="user-avatar-img" />
                </span>
                <div>
                  <p class="mb-0 navbar-profile-name">{{ userName }}</p>
                  <small class="navbar-permission-name">{{ userRole }}</small>
                </div>
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>

            <!-- Ir para a conta -->
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent>
                <span class="material-symbols-outlined dropdown-icon">account_circle</span>
                Ir para a conta
              </a>
            </li>

            <!-- Notificações -->
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent>
                <span class="material-symbols-outlined dropdown-icon">mail</span>
                Notificações
              </a>
            </li>

            <li><hr class="dropdown-divider" /></li>

            <!-- Idioma -->
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent>
                <span class="dropdown-lang-flag">🇧🇷</span>
                <span>PT</span>
                <span class="material-symbols-outlined ms-auto" style="font-size:18px;">expand_more</span>
              </a>
            </li>

            <li><hr class="dropdown-divider" /></li>

            <!-- Sair -->
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2 text-danger" href="#" @click.prevent>
                <span class="material-symbols-outlined dropdown-icon">logout</span>
                Sair
              </a>
            </li>
          </ul>
        </li>

      </ul>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoUrl from '@/assets/images/MainLogo.svg'
import defaultAvatar from '@/assets/images/avatar-default.png'

defineEmits(['toggle-sidebar'])

const props = defineProps({
  userName:        { type: String,  default: 'Isabela Cross' },
  userRole:        { type: String,  default: 'Professor' },
  userAvatar:      { type: String,  default: () => defaultAvatar },
  showStudentView: { type: Boolean, default: true },
  /** Classe de persona no container (ex: 'Teacher', 'Student') */
  persona:         { type: String,  default: '' },
})

const route = useRoute()
const isLogoNavigationLocked = computed(() => {
  const embedValue = route.query.embed
  const normalized = Array.isArray(embedValue) ? embedValue[0] : embedValue
  return normalized === 'drawer'
})

function handleLogoClick(event) {
  if (!isLogoNavigationLocked.value) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
}

// ── Dropdown ──────────────────────────────────────────────────────────────
const dropdownOpen = ref(false)
const dropdownRef  = ref(null)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function handleOutsideClick(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(()  => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<style scoped>
/* ── Barra principal ───────────────────────────────────────────────── */
.app-navbar {
  height: var(--navbar-height);
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
  box-shadow: var(--ec-card-shadow);
}

/* ── Colunas ───────────────────────────────────────────────────────── */
.navbar-column {
  display: flex;
  align-items: center;
}

.navbar-column:nth-child(1) { flex: 1; }
.navbar-column:nth-child(3) { flex: 1; justify-content: flex-end; }

/* ── Ícone hambúrguer ──────────────────────────────────────────────── */
.navbar-menu-icon {
  font-size: 28px; /* produção: 28px */
  vertical-align: middle;
  cursor: pointer;
}

/* ── Logo ──────────────────────────────────────────────────────────── */
.logo-container {
  text-decoration: none;
  line-height: 0;
}

.logo-container--locked {
  cursor: default;
  pointer-events: none;
}

.navbar-logo     { height: 40px; width: auto; }
.navbar-logo--sm { height: 32px; }

/* ── Lista nav ─────────────────────────────────────────────────────── */
.navbar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* ── Botão Visão aluno ─────────────────────────────────────────────── */
.navbar-student-btn {
  font-size: var(--font-size-sm);
  padding: 0.4rem 0.875rem;
  line-height: 1.5;
}

/* ── Seção do usuário ──────────────────────────────────────────────── */
.dropdown-user-link {
  text-decoration: none;
  color: inherit;
}

.user-nav {
  align-items: flex-end;
  flex-direction: column;
  margin-right: 0.375rem;
}

.user-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.5;
}

.navbar-profile-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--ec-text);
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.navbar-permission-name {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--primary);
}

/* ── Avatar ────────────────────────────────────────────────────────── */
.user-avatar-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background-color: var(--ec-primary-soft);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.user-avatar-wrapper--sm {
  width: 32px;
  height: 32px;
}

.user-avatar-wrapper--sm .user-avatar-img {
  width: 32px;
  height: 32px;
}

.user-avatar-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--radius-full);
}

/* ── Dropdown ──────────────────────────────────────────────────────── */
.navbar-user-dropdown {
  min-width: 220px;
  border: none;
  box-shadow: var(--ec-card-shadow);
  border-radius: var(--radius-md);
  padding: 0.5rem 0;
  top: calc(100% + 4px);
  right: 0;
}

.dropdown-icon {
  font-size: 18px;
  color: var(--ec-body);
  vertical-align: middle;
}

.dropdown-item {
  font-size: var(--font-size-sm);
  color: var(--ec-text);
  padding: 0.5rem 1rem;
  transition: background var(--transition-fast);
}

.dropdown-item:hover {
  background-color: var(--ec-primary-soft);
  color: var(--primary);
}

.dropdown-item:hover .dropdown-icon,
.dropdown-item:hover .material-symbols-outlined {
  color: var(--primary);
}

.dropdown-item.text-danger:hover {
  background-color: rgba(234, 84, 85, 0.1);
  color: var(--danger) !important;
}

.dropdown-item.text-danger:hover .dropdown-icon {
  color: var(--danger) !important;
}

.dropdown-lang-flag {
  font-size: 18px;
  line-height: 1;
}

.dropdown-divider {
  margin: 0.25rem 0;
  border-color: var(--ec-border);
}

.dropdown-header {
  background: var(--ec-primary-soft);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
</style>


