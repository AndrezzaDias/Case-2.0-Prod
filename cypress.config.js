const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://admin.autodromo.com.br',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    testIsolation: true,

    setupNodeEvents(on, config) {
      console.log(`Running tests with baseUrl: ${config.baseUrl}`);
      return config;
    }
  },

  // Local  → cypress.env.json sobrescreve estes valores automaticamente
  // Remoto → GitHub Actions injeta as secrets como CYPRESS_* env vars
  env: {
    hideXhr: true,
    producaoUrl:        process.env.CYPRESS_PRODUCAO_URL,
    'email-producao':   process.env.CYPRESS_EMAIL_PRODUCAO,
    'senha-producao':   process.env.CYPRESS_SENHA_PRODUCAO,
  },

  viewportWidth: 1920,
  viewportHeight: 1080,
  failOnStatusCode: false,
  chromeWebSecurity: false,
  experimentalStudio: true,
  defaultCommandTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
