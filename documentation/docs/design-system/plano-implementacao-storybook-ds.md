---
sidebar_position: 2
title: Plano de Implementação do Storybook e Design System
description: Plano de transição para internalizar o catálogo de componentes e evoluir o Design System para fonte única da verdade.
---

# Plano de Implementação do Storybook e Design System

Este documento define o plano de execução para trazer o Storybook para dentro do repositório, considerando simultaneamente:

- a stack ativa de prototipação em Vue 3,
- a stack legada usada como referência visual e estrutural,
- a necessidade de o Design System servir a designers, desenvolvedores, IA e humanos via MCP,
- a meta de transformar o Design System em fonte única da verdade para produção e protótipos.

---

## Status de Conclusão

> **Última atualização:** março/2026 — auditoria automática do repositório.

### Visão Geral

| Métrica | Valor |
|---|---|
| **Conclusão geral estimada** | **≈ 60 %** |
| Fases com progresso significativo | Fases 0, 1, 2 e 3 |
| Fase pendente | Fase 4 — Convergência com Produção |
| Frente mais atrasada | Governança |

### Por Fase

| Fase | Nome | Progresso | Situação |
|---|---|---|---|
| Marco Inicial | Pré-requisitos para execução | 100 % | ✅ Concluído |
| Fase 0 | Descoberta e Mapeamento | ≈ 60 % | 🟡 Parcialmente concluído |
| Fase 1 | Storybook Interno + Componentes-Base | ≈ 90 % | ✅ Quase completo |
| Fase 2 | Contratos Canônicos | ≈ 85 % | ✅ Quase completo |
| Fase 3 | Registry para MCP | ≈ 70 % | 🟡 Em progresso |
| Fase 4 | Convergência com Produção | ≈ 20 % | 🔴 Não iniciado (exceto tokens) |

### Por Frente de Trabalho

| Frente | Progresso | Observação |
|---|---|---|
| Catálogo (Storybook) | ≈ 90 % | `.storybook/`, 10 stories e estrutura completos |
| Tokens | ≈ 80 % | `tokens.json` + `tokens.css` extraídos; gap analysis ausente |
| Componentes (specs) | ≈ 80 % | 10 specs JSON com props, slots, variantes e a11y |
| MCP (registry) | ≈ 70 % | `registry.json` e servidor MCP existem; validação de consumo pendente |
| Governança | ≈ 10 % | Sem documento de contribuição ou processo de aprovação |

### Por Sprint

| Sprint | Itens | Progresso |
|---|---|---|
| Sprint 0 — Descoberta | 5 itens | ≈ 60 % |
| Sprint 1 — Storybook + Stories | 4 itens | ≈ 95 % |
| Sprint 2 — Contratos + Registry | 3 itens | ≈ 65 % |
| Sprint 3 — Validação e Convergência | 3 itens | ≈ 10 % |

### O que está concluído

- ✅ Asset `design-system/` criado com estrutura completa (`.storybook/`, `stories/`, `specs/`, `tokens/`, `registry/`, `adapters/vue3/`)
- ✅ Storybook 8.x configurado com Vue 3 + Bootstrap 5 (`package.json`, `.storybook/main.js`, `preview.js`)
- ✅ 10 componentes da primeira onda com story, spec JSON e export no adapter (`EButton`, `EInput`, `ESelect`, `ETextarea`, `EFormGroup`, `EBadge`, `EModal`, `EConfirmDialog`, `EDatePicker`, `MaterialIcon`)
- ✅ Tokens consolidados em `tokens/tokens.json` e `tokens/tokens.css` (cores, tipografia, espaçamento, sombras, motion)
- ✅ `registry/registry.json` com links entre spec, story, sourceFile e adapterFile para todos os 10 componentes
- ✅ Servidor MCP `mcp-design-system` operacional para lookup de componentes
- ✅ Status de cada componente marcado no registry (`nativo`, `adaptado`, `espelhado`, `divergente`)
- ✅ `legacyRef` em todas as specs apontando para o Storybook legado externo

### O que está pendente

