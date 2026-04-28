const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/Login');

test.use({ storageState: { cookies: [], origins: [] } });

test('Secure Login Test using .env file', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Pulling values from .env securely
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  await loginPage.login(email, password);
});
  


