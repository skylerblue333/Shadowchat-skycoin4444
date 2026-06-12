// AUTO-GENERATED DRAFT SCREEN: TrendingCoins
import React from 'react';
import { trpc } from './trpc';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const TrendingCoins: React.FC = () => {
  const { data, isLoading, error } = trpc.trendingCoins.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Crypto: Trending Coins</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/3 mb-1" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Crypto: Trending Coins</h1>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load trending coins: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crypto: Trending Coins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((coin: Coin) => (
          <Card key={coin.id}>
            <CardHeader>
              <CardTitle>{coin.name} ({coin.symbol})</CardTitle>
              <CardDescription>
                Price: ${coin.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={coin.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                24h Change: {coin.change24h.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;