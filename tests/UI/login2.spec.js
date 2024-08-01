import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login2';

// Go to login page before each test
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Go to Login Page', async () => {
    await loginPage.goto();
  });
});

test.describe('UI Tests', () => {
  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Valid Login', async () => {
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });

  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Invalid Login', async () => {
      await loginPage.inputInvalidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    await test.step('Validate Error Message', async () => {
      await loginPage.loginErrorMsg();
    });
  });
});
