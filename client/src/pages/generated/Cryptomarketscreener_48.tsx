// AUTO-GENERATED DRAFT SCREEN: CryptoMarketScreener
// CryptoMarketScreener Component
// This component displays a market screener for cryptocurrencies.
// It includes features like loading states, error handling, dark mode toggle, and accessibility.
// Technologies used: React 19, TypeScript (TSX), Tailwind CSS 4, shadcn/ui, tRPC hooks.

'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

const CryptoMarketScreener: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Toggle dark mode class on the document element
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Fetch cryptocurrency market data using tRPC
  const { data, isLoading, isError, error } = trpc.crypto.getMarketData.useQuery();

  // Display loading state with skeleton components
  if (isLoading) {
    return (
      <div className="p-4 space-y-4" aria-live="polite" aria-atomic="true">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Display error message if data fetching fails
  if (isError) {
    return <div className="p-4 text-red-500" role="alert">Error loading data: {error.message}</div>;
  }

  // Render the market screener with fetched data
  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" tabIndex={0}>Crypto Market Screener</h1>
          <div className="flex items-center space-x-2">
            <SunIcon className="h-5 w-5" aria-hidden="true" />
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle" className="sr-only">Toggle dark mode</Label>
            <MoonIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((crypto: CryptoData) => (
            <Card key={crypto.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span tabIndex={0}>{crypto.name} ({crypto.symbol})</span>
                  <span
                    className={`text-sm font-semibold ${parseFloat(crypto.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                    tabIndex={0}
                  >
                    {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold" tabIndex={0}>${parseFloat(crypto.priceUsd).toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketScreener;
