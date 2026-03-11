---
sidebar_position: 4
title: Governança do Design System
description: Modelo de governança, regras de contribuição, status dos componentes e uso das ferramentas MCP do Design System Educacross.
---

# Governança do Design System

Este documento descreve o modelo de governança do Design System Educacross: como ele é organizado, quais são as regras para adicionar ou modificar componentes, como usar as ferramentas MCP para consultá-lo e qual é o estado atual do catálogo.

---

## 1. Visão Geral do Modelo de Governança

O Design System Educacross opera como **fonte única da verdade** para componentes visuais utilizados em protótipos e, progressivamente, em produção. Ele é estruturado em torno de três princípios:

1. **Contratos explícitos**: cada componente tem uma spec JSON canônica que define sua interface pública (props, slots, eventos, variantes e estados).
2. **Registry consumível por máquinas**: o arquivo `registry.json` é a interface de máquina do Design System, consumido pelo servidor MCP para consultas de IA.
3. **Governança por checklist**: nenhum componente entra no catálogo sem passar pelo checklist de contribuição documentado em `design-system/CONTRIBUTING.md`.

> Regra fundamental: **nunca crie um componente novo sem antes consultar o registry e o FrontOffice**. Duplicatas aumentam drift e custo de manutenção.

### Hierarquia operacional de contexto

Para evitar que ferramentas de IA ou CLIs executem um plano stale, a governança do Design System adota esta hierarquia operacional:

1. `documentation/docs/design-system/plano-implementacao-storybook-ds.md` = fonte de verdade estratégica.
2. `docs/stories/*.md` = fonte de verdade executável por recorte.
3. `.copilot/session-state/**/plan.md` = memória temporária de sessão.

Regra: nenhum plano temporário de sessão pode redefinir escopo, fase ou prioridade fora do que já está estabelecido no plano estratégico e na story ativa.

---

## 2. Os Três Assets e Seus Papéis

O Design System Educacross é distribuído em três assets dentro deste repositório, cada um com responsabilidade distinta:

### `FrontOffice/`

**Papel:** fonte de implementação de protótipos interativos em Vue 3.

- Contém os arquivos `.vue` canônicos de cada componente.
- É a fonte de verdade de implementação — o que roda nos protótipos.
- Componentes em `FrontOffice/src/components/base/` são os candidatos naturais ao catálogo.

### `documentation/`

**Papel:** wiki editorial, técnica e de decisão.

- Wiki Docusaurus com documentação de produto, personas, jornadas, decisões e guias técnicos.
- Esta página faz parte deste asset.
- Não contém implementação — contém contexto, decisões e orientação.

### `design-system/`

**Papel:** catálogo canônico do Design System. É o terceiro asset, criado especificamente para centralizar contratos, tokens e documentação consumível por humanos e IA.

| Subpasta | Conteúdo |
|---|---|
| `specs/` | Contratos canônicos JSON — um arquivo por componente |
| `tokens/` | Tokens de design (cores, tipografia, espaçamento) |
| `registry/` | `registry.json` — interface de máquina para MCP |
| `adapters/vue3/` | Re-exports dos componentes Vue 3 do FrontOffice |
| `stories/` | Stories do Storybook — interface humana do catálogo |
| `.storybook/` | Configuração do Storybook interno |

---

## 3. Regras para Novos Componentes

Esta seção é um resumo das regras completas documentadas em [`design-system/CONTRIBUTING.md`](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/blob/main/design-system/CONTRIBUTING.md).

### 3.1 Busca prévia obrigatória

Antes de propor qualquer componente novo, o contribuidor deve:

1. Consultar o registry: executar a tool MCP `get_registry` ou ler `design-system/registry/registry.json`.
2. Verificar `FrontOffice/src/components/` por arquivo `.vue` equivalente.

**Um componente só entra se não houver equivalente funcional já registrado.**

### 3.2 Requisitos mínimos de entrada

Para ser aceito, o componente precisa ter:

- ✅ Spec JSON em `design-system/specs/{NomeComponente}.json`
- ✅ Story em `design-system/stories/{NomeComponente}.stories.js` (renderiza no Storybook)
- ✅ Fonte Vue em `FrontOffice/src/components/`
- ✅ Entry em `design-system/registry/registry.json`
- ✅ Export em `design-system/adapters/vue3/index.js`

### 3.3 Nomenclatura

- **PascalCase** para nomes de componente: `EButton`, `EFormGroup`.
- **Prefixo `E`** obrigatório para componentes base Educacross.
- **Exceção**: wrappers de bibliotecas externas mantêm o nome da biblioteca (`MaterialIcon`).
- Props em **camelCase**, eventos sem prefixo `on`.

---

