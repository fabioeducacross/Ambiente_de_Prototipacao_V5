---
sidebar_position: 8
title: Benchmark de Versionamento no Drawer
description: Referencias e matriz comparativa para evoluir o versionamento de jornadas dentro do drawer.
---

# Benchmark de Versionamento no Drawer

## Objetivo

Avaliar referencias de mercado para definir um modelo de versoes de jornada dentro do drawer do FrontOffice, com foco em:

- contexto de pesquisa e documentacao
- rastreabilidade de mudancas
- comparacao entre versoes
- governanca de publicacao

## Fontes usadas

- Figma Version History: https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history
- Google Docs Version History: https://support.google.com/docs/answer/190843
- GitHub Releases: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
- GitLab Releases: https://docs.gitlab.com/user/project/releases/
- Storybook Publish/Versioning (Chromatic): https://storybook.js.org/docs/sharing/publish-storybook
- Vercel Preview Environments: https://vercel.com/docs/deployments/environments#preview-environment-pre-production

## Criterios de benchmark

| Criterio | Peso | O que medir |
|---|---:|---|
| Metadata de versao | 20% | titulo, descricao, autor, data, status |
| Navegacao entre versoes | 15% | timeline/lista, ordenacao, filtro |
| Comparacao e historico | 20% | diff visual, comparacao por commit/versao |
| Acao por versao | 20% | abrir, restaurar, duplicar, copiar link |
| Governanca e permissao | 15% | draft, publish, roles, visibilidade |
| Integracao com evidencias | 10% | milestone, release notes, links de PR/commit |

Escala de score: 1 (fraco) a 5 (forte)

## Matriz comparativa

| Plataforma | Metadata | Navegacao | Comparacao | Acoes por versao | Governanca | Evidencias | Score ponderado |
|---|---:|---:|---:|---:|---:|---:|---:|
| Figma | 5 | 5 | 3 | 5 | 3 | 3 | 4.20 |
| Google Docs | 4 | 4 | 4 | 4 | 3 | 2 | 3.70 |
| GitHub Releases | 5 | 3 | 2 | 4 | 5 | 5 | 3.85 |
| GitLab Releases | 5 | 4 | 3 | 4 | 5 | 5 | 4.20 |
| Storybook + Chromatic | 4 | 4 | 5 | 3 | 4 | 4 | 4.00 |
| Vercel Preview | 3 | 4 | 4 | 3 | 4 | 4 | 3.65 |

## Insights praticos para o Drawer

1. Figma traz o melhor padrao para UX de historico:
- linha do tempo por versao
- nome + descricao curta
- autor e data sempre visiveis
- acao clara por versao

2. GitHub/GitLab trazem o melhor padrao de governanca:
- estado da versao (draft, pre-release, latest)
- ownership por papel
- release notes e assets

3. Storybook/Chromatic e Vercel trazem o melhor padrao de rastreabilidade de preview:
- URL por branch/commit
- fluxo de review assincrono
- vinculacao direta com mudanca real

## Recomendacao de MVP (dentro do drawer)

### Estrutura de dados sugerida

```ts
versions: [
  {
    id: 'v1',
    label: 'v1 - baseline',
    status: 'historica', // historica | em_teste | atual
    coverImage: '/img/jornadas/missoes/v1.png',
    updatedAt: '2026-03-05',
    owner: 'Squad Missoes',
    summary: 'Versao inicial para validacao de fluxo',
    notes: 'Ajuste de navegacao e hierarquia visual',
    experienceTarget: '/professor/missoes?variant=v1',
    evidence: {
      pr: '#123',
      commit: 'abc1234',
      milestone: 'Sprint 12'
    }
  }
]
```

### UI minima no drawer

1. Trilho horizontal de capas de versao.
2. Badge por versao: `Atual`, `Em teste`, `Historica`.
3. Acoes por card: `Abrir`, `Copiar link`.
4. Painel de detalhe da versao selecionada:
- resumo
- notas
- autor
- data
- evidencias (PR/commit/milestone)

5. Troca do `iframeSrc` e do contexto ao selecionar outra versao.

## Regras de governanca recomendadas

1. Apenas 1 versao pode estar com status `Atual`.
2. Versao `Atual` deve ter:
- owner
- updatedAt
- summary
- pelo menos 1 evidencia

