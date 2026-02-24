# Vercel - Tipografia

## Famílias

- Primária: Geist Sans
- Monoespaçada: Geist Mono
- Alternativa decorativa (pontual): Geist Pixel

## Font Stack sugerida

### Sans
Geist Sans, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

### Mono
Geist Mono, ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace

## Escala tipográfica

| Estilo | Tamanho | Peso | Line-height | Uso |
|---|---:|---:|---:|---|
| Display | 64px | 600 | 1.05 | Hero em landing |
| H1 | 48px | 600 | 1.1 | Título principal |
| H2 | 36px | 600 | 1.15 | Seções principais |
| H3 | 28px | 600 | 1.2 | Subseções |
| H4 | 22px | 500 | 1.25 | Títulos internos |
| Body L | 18px | 400 | 1.6 | Texto introdutório |
| Body M | 16px | 400 | 1.6 | Corpo padrão |
| Body S | 14px | 400 | 1.5 | Metadados e suporte |
| Caption | 12px | 400 | 1.4 | Rótulos auxiliares |
| Code | 13px | 400 | 1.5 | Blocos e snippets |

## Princípios de uso

- Evitar excesso de pesos: priorizar 400, 500 e 600.
- Headlines curtos e objetivos, com alto contraste.
- Corpo com respirabilidade alta (line-height >= 1.5).
- Monoespaçado para tokens, comandos, logs e dados técnicos.

## CSS base sugerido

```css
:root {
  --font-sans: "Geist Sans", Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}

code, pre, kbd, samp {
  font-family: var(--font-mono);
}
```
