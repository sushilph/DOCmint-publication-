// import { test, expect } from '@playwright/test';
// import { PublicationPage } from '../pages/Publication';

// test('Create new publication with dynamic data', async ({ page }) => {
//   const publication = new PublicationPage(page);

//   // 1. GENERATE DYNAMIC DATA
//   // Date.now() returns a unique number like 1714318572000
//   const uniqueId = Date.now(); 
//   const dynamicTitle = `Automation Pub - ${uniqueId}`;
//   const dynamicKeyword = `Key-${uniqueId}`;

//   await publication.navigate();
//   await publication.selectEditor();
  
//   // 2. PASS DYNAMIC DATA TO YOUR FORM
//   await publication.fillPublicationForm({
//     title: dynamicTitle,       // Uses the new unique title
//     year: '2024',
//     abstract: 'This is an automated test summary.',
//     keywords: dynamicKeyword,  // Uses unique keywords
//     filePath: 'test-data/sample.pdf',
//     businessUnit: 'Engineering',
//     date: '2026-05-01'
//   });

//   await publication.submitPublication();

//   // 3. ASSERTION (The most important part)
//   // Verify that the exact title you just created is visible on the page
//   await expect(page.getByText(dynamicTitle)).toBeVisible();
// });



import { test, expect } from '@playwright/test';
import { PublicationPage } from '../pages/Publication';
import { title } from 'process';
const path = require('path');

// test.use({ storageState: { cookies: [], origins: [] } }); // Clear storage state for this test file to ensure we start fresh
test.use({ storageState: 'state.json' });
test.describe('Publication Module', () => {

  test('Create new publication', async ({ page }) => {
    const publication = new PublicationPage(page);

    await page.goto('/publications'); 

    await publication.selectEditor();
    await publication.startNewPublication();

    await publication.fillPublicationForm({
      title: 'AUTOMATION PUBLICATION',
      year: '2026',
      abstract: 'This is test abstract',
      keywords: 'QA, Automation, Playwright',
    //   filePath: 'sample.pdf',
      filePath: path.resolve(__dirname, 'sample.pdf'),
      businessUnit: '98e6e5e312314165b6c1101634842e48',
      date: '2024-04-20'
    });

    await publication.addAuthorAndSupervisor();
    await publication.submitPublication();

    // Assertion (very important)
    await expect(page).toHaveURL(/.*publication/);


    // 🔥 Delete it
    await publication.deletePublication(title);

    // Verify deletion
    // await expect(page.locator(`text=${title}`)).not.toBeVisible();
    });

});
