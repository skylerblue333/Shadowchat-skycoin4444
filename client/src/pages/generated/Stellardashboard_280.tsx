// AUTO-GENERATED DRAFT SCREEN: StellarDashboard
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface StellarDashboardProps {
  userId: string;
}

const StellarDashboard: React.FC<StellarDashboardProps> = ({ userId }) => {
  const { data, isLoading, isError, error } = trpc.stellar.getDashboardData.useQuery({ userId });

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error loading Stellar data</AlertTitle>
          <AlertDescription>{error?.message || 'An unknown error occurred.'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stellar Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDarkTheme ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.balance || 'N/A'} XLM</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data?.transactions?.length ? (
                data.transactions.map((tx, index) => (
                  <li key={index} className="text-sm">
                    {tx.type}: {tx.amount} XLM to {tx.destination}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent transactions.</p>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Assets Held</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data?.assets?.length ? (
                data.assets.map((asset, index) => (
                  <li key={index} className="text-sm">
                    {asset.code}: {asset.balance}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No additional assets.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Ledger: {data?.networkStatus?.ledger || 'N/A'}</p>
          <p className="text-sm">Peers: {data?.networkStatus?.peers || 'N/A'}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StellarDashboard;
