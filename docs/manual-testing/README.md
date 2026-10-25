# 📋 OpenCart Manual Testing & QA Deliverables

This directory contains the complete Manual Testing documentation and Quality Assurance deliverables for the **OpenCart E-Commerce** web application. 

As part of the end-to-end Software Testing Life Cycle (STLC), these deliverables establish requirements traceability, risk-based test planning, detailed scenario design, execution metrics, and defect management.

---

## 📑 Core Manual Testing Deliverables

The live testing artifacts are maintained in Google Sheets for real-time collaboration and traceability. Use the direct links below to review the corresponding sheets:

| Deliverable | Description | Live Google Sheets Link | Local Reference |
| :--- | :--- | :--- | :--- |
| **Test Plan** | Comprehensive test strategy, scope, environment, entry/exit criteria, and risk mitigation | [🔗 OpenCart Test Plan (Google Sheets)](https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID_TEST_PLAN/edit?usp=sharing) | — |
| **Test Cases** | Detailed test cases covering 18 functional modules (preconditions, steps, data, expected results) | [🔗 OpenCart Test Cases Suite (Google Sheets)](https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID_TEST_CASES/edit?usp=sharing) | [`sheet.xlsx`](../../sheet.xlsx) |
| **Requirements Traceability Matrix (RTM)** | Bidirectional mapping between business requirements, test cases, and automated scripts | [🔗 Requirements Traceability Matrix (Google Sheets)](https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID_RTM/edit?usp=sharing) | — |
| **Test Execution Report** | Test run summary, pass/fail status, execution velocity, and defect density metrics | [🔗 Test Execution & Metrics Report (Google Sheets)](https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID_EXECUTION_REPORT/edit?usp=sharing) | — |
| **Defect / Bug Reports** | Triage log of logged bugs, including severity, priority, steps to reproduce, and statuses | [🔗 Defect Log & Triage Report (Google Sheets)](https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID_BUG_REPORTS/edit?usp=sharing) | — |

> **Note for Evaluators:** If you maintain all tabs within a single Google Sheets workbook, you can link to the specific tab by appending the grid ID (`#gid=...`) to each link above.

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

## 🐞 Standard Bug Report Format

All defects identified during manual execution are logged with standardized severity and priority ratings:

```markdown
### [BUG-001] Cart total fails to update after removing discounted product
- **Severity:** High
- **Priority:** High
- **Environment:** Chrome 124.0.0, Windows 11, Test URL: http://localhost/opencart/upload
- **Prerequisites:** User is logged in; cart contains 2 or more distinct products.
- **Steps to Reproduce:**
  1. Navigate to the Shopping Cart page.
  2. Click the 'Remove' (red X) button next to the discounted product.
  3. Observe the Sub-Total and Total values in the order summary table.
- **Expected Result:**
  Sub-Total and Total should immediately recalculate deducting the removed product price.
- **Actual Result:**
  Total displays the previous value until the browser page is manually refreshed.
- **Attachments:** Screenshot_2026-10-25_Cart_Bug.png
```

---

## 🔄 Traceability to Automation Suite

High-priority, regression-prone manual test cases are automated within the Playwright framework:
- **Cart Module (`TS-010`)**: 22 manual test cases (`TC-CT-001` to `TC-CT-022`) are fully automated in [`tests/cart.spec.ts`](../../tests/cart.spec.ts).
- **User Registration (`Register`)**: Core path verification (`TC-RF-001`) is automated in [`tests/registration.spec.ts`](../../tests/registration.spec.ts).

👉 To review the automated implementation, visit the [Automation Testing Documentation](../automation-testing/README.md).
