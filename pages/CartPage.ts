import { Page } from '@playwright/test';
import { CART_TEST_CONFIG } from '../test-data/cart-data';

export function createCartPage(page: Page, baseUrl: string = CART_TEST_CONFIG.baseUrl) {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  const headerCartButton = page.locator('#cart button.dropdown-toggle');
  const headerCartLink = page.locator('nav#top a[href*="checkout/cart"]');
  const searchInput = page.locator('header input[name="search"]');
  const searchButton = page.locator('header form:has(input[name="search"]) button');
  const currencyDropdown = page.locator('#form-currency .dropdown-toggle');

  const breadcrumb = page.locator('ul.breadcrumb');
  const pageHeading = page.locator('#content h1');

  const cartTable = page.locator('#shopping-cart table');
  const tableHeaders = cartTable.locator('thead th');
  const emptyCartMessage = page.locator('#shopping-cart p').filter({ hasText: 'Your shopping cart is empty!' });

  const continueShoppingButton = page.locator('#shopping-cart a:has-text("Continue Shopping"), #shopping-cart a.btn-light');
  const checkoutButton = page.locator('#shopping-cart a:has-text("Checkout")');

  const accordionSection = page.locator('#accordion');
  const shippingAccordionToggle = page.locator('#accordion button[data-bs-target*="shipping"]');
  const couponAccordionToggle = page.locator('#accordion button[data-bs-target="#collapse-coupon"]');
  const couponInput = page.locator('#input-coupon');
  const applyCouponButton = page.locator('button:has-text("Apply Coupon")');
  const voucherAccordionToggle = page.locator('#accordion button[data-bs-target*="voucher"]');
  const voucherInput = page.locator('#input-voucher');
  const applyVoucherButton = page.locator('button:has-text("Apply Gift Certificate")');

  const alertSuccess = page.locator('#alert .alert-success');
  const alertWarning = page.locator('#alert .alert-danger, #alert .alert-warning');

  const goto = async () => {
    await page.goto(`${cleanBaseUrl}/index.php?route=checkout/cart&language=en-gb`);
  };

  const gotoHome = async () => {
    await page.goto(`${cleanBaseUrl}/index.php?route=common/home&language=en-gb`);
  };

  const selectCurrency = async (currencyName: string) => {
    await currencyDropdown.click();
    const option = page.locator('#form-currency .dropdown-item', { hasText: currencyName });
    await option.click();
    await page.waitForTimeout(600);
  };

  const searchAndAddToCart = async (productName: string) => {
    await searchInput.fill(productName);
    await searchButton.click();
    await page.waitForLoadState('domcontentloaded');

    const productCard = page.locator('.product-thumb', { hasText: productName }).first();
    const addToCartBtn = productCard.locator('button[type="submit"], button:has(.fa-shopping-cart)').first();
    await addToCartBtn.click();
    await page.waitForTimeout(1000);
  };

  const addProductFromFeatured = async (productName: string) => {
    await gotoHome();
    const productCard = page.locator('.product-thumb', { hasText: productName }).first();
    const addToCartBtn = productCard.locator('button[type="submit"], button:has(.fa-shopping-cart)').first();
    await addToCartBtn.click();
    await page.waitForTimeout(1000);
  };

  const clickHeaderShoppingCart = async () => {
    await headerCartLink.click();
    await page.waitForLoadState('domcontentloaded');
  };

  const getProductRow = (productName: string) => {
    return cartTable.locator('tbody tr', { hasText: productName }).first();
  };

  const clickProductName = async (productName: string) => {
    const row = getProductRow(productName);
    await row.locator('td.text-start a, td a', { hasText: productName }).first().click();
  };

  const getQuantityInput = (productName: string) => {
    return getProductRow(productName).locator('input[name="quantity"]');
  };

  const getUpdateButton = (productName: string) => {
    return getProductRow(productName).locator('button[title="Update"], button[formaction*="cart.edit"]').first();
  };

  const getRemoveButton = (productName: string) => {
    return getProductRow(productName).locator('a[title="Remove"], a[href*="cart.remove"], .btn-danger').first();
  };

  const updateQuantity = async (productName: string, newQuantity: string | number) => {
    const input = getQuantityInput(productName);
    await input.fill(String(newQuantity));
    await getUpdateButton(productName).click();
    await page.waitForLoadState('networkidle');
  };

  const removeProduct = async (productName: string) => {
    await getRemoveButton(productName).click();
    await page.waitForLoadState('networkidle');
  };

  const hasOutOfStockMarker = async (productName: string) => {
    const row = getProductRow(productName);
    const text = await row.innerText();
    return text.includes('***');
  };

  const getTotalRowValue = async (label: string) => {
    const row = page.locator(`#checkout-total tr:has(strong:has-text("${label}")), tr:has(td:has-text("${label}"))`).last();
    const cell = row.locator('td').last();
    return (await cell.innerText()).trim();
  };

  const getHeaderCartText = async () => {
    return (await headerCartButton.innerText()).trim();
  };

  const clearCartIfNotEmpty = async () => {
    await goto();
    while (await cartTable.isVisible()) {
      const removeBtn = cartTable.locator('a[title="Remove"], a[href*="cart.remove"], .btn-danger').first();
      if (await removeBtn.isVisible()) {
        await removeBtn.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(800);
      } else {
        break;
      }
    }
  };

  const applyCoupon = async (code: string) => {
    if (await couponAccordionToggle.isVisible()) {
      await couponAccordionToggle.click();
    }
    await couponInput.fill(code);
    await applyCouponButton.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(800);
  };

  return {
    headerCartButton,
    headerCartLink,
    searchInput,
    searchButton,
    currencyDropdown,
    breadcrumb,
    pageHeading,
    cartTable,
    tableHeaders,
    emptyCartMessage,
    continueShoppingButton,
    checkoutButton,
    accordionSection,
    shippingAccordionToggle,
    couponAccordionToggle,
    couponInput,
    applyCouponButton,
    voucherAccordionToggle,
    voucherInput,
    applyVoucherButton,
    alertSuccess,
    alertWarning,
    goto,
    gotoHome,
    selectCurrency,
    searchAndAddToCart,
    addProductFromFeatured,
    clickHeaderShoppingCart,
    getProductRow,
    clickProductName,
    getQuantityInput,
    getUpdateButton,
    getRemoveButton,
    updateQuantity,
    removeProduct,
    hasOutOfStockMarker,
    getTotalRowValue,
    getHeaderCartText,
    clearCartIfNotEmpty,
    applyCoupon,
  };
}

export type CartPage = ReturnType<typeof createCartPage>;
