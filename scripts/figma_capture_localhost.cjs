#!/usr/bin/env node

const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

const DEFAULT_POLL_ATTEMPTS = 10;
const DEFAULT_POLL_INTERVAL_MS = 5000;
const DEFAULT_CAPTURE_DELAY_MS = 1000;
const MCP_CAPTURE_BASE = "https://mcp.figma.com/mcp/capture";

function printHelp() {
  console.log(`Uso:
  node scripts/figma_capture_localhost.cjs \\
    --url "<url-localhost>" \\
    --mode "existingFile|newFile" \\
    [--file-key "<fileKey>"] \\
    [--node-id "<nodeId>"] \\
    [--plan-key "<planKey>"] \\
    [--selector "body"] \\
    [--capture-delay-ms ${DEFAULT_CAPTURE_DELAY_MS}] \\
    [--poll-attempts ${DEFAULT_POLL_ATTEMPTS}] \\
    [--poll-interval-ms ${DEFAULT_POLL_INTERVAL_MS}] \\
    [--open "auto|manual"] \\
    [--json]

Retomar polling:
  node scripts/figma_capture_localhost.cjs --capture-id "<captureId>" [--json]

Exemplo:
  node scripts/figma_capture_localhost.cjs \\
    --url "http://localhost:5174/professor/missoes" \\
    --mode "existingFile" \\
    --file-key "cKVnqgPDWVx3LWo4N3wWLD" \\
    --node-id "4536:12591"
`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

function requireArg(args, key) {
  if (!args[key]) {
    throw new Error(`Parâmetro obrigatório ausente: --${key}`);
  }
}

function toInt(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseJsonLoose(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) {
    return null;
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
  }
  return null;
}

function extractContentText(mcpResponse) {
  const eventContent = mcpResponse?.events?.[0]?.data_json?.result?.content || [];
  const directContent = mcpResponse?.json?.result?.content || [];
  return [...eventContent, ...directContent]
    .filter((item) => item && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n");
}

function getMcpScriptPath() {
  return path.resolve(__dirname, "figma_mcp_call.py");
}

function callMcpTool(name, toolArgs, timeoutSec = 60) {
  const payload = JSON.stringify({ name, arguments: toolArgs });
  const proc = spawnSync(
    "python",
    [getMcpScriptPath(), "--method", "tools/call", "--params", payload, "--timeout", String(timeoutSec)],
    {
      encoding: "utf8",
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      maxBuffer: 20 * 1024 * 1024,
      timeout: Math.max(45000, timeoutSec * 1000 + 15000),
    }
  );
  if (proc.error) {
    throw proc.error;
  }
  if (proc.status !== 0) {
    throw new Error(`Erro ao chamar MCP (${name}): ${proc.stderr || proc.stdout || "sem saída"}`);
  }
  const parsed = parseJsonLoose(proc.stdout);
  if (!parsed) {
    throw new Error(`Resposta MCP inválida (${name}): ${String(proc.stdout).slice(0, 800)}`);
  }
  if (parsed.status && parsed.status !== 200) {
    throw new Error(`MCP ${name} retornou status ${parsed.status}: ${JSON.stringify(parsed).slice(0, 1200)}`);
  }
  return parsed;
}

function extractCaptureId(text) {
  const match = /Capture ID generated: `([^`]+)`/i.exec(text);
  return match ? match[1] : null;
}

function extractStatus(text) {
  const match = /Status for capture ID `[^`]+`: \*\*([^*]+)\*\*/i.exec(text);
  return match ? match[1].toLowerCase() : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isLocalUrl(rawUrl) {
  const parsed = new URL(rawUrl);
  const host = parsed.hostname.toLowerCase();
  return host === "localhost"
    || host === "127.0.0.1"
    || host === "0.0.0.0"
    || host === "[::1]"
    || host.endsWith(".local");
}

function buildCaptureUrl(rawUrl, captureId, selector, captureDelayMs) {
  const parsed = new URL(rawUrl);
  const params = new URLSearchParams();
  params.set("figmacapture", captureId);
  params.set("figmaendpoint", `${MCP_CAPTURE_BASE}/${captureId}/submit`);
  params.set("figmadelay", String(captureDelayMs));
  if (selector) {
    params.set("figmaselector", selector);
  }
  parsed.hash = params.toString();
  return parsed.toString();
}

function openUrl(targetUrl) {
  if (process.platform === "win32") {
    const child = spawn(process.env.comspec || "cmd.exe", ["/c", "start", "", targetUrl], {
      detached: true,
      stdio: "ignore",
    });
    child.unref();
    return;
  }
  if (process.platform === "darwin") {
    const child = spawn("open", [targetUrl], { detached: true, stdio: "ignore" });
    child.unref();
    return;
  }
  const child = spawn("xdg-open", [targetUrl], { detached: true, stdio: "ignore" });
  child.unref();
}

async function pollCapture(captureId, attempts, intervalMs) {
  let lastText = "";
  let lastStatus = "unknown";
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (attempt > 1) {
      await sleep(intervalMs);
    }
    const pollResponse = callMcpTool("generate_figma_design", { captureId }, 60);
    lastText = extractContentText(pollResponse);
    lastStatus = extractStatus(lastText) || lastStatus;
    console.log(`[poll ${attempt}/${attempts}] status=${lastStatus}`);
    if (lastStatus === "completed") {
      return { status: lastStatus, text: lastText, attemptsUsed: attempt };
    }
    if (lastStatus === "failed" || lastStatus === "expired") {
      return { status: lastStatus, text: lastText, attemptsUsed: attempt };
    }
  }
  return { status: lastStatus, text: lastText, attemptsUsed: attempts };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    printHelp();
    return;
  }

  const pollAttempts = toInt(args["poll-attempts"], DEFAULT_POLL_ATTEMPTS);
  const pollIntervalMs = toInt(args["poll-interval-ms"], DEFAULT_POLL_INTERVAL_MS);
  const captureDelayMs = toInt(args["capture-delay-ms"], DEFAULT_CAPTURE_DELAY_MS);
  const selector = args.selector || null;
  const openMode = args.open || "auto";
  const jsonMode = Boolean(args.json);

  let captureId = args["capture-id"] || null;
  let openedUrl = null;
  let targetUrl = args.url || null;
  let initText = "";

  if (!captureId) {
    requireArg(args, "url");
    requireArg(args, "mode");
    if (!isLocalUrl(args.url)) {
      throw new Error("Este helper só suporta URLs locais (localhost/127.0.0.1/*.local).");
    }

    const initArgs = { outputMode: args.mode };
    if (args.mode === "existingFile") {
      requireArg(args, "file-key");
      initArgs.fileKey = args["file-key"];
      if (args["node-id"]) {
        initArgs.nodeId = args["node-id"];
      }
    }
    if (args.mode === "newFile" && args["plan-key"]) {
      initArgs.planKey = args["plan-key"];
    }

    const initResponse = callMcpTool("generate_figma_design", initArgs, 60);
    initText = extractContentText(initResponse);
    captureId = extractCaptureId(initText);
    if (!captureId) {
      throw new Error(`Não foi possível extrair captureId da resposta MCP: ${initText.slice(0, 1000)}`);
    }

    openedUrl = buildCaptureUrl(args.url, captureId, selector, captureDelayMs);
    targetUrl = args.url;
    console.log(`captureId=${captureId}`);
    console.log(`captureUrl=${openedUrl}`);

    if (openMode === "auto") {
      openUrl(openedUrl);
      await sleep(captureDelayMs + 1000);
    }
  }

  const pollResult = await pollCapture(captureId, pollAttempts, pollIntervalMs);
  const summary = {
    ok: pollResult.status === "completed",
    status: pollResult.status,
    captureId,
    targetUrl,
    openedUrl,
    attemptsUsed: pollResult.attemptsUsed,
    initText,
    pollText: pollResult.text,
  };

  if (jsonMode) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  console.log("Resumo:");
  console.log(JSON.stringify(summary, null, 2));

  if (!summary.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 1;
});