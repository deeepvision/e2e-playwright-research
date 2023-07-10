import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should log in successfully', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login?org=hcorg:dev:edVmx5QZe3p', {
      waitUntil: 'domcontentloaded',
    });

    //login

    const emailInput = await page.waitForSelector('[data-testid="signin-email"] input');
    const passwordInput = await page.waitForSelector('[data-testid="signin-password"] input');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    await emailInput.fill('abarmot.92+at@gmail.com');
    await passwordInput.fill('Qazwsx123!');

    await page.click('[data-testid="signin-submit"]');
  });
});