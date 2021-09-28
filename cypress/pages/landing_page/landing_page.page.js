/// <reference types = "cypress"/>

import { landingPageSelectors } from "./landing_page_selectors.json";

export class LandingPage {
  verifyLoggedInUser(userName) {
    cy.get(landingPageSelectors["@userName"]).should("contain.text", "@" + userName);
  }

  logout() {
    cy.get(landingPageSelectors.logoutBtn).click();
  }
}
