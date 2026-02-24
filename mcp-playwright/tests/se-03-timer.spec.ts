/**
 * se-03-timer.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Testa comportamentos dependentes dos timers de simulação:
 *   PROGRESS_DURATION_MS = 30 000 ms  → barra chega a 100%
 *   FINISH_DELAY_MS      = 60 000 ms  → missão vira FINALIZADA
 *
 * ⚠️  Cada teste aqui pode levar até ~90 s. O timeout do arquivo é 120 000 ms.
 *
 * TC cobertos: 05, 08, 20, 21
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'


const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL = `${BASE_URL}/teacher/trilhas-az`

// Capítulos — um por teste para evitar stale state dentro do mesmo contexto
// (cada um começa como NÃO ENVIADA pois o composable reseta enabled=false)
const CAP_T1 = 'Capítulo 1: Sistema de numeração decimal' // TC-05 · FINALIZADA
const CAP_T2 = 'Capítulo 2: Números Racionais'            // TC-08 · reenvio pós-finalizada
const CAP_T3 = 'Capítulo 3: Números Decimais'             // TC-20 · barra 100% antes de FINALIZADA
const CAP_T4 = 'Complementar: Frações 1'                  // TC-21 · pausa entre 30 s e 60 s

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rowFor(page: any, nome: string) {
    return page.locator('tbody tr').filter({ hasText: nome }).first()
}

async function enviarMissao(page: any, nomeCapitulo: string) {
    const row = rowFor(page, nomeCapitulo)
    await row.locator('button.action-btn--send').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
    await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
    await page.locator('.drawer-action-btn').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
}

async function pausarMissao(page: any, nomeCapitulo: string, selectAll = true) {
    const row = rowFor(page, nomeCapitulo)
    await row.locator('button.action-btn--pause').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
    if (selectAll) {
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
    }
    await page.locator('.drawer-action-btn').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
}

// ─── Testes seriais (cada um usa um capítulo diferente para evitar conflito)

test.describe('Sistema de Ensino — Timers', () => {

    test.describe.configure({ mode: 'serial' })

    // ── TC-05 · Missão transiciona para FINALIZADA em 60 s ─────────────────────
    test('TC-05 | FINALIZADA após 60 s → send + pie + visibility (3 botões)', async ({ page }) => {
        test.setTimeout(90_000)
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP_T1)

        const row = rowFor(page, CAP_T1)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Aguarda 65 s (5 s de margem)
        await page.waitForTimeout(65_000)

        // Status deve ser FINALIZADA
        await expect(row.locator('.status-badge')).toHaveText('FINALIZADA')

        // Progresso 100%
        await expect(row.locator('.progress-pct')).toHaveText('100%')

        // 3 botões: send + pie_chart + visibility
        await expect(row.locator('button.action-btn--send')).toBeVisible()
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--pause')).not.toBeVisible()
        await expect(row.locator('button.action-btn--link')).not.toBeVisible()

        const total = await row.locator('button.action-btn').count()
        expect(total).toBe(3)
    })

    // ── TC-08 · Reenvio pós-FINALIZADA → volta para INICIADA ───────────────────
    test('TC-08 | Reenvio pós-FINALIZADA → INICIADA + progresso reseta', async ({ page }) => {
        test.setTimeout(90_000)
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP_T2)

        const row = rowFor(page, CAP_T2)

        // Aguarda FINALIZADA
        await page.waitForTimeout(65_000)
        await expect(row.locator('.status-badge')).toHaveText('FINALIZADA')

        // Reenviar
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
        // O drawer deve indicar reenvio (não "Habilitar")
        await expect(page.locator('.drawer-title')).not.toContainText('Habilitar')
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
        await page.locator('.drawer-action-btn').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        // Badge volta para INICIADA
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Progresso reseta (logo após envio = 0 + poucos ticks)
        await page.waitForTimeout(500)
        const pct = parseFloat(await row.locator('.progress-pct').innerText())
        expect(pct).toBeLessThanOrEqual(10)
    })

    // ── TC-20 · Barra atinge 100% em ~30 s mas status ainda é INICIADA ──────────
    test('TC-20 | Barra = 100% em 30 s, FINALIZADA só em 60 s', async ({ page }) => {
        test.setTimeout(60_000)
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP_T3)

        const row = rowFor(page, CAP_T3)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Aguarda 35 s (barra deve ter chegado a 100%)
        await page.waitForTimeout(35_000)

        // Barra em 100%
        await expect(row.locator('.progress-pct')).toHaveText('100%')

        // Mas status ainda INICIADA (FINALIZADA só em 60 s)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Botões ainda os 4 de INICIADA (link visível)
        await expect(row.locator('button.action-btn--pause')).toBeVisible()
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--link')).toBeVisible()
        await expect(row.locator('button.action-btn--send')).not.toBeVisible()
    })

    // ── TC-21 · Pausa entre 30 s e 60 s → cancela timer de FINALIZADA ──────────
    test('TC-21 | Pausa após barra=100% cancela timer → missão NÃO vira FINALIZADA', async ({ page }) => {
        test.setTimeout(100_000)
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP_T4)

        const row = rowFor(page, CAP_T4)

        // Aguarda barra atingir 100% (~35 s)
        await page.waitForTimeout(35_000)
        await expect(row.locator('.progress-pct')).toHaveText('100%')
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Pausar agora (entre T+35 s e T+60 s)
        await pausarMissao(page, CAP_T4, true)
        await expect(row.locator('.status-badge')).toHaveText('PAUSADA')

        // Aguarda mais 35 s (seria o momento de FINALIZADA se o timer não tivesse sido cancelado)
        await page.waitForTimeout(35_000)

        // Status ainda deve ser PAUSADA — timer cancelado pelo cancelSimulation()
        await expect(row.locator('.status-badge')).toHaveText('PAUSADA')
        await expect(row.locator('.progress-pct')).toHaveText('100%')

        // Botões corretos de PAUSADA: send + pie + visibility
        await expect(row.locator('button.action-btn--send')).toBeVisible()
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--link')).not.toBeVisible()
        await expect(row.locator('button.action-btn--pause')).not.toBeVisible()
    })

})
