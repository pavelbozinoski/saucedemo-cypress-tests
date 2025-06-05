# 🧪 Saucedemo Cypress Tests

This project contains automated end-to-end tests for [SauceDemo](https://www.saucedemo.com) using [Cypress](https://www.cypress.io/). The tests are written in TypeScript and follow the Page Object Model (POM) design pattern to ensure clean and maintainable code.

---

## 📁 Project Structure

saucedemo-cypress-tests/
├── .github/workflows/ # GitHub Actions CI configuration
├── cypress/
│ ├── data/ # test data
│ ├── e2e/ # All test specs
│ ├── pages/ # Page Object Model classes
│ ├── support/ # Commands, types, and setup
│ └── fixtures/ 
├── tsconfig.json # TypeScript config
├── package.json # Project config and scripts
└── README.md # Project documentation

---

## 🚀 Features

- ✅ Cypress 14 with TypeScript
- ✅ GitHub Actions for CI
- ✅ Environment variables managed via GitHub Secrets
- ✅ Page Object Model structure for clean test logic
- ✅ Basic ESLint + Prettier config for code formatting

---

## 📦 Installation

```bash
git clone https://github.com/your-username/saucedemo-cypress-tests.git
cd saucedemo-cypress-tests
npm install