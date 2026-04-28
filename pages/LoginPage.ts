import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole('button', { name: "login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/')
  }

  async login(email: string, pass: string) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  get errorContainer() {
    return this.errorMessage;
  }

  getErrorMessage() {
    return this.errorMessage.textContent()
  }

  isLoggedIn() {
    return this.page.getByTestId('inventory-container').isVisible();
  }
}