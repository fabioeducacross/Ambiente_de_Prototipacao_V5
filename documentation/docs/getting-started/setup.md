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

### Modo Desenvolvimento - Protótipo Vue 3

Execute o ambiente de prototipação com hot-reload:

```bash
npm run dev
```

O protótipo estará disponível em: http://localhost:5173

### Modo Desenvolvimento - Documentação

Execute o servidor de documentação:

```bash
cd documentation
npm start
```

A documentação estará disponível em: http://localhost:3000

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
├── src/                    # Código fonte do protótipo Vue 3
│   ├── assets/            # Assets (imagens, estilos)
│   ├── components/        # Componentes Vue
│   ├── data/             # Dados JSON (journeys.json)
│   ├── router/           # Rotas Vue Router
│   └── views/            # Páginas/Views
├── documentation/         # Documentação Docusaurus
│   ├── docs/             # Arquivos markdown
│   ├── src/              # Tema e componentes customizados
│   └── static/           # Assets estáticos
├── public/               # Assets públicos do protótipo
└── .github/              # Copilot instructions e workflows
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

### Porta 5173 já em uso

Edite `vite.config.js` e altere a porta:

```js
export default defineConfig({
  server: {
    port: 3001 // ou outra porta disponível
  }
})
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
