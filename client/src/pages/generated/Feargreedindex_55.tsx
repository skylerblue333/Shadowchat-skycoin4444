// AUTO-GENERATED DRAFT SCREEN: FearGreedIndex
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Skeleton } from './components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc';
import { Moon, Sun } from 'lucide-react';

type FearGreedIndexData = {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
};

const fetchFearGreedIndex = async (): Promise<FearGreedIndexData> => {
  // In a real application, this would be a tRPC call or an API fetch
  // For demonstration, we'll simulate a fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        value: Math.floor(Math.random() * 100).toString(),
        value_classification: 'Neutral',
        timestamp: new Date().toISOString(),
        time_until_update: '24 hours',
      });
    }, 1000);
  });
};

const FearGreedIndex: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = useQuery<FearGreedIndexData, Error>(
    ['fearGreedIndex'],
    fetchFearGreedIndex
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load Fear & Greed Index: {error?.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fearGreedValue = data ? parseInt(data.value) : 0;
  const classification = data ? data.value_classification : 'N/A';

  const getProgressColor = (value: number) => {
    if (value <= 20) return 'bg-red-500'; // Extreme Fear
    if (value <= 40) return 'bg-orange-500'; // Fear
    if (value <= 60) return 'bg-yellow-500'; // Neutral
    if (value <= 80) return 'bg-green-500'; // Greed
    return 'bg-blue-500'; // Extreme Greed
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Card className="w-[350px] shadow-lg dark:bg-gray-800 dark:text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Crypto Fear & Greed Index</CardTitle>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-6">
          <div className="text-6xl font-extrabold mb-4" aria-live="polite">
            {fearGreedValue}
          </div>
          <div className="text-xl font-semibold mb-6" aria-live="polite">
            {classification}
          </div>
          <Progress
            value={fearGreedValue}
            className="w-full h-3 mb-4"
            indicatorClassName={getProgressColor(fearGreedValue)}
            aria-valuenow={fearGreedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Fear and Greed Index progress bar"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Next update in: {data?.time_until_update || 'N/A'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FearGreedIndex;
