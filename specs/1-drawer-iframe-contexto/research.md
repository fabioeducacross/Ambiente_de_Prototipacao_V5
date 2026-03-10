# Pesquisa Tecnica - Drawer Full com Iframe e Contexto

## Contexto
Feature: `specs/1-drawer-iframe-contexto/spec.md`

Nao havia marcadores `[NEEDS CLARIFICATION]` no spec. A pesquisa abaixo consolida decisoes tecnicas para Vue 3 FrontOffice, seguranca de iframe, acessibilidade e testes.

## Decisoes

### 1) Integracao da Home com drawer reutilizavel
- Decisao: Implementar uma camada de orquestracao na `Home.vue` (estado `selectedJourney`, `isDrawerOpen`, `openerRef`) e um componente reutilizavel `JourneyContextDrawer.vue` em `FrontOffice/src/components/`.
- Rationale: Mantem a Home responsavel por selecao/fluxo da jornada e encapsula UI/UX do drawer para reuso em outras personas/modulos.
- Alternatives considered:
  - Implementar tudo direto em `Home.vue`: descartado por baixa manutenibilidade.
  - Usar pagina intermediaria em vez de drawer: descartado por violar RF-001 (nao sair da Home).

### 2) Modelo de dados de metadados da jornada
- Decisao: Expandir contrato de jornada com objeto `context` obrigatorio para campos mandatarios (persona, jornada, status, jtbd, checklist, owner, lastUpdate, nextStep) e `experience` para alvo iframe.
- Rationale: Atende RF-005 e RNF-MAN-002 com contrato explicito e validavel.
- Alternatives considered:
  - Campos soltos na raiz da jornada: descartado por acoplamento e risco de inconsistencias.
  - Buscar metadados de backend: fora de escopo.

### 3) Validacao de URL e whitelist
- Decisao: Criar utilitario puro `validateIframeTarget(target, whitelistConfig)` com classificacao de alvo (`internal`, `external-allowed`, `external-blocked`, `invalid`) e mensagem de bloqueio padronizada.
- Rationale: Centraliza regra de seguranca (RNF-SEG-001/002), facilita teste unitario e reduz duplicacao.
- Alternatives considered:
  - Regex inline em componente: descartado por baixa rastreabilidade.
  - Permitir qualquer URL HTTPS: descartado por nao atender whitelist.

### 4) Estrategia de acessibilidade e teclado
- Decisao: Drawer com semantica de dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), foco inicial no titulo/primeiro controle util, fechamento por `Esc`, backdrop e botao, com retorno de foco ao card acionador.
- Rationale: Atende RNF-A11Y-001..004 e CA-007..009 com comportamento previsivel.
- Alternatives considered:
  - Foco inicial no iframe: descartado por pior usabilidade e leitura de contexto.
  - Nao restaurar foco: descartado por falha de acessibilidade.

### 5) Estrategia para falhas de embed (X-Frame-Options/CSP)
- Decisao: Tratar erro de carregamento como estado controlado do painel de conteudo do drawer, preservando contexto e CTA de abertura completa.
- Rationale: Cobre caso de borda e reduz interrupcao de fluxo.
- Alternatives considered:
  - Fechar drawer automaticamente no erro: descartado por perda de contexto.

### 6) Estrategia de testes
- Decisao: Combinar testes unitarios (validacao de URL e contrato), testes de componente (drawer e foco) e testes de fluxo E2E na Home.
- Rationale: Cobertura balanceada para comportamento funcional, UX e edge cases sem backend.
- Alternatives considered:
  - Apenas testes manuais: descartado por baixa confiabilidade regressiva.
