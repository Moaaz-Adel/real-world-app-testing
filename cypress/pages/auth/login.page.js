import { loginSelectors } from "./auth_selectors.json";

export class LoginPage {
  verifyLoginPageOpenedAfterSignUp() {
    cy.contains("h1", "Sign in").should("be.visible");
  }

  dontHaveAnAccountLink() {
    cy.get(loginSelectors.dontHaveAnAccountLink).click();
  }

  loginWithEmptyUserNameAndValidPassword(userName, password) {
    cy.get(loginSelectors.usernameField).type(userName).clear().blur();
    cy.get(loginSelectors.passwordField).type(password);
  }

  loginWithValidEmailAndInvalidPassword(userName, password) {
    cy.get(loginSelectors.usernameField).type(userName);
    cy.get(loginSelectors.passwordField).type(password);
    cy.get(loginSelectors.loginBtn).click();
  }

  //   login(userName, password) {
  //     cy.get(loginSelectors.usernameField).type(userName);
  //     cy.get(loginSelectors.passwordField).type(password);
  //     cy.get(loginSelectors.loginBtn).click();
  //   }
}
