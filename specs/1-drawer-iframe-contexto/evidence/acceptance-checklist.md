# Acceptance Checklist - Drawer Iframe Contexto

Data: 2026-03-05

- [x] Vitest configurado no FrontOffice com scripts de execucao (`test`, `test:run`, `test:watch`).
- [x] Ambiente de testes usa Vue SFC + `jsdom` + setup global para macros de build.
- [x] Smoke test criado para validar boot da suite.
- [x] Unit test de whitelist cobre interno permitido.
- [x] Unit test de whitelist cobre externo permitido.
- [x] Unit test de whitelist cobre externo bloqueado.
- [x] Unit test de whitelist cobre esquema proibido e URL malformada.
- [x] Component test do drawer cobre role dialog e `aria-modal`.
- [x] Component test do drawer cobre fechamento por tecla ESC.
- [x] Component test do drawer cobre render dos campos de contexto.
- [x] Component test do drawer cobre CTA desabilitado em estado bloqueado.
- [x] Integration test da Home valida abertura do drawer para card ativo.
- [x] Integration test da Home valida nao abertura para card planejado.

## Pendencias
- Executar a suite em CI para registrar artefatos de pipeline (execucao local ja validada com 11/11 testes aprovados).
