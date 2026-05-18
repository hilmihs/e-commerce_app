# Toko Nusa E-Commerce MVP

This repository has been rebuilt into two active applications:

- `frontend`: Next.js App Router storefront and admin UI.
- `backend`: Laravel API for products, guest checkout, Midtrans Snap payment, Midtrans webhook handling, RajaOngkir shipping quotes, PostgreSQL persistence, and Cloudflare R2 product images.

The old CRA and Express code remains in `e-commerce_app/` and `e-commerce_api/` as legacy reference material. New work should target `frontend/` and `backend/`.

## Local Setup

Frontend:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Default admin seed:

- Email: `admin@example.com`
- Password: `password`

## API

All API routes are under `/api/v1`.

Public:

- `GET /products`
- `GET /products/{slug}`
- `POST /shipping/quote`
- `POST /checkout`
- `GET /orders/{order_number}`
- `POST /payments/midtrans/webhook`

Admin:

- `POST /admin/login`
- `POST /admin/logout`
- `GET /admin/me`
- CRUD `/admin/products`
- `GET /admin/orders`
- `GET /admin/orders/{id}`
- `PATCH /admin/orders/{id}/status`

## Deployment Defaults

- Frontend: Vercel from `frontend/`.
- API: Render web service from `backend/` using `render.yaml`.
- Database: Neon PostgreSQL.
- Product images: Cloudflare R2 through Laravel's S3-compatible filesystem.

Production must set `APP_ENV=production`, `APP_DEBUG=false`, real Midtrans and RajaOngkir credentials, strict `FRONTEND_URL`, and separate sandbox/production payment keys.
