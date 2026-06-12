// AUTO-GENERATED DRAFT SCREEN: CryptoNetworkStats
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Terminal } from 'lucide-react';

interface NetworkStats {
  totalNodes: number;
  activeValidators: number;
  blockHeight: number;
  transactionsPerSecond: number;
  avgBlockTime: number;
  marketCap: number;
}

const fetchNetworkStats = async (): Promise<NetworkStats> => {
  // Simulate API call with tRPC
  const data = await trpc.network.getStats.query();
  return data;
};

const CryptoNetworkStats: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<NetworkStats, Error>({
    queryKey: ['networkStats'],
    queryFn: fetchNetworkStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto: Network Stats</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto: Network Stats</h1>
        <Alert variant="destructive" className="mt-4 dark:bg-red-900 dark:border-red-700">
          <Terminal className="h-4 w-4 dark:text-red-300" />
          <AlertTitle className="dark:text-red-300">Error</AlertTitle>
          <AlertDescription className="dark:text-red-400">
            Failed to load network statistics: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold">Crypto: Network Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Total Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">{data?.totalNodes.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Active Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">{data?.activeValidators.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Block Height</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">{data?.blockHeight.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Transactions/Sec</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">{data?.transactionsPerSecond.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Avg Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">{data?.avgBlockTime}s</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium dark:text-white">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-white">${data?.marketCap.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoNetworkStats;
