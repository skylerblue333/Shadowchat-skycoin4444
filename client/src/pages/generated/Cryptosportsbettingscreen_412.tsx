// AUTO-GENERATED DRAFT SCREEN: CryptoSportsBettingScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Mock tRPC hook for demonstration. In a real app, this would connect to a tRPC backend.
const trpc = {
  sports: {
    getEvents: (options?: { darkTheme?: boolean }) =>
      useQuery({
        queryKey: ['sportsEvents', options?.darkTheme],
        queryFn: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
          if (Math.random() < 0.1) throw new Error('Failed to fetch events');
          return [
            { id: '1', name: 'Football Match A', odds: '1.85', status: 'Upcoming' },
            { id: '2', name: 'Basketball Game B', odds: '2.10', status: 'Live' },
            { id: '3', name: 'Tennis Tournament C', odds: '1.50', status: 'Completed' },
          ];
        },
      }),
  },
};

interface SportsEvent {
  id: string;
  name: string;
  odds: string;
  status: string;
}

const CryptoSportsBettingScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { data: events, isLoading, isError, error, refetch } = trpc.sports.getEvents({ darkTheme: isDarkTheme });

  if (isLoading) {
    return (
      <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}`}>
        <Card className="w-full max-w-md mx-auto border-red-500">
          <CardHeader><CardTitle className="text-red-500">Error</CardTitle></CardHeader>
          <CardContent>
            <p className="text-red-400" role="alert">Failed to load sports events: {error?.message}</p>
            <Button onClick={() => refetch()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Sports Betting</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event: SportsEvent) => (
          <Card key={event.id} className="transition-colors duration-200">
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-lg font-semibold">Odds: {event.odds}</p>
              <Button
                variant={event.status === 'Live' ? 'destructive' : 'default'}
                disabled={event.status === 'Completed'}
                aria-live="polite"
              >
                {event.status === 'Completed' ? 'Closed' : 'Place Bet'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoSportsBettingScreen;
