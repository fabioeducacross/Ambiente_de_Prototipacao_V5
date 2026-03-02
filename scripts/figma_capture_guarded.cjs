#!/usr/bin/env node

const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { chromium } = require("playwright");

const DEFAULT_FRAME_NAME = "Relatório Missão - Semana 1";
const DEFAULT_SELECTOR = "body";
const DEFAULT_POLL_ATTEMPTS = 10;
const DEFAULT_POLL_INTERVAL_MS = 5000;
const DEFAULT_CAPTURE_DELAY_MS = 1800;
const DEFAULT_TOP_BLOCK_OFFSET_PX = 0;
const DEFAULT_DRAWER_INDEX = 0;

const ICON_LIGATURES = new Set([
  "menu",
  "joystick",
  "account_circle",
  "mail",
  "expand_more",
  "logout",
  "home",
  "add_circle",
  "mountain_flag",
  "pie_chart",
  "graph_5",
  "person_play",
  "calendar_month",
  "videogame_asset",
  "emoji_events",
  "group",
  "folder_shared",
  "sentiment_satisfied",
  "school",
  "assignment",
  "mic",
  "record_voice_over",
  "checkbook",
  "airplane_ticket",
  "bolt",
  "folder_open",
  "account_balance",
  "auto_stories",
  "checklist",
  "timelapse",
  "extension",
]);

