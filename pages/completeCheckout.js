import { expect } from "@playwright/test";

export class CompleteCheckoutPage {
  constructor(page) {
    this.page = page;
  }

  finishBtn = () => this.page.locator("#finish");

  //Finish button
  async finishCheckout() {
    const finishBtn = await this.finishBtn();
    await finishBtn.click();
  }
     // URL validation
     async validateCompleteCheckoutURL() {
      const baseURL = "https://www.saucedemo.com";
      const extension = "/checkout-step-two.html";
      const currentURL = await this.page.url();
      await expect(currentURL).toBe(`${baseURL}${extension}`);
    }
} 
