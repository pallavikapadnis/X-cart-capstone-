describe('X-Cart Demo Homepage', () => {
    it('should load the homepage successfully', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');
      cy.contains('Featured products'); // Check for a specific element on the homepage
    });
  });