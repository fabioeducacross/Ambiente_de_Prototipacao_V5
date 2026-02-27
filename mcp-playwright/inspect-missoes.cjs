const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174/professor/missoes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const results = {};

    // 1. Tab links
    const tabs = document.querySelectorAll('.tab-link');
    results.tabs = Array.from(tabs).map(function(t) {
      return {
        text: t.textContent.trim(),
        borderRadius: getComputedStyle(t).borderRadius,
        bgColor: getComputedStyle(t).backgroundColor,
        color: getComputedStyle(t).color,
        isActive: t.classList.contains('active'),
        boxShadow: getComputedStyle(t).boxShadow,
      };
    });

    // 2. Cards
    const cards = document.querySelectorAll('.card');
    results.cardCount = cards.length;
    results.firstCard = cards[0] ? {
      borderRadius: getComputedStyle(cards[0]).borderRadius,
      boxShadow: getComputedStyle(cards[0]).boxShadow,
      border: getComputedStyle(cards[0]).border,
    } : null;

    // 3. Table headers
    const ths = document.querySelectorAll('thead th, .table th');
    results.tableHeaders = Array.from(ths).map(function(th) { return th.textContent.trim(); }).filter(function(t) { return t.length > 0; });
    results.tableHeadersStyle = ths[0] ? {
      textTransform: getComputedStyle(ths[0]).textTransform,
      fontWeight: getComputedStyle(ths[0]).fontWeight,
    } : {};

    // 4. Empty state images
    const imgs = document.querySelectorAll('img');
    results.images = Array.from(imgs).map(function(i) { return i.src.split('/').pop(); });

    // 5. Buttons
    const btns = document.querySelectorAll('button, .btn');
    results.buttons = Array.from(btns).map(function(b) { return b.textContent.trim(); }).filter(function(t) { return t.length > 0; }).slice(0, 10);

    // 6. Breadcrumb
    const ol = document.querySelector('.breadcrumb');
    results.breadcrumbItems = ol ? Array.from(ol.querySelectorAll('li')).map(function(li) { return li.textContent.trim(); }) : [];

    // 7. Tab line
    const tabLine = document.querySelector('.tab-line');
    results.tabLine = tabLine ? { borderTop: getComputedStyle(tabLine).borderTop, height: getComputedStyle(tabLine).height } : 'nao encontrado';

    // 8. vericar se ha select de disciplina
    const selects = document.querySelectorAll('select, .multiselect, [class*="select"]');
    results.selectCount = selects.length;

    return results;
  });

  console.log(JSON.stringify(info, null, 2));

  await page.screenshot({ path: 'C:/temp/missoes-proto.png', fullPage: false });
  console.log('Screenshot: C:/temp/missoes-proto.png');
  await browser.close();
})();
