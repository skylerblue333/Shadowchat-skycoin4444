// AUTO-GENERATED DRAFT SCREEN: CryptoBarrierOptionScreen
'''
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '~/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { cn } from '~/lib/utils'; // Utility for Tailwind class merging

interface BarrierOptionData {
  asset: string;
  barrierType: 'up-and-in' | 'up-and-out' | 'down-and-in' | 'down-and-out';
  barrierLevel: number;
  strikePrice: number;
  currentPrice: number;
  expiryDate: string;
  premium: number;
}

const CryptoBarrierOptionScreen: React.FC = () => {
  const [asset, setAsset] = useState<string>('BTC/USD');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Simulate fetching barrier option data with tRPC
  const { data, isLoading, isError, error } = trpc.crypto.getBarrierOptionData.useQuery(
    { asset },
    { 
      enabled: !!asset, 
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading barrier option data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 dark:text-red-400" role="alert">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  const optionData: BarrierOptionData = data || {
    asset: 'N/A',
    barrierType: 'up-and-out',
    barrierLevel: 0,
    strikePrice: 0,
    currentPrice: 0,
    expiryDate: 'N/A',
    premium: 0,
  };

  return (
    <div className={cn(
      "min-h-screen p-8 transition-colors duration-300",
      isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <div className="max-w-4xl mx-auto space-y-8" role="main">
        <h1 className="text-4xl font-bold text-center mb-10">
          Crypto Barrier Option: {asset}
        </h1>

        <div className="flex justify-end items-center mb-4">
          <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        <Card className={cn("w-full", isDarkTheme && "bg-gray-800 border-gray-700")}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Option Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="asset-input" className="block text-sm font-medium mb-1">Asset</Label>
              <Input
                id="asset-input"
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="e.g., BTC/USD"
                className={cn(isDarkTheme && "bg-gray-700 border-gray-600 text-gray-100")}
                aria-label="Crypto asset symbol"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Barrier Type</Label>
              <p className="text-lg font-medium">{optionData.barrierType}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Barrier Level</Label>
              <p className="text-lg font-medium">{optionData.barrierLevel}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Strike Price</Label>
              <p className="text-lg font-medium">{optionData.strikePrice}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Current Price</Label>
              <p className="text-lg font-medium">{optionData.currentPrice}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Expiry Date</Label>
              <p className="text-lg font-medium">{optionData.expiryDate}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Premium</Label>
              <p className="text-lg font-medium">{optionData.premium}</p>
            </div>
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button className={cn(isDarkTheme && "bg-blue-600 hover:bg-blue-700")}>Trade Option</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoBarrierOptionScreen;
'''