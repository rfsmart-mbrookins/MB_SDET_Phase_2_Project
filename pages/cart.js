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
}
