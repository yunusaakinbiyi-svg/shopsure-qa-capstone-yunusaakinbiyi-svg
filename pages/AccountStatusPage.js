import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class AccountStatusPage extends BasePage {
  constructor(page) {
    super(page);

    this.accountCreatedHeading = page.getByRole('heading', { name: 'Account Created!' });
    this.accountDeletedHeading = page.getByRole('heading', { name: 'Account Deleted!' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async continueToHome() {
    await this.continueButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeading).toBeVisible();
  }
}