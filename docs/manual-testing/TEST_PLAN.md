# 📑 OpenCart Master Test Plan (IEEE 829 Aligned)

> **Live Collaboration Link:** [🔗 OpenCart Test Plan on Google Docs](https://docs.google.com/document/d/1Omb3T6WHyrPhB0V2rR4UeJ_hqhC8usK9HRGUJZv817c/edit?usp=sharing)  
> **Application Under Test (AUT):** OpenCart E-Commerce Platform  
> **Framework & Standards:** IEEE 829 Test Planning Standard / Black-Box QA  
> **Target Release:** v1.0.0 (Core E-Commerce Journeys)  

---

## 1. 🎯 Introduction & Purpose
This Test Plan defines the comprehensive quality strategy, operational scope, resource allocation, and validation criteria for the **OpenCart E-Commerce** web platform. It ensures all critical customer flows—ranging from user onboarding to transaction processing—meet high standards of usability, security, functional accuracy, and cross-browser reliability.

---

## 2. 🔍 Scope of Testing

### In-Scope (18 Functional Modules)
- **Account Management:** User Registration, Authentication (Login/Logout), Password Reset, Profile Management, Address Book.
- **Product Discovery & Navigation:** Header Search, Category/Subcategory Browsing, Currency Switching (USD, EUR, GBP), Product Comparison.
- **Shopping & Cart Management:** Add to Cart, Cart Page Table Operations (`TS-010`), Quantity Adjustments, Coupon/Voucher Application, Tax/Shipping Estimates.
- **Order Processing & Checkout:** Guest Checkout, Registered User Checkout, Payment Gateway Simulators, Order History & Order Confirmation.
- **Engagement & Compliance:** Privacy Policy Enforcement, Wishlist Operations, Product Reviews & Ratings, Newsletter Subscription.

### Out-of-Scope
- Back-office administration operations (Admin portal catalog management, inventory staging).
- Direct backend database stress testing and hardware scalability.
- Third-party real-money payment merchant clearing (mock/test gateways utilized).

---

## 3. 🧪 Testing Strategy & Methodologies

The QA methodology applies systematic black-box test design techniques:
1. **Boundary Value Analysis (BVA):** Applied to quantity input limits, coupon boundaries, and text input length constraints.
2. **Equivalence Partitioning (EP):** Partitioning valid vs. invalid credential formats, currency denominations, and product SKU states.
3. **Negative & Abuse Testing:** Evaluating input sanitization against Cross-Site Scripting (XSS), non-numeric quantity characters, and empty form submissions.
4. **State Transition Testing:** Validating system recalculations as a shopping cart transitions between empty, single-item, modified-quantity, and zeroed states.
5. **Cross-Browser & Responsive Validation:** Desktop viewports (Chromium, WebKit, Firefox) and mobile viewports (375x667).

---

## 4. ⚙️ Test Environment Specifications

| Component | Specification |
| :--- | :--- |
| **Application Version** | OpenCart v4.x (Web Client) |
| **Local Deployment** | `http://localhost/opencart/upload/` / Staging Storefront |
| **Desktop Browsers** | Google Chrome (Latest), Mozilla Firefox (Latest), Apple Safari (WebKit) |
| **Mobile Simulation** | Mobile Chrome (Pixel 5 emulation), Mobile Safari (iPhone 12/13/14 emulation) |
| **Automated Tooling** | Playwright (TypeScript), GitHub Actions CI/CD |

---

## 5. 🚦 Entry, Suspension & Exit Criteria

### Entry Criteria
- OpenCart storefront deployed and reachable with seeded catalog data.
- Test accounts, test coupons, and product inventory configured.
- Requirements and functional specifications baseline established.

### Suspension Criteria
- Core blocker defect (S1/Critical) preventing user navigation or blocking the checkout pipeline.
- Database or test environment downtime exceeding scheduled window.

### Exit Criteria
- 100% execution of high-priority (P1/P2) test cases across all 18 modules.
- Zero open Critical (S1) or Major (S2) defects.
- All automated regression suites passing cleanly in GitHub Actions CI.
- Requirements Traceability Matrix (RTM) fully verified with 100% requirement coverage.

---

## 6. ⚠️ Risk Assessment & Mitigation Matrix

| Risk Identified | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| Dynamic inventory stockouts during automated test runs | Medium | High | Decouple test fixtures using dynamic data generators; re-seed catalog state before test execution. |
| Browser rendering discrepancies across modern engines | Medium | Medium | Include automated cross-engine Playwright matrix checks in GitHub Actions CI. |
| Checkout pricing rounding errors across multiple currencies | Low | High | Rigorous mathematical assertions verifying `Sub-Total + Eco Tax + VAT = Total` across USD, EUR, and GBP. |

---

## 7. 📦 Deliverables & Artifacts
- **Test Plan:** [Live Google Doc](https://docs.google.com/document/d/1Omb3T6WHyrPhB0V2rR4UeJ_hqhC8usK9HRGUJZv817c/edit?usp=sharing) / [`TEST_PLAN.md`](./TEST_PLAN.md)
- **Test Cases Suite:** [Live Google Sheets](https://docs.google.com/spreadsheets/d/1UKnDiSG0aXSwqHGvS-ZgcRhKDuCeSHbfrPyovwVhG7g/edit?usp=sharing) / [`TEST_CASES.md`](./TEST_CASES.md)
- **Requirements Traceability Matrix (RTM):** [Live Google Sheets](https://docs.google.com/spreadsheets/d/1224jJ4HHsJgfKpROKIInn-J333lsMIPAbD3zIc-Iqzc/edit?usp=sharing) / [`RTM.md`](./RTM.md)
- **Defect & Bug Report:** [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) / [`BUG_REPORT.md`](./BUG_REPORT.md)
