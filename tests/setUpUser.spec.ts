import { test, expect } from '@playwright/test';
test.describe('setUoUser', () => {
    test('account set up', async ({ page }) => {
      await page.goto('https://admin.dev.hope.cloud/login?email=abarmot.92+qa@gmail.com&userId=hcu:dev:WoV0XlbbjWW', {
  
      waitUntil: 'domcontentloaded',
      });
      //login
      const emailInput = await page.waitForSelector('[data-testid="signin-email"] input');
      const passwordInput = await page.waitForSelector('[data-testid="signin-password"] input');
  
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
  
      await emailInput.fill('abarmot.92+qa@gmail.com');
      await passwordInput.fill('BpMt22j');
      await page.click('[data-testid="signin-submit"]');

      //перехід на іншу адресу
      await page.waitForNavigation({ waitUntil: 'networkidle' }); // Очікуємо завершення переходу
      
      

      //блок з інвайтом на клауді

      //Налаштування акаунту
      const registrationPass = await page.waitForSelector('[data-testid="registration-password"] input');
      await registrationPass.fill('Qazwsx123!');
      const registrationPassConfirm = await page.waitForSelector('[data-testid="registration-confirm-password"] input');
      await page.click('[data-testid="registration-confirm-policy"]');
      await page.click('[data-testid="registration-submit"]');
      

    });
  });