const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/professor/missoes/1/relatorio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const path = 'C:/temp/mr-fresh.png';
  await page.screenshot({ path, fullPage: false });

  const data = await page.evaluate(() => {
    const vals = [...document.querySelectorAll('.metric-value, .metric-value-success, .metric-value-primary')];
    return {
      firstCardHTML: document.querySelector('.metric-card, .metric-content')?.innerHTML?.substring(0, 300) || '',
      valueTexts: vals.map(e => e.textContent.trim()),
      hasBars: document.querySelectorAll('.metric-bar').length,
      hasDrawer: !!document.querySelector('.metric-drawer'),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
