# Guia de Contribuição — Design System Educacross

> Documento de governança para adição, manutenção e evolução de componentes no `design-system/`.
> Leia este guia antes de abrir qualquer PR que crie ou modifique um componente.

---

## 1. Regras para Entrada de Novo Componente

### 1.1 Busca prévia obrigatória

Antes de propor um novo componente, o contribuidor **deve** realizar as duas buscas abaixo e documentar os resultados:

| Busca | Como executar |
|---|---|
| No registry do Design System | Tool MCP `get_registry` ou ler diretamente `design-system/registry/registry.json` |
| No FrontOffice | Procurar em `FrontOffice/src/components/` por arquivo `.vue` com nome ou propósito equivalente |

**Regra de entrada:** um componente só entra no `design-system/` se não houver equivalente funcional já registrado. Variações visuais ou de comportamento menores do mesmo componente devem ser tratadas como **variantes** ou **estados** dentro do componente existente — e não como componentes separados.

### 1.2 Critérios para um componente ser aceito

Para que um novo componente entre no Design System, ele precisa atender **todos** os critérios abaixo:

1. **Não existe equivalente** no registry (`design-system/registry/registry.json`) nem em `FrontOffice/src/components/`.
2. **Possui spec JSON canônica** criada em `design-system/specs/{NomeComponente}.json` conforme o [schema definido na seção 4](#4-schema-da-spec-json).
3. **Possui story** criada em `design-system/stories/{NomeComponente}.stories.js` que renderiza no Storybook local.
4. **Possui fonte Vue 3** em `FrontOffice/src/components/` (novo arquivo ou componente existente já catalogado).
5. **Está registrado** em `design-system/registry/registry.json` com todos os campos obrigatórios.
6. **Está exportado** em `design-system/adapters/vue3/index.js`.

---

## 2. Status de Componente

Todo componente do Design System carrega um campo `status` que descreve sua maturidade e relação com o legado:

| Status | Significado |
|---|---|
| `nativo` | Criado nativamente para o FrontOffice Vue 3. Não tem equivalente direto no legado ou diverge conscientemente desde a concepção. |
| `adaptado` | Originalmente baseado ou inspirado no legado, mas com ajustes estruturais, de props ou de comportamento para Vue 3. A interface pública pode diferir do legado. |
| `espelhado` | Cópia fiel do legado, ainda não adaptada para Vue 3. Mantém a mesma interface pública do componente legado. Deve ser evoluída para `adaptado` ou `nativo` em sprint futuro. |
| `divergente` | A implementação diverge intencionalmente do legado em aspectos visuais, comportamentais ou contratuais. A divergência deve ser documentada no campo `notes` da spec. |

> **Regra:** Componentes com status `espelhado` não devem ser promovidos a canônicos sem revisão de contrato. Componentes com status `divergente` devem ter a razão da divergência documentada explicitamente na spec.

---

## 3. Checklist para Novo Componente

Use este checklist em toda PR que adicionar um novo componente:

- [ ] Busca prévia realizada no registry (`get_registry` ou `registry.json`) — sem equivalente encontrado
- [ ] Busca prévia realizada em `FrontOffice/src/components/` — sem equivalente encontrado
- [ ] Spec JSON criada em `design-system/specs/{NomeComponente}.json`
- [ ] Spec JSON validada (sem erros de sintaxe JSON)
- [ ] Story criada em `design-system/stories/{NomeComponente}.stories.js`
- [ ] Story renderiza no Storybook local (`npm run dev:ds` na raiz de `design-system/`)
- [ ] Fonte Vue criada ou identificada em `FrontOffice/src/components/`
- [ ] Entry adicionado em `design-system/registry/registry.json` com todos os campos obrigatórios
- [ ] Export adicionado em `design-system/adapters/vue3/index.js`
- [ ] Status do componente definido corretamente (veja [seção 2](#2-status-de-componente))
- [ ] Acessibilidade documentada no campo `a11y` da spec

---

## 4. Schema da Spec JSON

Toda spec canônica fica em `design-system/specs/{NomeComponente}.json`.

### 4.1 Campos obrigatórios

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | `string` | Nome oficial do componente em PascalCase (ex: `"EButton"`) |
| `category` | `string` | Categoria de agrupamento (ex: `"base"`, `"form"`, `"feedback"`) |
| `description` | `string` | Descrição funcional em uma ou duas frases |
| `status` | `string` | Um de: `nativo`, `adaptado`, `espelhado`, `divergente` |
| `source` | `string` | Caminho relativo ao arquivo Vue fonte (ex: `"FrontOffice/src/components/base/EButton.vue"`) |
| `props` | `array` | Lista de objetos de prop (ver [4.2](#42-schema-de-prop)) |

### 4.2 Schema de prop

Cada item do array `props` deve conter:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | sim | Nome da prop em camelCase |
| `type` | `string` | sim | Tipo TypeScript/JavaScript (`string`, `boolean`, `number`, `array`, `object`) |
| `default` | `any` | sim | Valor padrão da prop |
| `description` | `string` | sim | O que a prop controla |
| `values` | `array` | não | Lista de valores aceitos (para enums/unions) |
| `required` | `boolean` | não | Se a prop é obrigatória (default: `false`) |

### 4.3 Campos opcionais

| Campo | Tipo | Descrição |
|---|---|---|
| `legacyRef` | `string` | URL do componente equivalente no Storybook legado |
| `slots` | `array` | Lista de objetos `{ name, description }` dos slots disponíveis |
| `events` | `array` | Lista de objetos `{ name, description }` dos eventos emitidos |
| `variants` | `array` | Atalho para os valores aceitos pela prop `variant` |
| `states` | `array` | Estados visuais documentados (ex: `"hover"`, `"disabled"`, `"loading"`) |
| `a11y` | `array` | Diretrizes de acessibilidade específicas do componente |
| `notes` | `string` | Observações adicionais, especialmente para status `divergente` |
| `usageRules` | `array` | Regras de uso (quando usar, quando não usar) |

### 4.4 Exemplo mínimo de spec

```json
{
  "name": "EBadge",
  "category": "base",
  "description": "Badge para status, categorias e contadores.",
  "status": "nativo",
  "source": "FrontOffice/src/components/base/EBadge.vue",
  "props": [
    {
      "name": "variant",
      "type": "string",
      "default": "primary",
      "values": ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"],
      "description": "Variante visual do badge"
    },
    {
      "name": "pill",
      "type": "boolean",
      "default": false,
      "description": "Aplica bordas arredondadas no estilo pill"
    }
  ],
  "slots": [
    { "name": "default", "description": "Conteúdo do badge" }
  ],
  "variants": ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"],
  "states": ["default"],
  "a11y": [
    "Fornecer contexto semântico ao redor do badge quando usado como indicador de status"
  ]
}
```

---

## 5. Regras de Nomenclatura

### 5.1 Nome de componente

- **PascalCase** sempre: `EButton`, `EFormGroup`, `MaterialIcon`.
- **Prefixo `E`** obrigatório para todos os componentes base do Design System Educacross (ex: `EButton`, `EInput`, `ESelect`).
- **Exceção ao prefixo `E`**: componentes wrappers de bibliotecas externas mantêm o nome da biblioteca quando apropriado (ex: `MaterialIcon`).
- **Sem abreviações ambíguas**: prefira `EConfirmDialog` a `EConfirmDlg`.

### 5.2 Nome de arquivos

| Artefato | Padrão | Exemplo |
|---|---|---|
| Fonte Vue | `{NomeComponente}.vue` | `EButton.vue` |
| Spec JSON | `{NomeComponente}.json` | `EButton.json` |
| Story | `{NomeComponente}.stories.js` | `EButton.stories.js` |

### 5.3 Nome de props, events e slots

- **Props**: camelCase (`modelValue`, `showHeader`, `closeOnEsc`).
- **Eventos**: camelCase sem prefixo `on` no nome emitido (`click`, `update:modelValue`, `close`).
- **Slots**: kebab-case ou camelCase consistente com o padrão já adotado no componente.

### 5.4 Categorias aceitas

| Categoria | Descrição |
|---|---|
| `base` | Componentes atômicos: inputs, buttons, badges, modals, ícones |
| `form` | Componentes de formulário compostos ou especializados |
| `layout` | Componentes de estrutura de página e grid |
| `navigation` | Menus, sidebars, breadcrumbs, tabs |
| `feedback` | Alertas, toasts, spinners, progress |
| `data` | Tabelas, listas, cards de dados |

> Categorias novas só são criadas mediante decisão registrada no `design-system/CONTRIBUTING.md`.

---

## 6. Processo de Revisão

1. **Abrir PR** com todos os itens do [checklist da seção 3](#3-checklist-para-novo-componente) marcados.
2. **Revisão técnica**: verificar se a spec JSON está válida e completa, se a story renderiza e se o componente Vue está funcional.
3. **Revisão de governança**: verificar se não há duplicata no registry, se o status está correto e se o nome segue as convenções.
4. **Merge**: somente após aprovação dos dois revisores ou do mantenedor do Design System.

---

## 7. Referências

- Registry canônico: `design-system/registry/registry.json`
- Tokens: `design-system/tokens/tokens.json`
- Adaptadores Vue 3: `design-system/adapters/vue3/index.js`
- Plano de implementação: `documentation/docs/design-system/plano-implementacao-storybook-ds.md`
- Página wiki de governança: `documentation/docs/design-system/governanca.md`
- Storybook local: `cd design-system && npm run dev:ds` (porta 6006)
