import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        __WIKI_URL__: JSON.stringify('http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/'),
        __GIT_BRANCH__: JSON.stringify('test'),
        __GIT_SHA__: JSON.stringify('0000000'),
        __APP_VERSION__: JSON.stringify('test')
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include: [
            'tests/**/*.spec.ts',
            'src/**/__tests__/**/*.spec.ts'
        ]
    }
})
