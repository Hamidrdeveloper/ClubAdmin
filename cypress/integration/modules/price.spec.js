/// <reference types="cypress" />

import Chance from "chance";

describe('Price Module Test', () => {
    beforeEach(() => {
        cy.login("john@doe.com", "12345678");
        cy.visit("http://localhost:3000");
    })

    it('Open the Price Module', () => {
        cy.get('#root > section > aside > div > div.sidebar-header > div.menu > div', { timeout: 30000 }).click();

        cy.get('#root > section > aside > div > div.searchBoxHolder > span > input').type("Price")

        cy.get('#root > section > aside > div > div.ant-collapse.ant-collapse-icon-position-left.menus > div > div.ant-collapse-content.ant-collapse-content-active > div').first().find('ul > li').first().find('a').click();

        cy.intercept('https://ssstg.solutions-apps.com/api/price*').as('call_1');
        cy.wait("@call_1")

        cy.get('#root > section div > div  div > a:nth-child(2) > span > span').contains('Prices');
        cy.get('.title > .ant-typography').contains('Prices');
    })

    it('Add New Price', () => {
        cy.visit("http://localhost:3000/admin/prices");

        cy.get('#root > section  div > div  div.contents > div > div:nth-child(1) > a', { timeout: 30000 }).first().click();

        cy.url().should('contain', '/upsert')

    cy.get('#price-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div > span > div > div > div.react-select.group-style__value-container.css-1inrzts-ValueContainer').first().click();
    cy.get('#react-select-5-option-' + 0).click();

    cy.get('#price-form_translate_0_name').type(Chance().name());

    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .css-2b097c-container > .react-select__control > .react-select__value-container').click();
    cy.get('#react-select-2-option-' + 0, { timeout: 30000 }).click();

    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .css-2b097c-container > .react-select__control > .react-select__value-container').click();
    cy.get('#react-select-3-option-' + 0, { timeout: 30000 }).click();

    cy.get('#price-form_interval').click();
    cy.get('.ant-select-item-option-active').first().click();

    cy.get('#price-form_min_quantity').type(Chance().integer({ min: 1, max: 10 }));

    cy.get('#price-form_unit_price').type(Chance().integer({ min: 1, max: 10 }));

    cy.get(':nth-child(6) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .css-2b097c-container > .react-select__control > .react-select__value-container').click();
    cy.get('#react-select-4-option-' + 0, { timeout: 30000 }).click();

    cy.get('.ant-form-item-control-input-content > .ant-btn', { timeout: 30000 }).first().click();

    cy.intercept("https://ssstg.solutions-apps.com/api/price").as("add");
    cy.wait('@add');

        cy.url().should('contain', 'http://localhost:3000/admin/prices');
        cy.get(".ant-message-custom-content > :nth-child(2)", { timeout: 30000 }).contains('Successfully')
    })

    it('Update Price Type', () => {
        cy.visit("http://localhost:3000/admin/prices");

        cy.intercept("https://ssstg.solutions-apps.com/api/price*").as("prices");

        cy.wait("@prices", { timeout: 30000 }).should(({ response }) => {
            const data = response.body["data"].map(({ id }) => id);
            const choice = Chance().integer({ min: 0, max: data.length - 1 })

            cy.get('[data-row-key="' + data[choice] + '"] > .id > a').click();

            cy.intercept("https://ssstg.solutions-apps.com/api/price/" + data[choice]).as("ourData");
            cy.wait("@ourData");

            cy.get('#price-form_translate_0_name').clear().type(Chance().name());

            cy.get('.ant-select-selection-item').first().click();
            cy.get('.ant-select-item-option-active').first().click();

            cy.get('#price-form_min_quantity').type(Chance().integer({ min: 1, max: 10 }));

            cy.get('#price-form_unit_price').type(Chance().integer({ min: 1, max: 10 }));

            cy.get('.ant-form-item-control-input-content > .ant-btn', { timeout: 30000 }).first().click();

            cy.wait('@ourData', { timeout: 30000 });

            cy.url().should('contain', 'http://localhost:3000/admin/prices');
            cy.get(".ant-message-custom-content > :nth-child(2)", { timeout: 30000 }).contains('Successfully')

        });
    })

    it('Search Price Type', () => {
        cy.visit("http://localhost:3000/admin/prices");

        cy.intercept("https://ssstg.solutions-apps.com/api/price*").as("prices");

        cy.wait("@prices", { timeout: 30000 }).should(({ response }) => {
            const name = response.body["data"].map(({ name }) => name)[Chance().integer({ min: 0, max: response.body["data"].length - 1 })];

            cy.get('.ant-btn > .ant-typography').contains('Search').click();

            cy.get('.search-overlay > .ant-input-affix-wrapper > .ant-input').type(name);
            cy.get('.ant-input-suffix > .ant-space > :nth-child(2)').click();

            cy.wait('@prices').should(({ response }) => {
                const { id, name } = response.body["data"][0];

                cy.get('.id > a').first().contains(id);
                cy.get('.ant-table-row > :nth-child(3)').first().contains(name);
            })
        });
    })
})