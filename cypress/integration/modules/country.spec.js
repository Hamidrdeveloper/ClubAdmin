/// <reference types="cypress" />

import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();

describe('Country Module Test', () => {
  beforeEach(() => {
    cy.login('john@doe.com', '12345678');
    cy.visit('http://localhost:3000/admin/settings/countries');

    cy.intercept('https://ssstg.solutions-apps.com/api/users/profile', { fixture: 'profile' }).as(
      'getProfile',
    );
    cy.intercept('https://ssstg.solutions-apps.com/api/countries?page=1&per_page=10').as('getAllCountry');
    cy.wait(['@getProfile', '@getAllCountry']);
  });

  it('can update vats', () => {
    cy.get(`[data-row-key="1"] > .id > a`).click();

    cy.intercept('https://ssstg.solutions-apps.com/api/countries/1').as('getOneCountry');
    cy.wait('@getOneCountry');

    cy.get('#country-form_vats_0_number')
      .clear()
      .type(chance.integer({ min: 0 }));

    cy.get('#country-form_vats_0_value')
      .clear()
      .type(chance.integer({ min: 0, max: 100 }));

    const randomDate = moment(chance.date({ american: false, year: 2020 })).format('DD-MM-YYYY');

    cy.get('#country-form_vats_0_valid_from').focus().clear().type(`${randomDate}{enter}`);

    cy.get('.ant-form-item-control-input-content > .ant-btn').click();

    cy.wait('@getAllCountry');

    cy.get(`.ant-message-custom-content > :nth-child(2)`)
      .should('be.visible')
      .should('contain', 'Country Updated Successfully');
  });

  it('can toggle activate', () => {
    cy.get(
      '[data-row-key="1"] > :nth-child(10) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input',
    ).click();

    cy.intercept('PUT', '/api/countries/1/is-active').as('activate');

    cy.wait('@activate');

    cy.get(`.ant-message-custom-content > :nth-child(2)`)
      .should('be.visible')
      .should('contain', 'Country Updated Successfully');
  });

  it('can toggle default', () => {
    cy.get(
      '[data-row-key="1"] > :nth-child(11) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input',
    ).click();

    cy.intercept('PUT', 'api/countries/default').as('setDefault');

    cy.wait('@setDefault');

    cy.get(`.ant-message-custom-content > :nth-child(2)`)
      .should('be.visible')
      .should('contain', 'Country Updated Successfully');
  });

  it('can toggle Eeu', () => {
    cy.get(
      '[data-row-key="1"] > :nth-child(12) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input',
    ).click();

    cy.intercept('PUT', '/api/countries/1/eeu-status').as('setEeu');

    cy.wait('@setEeu');

    cy.get(`.ant-message-custom-content > :nth-child(2)`)
      .should('be.visible')
      .should('contain', 'Country Updated Successfully');
  });

  it('can search for a country', () => {
    const searchBtn = cy.get('.contents > .ant-space > .ant-space-item > .ant-btn');
    searchBtn.click();
    const textInput = cy.get('.search-overlay > .ant-input-affix-wrapper > .ant-input');
    textInput.should('be.focused');

    const randomCountry = chance.country({ full: true });
    textInput.type(`${randomCountry}{enter}`);

    cy.url().should('contain', randomCountry.split(' ').join('%20'));

    cy.get('.ant-table-row > :nth-child(3)').should('be.visible');
  });
});
