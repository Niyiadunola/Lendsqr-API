import { faker } from '@faker-js/faker';

describe('Login API Tests', () => {
  const baseUrl = 'https://vigil.lendsqr.com';

  // Test Valid credentials
  it('Valid Login', () => {
    cy.request('POST', `${baseUrl}/pecunia/api/v2/auth/admin/login`, {
      email: "adunola.adeniyi56@gmail.com", // Use a valid random email for login
      password: "Adunola#1",    // Use a valid password
    }).then((response) => {
      expect(response.status).to.eq(200);  // Expecting a successful login
      expect(response.body).to.have.property('access_token');  // Expect an access token
    });
  });

  // Test Invalid credentials - Missing Email
  it('Invalid Login - Missing Email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "",  // Missing email
        password: "Password#1",  // Valid password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(400);  // Expecting a Bad Request
      expect(response.body).to.have.property('message', 'email is not allowed to be empty');
    });
  });

  // Test Invalid credentials - Missing Password
  it('Invalid Login - Missing Password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "adunola.adeniyi56@gmail.com",  // Valid email
        password: "",  // Missing password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(400);  // Expecting a Bad Request
      expect(response.body).to.have.property('message', 'password is not allowed to be empty');
    });
  });

  // Test Invalid credentials - Invalid Email
  it('Invalid Login - Invalid Email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "invalidemail.com",  // Invalid email format
        password: "Password#1",  // Valid password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(400);  // Expecting a Bad Request
      expect(response.body).to.have.property('message', 'Incorrect login credentials.');
    });
  });

  // Test Invalid credentials - Incorrect Password
  it('Invalid Login - Incorrect Password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "adunola.adeniyi56@gmail.com",  // Use a valid  email
        password: "IncorrectPassword123",  // Incorrect password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(401);  // Expecting Unauthorized
      expect(response.body).to.have.property('message', 'Incorrect login credentials.');
    });
  });
  // Test Missing credentials (Email and Password)
  it('Invalid Login - Non-existent User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "",  // Non-existent email
        password: "",  // Valid password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(404);  // Expecting Not Found
      expect(response.body).to.have.property('message', 'email is not allowed to be empty');
    });
  });

  // Test Invalid credentials - Non-existent User
  it('Invalid Login - Non-existent User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/login`,
      body: {
        email: "nonexistentuser@domain.com",  // Non-existent email
        password: "Password#1",  // Valid password
      },
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(404);  // Expecting Not Found
      expect(response.body).to.have.property('message', 'User not found.');
    });
  });
});
