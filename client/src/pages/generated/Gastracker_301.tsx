// AUTO-GENERATED DRAFT SCREEN: GasTracker
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { cn } from '@/lib/utils'; // shadcn/ui utility for conditional classes
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // shadcn/ui Card component
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton component
import { Button } from '@/components/ui/button'; // shadcn/ui Button component
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch component
import { Label } from '@/components/ui/label'; // shadcn/ui Label component
import { AlertCircle, Sun, Moon } from 'lucide-react'; // Icons

// Mock tRPC hook for gas price data
const useGasPriceQuery = () => {
  return useQuery({
    queryKey: ['gasPrice'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Increased delay for better loading state visibility
      const gasPrice = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // Random gas price between 20 and 100 Gwei
      if (Math.random() < 0.15) { // Increased error probability for testing
        throw new Error('Network error or API is unavailable. Please check your connection.');
      }
      return { standard: gasPrice, fast: gasPrice + 10, instant: gasPrice + 20, baseFee: gasPrice / 2 };
    },
    refetchInterval: 20000, // Refetch every 20 seconds
    staleTime: 15000, // Data is considered fresh for 15 seconds
  });
};

interface GasTrackerProps {
  className?: string;
}

const GasTracker: React.FC<GasTrackerProps> = ({ className }) => {
  const { data, isLoading, isError, error, refetch } = useGasPriceQuery();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
    // In a real app, you'd update a global theme context or add/remove a 'dark' class on the document root
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  }, [isDarkTheme]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Card className={cn('w-[380px] p-4', className, { 'dark': isDarkTheme })} aria-live="polite">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="grid gap-1">
          <CardTitle className="text-2xl font-bold">Crypto: Gas Tracker</CardTitle>
          <CardDescription>Real-time Ethereum gas prices</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Switch
            checked={isDarkTheme}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isError ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <p className="text-red-500 font-medium">Error: {error?.message || 'Failed to load gas prices.'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please try again later or refresh.</p>
            <Button onClick={handleRefetch} className="mt-4">Retry</Button>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-4 w-1/2 mt-4" />
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="standard-gas" className="text-sm font-medium text-gray-500 dark:text-gray-400">Standard:</Label>
              <span id="standard-gas" className="text-lg font-bold text-green-600 dark:text-green-400">{data?.standard} Gwei</span>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="fast-gas" className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast:</Label>
              <span id="fast-gas" className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{data?.fast} Gwei</span>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="instant-gas" className="text-sm font-medium text-gray-500 dark:text-gray-400">Instant:</Label>
              <span id="instant-gas" className="text-lg font-bold text-red-600 dark:text-red-400">{data?.instant} Gwei</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3 mt-3 border-gray-200 dark:border-gray-700">
              <Label htmlFor="base-fee" className="text-xs text-gray-500 dark:text-gray-400">Base Fee:</Label>
              <span id="base-fee" className="text-sm text-gray-600 dark:text-gray-300">{data?.baseFee?.toFixed(2)} Gwei</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2" aria-live="off">Last updated: {new Date().toLocaleTimeString()}</p>
            <Button onClick={handleRefetch} className="w-full mt-4">Refresh Data</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GasTracker;
