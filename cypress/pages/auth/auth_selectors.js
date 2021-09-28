export const LoginSelectors = {
  usernameField: "#username",
  passwordField: "#password",
  loginBtn: '[data-test="signin-submit"]',
  rememberMeOption: '[name="remember"]',
  signUpLink: '[data-test="signup"]',
  emptyUserNameValidationMessage: "#username-helper-text",
  passwordMinimumCharactersValidationMessage: "#password-helper-text",
  dontHaveAnAccountLink: '[data-test="signup"]',
  signInErrorMessage: '[data-test="signin-error"]',
};

export const SignUpSelectors = {
  firstNameField: "#firstName",
  lastNameField: "#lastName",
  userNameField: "#username",
  passwordField: "#password",
  confirmPasswordField: "#confirmPassword",
  signUpButton: '[data-test="signup-submit"]',
  haveAnAccountRedirectionButton: "Have an account? Sign In",
};
