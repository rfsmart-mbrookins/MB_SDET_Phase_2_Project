export class InventoryPage {
    constructor(page) {
      this.page = page;
    }
  
  
    addToCartBtn = () => this.page.locator('.btn_inventory');
    removeFromCartBtn = () => this.page.locator('.btn_inventory');
  
  
    async addFirstItemToCart() {
      const firstAddToCartButton = await this.addToCartBtn().first();
      await firstAddToCartButton.click();
    }
    async removeFirstItemFromCart() {
        const firstRemoveFromCartButton = await this.removeFromCartBtn().first();
        await firstRemoveFromCartButton.click();
    }

    ////experimental
    async addSecondItemToCart() {
      const secondAddToCartButton = await this.addToCartBtn().nth(1);
      await secondAddToCartButton.click();
    }
    
    async removeSecondItemFromCart() {
      const secondRemoveFromCartButton = await this.removeFromCartBtn().nth(1);
      await secondRemoveFromCartButton.click();
    }
    async addThirdItemToCart() {
      const thirdAddToCartButton = await this.addToCartBtn().nth(2);
      await thirdAddToCartButton.click();
    }
    
    async removeThirdItemFromCart() {
      const thirdRemoveFromCartButton = await this.removeFromCartBtn().nth(2);
      await thirdRemoveFromCartButton.click();
    }
  }
  