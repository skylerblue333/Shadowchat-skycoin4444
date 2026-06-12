// AUTO-GENERATED DRAFT SCREEN: MevDashboard

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { Terminal, TrendingUp, DollarSign } from 'lucide-react'; // Example icons for alerts and data

interface MevData {
  totalValueLocked: number;
  dailyVolume: number;
  pendingTransactions: number;
  averageGasPrice: number;
}

const MevDashboard: React.FC = () => {
  // Using tRPC hook directly for data fetching
  const { data, isLoading, isError, error } = trpc.mev.getDashboardData.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" aria-live="polite" aria-busy="true">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4" aria-live="assertive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load MEV dashboard data: {error?.message || 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8" aria-live="polite" aria-busy={isLoading}>
      <h1 className="text-3xl font-bold mb-6">Crypto MEV Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data?.totalValueLocked.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data?.dailyVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.pendingTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current pending transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Gas Price</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.averageGasPrice.toFixed(2)} Gwei</div>
            <p className="text-xs text-muted-foreground">Current network average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MevDashboard;
