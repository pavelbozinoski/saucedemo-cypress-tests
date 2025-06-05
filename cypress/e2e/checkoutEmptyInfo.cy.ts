import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { personalInfo } from "../data/test-data";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

describe("Checkout with Missing Fields", () => {
  before(() => {
    loginPage.visit();
    loginPage.loginWithUser(
      Cypress.env("STANDARD_USER"),
      Cypress.env("PASSWORD"),
    );
  });

  it("should show error messages step-by-step for missing fields", () => {
    productsPage.verifyInventoryContainerIsVisible();
    productsPage.addItemsToCart(["Sauce Labs Backpack"]);
    productsPage.openCart();
    checkoutPage.clickCheckoutButton();
    // Fill last name and postal code
    checkoutPage.enterPersonalInfo(
      undefined,
      personalInfo.lastName,
      personalInfo.postalCode,
    );
    checkoutPage.clickContinue();
    checkoutPage.verifyFirstNameRequiredErrorMessage();

    // Fill first name, clear last name
    checkoutPage.enterPersonalInfo(
      personalInfo.firstName,
      undefined,
      personalInfo.postalCode,
    );
    checkoutPage.clickContinue();
    checkoutPage.verifyLastNameRequiredErrorMessage();

    // Fill last name, clear postal code
    checkoutPage.enterPersonalInfo(
      personalInfo.firstName,
      personalInfo.lastName,
      undefined,
    );
    checkoutPage.clickContinue();
    checkoutPage.verifyPostalCodeRequiredErrorMessage();
  });
});
