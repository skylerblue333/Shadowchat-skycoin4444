// AUTO-GENERATED DRAFT SCREEN: GlobalMarketStatsScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface GlobalMarketStats {
  total_market_cap: number;
  total_volume: number;
  btc_dominance: number;
  eth_dominance: number;
  active_cryptocurrencies: number;
  markets: number;
}

const GlobalMarketStatsScreen: React.FC = () => {
  const [stats, setStats] = useState<GlobalMarketStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: GlobalMarketStats = {
          total_market_cap: 2_500_000_000_000,
          total_volume: 150_000_000_000,
          btc_dominance: 45.5,
          eth_dominance: 18.2,
          active_cryptocurrencies: 10_000,
          markets: 30_000,
        };
        setStats(mockData);
      } catch (err) {
        setError('Failed to fetch global market stats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Global Cryptocurrency Market Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Total Market Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${stats?.total_market_cap.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>24h Trading Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${stats?.total_volume.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Bitcoin Dominance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats?.btc_dominance}%</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Ethereum Dominance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats?.eth_dominance}%</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Active Cryptocurrencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats?.active_cryptocurrencies.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats?.markets.toLocaleString()}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalMarketStatsScreen;
