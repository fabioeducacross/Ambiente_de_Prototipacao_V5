import { test, expect } from '@playwright/test'

test('jornada de envio de missões', async ({ page }, testInfo) => {
    const appBaseUrl = process.env.TEST_URL ?? 'http://localhost:5174'
    await page.goto(`${appBaseUrl}/teacher/trilhas-az`, { waitUntil: 'networkidle' })

    await expect(page.getByText('MISSÕES SISTEMA DE ENSINO')).toBeVisible()

    await page.screenshot({ path: testInfo.outputPath('01-estado-inicial.png'), fullPage: true })

    const notSentRow = page
        .locator('tbody tr')
        .filter({ hasText: 'Capítulo 4: Números inteiros' })
        .first()

    await expect(notSentRow).toBeVisible()
    await expect(notSentRow.locator('button.action-btn--send')).toHaveCount(1)
    await expect(notSentRow.locator('button.action-btn--view')).toHaveCount(1)

    await notSentRow.locator('button.action-btn--send').click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText('Habilitar e enviar missão em lote')).toBeVisible()

    await page.screenshot({ path: testInfo.outputPath('02-drawer-envio-aberto.png'), fullPage: true })

    await page.locator('.drawer-table thead input[type="checkbox"]').first().check()

    const periodCheckbox = page.locator('.drawer-periodo input[type="checkbox"]').first()
    await periodCheckbox.check()

    const future = new Date()
    future.setDate(future.getDate() + 5)
    const yyyy = future.getFullYear()
    const mm = String(future.getMonth() + 1).padStart(2, '0')
    const dd = String(future.getDate()).padStart(2, '0')
    await page.locator('.date-input').fill(`${yyyy}-${mm}-${dd}`)

    await page.locator('.drawer-action-btn').click()
    await expect(page.getByRole('dialog')).toBeHidden()

    await page.screenshot({ path: testInfo.outputPath('03-pos-envio.png'), fullPage: true })

    const updatedRow = page
        .locator('tbody tr')
        .filter({ hasText: 'Capítulo 4: Números inteiros' })
        .first()

    await expect(updatedRow.getByText('NÃO INICIADA')).toBeVisible()
    await expect(updatedRow.locator('button.action-btn--send')).toHaveCount(1)
    await expect(updatedRow.locator('button.action-btn--view')).toHaveCount(1)
})
