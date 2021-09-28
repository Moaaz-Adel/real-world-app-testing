import { LoginSelectors } from "./auth_selectors";

export class LoginPage {
  verifyLoginPageOpenedAfterSignUp() {
    cy.contains("h1", "Sign in").should("be.visible");
  }

  dontHaveAnAccountLink() {
    cy.get(LoginSelectors.dontHaveAnAccountLink).click();
  }

  loginWithEmptyUserNameAndValidPassword(userName, password) {
    cy.get(LoginSelectors.usernameField).type(userName).clear().blur();
    cy.get(LoginSelectors.passwordField).type(password);
  }

  loginWithValidEmailAndInvalidPassword(userName, password) {
    cy.get(LoginSelectors.usernameField).type(userName);
    cy.get(LoginSelectors.passwordField).type(password);
    cy.get(LoginSelectors.loginBtn).click();
  }

  //   login(userName, password) {
  //     cy.get(LoginSelectors.usernameField).type(userName);
  //     cy.get(LoginSelectors.passwordField).type(password);
  //     cy.get(LoginSelectors.loginBtn).click();
  //   }
}
