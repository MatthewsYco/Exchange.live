# API Routes

## NestJS (Core Backend API)
Base URL: `/api/v1`

### 1. User & Auth
- `POST /auth/otp`: Generate OTP.
- `POST /auth/verify`: Verify OTP, returns JWT.
- `GET /users/me`: Fetch user profile.
- `POST /users/behavior`: Save behavioral profile questionnaire matrix.

### 2. Bank & Transactions
- `POST /bank/sync`: Trigger Account Aggregator sync.
- `GET /transactions`: List categorized transactions.

### 3. Investment & Execution
- `POST /invest/execute`: Manually trigger an investment.
- `GET /invest/portfolio`: View current holdings.

### 4. Experience & Nudges
- `GET /nudges`: Retrieve transparency log explaining why actions were taken.
- `POST /nudges/:id/read`: Mark nudge read.

---

## FastAPI (AI Services API)
Base URL: `/ai/v1`

### 1. Decision Engine
- `POST /decision/surplus`: Input recent spending array -> outputs investable surplus amount.
- `POST /decision/allocate`: Implements Sub-Engine 1 & 2. Input context -> Returns Asset Symbol & amount mix.
- `POST /decision/behavioral`: Sub-Engine 3. Input actions -> Returns nudge texts (e.g. "Market dip detected").

### 2. Tax Optimizer
- `POST /tax/compute`: Input salary, investments, 80C, etc. -> Returns mapping of Old vs New regime efficiency and recommended ELSS.

### 3. Yahoo Finance Integrator
- `GET /market/screener`: Fetch market symbols from yfinance.
- `GET /market/price/:symbol`: Realtime price query from yfinance cache.
- `GET /market/history/:symbol`: Timeseries data for charting (e.g., 1mo, 1y).
