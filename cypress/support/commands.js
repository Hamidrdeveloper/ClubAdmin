import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.get('#username').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();

    cy.intercept('https://ssstg.solutions-apps.com/api/login-admin').as('Login');
    cy.wait('@Login');

    cy.url().should('contain', 'http://localhost:3000/admin/dashboard');
    cy.get('.ant-notification-notice-message').contains('Logged In Successfully');
  });
});

// {selector: css-selector, value: string }
Cypress.Commands.add('antdSelect', ({ selector, value }) => {
  const dropDown = cy.get(selector);
  dropDown.click();
  cy.contains(value).click();
});

Cypress.Commands.add('pickRandomDate', ({ selector, date = null }) => {
  const randomDate = date ? date : moment(chance.date({ string: true })).format('DD-MM-YYYY');
  cy.get(selector).click().type(`${randomDate}{enter}`).tab();
});
