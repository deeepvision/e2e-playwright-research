import { test, expect } from '@playwright/test';

test.describe('Password recover', () => {
  test('should send email to recover password', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login', {

    waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector('[data-testid="signin-recover-password"]');
    await page.click('[data-testid="signin-recover-password"]');

    await page.waitForURL('https://admin.dev.hope.cloud/password-recovery-request');

    const emailInput = await page.waitForSelector('[data-testid="password-recovery-email"] input');
    await emailInput.fill('abarmot.92+zxcv@gmail.com');

    await page.waitForSelector('[data-testid="password-recovery-submit"]');
    await page.click('[data-testid="password-recovery-submit"]');

    

});
});