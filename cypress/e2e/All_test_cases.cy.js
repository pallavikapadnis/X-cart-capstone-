describe('X-Cart Demo Homepage', () => {
    it('should load the homepage successfully', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');
      cy.contains('Featured products'); // Check for a specific element on the homepage
    });
  });

describe('X-Cart Demo Product Search', () => {
    it('should search for "toys" successfully', () => {
        cy.visit('https://demo.x-cart.com/demo/home.php');

        // Target the specific search input field
        cy.get('input[name="posted_data[substring]"]').first().type('toys{enter}');
        
        // Verify that search results contain relevant products
        cy.contains('Toys').should('exist');
    });
});

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


describe('X-Cart Demo User Login', () => {
    it('should login with valid credentials', () => {
        cy.fixture('user_data').then((data) => {
            const user = data.validUser;
            cy.login(user.email, user.password);
        });
    });
});


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
