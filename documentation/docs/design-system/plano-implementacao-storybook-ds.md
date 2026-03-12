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

## Status Atual das Fases

<!-- DS_PHASE_STATUS:START -->
Atualizado em: 2026-03-12

Fase atual principal: **Fase 4 — Convergência com produção**

```text
>>> FASE ATUAL: 4

FASE 0  [##########] 100%  CONCLUIDA      Descoberta e mapeamento
FASE 1  [##########] 100%  CONCLUIDA      Storybook interno com a stack atual
FASE 2  [##########] 100%  CONCLUIDA      Camada canônica de contratos
FASE 3  [##########] 100%  CONCLUIDA      Registry para MCP
FASE 4  [#######---] 70%   EM ANDAMENTO   Convergência com produção
```

Resumo operacional:

- Sprints 0, 1 e 2 estão concluídas.
- O recorte 4.1-4.5 dos componentes-base foi fechado, cobrindo baseline local estrita, baseline verificável de produção, parity mínima do ESelect, convergência funcional do EButton e contrato canônico mínimo do EInput.
- A convergência total com produção segue parcial no macro do plano, agora dependente da expansão para componentes compostos e novos recortes além dos componentes-base.
- O status detalhado e cumulativo do plano continua em `status-plano-implementacao-storybook-ds.md`.
<!-- DS_PHASE_STATUS:END -->

## Hierarquia Operacional de Planos

Para esta iniciativa, a execucao deve obedecer a seguinte precedencia:

1. **Plano estrategico:** este documento.
2. **Plano executavel:** a story ativa em `docs/stories/`.
3. **Plano temporario de sessao:** qualquer arquivo em `.copilot/session-state/**/plan.md`.

### Regra de uso

- O plano de sessao nao define prioridade, fase ou escopo por conta propria.
- Ele so pode resumir o recorte atual ja aprovado no plano estrategico e na story ativa.
- Se houver conflito entre o plano de sessao e este documento, este documento prevalece.
- Se houver conflito entre este documento e a story ativa aprovada para execucao, a story prevalece no recorte tatico, mas nao pode violar a fase e a direcao definidas aqui.

### Regra pratica para agentes e CLI

Antes de continuar uma execucao do Design System, o agente deve responder internamente a 3 perguntas:

1. Em que fase deste plano a iniciativa esta?
2. Qual story ativa materializa esse recorte?
3. O plano de sessao apenas espelha essas duas respostas?

Se a resposta da pergunta 3 for nao, o plano de sessao deve ser tratado como contexto stale e nao como fonte de verdade.

## Graficos ASCII das Fases

### 1. Visao Macro do Plano

```text
+-------------------+     +-------------------------+     +--------------------------+
| FASE 0            | --> | FASE 1                 | --> | FASE 2                  |
| Descoberta        |     | Storybook interno      |     | Contratos canonicos     |
| e mapeamento      |     | com stack atual        |     | de componentes          |
+-------------------+     +-------------------------+     +--------------------------+
                            |
                            v
            +--------------------------+     +--------------------------+
            | FASE 3                  | --> | FASE 4                  |
            | Registry para MCP       |     | Convergencia com        |
            | e interface de maquina  |     | producao                |
            +--------------------------+     +--------------------------+
```

### 2. Dependencias Entre Fases

```text
FASE 0  [##########] Define inventario, taxonomia e matriz de equivalencia
   |
   +--> FASE 1  [##########] Cataloga componentes reais no Storybook interno
      |
      +--> FASE 2  [##########] Formaliza contratos canonicos
         |
         +--> FASE 3  [##########] Publica registry estruturado para MCP
            |
            +--> FASE 4  [##########] Converge tokens e componentes com producao

Regra de leitura:
- Fase 0 reduz ambiguidade antes de catalogar.
- Fase 1 documenta o que existe de verdade.
- Fase 2 transforma catalogo visual em contrato semantico.
- Fase 3 expoe a mesma verdade para IA e humanos.
- Fase 4 aproxima prototipo e producao sem copia manual.
```

### 3. Mapeamento Fases x Sprints

```text
Sprint 0  -> [FASE 0] Descoberta e mapeamento
Sprint 1  -> [FASE 1] Storybook interno + primeiro lote de componentes-base
Sprint 2  -> [FASE 2] Contratos canonicos + [FASE 3] Registry inicial para MCP
Sprint 3  -> [FASE 4] Validacao de consumo por IA + fluxo designer -> story -> dev -> prototipo + primeira convergencia com producao
```

### 4. Leitura Rapida por Objetivo

```text
FASE 0 = Descobrir o que existe
FASE 1 = Catalogar o que ja funciona
FASE 2 = Formalizar o contrato
FASE 3 = Expor a verdade para MCP
FASE 4 = Convergir com producao
```

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

### Sprint 0

1. Criar inventário do FrontOffice por categoria.
2. Selecionar componentes prioritários do legado.
3. Produzir matriz de equivalência.
4. Definir taxonomia canônica.
5. Definir estrutura do asset `design-system/`.

### Sprint 1

1. Subir Storybook interno.
2. Publicar stories do primeiro lote de componentes-base.
3. Garantir uso dos tokens atuais do FrontOffice.
4. Marcar referência equivalente do legado nas stories.

### Sprint 2

1. Formalizar schema de contratos.
2. Criar registry inicial para MCP.
3. Publicar documentação de contribuição e governança.

### Sprint 3

1. Validar consumo por IA via MCP.
2. Validar fluxo designer → story → dev → protótipo.
3. Planejar primeira convergência com produção.

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
