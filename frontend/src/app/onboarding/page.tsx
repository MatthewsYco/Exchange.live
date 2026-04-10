"use client";
import { useState } from 'react';

export default function WealthAccelerationHub() {
    const [age, setAge] = useState(25);
    const [retireAge, setRetireAge] = useState(55);
    const [monthlySip, setMonthlySip] = useState(15000);

    // Simplistic compounding visualization
    const yearsToInvest = retireAge - age;
    const rateAgressive = 0.15; // 15% for aggressive
    const ratePassive = 0.08; // 8% for passive (FDs, Bonds)

    const calcFutureValue = (rate: number, years: number) => {
        if (years <= 0) return 0;
        const i = rate / 12;
        const n = years * 12;
        return monthlySip * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    };

    const valueAggressive = calcFutureValue(rateAgressive, yearsToInvest);
    const valuePassive = calcFutureValue(ratePassive, yearsToInvest);
    const lostWealth = valueAggressive - valuePassive;

    return (
        <div className="w-full px-4 py-8 min-h-screen">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                AI Wealth Acceleration Hub
            </h1>
            <p className="text-sm border-b border-slate-800 pb-8 text-slate-400 text-center max-w-3xl mx-auto mb-10">
                Beyond mere tracking, this is your complete blueprint on how to attain immense multi-generational wealth. Using massive data matrix parameters, aggressive compounding, and bulletproof security, the Autopilot models your financial future immediately.
            </p>

            {/* COMPOUNDING WEALTH SIMULATOR */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2">The Multi-Millionaire Roadmap</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="flex justify-between text-xs text-slate-300 font-bold mb-2 uppercase tracking-wide">
                                <span>Current Age</span>
                                <span className="text-blue-400">{age} Years</span>
                            </label>
                            <input type="range" min="18" max="70" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-blue-500" />
                        </div>
                        <div>
                            <label className="flex justify-between text-xs text-slate-300 font-bold mb-2 uppercase tracking-wide">
                                <span>Retirement Age</span>
                                <span className="text-blue-400">{retireAge} Years</span>
                            </label>
                            <input type="range" min={age} max="80" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full accent-blue-500" />
                        </div>
                        <div>
                            <label className="flex justify-between text-xs text-slate-300 font-bold mb-2 uppercase tracking-wide">
                                <span>Monthly SIP Commitment</span>
                                <span className="text-blue-400">₹{monthlySip.toLocaleString()}</span>
                            </label>
                            <input type="range" min="5000" max="500000" step="5000" value={monthlySip} onChange={(e) => setMonthlySip(Number(e.target.value))} className="w-full accent-blue-500" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-900/50 rounded-lg p-8 shadow-xl">
                    <h2 className="text-lg font-bold text-emerald-400 mb-6 pb-2">Your Retirement Corpus over {yearsToInvest} Years</h2>

                    <div className="space-y-6">
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Aggressive Equity AI Path (15% CAGR)</div>
                            <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tighter">₹ {(valueAggressive / 10000000).toFixed(2)} Crores</div>
                        </div>

                        <div className="bg-slate-950 p-4 rounded border border-slate-800 opacity-60">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Traditional FD / Bond Path (8% CAGR)</div>
                            <div className="text-2xl font-bold font-mono text-slate-300 tracking-tighter">₹ {(valuePassive / 10000000).toFixed(2)} Crores</div>
                        </div>

                        <div className="border border-red-900/30 bg-red-900/10 p-4 rounded">
                            <div className="text-[11px] text-red-500 font-bold uppercase tracking-wide">The Cost of NOT taking action:</div>
                            <div className="text-sm font-semibold text-red-400 mt-1">If you choose Traditional safety, you will literally lose <span className="font-mono bg-red-900/50 text-white px-1 leading-relaxed rounded">₹{(lostWealth / 10000000).toFixed(2)} Crores</span> by the time you retire. Let the AI Autopilot steer you into high-yield indexing.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DENSE PARAMETER MATRIX & RULES */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg text-sm text-slate-300">
                    <div className="text-xl mb-4">📈</div>
                    <h3 className="font-bold text-white mb-2 text-base">Step-Up Rule Matrix</h3>
                    <p className="opacity-80 mb-4">To combat India's real inflation rate (~6.5%), the AI engine automatically forces a 10% annual 'Step-Up' in your SIP payload. This micro-adjustment guarantees your purchasing power never erodes.</p>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-xs text-emerald-400 text-center">Auto-Step-Up Parameter = ENABLED</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg text-sm text-slate-300">
                    <div className="text-xl mb-4">🧠</div>
                    <h3 className="font-bold text-white mb-2 text-base">Behavioral Drift Correction</h3>
                    <p className="opacity-80 mb-4">Humans buy high and sell low. The core parameter of the Autopilot is enforcing <strong>Machine Discipline</strong>. During market corrections (eg. 10%+ drops), the AI prevents execution stops and initiates targeted bulk buys.</p>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-xs text-blue-400 text-center">Panic Override Logic = ACTIVE</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg text-sm text-slate-300">
                    <div className="text-xl mb-4">🏦</div>
                    <h3 className="font-bold text-white mb-2 text-base">Macro-Tax Trajectory</h3>
                    <p className="opacity-80 mb-4">With high Capital Gains and LTCG limits, blind investing loses margin. We actively execute Tax Loss Harvesting at financial year-ends (March), automatically booking non-productive dumps to offset gains.</p>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-xs text-orange-400 text-center">Tax Harvesting Matrix = INJECTED</div>
                </div>
            </div>

            {/* TRUST & COMPANY SECURITY LAYER */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="text-9xl">🔒</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Is your money safe with us?</h2>
                <p className="text-slate-400 mb-6 relative z-10 max-w-2xl">We built the strictest Trust Architecture possible. We don't hold your money; we only hold the intelligence.</p>

                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4 border-b border-slate-800 pb-3">
                        <span className="text-emerald-500 text-xl">✅</span>
                        <div>
                            <strong className="text-white block text-sm">SEBI Registered RIA Framework</strong>
                            <span className="text-xs text-slate-500">Regulated & heavily audited under the strictest Indian financial laws. Zero shadow-banking.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-b border-slate-800 pb-3">
                        <span className="text-emerald-500 text-xl">✅</span>
                        <div>
                            <strong className="text-white block text-sm">Non-Custodial Architecture</strong>
                            <span className="text-xs text-slate-500">We do NOT hold your assets. Our APIs directly interface with Zerodha, Groww, and Upstox. Withdrawals go directly to your bank account.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-emerald-500 text-xl">✅</span>
                        <div>
                            <strong className="text-white block text-sm">Military-Grade 256-bit AES Encryption</strong>
                            <span className="text-xs text-slate-500">Your KYC, data nodes, and transaction IDs are locked using TLS 1.3 and advanced cryptography. Hackers only see encrypted noise.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center pb-24">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 px-12 rounded shadow-2xl transition-all scale-100 hover:scale-105 active:scale-95 text-lg inline-flex items-center gap-3">
                    Activate Full AI Autopilot Matrix <span>⚡</span>
                </button>
            </div>

        </div>
    );
}
