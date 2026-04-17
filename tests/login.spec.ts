import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user with correct credentials can log in successfully @smoke @e2e', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory/);
  const title = page.locator('.title');
  await expect(title).toHaveText('Products');
})

test('an error message should show for user with incorrect credentials @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'incorrectPW');
  const message = await loginPage.getErrorMessage();
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(message).toContain("Epic sadface: Username and password do not match any user in this service")
})

test('an error message should show for a locked out user @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  const message = await loginPage.getErrorMessage();
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(message).toContain("Epic sadface: Sorry, this user has been locked out.")
})