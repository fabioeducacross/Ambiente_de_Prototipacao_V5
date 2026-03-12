# Playbook - Exportacao de Prototipos para o Figma

## Inputs minimos

- `routeUrl`: URL final da tela local
- `frameName`: nome do frame esperado no Figma
- `mode`: `newFile` ou `existingFile`
- `figmaUrl`: obrigatoria quando o destino for um arquivo existente

## Preparacao

1. Confirmar que o FrontOffice esta rodando em `http://localhost:5174`
2. Validar se a tela desejada ja esta acessivel no browser
3. Confirmar se a exportacao vai para arquivo novo ou para arquivo existente

## Como extrair dados de uma URL do Figma

Exemplo:

```text
https://www.figma.com/design/AbCdEf1234567890/Calendario?node-id=10727-3995
```

- `fileKey`: `AbCdEf1234567890`
- `nodeId`: `10727:3995`

## Fluxo recomendado

### 1. Modo oficial

Use o MCP oficial quando a captura for direta.

Passos:

1. Chamar `mcp_figma_generate_figma_design` com o destino final para gerar um `captureId`
2. Abrir a rota local com o hash `figmacapture` montado para esse `captureId`
3. Deixar a propria pagina local concluir a submissao da captura
4. Fazer polling com o mesmo `captureId` a cada 5 segundos, ate 10 vezes
5. Encerrar somente com `status = completed`

Comando recomendado no repo:

```bash
npm run figma:capture:localhost -- \
   --url "http://localhost:5174/professor/missoes" \
   --mode "existingFile" \
   --file-key "cKVnqgPDWVx3LWo4N3wWLD" \
   --node-id "4536:12591"
```

### 2. Modo guardado

Use quando houver maior sensibilidade visual.

Passos:

1. Preparar a rota local final
2. Extrair `fileKey` e `nodeId`
3. Rodar `npm run figma:capture:guarded -- ...`
4. Ler o resultado e confirmar que o frame validado bate com o esperado

## Quando promover para o modo guardado

Troque do modo oficial para o guardado se qualquer um destes sinais aparecer:

- icones renderizados como texto
- fontes incorretas ou desalinhadas
- drawer, modal ou tooltip nao ficaram no estado certo
- insercao em arquivo existente aconteceu no lugar errado

## Checklist final

- a rota local esta correta
- o destino no Figma esta correto
- o nome do frame foi definido
- a URL com `figmacapture` foi aberta
- o mesmo `captureId` foi acompanhado ate `completed`
- o resumo final da exportacao foi registrado

## Troubleshooting rapido

- MCP Figma nao conectado: abrir `mcp.json` e reconectar o servidor `figma`
- OAuth expirado: reconectar o servidor no VS Code
- `captureId` sem conclusao: refazer a captura; IDs sao de uso unico
- se a URL com `figmacapture` nao for aberta, a captura nao sai de `pending`
- se o mesmo `captureId` for reutilizado em outra pagina, reiniciar o fluxo com novo `captureId`
- `nodeId` invalido: conferir se veio de `Copy link to selection`
- frame com regressao visual: repetir via `figma:capture:guarded`