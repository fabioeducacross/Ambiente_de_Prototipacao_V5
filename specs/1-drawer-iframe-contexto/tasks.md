# Tasks - Drawer Full com Iframe e Contexto de Jornada/JTBD

**Feature**: `1-drawer-iframe-contexto`  
**Branch**: `1-drawer-iframe-contexto`  
**Base de entrada**: `specs/1-drawer-iframe-contexto/spec.md`, `specs/1-drawer-iframe-contexto/plan.md`, `specs/1-drawer-iframe-contexto/data-model.md`, `specs/1-drawer-iframe-contexto/contracts/drawer-iframe-contexto.openapi.yaml`, `specs/1-drawer-iframe-contexto/research.md`, `specs/1-drawer-iframe-contexto/quickstart.md`

## Estrategia de Implementacao

- MVP primeiro: entregar `US1` (abrir drawer em jornada ativa sem navegacao imediata).
- Incremental: adicionar `US2` (contexto + acessibilidade), depois `US3` (fallback/estados), depois `US4` (seguranca whitelist).
- Evidencia objetiva: finalizar com testes, validacao de criterios de aceite e artefatos em `specs/1-drawer-iframe-contexto/evidence/`.

## Fase 1 - Setup

**Objetivo**: preparar estrutura tecnica e base de testes para execucao da feature no FrontOffice.  
**Criterio independente**: projeto compila e ambiente de teste executa pelo menos 1 teste smoke.

- [x] T001 Atualizar scripts e devDependencies de teste em `FrontOffice/package.json`
- [x] T002 Criar configuracao de teste Vue/Vite em `FrontOffice/vitest.config.ts`
- [x] T003 Criar setup global de testes (DOM matchers e mocks) em `FrontOffice/tests/setup.ts`
- [x] T004 Criar teste smoke inicial de infraestrutura em `FrontOffice/tests/smoke/smoke.spec.ts`

## Fase 2 - Fundacao (Bloqueante)

**Objetivo**: consolidar contrato de dados de jornada e base reutilizavel para drawer e validacao.  
**Criterio independente**: Home passa a ler dados tipados de jornada com `context` e `experience` sem regressao visual.

- [x] T005 Criar tipos de dominio `Journey`, `JourneyContext`, `JourneyExperience`, `IframeValidationResult` em `FrontOffice/src/types/journey.ts`
- [x] T006 Migrar e enriquecer dataset de jornadas com metadados obrigatorios em `FrontOffice/src/data/journeys.ts`
- [x] T007 Refatorar consumo de jornadas da Home para usar fonte unica tipada em `FrontOffice/src/views/Home.vue`
- [x] T008 [P] Criar configuracao inicial de whitelist (origens e paths permitidos) em `FrontOffice/src/config/iframeWhitelist.ts`
- [x] T009 [P] Criar helper de auditoria local para bloqueios de iframe em `FrontOffice/src/utils/iframeAudit.ts`
- [x] T010 Alinhar contrato OpenAPI local aos tipos implementados em `specs/1-drawer-iframe-contexto/contracts/drawer-iframe-contexto.openapi.yaml`

## Fase 3 - US1 (P1) Abrir Jornada Ativa no Drawer

**Objetivo da historia**: ao clicar em jornada ativa, abrir drawer full sem navegacao imediata da Home.  
**Teste independente**: clique em card ativo abre drawer; clique em card planejado nao abre iframe.

- [x] T011 [P] [US1] Criar componente base `JourneyPrototypeDrawer` com estrutura shell (header, body, footer) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T012 [US1] Implementar API do componente (`props`, `emits` de close/open-full-page) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T013 [US1] Criar composable de estado de abertura/fechamento do drawer em `FrontOffice/src/composables/useJourneyPrototypeDrawer.ts`
- [x] T014 [US1] Substituir navegacao imediata dos cards ativos por handler de abertura do drawer em `FrontOffice/src/views/Home.vue`
- [x] T015 [US1] Implementar RF-011 para jornadas planejadas (sem iframe, com estado informativo padrao) em `FrontOffice/src/views/Home.vue`
- [x] T016 [US1] Preservar estado local da Home (persona selecionada e contexto visual) ao fechar drawer em `FrontOffice/src/views/Home.vue`

## Fase 4 - US2 (P1) Contexto Obrigatorio + Acessibilidade

**Objetivo da historia**: exibir contexto JTBD completo no drawer com requisitos minimos de acessibilidade.  
**Teste independente**: drawer expõe todos os campos obrigatorios e passa nos cenarios de foco/ESC/ARIA.

- [x] T017 [P] [US2] Renderizar painel de contexto obrigatorio (persona, jornada, status, JTBD, checklist, owner, lastUpdate, nextStep) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T018 [US2] Implementar semantica de dialog (`role`, `aria-modal`, `aria-labelledby`) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T019 [US2] Implementar foco inicial no drawer ao abrir e retorno de foco ao acionador ao fechar em `FrontOffice/src/composables/useJourneyPrototypeDrawer.ts`
- [x] T020 [US2] Implementar fechamento por tecla ESC, botao explicito e clique no backdrop em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T021 [US2] Tratar metadados incompletos com placeholders/alertas sem quebrar renderizacao em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T021A [US2] Validar responsividade minima do drawer em mobile (320px e 768px), garantindo abertura/fechamento, leitura de contexto e CTA sem overflow em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

## Fase 5 - US3 (P2) Estados de Carregamento/Erro + CTA Abrir Pagina Completa

