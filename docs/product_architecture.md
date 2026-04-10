# AI-Powered Investment Autopilot - Product Architecture

## 1. Core Thesis
An AI-powered Investment Autopilot for India aimed at removing decision fatigue and behavioral inconsistency by automating investing based on real-time financial tracking and behavioral profiling.

## 2. The 5-Layer Architecture

### Layer A: User Onboarding Layer
- **Auth**: Mobile OTP authentication.
- **Bank Linking**: Integration with Account Aggregators (AAs) and UPI.
- **Behavioral Profiling**: Capture `volatility_tolerance_score` and `liquidity_sensitivity_score` via mandatory quiz.
- **Control Preferences**: FULL_AUTO, AUTO_WITH_APPROVAL, SUGGESTION_ONLY.

### Layer B: Financial Data & Context Layer
- **Inputs**: Salary credits, freelance income, spending transactions, bank balances.
- **Categorization Engine**: ML & Rule-based system for merchant tagging.
- **Surplus Detection**: Real-time evaluation of `available_to_invest_amount`.

### Layer C: AI Decision Engine (Core)
- **Sub-Engine 1 (Allocation)**: Calculate capital distribution based on surplus, expenses, and balance.
- **Sub-Engine 2 (Instrument Selection)**: Allocate only to safe avenues (Liquid funds, Ultra-short debt, Hybrid funds, Conservative equity).
- **Sub-Engine 3 (Behavioral)**: Generate consistency nudges overriding basic return chasing.

### Layer D: Execution & Investment Layer
- **Auto-invest Triggers**: Salary day logic, high-surplus triggers.
- **Micro-investments**: Round-ups and dynamic SIP execution.
- **Safety**: Auto-pause on low liquidity or abnormal spending spikes.

### Layer E: Experience & Trust Layer
- **Transparency Engine**: Explanatory logs for every automated action.
- **Dashboard**: Complete visibility into growth UI, limits, tax options, and future simulations.
- **Market Interface (Yahoo Finance)**: Replica of standard stock performance for manual user insights.

## 3. Tax Optimization Layer
Evaluate Old vs New regimes based on Section 80C, 80D, etc. Drives investments into ELSS explicitly to save tax.

## 4. MVP vs Full Plan
- **MVP**:
  - Auto-allocation rules (no complex ML models yet).
  - Basic Tax calculator.
  - Basic Yahoo finance fetcher (Daily limits).
- **Full**:
  - Live Real-time adaptation.
  - Production grade ML Categorization Engine.
  - Kafka Events driving every micro-decision.
