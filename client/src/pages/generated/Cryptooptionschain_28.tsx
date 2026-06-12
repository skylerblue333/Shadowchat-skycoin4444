// AUTO-GENERATED DRAFT SCREEN: CryptoOptionsChain
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // shadcn/ui
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui for loading states
import { Switch } from '@/components/ui/switch'; // shadcn/ui for dark mode toggle
import { Label } from '@/components/ui/label'; // shadcn/ui for switch label
import { cn } from '@/lib/utils'; // Utility for conditional class names

// Simulate tRPC-like API call
const fetchOptionsChain = async (currency: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  if (Math.random() < 0.1) { // Simulate an error 10% of the time
    throw new Error('Failed to fetch options chain data.');
  }
  return {
    calls: Array.from({ length: 5 }).map((_, i) => ({
      strike: 20000 + i * 500,
      bid: (Math.random() * 100).toFixed(2),
      ask: (Math.random() * 100 + 5).toFixed(2),
      volume: Math.floor(Math.random() * 1000),
      openInterest: Math.floor(Math.random() * 500),
    })),
    puts: Array.from({ length: 5 }).map((_, i) => ({
      strike: 20000 + i * 500,
      bid: (Math.random() * 100).toFixed(2),
      ask: (Math.random() * 100 + 5).toFixed(2),
      volume: Math.floor(Math.random() * 1000),
      openInterest: Math.floor(Math.random() * 500),
    })),
  };
};

interface OptionData {
  strike: number;
  bid: string;
  ask: string;
  volume: number;
  openInterest: number;
}

interface OptionsChainData {
  calls: OptionData[];
  puts: OptionData[];
}

interface CryptoOptionsChainProps {
  currencySymbol?: string;
}

const CryptoOptionsChain: React.FC<CryptoOptionsChainProps> = ({ currencySymbol = 'BTC' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = useQuery<OptionsChainData, Error>(
    ['optionsChain', currencySymbol],
    () => fetchOptionsChain(currencySymbol),
    { retry: 1 } // Basic error handling: retry once
  );

  const renderOptionsTable = useCallback((options: OptionData[], type: 'Calls' | 'Puts') => (
    <Table className="w-full text-sm" aria-label={`${currencySymbol} ${type} Options Chain`}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Strike</TableHead>
          <TableHead>Bid</TableHead>
          <TableHead>Ask</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Open Interest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {options.map((option, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{option.strike}</TableCell>
            <TableCell>{option.bid}</TableCell>
            <TableCell>{option.ask}</TableCell>
            <TableCell>{option.volume}</TableCell>
            <TableCell>{option.openInterest}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ), [currencySymbol]);

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground p-4 md:p-8",
      isDarkMode ? "dark" : ""
    )}>
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight" tabIndex={0}>
              {currencySymbol} Options Chain
            </CardTitle>
            <div className="flex items-center space-x-2">
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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" aria-label="Loading title" />
                <Skeleton className="h-48 w-full" aria-label="Loading calls table" />
                <Skeleton className="h-48 w-full" aria-label="Loading puts table" />
              </div>
            ) : isError ? (
              <div role="alert" className="text-red-500 dark:text-red-400">
                <p className="font-semibold">Error loading options chain:</p>
                <p>{error?.message || 'An unknown error occurred.'}</p>
                <button
                  onClick={() => refetch()}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold" tabIndex={0}>Calls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data?.calls && data.calls.length > 0 ? (
                      renderOptionsTable(data.calls, 'Calls')
                    ) : (
                      <p className="text-muted-foreground">No call options data available.</p>
                    )}
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold" tabIndex={0}>Puts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data?.puts && data.puts.length > 0 ? (
                      renderOptionsTable(data.puts, 'Puts')
                    ) : (
                      <p className="text-muted-foreground">No put options data available.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoOptionsChain;