import { test } from '@playwright/test';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CartPage } from '../pages/CartPage.js';
import cartPriceCalculator from '../utils/cartPriceCalculator.js';
import productData from '../test-data/products.json' with { type: 'json' };

const { parsePriceText, calculateLineTotal, calculateCartTotal } = cartPriceCalculator;
const { cartProducts } = productData;

test.describe('Cart', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);

    for (const product of cartProducts) {
      await productDetailPage.open(product.id);
      await productDetailPage.setQuantity(product.quantity);
      await productDetailPage.addToCart();
      // wait for the confirmation so the product is really in the cart before we leave the page
      await productDetailPage.verifyAddedToCartConfirmation();
    }
    await cartPage.open();
  });

  // Flow 8
  test('cart shows the right line total for each product and the right cart total', async () => {
    for (const product of cartProducts) {
      const unitPrice = parsePriceText(product.price);
      await cartPage.verifyProductIsInCart(product.name);
      await cartPage.verifyUnitPrice(product.name, product.price);
      await cartPage.verifyQuantity(product.name, product.quantity);
      await cartPage.verifyLineTotal(product.name, calculateLineTotal(unitPrice, product.quantity));
    }

    const expectedItems = cartProducts.map((product) => ({
      unitPrice: parsePriceText(product.price),
      quantity: product.quantity,
    }));
    await cartPage.verifyCartTotal(calculateCartTotal(expectedItems));
  });

  // Flow 9 (negative)
  test('removing a product from the cart leaves only the other product', async () => {
    const [removedProduct, keptProduct] = cartProducts;
    await cartPage.removeProduct(removedProduct.name);
    await cartPage.verifyProductIsNotInCart(removedProduct.name);
    await cartPage.verifyProductIsInCart(keptProduct.name);
  });
});