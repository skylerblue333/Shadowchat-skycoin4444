// AUTO-GENERATED DRAFT SCREEN: ArcadeCasualMatches
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-react';

interface Match {
  id: string;
  player1: string;
  player2: string;
  status: 'pending' | 'active' | 'completed';
  score?: string;
}

const fetchCasualMatches = async (): Promise<Match[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', player1: 'Alice', player2: 'Bob', status: 'active' },
        { id: '2', player1: 'Charlie', player2: 'David', status: 'pending' },
        { id: '3', player1: 'Eve', player2: 'Frank', status: 'completed', score: '10-5' },
      ]);
    }, 1000);
  });
};

export function ArcadeCasualMatches() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = useQuery<Match[], Error>({ queryKey: ['casualMatches'], queryFn: fetchCasualMatches });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading casual matches...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg text-red-500">Error: {error?.message || 'Failed to load matches'}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Arcade: Casual Matches</h1>
        <div className="flex items-center space-x-2">
          <SunIcon className="h-5 w-5" />
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch" className="sr-only">Toggle dark mode</Label>
          <MoonIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((match) => (
          <Card key={match.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Match ID: {match.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Player 1:</strong> {match.player1}</p>
              <p><strong>Player 2:</strong> {match.player2}</p>
              <p><strong>Status:</strong> {match.status}</p>
              {match.score && <p><strong>Score:</strong> {match.score}</p>}
              {match.status === 'pending' && (
                <Button className="mt-4 w-full dark:bg-blue-600 dark:hover:bg-blue-700">Join Match</Button>
              )}
              {match.status === 'active' && (
                <Button variant="outline" className="mt-4 w-full dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-900">View Live</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


export default function Arcadecasualmatches_618() { return null; }
