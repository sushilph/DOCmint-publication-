
// setup('authenticate', async ({ page }) => {
//   const loginPage = new LoginPage(page);
  
//   await loginPage.goto();
//   await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  
//   // Wait for the dashboard to load so we know we are logged in
//   await page.waitForURL(/.*dashboard/, { timeout: 60000 }); // Waits up to 60 seconds

//   // Save the cookies and storage state to state.json
//   await page.context().storageState({ path: authFile });
// }); 

const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../pages/Login');

const authFile = 'state.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  try {
    // Increase timeout for navigation and login
    await loginPage.goto();
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    
    // Wait for the dashboard URL AND for key elements to be visible
    await page.waitForURL(/.*dashboard/, { timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Save the cookies and storage state to state.json
    await page.context().storageState({ path: authFile });
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}); 