import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  firstNameInput = () => this.page.locator("#first-name");
  lastNameInput = () => this.page.locator("#last-name");
  postalCodeInput = () => this.page.locator("#postal-code");
  continueBtn = () => this.page.locator("#continue");

  //Enter customer information
  async fillForm() {
    await this.firstNameInput().fill("Testy");
    await this.lastNameInput().fill("McTester");
    await this.postalCodeInput().fill("31061");
  }

  //Continue button
  async continueToNextPage() {
    const continueBtn = await this.continueBtn();
    await continueBtn.click();
  }
   // URL validation
   async validateCheckoutURL() {
    const baseURL = "https://www.saucedemo.com";
    const extension = "/checkout-step-one.html";
    const currentURL = await this.page.url();
    await expect(currentURL).toBe(`${baseURL}${extension}`);
  }
} 
