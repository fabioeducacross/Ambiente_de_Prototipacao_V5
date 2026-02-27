import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

// Lê o branch e o short SHA do git em tempo de build/dev
function gitInfo() {
  const envBranch = process.env.GITHUB_REF_NAME || process.env.VERCEL_GIT_COMMIT_REF || 'unknown'
  const envSha = (process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7)

  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
    const sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
    return {
      branch: branch === 'HEAD' ? envBranch : branch,
      sha: sha || envSha || '0000000'
    }
  } catch {
    return { branch: envBranch, sha: envSha || '0000000' }
  }
}

const { branch, sha } = gitInfo()

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
  define: {
    __GIT_BRANCH__: JSON.stringify(branch),
    __GIT_SHA__: JSON.stringify(sha),    // Versão estável do package.json — não muda com merge de branches
    __APP_VERSION__: JSON.stringify(pkg.version),    // Em build aponta para GitHub Pages; em dev aponta para Docusaurus local
    __WIKI_URL__: command === 'build'
      ? JSON.stringify('https://fabioeducacross.github.io/Ambiente_de_Prototipacao_V5/wiki/')
      : JSON.stringify('http://localhost:3000')
  },
  server: {
    port: 5174,
    open: true
  }
}))
