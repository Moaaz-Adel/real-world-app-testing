/// <reference types="cypress"/>

import { SignUpSelectors } from "./auth_selectors";

export class SignUpPage {
  signUp(firstName, lastName, userName, userPass) {
    cy.get(SignUpSelectors.firstNameField).type(firstName);
    cy.get(SignUpSelectors.lastNameField).type(lastName);
    cy.get(SignUpSelectors.userNameField).type(userName);
    cy.get(SignUpSelectors.passwordField).type(userPass);
    cy.get(SignUpSelectors.confirmPasswordField).type(userPass);
    cy.get(SignUpSelectors.signUpButton).click();
  }

  haveAnAccount() {
    cy.contains("a", SignUpSelectors.haveAnAccountRedirectionButton).click();
  }
}
