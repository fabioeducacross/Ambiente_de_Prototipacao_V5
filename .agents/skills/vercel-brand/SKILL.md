---
name: vercel-brand
description: Diretrizes de design system e identidade visual da Vercel para criação de landing pages, apresentações e peças de social media.
metadata:
  author: vercel
  version: "1.0.0"
  source: vercel.com (docs, geist/colors, geist/brands, font)
  argument-hint: <contexto-ou-arquivo>
---

# Vercel Brand Design System

Referência de identidade visual da Vercel para orientar produção de UI e peças de comunicação com consistência de marca.

Use este skill quando precisar replicar linguagem visual minimalista, técnica e de alto contraste inspirada no ecossistema Vercel/Geist.

## Quando usar

- Criar landing pages com estética Vercel
- Produzir apresentações alinhadas à marca
- Criar criativos para social media com consistência visual
- Projetar interfaces com linguagem minimalista de produto developer-first
- Definir tokens iniciais para protótipos e design specs

## Como funciona

1. Consulte o resumo rápido abaixo para decisões imediatas
2. Aplique os detalhes completos em `resources/`
3. Use o guia do contexto alvo em `contexts/`
4. Valide contraste, legibilidade e consistência de grid antes de finalizar

## Entrada esperada

- Tipo de entrega: landing page, apresentação, post social, etc.
- Canal/dispositivo principal: desktop, mobile, projeção, feed, story
- Objetivo da peça: aquisição, anúncio de feature, branding, educação
- Restrições: prazo, formato, CTA obrigatório, limite de texto

## Referência rápida

### Cores
- Primária: #000000
- Fundo principal: #FFFFFF
- Neutros base: #FAFAFA, #EAEAEA, #666666, #111111
- Acento funcional (links/ação): #0070F3

### Tipografia
- Headlines: Geist Sans (fallback: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif)
- Body: Geist Sans (fallback idêntico)
- Código/dados: Geist Mono (fallback: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)

### Elementos-chave
- Border radius padrão: 8px
- Border radius secundário: 6px e 12px
- Sombra predominante: mínima/quase inexistente (ênfase em contraste e borda)
- Espaçamento base: múltiplos de 4px (4, 8, 12, 16, 24, 32, 48)

## Fontes e confiabilidade

- Fonte oficial de tipografia: Geist (Vercel Font)
- Diretrizes de marca: Vercel Geist Brands
- Sistema de cores: Geist Colors
- Observação: alguns tokens de cor são inferidos do padrão visual público da Vercel quando não expostos diretamente em texto bruto da página.

## Arquivos de referência

- resources/colors.md
- resources/typography.md
- resources/components.md

## Guias por contexto

- contexts/landing-pages.md
- contexts/presentations.md
- contexts/social-media.md

## Saída esperada

Ao usar este skill, a entrega deve conter:

- Paleta aplicada com contraste adequado
- Tipografia e hierarquia consistentes
- Componentes no padrão (bordas, raio, estados)
- Layout alinhado ao contexto (landing, slides, social)
- Regras de marca respeitadas (logo, proporção, uso de acentos)

## Checklist rápido

- [ ] Cor base e acentos aplicados com parcimônia
- [ ] Headline curta e clara
- [ ] Espaçamentos em escala de 4px
- [ ] CTA principal visualmente inequívoco
- [ ] Sem excesso de gradientes/sombras
- [ ] Marca e logotipo usados sem distorção
