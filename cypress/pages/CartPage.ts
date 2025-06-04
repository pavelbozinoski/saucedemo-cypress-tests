export class CartPage {
  private cartItems = ".cart_item";

  getCartItems() {
    return cy.get(this.cartItems);
  }

  removeButtonForItemIsVisible(itemName: string) {
    return this.getCartItems()
      .contains(itemName)
      .parents(this.cartItems)
      .find("button");
  }

  removeItemsFromCart(items: string[]) {
    items.forEach((item) => {
      this.removeButtonForItemIsVisible(item).click();
    });
  }

  verifyNumberOfItemsInCart(cartItems: number) {
    cy.get(this.cartItems).should("have.length", cartItems);
  }

  verifyItemsInCart(expectedItems: string[]) {
    this.verifyNumberOfItemsInCart(expectedItems.length);
    expectedItems.forEach((item) => {
      this.getCartItems().should("contain.text", item);
    });
  }
}
