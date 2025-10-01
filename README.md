# Snagzy API

- This project is a read-only REST-style HTTP API and ndpoints return JSON responses.
- Deployed to both Render and Railway on their free tiers. Free tiers often have limitations such as limited concurrency, rate limits, and periodic sleeping of inactive services.
- On Render's free plan the service may go to sleep after inactivity. When that happens the first request will trigger a cold start and the app may take some time to wake — it can sometimes take around 1–5 minutes (occasionally longer) before the app responds.
- Railway's free plan may also have resource limits and less predictable cold-start behavior depending on your plan and region.
- For testing: if a request to Render fails the first time, wait a minute or two and retry — the service is likely waking up.

# Endpoints

Base URL: `/api/v1`

All endpoints are mounted under `/api/v1` in `server/index.js`.

## Tech stack

- Node.js (ES modules)
- Express (routing and middleware)
- MongoDB Atlas with Mongoose ODM
- Middleware: `cors`, `helmet`, `morgan`, `express-rate-limit`
- Environment config via `dotenv`

## Local development

- Recommended Node version: 18.x or newer
- Install dependencies:

```bash
npm install
```

- Run locally in development mode (auto-restarts):

```bash
npm run dev
```

- Run the server in production mode:

```bash
npm start
```

- Seed data scripts are available in `package.json` (e.g., `npm run seed:users`).

## Deployments

- Render: https://snagzy-api.onrender.com/
- Railway: https://snagzy-api-production.up.railway.app/

These are the public deployment URLs for this API. If you deployed to both platforms, ensure each environment's `MONGO_URI` (and other env vars) are set correctly in the platform settings and that Atlas Network Access includes the platform's outbound IP(s) (or 0.0.0.0/0 for testing).

## Quick example

Get all products (Render):

```bash
curl -s https://snagzy-api.onrender.com/api/v1/products/
```

Get all products (Railway):

```bash
curl -s https://snagzy-api-production.up.railway.app/api/v1/products/
```

Get orders by buyer (Render):

```bash
curl -s https://snagzy-api.onrender.com/api/v1/orders/buyer/people15428116hinbtegp
```

Get orders by buyer (Railway):

```bash
curl -s https://snagzy-api-production.up.railway.app/api/v1/orders/buyer/people15428116hinbtegp

## Users

- GET `/api/v1/users/`
  - Description: Get all users

- GET `/api/v1/users/:id`
  - Description: Get user by ID

- GET `/api/v1/users/gender/:gender`
  - Description: Get users by gender

## Products

- GET `/api/v1/products/`
  - Description: Get all products

- GET `/api/v1/products/:id`
  - Description: Get product by ID

- GET `/api/v1/products/store/:storeId`
  - Description: Get all products for a given `storeId`

- GET `/api/v1/products/owner/:ownerId`
  - Description: Get all products for a given `ownerId`

## Categories

- GET `/api/v1/categories/`
  - Description: Get all categories

- GET `/api/v1/categories/:id`
  - Description: Get category by ID

## Variants

- GET `/api/v1/variants/`
  - Description: Get all variants

- GET `/api/v1/variants/:id`
  - Description: Get variant by ID

## Tags

- GET `/api/v1/tags/`
  - Description: Get all tags

- GET `/api/v1/tags/:id`
  - Description: Get tag by ID

## Stores

- GET `/api/v1/stores/`
  - Description: Get all stores

- GET `/api/v1/stores/:id`
  - Description: Get store by ID

- GET `/api/v1/stores/owner/:ownerId`
  - Description: Get stores for a given `ownerId`

## Orders

- GET `/api/v1/orders/`
  - Description: Get all orders

- GET `/api/v1/orders/:id`
  - Description: Get order by ID

- GET `/api/v1/orders/buyer/:buyerId`
  - Description: Get orders for a given `buyerId`

- GET `/api/v1/orders/product/:productId`
  - Description: Get orders that include a given `productId` in `items` array

- GET `/api/v1/orders/status/:status`
  - Description: Get orders by `status` field

- GET `/api/v1/orders/payment-status/:paymentStatus`
  - Description: Get orders by `paymentStatus` field

## Notes

- All endpoints are read-only (GET) in the current routes.
- Responses are JSON. Errors respond with a 500 and `{ message: err.message }` or 404 when not found.
- If you want POST/PUT/DELETE endpoints, they are not implemented in the current routes and will need to be added.
```