function printHelp() {
  console.log(`Uso:
  node scripts/figma_capture_guarded.cjs \\
    --url "<url-local>" \\
    --file-key "<fileKey>" \\
    --node-id "<nodeId-insercao>" \\
    --verify-node-id "<nodeId-ancora-verificacao>" \\
    [--capture-id "<captureId-existente>"] \\
    [--frame-name "${DEFAULT_FRAME_NAME}"] \\
    [--selector "${DEFAULT_SELECTOR}"] \\
    [--capture-delay-ms ${DEFAULT_CAPTURE_DELAY_MS}] \\
    [--top-block-offset-px ${DEFAULT_TOP_BLOCK_OFFSET_PX}] \\
    [--open-metric-drawer-index ${DEFAULT_DRAWER_INDEX}] \\
    [--skip-poll] \\
    [--skip-verify] \\
    [--poll-attempts ${DEFAULT_POLL_ATTEMPTS}] \\
    [--poll-interval-ms ${DEFAULT_POLL_INTERVAL_MS}]

Exemplo:
  node scripts/figma_capture_guarded.cjs \\
    --url "http://localhost:5174/professor/missoes/1/relatorio?..." \\
    --file-key "cKVnqgPDWVx3LWo4N3wWLD" \\
    --node-id "10727:3995" \\
    --verify-node-id "4536:12591"
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
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
  const directError = parsed?.json?.result?.isError === true;
  if (directError) {
    const errText = extractContentText(parsed) || JSON.stringify(parsed.json.result);
    throw new Error(`MCP ${name} retornou erro: ${errText}`);
  }
  return parsed;
}

function extractContentText(mcpResponse) {
  const eventContent = mcpResponse?.events?.[0]?.data_json?.result?.content || [];
  const directContent = mcpResponse?.json?.result?.content || [];
  const content = [...eventContent, ...directContent];
  return content
    .filter((item) => item && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n");
}

function extractCaptureId(text) {
  const match = /Capture ID generated: `([^`]+)`/i.exec(text);
  return match ? match[1] : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseFrameIds(metadataText, frameName) {
  const ids = [];
  const regex = new RegExp(`<frame id="([^"]+)" name="${escapeRegExp(frameName)}"`, "g");
  let match = regex.exec(metadataText);
  while (match) {
    ids.push(match[1]);
    match = regex.exec(metadataText);
  }
  return ids;
}

function sortNodeIds(ids) {
  return [...ids].sort((a, b) => {
    const ma = /^(-?\d+):(-?\d+)$/.exec(a);
    const mb = /^(-?\d+):(-?\d+)$/.exec(b);
    if (!ma || !mb) {
      return a.localeCompare(b);
    }
    const left = Number(ma[1]) - Number(mb[1]);
    if (left !== 0) {
      return left;
    }
    return Number(ma[2]) - Number(mb[2]);
  });
}

function getTextNodeNames(metadataText) {
  const names = [];
  const regex = /<text id="[^"]+" name="([^"]*)"/g;
  let match = regex.exec(metadataText);
  while (match) {
    names.push(match[1]);
    match = regex.exec(metadataText);
  }
  return names;
}

function findLigatureHits(textNames) {
  const directHits = textNames.filter((name) => ICON_LIGATURES.has(name));
  const heuristicHits = textNames.filter((name) => /^[a-z0-9]+(?:_[a-z0-9]+)+$/.test(name));
  return {
    directHits,
    heuristicHits,
  };
}

async function submitCapture({
  url,
  frameName,
  captureId,
  endpoint,
  selector,
  captureDelayMs,
  topBlockOffsetPx,
  openMetricDrawerIndex,
}) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    page.on("response", async (res) => {
      if (!res.url().includes(`/capture/${captureId}/submit`)) {
        return;
      }
      let bodyPreview = "";
      try {
        bodyPreview = (await res.text()).slice(0, 400);
      } catch {
        bodyPreview = "body_unavailable";
      }
      console.log(`[capture-submit] status=${res.status()} body=${bodyPreview}`);
    });

    await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });

    let drawerOpenResult = {
      requestedIndex: openMetricDrawerIndex,
      clicked: false,
      buttonText: null,
      detected: false,
      detection: null,
    };
    if (openMetricDrawerIndex > 0) {
      const metricButtons = page.locator("button.metric-link");
      const metricCount = await metricButtons.count();
      if (openMetricDrawerIndex > metricCount) {
        throw new Error(
          `Drawer index inválido (${openMetricDrawerIndex}). A tela possui ${metricCount} botões metric-link.`
        );
      }
      const target = metricButtons.nth(openMetricDrawerIndex - 1);
      drawerOpenResult.buttonText = (await target.innerText()).trim();
      await target.click();
      await page.waitForTimeout(900);

      const detection = await page.evaluate(() => {
        const namedSelectorHit = [
          ".offcanvas.show",
          ".b-offcanvas.show",
          ".drawer.show",
          ".drawer.open",
          "[class*='drawer'][class*='open']",
          "[class*='offcanvas'][class*='show']",
        ].some((selector) => !!document.querySelector(selector));

        const largeRightPanels = Array.from(document.querySelectorAll("*"))
          .filter((element) => {
            const styles = getComputedStyle(element);
            if (
              styles.display === "none" ||
              styles.visibility === "hidden" ||
              Number.parseFloat(styles.opacity || "1") < 0.1
            ) {
              return false;
            }
            const rect = element.getBoundingClientRect();
            const attachedToRight = Math.abs(rect.right - window.innerWidth) <= 8;
            return (
              attachedToRight &&
              rect.width >= 280 &&
              rect.height >= 260 &&
              (styles.position === "fixed" || styles.position === "absolute")
            );
          })
          .slice(0, 5)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              className: element.className || "",
              x: rect.x,
              y: rect.y,
              w: rect.width,
              h: rect.height,
            };
          });

        return {
          namedSelectorHit,
          largeRightPanelCount: largeRightPanels.length,
          largeRightPanels,
        };
      });

      drawerOpenResult = {
        ...drawerOpenResult,
        clicked: true,
        detected: detection.namedSelectorHit || detection.largeRightPanelCount > 0,
        detection,
      };

      if (!drawerOpenResult.detected) {
        throw new Error(
          `Não foi possível detectar drawer aberto após clicar no card ${openMetricDrawerIndex}.`
        );
      }
    }

    const prep = await page.evaluate(async ({ frameNameValue, topBlockOffsetValue }) => {
      document.title = frameNameValue;

      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }

      const fetchSvg = async (source) => {
        const response = await fetch(source, { credentials: "omit" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        if (!text.includes("<svg")) {
          throw new Error("invalid_svg");
        }
        return text;
      };

      const parseSvg = (svgText) => {
        const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svg = doc.documentElement;
        if (!svg || svg.tagName.toLowerCase() !== "svg") {
          throw new Error("invalid_svg_root");
        }
        return svg;
      };

      const applyIconStyle = (svg, sourceEl) => {
        const styles = getComputedStyle(sourceEl);
        const box = sourceEl.getBoundingClientRect();
        const width = styles.width && styles.width !== "auto" ? styles.width : `${box.width || 16}px`;
        const height = styles.height && styles.height !== "auto" ? styles.height : `${box.height || 16}px`;
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("fill", "currentColor");
        svg.style.color = styles.color;
        svg.style.display = "block";
        svg.style.width = width;
        svg.style.height = height;
        svg.style.verticalAlign = styles.verticalAlign;
        svg.style.flexShrink = "0";
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
      };

      const mountSvgInHost = (host, svg, markerAttr, markerValue) => {
        const styles = getComputedStyle(host);
        const box = host.getBoundingClientRect();
        const width = styles.width && styles.width !== "auto" ? styles.width : `${box.width || 16}px`;
        const height = styles.height && styles.height !== "auto" ? styles.height : `${box.height || 16}px`;
        host.textContent = "";
        host.style.display = styles.display;
        host.style.width = width;
        host.style.height = height;
        host.style.lineHeight = styles.lineHeight;
        host.style.verticalAlign = styles.verticalAlign;
        host.style.fontSize = "0px";
        host.style.color = styles.color;
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        host.setAttribute(markerAttr, markerValue);
        host.appendChild(svg);
      };

      const cache = new Map();
      const getCachedSvg = async (cacheKey, iconUrl) => {
        if (!cache.has(cacheKey)) {
          cache.set(
            cacheKey,
            fetchSvg(iconUrl)
              .then((svgText) => svgText)
              .catch(() => null)
          );
        }
        return cache.get(cacheKey);
      };

      // 1) Inline all <img src=*.svg>
      const imageNodes = Array.from(document.querySelectorAll("img"));
      const svgImages = imageNodes.filter((image) => {
        const cleanSrc = (image.currentSrc || image.src || "").split("#")[0].split("?")[0].toLowerCase();
        return cleanSrc.endsWith(".svg");
      });

      let inlinedImageSvg = 0;
      for (const image of svgImages) {
        try {
          const svgText = await fetchSvg(image.currentSrc || image.src);
          const svg = parseSvg(svgText);
          const styles = getComputedStyle(image);
          svg.style.display = styles.display === "inline" ? "inline-block" : styles.display;
          svg.style.width = styles.width;
          svg.style.height = styles.height;
          svg.setAttribute("data-capture-inline-svg", "1");
          image.replaceWith(svg);
          inlinedImageSvg += 1;
        } catch {}
      }

      // 2) Convert Material Symbols ligatures to SVG
      const materialNodes = Array.from(document.querySelectorAll(".material-symbols-outlined"));
      let materialReplaced = 0;
      let materialFailed = 0;
      for (const node of materialNodes) {
        const ligature = (node.textContent || "").trim();
        if (!ligature) {
          continue;
        }
        const slug = ligature.replace(/_/g, "-");
        const iconUrl = `https://api.iconify.design/material-symbols/${encodeURIComponent(slug)}.svg`;
        try {
          const svgText = await getCachedSvg(`material:${slug}`, iconUrl);
          if (!svgText) {
            materialFailed += 1;
            continue;
          }
          const svg = parseSvg(svgText);
          applyIconStyle(svg, node);
          mountSvgInHost(node, svg, "data-capture-material-icon", ligature);
          materialReplaced += 1;
        } catch {
          materialFailed += 1;
        }
      }

      // 3) Convert Bootstrap icon fonts to SVG
      const bootstrapNodes = Array.from(document.querySelectorAll("i.bi"));
      let bootstrapReplaced = 0;
      let bootstrapFailed = 0;
      for (const node of bootstrapNodes) {
        const iconClass = Array.from(node.classList).find((className) => className.startsWith("bi-"));
        if (!iconClass) {
          continue;
        }
        const slug = iconClass.replace(/^bi-/, "");
        const iconUrl = `https://api.iconify.design/bi/${encodeURIComponent(slug)}.svg`;
        try {
          const svgText = await getCachedSvg(`bootstrap:${slug}`, iconUrl);
          if (!svgText) {
            bootstrapFailed += 1;
            continue;
          }
          const svg = parseSvg(svgText);
          applyIconStyle(svg, node);
          mountSvgInHost(node, svg, "data-capture-bootstrap-icon", slug);
          bootstrapReplaced += 1;
        } catch {
          bootstrapFailed += 1;
        }
      }

      // 4) Inline typography style in text-bearing elements
      const textElements = Array.from(document.querySelectorAll("*")).filter((element) => {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) {
          return false;
        }
        return Array.from(element.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || "").trim().length > 0
        );
      });

      let typographyInlined = 0;
      for (const element of textElements) {
        const styles = getComputedStyle(element);
        element.style.fontFamily = styles.fontFamily;
        element.style.fontSize = styles.fontSize;
        element.style.fontWeight = styles.fontWeight;
        element.style.fontStyle = styles.fontStyle;
        element.style.lineHeight = styles.lineHeight;
        element.style.letterSpacing = styles.letterSpacing;
        element.style.textTransform = styles.textTransform;
        element.style.color = styles.color;
        typographyInlined += 1;
      }

      // 5) Inline shape-critical styles to reduce drift in cards/tabs/containers
      const allElements = Array.from(document.querySelectorAll("*"));
      let shapeStylesInlined = 0;
      for (const element of allElements) {
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) {
          continue;
        }
        const styles = getComputedStyle(element);
        const hasShape =
          styles.backgroundColor !== "rgba(0, 0, 0, 0)" ||
          styles.backgroundImage !== "none" ||
          styles.borderTopWidth !== "0px" ||
          styles.borderRightWidth !== "0px" ||
          styles.borderBottomWidth !== "0px" ||
          styles.borderLeftWidth !== "0px" ||
          styles.borderRadius !== "0px" ||
          styles.boxShadow !== "none";

        if (!hasShape) {
          continue;
        }

        element.style.backgroundColor = styles.backgroundColor;
        element.style.backgroundImage = styles.backgroundImage;
        element.style.backgroundSize = styles.backgroundSize;
        element.style.backgroundPosition = styles.backgroundPosition;
        element.style.backgroundRepeat = styles.backgroundRepeat;
        element.style.borderTop = styles.borderTop;
        element.style.borderRight = styles.borderRight;
        element.style.borderBottom = styles.borderBottom;
        element.style.borderLeft = styles.borderLeft;
        element.style.borderRadius = styles.borderRadius;
        element.style.boxShadow = styles.boxShadow;
        element.style.opacity = styles.opacity;
        shapeStylesInlined += 1;
      }

      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }

      let topBlockShiftApplied = false;
      if (topBlockOffsetValue !== 0) {
        const missionPage =
          document.querySelector(".mission-report-page") ||
          document.querySelector('[class*="mission-report"]');
        const topBlock = missionPage ? missionPage.firstElementChild : null;
        if (topBlock && topBlock instanceof HTMLElement) {
          const currentTransform = getComputedStyle(topBlock).transform;
          if (currentTransform && currentTransform !== "none") {
            topBlock.style.transform = `${currentTransform} translateY(${topBlockOffsetValue}px)`;
          } else {
            topBlock.style.transform = `translateY(${topBlockOffsetValue}px)`;
          }
          topBlockShiftApplied = true;
        }
      }

      return {
        inlinedImageSvg,
        materialFound: materialNodes.length,
        materialReplaced,
        materialFailed,
        bootstrapFound: bootstrapNodes.length,
        bootstrapReplaced,
        bootstrapFailed,
        typographyInlined,
        shapeStylesInlined,
        remainingMaterialLigatureText: Array.from(document.querySelectorAll(".material-symbols-outlined")).filter(
          (element) => (element.textContent || "").trim().length > 0
        ).length,
        remainingBootstrapIconText: Array.from(document.querySelectorAll("i.bi")).filter(
          (element) => (element.textContent || "").trim().length > 0
        ).length,
        topBlockShiftApplied,
        topBlockOffsetPx: topBlockOffsetValue,
        fontStatusAfterPrep: document.fonts ? document.fonts.status : "unknown",
      };
    }, { frameNameValue: frameName, topBlockOffsetValue: topBlockOffsetPx });
    prep.drawerOpenResult = drawerOpenResult;

    if (prep.materialFailed > 0 || prep.bootstrapFailed > 0) {
      throw new Error(`Falha ao converter ícones para SVG: ${JSON.stringify(prep)}`);
    }
    if (prep.remainingMaterialLigatureText > 0 || prep.remainingBootstrapIconText > 0) {
      throw new Error(`Ícones de fonte ainda presentes no DOM: ${JSON.stringify(prep)}`);
    }

    await page.addScriptTag({ url: "https://mcp.figma.com/mcp/html-to-design/capture.js" });

    const submitResponsePromise = page.waitForResponse(
      (response) => response.url().includes(`/capture/${captureId}/submit`),
      { timeout: 25000 }
    );

    await page.evaluate(
      ({ captureIdValue, endpointValue, selectorValue, delayValue }) => {
        window.figma.captureForDesign({
          captureId: captureIdValue,
          endpoint: endpointValue,
          selector: selectorValue,
          delayMs: delayValue,
          verbose: false,
        });
      },
      {
        captureIdValue: captureId,
        endpointValue: endpoint,
        selectorValue: selector,
        delayValue: captureDelayMs,
      }
    );

    const submitResponse = await submitResponsePromise;
    let submitBodyText = "";
    try {
      submitBodyText = await submitResponse.text();
    } catch {}
    let submitBodyJson = null;
    try {
      submitBodyJson = submitBodyText ? JSON.parse(submitBodyText) : null;
    } catch {}
    if (submitResponse.status() >= 400) {
      throw new Error(`Capture submit falhou com status ${submitResponse.status()}: ${submitBodyText}`);
    }
    if (submitBodyJson && submitBodyJson.success === false) {
      throw new Error(`Capture submit retornou erro: ${submitBodyText}`);
    }
    prep.captureSubmit = {
      status: submitResponse.status(),
      body: submitBodyJson || submitBodyText,
    };

    await page.waitForTimeout(Math.max(1500, captureDelayMs));
    return prep;
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

