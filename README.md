# ShopSure QA Capstone

## 1. Project overview

This project tests the ShopSure shopping site (https://automationexercise.com) at two levels:

- **API tests** with Postman and Newman: 16 requests covering products, brands, search and the full account lifecycle (create, read, update, delete, verify login).
- **UI tests** with Playwright and the Page Object Model: 9 end-to-end flows (register, login, logout, search, product details, cart totals and removing from the cart) that run on Chromium and Firefox.

The JavaScript utilities in `utils/` generate unique test users and calculate cart prices.

## 2. Tech stack and versions

| Tool | Version |
|---|---|
| Node.js | v24.21.0 |
| npm | 11.19.0 |
| Playwright (`@playwright/test`) | 1.65.1 |
| Newman | 6.2.3 |
| newman-reporter-htmlextra | 1.23.1 |
| Postman | desktop app (used to build and export the collection) |
| Browsers | Chromium and Firefox, installed by Playwright |

## 3. Prerequisites and installation

You need Node.js 20 or newer (this project was built on v24.21.0), npm and Git.

```bash
git clone https://github.com/yunusaakinbiyi-svg/shopsure-qa-capstone-yunusaakinbiyi-svg.git
cd shopsure-qa-capstone-yunusaakinbiyi-svg
npm install
npx playwright install chromium firefox
```

On Windows Git Bash, open the folder with its exact upper and lower case letters in the path. A wrong-case path can make Playwright load twice and fail.

## 4. How to run the Postman tests

**In the Postman app**

1. Import `postman/ShopSure-API.postman_collection.json` and `postman/shopsure.postman_environment.json`.
2. Select the `shopsure` environment (top right).
3. Open the collection, click **Run**, and run all requests in order. The Account Lifecycle folder is a chained flow, so keep its order.

**With Newman (command line)**

```bash
npm run test:api
```

This runs the same command as:

```bash
npx newman run postman/ShopSure-API.postman_collection.json \
 -e postman/shopsure.postman_environment.json \
 -r cli,htmlextra \
 --reporter-htmlextra-export reports/newman/shopsure-api-report.html
```

The HTML report is saved to `reports/newman/shopsure-api-report.html`.

## 5. How to run the Playwright tests

| What | Command |
|---|---|
| All tests, both browsers | `npm test` |
| One browser only | `npm run test:chromium` or `npm run test:firefox` |
| Watch the browser (headed) | `npm run test:headed` |
| Open the HTML report | `npm run report` |
| One test file | `npx playwright test tests/cart.spec.js` |

Notes:

- The site can be slow to load, so the config uses long timeouts, one worker and one retry. A test that passes on its retry is shown as "flaky" in the report.
- The login flows use a pre-registered test account stored in `test-data/registeredUser.json`. If that account stops working, register a new one on the site and update the file.
- The report server stops with Ctrl+C.

## 6. Folder structure

```
.
├── docs/
│   └── api-review-notes.md
├── pages/                         Page Object Model classes
│   ├── AccountInformationPage.js
│   ├── AccountStatusPage.js
│   ├── BasePage.js
│   ├── CartPage.js
│   ├── HeaderComponent.js
│   ├── LoginPage.js
│   ├── ProductDetailPage.js
│   └── ProductsPage.js
├── postman/
│   ├── ShopSure-API.postman_collection.json
│   ├── shopsure.postman_environment.json
│   └── api-review.md
├── reports/
│   ├── collection-runner-result.png
│   └── newman/                    Newman HTML and JSON reports
├── test-data/
│   ├── products.json
│   ├── registeredUser.json
│   └── signup-options.json
├── tests/                         Playwright specs (no locators here)
│   ├── auth.spec.js
│   ├── cart.spec.js
│   ├── products.spec.js
│   └── register.spec.js
├── utils/
│   ├── TestDataGenerator.js
│   └── cartPriceCalculator.js
├── playwright.config.js
├── package.json
└── README.md
```

## 7. Test coverage summary

**API (Postman and Newman)**

- 16 requests in 4 folders: Products, Brands, Search and Account Lifecycle.
- 61 assertions on status, response body and headers.
- A chained account-lifecycle flow (create account, get details, update, delete, verify login) that uses a unique email on every run.

**UI (Playwright, Chromium and Firefox)**

| # | Flow | Type | Spec file |
|---|---|---|---|
| 1 | Register a new user (account deleted afterwards) | Positive | `tests/register.spec.js` |
| 2 | Login with valid details | Positive | `tests/auth.spec.js` |
| 3 | Login with a wrong password | Negative | `tests/auth.spec.js` |
| 4 | Signup with an existing email | Negative | `tests/auth.spec.js` |
| 5 | Logout | Positive | `tests/auth.spec.js` |
| 6 | Search for a product | Positive | `tests/products.spec.js` |
| 7 | View product details | Positive | `tests/products.spec.js` |
| 8 | Add two products (one with quantity 3) and check line and cart totals | Positive | `tests/cart.spec.js` |
| 9 | Remove a product from the cart | Negative | `tests/cart.spec.js` |

## 8. Findings

- API: every request returns HTTP 200, even for errors, and the real status is only in the response body (`responseCode`).
- API: the responses have the content type `text/html` although the body is JSON.
- UI: signing up with an existing email shows "Email Address already exist!", which is grammatically wrong ("exists").
- UI: searching for "dress" returns products whose names do not contain the search term, so the search also matches on other fields.