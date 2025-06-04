import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";

describe("SauceDemo Cart Tests", () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.loginWithUser(
      Cypress.env("STANDARD_USER"),
      Cypress.env("PASSWORD"),
    );
  });

  it("Add item to cart, verify quantity, check remove button", () => {
    productsPage.addItemsToCart(["Sauce Labs Backpack"]);
    productsPage.verifyItemsInCartBadge(1);
    productsPage.openCart();
    cartPage.verifyItemsInCart(["Sauce Labs Backpack"]);
    cartPage.removeButtonForItemIsVisible("Sauce Labs Backpack");
  });

  it("Add items to cart, verify quantity, remove some item and verify the remaining items", () => {
    productsPage.addItemsToCart([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie",
    ]);
    productsPage.verifyItemsInCartBadge(3);
    productsPage.openCart();
    cartPage.verifyItemsInCart([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie",
    ]);
    cartPage.removeItemsFromCart(["Sauce Labs Backpack"]);
    cartPage.verifyItemsInCart(["Sauce Labs Bike Light", "Sauce Labs Onesie"]);
  });
});
