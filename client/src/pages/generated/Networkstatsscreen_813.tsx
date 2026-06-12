// AUTO-GENERATED DRAFT SCREEN: NetworkStatsScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Placeholder for shadcn/ui Card
import { Button } from './ui/button'; // Placeholder for shadcn/ui Button
import { Switch } from './ui/switch'; // Placeholder for shadcn/ui Switch
import { Label } from './ui/label'; // Placeholder for shadcn/ui Label

// Mock tRPC client for demonstration purposes
// In a real application, this would be imported from your tRPC setup
const trpc = {
  network: {
    getStats: {
      useQuery: (options?: any) => {
        // Simulate API call with loading, error, and data states
        const { data, isLoading, isError, error } = useQuery<any, Error>(
          ['networkStats'],
          async () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.1) { // Simulate occasional error
                  resolve({
                    totalNodes: 12345,
                    activeNodes: 9876,
                    transactionsPerSecond: 123.45,
                    avgBlockTime: 15.2,
                    networkHashRate: '500 TH/s',
                    lastUpdated: new Date().toLocaleString(),
                  });
                } else {
                  reject(new Error('Failed to fetch network stats.'));
                }
              }, 1500);
            });
          },
          options
        );
        return { data, isLoading, isError, error };
      },
    },
  },
};

const NetworkStatsScreen: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.network.getStats.useQuery();
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
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading network statistics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <p className="text-lg text-red-500 mb-4" role="alert">Error: {error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => refetch()} aria-label="Retry fetching network statistics">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-200">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Network Statistics</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Total Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data?.totalNodes?.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data?.activeNodes?.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Transactions/Second</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data?.transactionsPerSecond?.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Average Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data?.avgBlockTime} s</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Network Hash Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data?.networkHashRate}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">{data?.lastUpdated}</p>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NetworkStatsScreen;
