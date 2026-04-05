/// <reference types="cypress" />

describe('Create Product', () => {
    const product = {
        name: 'Test Product',
        price: 100,
        description: 'This is a test product',
        stock: 100
    };

    it('should create a product through the UI and verify API response', () => {
        // Visit the create product page
        cy.visit('/create');

        // Fill in the product form
        cy.get('input[id="name"]').type(product.name);
        cy.get('input[id="price"]').type(product.price.toString());
        cy.get('textarea[id="description"]').type(product.description);
        // Submit the form
        cy.get('button[type="submit"]').click();

        // Verify the success message
        cy.contains('Product created successfully!').should('be.visible');

        // Verify the product in the API
        cy.request('GET', 'https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products').then((response: Cypress.Response<any>) => {
            expect(response.status).to.eq(200);
            console.log('API Response:', response);
            const createdProduct = response.body.find((p: any) => p.name === product.name);
            expect(createdProduct).to.exist;
            expect(createdProduct.price).to.eq(product.price);
            expect(createdProduct.description).to.eq(product.description);
            expect(createdProduct.stock).to.eq(product.stock);
        });
    });
});