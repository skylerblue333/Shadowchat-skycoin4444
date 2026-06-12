// AUTO-GENERATED DRAFT SCREEN: GasTrackerScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui path
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface GasData {
  fast: number;
  average: number;
  slow: number;
}

const fetchGasPrices = async (): Promise<GasData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        throw new Error('Failed to fetch gas prices');
      }
      resolve({
        fast: Math.floor(Math.random() * 50) + 20,
        average: Math.floor(Math.random() * 30) + 10,
        slow: Math.floor(Math.random() * 15) + 5,
      });
    }, 1500);
  });
};

const GasTrackerScreen: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<GasData, Error>({
    queryKey: ['gasPrices'],
    queryFn: fetchGasPrices,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-100">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen text-red-500 dark:text-red-400">
        <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-100">
          <CardHeader>
            <CardTitle>Error Loading Gas Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Error: {error?.message || 'Unknown error'}</p>
            <Button onClick={() => refetch()} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Gas Tracker</h1>
      <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Current Gas Prices (Gwei)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Fast:</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">{data?.fast}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Average:</span>
            <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{data?.average}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Slow:</span>
            <span className="text-xl font-bold text-red-600 dark:text-red-400">{data?.slow}</span>
          </div>
          <Button onClick={() => refetch()} className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
            Refresh Prices
          </Button>
        </CardContent>
      </Card>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8">Data updated every 10 seconds.</p>
    </div>
  );
};

export default GasTrackerScreen;
