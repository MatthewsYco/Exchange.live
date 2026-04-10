-- Initial Database Schema for AI Investment Autopilot (PostgreSQL)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Profile & Onboarding
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    kyc_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Behavioral Profile (Layer A)
CREATE TABLE user_behavior (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    volatility_tolerance_score NUMERIC(5, 2) NOT NULL,
    liquidity_sensitivity_score NUMERIC(5, 2) NOT NULL,
    control_preference VARCHAR(50) NOT NULL DEFAULT 'AUTO_WITH_APPROVAL',  -- FULL_AUTO, SUGGESTION_ONLY
    PRIMARY KEY(user_id)
);

-- Financial Context & Liquidity (Layer B)
CREATE TABLE user_financial_context (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    declared_salary NUMERIC(15, 2),
    estimated_weekly_surplus NUMERIC(15, 2) DEFAULT 0,
    current_cash_balance NUMERIC(15, 2),
    last_computed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

-- Live Transactions (Mocked AA Integration)
CREATE TABLE user_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- CREDIT, DEBIT
    category VARCHAR(100), -- from ML Model
    merchant_name VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset Library / Scraped from Yahoo Finance
CREATE TABLE market_assets (
    symbol VARCHAR(50) PRIMARY KEY,
    asset_type VARCHAR(50) NOT NULL, -- LIQUID_FUND, EQUITY, DEBT, HYBRID
    name VARCHAR(255) NOT NULL,
    current_price NUMERIC(15, 2),
    risk_score NUMERIC(5, 2),
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment Ledger / Executions (Layer D)
CREATE TABLE investment_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    asset_symbol VARCHAR(50) REFERENCES market_assets(symbol),
    amount_invested NUMERIC(15, 2) NOT NULL,
    units_bought NUMERIC(15, 4),
    trigger_source VARCHAR(100), -- SURPLUS_EVENT, SALARY_DAY, MANUAL
    status VARCHAR(50) DEFAULT 'COMPLETED', -- COMPLETED, FAILED, PAUSED
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nudges & Transparency (Layer E)
CREATE TABLE user_nudges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nudge_text TEXT NOT NULL,
    nudge_type VARCHAR(50), -- TAX_ALERT, SURPLUS_INVEST, BEHAVIORAL_PANIC
    status VARCHAR(20) DEFAULT 'UNREAD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tax Profile
CREATE TABLE user_tax_profile (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    regime_preference VARCHAR(20) DEFAULT 'COMPUTING', -- OLD, NEW
    deductions_80c NUMERIC(15, 2) DEFAULT 0,
    deductions_80d NUMERIC(15, 2) DEFAULT 0,
    hra_exemption NUMERIC(15, 2) DEFAULT 0,
    total_tax_liability NUMERIC(15, 2) DEFAULT 0,
    PRIMARY KEY(user_id)
);
