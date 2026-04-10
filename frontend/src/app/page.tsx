"use client";
import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import { NIFTY_50_SYMBOLS, SECTOR_CLASSIFICATION } from './constants';

export default function ExchangeHome() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('ALL'); // ALL, GAINERS, LOSERS, WATCHLIST
  const [sectorFilter, setSectorFilter] = useState('ALL');

  useEffect(() => {
    async function fetchNifty50() {
      try {
        const res = await fetch(`http://localhost:8000/market/screener?symbols=${NIFTY_50_SYMBOLS.join(',')}`);
        if (res.ok) {
          const data = await res.json();
          setStocks(data);
        } else {
          throw new Error("Backend offline");
        }
      } catch (e) {
        console.warn("Backend not running, falling back to static offline data so platform is viewable.");
        const fallback = NIFTY_50_SYMBOLS.map((sym, i) => {
          let base = 1000 + (Math.random() * 4000);
          let prev = base * (1 + (Math.random() * 0.1 - 0.05));
          return {
            symbol: sym.replace('.NS', ''),
            name: sym.replace('.NS', '') + ' Limited',
            currentPrice: base,
            previousClose: prev,
            volume: Math.floor(Math.random() * 5000000),
            marketCap: Math.floor((Math.random() * 80000000000) + 10000000000)
          };
        }).sort((a, b) => b.marketCap - a.marketCap);
        setStocks(fallback);
      } finally {
        setLoading(false);
      }
    }
    fetchNifty50();
  }, []);

  // Compute tabs
  const getProcessedStocks = () => {
    let list = [...stocks];
    if (tab === 'GAINERS') list = list.sort((a, b) => ((b.currentPrice - b.previousClose) / b.previousClose) - ((a.currentPrice - a.previousClose) / a.currentPrice));
    if (tab === 'LOSERS') list = list.sort((a, b) => ((a.currentPrice - a.previousClose) / a.previousClose) - ((b.currentPrice - b.previousClose) / b.previousClose));

    // Filtering by search
    if (search) {
      list = list.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sectorFilter !== 'ALL') {
      list = list.filter(s => (SECTOR_CLASSIFICATION[s.symbol + '.NS'] || 'Unclassified Core') === sectorFilter);
    }

    if (tab === 'GAINERS') list = list.slice(0, 15);
    if (tab === 'LOSERS') list = list.slice(0, 15);

    return list;
  };

  const formatLargeNum = (num: number) => {
    if (!num) return '---';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  const processedList = getProcessedStocks();

  const groupedStocks = processedList.reduce((acc, stock) => {
    const sector = SECTOR_CLASSIFICATION[stock.symbol + '.NS'] || 'Unclassified Core';
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(stock);
    return acc;
  }, {} as Record<string, any[]>);

  const renderRow = (s: any) => {
    const change = s.currentPrice - s.previousClose;
    const pct = (change / s.previousClose) * 100;
    const isPos = change >= 0;

    return (
      <tr key={s.symbol} className="hover:bg-slate-800/50 transition-colors group">
        <td className="px-4 py-3 text-slate-600 hover:text-yellow-500 cursor-pointer text-lg">☆</td>
        <td className="px-4 py-3">
          <Link href={`/stock/${s.symbol}`} className="font-semibold text-blue-400 hover:underline">{s.symbol}</Link>
          <div className="text-xs text-slate-500 truncate max-w-[200px]">{s.name}</div>
        </td>
        <td className="px-4 py-3 text-right font-mono font-medium">{s.currentPrice.toFixed(2)}</td>
        <td className={`px-4 py-3 text-right font-mono font-semibold ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPos ? '+' : ''}{pct.toFixed(2)}%
        </td>
        <td className="px-4 py-3 text-right font-mono text-slate-400">{formatLargeNum(s.volume)}</td>
        <td className="px-4 py-3 text-right font-mono text-slate-400">{formatLargeNum(s.marketCap)}</td>
        <td className="px-4 py-3 text-center">
          <Link href={`/stock/${s.symbol}`} className="bg-emerald-900/40 text-emerald-500 border border-emerald-900/80 hover:bg-emerald-800 px-3 py-1 rounded text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">BUY</Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full px-4 py-6 relative flex flex-col min-h-screen">

      <div className="flex flex-col lg:flex-row gap-6 flex-1">

        {/* LEFT COLUMN: Data Screener */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-end pb-2">
            <h1 className="text-2xl font-bold tracking-tight mb-2 md:mb-0">Market Screener (75+ Assets)</h1>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-2 bg-slate-900 border border-slate-700/50 p-1 rounded">
                {['ALL', 'GAINERS', 'LOSERS', 'WATCHLIST'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded text-sm font-semibold transition-colors ${tab === t ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {t === 'ALL' ? 'Total Matrix' : t === 'GAINERS' ? 'Top Gainers' : t === 'LOSERS' ? 'Top Losers' : 'Watchlist'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-sm font-mono text-blue-400 font-bold rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full md:w-auto cursor-pointer max-w-[200px]"
                >
                  <option value="ALL">ALL SECTORS 🌍</option>
                  {Array.from(new Set(Object.values(SECTOR_CLASSIFICATION))).sort().map(s => (
                    <option key={s as string} value={s as string}>{s as string}</option>
                  ))}
                  <option value="Unclassified Core">Unclassified Core</option>
                </select>
                <div className="relative w-full md:w-[250px]">
                  <input
                    type="text"
                    placeholder="Find stock..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-sm rounded px-4 py-2 w-full text-white focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-2 text-slate-500">🔍</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded shadow-sm overflow-hidden flex-1">
            <div className="overflow-x-auto max-h-[750px] relative">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 bg-slate-950 sticky top-0 z-20 shadow border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider w-8">+/-</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Company</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">LTP (₹)</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">Change %</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">Volume</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">Market Cap</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-center">Trade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {loading && (
                    <tr>
                      <td colSpan={7} className="px-4 py-20 text-center text-slate-400">
                        <div className="animate-pulse text-blue-400 font-bold mb-2">Syncing with NSE via Yahoo Finance...</div>
                        Fetching live data for 50 heavyweights. Please wait.
                      </td>
                    </tr>
                  )}
                  {!loading && tab === 'ALL' && search === '' ? (
                    Object.keys(groupedStocks).sort().map(sector => (
                      <Fragment key={sector}>
                        <tr className="bg-slate-950/90 sticky top-10 z-10 border-b border-t border-slate-800 shadow-sm">
                          <td colSpan={7} className="px-4 py-2 font-bold text-blue-400 text-xs uppercase tracking-widest">{sector}</td>
                        </tr>
                        {groupedStocks[sector].map(s => renderRow(s))}
                      </Fragment>
                    ))
                  ) : (
                    !loading && processedList.map(s => renderRow(s))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Autopilot USP Integration */}
        <div className="w-full lg:w-[350px] shrink-0 space-y-6">
          <div className="bg-gradient-to-b from-blue-900/40 to-slate-900 border border-blue-800/50 p-6 rounded relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 right-0 p-2 text-3xl opacity-20">✨</div>
            <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">AI Investment Autopilot</h3>
            <p className="text-sm text-blue-200/80 mb-6 font-medium leading-relaxed">
              Your personal Quant team. We analyze your behavior, compute your surplus, and auto-allocate into the perfect asset mix using zero-emotion logic.
            </p>
            <Link href="/onboarding" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 rounded text-center font-bold shadow-lg transition-all border border-blue-400 text-white shadow-blue-500/20">
              Activate Autopilot
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xl opacity-10">🚨</div>
            <h4 className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-2">AI Nudges Log</h4>
            <ul className="space-y-3 leading-snug text-sm">
              <li className="text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-900/50">
                💡 Over ₹12,000 idle in bank detected. Recommending Ultra-Short Debt sweep.
              </li>
              <li className="text-slate-400">
                ▪ FIIs net sold ₹1,500 Cr in cash market on Friday
              </li>
              <li className="text-slate-400">
                ▪ TATA Motors declares dividend of ₹3 per share
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
