export class CompleteCheckoutPage {
    constructor(page) {
      this.page = page;
    }

    finishBtn = () => this.page.locator('#finish');

   
//Finish button
    async finishCheckout() {
        const finishBtn = await this.finishBtn();
        await finishBtn.click();
      }
}