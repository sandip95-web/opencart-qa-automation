export const CART_TEST_CONFIG = {
  baseUrl: process.env.BASE_URL || 'http://localhost/opencart/upload',
  user: {
    email: 'sandy@gmail.com',
    password: 'sandy123',
  },
  products: {
    macbook: 'MacBook',
    iphone: 'iPhone',
    samsungTab: 'Samsung Galaxy Tab 10.1',
  },
  invalidCoupon: 'INVALID123',
  xssPayload: '<script>alert(1)</script>',
};
