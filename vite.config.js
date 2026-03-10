import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./FrontOffice/package.json', import.meta.url), 'utf8'))
const wikiBaseUrl = 'http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/'
const wikiProductionUrl = 'https://fabioeducacross.github.io/Ambiente_de_Prototipacao_V5/wiki/'

function gitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
    const sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
    return { branch, sha }
  } catch {
    return { branch: 'unknown', sha: '0000000' }
  }
}

const { branch, sha } = gitInfo()

export default defineConfig(({ command }) => ({
  root: './FrontOffice',
  base: command === 'build' ? '/Ambiente_de_Prototipacao_V5/' : '/',
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
  define: {
    __GIT_BRANCH__: JSON.stringify(branch),
    __GIT_SHA__: JSON.stringify(sha),
    __APP_VERSION__: JSON.stringify(pkg.version),
    __WIKI_URL__: command === 'build'
      ? JSON.stringify(wikiProductionUrl)
      : JSON.stringify(wikiBaseUrl)
  },
  server: {
    port: 5174,
    open: true
  },
}))
