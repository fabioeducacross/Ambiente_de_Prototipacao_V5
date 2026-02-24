import { test, expect } from '@playwright/test'

test('fluxo zerado -> enviar mantém ações send e visibility', async ({ page }) => {
    const appBaseUrl = process.env.TEST_URL ?? 'http://localhost:5174'
    await page.goto(`${appBaseUrl}/teacher/trilhas-az`, { waitUntil: 'networkidle' })

    await expect(page.getByText('MISSÕES SISTEMA DE ENSINO')).toBeVisible()

    const targetRow = page.locator('tbody tr').filter({ hasText: 'Capítulo 1: Sistema de numeração decimal' }).first()
    await expect(targetRow).toBeVisible()

    const sendButton = targetRow.locator('button.action-btn--send').first()
    await expect(sendButton).toBeVisible()
    await sendButton.click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText('Habilitar e enviar missão em lote')).toBeVisible()

    const headerCheckbox = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await headerCheckbox.check()

    await page.locator('.drawer-action-btn').click()

    await expect(page.getByRole('dialog')).toBeHidden()

    const updatedRow = page.locator('tbody tr').filter({ hasText: 'Capítulo 1: Sistema de numeração decimal' }).first()
    await expect(updatedRow.locator('button.action-btn--send').first()).toBeVisible()
    await expect(updatedRow.locator('button.action-btn--view').first()).toBeVisible()
})
