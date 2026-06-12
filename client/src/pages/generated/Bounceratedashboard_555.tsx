// AUTO-GENERATED DRAFT SCREEN: BounceRateDashboard
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

interface BounceRateData {
  date: string;
  bounceRate: number;
}

interface UseBounceRateQueryResult {
  data: BounceRateData[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Mock tRPC hook for fetching bounce rate data
const useBounceRateQuery = (): UseBounceRateQueryResult => {
  const [data, setData] = useState<BounceRateData[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate data fetching
        const mockData: BounceRateData[] = Array.from({ length: 7 }, (_, i) => ({
          date: `2024-06-${10 + i}`,
          bounceRate: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)),
        }));
        setData(mockData);
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError, error };
};

const BounceRateDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useBounceRateQuery();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto text-center p-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          <CardTitle>Error</CardTitle>
          <CardContent>
            <p>Failed to load bounce rate data: {error?.message}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard: Bounce Rate</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of website bounce rate over time.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {data?.map((item) => (
              <div key={item.date} className="flex justify-between items-center p-2 border-b last:border-b-0">
                <span className="font-medium">{item.date}</span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.bounceRate}%</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Bounce rate is the percentage of visitors who navigate away from the site after viewing only one page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BounceRateDashboard;