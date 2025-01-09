describe('Event Log API Tests', () => {
    const baseUrl = 'https://vigil.lendsqr.com';
  
    // Retrieve the auth token before each test
    beforeEach(() => {
      cy.request('POST', `${baseUrl}/pecunia/api/v1/login`, {
        email: 'adunola.adeniyi56@gmail.com', // valid login credentials
        password: 'Adunola#1',       // valid login credentials
      }).then((response) => {
        expect(response.status).to.eq(200); //  login  successful
        Cypress.env('authToken', response.body.access_token); // Store the token in an environment variable
      });
    });
  
    // Test Valid Event Log
    it('Valid Event Log Creation', () => {
      const payload = {
        app_name: 'Adjutor WebApp',
        description: 'Successfully reset app 862 key',
        event_name: 'App 862 key reset',
        org_id: 7645,
        session_id: '20250107150422-007645-AD9511-LSQ-sJaJsgbmY3',
        time: 'Jan 7, 2025, 16:42:11',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/pecunia/api/v1/admin/event-log`, 
        headers: {
          Authorization: `Bearer ${Cypress.env('authToken')}`, // Use the dynamic token
        },
        body: payload,
      }).then((response) => {
        expect(response.status).to.eq(201); // Expect success response
        expect(response.body).to.have.property('message', 'Event logged successfully');
      });
    });
  
    // Test Missing Required Field
    it('Invalid Event Log - Missing app_name', () => {
      const payload = {
        description: 'Successfully reset app 862 key',
        event_name: 'App 862 key reset',
        org_id: 7645,
        session_id: '20250107150422-007645-AD9511-LSQ-sJaJsgbmY3',
        time: 'Jan 7, 2025, 16:42:11',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/pecunia/api/v1/admin/event-log`, 
        headers: {
          Authorization: `Bearer ${Cypress.env('authToken')}`, // Use the dynamic token
        },
        body: payload,
        failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
      }).then((response) => {
        expect(response.status).to.eq(400); // Expect Bad Request
        expect(response.body).to.have.property('message', 'app_name is required.');
      });
    });
  
    // Test Unauthorized Access
    it('Unauthorized Event Log', () => {
      const payload = {
        app_name: 'Adjutor WebApp',
        description: 'Successfully reset app 862 key',
        event_name: 'App 862 key reset',
        org_id: 7645,
        session_id: '20250107150422-007645-AD9511-LSQ-sJaJsgbmY3',
        time: 'Jan 7, 2025, 16:42:11',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/pecunia/api/v1/admin/event-log`, // Adjust endpoint as needed
        headers: {
          Authorization: '', // No token provided
        },
        body: payload,
        failOnStatusCode: false, // Prevent failure for 4xx/5xx responses
      }).then((response) => {
        expect(response.status).to.eq(401); // Expect Unauthorized
        expect(response.body).to.have.property('message', 'Unauthorized.');
      });
    });
  });
  