const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      //const envPath = `.env`;
      dotenv.config({/*path: envPath*/ });
      config.env = {
        ...process.env,
        ...config.env,
      };
      config.baseUrl = process.env.CYPRESS_baseUrl || process.env.BASE_URL;
      return config;

    },
    //baseUrl:'http://frontend:3000',
    experimentalModifyObstructiveThirdPartyCode: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout:20000
  
  },
});
