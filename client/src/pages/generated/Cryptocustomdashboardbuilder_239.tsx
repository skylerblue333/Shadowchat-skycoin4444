// AUTO-GENERATED DRAFT SCREEN: CryptoCustomDashboardBuilder
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook usage
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Simulating shadcn/ui
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

// Simulate a tRPC-like query function
const fetchCryptoData = async (): Promise<CryptoData[]> => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  const data = await response.json();
  return data.data;
};

const CryptoCustomDashboardBuilder: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [enabled, setEnabled] = useState(true);

  // Simulate tRPC hook for data fetching with loading and error states
  const { data, isLoading, error, refetch } = useQuery<CryptoData[], Error>({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    enabled: enabled,
    refetchInterval: 60000, // Refetch every minute
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    // Apply dark mode class on initial load if needed
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen dark:bg-gray-900 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto Dashboard</h1>
      <div className="flex justify-end mb-4 items-center space-x-2">
        <Switch
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          aria-label="Toggle dark mode"
        />
        <Label htmlFor="dark-mode">Dark Mode</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((crypto) => (
          <Card key={crypto.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{crypto.name} ({crypto.symbol})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Price: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
              <p className={`text-sm ${parseFloat(crypto.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                24h Change: {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={() => refetch()} className="dark:bg-blue-600 dark:hover:bg-blue-700">
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default CryptoCustomDashboardBuilder;
