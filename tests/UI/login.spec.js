import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

// Login Verification Test
test('login', async ({ page }) => {
  const Login = new LoginPage(page);

  // Navigate to the login page
  await Login.gotoLoginPage();

  // Perform login action
  await Login.login('standard_user', 'secret_sauce');

  // Verify successful login by checking the URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Verify a unique element that appears after login
  await expect(page.locator('.inventory_list')).toBeVisible(); // Update with an actual unique selector
});
