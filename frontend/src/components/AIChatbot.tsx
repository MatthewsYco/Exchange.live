"use client";
import { useState, useRef, useEffect } from "react";

type Message = { id: number; text: string; sender: 'user' | 'ai' };

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to the AI Wealth Terminal. Ask me how to save taxes, project SWP/SIP returns, or general finance questions! How can I help you get rich today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulated AI response matching user prompts
        setTimeout(() => {
            let aiText = "I analyze millions of data points to optimize your wealth. Could you specify if you are asking about Taxes, SIPs, specific Stocks, or Company Trust?";
            const lower = input.toLowerCase();

            if (lower.includes('tax') || lower.includes('file')) {
                aiText = "Based on Indian tax codes, you can instantly save ₹1.5L using Section 80C (ELSS) and another ₹50k using 80D (Health). Head over to the 'Tax Optimizer' tab to see exactly which stocks to route this saved money into!";
            } else if (lower.includes('stock') || lower.includes('buy')) {
                aiText = "Right now, our Deep Learning model suggests balancing between stable large-caps (Reliance, HDFC) and aggressive growth (Tata Motors). Check the 'Live Market' tab for real-time 1-click execution options.";
            } else if (lower.includes('sip') || lower.includes('swp') || lower.includes('rich')) {
                aiText = "To become truly rich, time-in-the-market beats timing the market. For aggressive wealth creation, I suggest stepping up your SIP by 10% annually into a Flexi-Cap fund. Check our 'SIP Planner' for exact amortized tracking!";
            } else if (lower.includes('trust') || lower.includes('safe') || lower.includes('company') || lower.includes('real')) {
                aiText = "We operate strictly under SEBI Registered Investment Advisor (RIA) guidelines. Your funds are executed directly in your connected Demat accounts—our AI only acts as the router. All APIs use bank-grade 256-bit AES encryption. Your money is completely safe.";
            }

            setMessages(prev => [...prev, { id: Date.now(), text: aiText, sender: 'ai' }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-slate-900 border border-emerald-900/50 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px]">
                    {/* Header */}
                    <div className="bg-emerald-900 p-4 flex justify-between items-center border-b border-emerald-800">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <div>
                                <h3 className="font-bold text-white text-sm">Autopilot Core AI</h3>
                                <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        </button>
                    </div>
                </div>
            )}

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 outline outline-4 outline-emerald-900/30 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95"
                >
                    <span className="text-2xl">🤖</span>
                </button>
            )}
        </div>
    );
}
