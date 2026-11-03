# 🐞 OpenCart Defect & Bug Report

> **Project:** OpenCart E-Commerce (Demo Store)  
> **Tested By:** Sandip Maharjan  
> **Environment:** Windows 11, Google Chrome  
> **Date:** 10/20/2026  
> **Live Document (with screenshots):** [🔗 OpenCart Bug Report on Google Docs](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing)  

---

## 📊 Summary of Identified Defects

| Bug ID | Title | Module | Severity | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | Password reset email is not received after submitting registered email address | Forgot Password / Authentication | High | High | Open |
| **BUG-002** | Warning message displayed after successfully adding product to wish list | Wish List | Low | Low | Open |
| **BUG-003** | Product total is incorrectly calculated (Unit Price × Quantity) | Shopping Cart | High | High | Open |
| **BUG-004** | Privacy Policy page does not display any policy details | Information Pages | High | High | Open |
| **BUG-005** | No validation message displayed when invalid e-mail address format is entered | Login / Authentication | Low | Medium | Open |
| **BUG-006** | User logged out with 'Invalid token session' warning after clicking Continue on Return Info | Product Returns | Medium | High | Open |
| **BUG-007** | Amount column heading shows (USD) while Pound Sterling is selected currency | Transactions / Store Credit | Low | Medium | Open |
| **BUG-008** | Agreement text and link refer to Delivery Information instead of affiliate terms | Affiliate Account | Low | Medium | Open |

---

## 📋 Detailed Defect Reports

---

### 🐞 BUG-001: [Forgot Password] Password reset email is not received after submitting a registered email address

- **Defect ID:** BUG-001
- **Module:** Forgot Password / Authentication
- **Issue Type:** Bug
- **Severity:** High
- **Priority:** High
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. User is registered and active.
2. OpenCart website is accessible.

#### Steps to Reproduce:
1. Click on **My Account** in header.
2. Click on **Login**.
3. Click on the **Forgotten Password** link.
4. Enter the registered email in the **E-Mail Address** field.
5. Click on **Continue**.

#### Actual Result:
1. No success message is displayed to confirm that a password reset link has been sent to the email address.
2. The user is redirected to the Login page.
3. No password reset email is received.

#### Expected Result:
1. A success message should be displayed to confirm that a password reset link has been sent to the email address.
2. The user should be redirected to the Login page.
3. A password reset email should be received.

#### Business Impact:
Users cannot reset their password and log in to their account, preventing them from placing orders.

#### Visual Evidence:
- Screenshots and email inbox captures available in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1 & Figure 2).

---

### 🐞 BUG-002: [Wish List] Warning message is displayed after successfully adding a product to the wish list

- **Defect ID:** BUG-002
- **Module:** Wish List
- **Issue Type:** Bug
- **Severity:** Low
- **Priority:** Low
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. User is registered and active.
2. User is logged out.
3. OpenCart website is accessible.
4. Wish list is empty.

#### Steps to Reproduce:
1. Open the OpenCart website in the browser.
2. Click on **My Account** > **Login**.
3. Enter registered email and password, then click **Login**.
4. Scroll down to the **Featured** section on the Home page.
5. Click on the **Add to Wish List** (heart) icon below the MacBook product.
6. Click on **Wish List** in the header.
7. Check the My Wish List page.

#### Actual Result:
A PHP warning is displayed at the top of the page:  
`Undefined array key "stock_status" in /var/www/opencart.com/web/catalog/controller/account/wishlist.php on line 98.`

#### Expected Result:
No warning or error message should be displayed on the page.

#### Business Impact:
Users may become confused about whether the product was successfully added to the wish list and question platform stability.

#### Visual Evidence:
- Screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-003: [Shopping Cart] Product total is incorrectly calculated (Unit Price × Quantity)

- **Defect ID:** BUG-003
- **Module:** Shopping Cart (`TS-010`)
- **Issue Type:** Bug
- **Severity:** High
- **Priority:** High
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. OpenCart website is accessible.
2. Shopping cart is empty.

#### Steps to Reproduce:
1. Open the OpenCart website in the browser.
2. Click on the **Currency** dropdown in the header and select **Pound Sterling (£)**.
3. Search for `"iphone"` and click **Add to Cart**.
4. Search for `"macbook"` and click **Add to Cart**.
5. Search for `"samsung galaxy tab"` and click **Add to Cart**.
6. Click on **Shopping Cart** in the header.
7. Enter `6` in the Quantity field of the MacBook product and click **Update** (blue button).
8. Enter `3` in the Quantity field of the Samsung Galaxy Tab 10.1 product and click **Update**.

#### Actual Result:
1. MacBook: £445.68 × 6 = £2,674.08, but the total displayed is **£2,666.69**.
2. Samsung Galaxy Tab 10.1: £179.15 × 3 = £537.45, but the total displayed is **£534.50**.
3. iPhone: £91.21 × 1 = £91.21, and the total displayed is £91.21 (correct).

#### Expected Result:
The total of each product row must strictly equal `Unit Price × Quantity`.

#### Business Impact:
- Users are charged an incorrect amount at checkout.
- Cart displays an inaccurate product subtotal.
- Calculation discrepancies cause checkout payment mismatches and direct customer churn.

#### Visual Evidence:
- Cart breakdown screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-004: [Privacy Policy] Privacy Policy page does not display any policy details

- **Defect ID:** BUG-004
- **Module:** Information Pages / Privacy Policy
- **Issue Type:** Bug
- **Severity:** High
- **Priority:** High
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. OpenCart website is accessible.

