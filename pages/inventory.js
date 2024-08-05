export class InventoryPage {
    constructor(page) {
      this.page = page;
    }
  
  
    addToCartBtn = () => this.page.locator('.btn_inventory');
    removeFromCartBtn = () => this.page.locator('.btn_inventory');
    goToShoppingCartBtn = () => this.page.locator('.shopping_cart_link');
  

    //Add to cart button
    async addItemToCart(index = 0) {
      const addToCartBtn = await this.addToCartBtn().nth(index);
      await addToCartBtn.click();
    }
  
    //Remove from cart button
    async removeItemFromCart(index = 0) {
      const removeFromCartBtn = await this.removeFromCartBtn().nth(index);
      await removeFromCartBtn.click();
    }

    //Shopping cart button
    async goToShoppingCart() {
      const goToShoppingCartBtn = await this.goToShoppingCartBtn()
      await goToShoppingCartBtn.click();
    }

  }
  