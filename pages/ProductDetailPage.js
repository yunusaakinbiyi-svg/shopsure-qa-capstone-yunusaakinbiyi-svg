import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);

    // CSS: the details block has no role or test id, so every detail below is searched inside it
    this.productInformation = page.locator('.product-information');
    this.productName = this.productInformation.getByRole('heading', { level: 2 });
    // CSS: category, availability, condition and brand are plain paragraphs, so we pick each by its label
    this.categoryText = this.productInformation.locator('p', { hasText: 'Category:' });
    this.priceText = this.productInformation.getByText(/Rs\. \d+/);
    this.availabilityText = this.productInformation.locator('p', { hasText: 'Availability:' });
    this.conditionText = this.productInformation.locator('p', { hasText: 'Condition:' });
    this.brandText = this.productInformation.locator('p', { hasText: 'Brand:' });

    this.quantityInput = this.productInformation.getByRole('spinbutton');
    this.addToCartButton = this.productInformation.getByRole('button', { name: 'Add to cart' });
    this.addedToCartConfirmation = page.getByText('Your product has been added to cart.');
  }

  async open(productId) {
    await this.blockAds();
    await this.navigateTo(`/product_details/${productId}`);
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifyName(expectedName) {
    await expect(this.productName).toHaveText(expectedName);
  }

  async verifyCategory(expectedCategory) {
    await expect(this.categoryText).toContainText(expectedCategory);
  }

  async verifyPrice(expectedPrice) {
    await expect(this.priceText).toHaveText(expectedPrice);
  }

  async verifyAvailability(expectedAvailability) {
    await expect(this.availabilityText).toContainText(expectedAvailability);
  }

  async verifyCondition(expectedCondition) {
    await expect(this.conditionText).toContainText(expectedCondition);
  }

  async verifyBrand(expectedBrand) {
    await expect(this.brandText).toContainText(expectedBrand);
  }

  async verifyAddedToCartConfirmation() {
    await expect(this.addedToCartConfirmation).toBeVisible();
  }
}