3. Versoes em `Em teste` nao substituem `Atual` automaticamente.
4. Promocao de `Em teste` para `Atual` deve registrar data e responsavel.

## Checklist de implementacao

- [ ] Adicionar `versions` no schema de `Journey`.
- [ ] Renderizar cards de versao no drawer.
- [ ] Selecionar versao e trocar `iframeSrc` dinamicamente.
- [ ] Sincronizar contexto (jtbd, checklist, owner, nextStep) por versao.
- [ ] Exibir metadata padrao (owner, data, status, resumo).
- [ ] Adicionar modo fallback para jornadas sem versoes.

## Decisao recomendada

Implementar o MVP com padrao UX inspirado em Figma (timeline/cards) e governanca inspirada em GitLab/GitHub (status, evidencias, ownership). Isso oferece clareza para pesquisa e documentacao sem depender de backend na primeira fase.

## Plano quebrado em tarefas

### Fase 1 - Contrato de dados

- [ ] T001 Expandir tipo `Journey` com `versions` em `FrontOffice/src/types/journey.ts`
- [ ] T002 Criar tipos `JourneyVersion` e `JourneyVersionEvidence` em `FrontOffice/src/types/journey.ts`
- [ ] T003 Adicionar dados de `versions` nas jornadas ativas em `FrontOffice/src/data/journeys.ts`
- [ ] T004 Definir regra de versao inicial ativa (fallback para primeira versao) em `FrontOffice/src/composables/useJourneyPrototypeDrawer.js`

### Fase 2 - Estado e selecao de versao

- [ ] T005 Criar estado `selectedVersionId` no drawer em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T006 Resolver `selectedVersion` com fallback resiliente em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T007 Atualizar `iframeSrc` para usar `experienceTarget` da versao selecionada em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T008 Sincronizar contexto (`jtbd`, `checklist`, `owner`, `lastUpdate`, `nextStep`) por versao em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

### Fase 3 - UI de capas no drawer

- [ ] T009 Renderizar trilho horizontal de capas de versao em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T010 Implementar card de versao com badge (`Atual`, `Em teste`, `Historica`) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T011 Implementar acao de selecao da versao por clique/teclado em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T012 Exibir metadata da versao ativa (resumo, notas, autor, data) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

### Fase 4 - Governanca e regras

- [ ] T013 Validar regra de somente 1 versao `Atual` por jornada em `FrontOffice/src/data/journeys.ts`
- [ ] T014 Validar campos obrigatorios para versao `Atual` (`owner`, `updatedAt`, `summary`, `evidence`) em `FrontOffice/src/composables/useJourneyPrototypeDrawer.js`
- [ ] T015 Implementar fallback visual para jornada sem versoes em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T016 Exibir alertas de dados incompletos sem bloquear uso em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

### Fase 5 - Evidencias e usabilidade

- [ ] T017 Exibir evidencias (PR/commit/milestone) da versao ativa em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T018 Implementar acao `Copiar link` da versao ativa em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T019 Garantir acessibilidade da trilha (roles, foco e estados ativos) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [ ] T020 Ajustar responsividade da trilha de capas para desktop e mobile em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

### Fase 6 - Testes e validacao

- [ ] T021 Criar teste unitario de resolucao da versao ativa em `FrontOffice/src/composables/__tests__/useJourneyPrototypeDrawer.spec.ts`
- [ ] T022 Criar teste de componente para selecao de capa e troca de contexto em `FrontOffice/src/components/__tests__/JourneyPrototypeDrawer.spec.ts`
- [ ] T023 Criar teste de integracao Home -> drawer com versao ativa em `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`
- [ ] T024 Rodar suite de testes e registrar evidencias em `documentation/docs/prototypes/benchmark-versionamento-drawer.md`

## Dependencias entre fases

1. Fase 1 -> Fase 2
2. Fase 2 -> Fase 3
3. Fase 3 -> Fase 4
4. Fase 4 -> Fase 5
5. Fase 5 -> Fase 6

## Escopo MVP sugerido

1. Entregar Fase 1 + Fase 2 + Fase 3.
2. Resultado esperado: selecao de versao por capa com troca de iframe e contexto dentro do drawer.
