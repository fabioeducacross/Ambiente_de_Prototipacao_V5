---
sidebar_position: 2
title: Configuração do Ambiente
---
import {
  IconApi,
  IconBooks,
  IconClipboard,
  IconEdit,
  IconPalette,
  IconRocket,
  IconSearch,
  IconSettings
} from '@site/src/components/MaterialIcon';


# Configuração do Ambiente

Guia passo a passo para configurar o ambiente de prototipação no seu computador.

## <IconClipboard /> Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**: v14 ou superior
- **npm**: 6.x ou superior
- **Git**: Para controle de versão
- **Editor de código**: VSCode recomendado

## <IconSettings /> Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5.git
cd Ambiente_de_Prototipacao_V5
```

### 2. Instalar Dependências do Protótipo

```bash
npm install
```

### 3. Instalar Dependências da Documentação

```bash
cd documentation
npm install
cd ..
```

## <IconRocket /> Executar o Ambiente

### Todos os servidores de uma vez (recomendado)

```bash
# Na raiz do projeto
npm run dev:all
```

| Servidor | URL |
|----------|-----|
| `[ROOT]` Vite raiz | http://localhost:5173 |
| `[FO]` FrontOffice | http://localhost:5174 |
| `[DOCS]` Wiki | http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/ |

:::tip Reiniciar após crash
Se qualquer servidor travar, basta rodar `npm run dev:all` novamente. O comando mata automaticamente os processos nas portas 5173, 5174 e 3000 antes de iniciar.
:::

### Servidores individuais

```bash
npm run dev          # ROOT Vite (porta 5173)
npm run dev:fo       # FrontOffice (porta 5174)
npm run dev:docs     # Docusaurus wiki (porta 3000)
```

### Build de Produção

Para gerar os arquivos de produção:

```bash
# Build do protótipo
npm run build

# Build da documentação
cd documentation
npm run build
```

## <IconPalette /> Estrutura de Pastas

```
Ambiente_de_Prototipacao_V5/
├── FrontOffice/               # App Vue 3 — protótipos por persona (porta 5174)
│   ├── src/
│   │   ├── views/             # Views por persona (teacher/, student/, etc.)
│   │   ├── modules/           # Features auto-contidas (calendario/, sistema-de-ensino/)
│   │   ├── components/        # Componentes reutilizáveis
│   │   └── shared/            # Composables e componentes cross-módulo
│   └── package.json
├── documentation/             # Wiki Docusaurus (porta 3000)
│   ├── docs/                  # Arquivos markdown das jornadas
│   ├── src/                   # Tema e componentes customizados
│   └── static/img/screenshots/ # Screenshots capturados pelo Playwright
├── mcp-playwright/
│   └── capture-screenshots.mjs # Script de captura de screenshots
├── src/                       # LEGADO — não usar
├── package.json               # Scripts da raiz (dev:all, build, etc.)
├── vite.config.js             # Config Vite raiz (root: './FrontOffice')
└── .github/copilot-instructions.md  # Instruções para AI
```

## <IconApi /> Integração com Design System

O Design System Vuexy está catalogado em Storybook separado:

- **URL**: https://fabioeducacross.github.io/DesignSystem-Vuexy
- **Tipo**: HTML-based (framework-agnostic)
- **Integração**: Via MCP (Model Context Protocol)

### Workflow de Uso

1. **Consultar** componente no Storybook
2. **Copiar** HTML do componente
3. **Integrar** no template Vue 3
4. **Estilizar** usando classes CSS do Vuexy

## <span class="material-symbols-outlined">smart_toy</span> Configuração do Claude AI

Este projeto é otimizado para desenvolvimento com Claude AI:

### Copilot Instructions

As instruções para o GitHub Copilot estão em:
```
.github/copilot-instructions.md
```

Este arquivo contém:
- Padrões de código Vue 3
- Convenções do Design System Vuexy
- Paleta de cores e componentes
- Estrutura de dados (journeys.json)

### Workflow Vibecoder

Como designer usando Claude:

1. **Descrever funcionalidade** em português natural
2. **Claude gera código** Vue 3 + componentes Vuexy
3. **Testar visualmente** no navegador
4. **Refinar** iterativamente até resultado ideal

Não é necessário conhecimento profundo de Vue ou JavaScript!

## <span class="material-symbols-outlined">science</span> Testes

Execute os testes (quando disponíveis):

```bash
# Testes unitários
npm run test:unit

# Testes E2E
npm run test:e2e
```

## <IconEdit /> Variáveis de Ambiente

Crie arquivo `.env` na raiz do projeto (se necessário):

```env
# API endpoints (se houver backend futuramente)
VITE_API_URL=

# Modo de desenvolvimento
VITE_DEV_MODE=true
```

## <IconSearch /> Troubleshooting

### Erro: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Portas 5173 / 5174 / 3000 já em uso (servidor travado)

Use o `dev:all` — ele mata os processos automaticamente antes de subir:

```bash
npm run dev:all
```

Ou manualmente via PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 5173,5174,3000 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

### Documentação não carrega CSS

```bash
cd documentation
rm -rf node_modules package-lock.json
npm install
npm start
```

## <IconBooks /> Próximos Passos

Agora que o ambiente está configurado:

1. Explore o [catálogo de jornadas](/docs/journeys)
2. Aprenda a criar um protótipo (documentação em breve)
3. Consulte o [template de jornada](/docs/templates/journey-template)
4. Acesse o [Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy)

## <span class="material-symbols-outlined">sos</span> Suporte

Em caso de problemas:

- Consulte a [documentação completa](/docs/intro)
- Verifique as [issues do GitHub](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/issues)
- Entre em contato com o time Educacross
