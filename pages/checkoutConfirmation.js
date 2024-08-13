import { expect } from "@playwright/test";

export class CheckoutConfirmationPage {
  constructor(page) {
    this.page = page;
  }
  // Properties to access page elements
  get completeHeaderElement() {
    return this.page.locator(".complete-header");
  }
  get checkoutCompleteURLElement() {
    return this.page.url();
  }
  // Header validation
  async validateCompleteHeader() {
    const completeHeader = this.completeHeaderElement;
    await expect(completeHeader).toHaveText("Thank you for your order!");
  }
  // URL validation
  async validateCheckoutCompleteURL() {
    const baseURL = "https://www.saucedemo.com";
    const extension = "/checkout-complete.html";
    const currentURL = await this.page.url();
    await expect(currentURL).toBe(`${baseURL}${extension}`);
  }
}
