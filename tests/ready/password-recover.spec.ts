import { test, expect } from '@playwright/test';

test.describe('Password recover', () => {
  test('should send email to recover password', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login', {
      waitUntil: 'domcontentloaded',
    });

    // TODO: replace with waitForEvent('mounted')
    await page.waitForTimeout(3000);

    expect(await page.getByTestId('signin-recover-password')).toBeVisible();
    await page.click('[data-testid="signin-recover-password"]');

    await page.waitForURL('https://admin.dev.hope.cloud/password-recovery-request');

    // TODO: replace with waitForEvent('mounted')
    await page.waitForTimeout(3000);

    expect(await page.getByTestId('password-recovery-email')).toBeVisible();
    await page.getByTestId('password-recovery-email').fill('abarmot.92+zxcv@gmail.com');

    expect(await page.getByTestId('password-recovery-submit')).toBeVisible();
    await page.click('[data-testid="password-recovery-submit"]');
  });
});
