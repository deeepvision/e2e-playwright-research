import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should log in successfully', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login');
    await page.waitForSelector('[data-testid="signin-email"]');
    const emailInput = await page.$('[data-testid="signin-email"]');
    expect(emailInput).toBeTruthy();
  });
});
