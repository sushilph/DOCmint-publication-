
import { expect } from '@playwright/test';
const path = require('path'); // Add this at the very top of the file

export class PublicationPage {
  constructor(page) {
    this.page = page;

    this.personalBtn = page.getByRole('button', { name: 'Personal' });
    this.editorBtn = page.getByRole('button', { name: '!ins_titution@ name1 Editor' });

    this.newPublicationBtn = page.getByRole('button', { name: 'New Publication' });
    this.titleInput = page.getByRole('textbox', { name: 'Enter the publication title' });
    this.yearDropdown = page.getByRole('combobox').nth(1);
    this.abstractInput = page.getByRole('textbox', { name: 'Provide a concise summary of' });
    this.keywordInput = page.getByRole('textbox', { name: 'e.g. machine learning, NLP…' });

    this.fileUpload = page.locator('input[type="file"]');

    this.businessUnitDropdown = page.getByRole('combobox').nth(2);
    this.dateInput = page.locator('input[type="date"]');

    this.addAuthorBtn = page.getByRole('button', { name: 'Add Author Row' });
    this.addSupervisorBtn = page.getByRole('button', { name: 'Add Supervisor Row' });

    this.createPublicationBtn = page.getByRole('button', { name: 'Create Publication' });
  }

  async navigate() {
    await this.page.goto('https://docmint.treeleaf.ai/');
  }


  async selectEditor() {
    await this.personalBtn.click();
    await this.editorBtn.click();
  }

  async startNewPublication() {
    await this.newPublicationBtn.click();
  }

  async fillPublicationForm(data) {
    await this.titleInput.fill(data.title);
    await this.yearDropdown.selectOption(data.year);
    await this.abstractInput.fill(data.abstract);
    await this.keywordInput.fill(data.keywords);

    // Upload file
    // await this.fileUpload.setInputFiles('test-data/sample.pdf');
    // await this.fileUpload.setInputFiles(data.filePath);
    // This tells Node: "Start here, go up one folder, then into test-data"
    const filePath = path.resolve(__dirname, '../test-data/sample.pdf');

    await this.fileUpload.setInputFiles(filePath);

    await this.businessUnitDropdown.selectOption(data.businessUnit);
    await this.dateInput.fill(data.date);
  }

  async addAuthorAndSupervisor() {
    await this.addAuthorBtn.click();
    await this.addSupervisorBtn.click();
  }

  async submitPublication() {
    await this.createPublicationBtn.click();
  }

  async deletePublication(title) {
  // Setup listener BEFORE the click
  this.page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  // Trigger the dialog
  await this.page.locator('button:has(svg.lucide-trash-2)').first().click();

  // Assert item is gone
  await expect(this.page.getByText(title)).toBeHidden();
}

  }
