import { test, expect } from '@playwright/test'
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Checkout Functionality', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page)
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await checkoutPage.goto()
  });

  test('should proceed to step two with valid form inputs @smoke', async ({ page }) => {
    await checkoutPage.checkout("Demo", "Sauce", "A1B2C3");
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('should not proceed with an empty form @regression', async () => {
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toBeVisible();
  });

  test('error should display for empty first name input @regression', async () => {
    await checkoutPage.fillLastName("Demo");
    await checkoutPage.fillPostalCode("A1B2C3");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('error should display for empty last name input @regression', async () => {
    await checkoutPage.fillFirstName("Sauce");
    await checkoutPage.fillPostalCode("A1B2C3");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toContainText('Last Name is required');
  });

  test('error should display for empty postal code input @regression', async () => {
    await checkoutPage.fillFirstName("Sauce");
    await checkoutPage.fillLastName("Demo");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });

  test('clicking Cancel button should redirect to cart @regression', async ({ page }) => {
    await checkoutPage.cancelCart();
    await expect(page).toHaveURL(/cart/);
  });
});