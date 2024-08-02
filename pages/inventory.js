export class InventoryPage {
    constructor(page) {
      this.page = page;
    }
  
  
    addToCartBtn = () => this.page.locator('.btn_inventory');
    removeFromCartBtn = () => this.page.locator('.btn_inventory');
    goToShoppingCartBtn = () => this.page.locator('.shopping_cart_badge');
  
  
    async addFirstItemToCart() {
      const addToCartBtn = await this.addToCartBtn().first();
      await addToCartBtn.click();
    }
    async removeFirstItemFromCart() {
        const removeFromCartBtn = await this.removeFromCartBtn().first();
        await removeFromCartBtn.click();
    }

    ////experimental
    async addSecondItemToCart() {
      const addToCartBtn = await this.addToCartBtn().nth(1);
      await addToCartBtn.click();
    }
    
    async removeSecondItemFromCart() {
      const removeFromCartBtn = await this.removeFromCartBtn().nth(1);
      await removeFromCartBtn.click();
    }
    async addThirdItemToCart() {
      const addToCartBtn = await this.addToCartBtn().nth(2);
      await addToCartBtn.click();
    }
    
    async removeThirdItemFromCart() {
      const removeFromCartBtn = await this.removeFromCartBtn().nth(2);
      await removeFromCartBtn.click();
    }

    async goToShoppingCart() {
      const goToShoppingCartBtn = await this.goToShoppingCartBtn()
      await goToShoppingCartBtn.click();
    }

  }
  