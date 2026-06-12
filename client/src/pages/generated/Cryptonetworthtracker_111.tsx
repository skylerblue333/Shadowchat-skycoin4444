// AUTO-GENERATED DRAFT SCREEN: CryptoNetWorthTracker
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; // Utility for conditional class names

interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
}

interface NetWorthData {
  totalNetWorth: number;
  assets: Asset[];
}

const fetchNetWorth = async (): Promise<NetWorthData> => {
  // Simulate API call with tRPC
  // Replace with actual tRPC hook call, e.g., const { data, isLoading, error } = api.crypto.getNetWorth.useQuery();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalNetWorth: 123456.78,
        assets: [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', amount: 1.5, price: 40000, value: 60000 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', amount: 10, price: 2500, value: 25000 },
          { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', amount: 10000, price: 0.1, value: 1000 },
        ],
      });
    }, 1500);
  });
};

export const CryptoNetWorthTracker: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const { data, isLoading, error } = useQuery<NetWorthData, Error>({
    queryKey: ['netWorth'],
    queryFn: fetchNetWorth,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  }

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8",
      isDarkTheme ? 'dark' : ''
    )}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crypto Net Worth Tracker</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </div>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Total Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-primary">${data?.totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-semibold mb-4">Your Assets</h2>
        {isLoading ? (
          <div className="grid gap-4">
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
          </div>
        ) : (
          <div className="grid gap-4">
            {data?.assets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{asset.name} ({asset.symbol})</CardTitle>
                  <span className="text-muted-foreground">{asset.amount}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <p className="text-xs text-muted-foreground">@ ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoNetWorthTracker;
