/**
 * se-01-botoes.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Testa a visibilidade e o comportamento dos botões de ação por status,
 * além das jornadas principais que não dependem de timers longos.
 *
 * TC cobertos: 01, 03, 06, 07, 08 (fast), 09, 10, 11, 12, 13, 15, 16, 17, 22
 *
 * Os testes rodam em série (estado compartilhado dentro do arquivo).
 * Estado inicial: todos os capítulos com enabled=false (NÃO ENVIADA).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'

// ─── Constantes ──────────────────────────────────────────────────────────────
const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL = `${BASE_URL}/teacher/trilhas-az`

// Capítulos usados nos testes (nomes do trilhas-az.json do módulo FrontOffice)
const CAP1 = 'Capítulo 1: Sistema de numeração decimal'
const CAP2 = 'Capítulo 2: Números Racionais'
const CAP3 = 'Capítulo 3: Números Decimais'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Retorna o locator da linha da tabela para o capítulo dado */
function rowFor(page: any, nomeCapitulo: string) {
    return page.locator('tbody tr').filter({ hasText: nomeCapitulo }).first()
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

/** Conta botões de ação visíveis em uma linha */
async function countActionBtns(row: any) {
    return row.locator('button.action-btn').count()
}

/**
 * Abre o drawer de envio para o capítulo, seleciona todos os alunos
 * e confirma. Se withFutureDate=false, não ativa período.
 */
async function enviarMissao(page: any, nomeCapitulo: string, withFutureDate = false) {
    const row = rowFor(page, nomeCapitulo)
    await row.locator('button.action-btn--send').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

    if (withFutureDate) {
        const periodoCheck = page.locator('.drawer-periodo input[type="checkbox"]').first()
        await periodoCheck.check()
        const future = new Date()
        future.setFullYear(future.getFullYear() + 2)
        const yyyy = future.getFullYear()
        const mm = String(future.getMonth() + 1).padStart(2, '0')
        const dd = String(future.getDate()).padStart(2, '0')
        await page.locator('.date-input').fill(`${yyyy}-${mm}-${dd}`)
    }

    await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
}

/** Pausa o capítulo selecionando (todos|alguns) alunos */
async function pausarMissao(page: any, nomeCapitulo: string, selectAll = true) {
    const row = rowFor(page, nomeCapitulo)
    await row.locator('button.action-btn--pause').click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

    if (selectAll) {
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
    } else {
        // Seleciona apenas o primeiro aluno da lista
        await page.locator('.drawer-table tbody input[type="checkbox"]').first().check()
    }

    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
}

// ─── Testes ───────────────────────────────────────────────────────────────────

test.describe('Sistema de Ensino — Botões e Jornadas', () => {

    test.describe.configure({ mode: 'serial' })

    test.beforeAll(async ({ browser }) => {
        // Apenas garante que o servidor está no ar
    })

    // ── TC-01 · Estado inicial: NÃO ENVIADA → 2 botões ─────────────────────────
    test('TC-01 | NÃO ENVIADA → send + visibility (2 botões)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await expect(page.getByText('MISSÕES SISTEMA DE ENSINO')).toBeVisible()

        const row = rowFor(page, CAP1)
        await expect(row).toBeVisible()

        // Badge laranja NÃO ENVIADA
        await expect(row.locator('.status-badge')).toHaveText('NÃO ENVIADA')

        // Exatamente 2 botões: send + visibility
        await expect(row.locator('button.action-btn--send')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--pause')).not.toBeVisible()
        await expect(row.locator('button.action-btn--report')).not.toBeVisible()
        await expect(row.locator('button.action-btn--link')).not.toBeVisible()
        expect(await countActionBtns(row)).toBe(2)

        // Progresso 0%
        await expect(row.locator('.progress-pct')).toHaveText('0%')
    })

    // ── TC-10 · Detalhes sempre visível em NÃO ENVIADA ─────────────────────────
    test('TC-10a | visibility clicável em NÃO ENVIADA', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        const row = rowFor(page, CAP1)

        page.once('dialog', d => d.accept())
        await row.locator('button.action-btn--details').click()
        // Não trava = passou
    })

    // ── TC-06 · Primeiro envio → INICIADA ──────────────────────────────────────
    test('TC-06 | Primeiro envio → INICIADA + progresso inicia', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Verificar título do drawer no primeiro envio
        const row = rowFor(page, CAP1)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
        await expect(page.locator('.drawer-title')).toContainText('Habilitar e enviar')

        // Confirmar envio
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
        await page.locator('.drawer-footer-actions button').last().click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        // Status INICIADA
        await expect(rowFor(page, CAP1).locator('.status-badge')).toHaveText('INICIADA')

        // Progresso > 0 depois de um tick (~500 ms)
        await page.waitForTimeout(800)
        const pct = rowFor(page, CAP1).locator('.progress-pct')
        const text = await pct.innerText()
        const value = parseFloat(text)
        expect(value).toBeGreaterThan(0)
    })

    // ── TC-03 · INICIADA (todos vinculados) → 5 botões (group_add disabled) ───────
    test('TC-03 | INICIADA (todos vinculados) → add(disabled) + pause + pie + visibility + link (5 botões)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP2)  // CAP2 ainda é NÃO ENVIADA → envia para TODOS

        const row = rowFor(page, CAP2)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')
        // send oculto em INICIADA
        await expect(row.locator('button.action-btn--send')).not.toBeVisible()
        // group_add visível mas desabilitado — todos já vinculados
        await expect(row.locator('button.action-btn--add')).toBeVisible()
        await expect(row.locator('button.action-btn--add')).toBeDisabled()
        // group_remove visível e habilitado — há alunos para remover
        await expect(row.locator('button.action-btn--pause')).toBeVisible()
        await expect(row.locator('button.action-btn--pause')).toBeEnabled()
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--link')).toBeVisible()
        expect(await countActionBtns(row)).toBe(5)
    })

    // ── TC-09 · Relatório placeholder em INICIADA ───────────────────────────────
    test('TC-09 | Relatório (pie_chart) em INICIADA mostra alert', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP3)

        const row = rowFor(page, CAP3)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        page.once('dialog', d => {
            expect(d.message()).toContain(CAP3.split(':')[0])
            d.accept()
        })
        await row.locator('button.action-btn--report').click()
    })

    // ── TC-11 · Copiar link em INICIADA ────────────────────────────────────────
    test('TC-11 | link visível só em INICIADA e copia URL', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP3)

        const row = rowFor(page, CAP3)

        // Link visível em INICIADA
        await expect(row.locator('button.action-btn--link')).toBeVisible()

        // Clicar dispara alert com URL
        page.once('dialog', d => {
            expect(d.message()).toContain('educacross.com.br/mission/')
            d.accept()
        })
        await row.locator('button.action-btn--link').click()
    })

    // ── TC-13 · Desvincular total → INICIADA (sem alunos) → 5 botões (remove disabled) ───
    test('TC-13 | Desvincular total → INICIADA (sem alunos) + add(enabled) + remove(disabled) + pie + link + visibility (5 botões)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP2)  // CAP2 começa NÃO ENVIADA neste contexto
        await pausarMissao(page, CAP2, true)

        const row = rowFor(page, CAP2)
        // Desvincular todos → missão permanece INICIADA (ônibus nunca volta ao pátio)
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')
        // send oculto em INICIADA
        await expect(row.locator('button.action-btn--send')).not.toBeVisible()
        // group_add visível e habilitado — há alunos para vincular
        await expect(row.locator('button.action-btn--add')).toBeVisible()
        await expect(row.locator('button.action-btn--add')).toBeEnabled()
        // group_remove visível mas desabilitado — nenhum aluno vinculado
        await expect(row.locator('button.action-btn--pause')).toBeVisible()
        await expect(row.locator('button.action-btn--pause')).toBeDisabled()
        // pie_chart e link visíveis (INICIADA)
        await expect(row.locator('button.action-btn--report')).toBeVisible()
        await expect(row.locator('button.action-btn--details')).toBeVisible()
        await expect(row.locator('button.action-btn--link')).toBeVisible()
        expect(await countActionBtns(row)).toBe(5)
    })

    // ── TC-04 · Desvincular total → barra continua (ônibus não para) ──────────
    test('TC-04 | Barra de progresso continua após desvincular', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP2)

        // Espera a barra subir um pouco
        await page.waitForTimeout(3000)
        const pctBefore = parseFloat(
            await rowFor(page, CAP2).locator('.progress-pct').innerText()
        )
        expect(pctBefore).toBeGreaterThan(0)

        await pausarMissao(page, CAP2, true)

        // Lê o valor logo após a desvincular
        const pctAfterPause = parseFloat(
            await rowFor(page, CAP2).locator('.progress-pct').innerText()
        )

        // Aguarda 2 s — barra deve continuar subindo (ônibus nunca para)
        await page.waitForTimeout(2000)
        const pctLater = parseFloat(
            await rowFor(page, CAP2).locator('.progress-pct').innerText()
        )
        expect(pctLater).toBeGreaterThanOrEqual(pctAfterPause)
    })

    // ── TC-07 · Reenvio pós-pausa → progresso reseta 0% ────────────────────────
    test('TC-07 | Reenvio pós-pausa → progresso reseta para 0%', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        const cap = CAP2

        await enviarMissao(page, cap)
        await page.waitForTimeout(5000) // deixa barra subir um pouco

        await pausarMissao(page, cap, true)
        // Desvincular todos → status permanece INICIADA (protótipo: ônibus nunca volta ao pátio)
        await expect(rowFor(page, cap).locator('.status-badge')).toHaveText('INICIADA')

        // Reenviar via group_add (send oculto em INICIADA, appós desvincular todos)
        await rowFor(page, cap).locator('button.action-btn--add').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
        await page.locator('.drawer-footer-actions button').last().click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        // Status INICIADA com progresso 0% logo após o envio
        await expect(rowFor(page, cap).locator('.status-badge')).toHaveText('INICIADA')
        const pct = parseFloat(
            await rowFor(page, cap).locator('.progress-pct').innerText()
        )
        expect(pct).toBeLessThanOrEqual(5) // reseta + 1 ou 2 ticks já passaram
    })

    // ── TC-12 · Pausa parcial → mantém INICIADA ────────────────────────────────
    test('TC-12 | Pausa parcial → status permanece INICIADA', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        const cap = CAP3

        await enviarMissao(page, cap)
        await expect(rowFor(page, cap).locator('.status-badge')).toHaveText('INICIADA')

        // Pausa selecionando apenas 1 aluno (não todos)
        await pausarMissao(page, cap, false)

        // Status deve permanecer INICIADA
        await expect(rowFor(page, cap).locator('.status-badge')).toHaveText('INICIADA')

        // Botão link ainda visível (INICIADA mantém 5 botões, com add habilitado)
        await expect(rowFor(page, cap).locator('button.action-btn--link')).toBeVisible()
        await expect(rowFor(page, cap).locator('button.action-btn--add')).toBeVisible()
        await expect(rowFor(page, cap).locator('button.action-btn--pause')).toBeVisible()
    })

    // ── TC-15 · Reenvio reseta progresso mesmo se estava em X% ─────────────────
    test('TC-15 | Reenvio durante simulação reseta progresso para 0%', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        const cap = CAP1

        await enviarMissao(page, cap)
        await page.waitForTimeout(4000)

        const pctMid = parseFloat(
            await rowFor(page, cap).locator('.progress-pct').innerText()
        )
        expect(pctMid).toBeGreaterThan(0)

        // Desvincular todos (barra continua — ônibus não para; status permanece INICIADA)
        await pausarMissao(page, cap, true)

        // Reenvio via group_add (send oculto em INICIADA; desvincular todos não muda o status)
        await rowFor(page, cap).locator('button.action-btn--add').click()
        await page.locator('.drawer-table thead input[type="checkbox"]').first().check()
        await page.locator('.drawer-footer-actions button').last().click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        // Progresso reseta — reenvio reinicia a simulação do zero
        const pctReset = parseFloat(
            await rowFor(page, cap).locator('.progress-pct').innerText()
        )
        expect(pctReset).toBeLessThanOrEqual(10)
    })

    // ── TC-16 · Filtro por status ───────────────────────────────────────────────
    test('TC-16 | Filtro por status "NÃO ENVIADA" mostra só missões não enviadas', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Segundo ESelect (índice 1) = filtro de status
        await selectESelect(page, 1, 'NÃO ENVIADA')

        // Todas as linhas visíveis devem ter badge NÃO ENVIADA
        const badges = page.locator('tbody tr .status-badge')
        const count = await badges.count()
        expect(count).toBeGreaterThan(0)
        for (let i = 0; i < count; i++) {
            await expect(badges.nth(i)).toHaveText('NÃO ENVIADA')
        }
    })

    // ── TC-22 · Busca textual ───────────────────────────────────────────────────
    test('TC-22 | Busca textual filtra por nome do capítulo', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Campo de busca na toolbar (placeholder = "Pesquisar por missão")
        const searchInput = page.locator('.search-field, input[placeholder*="issão"], input[placeholder*="esquisar"]').first()
        await searchInput.fill('Capítulo 1')

        // Apenas linhas que contenham "Capítulo 1" devem aparecer
        const rows = page.locator('tbody tr:not(.td-empty)')
        const count = await rows.count()
        for (let i = 0; i < count; i++) {
            const text = await rows.nth(i).innerText()
            expect(text.toLowerCase()).toContain('capítulo 1')
        }

        // Limpar busca → todos voltam
        await searchInput.clear()
        expect(await rows.count()).toBeGreaterThan(1)
    })

    // ── TC-10b · Detalhes visível em todos os status ────────────────────────────
    test('TC-10b | visibility presente após envio (INICIADA)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await enviarMissao(page, CAP1)

        const row = rowFor(page, CAP1)
        await expect(row.locator('button.action-btn--details')).toBeVisible()

        page.once('dialog', d => {
            expect(d.message()).toContain('Detalhes')
            d.accept()
        })
        await row.locator('button.action-btn--details').click()
    })

})
