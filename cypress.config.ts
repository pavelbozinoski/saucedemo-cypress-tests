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
      NON_EXISTING_USER: process.env.CYPRESS_NON_EXISTING_USER,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },
    retries: {
      runMode: 2,
      openMode: 1,
    },
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      return config
    },
  },
})