# 🐛 OpenCart Defect & Bug Report

> **Live Document Link:** [🔗 OpenCart Bug Report on Google Docs](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing)  
> **Project:** OpenCart E-Commerce QA Automation & Manual Testing  
> **Status:** Active / Reported  

---

## 📌 Executive Summary

This document captures the defects, functional discrepancies, and edge-case anomalies identified during the manual and automated testing cycles of the **OpenCart E-Commerce** platform.

For real-time collaboration, defect tracking, and embedded screenshots, refer to the live Google Docs version:
👉 [**OpenCart Bug Report (Google Docs)**](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing)

---

## 🎯 Defect Classification Matrix

| Severity Level | Definition | Priority | Target SLA |
| :--- | :--- | :--- | :--- |
| **Critical (S1)** | System crash, data corruption, payment failure, security vulnerabilities | **P1 - Immediate** | Within 24 hours |
| **Major (S2)** | Core feature broken without reasonable workaround (e.g., checkout blocked, cart sync failure) | **P2 - High** | Within 48 hours |
| **Moderate (S3)** | Functional issue with an existing workaround; non-critical UI degradation | **P3 - Medium** | Next Sprint |
| **Minor / Trivial (S4)** | Cosmetic defects, typos, minor styling inconsistencies, alignment issues | **P4 - Low** | Backlog |

---

## 📋 Defect Log / Bug Reports

*(If you wish to mirror all bug entries from your Google Doc locally in Markdown, paste your exported entries or specific bug tickets below)*

### Template for Defect Entry:

```markdown
### 🐞 [BUG-001] <Bug Title / Short Summary>

- **Defect ID:** BUG-001
- **Module:** Shopping Cart / Account / Checkout
- **Severity:** Major (S2)
- **Priority:** High (P2)
- **Environment:** 
  - Application: OpenCart v4.x
  - Browser: Chromium 120+, Firefox 121+
  - OS: Windows 11
- **Associated Test Case:** TC-CT-xxx / TC-RF-xxx

#### 📝 Steps to Reproduce:
1. Navigate to the OpenCart storefront.
2. Add product 'X' to the cart.
3. Proceed to the cart page.
4. Perform action 'Y'.

#### 🎯 Expected Result:
The application should behave according to requirement specification...

#### ❌ Actual Result:
The application displays an unhandled error / unexpected calculation / broken state...

#### 📷 Visual Evidence / Logs:
- Refer to [Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) for screenshots and network payloads.
```
