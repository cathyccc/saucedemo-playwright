import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutSummary } from "../pages/CheckoutSummary";

test.describe('Checkout Summary', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutSummary: CheckoutSummary;
  let checkoutPage: CheckoutPage;
  const itemName = "Sauce Labs Onesie";
  const itemName2 = "Sauce Labs Bike Light";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutSummary = new CheckoutSummary(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.addItemToCart(itemName2);
    await checkoutPage.goto();
    await checkoutPage.checkout('Sauce', 'Demo', 'A1B2C3');
  });

  test('correct items should be listed in checkout summary @regression', async () => {
    const itemsList = await checkoutSummary.getItemNames()
    expect(itemsList).toContain(itemName);
    expect(itemsList).toContain(itemName2);
  })

  test('sum of listed item prices should equal subtotal amount @regression @ui', async () => {
    const subtotalAmount = await checkoutSummary.calculateSubtotal();
    const displaySubtotalAmount = await checkoutSummary.displaySubtotalAmount();
    expect(subtotalAmount).toEqual(displaySubtotalAmount);
  })

  test('sum of tax and subtotal should equal to total amount @regression @ui', async () => {
    const subtotalAmount = await checkoutSummary.displaySubtotalAmount();
    const taxAmount = await checkoutSummary.displayTaxAmount();
    const displayTotal = await checkoutSummary.displayTotalAmount();
    expect(subtotalAmount + taxAmount).toEqual(displayTotal);
  });

  test('summary should display payment and shipping info @ui', async () => {
    await expect(checkoutSummary.paymentInfoLabel).toBeVisible();
    await expect(checkoutSummary.shippingInfoLabel).toBeVisible();
  });

  test('cancel button navigates back to the inventory page @regression', async ({ page }) => {
    await checkoutSummary.cancelCart();
    await expect(page).toHaveURL(/inventory/);
  })

  test('finish button navigates to checkout complete @smoke', async ({ page }) => {
    await checkoutSummary.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
    await page.getByTestId('back-to-products').click();
    await expect(page).toHaveURL(/inventory/);
  });
})