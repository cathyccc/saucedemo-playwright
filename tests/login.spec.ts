import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('user with correct credentials can log in successfully @smoke @e2e', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
    const title = page.locator('.title');
    await expect(title).toHaveText('Products');
  })

  test('an error message should show for user with incorrect credentials @regression', async () => {
    await loginPage.login('standard_user', 'incorrectPW');
    await expect(loginPage.errorContainer).toBeVisible();
    await expect(loginPage.errorContainer).toContainText("Username and password do not match any user in this service")
  })

  test('an error message should show for a locked out user @regression', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorContainer).toBeVisible();
    await expect(loginPage.errorContainer).toContainText("user has been locked out")
  })
})
