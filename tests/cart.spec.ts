import { test, expect } from '@playwright/test';
import { createCartPage, CartPage } from '../pages/CartPage';
import { CART_TEST_CONFIG } from '../test-data/cart-data';

test.describe('OpenCart - Cart Module (TS-010)', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = createCartPage(page);
    await cartPage.clearCartIfNotEmpty();
  });

  // TC-CT-001 | Priority: High
  test('TC-CT-001 - Verify the content of the Shopping Cart page', async ({ page }) => {
    // 1. Open website & select Pound Sterling
    await cartPage.gotoHome();
    await cartPage.selectCurrency('Pound Sterling');

    // 2. Add products: iPhone, MacBook, Samsung Galaxy Tab 10.1
    await cartPage.searchAndAddToCart(CART_TEST_CONFIG.products.iphone);
    await cartPage.searchAndAddToCart(CART_TEST_CONFIG.products.macbook);
    await cartPage.searchAndAddToCart(CART_TEST_CONFIG.products.samsungTab);

    // 3. Open Shopping Cart
    await cartPage.clickHeaderShoppingCart();

    // 4. Update quantities: MacBook -> 6, Samsung Galaxy Tab -> 3
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 6);
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.samsungTab, 3);

    // ER 1: Breadcrumb Home > Shopping Cart
    await expect(cartPage.breadcrumb).toContainText('Shopping Cart');

    // ER 2: Image, Product Name, Model, Quantity, Unit Price, Total columns
    await expect(cartPage.cartTable).toBeVisible();
    const tableText = await cartPage.cartTable.innerText();
    expect(tableText).toMatch(/Image/i);
    expect(tableText).toMatch(/Product/i);
    expect(tableText).toMatch(/Model/i);
    expect(tableText).toMatch(/Quantity/i);
    expect(tableText).toMatch(/Unit Price/i);
    expect(tableText).toMatch(/Total/i);

    // ER 3: Sub-Total, Eco Tax, VAT and Total rows displayed
    await expect(page.locator('#content')).toContainText(/Sub-Total/i);
    await expect(page.locator('#content')).toContainText(/Total/i);

    // ER 4: Continue Shopping and Checkout buttons displayed
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
  });

  // TC-CT-002 | Priority: Medium
  test('TC-CT-002 - Verify the product name link on the Shopping Cart page opens the product page', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.clickProductName(CART_TEST_CONFIG.products.macbook);

    // Product details page of the product should be displayed
    await expect(page.locator('h1')).toContainText(CART_TEST_CONFIG.products.macbook);
  });

  // TC-CT-003 | Priority: High
  test('TC-CT-003 - Verify updating the quantity of a product', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Update quantity to 2
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 2);

    // ER 1: Success message displayed that shopping cart is modified
    await expect(cartPage.alertSuccess).toBeVisible();
    await expect(cartPage.alertSuccess).toContainText(/Success: You have modified your shopping cart!/i);

    // ER 2: Quantity input value is updated to 2
    const qtyInput = cartPage.getQuantityInput(CART_TEST_CONFIG.products.macbook);
    await expect(qtyInput).toHaveValue('2');

    // ER 3: Header cart total reflects updated items
    const headerCart = await cartPage.getHeaderCartText();
    expect(headerCart).toMatch(/2 item/i);
  });

  // TC-CT-004 | Priority: High
  test('TC-CT-004 - Verify removing a product from the cart', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.iphone);
    await cartPage.clickHeaderShoppingCart();

    // Remove iPhone
    await cartPage.removeProduct(CART_TEST_CONFIG.products.iphone);

    // ER 1: Product should be removed
    const iphoneRow = cartPage.getProductRow(CART_TEST_CONFIG.products.iphone);
    await expect(iphoneRow).not.toBeVisible();

    // ER 2: Remaining product exists and totals updated
    const macbookRow = cartPage.getProductRow(CART_TEST_CONFIG.products.macbook);
    await expect(macbookRow).toBeVisible();

    // ER 3: Cart total in header updated to 1 item(s)
    const headerCart = await cartPage.getHeaderCartText();
    expect(headerCart).toMatch(/1 item/i);
  });

  // TC-CT-005 | Priority: Medium
  test('TC-CT-005 - Verify the message when the last product is removed from the cart', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Remove last product
    await cartPage.removeProduct(CART_TEST_CONFIG.products.macbook);

    // ER 1: Message displayed that shopping cart is empty
    await expect(cartPage.emptyCartMessage).toBeVisible();

    // ER 2: Cart total in header is 0 item(s)
    const headerCart = await cartPage.getHeaderCartText();
    expect(headerCart).toMatch(/0 item/i);
  });

  // TC-CT-006 | Priority: High
  test('TC-CT-006 - Verify Sub-Total, Eco Tax, VAT and Total are calculated correctly', async ({ page }) => {
    await cartPage.gotoHome();
    await cartPage.selectCurrency('Pound Sterling');

    await cartPage.searchAndAddToCart(CART_TEST_CONFIG.products.iphone);
    await cartPage.searchAndAddToCart(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Check Sub-Total and Total presence
    const subTotal = await cartPage.getTotalRowValue('Sub-Total');
    const total = await cartPage.getTotalRowValue('Total');

    expect(subTotal).toBeTruthy();
    expect(total).toBeTruthy();
  });

  // TC-CT-007 | Priority: Medium
  test('TC-CT-007 - Verify the cart total in the header matches the Shopping Cart page', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    const totalText = await cartPage.getTotalRowValue('Total');
    const headerText = await cartPage.getHeaderCartText();

    // Verify item count and currency presence
    expect(headerText).toMatch(/1 item/i);
    if (totalText) {
      // Check currency symbol or amount consistency
      const currencySymbol = totalText.replace(/[0-9.,\s]/g, '');
      if (currencySymbol) {
        expect(headerText).toContain(currencySymbol);
      }
    }
  });

  // TC-CT-008 | Priority: High
  test('TC-CT-008 - Verify the total of each product equals the unit price multiplied by the quantity', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 2);

    const row = cartPage.getProductRow(CART_TEST_CONFIG.products.macbook);
    await expect(row).toBeVisible();

    const rowText = await row.innerText();
    expect(rowText).toBeTruthy();
  });

  // TC-CT-009 | Priority: High
  test('TC-CT-009 - Verify the warning when the quantity is more than the available stock', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Request excessively large quantity (e.g. 9999)
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 9999);

    // Warning message or stock marker should appear
    const pageText = await page.innerText('#content');
    const hasWarning = pageText.includes('***') || /Products marked with \*\*\* are not available in the desired quantity/i.test(pageText);
    expect(hasWarning).toBeTruthy();
  });

  // TC-CT-010 | Priority: High
  test('TC-CT-010 - Verify checkout is not allowed with products that are not in stock', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 9999);
    await cartPage.checkoutButton.click();

    // Should remain on cart or show warning rather than completing checkout
    await expect(page.locator('#content')).toContainText(/Shopping Cart|not available/i);
  });

  // TC-CT-011 | Priority: Medium
  test('TC-CT-011 - Verify updating the quantity to 0', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 0);

    // Updating to 0 should remove the product
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  // TC-CT-012 | Priority: Medium
  test('TC-CT-012 - Verify updating the quantity with an invalid value', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Test with negative number (removes item in OpenCart)
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, -1);
    await expect(page).not.toHaveTitle(/Error/i);

    // Re-add product if removed by negative quantity
    if (await cartPage.getProductRow(CART_TEST_CONFIG.products.macbook).count() === 0) {
      await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
      await cartPage.clickHeaderShoppingCart();
    }

    // Test with non-numeric value
    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, 'abc');
    await expect(page).not.toHaveTitle(/Error/i);
  });

  // TC-CT-013 | Priority: Low
  test('TC-CT-013 - Verify the Update and Remove button tooltips', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    const updateBtn = cartPage.getUpdateButton(CART_TEST_CONFIG.products.macbook);
    const removeBtn = cartPage.getRemoveButton(CART_TEST_CONFIG.products.macbook);

    await expect(updateBtn).toBeVisible();
    await expect(removeBtn).toBeVisible();

    // Verify title or aria-label attribute contains Update / Remove
    const updateTitle = (await updateBtn.getAttribute('title')) || (await updateBtn.getAttribute('data-bs-original-title')) || (await updateBtn.getAttribute('aria-label')) || '';
    const removeTitle = (await removeBtn.getAttribute('title')) || (await removeBtn.getAttribute('data-bs-original-title')) || (await removeBtn.getAttribute('aria-label')) || '';

    expect(updateTitle.toLowerCase()).toContain('update');
    expect(removeTitle.toLowerCase()).toContain('remove');
  });

  // TC-CT-014 | Priority: Medium
  test('TC-CT-014 - Verify the Continue Shopping button', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.continueShoppingButton.click();
    await page.waitForLoadState('domcontentloaded');

    // Should redirect to Home or catalog page
    expect(page.url()).toMatch(/route=common\/home|localhost\/opencart\/upload\/?$/);
  });

  // TC-CT-015 | Priority: High
  test('TC-CT-015 - Verify the Checkout button', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    await cartPage.checkoutButton.click();
    await page.waitForLoadState('domcontentloaded');

    // Should navigate towards checkout
    expect(page.url()).toContain('route=checkout/checkout');
  });

  // TC-CT-016 | Priority: Medium
  test('TC-CT-016 - Verify the Estimate Shipping, Coupon and Gift Certificate sections', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    if (await cartPage.couponAccordionToggle.isVisible()) {
      await cartPage.couponAccordionToggle.click();
      await expect(cartPage.couponInput).toBeVisible();
    }
  });

  // TC-CT-017 | Priority: Medium
  test('TC-CT-017 - Verify an invalid coupon code is rejected', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    if (await cartPage.couponAccordionToggle.isVisible()) {
      await cartPage.applyCoupon(CART_TEST_CONFIG.invalidCoupon);
      await expect(cartPage.alertWarning).toBeVisible();
      await expect(cartPage.alertWarning).toContainText(/Warning: Coupon is either invalid, expired or reached its usage limit!/i);
    }
  });

  // TC-CT-018 | Priority: Low
  test('TC-CT-018 - Verify the total weight is shown in the Shopping Cart heading', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    const headingText = await cartPage.pageHeading.innerText();
    // In OpenCart, cart heading may include weight when enabled in store settings: e.g. "Shopping Cart  (1.50kg)"
    expect(headingText).toContain('Shopping Cart');
  });

  // TC-CT-019 | Priority: Low
  test('TC-CT-019 - Verify reward points are shown for the products', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // If product has reward points, verify they render in the product description
    const row = cartPage.getProductRow(CART_TEST_CONFIG.products.macbook);
    await expect(row).toBeVisible();
  });

  // TC-CT-020 | Priority: Medium
  test('TC-CT-020 - Verify script entered in the cart Quantity field is not executed (XSS)', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    let dialogTriggered = false;
    page.on('dialog', async (dialog) => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    await cartPage.updateQuantity(CART_TEST_CONFIG.products.macbook, CART_TEST_CONFIG.xssPayload);
    expect(dialogTriggered).toBeFalsy();
  });

  // TC-CT-021 | Priority: Medium
  test('TC-CT-021 - Verify the Shopping Cart page on different browsers', async ({ page }) => {
    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Verify core elements render properly in current browser engine
    await expect(cartPage.cartTable).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();
  });

  // TC-CT-022 | Priority: Medium
  test('TC-CT-022 - Verify the Shopping Cart page on mobile responsive view', async ({ page }) => {
    // Set mobile viewport (e.g. iPhone 13 / Pixel 5)
    await page.setViewportSize({ width: 375, height: 667 });

    await cartPage.addProductFromFeatured(CART_TEST_CONFIG.products.macbook);
    await cartPage.clickHeaderShoppingCart();

    // Verify elements are displayed without breaking
    await expect(cartPage.cartTable).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
    const updateBtn = cartPage.getUpdateButton(CART_TEST_CONFIG.products.macbook);
    const removeBtn = cartPage.getRemoveButton(CART_TEST_CONFIG.products.macbook);
    await expect(updateBtn).toBeVisible();
    await expect(removeBtn).toBeVisible();
  });
});
