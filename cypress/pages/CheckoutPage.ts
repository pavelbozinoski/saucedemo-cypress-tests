export class CheckoutPage {
  private checkoutButton = '[data-test="checkout"]';
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private completeHeader = '[data-test="complete-header"]';
  private itemPrices = '[data-test="inventory-item-price"]';
  private totalSummary = '[data-test="total-label"]';
  private backHomeButton = '[data-test="back-to-products"]';

  clickCheckoutButton() {
    cy.get(this.checkoutButton).click();
  }

  enterPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    cy.get(this.firstNameInput).type(firstName);
    cy.get(this.lastNameInput).type(lastName);
    cy.get(this.postalCodeInput).type(postalCode);
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickFinish() {
    cy.get(this.finishButton).click();
  }

  verifySuccessMessage() {
    cy.get(this.completeHeader).should(
      "contain.text",
      "Thank you for your order!",
    );
  }

  verifyTotalPriceIsCorrectIncludingTax(tax: number = 4.48) {
    let total = 0;

    cy.get(this.itemPrices)
      .each(($el) => {
        const price = parseFloat($el.text().replace("$", ""));
        total += price;
      })
      .then(() => {
        const expectedTotal = parseFloat((total + tax).toFixed(2));

        cy.get(this.totalSummary).then(($summary) => {
          const summaryText = $summary.text();
          const actualTotal = parseFloat(summaryText.replace("Total: $", ""));
          expect(actualTotal).to.eq(expectedTotal);
        });
      });
  }

  verifyBackHomeButtonIsVisible() {
    cy.get(this.backHomeButton).should("be.visible");
  }
}