**Objetivo da historia**: garantir fluxo resiliente com iframe, estados de erro e fallback de abertura externa.  
**Teste independente**: loading, bloqueio, indisponibilidade e erro de embed apresentam feedback claro e CTA consistente.

- [x] T022 [P] [US3] Implementar maquina de estados visuais (`loading`, `ready`, `blocked`, `embedError`, `unavailable`) em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T023 [US3] Implementar renderizacao de iframe com tratamento de `load`/`error` e timeout de fallback em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T024 [US3] Implementar CTA `Abrir pagina completa` com comportamento habilitado/desabilitado por estado em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`
- [x] T025 [US3] Integrar acao `open-full-page` no controlador da Home (mesmo destino da experiencia) em `FrontOffice/src/views/Home.vue`
- [x] T026 [US3] Tratar jornada ativa sem URL e rota interna invalida com mensagem orientativa em `FrontOffice/src/composables/useJourneyPrototypeDrawer.ts`

## Fase 6 - US4 (P1) Seguranca de Whitelist para URL Interna/Externa

**Objetivo da historia**: permitir apenas destinos validos no iframe e bloquear URL externa fora de whitelist.  
**Teste independente**: matriz de URLs internas/externas gera classificacao correta (`internal`, `external-allowed`, `external-blocked`, `invalid`).

- [x] T027 [P] [US4] Implementar `validateIframeTarget` com normalizacao e reason codes em `FrontOffice/src/utils/iframeWhitelist.ts`
- [x] T028 [US4] Implementar regra deny-by-default para origem/caminho externo com base em config em `FrontOffice/src/utils/iframeWhitelist.ts`
- [x] T029 [US4] Bloquear schemes proibidos (`javascript:`, `data:`, `file:`) e tratar URL malformada em `FrontOffice/src/utils/iframeWhitelist.ts`
- [x] T030 [US4] Integrar validacao de whitelist ao fluxo de abertura do drawer em `FrontOffice/src/composables/useJourneyPrototypeDrawer.ts`
- [x] T031 [US4] Registrar evento auditavel em bloqueios/invalidez de URL em `FrontOffice/src/utils/iframeAudit.ts`
- [x] T032 [US4] Exibir mensagem de bloqueio com motivo e orientacao no drawer em `FrontOffice/src/components/JourneyPrototypeDrawer.vue`

## Fase 7 - Polish, Testes e Evidencias de Aceite

**Objetivo**: validar regressao, garantir criterios de aceite e publicar evidencia executavel.  
**Criterio independente**: criterios CA-001..CA-009 documentados com evidencias de teste automatizado + verificacao manual.

- [x] T033 [P] Criar testes unitarios da whitelist (interna, externa permitida, externa bloqueada, invalida) em `FrontOffice/src/utils/__tests__/iframeWhitelist.spec.ts`
- [x] T034 [P] Criar testes de componente para acessibilidade, ESC, foco e estados visuais do drawer em `FrontOffice/src/components/__tests__/JourneyPrototypeDrawer.spec.ts`
- [x] T035 [P] Criar teste de integracao da Home (card ativo abre drawer; planejado nao abre) em `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`
- [x] T036 Executar `npm run build` e suite de testes, registrando saida consolidada em `specs/1-drawer-iframe-contexto/evidence/test-run.md`
- [x] T037 Atualizar checklist de aceite CA-001..CA-009 com resultado e status em `specs/1-drawer-iframe-contexto/evidence/acceptance-checklist.md`
- [x] T038 Anexar evidencia visual/funcional dos cenarios 1..5 em `specs/1-drawer-iframe-contexto/evidence/scenarios-evidence.md`
- [x] T039 Atualizar guia de validacao rapida com comandos e roteiros finais em `specs/1-drawer-iframe-contexto/quickstart.md`
- [x] T040 Criar validacao objetiva de RNF-PERF-001 (30 execucoes, p95 <= 300ms) e registrar evidencias em `specs/1-drawer-iframe-contexto/evidence/performance-drawer.md`

## Dependencias Entre Fases

- Fase 1 -> Fase 2
- Fase 2 -> Fase 3
- Fase 3 -> Fase 4
- Fase 4 -> Fase 5
- Fase 2 -> Fase 6
- Fase 5 e Fase 6 -> Fase 7

## Dependencias Entre Historias (Ordem Recomendada)

- `US1` depende de Fundacao (Fase 2).
- `US2` depende de `US1` (componente e integracao base do drawer).
- `US3` depende de `US1` e `US2` (estado do drawer + contexto).
- `US4` depende da Fundacao (dados/config) e integra com `US1`.
- Para merge final: `US3` e `US4` concluidas antes da Fase 7.

## Exemplos de Execucao Paralela

### US1

- Executar T011 em paralelo com T013 (arquivos diferentes: componente vs composable).
- Executar T014 somente apos T011 e T013.

### US2

- Executar T017 em paralelo com T019 (render de contexto vs logica de foco).
- Executar T018 e T020 apos T011/T012 estarem estaveis.

### US3

- Executar T022 em paralelo com T026 (estados visuais vs regras de indisponibilidade).
- Executar T024 apos T022 e T023.

### US4

- Executar T027 em paralelo com T031 (validator e auditoria local).
- Executar T030 apos T027, T028 e T029.

### Final

- Executar T033, T034 e T035 em paralelo.
- Executar T036 apos T033-T035; depois T037 e T038; finalizar com T039.

## Escopo MVP Sugerido

- Entregar inicialmente: Fase 1 + Fase 2 + Fase 3 (`US1`).
- Resultado MVP: clique em jornada ativa abre `JourneyPrototypeDrawer` sem navegacao imediata e preserva contexto da Home.
