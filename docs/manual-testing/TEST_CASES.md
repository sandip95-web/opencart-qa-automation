# 🧪 OpenCart Test Cases Suite (18 Functional Modules)

> **Live Suite Link:** [🔗 OpenCart Test Cases Suite on Google Sheets](https://docs.google.com/spreadsheets/d/1UKnDiSG0aXSwqHGvS-ZgcRhKDuCeSHbfrPyovwVhG7g/edit?usp=sharing)  
> **Total Functional Modules:** 18 Modules  
> **Automation Traceability:** Automated via Playwright + TypeScript ([`tests/`](../../tests))  

---

## 📌 Test Suite Overview

This suite contains test cases designed to evaluate functional correctness, input validation, mathematical accuracy, security resilience, and responsiveness across the entire OpenCart e-commerce storefront.

The complete spreadsheet includes precondition specifications, step-by-step actions, dynamic test datasets, expected vs. actual results, and automation status flags.

👉 [**Open the Live Test Cases Suite on Google Sheets**](https://docs.google.com/spreadsheets/d/1UKnDiSG0aXSwqHGvS-ZgcRhKDuCeSHbfrPyovwVhG7g/edit?usp=sharing)

---

## 🗂️ Module Coverage Breakdown

The 18 modules are categorized into four core customer journey pillars:

```text
OpenCart Functional Modules
├── 1. Account Management
│   ├── TS-001: User Registration (TC-RF-001 to TC-RF-015)
│   ├── TS-002: User Login & Session Persistence
│   ├── TS-003: Password Reset & Recovery
│   ├── TS-004: Account Information Editing
│   ├── TS-005: Password Change Workflow
│   └── TS-006: Address Book Management
├── 2. Catalog & Discovery
│   ├── TS-007: Storefront Search & Keyword Matching
│   ├── TS-008: Multi-Currency Filter (USD $, EUR €, GBP £)
│   └── TS-009: Product Comparison Matrix
├── 3. Transactions & Shopping Experience
│   ├── TS-010: Shopping Cart Management (TC-CT-001 to TC-CT-022) [100% Automated]
│   ├── TS-011: Add to Cart (PDP & Category Views)
│   ├── TS-012: Wish List Operations
│   ├── TS-013: Guest & Registered Checkout Workflows
│   ├── TS-014: Coupon Code & Gift Voucher Application
│   └── TS-015: Order History & Invoice Review
└── 4. Compliance & Customer Engagement
    ├── TS-016: Privacy Policy & Terms Consent Verification
    ├── TS-017: Product Reviews & Rating Submissions
    └── TS-018: Newsletter Subscription & Opt-out
```

---

## 📋 Standard Test Case Specification Template

All test cases in the live Google Sheets suite are structured according to the standard enterprise QA format:

| Field | Description / Example |
| :--- | :--- |
| **Test Case ID** | `TC-CT-001` (Unique alphanumeric identifier) |
| **Test Scenario ID** | `TS-010` (Shopping Cart Management) |
| **Module / Feature** | Shopping Cart / Mathematical Calculation |
| **Test Priority** | High (P1) / Medium (P2) / Low (P3) |
| **Preconditions** | User is on storefront; at least 1 item added to cart; inventory available |
| **Test Steps** | 1. Navigate to `/index.php?route=checkout/cart`<br>2. Verify total calculation row |
| **Test Data** | Product: iPhone (Qty: 2, Unit Price: $123.20, Eco Tax: $2.00, VAT: 20%) |
| **Expected Result** | Total price strictly equals `(Unit Price * Qty) + Eco Tax + VAT` |
| **Automation Status** | Automated ([`tests/cart.spec.ts`](../../tests/cart.spec.ts)) |

---

## 🔄 Automated High-Priority Modules

High-frequency regression paths from this manual suite are automated using Playwright:

- **Shopping Cart (`TS-010`)**: 22 comprehensive scenarios ([`tests/cart.spec.ts`](../../tests/cart.spec.ts)) testing table rendering, quantity boundaries, zero-value removals, tax calculations, stock limit restrictions, and XSS payload resistance.
- **User Registration (`TS-001`)**: Core registration path verification ([`tests/auth/registration.spec.ts`](../../tests/auth/registration.spec.ts)) with dynamic email and identity generation.
