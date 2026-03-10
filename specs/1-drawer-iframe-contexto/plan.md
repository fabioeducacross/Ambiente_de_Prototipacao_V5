# Plano de Implementacao - Drawer Full com Iframe e Contexto

**Feature**: `specs/1-drawer-iframe-contexto/spec.md`  
**Branch**: `1-drawer-iframe-contexto`  
**Data**: 2026-03-05  
**Status**: Pronto para execucao

## 1. Resumo da Solucao
Implementar abertura de jornada ativa em drawer full na Home, com painel contextual obrigatorio + iframe validado por whitelist e CTA "Abrir pagina completa". A Home permanece como shell desktop e preserva estado local ao fechar o drawer.

## 2. Technical Context
- Stack: Vue 3 (`<script setup>`), FrontOffice, Bootstrap 5.3.
- Escopo de codigo: `FrontOffice/` (nao usar `src/` legado).
- Fonte de dados: configuracao local/mock (sem backend real).
- Integracao principal:
  - `FrontOffice/src/views/Home.vue` (orquestracao e gatilho)
  - `FrontOffice/src/components/JourneyPrototypeDrawer.vue` (novo componente reutilizavel)
  - `FrontOffice/src/utils/iframeWhitelist.ts` (validacao e auditoria local)
  - opcional: `FrontOffice/src/data/journeys.ts` para contrato tipado

## 3. Decisoes de Arquitetura (Vue 3 FrontOffice)
1. Home como controller de interacao:
- `Home.vue` decide quando abrir (apenas jornada `active`) e guarda referencia do elemento acionador para restaurar foco.

2. Drawer reutilizavel e desacoplado:
- Novo `JourneyPrototypeDrawer.vue` recebe `journey`, `isOpen`, `validationResult`, eventos `close`, `open-full-page`.
- Permite reuso futuro por persona/modulo sem duplicar logica.

3. Validacao de URL em utilitario puro:
- `validateIframeTarget(target, whitelistConfig)` retorna estado classificavel (`internal`, `external-allowed`, `external-blocked`, `invalid`).
- Mantem regra de seguranca testavel e centralizada.

4. Estados explicitos no drawer:
- `loading`, `ready`, `blocked`, `embedError`, `unavailable`.
- Contexto obrigatorio renderiza antes do iframe para nao bloquear percepcao de conteudo (RNF-PERF-002).

## 4. Evolucao do Modelo de Dados
Ver `specs/1-drawer-iframe-contexto/data-model.md`.

Mudancas principais:
- Jornada passa a ter `context` obrigatorio e `experience.target`.
- Contrato inclui checklist e ownership para decisao rapida.
- Estrutura de resultado de validacao e evento de auditoria para bloqueios.

## 5. Estrategia de Seguranca (Iframe + Whitelist)
1. Regra base:
- URLs internas (`/...`) sempre permitidas.
- URLs externas apenas se `https://` e em whitelist configurada.

2. Mecanismo:
- Normalizar URL com `new URL()`.
- Validar origem em `allowedOrigins` e opcionalmente caminho em `allowedPathPrefixesByOrigin`.
- Bloquear schemes perigosos: `javascript:`, `data:`, `file:`.

3. Comportamento de bloqueio:
- Nao renderizar iframe.
- Exibir mensagem clara de bloqueio com motivo.
- Registrar evento local/auditavel (`RNF-SEG-002`).

4. CTA "Abrir pagina completa":
- Disponivel para destinos validos.
- Em bloqueio por whitelist, CTA segue politica do time (recomendado: desabilitado + mensagem).
- Em falha de embed (`X-Frame-Options/CSP`), CTA permanece habilitado.

## 6. Estrategia de Acessibilidade e Teclado
1. Semantica minima:
- Drawer com `role="dialog"`, `aria-modal="true"`, `aria-labelledby="..."`.

2. Fluxo de foco:
- Abertura: foco inicial no titulo do drawer ou botao de fechar.
- Fechamento por `Esc`, botao e backdrop.
- Fechamento: foco retorna ao card acionador (RF-008).

3. Navegacao por teclado:
- Ordem de tab previsivel: cabecalho -> painel contexto -> iframe/CTA -> fechar.
- Indicador visual de foco em todos os elementos interativos.

4. Conteudo contextual:
- Campos faltantes sinalizados textual e semanticamente (nao apenas por cor).

## 7. Fases de Entrega, Dependencias e Riscos

