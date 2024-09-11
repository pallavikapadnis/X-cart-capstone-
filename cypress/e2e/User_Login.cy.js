describe('X-Cart Demo User Login', () => {
    it('should login with valid credentials', () => {
        cy.fixture('user_data').then((data) => {
            const user = data.validUser;
            cy.login(user.email, user.password);
        });
    });
});

