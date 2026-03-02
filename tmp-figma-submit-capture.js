const { chromium } = require('playwright');

(async () => {
  const captureId = '535616ff-eed7-4b3a-9732-c861c8a129ee';
  const endpoint = 'https://mcp.figma.com/mcp/capture/535616ff-eed7-4b3a-9732-c861c8a129ee/submit';
  const url = 'http://localhost:5174/professor/missoes/1/relatorio?title=Interpreta%C3%A7%C3%A3o+de+Textos+%E2%80%94+Semana+1&author=Prof%C2%AA+Ana+Lima&start=10/06/2025&end=17/06/2025';

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.addScriptTag({ url: 'https://mcp.figma.com/mcp/html-to-design/capture.js' });
  await page.waitForTimeout(1200);

  const result = await page.evaluate(async ({ cid, ep }) => {
    return await window.figma.captureForDesign({
      captureId: cid,
      endpoint: ep,
      selector: 'body'
    });
  }, { cid: captureId, ep: endpoint });

  console.log(JSON.stringify({ ok: true, captureId, result }, null, 2));

  await page.waitForTimeout(1500);
  await browser.close();
})().catch((err) => {
  console.error(JSON.stringify({ ok: false, error: String(err), stack: err?.stack }, null, 2));
  process.exit(1);
});
