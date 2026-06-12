// AUTO-GENERATED DRAFT SCREEN: RWADashboard
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Terminal, Info, Loader2 } from 'lucide-react';
import { cn } from './lib/utils'; // Utility for conditional class names

interface Asset {
  id: string;
  name: string;
  value: number;
  yield: number;
  category: string;
  description: string;
}

interface DashboardData {
  assets: Asset[];
  totalValue: number;
  lastUpdated: string;
}

const RWADashboard: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.rwa.getDashboardData.useQuery<DashboardData>();

  // Accessibility: Announce loading and error states
  React.useEffect(() => {
    if (isLoading) {
      document.title = 'Loading RWA Dashboard...';
    } else if (isError) {
      document.title = 'Error Loading RWA Dashboard';
    } else {
      document.title = 'RWA Dashboard - SKYCOIN4444';
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return (
      <div className={cn("p-4 space-y-6 dark:bg-gray-900 min-h-screen", "aria-live=polite aria-busy=true")}>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sr-only">Loading Crypto: RWA Dashboard</h1>
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" aria-hidden="true" />
          <span className="ml-4 text-xl text-gray-700 dark:text-gray-300">Loading dashboard data...</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-3/4 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/5 dark:bg-gray-700" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/3 mt-2 dark:bg-gray-700" />
                <Skeleton className="h-3 w-full mt-4 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("p-4 dark:bg-gray-900 min-h-screen flex items-center justify-center", "aria-live=assertive")}>
        <Alert variant="destructive" className="max-w-md dark:bg-red-900 dark:text-white border-red-700">
          <Terminal className="h-5 w-5 text-red-300" aria-hidden="true" />
          <AlertTitle className="text-lg font-semibold">Error Loading Data</AlertTitle>
          <AlertDescription className="text-red-100">
            <p>We encountered an issue while fetching the RWA dashboard data.</p>
            <p className="mt-1">Details: {error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalAssetsValue = data?.totalValue || 0;
  const lastUpdateDate = data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'N/A';

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-50 font-sans">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto: RWA Dashboard</h1>
        <div className="mt-4 sm:mt-0 text-lg text-gray-600 dark:text-gray-400">
          <p>Total Portfolio Value: <span className="font-bold text-green-600 dark:text-green-400">${totalAssetsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          <p className="text-sm">Last Updated: {lastUpdateDate}</p>
        </div>
      </header>

      <section aria-labelledby="rwa-assets-heading">
        <h2 id="rwa-assets-heading" className="text-2xl font-semibold mb-6 dark:text-white">Real-World Assets Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.assets.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <Info className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" aria-hidden="true" />
              <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-gray-100">No RWA assets found</h3>
              <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Get started by adding new real-world assets.</p>
            </div>
          ) : (
            data?.assets.map((asset: Asset) => (
              <Card key={asset.id} className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{asset.name}</CardTitle>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{asset.category}</span>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">Value: ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Yield: <span className="font-semibold text-green-500">{asset.yield.toFixed(2)}%</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2" title={asset.description}>{asset.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      <footer className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p>Data provided for informational purposes only.</p>
      </footer>
    </div>
  );
};

export default RWADashboard;
