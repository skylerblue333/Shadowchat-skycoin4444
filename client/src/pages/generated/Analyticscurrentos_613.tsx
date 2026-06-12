// AUTO-GENERATED DRAFT SCREEN: AnalyticsCurrentOS
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface OSData {
  osName: string;
  version: string;
  users: number;
  marketShare: number;
}

const AnalyticsCurrentOS: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.analytics.getCurrentOS.useQuery();

  if (isLoading) {
    return (
      <Card className="w-full max-w-lg mx-auto animate-pulse">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Loading OS Analytics</CardTitle>
          <CardDescription>Fetching the latest operating system usage data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
          <Progress value={Math.random() * 100} className="w-full" />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">Please wait while we load the data...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="w-full max-w-lg mx-auto p-6">
        <div className="flex items-center space-x-4">
          <Terminal className="h-6 w-6" />
          <div>
            <AlertTitle className="text-lg font-bold">Error Loading Data</AlertTitle>
            <AlertDescription className="mt-2">
              Failed to retrieve OS analytics. {error.message}
            </AlertDescription>
          </div>
        </div>
        <Button onClick={() => refetch()} className="mt-4 w-full" variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </Alert>
    );
  }

  const osData: OSData = data || { osName: 'N/A', version: 'N/A', users: 0, marketShare: 0 };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-6">
        <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">Current OS Analytics</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">Detailed insights into the operating systems used by your audience.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6 space-y-6" aria-live="polite">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold">Operating System</span>
            <span className="text-900 dark:text-white text-2xl font-bold mt-1">{osData.osName}</span>
            <span className="text-gray-700 dark:text-gray-300 text-lg">Version: {osData.version}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold">Active Users</span>
            <span className="text-gray-900 dark:text-white text-3xl font-bold mt-1">{osData.users.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold">Market Share</span>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${osData.marketShare * 100}%` }}
              role="progressbar"
              aria-valuenow={osData.marketShare * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p className="text-right text-gray-700 dark:text-gray-300 text-sm font-medium">{(osData.marketShare * 100).toFixed(2)}% of total users</p>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
          Data last updated: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCurrentOS;
