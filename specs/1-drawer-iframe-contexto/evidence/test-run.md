# Evidencia de Execucao de Testes

Data: 2026-03-05
Escopo: Drawer com iframe e contexto na Home do FrontOffice

## Suite criada
- `FrontOffice/tests/smoke/smoke.spec.ts`
- `FrontOffice/src/utils/__tests__/iframeWhitelist.spec.ts`
- `FrontOffice/src/components/__tests__/JourneyPrototypeDrawer.spec.ts`
- `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`

## Comandos de execucao
```bash
cd FrontOffice
npm install
npm run build
npm run test:run
```

## Resultado obtido
- Data de execucao: 2026-03-05
- Build: `npm run build` concluido com sucesso (`vite build`, `1203 modules transformed`, `built in 5.95s`)
- Resultado: `4` arquivos de teste aprovados
- Resultado: `11` testes aprovados, `0` falhas
- Duracao observada: ~1.9s

Resumo da execucao:
- `tests/smoke/smoke.spec.ts`: passou
- `src/utils/__tests__/iframeWhitelist.spec.ts`: passou
- `src/components/__tests__/JourneyPrototypeDrawer.spec.ts`: passou
- `src/views/__tests__/Home.drawer-integration.spec.ts`: passou

Observacao de execucao:
- Houve warnings do Vue Router sobre rotas sem match (`/professor`, `/teacher/trilhas-az`, `/professor/missoes`) durante o teste de integracao da Home. Isso nao gerou falha e esta coerente com o roteador minimo usado apenas para o escopo do teste.

## Resultado esperado
- Suite smoke valida inicializacao do Vitest.
- Unit tests validam regras de whitelist para iframe.
- Component tests validam acessibilidade basica, fechamento por ESC, render de contexto e CTA desabilitado em bloqueio.
- Integration tests validam abertura do drawer em card ativo e nao abertura em card planejado.

## Observacoes
- A configuracao de teste usa `jsdom` e `tests/setup.ts` com globals de build (`__WIKI_URL__`, `__GIT_BRANCH__`, `__GIT_SHA__`, `__APP_VERSION__`).
- Em ambiente CI, garantir dependencia do `npm install` no `FrontOffice` antes da execucao.
