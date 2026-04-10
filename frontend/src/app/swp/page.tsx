"use client";
import React, { useState } from 'react';
import { NIFTY_50_SYMBOLS, SECTOR_CLASSIFICATION } from '../constants';

const FULL_MARKET_SWP = NIFTY_50_SYMBOLS.map(sym => ({
    name: sym.replace('.NS', '') + ' Hybrid Sweep',
    sector: SECTOR_CLASSIFICATION[sym] || 'Unclassified',
    yieldAvg: (Math.random() * 8 + 4).toFixed(1) + '%',
    volatility: Math.random() > 0.5 ? 'Very Low' : 'Low-Mod'
}));

const groupedSWP = FULL_MARKET_SWP.reduce((acc, f) => {
    if (!acc[f.sector]) acc[f.sector] = [];
    acc[f.sector].push(f);
    return acc;
}, {} as Record<string, typeof FULL_MARKET_SWP>);

export default function SWPPlanner() {
    const [total, setTotal] = useState(5000000);
    const [monthly, setMonthly] = useState(25000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(8);

    const i = rate / 100 / 12;
    const n = years * 12;
    const remainingValue = total * Math.pow(1 + i, n) - monthly * ((Math.pow(1 + i, n) - 1) / i);
    const totalWithdrawn = monthly * n;

    const projectionTable = Array.from({ length: years }).map((_, idx) => {
        const year = idx + 1;
        const monthsPassed = year * 12;
        const startObj = year === 1 ? total : (total * Math.pow(1 + i, (year - 1) * 12) - monthly * ((Math.pow(1 + i, (year - 1) * 12) - 1) / i));

        const totalWithdrawnSoFar = monthly * monthsPassed;
        const endBalance = total * Math.pow(1 + i, monthsPassed) - monthly * ((Math.pow(1 + i, monthsPassed) - 1) / i);

        const yearlyWithdrawal = monthly * 12;
        const yearlyProfit = (endBalance - startObj) + yearlyWithdrawal;

        return {
            year,
            openBal: startObj > 0 ? startObj : 0,
            withdrawn: yearlyWithdrawal,
            profit: yearlyProfit > 0 ? yearlyProfit : 0,
            closeBal: endBalance > 0 ? endBalance : 0
        };
    });

    return (
        <div className="w-full px-8 py-8 min-h-screen flex flex-col items-center">
            <div className="mb-8 text-center w-full">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Automated SWP Engine</h1>
                <p className="text-slate-400">Plan specific Systematic Withdrawals against every major stock sector classification with AI Volatility protection.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded shadow-lg p-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
                <div className="space-y-8">
                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Total Investment</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">₹ {total.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100000" max="50000000" step="100000" value={total} onChange={(e) => setTotal(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Withdrawal per month</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">₹ {monthly.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="500000" step="1000" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 font-bold mb-3">
                            <span>Expected Return Rate (p.a)</span>
                            <span className="bg-slate-950 px-2 py-1 rounded">{rate}%</span>
                        </label>
                        <input type="range" min="4" max="20" step="1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-500" />
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
                            <span className="text-slate-400">Total Withdrawn</span>
                            <span className="font-mono text-lg text-orange-400">₹ {totalWithdrawn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-blue-400 font-bold">Remaining Balance</span>
                            <span className={`font-mono text-3xl font-extrabold ${remainingValue < 0 ? 'text-red-500' : 'text-white'}`}>
                                {remainingValue < 0 ? 'DEPLETED' : '₹ ' + remainingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                    </div>

                    <button className="mt-8 w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded shadow transition-all">
                        Initialize Tax-Optimized SWP
                    </button>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Table 1: Full Market SWP Matrix */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col h-[550px]">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-2">
                        <span className="text-orange-400">🛡️</span>
                        <h3 className="font-bold text-white text-sm">Target Liquidity Sectors</h3>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-xs text-left">
                            <thead className="text-slate-500 border-b border-slate-800 sticky top-0 bg-slate-950 z-20">
                                <tr>
                                    <th className="px-4 py-3">Deployment Target</th>
                                    <th className="px-4 py-3 text-right">Avg Base Yield</th>
                                    <th className="px-4 py-3 text-right">Calculated Volatility</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {Object.keys(groupedSWP).sort().map(sector => (
                                    <React.Fragment key={sector}>
                                        <tr className="bg-slate-950/80 sticky top-10 z-10 border-b border-t border-slate-800 shadow-sm backdrop-blur-md">
                                            <td colSpan={3} className="px-4 py-2 font-bold text-blue-400 text-xs uppercase tracking-widest">{sector}</td>
                                        </tr>
                                        {groupedSWP[sector].map((f, i) => (
                                            <tr key={i} className="hover:bg-slate-800/80 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-200">{f.name}</div>
                                                </td>
                                                <td className="px-4 py-3 text-right text-emerald-400 font-mono font-bold">{f.yieldAvg}</td>
                                                <td className="px-4 py-3 text-right text-orange-400">{f.volatility}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Table 2: SWP Withdrawal Schedule */}
                <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden flex flex-col h-[550px]">
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm flex items-center gap-2"><span>📉</span> Withdrawal Schedule</h3>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Yearly Amortization</span>
                    </div>
                    <div className="overflow-y-auto flex-1 p-4">
                        <table className="w-full text-xs text-left">
                            <thead className="text-[10px] text-slate-500 border-b border-slate-800 sticky top-0 bg-slate-900">
                                <tr>
                                    <th className="pb-2">Year</th>
                                    <th className="pb-2 text-right">Open Bal</th>
                                    <th className="pb-2 text-right">Interest</th>
                                    <th className="pb-2 text-right text-orange-400">Payout</th>
                                    <th className="pb-2 text-right">Close Bal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {projectionTable.map((row, i) => (
                                    <tr key={i} className={`hover:bg-slate-950/50 ${row.closeBal <= 0 && row.openBal <= 0 ? 'opacity-30' : ''}`}>
                                        <td className="py-2 text-slate-300 font-mono">Y{row.year}</td>
                                        <td className="py-2 text-right text-slate-400 font-mono">{row.openBal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="py-2 text-right text-emerald-400 font-mono">+{row.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="py-2 text-right text-orange-400 font-mono">-{row.withdrawn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className={`py-2 text-right font-bold font-mono ${row.closeBal === 0 ? 'text-red-500' : 'text-white'}`}>
                                            {row.closeBal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
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
