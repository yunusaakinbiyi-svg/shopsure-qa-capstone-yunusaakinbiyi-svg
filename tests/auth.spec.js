import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HeaderComponent } from '../pages/HeaderComponent.js';
import registeredUser from '../test-data/registeredUser.json' with { type: 'json' };

test.describe('Login', () => {
  let loginPage;
  let headerComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerComponent = new HeaderComponent(page);
    await loginPage.open();
    await loginPage.verifyLoginFormIsVisible();
  });

  test('registered user can log in with valid email and password', async () => {
    await loginPage.loginWithCredentials(registeredUser.email, registeredUser.password);
    await headerComponent.verifyLoggedInAs(registeredUser.name);
  });
});