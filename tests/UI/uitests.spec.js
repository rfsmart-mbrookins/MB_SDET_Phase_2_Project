import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

// Go to login page before each test
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Go to Login Page', async () => {
    await loginPage.goto();
  });
});

test.describe('UI Tests', () => {
  //Login Validation
  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Valid Login', async () => {
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });

  //Negative Test - Invalid Login
  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Invalid Login', async () => {
      await loginPage.inputInvalidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    await test.step('Validate Error Message Returned', async () => {
      await loginPage.loginErrorMsg();
    });
  });
});
