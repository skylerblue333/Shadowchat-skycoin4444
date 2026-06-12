// AUTO-GENERATED DRAFT SCREEN: ArcadeTournamentSchedule
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Placeholder for shadcn/ui Card
import { Button } from "@/components/ui/button"; // Placeholder for shadcn/ui Button
import { Switch } from "@/components/ui/switch"; // Placeholder for shadcn/ui Switch
import { Label } from "@/components/ui/label"; // Placeholder for shadcn/ui Label

interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  game: string;
  status: 'upcoming' | 'live' | 'completed';
}

// Placeholder for tRPC client
const trpc = {
  tournament: {
    list: () => ({ queryKey: ['tournaments'], queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: '1', name: 'Summer Showdown', date: '2026-07-15', time: '18:00', game: 'Fighting Game X', status: 'upcoming' },
        { id: '2', name: 'Winter Cup', date: '2026-12-01', time: '20:00', game: 'Racing Game Y', status: 'live' },
        { id: '3', name: 'Spring Open', date: '2026-03-20', time: '16:00', game: 'Puzzle Game Z', status: 'completed' },
      ];
    } })
  }
};

const ArcadeTournamentSchedule: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: tournaments, isLoading, isError, error } = useQuery<Tournament[]>(trpc.tournament.list());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading tournament schedule...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-red-500">Error loading schedule: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Arcade: Tournament Schedule</h1>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tournaments?.map((tournament) => (
          <Card key={tournament.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>{tournament.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">Game: {tournament.game}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Date: {tournament.date}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time: {tournament.time}</p>
              <p className={`text-sm font-medium ${tournament.status === 'live' ? 'text-green-500' : tournament.status === 'upcoming' ? 'text-blue-500' : 'text-gray-500'}`}>
                Status: {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
              </p>
              <Button className="mt-4 w-full" disabled={tournament.status === 'completed'}>
                {tournament.status === 'upcoming' ? 'Register' : tournament.status === 'live' ? 'View Live' : 'View Results'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArcadeTournamentSchedule;
