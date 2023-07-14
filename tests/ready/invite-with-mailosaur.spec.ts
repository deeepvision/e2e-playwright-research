import { test, expect } from '@playwright/test';
const Mailosaur = require('mailosaur');
const mailosaur = new Mailosaur('Qy45mL90jsaKSiyGd0PsMcHYl1eqHUV6');
const serverId = 'u7ipjwcn';
const { JSDOM } = require('jsdom')



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
  const email = 'hit-particularly+q84ulh@u7ipjwcn.mailosaur.net'
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

  await page.waitForTimeout(5000);

  const criteria = {
    sentTo: email
  }

  const receivedEmail = await mailosaur.messages.get(serverId, criteria)
  
  
    console.log(receivedEmail);
  
    if (receivedEmail.html) {
      const emailContent = receivedEmail.html.body;
      //console.log(emailContent);
      //} else {
      console.log('HTML content not found in the received email');
      const dom = new JSDOM(emailContent);
      const passwordElement = dom.window.document.querySelector('.paragraph_block.block-6 td.pad p');
      const loginButton = dom.window.document.querySelector('table.button_block.block-9 a');
      if (passwordElement) {
        const passwordText = passwordElement.textContent.trim();
        console.log('Password:', passwordText);
      } else {
        console.log('Password element not found in the received email');
      }
      if (loginButton) {
        await page.goto(loginButton.href, {
          waitUntil: 'domcontentloaded',
        });
        await page.waitForURL(/^.*$/);
        // TODO: replace with waitForEvent('mounted')
        await page.waitForTimeout(3000);
      } 
    }

     
    });
    
