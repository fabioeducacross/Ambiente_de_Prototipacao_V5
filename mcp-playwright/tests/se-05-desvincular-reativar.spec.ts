/**
 * Teste Visual — Jornada: Desvincular aluno e Reiniciar missão
 *
 * Persona: Professor
 * Testes:
 *  T1. fluxo completo: NÃO ENVIADA → enviar → INICIADA → desvincular todos → INICIADA (sem alunos) → reenviar → INICIADA
 *  T2. INICIADA (sem alunos) → reiniciar via drawer (group_add) com 1 aluno → INICIADA
 *
 * Nota: Desvincular todos os alunos mantém o status INICIADA (analogia: o ônibus nunca volta ao pátio).
 *       NÃO INICIADA só ocorre quando a missão foi habilitada com data de início futura.
 */

import { test, expect } from '@playwright/test'

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const ROUTE = `${BASE_URL}/teacher/trilhas-az`
const CHAPTER = 'Capítulo 2: Números Racionais'

// ─── Helper: Leva o Capítulo 2 ao estado INICIADA ────────────────────────────
async function setupChapterIniciada(page: any, testInfo: any) {
    await page.goto(ROUTE, { waitUntil: 'networkidle' })
    await expect(page.getByText('MISSÕES SISTEMA DE ENSINO')).toBeVisible()

    const row = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(row).toBeVisible()

    await row.locator('button.action-btn--send').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await testInfo.attach('setup-drawer-envio', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    const headerCheckbox = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await headerCheckbox.check()

    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()

    const updated = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(updated.getByText('INICIADA')).toBeVisible()
}

// ─────────────────────────────────────────────────────────────────────────────
// T1: Fluxo completo NÃO ENVIADA → INICIADA → desvincular todos → NÃO INICIADA → reenviar → INICIADA
// ─────────────────────────────────────────────────────────────────────────────
test('SE-05-T1: fluxo completo desvincular todos → INICIADA (sem alunos) → reenviar → INICIADA', async ({ page }, testInfo) => {

    // Etapa 1: Estado inicial da página
    await page.goto(ROUTE, { waitUntil: 'networkidle' })
    await expect(page.getByText('MISSÕES SISTEMA DE ENSINO')).toBeVisible()
    await testInfo.attach('01-estado-inicial', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })

    // Etapa 2: Verificar botões no estado NÃO ENVIADA
    const row = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(row).toBeVisible()
    await expect(row.locator('button.action-btn--send')).toBeVisible()
    await expect(row.locator('button.action-btn--pause')).not.toBeVisible()    // pause oculto em NÃO ENVIADA

    // Etapa 3: Enviar missão com todos os alunos
    await row.locator('button.action-btn--send').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const headerCheckbox = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await headerCheckbox.check()
    await testInfo.attach('02-drawer-envio-todos-selecionados', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()

    // Etapa 4: Verificar botões no estado INICIADA (todos vinculados → group_add disabled)
    const iniciada = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(iniciada.getByText('INICIADA')).toBeVisible()
    await expect(iniciada.locator('button.action-btn--send')).not.toBeVisible()   // send oculto em INICIADA
    await expect(iniciada.locator('button.action-btn--add')).toBeVisible()        // add visível mas disabled
    await expect(iniciada.locator('button.action-btn--add')).toBeDisabled()       // todos já vinculados
    await expect(iniciada.locator('button.action-btn--pause')).toBeVisible()
    await expect(iniciada.locator('button.action-btn--report')).toBeVisible()
    await expect(iniciada.locator('button.action-btn--details')).toBeVisible()
    await testInfo.attach('03-INICIADA-botoes-corretos', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })

    // Etapa 5: Abrir drawer Desvincular (group_remove)
    await iniciada.locator('button.action-btn--pause').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await testInfo.attach('04-drawer-desvincular-aberto', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    // Etapa 6: Selecionar todos e confirmar desvincular
    const drawerHdrCb = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await drawerHdrCb.check()
    await testInfo.attach('05-drawer-todos-selecionados-desvincular', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await page.waitForTimeout(400)

    // Etapa 7: Verificar estado INICIADA (sem alunos) após desvincular todos
    //          O ônibus nunca volta ao pátio — status permanece INICIADA
    const semAlunos = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(semAlunos).toBeVisible({ timeout: 5000 })
    await expect(semAlunos.getByText('INICIADA')).toBeVisible()
    await expect(semAlunos.locator('button.action-btn--send')).not.toBeVisible()  // send oculto em INICIADA
    await expect(semAlunos.locator('button.action-btn--add')).toBeVisible()       // add visível, enabled (há alunos)
    await expect(semAlunos.locator('button.action-btn--add')).toBeEnabled()
    await expect(semAlunos.locator('button.action-btn--pause')).toBeVisible()    // remove visível, disabled (0 vinculados)
    await expect(semAlunos.locator('button.action-btn--pause')).toBeDisabled()
    await expect(semAlunos.locator('button.action-btn--report')).toBeVisible()   // pie_chart visível em INICIADA
    await expect(semAlunos.locator('button.action-btn--details')).toBeVisible()
    await testInfo.attach('06-INICIADA-sem-alunos-botoes-corretos', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })

    // Etapa 8: Reenviar via group_add (send oculto em INICIADA após desvincular todos)
    await semAlunos.locator('button.action-btn--add').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await testInfo.attach('07-drawer-reenviar-aberto', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    // Etapa 9: Selecionar todos e confirmar
    const hdrCbReenvio = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await hdrCbReenvio.check()
    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await page.waitForTimeout(400)

    // Etapa 10: Verificar estado INICIADA após reenvio (todos vinculados → add disabled)
    const reativada = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(reativada).toBeVisible()
    await expect(reativada.getByText('INICIADA')).toBeVisible()
    await expect(reativada.locator('button.action-btn--send')).not.toBeVisible()  // send oculto em INICIADA
    await expect(reativada.locator('button.action-btn--add')).toBeVisible()       // add visível mas disabled
    await expect(reativada.locator('button.action-btn--add')).toBeDisabled()      // todos vinculados
    await expect(reativada.locator('button.action-btn--pause')).toBeVisible()
    await expect(reativada.locator('button.action-btn--report')).toBeVisible()
    await testInfo.attach('08-INICIADA-apos-reenvio', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })
})

// ─────────────────────────────────────────────────────────────────────────────
// T2: NÃO INICIADA → Reiniciar via drawer group_add com 1 aluno → INICIADA
// ─────────────────────────────────────────────────────────────────────────────
test('SE-05-T2: INICIADA (sem alunos) reiniciar via drawer group_add com 1 aluno → INICIADA', async ({ page }, testInfo) => {

    // Pré-condição: capítulo em INICIADA (enviar com todos os alunos)
    await setupChapterIniciada(page, testInfo)

    // Desvincular todos via group_remove + drawer
    const iniciada = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await iniciada.locator('button.action-btn--pause').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    const hdrCb = page.locator('.drawer-table thead input[type="checkbox"]').first()
    await hdrCb.check()
    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await page.waitForTimeout(400)

    // Verificar INICIADA (sem alunos) — desvincular não muda mais o status para NÃO INICIADA
    const semAlunos = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(semAlunos.getByText('INICIADA')).toBeVisible()
    await testInfo.attach('09-INICIADA-sem-alunos-pre-restart-via-drawer', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })

    // Clicar em group_add → abre drawer para adicionar alunos
    await semAlunos.locator('button.action-btn--add').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await testInfo.attach('10-drawer-add-alunos-aberto-em-INICIADA-sem-alunos', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    // Selecionar apenas o primeiro aluno individualmente
    const firstStudentCb = page.locator('.drawer-table tbody input[type="checkbox"]').first()
    await firstStudentCb.check()
    await testInfo.attach('11-drawer-1-aluno-selecionado', {
        body: await page.screenshot({ fullPage: false }),
        contentType: 'image/png'
    })

    // Confirmar
    await page.locator('.drawer-footer-actions button').last().click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await page.waitForTimeout(400)

    // Missão deve ter voltado para INICIADA
    const reativada = page.locator('tbody tr').filter({ hasText: CHAPTER }).first()
    await expect(reativada.getByText('INICIADA')).toBeVisible()
    // Com 1 aluno: add habilitado (restantes ainda podem ser adicionados), pause habilitado (tem 1 vinculado)
    await expect(reativada.locator('button.action-btn--add')).toBeEnabled()
    await expect(reativada.locator('button.action-btn--pause')).toBeEnabled()
    await testInfo.attach('12-INICIADA-apos-restart-via-drawer', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    })
})
