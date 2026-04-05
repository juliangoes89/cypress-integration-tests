# Cypress Integration Tests

This project contains integration tests for the product CRUD application, testing the interaction between the UI and the API.

## Project Structure

- **cypress/e2e/products/**: Contains the integration test files for product operations.
  - `create-product.cy.ts`: Tests for creating a product.
  - `delete-product.cy.ts`: Tests for deleting a product.
  - `edit-product.cy.ts`: Tests for editing a product.
  - `list-products.cy.ts`: Tests for listing products.

- **cypress/fixtures/**: Contains mock data used in the tests.
  - `products.json`: Sample product data for testing.

- **cypress/support/**: Contains support files for custom commands and global configurations.
  - `commands.ts`: Custom commands for Cypress tests.
  - `e2e.ts`: Global configurations for end-to-end tests.

- **cypress.config.ts**: Configuration file for Cypress.

- **package.json**: npm configuration file listing dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file for the project.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd cypress-integration-tests
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the tests**:
   ```
   npx cypress open
   ```
   This will open the Cypress Test Runner where you can select and run the integration tests.

## Writing Tests

- Each test file in the `cypress/e2e/products/` directory corresponds to a specific product operation.
- Use the provided sample data in `cypress/fixtures/products.json` to create and list products during tests.

## Contributing

Feel free to submit issues or pull requests for improvements or additional tests.