// AUTO-GENERATED DRAFT SCREEN: ArcadeTournamentRules
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook

type TournamentRule = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
};

// Placeholder for tRPC client setup
const trpc = {
  tournament: {
    getRules: async (): Promise<TournamentRule[]> => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', title: 'Game Mode', description: 'Single elimination bracket.', isActive: true },
            { id: '2', title: 'Player Count', description: '16 players maximum.', isActive: true },
            { id: '3', title: 'Entry Fee', description: '100 SKYCOIN.', isActive: true },
            { id: '4', title: 'Prize Pool', description: 'Winner takes all.', isActive: false },
            { id: '5', title: 'Disconnection Policy', description: 'Disconnections result in a loss.', isActive: true },
          ]);
        }, 1000);
      });
    },
  },
};

const ArcadeTournamentRules: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const { data: rules, isLoading, isError, error } = useQuery<TournamentRule[]>({ // tRPC hook placeholder
    queryKey: ['tournamentRules'],
    queryFn: trpc.tournament.getRules,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading tournament rules...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-red-500">Error loading rules: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Arcade: Tournament Rules</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rules?.map((rule) => (
            <Card key={rule.id} className="shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{rule.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {rule.isActive ? 'Active' : 'Inactive'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{rule.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 SKYCOIN4444. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ArcadeTournamentRules;
