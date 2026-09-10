# CropMart Backend

AI-Powered Farm-to-Market Marketplace — FastAPI Backend

## Quick Start

```bash
# 1. Install dependencies
cd backend
pip install -r requirements.txt

# 2. Seed demo data
python -m app.seed

# 3. Start server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open `http://localhost:8000` in your browser — the frontend is served automatically.

## API Docs

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Demo Accounts

| Role     | Email                  | Password |
|----------|------------------------|----------|
| Farmer   | ramesh@cropmart.in     | demo123  |
| FPO      | nashikfpo@cropmart.in  | demo123  |
| Buyer    | freshmart@cropmart.in  | demo123  |
| Consumer | priya@cropmart.in      | demo123  |

## Environment Variables

| Variable                      | Default                                              | Description                     |
|-------------------------------|------------------------------------------------------|---------------------------------|
| `DATABASE_URL`                | `sqlite:///./cropmart.db`                            | SQLAlchemy database URL         |
| `JWT_SECRET`                  | `cropmart-super-secret-key-change-in-production-2026`| JWT signing secret              |
| `JWT_ALGORITHM`               | `HS256`                                              | JWT algorithm                   |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` (24h)                                         | Access token lifetime           |
| `DEBUG`                       | `true`                                               | Enable SQL logging              |

## API Endpoints

### Auth
- `POST /api/v1/auth/register` — Create account
- `POST /api/v1/auth/login` — Login, get JWT
- `POST /api/v1/auth/refresh` — Refresh token
- `GET /api/v1/auth/me` — Current user info

### Products
- `GET /api/v1/products` — List (filters: search, category, location, min_price, max_price, sort)
- `GET /api/v1/products/{id}` — Detail
- `POST /api/v1/products` — Create (farmer/FPO only)
- `PATCH /api/v1/products/{id}` — Update
- `DELETE /api/v1/products/{id}` — Delete

### Orders
- `POST /api/v1/orders/checkout` — Create order from cart
- `GET /api/v1/orders` — List my orders
- `GET /api/v1/orders/{id}` — Detail
- `PATCH /api/v1/orders/{id}/status` — Update status

### AI
- `GET /api/v1/ai/demand?crop=&location=` — Demand forecast
- `GET /api/v1/ai/price?crop=&location=` — Price intelligence
- `GET /api/v1/ai/match?product=&sort=` — Buyer matching
- `POST /api/v1/ai/route/optimize` — Route optimization

### Requirements
- `POST /api/v1/requirements` — Create bulk requirement
- `GET /api/v1/requirements` — List my requirements
- `GET /api/v1/requirements/{id}/matches` — Get matching farmers

### Health
- `GET /health` — Health check

## Tech Stack

- **Python 3.10+** with **FastAPI**
- **SQLAlchemy** ORM (SQLite for dev, PostgreSQL-ready)
- **JWT** auth with bcrypt password hashing
- **Pydantic** v2 for validation
- AI services: seeded statistical models (labeled "Prototype AI Prediction")
