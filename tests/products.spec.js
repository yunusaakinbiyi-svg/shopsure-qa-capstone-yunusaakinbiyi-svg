import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import productData from '../test-data/products.json' with { type: 'json' };

test.describe('Products', () => {
  let productsPage;
  let productDetailPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
    await productsPage.open();
    await productsPage.verifyAllProductsHeadingIsVisible();
  });

  // Flow 6
  test('searching for a product shows only products whose name contains the search term', async () => {
    await productsPage.searchFor(productData.searchTerm);
    await productsPage.verifySearchedProductsHeadingIsVisible();
    await productsPage.verifyResultsAreShown();
    await productsPage.verifyEveryResultContains(productData.searchTerm);
  });

  // Flow 7
  test('product details page shows name, category, price, availability, condition and brand', async () => {
    const { name, category, price, availability, condition, brand } = productData.detailProduct;
    await productsPage.openProductDetails(name);
    await productDetailPage.verifyName(name);
    await productDetailPage.verifyCategory(category);
    await productDetailPage.verifyPrice(price);
    await productDetailPage.verifyAvailability(availability);
    await productDetailPage.verifyCondition(condition);
    await productDetailPage.verifyBrand(brand);
  });
});