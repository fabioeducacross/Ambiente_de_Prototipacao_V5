import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/Ambiente_de_Prototipacao_V5/',
  plugins: [vue()],
  server: {
    port: 5174,
  },
})
