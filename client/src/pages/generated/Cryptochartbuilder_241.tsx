// AUTO-GENERATED DRAFT SCREEN: CryptoChartBuilder
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ChartData {
  time: string;
  value: number;
}

interface CryptoChartBuilderProps {
  coinId: string;
}

const CryptoChartBuilder: React.FC<CryptoChartBuilderProps> = ({ coinId }) => {
  const { data, isLoading, isError, error, refetch } = trpc.crypto.getChartData.useQuery(
    { coinId },
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      onError: (err) => {
        console.error('Failed to fetch chart data:', err.message);
      },
    }
  );

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-gray-100" aria-live="polite" aria-busy="true">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-gray-100" role="alert">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">Failed to load chart data for {coinId}. {error?.message || 'Please try again.'}</p>
          <Button onClick={() => refetch()} className="mt-4">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crypto Chart: {coinId.toUpperCase()}</CardTitle>
        <div className="flex items-center space-x-2 mt-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart visualization */}
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>Chart visualization for {coinId} would go here.</p>
          <p>Data points: {data?.length || 0}</p>
        </div>
        <Button onClick={() => refetch()} className="mt-4">Refresh Data</Button>
      </CardContent>
    </Card>
  );
};

export default CryptoChartBuilder;
