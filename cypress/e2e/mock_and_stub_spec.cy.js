
describe('X-Cart Stubbed Checkout Process', () => {
    it('should stub the checkout payment process', () => {
        cy.login('pallavi@gmail.com', 'Pal@80');
      cy.addProductToCart('toys');
        cy.addProductToCart('games');
        cy.contains('View cart').click();
        cy.contains('Checkout').click();

        cy.intercept('POST', '**/payment', { statusCode: 200, body: { success: true, message: 'Payment processed successfully' } }).as('paymentProcess');

        cy.get('body').then(($body) => {
            if ($body.find('a#pencil_edit_opc_profile').length > 0) {
                cy.get('a#pencil_edit_opc_profile').click();
            }
        });

        cy.get('input[name="address_book[B][address]"]').then(($input) => {
            if ($input.val().trim() === '') {
                cy.fillShippingAddress('Pune Phase1', 'Pune', 'India', 'Maharashtra', '411057', '9049207298');
            }
        });

        cy.get('span.button-left').contains('Save').click({ force: true });
        cy.get('input[name="accept_terms"]').check({ force: true });
        cy.get('span.button-left').contains('Submit order').click();

        
        cy.contains('Congratulations! Your order has been successfully placed.').should('exist');
    });
});

 

