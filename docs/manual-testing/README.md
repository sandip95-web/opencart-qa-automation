# 📋 OpenCart Manual Testing & QA Deliverables

This directory contains the complete Manual Testing documentation and Quality Assurance deliverables for the **OpenCart E-Commerce** web application. 

As part of the end-to-end Software Testing Life Cycle (STLC), these deliverables establish requirements traceability, risk-based test planning, and detailed scenario design.

---

## 📑 Core Manual Testing Deliverables

The live testing artifacts are maintained online for real-time collaboration and traceability. Use the direct links below to review the corresponding documents:

| Deliverable | Description | Live Document Link | Local Reference |
| :--- | :--- | :--- | :--- |
| **Test Plan** | Comprehensive test strategy, scope, environment, entry/exit criteria, and risk mitigation | [🔗 OpenCart Test Plan (Google Docs)](https://docs.google.com/document/d/1Omb3T6WHyrPhB0V2rR4UeJ_hqhC8usK9HRGUJZv817c/edit?usp=sharing) | — |
| **Test Cases** | Detailed test cases covering 18 functional modules (preconditions, steps, data, expected results) | [🔗 OpenCart Test Cases Suite (Google Sheets)](https://docs.google.com/spreadsheets/d/1UKnDiSG0aXSwqHGvS-ZgcRhKDuCeSHbfrPyovwVhG7g/edit?usp=sharing) | — |
| **Requirements Traceability Matrix (RTM)** | Bidirectional mapping between business requirements, test cases, and automated scripts | [🔗 Requirements Traceability Matrix (Google Sheets)](https://docs.google.com/spreadsheets/d/1224jJ4HHsJgfKpROKIInn-J333lsMIPAbD3zIc-Iqzc/edit?usp=sharing) | — |

---

## 🎯 Test Scope & Functional Module Coverage

The manual testing strategy covers end-to-end customer journeys across **18 functional modules** of the OpenCart store:

```
OpenCart Functional Scope
 ├── Account Management
 │    ├── Register (TC-RF-xxx)
 │    ├── Login & Logout
 │    ├── Forgot Password
 │    ├── Edit Account & Change Password
 │    └── Add Address
 ├── Catalog & Discovery
 │    ├── Search Functionality
 │    ├── Currency Filter (USD, EUR, GBP)
 │    └── Compare Products
 ├── Shopping & Transactions
 │    ├── Add to Cart
 │    ├── Shopping Cart (TS-010 / TC-CT-001 through TC-CT-022)
 │    ├── Add to Wish List
 │    └── Order History
 └── Compliance & Engagement
      ├── Privacy Policy Verification
      └── Newsletter Subscription
```

---

## 🧪 Test Design Techniques Applied

To maximize defect discovery while maintaining high testing efficiency, the test cases were designed using industry-standard Black-Box testing techniques:

1. **Boundary Value Analysis (BVA):** Applied to cart item quantities (e.g., minimum: 1, stock limits: maximum available inventory, out-of-bounds: 0 and 9999).
2. **Equivalence Partitioning (EP):** Partitioned coupon code inputs into valid, expired, and non-existent partitions.
3. **Negative & Abuse Testing:** Evaluated system resilience against non-numeric quantity inputs, negative quantities, and cross-site scripting (XSS) injection payloads (`<script>alert(1)</script>`).
4. **State Transition Testing:** Validated cart recalculations when transitioning between empty, single-product, multi-product, and modified quantity states.
5. **Cross-Browser & Responsive Design:** Validated checkout and cart UI adaptability on desktop (Chromium, WebKit, Firefox) and mobile viewports (375x667).



---

## 🔄 Traceability to Automation Suite

High-priority, regression-prone manual test cases are automated within the Playwright framework:
- **Cart Module (`TS-010`)**: 22 manual test cases (`TC-CT-001` to `TC-CT-022`) are fully automated in [`tests/cart.spec.ts`](../../tests/cart.spec.ts).
- **User Registration (`Register`)**: Core path verification (`TC-RF-001`) is automated in [`tests/registration.spec.ts`](../../tests/registration.spec.ts).

👉 To review the automated implementation, visit the [Automation Testing Documentation](../automation-testing/README.md).
