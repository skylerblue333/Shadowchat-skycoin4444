// AUTO-GENERATED DRAFT SCREEN: CryptoRepoMarketScreen
'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/lib/trpc';

interface RepoMarketData {
  id: string;
  asset: string;
  rate: number;
  maturity: string;
  volume: number;
}

export function CryptoRepoMarketScreen() {
  const { toast } = useToast();
  const { data, isLoading, isError, error, refetch } = trpc.repoMarket.getLatestData.useQuery();

  React.useEffect(() => {
    if (isError) {
      if (error instanceof TRPCClientError) {
        toast({
          title: 'Error fetching repo market data',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'An unexpected error occurred',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    }
  }, [isError, error, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))] space-y-4">
        <p className="text-lg text-destructive">Failed to load repo market data.</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Crypto Repo Market</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Latest data on cryptocurrency repurchase agreements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Asset
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Maturity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {data.map((item: RepoMarketData) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                      {item.asset}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.rate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.maturity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.volume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

export default function Cryptorepomarketscreen_444() { return null; }
