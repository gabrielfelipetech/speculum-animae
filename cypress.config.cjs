const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(_on, config) {
      const provider = String(
        config.env.BILLING_PROVIDER || process.env.BILLING_PROVIDER || 'mock',
      );
      config.env.BILLING_PROVIDER = provider;
      process.env.BILLING_PROVIDER = provider;
      return config;
    },
  },
});
