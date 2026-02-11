# Guia Rápido: MCP Figma (seguindo documentação oficial)

## ✅ Extensões MCP instaladas e já está configurado

### Extensões instaladas:
- ✅ `automatalabs.copilot-mcp` v0.0.90 - Gerenciar servidores MCP
- ✅ `anthropic.claude-code` v2.1.39 - Claude Code com MCP nativo
- ✅ Conflitos de pasta `.mcp/` removidos

### Como usar (passos corretos):

1. **Reinicie VS Code** (para carregar extensões):
   - `Ctrl+Shift+P` → `Developer: Reload Window`

2. **Abra configuração MCP**:
   - `Ctrl+Shift+P` → `Copilot MCP: Open Configuration`
   - Ou abrir [`mcp.json`](mcp.json) diretamente

3. **Conecte ao Figma**:
   - No painel MCP: clique **"Connect"** em "figma"
   - Autentique no Figma quando aparecer OAuth

4. **Use no Copilot Chat**:
   ```
   @mcp list servers
   
   Implementar este design: [URL_DO_FIGMA]
   ```

### Formato oficial (conforme documentação)

**`mcp.json`**:
```json
{
  "inputs": [],
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

### Como usar (formato oficial):

1. **Abra VS Code e execute**:
   - `Ctrl+Shift+P` → `MCP: Open Workspace Folder MCP Configuration`
   - Ou use o arquivo `mcp.json` já criado na raiz

2. **Clique em "Start"** ao lado de "figma" no painel MCP

3. **Autenticação**: VS Code vai abrir o Figma para autenticação OAuth

4. **Usar no Copilot Chat**:
   - Copie um link do Figma (frame ou layer): `https://figma.com/file/...`
   - Prompt: "Implemente este design: [URL_DO_FIGMA]"

### Servidor local opcional

Se quiser usar o servidor local personalizado:

```powershell
cd mcp-playwright
npm start
# Usa porta 3001, configurado em codeagent.json como "figma-local"
```

### Boas práticas (da documentação):

1. **Link-based**: Use URLs do Figma diretamente nos prompts
2. **Frames específicos**: Copie link de frames individuais para melhor contexto
3. **Rules customizadas**: Configure regras no MCP para output consistente

### Exemplos de uso:

```
"Implementar este componente: https://figma.com/file/ABC123/Design?node-id=1%3A2"

"Extrair tokens de design desta página: [FIGMA_URL]"

"Gerar código React para este frame: [FIGMA_URL]"
```

### Troubleshooting

**Se MCP não aparecer no VS Code:**
- Instale extensão MCP oficial
- Reinicie VS Code (`Ctrl+Shift+P` → "Developer: Reload Window")

**Autenticação falha:**
- Verifique se está logado no Figma
- Tente novamente o fluxo OAuth

**Want local only?**
- Use `figma-local` server (porta 3001) in `codeagent.json`
- Customize `mcp-server.js` conforme necessário

---

**Referências**:
- [Documentação oficial](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#vs-code)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- Servidor oficial: `https://mcp.figma.com/mcp`
