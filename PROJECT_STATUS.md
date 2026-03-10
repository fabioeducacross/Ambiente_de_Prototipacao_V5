# Status do Ambiente de Prototipacao V5

**Data**: 10/03/2026  
**Status Geral**: ✅ **OPERACIONAL E ALINHADO COM A ARQUITETURA ATUAL**

---

## Visao Geral

O **Ambiente de Prototipacao V5** funciona hoje como um workspace com **4 superfícies complementares**:

### 1. FrontOffice (desenvolvimento ativo)
- **Localizacao**: `FrontOffice/`
- **Framework**: Vue 3 + Vite + Vue Router
- **Porta principal**: `5174`
- **Proposito**: prototipos interativos por persona, modulos reutilizaveis e jornadas TO-BE
- **Status**: ✅ ativo

### 2. Wiki Docusaurus
- **Localizacao**: `documentation/`
- **Framework**: Docusaurus 3 + TypeScript
- **Porta local**: `3000`
- **Proposito**: documentacao de jornadas, design system, snapshots e fluxos
- **Status**: ✅ ativo

### 3. Design System / Storybook
- **Localizacao**: `design-system/`
- **Framework**: Storybook 8 + Vue 3 + Vite
- **Porta local**: `6006`
- **Proposito**: catalogo canônico de componentes, tokens e stories do design system
- **Status**: ✅ ativo (build validado com `npm run build:ds`)

### 4. App legado da raiz
- **Localizacao**: `src/`
- **Framework**: Vue 3 + Vite (estrutura inicial)
- **Proposito**: referencia historica do primeiro prototipo
- **Status**: ⚠️ legado / nao usar para novas implementacoes

---

## Estado Atual

### FrontOffice

| Item | Status | Detalhes |
|------|--------|----------|
| Vue 3 + `<script setup>` | ✅ | Base ativa do produto de prototipacao |
| Router por persona | ✅ | Home, dashboards e rotas de Professor, Aluno, Administrador, Coordenador, Diretor e Gestor de Rede |
| Modulos dedicados | ✅ | `calendario` e `sistema-de-ensino` em `FrontOffice/src/modules/` |
| Componentes compartilhados | ✅ | `components/` e `shared/` centralizam elementos reutilizaveis |
| Dados mockados | ✅ | Arquivos em `FrontOffice/src/data/` |
| Build local | ✅ | `npm run build` na raiz usa `vite.config.js` com `root: './FrontOffice'` |

### Wiki / Documentacao

| Item | Status | Detalhes |
|------|--------|----------|
| Docusaurus | ✅ | Wiki local em `documentation/` |
| Capturas e referencias | ✅ | Screenshots e artefatos em `documentation/static/` e `validation/` |
| Publicacao | ✅ | Base preparada para GitHub Pages |
| Qualidade pendente | ⚠️ | Ainda existem warnings de ancoras quebradas para iteracao futura |

### Design System / Storybook

| Item | Status | Detalhes |
|------|--------|----------|
| Configuracao Storybook | ✅ | Scripts raiz `dev:ds` e `build:ds` apontam para `design-system/` |
| Bootstrap local | ✅ | Dependencias instaladas via `npm ci --prefix design-system` |
| Build estatico | ✅ | `npm run build:ds` validado neste workspace |
| Uso operacional | ✅ | Servico local em `http://localhost:6006` quando iniciado |

### Legado

| Item | Status | Detalhes |
|------|--------|----------|
| `src/` da raiz | ⚠️ | Mantido apenas para consulta historica |
| Novas features | ❌ | Nao devem ser implementadas fora de `FrontOffice/` |

---

## Estrutura Atual do Workspace

```text
Ambiente_de_Prototipacao_V5/
├── FrontOffice/                 # Aplicacao ativa
│   ├── src/
│   │   ├── views/               # Home, About e telas por persona
│   │   ├── modules/             # calendario, sistema-de-ensino
│   │   ├── components/          # Componentes reutilizaveis do FrontOffice
│   │   ├── shared/              # Recursos compartilhados entre modulos
│   │   ├── data/                # Dados mockados e fixtures
│   │   └── router/              # Mapa de rotas ativo
│   └── package.json
├── documentation/               # Wiki Docusaurus
├── design-system/               # Storybook / DS local
│   ├── .storybook/
│   ├── stories/
│   ├── registry/
│   └── tokens/
├── public/                      # Assets publicos compartilhados
├── src/                         # Legado (nao usar para novas implementacoes)
├── package.json                 # Scripts raiz (`dev`, `dev:all`, `dev:docs`)
└── vite.config.js               # Root Vite apontando para `FrontOffice/`
```

---

## Como Rodar Hoje

### Todos os servidores

```bash
npm run dev:all
```

Subira:
- `http://localhost:5173` - instancia raiz usada no orquestrador
- `http://localhost:5174` - FrontOffice
- `http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/` - wiki Docusaurus

### Servidores individuais

```bash
npm run dev       # FrontOffice via vite.config.js da raiz (porta 5174)
npm run dev:fo    # FrontOffice diretamente (porta 5174)
npm run dev:docs  # Wiki Docusaurus (porta 3000)
```

### Storybook

```bash
npm run setup:ds  # Primeira instalacao do subprojeto design-system
npm run dev:ds    # Storybook local (porta 6006)
npm run build:ds  # Build estatico do Storybook
```

---

## O que esta pronto para uso agora

- ✅ Navegacao por persona no `FrontOffice/`
- ✅ Modulo de calendario e modulo de sistema de ensino
- ✅ Storybook validado em `design-system/`
- ✅ Wiki local com documentacao e screenshots
- ✅ Scripts para subir FrontOffice, wiki e stack completa
- ✅ Estrutura preparada para branches `prototypes/feature/*`

---

## Proximos passos recomendados

1. **Validar o ambiente integrado** com `npm run dev:all` ao iniciar uma nova iteracao.
2. **Escolher a proxima jornada ou feature TO-BE** e abrir uma branch `prototypes/feature/*` a partir do baseline definido pela equipe.
3. **Publicar ou revisar o preview da wiki** quando a entrega precisar ser compartilhada fora do ambiente local.
4. **Corrigir warnings de ancoras quebradas** na documentacao para reduzir ruido no build.
5. **Manter os docs de status e workflow sincronizados** sempre que a arquitetura operacional mudar.

---

## Conclusao

O repositório esta **pronto para uso como ambiente de prototipacao**, desde que o time trate `FrontOffice/` como a fonte ativa de implementacao e `src/` da raiz apenas como legado.
