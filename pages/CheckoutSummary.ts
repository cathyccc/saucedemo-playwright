import { type Page, type Locator } from '@playwright/test';

export class CheckoutSummary {
  private readonly page: Page;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  async goto() {
    await this.page.goto('/checkout-step-two.html');
  }

  private async getAmountFromLabel(testId: string) {
    const text = await this.page.getByTestId(testId).textContent();
    if (!text) return 0;
    const numberString = text.split('$')[1];
    return parseFloat(numberString);
  }

  async displaySubtotalAmount() {
    return this.getAmountFromLabel('subtotal-label');
  }

  async displayTaxAmount() {
    return this.getAmountFromLabel('tax-label');
  }

  async displayTotalAmount() {
    return this.getAmountFromLabel('total-label');
  }

  get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  get paymentInfoLabel() {
    return this.page.getByTestId('payment-info-label');
  }

  get shippingInfoLabel() {
    return this.page.getByTestId('shipping-info-label');
  }

  async getItemPrices() {
    const pricesList = await this.page.getByTestId('inventory-item-price').allTextContents();
    const formattedPriceList = pricesList.map(price => parseFloat(price.replace('$', '')));
    return formattedPriceList;
  }

  async calculateSubtotal() {
    const priceList = await this.getItemPrices()
    const sum = priceList.reduce((sum, price) => sum + price, 0);
    return Number(sum.toFixed(2));
  }

  async getItemNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async cancelCart() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}