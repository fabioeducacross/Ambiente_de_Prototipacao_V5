/**
 * calendar-delete.spec.ts
 * Valida o fluxo completo de deleção de evento no calendário
 */

import { test, expect } from '@playwright/test'

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL = `${BASE_URL}/teacher/calendar`
const EVENT_SEL = '.spanning-event-item--clickable'

/** Clica no evento via dispatchEvent (bypassa interceptação do date-cell) */
async function clickEvent(page: any, locator: any) {
    await locator.dispatchEvent('click')
}

test.describe('Calendar - Delete Event', () => {

    test('cal-del-01: botão Deletar aparece no drawer em modo view', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await page.locator('[class*="calendar"]').first().waitFor({ timeout: 10000 })

        const firstEvent = page.locator(EVENT_SEL).first()
        await firstEvent.waitFor({ timeout: 10000 })
        console.log('Clicando no evento...')
        await clickEvent(page, firstEvent)

        await page.locator('.event-drawer, [class*="event-drawer"]').waitFor({ state: 'visible', timeout: 5000 })
        console.log('Drawer aberto')

        const deleteBtn = page.locator('.event-drawer button, .event-drawer .e-button').filter({ hasText: /deletar/i }).first()
        await deleteBtn.waitFor({ timeout: 5000 })
        console.log('Botão Deletar visível:', await deleteBtn.isVisible())
        await expect(deleteBtn).toBeVisible()
    })

    test('cal-del-02: modal de confirmação abre ao clicar Deletar', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await page.locator('[class*="calendar"]').first().waitFor({ timeout: 10000 })

        const firstEvent = page.locator(EVENT_SEL).first()
        await firstEvent.waitFor({ timeout: 10000 })
        await clickEvent(page, firstEvent)
        await page.locator('.event-drawer, [class*="event-drawer"]').waitFor({ state: 'visible', timeout: 5000 })

        const deleteBtn = page.locator('.event-drawer button, .event-drawer .e-button').filter({ hasText: /deletar/i }).first()
        await deleteBtn.waitFor({ timeout: 5000 })
        await deleteBtn.click()

        const modal = page.locator('.modal-content, [class*="delete-confirm-modal"]').first()
        await modal.waitFor({ state: 'visible', timeout: 5000 })
        console.log('Modal visível')

        await expect(modal).toContainText(/tem certeza que deseja excluir/i)
        await expect(modal).toContainText(/excluir/i)
        await expect(modal).toContainText(/cancelar/i)
    })

    test('cal-del-03: evento é removido após confirmar deleção', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await page.locator('[class*="calendar"]').first().waitFor({ timeout: 10000 })

        const eventsBefore = await page.locator(EVENT_SEL).count()
        console.log('Eventos antes:', eventsBefore)

        const firstEvent = page.locator(EVENT_SEL).first()
        const eventText = await firstEvent.textContent()
        console.log('Evento a deletar:', eventText?.trim())

        await clickEvent(page, firstEvent)
        await page.locator('.event-drawer, [class*="event-drawer"]').waitFor({ state: 'visible', timeout: 5000 })

        const deleteBtn = page.locator('.event-drawer button, .event-drawer .e-button').filter({ hasText: /deletar/i }).first()
        await deleteBtn.waitFor({ timeout: 5000 })
        await deleteBtn.click()

        const modal = page.locator('.modal-content, [class*="delete-confirm-modal"]').first()
        await modal.waitFor({ state: 'visible', timeout: 5000 })

        const confirmBtn = modal.locator('button, .e-button').filter({ hasText: /excluir/i }).last()
        await confirmBtn.waitFor({ timeout: 5000 })
        console.log('Clicando Excluir...')
        await confirmBtn.click()

        await page.locator('.event-drawer, [class*="event-drawer"]').waitFor({ state: 'hidden', timeout: 5000 })
        console.log('Drawer fechou')

        await page.waitForTimeout(500)
        const eventsAfter = await page.locator(EVENT_SEL).count()
        console.log('Eventos depois:', eventsAfter)

        expect(eventsAfter).toBeLessThan(eventsBefore)
    })

    test('cal-del-04: diagnóstico - listar seletores visíveis na página', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await page.waitForTimeout(2000)

        const selectors = [
            '[class*="event-item"]',
            '.spanning-event-item--clickable',
            '[class*="calendar-event"]',
            '.event-pill',
            '[class*="event-chip"]',
        ]

        for (const sel of selectors) {
            const count = await page.locator(sel).count()
            if (count > 0) console.log(`✅ ${sel}: ${count} elementos`)
            else console.log(`❌ ${sel}: 0`)
        }

        await page.screenshot({ path: 'mcp-playwright/playwright-report/calendar-state.png', fullPage: false })
        console.log('Screenshot salvo')
    })

})
