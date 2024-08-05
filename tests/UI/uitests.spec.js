import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { InventoryPage } from '../../pages/inventory';
import { CartPage } from '../../pages/cart';
import { CheckoutPage } from '../../pages/checkout';
import { CompleteCheckoutPage } from '../../pages/completeCheckout';

// Go to login page before each test
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Go to Login Page', async () => {
    await loginPage.goto();
  });
});

//Test Describe (Script)
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
    //Login
    await test.step('Valid Login', async () => {
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
    });

    const firstBtn = await inventoryPage.addToCartBtn().first();

    await test.step('Add to Cart', async () => {
      await expect(firstBtn).toHaveText('Add to cart');
      await inventoryPage.addItemToCart(0);
      await expect(firstBtn).toHaveText('Remove');
    });

    await test.step('Remove from Cart', async () => {
      await expect(firstBtn).toHaveText('Remove');
      await inventoryPage.removeItemFromCart(0)
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
      const cartPage = new CartPage(page); 
      const checkoutPage = new CheckoutPage(page);
      const completeCheckoutPage = new CompleteCheckoutPage(page);

      //Login
      await test.step('Valid Login', async () => {
        await loginPage.inputValidLoginCredentials();
        await loginPage.submitLoginCredentials();
      });
      //Add items to cart
      await test.step('Add multiple items to Cart', async () => {
        await inventoryPage.addItemToCart(0);
        await inventoryPage.addItemToCart(1);
        await inventoryPage.addItemToCart(2);
        await inventoryPage.addItemToCart(3);
        await inventoryPage.addItemToCart(4);
        await inventoryPage.addItemToCart(5);
      });
  
    // Go to cart
      await test.step('Go to Cart', async () => {
        await inventoryPage.goToShoppingCart();
       });
    

    //Checkout
    await test.step('Checkout', async () => {
      await cartPage.goToCheckout(); 
    });

    //Fill form information
    await test.step('Fill form', async () => {
      await checkoutPage.fillForm();
    });
    await test.step('Continue to next page', async () => {
      await checkoutPage.continueToNextPage(); 
    });

    //Finish checkout
    await test.step('Finish checkout', async () => {
      await completeCheckoutPage.finishCheckout(); 
    });
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');


  // 3 additional tests 
  //Sort items




  });
});