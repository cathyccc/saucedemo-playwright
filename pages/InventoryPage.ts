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

  async addItemToCart(productName: string) {
    const card = this.productCard.filter({ hasText: productName });
    const addButton = card.locator('button[data-test^="add-to-cart"]');
    await addButton.click();
  }

  async removeItemFromCart(productName: string) {
    const card = this.productCard.filter({ hasText: productName });
    const removeButton = card.locator('button[data-test^="remove"]');
    await removeButton.click();
  }

  async sortProductsBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  getCartBadge() {
    return this.page.getByTestId('shopping-cart-badge')
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async allItemsPrices() {
    const pricesArr = await this.page.getByTestId('inventory-item-price').allTextContents();
    return pricesArr.map(price => parseFloat(price.replace('$', '')))
  }

  async allItemsNames() {
    const namesArr = await this.page.getByTestId('inventory-item-name').allTextContents()
    return namesArr
  }
}