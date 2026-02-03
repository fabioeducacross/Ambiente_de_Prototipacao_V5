# Diretório de Screenshots AS-IS

Este diretório contém capturas de tela do sistema **educacross-frontoffice** (estado atual - AS-IS).

## Como Capturar Screenshots

### Opção 1: Manual
1. Rode educacross-frontoffice localmente: `cd educacross-frontoffice && npm run dev`
2. Navegue até a rota desejada
3. Capture screenshot (Windows: Win+Shift+S, Mac: Cmd+Shift+4)
4. Salve no formato: `[jornada-id]-[nome-descritivo].png`

### Opção 2: Playwright (Automatizado)
```bash
# Criar script de captura
# scripts/capture-screenshots.js
```

## Convenção de Nomenclatura

Formato: `[jornada-id]-[tela]-[estado].png`

**Exemplos:**
- `prof-001-books-grid-as-is.png` - Grid de livros (estado atual)
- `prof-001-book-card-detail.png` - Close-up de um card
- `prof-001-missions-destination.png` - Tela de missões (destino da navegação)
- `prof-002-mission-list-as-is.png` - Lista de missões

## Screenshots Necessários

### PROF-001: Livros do Sistema Educacional
- [ ] `prof-001-books-grid-as-is.png` - Tela completa com grid de cards
- [ ] `prof-001-book-card-detail.png` - Close-up de um card individual
- [ ] `prof-001-missions-destination.png` - Tela de destino (missões)

### PROF-002: Missões do Livro
- [ ] `prof-002-mission-list-as-is.png` - Lista de missões
- [ ] `prof-002-mission-card-detail.png` - Card de missão individual

### PROF-003: Criar Avaliação
- [ ] `prof-003-evaluation-form-as-is.png` - Formulário de criação

## Dicas

- **Resolução**: 1920x1080 (Full HD)
- **Formato**: PNG (melhor qualidade)
- **Esconder dados sensíveis**: Usar dados de teste/mockados
- **Zoom**: 100% (sem zoom do navegador)
- **Navegador**: Chrome (consistência visual)
