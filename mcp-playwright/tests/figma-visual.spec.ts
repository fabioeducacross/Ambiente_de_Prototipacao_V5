import { test, expect } from '@playwright/test';

test('captura visual da homepage', async ({ page }) => {
  const url = process.env.TEST_URL ?? 'http://localhost:5173';
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  const shot = await page.screenshot({ fullPage: true });
  expect(shot).toMatchSnapshot('homepage.png');
});
