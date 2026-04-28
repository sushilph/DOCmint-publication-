

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    // This will now use the baseURL defined in playwright.config.js
    await this.page.goto('/'); 
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
};