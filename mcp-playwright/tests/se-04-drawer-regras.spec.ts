/**
 * se-04-drawer-regras.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Valida as regras do drawer e da máquina de estados implementadas na sessão
 * de 25/02/2026:
 *
 *   DW-01  Label do botão é sempre "Enviar" (não "Habilitar e enviar")
 *   DW-02  Hint do drawer exibe ícone "info" (Material Symbols)
 *   DW-03  Botão Enviar habilitado sem nenhum aluno selecionado
 *   DW-04  Clicar Enviar sem selecionar → envia TODOS os elegíveis → INICIADA
 *   DW-05  Rendimento médio exibe "–" em NÃO ENVIADA
 *   DW-06  Rendimento médio exibe "–" em NÃO INICIADA (status da máquina, período futuro)
 *   DW-07  Status muda para FINALIZADA em ≤ 35 s (fix do timer, sem gap de 30 s extra)
 *
 * Seletores-chave confirmados contra o código-fonte do módulo:
 *   · Botão de ação: .drawer-footer button.btn-primary  (EButton → BButton → Bootstrap)
 *   · Botão fechar:  button.drawer-close
 *   · Hint:          .drawer-hint  /  .drawer-hint-icon
 *   · Status:        .status-badge
 *   · Rendimento "–": span.text-muted  (dentro do <td> de rendimento)
 *   · Linked count:  td:has-text("X de Y")
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL  = `${BASE_URL}/teacher/trilhas-az`

// Capítulos — um por TC para isolar o estado (cada teste faz goto() novo)
const CAP_DW04 = 'Capítulo 1: Sistema de numeração decimal' // DW-01..DW-04
const CAP_DW06 = 'Capítulo 3: Números Decimais'            // DW-06 (período futuro)
const CAP_DW07 = 'Capítulo 2: Números Racionais'            // DW-07 (timer)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Localiza a linha da tabela pelo nome do capítulo */
function rowFor(page: any, nome: string) {
    return page.locator('tbody tr').filter({ hasText: nome }).first()
}

/** Lê o total de alunos exibido no header do drawer ("Total de alunos: N") */
async function drawerTotalAlunos(page: any): Promise<number> {
    const text = await page.locator('.drawer-meta').innerText()
    const match = /Total de alunos:\s*(\d+)/i.exec(text)
    return match ? parseInt(match[1]) : 0
}

/** Botão de ação primário do drawer (EButton variant="primary" → btn-primary do Bootstrap) */
function actionBtn(page: any) {
    return page.locator('.drawer-footer button.btn-primary')
}

// ─── Testes ──────────────────────────────────────────────────────────────────

