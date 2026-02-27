const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:5174/professor/missoes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Full page screenshot
    await page.screenshot({ path: 'C:/temp/missoes-prototipo.png', fullPage: true });

    // Screenshot do conteúdo principal (sem sidebar)
    const main = await page.$('.main-layout-content, main, #main, .content-wrapper');
    if (main) {
        await main.screenshot({ path: 'C:/temp/missoes-main.png' });
    }

    // Screenshot da área da tabela
    const card = await page.$('.card');
    if (card) {
        await card.screenshot({ path: 'C:/temp/missoes-tabela.png' });
    }

    // Capturar dados do selectAll container
    const selectAllInfo = await page.evaluate(() => {
        const el = document.querySelector('.selectAll-container');
        if (!el) return 'selectAll-container: NÃO ENCONTRADO';
        const style = window.getComputedStyle(el);
        return {
            found: true,
            borderTop: style.borderTop,
            padding: style.padding,
            display: style.display,
        };
    });

    // Capturar cor do header-label
    const headerLabelColor = await page.evaluate(() => {
        const el = document.querySelector('.header-label');
        if (!el) return 'header-label: NÃO ENCONTRADO';
        return window.getComputedStyle(el).color;
    });

    // Capturar Belinha empty state
    const belinhaInfo = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const belinha = imgs.find(img => img.src && img.src.includes('confusion'));
        if (!belinha) return 'Belinha: NÃO ENCONTRADA';
        const style = window.getComputedStyle(belinha);
        return {
            src: belinha.src,
            maxWidth: style.maxWidth,
            opacity: style.opacity,
            className: belinha.className,
        };
    });

    console.log('=== INSPECAO VISUAL ===');
    console.log('selectAll-container:', JSON.stringify(selectAllInfo, null, 2));
    console.log('header-label color:', headerLabelColor);
    console.log('Belinha:', JSON.stringify(belinhaInfo, null, 2));
    console.log('\nScreenshots salvas em C:/temp/');

    await browser.close();
})().catch(e => {
    console.error('ERRO:', e.message);
    process.exit(1);
});
