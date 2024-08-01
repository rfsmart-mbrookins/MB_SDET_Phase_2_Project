import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

// Login Verification 
test('login', async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    });




