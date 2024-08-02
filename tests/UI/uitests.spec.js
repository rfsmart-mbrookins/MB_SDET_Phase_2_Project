import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { InventoryPage } from '../../pages/inventory';
import { CartPage } from '../../pages/inventory';

// Go to login page before each test
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Go to Login Page', async () => {
    await loginPage.goto();
  });
});

//Test Descript (Script)
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

  //Positive Test - Successful login button clicks and text changes to button
  test('Positive Test - Add / Remove Buttons', async({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page); 

    await test.step('Valid Login', async () => {
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
    });

    const firstBtn = await inventoryPage.addToCartBtn().first();

    await test.step('Add to Cart', async () => {
      await expect(firstBtn).toHaveText('Add to cart');
      await inventoryPage.addFirstItemToCart();
      await expect(firstBtn).toHaveText('Remove');
    });

    await test.step('Remove from Cart', async () => {
      await expect(firstBtn).toHaveText('Remove');
      await inventoryPage.removeFirstItemFromCart();
      await expect(firstBtn).toHaveText('Add to cart');
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
      const errorMsg = await loginPage.loginErrorMsg();
    });
  });

    //E2E - Workflow
    test('Workflow', async({page}) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page); 
      //login
      await test.step('Valid Login', async () => {
        await loginPage.inputValidLoginCredentials();
        await loginPage.submitLoginCredentials();
      });
      //add items to cart
      await test.step('Add to Cart', async () => {
        await inventoryPage.addFirstItemToCart();
      });
      await test.step('Add to Cart', async () => {
        await inventoryPage.addSecondItemToCart();
      });
      await test.step('Add to Cart', async () => {
        await inventoryPage.addThirdItemToCart();
      });
      


  
    
    });
});