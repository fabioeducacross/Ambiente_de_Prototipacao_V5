# Especificacao de Feature: Drawer Full com Iframe e Contexto de Jornada/JTBD

**Feature Branch**: `1-drawer-iframe-contexto`  
**Criado em**: 2026-03-05  
**Status**: Draft  
**Entrada**: "Drawer full com iframe + contexto de jornada/JTBD no FrontOffice"

## Problema
No estado atual do FrontOffice, o clique em um card de jornada ativa pode levar a navegacao imediata, removendo contexto da jornada e dificultando comparacao rapida entre jornadas no dashboard. Isso reduz a capacidade de avaliacao em fluxo de prototipacao, pois informacoes de contexto (JTBD, progresso e proximo passo) nao ficam centralizadas no momento da decisao.

## Objetivos
- Permitir exploracao de jornada ativa sem sair imediatamente do dashboard.
- Exibir contexto obrigatorio da jornada em um drawer full para apoiar tomada de decisao.
- Suportar abertura de prototipos internos e externos via iframe com validacao de whitelist.
- Garantir fallback claro para abertura em pagina completa.
- Assegurar acessibilidade minima no comportamento do drawer.

## Escopo
### Incluido
- Abertura de drawer full ao clicar em card de jornada com status Ativo na Home.
- Renderizacao de iframe no drawer com suporte a rotas internas e URLs externas permitidas.
- Exibicao obrigatoria de contexto: persona, jornada, status, JTBD, checklist de progresso, responsavel, ultima atualizacao, proximo passo.
- CTA de fallback: "Abrir pagina completa".
- Comportamentos minimos de acessibilidade definidos para dialog modal.

### Excluido
- Redesenho completo da Home.
- Redesenho completo da experiencia mobile (fora do MVP), mantendo comportamento funcional responsivo minimo.
- Integracoes com backend real (dados podem vir de configuracao local do prototipo).

## Assuncoes
- A whitelist de URLs permitidas sera configuravel por ambiente de prototipacao.
- O MVP prioriza desktop, mas deve manter suporte responsivo funcional em mobile (abertura/fechamento do drawer, CTA e leitura do contexto sem quebra).

## Historias de Usuario
1. Como pessoa usuaria do FrontOffice, quero abrir uma jornada ativa em drawer full para avaliar o prototipo sem perder o contexto do dashboard.
2. Como pessoa usuaria, quero ver contexto de jornada e JTBD no mesmo painel do iframe para decidir rapidamente proximos ajustes.
3. Como pessoa responsavel pelo prototipo, quero um fallback "Abrir pagina completa" para continuar a experiencia quando o iframe nao atender ao fluxo desejado.
4. Como pessoa de governanca do ambiente, quero bloquear URLs externas fora da whitelist para reduzir risco de carregamento indevido no iframe.

## Cenarios de Usuario e Testes
### Cenario 1 - Abrir jornada ativa no drawer
1. Dado que a pessoa usuaria esta na Home e existe um card com status Ativo
2. Quando ela clica no card
3. Entao um drawer full deve abrir sem navegacao imediata de pagina
4. E o iframe deve carregar a URL configurada para a jornada
5. E o contexto obrigatorio deve estar visivel no drawer

### Cenario 2 - Jornada planejada
1. Dado que a pessoa usuaria clica em um card com status Planejado
2. Quando a acao e executada
3. Entao o sistema nao deve abrir iframe de experiencia ativa
4. E deve apresentar o comportamento definido para item planejado (ex.: estado informativo sem execucao da jornada)

### Cenario 3 - URL externa permitida
1. Dado que a jornada referencia uma URL externa na whitelist
2. Quando o drawer abre
3. Entao o iframe deve carregar essa URL
4. E o CTA "Abrir pagina completa" deve apontar para a mesma URL

### Cenario 4 - URL externa bloqueada
1. Dado que a jornada referencia uma URL externa fora da whitelist
2. Quando a abertura do drawer e solicitada
3. Entao o iframe nao deve carregar a URL
4. E uma mensagem de bloqueio deve ser exibida com orientacao
5. E o evento deve ser registravel para auditoria de prototipo

### Cenario 5 - Acessibilidade do drawer
1. Dado que o drawer esta aberto
2. Quando a pessoa usuaria pressiona ESC
3. Entao o drawer deve fechar
4. E o foco deve retornar para o card que originou a abertura

