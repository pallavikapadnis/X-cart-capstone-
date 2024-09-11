describe('X-Cart Demo Product Details', () => {
    it('should navigate to the product details page', () => {
        cy.visit('https://demo.x-cart.com/demo/home.php');
  
        // Search for a product (e.g., "toys")
        cy.get('input[name="posted_data[substring]"]').first().type('toys{enter}');
  
        // Click on the first product's title by specifically targeting the first one
        cy.get('.first .product-title').first().click();  // Using .first() to ensure only one element is clicked
  
        // Verify that the product details page loads
        cy.url().should('include', 'Acrobots');  // Verify the URL contains the product name
        cy.contains('Add to cart').should('exist');  // Check for the "Add to cart" button on the product details page
    });
  });