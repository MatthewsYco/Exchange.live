"use client";

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Transaction = { date: string, desc: string, amount: number, type: 'INCOME' | 'FIXED' | 'VARIABLE' | 'UNKNOWN', category: string };

const DEFAULT_DATASET: Transaction[] = [
    { date: '2023-10-01', desc: 'Salary Credit', amount: 150000, type: 'INCOME', category: 'Salary' },
    { date: '2023-10-02', desc: 'HDFC Rent Transfer', amount: -40000, type: 'FIXED', category: 'Housing' },
    { date: '2023-10-05', desc: 'Electricity Bill', amount: -2500, type: 'FIXED', category: 'Utilities' },
    { date: '2023-10-12', desc: 'Amazon Order', amount: -6500, type: 'VARIABLE', category: 'Shopping' },
    { date: '2023-10-15', desc: 'Nippon SIP', amount: -15000, type: 'FIXED', category: 'Investing' },
    { date: '2023-10-18', desc: 'Zomato', amount: -800, type: 'VARIABLE', category: 'Dining' },
    { date: '2023-10-22', desc: 'Fuel Station', amount: -3000, type: 'VARIABLE', category: 'Transport' },
    { date: '2023-10-28', desc: 'Bonus Credit', amount: 25000, type: 'INCOME', category: 'Bonus' },
];

