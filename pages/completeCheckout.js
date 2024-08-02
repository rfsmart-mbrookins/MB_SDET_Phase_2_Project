export class CompleteCheckoutPage {
    constructor(page) {
      this.page = page;
    }

    finishBtn = () => this.page.locator('#finish');

   

    async finishCheckout() {
        const finishBtn = await this.finishBtn();
        await finishBtn.click();
      }
}