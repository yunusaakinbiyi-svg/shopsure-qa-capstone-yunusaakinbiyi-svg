import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';
import { AccountStatusPage } from '../pages/AccountStatusPage.js';
import { HeaderComponent } from '../pages/HeaderComponent.js';
import TestDataGenerator from '../utils/TestDataGenerator.js';

test.describe('Registration', () => {
  let loginPage;
  let accountInformationPage;
  let accountStatusPage;
  let headerComponent;
  let accountWasCreated;

  test.beforeEach(async ({ page }) => {
    accountWasCreated = false;
    loginPage = new LoginPage(page);
    accountInformationPage = new AccountInformationPage(page);
    accountStatusPage = new AccountStatusPage(page);
    headerComponent = new HeaderComponent(page);
    await loginPage.open();
    await loginPage.verifyLoginFormIsVisible();
  });

  test.afterEach(async () => {
    // Clean up the account, but only if the signup really completed
    if (accountWasCreated) {
      await headerComponent.deleteAccount();
      await accountStatusPage.verifyAccountDeleted();
    }
  });

  // Flow 1
  test('new user can register and is then logged in', async () => {
    const userProfile = TestDataGenerator.generateUserProfile();

    await loginPage.startSignup(userProfile.name, userProfile.email);
    await accountInformationPage.verifyFormIsVisible();
    await accountInformationPage.fillAccountForm(userProfile);
    await accountInformationPage.submitForm();
    await accountStatusPage.verifyAccountCreated();
    accountWasCreated = true;
    await accountStatusPage.continueToHome();
    await headerComponent.verifyLoggedInAs(userProfile.name);
  });
});