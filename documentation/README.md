# Ambiente de Prototipação V5 - Documentação

Site de documentação construído com [Docusaurus 3](https://docusaurus.io/), incluindo design system inspirado no GitHub Docs com melhorias de UX.

## ✨ Novidades (v5.1 - FEATURE-001)

### 🎨 GitHub-Inspired UX

- ✅ **Homepage Redesenhada**: 6 cards de categorias visuais para navegação rápida
- ✅ **Documentos Populares**: Seção destacando os 6 documentos mais importantes
- ✅ **Busca Avançada**: Busca local com suporte a português e stemming
- ✅ **Feedback Component**: Botões 👍👎 em todas as páginas de documentação
- ✅ **Footer Aprimorado**: 3 colunas com Ajuda e Suporte
- ✅ **Design System Vuexy**: Paleta de cores consistente + cores de categoria GitHub
- ✅ **Google Analytics**: Rastreamento de eventos e navegação

### 📊 Categorias de Conteúdo

| Categoria | Cor | Conteúdo |
|-----------|-----|----------|
| 📘 Regras de Negócio | Azul `#0969DA` | Padrões do domínio |
| 🎯 Documentação de Produto | Roxo `#8250DF` | PRDs, Visão de Produto |
| 🚀 Jornadas Educacionais | Verde `#1A7F37` | Fluxos de usuário por persona |
| ⚙️ Setup & Desenvolvimento | Vermelho `#D1242F` | Guias técnicos, arquitetura |
| 👥 Personas & Contexto | Laranja `#BF8700` | Perfis de usuários |
| ❓ FAQ & Suporte | Ciano `#00CFE8` | Perguntas frequentes |

## 🚀 Quick Start

### Instalação

```bash
npm install
# ou
yarn install
```

### Desenvolvimento Local

```bash
npm run start -- --port 3003
# ou
yarn start --port 3003
```

Abre o browser em `http://localhost:3003`. Hot reload ativo.

### Build de Produção

```bash
npm run build
```

Gera arquivos estáticos em `build/` para hospedagem.

### Testar Build Localmente

```bash
npm run serve -- --port 3003
```

Serve a pasta `build/` localmente.

## 📁 Estrutura do Projeto

```
documentation/
├── docs/                      # Arquivos markdown da documentação
│   ├── business-rules/        # Regras de negócio (RN)
│   ├── decisions/             # Decisões de produto (PDR)
│   ├── getting-started/       # Guias iniciais
│   ├── journeys/              # Jornadas por persona
│   ├── personas/              # Perfis de usuários
│   ├── product-strategy/      # Estratégia de produto
│   ├── prds/                  # Product Requirements Documents
│   └── meta/                  # Metadocumentação
├── src/
│   ├── components/            # Componentes React customizados
│   │   ├── CategoryCard/      # Cards de categoria (homepage)
│   │   └── PopularDocs/       # Seção de documentos populares
│   ├── css/
│   │   └── custom.css         # Estilos globais + paleta Vuexy
│   ├── pages/
│   │   └── index.tsx          # Homepage customizada
│   └── theme/                 # Theme overrides do Docusaurus
│       └── DocItem/Footer/    # Componente de feedback
├── static/                    # Arquivos estáticos (imagens, etc)
├── docusaurus.config.ts       # Configuração principal
├── sidebars.ts                # Configuração da sidebar
└── package.json
```

## 🧩 Componentes Customizados

### CategoryCard

Card de categoria na homepage com hover effects.

**Props:**
- `icon`: Emoji ou ícone
- `title`: Título da categoria
- `description`: Descrição breve
- `color`: Cor da borda (hex)
- `links`: Array de links relacionados

### PopularDocs

Seção de documentos mais acessados na homepage.

- Grid de 3 colunas (responsive)
- Badges de categoria coloridos
- Hover effects

### DocItemFooter

Componente de feedback com 👍👎.

- Persistência via localStorage
- Google Analytics tracking
- Mensagem de agradecimento

## 🎨 Design System

Documentação completa em: `/docs/meta/design-system`

**Paleta de Cores:**
- Primary: `#7367F0` (Roxo Vuexy)
- Success: `#28C76F` (Verde)
- Warning: `#FF9F43` (Laranja)
- Danger: `#EA5455` (Vermelho)
- Info: `#00CFE8` (Ciano)

**Breakpoints:**
- Desktop: > 996px (3 colunas)
- Tablet: 768-996px (2 colunas)
- Mobile: < 768px (1 coluna)

## 🔍 Busca

Sistema de busca local com:
- Suporte a português (stemming)
- Máximo de 8 resultados
- Apenas documentação (sem blog)

Plugin: `@cmfcmf/docusaurus-search-local`

## 📊 Analytics

Google Analytics configurado com:
- ID: `G-XXXXXXXXXX` (substituir em `docusaurus.config.ts`)
- Eventos customizados: `doc_feedback`

## ♿ Acessibilidade

- Contraste WCAG 2.1 AA
- Navegação por teclado completa
- ARIA labels em todos os componentes interativos
- Screen reader friendly

## 🌐 Deployment

### GitHub Pages

```bash
GIT_USER=<seu-usuario> npm run deploy
```

### Outras Plataformas

Após build, hospedar a pasta `build/`:
- **Netlify**: Arraste a pasta `build/` no dashboard
- **Vercel**: `vercel --prod`
- **AWS S3**: `aws s3 sync build/ s3://seu-bucket/`

## 🛠️ Desenvolvimento

### Adicionar Nova Página

1. Criar arquivo `.md` em `docs/`
2. Adicionar frontmatter:
   ```yaml
   ---
   id: minha-pagina
   title: Minha Página
   sidebar_label: Label Sidebar
   ---
   ```
3. Atualizar `sidebars.ts` se necessário

### Adicionar Nova Categoria na Homepage

1. Editar `src/pages/index.tsx`
2. Adicionar objeto ao array `categories`:
   ```typescript
   {
     icon: '🔥',
     title: 'Nova Categoria',
     description: 'Descrição aqui',
     color: '#FF5733',
     links: [
       { label: 'Link 1', href: '/docs/...' }
     ]
   }
   ```

## 🐛 Troubleshooting

### Build Errors

```bash
# Limpar cache
rm -rf .docusaurus build node_modules
npm install
npm run build
```

### Hot Reload não funciona

```bash
# Matar processos Node e reiniciar
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run start -- --port 3003
```

## 📚 Links Úteis

- [Docusaurus Docs](https://docusaurus.io/docs)
- [Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [Educacross](https://educacross.com.br/)
- [GitHub Repo](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5)

## 📝 Changelog

### v5.1 (2026-02-06) - FEATURE-001: GitHub-Inspired UX
- Homepage redesenhada com 6 category cards
- Seção "Documentos Mais Acessados" com 6 docs principais
- Sistema de busca local com português
- Componente de feedback (👍👎) em todas as páginas
- Footer com 3 colunas (Docs, Ajuda, Recursos)
- Paleta Vuexy + cores GitHub
- Google Analytics tracking

### v5.0 (2025-XX-XX) - Docusaurus 3 Migration
- Migração de Docusaurus 2 para 3
- Preparação para v4
- Correções de broken links

## 📄 Licença

© 2026 Educacross. Todos os direitos reservados.

---

**Website:** https://fabioeducacross.github.io/Ambiente_de_Prototipacao_V5/  
**GitHub:** https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5
