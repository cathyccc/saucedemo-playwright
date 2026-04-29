# Saucedemo Playwright Automation Suite 🎭

## 🎯 Project Purpose
This is a **Test Automation Portfolio** project. I have developed a robust Playwright automation suite to test the [SauceDemo](https://www.saucedemo.com/) web application (a standard industry practice site). 

The goal of this project is to demonstrate my ability to:
* Architect a scalable **Page Object Model (POM)**.
* Handle complex user workflows (Login -> Inventory -> Cart -> Checkout).
* Write clean, maintainable TypeScript code for automated verification.
---

## 🛠 Tech Stack

* **Engine:** [Playwright](https://playwright.dev/)
* **Language:** TypeScript
* **Pattern:** Page Object Model (POM)
* **Reporting:** Playwright HTML Reporter

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:

```bash
git clone [https://github.com/cathyccc/saucedemo-playwright.git](https://github.com/cathyccc/saucedemo-playwright.git)
cd saucedemo-playwright
npm install
npx playwright install
```

### 3. Running Tests
You can run the tests in different modes:
* Headed Mode (Visual): npx playwright test --headed
* Headless Mode (CI): npx playwright test
* UI Mode (Interactive): npx playwright test --ui

---

## 📂 Project Structure
```plaintext
├── tests/               # Test specifications (.spec.ts)
├── pages/               # Page classes and logic (POM)
├── playwright.config.ts # Framework configuration
└── package.json         # Dependencies and scripts
```

---

## 🚀 Automated Test Coverage & Features

### **Core Test Suites**
- **Authentication**: 
    - Full happy-path validation for `standard_user`.
    - Robust error state testing for `locked_out_user` and invalid credentials.
- **Inventory Management**: 
    - Dynamic logic for adding/removing specific products by name.
    - Real-time validation of cart badge counts and UI state toggles.
- **Shopping Cart**: 
    - Validation of item persistence from inventory to cart.
    - Verified multi-item handling and list integrity.
- **Checkout Flow**: 
    - Automated the complete E2E journey: `Cart` ➔ `Information Entry` ➔ `Order Overview` ➔ `Finish`.

### **Technical Implementation Highlights**
- **Page Object Model (POM)**: Fully decoupled test logic from UI selectors for high maintainability.
- **Financial Accuracy**: Implemented precision handling using `.toFixed(2)` and `toBeCloseTo` to validate subtotal and tax calculations against JavaScript's floating-point math.
- **Atomic Test Design**: Every test is independent, ensuring reliability and allowing for easier debugging.
- **Robust Locators**: Utilized `data-test` attributes and regex-based string parsing to ensure tests are resilient to minor UI text changes.

## 🛠️ Tech Stack & Tools
- **Playwright**: Core automation engine.
- **TypeScript**: For type-safe test development and better IDE support.
- **Node.js**: Runtime environment.
