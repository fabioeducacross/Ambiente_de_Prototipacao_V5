import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  root: './FrontOffice',
  base: '/Ambiente_de_Prototipacao_V5/',
  plugins: [vue()],
  css: {
    postcss: {
      plugins: []
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./FrontOffice/src', import.meta.url))
    }
  },
  server: {
    port: 5174,
    open: true
  },
})