### Fase 0 - Preparacao de contrato (0.5d)
- Definir tipos de dados de jornada/contexto + mock base.
- Entregaveis: tipos e dataset ajustado.
- Dependencias: alinhamento de campos obrigatorios.
- Risco: dados existentes incompletos.
- Mitigacao: fallback visual por campo faltante.

### Fase 1 - Componente Drawer reutilizavel (1d)
- Criar `JourneyPrototypeDrawer.vue` com shell desktop e estados visuais.
- Implementar painel contextual obrigatorio + CTA.
- Dependencias: Fase 0.
- Risco: regressao de layout na Home.
- Mitigacao: isolamento de estilos scoped e smoke test visual.

### Fase 2 - Integracao Home + regras de abertura (0.5d)
- Interceptar clique em card `active` para abrir drawer.
- `planned` segue fluxo informativo sem iframe.
- Preservar estado local da Home ao fechar.
- Dependencias: Fase 1.
- Risco: conflitos com navegacao atual de cards.
- Mitigacao: feature flag local ou condicional por status.

### Fase 3 - Seguranca de iframe/whitelist (0.5d)
- Implementar utilitario de validacao + estados de bloqueio.
- Registrar eventos de tentativa bloqueada.
- Dependencias: Fase 1 e Fase 2.
- Risco: falso bloqueio por normalizacao inadequada.
- Mitigacao: testes de matriz de URLs.

### Fase 4 - A11y e teclado (0.5d)
- Implementar semantica ARIA, ESC/backdrop/close, restore focus.
- Dependencias: Fase 2.
- Risco: foco escapar para fundo da pagina.
- Mitigacao: testes de tab sequence e fechamento repetido.

### Fase 5 - End-to-end hardening (0.5d)
- Tratar edge cases (sem URL, rota invalida, X-Frame-Options, reabertura rapida).
- Dependencias: fases anteriores.
- Risco: race condition em cliques rapidos.
- Mitigacao: cancelar carregamento anterior e aceitar apenas ultimo clique valido.

## 8. Estrategia de Testes (Funcional, UX, Edge Cases)

### 8.1 Funcional
- Ativo abre drawer sem navegar imediatamente.
- Planejado nao abre iframe.
- Interna valida carrega iframe.
- Externa whitelist carrega iframe.
- Externa fora whitelist bloqueia com mensagem.
- CTA abre pagina completa com destino correto.

### 8.2 UX
- Contexto obrigatorio visivel antes de iframe terminar de carregar.
- Tempo de abertura perceptivel <= 300ms (estado visual do drawer).
- Preservacao do estado da Home apos fechar.

### 8.3 Acessibilidade
- Dialog semantico e rotulado.
- ESC/backdrop/botao fecham drawer.
- Foco inicial correto e retorno ao acionador.
- Navegacao por teclado completa no drawer.

### 8.4 Edge Cases
- Jornada ativa sem URL: estado `unavailable`, CTA desabilitado.
- Metadados incompletos: drawer abre com placeholders/sinalizacao.
- Rota interna inexistente: erro controlado + CTA disponivel quando aplicavel.
- X-Frame-Options/CSP: orientacao para abrir pagina completa.
- Reabertura rapida: sempre refletir ultimo clique valido.

## 9. Constitution Check (Pre-Design)
- User-Centric Design: PASS (foco em fluxo de avaliacao sem perder contexto).
- Accessibility First: PASS (requisitos minimos explicitados e testaveis).
- Performance is a Feature: PASS (abertura visual <= 300ms, contexto antes do iframe).
- Single Source of Truth: PASS (contrato unico em `data-model.md` + `contracts/`).
- Security & Privacy: PASS (whitelist deny-by-default + rastreabilidade).

## 10. Constitution Check (Post-Design)
- Sem violacoes identificadas.
- Nao houve trade-off que justificasse waiver de principio.
- Gates mantidos: acessibilidade minima, seguranca por whitelist, performance de abertura.

## 11. Mapa de Entregaveis da Feature
- `specs/1-drawer-iframe-contexto/plan.md`
- `specs/1-drawer-iframe-contexto/research.md`
- `specs/1-drawer-iframe-contexto/data-model.md`
- `specs/1-drawer-iframe-contexto/contracts/drawer-iframe-contexto.openapi.yaml`
- `specs/1-drawer-iframe-contexto/quickstart.md`
