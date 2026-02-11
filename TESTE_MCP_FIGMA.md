# Teste MCP Figma vs VS Code (✅ CORRIGIDO)

## Status: ✅ Extensões MCP instaladas

- `automatalabs.copilot-mcp` v0.0.90
- `anthropic.claude-code` v2.1.39  
- Pasta `.mcp/` conflitante removida

## Instruções de teste (ATUALIZADAS):

### 1. Reiniciar VS Code
```
Ctrl+Shift+P → "Developer: Reload Window"
```
**Para carregar as extensões MCP recém-instaladas**

### 2. Abrir configuração MCP 

**Opção A** (Copilot MCP):
```
Ctrl+Shift+P → "Copilot MCP: Open Configuration"
```

**Opção B** (Claude Code):  
```
Ctrl+Shift+P → "Claude: Open MCP Configuration"
```

**Opção C** (Arquivo direto):
- Abrir [`mcp.json`](mcp.json) no editor
- Usar painel de atividade lateral (ícone MCP se aparecer)

### 3. Conectar ao servidor Figma MCP

No painel MCP ou configuration:
- Deve aparecer servidor "figma" 
- Clique **"Connect"** ou **"Start"**
- Assim que conectar, VS Code abrirá autenticação OAuth do Figma
- Clique **"Allow Access"**

### 4. Testar com Copilot Chat

Abra Copilot Chat (`Ctrl+Shift+I`) e teste:

#### Exemplo 1 - Verificar conexão
```
@mcp list servers
```

#### Exemplo 2 - URL de frame Figma
```
Implementar este componente em React + Tailwind:
https://www.figma.com/design/abc123/Design?node-id=1-2

Extrair cores, spacing e typography automaticamente.
```

#### Exemplo 3 - Claude Code (se usando)
```
/mcp figma status
```

## URLs de exemplo (substitua pelos seus):

- Calendar Component: `https://figma.com/design/[FILE_ID]/Calendar?node-id=[NODE_ID]`
- Design System: `https://figma.com/design/[FILE_ID]/Tokens?node-id=[NODE_ID]`

## Sinais de sucesso:

✅ **MCP listado**: `@mcp list servers` mostra "figma"
✅ **Autenticado**: Sem erro OAuth 
✅ **Copilot responde**: Inclui detalhes específicos do design Figma
✅ **Geração de código**: Menciona elementos visuais corretos

## Troubleshooting:

❌ **"MCP not found"**: Reinicie VS Code (`Ctrl+Shift+P` → "Developer: Reload Window")
❌ **No MCP panel**: Verifique se extensões estão ativadas em Extensions
❌ **Auth failed**: Verifique login no Figma e tente novamente
❌ **Server offline**: Figma MCP é online, verifique internet