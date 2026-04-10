from fastapi import FastAPI
from app.models import SurplusRequest, AllocationRequest, TaxRequest, BehavioralNudgeRequest
from app.services.decision_engine import DecisionEngine
from app.services.tax_optimizer import TaxOptimizer
from app.services.yfinance_service import YFinanceService

app = FastAPI(title="Investment Autopilot AI Services")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/decision/surplus")
def compute_surplus(req: SurplusRequest):
    surplus = DecisionEngine.compute_surplus(req)
    return {"investable_surplus": surplus}

@app.post("/decision/allocate")
def build_allocation(req: AllocationRequest):
    allocations = DecisionEngine.compute_allocation(req)
    return {"allocations": allocations}

@app.post("/decision/behavioral")
def get_nudge(req: BehavioralNudgeRequest):
    return DecisionEngine.generate_behavior_nudge(req)

@app.post("/tax/compute")
def compute_tax(req: TaxRequest):
    return TaxOptimizer.compute_regimes(req)

@app.get("/market/screener")
def get_market_data(symbols: str):
    """
    Pass symbols as a comma-separated string, e.g. 'INDA,SMIN,RELIANCE.NS'
    """
    sym_list = symbols.split(",")
    return YFinanceService.get_market_data(sym_list)

@app.get("/market/chart/{symbol}")
def get_market_chart(symbol: str, period: str = "1mo"):
    return YFinanceService.get_historical_chart(symbol, period)
