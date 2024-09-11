
describe('X-Cart Demo User Logout', () => {
    before(() => {
        cy.fixture('user_data').then((data) => {
            const user = data.validUser;
            cy.login(user.email, user.password); // Login before running the logout test
        });
    });

    it('should logout successfully', () => {
        cy.visit('https://demo.x-cart.com/demo/home.php');
        cy.contains('Sign out').click();
        cy.url().should('include', 'home');
        cy.contains('Sign in').should('exist');
    });
});