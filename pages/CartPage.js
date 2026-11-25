import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import cartPriceCalculator from '../utils/cartPriceCalculator.js';

const { parsePriceText, calculateCartTotal } = cartPriceCalculator;

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = '/view_cart';

    // CSS: the cart table has no role or test id, so rows and cells are found by the site's class names
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.lineTotalCells = page.locator('#cart_info_table .cart_total_price');
    this.emptyCartMessage = page.getByText('Cart is empty!');
  }

  async open() {
    await this.blockAds();
    await this.navigateTo(this.pagePath);
  }

  // The row of one product, found by the exact name in its link
  rowOf(productName) {
    return this.cartRows.filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
  }

  async removeProduct(productName) {
    // CSS: the delete button is an icon only, so it has no text or accessible name to target
    await this.rowOf(productName).locator('.cart_quantity_delete').click();
  }

  async verifyProductIsInCart(productName) {
    await expect(this.rowOf(productName)).toBeVisible();
  }

  async verifyProductIsNotInCart(productName) {
    await expect(this.rowOf(productName)).toHaveCount(0);
  }

  async verifyUnitPrice(productName, expectedPrice) {
    await expect(this.rowOf(productName).locator('.cart_price')).toHaveText(expectedPrice);
  }

  async verifyQuantity(productName, expectedQuantity) {
    await expect(this.rowOf(productName).locator('.cart_quantity')).toHaveText(String(expectedQuantity));
  }

  async verifyLineTotal(productName, expectedTotal) {
    await expect(this.rowOf(productName).locator('.cart_total')).toHaveText(`Rs. ${expectedTotal}`);
  }

  async verifyCartTotal(expectedTotal) {
    // The cart has no grand total row, so we add up the line totals the site shows.
    // Each shown line total already includes its quantity, so every item here counts once.
    await expect.poll(async () => {
      const lineTotalTexts = await this.lineTotalCells.allTextContents();
      return calculateCartTotal(lineTotalTexts.map((text) => ({ unitPrice: parsePriceText(text), quantity: 1 })));
    }).toBe(expectedTotal);
  }
}