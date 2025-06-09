export class LoginPage {
  private usernameInput = "#user-name";
  private passwordInput = "#password";
  private loginButton = "#login-button";
  private errorMessage = '[data-test="error"]';
  private loginForm = "#login_button_container";

  visit() {
    cy.visit("/");
  }

  loginWithUser(username: string, password: string) {
    cy.get(this.usernameInput).clear().type(username);

    cy.get(this.passwordInput).clear().type(password, { log: false }); // hiding password in logs

    cy.get(this.loginButton).click();
  }

  verifyUrlIncludes(url: string) {
    cy.url().should("include", url);
    cy.url().should("include", url);
  }

  verifyLoginFormExist() {
    cy.get(this.loginForm).should("exist");
  }

  verifyLockedOutErrorMessage() {
    return cy
      .get(this.errorMessage)
      .should("be.visible")
      .and(
        "contain.text",
        "Epic sadface: Sorry, this user has been locked out.",
      );
  }

  verifyNonExistingUserErrorMessage() {
    return cy
      .get(this.errorMessage)
      .should("be.visible")
      .and(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service",
      );
  }
}
