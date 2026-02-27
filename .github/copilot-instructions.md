# Copilot Instructions - Ambiente de Prototipação V5

> **⚠️ IMPORTANTE - Pasta de Referência**  
> A pasta `educacross-frontoffice` (produção) é **SOMENTE PARA CONSULTA**. **NÃO PROGRAMAR NADA NESSA PASTA**. Todo o desenvolvimento ocorre em `Ambiente_de_Prototipacao_V5/FrontOffice/`.

> **⚠️ `src/` É LEGADO** — A pasta `src/` na raiz é o protótipo antigo (3 rotas simples). O desenvolvimento ativo é em `FrontOffice/`. Não adicionar código em `src/`.

## Arquitetura

**3 sub-projetos integrados** neste workspace:

| Sub-projeto | Diretório | Porta | Propósito |
|---|---|---|---|
| FrontOffice (ativo) | `FrontOffice/` | **5174** | Protótipos interativos por persona |
| Docusaurus (wiki) | `documentation/` | **3000** | Design System + jornadas documentadas |
| Legacy Vue (inativo) | `src/` | 5173 | Protótipo inicial — não usar |

> **Iniciar todos de uma vez:** `npm run dev:all` na raiz — mata processos nas portas automaticamente via `predev:all` e sobe os 3 servidores com `concurrently`.

### FrontOffice — Estrutura Principal

```
FrontOffice/src/
├── views/
│   ├── Home.vue               # Seletor de personas (master-detail inline)
│   ├── About.vue              # Página editorial sobre o ambiente
│   ├── teacher/               # Jornadas → /teacher, /teacher/calendar, etc.
│   ├── student/               # → /student
│   ├── coordinator/           # → /coordinator
│   ├── director/              # → /director
│   ├── administrator/         # → /administrator
│   └── network-manager/       # → /network-manager
├── modules/                   # Features auto-contidas (próprias views + data)
│   ├── calendario/            # Módulo Calendário
│   └── sistema-de-ensino/     # Módulo Trilhas A-Z → /teacher/trilhas-az
├── components/                # Componentes reutilizáveis dentro do FrontOffice
│   ├── Sidebar.vue            # Sidebar global (personas + navegação)
│   ├── AppNavbar.vue          # Topbar com breadcrumb e git info
│   ├── calendar/              # Componentes do calendário
│   └── atoms/ molecules/ organisms/ templates/  # Atomic design
└── shared/                    # Composables e componentes cross-módulo
```

### Roteamento por Persona

Cada persona tem um `Dashboard.vue` raiz + sub-rotas de feature. Rotas usam `meta.persona` para nav ativa e `meta.breadcrumb` para a topbar. Todos os imports de view são **lazy** (`() => import(...)`).

### Variáveis Globais de Build (Vite `define`)

Disponíveis em qualquer componente — sem `import`:

```javascript
__GIT_BRANCH__    // branch atual (ex: "main")
__GIT_SHA__       // short SHA do commit (ex: "80a691b")
__APP_VERSION__   // versão do FrontOffice/package.json
__WIKI_URL__      // dev → "http://localhost:3000" | build → GitHub Pages Docusaurus
```

Usados em `AppNavbar.vue` para exibir badge de versão e link para wiki.

## Tecnologias do FrontOffice

- **Vue 3** Composition API (`<script setup>`)
- **Bootstrap 5.3** + **Bootstrap Icons 1.13** (instalados via npm, não CDN)
- **bootstrap-vue-next 0.43** para componentes Bootstrap reativos
- **flatpickr** / **vue-flatpickr-component** para date pickers
- **@vuepic/vue-datepicker** alternativa de datepicker
- Design System via CSS variables em `FrontOffice/src/style.css`

## Paleta de Cores Vuexy (CSS vars em `FrontOffice/src/style.css`)

- `--primary: #7367F0` · `--success: #28C76F` · `--warning: #FF9F43`
- `--danger: #EA5455` · `--info: #00CFE8`

## Convenções de Componente

```vue
<script setup>
// Composition API — sempre <script setup>
import { ref, computed } from 'vue'
</script>
<template><!-- ... --></template>
<style scoped>/* sempre scoped */</style>
```

Ícones: classes `bi bi-*` do Bootstrap Icons (não CDN, importado em `main.js`).  
Ícones Material Symbols: use o componente `<MaterialIcon name="..." />` (`FrontOffice/src/components/MaterialIcon.vue`).

## Comandos de Desenvolvimento

### Todos os servidores de uma vez (recomendado)
```bash
# Na raiz — mata portas 5173/5174/3000 automaticamente e sobe os 3
npm run dev:all
```
- `[ROOT]` → `http://localhost:5173` (Vite raiz, serve FrontOffice via `root: './FrontOffice'`)
- `[FO]`   → `http://localhost:5174` (FrontOffice via `FrontOffice/package.json`)
- `[DOCS]` → `http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/`