async function pollCaptureCompletion(captureId, attempts, intervalMs) {
  let lastText = "";
  for (let i = 1; i <= attempts; i += 1) {
    const pollResponse = callMcpTool("generate_figma_design", { captureId }, 120);
    const text = extractContentText(pollResponse);
    lastText = text;
    const normalized = text.replace(/\s+/g, " ").trim();
    console.log(`[poll ${i}/${attempts}] ${normalized.slice(0, 220)}`);

    const statusMatch = /Status for capture ID .*:\s*\*\*(\w+)\*\*/i.exec(text);
    const status = statusMatch ? statusMatch[1].toLowerCase() : null;

    if (/added to your existing file/i.test(text)) {
      return text;
    }
    if (status === "completed") {
      return text;
    }
    if (status && ["failed", "error", "cancelled", "expired"].includes(status)) {
      throw new Error(`Captura retornou status ${status}: ${text}`);
    }

    if (i < attempts) {
      await sleep(intervalMs);
    }
  }
  throw new Error(`Captura não completou após ${attempts} polls. Última resposta: ${lastText}`);
}

function verifyFrame({
  fileKey,
  verifyNodeId,
  frameName,
}) {
  const metadataResponse = callMcpTool("get_metadata", { fileKey, nodeId: verifyNodeId }, 120);
  const metadataText = extractContentText(metadataResponse);
  const frameIds = parseFrameIds(metadataText, frameName);
  if (frameIds.length === 0) {
    throw new Error(
      `Nenhum frame com nome "${frameName}" encontrado em verify-node-id ${verifyNodeId}.`
    );
  }
  const latestFrameId = sortNodeIds(frameIds).slice(-1)[0];
  const latestFrameMetadata = callMcpTool("get_metadata", { fileKey, nodeId: latestFrameId }, 120);
  const latestText = extractContentText(latestFrameMetadata);
  const textNames = getTextNodeNames(latestText);
  const { directHits, heuristicHits } = findLigatureHits(textNames);
  return {
    latestFrameId,
    frameCountOnVerifyNode: frameIds.length,
    directHits,
    heuristicHits,
    totalTextNodes: textNames.length,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    printHelp();
    return;
  }

  requireArg(args, "url");
  requireArg(args, "file-key");
  requireArg(args, "node-id");
  requireArg(args, "verify-node-id");

  const url = String(args["url"]);
  const fileKey = String(args["file-key"]);
  const nodeId = String(args["node-id"]);
  const verifyNodeId = String(args["verify-node-id"]);
  const frameName = String(args["frame-name"] || DEFAULT_FRAME_NAME);
  const selector = String(args["selector"] || DEFAULT_SELECTOR);
  const captureDelayMs = toInt(args["capture-delay-ms"], DEFAULT_CAPTURE_DELAY_MS);
  const topBlockOffsetPx = toInt(args["top-block-offset-px"], DEFAULT_TOP_BLOCK_OFFSET_PX);
  const openMetricDrawerIndex = toInt(args["open-metric-drawer-index"], DEFAULT_DRAWER_INDEX);
  const pollAttempts = toInt(args["poll-attempts"], DEFAULT_POLL_ATTEMPTS);
  const pollIntervalMs = toInt(args["poll-interval-ms"], DEFAULT_POLL_INTERVAL_MS);
  const skipPoll = !!args["skip-poll"];
  const skipVerify = !!args["skip-verify"];

  let captureId = args["capture-id"] ? String(args["capture-id"]) : null;
  if (!captureId) {
    console.log(`[start] generating captureId for file=${fileKey} node=${nodeId}`);
    const generateResponse = callMcpTool(
      "generate_figma_design",
      {
        outputMode: "existingFile",
        fileKey,
        nodeId,
      },
      120
    );
    const generateText = extractContentText(generateResponse);
    captureId = extractCaptureId(generateText);
    if (!captureId) {
      throw new Error(`Não foi possível extrair captureId: ${generateText}`);
    }
  } else {
    console.log(`[start] using provided captureId=${captureId}`);
  }
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`;
  console.log(`[start] captureId=${captureId}`);

  const prep = await submitCapture({
    url,
    frameName,
    captureId,
    endpoint,
    selector,
    captureDelayMs,
    topBlockOffsetPx,
    openMetricDrawerIndex,
  });
  console.log(`[prep] ${JSON.stringify(prep)}`);

  let pollText = null;
  if (!skipPoll) {
    pollText = await pollCaptureCompletion(captureId, pollAttempts, pollIntervalMs);
    console.log(`[poll-final] ${pollText.replace(/\s+/g, " ").slice(0, 280)}`);
  } else {
    console.log("[poll] skipped by --skip-poll");
  }

  let verify = null;
  if (!skipVerify) {
    verify = verifyFrame({
      fileKey,
      verifyNodeId,
      frameName,
    });
    console.log(`[verify] ${JSON.stringify(verify)}`);

    if (verify.directHits.length > 0 || verify.heuristicHits.length > 0) {
      throw new Error(
        `Gate falhou: ícones como texto ainda encontrados no frame ${verify.latestFrameId}. ` +
          `directHits=${JSON.stringify(verify.directHits)} heuristicHits=${JSON.stringify(verify.heuristicHits)}`
      );
    }
  } else {
    console.log("[verify] skipped by --skip-verify");
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        captureId,
        latestFrameId: verify ? verify.latestFrameId : null,
        fileKey,
        nodeId,
        verifyNodeId,
        frameName,
        skipPoll,
        skipVerify,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(`[error] ${error?.stack || String(error)}`);
  process.exit(1);
});
