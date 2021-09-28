import { LoginSelectors } from "./../pages/auth/auth_selectors";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (userName, password, { rememberUser = false } = {}) => {
  cy.visit("/signin");
  cy.get(LoginSelectors.usernameField).type(userName);
  cy.get(LoginSelectors.passwordField).type(password);
  if (rememberUser) {
    cy.get(LoginSelectors.rememberMeOption).click();
  }
  cy.get(LoginSelectors.loginBtn).click();
});

// Cypress.Commands.add("database", (operation, entity, query, logTask = false) => {
//   const params = {
//     entity,
//     query,
//   };
