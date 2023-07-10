import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should log in successfully', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login', {

    waitUntil: 'domcontentloaded',
    });

    //login

    const emailInput = await page.waitForSelector('[data-testid="signin-email"] input');
    const passwordInput = await page.waitForSelector('[data-testid="signin-password"] input');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    await emailInput.fill('xxx');
    await passwordInput.fill('xxx');

    await page.click('[data-testid="signin-submit"]');

    //invite

    await page.waitForNavigation({ waitUntil: 'networkidle' });
    await page.click('[data-testid="header-navigation-item-users"]');
    await page.click('[data-testid="users-page-invite-button"]');

    //підбір email
    const inviteEmail = await page.waitForSelector('[data-testid="invite-user-email"]');
    const randomChars = Math.random().toString(36).substring(2, 5);
    const email = `abarmot.92+${randomChars}@gmail.com`;
    await inviteEmail.fill(email);
    
    
  });
});
