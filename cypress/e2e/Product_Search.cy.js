describe('X-Cart Demo Product Search', () => {
    it('should search for "toys" successfully', () => {
        cy.visit('https://demo.x-cart.com/demo/home.php');

        // Target the specific search input field
        cy.get('input[name="posted_data[substring]"]').first().type('toys{enter}');
        
        // Verify that search results contain relevant products
        cy.contains('Toys').should('exist');
    });
});