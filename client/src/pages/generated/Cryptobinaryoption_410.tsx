// @ts-nocheck
import React, { useState, useEffect } from 'react';
import * as __ns_lucide_react_1 from 'lucide-react';
const { ArrowUpCircle, ArrowDownCircle, Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } = (__ns_lucide_react_1 as any);
import { cn } from '@/lib/utils';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: CryptoBinaryOption

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


export default function CryptoBinaryOption() {
  const [amount, setAmount] = useState<string>('100');
  const [duration, setDuration] = useState<number>(60); 
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  
  const { data: marketData, isLoading: isMarketLoading, error: marketError } = useStubQuery('BTC/USD');
  const placeTrade = useStubMutation();
  const handleTrade = async () => {
    if (!direction || !amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    
    try {
      await placeTrade.mutateAsync({
        asset: 'BTC/USD',
        amount: Number(amount),
        duration,
        direction,
        strikePrice: marketData?.price
      });
    } catch (err) {
      console.error('Trade failed', err);
    }
  };
  if (isMarketLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-950 text-slate-200 rounded-xl border border-slate-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-400">Loading market data...</p>
        </div>
      </div>
    );
  }
  if (marketError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-950 text-slate-200 rounded-xl border border-slate-800 p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Connection Error</h3>
            <p className="text-sm text-slate-400 mt-1">Failed to load live market data. Please try again later.</p>
          </div>
          <button 
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md mx-auto bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      <div className="p-5 border-b border-slate-800/60 bg-slate-900/50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <span className="text-orange-500 font-bold text-lg">₿</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">BTC/USD</h2>
              <p className="text-xs text-slate-400 font-medium">Bitcoin Binary Options</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white tracking-tight">
              ${marketData?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={cn(
              "flex items-center justify-end text-xs font-medium mt-0.5",
              (marketData?.change ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"
            )}>
              {(marketData?.change ?? 0) >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(marketData?.change ?? 0)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Investment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-7 pr-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none transition-all"
              >
                <option value={30}>30 Seconds</option>
                <option value={60}>1 Minute</option>
                <option value={300}>5 Minutes</option>
                <option value={900}>15 Minutes</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/60 flex justify-between items-center">
          <span className="text-sm text-slate-400 font-medium">Potential Payout</span>
          <div className="text-right">
            <span className="text-lg font-bold text-emerald-400">
              ${(Number(amount) * 1.85).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-500 ml-2 font-medium">(85% Return)</span>
          </div>
        </div>
        
        {placeTrade.error && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-400 font-medium">{placeTrade.error.message}</p>
          </div>
        )}
        {placeTrade.isSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-emerald-400 font-medium">Trade placed successfully!</p>
              <p className="text-xs text-emerald-500/70 mt-0.5">Position opened at ${marketData?.price.toLocaleString()}</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => {
              setDirection('up');
              handleTrade();
            }}
            disabled={placeTrade.isLoading || !amount || Number(amount) <= 0}
            className={cn(
              "relative overflow-hidden group flex flex-col items-center justify-center py-4 rounded-xl font-bold transition-all duration-200",
              "bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500/10 disabled:hover:text-emerald-500 disabled:hover:border-emerald-500/30"
            )}
          >
            {placeTrade.isLoading && direction === 'up' ? (
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mb-1"></div>
            ) : (
              <>
                <ArrowUpCircle className="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
                <span>CALL</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setDirection('down');
              handleTrade();
            }}
            disabled={placeTrade.isLoading || !amount || Number(amount) <= 0}
            className={cn(
              "relative overflow-hidden group flex flex-col items-center justify-center py-4 rounded-xl font-bold transition-all duration-200",
              "bg-rose-500/10 border-2 border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500/10 disabled:hover:text-rose-500 disabled:hover:border-rose-500/30"
            )}
          >
            {placeTrade.isLoading && direction === 'down' ? (
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mb-1"></div>
            ) : (
              <>
                <ArrowDownCircle className="w-6 h-6 mb-1 group-hover:translate-y-1 transition-transform" />
                <span>PUT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}