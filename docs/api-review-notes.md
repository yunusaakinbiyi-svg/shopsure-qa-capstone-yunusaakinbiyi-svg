# API Review Notes

## Overview
- API under test: ShopSure API (base URL: https://automationexercise.com)
- Tools: Postman collection, run with Newman
- Date of run: 2026-11-21
- Scope: 8 endpoints, each with one positive and one negative request (16 requests)

## Newman result
- Requests: 16, Assertions: 11, Failed: 0
- Command: npx newman run postman/shopsure.postman_collection.json -e "postman/ShopSure.postman_environment (1).json" --delay-request 500 -r cli,json --reporter-json-export reports/newman/newman-report.json

## Endpoints reviewed

| Endpoint | Method (positive / negative) | Positive result | Negative result |
|---|---|---|---|
| productsList | GET / POST | 200 OK, product list returned | HTTP 200, body responseCode 405 "This request method is not supported." |
| brandsList | GET / PUT | 200 OK, list of brands returned | HTTP 200, body responseCode 405 "This request method is not supported." |
| searchProduct | POST / POST | 200 OK, matching products returned | HTTP 200, body responseCode 400 "Bad request, search_product parameter is missing in POST request." |
| createAccount | POST / POST | 201 OK, User created | HTTP 200, body responseCode 400 "Bad request, password parameter is missing in POST request." |
| verifyLogin | POST / POST | 200 OK, User exists! | HTTP 200, body responseCode 404 "User not found!" |
| getUserDetailByEmail | GET / GET | 200 OK, User email details returned | HTTP 200, body responseCode 404 "Account not found with this email, try another email!" |
| updateAccount | PUT / PUT | 200 OK, User updated! | HTTP 200, body responseCode 404 "Account not found!" |
| deleteAccount | DELETE / DELETE | 200 OK, Account deleted! | HTTP 200, body responseCode 404 "Account not found!" |

## Findings
- All 8 negative requests return HTTP 200 OK while the body reports an error, so clients that trust the HTTP status will treat failures as success.
- POST /api/productsList and PUT /api/brandsList return HTTP 200 with responseCode 405 in the body instead of a real 405 Method Not Allowed.
- POST /api/searchProduct and POST /api/createAccount with a missing required parameter return HTTP 200 with responseCode 400 in the body instead of a real 400.
- POST /api/verifyLogin, GET /api/getUserDetailByEmail, PUT /api/updateAccount and DELETE /api/deleteAccount for an unknown account return HTTP 200 with responseCode 404 in the body instead of a real 404.
- The same "not found" condition uses different wording across endpoints: "User not found!", "Account not found with this email, try another email!" and "Account not found!".
- The existing negative tests only assert HTTP status 200, so they pass even though the API rejected the request; they do not check the responseCode in the body.
- Response times varied from 364 ms to 2.9 s in the Newman run (average 739 ms).
- Responses contain JSON but are sent with Content-Type text/html; charset=utf-8, so clients cannot rely on the header to detect JSON.

## Notes
- Error messages are descriptive and name the missing parameter (for example search_product and password).
- Test data in the environment file is made-up and safe to share.