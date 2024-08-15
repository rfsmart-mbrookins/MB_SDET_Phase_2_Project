import { expect } from "@playwright/test";

export class CheckoutConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  // Properties to access page elements
  get completeHeaderElement() {
    return this.page.locator(".complete-header");
  }

  get completeTextElement() {
    return this.page.locator(".complete-text");
  }

  get backHomeBtn() {
    return this.page.locator('[data-test="back-to-products"]');
  }

  // Header validation
  async validateCompleteHeader() {
    const completeHeader = this.completeHeaderElement;
    await expect(completeHeader).toHaveText("Thank you for your order!");
  }

  // Text validation
  async validateCompleteText() {
    const completeText = this.completeTextElement;
    await expect(completeText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }

  // URL validation
  async validateCheckoutCompleteURL() {
    const baseURL = "https://www.saucedemo.com";
    const extension = "/checkout-complete.html";
    const currentURL = await this.page.url();
    await expect(currentURL).toBe(`${baseURL}${extension}`);
  }

  async backHome() {
    const backHomeBtn = this.backHomeBtn;
    await backHomeBtn.click();
  }
}
