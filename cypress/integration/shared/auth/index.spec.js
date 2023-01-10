/// <reference types="Cypress" />

import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();

describe('Sign Up and Login', () => {
  it('can register', () => {
    cy.visit('http://localhost:3000/auth/register');

    const email = chance.email({ domain: 'cy.test' });
    const password = chance.string({ length: 8, alpha: true, symbols: true });
    const name = chance.name({ nationality: 'en' }).split(' ');
    const firstName = name[0];
    const lastName = name[1];
    const birthday = moment(chance.birthday({ string: true, type: 'adult', american: true })).format(
      'YYYY-MM-DD',
    );

    cy.get('#first_name').type(firstName);
    cy.get('#last_name').type(lastName);
    cy.get('#email').type(email);
    cy.get('#birth_date').click().type(`${birthday}{enter}`);
    cy.get('#password').type(password);
    cy.get('[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    cy.intercept('POST', `https://ssstg.solutions-apps.com/api/register`).as('register');

    cy.wait('@register').then((response) => {
      expect(response.response.statusCode).to.be.lessThan(400);
    });
  });

  it('can login', () => {
    cy.login('john@doe.com', '12345678');
  });
});
