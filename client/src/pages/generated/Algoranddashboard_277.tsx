// AUTO-GENERATED DRAFT SCREEN: AlgorandDashboard
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC with react-query

// Mock tRPC-like API client
const trpc = {
  algorand: {
    getDashboardData: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch Algorand data');
      }
      return {
        totalAccounts: 30000000,
        totalTransactions: 3000000000,
        currentPrice: 0.15,
        marketCap: 1200000000,
        dailyVolume: 50000000,
        stakingYield: 0.05,
      };
    },
  },
};

type DashboardData = {
  totalAccounts: number;
  totalTransactions: number;
  currentPrice: number;
  marketCap: number;
  dailyVolume: number;
  stakingYield: number;
};

const AlgorandDashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = useQuery<DashboardData, Error>({
    queryKey: ['algorandDashboardData'],
    queryFn: trpc.algorand.getDashboardData,
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Error loading dashboard: {error?.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Algorand Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{data?.totalAccounts?.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{data?.totalTransactions?.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Current Price (ALGO)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${data?.currentPrice?.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${data?.marketCap?.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${data?.dailyVolume?.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Staking Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{(data?.stakingYield * 100)?.toFixed(2)}%</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AlgorandDashboard;
