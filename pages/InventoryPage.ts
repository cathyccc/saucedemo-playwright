import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  private readonly productCard: Locator;
  private readonly cartLink: Locator;
  private readonly sortDropdown: Locator;
  private readonly activeSortOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.activeSortOption = page.locator('.active_option');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  getItemCard(productName: string) {
    return this.productCard.filter({ hasText: productName });
  }

  getItemRemoveButton(productName: string) {
    return this.getItemCard(productName).locator('button[data-test^="remove"]');
  }

  async addItemToCart(productName: string) {
    const card = this.getItemCard(productName);

    if (await card.count() === 0) {
      throw new Error(`Product "${productName}" is not found`)
    }

    await card.locator('button[data-test^="add-to-cart"]').click();
  }

  async removeItemFromCart(productName: string) {
    const card = this.getItemCard(productName);

    if (await card.count() === 0) {
      throw new Error(`Product "${productName}" is not found`)
    }
    await card.locator('button[data-test^="remove"]').click();
  }

  get activeSortLabel() {
    return this.activeSortOption;
  }

  async sortProductsBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge')
  }

  async navigateToProductDetails(productName: string) {
    const card = this.getItemCard(productName);
    await card.getByTestId('inventory-item-name').click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async allItemsPrices() {
    const pricesArr = await this.page.getByTestId('inventory-item-price').allTextContents();
    return pricesArr.map(price => parseFloat(price.replace('$', '')))
  }

  allItemsNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents()
  }
}