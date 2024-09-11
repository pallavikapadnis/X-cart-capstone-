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
      cy.visit('https://demo.x-cart.com/demo/home.php');

      // Search for a product (e.g., "toys")
      cy.get('input[name="posted_data[substring]"]').first().type('toys{enter}');

      // Click on the first product's title
      cy.get('.first .product-title').first().click();

      // Verify the product details page loads
      cy.url().should('include', 'Acrobots');

      // Add the product to the cart
      cy.get('.add-to-cart-button').click();

      // Check that the product has been added to the cart (you might check the cart icon)
      cy.contains('View cart').click();
      cy.url().should('include', 'cart.php');
      cy.contains('Acrobots').should('exist');  // Ensure product is in the cart

       // Clear the cart by targeting the "Clear cart" button
       cy.get('.simple-button.simple-delete-button').first().click();  // Use .first() to target only the first element

       // Confirm that the cart is now empty
       cy.contains('Your shopping cart is empty').should('exist');
  });
});

describe('X-Cart Demo User Registration', () => {
  it('should register a new user successfully', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');

      // Navigate to the registration page
      cy.contains('Register').click();  // Assuming "Register" is the link to the registration page

      // Fill out the registration form
      cy.get('input[name="firstname"]').type('Pallavi');  // Replace with the actual selector for the first name
      cy.get('input[name="lastname"]').type('Kapadnis');    // Replace with the actual selector for the last name
      cy.get('input[name="email"]').type('pallavi001@gmail.com');  // Replace with the actual selector for the email
      cy.get('input[name="passwd1"]').type('Pal@80');  // Updated selector for the password
      cy.get('input[name="passwd2"]').type('Pal@80');  // Updated selector for the confirm password

      // Click the "I accept" checkbox, forcing it even if it's not visible
      cy.get('input[name="accept_terms_register"]').check({ force: true });

      // Submit the form by clicking the span with class 'button-left'
      cy.get('span.button-left').contains('Submit').click();
  });
});
describe('X-Cart Demo User Login', () => {
  it('should login with valid credentials', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');

      // Navigate to the login page
      cy.contains('Sign in').click();  // Assuming "Sign in" is the link to the login page

      // Fill out the login form
      cy.get('input[name="username"]').clear().type('pallavi001@gmail.com');  // Use the correct selector and clear existing value
      cy.get('input[name="password"]').clear().type('Pal@80');  // Use the correct selector and clear existing value

      // Submit the form
      cy.get('span.button-left').contains('Submit').click();  // Adjust selector if needed

      // Verify that "My account" link is present
      cy.contains('My account').should('exist');  
  });
}); 
describe('X-Cart Demo User Logout', () => {
  it('should logout successfully', () => {
      cy.visit('https://demo.x-cart.com/demo/home.php');

      // Log in first (assuming login is required to perform logout)
      cy.contains('Sign in').click();
      cy.get('input[name="username"]').clear().type('pallavi001@gmail.com');
      cy.get('input[name="password"]').clear().type('Pal@80');
      cy.get('span.button-left').contains('Submit').click();
      
      // Verify login
      cy.contains('My account').should('exist');  

      // Click on "Sign out" to logout
      cy.contains('Sign out').click();  // Replace with the actual selector if needed

      // Verify successful logout
      cy.url().should('include', 'home');  // Check that the URL indicates a successful logout
      cy.contains('Sign in').should('exist');  // Ensure "Sign in" is visible, indicating that the user is logged out
  });
});
describe('X-Cart Demo Checkout Process', () => {
    it('should complete the checkout process with valid payment information', () => {
        cy.visit('https://demo.x-cart.com/demo/home.php');

        // Sign in
        cy.contains('Sign in').click();
        cy.get('input[name="username"]').clear().type('pallavi001@gmail.com');
        cy.get('input[name="password"]').clear().type('Pal@80');
        cy.get('span.button-left').contains('Submit').click();
        
        // Verify login
        cy.contains('My account').should('exist');

        // Add two products to the cart
        cy.get('input[name="posted_data[substring]"]').first().type('toys{enter}');
        cy.get('.first .product-title').first().click();
        cy.wait(2000);
        cy.get('.add-to-cart-button').click();
        cy.contains('Continue shopping').click();
        cy.get('input[name="posted_data[substring]"]').first().type('games{enter}');
        cy.get('.first .product-title').first().click();
        cy.wait(2000);
        cy.get('.add-to-cart-button').click();

        // View cart
        cy.contains('View cart').click();

        // Proceed to checkout
        cy.contains('Checkout').click();

        // Check if the pencil icon exists (to open the address form for editing)
        cy.get('body').then(($body) => {
            if ($body.find('a#pencil_edit_opc_profile').length > 0) {
                // If pencil icon exists, click it to edit the address form
                cy.get('a#pencil_edit_opc_profile').click();
            }
        });

        // Check if the address field is filled or empty
        cy.get('input[name="address_book[B][address]"]').then(($input) => {
            if ($input.val().trim() === '') {
                // If the address field is empty, fill in the shipping address form
                cy.get('input[name="address_book[B][address]"]').clear().type('Pune Phase1');
                cy.get('input[name="address_book[B][city]"]').clear().type('Pune');
                cy.get('select[name="address_book[B][country]"]').select('India');
                cy.get('input[name="address_book[B][state]"]').clear().type('Maharashtra');
                cy.get('input[name="address_book[B][zipcode]"]').clear().type('411057');
                cy.get('input[name="address_book[B][phone]"]').clear().type('9049207298');
            }
        });

        // Save the shipping information
        cy.get('span.button-left').contains('Save').click({ force: true });

        // Accept terms and conditions
        cy.get('input[name="accept_terms"]').check({ force: true });

        // Submit the order (use { force: true } to handle the overlay blocking)
        cy.get('span.button-left').contains('Submit order').click();

        // Verify order confirmation
        cy.contains('Congratulations! Your order has been successfully placed.').should('exist');
    });
});
