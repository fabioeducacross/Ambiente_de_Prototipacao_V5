---
sidebar_position: 7
title: Sprint 3 — Fluxo Designer → Dev → Protótipo
description: Guia end-to-end do fluxo de trabalho entre designer, story, dev e protótipo usando o Design System Educacross.
---

# Sprint 3 — Fluxo Designer → Story → Dev → Protótipo

Data: 2026-03-10  
Status: **Validado**

---

## Visão Geral do Fluxo

O fluxo conecta três papéis — **Designer**, **Dev** e **IA** — usando o Design System como ponto de verdade único.

```text
Designer (Figma / especificação)
    ↓
Story (design-system/stories/)   ← catálogo visual interativo
    ↓
Spec JSON (design-system/specs/) ← contrato semântico de props/eventos
    ↓
Registry MCP (registry.json)     ← interface de máquina
    ↓
Dev / IA consome via MCP         ← produz código coerente
    ↓
Protótipo FrontOffice (Vue 3)    ← resultado final validável
```

---

## Passo 1 — Designer: especificar no Figma / doc

O designer define o componente com:

- variantes visuais (primary, secondary, danger…)
- estados (default, hover, loading, disabled, error)
- props esperadas (label, placeholder, size…)
- comportamento (quando emite evento, qual dado passa)

**Entrega:** especificação visual ou link de frame no Figma.

---

## Passo 2 — Dev DS: criar ou atualizar a Story

O dev do Design System traduz a especificação em uma Story Storybook:

```js
// design-system/stories/EButton.stories.js
import EButton from '../../FrontOffice/src/components/base/EButton.vue'

export default {
  title: 'Base/EButton',
  component: EButton,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'outline-primary'] },
    size:    { control: 'select', options: ['small', 'medium', 'large'] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
}

export const Primary = { args: { variant: 'primary' }, render: args => ({ components: { EButton }, setup: () => ({ args }), template: '<EButton v-bind="args">Salvar</EButton>' } ) }
export const Loading = { args: { variant: 'primary', loading: true }, render: Primary.render }
export const Disabled= { args: { variant: 'primary', disabled: true }, render: Primary.render }
```

**Verificar no Storybook:**

```bash
npm run dev:ds   # http://localhost:6006
```

---

## Passo 3 — Dev DS: atualizar a Spec JSON

Após validar a story, atualizar (ou criar) o contrato canônico:

```json
// design-system/specs/EButton.json
{
  "name": "EButton",
  "category": "base",
  "status": "nativo",
  "props": [
    { "name": "variant", "type": "string", "default": "primary", "values": ["primary", "secondary", "danger"] },
    { "name": "loading", "type": "boolean", "default": false, "description": "Exibe spinner" },
    { "name": "disabled","type": "boolean", "default": false }
  ],
  "events": [{ "name": "click", "description": "Emitido ao clicar (ignora se disabled ou loading)" }],
  "slots": [{ "name": "default", "description": "Texto ou conteúdo" }]
}
```

**Regra:** spec JSON é a fonte de verdade de API. A story demonstra, a spec contratua.

---

## Passo 4 — Dev DS: atualizar o Registry

Se o componente for novo, adicionar entrada no `registry.json`:

```json
{
  "name": "EButton",
  "category": "base",
  "status": "nativo",
  "description": "Botão de ação com suporte a variantes, tamanhos, loading e ícone.",
  "specFile": "design-system/specs/EButton.json",
  "sourceFile": "FrontOffice/src/components/base/EButton.vue",
  "storyFile": "design-system/stories/EButton.stories.js",
  "tags": ["button", "action", "cta", "form"]
}
```

O registry é consumido automaticamente pela tool `get_registry` do MCP.

---

## Passo 5 — Dev FrontOffice / IA: consumir via MCP

Ao implementar uma tela no FrontOffice, a IA (ou dev) consulta o MCP **antes** de escrever código:

```
1. get_registry { query: "form" }
   → Descobre quais componentes de formulário existem

2. get_spec { componentName: "EFormGroup" }
   → Conhece props: label, hint, error, required, for

3. get_spec { componentName: "EInput" }
   → Conhece props: modelValue, type, placeholder, size, state
```

A IA gera código Vue 3 **alinhado ao contrato real**:

```vue
<script setup>
import EFormGroup from '@/components/base/EFormGroup.vue'
import EInput     from '@/components/base/EInput.vue'
import EButton    from '@/components/base/EButton.vue'

const nome = ref('')
const loading = ref(false)
</script>

<template>
  <form @submit.prevent="salvar">
    <EFormGroup label="Nome do evento" for="nome" :required="true">
      <EInput id="nome" v-model="nome" placeholder="Ex: Prova de Matemática" />
    </EFormGroup>
    <EButton type="submit" variant="primary" :loading="loading">
      Criar evento
    </EButton>
  </form>
</template>
```

---

## Passo 6 — Validação no Protótipo

O resultado final é validado no FrontOffice em `http://localhost:5174`.

Checklist de validação:

- [ ] Componentes usam apenas props documentadas na spec
- [ ] Variantes visuais batem com as stories do Storybook
- [ ] Nenhuma cor hardcoded (usar `var(--primary)` etc.)
- [ ] Comportamento de loading/disabled funcional
- [ ] Layout responsivo com classes Bootstrap 5

---

## Exemplo Real: Formulário de Criação de Atividade

Este exemplo foi produzido seguindo o fluxo acima, usando exclusivamente componentes do registry:

| Componente | Spec | Story | FrontOffice |
|---|---|---|---|
| EFormGroup | ✅ | ✅ | `base/EFormGroup.vue` |
| EInput     | ✅ | ✅ | `base/EInput.vue` |
| ESelect    | ✅ | ✅ | `base/ESelect.vue` |
| EDatePicker| ✅ | ✅ | `base/EDatePicker.vue` |
| EButton    | ✅ | ✅ | `base/EButton.vue` |

**Resultado:** formulário funcional gerado pela IA sem divergências de API, sem props inventadas, sem variantes inexistentes.

---

## Resumo do Fluxo

```text
[Designer]  →  Figma / especificação textual
    ↓
[Dev DS]    →  Story (catálogo visual)  +  Spec JSON (contrato)
    ↓
[Registry]  →  registry.json  →  MCP tool get_registry / get_spec
    ↓
[Dev / IA]  →  consulta MCP antes de codar  →  código coerente
    ↓
[Protótipo] →  FrontOffice Vue 3  →  validação humana
```

**O Design System é o contrato único.** Storybook serve ao designer; Spec JSON serve à IA; FrontOffice implementa. Todos falam da mesma fonte.

---

## Referências

- Storybook interno: `npm run dev:ds` → `http://localhost:6006`
- Stories: `design-system/stories/`
- Specs: `design-system/specs/`
- Registry: `design-system/registry/registry.json`
- FrontOffice: `FrontOffice/src/components/base/`
- Governança: [Governança do Design System](./governanca.md)
