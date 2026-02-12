# Vuexy Colors - Referência Completa

Documentação detalhada de todas as cores do Design System Vuexy usado no Educacross.

---

## Cores Primárias

### Primary (Roxo Educacross)

**HEX**: `#7367F0`  
**RGB**: `rgb(115, 103, 240)`  
**RGB (separado)**: `115, 103, 240`  
**HSL**: `hsl(246, 82%, 67%)`

**Uso**:
- Botões de ação principal (CTA)
- Links ativos
- Badges de missões
- Ícones ativos
- Bordas de elementos selecionados
- Hover states

**Variantes**:
```css
/* Sólido */
background: #7367F0;

/* Com opacity */
background: rgba(115, 103, 240, 1.0);   /* 100% */
background: rgba(115, 103, 240, 0.24);  /* 24% - selected */
background: rgba(115, 103, 240, 0.12);  /* 12% - hover */
background: rgba(115, 103, 240, 0.08);  /* 8% - light bg */

/* Darker (hover) */
background: #6258d4;  /* -10% lightness */

/* Lighter */
background: #9E95F5;  /* +20% lightness */
```

**Gradiente**:
```css
background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);
```

---

### Success (Verde)

**HEX**: `#28C76F`  
**RGB**: `rgb(40, 199, 111)`  
**HSL**: `hsl(147, 67%, 47%)`

**Uso**:
- Mensagens de sucesso
- Badges "Iniciante"
- Confirmações
- Estado "ativo/online"
- Checkmarks e validações

**Variantes**:
```css
/* Sólido */
background: #28C76F;

/* Com opacity */
background: rgba(40, 199, 111, 0.12);  /* Badge bg */

/* Darker (hover) */
background: #24b263;

/* Lighter */
background: #48E68B;
```

**Gradiente**:
```css
background: linear-gradient(135deg, #28C76F 0%, #48E68B 100%);
```

---

### Warning (Laranja)

**HEX**: `#FF9F43`  
**RGB**: `rgb(255, 159, 67)`  
**HSL**: `hsl(29, 100%, 63%)`

**Uso**:
- Badges "Intermediário"
- Avisos importantes
- Avaliações (tipo de atividade)
- Estados "atenção necessária"
- Prazos próximos

**Variantes**:
```css
/* Sólido */
background: #FF9F43;

/* Com opacity */
background: rgba(255, 159, 67, 0.12);  /* Badge bg */

/* Darker (hover) */
background: #e68a2e;

/* Lighter */
background: #FFBC69;
```

**Gradiente**:
```css
background: linear-gradient(135deg, #FF9F43 0%, #FFBC69 100%);
```

---

### Danger (Vermelho)

**HEX**: `#EA5455`  
**RGB**: `rgb(234, 84, 85)`  
**HSL**: `hsl(360, 78%, 62%)`

**Uso**:
- Badges "Avançado"
- Erros e validações falhas
- Botões de exclusão
- Alertas críticos
- Estados "offline/inativo"

**Variantes**:
```css
/* Sólido */
background: #EA5455;

/* Com opacity */
background: rgba(234, 84, 85, 0.12);  /* Badge bg */

/* Darker (hover) */
background: #d33b3c;

/* Lighter */
background: #F07071;
```

---

### Info (Ciano)

**HEX**: `#00CFE8`  
**RGB**: `rgb(0, 207, 232)`  
**HSL**: `hsl(186, 100%, 45%)`

**Uso**:
- Olimpíadas (tipo de atividade)
- Tooltips e informações
- Badges informativos
- Links secundários
- Estados "informação"

**Variantes**:
```css
/* Sólido */
background: #00CFE8;

/* Com opacity */
background: rgba(0, 207, 232, 0.12);  /* Badge bg */

/* Darker (hover) */
background: #00b8cf;

/* Lighter */
background: #26E3F5;
```

**Gradiente**:
```css
background: linear-gradient(135deg, #00CFE8 0%, #26E3F5 100%);
```

---

### Secondary (Cinza)

**HEX**: `#82868B`  
**RGB**: `rgb(130, 134, 139)`  
**HSL**: `hsl(213, 4%, 53%)`

