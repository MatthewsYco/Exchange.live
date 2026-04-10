# System Design & Tech Stack

## 1. Microservices Breakdown
We adopt a microservice approach over a monorepo for independent scaling and failure isolation.

1. **Frontend Service (Next.js)**: Responsible for UI, SSR, communicating via the API Gateway.
2. **Core API / Backend (NestJS)**: The main data orchestrator, holding users, preferences, processing transactions, calling AI engines.
3. **AI Services API (FastAPI)**: Running Python ML models. Endpoints compute allocations, handle Yahoo finance integrations, classify ML transactions, and compute the tax algorithms.

## 2. Technologies
- **Frontend**: Next.js, React, TailwindCSS, TypeScript.
- **Backend Core**: NestJS, Node.js, TypeScript.
- **AI Backend**: Python, FastAPI, Pandas, yfinance, scikit-learn.
- **Database**: PostgreSQL (Relational Core), Redis (Caching & Job Queues).
- **Event Bus**: Apache Kafka (for financial events and auto-invest triggers).

## 3. Event System (Kafka Topics)
- `evt_bank_transaction`: Ingested whenever a new transaction is pulled from banking APIs.
- `evt_compute_surplus`: Triggers AI layer to recalculate surplus.
- `evt_nudge_generated`: AI emitted behavioral nudges.
- `evt_execute_invest`: Core engine deciding to actually place an order.

## 4. Data Pipelines
- The **Ingestion pipeline**: Fetches historical data from `yfinance` daily (CRON) into Redis/Postgres for caching.
- The **Bank sync pipeline**: Syncs via Account Aggregator. Cleans and publishes to Kafka.

## 5. Security & Compliance (SEBI)
- Encryption AT REST (AES-256) for PII and bank credentials.
- In-transit TLS.
- Granular Audit Logs for EVERY trade/nudge.
- Disclaimers integrated strictly into the UI via the Trust Layer.

## 6. Deployment Setup (Docker & Cloud)
- Use Docker Compose for local orchestration.
- Prod deployment relies on AWS ECS / EKS with Auto-Scaling Groups.
- Postgres managed (RDS), Kafka managed (MSK), Redis managed (ElastiCache).
