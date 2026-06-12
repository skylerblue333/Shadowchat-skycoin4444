// AUTO-GENERATED DRAFT SCREEN: TraderProfile
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, TrendingUp, Activity, Wallet, Clock, ShieldCheck } from 'lucide-react';

interface Asset { symbol: string; percentage: number; }
interface Position { id: string; pair: string; type: 'LONG' | 'SHORT'; leverage: number; pnl: number; entryPrice: number; }
interface TraderStats { totalProfitPercent: number; winRate: number; aum: number; activeDays: number; }
interface TraderProfileData {
  username: string; avatarUrl?: string; isVerified: boolean; joinedAt: string;
  riskLevel: 'Low' | 'Medium' | 'High'; rank: number; stats: TraderStats;
  strategyDescription?: string; topAssets: Asset[]; openPositions: Position[];
}

export const TraderProfile: React.FC<{ traderId: string }> = ({ traderId }) => {
  const { data: profile, isLoading, error, refetch } = trpc.trader.getProfile.useQuery({ id: traderId }, { retry: 1 });
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-pulse" role="status" aria-label="Loading profile">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-32" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full rounded-xl" /><Skeleton className="h-32 w-full rounded-xl" /><Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );

  if (error) return (
    <div className="p-6 max-w-5xl mx-auto">
      <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        <AlertTitle className="text-red-800 dark:text-red-300 font-semibold">Error Loading Profile</AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400 mt-2">
          {error.message || 'Failed to fetch trader profile data. Please try again later.'}
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4 block border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/40">Retry</Button>
        </AlertDescription>
      </Alert>
    </div>
  );

  if (!profile) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-slate-900 dark:text-slate-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 border-2 border-indigo-100 dark:border-indigo-900">
            <AvatarImage src={profile.avatarUrl} alt={`${profile.username}'s avatar`} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xl font-bold">{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{profile.username}</h1>
              {profile.isVerified && <ShieldCheck className="h-5 w-5 text-blue-500" aria-label="Verified Trader" />}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Joined {new Date(profile.joinedAt).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={profile.riskLevel === 'High' ? 'destructive' : 'secondary'} className="font-medium">{profile.riskLevel} Risk</Badge>
              <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">Rank #{profile.rank}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">Copy Trades</Button>
          <Button variant="outline" className="w-full md:w-auto">Follow</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"><TrendingUp className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Profit</p><h3 className="text-xl font-bold text-green-600 dark:text-green-400">+{profile.stats.totalProfitPercent}%</h3></div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Activity className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Win Rate</p><h3 className="text-xl font-bold">{profile.stats.winRate}%</h3></div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><Wallet className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">AUM</p><h3 className="text-xl font-bold">${profile.stats.aum.toLocaleString()}</h3></div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400"><Clock className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Days</p><h3 className="text-xl font-bold">{profile.stats.activeDays}</h3></div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Overview</TabsTrigger>
          <TabsTrigger value="positions" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Positions</TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader><CardTitle>Trading Strategy</CardTitle><CardDescription>A brief overview of the trader's approach</CardDescription></CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{profile.strategyDescription || "This trader hasn't provided a strategy description yet."}</p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-500">Top Traded Assets</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.topAssets?.map((asset) => (
                    <Badge key={asset.symbol} variant="outline" className="px-3 py-1 bg-slate-50 dark:bg-slate-800">{asset.symbol} <span className="ml-1 text-slate-400">{asset.percentage}%</span></Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="positions" className="mt-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader><CardTitle>Open Positions</CardTitle><CardDescription>Currently active trades</CardDescription></CardHeader>
            <CardContent>
              {profile.openPositions?.length > 0 ? (
                <div className="space-y-4">
                  {profile.openPositions.map((pos) => (
                    <div key={pos.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${pos.type === 'LONG' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div><p className="font-bold">{pos.pair}</p><p className="text-xs text-slate-500 dark:text-slate-400">{pos.type} • {pos.leverage}x</p></div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${pos.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{pos.pnl >= 0 ? '+' : ''}{pos.pnl}%</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Entry: ${pos.entryPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (<div className="text-center py-10 text-slate-500 dark:text-slate-400">No open positions at the moment.</div>)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader><CardTitle>Recent History</CardTitle><CardDescription>Last 30 days of trading activity</CardDescription></CardHeader>
            <CardContent><div className="text-center py-10 text-slate-500 dark:text-slate-400">History data visualization would go here.</div></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TraderProfile;