import { test, expect } from '@playwright/test';
const Mailosaur = require('mailosaur');
const cheerio = require('cheerio'); // Import Cheerio library
const mailosaur = new Mailosaur('Qy45mL90jsaKSiyGd0PsMcHYl1eqHUV6');
const serverId = 'u7ipjwcn';




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
  const email = 'hit-particularly+7@u7ipjwcn.mailosaur.net'
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

  const searchCriteria = {
    sentTo: email,
    subject: 'Welcome to Hope Cloud!', 
  };
  
  const receivedEmails = await mailosaur.messages.search(serverId, searchCriteria, {
    timeout: 15000, 
  });
  
  if (receivedEmails.items.length > 0) {
    const receivedEmail = receivedEmails.items[0];
    console.log(receivedEmail);

    // Check if the email has HTML content
    if (receivedEmail.html) {
      // Get the HTML body of the received email
      const emailContent = receivedEmail.html.body;

      // Use Cheerio to parse the HTML
      const $ = cheerio.load(emailContent);

      // Extract the temporary password
      const temporaryPassword = $('p').filter(function () {
        return $(this).text().trim() === 'OxqgZB2';
      }).text().trim();

      console.log('Temporary Password:', temporaryPassword);

      // Extract the login button link
      const loginButtonLink = $('a[data-testid="invite-email-login-button"]').attr('href');
      console.log('Login Button Link:', loginButtonLink);
    } else {
      console.log('Email does not have HTML content');
    }
  } else {
    console.log('Email not found');
  }
});