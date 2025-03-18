// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import Evinced from '@evinced/cypress-sdk';


// Initialize the Evinced Cypress SDK
Evinced.init({
    enableScreenshots: true
});

// Configure Online Credentials
Evinced.setCredentials({
    serviceId: Cypress.env('serviceId'),
    secret: Cypress.env('secret'),
  });

// Configure upload to platform
Evinced.setUploadToPlatformConfig({
    enableUploadToPlatform: true,
    setUploadToPlatformDefault: true,
});

// Global `before` Hook: Runs once before all tests
before(() => {
    cy.log('Running global before');
});

// Global `after` Hook: Runs once after all tests
after(() => {
    cy.log('Running global after');
});

// Global 'beforeEach' Hook: Runs before each test
beforeEach(() => {
    cy.log('Running global beforeEach');
    cy.evStart(); // Start the Evinced analysis session
    cy.addLabel({
        testName: Cypress.currentTest.title,
    })
});

// Global `afterEach` Hook: Runs after each test
// afterEach(() => {
//     cy.log('Running global afterEach');
//     cy.evStop(); // Stop the Evinced analysis session
// });