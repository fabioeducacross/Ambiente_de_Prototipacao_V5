# MCP Figma Local + Playwright

Servidor MCP local (sem token do Figma) + testes visuais com Playwright.

## Início rápido

### 1. Instalar dependências

```powershell
cd mcp-playwright
npm install
npx playwright install
```

### 2. Rodar servidor MCP local

```powershell
npm start
```

Output esperado:
```
🚀 MCP Figma Local rodando em http://localhost:3001
📝 Endpoints disponíveis:
   - GET  http://localhost:3001/mcp/health
   - GET  http://localhost:3001/mcp/files
   - POST http://localhost:3001/mcp/capture
   - GET  http://localhost:3001/mcp/config
```

### 3. Testar conexão do servidor

Em outro terminal PowerShell:

```powershell
curl http://localhost:3001/mcp/health
```

Response esperada:
```json
{
  "status": "ok",
  "service": "MCP Figma Local",
  "version": "1.0.0"
}
```

### 4. Configurar VS Code para conectar ao MCP

O arquivo `.vscode/settings.json` já está configurado. Você pode verificar se está conectado em:
- **Copilot Chat** → abrir painel do Copilot
- Digitar: `@mcp figma` ou `@mcp config`
- Verá endpoints disponíveis do servidor local

Alternativa (extensão MCP):
- Instale a extensão Copilot/MCP no VS Code
- Configure a URL: `http://localhost:3001`

### 5. Rodar testes visuais com Playwright (opcional)

```powershell
# Gerar baseline de screenshots
$env:TEST_URL = 'http://localhost:5173'
npx playwright test --update-snapshots

# Rodar testes de comparação
npx playwright test

# Ver relatório
npx playwright show-report
```

## Endpoints disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/mcp/health` | Status do servidor |
| GET | `/mcp/files` | Lista arquivos Figma (mock) |
| GET | `/mcp/files/:fileId` | Detalhes de um arquivo |
| GET | `/mcp/files/:fileId/pages` | Páginas de um arquivo |
| GET | `/mcp/files/:fileId/pages/:pageId/frames` | Frames de uma página |
| POST | `/mcp/capture` | Capturar screenshot via Playwright |
| GET | `/mcp/config` | Configuração do servidor |
| POST | `/mcp/export` | Exportar dados em JSON ou HTML |

## Desenvolvimento

### Modo watch (auto-reload)

```powershell
npm run dev
```

### Adicionar dados Figma

Edite o objeto `figmaData` em `mcp-server.js` (linhas ~20-50) com seus arquivos/frames Figma.

Exemplo:
```javascript
const figmaData = {
  files: [
    {
      id: 'seu-figma-file-id',
      name: 'Seu Projeto',
      pages: [
        {
          id: 'page-1',
          name: 'Desktop',
          frames: [
            {
              id: 'frame-1',
              name: 'Component XYZ',
              width: 1280,
              height: 800
            }
          ]
        }
      ]
    }
  ]
};
```

## Variáveis de ambiente

Veja no arquivo `.env`:
- `MCP_PORT` - porta do servidor (default: 3001)
- `DEBUG` - ativar logs de debug

## Troubleshooting

**Porta 3001 já está em uso?**
```powershell
# Mude a porta
$env:MCP_PORT = 3002
npm start
```

**VS Code não conecta?**
- Verifique se o servidor está rodando: `curl http://localhost:3001/mcp/health`
- Verifique `.vscode/settings.json` e `.vscode/codeagent.json`
- Reinicie VS Code (`Ctrl+Shift+P` → "Developer: Reload Window")

**Playwright não funciona?**
```powershell
npx playwright install --with-deps
```
