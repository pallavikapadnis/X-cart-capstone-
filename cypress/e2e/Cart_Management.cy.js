describe('X-Cart Demo Add to Cart', () => {
    it('should add a product to the cart', () => {
      cy.addProductToCart('toys');
      cy.contains('View cart').click();
      cy.url().should('include', 'cart.php');
      cy.contains('Acrobots').should('exist');
  
      cy.get('.simple-button.simple-delete-button').first().click();
      cy.contains('Your shopping cart is empty').should('exist');
    });
  });
  