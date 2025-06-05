import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

describe("Verify Product Sorting", () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();

  before(() => {
    loginPage.visit();
    loginPage.loginWithUser(
      Cypress.env("STANDARD_USER"),
      Cypress.env("PASSWORD"),
    );    
  });

  it("should sort products by Price: low to high", () => {
    productsPage.verifyUrlIncludes("/inventory.html");
    productsPage.sortProductsBy('Price (low to high)')
    productsPage.verifyPricesSortedLowToHigh();
  });
});