- 🔴 **Fase 4** — Convergência com produção: tokens convergidos, mas componentes-base e compostos ainda não
- 🔴 **Governança** — Sem doc de contribuição, processo de aprovação ou regra anti-duplicação documentados
- 🟡 **Matriz legado → Vue 3 → canônico** — Implícita no campo `status` do registry, mas sem documento formal separado
- 🟡 **Validação do fluxo MCP** — Registry existe, mas consumo por IA não foi validado e documentado
- 🟡 **Sprint 3** — Validação ponta-a-ponta (designer → story → dev → protótipo) não executada
- 🟡 **Análise de gaps de tokens** — Tokens documentados, mas gaps em relação ao legado não foram mapeados

---

## Objetivo

Construir, dentro deste repositório, um asset de Design System que cumpra 3 funções ao mesmo tempo:

1. Ser guia de componentes para designers e programadores.
2. Ser guia consumível por IA e humanos via MCP.
3. Evoluir para fonte única da verdade para produção e protótipos.

---

## Contexto Atual

### Stack ativa

- FrontOffice em Vue 3 + Vite + Bootstrap 5 + bootstrap-vue-next.
- Componentes já existentes em `FrontOffice/src/components/`.
- Tokens e variáveis CSS já presentes em `FrontOffice/src/style.css`.
- Documentação editorial e técnica na wiki Docusaurus em `documentation/`.

### Stack legada / referencial

- Design System Vuexy publicado externamente em Storybook.
- Componentes HTML-based, framework-agnostic.
- Consumo atual por referência visual, cópia/adaptação e fluxo via MCP.

### Problema atual

Hoje existem duas verdades parciais:

1. A verdade visual e de referência, fora deste repositório.
2. A verdade de implementação parcial, dentro do FrontOffice em Vue 3.

Enquanto isso não for convergido, o time mantém risco de drift entre:

- referência visual,
- documentação,
- implementação de protótipo,
- futuras implementações de produção.

---

## Decisão de Arquitetura

### O que este plano faz

- Internaliza o Storybook no repositório.
- Usa o Storybook interno como catálogo vivo dos componentes reais e canônicos.
- Mantém o legado como baseline de referência durante a transição.
- Introduz uma camada estruturada para MCP baseada em contratos de componente.

### O que este plano não faz agora

- Não migra todos os componentes legados para Vue 3 de uma vez.
- Não substitui imediatamente o Storybook legado externo.
- Não exige compartilhar a mesma implementação entre produção e protótipo no primeiro ciclo.

### Princípio central

O Storybook não deve ser a fonte única da verdade por si só.

A fonte única da verdade deve ser o conjunto:

1. tokens,
2. contratos de componente,
3. implementações por stack,
4. stories e documentação,
5. registry consumível por MCP.

O Storybook será a principal interface humana dessa fonte.

---

## Arquitetura-Alvo

### Assets do repositório

1. `FrontOffice/`
   Protótipos interativos em Vue 3.

2. `documentation/`
   Wiki editorial, técnica e de decisão.

3. `design-system/`
   Novo asset dedicado ao catálogo canônico do Design System.

### Estrutura proposta para o novo asset

```text
design-system/
├── .storybook/
├── stories/
├── tokens/
├── specs/
├── registry/
├── adapters/
│   └── vue3/
└── package.json
```

### Papel de cada camada

- `tokens/`: cores, tipografia, espaçamento, radius, sombras, motion e aliases semânticos.
- `specs/`: contratos canônicos dos componentes.
- `registry/`: saída estruturada para MCP.
- `adapters/vue3/`: wrappers ou implementações Vue 3 canônicas.
- `stories/`: documentação viva, estados e exemplos reais.

---

## Estratégia de Transição

### Modelo operacional

Durante a transição existirão 3 níveis de verdade:

1. **Verdade visual**: Storybook legado externo.
2. **Verdade de implementação atual**: FrontOffice Vue 3.
3. **Verdade canônica futura**: Design System internalizado neste repositório.

### Regra de convergência

Todo componente deverá cair em uma destas categorias:

1. **Já existe em Vue 3 e pode ser catalogado agora**.
2. **Existe em Vue 3, mas precisa de refino para virar canônico**.
3. **Existe só no legado e precisa de spec antes de adaptação**.
4. **Existe só no legado e não é prioritário agora**.

