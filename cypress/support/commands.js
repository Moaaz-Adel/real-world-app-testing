import { loginSelectors } from "./../pages/auth/auth_selectors.json";
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

Cypress.Commands.add("loginByUI", (userName, password, { rememberUser = false } = {}) => {
  cy.visit("/signin");
  cy.get(loginSelectors.usernameField).type(userName);
  cy.get(loginSelectors.passwordField).type(password);
  if (rememberUser) {
    cy.get(loginSelectors.rememberMeOption).click();
  }
  cy.get(loginSelectors.loginBtn).click();
});

Cypress.Commands.add("loginByAPI", (userName, password, { rememberUser = false } = {}) => {
  const apiHost = Cypress.env("apiUrl");
  const loginEndPoint = "/login";
  return cy.request({
    method: "POST",
    url: `${apiHost}${loginEndPoint}`,
    body: {
      username: userName,
      password: password,
      type: "password",
    },
  });
});

// Cypress.Commands.add("database", (operation, entity, query, logTask = false) => {
//   const params = {
//     entity,
//     query,
//   };
