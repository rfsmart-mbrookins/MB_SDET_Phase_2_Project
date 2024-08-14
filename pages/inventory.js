import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  addToCartBtn = () => this.page.locator(".btn_inventory");
  removeFromCartBtn = () => this.page.locator(".btn_inventory");
  goToShoppingCartBtn = () => this.page.locator(".shopping_cart_link");
  itemSortOpt = () => this.page.locator(".product_sort_container");
  itemDetails = () => this.page.locator(".inventory_item_name");

  //Add to cart buttons
  async addItemToCart(index = 0) {
    const addToCartBtn = await this.addToCartBtn().nth(index);
    await addToCartBtn.click();
  }

  //Remove from cart buttons
  async removeItemFromCart(index = 0) {
    const removeFromCartBtn = await this.removeFromCartBtn().nth(index);
    await removeFromCartBtn.click();
  }

  //Shopping cart button
  async goToShoppingCart() {
    const goToShoppingCartBtn = await this.goToShoppingCartBtn();
    await goToShoppingCartBtn.click();
  }

  //Sorting items
  async itemSort(value) {
    const itemSortOpt = await this.itemSortOpt();
    await itemSortOpt.selectOption(value);
  }
  
  //Get sort option
  async getSortOption() {
    const itemSortOpt = await this.itemSortOpt();
    return await itemSortOpt.inputValue();
  }

  //Item details
  async getItemDetails(index = 0) {
    const itemDetails = await this.itemDetails().nth(index);
    await itemDetails.click();
  }

    // URL validation
    async validateInventoryURL() {
      const baseURL = "https://www.saucedemo.com";
      const extension = "/inventory.html";
      const currentURL = await this.page.url();
      await expect(currentURL).toBe(`${baseURL}${extension}`);
    }

}
 