// AUTO-GENERATED DRAFT SCREEN: LearningChallenges

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

const LearningChallenges: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: challenges, isLoading, isError, error } = trpc.getLearningChallenges.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Learning Challenges</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen text-red-500 dark:text-red-400">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Learning Challenges</h1>
        <p>Error loading challenges: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Learning Challenges</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch" className="dark:text-gray-300">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges?.map((challenge: Challenge) => (
          <Card key={challenge.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">{challenge.title}</CardTitle>
              <p className={`text-sm ${challenge.difficulty === 'easy' ? 'text-green-500' : challenge.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                Difficulty: {challenge.difficulty}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{challenge.description}</p>
              <Button
                variant={challenge.completed ? 'secondary' : 'default'}
                disabled={challenge.completed}
                className="w-full"
              >
                {challenge.completed ? 'Completed' : 'Start Challenge'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningChallenges;
