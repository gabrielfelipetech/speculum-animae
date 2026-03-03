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
    setupNodeEvents(on, config) {
      on('task', {
        async parsePdfText({ base64 }) {
          if (typeof base64 !== 'string' || base64.length === 0) {
            return { text: '', numpages: 0 };
          }

          const { PDFParse } = await import('pdf-parse');
          const buffer = Buffer.from(base64, 'base64');
          const parser = new PDFParse({ data: buffer });
          const result = await parser.getText();
          await parser.destroy();
          return {
            text: typeof result.text === 'string' ? result.text : '',
            numpages: typeof result.total === 'number' ? result.total : 0,
          };
        },
      });

      const provider = String(
        config.env.BILLING_PROVIDER || process.env.BILLING_PROVIDER || 'mock',
      );
      config.env.BILLING_PROVIDER = provider;
      process.env.BILLING_PROVIDER = provider;
      return config;
    },
  },
});
