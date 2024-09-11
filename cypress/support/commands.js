// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
// cypress/support/commands.js

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://demo.x-cart.com/demo/home.php');
    cy.contains('Sign in').click();
    cy.get('input[name="username"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
    cy.get('span.button-left').contains('Submit').click();
    cy.contains('My account').should('exist');
});
  
Cypress.Commands.add('addProductToCart', (searchTerm) => {
    cy.visit('https://demo.x-cart.com/demo/home.php');
    cy.get('input[name="posted_data[substring]"]').first().type(`${searchTerm}{enter}`);
    cy.get('.first .product-title').first().click();
    cy.get('.add-to-cart-button').click();
});
  
Cypress.Commands.add('fillShippingAddress', (address, city, country, state, zipcode, phone) => {
    cy.get('input[name="address_book[B][address]"]').clear().type(address);
    cy.get('input[name="address_book[B][city]"]').clear().type(city);
    cy.get('select[name="address_book[B][country]"]').select(country);
    cy.get('input[name="address_book[B][state]"]').clear().type(state);
    cy.get('input[name="address_book[B][zipcode]"]').clear().type(zipcode);
    cy.get('input[name="address_book[B][phone]"]').clear().type(phone);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://demo.x-cart.com/demo/home.php');
    cy.contains('Sign in').click();
    cy.get('input[name="username"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
    cy.get('span.button-left').contains('Submit').click();
    cy.contains('My account').should('exist');
}); 
