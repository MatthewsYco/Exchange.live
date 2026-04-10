"use client";
import { useState } from 'react';
import { NIFTY_50_SYMBOLS, SECTOR_CLASSIFICATION } from '../constants';

// Dynamically scale Nifty 50 tokens into the Mutual Funds architecture
const FULL_MARKET_FUNDS = NIFTY_50_SYMBOLS.map(sym => {
    const isDebt = Math.random() > 0.8;
    const isLiquid = Math.random() > 0.9;
    return {
        name: sym.replace('.NS', ''),
        sector: SECTOR_CLASSIFICATION[sym] || 'Unclassified',
        type: isLiquid ? 'LIQUID' : isDebt ? 'DEBT' : 'EQUITY',
        risk: isLiquid ? 'Low' : isDebt ? 'Low to Moderate' : 'High',
        returns: (Math.random() * (isLiquid ? 5 : 25) + 5).toFixed(1) + '% (1Y)',
        duration: isLiquid ? 'Ultra Short' : isDebt ? 'Short' : 'Long'
    };
});

export default function MutualFundExplorer() {
    const [filter, setFilter] = useState('ALL');

    const filtered = filter === 'ALL' ? FULL_MARKET_FUNDS : FULL_MARKET_FUNDS.filter(f => f.type === filter);

    const groupedFunds = filtered.reduce((acc, f) => {
        if (!acc[f.sector]) acc[f.sector] = [];
        acc[f.sector].push(f);
        return acc;
    }, {} as Record<string, typeof FULL_MARKET_FUNDS>);

    return (
        <div className="w-full px-4 py-8 min-h-screen flex flex-col items-center">
            <div className="mb-8 text-center w-full max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Mutual Fund / ETF Explorer</h1>
                <p className="text-slate-400">Discover and analyze full market funds aligned with the AI Autopilot constraints, categorized by underlying Sectors.</p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded flex overflow-hidden mb-8 max-w-7xl self-center">
                {['ALL', 'LIQUID', 'DEBT', 'EQUITY'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-6 py-2 text-sm font-semibold transition-colors ${filter === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-7xl">
                <div className="bg-slate-900 border border-slate-800 rounded shadow overflow-hidden h-[750px] flex flex-col">
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-950 text-slate-500 border-b border-slate-800 sticky top-0 z-20">
                                <tr>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Fund Underlying Asset</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Class</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Risk Profile</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Returns</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedFunds).sort().map(sector => (
                                    <React.Fragment key={sector}>
                                        <tr className="bg-slate-950/90 sticky top-12 z-10 border-b border-t border-slate-800 shadow-sm">
                                            <td colSpan={5} className="px-6 py-2 font-bold text-blue-400 text-xs uppercase tracking-widest">{sector}</td>
                                        </tr>
                                        {groupedFunds[sector].map((f, i) => (
                                            <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-200">{f.name} <span className="text-[10px] bg-slate-800 text-slate-500 px-1 rounded ml-2">ETF</span></td>
                                                <td className="px-6 py-4 text-slate-400">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${f.type === 'EQUITY' ? 'bg-blue-900/30 text-blue-400' : 'bg-orange-900/30 text-orange-400'}`}>
                                                        {f.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-300 font-mono text-xs">{f.risk}</td>
                                                <td className="px-6 py-4 text-emerald-400 font-mono font-bold">{f.returns}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded text-xs font-bold transition-colors uppercase tracking-wider">
                                                        Invest
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
