export class CheckoutPage {
    constructor(page) {
      this.page = page;
    }

    firstNameInput = () => this.page.locator("#first-name");
    lastNameInput = () => this.page.locator("#last-name");
    postalCodeInput = () => this.page.locator("#postal-code");
    continueBtn = () => this.page.locator('#continue');

    async fillForm() {
        await this.firstNameInput().fill('Testy');
        await this.lastNameInput().fill('McTester');
        await this.postalCodeInput().fill('31061');
      }

    async continueToNextPage() {
        const continueBtn = await this.continueBtn();
        await continueBtn.click();
      }
}