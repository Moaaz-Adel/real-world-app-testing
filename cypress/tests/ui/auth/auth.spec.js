/// <reference types="cypress"/>

import { SignUpPage } from "../../../pages/auth/signup.page";

import * as faker from "faker";
import { LoginPage } from "../../../pages/auth/login.page";
import { users } from "../../../../data/database.json";
import { LandingPage } from "../../../pages/landing_page/landing_page.page";
import { LoginSelectors } from "../../../pages/auth/auth_selectors";

const signUpPage = new SignUpPage();
const loginPage = new LoginPage();
const landingPage = new LandingPage();

const userNameForLogin = users[0].username;

describe("Auth Tests", () => {
  context("SignUp Tests", () => {
    it("Successfully SignUp as a new User", () => {
      cy.visit("/signup");
      signUpPage.signUp(
        faker.name.firstName(),
        faker.name.lastName(),
        faker.name.middleName(),
        "aA12345"
      );
      loginPage.verifyLoginPageOpenedAfterSignUp();
    });

    it("Should redirect the user to 'SignIn page'", () => {
      cy.visit("/signup");
      signUpPage.haveAnAccount();
      cy.location("pathname").should("equal", "/signin");
    });
  });

  context("Login Tests", () => {
    it("Should redirect the unauthenticated user to 'Login' Page", () => {
      cy.visit("/anything");
      cy.location("pathname").should("equal", "/signin");
    });

    it("Should redirect the user to 'Home Page' after providing valid email and pass", () => {
      // loginPage.login(users[0].username, "s3cret");
      cy.login(userNameForLogin, "s3cret", { rememberUser: false });
      cy.location("pathname").should("equal", "/");
      landingPage.verifyLoggedInUser(userNameForLogin);
    });

    it("Should remember the logged in user to 30 days", () => {
      cy.login(userNameForLogin, "s3cret", { rememberUser: true });
      cy.getCookie("connect.sid").should("have.property", "expiry");
    });

    it("Should redirect the user to 'SignUp page'", () => {
      cy.visit("/signin");
      loginPage.dontHaveAnAccountLink();
      cy.location("pathname").should("equal", "/signup");
    });

    it.only("Validations on 'Sign in' fields", () => {
      cy.visit("/signin");
      loginPage.loginWithEmptyUserNameAndValidPassword(userNameForLogin, "s3cret");
      cy.get(LoginSelectors.emptyUserNameValidationMessage).should("be.visible");
      cy.get(LoginSelectors.loginBtn).should("have.attr", "disabled");

      cy.visit("/signin");
      loginPage.loginWithEmptyUserNameAndValidPassword(userNameForLogin, "12");
      cy.get(LoginSelectors.rememberMeOption).click();
      cy.get(LoginSelectors.passwordMinimumCharactersValidationMessage).should("be.visible");
      cy.get(LoginSelectors.loginBtn).should("have.attr", "disabled");
    });

    it("Try login with valid userName and invalid Password", () => {
      cy.visit("/signin");
      loginPage.loginWithValidEmailAndInvalidPassword(userNameForLogin, "InvalidPass");
      cy.get(LoginSelectors.signInErrorMessage).should("be.visible");
    });
  });

  context("Logout from Landing Page", () => {
    it("Should logout the user from Landing page", () => {
      cy.login(userNameForLogin, "s3cret", { rememberUser: false });
      landingPage.logout();
      cy.location("pathname").should("equal", "/signin");
    });
  });
});
