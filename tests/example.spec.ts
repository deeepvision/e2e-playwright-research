import { test, expect } from '@playwright/test';

test.describe('Test login page', () => {
  test('should log in successfully', async ({ page }) => {
    await page.goto('https://admin.dev.hope.cloud/login?org=hcorg:33O0ldvawCD', {
      waitUntil: 'domcontentloaded',
    });

    // TODO: replace with waitForEvent('mounted')
    await page.waitForTimeout(3000);
    
    expect(await page.getByTestId('signin-email')).toBeVisible();
    expect(await page.getByTestId('signin-password')).toBeVisible();

    await page.getByTestId('signin-email').fill('foulen1995@gmail.com');
    await page.getByTestId('signin-password').fill('Qazwsx123!');
    
    
    await page.getByTestId('signin-submit').click();
  
    expect(await page.locator('.admin-menu')).toBeVisible();
  });
});