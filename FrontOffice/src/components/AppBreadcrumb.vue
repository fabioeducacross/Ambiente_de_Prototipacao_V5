<script setup>
/**
 * AppBreadcrumb.vue — Protótipo
 *
 * Porta direta de src/layouts/components/AppBreadcrumb.vue (produção)
 * Lê route.meta.breadcrumb no formato array [{text, to?, active}]
 * ou string legada (normalizada automaticamente).
 *
 * HTML resultante idêntico à produção:
 *   <ol class="breadcrumb pl-0">
 *     <li class="breadcrumb-item"><a href="/"><i feather-home /></a></li>
 *     <li class="breadcrumb-item active"><span aria-current="location">Label</span></li>
 *   </ol>
 */
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const items = computed(() => {
  const raw = route.meta?.breadcrumb ?? null
  if (!raw) return []
  const normalized = Array.isArray(raw) ? [...raw] : [{ text: raw, active: true }]
  const hasActive = normalized.some(item => item?.active)
  if (!hasActive) return normalized

  const inactiveItems = normalized.filter(item => !item?.active)
  const activeItems = normalized.filter(item => item?.active)
  return [...inactiveItems, ...activeItems]
})

const show = computed(() => items.value.length > 0)
</script>

<template>
  <ol v-if="show" class="breadcrumb pl-0 mb-0">
    <!-- Home icon — feather-home equivalente (Bootstrap Icons) -->
    <li class="breadcrumb-item">
      <RouterLink to="/" class="breadcrumb-home" aria-label="Início">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="align-text-top feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </RouterLink>
    </li>

    <!-- Itens dinâmicos -->
    <li
      v-for="item in items"
      :key="item.text"
      class="breadcrumb-item"
      :class="{ active: item.active }"
    >
      <RouterLink v-if="!item.active && item.to" :to="item.to" class="breadcrumb-link">
        {{ item.text }}
      </RouterLink>
      <span v-else :aria-current="item.active ? 'location' : undefined">{{ item.text }}</span>
    </li>
  </ol>
</template>

<style scoped>
.breadcrumb {
  font-size: .875rem;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
.breadcrumb-item + .breadcrumb-item::before {
  color: #b9b9c3;
}
.breadcrumb-home {
  color: #6e6b7b;
  text-decoration: none;
}
.breadcrumb-home:hover { color: #7367f0; }
.breadcrumb-link {
  color: #6e6b7b;
  text-decoration: none;
}
.breadcrumb-link:hover { color: #7367f0; }
.breadcrumb-item.active {
  color: #7367f0;
  font-weight: 600;
}
.feather-home {
  display: inline-block;
  vertical-align: text-top;
}
</style>
