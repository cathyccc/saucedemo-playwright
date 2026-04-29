import { type Page } from '@playwright/test';

export class ProductDetailsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(id: number) {
    await this.page.goto(`/inventory-item.html?id=${id}`);
  }

  async backToProducts() {
    await this.page.getByTestId('back-to-products').click();
  }

  get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  async addToCart() {
    await this.page.getByTestId('add-to-cart').click();
  }

  async removeFromCart() {
    await this.page.getByTestId('remove').click();
  }

  getProductName() {
    return this.page.getByTestId('inventory-item-name');
  }

  getProductDescription() {
    return this.page.getByTestId('inventory-item-desc');
  }

  getProductPrice() {
    return this.page.getByTestId('inventory-item-price');
  }
}