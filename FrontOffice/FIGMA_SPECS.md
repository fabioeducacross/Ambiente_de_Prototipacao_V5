# Especificações Figma - Calendar Page (Pixel-Perfect)

**Fonte**: Imagem Figma anexada - Layout Professor/Calendário  
**Data**: 10 de fevereiro de 2026  
**Resolução base**: 1920×1080px  
**Tolerância**: ±2px para arredondamentos de subpixel

---

## 📐 Layout Geral

### Estrutura
```
┌─────────────────────────────────────────────────┐
│  [Sidebar 240px]  │  [Main Content]            │
│  - Logo           │  - Calendar Header         │
│  - User Info      │  - Calendar Grid           │
│  - Navigation     │                            │
│  (Always visible) │                            │
└─────────────────────────────────────────────────┘
```

### Dimensões principais
- **Sidebar width**: `240px` (fixed)
- **Sidebar height**: `100vh` (full viewport)
- **Calendar main margin-left**: `240px` (compensando sidebar)
- **Page background**: `#f9fafb`

---

## 🎨 Sidebar Specs

### Container
- **Width**: `240px`
- **Height**: `100vh`
- **Position**: `fixed`
- **Top**: `0`
- **Left**: `0`
- **Z-index**: `100`
- **Background**: `#1e1e2d` (dark theme)
- **Color text**: `#a1a5b7` (light gray)
- **Overflow-y**: `auto`

### Logo (Topo)
- **Container padding**: `20px 16px`
- **Logo height**: `32px`
- **Logo width**: `auto` (manter proporção)
- **Margin-bottom**: `16px`
- **Source**: `https://fabioeducacross.github.io/educacross-assets/logo-educacross.svg`

### Seção User Info
- **Padding**: `16px`
- **Display**: `flex`, align-items: `center`, gap: `12px`
- **Background**: `rgba(255,255,255,0.05)` (subtle highlight)
- **Border-bottom**: `1px solid rgba(255,255,255,0.1)`
- **Margin-bottom**: `16px`

#### Avatar
- **Size**: `40px × 40px`
- **Border-radius**: `50%` (circular)
- **Object-fit**: `cover`
- **Background**: `#7367F0` (fallback se imagem falhar)

#### User Text
- **Name**:
  - Font-size: `14px`
  - Font-weight: `500`
  - Color: `#ffffff`
  - Line-height: `1.4`
- **Role**:
  - Font-size: `12px`
  - Font-weight: `600`
  - Color: `#7367F0` (primary)
  - Line-height: `1.2`

### Navigation Items
- **Nav section title**:
  - Font-size: `11px`
  - Font-weight: `600`
  - Text-transform: `uppercase`
  - Color: `rgba(255,255,255,0.5)`
  - Padding: `16px 16px 8px`
  - Letter-spacing: `0.5px`

- **Nav item**:
  - Height: `44px` (touch target)
  - Padding: `12px 16px`
  - Display: `flex`, align-items: `center`, gap: `12px`
  - Border-radius: `0` (sharp edges)
  - Transition: `all 0.2s ease`

- **Nav item hover**:
  - Background: `rgba(255,255,255,0.05)`
  - Color: `#ffffff`

- **Nav item active** (Calendário):
  - Background: `rgba(115,103,240,0.1)`
  - Color: `#7367F0`
  - Border-left: `3px solid #7367F0`
  - Font-weight: `600`

- **Nav icon**:
  - Font-size: `18px`
  - Width: `18px` (fixed para alinhamento)

- **Collapsible chevron**:
  - Margin-left: `auto`
  - Font-size: `14px`
  - Opacity: `0.6`

### Scrollbar (Custom)
- **Width**: `8px`
- **Track**: `#16192c` (darker than sidebar)
- **Thumb**: `#2c3051` (light gray)
- **Thumb hover**: `#3d4164`
- **Border-radius**: `4px`

---

## 📅 Calendar Header Specs

### Container
- **Height**: `70px`
- **Background**: `#ffffff`
- **Border-bottom**: `1px solid #e5e7eb`
- **Padding**: `16px 24px`
- **Position**: `sticky` (opcional: top: 0, z-index: 50)
- **Display**: `flex`, align-items: `center`, justify-content: `space-between`

