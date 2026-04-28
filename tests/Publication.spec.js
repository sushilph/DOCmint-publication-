
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
