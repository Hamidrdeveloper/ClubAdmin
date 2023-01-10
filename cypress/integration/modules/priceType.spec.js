/// <reference types="cypress" />

import Chance from "chance";

describe('Price Type Module Test', () => {
    beforeEach(() => {
        cy.login("john@doe.com", "12345678");
        cy.visit("http://localhost:3000");
    })

    it('Open the Price Type Module', () => {
        cy.get('#root > section > aside > div > div.sidebar-header > div.menu > div', { timeout: 30000 }).click();

        cy.get('#root > section > aside > div > div.searchBoxHolder > span > input').type("Price Type")

        cy.get('#root > section > aside > div > div.ant-collapse.ant-collapse-icon-position-left.menus > div > div.ant-collapse-content.ant-collapse-content-active > div').first().find('ul > li').first().find('a').click();

        cy.intercept('https://ssstg.solutions-apps.com/api/price-types?page=1&per_page=10').as('call_1');
        cy.wait("@call_1")

        cy.get('#root > section div > div  div > a:nth-child(2) > span > span').contains('Price Types');
        cy.get('.title > .ant-typography').contains('Price Types');
    })

    it('Add New Price Type', () => {
        cy.visit("http://localhost:3000/admin/prices/types");

        cy.get('#root > section  div > div  div.contents > div > div:nth-child(1) > a', { timeout: 30000 }).first().click();

        cy.url().should('contain', '/upsert')

        cy.intercept('https://ssstg.solutions-apps.com/api/languages*').as('language');
        cy.wait('@language');

        cy.get('@language')
            .should(({ response }) => {
                const ids = response.body["data"].map((lang) => ({ id: lang["id"] }));
                const priceCount = ids.length;
                for (let i = 0; i < priceCount; i++) {
                    if (i === 1)
                        cy.get('#price-type-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div > div > div > div > button').click();
                    else if (i > 1)
                        cy.get('#price-type-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div:nth-child(1) > div > div > div:nth-child(1) > button').click();

                    cy.get('#price-type-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div > span > div > div > div.react-select.group-style__value-container.css-1inrzts-ValueContainer').first().click();
                    cy.get('#price-type-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div > span > div > div.react-select.group-style__menu.css-26l3qy-menu > div').find('#react-select-' + (2 + i) + '-option-' + i).click();

                    cy.get('#price-type-form_translate_0_name').type(Chance().name());
                }

                cy.get('#price-type-form > div:nth-child(2) > div > div > div > div > div > div > div > div > div > button', { timeout: 30000 }).click();

                cy.intercept("https://ssstg.solutions-apps.com/api/price-types").as("add");
                cy.wait('@add');

                cy.url().should('contain', 'http://localhost:3000/admin/prices/types');
                cy.get(".ant-message-custom-content > :nth-child(2)", { timeout: 30000 }).contains('Successfully')
            })
    })

    it('Update Price Type', () => {
        cy.visit("http://localhost:3000/admin/prices/types");

        cy.intercept("https://ssstg.solutions-apps.com/api/price-types*").as("prices");

        cy.wait("@prices", { timeout: 30000 }).should(({ response }) => {
            const data = response.body["data"].map(({ id }) => id);
            const choice = Chance().integer({ min: 0, max: data.length })

            cy.get('[data-row-key="' + data[choice] + '"] > .id > a').click();

            cy.intercept("https://ssstg.solutions-apps.com/api/price-types/" + data[choice]).as("ourData");
            cy.wait("@ourData").should(({ response }) => {
                const price = response.body["data"]["translate"];

                cy.get("#price-type-form > div:nth-child(1) > div.ant-col.ant-form-item-control > div > div > div", { timeout: 30000 }).should('have.length', price.length);

                for (let i = 0; i < price.length; i++) {
                    cy.get("#price-type-form_translate_" + i + "_name").should('contain.value', price[price.length - (i + 1)]["name"])
                    cy.get("#price-type-form_translate_" + i + "_name").clear();
                    cy.get("#price-type-form_translate_" + i + "_name").type(Chance().name())
                }

                cy.get(".ant-form-item-control-input-content > .ant-btn").click();

                cy.wait('@ourData');

                cy.url().should('contain', 'http://localhost:3000/admin/prices/types');
                cy.get(".ant-message-custom-content > :nth-child(2)", { timeout: 30000 }).contains('Successfully')

            });
        });
    })

    it('Search Price Type', () => {
        cy.visit("http://localhost:3000/admin/prices/types");

        cy.intercept("https://ssstg.solutions-apps.com/api/price-types*").as("prices");

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