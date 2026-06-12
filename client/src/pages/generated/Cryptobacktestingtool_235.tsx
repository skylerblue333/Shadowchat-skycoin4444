// AUTO-GENERATED DRAFT SCREEN: CryptoBacktestingTool
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, AlertCircle, Play, Settings2, TrendingUp, TrendingDown } from 'lucide-react';
import { trpc } from '@/utils/trpc';
interface BacktestParams { asset: string; strategy: string; initialCapital: number; startDate: string; endDate: string; }
interface BacktestResult { date: string; portfolioValue: number; assetPrice: number; }
interface BacktestMetrics { totalReturn: number; annualizedReturn: number; maxDrawdown: number; sharpeRatio: number; winRate: number; totalTrades: number; }
export default function CryptoBacktestingTool() {
  const [params, setParams] = useState<BacktestParams>({
    asset: 'BTC',
    strategy: 'moving_average_crossover',
    initialCapital: 10000,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
  });
  const runBacktest = trpc.crypto.runBacktest.useMutation();
  const handleParamChange = (key: keyof BacktestParams, value: string | number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };
  const handleRunBacktest = () => {
    runBacktest.mutate(params);
  };
  const isLoading = runBacktest.isPending;
  const error = runBacktest.error;
  const data = runBacktest.data;
  const metrics: BacktestMetrics | null = data?.metrics || null;
  const chartData: BacktestResult[] = data?.timeseries || [];
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div><h1 className="text-3xl font-bold tracking-tight text-zinc-100">Crypto Backtesting Engine</h1><p className="text-zinc-400 mt-1">Test your trading strategies against historical market data.</p></div>
          <Button 
            onClick={handleRunBacktest} 
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            aria-label="Run Backtest"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
            {isLoading ? 'Running...' : 'Run Backtest'}
          </Button>
        </header>
        {error && (
          <Alert variant="destructive" className="bg-red-950/50 border-red-900 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Backtest Failed</AlertTitle>
            <AlertDescription>
              {error.message || 'An unexpected error occurred while running the backtest. Please try again.'}
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 lg:col-span-1">
            <CardHeader><CardTitle className="flex items-center text-zinc-100"><Settings2 className="mr-2 h-5 w-5 text-indigo-400" />Parameters</CardTitle><CardDescription className="text-zinc-400">Configure your strategy settings.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="asset" className="text-zinc-300">Asset</Label><Select value={params.asset} onValueChange={(val) => handleParamChange("asset", val)}><SelectTrigger id="asset" className="bg-zinc-950 border-zinc-800 text-zinc-200"><SelectValue placeholder="Select asset" /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200"><SelectItem value="BTC">Bitcoin (BTC)</SelectItem><SelectItem value="ETH">Ethereum (ETH)</SelectItem><SelectItem value="SOL">Solana (SOL)</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="strategy" className="text-zinc-300">Strategy</Label><Select value={params.strategy} onValueChange={(val) => handleParamChange("strategy", val)}><SelectTrigger id="strategy" className="bg-zinc-950 border-zinc-800 text-zinc-200"><SelectValue placeholder="Select strategy" /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200"><SelectItem value="moving_average_crossover">MA Crossover</SelectItem><SelectItem value="mean_reversion">Mean Reversion</SelectItem><SelectItem value="momentum">Momentum</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="initialCapital" className="text-zinc-300">Initial Capital (USD)</Label><Input id="initialCapital" type="number" value={params.initialCapital} onChange={(e) => handleParamChange("initialCapital", Number(e.target.value))} className="bg-zinc-950 border-zinc-800 text-zinc-200" min={100}/></div>
              <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="startDate" className="text-zinc-300">Start Date</Label><Input id="startDate" type="date" value={params.startDate} onChange={(e) => handleParamChange("startDate", e.target.value)} className="bg-zinc-950 border-zinc-800 text-zinc-200 [color-scheme:dark]"/></div><div className="space-y-2"><Label htmlFor="endDate" className="text-zinc-300">End Date</Label><Input id="endDate" type="date" value={params.endDate} onChange={(e) => handleParamChange("endDate", e.target.value)} className="bg-zinc-950 border-zinc-800 text-zinc-200 [color-scheme:dark]"/></div></div>
            </CardContent>
          </Card>
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard 
                title="Total Return" 
                value={metrics ? `${(metrics.totalReturn * 100).toFixed(2)}%` : '--'} 
                trend={metrics ? (metrics.totalReturn >= 0 ? 'up' : 'down') : 'neutral'}
                isLoading={isLoading}
              />
              <MetricCard 
                title="Annualized Return" 
                value={metrics ? `${(metrics.annualizedReturn * 100).toFixed(2)}%` : '--'} 
                trend={metrics ? (metrics.annualizedReturn >= 0 ? 'up' : 'down') : 'neutral'}
                isLoading={isLoading}
              />
              <MetricCard 
                title="Max Drawdown" 
                value={metrics ? `${(metrics.maxDrawdown * 100).toFixed(2)}%` : '--'} 
                trend="down"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Sharpe Ratio" 
                value={metrics ? metrics.sharpeRatio.toFixed(2) : '--'} 
                trend="neutral"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Win Rate" 
                value={metrics ? `${(metrics.winRate * 100).toFixed(1)}%` : '--'} 
                trend="neutral"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Total Trades" 
                value={metrics ? metrics.totalTrades.toString() : '--'} 
                trend="neutral"
                isLoading={isLoading}
              />
            </div>
            <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader><CardTitle className="text-zinc-100">Performance Chart</CardTitle><CardDescription className="text-zinc-400">Portfolio value vs Asset price over time</CardDescription></CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>
                  ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="#71717a" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="#71717a" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#71717a" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `$${val.toLocaleString()}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                          itemStyle={{ color: '#f4f4f5' }}
                          labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="portfolioValue" 
                          name="Portfolio Value" 
                          stroke="#6366f1" 
                          strokeWidth={2} 
                          dot={false} 
                          activeDot={{ r: 6, fill: '#6366f1', stroke: '#18181b', strokeWidth: 2 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="assetPrice" 
                          name="Asset Price" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-lg"><TrendingUp className="h-12 w-12 mb-4 opacity-20" /><p>Run a backtest to view performance data</p></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
const MetricCard = ({ title, value, trend, isLoading }: { title: string; value: string; trend: 'up' | 'down' | 'neutral'; isLoading: boolean; }) => {
  return (<Card className="bg-zinc-900 border-zinc-800"><CardContent className="p-4"><p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>{isLoading ? (<Skeleton className="h-8 w-24 bg-zinc-800" />) : (<div className="flex items-center gap-2"><span className="text-2xl font-bold text-zinc-100">{value}</span>{trend === 'up' && <TrendingUp className="h-4 w-4 text-emerald-500" />}{trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}</div>)}</CardContent></Card>);
};