export default function AIDashboardLayers() {
    const [data, setData] = useState<Transaction[]>(DEFAULT_DATASET);
    const [filter, setFilter] = useState<'ALL' | 'DAILY' | 'MONTHLY' | 'YEARLY'>('ALL');
    const [uploading, setUploading] = useState(false);

    // AI Goal Tracking State
    const [goal, setGoal] = useState<number>(100000);
    const [timeframe, setTimeframe] = useState<number>(6); // months

    // Autopilot Execution State
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [layerELogs, setLayerELogs] = useState([
        "⏳ Processing next AI analysis sweep tonight at 00:00 IST.",
        "✅ Mar 10: Processed ₹2,000 sweep via connected UPI mandate due to surplus detection.",
        "✅ Feb 25: Reallocated 5% from Debt to Equity per volatility decay parameter.",
    ]);

    const triggerAction = (actionName: string, logMsg: string) => {
        setActionLoading(actionName);
        setTimeout(() => {
            setLayerELogs(prev => [logMsg, ...prev]);
            setActionLoading(null);
        }, 1500);
    };

    // --- Calculations ---
    // 1. Total Investments, returns, current value
    const totalInvested = 1450000;
    const totalReturns = 345000;
    const currentValue = totalInvested + totalReturns;

    // 2. Cash Flow calculations from dataset
    const totalIncome = data.filter(d => d.type === 'INCOME').reduce((acc, c) => acc + c.amount, 0);
    const fixedExpenses = Math.abs(data.filter(d => d.type === 'FIXED').reduce((acc, c) => acc + c.amount, 0));
    const varExpenses = Math.abs(data.filter(d => d.type === 'VARIABLE').reduce((acc, c) => acc + c.amount, 0));
    const totalExpenses = fixedExpenses + varExpenses;
    const balance = totalIncome - totalExpenses;

    // Investable Amount / AI computed Buffer
    const safetyBufferRequired = fixedExpenses * 6; // 6 months reserve
    const idleCash = 850000; // Mock linked bank balance
    const surplusDetected = idleCash > safetyBufferRequired ? idleCash - safetyBufferRequired : 0;
    const investableAmount = surplusDetected;

    // AI Next Steps calculation
    const targetShortfall = goal - (currentValue);
    const requiredMonthly = targetShortfall > 0 ? (targetShortfall / timeframe) : 0;

    // Projection Chart Data Mock
    const projectionData = Array.from({ length: 12 }).map((_, i) => ({
        month: `M${i + 1}`,
        invested: totalInvested + ((investableAmount / 12) * i),
        projectedValue: currentValue + ((investableAmount / 12) * i) * 1.1,
    }));

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);
        setTimeout(() => {
            const newDataset: Transaction[] = [
                ...DEFAULT_DATASET,
                { date: '2023-11-01', desc: 'Salary Credit', amount: 160000, type: 'INCOME', category: 'Salary' },
                { date: '2023-11-02', desc: 'HDFC Rent Transfer', amount: -40000, type: 'FIXED', category: 'Housing' },
                { date: '2023-11-08', desc: 'Apple Store', amount: -85000, type: 'VARIABLE', category: 'Electronics' },
                { date: '2023-11-15', desc: 'Nippon SIP', amount: -25000, type: 'FIXED', category: 'Investing' },
                { date: '2023-11-20', desc: 'Unknown VPA', amount: -1500, type: 'UNKNOWN', category: 'Misc' },
            ];
            setData(newDataset);
            setUploading(false);
        }, 1500);
    };

    return (
        <div className="w-full px-4 py-8 min-h-screen">

            {/* HEADER & UPLOAD AGGREGATOR */}
            <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AI Autopilot Hub (5-Layer Terminal)</h1>
                    <p className="text-sm text-slate-400">Complete visibility into your automated, multi-layered financial strategy.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors border border-slate-700">
                        🔗 Link Bank Account
                    </button>
                    <div className="relative">
                        <button className={`${uploading ? 'bg-orange-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-2 px-4 rounded text-sm transition-colors cursor-pointer`}>
                            {uploading ? 'Parsing CSV...' : '📂 Upload CSV Parser'}
                        </button>
                        <input type="file" title="Upload Bank Statement" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                    </div>
                </div>
            </div>

            {/* TOP LEVEL AGGREGATE METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Investments</div>
                    <div className="text-3xl font-mono text-white">₹{(totalInvested / 100000).toFixed(2)}L</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Current Value</div>
                    <div className="text-3xl font-mono text-white">₹{(currentValue / 100000).toFixed(2)}L</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Returns</div>
                    <div className="text-3xl font-mono text-emerald-400">+ ₹{(totalReturns / 100000).toFixed(2)}L</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded shadow-sm bg-gradient-to-br from-indigo-900/40 to-slate-900">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Investable Idle Cash</div>
                    <div className="text-3xl font-mono text-blue-400">₹{(idleCash / 100000).toFixed(2)}L</div>
                </div>
            </div>

            <div className="space-y-6">
                {/* TOP LEVEL: Behavior (Layer A) & Cash Flow (Layer B) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Layer A (Behavior) */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded relative overflow-hidden flex flex-col">
                        <h2 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><span>🟢</span> Layer A: Behavior Pipeline</h2>
                        <p className="text-sm text-slate-400 mb-4 flex-1">
                            Your behavior profile dictates market responses. Based on onboarding and transaction history, you map as <strong className="text-white">Moderate-Growth</strong>.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1 text-slate-300"><span>Panic Threshold Mapping</span><span>15% Drop</span></div>
                                <div className="w-full bg-slate-950 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '40%' }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1 text-slate-300"><span>Liquidity Reserve Bias</span><span>High Priority</span></div>
                                <div className="w-full bg-slate-950 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div></div>
                            </div>
                            <div className="text-xs text-slate-500 border-t border-slate-800 pt-3">
                                <strong>Stability Matrix:</strong> Driven towards Debt (12%), Equity Growth (88%).
                            </div>
                        </div>
                    </div>

                    {/* Layer B (Cash Flow Segment & Ledger) */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-4">
                            <h2 className="text-blue-400 font-bold flex items-center gap-2"><span>🔵</span> Layer B: Cash Flow Context & Transaction Ledger</h2>
                            <div className="flex space-x-1">
                                <button onClick={() => setFilter('ALL')} className={`px-2 py-1 text-xs rounded font-bold ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>ALL</button>
                                <button onClick={() => setFilter('MONTHLY')} className={`px-2 py-1 text-xs rounded font-bold ${filter === 'MONTHLY' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>MONTHLY</button>
                                <button onClick={() => setFilter('YEARLY')} className={`px-2 py-1 text-xs rounded font-bold ${filter === 'YEARLY' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>YEARLY</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                            {/* Cash Flow Summary */}
                            <div className="col-span-1 space-y-3 font-mono text-sm bg-slate-950 p-4 rounded border border-slate-800">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-sans font-bold">Month Analysis</div>
                                <div className="flex justify-between text-slate-400"><span>Avg Income</span> <span className="text-emerald-400">₹{totalIncome.toLocaleString()}</span></div>
                                <div className="flex justify-between text-slate-400"><span>Avg Expenses</span> <span className="text-red-400">₹{totalExpenses.toLocaleString()}</span></div>
                                <div className="flex justify-between text-slate-300 font-bold pt-2 border-t border-slate-800 mt-2"><span>Net Bal</span> <span>₹{balance.toLocaleString()}</span></div>

                                <div className="text-xs text-slate-500 uppercase tracking-wider mt-4 mb-2 font-sans font-bold">Reserves</div>
                                <div className="flex justify-between text-slate-400"><span>Buffer Req</span> <span>₹{safetyBufferRequired.toLocaleString()}</span></div>
                                <div className="flex justify-between text-slate-400"><span>Surplus</span> <span className="text-blue-400">₹{surplusDetected.toLocaleString()}</span></div>
                            </div>

                            {/* Interactive Transaction Ledger */}
                            <div className="col-span-2 bg-slate-950 border border-slate-800 rounded p-2 overflow-y-auto max-h-[200px]">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-[10px] text-slate-500 uppercase bg-slate-900 sticky top-0">
                                        <tr>
                                            <th className="px-3 py-2">Date</th>
                                            <th className="px-3 py-2">Description</th>
                                            <th className="px-3 py-2">Type</th>
                                            <th className="px-3 py-2 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/80 transition-colors">
                                                <td className="px-3 py-2 text-slate-400 font-mono text-xs">{row.date}</td>
                                                <td className="px-3 py-2 text-slate-200">{row.desc} <span className="text-slate-500 text-[10px] ml-1">({row.category})</span></td>
                                                <td className="px-3 py-2">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold
                                ${row.type === 'INCOME' ? 'bg-emerald-900/30 text-emerald-400' :
                                                            row.type === 'FIXED' ? 'bg-blue-900/30 text-blue-400' :
                                                                row.type === 'VARIABLE' ? 'bg-orange-900/30 text-orange-400' :
                                                                    'bg-slate-800 text-slate-300'}`
                                                    }>
                                                        {row.type}
                                                    </span>
                                                </td>
                                                <td className={`px-3 py-2 text-right font-mono font-bold text-xs ${row.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                    {row.amount > 0 ? '+' : ''}{row.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MIDDLE LEVEL: Intelligence Goals & Projections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Layer C: Target Decision Engine & Visual Projections */}
                    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-800/50 p-6 rounded shadow-lg flex flex-col">
                        <h2 className="text-purple-400 font-bold mb-4 flex items-center gap-2 border-b border-indigo-900/50 pb-2"><span>🟣</span> Layer C: AI Decision Engine & Visual Growth</h2>

                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="text-xs text-indigo-300 block mb-1 uppercase font-bold tracking-wider">Target Amount (Goal)</label>
                                <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="w-full bg-slate-950 text-white border border-indigo-800 rounded px-3 py-1 text-sm focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-indigo-300 block mb-1 uppercase font-bold tracking-wider">Timeframe (Months)</label>
                                <input type="number" min="1" max="120" value={timeframe} onChange={(e) => setTimeframe(Number(e.target.value))} className="w-full bg-slate-950 text-white border border-indigo-800 rounded px-3 py-1 text-sm focus:outline-none focus:border-indigo-500" />
                            </div>
                        </div>

                        <div className="bg-indigo-950/50 border border-indigo-900/80 p-3 mb-4 rounded text-xs space-y-2 flex-1">
                            <strong className="text-white block">Next Steps & Recommendations:</strong>
                            {targetShortfall <= 0 ? (
                                <div className="text-emerald-400">Target already achieved or exceeded by current P&L! Continue holding allocations.</div>
                            ) : (
                                <>
                                    <div className="flex gap-2 items-start"><span className="text-indigo-400">➤</span><span className="text-slate-300">Increase net flow to <strong className="text-white font-mono">₹{requiredMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</strong> to safely reach ₹{goal.toLocaleString()} within {timeframe} months.</span></div>
                                    <div className="flex gap-2 items-start"><span className="text-indigo-400">➤</span><span className="text-slate-300">Convert ₹{(investableAmount * 0.4).toLocaleString()} (40% of surplus) immediately into Liquid Funds to offset volatility risks.</span></div>
                                </>
                            )}
                        </div>

                        {/* Recharts Area Projection */}
                        <div className="h-[150px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={projectionData}>
                                    <defs>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#c084fc" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" stroke="#475569" fontSize={10} hide />
                                    <YAxis stroke="#475569" fontSize={10} hide domain={['auto', 'auto']} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '12px' }} />
                                    <Area type="monotone" dataKey="invested" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" name="Cumulative Invested" />
                                    <Area type="monotone" dataKey="projectedValue" stroke="#c084fc" strokeWidth={2} fillOpacity={1} fill="url(#colorProjected)" name="AI Estimated Growth" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Layer D: Execution Tools */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded flex flex-col">
                        <h2 className="text-yellow-400 font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><span>🟡</span> Layer D: Execution Protocols</h2>

                        <p className="text-sm text-slate-400 mb-6 flex-1">Take direct manual override of the AI Autopilot using strict executable triggers based on Layer C recommendations.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => triggerAction('boost', `✅ ${new Date().toLocaleDateString()}: Forced SIP Step-Up mechanism by 10%. Auto-mandate aligned.`)}
                                className="bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 text-slate-300 p-4 rounded text-center transition-all group flex flex-col justify-center items-center"
                            >
                                <span className={`${actionLoading === 'boost' ? 'animate-spin' : 'group-hover:scale-110'} text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-all`}>{actionLoading === 'boost' ? '⚙️' : '🚀'}</span>
                                <span className="font-bold text-sm">Boost SIP by 10%</span>
                            </button>
                            <button
                                onClick={() => triggerAction('sweep', `✅ ${new Date().toLocaleDateString()}: Swept ₹${(surplusDetected).toLocaleString()} of Idle Cash directly into Liquid ETF.`)}
                                className="bg-slate-950 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-300 p-4 rounded text-center transition-all group flex flex-col justify-center items-center"
                            >
                                <span className={`${actionLoading === 'sweep' ? 'animate-spin' : 'group-hover:scale-110'} text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-all`}>{actionLoading === 'sweep' ? '⚙️' : '🧹'}</span>
                                <span className="font-bold text-sm">Sweep Idle Cash</span>
                            </button>
                            <button
                                onClick={() => triggerAction('roundoff', `✅ ${new Date().toLocaleDateString()}: Executed Round-offs sweep on your latest 5 expenditure streams.`)}
                                className="bg-slate-950 border border-slate-800 hover:border-yellow-500 hover:text-yellow-400 text-slate-300 p-4 rounded text-center transition-all group flex flex-col justify-center items-center"
                            >
                                <span className={`${actionLoading === 'roundoff' ? 'animate-spin' : 'group-hover:scale-110'} text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-all`}>{actionLoading === 'roundoff' ? '⚙️' : '🔄'}</span>
                                <span className="font-bold text-sm">Execute Round-offs</span>
                            </button>
                            <button
                                onClick={() => triggerAction('pause', `⚠️ ${new Date().toLocaleDateString()}: Autopilot PAUSED. Liquid auto-sweeps halted.`)}
                                className="bg-slate-950 border border-slate-800 hover:border-red-500 hover:text-red-400 text-slate-300 p-4 rounded text-center transition-all group flex flex-col justify-center items-center"
                            >
                                <span className={`${actionLoading === 'pause' ? 'animate-pulse' : 'group-hover:scale-110'} text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-all`}>{actionLoading === 'pause' ? '🛑' : '⏸'}</span>
                                <span className="font-bold text-sm">Pause Autopilot</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM LEVEL: Layer E */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded text-sm text-slate-300">
                    <h2 className="text-red-400 font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2"><span>🔴</span> Layer E: Trust & Autopilot Transparency Log</h2>
                    <div className="flex flex-col md:flex-row items-center gap-4 border border-slate-800 rounded bg-slate-950 max-h-[150px] overflow-y-auto">
                        <div className="w-full flex-1 divide-y divide-slate-800/50">
                            {layerELogs.map((log, index) => (
                                <div key={index} className={`p-3 w-full ${index === 0 && log.includes('✅ ' + new Date().toLocaleDateString()) ? 'bg-emerald-900/20 text-emerald-300 font-bold' : ''} ${log.includes('⚠️') ? 'text-orange-400 font-bold' : ''}`}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
