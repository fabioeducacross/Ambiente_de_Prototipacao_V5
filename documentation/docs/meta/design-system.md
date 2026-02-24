# Design System - GitHub-Inspired UX

Esta página documenta o design system implementado para as melhorias de UX inspiradas no GitHub Docs.

## 🔲 Padrões Vercel na Wiki

A wiki passa a adotar também um padrão visual inspirado na Vercel para conteúdos técnicos e editoriais com foco em minimalismo e alto contraste.

- Documento oficial: [Padrões Vercel (Brand)](../design-system/vercel-brand-standards)
- Aplicação: paleta neutra, tipografia Geist (ou fallback equivalente), bordas leves, foco em legibilidade
- Objetivo: manter consistência visual entre documentação, protótipos e materiais de comunicação

## 🎨 Paleta de Cores

O design system utiliza a paleta de cores **Vuexy** combinada com cores inspiradas no GitHub para categorias de conteúdo.

### Cores Principais (Vuexy)

```css
/* Primary - Roxo Vuexy */
--ifm-color-primary: #7367F0;
--ifm-color-primary-dark: #5951E8;
--ifm-color-primary-light: #8D83F3;

/* Success - Verde */
--ifm-color-success: #28C76F;

/* Warning - Laranja */
--ifm-color-warning: #FF9F43;

/* Danger - Vermelho */
--ifm-color-danger: #EA5455;

/* Info - Ciano */
--ifm-color-info: #00CFE8;
```

### Cores de Categorias (GitHub-Inspired)

Cada categoria na homepage possui uma cor específica para facilitar a identificação visual:

| Categoria | Cor | Hex | Uso |
|-----------|-----|-----|-----|
| 📘 Regras de Negócio | Azul | `#0969DA` | `--color-intro` |
| 🎯 Documentação de Produto | Roxo | `#8250DF` | `--color-collab` |
| 🚀 Jornadas Educacionais | Verde | `#1A7F37` | `--color-devops` |
| ⚙️ Setup & Desenvolvimento | Vermelho | `#D1242F` | `--color-security` |
| 👥 Personas & Contexto | Laranja | `#BF8700` | `--color-management` |
| ❓ FAQ & Suporte | Ciano | `#00CFE8` | `--color-support` |

## 🧩 Componentes

### CategoryCard

Componente de card para categorias na homepage.

**Props:**
```typescript
interface CategoryCardProps {
  icon: string;        // Emoji ou ícone (ex: "📘")
  title: string;       // Título da categoria
  description: string; // Descrição breve
  color: string;       // Cor da borda esquerda (hex)
  links: Array<{       // Links para documentos
    label: string;
    href: string;
  }>;
}
```

**Uso:**
```jsx
<CategoryCard
  icon="📘"
  title="Regras de Negócio"
  description="Padrões e regras do domínio"
  color="#0969DA"
  links={[
    { label: "RN001-010: Gestão de Turmas", href: "/docs/..." }
  ]}
/>
```

**Características:**
- Border-left de 4px com a cor da categoria
- Hover effect: translateY(-4px) + box-shadow
- Responsive: 3 colunas → 2 → 1 (desktop → tablet → mobile)

### PopularDocs

Seção de documentos mais acessados.

**Características:**
- Grid de 3 colunas (responsive: 3 → 2 → 1)
- Cards com badge de categoria (Template, Estratégia, etc.)
- Hover effect: background change + shadow
- Ícone emoji + título + descrição + link

**Documentos incluídos:**
1. Template PRD
2. Visão de Produto 2024
3. RN001-010: Gestão de Turmas
4. Guia de Início Rápido
5. PDR-001: Arquitetura
6. Persona: Professor

### DocItemFooter (Feedback)

Componente de feedback em todas as páginas de documentação.

**Funcionalidades:**
- Botões 👍 (Sim) e 👎 (Não)
- Pergunta: "Esta página foi útil?"
- LocalStorage para persistir voto por página
- Google Analytics tracking: evento `doc_feedback`
- Mensagem de agradecimento: "Obrigado pelo feedback! 🎉"

**Características:**
- Desabilita botões após voto
- Voto persiste por página (não global)
- Hover effect nos botões
- Animação fadeIn na mensagem de agradecimento

## 📐 Breakpoints Responsivos

O design system utiliza os seguintes breakpoints:

| Dispositivo | Largura | Colunas Grid |
|-------------|---------|--------------|
| Desktop | > 996px | 3 colunas |
| Tablet | 768px - 996px | 2 colunas |
| Mobile | < 768px | 1 coluna |

### Media Queries

```css
/* Tablet */
@media (max-width: 996px) {
  .categoryGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .categoryGrid {
    grid-template-columns: 1fr;
  }
}
```

## 🔍 Sistema de Busca

Configuração do plugin de busca local:

- **Plugin:** `@cmfcmf/docusaurus-search-local`
- **Idioma:** Português (stemming)
- **Max resultados:** 8
- **Indexação:** Apenas docs (não blog)

## ♿ Acessibilidade

O design system segue as diretrizes **WCAG 2.1 AA**:

### Contraste de Cores
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Componentes: mínimo 3:1

### Navegação por Teclado
- **Tab:** Navega entre elementos interativos
- **Enter/Space:** Ativa botões e links
- **Escape:** Fecha modais e dropdowns

### ARIA Labels
Todos os componentes interativos possuem labels descritivos:

```jsx
<button aria-label="Esta página foi útil">
  👍 Sim
</button>
```

## 📊 Google Analytics

Eventos rastreados:

### doc_feedback
Disparado quando usuário clica em 👍 ou 👎:

```javascript
gtag('event', 'doc_feedback', {
  event_category: 'Documentation',
  event_label: '/docs/path/to/page',
  helpful: true, // ou false
});
```

**ID de Rastreamento:** `G-XXXXXXXXXX` (configurar em `docusaurus.config.ts`)

## 🎯 Uso nos Componentes

### Exemplo Completo

```tsx
import CategoryCard from '@site/src/components/CategoryCard';

function HomePage() {
  const categories = [
    {
      icon: '📘',
      title: 'Regras de Negócio',
      description: 'Padrões e regras do domínio',
      color: '#0969DA',
      links: [
        { label: 'RN001-010', href: '/docs/...' },
      ],
    },
  ];

  return (
    <section>
      {categories.map((cat, idx) => (
        <CategoryCard key={idx} {...cat} />
      ))}
    </section>
  );
}
```

## 📚 Referências

- [Vuexy Design System](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [GitHub Docs](https://docs.github.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Docusaurus Documentation](https://docusaurus.io/docs)

---

**Última atualização:** 2026-02-06  
**Versão:** 1.0  
**Implementado em:** FEATURE-001 - GitHub-Inspired UX
