import { faker } from '@faker-js/faker';

describe('Signup API Tests', () => {
  const baseUrl = 'https://vigil.lendsqr.com';

  // Test Valid credentials
  it('Valid Signup', () => {
    cy.request('POST', `${baseUrl}/pecunia/api/v2/onboard`, {
      name: faker.name.fullName(),  // Random full name
      locale: "en-US",
      business_name: faker.company.name(),  // Random company name
      email: faker.internet.email(),  // Random email
      password: "Password#1",
      phone_number: faker.phone.number('2349121334412')  // Random phone number
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('api_key');
    });
  });

  // Test Invalid credentials - Empty Full Name
  it('Invalid Signup - Missing Full Name', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: "", 
        locale: "en-US",
        business_name: faker.company.name(),
        email: faker.internet.email(),
        password: "Password#1",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'name is not allowed to be empty');
    });
  });

  // Test Invalid credentials - Empty Email
  it('Invalid Signup - Missing Email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: faker.name.fullName(),
        locale: "en-US",
        business_name: faker.company.name(),
        email: "",
        password: "Password#1",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Please enter a valid email address.');
    });
  });

  // Test Invalid Email Address
  it('Invalid Signup - Invalid Email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: faker.name.fullName(),
        locale: "en-US",
        business_name: faker.company.name(),
        email: "email.com",  // Invalid email
        password: "Password#1",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Please enter a valid email address.');
    });
  });

  // Test for Existing Business Name
  it('Invalid Signup - Existing Business Name', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: "John Doe", 
        locale: "en-US",
        business_name: "Capital Credit Limited",  // Using an existing business name
        email: faker.internet.email(),  // Random email
        password: "Password#1",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Business Name already exist');
    });
  });

   // Test for Empty Password
   it('Invalid Signup - Existing Business Name', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: "John Doe", 
        locale: "en-US",
        business_name: "Capital Credit Limited",  // Using an existing business name
        email: faker.internet.email(),  // Random email
        password: "",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'password is not allowed to be empty');
});
});

   // Test for Password Complexity
   it('Invalid Signup - Existing Business Name', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pecunia/api/v2/onboard`,
      body: {
        name: "John Doe", 
        locale: "en-US",
        business_name: "Capital Credit Limited",  // Using an existing business name
        email: faker.internet.email(),  // Random email
        password: "",
        phone_number: faker.phone.number('090########')
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Password should have at least one symbol.');
});
});

 // Test for Invalid Phone Number
 it('Invalid Signup - Existing Business Name', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/pecunia/api/v2/onboard`,
    body: {
      name: "John Doe", 
      locale: "en-US",
      business_name: "Capital Credit Limited",  // Using an existing business name
      email: faker.internet.email(),  // Random email
      password: "",
      phone_number: faker.phone.number('090#####')
    },
    failOnStatusCode: false, // Prevent Cypress from failing the test on a 4xx/5xx response
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('message', 'The provided phone number is invalid or could not be verified. Please check the number and try again');
});
});
});
