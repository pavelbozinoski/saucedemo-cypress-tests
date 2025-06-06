export class ProductsPage {
  private inventoryItems = '[data-test="inventory-item"]';
  private cartBadge = '[data-test="shopping-cart-badge"]';
  private cartLink = '[data-test="shopping-cart-link"]';
  private loginForm = "#login_button_container";
  private inventoryContainer = "#inventory_container";
  private productSort = '[data-test="product-sort-container"]';

  getInventoryItems() {
    return cy.get(this.inventoryItems);
  }

  addItemsToCart(items: string[]) {
    items.forEach((item) => {
      this.getInventoryItems()
        .contains(item)
        .parents(this.inventoryItems)
        .find("button")
        .click();
    });
  }

  getCartBadge() {
    return cy.get(this.cartBadge);
  }

  openCart() {
    cy.get(this.cartLink).click();
  }

  getItemImage(itemName: string) {
    return this.getInventoryItems()
      .contains(itemName)
      .parents(this.inventoryItems)
      .find("img.inventory_item_img");
  }

  verifyLoginFormNotExist() {
    cy.get(this.loginForm).should("not.exist");
  }

  verifyInventoryContainerIsVisible() {
    cy.get(this.inventoryContainer).should("be.visible");
  }

  verifyUrlIncludes(url: string) {
    cy.url().should("include", url);
  }

  verifyItemImageHaveAttribute(itemImage: string, attribute: string) {
    this.getItemImage(itemImage).should("have.attr", attribute);
  }

  verifyItemsInCartBadge(expectedCount: number) {
    cy.get(this.cartBadge).should("have.text", expectedCount.toString());
  }

  sortProductsBy(sortBy: string){
    cy.get(this.productSort).select(sortBy);

  }

  verifyPricesSortedLowToHigh() {
    this.getInventoryItems()
      .find(".inventory_item_price")
      .then(($prices) => {
        const prices = [...$prices].map((el) =>
          parseFloat(el.innerText.replace("$", ""))
        );

        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
  }
}