### Dropdown Turma
- **Min-width**: `200px`
- **Height**: `38px`
- **Border**: `1px solid #e5e7eb`
- **Border-radius**: `6px`
- **Padding**: `8px 12px`
- **Font-size**: `14px`
- **Font-weight**: `400`
- **Color**: `#2c3e50`
- **Background**: `#ffffff`
- **Outline focus**: `2px solid #7367F0`

### Badge "5º ano"
- **Height**: `24px`
- **Padding**: `4px 12px`
- **Border-radius**: `12px` (pill shape)
- **Background**: `#7367F0` (primary)
- **Color**: `#ffffff`
- **Font-size**: `12px`
- **Font-weight**: `600`
- **Line-height**: `1.2`
- **Margin-left**: `8px` (gap do dropdown)

### Botão "Adicionar evento"
- **Height**: `38px`
- **Padding**: `10px 20px`
- **Border-radius**: `6px`
- **Background**: `#7367F0`
- **Color**: `#ffffff`
- **Font-size**: `14px`
- **Font-weight**: `500`
- **Border**: `none`
- **Display**: `flex`, align-items: `center`, gap: `8px`
- **Transition**: `all 0.2s ease`

#### Icon botão
- **Font-size**: `16px`
- **Margin-right**: implícito no gap (8px)

#### Hover
- **Background**: `#5f54d4` (primary darker)
- **Transform**: `translateY(-1px)`
- **Box-shadow**: `0 4px 12px rgba(115,103,240,0.3)`

---

## 🎨 Design System Colors

### Primary Palette
- **Primary**: `#7367F0` (roxo principal)
- **Primary hover**: `#5f54d4`
- **Primary light**: `rgba(115,103,240,0.1)` (background subtle)
- **Success**: `#28C76F` (verde - nível iniciante)
- **Warning**: `#FF9F43` (laranja - nível intermediário)
- **Danger**: `#EA5455` (vermelho - nível avançado)
- **Info**: `#00CFE8` (ciano)

### Neutral Palette
- **Background page**: `#f9fafb` (gray 50)
- **Surface white**: `#ffffff`
- **Border**: `#e5e7eb` (gray 200)
- **Text primary**: `#2c3e50` (dark gray)
- **Text secondary**: `#6c757d` (medium gray)
- **Text tertiary**: `#a1a5b7` (light gray)

### Dark Theme (Sidebar)
- **Background dark**: `#1e1e2d`
- **Background darker**: `#16192c` (scrollbar track)
- **Surface dark**: `#2c3051` (hover states)
- **Text light**: `#a1a5b7`
- **Text white**: `#ffffff`

---

## 📝 Typography

### Font Family
- **Base**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace**: `'Fira Code', 'Courier New', monospace` (apenas para código)

### Font Sizes
- **Display**: `28px` (page titles)
- **H1**: `24px`
- **H2**: `20px`
- **H3**: `18px`
- **Body**: `14px` (base)
- **Small**: `12px` (badges, labels)
- **Tiny**: `11px` (nav section titles)

### Font Weights
- **Regular**: `400`
- **Medium**: `500`
- **Semibold**: `600`
- **Bold**: `700`

### Line Heights
- **Tight**: `1.2` (headings, badges)
- **Normal**: `1.4` (nav items, labels)
- **Relaxed**: `1.5` (body text, descriptions)

---

## 📏 Spacing Scale

### Gap/Margin Values
- **xs**: `4px`
- **sm**: `8px`
- **md**: `12px`
- **lg**: `16px`
- **xl**: `20px`
- **2xl**: `24px`
- **3xl**: `32px`

### Padding Values
- **Component small**: `8px 12px` (badges, small buttons)
- **Component medium**: `10px 20px` (buttons, inputs)
- **Component large**: `12px 24px` (cards)
- **Section**: `16px` (sidebar sections)
- **Page**: `24px` (calendar content)

---

## 🎯 Interactive States