## 4. Status dos Componentes Atuais

O Design System conta atualmente com **10 componentes catalogados**, todos na categoria `base`.

| Componente | Categoria | Status | Descrição |
|---|---|---|---|
| `EButton` | base | `nativo` | Botão de ação com variantes, tamanhos, loading e ícone |
| `EInput` | base | `nativo` | Campo de input com tipos HTML, tamanhos e estados de validação |
| `ESelect` | base | `adaptado` | Select customizado com múltipla seleção, busca e limpeza |
| `ETextarea` | base | `nativo` | Área de texto multilinha com contador e resize |
| `EFormGroup` | base | `nativo` | Container de campo com label, hint e mensagem de erro |
| `EBadge` | base | `nativo` | Badge para status, categorias e contadores |
| `EModal` | base | `nativo` | Modal com header/body/footer, tamanhos e backdrop |
| `EConfirmDialog` | base | `nativo` | Dialog de confirmação com ícone, variante e botões configuráveis |
| `EDatePicker` | base | `adaptado` | Date picker com configuração flatpickr simplificada |
| `MaterialIcon` | base | `nativo` | Ícone Material Symbols Outlined com tamanho configurável |

### Legenda de status

| Status | Definição |
|---|---|
| `nativo` | Criado nativamente para o FrontOffice Vue 3 |
| `adaptado` | Adaptado do legado com ajustes de interface para Vue 3 |
| `espelhado` | Cópia fiel do legado, ainda não adaptada para Vue 3 |
| `divergente` | Implementação diverge intencionalmente do legado (motivo documentado na spec) |

---

## 5. Como Usar as Ferramentas MCP

O servidor MCP do Design System (`mcp-design-system/server.cjs`) expõe ferramentas para consulta programática do catálogo. Abaixo estão os exemplos das duas principais ferramentas de governança.

### 5.1 `get_registry` — Listar todos os componentes

Retorna o `registry.json` completo com metadados de todos os componentes catalogados.

**Quando usar:**
- Antes de propor um novo componente (busca prévia obrigatória).
- Para obter visão geral do catálogo atual.
- Para verificar o status de um conjunto de componentes.

**Exemplo de query (via MCP):**

```json
{
  "tool": "get_registry"
}
```

**Retorno esperado:** objeto com `meta`, `components` (array com 10 entradas), `statusLegend` e `categories`.

**Filtro útil — buscar por status:**

Para filtrar por status `adaptado`, percorra o array `components` e filtre por `status === "adaptado"`. O resultado atual retornaria `ESelect` e `EDatePicker`.

---

### 5.2 `get_spec` — Obter a spec canônica de um componente

Retorna o contrato completo (props, slots, eventos, variantes, estados e regras de acessibilidade) de um componente específico.

**Quando usar:**
- Antes de implementar ou modificar um componente — verificar a interface pública.
- Para gerar código Vue 3 com as props corretas.
- Para documentar uso em PR ou em wiki.

**Exemplo de query (via MCP):**

```json
{
  "tool": "get_spec",
  "params": { "name": "EButton" }
}
```

**Retorno esperado:** objeto JSON com `name`, `category`, `description`, `status`, `source`, `props`, `slots`, `events`, `variants`, `states` e `a11y`.

**Exemplos de uso comuns:**

```json
{ "tool": "get_spec", "params": { "name": "EModal" } }
{ "tool": "get_spec", "params": { "name": "EFormGroup" } }
{ "tool": "get_spec", "params": { "name": "ESelect" } }
```

---

### 5.3 Outras ferramentas disponíveis

| Tool | Descrição |
|---|---|
| `list_components` | Lista resumida dos componentes (nomes e categorias) |
| `get_component` | Detalhe completo de um componente via registry |
| `search_component` | Busca por nome, categoria ou tag |
| `get_consts` | Retorna constantes e tokens do Design System |
| `get_scss` | Retorna variáveis SCSS e tokens CSS |

---

## 6. Links e Referências

| Recurso | Caminho |
|---|---|
| Regras completas de contribuição | [`design-system/CONTRIBUTING.md`](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/blob/main/design-system/CONTRIBUTING.md) |
| Plano de implementação do DS | [`documentation/docs/design-system/plano-implementacao-storybook-ds.md`](./plano-implementacao-storybook-ds) |
| Status de execução do plano | [`documentation/docs/design-system/status-plano-implementacao-storybook-ds.md`](./status-plano-implementacao-storybook-ds) |
| Registry canônico | `design-system/registry/registry.json` |
| Specs canônicas | `design-system/specs/` |
| Tokens | `design-system/tokens/tokens.json` |
| Storybook local | `cd design-system && npm run dev:ds` → [http://localhost:6006](http://localhost:6006) |
