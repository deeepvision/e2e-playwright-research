import { test, expect } from '@playwright/test';

//org admin: 
//User: qa.automationtest.25@gmail.com
//password: Qazwsx123!
//
//User for invite:
//User:
//password:

test('invite-user', async ({ page }) => {
  await page.goto('https://admin.dev.hope.cloud/login', {
    waitUntil: 'domcontentloaded',
  });

  // TODO: replace with waitForEvent('mounted')
  await page.waitForTimeout(3000);

  await page.getByTestId('signin-email').click();
  await page.getByTestId('signin-email').fill('qa.automationtest.25@gmail.com');

  await page.getByTestId('signin-password').click();
  await page.getByTestId('signin-password').fill('Qazwsx123!');

  await page.getByTestId('signin-submit').click();

  await page.getByTestId('header-navigation-item-users').click();
  await page.getByTestId('users-page-invite-button').click();

  const inviteEmail = await page.getByTestId('invite-user-email');
  //const timestamp = Date.now();
  //const email = `abarmot.92+${timestamp}@gmail.com`;
  const email = 'steel-taken@8gi6g9gw.mailosaur.net'
  await inviteEmail.fill(email);

console.log(email);

await page.getByTestId('invite-user-submit').click();


  await page.waitForURL(/^.*$/);
  // TODO: replace with waitForEvent('mounted')
  await page.waitForTimeout(3000);

  
  expect (await page.getByTestId('invite-user-first-name')).toBeVisible();
  expect (await page.getByTestId('invite-user-last-name')).toBeVisible();

  await page.getByTestId('invite-user-first-name').fill('Test');
  await page.getByTestId('invite-user-last-name').fill('User');
  await page.getByTestId('invite-user-submit').click();
});
