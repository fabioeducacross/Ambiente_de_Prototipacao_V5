---
name: figma-prototype-export
description: "Pipeline operacional para exportar prototipos do FrontOffice para o Figma via MCP oficial, com fallback guardado para capturas sensiveis."
compatibility: ">=1.0.0"
user-invocable: true
metadata:
  when_to_use: "Quando precisar publicar uma tela local do FrontOffice no Figma, em arquivo novo ou existente."
  argument-hint: "<rota-local-ou-url> [figma-url]"
---

# Figma Prototype Export

Skill operacional para exportar prototipos do FrontOffice para o Figma usando o MCP oficial como caminho padrao e o script guardado do repo como fallback robusto.

## Objetivo

- Padronizar o fluxo Code -> Figma para telas locais em `http://localhost:5174`
- Reduzir erro manual em `fileKey`, `nodeId`, `captureId` e polling
- Escolher automaticamente entre captura oficial simples e captura guardada

## Quando usar

Use esta skill quando o pedido envolver qualquer um destes cenarios:

- exportar uma rota do FrontOffice para um arquivo novo no Figma
- atualizar um arquivo existente no Figma com uma tela local
- capturar um frame especifico usando URL com `node-id`
- garantir que fontes, icones e drawers sejam preservados na exportacao

Nao use esta skill para:

- implementar codigo a partir de um design do Figma
- editar componentes do FrontOffice sem necessidade de exportacao
- administrar MCPs ou configurar OAuth

## Pre-condicoes

1. O FrontOffice precisa estar rodando em `http://localhost:5174`
2. O servidor MCP `figma` precisa estar conectado no workspace
3. O destino precisa estar definido antes da captura:
   - `newFile`: criar um arquivo novo no Figma
   - `existingFile`: inserir em arquivo existente usando `fileKey` e, se necessario, `nodeId`

## Decisao de fluxo

Use o MCP oficial por padrao quando:

- a tela ja estiver estavel no navegador
- nao houver dependencia critica de drawers abertos, icones convertidos ou verificacao fina
- o objetivo for rapidez para arquivo novo ou existente

Use a captura guardada quando:

- a tela usa Material Symbols ou Bootstrap Icons que podem virar texto
- ha drawers, modais ou estados transientes que precisam abrir antes da captura
- fontes ou alinhamentos ja falharam antes
- voce precisa validar o frame inserido apos a captura

## Fluxo padrao com MCP oficial

1. Descobrir a rota local final. Se vier uma rota relativa, converter para `http://localhost:5174/...`
2. Se houver URL do Figma, extrair:
   - `fileKey` da URL `https://www.figma.com/design/<fileKey>/...`
   - `nodeId` do parametro `node-id`, convertendo `123-456` para `123:456`
3. Chamar `mcp_figma_generate_figma_design` com o destino escolhido para gerar um `captureId` de uso unico:
   - `newFile` para criar arquivo novo
   - `existingFile` com `fileKey` e opcionalmente `nodeId`
4. Abrir a pagina local com o hash de captura `#figmacapture=...&figmaendpoint=...`
5. Deixar a pagina local submeter a captura usando esse mesmo `captureId`
6. Fazer polling com o mesmo `captureId` a cada 5 segundos, ate 10 vezes, ate `status = completed`
7. Registrar o resultado com:
   - rota exportada
   - destino no Figma
   - `captureId`
   - `file_key` retornado ou alvo usado

Notas obrigatorias:

- `captureId` e de uso unico e representa exatamente uma pagina/captura
- Fazer polling antes da abertura da URL com `figmacapture` nao conclui a exportacao
- Para localhost, o comando recomendado no repo e:

```bash
npm run figma:capture:localhost -- \
  --url "http://localhost:5174/professor/missoes" \
  --mode "existingFile" \
  --file-key "cKVnqgPDWVx3LWo4N3wWLD" \
  --node-id "4536:12591"
```

## Fluxo robusto com captura guardada

Quando o fluxo oficial puro nao for suficiente, usar o comando abaixo na raiz do workspace:

```bash
npm run figma:capture:guarded -- \
  --url "http://localhost:5174/teacher" \
  --file-key "SEU_FILE_KEY" \
  --node-id "123:456" \
  --verify-node-id "123:456" \
  --frame-name "Professor - Dashboard"
```

Entradas mais importantes:

- `--url`: rota local final
- `--file-key`: arquivo de destino no Figma
- `--node-id`: ponto de insercao no arquivo existente
- `--verify-node-id`: ancora para validar o resultado no Figma
- `--frame-name`: nome esperado do frame exportado

O script guardado aplica estas protecoes:

- espera `document.fonts.ready`
- converte SVGs e icones para inline quando necessario
- faz polling automatico no MCP
- falha explicitamente se detectar problemas de ligatures ou frame invalido

## Contrato de saida

Ao concluir a exportacao, sempre retorne um resumo curto contendo:

- URL local usada
- modo escolhido: `official-mcp` ou `guarded-script`
- destino: arquivo novo ou arquivo existente
- `fileKey` e `nodeId` usados
- `captureId` final
- qualquer risco residual para nova rodada de captura

## Artefatos desta skill

- `PLAYBOOK.md`: passo a passo detalhado e troubleshooting
- `templates/export-request.json`: molde para preparar uma exportacao repetivel

## Arquivos do repo que esta skill reaproveita

- `mcp.json`
- `MCP_FIGMA_QUICKSTART.md`
- `TESTE_MCP_FIGMA.md`
- `scripts/figma_capture_guarded.cjs`
- `scripts/figma_mcp_call.py`