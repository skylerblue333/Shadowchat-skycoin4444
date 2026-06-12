// AUTO-GENERATED DRAFT SCREEN: CoWProtocolScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Define the interface for the data fetched from the tRPC API.
// This ensures type safety and better code readability.
interface CoWProtocolData {
  tokenPrice: number;
  volume24h: number;
  totalValueLocked: number;
  marketCap: number;
  circulatingSupply: number;
  lastUpdated: string; // ISO date string
}

/**
 * CoWProtocolScreen Component
 * A production-grade React 19 screen component for displaying CoW Protocol data.
 * It includes data fetching with tRPC, loading states, error handling, dark theme support,
 * and accessibility features. Built with Tailwind CSS 4 and shadcn/ui components.
 */
const CoWProtocolScreen: React.FC = () => {
  // Fetch data using tRPC hook. This handles loading, error, and data states.
  const { data, isLoading, isError, error } = trpc.cowProtocol.getData.useQuery();

  // Display skeleton loaders while data is being fetched.
  if (isLoading) {
    return (
      <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen animate-pulse" aria-live="polite" aria-atomic="true">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Separator className="my-8 dark:bg-gray-700" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Display an error message if data fetching fails.
  if (isError) {
    return (
      <div className="p-6 dark:bg-gray-900 min-h-screen" role="alert">
        <Alert variant="destructive" className="aria-live:assertive">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          <AlertTitle>Error Loading Data</AlertTitle>
          <AlertDescription>
            Failed to load CoW Protocol data. Please try again later. Details: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Destructure data with a type assertion for clarity and safety.
  const { tokenPrice, volume24h, totalValueLocked, marketCap, circulatingSupply, lastUpdated } = data as CoWProtocolData;

  // Format numbers for better readability.
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100" role="main" aria-label="CoW Protocol Dashboard">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:text-left">CoW Protocol Overview</h1>
      <p className="text-lg text-muted-foreground dark:text-gray-400 text-center md:text-left">Real-time statistics and key metrics for CoW Protocol.</p>

      <Separator className="my-8 dark:bg-gray-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Token Price Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Token Price</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">COW</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current price of the COW token</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500" aria-label={`Current token price: ${formatCurrency(tokenPrice)}`}>
              {formatCurrency(tokenPrice)}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500">Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
          </CardContent>
        </Card>

        {/* 24h Volume Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
            <span className="text-muted-foreground text-xl" aria-hidden="true">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" aria-label={`24-hour trading volume: ${formatCurrency(volume24h)}`}>
              {formatCurrency(volume24h)}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500">Across all supported exchanges</p>
          </CardContent>
        </Card>

        {/* Total Value Locked Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Value Locked</CardTitle>
            <span className="text-muted-foreground text-xl" aria-hidden="true">🔒</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" aria-label={`Total value locked: ${formatCurrency(totalValueLocked)}`}>
              {formatCurrency(totalValueLocked)}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500">Total assets staked in CoW Protocol</p>
          </CardContent>
        </Card>

        {/* Market Cap Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Market Cap</CardTitle>
            <span className="text-muted-foreground text-xl" aria-hidden="true">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" aria-label={`Market capitalization: ${formatCurrency(marketCap)}`}>
              {formatCurrency(marketCap)}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500">Current market capitalization</p>
          </CardContent>
        </Card>

        {/* Circulating Supply Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Circulating Supply</CardTitle>
            <span className="text-muted-foreground text-xl" aria-hidden="true">🔄</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" aria-label={`Circulating supply: ${formatNumber(circulatingSupply)} COW`}>
              {formatNumber(circulatingSupply)} COW
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500">Tokens currently in circulation</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 dark:bg-gray-700" />

      <section aria-labelledby="about-cow-protocol">
        <h2 id="about-cow-protocol" className="text-2xl font-semibold mb-4">About CoW Protocol</h2>
        <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
          CoW Protocol is a decentralized exchange aggregator that enables gasless trades and protects users from MEV (Maximal Extractable Value).
          It achieves this by settling trades through a network of solvers who compete to find the best prices for users.
          This innovative approach ensures that users get the best possible execution for their trades, often at no cost.
        </p>
        <p className="text-muted-foreground dark:text-gray-400 leading-relaxed mt-2">
          The protocol is governed by its community through the COW token, allowing holders to participate in key decisions
          and shape the future of decentralized trading. Its focus on user protection and efficient trade execution makes it a crucial
          component of the DeFi ecosystem.
        </p>
      </section>
    </div>
  );
};

export default CoWProtocolScreen;