### Transitions
- **Duration**: `0.2s` (padrão para hover/focus)
- **Timing**: `ease` ou `ease-in-out`
- **Properties**: `background-color`, `color`, `transform`, `box-shadow`

### Focus States
- **Outline**: `2px solid #7367F0`
- **Outline-offset**: `2px`
- **Border-radius**: igual ao elemento

### Hover States
- **Sidebar nav item**: background `rgba(255,255,255,0.05)`, color `#ffffff`
- **Button primary**: background `#5f54d4`, transform `translateY(-1px)`
- **Links**: color `#7367F0`, text-decoration `underline`

---

## 📱 Responsive Breakpoints

### Desktop (padrão Figma)
- **Min-width**: `1280px`
- **Sidebar**: sempre visível (240px fixed)
- **Calendar main**: margin-left 240px

### Tablet (a definir)
- **Min-width**: `768px`, max `1279px`
- **Sidebar**: considerar collapse ou overlay

### Mobile (a definir)
- **Max-width**: `767px`
- **Sidebar**: offcanvas (slide-in com overlay)

---

## ✅ Validação Checklist (50 pontos)

### Layout (10 pontos)
- [ ] Sidebar width = 240px
- [ ] Sidebar height = 100vh
- [ ] Sidebar position = fixed, left 0, top 0
- [ ] Calendar main margin-left = 240px
- [ ] Header height = 70px
- [ ] Header background = #ffffff
- [ ] Header border-bottom = 1px solid #e5e7eb
- [ ] Content padding = 24px
- [ ] Grid columns = 280px + 1fr
- [ ] Page background = #f9fafb

### Sidebar (15 pontos)
- [ ] Logo height = 32px
- [ ] Logo padding = 20px 16px
- [ ] Avatar size = 40px × 40px
- [ ] Avatar border-radius = 50%
- [ ] Username font-size = 14px, weight 500
- [ ] User role font-size = 12px, color #7367F0
- [ ] Nav item height = 44px
- [ ] Nav item padding = 12px 16px
- [ ] Nav item gap = 12px
- [ ] Nav section title font-size = 11px
- [ ] Nav section title text-transform = uppercase
- [ ] Active item background = rgba(115,103,240,0.1)
- [ ] Active item border-left = 3px solid #7367F0
- [ ] Scrollbar width = 8px
- [ ] Background = #1e1e2d

### Header Calendar (15 pontos)
- [ ] Dropdown height = 38px
- [ ] Dropdown border-radius = 6px
- [ ] Dropdown padding = 8px 12px
- [ ] Dropdown font-size = 14px
- [ ] Badge height = 24px
- [ ] Badge padding = 4px 12px
- [ ] Badge border-radius = 12px
- [ ] Badge background = #7367F0
- [ ] Badge font-size = 12px, weight 600
- [ ] Botão padding = 10px 20px
- [ ] Botão border-radius = 6px
- [ ] Botão gap = 8px
- [ ] Botão font-size = 14px, weight 500
- [ ] Header padding = 16px 24px
- [ ] Header gap elementos = space-between

### Cores & Tipografia (10 pontos)
- [ ] Primary = #7367F0
- [ ] Dark background = #1e1e2d
- [ ] Text primary = #2c3e50
- [ ] Text secondary = #6c757d
- [ ] Border color = #e5e7eb
- [ ] Success green = #28C76F
- [ ] Font family = 'Inter', sans-serif
- [ ] Font smoothing = antialiased
- [ ] Line heights = 1.2 (headings), 1.5 (body)
- [ ] Transitions = 0.2s ease

---

## 📸 Screenshot Reference

**Arquivo**: Imagem Figma anexada na conversa  
**View**: Professor → Calendário (tela principal)  
**Elementos chave visíveis**:
- Sidebar escura à esquerda (full height)
- Logo Educacross no topo da sidebar
- Seção de usuário com avatar
- Menu de navegação com "Calendário" ativo
- Header branco com dropdown de turma
- Badge "5º ano" ao lado do dropdown
- Botão "Adicionar evento" à direita

**Para validação**: Usar overlay da imagem Figma sobre implementação com 50% opacidade no PerfectPixel.
