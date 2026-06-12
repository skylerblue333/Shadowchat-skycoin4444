// AUTO-GENERATED DRAFT SCREEN: MarketAnalysisScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MarketData {
  id: string;
  name: string;
  price: number;
  change24h: number;
}

// Mock tRPC hook for fetching market data
const useMarketData = () => {
  const [data, setData] = useState<MarketData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: MarketData[] = [
          { id: 'bitcoin', name: 'Bitcoin', price: 60000, change24h: 2.5 },
          { id: 'ethereum', name: 'Ethereum', price: 3000, change24h: -1.2 },
          { id: 'dogecoin', name: 'Dogecoin', price: 0.15, change24h: 5.1 },
        ];
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const MarketAnalysisScreen: React.FC = () => {
  const { data, isLoading, isError } = useMarketData();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-red-500">Error loading market data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Market Analysis</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((coin) => (
            <Card key={coin.id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{coin.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">${coin.price.toLocaleString()}</p>
                <p className={coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                </p>
                <Button className="mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketAnalysisScreen;
