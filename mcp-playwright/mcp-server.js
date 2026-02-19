import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.MCP_PORT || 3001;

app.use(cors());
app.use(express.json());

// Dados mock do Figma (substitua com dados reais conforme necessário)
const figmaData = {
  files: [
    {
      id: 'figma-file-1',
      name: 'Calendar Design',
      pages: [
        {
          id: 'page-1',
          name: 'Desktop',
          frames: [
            {
              id: 'frame-calendar',
              name: 'Calendar Component',
              width: 1280,
              height: 800,
              description: 'Main calendar layout for teacher dashboard'
            }
          ]
        }
      ]
    }
  ],
  screenshots: {}
};

// Endpoints MCP

/**
 * GET /mcp/health
 * Verifica se o servidor MCP está rodando
 */
app.get('/mcp/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MCP Figma Local',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /mcp/files
 * Lista todos os arquivos Figma disponíveis (mock)
 */
app.get('/mcp/files', (req, res) => {
  res.json({
    files: figmaData.files.map(f => ({
      id: f.id,
      name: f.name,
      key: f.id // compatibilidade com Figma API
    }))
  });
});

/**
 * GET /mcp/files/:fileId
 * Retorna detalhes de um arquivo Figma específico
 */
app.get('/mcp/files/:fileId', (req, res) => {
  const file = figmaData.files.find(f => f.id === req.params.fileId);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.json({
    id: file.id,
    name: file.name,
    pages: file.pages
  });
});

/**
 * GET /mcp/files/:fileId/pages
 * Lista páginas de um arquivo
 */
app.get('/mcp/files/:fileId/pages', (req, res) => {
  const file = figmaData.files.find(f => f.id === req.params.fileId);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.json({ pages: file.pages });
});

/**
 * GET /mcp/files/:fileId/pages/:pageId/frames
 * Lista frames de uma página específica
 */
app.get('/mcp/files/:fileId/pages/:pageId/frames', (req, res) => {
  const file = figmaData.files.find(f => f.id === req.params.fileId);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const page = file.pages.find(p => p.id === req.params.pageId);
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }

  res.json({ frames: page.frames });
});

/**
 * POST /mcp/capture
 * Captura screenshot de uma página/URL via Playwright
 * Corpo: { url: string, fullPage?: boolean, viewport?: { width, height } }
 */
app.post('/mcp/capture', async (req, res) => {
  const { url, fullPage = true, viewport = { width: 1280, height: 800 } } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  try {
    // Placeholder: Playwright capturaria aqui
    // Para demo, retorna um mock
    res.json({
      success: true,
      message: 'Screenshot capturado',
      url,
      viewport,
      fullPage,
      timestamp: new Date().toISOString(),
      screenshotPath: `./captures/screenshot-${Date.now()}.png`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /mcp/config
 * Retorna configurações do servidor MCP
 */
app.get('/mcp/config', (req, res) => {
  res.json({
    port: PORT,
    cors: true,
    dataDir: `${__dirname}/data`,
    screenshotDir: `${__dirname}/captures`,
    playwrightSupported: true
  });
});

/**
 * POST /mcp/export
 * Exporta dados Figma em diferentes formatos
 * Corpo: { fileId: string, format: 'json' | 'html', pages?: string[] }
 */
app.post('/mcp/export', (req, res) => {
  const { fileId, format = 'json', pages } = req.body;

  const file = figmaData.files.find(f => f.id === fileId);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  let content;
  let contentType;

  if (format === 'html') {
    contentType = 'text/html';
    content = generateHtmlExport(file);
  } else {
    contentType = 'application/json';
    content = JSON.stringify(file, null, 2);
  }

  res.setHeader('Content-Type', contentType);
  res.send(content);
});

// Função helper para gerar HTML
function generateHtmlExport(file) {
  const frames = file.pages[0]?.frames || [];
  const frameList = frames
    .map(f => `<div class="frame"><h3>${f.name}</h3><p>${f.description || ''}</p></div>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${file.name} - MCP Figma Local</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 20px; }
            .frame { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
            h1 { color: #333; }
        </style>
    </head>
    <body>
        <h1>${file.name}</h1>
        ${frameList}
        <p><small>Gerado por MCP Figma Local</small></p>
    </body>
    </html>
  `;
}

// Erro 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /mcp/health',
      'GET /mcp/files',
      'GET /mcp/files/:fileId',
      'GET /mcp/files/:fileId/pages',
      'GET /mcp/files/:fileId/pages/:pageId/frames',
      'POST /mcp/capture',
      'GET /mcp/config',
      'POST /mcp/export'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 MCP Figma Local rodando em http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponíveis:`);
  console.log(`   - GET  http://localhost:${PORT}/mcp/health`);
  console.log(`   - GET  http://localhost:${PORT}/mcp/files`);
  console.log(`   - POST http://localhost:${PORT}/mcp/capture`);
  console.log(`   - GET  http://localhost:${PORT}/mcp/config`);
  console.log(`\n💡 Configure VS Code para conectar a este servidor em .vscode/settings.json`);
});
