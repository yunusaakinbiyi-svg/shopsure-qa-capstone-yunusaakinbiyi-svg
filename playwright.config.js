import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 300000, // the site can take minutes to load a page on a slow network, so each test gets 5 minutes
  expect: { timeout: 90000 }, // web-first assertions wait up to 90 seconds for an element to appear
  use: {
    baseURL: 'https://automationexercise.com',
    testIdAttribute: 'data-qa', // the site marks form fields with data-qa, not data-testid
    headless: true,
    navigationTimeout: 120000,
    actionTimeout: 60000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});