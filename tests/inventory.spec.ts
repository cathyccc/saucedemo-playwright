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

  test('should add a single item to the cart @smoke', async () => {
    await inventoryPage.addItemToCart("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test('should toggle button text after adding item @ui', async () => {
    const itemName = "Sauce Labs Fleece Jacket";
    await inventoryPage.addItemToCart(itemName);

    await expect(inventoryPage.getItemRemoveButton(itemName)).toBeVisible();
    await expect(inventoryPage.getItemRemoveButton(itemName)).toHaveText("Remove");
  });

  test('should decrease badge count when item is removed @regression', async () => {
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
    await inventoryPage.removeItemFromCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('should navigate to product details by clicking on product name @regression', async ({ page }) => {
    await inventoryPage.navigateToProductDetails('Sauce Labs Fleece Jacket');
    await expect(page).toHaveURL(/inventory-item/);
  })

  test("should sort items in alphabetical order @regression", async () => {
    await inventoryPage.sortProductsBy('az');
    await expect(inventoryPage.activeSortLabel).toHaveText('Name (A to Z)');
    const itemNamesArr = await inventoryPage.allItemsNames();
    const expectedOrder = itemNamesArr.toSorted();
    expect(itemNamesArr).toEqual(expectedOrder);
  });

  test("should sort items by price: Low to High @regression", async () => {
    await inventoryPage.sortProductsBy('lohi');
    await expect(inventoryPage.activeSortLabel).toHaveText('Price (low to high)');
    const itemPricesArr = await inventoryPage.allItemsPrices()
    const expectedOrder = [...itemPricesArr].sort((a, b) => a - b)
    expect(itemPricesArr).toEqual(expectedOrder)
  })

  test("should sort items by price: High to Low @regression", async () => {
    await inventoryPage.sortProductsBy('hilo');
    await expect(inventoryPage.activeSortLabel).toHaveText('Price (high to low)');
    const itemPricesArr = await inventoryPage.allItemsPrices()
    const expectedOrder = [...itemPricesArr].sort((a, b) => b - a)
    expect(itemPricesArr).toEqual(expectedOrder);
  })
});