## Requisitos Funcionais
- **RF-001**: Ao clicar em card de jornada com status Ativo na Home, o sistema deve abrir um drawer full em vez de navegar imediatamente para outra pagina.
- **RF-002**: O drawer deve conter um iframe para exibicao da experiencia da jornada selecionada.
- **RF-003**: O iframe deve aceitar URLs internas do FrontOffice e URLs externas somente quando estiverem na whitelist configurada.
- **RF-004**: Para URL externa fora da whitelist, o sistema deve bloquear o carregamento no iframe e informar o motivo de forma clara.
- **RF-005**: O drawer deve exibir obrigatoriamente os campos: persona, jornada, status (Ativo/Planejado), JTBD, checklist de progresso, responsavel, ultima atualizacao e proximo passo.
- **RF-006**: O drawer deve disponibilizar o CTA "Abrir pagina completa" para abrir a mesma experiencia fora do iframe.
- **RF-007**: O drawer deve permitir fechamento por botao explicito, tecla ESC e clique no backdrop.
- **RF-008**: Ao fechar o drawer, o foco deve retornar ao elemento que iniciou a abertura.
- **RF-009**: O sistema deve preservar o estado da Home ao fechar o drawer (sem reset de contexto de navegacao local da tela).
- **RF-010**: O comportamento deve ser aplicado no shell desktop e manter paridade funcional minima no mobile (sem regressao de abertura, fechamento, foco e CTA).
- **RF-011**: Ao clicar em card com status Planejado, o sistema nao deve abrir iframe e deve exibir estado informativo padrao com orientacao de indisponibilidade da experiencia ativa.

## Requisitos Nao Funcionais
### Seguranca
- **RNF-SEG-001**: A validacao de destino do iframe deve operar em deny-by-default: URLs internas validas sao permitidas e URLs externas somente quando estiverem na whitelist configurada.
- **RNF-SEG-002**: Tentativas de URL bloqueada devem ser registraveis para rastreabilidade do ambiente de prototipacao.

### Acessibilidade
- **RNF-A11Y-001**: O drawer deve utilizar semantica de dialog com `role="dialog"` e `aria-modal="true"`.
- **RNF-A11Y-002**: O drawer deve possuir titulo rotulado de forma programatica.
- **RNF-A11Y-003**: O foco inicial deve ser colocado em elemento util dentro do drawer ao abrir.
- **RNF-A11Y-004**: O foco deve retornar ao acionador ao fechar.

### Performance
- **RNF-PERF-001**: Em ambiente local de referencia (Chrome desktop, CPU sem throttling), o tempo entre `click` no card Ativo e drawer visualmente aberto (`.journey-prototype-drawer` visivel) deve ser <= 300 ms no p95 de 30 execucoes.
- **RNF-PERF-002**: O carregamento do iframe nao deve bloquear a renderizacao inicial do contexto obrigatorio do drawer.

### Manutenibilidade
- **RNF-MAN-001**: Regras de whitelist e metadados de contexto de jornada devem ser configuraveis sem alterar regras de negocio centrais da Home.
- **RNF-MAN-002**: Campos obrigatorios de contexto devem possuir contrato de dados explicito e validavel por teste.

## Casos de Borda
- Jornada ativa sem URL definida: drawer abre com estado de indisponibilidade e CTA desabilitado.
- Jornada ativa com metadados incompletos: drawer deve sinalizar campos faltantes sem quebrar abertura.
- URL interna invalida (rota inexistente): iframe exibe erro controlado e CTA para pagina completa permanece disponivel quando aplicavel.
- Bloqueio por politicas do destino (ex.: `X-Frame-Options`): drawer apresenta orientacao para usar "Abrir pagina completa".
- Fechamento do drawer durante carregamento do iframe: fechamento deve ocorrer sem travamento da interface.
- Reabertura rapida de jornadas diferentes: contexto e iframe devem refletir sempre o ultimo clique valido.

## Dependencias
- Disponibilidade de configuracao de jornadas na Home com status e metadados exigidos.
- Definicao de lista de dominios/URLs externas permitidas para iframe.

## Criterios de Aceite
- **CA-001**: Em card Ativo, clique abre drawer full sem redirecionamento imediato.
- **CA-002**: Drawer exibe todos os campos obrigatorios de contexto para jornada valida.
- **CA-003**: URL interna valida carrega no iframe.
- **CA-004**: URL externa permitida carrega no iframe.
- **CA-005**: URL externa nao permitida e bloqueada com mensagem clara.
- **CA-006**: CTA "Abrir pagina completa" abre o destino correspondente em fluxo externo ao iframe.
- **CA-007**: ESC, botao de fechar e backdrop fecham o drawer.
- **CA-008**: Foco retorna ao acionador apos fechamento.
- **CA-009**: Drawer atende aos requisitos minimos de semantica e rotulagem de dialog.

## Metricas de Sucesso
- **MS-001**: Em testes de usabilidade interna, pelo menos 90% das pessoas concluem a abertura e avaliacao de uma jornada ativa sem sair da Home na primeira tentativa.
- **MS-002**: Tempo mediano para acessar contexto completo da jornada apos clique no card deve ser menor ou igual a 2 segundos.
- **MS-003**: 100% das tentativas com URL fora da whitelist sao bloqueadas no iframe.
- **MS-004**: 100% dos testes de acessibilidade basica do drawer (dialog rotulado, ESC, foco inicial e retorno de foco) passam.

## Entidades Principais
- **Jornada**: representa uma experiencia de prototipo associada a uma persona, com status, JTBD e destino de abertura.
- **ContextoJornada**: conjunto de metadados obrigatorios exibidos no drawer para decisao e acompanhamento.
- **RegraWhitelistIframe**: conjunto de regras que determina se uma URL externa pode ou nao ser carregada no iframe.
