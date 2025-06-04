import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    env: {
      STANDARD_USER: process.env.CYPRESS_STANDARD_USER,
      PROBLEM_USER: process.env.CYPRESS_PROBLEM_USER,
      LOCKED_USER: process.env.CYPRESS_LOCKED_USER,
      ERROR_USER: process.env.CYPRESS_ERROR_USER,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },
    retries: {
      runMode: 0,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    reporter: process.env.CI ? 'mochawesome' : 'spec',
    reporterOptions: process.env.CI
      ? {
          reportDir: 'cypress/reports',
          overwrite: false,
          html: true,
          json: true,
          reportFilename: 'report',
          quiet: true,
          charts: true,
          timestamp: 'mmddyyyy_HHMMss',
        }
      : undefined,
    setupNodeEvents(on, config) {
      // required for mochawesome to work with Cypress 10+
      return config
    },
  },
})