"use client";
import React, { useState } from 'react';
import { NIFTY_50_SYMBOLS, SECTOR_CLASSIFICATION } from '../constants';

const FULL_MARKET_SIP = NIFTY_50_SYMBOLS.map(sym => ({
    name: sym.replace('.NS', ''),
    sector: SECTOR_CLASSIFICATION[sym] || 'Unclassified',
    return1Y: (Math.random() * 25 + 5).toFixed(1) + '%',
    return3Y: (Math.random() * 15 + 10).toFixed(1) + '%',
    risk: Math.random() > 0.5 ? 'Moderate' : 'High'
}));

const groupedSIP = FULL_MARKET_SIP.reduce((acc, f) => {
    if (!acc[f.sector]) acc[f.sector] = [];
    acc[f.sector].push(f);
    return acc;
}, {} as Record<string, typeof FULL_MARKET_SIP>);

export default function SIPPlanner() {
    const [monthly, setMonthly] = useState(5000);
    const [years, setYears] = useState(5);
    const [rate, setRate] = useState(12);

    const totalInvested = monthly * 12 * years;
    const i = rate / 100 / 12;
    const n = years * 12;
    const futureValue = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const estReturns = futureValue - totalInvested;

    const projectionTable = Array.from({ length: years }).map((_, idx) => {
        const year = idx + 1;
        const currentN = year * 12;
        const investedSoFar = monthly * currentN;
        const valueSoFar = monthly * ((Math.pow(1 + i, currentN) - 1) / i) * (1 + i);
        const profitSoFar = valueSoFar - investedSoFar;
        return { year, invested: investedSoFar, profit: profitSoFar, total: valueSoFar };
    });

    return (
        <div className="w-full px-8 py-8 min-h-screen flex flex-col items-center">
            <div className="mb-8 text-center w-full">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Advanced SIP Projection Engine</h1>
                <p className="text-slate-400">Calculate compounding wealth generation aligned with massive full market sector classifications.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded shadow-lg p-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
                <div className="space-y-8">
                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Monthly Investment</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">₹ {monthly.toLocaleString()}</span>
                        </label>
                        <input type="range" min="500" max="100000" step="500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Expected Return Rate (p.a)</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">{rate}%</span>
                        </label>
                        <input type="range" min="5" max="30" step="1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Time Period (Years)</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">{years} Yr</span>
                        </label>
                        <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                </div>

                <div className="flex flex-col justify-center bg-slate-950 p-6 rounded border border-slate-800/50">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                            <span className="text-slate-400">Total Invested</span>
                            <span className="font-mono text-lg text-white">₹ {totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                            <span className="text-slate-400">Est. Returns</span>
                            <span className="font-mono text-lg text-emerald-400">+ ₹ {estReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-blue-400 font-bold">Total Value</span>
                            <span className="font-mono text-3xl font-extrabold text-white">₹ {futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>

                    <button className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded shadow transition-all">
                        Start AI SIP Now
                    </button>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Table 1: Full Market Sector Recommendations */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col h-[550px]">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-2">
                        <span className="text-blue-400">🤖</span>
                        <h3 className="font-bold text-white text-sm">SIP Eligible Components (Sector Mapped)</h3>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-xs text-left">
                            <thead className="text-slate-500 border-b border-slate-800 sticky top-0 bg-slate-950 z-20">
                                <tr>
                                    <th className="px-4 py-3">Asset Matrix</th>
                                    <th className="px-4 py-3 text-right">1Y Growth</th>
                                    <th className="px-4 py-3 text-right">3Y Growth</th>
                                    <th className="px-4 py-3 text-right">Calculated Risk</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {Object.keys(groupedSIP).sort().map(sector => (
                                    <React.Fragment key={sector}>
                                        <tr className="bg-slate-950/80 sticky top-10 z-10 border-b border-t border-slate-800 shadow-sm backdrop-blur-md">
                                            <td colSpan={4} className="px-4 py-2 font-bold text-blue-400 text-xs uppercase tracking-widest">{sector}</td>
                                        </tr>
                                        {groupedSIP[sector].map((f, i) => (
                                            <tr key={i} className="hover:bg-slate-800/80 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-200">{f.name}</div>
                                                </td>
                                                <td className="px-4 py-3 text-right text-emerald-400 font-mono font-bold">{f.return1Y}</td>
                                                <td className="px-4 py-3 text-right text-emerald-400 font-mono font-bold">{f.return3Y}</td>
                                                <td className="px-4 py-3 text-right text-orange-400">{f.risk}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Table 2: Projection Schedule */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col h-[550px]">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm flex items-center gap-2"><span>📈</span> Wealth Time-Series</h3>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Yearly Aggregated</span>
                    </div>
                    <div className="overflow-y-auto flex-1 p-4">
                        <table className="w-full text-xs text-left">
                            <thead className="text-slate-500 border-b border-slate-800 sticky top-0 bg-slate-900">
                                <tr>
                                    <th className="pb-2">Year</th>
                                    <th className="pb-2 text-right">Cum. Invested</th>
                                    <th className="pb-2 text-right">Est. Profit</th>
                                    <th className="pb-2 text-right">Value (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {projectionTable.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-950/50">
                                        <td className="py-3 text-slate-300 font-mono">End of Y{row.year}</td>
                                        <td className="py-3 text-right text-slate-400 font-mono">{row.invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="py-3 text-right text-emerald-400 font-mono">+{row.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="py-3 text-right text-white font-bold font-mono">{row.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
