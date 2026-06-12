// AUTO-GENERATED DRAFT SCREEN: CryptoScreenerBuilder
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

interface ScreenerCriteria {
  priceRange: [number, number];
  marketCap: [number, number];
  // Add more criteria as needed
}

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  // Add more data fields
}

const CryptoScreenerBuilder: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [criteria, setCriteria] = useState<ScreenerCriteria>({
    priceRange: [0, 100000],
    marketCap: [0, 1000000000000],
  });

  // Placeholder for tRPC query
  const { data, isLoading, error } = trpc.crypto.getFilteredCryptos.useQuery(criteria);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCriteriaChange = (key: keyof ScreenerCriteria, value: any) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Screener Builder</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">
            {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </Label>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price-range">Price Range</Label>
              <Input
                id="price-range"
                type="text"
                value={`${criteria.priceRange[0]} - ${criteria.priceRange[1]}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split(' - ').map(Number);
                  if (!isNaN(min) && !isNaN(max)) {
                    handleCriteriaChange('priceRange', [min, max]);
                  }
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="market-cap">Market Cap Range</Label>
              <Input
                id="market-cap"
                type="text"
                value={`${criteria.marketCap[0]} - ${criteria.marketCap[1]}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split(' - ').map(Number);
                  if (!isNaN(min) && !isNaN(max)) {
                    handleCriteriaChange('marketCap', [min, max]);
                  }
                }}
                className="mt-1"
              />
            </div>
            <Button className="w-full">Apply Filters</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {data && data.length > 0 ? (
              <ul className="space-y-2">
                {data.map((crypto) => (
                  <li key={crypto.id} className="flex justify-between items-center p-2 border rounded">
                    <span>{crypto.name} ({crypto.symbol})</span>
                    <span>${crypto.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cryptos found matching your criteria.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoScreenerBuilder;