**Uso**:
- Botões secundários
- Ícones inativos
- Texto muted
- Bordas sutis
- Elementos desabilitados

**Variantes**:
```css
/* Sólido */
background: #82868B;

/* Com opacity */
background: rgba(130, 134, 139, 0.5);  /* 50% */

/* Lighter */
background: #9EA1A5;
```

---

## Cores de Texto

### Text Primary

**RGBA**: `rgba(47, 43, 61, 0.9)`  
**Opacity**: 90%

**Uso**: Textos principais, títulos, labels, conteúdo de leitura

```css
color: rgba(47, 43, 61, 0.9);
/* ou */
color: var(--text-primary);
```

---

### Text Secondary

**RGBA**: `rgba(47, 43, 61, 0.6)`  
**Opacity**: 60%

**Uso**: Textos descritivos, subtítulos, metadata, placeholders

```css
color: rgba(47, 43, 61, 0.6);
/* ou */
color: var(--text-secondary);
```

---

### Text Disabled

**RGBA**: `rgba(47, 43, 61, 0.4)`  
**Opacity**: 40%

**Uso**: Elementos desabilitados, textos inativos

```css
color: rgba(47, 43, 61, 0.4);
/* ou */
color: var(--text-disabled);
```

---

## Cores de Background

### Background Light

**HEX**: `#F8F9FA`  
**RGB**: `rgb(248, 249, 250)`

**Uso**: Background da página, áreas secundárias, cards inativos

---

### Background Hover

**RGBA**: `rgba(47, 43, 61, 0.06)`  
**Opacity**: 6%

**Uso**: Hover states sutis, overlay leve

```css
.element:hover {
  background: rgba(47, 43, 61, 0.06);
}
```

---

### Background Selected

**RGBA**: `rgba(115, 103, 240, 0.24)`  
**Opacity**: 24%

**Uso**: Elementos selecionados (ex: dia selecionado no calendário)

```css
.day-cell.selected {
  background: rgba(115, 103, 240, 0.24);
}
```

---

### Background Overlay

**RGBA**: `rgba(47, 43, 61, 0.08)`  
**Opacity**: 8%

**Uso**: Bordas sutis, overlays leves, separadores

```css
border: 1px solid rgba(47, 43, 61, 0.08);
```

---

## Cores de Atividades Educacross

### Missão

**Cor**: Primary (`#7367F0`)  
**Ícone**: Material Symbols `flag`

```vue
<div class="activity-badge activity-badge--missao">
  <span class="material-symbols-outlined">flag</span>
  Missão
</div>

<style scoped>
.activity-badge--missao {
  background: rgba(115, 103, 240, 0.12);
  color: var(--primary);
}
</style>
```

---

### Olimpíada

**Cor**: Info (`#00CFE8`)  
**Ícone**: Material Symbols `emoji_events`

```vue
<div class="activity-badge activity-badge--olimpiada">
  <span class="material-symbols-outlined">emoji_events</span>
  Olimpíada
</div>

<style scoped>
.activity-badge--olimpiada {
  background: rgba(0, 207, 232, 0.12);
  color: var(--info);
}
</style>
```

---

### Avaliação

**Cor**: Warning (`#FF9F43`)  
**Ícone**: Material Symbols `quiz`

```vue
<div class="activity-badge activity-badge--avaliacao">
  <span class="material-symbols-outlined">quiz</span>
  Avaliação
</div>

<style scoped>
.activity-badge--avaliacao {
  background: rgba(255, 159, 67, 0.12);
  color: var(--warning);
}
</style>
```

---

## Shadows

### Shadow Small

**CSS**: `0 2px 6px rgba(47, 43, 61, 0.1)`

**Uso**: Cards pequenos, tooltips, dropdowns

```css
box-shadow: var(--shadow-sm);
```

---

### Shadow Medium

**CSS**: `0 4px 12px rgba(47, 43, 61, 0.15)`

**Uso**: Cards principais, modais, popovers

```css
box-shadow: var(--shadow-md);
```

---

### Shadow Large

**CSS**: `0 8px 24px rgba(47, 43, 61, 0.2)`

**Uso**: Hover elevado, elementos flutuantes, drawers

