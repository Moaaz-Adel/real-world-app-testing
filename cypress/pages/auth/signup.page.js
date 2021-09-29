/// <reference types="cypress"/>

import { signUpSelectors } from "./auth_selectors.json";

export class SignUpPage {
  signUp(firstName, lastName, userName, userPass) {
    cy.get(signUpSelectors.firstNameField).type(firstName);
    cy.get(signUpSelectors.lastNameField).type(lastName);
    cy.get(signUpSelectors.userNameField).type(userName);
    cy.get(signUpSelectors.passwordField).type(userPass);
    cy.get(signUpSelectors.confirmPasswordField).type(userPass);
    cy.get(signUpSelectors.signUpButton).click();
  }

  haveAnAccount() {
    cy.contains("a", signUpSelectors.haveAnAccountRedirectionButton).click();
  }
}
