from app.models import TaxRequest
from typing import Dict

class TaxOptimizer:
    @staticmethod
    def compute_regimes(req: TaxRequest) -> Dict:
        """
        Computes Indian Tax for Old verses New Regime (simplified logic for 2024-25).
        Optimizes whether the user should invest more in ELSS.
        """
        standard_deduction = 50000
        
        # OLD REGIME
        total_deduction_old = standard_deduction + req.investments_80c + req.insurance_80d + req.hra_exemption + req.other_deductions
        taxable_old = max(0, req.salary - total_deduction_old)
        
        tax_old = 0
        if taxable_old > 250000:
            if taxable_old <= 500000:
                tax_old = 0 # Rebate 87A
            else:
                # simplified slab
                tax_old = (500000 - 250000) * 0.05 + (taxable_old - 500000) * 0.20
        
        # NEW REGIME
        total_deduction_new = standard_deduction # only standard deduction allowed
        taxable_new = max(0, req.salary - total_deduction_new)
        
        tax_new = 0
        if taxable_new > 300000:
            if taxable_new <= 700000:
                tax_new = 0 # Rebate 87A
            else:
                tax_new = (taxable_new - 300000) * 0.05 + (taxable_new - 600000) * 0.10
        
        # Recommendations
        recommendation = "NEW" if tax_new <= tax_old else "OLD"
        elss_gap = max(0, 150000 - req.investments_80c)
        insight = ""
        
        if recommendation == "OLD" and elss_gap > 0:
            insight = f"You can save more tax by investing ₹{elss_gap} in ELSS Funds before March 31."
        elif recommendation == "NEW":
            insight = "New regime is better for you. No need to lock money in ELSS."
            
        return {
            "tax_old_regime": round(tax_old, 2),
            "tax_new_regime": round(tax_new, 2),
            "recommended_regime": recommendation,
            "elss_gap": elss_gap,
            "tax_saving_insight": insight
        }
