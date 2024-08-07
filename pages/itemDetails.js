export class ItemDetailsPage {
  constructor(page) {
    this.page = page;
  }

  addToCartBtn = () => this.page.locator(".btn_primary");
  removeFromCartBtn = () => this.page.locator('button[data-test="remove"]');
  itemDetails = () => this.page.locator(".inventory_item_name");
  backToProductsBtn = () =>
    this.page.locator('button[data-test="back-to-products"]');
  goToCartBtn = () => this.page.locator(".shopping_cart_link");

  // Add to cart button
  async addItemToCart() {
    const addToCartBtn = this.addToCartBtn();
    await addToCartBtn.click();
  }

  // Remove from cart button
  async removeItemFromCart() {
    const removeFromCartBtn = this.removeFromCartBtn();
    await removeFromCartBtn.click();
  }

  // Back to Products
  async backToProducts() {
    const backToProductsBtn = this.backToProductsBtn();
    await backToProductsBtn.click();
  }
  //Shopping cart button
  async goToCart() {
    const goToCartBtn = await this.goToCartBtn();
    await goToCartBtn.click();
  }
}