O script `predev:all` executa automaticamente antes: `Get-NetTCPConnection | Stop-Process` nas portas 5173, 5174 e 3000, evitando conflitos de porta mesmo que servidores antigos estejam rodando.

Se o `dev:all` cair, basta rodar `npm run dev:all` novamente — ele limpa e reinicia tudo.

### Servidores individuais
```bash
npm run dev          # ROOT Vite na porta 5173
npm run dev:fo       # FrontOffice na porta 5174
npm run dev:docs     # Docusaurus wiki na porta 3000
```

### FrontOffice (desenvolvimento ativo)
```bash
# Pela RAIZ do workspace (usa root vite.config.js → root: './FrontOffice', porta 5174)
npm run dev      # Inicia dev server Vue (http://localhost:5174)
npm run build    # Build de produção
npm run preview  # Preview do build

# Ou diretamente dentro de FrontOffice/ (mesmo resultado)
cd FrontOffice && npm run dev
```

### Documentação Docusaurus
```bash
npm start                      # Inicia Docusaurus (http://localhost:3000) - na raiz
npm start --prefix documentation  # Ou dentro de documentation/
cd documentation && npm run build # Build documentação
```

### Captura de Screenshots (wiki)
```bash
# Captura os 87 screenshots do FrontOffice e salva em documentation/static/img/screenshots/
# Requer FrontOffice rodando em http://localhost:5174
node mcp-playwright/capture-screenshots.mjs
```
O script usa Playwright (headless Chromium, 1440×900) e mapeia cada screenshot às rotas do FrontOffice. Para re-capturar após mudanças no FrontOffice, basta rodar novamente.

## Guidelines para Novas Features

1. **Sem Backend**: Não adicionar chamadas API — usar apenas JSON local ou dados mockados no componente
2. **Scoped Styles**: Sempre usar `<style scoped>` nos componentes
3. **Bootstrap Icons**: Usar classes `bi bi-*` para ícones (importado via npm em `main.js`, não CDN)
4. **Responsividade**: Usar classes `.col-md-*` e media queries em `@media (max-width: 768px)`
5. **Card Pattern**: Seguir estrutura `.card > .card-header/.card-body/.card-footer` com hover effects
6. **Gradientes**: Hero sections usam `linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)`

## Workflow Git (Protótipos)

**Branch Strategy** (ver `PROTOTYPES-WORKFLOW.md` para detalhes):
- `prototypes/as-is` - Baseline que replica produção (nunca desenvolver aqui)
- `prototypes/feature/*` - Branches para protótipos TO-BE (ex: `prototypes/feature/education-system-v2`)

**Fluxo típico**:
1. Partir de `prototypes/as-is` para criar feature branch
2. Desenvolver protótipo com commits frequentes
3. Deploy automático gera preview URL
4. Após aprovação: migrar para `educacross-frontoffice` (produção)
5. Atualizar `prototypes/as-is` com tag (ex: `as-is-v1.1`)
6. Deletar feature branch

## Skills Locais

| Skill | Arquivo | Quando usar |
|-------|---------|-------------|
| `educacross-design-system` | `.agents/skills/educacross-design-system/SKILL.md` | **SEMPRE** ao construir ou revisar telas, componentes, protótipos ou qualquer UI do Educacross. Contém: paleta de cores completa (tokens SCSS), tipografia, ícones (Material Symbols), componentes (`ESelect`, `ListTable`, `MediaCard`, `EFormCheck`, gráficos), padrões de layout, roles e assets. |
| `web-design-guidelines` | `.agents/skills/web-design-guidelines/SKILL.md` | Ao revisar UI para conformidade com boas práticas web |

## Servidores MCP Locais

| Servidor | Tipo | Descrição | Ferramentas |
|----------|------|-----------|-------------|
| `figma` | HTTP | Integração com Figma (design, diagramas) | `get_design_context`, `generate_diagram` |
| `design-system` | stdio | Lookup on-demand de componentes do `educacross-frontoffice` | `list_components`, `get_component`, `search_component`, `get_consts`, `get_scss` |

> Para consultar componentes secundários não cobertos pela SKILL, use as ferramentas do servidor `design-system`. Ver seção 11 da SKILL `educacross-design-system` para o fluxo detalhado.

## Referências

- Design System completo: https://fabioeducacross.github.io/DesignSystem-Vuexy/
- Design System local (SOMENTE LEITURA): `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice\`
- Organização: https://educacross.com.br/
- Status do projeto: `PROJECT_STATUS.md`
- Workflow completo: `PROTOTYPES-WORKFLOW.md`
