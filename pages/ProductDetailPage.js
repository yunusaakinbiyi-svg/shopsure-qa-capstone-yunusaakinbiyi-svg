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
}