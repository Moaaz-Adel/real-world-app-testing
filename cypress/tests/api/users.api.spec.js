import { users } from "../../../data/database.json";
const apiUsers = `${Cypress.env("apiUrl")}/users`;

const userNameForLogin = users[0].username;
const userId = users[0].id;
const email = users[0].email;
const phoneNumber = users[1].phoneNumber;
const userNameForSearch = users[1].username;

describe("Testing Users API", () => {
  beforeEach("Authorize user", () => {
    cy.loginByAPI(userNameForLogin, "s3cret", { rememberUser: false });
  });

  context("Get /Users", () => {
    it("Should list the users successfully for the authorized user", () => {
      cy.request("GET", apiUsers).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.results).length.to.be.greaterThan(1);
      });
    });
  });
  context("Get /Users/:userId", () => {
    it("Should retrieve a user successfully", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/${userId}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.user).to.have.property("firstName");
      });
    });

    it("Should get error when trying to getting invalid user", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/aad`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(422);
      });
    });
  });

  context("Get /users/profile/username", () => {
    it("Should retrieve user profile info successfully", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/profile/${userNameForSearch}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.user).to.have.property("avatar");
      });
    });
  });

  context("GET /users/search", () => {
    it("Search for user by email", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/search`,
        qs: { q: email },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.results).to.have.length.greaterThan(0);
        expect(res.body.results[0]).to.have.property("email");
      });
    });
    it("Search for user by Phone Number", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/search`,
        qs: { q: phoneNumber },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.results).to.have.length.greaterThan(0);
        expect(res.body.results[0]).to.have.property("firstName");
      });
    });

    it("GET users by username", () => {
      cy.request({
        method: "GET",
        url: `${apiUsers}/search`,
        qs: { q: userNameForSearch },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.results[0]).to.have.property("firstName");
      });
    });
  });
});

describe("UnAuthenticated user", () => {
  it("Should NOT shows any user for the UnAuthenticated user", () => {
    cy.request({ method: "GET", url: apiUsers, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property("error");
    });
  });
});
