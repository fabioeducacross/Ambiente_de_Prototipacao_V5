# EBadge Component

Componente de badge reutilizável seguindo o Design System da Educacross (baseado em Vuexy).

## Uso Básico

```vue
<template>
  <!-- Badge simples -->
  <EBadge variant="primary">Novo</EBadge>
  
  <!-- Badge em formato pill -->
  <EBadge variant="success" pill>Ativo</EBadge>
  
  <!-- Badge com cor customizada -->
  <EBadge :background-color="#FF5733" color="white">Custom</EBadge>
</template>

<script setup>
import { EBadge } from '@/components/base'
</script>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | String | `'primary'` | Variante de cor: `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark` |
| `pill` | Boolean | `false` | Formato pill (bordas totalmente arredondadas) |
| `color` | String | `null` | Cor do texto customizada (sobrescreve variant) |
| `backgroundColor` | String | `null` | Cor de fundo customizada (sobrescreve variant) |

## Variantes

### Primary
```vue
<EBadge variant="primary">Primary</EBadge>
```
Cor: `--primary` (#7367F0)

### Success
```vue
<EBadge variant="success">Aprovado</EBadge>
```
Cor: `--success` (#28C76F)

### Warning
```vue
<EBadge variant="warning">Pendente</EBadge>
```
Cor: `--warning` (#FF9F43)

### Danger
```vue
<EBadge variant="danger">Inativo</EBadge>
```
Cor: `--danger` (#EA5455)

### Info
```vue
<EBadge variant="info">Info</EBadge>
```
Cor: `--info` (#00CFE8)

### Light
```vue
<EBadge variant="light">Light</EBadge>
```
Cor: `--gray-200` (#EEEEEE)

### Dark
```vue
<EBadge variant="dark">Dark</EBadge>
```
Cor: `--gray-900` (#212121)

## Exemplos de Uso

### Badge de Status
```vue
<EBadge 
  :variant="status === 'ativo' ? 'success' : 'secondary'"
  pill
>
  {{ status === 'ativo' ? 'Ativo' : 'Inativo' }}
</EBadge>
```

### Badge de Categoria de Evento
```vue
<EBadge 
  :background-color="eventTypeColor"
  pill
>
  {{ eventTypeLabel }}
</EBadge>
```

### Lista de Turmas
```vue
<div class="turmas-list">
  <EBadge 
    v-for="turma in turmas" 
    :key="turma" 
    variant="light" 
    pill
  >
    {{ turma }}
  </EBadge>
</div>
```

### Badge em Botão
```vue
<EButton variant="primary">
  Notificações 
  <EBadge variant="light" pill>
    {{ notificationCount }}
  </EBadge>
</EButton>
```

## Design System

Este componente segue as especificações do Design System Educacross:
- **Referência Storybook**: [DSBadge](https://storybook.educacross.com/?path=/story/components-badge)
- **Paleta de cores**: Vuexy Color Palette
- **Tokens**: Utiliza CSS custom properties do Design System

## Substituição de Badges Antigas

Este componente substitui badges genéricas do tipo:

```html
<!-- Antes -->
<span class="badge badge-primary">Texto</span>

<!-- Depois -->
<EBadge variant="primary">Texto</EBadge>
```

## CSS Custom Properties Utilizadas

- `--spacing-xs`, `--spacing-sm`, `--spacing-md`
- `--font-size-xs`
- `--radius-sm`, `--radius-full`
- `--primary`, `--secondary`, `--success`, `--info`, `--warning`, `--danger`
- `--white`, `--gray-200`, `--gray-900`
- `--transition-fast`

## Localização

- Componente: `FrontOffice/src/components/base/EBadge.vue`
- Exportado via: `FrontOffice/src/components/base/index.js`

## Status

✅ **Implementado** - Janeiro 2025  
✅ **Integrado no EventDrawer** - Substituiu badges genéricas
