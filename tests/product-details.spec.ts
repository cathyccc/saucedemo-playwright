import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Product Details Page', () => {
  let loginPage: LoginPage;
  let productDetailsPage: ProductDetailsPage;
  let inventoryPage: InventoryPage;
  const itemName = "Sauce Labs Backpack";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.navigateToProductDetails(itemName);
  });

  test('should display item name @ui', async () => {
    await expect(productDetailsPage.getProductName()).toHaveText(itemName);
  });

  test('should display product details @ui', async () => {
    const productDesc = await productDetailsPage.getProductDescription();
    await expect(productDesc).toBeVisible();
  });

  test('should display price @ui', async () => {
    const productPrice = await productDetailsPage.getProductPrice();
    await expect(productPrice).toBeVisible();
  });

  test('should increase badge count after clicking add item to cart @regression', async () => {
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.cartBadge).toHaveText("1");
  });

  test('should decrease badge count after clicking remove item to cart @regression', async () => {
    await productDetailsPage.addToCart();
    await productDetailsPage.removeFromCart();
    await expect(productDetailsPage.cartBadge).toBeHidden();
  });

  test('back to products button should navigate back to inventory page @regression', async ({ page }) => {
    await productDetailsPage.backToProducts();
    await expect(page).toHaveURL(/inventory/);
  });
})