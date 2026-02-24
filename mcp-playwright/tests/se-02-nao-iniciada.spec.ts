/**
 * se-02-nao-iniciada.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Testa os cenários relacionados ao status NÃO INICIADA, que dependem
 * de datas de período (data de fim no futuro ou expirada).
 *
 * TC cobertos: 02, 17, 18, 19
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL = `${BASE_URL}/teacher/trilhas-az`

const CAP4 = 'Capítulo 4: Números inteiros'
const CAP5 = 'Complementar 2: Frações 2'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rowFor(page: any, nome: string) {
    return page.locator('tbody tr').filter({ hasText: nome }).first()
}

/**
 * Abre um ESelect (combobox customizado) dentro de .filters-card e clica na opção
 * correspondente ao texto fornecido.
 * @param comboboxIndex 0 = primeiro ESelect (unidade), 1 = segundo (status)
 */
async function selectESelect(page: any, comboboxIndex: number, optionText: string | RegExp) {
    // Escopa ao wrapper do ESelect específico para evitar strict mode violation
    const wrapper = page.locator('.filters-card .e-select-wrapper').nth(comboboxIndex)
    await wrapper.locator('[role="combobox"]').click()
    await wrapper.locator('[role="listbox"]').waitFor({ state: 'visible' })
    await wrapper.locator('[role="option"]').filter({ hasText: optionText }).click()
    await wrapper.locator('[role="listbox"]').waitFor({ state: 'hidden' }).catch(() => { })
}

/** Data ISO no futuro (anos) */
function futureDateISO(yearsAhead = 2) {
    const d = new Date()
    d.setFullYear(d.getFullYear() + yearsAhead)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

/** Data ISO no passado (dias) */
function pastDateISO(daysAgo = 3) {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

async function enviarComPeriodo(page: any, nomeCapitulo: string, dateISO: string) {
    const row = rowFor(page, nomeCapitulo)
    await row.locator('button.action-btn--send').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

    const periodoCheck = page.locator('.drawer-periodo input[type="checkbox"]').first()
    await periodoCheck.check()
    await page.locator('.date-input').fill(dateISO)

    await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
    await page.locator('.drawer-action-btn').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
}

// ─── Testes ───────────────────────────────────────────────────────────────────

test.describe('Sistema de Ensino — NÃO INICIADA e Período', () => {

    test.describe.configure({ mode: 'serial' })

    // ── TC-02 · Envio com data futura → NÃO INICIADA → 2 botões ─────────────────
    test('TC-02 | Envio c/ data futura → NÃO INICIADA + pause + visibility', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        await enviarComPeriodo(page, CAP4, futureDateISO(2))

        const row = rowFor(page, CAP4)
        await expect(row.locator('.status-badge')).toHaveText('NÃO INICIADA')

        // Exatamente 2 botões: pause_circle + visibility
        await expect(row.locator('button.action-btn--pause')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--send')).not.toBeVisible()
        await expect(row.locator('button.action-btn--report')).not.toBeVisible()
        await expect(row.locator('button.action-btn--link')).not.toBeVisible()

        const total = await row.locator('button.action-btn').count()
        expect(total).toBe(2)

        // Progresso permanece 0% (data futura, alunos iniciaram mas status é NÃO INICIADA)
        await expect(row.locator('.progress-pct')).toHaveText('0%')
    })

    // ── TC-19 · Envio com data PASSADA → status deve ser INICIADA (não NÃO INICIADA)
    test('TC-19 | Data de fim expirada → status INICIADA (isFutureISO = false)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        await enviarComPeriodo(page, CAP5, pastDateISO(3))

        const row = rowFor(page, CAP5)

        // isFutureISO(fim) retorna false → calculateStatus cai no caso 'iniciada'
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // 4 botões de INICIADA
        await expect(row.locator('button.action-btn--pause')).toBeVisible()
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--link')).toBeVisible()
        await expect(row.locator('button.action-btn--send')).not.toBeVisible()
    })

    // ── TC-17 · Filtro por unidade ───────────────────────────────────────────────
    test('TC-17 | Filtro por Unidade 1 → exibe apenas cap IDs 1-2', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Primeiro ESelect (índice 0) = filtro de unidade
        await selectESelect(page, 0, 'Unidade 1')

        const rows = page.locator('tbody tr:not(.td-empty)')
        const count = await rows.count()
        expect(count).toBeGreaterThan(0)

        // Todos os capítulos exibidos devem ter IDs 1 ou 2 (Math.ceil(id/2) === 1)
        // São "Capítulo 1" e "Capítulo 2"
        for (let i = 0; i < count; i++) {
            const text = await rows.nth(i).innerText()
            const match = /Capítulo (\d+)/.exec(text)
            if (match) {
                const id = parseInt(match[1])
                expect(id).toBeGreaterThanOrEqual(1)
                expect(id).toBeLessThanOrEqual(2)
            }
        }

        // (TC-18 começa com page.goto(), então não precisa limpar o filtro aqui)
    })

    // ── TC-18 · Paginação com filtro ─────────────────────────────────────────────
    test('TC-18 | Paginação reseta para página 1 ao aplicar filtro', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Mudar para 5 por página
        const perPageSelect = page.locator('.per-page-select')
        await perPageSelect.selectOption('5')

        // Navegar para página 2 (se existir)
        const pg2 = page.locator('.pg-num').nth(1)
        const pg2Exists = await pg2.count()
        if (pg2Exists > 0) {
            await pg2.click()
            await expect(page.locator('.pg-num.active')).toHaveText('2')
        }

        // Aplicar filtro de unidade → página deve resetar para 1
        await selectESelect(page, 0, 'Unidade 1')

        // Contador "Exibindo X a Y de Z" deve atualizar
        const pgInfo = page.locator('.pg-info')
        await expect(pgInfo).toBeVisible()
        const infoText = await pgInfo.innerText()
        expect(infoText).toContain('Exibindo')

        // Página ativa deve ser 1 (ou botão de prev disabled)
        const prevBtn = page.locator('.pg-btn').first()
        await expect(prevBtn).toBeDisabled()
    })

})
