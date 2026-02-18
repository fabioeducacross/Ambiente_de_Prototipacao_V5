import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Ambiente_de_Prototipacao_V5/' : '/',
  plugins: [vue()],
  css: {
    postcss: {
      plugins: []  // Desabilita todos os plugins PostCSS padrão incluindo postcss-import
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174,
    open: true
  }
}))
