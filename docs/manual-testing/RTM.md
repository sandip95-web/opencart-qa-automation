# 🗺️ OpenCart Requirements Traceability Matrix (RTM)

> **Live RTM Document:** [🔗 Requirements Traceability Matrix on Google Sheets](https://docs.google.com/spreadsheets/d/1224jJ4HHsJgfKpROKIInn-J333lsMIPAbD3zIc-Iqzc/edit?usp=sharing)  
> **Traceability Mode:** Bidirectional (Forward & Backward Traceability)  
> **Status:** 100% Requirement Coverage Verified  

---

## 📌 Purpose & Objectives

The **Requirements Traceability Matrix (RTM)** guarantees bidirectional mapping between:
1. **Business Requirements (BRD / User Stories):** Functional requirements stated for the OpenCart storefront.
2. **Manual Test Cases:** Detailed test verification steps across the 18 modules.
3. **Automated Test Scripts:** Executable Playwright specs in [`tests/`](../../tests).
4. **Defect Tracking:** Linking discovered defects in [`BUG_REPORT.md`](./BUG_REPORT.md) back to requirement gaps.

This matrix ensures that **no requirement is left untested** (eliminating coverage blind spots) and that **no test exists without requirement justification** (preventing test bloat).

👉 [**Open the Live RTM on Google Sheets**](https://docs.google.com/spreadsheets/d/1224jJ4HHsJgfKpROKIInn-J333lsMIPAbD3zIc-Iqzc/edit?usp=sharing)

---

## 🔄 Bidirectional Traceability Architecture

```text
[Business Requirement] ───► [Test Scenario] ───► [Manual Test Case] ───► [Playwright Spec] ───► [CI Execution]
       ▲                             ▲                       ▲                    ▲                   ▲
       └─────────────────────────────┴────── Defect Logs ────┴────────────────────┴───────────────────┘
```

---

## 📊 High-Level Traceability Matrix

| Requirement ID | Module / Feature Description | Scenario ID | Test Case Range | Automated Test Spec | CI Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-ACC-01** | User Registration & Privacy Policy consent | `TS-001` | `TC-RF-001` – `TC-RF-015` | [`tests/auth/registration.spec.ts`](../../tests/auth/registration.spec.ts) | Passing |
| **REQ-ACC-02** | User Login, Session Persistence & Logout | `TS-002` | `TC-LG-001` – `TC-LG-010` | Manual / Planned | N/A |
| **REQ-CAT-01** | Keyword Search & Autocomplete Matching | `TS-007` | `TC-SR-001` – `TC-SR-012` | Manual | N/A |
| **REQ-CAT-02** | Multi-Currency Switcher (USD, EUR, GBP) | `TS-008` | `TC-CR-001` – `TC-CR-006` | Manual | N/A |
| **REQ-CRT-01** | Cart Table Layout, Columns, & Action Buttons | `TS-010` | `TC-CT-001` – `TC-CT-005` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-CRT-02** | Quantity Update, Boundaries, & 0-Removal | `TS-010` | `TC-CT-006` – `TC-CT-011` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-CRT-03** | Subtotal, Eco Tax, VAT & Total Recalculation | `TS-010` | `TC-CT-012` – `TC-CT-015` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-CRT-04** | Inventory Limits & Checkout Restrictions | `TS-010` | `TC-CT-016` – `TC-CT-018` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-SEC-01** | Input Sanitization & Script Injection (XSS) | `TS-010` | `TC-CT-019` – `TC-CT-020` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-UI-01** | Responsive Layout (Mobile Viewport 375x667) | `TS-010` | `TC-CT-021` – `TC-CT-022` | [`tests/cart.spec.ts`](../../tests/cart.spec.ts) | Passing |
| **REQ-CHK-01** | Guest & Customer Checkout Pipeline | `TS-013` | `TC-CO-001` – `TC-CO-020` | Manual | N/A |

---

## 📈 Coverage Metrics

- **Total Functional Modules:** 18
- **Core Manual Test Cases:** 150+ documented in [Google Sheets](https://docs.google.com/spreadsheets/d/1224jJ4HHsJgfKpROKIInn-J333lsMIPAbD3zIc-Iqzc/edit?usp=sharing)
- **High-Risk Regression Automation Coverage:** 100% of Shopping Cart module (`TS-010`) automated with 22 dedicated Playwright scenarios.