#### Steps to Reproduce:
1. Open the OpenCart website in the browser.
2. Scroll down to the footer of the Home page.
3. Click on the **Privacy Policy** link in the Information column.
4. Read the content of the page.

#### Actual Result:
1. Only the heading "Privacy Policy" and the plain text "Privacy Policy" are rendered; no policy clauses or terms are present.
2. Zero disclosure regarding customer data collection, cookie usage, or third-party handling.

#### Expected Result:
1. Comprehensive privacy policy details must be displayed.
2. Information about data collection, storage, and customer rights must be clearly outlined.

#### Business Impact:
- Regulatory and GDPR/compliance vulnerability.
- Users cannot understand how their personal and payment data is managed, reducing platform trust.

#### Visual Evidence:
- Screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-005: [Login] No validation message is displayed when an invalid e-mail address format is entered

- **Defect ID:** BUG-005
- **Module:** Login / Authentication
- **Issue Type:** Bug
- **Severity:** Low
- **Priority:** Medium
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. OpenCart website is accessible.
2. User is not logged in.

#### Steps to Reproduce:
1. Open the OpenCart website in the browser.
2. Click on **My Account** > **Login**.
3. Enter an email address missing the `@` symbol (e.g., `sandeeptest.com`) in the E-Mail Address field.
4. Enter any password (e.g., `Test@1234`).
5. Click on the **Login** button.

#### Actual Result:
1. No client-side or server-side format validation message is displayed for the malformed email syntax.
2. The login request is dispatched, returning generic error: `"Warning: No match for E-Mail Address and/or Password."`

#### Expected Result:
1. An inline format validation error should inform the user that the email syntax is invalid before attempting authentication.
2. No unnecessary backend login round-trip should be initiated.

#### Business Impact:
- Poor UX: Users receive ambiguous feedback when they simply mistyped their email.
- Syntax errors consume failed login attempts toward account lockout thresholds.

#### Visual Evidence:
- Form screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-006: [Product Returns] User is logged out with an 'Invalid token session' warning after clicking Continue on Return Information page

- **Defect ID:** BUG-006
- **Module:** Product Returns
- **Issue Type:** Bug
- **Severity:** Medium
- **Priority:** High
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. User is registered and active.
2. OpenCart website is accessible.
3. User has submitted return requests.

#### Steps to Reproduce:
1. Open the OpenCart website in the browser.
2. Log in with registered credentials.
3. Click on **View your return requests** link under My Orders.
4. Click on the **View** (eye) button of an existing return request.
5. On the Return Information page, click the **Continue** button.

#### Actual Result:
1. User is redirected to Login page with error: `"Invalid token session. Please login again!"`
2. The user session is abruptly destroyed.

#### Expected Result:
1. The user should be smoothly redirected back to the Product Returns list page.
2. The user session must remain authenticated.

#### Business Impact:
- Disrupts customer post-purchase journey and frustrates customers managing returns.
- Forces unnecessary re-authentication.

#### Visual Evidence:
- Session error screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-007: [Transactions] Amount column heading shows (USD) while Pound Sterling is the selected currency

- **Defect ID:** BUG-007
- **Module:** Transactions / Store Credit
- **Issue Type:** Bug
- **Severity:** Low
- **Priority:** Medium
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. User is registered and logged in.
2. User has no prior transaction balance (£0.00).

#### Steps to Reproduce:
1. Select **Pound Sterling (£)** from the header currency dropdown.
2. Navigate to **My Account** > **Your Transactions** under My Orders.
3. Observe the balance display and the table column headings.

#### Actual Result:
1. Current balance correctly displays `£0.00`.
2. The table column heading hardcodes **`Amount (USD)`** instead of adapting to `Amount (GBP)` or `Amount (£)`.

#### Expected Result:
The Amount column heading must dynamically reflect the active currency symbol/code.

#### Business Impact:
- Causes confusion regarding whether transactions are denominated in British Pounds or US Dollars.
- Diminishes multi-currency visual polish.

#### Visual Evidence:
- Screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).

---

### 🐞 BUG-008: [Affiliate] Agreement text and link refer to Delivery Information instead of affiliate terms and conditions

- **Defect ID:** BUG-008
- **Module:** Affiliate Account
- **Issue Type:** Bug
- **Severity:** Low
- **Priority:** Medium
- **Status:** Open
- **Environment:** Test Environment, Google Chrome, Windows 11
- **Date Reported:** 10/20/2026

#### Preconditions:
1. User is registered and logged in.
2. User is not yet registered as an affiliate.

#### Steps to Reproduce:
1. Log in to OpenCart.
2. Click on **Register for an affiliate account** under My Affiliate Account.
3. Scroll down to the agreement toggle.
4. Read the agreement label and click the hyperlink.

#### Actual Result:
1. Agreement label reads: `"I have read and agreed to the Delivery Information"`.
2. Clicking the link opens the Delivery Information modal instead of Affiliate Terms & Conditions.

#### Expected Result:
The agreement text and hyperlink must explicitly bind to the Affiliate Terms and Conditions.

#### Business Impact:
- Legal/compliance defect: Affiliates agree to shipping/delivery terms rather than affiliate commission/payout terms.

#### Visual Evidence:
- Screenshot in [Live Google Doc](https://docs.google.com/document/d/1JsNHS9bonb2RUVn-gYj-ii4pceV6HlEkWg_fP6HIAVY/edit?usp=sharing) (Figure 1).
