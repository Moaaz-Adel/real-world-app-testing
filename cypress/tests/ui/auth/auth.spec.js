/// <reference types="cypress"/>

import { SignUpPage } from "../../../pages/auth/signup.page";
import { LoginPage } from "../../../pages/auth/login.page";
import { users } from "../../../../data/database.json";
import { LandingPage } from "../../../pages/landing_page/landing_page.page";
import { loginSelectors } from "../../../pages/auth/auth_selectors.json";
import { signUpSelectors } from "../../../pages/auth/auth_selectors.json";
import * as faker from "faker";

const signUpPage = new SignUpPage();
const loginPage = new LoginPage();
const landingPage = new LandingPage();

const userNameForLogin = users[0].username;

describe("Auth Tests", () => {
  context("SignUp Tests", () => {
    it.only("Successfully SignUp as a new User", () => {
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

    it("Should display 'Sign up' validation errors", () => {
      cy.visit("/signup");
      cy.get(signUpSelectors.firstNameField).type("First").clear().blur();
      cy.get(signUpSelectors.emptyFirstNameValidation)
        .should("be.visible")
        .and("contain", "First Name is required");

      cy.get(signUpSelectors.lastNameField).type("Last").clear().blur();
      cy.get(signUpSelectors.emptyLastNameValidation)
        .should("be.visible")
        .and("contain", "Last Name is required");

      cy.get(signUpSelectors.userNameField).type("UserName").clear().blur();
      cy.get(signUpSelectors.emptyUserNameValidation)
        .should("be.visible")
        .and("contain", "Username is required");

      cy.get(signUpSelectors.passwordField).type("Password").clear().blur();
      cy.get(signUpSelectors.emptyPasswordValidation)
        .should("be.visible")
        .and("contain", "Enter your password");

      cy.get(signUpSelectors.confirmPasswordField).type("ConfirmPassword").clear().blur();
      cy.get(signUpSelectors.confirmPasswordValidation)
        .should("be.visible")
        .and("contain", "Confirm your password");

      cy.get(signUpSelectors.confirmPasswordField).type("Not Match");
      cy.get(signUpSelectors.confirmPasswordValidation)
        .should("be.visible")
        .and("contain", "Password does not match");

      cy.get(signUpSelectors.signUpButton).should("have.attr", "disabled");
    });
  });

  context("Login Tests", () => {
    it("Should redirect the unauthenticated user to 'Login' Page", () => {
      cy.visit("/anything");
      cy.location("pathname").should("equal", "/signin");
    });

    it("Should redirect the user to 'Home Page' after providing valid email and pass", () => {
      // loginPage.login(users[0].username, "s3cret");
      cy.loginByUI(userNameForLogin, "s3cret", { rememberUser: false });
      cy.location("pathname").should("equal", "/");
      landingPage.verifyLoggedInUser(userNameForLogin);
    });

    it("Should remember the logged in user to 30 days", () => {
      cy.loginByUI(userNameForLogin, "s3cret", { rememberUser: true });
      cy.getCookie("connect.sid").should("have.property", "expiry");
    });

    it("Should redirect the user to 'SignUp page'", () => {
      cy.visit("/signin");
      loginPage.dontHaveAnAccountLink();
      cy.location("pathname").should("equal", "/signup");
    });

    it.only("Should display 'Sign in' validation errors", () => {
      cy.visit("/signin");
      loginPage.loginWithEmptyUserNameAndValidPassword(userNameForLogin, "s3cret");
      cy.get(loginSelectors.emptyUserNameValidationMessage)
        .should("be.visible")
        .and("contain", "Username is required");
      cy.get(loginSelectors.loginBtn).should("have.attr", "disabled");

      cy.visit("/signin");
      loginPage.loginWithEmptyUserNameAndValidPassword(userNameForLogin, "12");
      cy.get(loginSelectors.rememberMeOption).click();
      cy.get(loginSelectors.passwordMinimumCharactersValidationMessage)
        .should("be.visible")
        .and("contain", "Password must contain at least 4 characters");
      cy.get(loginSelectors.loginBtn).should("have.attr", "disabled");
    });

    it("Try login with valid userName and invalid Password", () => {
      cy.visit("/signin");
      loginPage.loginWithValidEmailAndInvalidPassword(userNameForLogin, "InvalidPass");
      cy.get(loginSelectors.signInErrorMessage).should("be.visible");
    });
  });

  context("Logout from Landing Page", () => {
    it("Should logout the user from Landing page", () => {
      cy.loginByUI(userNameForLogin, "s3cret", { rememberUser: false });
      landingPage.logout();
      cy.location("pathname").should("equal", "/signin");
    });
  });
});
