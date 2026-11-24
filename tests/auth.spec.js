import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HeaderComponent } from '../pages/HeaderComponent.js';
import registeredUser from '../test-data/registeredUser.json' with { type: 'json' };

test.describe('Authentication', () => {
  let loginPage;
  let headerComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerComponent = new HeaderComponent(page);
    await loginPage.open();
    await loginPage.verifyLoginFormIsVisible();
  });

  // Flow 2
  test('registered user can log in with valid email and password', async () => {
    await loginPage.loginWithCredentials(registeredUser.email, registeredUser.password);
    await headerComponent.verifyLoggedInAs(registeredUser.name);
  });

  // Flow 3 (negative)
  test('login with a wrong password shows an error and stays on the login page', async () => {
    await loginPage.loginWithCredentials(registeredUser.email, registeredUser.wrongPassword);
    await loginPage.verifyLoginErrorIsVisible();
    await loginPage.verifyStillOnLoginPage();
  });

  // Flow 4 (negative)
  test('signup with an email that is already registered shows an error', async () => {
    await loginPage.startSignup(registeredUser.name, registeredUser.email);
    await loginPage.verifyExistingEmailErrorIsVisible();
  });

  // Flow 5
  test.describe('Logout', () => {
    test.beforeEach(async () => {
      await loginPage.loginWithCredentials(registeredUser.email, registeredUser.password);
      await headerComponent.verifyLoggedInAs(registeredUser.name);
    });

    test('logged in user can log out and returns to the login page', async () => {
      await headerComponent.logout();
      await loginPage.verifyLoginFormIsVisible();
      await loginPage.verifyStillOnLoginPage();
    });
  });
});