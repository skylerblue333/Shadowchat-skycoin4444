// AUTO-GENERATED DRAFT SCREEN: CoinDetailsScreen
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Assuming a tRPC client setup and a router with a coin.getById procedure
// import { trpc } from '@/utils/trpc'; 

interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  marketCapUsd: number;
  volume24hUsd: number;
  changePercent24h: number;
  supply: number;
  maxSupply: number | null;
  // Add more fields as per API response
}

// Mock tRPC hook for demonstration purposes
const useCoinDetailsQuery = (coinId: string) => {
  return useQuery<CoinDetails, Error>({ 
    queryKey: ['coinDetails', coinId],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (coinId === 'bitcoin') {
            resolve({
              id: 'bitcoin',
              name: 'Bitcoin',
              symbol: 'BTC',
              priceUsd: 60000.00,
              marketCapUsd: 1200000000000,
              volume24hUsd: 30000000000,
              changePercent24h: 2.5,
              supply: 19000000,
              maxSupply: 21000000,
            });
          } else if (coinId === 'ethereum') {
            resolve({
              id: 'ethereum',
              name: 'Ethereum',
              symbol: 'ETH',
              priceUsd: 3000.00,
              marketCapUsd: 360000000000,
              volume24hUsd: 15000000000,
              changePercent24h: -1.2,
              supply: 120000000,
              maxSupply: null,
            });
          } else {
            throw new Error('Coin not found');
          }
        }, 1500);
      });
    },
    enabled: !!coinId,
  });
};

const CoinDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const coinId = id || '';

  const { data, isLoading, isError, error } = useCoinDetailsQuery(coinId);

  if (!coinId) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No coin ID provided. Please navigate from a valid coin list.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load coin details: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            Coin details could not be found for ID: {coinId}.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const priceChangeColor = data.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            {data.name} ({data.symbol})
            <span className={`text-lg ${priceChangeColor}`}>
              {data.changePercent24h.toFixed(2)}%
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Real-time market data for {data.name}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-lg font-medium">Current Price:</p>
            <p className="text-2xl font-semibold">{formatCurrency(data.priceUsd)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Market Cap:</p>
            <p className="text-xl">{formatCurrency(data.marketCapUsd)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">24h Volume:</p>
            <p className="text-xl">{formatCurrency(data.volume24hUsd)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Circulating Supply:</p>
            <p className="text-xl">{formatNumber(data.supply)} {data.symbol}</p>
          </div>
          {data.maxSupply && (
            <div className="space-y-2">
              <p className="text-lg font-medium">Max Supply:</p>
              <p className="text-xl">{formatNumber(data.maxSupply)} {data.symbol}</p>
            </div>
          )}
          <div className="col-span-1 md:col-span-2 pt-4">
            <Button className="w-full">Trade {data.symbol}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinDetailsScreen;