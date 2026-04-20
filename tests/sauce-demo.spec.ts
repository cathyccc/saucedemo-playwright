import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory Functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should add a single item to the cart @smoke', async ({ page }) => {
    await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.getCartBadge()).toHaveText("1");
  });

  test('should toggle button text after adding item @ui', async ({ page }) => {
    await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");

    const card = inventoryPage.productCard.filter({ hasText: "Sauce Labs Fleece Jacket" })
    const removeBtn = card.locator('button[data-test^="remove"]');
    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toHaveText("Remove");
  });

  test('should decrease badge count when item is removed @regression', async ({ page }) => {
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await expect(inventoryPage.getCartBadge()).toHaveText("1");
    await inventoryPage.removeItemFromCart("Sauce Labs Backpack");
    await expect(inventoryPage.getCartBadge()).not.toBeVisible();
  });

  test("should sort items in aphabetical order @regression", async ({ page }) => {
    await inventoryPage.sortProductsBy('az');
    await expect(inventoryPage.activeSortOption).toHaveText('Name (A to Z)');
    const itemNamesArr = await inventoryPage.allItemsNames();
    const expectedOrder = itemNamesArr.toSorted();
    expect(itemNamesArr).toEqual(expectedOrder);
  })

  test("should sort items in reverse alphabetical order @regression", async ({ page }) => {
    await inventoryPage.sortProductsBy('za');
    await expect(inventoryPage.activeSortOption).toHaveText('Name (Z to A)');
    const itemNamesArr = await inventoryPage.allItemsNames();
    const expectedOrder = [...itemNamesArr].sort().reverse();
    expect(itemNamesArr).toEqual(expectedOrder);
  })

  test("should sort items by price: Low to High @regression", async ({ page }) => {
    await inventoryPage.sortProductsBy('lohi');
    await expect(inventoryPage.activeSortOption).toHaveText('Price (low to high)');
    const itemPricesArr = await inventoryPage.allItemsPrices()
    const expectedOrder = [...itemPricesArr].sort((a, b) => a - b)
    expect(itemPricesArr).toEqual(expectedOrder)
  })

  test("should sort items by price: High to Low @regression", async ({ page }) => {
    await inventoryPage.sortProductsBy('hilo');
    await expect(inventoryPage.activeSortOption).toHaveText('Price (high to low)');
    const itemPricesArr = await inventoryPage.allItemsPrices()
    const expectedOrder = [...itemPricesArr].sort((a, b) => b - a)
    expect(itemPricesArr).toEqual(expectedOrder);
  })
});