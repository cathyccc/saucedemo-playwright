import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page', () => {
  let cartPage: CartPage
  let loginPage: LoginPage
  let inventoryPage: InventoryPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    cartPage = new CartPage(page);
    inventoryPage = new InventoryPage(page);
  });

  test('cart is empty by default @regression', async () => {
    await cartPage.goto();
    expect(await cartPage.isEmpty()).toBe(true);
  });

  test('added item should appear in cart @smoke', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await cartPage.goto();

    const items: string[] = await cartPage.getCartItemNames();
    expect(items).toContain(itemName);
  })

  test('should display multiple items in cart @smoke', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    const itemName2 = 'Sauce Labs Backpack'; await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.addItemToCart(itemName2);
    await cartPage.goto();

    const items: string[] = await cartPage.getCartItemNames();
    expect(items).toHaveLength(2);
    expect(items).toContain(itemName);
    expect(items).toContain(itemName2);
  })

  test('should persists cart items after page reloads @reggression', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await cartPage.goto();
    await (page).reload();

    const items: string[] = await cartPage.getCartItemNames();
    expect(items).toContain(itemName);
  })

  test('removed item should not appear in cart @smoke', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await cartPage.goto();

    await cartPage.removeItem(itemName);
    const items: string[] = await cartPage.getCartItemNames();
    expect(items).not.toContain(itemName);
    expect(await cartPage.isEmpty()).toBe(true);
  })

  test('clicking item name redirects back to product details page @regression', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await cartPage.goto();
    await cartPage.clickItemName(itemName);
    expect(page).toHaveURL(/inventory-item/);
  });

  test('cart badge updates when item is removed from cart @regression', async ({ page }) => {
    const itemName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.goto();
    await inventoryPage.addItemToCart(itemName);
    await cartPage.goto();
    expect(cartPage.cartBadge).toHaveText('1');

    await cartPage.removeItem(itemName);
    expect(cartPage.cartBadge).not.toBeVisible();
  })

  test('checkout button navigates to checkout page @smoke', async ({ page }) => {
    await cartPage.goto();
    await cartPage.clickCheckout();

    expect(page).toHaveURL(/checkout-step-one/);
  })

  test('continue shopping button should return to inventory @regression', async ({ page }) => {
    await cartPage.goto();
    await cartPage.clickContinueShopping();

    expect(page).toHaveURL(/inventory/);
  })
})