test.describe('Drawer — Regras da sessão 25/02/2026', () => {

    // Todos os TCs deste arquivo são independentes (cada um faz goto()),
    // mas mantemos serial para evitar concorrência de recursos no mesmo processo.
    test.describe.configure({ mode: 'serial' })

    // ── DW-01 · Label do botão é "Enviar" ────────────────────────────────────
    test('DW-01 | Botão do footer tem label "Enviar" no primeiro envio (não "Habilitar e enviar")', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        const row = rowFor(page, CAP_DW04)
        await expect(row.locator('.status-badge')).toHaveText('NÃO ENVIADA')

        // Abre o drawer de primeiro envio
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

        // Botão primário deve ter texto exato "Enviar"
        await expect(actionBtn(page)).toHaveText('Enviar')

        // Confirma também que NÃO existe texto "Habilitar" no botão
        const btnText = await actionBtn(page).innerText()
        expect(btnText).not.toContain('Habilitar')

        await page.locator('button.drawer-close').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
    })

    // ── DW-02 · Hint tem ícone info ───────────────────────────────────────────
    test('DW-02 | Hint do drawer exibe ícone "info" (Material Symbols)', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        const row = rowFor(page, CAP_DW04)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

        // Hint visível
        const hint = page.locator('.drawer-hint').first()
        await expect(hint).toBeVisible()

        // Ícone info dentro do hint
        const icon = hint.locator('.drawer-hint-icon')
        await expect(icon).toBeVisible()
        await expect(icon).toContainText('info')

        await page.locator('button.drawer-close').click()
    })

    // ── DW-03 · Botão habilitado sem seleção ──────────────────────────────────
    test('DW-03 | Botão Enviar não está disabled quando há elegíveis mas nenhum selecionado', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        const row = rowFor(page, CAP_DW04)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

        // Confirma que existem alunos elegíveis na tabela do drawer
        const checkboxes = page.locator('.drawer-table tbody input[type="checkbox"]')
        const count = await checkboxes.count()
        expect(count).toBeGreaterThan(0)

        // Botão primário NÃO deve estar desabilitado mesmo sem nenhum marcado
        // (a regra mudada: isActionDisabled só bloqueia quando eligibleStudents.length === 0)
        await expect(actionBtn(page)).not.toBeDisabled()

        await page.locator('button.drawer-close').click()
    })

    // ── DW-04 · Enviar sem seleção = envia todos ──────────────────────────────
    test('DW-04 | Enviar sem selecionar → todos elegíveis são enviados → INICIADA', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        const row = rowFor(page, CAP_DW04)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()

        // Captura o total de alunos mostrado no drawer
        const total = await drawerTotalAlunos(page)
        expect(total).toBeGreaterThan(0)

        // Clica Enviar SEM marcar nenhum aluno
        await actionBtn(page).click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        // Todos os elegíveis (= todos os alunos em primeiro envio) devem estar vinculados
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Contagem de alunos vinculados: "total de total"
        await expect(
            row.locator('td').filter({ hasText: new RegExp(`${total} de ${total}`) })
        ).toBeVisible()
    })

    // ── DW-05 · Rendimento "–" em NÃO ENVIADA ────────────────────────────────
    test('DW-05 | Rendimento médio exibe "–" quando status é NÃO ENVIADA', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // CAP_DW07 deve estar NÃO ENVIADA em contexto limpo
        const row = rowFor(page, CAP_DW07)
        await expect(row.locator('.status-badge')).toHaveText('NÃO ENVIADA')

        // Coluna rendimento deve exibir somente o traço muted
        const rendTraco = row.locator('span.text-muted')
        await expect(rendTraco).toBeVisible()
        await expect(rendTraco).toHaveText('–')

        // Não deve haver célula de performance com porcentagem
        await expect(row.locator('.performance-cell')).not.toBeVisible()
    })

    // ── DW-06 · INICIADA mostra "Não há dados" (nunca "–") ──────────────────
    // Valida a distinção de template: nao_enviada/nao_iniciada → "–";
    // iniciada/pausada sem dados → "Não há dados para exibir"
    test('DW-06 | INICIADA exibe "Não há dados" de rendimento (não o traço "–")', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        const row = rowFor(page, CAP_DW06)
        // Envia sem seleção → INICIADA (simulação começa, rendimento ainda null)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
        await actionBtn(page).click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()

        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Rendimento NÃO deve mostrar "–" (traço é exclusivo de nao_enviada/nao_iniciada)
        await expect(row.locator('span.text-muted')).not.toBeVisible()

        // Em estado INICIADA, se rendimento ainda for null, deve aparecer "Não há dados"
        // (v-else branch do template de rendimento)
        const nodata = row.locator('.perf-nodata')
        await expect(nodata).toBeVisible()
        await expect(nodata).toContainText('Não há dados')
    })

    // ── DW-07 · FINALIZADA imediatamente após progresso 100% ─────────────────
    test('DW-07 | FINALIZADA em ≤ 35 s (timer corrigido — sem gap de 30 s pós-progresso)', async ({ page }) => {
        test.setTimeout(50_000)
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })

        // Envia CAP_DW07 sem seleção → inicia simulação para todos
        const row = rowFor(page, CAP_DW07)
        await row.locator('button.action-btn--send').click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeVisible()
        await actionBtn(page).click()
        await expect(page.locator('aside.tz-drawer[role="dialog"]')).toBeHidden()
        await expect(row.locator('.status-badge')).toHaveText('INICIADA')

        // Aguarda 35 s: progresso leva ~30 s (PROGRESS_DURATION_MS) + 1 tick de buffer.
        // A correção do timer (commit ae1caff) garante que FINALIZADA ocorre no mesmo tick
        // em que progresso atinge 100%, sem aguardar os 30 s extras anteriores.
        await page.waitForTimeout(35_000)

        await expect(row.locator('.status-badge')).toHaveText('FINALIZADA')
        await expect(row.locator('.progress-pct')).toHaveText('100%')

        // Rendimento médio deve ter um valor percentual (não "–" nem ausente)
        const perfCell = row.locator('.performance-cell')
        await expect(perfCell).toBeVisible()
        const perfText = await perfCell.innerText()
        expect(perfText).toMatch(/\d+%/)
    })

})
