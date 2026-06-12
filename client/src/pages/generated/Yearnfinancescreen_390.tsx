// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as __ns_lucide_react_1 from 'lucide-react';
const { ArrowRightLeft, TrendingUp, Wallet, AlertCircle, RefreshCw, Info } = (__ns_lucide_react_1 as any);
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: YearnFinanceScreen

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


// Types
interface Vault {
  id: string;
  name: string;
  symbol: string;
  tvl: number;
  apy: number;
  tokenIcon: string;
}

export default function YearnFinanceScreen() {
  const [activeTab, setActiveTab] = useState('vaults');

  // tRPC Hooks
  const { data: vaultsData, isLoading: vaultsLoading, error: vaultsError, refetch: refetchVaults } = useStubQuery(undefined, {
    retry: 2,
  });

  const { data: portfolioData, isLoading: portfolioLoading, error: portfolioError } = useStubQuery(undefined, {
    retry: 2,
  });

  const depositMutation = useStubMutation();

  const handleDeposit = async (vaultId: string, amount: number) => {
    try {
      await depositMutation.mutateAsync({ vaultId, amount });
      refetchVaults();
    } catch (err) {
      console.error('Deposit failed', err);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  if (vaultsError || portfolioError) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 dark:bg-slate-950 min-h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Yearn Finance data. Please try again later.
            <Button variant="outline" size="sm" className="mt-4 block" onClick={() => refetchVaults()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 dark:bg-slate-950 dark:text-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">Y</div>
            Yearn Finance
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Optimize your yield across DeFi protocols automatically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block"></span>
            Network: Ethereum
          </Badge>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Total Supplied
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-3xl font-bold">{formatCurrency(portfolioData?.totalSupplied || 0)}</div>
            )}
          </CardContent>
        </Card>
        
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                +{formatCurrency(portfolioData?.totalEarnings || 0)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" /> Net APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-3xl font-bold">{formatPercent(portfolioData?.netApy || 0)}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 dark:bg-slate-900">
          <TabsTrigger value="vaults">Available Vaults</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vaults" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Featured Vaults</h2>
            <Button variant="outline" size="sm" onClick={() => refetchVaults()} disabled={vaultsLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${vaultsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {vaultsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {vaultsData?.map((vault: Vault) => (
                <Card key={vault.id} className="dark:bg-slate-900 dark:border-slate-800 hover:border-blue-500/50 transition-colors duration-200">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                        {vault.tokenIcon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{vault.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{vault.symbol}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 w-full sm:w-auto">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">TVL</p>
                        <p className="font-medium">{formatCurrency(vault.tvl)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Historical APY</p>
                        <p className="font-bold text-green-600 dark:text-green-400">{formatPercent(vault.apy)}</p>
                      </div>
                      <Button 
                        onClick={() => handleDeposit(vault.id, 100)}
                        disabled={depositMutation.isPending}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {depositMutation.isPending ? 'Processing...' : 'Deposit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {vaultsData?.length === 0 && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No vaults available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="portfolio" className="mt-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Your Active Positions</CardTitle>
              <CardDescription>Manage your deposited assets and track yields.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Connect your wallet to view your portfolio.</p>
                <Button variant="outline" className="mt-4">Connect Wallet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}