---

## Fases de Execução

## Fase 0 — Descoberta e Mapeamento

### Objetivo

Mapear o inventário atual e estabelecer a taxonomia canônica.

### Entregáveis

1. Inventário de componentes do FrontOffice.
2. Inventário dos componentes prioritários do Storybook legado.
3. Matriz legado → Vue 3 → canônico.
4. Taxonomia oficial de categorias e nomenclatura.
5. Lista de tokens já existentes e gaps.

### Critérios de saída

- Os componentes prioritários do próximo ciclo estão classificados.
- O time sabe o que catalogar, adaptar, especificar ou adiar.

---

## Fase 1 — Subir o Storybook Interno com a Stack Atual

### Objetivo

Criar o terceiro asset dentro do repositório e documentar primeiro o que já existe de verdade no FrontOffice.

### Escopo inicial

1. Componentes base.
2. Atoms e molecules mais reutilizados.
3. Padrões compartilhados críticos de layout e navegação.

### Primeira onda recomendada

1. `EButton`
2. `EInput`
3. `ESelect`
4. `ETextarea`
5. `EFormGroup`
6. `EBadge`
7. `EModal`
8. `EConfirmDialog`
9. `EDatePicker`
10. `MaterialIcon`

### Resultado esperado

- O repositório passa a ter um Storybook próprio.
- O catálogo interno passa a documentar componentes reais da stack Vue 3.
- Cada story pode referenciar o equivalente legado quando houver.

### Critérios de saída

- Storybook sobe localmente sem depender da wiki ou do app.
- Primeiro conjunto de componentes-base renderiza com estados principais.
- Cada story documenta status do componente: `espelhado`, `adaptado`, `nativo`, `divergente`.

---

## Fase 2 — Camada Canônica de Contratos

### Objetivo

Parar de depender de markup copiado e introduzir uma semântica estável para consumo por humanos e IA.

### Cada componente canônico deve ter

1. Nome oficial.
2. Categoria.
3. Descrição.
4. Props.
5. Slots.
6. Variantes.
7. Estados.
8. Regras de uso.
9. Regras de acessibilidade.
10. Referência visual no legado.
11. Referência da implementação Vue 3.

### Resultado esperado

- O catálogo deixa de ser só visual.
- O Design System ganha contratos versionáveis.

---

## Fase 3 — Registry para MCP

### Objetivo

Fazer o MCP consumir a mesma verdade semântica do catálogo.

### Diretriz

O MCP não deve raspar HTML do Storybook como mecanismo principal.

Ele deve consumir um `registry` estruturado gerado a partir dos contratos e apontar para:

1. tokens,
2. specs,
3. stories,
4. implementação Vue 3 disponível,
5. exemplos de uso.

### Resultado esperado

- IA e humanos passam a consultar a mesma estrutura.
- O Storybook vira interface humana; o registry vira interface de máquina.

---

## Fase 4 — Convergência com Produção

### Objetivo

Reduzir a distância entre protótipo e produção por contratos e tokens, não por cópia manual.

### Estratégia

1. Convergir tokens primeiro.
2. Convergir componentes-base depois.
3. Convergir componentes compostos por último.

### Regra

Produção e protótipo não precisam compartilhar os mesmos arquivos no início.

Mas precisam convergir para a mesma semântica de componente e para a mesma linguagem visual.

---

## Frentes de Trabalho

## 1. Catálogo

- Instalar e configurar Storybook para a stack Vue 3.
- Criar a estrutura inicial de stories.
- Definir nomenclatura e organização por categoria.

## 2. Tokens

- Extrair e consolidar os tokens existentes do FrontOffice.
- Diferenciar tokens primitivos e tokens semânticos.
- Planejar futura exportação para outros consumidores.

## 3. Componentes

- Eleger o conjunto mínimo de componentes canônicos.
- Padronizar props, slots, estados e nomenclatura.
- Formalizar wrappers Vue 3 quando necessário.

## 4. MCP

- Definir o schema do registry.
- Estabelecer lookup por nome, categoria, variante e estado.
- Expor links entre spec, story e implementação.

