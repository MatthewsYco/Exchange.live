import type { Metadata } from "next";
import "./globals.css";
import AIChatbot from "@/components/AIChatbot";

export const metadata: Metadata = {
  title: "Live Market | NSE Replica + Autopilot",
  description: "Live stock exchange viewer with AI backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans flex flex-col min-h-screen">
        {/* Top Market Ticker Tape */}
        <div className="bg-slate-900 border-b border-slate-800 py-1.5 px-4 overflow-hidden relative shadow-md font-mono flex items-center text-slate-300">
          <div className="absolute left-0 z-10 bg-slate-900 px-3 font-bold text-blue-400 border-r border-slate-700 h-full flex items-center">
            MARKET LIVE
          </div>
          <div className="pl-32 flex animate-marquee whitespace-nowrap gap-12 text-sm ml-4">
            <span>NIFTY 50: <strong className="text-emerald-400">22,250.20 (+0.8%)</strong></span>
            <span>SENSEX: <strong className="text-emerald-400">73,150.11 (+0.7%)</strong></span>
            <span>BANKNIFTY: <strong className="text-red-400">46,500.50 (-0.2%)</strong></span>
            <span>RELIANCE: <strong className="text-emerald-400">2950.00 (+1.2%)</strong></span>
            <span>TCS: <strong className="text-emerald-400">4120.00 (+0.5%)</strong></span>
            <span>HDFCBANK: <strong className="text-red-400">1450.00 (-1.1%)</strong></span>
            <span>INFY: <strong className="text-emerald-400">1600.00 (+0.3%)</strong></span>
            <span>ITC: <strong className="text-emerald-400">410.00 (+0.1%)</strong></span>
            {/* Duplicate for infinite continuous flow */}
            <span>NIFTY 50: <strong className="text-emerald-400">22,250.20 (+0.8%)</strong></span>
            <span>SENSEX: <strong className="text-emerald-400">73,150.11 (+0.7%)</strong></span>
            <span>BANKNIFTY: <strong className="text-red-400">46,500.50 (-0.2%)</strong></span>
            <span>RELIANCE: <strong className="text-emerald-400">2950.00 (+1.2%)</strong></span>
            <span>TCS: <strong className="text-emerald-400">4120.00 (+0.5%)</strong></span>
            <span>HDFCBANK: <strong className="text-red-400">1450.00 (-1.1%)</strong></span>
            <span>INFY: <strong className="text-emerald-400">1600.00 (+0.3%)</strong></span>
            <span>ITC: <strong className="text-emerald-400">410.00 (+0.1%)</strong></span>
          </div>
        </div>

        {/* Global Navigation */}
        <nav className="bg-slate-950 border-b border-slate-800">
          <div className="w-full px-4 flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <a href="/" className="font-bold text-2xl tracking-tighter text-blue-500">EXCHANGE<span className="text-white">.LIVE</span></a>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Eg: RELIANCE, TCS, INFY..."
                  className="bg-slate-900 border border-slate-700 text-sm rounded px-4 py-2 w-[350px] text-white focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 fill-current">🔍</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm font-medium">
              <a href="/" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">Market</a>
              <a href="/funds" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">Funds</a>
              <a href="/sip" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">SIP</a>
              <a href="/swp" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">SWP</a>
              <a href="/dashboard" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">AI 5-Layer</a>
              <a href="/tax" className="text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-tight">Tax Dept</a>

              <a href="/onboarding" className="text-emerald-400 flex items-center bg-emerald-950/40 px-4 py-2 rounded-md border border-emerald-800/80 hover:bg-emerald-900/60 transition-all font-bold tracking-wide">
                🚀 START AI AUTOPILOT
              </a>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 bg-slate-950 text-slate-100">
          {children}
        </main>
        <AIChatbot />
      </body>
    </html>
  );
}
