import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  checkoutBtn = () => this.page.locator("#checkout");

  //Checkout button
  async goToCheckout() {
    const checkoutBtn = await this.checkoutBtn();
    await checkoutBtn.click();
  }

  // URL validation
  async validateCartURL() {
    const baseURL = "https://www.saucedemo.com";
    const extension = "/cart.html";
    const currentURL = await this.page.url();
    await expect(currentURL).toBe(`${baseURL}${extension}`);
  }
}
