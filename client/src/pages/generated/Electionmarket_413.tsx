// AUTO-GENERATED DRAFT SCREEN: ElectionMarket
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface ElectionMarketData {
  id: string;
  title: string;
  options: { id: string; name: string; votes: number }[];
  totalVotes: number;
}

const fetchElectionMarket = async (): Promise<ElectionMarketData> => {
  // Simulate API call with tRPC
  const data = await trpc.election.getMarket.query();
  return data;
};

const ElectionMarket: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data, isLoading, isError, error } = useQuery<ElectionMarketData, Error>(
    ['electionMarket'],
    fetchElectionMarket,
    { staleTime: 5 * 60 * 1000 } // 5 minutes stale time
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading election market data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error?.message || 'Failed to load data'}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">No election market data available.</p>
      </div>
    );
  }

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <div className="flex items-center space-x-2">
            <SunIcon className="h-5 w-5" />
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle" className="sr-only">Toggle dark mode</Label>
            <MoonIcon className="h-5 w-5" />
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Total Votes: {data.totalVotes}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.options.map((option) => (
            <Card key={option.id}>
              <CardHeader>
                <CardTitle>{option.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md mb-2">Votes: {option.votes}</p>
                <Button className="w-full">Vote</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionMarket;
