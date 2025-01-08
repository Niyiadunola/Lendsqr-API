describe('GET Session Request Tests', () => {
  const baseUrl = 'https://vigil.lendsqr.com';

  // Retrieve the auth token before each test
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/pecunia/api/v2/login`, {
      email: 'adunola.adeniyi56@gmail.com', //  valid Email
      password: 'Adunola#1',       // Valid Password
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure login was successful
      Cypress.env('authToken', response.body.access_token); // Store the token in an environment variable
    });
  });

  // Test Valid Session Request
  it('Valid Session Request', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 862 }, // Query parameter
      headers: {
        Authorization: `Bearer ${Cypress.env('authToken')}`, 
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Expect success response
      expect(response.body).to.have.property('session_data'); // Check if session data exists
    });
  });

  // Test Missing app_id Parameter
  it('Missing app_id Parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      headers: {
        Authorization: `Bearer ${Cypress.env('authToken')}`, 
      },
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(400); // Expect Bad Request
      expect(response.body).to.have.property('message', 'app_id is required.');
    });
  });

  // Test Invalid app_id Parameter
  it('Invalid app_id Parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 212 }, // Invalid app_id
      headers: {
        Authorization: `Bearer ${Cypress.env('authToken')}`, 
      },
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(400); // Expect Bad Request
      expect(response.body).to.have.property('message', 'Invalid app_id.');
    });
  });

  // Test Unauthorized Access
  it('Unauthorized Access', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 862 },
      headers: {
        Authorization: '', // No token passed
      },
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(401); // Expect Unauthorized
      expect(response.body).to.have.property('message', 'Unauthorized access');
    });
  });
});





describe('GET Session Request Tests', () => {
  const baseUrl = 'https://vigil.lendsqr.com';

  // Test Valid Session Request
  it('Valid Session Request', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 862 }, // Query parameter
    }).then((response) => {
      expect(response.status).to.eq(200); // Expect success response
      expect(response.body).to.have.property('session_data'); // Check if session data exists
    });
  });

  // Test Missing app_id Parameter
  it('Missing app_id Parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(400); // Expect Bad Request
      expect(response.body).to.have.property('message', 'Unauthorized access');
    });
  });

  // Test Invalid app_id Parameter
  it('Invalid app_id Parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 221 }, // Invalid app_id
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(400); // Expect Bad Request
      expect(response.body).to.have.property('message', 'Invalid app_id.');
    });
  });

  // Test Unauthorized Access
  it('Unauthorized Access', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 862 },
      headers: {
        Authorization: '', // Missing or invalid token
      },
      failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
    }).then((response) => {
      expect(response.status).to.eq(401); // Expect Unauthorized
      expect(response.body).to.have.property('message', 'Unauthorized access');
    });
  });

  // Optional: Test Valid Session Request with Additional Query Parameters
  it('Valid Session Request with Additional Parameters', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pecunia/api/v1/admin/adjutor`,
      qs: { app_id: 862, extra_param: 'value' }, // Additional query parameter
    }).then((response) => {
      expect(response.status).to.eq(200); // Expect success response
      expect(response.body).to.have.property('session_data'); // Check if session data exists
    });
  });
});
