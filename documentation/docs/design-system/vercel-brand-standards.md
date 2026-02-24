---
sidebar_position: 2
title: Padrões Vercel (Brand)
description: Guia de identidade visual Vercel para uso na wiki e nos protótipos do Educacross.
---

# Padrões Vercel (Brand)

Este documento consolida os padrões visuais da Vercel para uso interno na documentação e em protótipos, mantendo consistência de linguagem visual em páginas, apresentações e peças de comunicação.

> Referência base: ecossistema Geist (cores, tipografia e diretrizes de marca da Vercel).

## Objetivo

- Padronizar decisões visuais inspiradas na Vercel
- Manter interface limpa, técnica e de alto contraste
- Reduzir variação entre páginas da wiki e materiais de apoio

## Princípios de design

- **Minimalismo funcional**: poucos elementos decorativos, foco no conteúdo
- **Alto contraste**: legibilidade forte em títulos, textos e ações
- **Hierarquia clara**: títulos curtos, blocos escaneáveis, CTA explícito
- **Consistência de grid**: espaçamento previsível em múltiplos de 4px

## Paleta recomendada

### Cores principais

| Token | Valor | Uso |
|---|---|---|
| Preto | `#000000` | Texto principal, botões primários, ênfase |
| Branco | `#FFFFFF` | Fundo base |
| Cinza suave | `#FAFAFA` | Superfícies secundárias |
| Borda neutra | `#EAEAEA` | Bordas e separadores |
| Texto secundário | `#666666` | Apoio e metadados |
| Texto forte | `#111111` | Títulos e destaques |
| Acento funcional | `#0070F3` | Links, foco e estados interativos |

### Uso da cor (regra prática)

- 70% neutros (branco + cinzas)
- 20% preto/alto contraste
- 10% acentos (azul)

## Tipografia

### Fontes

- **Headlines e corpo**: Geist Sans
- **Código e dados técnicos**: Geist Mono

### Font stack sugerida

```css
--font-sans: "Geist Sans", Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
```

### Escala sugerida

| Estilo | Tamanho | Peso | Line-height |
|---|---:|---:|---:|
| H1 | 48px | 600 | 1.10 |
| H2 | 36px | 600 | 1.15 |
| H3 | 28px | 600 | 1.20 |
| Body | 16px | 400 | 1.60 |
| Caption | 12px | 400 | 1.40 |
| Code | 13px | 400 | 1.50 |

## Componentes e estilo de UI

### Bordas, raio e sombra

- **Raio padrão**: 8px
- **Raio secundário**: 6px e 12px
- **Borda padrão**: `1px solid #EAEAEA`
- **Sombra**: mínima; priorizar contraste e borda em vez de elevação exagerada

### Botões

- **Primary**: fundo preto, texto branco
- **Secondary**: fundo branco, texto escuro, borda neutra
- **Ghost**: sem fundo, hover discreto em cinza claro

### Inputs

- Altura visual ~40px
- Borda neutra com foco em azul (`#0070F3`)
- Placeholder em cinza médio

## Padrão para páginas da wiki

### Estrutura recomendada

1. Contexto curto (1–2 parágrafos)
2. Seções com subtítulos objetivos
3. Tabelas para tokens e decisões
4. Exemplos práticos quando necessário
5. Checklist final de consistência

### Conteúdo e escrita

- Frases curtas e diretas
- Evitar excesso de emojis
- Preferir bullets e tabelas para leitura rápida

## Acessibilidade (mínimo esperado)

- Contraste em nível WCAG AA
- Estados de foco visíveis
- Hierarquia semântica correta de headings
- Links com texto descritivo

## Checklist de aplicação

- [ ] Paleta neutra + acento azul aplicada com parcimônia
- [ ] Tipografia consistente (Geist Sans/Mono ou fallback equivalente)
- [ ] Raio, borda e estados de foco no padrão
- [ ] Página escaneável (títulos curtos, blocos curtos, tabelas claras)
- [ ] Contraste e legibilidade validados

## Referências

- [Vercel Docs](https://vercel.com/docs)
- [Geist Design System](https://vercel.com/geist/introduction)
- [Geist Colors](https://vercel.com/geist/colors)
- [Geist Brands](https://vercel.com/geist/brands)
- [Vercel Font (Geist Sans/Mono)](https://vercel.com/font)

## Relação com os skills locais

Este documento da wiki está alinhado com o skill:

- `.agents/skills/vercel-brand/SKILL.md`
- `.agents/skills/vercel-brand/resources/colors.md`
- `.agents/skills/vercel-brand/resources/typography.md`
- `.agents/skills/vercel-brand/resources/components.md`
