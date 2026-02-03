# Diretório de Mockups TO-BE

Este diretório contém mockups e wireframes das **soluções propostas** (estado futuro - TO-BE).

## Como Criar Mockups

### Ferramentas Recomendadas

1. **Figma** (preferido)
   - URL: https://figma.com
   - Template: Duplicar Design System Vuexy
   - Compartilhar: Exportar como PNG

2. **Excalidraw** (rápido)
   - URL: https://excalidraw.com
   - Bom para wireframes de baixa fidelidade

3. **Screenshot do Protótipo** (ideal)
   - Rodar protótipo: `cd Ambiente_de_Prototipacao_V5 && npm run dev`
   - Capturar tela funcionando

## Convenção de Nomenclatura

Formato: `[jornada-id]-[tela]-to-be.png`

**Exemplos:**
- `prof-001-books-grid-to-be.png` - Grid de livros (proposta de melhoria)
- `prof-001-quick-actions-menu.png` - Menu de ações rápidas
- `prof-001-hover-tooltip.png` - Tooltip de preview

## Mockups Necessários

### PROF-001: Livros do Sistema Educacional
- [ ] `prof-001-books-grid-to-be.png` - Tela completa com filtros inteligentes
- [ ] `prof-001-quick-actions-menu.png` - Card com dropdown de ações aberto
- [ ] `prof-001-hover-tooltip.png` - Card com tooltip de preview ao hover
- [ ] `prof-001-filters-expanded.png` - Filtros de status expandidos

### PROF-002: Missões do Livro
- [ ] `prof-002-mission-wizard-to-be.png` - Wizard de seleção de missões
- [ ] `prof-002-mission-preview-modal.png` - Modal de preview de missão

### PROF-003: Criar Avaliação
- [ ] `prof-003-evaluation-wizard-to-be.png` - Wizard multi-step

## Diretrizes de Design

**Seguir Design System Vuexy:**
- Cores: #7367F0 (primary), #28C76F (success), #FF9F43 (warning), #EA5455 (danger)
- Tipografia: Montserrat ou similar
- Espaçamento: 8px grid
- Sombras: 0 4px 24px rgba(115, 103, 240, 0.12)

**Elementos Obrigatórios:**
- Breadcrumb no topo
- Filtros globais (turma/disciplina)
- Botões com ícones Bootstrap Icons
- Cards com hover effect
- Badges coloridos para status

## Ferramentas Auxiliares

**Gerar Placeholders:**
```bash
# Criar imagem placeholder temporária
# 1200x800px com texto identificador
```

**Design Tokens Vuexy:**
- Arquivo: `src/style.css` (CSS custom properties)
- Referência: https://fabioeducacross.github.io/DesignSystem-Vuexy
