from pydantic import BaseModel
from typing import List, Optional

class BehaviorProfile(BaseModel):
    volatility_tolerance_score: float  # 0 to 1
    liquidity_sensitivity_score: float # 0 to 1

class SpendingTransaction(BaseModel):
    amount: float
    category: str
    is_essential: bool

class SurplusRequest(BaseModel):
    monthly_income: float
    recent_transactions: List[SpendingTransaction]
    current_balance: float

class AllocationRequest(BaseModel):
    surplus: float
    behavior: BehaviorProfile

class TaxRequest(BaseModel):
    salary: float
    investments_80c: float
    insurance_80d: float
    hra_exemption: float
    other_deductions: float = 0.0

class BehavioralNudgeRequest(BaseModel):
    days_since_last_investment: int
    market_drop_percentage: float
    behavior: BehaviorProfile
