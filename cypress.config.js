const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  chromeWebSecurity: false,
  scrollBehavior: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/results/screenshots",
  videosFolder: "cypress/results/videos",
  e2e: {
    baseUrl: "https://app10.ploomes.com/login",
    env: {
      apiUrl: "https://api2.ploomes.com",
      apiKey:
        "6C2D54734E4F6553A2D6207DBD9CAFC5AD53470D1A617E499C635C5B5239FE8F562C18545C08DA650DD938EBA7969096C6CEDA33D57F1F848B36C6EC3C03D26C",
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalRunAllSpecs: true,
    specPattern: "cypress/integration/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
