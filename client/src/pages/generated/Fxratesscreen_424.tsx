// AUTO-GENERATED DRAFT SCREEN: FXRatesScreen

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; // shadcn/ui icons

interface FXRate {
  currency: string;
  rate: number;
  change: number;
}

const FXRatesScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.fx.getRates.useQuery(); // tRPC hook

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load FX rates: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Crypto: FX Rates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((rate: FXRate) => (
          <Card key={rate.currency} className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">{rate.currency}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{rate.rate.toFixed(4)}</p>
              <p className={`text-sm ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'} dark:${rate.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FXRatesScreen;
