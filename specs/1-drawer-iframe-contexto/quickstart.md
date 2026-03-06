# Quickstart - Drawer Full com Iframe e Contexto

## Objetivo
Implementar a feature de abertura de jornada ativa em drawer full com painel contextual e iframe validado por whitelist.

## Pre-requisitos
- Branch: `1-drawer-iframe-contexto`
- Node.js LTS instalado
- FrontOffice em `Ambiente_de_Prototipacao_V5/FrontOffice`
- Dependencias instaladas com `npm install`

## Passo a Passo

### 1) Preparar dados de jornada
1. Garantir que jornadas `active` tenham:
- `context`: persona, journeyName, statusLabel, jtbd, checklist, owner, lastUpdate, nextStep
- `experience.target`: rota interna ou URL externa HTTPS
2. Garantir que jornadas `planned` nao disparem abertura de iframe.

### 2) Implementar componente reutilizavel
1. Criar `JourneyPrototypeDrawer.vue` em `FrontOffice/src/components/`.
2. Renderizar:
- Cabecalho com titulo e botao fechar
- Painel contextual obrigatorio
- Area de conteudo (iframe ou estado de bloqueio/erro)
- CTA `Abrir pagina completa`

### 3) Integrar na Home
1. Em `FrontOffice/src/views/Home.vue`, interceptar clique dos cards ativos.
2. Abrir drawer em vez de navegar imediatamente.
3. Armazenar referencia do elemento acionador para restore focus.
4. Ao fechar, preservar estado local da Home.

### 4) Aplicar seguranca de iframe
1. Criar utilitario `iframeWhitelist.js` com `validateIframeTarget(...)`.
2. Permitir:
- Rota interna (`/...`)
- URL externa em whitelist
3. Bloquear e informar quando fora da whitelist.
4. Registrar evento auditavel em tentativas bloqueadas.

### 5) Aplicar acessibilidade minima
1. Dialog com `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
2. Fechamento por ESC, backdrop e botao.
3. Foco inicial dentro do drawer.
4. Retorno de foco ao card acionador.

## Checklist de Validacao Rapida
- [x] Card ativo abre drawer full sem redirecionar.
- [x] Todos os campos contextuais obrigatorios aparecem.
- [x] URL interna valida carrega no iframe.
- [x] URL externa permitida carrega no iframe.
- [x] URL externa bloqueada nao carrega e mostra mensagem.
- [x] CTA abre destino em pagina completa.
- [x] ESC/backdrop/botao fecham drawer.
- [x] Foco retorna ao acionador ao fechar.
- [x] Reabertura rapida usa sempre o ultimo clique valido.

## Testes Implementados
- Smoke: `FrontOffice/tests/smoke/smoke.spec.ts`
- Unit: `FrontOffice/src/utils/__tests__/iframeWhitelist.spec.ts`
- Component: `FrontOffice/src/components/__tests__/JourneyPrototypeDrawer.spec.ts`
- Integration: `FrontOffice/src/views/__tests__/Home.drawer-integration.spec.ts`

## Comandos Finais
```bash
cd FrontOffice
npm install
npm run test:run
```

### Comandos uteis durante desenvolvimento
```bash
cd FrontOffice
npm run test
npm run test:watch
```

## Observacoes
- Sem backend real: manter contrato local alinhado em `data-model.md` e `contracts/`.
- Em erro de embed (`X-Frame-Options`/CSP), manter contexto no drawer e orientar uso do CTA.
