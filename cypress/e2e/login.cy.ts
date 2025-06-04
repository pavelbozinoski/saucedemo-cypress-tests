import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

describe("SauceDemo Login Tests", () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it("Login as standard user and verify URL", () => {
    loginPage.loginWithUser(
      Cypress.env("STANDARD_USER"),
      Cypress.env("PASSWORD"),
    );

    productsPage.verifyLoginFormNotExist();
    productsPage.verifyUrlIncludes("/inventory.html");
    productsPage.verifyInventoryContainerIsVisible();
  });

  it("Login with locked out user and confirm error message", () => {
    loginPage.loginWithUser(
      Cypress.env("LOCKED_USER"),
      Cypress.env("PASSWORD"),
    );
    loginPage.verifyLockedOutErrorMessage();
    loginPage.verifyLoginFormExist();
    loginPage.verifyUrlIncludes("/");
  });

  it("Login with problem user and check onesie image (should fail)", () => {
    loginPage.loginWithUser(
      Cypress.env("PROBLEM_USER"),
      Cypress.env("PASSWORD"),
    );

    productsPage.verifyItemImageHaveAttribute(
      "Sauce Labs Onesie",
      "/static/media/red-onesie-1200x1500.2ec0945d.jpg",
    );
  });

  it('Login with error user and expect "Failed to add item to the cart" exception', () => {
    // this test will pass. here i am dealing with the error, and validating that cart badge is not existing, and the cart is empty
    // below this test i have another test (that should fail), without dealing with the error, as the real scenario should work
    let errorCaught = false;

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("Failed to add item to the cart");
      errorCaught = true;
      return false;
    });

    loginPage.loginWithUser(Cypress.env("ERROR_USER"), Cypress.env("PASSWORD"));

    productsPage.addItemsToCart(["Sauce Labs Fleece Jacket"]);

    cy.wait(500).then(() => {
      expect(errorCaught, "Expected error was thrown").to.be.true;
    });

    productsPage.getCartBadge().should("not.exist");
    productsPage.openCart();
    cartPage.verifyNumberOfItemsInCart(0);
  });

  it("Login with error user : Add fleece jacked to cart and confirm (this should fail)", () => {
    // this is a real scenario where we find a bug
    loginPage.loginWithUser(Cypress.env("ERROR_USER"), Cypress.env("PASSWORD"));
    productsPage.addItemsToCart(["Sauce Labs Fleece Jacket"]);
    // test will fail here
    productsPage.verifyItemsInCartBadge(1);
    cartPage.verifyItemsInCart(["Sauce Labs Fleece Jacket"]);
  });
});
