// cypress/e2e/visual_tests.cy.js
describe('Visual Tests for X-Cart Demo', () => {
    it('should match the homepage layout', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');
      cy.get('body').matchImageSnapshot('homepage');
    });
  
    it('should match the checkout page layout', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');
      cy.addProductToCart('toys');
      cy.addProductToCart('games');
      cy.contains('View cart').click();
      cy.contains('Checkout').click();
      cy.get('body').matchImageSnapshot('checkout-page');
    });
  });
  