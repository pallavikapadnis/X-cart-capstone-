describe('X-Cart Demo User Registration', () => {
    it('should register a new user successfully', () => {
        cy.fixture('user_data').then((data) => {
            const user = data.validUser;
            cy.visit('https://demo.x-cart.com/demo/home.php');
            cy.contains('Register').click();
            cy.get('input[name="firstname"]').type(user.firstName);
            cy.get('input[name="lastname"]').type(user.lastName);
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="passwd1"]').type(user.password);
            cy.get('input[name="passwd2"]').type(user.password);
            cy.get('input[name="accept_terms_register"]').check({ force: true });
            cy.get('span.button-left').contains('Submit').click();
        });
    });
});


