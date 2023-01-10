/// <reference types="cypress" />

import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();

describe('Admin Coupon Test', () => {
  beforeEach(() => {
    cy.login('john@doe.com', '12345678');
    cy.visit('http://localhost:3000/admin/products/coupons');

    cy.intercept('https://ssstg.solutions-apps.com/api/users/profile', { fixture: 'profile' }).as(
      'getProfile',
    );
    cy.intercept('https://ssstg.solutions-apps.com/api/coupons?page=1&per_page=10').as('getAllCoupons');

    cy.wait('@getProfile').its('response.statusCode').should('eq', 200);

    cy.wait('@getAllCoupons').its('response.statusCode').should('eq', 200);
  });

  const couponName = chance.word({ syllables: 2 });

  it('load all coupons', () => {
    cy.get('.ant-table-row > .id').should('be.visible');
  });

  it('can create a new Coupon', () => {
    cy.get('[data-cy=new]').click();

    cy.intercept('https://ssstg.solutions-apps.com/api/languages?per_page=183&isActive=true', {
      fixture: 'language',
    }).as('getLanguage');

    cy.wait('@getLanguage');
    // Makes sure it navigated to a right page
    cy.url().should('contain', 'upsert');

    cy.get('.group-style__value-container').click();

    cy.get('#react-select-2-option-0').click();
    cy.get('#coupon-form_translate_0_name').type(couponName);
    cy.get('#coupon-form_translate_0_description').type(chance.sentence());

    // Today
    cy.pickRandomDate({ selector: '#coupon-form_release_date', date: moment().format('DD-MM-YYYY') });

    cy.pickRandomDate({
      selector: '#coupon-form_available_until',
      date: moment(chance.date({ year: 2023, string: true })).format('DD-MM-YYYY'),
    });

    cy.antdSelect({ selector: '#coupon-form_type', value: 'Percent' });

    cy.get('#coupon-form_amount').type(Math.floor(Math.random() * 100));

    cy.get('#coupon-form_min_amount').type(Math.floor(Math.random() * 100));

    cy.get('[data-cy=form-submit-btn]').click();

    cy.intercept({ url: 'https://ssstg.solutions-apps.com/api/coupons', method: 'POST' }).as('createCoupon');

    cy.wait('@createCoupon').its('response.statusCode').should('eq', 201);
    cy.get('.ant-message-notice-content').should('be.visible');
  });

  it('can search for a coupon', () => {
    cy.get('[data-cy=search]').click();
    const searchInput = cy.get('[data-cy=search-input]');
    searchInput.should('be.focused');

    searchInput.type(`${couponName}{enter}`);
    cy.url({ decode: true }).should('contain', `&search=${couponName}`);

    cy.intercept(`https://ssstg.solutions-apps.com/api/coupons?page=1&per_page=10&search=${couponName}`).as(
      'loadOneCoupon',
    );

    cy.wait('@loadOneCoupon').its('response.statusCode').should('eq', 200);
    cy.get('.ant-table-row > :nth-child(3)').should('contain.text', couponName);
    cy.get('.ant-table-row > .id').should('be.visible');
  });

  it('can update a coupon', () => {
    cy.get('[data-cy=search]').click();
    const searchInput = cy.get('[data-cy=search-input]');
    searchInput.type(`${couponName}{enter}`);

    cy.intercept(`https://ssstg.solutions-apps.com/api/coupons*`).as('loadOneCoupon');

    cy.wait('@loadOneCoupon');
    cy.get(`.ant-table-row > .id`).first().find('a').click();

    cy.url().should('contain', 'upsert');

    cy.intercept('https://ssstg.solutions-apps.com/api/coupons/*').as('getOneCoupon');

    cy.wait('@getOneCoupon').its('response.statusCode').should('eq', 200);

    cy.get('#coupon-form_translate_0_name')
      .clear()
      .type(chance.word({ syllables: 3 }));

    cy.get('[data-cy=form-submit-btn]').click();

    cy.should({ url: 'https://ssstg.solutions-apps.com/api/coupons/*', method: 'PUT' }).as('updateOneCoupon');

    cy.wait('@updateOneCoupon').its('response.statusCode').should('eq', 200);
    cy.url().should('not.contain', 'upsert');

    cy.get('.ant-message-notice-content').should('be.visible');
  });
});
