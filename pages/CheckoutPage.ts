import { type Page, type Locator } from '@playwright/test'

export class CheckoutPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueBtn: Locator;
  private readonly cancelBtn: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
    this.cancelBtn = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async gotoStepTwo() {
    await this.page.goto('/checkout-step-two.html');
  }

  get error() {
    return this.errorMessage
  }

  async clickContinue() {
    await this.continueBtn.click()
  }

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async fillPostalCode(postalCode: string) {
    await this.postalCode.fill(postalCode);
  }

  async checkout(firstName: string, lastName: string, postalCode: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
    await this.continueBtn.click();
  }

  async cancelCart() {
    await this.cancelBtn.click()
  }
}