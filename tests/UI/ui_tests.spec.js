import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { InventoryPage } from "../../pages/inventory";
import { CartPage } from "../../pages/cart";
import { CheckoutPage } from "../../pages/checkout";
import { CompleteCheckoutPage } from "../../pages/completeCheckout";
import { ItemDetailsPage } from "../../pages/itemDetails";
import { CheckoutConfirmationPage } from "../../pages/checkoutConfirmation";
import { it } from "node:test";

const baseURL = "https://www.saucedemo.com/";

/* Go to login page using beforeEach hook */
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step("Go to Login Page", async () => {
    await loginPage.goto();
    await loginPage.validateLoginPageURL();
  });
});

/* Test Script */
test.describe("UI Tests", () => {
  /* Login Validation test - Successful Login Test */
  test("Validate Successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step("Validate Login URL Login Button Click", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
    });
    //Validate inventory URL after successful login
    await test.step("Validate Inventory URL", async () => {
      await inventoryPage.validateInventoryURL();
    });
  });

  /* Positive Test */
  /* Successful Login and Add to Cart Button Clicks and Button Text Updates */
  test("Validate Add and Remove Button Clicks and Button Text Updates", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    //Login
    await test.step("Validate Successful Login", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
    });
    //Validate inventory URL after successful login
    await test.step("Validate inventory URL", async () => {
      await inventoryPage.validateInventoryURL();
    });
    //Add First Item to Cart
    const firstBtn = await inventoryPage.addToCartBtn().first();
    await test.step("Validate Add to Cart Button Text Change When Clicked", async () => {
      await expect(firstBtn).toHaveText("Add to cart");
      await inventoryPage.addItemToCart(0);
      await expect(firstBtn).toHaveText("Remove");
    });
    //Remove Item from Cart
    await test.step("Validate Remove from Cart Button Text Change When Clicked", async () => {
      await expect(firstBtn).toHaveText("Remove");
      await inventoryPage.removeItemFromCart(0);
      await expect(firstBtn).toHaveText("Add to cart");
    });
  });

  /* Negative Test */
  // Invalid Login
  test("Validate Invalid Login Error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Submit Invalid Login Credentials", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputInvalidLoginCredentials();
      await loginPage.submitLoginCredentials();
    });
    //Validate Error Message
    await test.step("Validate Invalid Login Error", async () => {
      const errorMsg = await loginPage.loginErrorMsg();
      await loginPage.validateLoginPageURL();
      await loginPage.validateInvalidLoginErrorMsg();
    });
  });

  /* E2E - Workflow - Successful Purchase Workflow */
  /* Login, Add Items to Cart, Go to Cart, Go to Checkout, Fill Out Form, Complete Checkout */
  test("Workflow - E2E Complete Item Checkout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completeCheckoutPage = new CompleteCheckoutPage(page);
    const checkoutConfirmationPage = new CheckoutConfirmationPage(page);
    //Login
    await test.step("Submit Valid Login Credentials", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      // await expect(page).toHaveURL(`${baseURL}inventory.html`);
    });
    await test.step("Validate inventory URL", async () => {
      await inventoryPage.validateInventoryURL();
    });
    //Add items to cart
    await test.step("Add multiple items to Cart", async () => {
      await inventoryPage.addItemToCart(0);
      await inventoryPage.addItemToCart(1);
      await inventoryPage.addItemToCart(2);
      await inventoryPage.addItemToCart(3);
      await inventoryPage.addItemToCart(4);
      await inventoryPage.addItemToCart(5);
    });
    await test.step("Validate inventory URL", async () => {
      await inventoryPage.validateInventoryURL();
    });
    // Go to cart
    await test.step("Go to Cart", async () => {
      await inventoryPage.goToShoppingCart();
      // await expect(page).toHaveURL(`${baseURL}cart.html`);
    });
    await test.step("Validate Cart URL", async () => {
      await cartPage.validateCartURL();
    });
    //Checkout
    await test.step("Checkout", async () => {
      await cartPage.goToCheckout();
      // await expect(page).toHaveURL(`${baseURL}checkout-step-one.html`);
    });
    await test.step("Validate Checkout URL", async () => {
      await checkoutPage.validateCheckoutURL();
    });
    //Fill form information
    await test.step("Fill Purchase Checkout Form", async () => {
      await checkoutPage.fillForm();
    });
    await test.step("Continue to next page", async () => {
      await checkoutPage.continueToNextPage();
    });
    await test.step("Validate Complete Checkout URL", async () => {
      await completeCheckoutPage.validateCompleteCheckoutURL();
    });
    //Complete checkout
    await test.step("Complete Successful Purchase Checkout", async () => {
      await completeCheckoutPage.finishCheckout();
    });
    //Checkout Confirmation
    await test.step("Checkout Confirmation", async () => {
      await checkoutConfirmationPage.validateCheckoutCompleteURL();
      await checkoutConfirmationPage.validateCompleteHeader();
      await checkoutConfirmationPage.validateCompleteText();
    });
    //Navigate Back Home
    await test.step("Navigate Back Home", async () => {
      await checkoutConfirmationPage.backHome();
      await inventoryPage.validateInventoryURL();
    });
    //Open Hamburger Menu
    await test.step("Open Burger Menu", async () => {
      await inventoryPage.validateHamburgerBtn();
    });
    //Logout
    await test.step("Logout and Return to Login Page", async () => {
      await inventoryPage.validateLogout();
      await loginPage.validateLoginPageURL();
    });
  });

  /* 3 additional tests */
  /* Additional Test 1 */
  // Item Sorting Options
  test("Validate Item Sorting Toggle", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step("Valid Login", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await inventoryPage.validateInventoryURL();
      // await expect(page).toHaveURL(`${baseURL}inventory.html`);
    });
    await test.step("Sort Low to High", async () => {
      await inventoryPage.itemSort("lohi");
      const selectedOption = await inventoryPage.getSortOption();
      await expect(selectedOption).toBe("lohi");
    });
    await test.step("Sort High to Low", async () => {
      await inventoryPage.itemSort("hilo");
      const selectedOption = await inventoryPage.getSortOption();
      await expect(selectedOption).toBe("hilo");
    });
    await test.step("Sort A to Z", async () => {
      await inventoryPage.itemSort("az");
      const selectedOption = await inventoryPage.getSortOption();
      await expect(selectedOption).toBe("az");
    });
    await test.step("Sort Z to A", async () => {
      await inventoryPage.itemSort("za");
      const selectedOption = await inventoryPage.getSortOption();
      await expect(selectedOption).toBe("za");
    });
  });

  /*Additional Test 2*/
  //Validate Item Details
  test("Item Details", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const itemDetailsPage = new ItemDetailsPage(page);
    await test.step("Valid Login", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await inventoryPage.validateInventoryURL();
    });
    await test.step("View Item Details", async () => {
      await inventoryPage.getItemDetails();
    });
    await expect(page).toHaveURL(`${baseURL}inventory-item.html?id=4`);
    await expect(page.locator(".inventory_details_name")).toHaveText(
      "Sauce Labs Backpack"
    );
    await expect(page.locator(".inventory_details_desc")).toHaveText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
    );
    await expect(page.locator(".inventory_details_price")).toHaveText("$29.99");
  });

  /*Additional Test 3*/
  //Add item to Cart from item details page
  test("Add to Cart from Item Details", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const itemDetailsPage = new ItemDetailsPage(page);
    const cartPage = new CartPage(page);
    await test.step("Valid Login", async () => {
      await loginPage.validateLoginPageURL();
      await loginPage.inputValidLoginCredentials();
      await loginPage.submitLoginCredentials();
      await inventoryPage.validateInventoryURL();
    });
    await test.step("View Item Details", async () => {
      await inventoryPage.getItemDetails();
      await itemDetailsPage.validateItemDetailsURL();
      // await expect(page).toHaveURL(`${baseURL}inventory-item.html?id=4`);
    });
    await test.step("Add item to Cart", async () => {
      await itemDetailsPage.addItemToCart();
    });
    await test.step("Go to Cart", async () => {
      await itemDetailsPage.goToCart();
      await cartPage.validateCartURL();
      // await expect(page).toHaveURL(`${baseURL}cart.html`);
      await expect(page.locator(".inventory_item_name")).toHaveText(
        "Sauce Labs Backpack"
      );
      await expect(page.locator(".inventory_item_desc")).toHaveText(
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
      );
      await expect(page.locator(".inventory_item_price")).toHaveText("$29.99");
    });
  });
});
