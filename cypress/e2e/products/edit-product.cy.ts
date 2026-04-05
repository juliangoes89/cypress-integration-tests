describe('Edit Product Integration Tests', () => {
    const productId = '1'; // Replace with the actual product ID to edit
    const updatedProduct = {
        name: 'Updated Product Name',
        price: 20.99,
        description: 'Updated product description',
        stock: 100
    };

    beforeEach(() => {
        // Intercept the API call to get the product details
        cy.intercept('GET', `https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products/${productId}`, {
            statusCode: 200,
            body: {
                id: productId,
                name: 'Original Product Name',
                price: 19.99,
                description: 'Original product description',
                stock: 100
            },
        }).as('getProduct');

        // Intercept the API call to update the product
        cy.intercept('PUT', `https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products/${productId}`, {
            statusCode: 200,
            body: updatedProduct,
        }).as('updateProduct');

        // Visit the edit product page
        cy.visit(`/edit/${productId}`);
    });

    it('should display the current product details', () => {
        cy.wait('@getProduct');
        cy.get('input[id="name"]').should('have.value', 'Original Product Name');
        cy.get('input[id="price"]').should('have.value', '19.99');
        cy.get('textarea[id="description"]').should('have.value', 'Original product description');
        cy.get('input[id="stock"]').should('have.value', '100');
    });

    it('should update the product details', () => {
        cy.get('input[id="name"]').clear().type(updatedProduct.name);
        cy.get('input[id="price"]').clear().type(updatedProduct.price);
        cy.get('textarea[id="description"]').clear().type(updatedProduct.description);
        cy.get('input[id="stock"]').clear().type(updatedProduct.stock);
        cy.get('button[type="submit"]').click();

        cy.wait('@updateProduct').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/');
        cy.contains('Product updated successfully!').should('be.visible');
    });
});