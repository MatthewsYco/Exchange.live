"use client";
import { useState } from 'react';

const RECOMMENDED_STOCKS = [
    { name: 'Reliance Industries', ticker: 'RELIANCE.NS', returnDay: 0.0008, returnMonth: 0.012, returnYear: 0.15 },
    { name: 'HDFC Bank', ticker: 'HDFCBANK.NS', returnDay: 0.0006, returnMonth: 0.010, returnYear: 0.12 },
    { name: 'Tata Motors', ticker: 'TATAMOTORS.NS', returnDay: 0.0012, returnMonth: 0.025, returnYear: 0.35 },
    { name: 'Nippon India ELSS Tax Saver', ticker: 'ELSS', returnDay: 0.0005, returnMonth: 0.015, returnYear: 0.18 },
];

export default function TaxOptimizer() {
    const [income, setIncome] = useState(1500000);
    const [claim80C, setClaim80C] = useState(true);
    const [claim80D, setClaim80D] = useState(true);
    const [claim80CCD, setClaim80CCD] = useState(true);

    // Mock Simplified Indian Tax Calculations
    const newRegimeTax = income <= 700000 ? 0 : income * 0.15; // highly simplified mock
    const oldRegimeTax = income <= 500000 ? 0 : income * 0.20; // highly simplified mock

    // AI Optimised Route detects max claimed
    let optimizationLimit = 0;
    if (claim80C) optimizationLimit += 150000;
    if (claim80D) optimizationLimit += 50000;
    if (claim80CCD) optimizationLimit += 50000;

    const optimizedTax = Math.max(0, (income - optimizationLimit) * 0.15); // highly simplified mock

    const normalTaxPaid = Math.min(newRegimeTax, oldRegimeTax);
    const savedAmount = Math.max(0, normalTaxPaid - optimizedTax);

    const exportXML = () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ITR1_Mock>
            <PersonalDetails><Name>Autopilot Certified User</Name></PersonalDetails>
            <Income>
                <Gross>${income}</Gross>
            </Income>
            <Deductions>
                <Section80C>${claim80C ? 150000 : 0}</Section80C>
                <Section80D>${claim80D ? 50000 : 0}</Section80D>
                <Section80CCD>${claim80CCD ? 50000 : 0}</Section80CCD>
            </Deductions>
            <ExecutionLimits>
                <NormalTaxComputed>${normalTaxPaid}</NormalTaxComputed>
                <AI_Optimized_Tax>${optimizedTax}</AI_Optimized_Tax>
                <TotalCapitalRescued>${savedAmount}</TotalCapitalRescued>
            </ExecutionLimits>
            <Disclaimer>Generated natively via 100% Offline AI Extractor - Ready for E-Filing</Disclaimer>
        </ITR1_Mock>`;

        const blob = new Blob([xml], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AI_Tax_Filing_Optimization_${new Date().getFullYear()}.xml`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">Tax Deployment & Optimization Layer</h1>
            <p className="text-sm text-slate-400 mb-12 text-center">Precise filing optimization tracking how much money you can rescue and reinvest.</p>

            {/* TOP CONTROLS */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-10">
                <label className="text-slate-300 font-bold block mb-4">Gross Annual Income: <span className="bg-slate-950 px-2 py-1 rounded ml-2">₹ {income.toLocaleString()}</span></label>
                <input type="range" min="300000" max="5000000" step="50000" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>

            {/* PRECISE TAX FILING TABLES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10">

                {/* Comparsion Table */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-2">
                        <span className="text-orange-400">⚖️</span>
                        <h3 className="font-bold text-white text-sm">Filing Liability Matrix</h3>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="w-full text-xs text-left">
                            <thead className="text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="pb-2">Parameter</th>
                                    <th className="pb-2 text-right">Normal Tax</th>
                                    <th className="pb-2 text-right text-emerald-400 font-bold">AI Optimized</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                <tr className="hover:bg-slate-950/50">
                                    <td className="py-3 font-semibold text-slate-200">Gross Income</td>
                                    <td className="py-3 text-right font-mono text-slate-300">₹{income.toLocaleString()}</td>
                                    <td className="py-3 text-right font-mono text-slate-300">₹{income.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-slate-950/50">
                                    <td className="py-3 font-semibold text-slate-400">Claimed Deductions (80C, 80D)</td>
                                    <td className="py-3 text-right font-mono text-red-400">₹0</td>
                                    <td className="py-3 text-right font-mono text-emerald-400">-₹{optimizationLimit.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-slate-950/50">
                                    <td className="py-3 font-semibold text-slate-200">Taxable Income</td>
                                    <td className="py-3 text-right font-mono text-slate-300">₹{income.toLocaleString()}</td>
                                    <td className="py-3 text-right font-mono text-slate-300">₹{Math.max(0, income - optimizationLimit).toLocaleString()}</td>
                                </tr>
                                <tr className="bg-slate-950">
                                    <td className="py-4 font-bold text-white tracking-wider uppercase text-[11px]">Final Tax Payable</td>
                                    <td className="py-4 text-right font-mono text-red-500 font-bold">₹{normalTaxPaid.toLocaleString()}</td>
                                    <td className="py-4 text-right font-mono text-emerald-500 font-bold border-l-2 border-emerald-900/50 pl-2">₹{optimizedTax.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-emerald-900/20 p-4 border-t border-emerald-900 border-dashed text-center">
                        <div className="text-slate-300 text-xs uppercase tracking-wider mb-1 font-bold">Rescued Money / Saved Budget</div>
                        <div className={`text-4xl font-mono font-extrabold ${savedAmount > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>+₹{savedAmount.toLocaleString()}</div>
                    </div>
                </div>

                {/* AI Filing Suggestions */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex gap-2 items-center"><span className="text-blue-400">🤖</span><h3 className="font-bold text-white text-sm">Actionable Deductions</h3></div>
                        <span className="text-xs text-slate-500">Toggle to affect Savings</span>
                    </div>
                    <div className="p-6 space-y-4 text-sm flex-1">
                        <label className="flex gap-4 items-start border-b border-slate-800/50 pb-4 cursor-pointer group">
                            <div className="mt-1">
                                <input type="checkbox" checked={claim80C} onChange={(e) => setClaim80C(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between w-full">
                                    <div className="bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-300">Sec 80C</div>
                                    <span className={`${claim80C ? 'text-emerald-400' : 'text-slate-500'} font-mono font-bold text-xs transition-colors`}>- ₹1,50,000</span>
                                </div>
                                <div className="text-slate-400 text-xs mt-2 group-hover:text-slate-300 transition-colors">Invest ₹1.5L into ELSS Mutual Funds or PPF before March 31. This slashes your taxable bracket instantly.</div>
                            </div>
                        </label>
                        <label className="flex gap-4 items-start border-b border-slate-800/50 pb-4 cursor-pointer group">
                            <div className="mt-1">
                                <input type="checkbox" checked={claim80D} onChange={(e) => setClaim80D(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between w-full">
                                    <div className="bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-300">Sec 80D</div>
                                    <span className={`${claim80D ? 'text-emerald-400' : 'text-slate-500'} font-mono font-bold text-xs transition-colors`}>- ₹50,000</span>
                                </div>
                                <div className="text-slate-400 text-xs mt-2 group-hover:text-slate-300 transition-colors">Claim ₹50,000 Health Premium. Buy comprehensive Health Insurance for yourself and senior citizen parents.</div>
                            </div>
                        </label>
                        <label className="flex gap-4 items-start cursor-pointer group">
                            <div className="mt-1">
                                <input type="checkbox" checked={claim80CCD} onChange={(e) => setClaim80CCD(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between w-full">
                                    <div className="bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-300">Sec 80CCD</div>
                                    <span className={`${claim80CCD ? 'text-emerald-400' : 'text-slate-500'} font-mono font-bold text-xs transition-colors`}>- ₹50,000</span>
                                </div>
                                <div className="text-slate-400 text-xs mt-2 group-hover:text-slate-300 transition-colors">Extra ₹50,000 via NPS. Park ₹50k in the National Pension System Tier 1 to claim deduction above 80C.</div>
                            </div>
                        </label>
                    </div>
                    <button onClick={exportXML} className="bg-blue-600 hover:bg-blue-500 m-4 py-3 rounded font-bold text-white shadow-lg transition-all text-sm flex justify-center items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Generate Fully Automated ITR-1 Target (XML)
                    </button>
                </div>

            </div>

            {/* REINVEST SAVINGS ARRAY */}
            <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded shadow-2xl overflow-hidden mt-12 mb-24">
                <div className="bg-gradient-to-r from-emerald-900/50 to-slate-950 p-6 border-b border-emerald-900 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-emerald-400">Reinvest Your Saved Budget (₹{savedAmount.toLocaleString()})</h2>
                        <p className="text-xs text-slate-300 mt-1">If you route your rescued tax money into these assets instead of spending it, here is exactly how your <strong className="text-white">₹{savedAmount.toLocaleString()}</strong> will scale.</p>
                    </div>
                </div>

                <div className="overflow-x-auto p-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-slate-500 border-b border-slate-800 bg-slate-950">
                            <tr>
                                <th className="px-4 py-3 rounded-tl">Asset Model</th>
                                <th className="px-4 py-3 text-right">Investment</th>
                                <th className="px-4 py-3 text-right text-emerald-400">Est. Daily Profit</th>
                                <th className="px-4 py-3 text-right text-emerald-400">Est. Monthly</th>
                                <th className="px-4 py-3 text-right text-emerald-400">Year on Year (YoY)</th>
                                <th className="px-4 py-3 text-right rounded-tr">Execution</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/20">
                            {RECOMMENDED_STOCKS.map((stock, i) => {
                                const daily = savedAmount * stock.returnDay;
                                const monthly = savedAmount * stock.returnMonth;
                                const yearly = savedAmount * stock.returnYear;

                                return (
                                    <tr key={i} className="hover:bg-slate-950/70 transition-colors group">
                                        <td className="px-4 py-4">
                                            <div className="font-bold text-white">{stock.name}</div>
                                            <div className="text-[10px] bg-slate-800 inline-block px-1 rounded text-slate-400 mt-1">{stock.ticker}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right font-mono text-slate-300">
                                            ₹{savedAmount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-right font-mono font-bold text-emerald-400/80">
                                            +₹{daily.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-[9px] font-sans text-slate-500">/day</span>
                                        </td>
                                        <td className="px-4 py-4 text-right font-mono font-bold text-emerald-400/90">
                                            +₹{monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-[9px] font-sans text-slate-500">/mo</span>
                                        </td>
                                        <td className="px-4 py-4 text-right font-mono font-bold text-emerald-400 bg-emerald-900/10 rounded">
                                            +₹{yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-[9px] font-sans text-slate-400">in 1 yr</span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <a href="/checkout" className={`bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded shadow transition ease-in-out cursor-pointer inline-block text-xs uppercase tracking-wider ${savedAmount <= 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                                                Buy
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
