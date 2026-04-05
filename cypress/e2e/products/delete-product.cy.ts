/// <reference types="cypress" />

describe('Delete Product', () => {
    let productId=-1; // Replace with actual product ID or fetch it dynamically

    before(() => {
        // Create a product to delete before running the delete test
        cy.request('POST', 'https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products', {
            name: 'Sample Product to Delete',
            price: 100,
            description: 'This is a sample product for testing.',
            stock: 100
        }).then((response) => {
            expect(response.status).to.eq(201);
            console.log('Created Product:', response.body);
            productId = response.body.id; // Store the created product ID
        });
    });

    it('should delete a product via the UI', () => {
        // Visit the products page
        cy.visit('/');
        cy.get('table').contains('td', 'Sample Product to Delete').parent('tr').within(() => {
            cy.get('button').contains('Delete').click();
        });

        // Verify that the product is no longer listed
        cy.get('table').contains('td', 'Sample Product to Delete').should('not.exist');
    });

    it('should verify the product is deleted via the API', () => {
        // Check the API to ensure the product has been deleted
        cy.request({
            url: `https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products/${productId}`,
            method: 'GET',
            failOnStatusCode: false // Prevent Cypress from failing the test on 404
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});