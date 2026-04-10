"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const symbol = searchParams.get('symbol') || 'UNKNOWN';
    const qty = Number(searchParams.get('qty') || 1);
    const price = Number(searchParams.get('price') || 0);

    const total = qty * price;

    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [method, setMethod] = useState<'UPI' | 'CARD' | 'NETBANK'>('UPI');

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-2xl text-center max-w-md w-full">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-emerald-400 mb-2">Order Executed</h1>
                    <p className="text-slate-400 mb-6">Successfully purchased {qty} shares of {symbol} at ₹{price.toFixed(2)}.</p>
                    <button onClick={() => router.push('/dashboard')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded transition-colors">
                        Go to AI Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-white mb-6">Secure Checkout</h1>

                <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl overflow-hidden">

                    {/* Order Summary */}
                    <div className="p-6 bg-slate-950 border-b border-slate-800 text-center">
                        <div className="text-sm text-slate-400 mb-1">Paying towards Zerodha-Clone NSE Gateway</div>
                        <div className="text-4xl font-mono font-bold text-white mb-4">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className="text-sm font-medium text-blue-400 bg-blue-900/20 py-1 rounded inline-block px-4">
                            Order Summary: {qty} x {symbol}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="p-6">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Select Payment Method</h3>

                        <div className="space-y-3 mb-8">
                            <label className={`block flex items-center p-4 rounded border cursor-pointer transition-all ${method === 'UPI' ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 hover:border-slate-700'}`}>
                                <input type="radio" value="UPI" checked={method === 'UPI'} onChange={() => setMethod('UPI')} className="mr-3 accent-blue-500" />
                                <div>
                                    <div className="font-bold text-white">UPI (GPay, PhonePe, Paytm)</div>
                                    <div className="text-xs text-slate-500">Zero processing fees</div>
                                </div>
                            </label>

                            <label className={`block flex items-center p-4 rounded border cursor-pointer transition-all ${method === 'CARD' ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 hover:border-slate-700'}`}>
                                <input type="radio" value="CARD" checked={method === 'CARD'} onChange={() => setMethod('CARD')} className="mr-3 accent-blue-500" />
                                <div>
                                    <div className="font-bold text-white">Debit / Credit Card</div>
                                    <div className="text-xs text-slate-500">Subject to 1.5% gateway charge</div>
                                </div>
                            </label>

                            <label className={`block flex items-center p-4 rounded border cursor-pointer transition-all ${method === 'NETBANK' ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 hover:border-slate-700'}`}>
                                <input type="radio" value="NETBANK" checked={method === 'NETBANK'} onChange={() => setMethod('NETBANK')} className="mr-3 accent-blue-500" />
                                <div>
                                    <div className="font-bold text-white">Net Banking</div>
                                    <div className="text-xs text-slate-500">Supports 60+ Indian banks</div>
                                </div>
                            </label>
                        </div>

                        {/* Simulated UPI Input if UPI is selected */}
                        {method === 'UPI' && (
                            <div className="mb-6 animate-fade-in">
                                <label className="text-sm font-medium text-slate-400 block mb-2">Enter Virtual Payment Address (VPA)</label>
                                <input type="text" placeholder="example@okhdfcbank" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
                            </div>
                        )}

                        <button
                            onClick={handlePay}
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded shadow-lg transition-all"
                        >
                            {processing ? 'Processing Bank Gateway...' : `PAY ₹${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                        </button>
                    </div>

                </div>

                <p className="text-xs text-slate-500 mt-4 text-center">Protected by 256-bit AES Encryption. RBI Approved Payment Gateway Mock.</p>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Secure Checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
