import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = '/products';

    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.searchInput = page.getByPlaceholder('Search Product');
    // CSS: the search button only has an icon, so it has no text or accessible name to target
    this.searchButton = page.locator('#submit_search');
    // CSS: product cards have no role or test id, so we target the product name text inside each card
    this.productNames = page.locator('.features_items .productinfo p');
    // CSS: one wrapper per product card; the "View Product" link is searched inside it
    this.productCards = page.locator('.features_items .product-image-wrapper');
  }

  async open() {
    await this.blockAds();
    await this.navigateTo(this.pagePath);
  }

  async enterSearchTerm(searchTerm) {
    await this.searchInput.fill(searchTerm);
  }

  async submitSearch() {
    await this.searchButton.click();
  }

  async searchFor(searchTerm) {
    await this.enterSearchTerm(searchTerm);
    await this.submitSearch();
  }

  async openProductDetails(productName) {
    const productCard = this.productCards.filter({ has: this.page.getByText(productName, { exact: true }) });
    await productCard.getByRole('link', { name: 'View Product' }).click();
  }

  async verifyAllProductsHeadingIsVisible() {
    await expect(this.allProductsHeading).toBeVisible();
  }

  async verifySearchedProductsHeadingIsVisible() {
    await expect(this.searchedProductsHeading).toBeVisible();
  }

  async verifyResultsAreShown() {
    await expect(this.productNames.first()).toBeVisible();
  }

  async verifyEveryResultContains(searchTerm) {
    // No result may be left once the names that contain the term are removed
    await expect(this.productNames.filter({ hasNotText: new RegExp(searchTerm, 'i') })).toHaveCount(0);
  }
}