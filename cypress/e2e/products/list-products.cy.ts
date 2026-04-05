describe('Product List Integration Tests', () => {
    const apiUrl = 'https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net/api/products'; // Adjust the API URL as needed

    beforeEach(() => {
        // Seed the database with sample products before each test
        cy.fixture('products.json').then((items) => {
            console.log('Seeding products:', items);
            items["products"].forEach((product: any) => {
                cy.request('POST', apiUrl, product);
            });
        });
    });

    it('should display the list of products', () => {
        // Visit the products page
        cy.visit('/');

        // Check if the product list is displayed
        cy.get('.product-table').should('be.visible');

        // Verify that the products are listed
        cy.get('tbody tr').should('have.length.greaterThan', 0);
    });

    it('should fetch products from the API and display them', () => {
        // Visit the products page
        cy.visit('/');
        // Verify that the API returns the correct data
        cy.request(apiUrl).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;

            // Check if the UI displays the same products
            response.body.forEach((product) => {
                cy.contains(product.name).should('be.visible');
            });
        });
    });

    afterEach(() => {
        // Clean up the database after each test
        cy.request('GET', apiUrl).then((response) => {
            response.body.forEach((product) => {
                cy.request('DELETE', `${apiUrl}/${product.id}`);
            });
        });
    });
});