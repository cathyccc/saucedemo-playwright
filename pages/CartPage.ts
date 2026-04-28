import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly productCard: Locator;
  private readonly checkoutBtn: Locator;
  private readonly continueShoppingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.getByTestId('inventory-item');
    this.checkoutBtn = page.getByTestId('checkout');
    this.continueShoppingBtn = page.getByTestId('continue-shopping');
  }

  async goto() {
    await this.page.goto('/cart.html')
  }

  async removeItem(productName: string) {
    const card = this.productCard.filter({ hasText: productName });

    if (await card.count() === 0) {
      throw new Error(`Cart item "${productName}" is not found – cannot remove`)
    }
    await card.locator('button[data-test^="remove"]').click();
  }

  get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  async getCartBadgeCount() {
    const text = await this.page.getByTestId('shopping-cart-badge').textContent();
    return parseInt(text ?? '0');
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  getCartItemNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async clickItemName(productName: string) {
    const card = await this.productCard.filter({ hasText: productName });
    await card.getByTestId('inventory-item-name').click();
  }

  async isEmpty() {
    return (await this.productCard.count()) === 0;
  }
}