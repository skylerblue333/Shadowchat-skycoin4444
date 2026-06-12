// AUTO-GENERATED DRAFT SCREEN: CryptoCoinDetailPage
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  supply: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
};

export function CryptoCoinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = trpc.coin.getCoinDetail.useQuery({ coinId: id! });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:text-gray-200">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load coin details: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const coin = data as CoinDetail;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">{coin.name} ({coin.symbol})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle>Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${parseFloat(coin.priceUsd).toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle>Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle>24hr Change</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${parseFloat(coin.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {parseFloat(coin.changePercent24Hr).toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle>Volume (24hr)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${parseFloat(coin.volumeUsd24Hr).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle>Circulating Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{parseFloat(coin.supply).toLocaleString()} {coin.symbol}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function Cryptocoindetailpage_63() { return null; }
