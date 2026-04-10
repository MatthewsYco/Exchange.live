from app.models import SurplusRequest, AllocationRequest, BehavioralNudgeRequest
from typing import Dict, List

class DecisionEngine:
    @staticmethod
    def compute_surplus(req: SurplusRequest) -> float:
        """ Sub-Engine: Detects real-time investable capital """
        spent_so_far = sum([t.amount for t in req.recent_transactions])
        buffer = req.monthly_income * 0.20 # Keep 20% as buffer
        surplus = req.current_balance - buffer
        
        # If surplus is negative, we can't invest
        return round(max(0.0, surplus), 2)
        
    @staticmethod
    def compute_allocation(req: AllocationRequest) -> List[Dict]:
        """ 
        Sub-Engine: Instrument Selection.
        Allocates surplus across assets based on behavior profile.
        """
        # Instruments mapping to Yahoo finance symbols (ETFs / mutual funds available on yfinance)
        # We use some generic ETF proxies for India available on YF:
        # INDA (iShares MSCI India ETF) -> Equity proxy
        # SMIN (iShares MSCI India Small-Cap) -> Aggressive Equity proxy
        
        liquid = 0.0
        equity = 0.0
        
        # High tolerance -> more equity
        equity_pct = req.behavior.volatility_tolerance_score * 0.8
        liquid_pct = 1.0 - equity_pct
        
        # Further refine based on liquidity sensitivity
        if req.behavior.liquidity_sensitivity_score > 0.7:
            liquid_pct += 0.2
            equity_pct -= 0.2
            
        liquid_pct = max(0, min(1, liquid_pct))
        equity_pct = max(0, min(1, equity_pct))
        
        return [
            {"asset": "LIQUID_DEBT_PROXY", "peso": round(liquid_pct, 2), "amount": round(liquid_pct * req.surplus, 2)},
            {"asset": "INDA", "peso": round(equity_pct, 2), "amount": round(equity_pct * req.surplus, 2)}
        ]

    @staticmethod
    def generate_behavior_nudge(req: BehavioralNudgeRequest) -> Dict:
        """ Sub-Engine: Behavioral Consistency Generator """
        text = "You are on track."
        action = "CONTINUE"
        
        if req.days_since_last_investment > 14:
            text = f"You paused for {req.days_since_last_investment} days. Start small: resume with ₹500?"
            action = "NUDGE_RESUME"
            
        if req.market_drop_percentage > 2.0 and req.behavior.volatility_tolerance_score < 0.5:
            text = "Market dip detected. Your portfolio is built for this. Keep auto-investing to buy cheaper."
            action = "NUDGE_REASSURE"
            
        return {
            "nudge_text": text,
            "recommended_action": action
        }
