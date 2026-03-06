# Evidencias por Cenario

Data: 2026-03-05

Execucao de referencia:
- Comando: `cd FrontOffice && npm run test:run`
- Status: aprovado (`11/11` testes, `4/4` arquivos)

## Cenario 1 - Jornada ativa abre drawer full
- Cobertura: `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`
- Evidencia: teste `abre drawer ao clicar em card ativo da persona` confirma render de `.journey-drawer`.

## Cenario 2 - Jornada planejada nao abre drawer
- Cobertura: `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`
- Evidencia: teste `nao abre drawer ao interagir com card planejado` confirma ausencia de `.journey-drawer`.

## Cenario 3 - Whitelist permite destinos internos e externos previstos
- Cobertura: `FrontOffice/src/utils/__tests__/iframeWhitelist.spec.ts`
- Evidencia: casos `permite rota interna valida` e `permite URL externa em whitelist`.

## Cenario 4 - Whitelist bloqueia destinos indevidos
- Cobertura: `FrontOffice/src/utils/__tests__/iframeWhitelist.spec.ts`
- Evidencia: casos `bloqueia URL externa fora da whitelist` e `bloqueia esquema proibido e URL malformada`.

## Cenario 5 - Drawer preserva requisitos basicos de UX e acessibilidade
- Cobertura: `FrontOffice/src/components/__tests__/JourneyPrototypeDrawer.spec.ts`
- Evidencia: validacao de role dialog, `aria-modal`, fechamento por ESC, contexto renderizado e CTA desabilitado em bloqueio.

## Validacao responsiva minima (T021A)
- Metodo: Playwright (Chromium headless), script local `scripts/tmp-validate-drawer-responsive.mjs`.
- Viewports avaliados: `320x900` e `768x900`.
- Resultados:
	- `rootOverflow = 0` e `bodyOverflow = 0` em ambos os viewports.
	- `drawerOverflow = 0` em ambos os viewports.
	- `actionWrap = wrap` em ambos os viewports.
	- Botao `Fechar painel` com `closeInViewport = true` em ambos os viewports.
- Conclusao: abertura/fechamento e leitura de contexto permanecem operacionais sem overflow horizontal nos tamanhos validados.
