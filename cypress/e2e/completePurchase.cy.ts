import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { personalInfo } from "../data/test-data";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

describe("Complete Purchase Flow", () => {
  const itemsToAdd = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ];

  beforeEach(() => {
    loginPage.visit();
    loginPage.loginWithUser(
      Cypress.env("STANDARD_USER"),
      Cypress.env("PASSWORD"),
    );
  });

  it("should complete the purchase successfully with multiple items", () => {
    productsPage.verifyInventoryContainerIsVisible();

    productsPage.addItemsToCart([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
    ]);
    productsPage.verifyItemsInCartBadge(3);
    productsPage.openCart();

    cartPage.verifyItemsInCart([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
    ]);

    checkoutPage.clickCheckoutButton();
    checkoutPage.enterPersonalInfo(
      personalInfo.firstName,
      personalInfo.lastName,
      personalInfo.postalCode,
    );
    checkoutPage.clickContinue();
    checkoutPage.verifyTotalPriceIsCorrectIncludingTax();
    checkoutPage.clickFinish();
    checkoutPage.verifySuccessMessage();
    checkoutPage.verifyBackHomeButtonIsVisible();
  });
});
