// AUTO-GENERATED DRAFT SCREEN: BurnTracker
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BurnTrackerData {
  totalBurned: string;
  lastBurnAmount: string;
  lastBurnTime: string;
}

const BurnTracker: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data, isLoading, isError, error } = trpc.burnTracker.getBurnData.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="p-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load burn data: {error.message}</AlertDescription>
      </Alert>
    );
  }

  const { totalBurned, lastBurnAmount, lastBurnTime } = data as BurnTrackerData;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto: Burn Tracker</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          aria-label="Toggle dark mode"
        >
          {isDarkTheme ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Total Burned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{totalBurned} SKY</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Last Burn Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{lastBurnAmount} SKY</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Last Burn Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{new Date(lastBurnTime).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="burn-tracker-info" className="mt-8">
        <h2 id="burn-tracker-info" className="sr-only">Burn Tracker Information</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This tracker provides real-time updates on SKYCOIN burn events. Data is fetched securely via tRPC.
          All values are approximate and for informational purposes only.
        </p>
      </section>
    </div>
  );
};

export default BurnTracker;
