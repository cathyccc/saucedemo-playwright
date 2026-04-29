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

## 🗺️ Roadmap & Progress

### **Phase 1: Core Automation (In Progress)**
- [x] **Project Scaffolding**: Initialized Playwright with TypeScript and organized directory structure.
- [x] **Authentication Suite**: 
    - [x] Functional tests for `standard_user` login.
    - [x] Validation of error states for `locked_out_user`.
- [x] **Product Interaction**: 
    - [x] Implemented Page Object Model (POM) for the Inventory page.
    - [x] Developed logic for adding/removing items and validating cart badge counts.
- [x] **Cart & Checkout Logic** (Current Focus):
    - [x] Complete POM for the Cart page.
    - [x] Verify item persistence (ensuring selected products appear correctly in the cart).
    - [x] Automate the "Checkout: Your Information" and "Overview" steps.

### **Phase 2: Framework Maturity**
- [ ] **Global Setup & Auth**: Implement session storage to reuse login state across tests for faster execution.
- [ ] **Data-Driven Testing**: Externalize test data into JSON files to test different user personas.
- [ ] **BasePage Abstraction**: Create a base class to handle common elements like the navigation menu and footer.

### **Phase 3: CI/CD & Professional Reporting**
- [ ] **GitHub Actions**: Configure a workflow to run tests automatically on every Push or Pull Request.
- [ ] **Enhanced Reporting**: Integrate Playwright HTML reports and Trace Viewer for easier debugging.
- [ ] **Cross-Browser Validation**: Run the full suite across Chromium, Firefox, and WebKit.
