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
  }
  