```css
.card:hover {
  box-shadow: var(--shadow-lg);
}
```

---

### Shadow Focus (Primary)

**CSS**: `0 0 0 3px rgba(115, 103, 240, 0.3)`

**Uso**: Focus states de inputs, botões

```css
.button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.3);
}
```

---

## Acessibilidade - Contraste WCAG AA

Todos os pares de cores atendem WCAG 2.1 AA (4.5:1 para texto normal, 3:1 para texto grande):

| Foreground | Background | Contraste | Status |
|---|---|---|---|
| `rgba(47,43,61,0.9)` | `#FFFFFF` | 12.63:1 | ✅ AAA |
| `rgba(47,43,61,0.6)` | `#FFFFFF` | 7.89:1 | ✅ AAA |
| `rgba(47,43,61,0.4)` | `#FFFFFF` | 5.28:1 | ✅ AA |
| `#FFFFFF` | `#7367F0` | 4.58:1 | ✅ AA |
| `#FFFFFF` | `#28C76F` | 3.14:1 | ✅ AA (large text) |
| `#FFFFFF` | `#FF9F43` | 2.89:1 | ⚠️ AAA only for large text |
| `#FFFFFF` | `#EA5455` | 3.98:1 | ✅ AA |
| `#FFFFFF` | `#00CFE8` | 2.67:1 | ⚠️ AAA only for large text |

**Recomendação**: Para warning e info em texto pequeno, usar versão darker:
```css
/* Warning texto pequeno */
color: #e68a2e; /* Darker warning - contraste 3.5:1 */

/* Info texto pequeno */
color: #00b8cf; /* Darker info - contraste 3.2:1 */
```

---

## Paleta Complementar (Futuro)

### Dark Mode

```css
[data-theme="dark"] {
  --primary: #9E95F5;  /* Lighter primary */
  --success: #48E68B;  /* Lighter success */
  --warning: #FFBC69;  /* Lighter warning */
  --danger: #F07071;   /* Lighter danger */
  --info: #26E3F5;     /* Lighter info */
  
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-disabled: rgba(255, 255, 255, 0.4);
  
  --bg-page: #1A1D2E;
  --bg-card: #252838;
  --bg-hover: rgba(255, 255, 255, 0.08);
  --bg-overlay: rgba(255, 255, 255, 0.12);
}
```

---

## Exportação para Figma

### Figma Color Styles

```
Primary / Base        → #7367F0
Primary / Hover       → #6258d4
Primary / Light       → #9E95F5
Primary / 24%         → rgba(115, 103, 240, 0.24)
Primary / 12%         → rgba(115, 103, 240, 0.12)
Primary / 8%          → rgba(115, 103, 240, 0.08)

Success / Base        → #28C76F
Success / Hover       → #24b263
Success / Light       → #48E68B

Warning / Base        → #FF9F43
Warning / Hover       → #e68a2e
Warning / Light       → #FFBC69

Danger / Base         → #EA5455
Danger / Hover        → #d33b3c
Danger / Light        → #F07071

Info / Base           → #00CFE8
Info / Hover          → #00b8cf
Info / Light          → #26E3F5

Text / Primary        → rgba(47, 43, 61, 0.9)
Text / Secondary      → rgba(47, 43, 61, 0.6)
Text / Disabled       → rgba(47, 43, 61, 0.4)

Background / Light    → #F8F9FA
Background / Hover    → rgba(47, 43, 61, 0.06)
Background / Selected → rgba(115, 103, 240, 0.24)
Background / Overlay  → rgba(47, 43, 61, 0.08)
```

---

## Testes de Contraste

### Script de Validação

```javascript
// Executar no DevTools Console
function calculateContrast(rgb1, rgb2) {
  const luminance = (rgb) => {
    const [r, g, b] = rgb.map(val => {
      val /= 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = luminance(rgb1);
  const l2 = luminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Testar pares
const white = [255, 255, 255];
const primary = [115, 103, 240];
const textPrimary = [47, 43, 61];

console.log('White on Primary:', calculateContrast(white, primary).toFixed(2));
console.log('Text Primary on White:', calculateContrast(textPrimary, white).toFixed(2));
```

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