## 5. Governança

- Definir quem aprova mudanças visuais, contratuais e técnicas.
- Criar regras para entrada de novos componentes.
- Proibir criação de componente novo sem busca prévia em catálogo e registry.

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Duplicação de componente entre legado e Vue 3 | Alto | Criar matriz de equivalência antes da fase 1 |
| Storybook nascer como espelho manual | Alto | Catalogar primeiro o que já existe e formalizar contratos |
| MCP acoplado a HTML copiado | Alto | Fazer MCP consumir registry estruturado |
| Drift de tokens entre stacks | Alto | Consolidar tokens como camada separada |
| Escopo explodir para migração total | Alto | Trabalhar por prioridade e por componente-base |

---

## Não Escopo Inicial

Fica explicitamente fora do primeiro ciclo:

1. Migrar todos os componentes do legado para Vue 3.
2. Tornar produção e protótipo consumidores da mesma implementação imediatamente.
3. Reescrever o DS legado externo antes de validar a nova arquitetura interna.
4. Cobrir páginas completas antes de estabilizar componentes-base e contratos.

---

## Marco de Início da Execução

O trabalho pode começar quando estes 5 itens estiverem aprovados:

1. Estrutura alvo com terceiro asset `design-system/`.
2. Taxonomia inicial de componentes.
3. Lista da primeira onda de componentes-base.
4. Diretriz oficial de que o legado será baseline de referência, não runtime canônico.
5. Diretriz oficial de que o MCP consumirá registry estruturado.

---

## Backlog Inicial Recomendado

### Sprint 0 — ≈ 60 % concluído

1. ✅ Criar inventário do FrontOffice por categoria.
2. 🟡 Selecionar componentes prioritários do legado. _(implícito via `legacyRef` nas specs; documento formal ausente)_
3. 🔴 Produzir matriz de equivalência. _(não gerada como artefato separado)_
4. ✅ Definir taxonomia canônica. _(campo `category` no registry: `base`, `atom`, `molecule`, `organism`, `template`)_
5. ✅ Definir estrutura do asset `design-system/`.

### Sprint 1 — ≈ 95 % concluído

1. ✅ Subir Storybook interno. _(`.storybook/` + `package.json` com Storybook 8.x)_
2. ✅ Publicar stories do primeiro lote de componentes-base. _(10 stories criadas)_
3. ✅ Garantir uso dos tokens atuais do FrontOffice. _(`tokens.css` + `tokens.json` extraídos)_
4. ✅ Marcar referência equivalente do legado nas stories. _(campo `legacyRef` nas 10 specs)_

### Sprint 2 — ≈ 65 % concluído

1. ✅ Formalizar schema de contratos. _(10 specs JSON com props, slots, variantes, estados, a11y)_
2. ✅ Criar registry inicial para MCP. _(`registry/registry.json` completo)_
3. 🔴 Publicar documentação de contribuição e governança. _(pendente)_

### Sprint 3 — ≈ 10 % concluído

1. 🔴 Validar consumo por IA via MCP. _(servidor MCP existe; validação formal não documentada)_
2. 🔴 Validar fluxo designer → story → dev → protótipo. _(não executado)_
3. 🔴 Planejar primeira convergência com produção. _(tokens convergidos; demais etapas não planejadas formalmente)_

---

## Critérios de Sucesso

O plano será considerado bem-sucedido quando:

1. Designers, devs e IA consultarem o mesmo catálogo interno.
2. O catálogo interno documentar componentes reais e não apenas referências visuais.
3. O MCP conseguir localizar componentes a partir de dados estruturados.
4. O protótipo usar o catálogo interno como referência principal.
5. O legado externo deixar de ser dependência operacional e passar a ser apenas baseline comparativa.

---

## Próximo Documento Operacional

Após aprovação deste plano, o próximo artefato a ser produzido deve ser:

**Matriz de Migração e Canonicalização de Componentes**

Esse documento deverá listar, para cada componente prioritário:

1. origem,
2. status atual,
3. criticidade,
4. prioridade,
5. ação recomendada: `catalogar`, `adaptar`, `especificar`, `adiar`.
