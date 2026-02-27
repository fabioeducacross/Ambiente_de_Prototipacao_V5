import { test, expect } from '@playwright/test'

const BASE_URL = process.env.TEST_URL ?? 'http://localhost:5174'
const PAGE_URL = `${BASE_URL}/professor/relatorios/habilidades`

test.describe('SkillReport | Sidebar Prototype', () => {
    test('valida UI refatorada + estado da sidebar', async ({ page }) => {
        await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
        await page.waitForTimeout(800)

        await expect(page.locator('label[for="bncc"]').filter({ hasText: 'Matriz/Currículo' })).toBeVisible()
        await expect(page.locator('label[for="period"]').filter({ hasText: 'Período' })).toBeVisible()
        const breadcrumbItems = page.locator('ol.breadcrumb .breadcrumb-item:not(:first-child)')
        await expect(breadcrumbItems).toHaveCount(2)
        await expect(breadcrumbItems.nth(0)).toContainText('Relatórios Gerais')
        await expect(breadcrumbItems.nth(1)).toContainText('Habilidades')
        const rendimentoLabels = page
            .locator('.skill-progress-label')
            .filter({ hasText: 'Rendimento do Ano Escolar' })
        await expect(rendimentoLabels).toHaveCount(4)
        await expect(rendimentoLabels.first()).toBeVisible()
        await expect(page.getByText('Exportar em Excel', { exact: false })).toBeVisible()

        const activeHabilidadesNav = page
            .locator('aside.sidebar a.nav-item.active')
            .filter({ hasText: 'Habilidades' })
            .first()

        await expect(activeHabilidadesNav).toBeVisible()

        await expect(page.locator('.skill-card').filter({ hasText: 'Números' }).first()).toBeVisible()
        await expect(page.locator('.skill-card').filter({ hasText: 'Álgebra' }).first()).toBeVisible()
        await expect(page.locator('.skill-card').filter({ hasText: 'Geometria' }).first()).toBeVisible()
        await expect(page.locator('.skill-card').filter({ hasText: 'Grandezas e Medidas' }).first()).toBeVisible()

        await page.screenshot({ path: 'test-results/skill-report-expanded.png', fullPage: true })

        const menuToggle = page.locator('header.app-navbar .material-symbols-outlined').first()
        await expect(menuToggle).toBeVisible()
        await menuToggle.click()

        await expect(page.locator('.proto-layout.sidebar-collapsed')).toBeVisible()
        await page.screenshot({ path: 'test-results/skill-report-collapsed.png', fullPage: true })
    })
})
