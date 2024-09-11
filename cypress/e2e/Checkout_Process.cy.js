describe('X-Cart Demo Checkout Process', () => {
    before(() => {
        // Load fixture data
        cy.fixture('user_data').then((data) => {
            const user = data.validUser;
            cy.login(user.email, user.password);
        });
    });

    it('should complete the checkout process with valid information', () => {
        // Load fixture data
        cy.fixture('user_data').then((data) => {
            const address = data.address;
            
            cy.addProductToCart('toys');
            cy.addProductToCart('games');
            cy.contains('View cart').click();
            cy.contains('Checkout').click();

            // Check if the profile edit link is available and click it if present
            cy.get('body').then(($body) => {
                if ($body.find('a#pencil_edit_opc_profile').length > 0) {
                    cy.get('a#pencil_edit_opc_profile').click();
                }
            });

            // Fill in shipping address from fixture
            cy.get('input[name="address_book[B][address]"]').then(($input) => {
                if ($input.val().trim() === '') {
                    cy.fillShippingAddress(
                        address.address, 
                        address.city, 
                        address.country, 
                        address.state, 
                        address.zipcode, 
                        address.phone
                    );
                }
            });

            // Save and submit order
            cy.get('span.button-left').contains('Save').click({ force: true });
            cy.get('input[name="accept_terms"]').check({ force: true });
            cy.get('span.button-left').contains('Submit order').click();

            // Verify successful order placement
            cy.contains('Congratulations! Your order has been successfully placed.').should('exist');
        });
    });
});
