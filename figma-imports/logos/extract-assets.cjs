const fs = require("fs");
const path = require("path");

const base = "figma-imports/logos";
const rawDir = path.join(base, "raw");
const assetsDir = path.join(base, "assets");
fs.mkdirSync(assetsDir, { recursive: true });

const fileKey = "mouf1Vc5WyhnDoYNBM1rWn";
const nodes = [
  "895:733",
  "895:788",
  "895:1115",
  "1538:129",
  "895:1054",
  "895:992",
  "947:4",
  "895:888",
  "895:1071",
  "895:1101",
  "2281:10059"
];
const logicalNames = {
  "895:733": "logo-centralizado-light",
  "895:788": "logo-justificado-light",
  "895:1115": "logo-horizontal-light",
  "1538:129": "logo-reduzido-1-light",
  "895:1054": "logo-reduzido-2-light",
  "895:992": "logo-reduzido-3-light",
  "947:4": "logo-centralizado-dark",
  "895:888": "logo-reduzido-1-dark",
  "895:1071": "logo-reduzido-2-dark",
  "895:1101": "logo-reduzido-3-dark",
  "2281:10059": "logo-slot-small"
};

const manifest = {
  fileKey,
  source: "https://www.figma.com/design/mouf1Vc5WyhnDoYNBM1rWn/Educa-Guidelines-1.0",
  generatedAt: new Date().toISOString(),
  namingConvention: {
    prefix: "educacross-logo",
    pattern: "educacross-logo-<logical-name>-<node-id>.png"
  },
  items: []
};

for (const nodeId of nodes) {
  const safe = nodeId.replace(":", "-");
  const logicalName = logicalNames[nodeId] || `logo-${safe}`;
  const rawPath = path.join(rawDir, `${safe}.get_screenshot.json`);
  const outName = `educacross-${logicalName}-${safe}.png`;
  const outPath = path.join(assetsDir, outName);

  const item = {
    nodeId,
    rawFile: rawPath.replace(/\\/g, "/"),
    assetFile: outPath.replace(/\\/g, "/"),
    mimeType: null,
    width: null,
    height: null,
    status: "missing",
    logicalName
  };

  try {
    const txt = fs.readFileSync(rawPath, "utf8");
    const data = JSON.parse(txt);
    const events = Array.isArray(data.events) ? data.events : [];

    let image = null;
    for (const ev of events) {
      const content = ev?.data_json?.result?.content;
      if (Array.isArray(content)) {
        image = content.find((c) => c?.type === "image" && typeof c?.data === "string");
        if (image) break;
      }
    }

    if (!image) {
      item.status = "no-image-in-response";
      manifest.items.push(item);
      continue;
    }

    const buf = Buffer.from(image.data, "base64");
    if (buf.length < 24) {
      item.status = "invalid-image-buffer";
      manifest.items.push(item);
      continue;
    }

    const sig = buf.toString("ascii", 1, 4);
    if (sig === "PNG") {
      item.width = buf.readUInt32BE(16);
      item.height = buf.readUInt32BE(20);
    }

    fs.writeFileSync(outPath, buf);
    item.mimeType = image.mimeType || "image/png";
    item.status = "ok";
  } catch (err) {
    item.status = "error";
    item.error = String(err?.message || err);
  }

  manifest.items.push(item);
}

manifest.updatedAt = new Date().toISOString();
fs.writeFileSync(path.join(base, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
